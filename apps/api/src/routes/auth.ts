import { Hono } from "hono";
import { verifyPassword } from "@hi5central/auth";

import { db } from "../lib/db";
import { setSessionCookie } from "../lib/cookies";
import { createSession } from "../lib/sessions";
import { writeAuditLog } from "../lib/audit";
import { requireAuth, type AuthContext } from "../middleware/session";

export const authRoutes = new Hono<AuthContext>();

authRoutes.post("/login", async (c) => {
  const body = await c.req.json().catch(() => null);

  const email = String(body?.email ?? "").toLowerCase().trim();
  const password = String(body?.password ?? "");

  const ipAddress = c.req.header("x-forwarded-for") ?? null;
  const userAgent = c.req.header("user-agent") ?? null;

  if (!email || !password) {
    return c.json({ success: false }, 400);
  }

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();

  if (!user || user.status !== "active") {
    return c.json({ success: false }, 401);
  }

  const validPassword = await verifyPassword(user.password_hash, password);

  if (!validPassword) {
    await writeAuditLog({
      userId: user.id,
      action: "auth.login_failed",
      ipAddress,
      userAgent,
      metadata: { reason: "invalid_password" }
    });

    return c.json({ success: false }, 401);
  }

  const session = await createSession({
    userId: user.id,
    ipAddress,
    userAgent
  });

  setSessionCookie(c, session.token);

  await writeAuditLog({
    userId: user.id,
    action: "auth.login_success",
    ipAddress,
    userAgent
  });

  return c.json({
    success: true
  });
});

authRoutes.get("/me", requireAuth, (c) => {
  return c.json({
    success: true,
    user: c.get("user"),
    memberships: c.get("memberships"),
    tenantIds: c.get("tenantIds"),
    roles: c.get("roles")
  });
});
