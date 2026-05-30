import { useEffect, useState } from "react";

const API_BASE_URL =
  "https://shiny-space-giggle-r46gpwvqgqj9hgv6-3001.app.github.dev";

export default function DeviceDetailsClient({ deviceId }) {
  const [device, setDevice] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDevice() {
      try {
        const response = await fetch(`${API_BASE_URL}/devices/${deviceId}`);

        if (!response.ok) {
          throw new Error(`Failed to load device. Status: ${response.status}`);
        }

        const data = await response.json();
        setDevice(data.device);
      } catch (error) {
        console.error("Device details load failed:", error);
        setError(`Could not load device details: ${String(error)}`);
      }
    }

    loadDevice();
  }, [deviceId]);

  if (error) {
    return (
      <section
        className="rounded-3xl border p-6"
        style={{
          background: "var(--hi5-card)",
          borderColor: "var(--hi5-border)",
          color: "var(--hi5-muted)"
        }}
      >
        {error}
      </section>
    );
  }

  if (!device) {
    return (
      <section
        className="rounded-3xl border p-6"
        style={{
          background: "var(--hi5-card)",
          borderColor: "var(--hi5-border)",
          color: "var(--hi5-muted)"
        }}
      >
        Loading device details...
      </section>
    );
  }

  const inventoryItems = [
    { label: "CPU", value: device.cpu ?? "Unknown" },
    { label: "RAM", value: device.ram_gb ? `${device.ram_gb} GB` : "Unknown" },
    { label: "Disk", value: device.disk_gb ? `${device.disk_gb} GB` : "Unknown" },
    { label: "GPU", value: device.gpu ?? "Unknown" },
    { label: "Logged In User", value: device.logged_in_user ?? "Unknown" },
    {
      label: "BitLocker",
      value:
        device.bitlocker_enabled === true
          ? "Enabled"
          : device.bitlocker_enabled === false
            ? "Disabled"
            : "Unknown"
    },
    { label: "TPM", value: device.tpm_version ?? "Unknown" }
  ];

  return (
    <section
      className="rounded-3xl border p-6"
      style={{
        background: "var(--hi5-card)",
        borderColor: "var(--hi5-border)"
      }}
    >
      <h2 className="text-xl font-black" style={{ color: "var(--hi5-fg)" }}>
        Inventory
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {inventoryItems.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border p-4"
            style={{
              background: "var(--hi5-card-soft)",
              borderColor: "var(--hi5-border)"
            }}
          >
            <p className="text-sm" style={{ color: "var(--hi5-muted)" }}>
              {item.label}
            </p>
            <p className="mt-1 font-bold" style={{ color: "var(--hi5-fg)" }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
