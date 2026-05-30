import { getCurrentUser } from "./currentUser";

export async function requireCurrentUser() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      authenticated: false,
      redirectTo: "/login"
    };
  }

  return {
    authenticated: true,
    currentUser
  };
}
