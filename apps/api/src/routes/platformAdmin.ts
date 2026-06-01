import { Hono } from "hono";

import { db } from "../lib/db";
import { requireAuth, type AuthContext } from "../middleware/session";
import { requirePlatformAdmin } from "../middleware/platformAdmin";

export const platformAdminRoutes = new Hono<AuthContext>();

platformAdminRoutes.use("*", requireAuth);
platformAdminRoutes.use("*", requirePlatformAdmin);



platformAdminRoutes.get("/dashboard", async (c) => {
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [
    tenants,
    activeTenants,
    trialTenants,
    suspendedTenants,
    users,
    activeUsers,
    platformAdmins,
    recentTenants,
    recentUsers,
    auditEvents
  ] = await Promise.all([
    db.selectFrom("tenants").select(({ fn }) => fn.count("id").as("count")).executeTakeFirst(),
    db.selectFrom("tenants").select(({ fn }) => fn.count("id").as("count")).where("status", "=", "active").executeTakeFirst(),
    db.selectFrom("tenants").select(({ fn }) => fn.count("id").as("count")).where("plan", "=", "trial").executeTakeFirst(),
    db.selectFrom("tenants").select(({ fn }) => fn.count("id").as("count")).where("status", "=", "suspended").executeTakeFirst(),
    db.selectFrom("users").select(({ fn }) => fn.count("id").as("count")).executeTakeFirst(),
    db.selectFrom("users").select(({ fn }) => fn.count("id").as("count")).where("status", "=", "active").executeTakeFirst(),
    db.selectFrom("users").select(({ fn }) => fn.count("id").as("count")).where("platform_role", "=", "platform_admin").executeTakeFirst(),
    db.selectFrom("tenants").select(({ fn }) => fn.count("id").as("count")).where("created_at", ">", since7d).executeTakeFirst(),
    db.selectFrom("users").select(({ fn }) => fn.count("id").as("count")).where("created_at", ">", since7d).executeTakeFirst(),
    db.selectFrom("audit_logs").select(({ fn }) => fn.count("id").as("count")).where("created_at", ">", since24h).executeTakeFirst()
  ]);

  return c.json({
    success: true,
    metrics: {
      tenants: Number(tenants?.count ?? 0),
      active_tenants: Number(activeTenants?.count ?? 0),
      trial_tenants: Number(trialTenants?.count ?? 0),
      suspended_tenants: Number(suspendedTenants?.count ?? 0),
      users: Number(users?.count ?? 0),
      active_users: Number(activeUsers?.count ?? 0),
      platform_admins: Number(platformAdmins?.count ?? 0),
      new_tenants_7d: Number(recentTenants?.count ?? 0),
      new_users_7d: Number(recentUsers?.count ?? 0),
      audit_events_24h: Number(auditEvents?.count ?? 0)
    }
  });
});

platformAdminRoutes.get("/audit-logs", async (c) => {
  const logs = await db
    .selectFrom("audit_logs")
    .selectAll()
    .orderBy("created_at", "desc")
    .limit(200)
    .execute();

  return c.json({
    success: true,
    logs
  });
});

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
