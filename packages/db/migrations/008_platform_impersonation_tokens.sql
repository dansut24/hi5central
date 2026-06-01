CREATE TABLE IF NOT EXISTS platform_impersonation_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash TEXT NOT NULL UNIQUE,
  platform_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  impersonated_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_platform_impersonation_tokens_hash
ON platform_impersonation_tokens(token_hash);

CREATE INDEX IF NOT EXISTS idx_platform_impersonation_tokens_tenant
ON platform_impersonation_tokens(tenant_id);
