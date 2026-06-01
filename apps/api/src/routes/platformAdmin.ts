import { Hono } from "hono";

import { db } from "../lib/db";

export const platformAdminRoutes = new Hono();

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

  await db
    .deleteFrom("tenants")
    .where("id", "=", id)
    .execute();

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

  await db
    .deleteFrom("users")
    .where("id", "=", id)
    .execute();

  return c.json({
    success: true,
    deleted: user
  });
});
