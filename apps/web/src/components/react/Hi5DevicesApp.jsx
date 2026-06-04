import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle2,
  Cpu,
  HardDrive,
  Home,
  Menu,
  Laptop,
  Monitor,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Server,
  Shield,
  Sparkles,
  Ticket,
  Wifi,
  WifiOff
} from "lucide-react";
import Hi5ThemeButton from "./Hi5ThemeButton.jsx";
import Hi5MobileDrawer from "./Hi5MobileDrawer.jsx";
import "../../styles/dashboard.css";

function Sidebar() {
  const nav = [
    [Home, "Dashboard", "/dashboard"],
    [Monitor, "Devices", "/devices", true],
    [Package, "Software", "/software"],
    [AlertTriangle, "Patching", "/patching"],
    [Ticket, "Tickets", "/tickets"],
    [Shield, "Security", "/security"]
  ];

  return (
    <aside className="hi5dash-sidebar">
      <a href="/dashboard" className="hi5dash-logo">H</a>

      <nav className="hi5dash-nav">
        {nav.map(([Icon, label, href, active]) => (
          <a key={label} className={active ? "active" : ""} href={href} title={label}>
            <Icon size={18} />
          </a>
        ))}
      </nav>

      <button className="hi5dash-ai-mini" type="button">✦</button>
      <div className="hi5dash-user">DS</div>
    </aside>
  );
}

function Topbar({ onMenu }) {
  return (
    <>
      <header className="hi5dash-topbar">
        <button className="hi5mobile-menu-button" type="button" onClick={onMenu}><Menu size={20} /></button>

        <div className="hi5dash-brand">
          <strong>Hi5Central</strong>
          <span>Managed IT Platform</span>
        </div>

        <label className="hi5dash-search">
          <Search size={16} />
          <input placeholder="Search devices, users, tickets..." />
          <span>⌘ K</span>
        </label>

        <button className="hi5dash-chip">
          <span style={{ color: "#10b981" }}>●</span> Acme Corporation
        </button>

        <button className="hi5dash-icon">
          <Bell size={17} />
        </button>

        <Hi5ThemeButton />

        <button className="hi5dash-user">JS</button>
      </header>

      <div className="hi5dash-tabs">
        {[
          [Home, "Dashboard", "/dashboard"],
          [Monitor, "Devices", "/devices", true],
          [Ticket, "Tickets", "/tickets"],
          [AlertTriangle, "Alerts", "/patching"],
          [Package, "Software", "/software"]
        ].map(([Icon, label, href, active]) => (
          <a key={label} href={href} className={`hi5dash-tab ${active ? "active" : ""}`}>
            <Icon size={14} />
            {label}
          </a>
        ))}
      </div>
    </>
  );
}

function normaliseDevice(device) {
  return {
    id: device.id || device.device_id || device.uuid,
    name: device.hostname || device.name || device.device_name || "Unnamed device",
    os: device.os_name || device.os || device.platform || "Unknown OS",
    status: device.status || (device.online ? "online" : "offline"),
    lastSeen: device.last_seen_at || device.last_seen || device.updated_at,
    agentVersion: device.agent_version || device.version || "—",
    ip: device.public_ip || device.local_ip || device.ip_address || "—",
    cpu: device.cpu || device.processor || "—",
    memory: device.memory || device.ram || "—"
  };
}

