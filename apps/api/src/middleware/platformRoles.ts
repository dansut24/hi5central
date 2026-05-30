import { createMiddleware } from "hono/factory";

import type { AuthContext } from "./session";

const platformRoleRank = {
  platform_support: 1,
  platform_admin: 2
} as const;

export type PlatformRole = keyof typeof platformRoleRank;

function hasPlatformRoleAtLeast(
  userPlatformRole: string | null,
  requiredRole: PlatformRole
) {
  if (!userPlatformRole) {
    return false;
  }

  const userRank = platformRoleRank[userPlatformRole as PlatformRole] ?? 0;
  const requiredRank = platformRoleRank[requiredRole] ?? 0;

  return userRank >= requiredRank;
}

export function requirePlatformRole(requiredRole: PlatformRole) {
  return createMiddleware<AuthContext>(async (c, next) => {
    const user = c.get("user");

    const allowed = hasPlatformRoleAtLeast(
      user.platformRole,
      requiredRole
    );

    if (!allowed) {
      return c.json(
        {
          success: false,
          error: "platform_forbidden"
        },
        403
      );
    }

    await next();
  });
}
