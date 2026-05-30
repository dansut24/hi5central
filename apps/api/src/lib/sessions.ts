import { generateToken, hashToken } from "@hi5central/auth";

import { db } from "./db";

const SESSION_DAYS = 14;

export async function createSession(input: {
  userId: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}) {
  const token = generateToken(32);
  const tokenHash = hashToken(token);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DAYS);

  await db
    .insertInto("sessions")
    .values({
      user_id: input.userId,
      session_token_hash: tokenHash,
      ip_address: input.ipAddress ?? null,
      user_agent: input.userAgent ?? null,
      created_at: new Date(),
      expires_at: expiresAt,
      last_activity_at: new Date(),
      revoked_at: null
    })
    .execute();

  return {
    token,
    expiresAt
  };
}
