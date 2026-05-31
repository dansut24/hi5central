import { Hono } from "hono";
import { randomBytes } from "node:crypto";
import { getCookie } from "hono/cookie";
import { hashPassword, hashToken, verifyPassword } from "@hi5central/auth";

import { db } from "../lib/db";
import { clearSessionCookie, SESSION_COOKIE, setSessionCookie } from "../lib/cookies";
import { createSession } from "../lib/sessions";
import { writeAuditLog } from "../lib/audit";
import { sendTrialConfirmationEmail } from "../lib/mail";
import { requireAuth, type AuthContext } from "../middleware/session";

export const authRoutes = new Hono<AuthContext>();

function normaliseSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

authRoutes.post("/trial-signup", async (c) => {
  const body = await c.req.json().catch(() => null);

  const companyName = String(body?.company_name ?? "").trim();
  const requestedSlug = normaliseSlug(String(body?.tenant_slug ?? companyName));
  const firstName = String(body?.first_name ?? "").trim();
  const lastName = String(body?.last_name ?? "").trim();
  const email = String(body?.email ?? "").toLowerCase().trim();
  const password = String(body?.password ?? "");

  const ipAddress = c.req.header("x-forwarded-for") ?? null;
  const userAgent = c.req.header("user-agent") ?? null;

  if (!companyName || !requestedSlug || !firstName || !email || password.length < 8) {
    return c.json(
      {
        success: false,
        error: "invalid_trial_signup_payload"
      },
      400
    );
  }

  const existingTenant = await db
    .selectFrom("tenants")
    .select(["id"])
    .where("slug", "=", requestedSlug)
    .executeTakeFirst();

  if (existingTenant) {
    return c.json(
      {
        success: false,
        error: "tenant_slug_taken"
      },
      409
    );
  }

  const existingUser = await db
    .selectFrom("users")
    .select(["id"])
    .where("email", "=", email)
    .executeTakeFirst();

  if (existingUser) {
    return c.json(
      {
        success: false,
        error: "email_already_registered"
      },
      409
    );
  }

  const passwordHash = await hashPassword(password);

  const tenant = await db
    .insertInto("tenants")
    .values({
      name: companyName,
      slug: requestedSlug,
      plan: "trial",
      status: "pending_verification"
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const user = await db
    .insertInto("users")
    .values({
      email,
      password_hash: passwordHash,
      first_name: firstName,
      last_name: lastName || null,
      status: "pending_verification",
      platform_role: null
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const membership = await db
    .insertInto("memberships")
    .values({
      tenant_id: tenant.id,
      user_id: user.id,
      role: "owner"
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const deviceGroup = await db
    .insertInto("device_groups")
    .values({
      tenant_id: tenant.id,
      name: "Default",
      description: "Default device group"
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  await db
    .insertInto("subscriptions")
    .values({
      tenant_id: tenant.id,
      plan: "trial",
      status: "trial",
      renewal_date: null
    })
    .execute();

  await db
    .insertInto("tenant_branding")
    .values({
      tenant_id: tenant.id,
      company_name: companyName,
      logo_url: null,
      favicon_url: null,
      primary_colour: "#2563eb",
      secondary_colour: "#7c3aed",
      viewer_name: "Hi5Central Viewer",
      viewer_icon_url: null,
      agent_name: "Hi5Central Agent",
      support_exe_name: "Hi5Central Support",
      custom_domain: null
    })
    .execute();

  const verificationToken = randomBytes(32).toString("base64url");

  await db
    .insertInto("email_verification_tokens")
    .values({
      user_id: user.id,
      token_hash: hashToken(verificationToken),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })
    .execute();

  const confirmationUrl = `https://${tenant.slug}.hi5central.com/api/auth/confirm-trial?token=${verificationToken}`;



  await sendTrialConfirmationEmail({
    to: user.email,
    firstName: user.first_name || "",
    companyName: tenant.name,
    confirmationUrl
  });

  await writeAuditLog({
    tenantId: tenant.id,
    userId: user.id,
    action: "auth.trial_signup",
    resourceType: "tenant",
    resourceId: tenant.id,
    ipAddress,
    userAgent,
    metadata: {
      tenant_slug: tenant.slug,
      membership_id: membership.id,
      default_device_group_id: deviceGroup.id,
      confirmation_email_sent: true
    }
  });

  return c.json({
    success: true,
    tenant: {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug
    },
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    },
    membership: {
      id: membership.id,
      role: membership.role
    },
    confirmation_url: confirmationUrl,
    message: "Check your email to confirm your tenant."
  });
});


authRoutes.get("/confirm-trial", async (c) => {
  const token = String(c.req.query("token") ?? "");

  if (!token) {
    return c.text("Missing confirmation token", 400);
  }

  const tokenHash = hashToken(token);

  const verification = await db
    .selectFrom("email_verification_tokens")
    .innerJoin("users", "users.id", "email_verification_tokens.user_id")
    .innerJoin("memberships", "memberships.user_id", "users.id")
    .innerJoin("tenants", "tenants.id", "memberships.tenant_id")
    .select([
      "email_verification_tokens.id as token_id",
      "email_verification_tokens.expires_at",
      "email_verification_tokens.used_at",
      "users.id as user_id",
      "tenants.id as tenant_id",
      "tenants.slug as tenant_slug"
    ])
    .where("email_verification_tokens.token_hash", "=", tokenHash)
    .executeTakeFirst();

  if (!verification) {
    return c.text("Invalid confirmation token", 400);
  }

  if (verification.used_at) {
    return c.redirect(`https://${verification.tenant_slug}.hi5central.com/login?verified=already`);
  }

  if (new Date(verification.expires_at).getTime() < Date.now()) {
    return c.text("Confirmation token expired", 400);
  }

  await db
    .updateTable("users")
    .set({
      status: "active",
      updated_at: new Date()
    })
    .where("id", "=", verification.user_id)
    .execute();

  await db
    .updateTable("tenants")
    .set({
      status: "active",
      updated_at: new Date()
    })
    .where("id", "=", verification.tenant_id)
    .execute();

  await db
    .updateTable("email_verification_tokens")
    .set({
      used_at: new Date()
    })
    .where("id", "=", verification.token_id)
    .execute();

  return c.redirect(`https://${verification.tenant_slug}.hi5central.com/login?verified=1`);
});


authRoutes.get("/tenant/:slug", async (c) => {
  const slug = String(c.req.param("slug") ?? "").toLowerCase().trim();

  const tenant = await db
    .selectFrom("tenants")
    .select([
      "id",
      "name",
      "slug",
      "plan",
      "status",
      "selected_product",
      "onboarding_completed_at"
    ])
    .where("slug", "=", slug)
    .executeTakeFirst();

  if (!tenant) {
    return c.json(
      {
        success: false,
        error: "tenant_not_found"
      },
      404
    );
  }

  const branding = await db
    .selectFrom("tenant_branding")
    .selectAll()
    .where("tenant_id", "=", tenant.id)
    .executeTakeFirst();

  return c.json({
    success: true,
    tenant,
    branding
  });
});

authRoutes.post("/onboarding/complete", requireAuth, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => ({}));

  const tenantSlug = String(body.tenant_slug ?? "").toLowerCase().trim();
  const selectedProduct = String(body.selected_product ?? "control").toLowerCase().trim();

  if (!tenantSlug || !["control", "itsm", "platform"].includes(selectedProduct)) {
    return c.json(
      {
        success: false,
        error: "invalid_onboarding_payload"
      },
      400
    );
  }

  const tenant = await db
    .selectFrom("tenants")
    .innerJoin("memberships", "memberships.tenant_id", "tenants.id")
    .select(["tenants.id", "tenants.slug"])
    .where("tenants.slug", "=", tenantSlug)
    .where("memberships.user_id", "=", user.id)
    .executeTakeFirst();

  if (!tenant) {
    return c.json(
      {
        success: false,
        error: "tenant_not_found_or_no_access"
      },
      404
    );
  }

  await db
    .updateTable("tenants")
    .set({
      selected_product: selectedProduct,
      onboarding_completed_at: new Date(),
      updated_at: new Date()
    })
    .where("id", "=", tenant.id)
    .execute();

  await writeAuditLog({
    tenantId: tenant.id,
    userId: user.id,
    action: "tenant.onboarding_completed",
    resourceType: "tenant",
    resourceId: tenant.id,
    metadata: {
      selected_product: selectedProduct
    }
  });

  return c.json({
    success: true,
    redirect_url: "/dashboard"
  });
});

authRoutes.post("/login", async (c) => {
  const body = await c.req.json().catch(() => null);

  const email = String(body?.email ?? "").toLowerCase().trim();
  const password = String(body?.password ?? "");

  const ipAddress = c.req.header("x-forwarded-for") ?? null;
  const userAgent = c.req.header("user-agent") ?? null;

  if (!email || !password) {
    return c.json({ success: false }, 400);
  }

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();

  if (!user || user.status !== "active") {
    return c.json({ success: false }, 401);
  }

  const validPassword = await verifyPassword(user.password_hash, password);

  if (!validPassword) {
    await writeAuditLog({
      userId: user.id,
      action: "auth.login_failed",
      ipAddress,
      userAgent,
      metadata: { reason: "invalid_password" }
    });

    return c.json({ success: false }, 401);
  }

  const verificationToken = randomBytes(32).toString("base64url");

  await db
    .insertInto("email_verification_tokens")
    .values({
      user_id: user.id,
      token_hash: hashToken(verificationToken),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })
    .execute();



  await writeAuditLog({
    userId: user.id,
    action: "auth.login_success",
    ipAddress,
    userAgent
  });

  return c.json({
    success: true
  });
});

authRoutes.post("/logout", requireAuth, async (c) => {
  const token = getCookie(c, SESSION_COOKIE);
  const user = c.get("user");

  const ipAddress = c.req.header("x-forwarded-for") ?? null;
  const userAgent = c.req.header("user-agent") ?? null;

  if (token) {
    await db
      .updateTable("sessions")
      .set({
        revoked_at: new Date()
      })
      .where("session_token_hash", "=", hashToken(token))
      .execute();
  }

  clearSessionCookie(c);

  await writeAuditLog({
    userId: user.id,
    action: "auth.logout",
    ipAddress,
    userAgent
  });

  return c.json({
    success: true
  });
});

authRoutes.post("/logout-everywhere", requireAuth, async (c) => {
  const user = c.get("user");

  const ipAddress = c.req.header("x-forwarded-for") ?? null;
  const userAgent = c.req.header("user-agent") ?? null;

  await db
    .updateTable("sessions")
    .set({
      revoked_at: new Date()
    })
    .where("user_id", "=", user.id)
    .where("revoked_at", "is", null)
    .execute();

  clearSessionCookie(c);

  await writeAuditLog({
    userId: user.id,
    action: "auth.logout_everywhere",
    ipAddress,
    userAgent
  });

  return c.json({
    success: true
  });
});

authRoutes.get("/me", requireAuth, (c) => {
  return c.json({
    success: true,
    user: c.get("user"),
    memberships: c.get("memberships"),
    tenantIds: c.get("tenantIds"),
    roles: c.get("roles")
  });
});
