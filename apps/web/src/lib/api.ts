const API_BASE_URL =
  import.meta.env.PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export async function apiFetch(path: string, options: RequestInit = {}) {
  return fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    }
  });
}
