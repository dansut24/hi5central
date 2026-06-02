import type { Generated } from "kysely";

export interface TenantsTable {
  id: Generated<string>;
  name: string;
  slug: string;
  plan: string;
  status: string;
  selected_product: string | null;
  onboarding_completed_at: Date | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface UsersTable {
  id: Generated<string>;
  email: string;
  password_hash: string;
  first_name: string | null;
  last_name: string | null;
  status: string;
  platform_role: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface MembershipsTable {
  id: Generated<string>;
  tenant_id: string;
  user_id: string;
  role: string;
  created_at: Generated<Date>;
}

export interface SessionsTable {
  id: Generated<string>;
  user_id: string;
  session_token_hash: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: Generated<Date>;
  expires_at: Date;
  last_activity_at: Date | null;
  revoked_at: Date | null;
}

export interface EmailVerificationTokensTable {
  id: Generated<string>;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  created_at: Generated<Date>;
  used_at: Date | null;
}

export interface PasswordResetTokensTable {
  id: Generated<string>;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  created_at: Generated<Date>;
  used_at: Date | null;
}

export interface AuditLogsTable {
  id: Generated<string>;
  tenant_id: string | null;
  user_id: string | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  metadata: Record<string, unknown>;
  created_at: Generated<Date>;
}

export interface SubscriptionsTable {
  id: Generated<string>;
  tenant_id: string;
  plan: string;
  status: string;
  renewal_date: Date | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface FeatureFlagsTable {
  id: Generated<string>;
  tenant_id: string;
  feature_name: string;
  enabled: boolean;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface TenantBrandingTable {
  id: Generated<string>;
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
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface DeviceGroupsTable {
  id: Generated<string>;
  tenant_id: string;
  name: string;
  description: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface DevicesTable {
  id: Generated<string>;
  tenant_id: string;
  device_group_id: string | null;
  device_name: string;
  hostname: string;
  operating_system: string;
  os_version: string | null;
  agent_version: string | null;
  status: string;
  last_seen_at: Date | null;
  public_ip: string | null;
  local_ip: string | null;
  cpu: string | null;
  ram_gb: number | null;
  disk_gb: number | null;
  gpu: string | null;
  logged_in_user: string | null;
  bitlocker_enabled: boolean | null;
  tpm_version: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}


export interface DeviceActionsTable {
  id: Generated<string>;
  tenant_id: string;
  device_id: string;
  action_type: string;
  payload: Record<string, unknown>;
  status: string;
  result: Record<string, unknown>;
  error: string | null;
  created_at: Generated<Date>;
  started_at: Date | null;
  completed_at: Date | null;
}


export interface PlatformImpersonationTokensTable {
  id: Generated<string>;
  token_hash: string;
  platform_user_id: string;
  impersonated_user_id: string;
  tenant_id: string;
  expires_at: Date;
  used_at: Date | null;
  created_at: Generated<Date>;
}

export interface TenantIntegrationsTable {
  id: Generated<string>;
  tenant_id: string;
  provider: string;
  category: string;
  display_name: string;
  enabled: boolean;
  configuration_encrypted: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
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
  device_groups: DeviceGroupsTable;
  devices: DevicesTable;
  device_actions: DeviceActionsTable;
  platform_impersonation_tokens: PlatformImpersonationTokensTable;
  tenant_integrations: TenantIntegrationsTable;
}
