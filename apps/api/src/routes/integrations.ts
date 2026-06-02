import { Hono } from "hono";

import { db } from "../lib/db";
import { requireAuth, type AuthContext } from "../middleware/session";

export const integrationsRoutes = new Hono<AuthContext>();

integrationsRoutes.use("*", requireAuth);

const catalogue = [
  { provider: "openai", category: "ai", display_name: "OpenAI" },
  { provider: "anthropic", category: "ai", display_name: "Anthropic Claude" },
  { provider: "azure-openai", category: "ai", display_name: "Azure OpenAI" },
  { provider: "ollama", category: "ai", display_name: "Ollama / Local AI" },

  { provider: "hi5central", category: "remote", display_name: "Hi5Central Remote Control" },
  { provider: "screenconnect", category: "remote", display_name: "ScreenConnect / ConnectWise Control" },
  { provider: "splashtop", category: "remote", display_name: "Splashtop" },
  { provider: "rustdesk", category: "remote", display_name: "RustDesk" },

  { provider: "halopsa", category: "psa", display_name: "HaloPSA" },
  { provider: "autotask", category: "psa", display_name: "Autotask" },
  { provider: "connectwise-psa", category: "psa", display_name: "ConnectWise PSA" },

  { provider: "microsoft-365", category: "identity", display_name: "Microsoft 365 / Entra ID" },
  { provider: "google-workspace", category: "identity", display_name: "Google Workspace" },

  { provider: "teams", category: "messaging", display_name: "Microsoft Teams" },
  { provider: "slack", category: "messaging", display_name: "Slack" },

  { provider: "smtp", category: "email", display_name: "SMTP Email" },
  { provider: "imap", category: "email", display_name: "IMAP Email-to-Ticket" },

  { provider: "s3", category: "storage", display_name: "S3 Compatible Storage" },
  { provider: "minio", category: "storage", display_name: "MinIO" }
];

function getTenantId(c: any) {
  const memberships = c.get("memberships") ?? [];
  const first = memberships[0];

  return first?.tenant_id ?? first?.tenantId ?? null;
}

integrationsRoutes.get("/catalogue", (c) => {
  return c.json({
    success: true,
    catalogue
  });
});

integrationsRoutes.get("/", async (c) => {
  const tenantId = getTenantId(c);

  if (!tenantId) {
    return c.json({ success: false, error: "tenant_not_found" }, 404);
  }

  const integrations = await db
    .selectFrom("tenant_integrations")
    .select([
      "id",
      "tenant_id",
      "provider",
      "category",
      "display_name",
      "enabled",
      "created_at",
      "updated_at"
    ])
    .where("tenant_id", "=", tenantId)
    .orderBy("category", "asc")
    .orderBy("display_name", "asc")
    .execute();

  return c.json({
    success: true,
    catalogue,
    integrations
  });
});

integrationsRoutes.post("/:provider/toggle", async (c) => {
  const tenantId = getTenantId(c);
  const provider = c.req.param("provider");
  const body = await c.req.json().catch(() => ({}));
  const enabled = Boolean(body.enabled);

  if (!tenantId) {
    return c.json({ success: false, error: "tenant_not_found" }, 404);
  }

  const item = catalogue.find((entry) => entry.provider === provider);

  if (!item) {
    return c.json({ success: false, error: "provider_not_found" }, 404);
  }

  const existing = await db
    .selectFrom("tenant_integrations")
    .select(["id"])
    .where("tenant_id", "=", tenantId)
    .where("provider", "=", provider)
    .executeTakeFirst();

  if (existing) {
    const integration = await db
      .updateTable("tenant_integrations")
      .set({
        enabled,
        updated_at: new Date()
      })
      .where("id", "=", existing.id)
      .returning([
        "id",
        "tenant_id",
        "provider",
        "category",
        "display_name",
        "enabled",
        "created_at",
        "updated_at"
      ])
      .executeTakeFirst();

    return c.json({
      success: true,
      integration
    });
  }

  const integration = await db
    .insertInto("tenant_integrations")
    .values({
      tenant_id: tenantId,
      provider: item.provider,
      category: item.category,
      display_name: item.display_name,
      enabled
    })
    .returning([
      "id",
      "tenant_id",
      "provider",
      "category",
      "display_name",
      "enabled",
      "created_at",
      "updated_at"
    ])
    .executeTakeFirst();

  return c.json({
    success: true,
    integration
  });
});
