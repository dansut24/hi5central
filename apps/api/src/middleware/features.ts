import { createMiddleware } from "hono/factory";

import { db } from "../lib/db";
import type { AuthContext } from "./session";

export function requireFeature(featureName: string) {
  return createMiddleware<AuthContext>(async (c, next) => {
    const tenantIds = c.get("tenantIds") ?? [];

    if (tenantIds.length === 0) {
      return c.json(
        {
          success: false,
          error: "forbidden"
        },
        403
      );
    }

    const feature = await db
      .selectFrom("feature_flags")
      .selectAll()
      .where("feature_name", "=", featureName)
      .where("enabled", "=", true)
      .where("tenant_id", "in", tenantIds)
      .executeTakeFirst();

    if (!feature) {
      return c.json(
        {
          success: false,
          error: "feature_not_enabled"
        },
        403
      );
    }

    await next();
  });
}
