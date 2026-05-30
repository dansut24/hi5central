import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { hashToken } from "@hi5central/auth";

import { db } from "../lib/db";
import { SESSION_COOKIE } from "../lib/cookies";

export type AuthUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  status: string;
  platformRole: string | null;
};

export type AuthMembership = {
  id: string;
  tenantId: string;
  role: string;
};

export type AuthSession = {
  id: string;
  userId: string;
  expiresAt: Date;
};

export type AuthContext = {
  Variables: {
    user: AuthUser;
    session: AuthSession;
    memberships: AuthMembership[];
    tenantIds: string[];
    roles: string[];
  };
};

export const requireAuth = createMiddleware<AuthContext>(async (c, next) => {
  const token = getCookie(c, SESSION_COOKIE);

  if (!token) {
    return c.json(
      {
        success: false,
        error: "unauthorized"
      },
      401
    );
  }

  const tokenHash = hashToken(token);

  const session = await db
    .selectFrom("sessions")
    .selectAll()
    .where("session_token_hash", "=", tokenHash)
    .executeTakeFirst();

  if (!session) {
    return c.json(
      {
        success: false,
        error: "unauthorized"
      },
      401
    );
  }

  if (session.revoked_at) {
    return c.json(
      {
        success: false,
        error: "unauthorized"
      },
      401
    );
  }

  if (session.expires_at < new Date()) {
    return c.json(
      {
        success: false,
        error: "unauthorized"
      },
      401
    );
  }

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", session.user_id)
    .executeTakeFirst();

  if (!user || user.status !== "active") {
    return c.json(
      {
        success: false,
        error: "unauthorized"
      },
      401
    );
  }

  const memberships = await db
    .selectFrom("memberships")
    .selectAll()
    .where("user_id", "=", user.id)
    .execute();

  c.set("session", {
    id: session.id,
    userId: session.user_id,
    expiresAt: session.expires_at
  });

  c.set("user", {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    status: user.status,
    platformRole: user.platform_role
  });

  c.set(
    "memberships",
    memberships.map((membership) => ({
      id: membership.id,
      tenantId: membership.tenant_id,
      role: membership.role
    }))
  );

  c.set(
    "tenantIds",
    memberships.map((membership) => membership.tenant_id)
  );

  c.set(
    "roles",
    memberships.map((membership) => membership.role)
  );

  await next();
});
