import { Hono } from "hono";

import { generateAiResponse } from "../lib/ai";
import { requireAuth, type AuthContext } from "../middleware/session";

export const aiRoutes = new Hono<AuthContext>();

aiRoutes.use("*", requireAuth);

function getTenantId(c: any) {
  const memberships = c.get("memberships") ?? [];
  const first = memberships[0];

  return first?.tenant_id ?? first?.tenantId ?? null;
}

aiRoutes.post("/test", async (c) => {
  const tenantId = getTenantId(c);

  if (!tenantId) {
    return c.json({ success: false, error: "tenant_not_found" }, 404);
  }

  try {
    const result = await generateAiResponse({
      tenantId,
      prompt: "Reply with exactly: Hi5Central AI connection successful."
    });

    return c.json({
      success: true,
      result
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "ai_test_failed"
      },
      400
    );
  }
});
