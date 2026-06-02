import OpenAI from "openai";

import type { AiGenerateInput, AiGenerateResult } from "./types";

export async function generateWithOpenAI(input: AiGenerateInput): Promise<AiGenerateResult> {
  const model = input.model || "gpt-5";

  const client = new OpenAI({
    apiKey: input.apiKey
  });

  const response = await client.responses.create({
    model,
    input: [
      {
        role: "system",
        content: input.systemPrompt || "You are a helpful IT support assistant."
      },
      {
        role: "user",
        content: input.prompt
      }
    ]
  });

  return {
    text: response.output_text || "",
    provider: "openai",
    model
  };
}
