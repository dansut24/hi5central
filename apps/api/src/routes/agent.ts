import { Hono } from "hono";

import { db } from "../lib/db";

export const agentRoutes = new Hono();

agentRoutes.post("/enroll", async (c) => {
  const body = await c.req.json().catch(() => null);

  const tenantSlug = String(body?.tenantSlug ?? "").trim();
  const deviceName = String(body?.deviceName ?? "").trim();
  const hostname = String(body?.hostname ?? "").trim();
  const operatingSystem = String(body?.operatingSystem ?? "").trim();
  const osVersion = body?.osVersion ? String(body.osVersion).trim() : null;
  const agentVersion = body?.agentVersion ? String(body.agentVersion).trim() : null;
  const publicIp = body?.publicIp ? String(body.publicIp).trim() : null;
  const localIp = body?.localIp ? String(body.localIp).trim() : null;

  if (!tenantSlug || !deviceName || !hostname || !operatingSystem) {
    return c.json(
      {
        success: false,
        error: "invalid_request"
      },
      400
    );
  }

  const tenant = await db
    .selectFrom("tenants")
    .selectAll()
    .where("slug", "=", tenantSlug)
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

  const existingDevice = await db
    .selectFrom("devices")
    .selectAll()
    .where("tenant_id", "=", tenant.id)
    .where("hostname", "=", hostname)
    .executeTakeFirst();

  const now = new Date();

  if (existingDevice) {
    const updatedDevice = await db
      .updateTable("devices")
      .set({
        device_name: deviceName,
        operating_system: operatingSystem,
        os_version: osVersion,
        agent_version: agentVersion,
        public_ip: publicIp,
        local_ip: localIp,
        status: "online",
        last_seen_at: now,
        updated_at: now
      })
      .where("id", "=", existingDevice.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return c.json({
      success: true,
      action: "updated",
      device: updatedDevice
    });
  }

  const createdDevice = await db
    .insertInto("devices")
    .values({
      tenant_id: tenant.id,
      device_name: deviceName,
      hostname,
      operating_system: operatingSystem,
      os_version: osVersion,
      agent_version: agentVersion,
      public_ip: publicIp,
      local_ip: localIp,
      status: "online",
      last_seen_at: now
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return c.json({
    success: true,
    action: "created",
    device: createdDevice
  });
});
