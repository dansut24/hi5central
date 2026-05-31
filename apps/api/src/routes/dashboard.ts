import { Hono } from "hono";

import { db } from "../lib/db";

export const dashboardRoutes = new Hono();

const ONLINE_THRESHOLD_MS = 2 * 60 * 1000;
const WARNING_THRESHOLD_MS = 10 * 60 * 1000;

function getComputedStatus(lastSeenAt: Date | string | null) {
  if (!lastSeenAt) {
    return "offline";
  }

  const lastSeen = new Date(lastSeenAt);
  const diffMs = Date.now() - lastSeen.getTime();

  if (diffMs <= ONLINE_THRESHOLD_MS) {
    return "online";
  }

  if (diffMs <= WARNING_THRESHOLD_MS) {
    return "warning";
  }

  return "offline";
}

dashboardRoutes.get("/metrics", async (c) => {
  const devices = await db
    .selectFrom("devices")
    .select(["id", "last_seen_at"])
    .execute();

  const statuses = devices.map((device) => getComputedStatus(device.last_seen_at));

  const totalDevices = statuses.length;
  const onlineDevices = statuses.filter((status) => status === "online").length;
  const offlineDevices = statuses.filter((status) => status === "offline").length;
  const warningDevices = statuses.filter((status) => status === "warning").length;

  return c.json({
    success: true,
    metrics: {
      totalDevices,
      onlineDevices,
      offlineDevices,
      warningDevices
    }
  });
});
