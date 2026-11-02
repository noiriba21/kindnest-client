import { authClient } from "./auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(
  path: string,
  options: RequestInit,
  token?: string
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Cannot reach the server. Please try again in a moment.");
  }
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error(body?.message || "Something went wrong");
  return body as T;
}

// No login needed
export const publicApi = <T>(path: string) => request<T>(path, {});

// Sends the JWT wristband to the server
export async function api<T>(path: string, options: RequestInit = {}) {
  const { data } = await authClient.token();
  if (!data?.token) throw new Error("Please log in again");
  return request<T>(path, options, data.token);
}