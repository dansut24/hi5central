import { db } from "../db";
import { decryptSecret } from "../encryption";

import { generateWithOpenAI } from "./openai";

export async function generateAiResponse({
  tenantId,
  prompt
}: {
  tenantId: string;
  prompt: string;
}) {
  const settings = await db
    .selectFrom("tenant_ai_settings")
    .select([
      "provider",
      "enabled",
      "model",
      "api_key_encrypted",
      "system_prompt"
    ])
    .where("tenant_id", "=", tenantId)
    .executeTakeFirst();

  if (!settings || !settings.enabled || settings.provider === "disabled") {
    throw new Error("ai_disabled");
  }

  if (!settings.api_key_encrypted && settings.provider !== "ollama") {
    throw new Error("ai_api_key_missing");
  }

  if (settings.provider === "openai") {
    return generateWithOpenAI({
      prompt,
      systemPrompt: settings.system_prompt,
      model: settings.model,
      apiKey: decryptSecret(settings.api_key_encrypted || "")
    });
  }

  throw new Error(`ai_provider_not_supported:${settings.provider}`);
}
