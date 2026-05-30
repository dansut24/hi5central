import { Hono } from "hono";

import { db } from "../lib/db";

export const dashboardRoutes = new Hono();

dashboardRoutes.get("/metrics", async (c) => {
  const devices = await db
    .selectFrom("devices")
    .selectAll()
    .execute();

  const totalDevices = devices.length;
  const onlineDevices = devices.filter((device) => device.status === "online").length;
  const offlineDevices = devices.filter((device) => device.status === "offline").length;
  const warningDevices = devices.filter((device) => device.status === "warning").length;

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
