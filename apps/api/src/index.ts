import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { db } from "./lib/db";
import { healthRoutes } from "./routes/health";
import { authRoutes } from "./routes/auth";
import { devicesRouter } from "./routes/devices";

const app = new Hono();

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  "*",
  cors({
    origin: (origin) => {
      if (!origin) return origin;
      if (allowedOrigins.includes(origin)) return origin;
      return allowedOrigins[0] ?? origin;
    },
    credentials: true
  })
);

app.route("/", healthRoutes);
app.route("/auth", authRoutes);
app.route("/devices", devicesRouter);

app.get("/ready", async (c) => {
  try {
    await db.selectFrom("tenants").select("id").limit(1).execute();

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
