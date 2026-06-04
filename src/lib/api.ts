/**
 * Client-side API helper for the dashboard backends.
 *
 * The frontend is fully static. Dashboards fetch their data at runtime, in the
 * browser, from a Rust backend you host and containerize yourself. Point them
 * at it with PUBLIC_API_BASE (see .env.example). Anything PUBLIC_-prefixed is
 * inlined into the client bundle by Astro/Vite — never put secrets here.
 */

export const API_BASE: string = (
  import.meta.env.PUBLIC_API_BASE ?? "http://localhost:8080"
).replace(/\/+$/, "");

export function apiUrl(path: string): string {
  return `${API_BASE}/${path.replace(/^\/+/, "")}`;
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Fetch JSON with a timeout. Throws ApiError on any failure. */
export async function fetchJSON<T>(
  path: string,
  { timeoutMs = 8000, signal }: { timeoutMs?: number; signal?: AbortSignal } = {},
): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  if (signal) signal.addEventListener("abort", () => ctrl.abort());

  try {
    const res = await fetch(apiUrl(path), {
      headers: { accept: "application/json" },
      signal: ctrl.signal,
    });
    if (!res.ok) {
      throw new ApiError(`request failed (${res.status})`, res.status);
    }
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      err instanceof Error ? err.message : "network error",
    );
  } finally {
    clearTimeout(timer);
  }
}
