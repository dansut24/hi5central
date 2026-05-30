import { apiFetch } from "./api";

export type CurrentUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  status: string;
  platformRole: string | null;
};

export type CurrentMembership = {
  id: string;
  tenantId: string;
  role: string;
};

export type CurrentUserResponse = {
  success: boolean;
  user: CurrentUser;
  memberships: CurrentMembership[];
  tenantIds: string[];
  roles: string[];
};

export async function getCurrentUser() {
  const response = await apiFetch("/auth/me");

  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<CurrentUserResponse>;
}