function timeAgo(value) {
  if (!value) return "Never";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function StatusBadge({ status }) {
  const online = String(status).toLowerCase() === "online" || String(status).toLowerCase() === "active";

  return (
    <span className={`hi5dash-badge ${online ? "badge-blue" : "badge-orange"}`}>
      {online ? "Online" : "Offline"}
    </span>
  );
}

function DeviceIcon({ os }) {
  const text = String(os).toLowerCase();
  const Icon = text.includes("server") ? Server : text.includes("linux") ? Cpu : Laptop;

  return (
    <div className="hi5dash-ticket-icon" style={{ background: "#2563eb" }}>
      <Icon size={16} />
    </div>
  );
}

function DevicesTable({ devices }) {
  return (
    <article className="hi5dash-card hi5dash-panel">
      <div className="hi5dash-panel-head">
        <h2>Device Inventory</h2>
        <button className="hi5dash-small-btn">Export</button>
      </div>

      <div className="hi5devices-table-wrap">
        <table className="hi5devices-table">
          <thead>
            <tr>
              <th>Device</th>
              <th>Status</th>
              <th>OS</th>
              <th>IP</th>
              <th>Agent</th>
              <th>Last Seen</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {devices.map((device) => (
              <tr key={device.id}>
                <td>
                  <a href={`/devices/${device.id}`} className="hi5devices-device-cell">
                    <DeviceIcon os={device.os} />
                    <span>
                      <strong>{device.name}</strong>
                      <small>{device.id}</small>
                    </span>
                  </a>
                </td>
                <td><StatusBadge status={device.status} /></td>
                <td>{device.os}</td>
                <td>{device.ip}</td>
                <td>{device.agentVersion}</td>
                <td>{timeAgo(device.lastSeen)}</td>
                <td>
                  <a className="hi5devices-action" href={`/devices/${device.id}`}>
                    Open
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function DevicesCards({ devices }) {
  return (
    <div className="hi5devices-cards">
      {devices.map((device) => (
        <a key={device.id} href={`/devices/${device.id}`} className="hi5dash-card hi5devices-card">
          <div className="hi5devices-card-head">
            <DeviceIcon os={device.os} />
            <MoreHorizontal size={18} />
          </div>

          <h3>{device.name}</h3>
          <p>{device.os}</p>

          <div className="hi5devices-card-meta">
            <StatusBadge status={device.status} />
            <span>{timeAgo(device.lastSeen)}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function Hi5DevicesApp() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadDevices() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/devices");
      const data = await response.json().catch(() => null);

      if (!response.ok || !data) {
        throw new Error(data?.error || "Could not load devices");
      }

      const raw = data.devices || data.items || data.data || [];
      setDevices(raw.map(normaliseDevice));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load devices");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDevices();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return devices;

    return devices.filter((device) =>
      [device.name, device.os, device.status, device.ip, device.agentVersion]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [devices, query]);

  const online = devices.filter((d) => String(d.status).toLowerCase() === "online" || String(d.status).toLowerCase() === "active").length;
  const offline = devices.length - online;

  return (
    <div className="hi5dash">
      <div className="hi5dash-wrap">
        <Sidebar />

        <div className="hi5dash-main">
          <Topbar onMenu={() => setDrawerOpen(true)} />

          <main className="hi5dash-content">
            <div className="hi5dash-title-row">
              <div className="hi5dash-title">
                <h1>Devices</h1>
                <p>Manage endpoints, online status, inventory, and remote access.</p>
              </div>

              <button className="hi5dash-date">
                Add Device <Plus size={15} />
              </button>
            </div>

            <section className="hi5dash-metrics">
              <article className="hi5dash-card hi5dash-metric blue">
                <div>
                  <h3>Total Devices</h3>
                  <strong>{devices.length}</strong>
                  <p>Managed endpoints</p>
                </div>
                <div className="hi5dash-metric-icon"><Monitor size={20} /></div>
              </article>

              <article className="hi5dash-card hi5dash-metric green">
                <div>
                  <h3>Online</h3>
                  <strong>{online}</strong>
                  <p>Available now</p>
                </div>
                <div className="hi5dash-metric-icon"><Wifi size={20} /></div>
              </article>

              <article className="hi5dash-card hi5dash-metric orange">
                <div>
                  <h3>Offline</h3>
                  <strong>{offline}</strong>
                  <p>Needs attention</p>
                </div>
                <div className="hi5dash-metric-icon"><WifiOff size={20} /></div>
              </article>

              <article className="hi5dash-card hi5dash-metric purple">
                <div>
                  <h3>Protected</h3>
                  <strong>{devices.length}</strong>
                  <p>Policy assigned</p>
                </div>
                <div className="hi5dash-metric-icon"><Shield size={20} /></div>
              </article>
            </section>

            <section className="hi5dash-card hi5devices-toolbar">
              <label className="hi5dash-search">
                <Search size={16} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Filter devices..."
                />
              </label>

              <button className="hi5dash-small-btn" onClick={loadDevices}>
                Refresh
              </button>
            </section>

            {loading ? (
              <article className="hi5dash-card hi5dash-panel">
                <h2>Loading devices...</h2>
              </article>
            ) : error ? (
              <article className="hi5dash-card hi5dash-panel">
                <h2>Could not load devices</h2>
                <p>{error}</p>
              </article>
            ) : filtered.length ? (
              <>
                <DevicesCards devices={filtered} />
                <DevicesTable devices={filtered} />
              </>
            ) : (
              <article className="hi5dash-card hi5dash-panel">
                <h2>No devices found</h2>
                <p>No devices match your current filter.</p>
              </article>
            )}
          </main>
        </div>
      </div>

      <Hi5MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <button className="hi5dash-ai"><Sparkles size={22} /></button>
    </div>
  );
}
