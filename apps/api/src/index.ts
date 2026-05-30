import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { db } from "./lib/db";
import { healthRoutes } from "./routes/health";
import { authRoutes } from "./routes/auth";
import { devicesRouter } from "./routes/devices";

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
