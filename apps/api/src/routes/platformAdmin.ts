import { Hono } from "hono";

import { db } from "../lib/db";
import { requireAuth, type AuthContext } from "../middleware/session";
import { requirePlatformAdmin } from "../middleware/platformAdmin";

export const platformAdminRoutes = new Hono<AuthContext>();

platformAdminRoutes.use("*", requireAuth);
platformAdminRoutes.use("*", requirePlatformAdmin);

platformAdminRoutes.get("/tenants", async (c) => {
  const tenants = await db
    .selectFrom("tenants")
    .selectAll()
    .orderBy("created_at", "desc")
    .execute();

  return c.json({
    success: true,
    tenants
  });
});


platformAdminRoutes.post("/tenants/:id/status", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json().catch(() => ({}));
  const status = String(body.status ?? "").toLowerCase().trim();

  if (!["active", "suspended", "cancelled"].includes(status)) {
    return c.json(
      {
        success: false,
        error: "invalid_tenant_status"
      },
      400
    );
  }

  const tenant = await db
    .updateTable("tenants")
    .set({
      status,
      updated_at: new Date()
    })
    .where("id", "=", id)
    .returningAll()
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

  return c.json({
    success: true,
    tenant
  });
});

platformAdminRoutes.post("/tenants/:id/convert-trial", async (c) => {
  const id = c.req.param("id");

  const tenant = await db
    .updateTable("tenants")
    .set({
      plan: "starter",
      status: "active",
      updated_at: new Date()
    })
    .where("id", "=", id)
    .returningAll()
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

  await db
    .updateTable("subscriptions")
    .set({
      plan: "starter",
      status: "active",
      updated_at: new Date()
    })
    .where("tenant_id", "=", id)
    .execute();

  return c.json({
    success: true,
    tenant
  });
});

platformAdminRoutes.delete("/tenants/:id", async (c) => {
  const id = c.req.param("id");

  const tenant = await db
    .selectFrom("tenants")
    .select(["id", "name", "slug"])
    .where("id", "=", id)
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

  await db.transaction().execute(async (trx) => {
    await trx.deleteFrom("device_actions").where("tenant_id", "=", id).execute();
    await trx.deleteFrom("devices").where("tenant_id", "=", id).execute();
    await trx.deleteFrom("device_groups").where("tenant_id", "=", id).execute();
    await trx.deleteFrom("tenant_branding").where("tenant_id", "=", id).execute();
    await trx.deleteFrom("feature_flags").where("tenant_id", "=", id).execute();
    await trx.deleteFrom("subscriptions").where("tenant_id", "=", id).execute();
    await trx.deleteFrom("audit_logs").where("tenant_id", "=", id).execute();
    await trx.deleteFrom("memberships").where("tenant_id", "=", id).execute();
    await trx.deleteFrom("tenants").where("id", "=", id).execute();
  });

  return c.json({
    success: true,
    deleted: tenant
  });
});

platformAdminRoutes.get("/users", async (c) => {
  const users = await db
    .selectFrom("users")
    .select([
      "id",
      "email",
      "first_name",
      "last_name",
      "status",
      "platform_role",
      "created_at",
      "updated_at"
    ])
    .orderBy("created_at", "desc")
    .execute();

  return c.json({
    success: true,
    users
  });
});

platformAdminRoutes.delete("/users/:id", async (c) => {
  const id = c.req.param("id");
  const currentUser = c.get("user");

  if (currentUser.id === id) {
    return c.json(
      {
        success: false,
        error: "cannot_delete_self"
      },
      400
    );
  }

  const user = await db
    .selectFrom("users")
    .select(["id", "email"])
    .where("id", "=", id)
    .executeTakeFirst();

  if (!user) {
    return c.json(
      {
        success: false,
        error: "user_not_found"
      },
      404
    );
  }

  await db.transaction().execute(async (trx) => {
    await trx.deleteFrom("email_verification_tokens").where("user_id", "=", id).execute();
    await trx.deleteFrom("password_reset_tokens").where("user_id", "=", id).execute();
    await trx.deleteFrom("sessions").where("user_id", "=", id).execute();
    await trx.deleteFrom("audit_logs").where("user_id", "=", id).execute();
    await trx.deleteFrom("memberships").where("user_id", "=", id).execute();
    await trx.deleteFrom("users").where("id", "=", id).execute();
  });

  return c.json({
    success: true,
    deleted: user
  });
});
