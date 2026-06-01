import { randomBytes } from "node:crypto";
import { Hono } from "hono";
import { hashToken } from "@hi5central/auth";

import { db } from "../lib/db";
import { writeAuditLog } from "../lib/audit";
import { requireAuth, type AuthContext } from "../middleware/session";
import { requirePlatformAdmin } from "../middleware/platformAdmin";

export const platformImpersonationRoutes = new Hono<AuthContext>();

platformImpersonationRoutes.use("*", requireAuth);
platformImpersonationRoutes.use("*", requirePlatformAdmin);

platformImpersonationRoutes.post("/tenant/:tenantId", async (c) => {
  const platformUser = c.get("user");
  const tenantId = c.req.param("tenantId");

  const tenant = await db
    .selectFrom("tenants")
    .select(["id", "name", "slug"])
    .where("id", "=", tenantId)
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

  const membership = await db
    .selectFrom("memberships")
    .innerJoin("users", "users.id", "memberships.user_id")
    .select([
      "users.id as user_id",
      "users.email",
      "users.first_name",
      "users.last_name",
      "memberships.role"
    ])
    .where("memberships.tenant_id", "=", tenantId)
    .where("memberships.role", "=", "owner")
    .executeTakeFirst();

  if (!membership) {
    return c.json(
      {
        success: false,
        error: "tenant_owner_not_found"
      },
      404
    );
  }

  const token = randomBytes(32).toString("base64url");

  await db
    .insertInto("platform_impersonation_tokens")
    .values({
      token_hash: hashToken(token),
      platform_user_id: platformUser.id,
      impersonated_user_id: membership.user_id,
      tenant_id: tenant.id,
      expires_at: new Date(Date.now() + 5 * 60 * 1000)
    })
    .execute();

  await writeAuditLog({
    tenantId: tenant.id,
    userId: platformUser.id,
    action: "platform.impersonation_token_created",
    resourceType: "tenant",
    resourceId: tenant.id,
    metadata: {
      tenant_slug: tenant.slug,
      impersonated_user_id: membership.user_id,
      impersonated_user_email: membership.email
    }
  });

  return c.json({
    success: true,
    tenant,
    impersonated_user: {
      id: membership.user_id,
      email: membership.email,
      role: membership.role
    },
    redirect_url: `https://${tenant.slug}.hi5central.com/impersonate?token=${token}`
  });
});
