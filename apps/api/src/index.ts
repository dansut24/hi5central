import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { db } from "./lib/db";
import { healthRoutes } from "./routes/health";
import { authRoutes } from "./routes/auth";
import { devicesRouter } from "./routes/devices";
import { dashboardRoutes } from "./routes/dashboard";
import { agentRoutes } from "./routes/agent";
import { heartbeatRoutes } from "./routes/heartbeat";

const app = new Hono();

app.use("*", async (c, next) => {
  c.header("Access-Control-Allow-Origin", "https://hi5central.vercel.app");
  c.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (c.req.method === "OPTIONS") {
    return c.body(null, 204);
  }

  await next();
});

app.route("/", healthRoutes);
app.route("/auth", authRoutes);
app.route("/devices", devicesRouter);
app.route("/dashboard", dashboardRoutes);
app.route("/agent", agentRoutes);
app.route("/agent/heartbeat", heartbeatRoutes);

app.get("/ready", async (c) => {
  try {
    await db
      .selectFrom("tenants")
      .select("id")
      .limit(1)
      .execute();

    return c.json({
      status: "ready",
      database: true
    });
  } catch {
    return c.json(
      {
        status: "not_ready",
        database: false
      },
      503
    );
  }
});

const port = Number(process.env.PORT ?? 3001);

serve({
  fetch: app.fetch,
  port
});

console.log(`Hi5Central API listening on port ${port}`);
