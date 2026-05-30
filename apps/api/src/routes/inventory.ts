import { Hono } from "hono";

import { db } from "../lib/db";

export const inventoryRoutes = new Hono();

inventoryRoutes.post("/", async (c) => {
  const body = await c.req.json().catch(() => null);

  const deviceId = String(body?.deviceId ?? "").trim();

  if (!deviceId) {
    return c.json(
      {
        success: false,
        error: "device_id_required"
      },
      400
    );
  }

  const device = await db
    .selectFrom("devices")
    .select("id")
    .where("id", "=", deviceId)
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

  await db
    .updateTable("devices")
    .set({
      cpu: body?.cpu ?? null,
      ram_gb: body?.ramGb ?? null,
      disk_gb: body?.diskGb ?? null,
      gpu: body?.gpu ?? null,
      logged_in_user: body?.loggedInUser ?? null,
      bitlocker_enabled: body?.bitlockerEnabled ?? null,
      tpm_version: body?.tpmVersion ?? null,
      updated_at: new Date()
    })
    .where("id", "=", deviceId)
    .execute();

  return c.json({
    success: true
  });
});
