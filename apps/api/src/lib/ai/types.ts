export type AiGenerateInput = {
  prompt: string;
  systemPrompt?: string | null;
  model?: string | null;
  apiKey: string;
};

export type AiGenerateResult = {
  text: string;
  provider: string;
  model: string;
};
