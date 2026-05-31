import { Hono } from "hono";

import { db } from "../lib/db";

export const devicesRouter = new Hono();

const ONLINE_THRESHOLD_MS = 2 * 60 * 1000;
const WARNING_THRESHOLD_MS = 10 * 60 * 1000;

function getDeviceHealth(lastSeenAt: Date | string | null) {
  if (!lastSeenAt) {
    return {
      computed_status: "offline",
      minutes_since_seen: null
    };
  }

  const lastSeen = new Date(lastSeenAt);
  const diffMs = Date.now() - lastSeen.getTime();
  const minutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMs <= ONLINE_THRESHOLD_MS) {
    return {
      computed_status: "online",
      minutes_since_seen: minutes
    };
  }

  if (diffMs <= WARNING_THRESHOLD_MS) {
    return {
      computed_status: "warning",
      minutes_since_seen: minutes
    };
  }

  return {
    computed_status: "offline",
    minutes_since_seen: minutes
  };
}

function withDeviceHealth<T extends { last_seen_at: Date | string | null }>(device: T) {
  const health = getDeviceHealth(device.last_seen_at);

  return {
    ...device,
    status: health.computed_status,
    computed_status: health.computed_status,
    minutes_since_seen: health.minutes_since_seen
  };
}

devicesRouter.get("/", async (c) => {
  const devices = await db
    .selectFrom("devices")
    .selectAll()
    .orderBy("device_name")
    .execute();

  return c.json({
    success: true,
    devices: devices.map(withDeviceHealth)
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
    device: withDeviceHealth(device)
  });
});
