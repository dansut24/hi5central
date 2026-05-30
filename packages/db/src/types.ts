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

export interface Database {
  tenants: TenantsTable;
  users: UsersTable;
  memberships: MembershipsTable;
}
