import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { db } from "./lib/db";
import { healthRoutes } from "./routes/health";
import { authRoutes } from "./routes/auth";

const app = new Hono();

app.route("/", healthRoutes);
app.route("/auth", authRoutes);

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
