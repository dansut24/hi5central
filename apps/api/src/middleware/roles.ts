import { createMiddleware } from "hono/factory";

import type { AuthContext } from "./session";

const roleRank = {
  readonly: 1,
  technician: 2,
  admin: 3,
  owner: 4
} as const;

export type TenantRole = keyof typeof roleRank;

function hasRoleAtLeast(userRole: string, requiredRole: TenantRole) {
  const userRank = roleRank[userRole as TenantRole] ?? 0;
  const requiredRank = roleRank[requiredRole] ?? 0;

  return userRank >= requiredRank;
}

export function requireRole(requiredRole: TenantRole) {
  return createMiddleware<AuthContext>(async (c, next) => {
    const roles = c.get("roles") ?? [];

    const allowed = roles.some((role) => hasRoleAtLeast(role, requiredRole));

    if (!allowed) {
      return c.json(
        {
          success: false,
          error: "forbidden"
        },
        403
      );
    }

    await next();
  });
}
