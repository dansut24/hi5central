import { db } from "./db";

type AuditInput = {
  tenantId?: string | null;
  userId?: string | null;
  action: string;
  resourceType?: string | null;
  resourceId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, unknown>;
};

export async function writeAuditLog(input: AuditInput) {
  await db
    .insertInto("audit_logs")
    .values({
      tenant_id: input.tenantId ?? null,
      user_id: input.userId ?? null,
      action: input.action,
      resource_type: input.resourceType ?? null,
      resource_id: input.resourceId ?? null,
      ip_address: input.ipAddress ?? null,
      user_agent: input.userAgent ?? null,
      metadata: input.metadata ?? {},
      created_at: new Date()
    })
    .execute();
}
