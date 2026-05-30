export interface TenantsTable {
  id: string;
  name: string;
  slug: string;
  plan: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface UsersTable {
  id: string;
  email: string;
  password_hash: string;
  first_name: string | null;
  last_name: string | null;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface MembershipsTable {
  id: string;
  tenant_id: string;
  user_id: string;
  role: string;
  created_at: Date;
}

export interface SessionsTable {
  id: string;
  user_id: string;
  session_token_hash: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: Date;
  expires_at: Date;
  last_activity_at: Date | null;
  revoked_at: Date | null;
}

export interface EmailVerificationTokensTable {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  created_at: Date;
  used_at: Date | null;
}

export interface PasswordResetTokensTable {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  created_at: Date;
  used_at: Date | null;
}

export interface AuditLogsTable {
  id: string;
  tenant_id: string | null;
  user_id: string | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  metadata: Record<string, unknown>;
  created_at: Date;
}

export interface SubscriptionsTable {
  id: string;
  tenant_id: string;
  plan: string;
  status: string;
  renewal_date: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface FeatureFlagsTable {
  id: string;
  tenant_id: string;
  feature_name: string;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface TenantBrandingTable {
  id: string;
  tenant_id: string;
  company_name: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  primary_colour: string | null;
  secondary_colour: string | null;
  viewer_name: string | null;
  viewer_icon_url: string | null;
  agent_name: string | null;
  support_exe_name: string | null;
  custom_domain: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Database {
  tenants: TenantsTable;
  users: UsersTable;
  memberships: MembershipsTable;
  sessions: SessionsTable;
  email_verification_tokens: EmailVerificationTokensTable;
  password_reset_tokens: PasswordResetTokensTable;
  audit_logs: AuditLogsTable;
  subscriptions: SubscriptionsTable;
  feature_flags: FeatureFlagsTable;
  tenant_branding: TenantBrandingTable;
}
