import { supabase } from "./supabase";
import { config } from "./config";

const TIMEOUT_MS = 30_000;

async function getAuthHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

async function request<T>(
  method: string,
  endpoint: string,
  body?: unknown,
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const auth = await getAuthHeaders();
  const headers: Record<string, string> = { ...auth };

  const init: RequestInit = {
    method,
    headers,
    signal: controller.signal,
  };

  if (body !== undefined) {
    if (body instanceof FormData) {
      init.body = body;
    } else {
      headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(body);
    }
  }

  const url = `${config.api.baseUrl}${endpoint}`;
  const res = await fetch(url, init);
  clearTimeout(timer);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ApiError(res.status, text || res.statusText);
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return res.json() as Promise<T>;
  }
  return res.text() as unknown as T;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const api = {
  get: <T>(endpoint: string) => request<T>("GET", endpoint),
  post: <T>(endpoint: string, body?: unknown) => request<T>("POST", endpoint, body),
  put: <T>(endpoint: string, body?: unknown) => request<T>("PUT", endpoint, body),
  patch: <T>(endpoint: string, body?: unknown) => request<T>("PATCH", endpoint, body),
  delete: <T>(endpoint: string) => request<T>("DELETE", endpoint),
};
