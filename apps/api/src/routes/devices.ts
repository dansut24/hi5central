import { Hono } from "hono";

import { db } from "../lib/db";

export const devicesRouter = new Hono();

devicesRouter.get("/", async (c) => {
  const devices = await db
    .selectFrom("devices")
    .selectAll()
    .orderBy("device_name")
    .execute();

  return c.json({
    success: true,
    devices
  });
});

devicesRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const device = await db
    .selectFrom("devices")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  if (!device) {
    return c.json(
      {
        success: false,
        error: "device_not_found"
      },
      404
    );
  }

  return c.json({
    success: true,
    device
  });
});
