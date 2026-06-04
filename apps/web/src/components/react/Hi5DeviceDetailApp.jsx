import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Bell,
  CheckCircle2,
  ClipboardList,
  Cpu,
  FileText,
  HardDrive,
  Home,
  Menu,
  Monitor,
  Package,
  Power,
  RefreshCw,
  Search,
  Server,
  Settings,
  Shield,
  Sparkles,
  Terminal,
  Ticket,
  Wifi,
  WifiOff
} from "lucide-react";
import Hi5ThemeButton from "./Hi5ThemeButton.jsx";
import Hi5MobileDrawer from "./Hi5MobileDrawer.jsx";
import "../../styles/dashboard.css";

function getDeviceId() {
  if (typeof window === "undefined") return "";
  const parts = window.location.pathname.split("/").filter(Boolean);
  return parts[1] || "";
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
    serial: device.serial_number || device.serial || "—",
    manufacturer: device.manufacturer || device.vendor || "—",
    model: device.model || "—",
    cpu: device.cpu || device.processor || "—",
    memory: device.memory || device.ram || "—",
    disk: device.disk || device.storage || "—"
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

function Sidebar() {
  const nav = [
    [Home, "Dashboard", "/dashboard"],
    [Monitor, "Devices", "/devices", true],
    [Activity, "Remote", "/remote"],
    [Package, "Software", "/software"],
    [AlertTriangle, "Patching", "/patching"],
    [Ticket, "Tickets", "/tickets"],
    [Shield, "Security", "/security"],
    [Settings, "Settings", "/settings"]
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

function StatusBadge({ status }) {
  const online =
    String(status).toLowerCase() === "online" ||
    String(status).toLowerCase() === "active";

  return (
    <span className={`hi5dash-badge ${online ? "badge-blue" : "badge-orange"}`}>
      {online ? "Online" : "Offline"}
    </span>
  );
}

function Metric({ title, value, detail, icon: Icon, tone = "blue" }) {
  return (
    <article className={`hi5dash-card hi5dash-metric ${tone}`}>
      <div>
        <h3>{title}</h3>
        <strong>{value}</strong>
        <p>{detail}</p>
      </div>

      <div className="hi5dash-metric-icon">
        <Icon size={20} />
      </div>
    </article>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="hi5device-info-row">
      <span>{label}</span>
      <strong>{value || "—"}</strong>
    </div>
  );
}

function ActionCard({ icon: Icon, title, description, primary }) {
  return (
    <button className={`hi5device-action-card ${primary ? "primary" : ""}`} type="button">
      <div>
        <Icon size={18} />
      </div>

      <span>{title}</span>
      <p>{description}</p>
    </button>
  );
}

function LoadingState() {
  return (
    <main className="hi5dash-content">
      <article className="hi5dash-card hi5dash-panel">
        <h2>Loading device...</h2>
        <p>Fetching endpoint details from Hi5Central.</p>
      </article>
    </main>
  );
}

function ErrorState({ error, onRetry }) {
  return (
    <main className="hi5dash-content">
      <div className="hi5device-back-row">
        <a href="/devices" className="hi5devices-action">
          <ArrowLeft size={14} />
          Back to devices
        </a>

        <button className="hi5dash-small-btn" onClick={onRetry}>
          <RefreshCw size={14} />
          Retry
        </button>
      </div>

      <article className="hi5dash-card hi5dash-panel">
        <h2>Could not load device</h2>
        <p>{error}</p>
      </article>
    </main>
  );
}

function DeviceHero({ device, onRefresh }) {
  return (
    <>
      <div className="hi5device-back-row">
        <a href="/devices" className="hi5devices-action">
          <ArrowLeft size={14} />
          Back to devices
        </a>

        <button className="hi5dash-small-btn" onClick={onRefresh}>
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      <section className="hi5dash-card hi5device-hero">
        <div className="hi5device-hero-left">
          <div className="hi5device-hero-icon">
            <Monitor size={30} />
          </div>

          <div>
            <div className="hi5device-title-line">
              <h1>{device.name}</h1>
              <StatusBadge status={device.status} />
            </div>

            <p>
              {device.os} · Last seen {timeAgo(device.lastSeen)} · Agent {device.agentVersion}
            </p>
          </div>
        </div>

        <div className="hi5device-hero-actions">
          <button className="hi5device-primary-action">
            <Activity size={16} />
            Remote Control
          </button>

          <button className="hi5dash-small-btn">
            <Terminal size={14} />
            Terminal
          </button>
        </div>
      </section>
    </>
  );
}

function DeviceMetrics({ device }) {
  const online =
    String(device.status).toLowerCase() === "online" ||
    String(device.status).toLowerCase() === "active";

  return (
    <section className="hi5dash-metrics">
      <Metric
        title="Status"
        value={online ? "Online" : "Offline"}
        detail={device.ip}
        icon={online ? Wifi : WifiOff}
        tone={online ? "green" : "orange"}
      />

      <Metric
        title="Operating System"
        value={device.os.split(" ")[0] || "OS"}
        detail={device.os}
        icon={Monitor}
        tone="blue"
      />

      <Metric
        title="Health"
        value="Good"
        detail="No critical alerts"
        icon={CheckCircle2}
        tone="green"
      />

      <Metric
        title="Security"
        value="Protected"
        detail="Policy assigned"
        icon={Shield}
        tone="purple"
      />
    </section>
  );
}

function QuickActions() {
  return (
    <article className="hi5dash-card hi5dash-panel">
      <div className="hi5dash-panel-head">
        <h2>Quick Actions</h2>
      </div>

      <div className="hi5device-actions-grid">
        <ActionCard
          icon={Activity}
          title="Remote Control"
          description="Start an interactive remote session"
          primary
        />

        <ActionCard
          icon={Terminal}
          title="Terminal"
          description="Open a remote shell"
        />

        <ActionCard
          icon={FileText}
          title="Files"
          description="Browse file system"
        />

        <ActionCard
          icon={Package}
          title="Software"
          description="Installed apps and updates"
        />

        <ActionCard
          icon={Power}
          title="Restart"
          description="Restart this endpoint"
        />

        <ActionCard
          icon={ClipboardList}
          title="Create Ticket"
          description="Open linked ITSM ticket"
        />
      </div>
    </article>
  );
}

function DeviceInformation({ device }) {
  return (
    <article className="hi5dash-card hi5dash-panel">
      <div className="hi5dash-panel-head">
        <h2>Device Information</h2>
      </div>

      <div className="hi5device-info-list">
        <InfoRow label="Device ID" value={device.id} />
        <InfoRow label="Hostname" value={device.name} />
        <InfoRow label="Manufacturer" value={device.manufacturer} />
        <InfoRow label="Model" value={device.model} />
        <InfoRow label="Serial" value={device.serial} />
        <InfoRow label="IP Address" value={device.ip} />
        <InfoRow label="Agent Version" value={device.agentVersion} />
      </div>
    </article>
  );
}

function HardwareSummary({ device }) {
  return (
    <article className="hi5dash-card hi5dash-panel">
      <h2>Hardware Summary</h2>

      <div className="hi5device-hardware">
        <div>
          <Cpu size={18} />
          <span>CPU</span>
          <strong>{device.cpu}</strong>
        </div>

        <div>
          <HardDrive size={18} />
          <span>Memory</span>
          <strong>{device.memory}</strong>
        </div>

        <div>
          <Server size={18} />
          <span>Storage</span>
          <strong>{device.disk}</strong>
        </div>
      </div>
    </article>
  );
}

function RecentActivity({ device }) {
  const rows = [
    ["Inventory refreshed", "System", "5m ago", "#10b981"],
    ["Patch scan completed", "Patching", "22m ago", "#2563eb"],
    ["Agent checked in", "Control", timeAgo(device.lastSeen), "#7c3aed"]
  ];

  return (
    <article className="hi5dash-card hi5dash-panel">
      <h2>Recent Activity</h2>

      <div className="hi5dash-list">
        {rows.map(([title, meta, time, color]) => (
          <div className="hi5dash-ticket" key={title}>
            <div className="hi5dash-ticket-icon" style={{ background: color }}>
              <ClipboardList size={16} />
            </div>

            <div>
              <strong>{title}</strong>
              <small>{meta}</small>
            </div>

            <small>{time}</small>
          </div>
        ))}
      </div>
    </article>
  );
}

function DeviceContent({ device, onRefresh }) {
  return (
    <main className="hi5dash-content">
      <DeviceHero device={device} onRefresh={onRefresh} />
      <DeviceMetrics device={device} />

      <section className="hi5device-grid">
        <QuickActions />
        <DeviceInformation device={device} />
      </section>

      <section className="hi5device-grid">
        <HardwareSummary device={device} />
        <RecentActivity device={device} />
      </section>
    </main>
  );
}

export default function Hi5DeviceDetailApp() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [device, setDevice] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const deviceId = useMemo(getDeviceId, []);

  async function loadDevice() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/devices/${deviceId}`);
      const data = await response.json().catch(() => null);

      if (!response.ok || !data) {
        throw new Error(data?.error || "Could not load device");
      }

      console.log("[Hi5DeviceDetail] API response", data);

      const raw =
        data.device ||
        data.item ||
        data.data ||
        data.result ||
        (Array.isArray(data.devices) ? data.devices[0] : null) ||
        data;

      if (!raw || typeof raw !== "object") {
        throw new Error("Invalid device response");
      }

      setDevice(normaliseDevice(raw));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load device");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDevice();
  }, []);

  return (
    <div className="hi5dash">
      <div className="hi5dash-wrap">
        <Sidebar />

        <div className="hi5dash-main">
          <Topbar onMenu={() => setDrawerOpen(true)} />

          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onRetry={loadDevice} />
          ) : device ? (
            <DeviceContent device={device} onRefresh={loadDevice} />
          ) : (
            <ErrorState error="Device not found" onRetry={loadDevice} />
          )}
        </div>
      </div>

      <Hi5MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <button className="hi5dash-ai">
        <Sparkles size={22} />
      </button>
    </div>
  );
}
