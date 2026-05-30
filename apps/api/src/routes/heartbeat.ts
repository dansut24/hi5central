import { Hono } from "hono";

import { db } from "../lib/db";

export const heartbeatRoutes = new Hono();

heartbeatRoutes.post("/", async (c) => {
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
    .selectAll()
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

  const now = new Date();

  await db
    .updateTable("devices")
    .set({
      last_seen_at: now,
      status: "online",
      agent_version: body?.agentVersion ?? device.agent_version,
      public_ip: body?.publicIp ?? device.public_ip,
      local_ip: body?.localIp ?? device.local_ip,
      updated_at: now
    })
    .where("id", "=", deviceId)
    .execute();

  return c.json({
    success: true,
    heartbeatAt: now.toISOString()
  });
});
