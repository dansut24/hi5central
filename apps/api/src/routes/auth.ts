import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { hashPassword, hashToken, verifyPassword } from "@hi5central/auth";

import { db } from "../lib/db";
import { clearSessionCookie, SESSION_COOKIE, setSessionCookie } from "../lib/cookies";
import { createSession } from "../lib/sessions";
import { writeAuditLog } from "../lib/audit";
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
      status: "active"
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
      status: "active",
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

  const session = await createSession({
    userId: user.id,
    ipAddress,
    userAgent
  });

  setSessionCookie(c, session.token);

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
      default_device_group_id: deviceGroup.id
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
    redirect_url: `https://app.hi5central.com/${tenant.slug}/onboarding`
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

  const session = await createSession({
    userId: user.id,
    ipAddress,
    userAgent
  });

  setSessionCookie(c, session.token);

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
