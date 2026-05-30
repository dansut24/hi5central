import { useEffect, useState } from "react";

const API_BASE_URL =
  "https://shiny-space-giggle-r46gpwvqgqj9hgv6-3001.app.github.dev";

function statusStyle(status) {
  if (status === "online") {
    return {
      background: "color-mix(in srgb, var(--hi5-success) 12%, transparent)",
      color: "var(--hi5-success)",
      borderColor: "color-mix(in srgb, var(--hi5-success) 25%, transparent)"
    };
  }

  if (status === "warning") {
    return {
      background: "color-mix(in srgb, var(--hi5-warning) 12%, transparent)",
      color: "var(--hi5-warning)",
      borderColor: "color-mix(in srgb, var(--hi5-warning) 25%, transparent)"
    };
  }

  return {
    background: "var(--hi5-card-soft)",
    color: "var(--hi5-muted)",
    borderColor: "var(--hi5-border)"
  };
}

function formatDevice(device) {
  return {
    id: device.id,
    name: device.device_name,
    hostname: device.hostname,
    os: `${device.operating_system}${device.os_version ? ` ${device.os_version}` : ""}`,
    status: device.status,
    agent: device.agent_version ?? "Unknown",
    lastSeen: device.last_seen_at ? "Recently" : "Never"
  };
}

export default function DeviceInventoryClient() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDevices() {
      try {
        const response = await fetch(`${API_BASE_URL}/devices`);

        if (!response.ok) {
          throw new Error(`Failed to load devices. Status: ${response.status}`);
        }

        const data = await response.json();
        setDevices((data.devices ?? []).map(formatDevice));
      } catch (error) {
        console.error("Device API load failed:", error);
        setError(`Could not load devices from the API: ${String(error)}`);
      } finally {
        setLoading(false);
      }
    }

    loadDevices();
  }, []);

  if (loading) {
    return (
      <div
        className="rounded-3xl border p-6"
        style={{
          background: "var(--hi5-card)",
          borderColor: "var(--hi5-border)",
          color: "var(--hi5-muted)"
        }}
      >
        Loading devices...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-3xl border p-6"
        style={{
          background: "var(--hi5-card)",
          borderColor: "var(--hi5-border)",
          color: "var(--hi5-muted)"
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <>
      <section
        className="hidden overflow-hidden rounded-3xl border md:block"
        style={{
          background: "var(--hi5-card)",
          borderColor: "var(--hi5-border)"
        }}
      >
        <table className="w-full text-left text-sm">
          <thead
            className="border-b"
            style={{
              background: "var(--hi5-card-soft)",
              borderColor: "var(--hi5-border)",
              color: "var(--hi5-muted)"
            }}
          >
            <tr>
              <th className="px-5 py-4">Device</th>
              <th className="px-5 py-4">Operating System</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Agent</th>
              <th className="px-5 py-4">Last Seen</th>
            </tr>
          </thead>

          <tbody>
            {devices.map((device) => (
              <tr
                key={device.id}
                className="border-b last:border-b-0"
                style={{ borderColor: "var(--hi5-border)" }}
              >
                <td className="px-5 py-4">
                  <a
                    href={`/devices/${device.id}`}
                    className="font-bold hover:underline"
                    style={{ color: "var(--hi5-fg)" }}
                  >
                    {device.name}
                  </a>

                  <p className="text-xs" style={{ color: "var(--hi5-muted)" }}>
                    {device.hostname}
                  </p>
                </td>

                <td className="px-5 py-4" style={{ color: "var(--hi5-muted)" }}>
                  {device.os}
                </td>

                <td className="px-5 py-4">
                  <span
                    className="rounded-full border px-3 py-1 text-xs font-bold capitalize"
                    style={statusStyle(device.status)}
                  >
                    {device.status}
                  </span>
                </td>

                <td className="px-5 py-4" style={{ color: "var(--hi5-muted)" }}>
                  {device.agent}
                </td>

                <td className="px-5 py-4" style={{ color: "var(--hi5-muted)" }}>
                  {device.lastSeen}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="space-y-3 md:hidden">
        {devices.map((device) => (
          <article
            key={device.id}
            className="rounded-3xl border p-5"
            style={{
              background: "var(--hi5-card)",
              borderColor: "var(--hi5-border)"
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <a
                  href={`/devices/${device.id}`}
                  className="font-black hover:underline"
                  style={{ color: "var(--hi5-fg)" }}
                >
                  {device.name}
                </a>

                <p className="text-sm" style={{ color: "var(--hi5-muted)" }}>
                  {device.os}
                </p>
              </div>

              <span
                className="rounded-full border px-3 py-1 text-xs font-bold capitalize"
                style={statusStyle(device.status)}
              >
                {device.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p style={{ color: "var(--hi5-muted)" }}>Hostname</p>
                <p className="font-bold" style={{ color: "var(--hi5-fg)" }}>
                  {device.hostname}
                </p>
              </div>

              <div>
                <p style={{ color: "var(--hi5-muted)" }}>Agent</p>
                <p className="font-bold" style={{ color: "var(--hi5-fg)" }}>
                  {device.agent}
                </p>
              </div>

              <div>
                <p style={{ color: "var(--hi5-muted)" }}>Last Seen</p>
                <p className="font-bold" style={{ color: "var(--hi5-fg)" }}>
                  {device.lastSeen}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
