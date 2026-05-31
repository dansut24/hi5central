import { Hono } from "hono";

import { db } from "../lib/db";

export const actionsRoutes = new Hono();

const allowedActionTypes = new Set([
  "refresh_inventory",
  "reboot",
  "shutdown"
]);

actionsRoutes.post("/devices/:id/actions", async (c) => {
  const deviceId = c.req.param("id");
  const body = await c.req.json().catch(() => ({}));

  const actionType = String(body.action_type ?? "");
  const payload = body.payload && typeof body.payload === "object" ? body.payload : {};

  if (!allowedActionTypes.has(actionType)) {
    return c.json(
      {
        success: false,
        error: "invalid_action_type"
      },
      400
    );
  }

  const device = await db
    .selectFrom("devices")
    .select(["id", "tenant_id"])
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

  const action = await db
    .insertInto("device_actions")
    .values({
      tenant_id: device.tenant_id,
      device_id: device.id,
      action_type: actionType,
      payload,
      status: "pending",
      result: {}
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return c.json({
    success: true,
    action
  });
});

actionsRoutes.get("/devices/:id/actions", async (c) => {
  const deviceId = c.req.param("id");

  const actions = await db
    .selectFrom("device_actions")
    .selectAll()
    .where("device_id", "=", deviceId)
    .orderBy("created_at", "desc")
    .limit(50)
    .execute();

  return c.json({
    success: true,
    actions
  });
});

actionsRoutes.get("/agent/devices/:id/actions", async (c) => {
  const deviceId = c.req.param("id");

  const actions = await db
    .selectFrom("device_actions")
    .selectAll()
    .where("device_id", "=", deviceId)
    .where("status", "=", "pending")
    .orderBy("created_at", "asc")
    .limit(5)
    .execute();

  return c.json({
    success: true,
    actions
  });
});

actionsRoutes.post("/agent/actions/:id/start", async (c) => {
  const actionId = c.req.param("id");

  const action = await db
    .updateTable("device_actions")
    .set({
      status: "running",
      started_at: new Date()
    })
    .where("id", "=", actionId)
    .where("status", "=", "pending")
    .returningAll()
    .executeTakeFirst();

  if (!action) {
    return c.json(
      {
        success: false,
        error: "action_not_found_or_not_pending"
      },
      404
    );
  }

  return c.json({
    success: true,
    action
  });
});

actionsRoutes.post("/agent/actions/:id/complete", async (c) => {
  const actionId = c.req.param("id");
  const body = await c.req.json().catch(() => ({}));

  const success = body.success === true;
  const result = body.result && typeof body.result === "object" ? body.result : {};
  const error = typeof body.error === "string" ? body.error : null;

  const action = await db
    .updateTable("device_actions")
    .set({
      status: success ? "completed" : "failed",
      result,
      error,
      completed_at: new Date()
    })
    .where("id", "=", actionId)
    .returningAll()
    .executeTakeFirst();

  if (!action) {
    return c.json(
      {
        success: false,
        error: "action_not_found"
      },
      404
    );
  }

  return c.json({
    success: true,
    action
  });
});
