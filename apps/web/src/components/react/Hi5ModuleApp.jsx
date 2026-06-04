import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  Bell,
  BookOpen,
  Bot,
  Brush,
  CheckCircle2,
  Home,
  Monitor,
  Package,
  Plus,
  Search,
  Settings,
  Shield,
  Sparkles,
  Ticket,
  UserRound,
  Zap
} from "lucide-react";
import Hi5ThemeButton from "./Hi5ThemeButton.jsx";
import "../../styles/dashboard.css";

const iconMap = {
  tickets: Ticket,
  patching: AlertTriangle,
  software: Package,
  branding: Brush,
  users: UserRound,
  integrations: Zap,
  ai: Bot,
  knowledge: BookOpen,
  settings: Settings
};

function Topbar() {
  return (
    <>
      <header className="hi5dash-topbar">
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

        <button className="hi5dash-icon"><Bell size={17} /></button>
        <Hi5ThemeButton />
        <button className="hi5dash-user">JS</button>
      </header>

      <div className="hi5dash-tabs">
        {[
          [Home, "Dashboard", "/dashboard"],
          [Monitor, "Devices", "/devices"],
          [Ticket, "Tickets", "/tickets"],
          [AlertTriangle, "Patching", "/patching"],
          [Package, "Software", "/software"]
        ].map(([Icon, label, href]) => (
          <a key={label} href={href} className="hi5dash-tab">
            <Icon size={14} /> {label}
          </a>
        ))}
      </div>
    </>
  );
}

function Sidebar({ active }) {
  const nav = [
    [Home, "Dashboard", "/dashboard", "dashboard"],
    [Monitor, "Devices", "/devices", "devices"],
    [Package, "Software", "/software", "software"],
    [AlertTriangle, "Patching", "/patching", "patching"],
    [Ticket, "Tickets", "/tickets", "tickets"],
    [BookOpen, "Knowledge", "/knowledge", "knowledge"],
    [Zap, "Integrations", "/admin/integrations", "integrations"],
    [Brush, "Branding", "/admin/branding", "branding"],
    [Settings, "Settings", "/settings", "settings"]
  ];

  return (
    <aside className="hi5dash-sidebar">
      <a href="/dashboard" className="hi5dash-logo">H</a>
      <nav className="hi5dash-nav">
        {nav.map(([Icon, label, href, key]) => (
          <a key={label} href={href} title={label} className={active === key ? "active" : ""}>
            <Icon size={18} />
          </a>
        ))}
      </nav>
      <button className="hi5dash-ai-mini" type="button">✦</button>
      <div className="hi5dash-user">DS</div>
    </aside>
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
      <div className="hi5dash-metric-icon"><Icon size={20} /></div>
    </article>
  );
}

function ModuleCard({ title, description, icon: Icon, tone = "blue", href = "#" }) {
  return (
    <a href={href} className={`hi5module-card ${tone}`}>
      <div className="hi5module-icon"><Icon size={18} /></div>
      <strong>{title}</strong>
      <p>{description}</p>
    </a>
  );
}

function DataList({ rows }) {
  return (
    <div className="hi5dash-list">
      {rows.map((row) => (
        <div className="hi5dash-ticket" key={row.title}>
          <div className="hi5dash-ticket-icon" style={{ background: row.color || "#2563eb" }}>
            <row.icon size={16} />
          </div>
          <div>
            <strong>{row.title}</strong>
            <small>{row.meta}</small>
          </div>
          {row.badge ? <span className={`hi5dash-badge ${row.badgeClass || "badge-blue"}`}>{row.badge}</span> : null}
        </div>
      ))}
    </div>
  );
}

export default function Hi5ModuleApp({
  moduleKey,
  title,
  description,
  apiUrl,
  metrics = [],
  cards = [],
  rows = [],
  primaryAction = "Create"
}) {
  const [apiState, setApiState] = useState({ loading: false, error: "", data: null });

  async function load() {
    if (!apiUrl) return;
    setApiState({ loading: true, error: "", data: null });

    try {
      const res = await fetch(apiUrl);
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Could not load data");
      setApiState({ loading: false, error: "", data });
    } catch (err) {
      setApiState({ loading: false, error: err.message || "Could not load data", data: null });
    }
  }

  useEffect(() => {
    load();
  }, []);

  const Icon = iconMap[moduleKey] || Shield;

  return (
    <div className="hi5dash">
      <div className="hi5dash-wrap">
        <Sidebar active={moduleKey} />

        <div className="hi5dash-main">
          <Topbar />

          <main className="hi5dash-content">
            <div className="hi5dash-title-row">
              <div className="hi5dash-title">
                <h1>{title}</h1>
                <p>{description}</p>
              </div>

              <button className="hi5dash-date">
                {primaryAction} <Plus size={15} />
              </button>
            </div>

            <section className="hi5dash-metrics">
              {metrics.map((m) => (
                <Metric key={m.title} {...m} />
              ))}
            </section>

            {cards.length ? (
              <section className="hi5module-grid">
                {cards.map((card) => (
                  <ModuleCard key={card.title} {...card} />
                ))}
              </section>
            ) : null}

            <section className="hi5dash-card hi5dash-panel" style={{ marginTop: 16 }}>
              <div className="hi5dash-panel-head">
                <h2>{title} Overview</h2>
                {apiUrl ? <button className="hi5dash-small-btn" onClick={load}>Refresh</button> : null}
              </div>

              {apiState.loading ? <p>Loading...</p> : null}
              {apiState.error ? <p>{apiState.error}</p> : null}

              {apiState.data ? (
                <pre className="hi5api-preview">{JSON.stringify(apiState.data, null, 2)}</pre>
              ) : (
                <DataList rows={rows} />
              )}
            </section>
          </main>
        </div>
      </div>

      <button className="hi5dash-ai"><Sparkles size={22} /></button>
    </div>
  );
}
