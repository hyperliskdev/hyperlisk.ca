/**
 * Dashboard registry.
 *
 * Each entry describes one dashboard surfaced on the site. `endpoint` is the
 * path (relative to PUBLIC_API_BASE) your Rust backend serves. The expected
 * JSON contract is `DashboardPayload` below — implement that shape on the
 * backend and the front-end renders it with zero extra wiring.
 *
 * Add a dashboard: append an entry here, then implement the endpoint.
 */

export interface Metric {
  label: string;
  value: number | string;
  unit?: string;
  /** -1 down, 0 flat, 1 up — drives the little trend arrow. Optional. */
  trend?: -1 | 0 | 1;
}

export interface DashboardPayload {
  /** ISO-8601 timestamp of when the backend computed this. */
  updatedAt: string;
  metrics: Metric[];
  /** Optional free-form note shown under the metrics. */
  note?: string;
}

export interface DashboardDef {
  slug: string;
  title: string;
  description: string;
  /** Path on your Rust backend, relative to PUBLIC_API_BASE. */
  endpoint: string;
  /** Auto-refresh interval in seconds. 0 = fetch once. */
  refreshSeconds: number;
}

export const dashboards: DashboardDef[] = [
];

export function getDashboard(slug: string): DashboardDef | undefined {
  return dashboards.find((d) => d.slug === slug);
}
