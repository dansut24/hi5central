import { useEffect, useState } from "react";

const API_BASE_URL =
  "https://shiny-space-giggle-r46gpwvqgqj9hgv6-3001.app.github.dev";

const fallbackMetrics = [
  { label: "Total Devices", value: "—", detail: "Loading device inventory" },
  { label: "Online Devices", value: "—", detail: "Loading device status" },
  { label: "Warning Devices", value: "—", detail: "Loading warnings" },
  { label: "Offline Devices", value: "—", detail: "Loading offline devices" }
];

export default function DashboardMetricsClient() {
  const [metrics, setMetrics] = useState(fallbackMetrics);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const response = await fetch(`${API_BASE_URL}/dashboard/metrics`);

        if (!response.ok) {
          throw new Error("Failed to load dashboard metrics");
        }

        const data = await response.json();
        const apiMetrics = data.metrics;

        setMetrics([
          {
            label: "Total Devices",
            value: String(apiMetrics.totalDevices),
            detail: "From live device inventory"
          },
          {
            label: "Online Devices",
            value: String(apiMetrics.onlineDevices),
            detail: "Currently reachable"
          },
          {
            label: "Warning Devices",
            value: String(apiMetrics.warningDevices),
            detail: "Need attention"
          },
          {
            label: "Offline Devices",
            value: String(apiMetrics.offlineDevices),
            detail: "Not currently reachable"
          }
        ]);
      } catch {
        setMetrics([
          { label: "Total Devices", value: "128", detail: "Demo fallback" },
          { label: "Online Devices", value: "114", detail: "Demo fallback" },
          { label: "Patch Exposure", value: "23", detail: "Demo fallback" },
          { label: "Active Sessions", value: "4", detail: "Demo fallback" }
        ]);
      }
    }

    loadMetrics();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-3xl border p-5 shadow-[var(--hi5-shadow)]"
          style={{
            background: "var(--hi5-card)",
            borderColor: "var(--hi5-border)"
          }}
        >
          <p className="text-sm font-bold" style={{ color: "var(--hi5-muted)" }}>
            {metric.label}
          </p>

          <p className="mt-2 text-3xl font-black" style={{ color: "var(--hi5-fg)" }}>
            {metric.value}
          </p>

          <p className="mt-1 text-sm" style={{ color: "var(--hi5-muted)" }}>
            {metric.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
