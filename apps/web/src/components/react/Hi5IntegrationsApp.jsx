import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Bot,
  CheckCircle2,
  Cloud,
  Database,
  Home,
  KeyRound,
  Mail,
  Monitor,
  Package,
  Plug,
  RefreshCw,
  Search,
  Server,
  Settings,
  Shield,
  Sparkles,
  Ticket,
  Users,
  Zap
} from "lucide-react";
import Hi5ThemeButton from "./Hi5ThemeButton.jsx";
import Hi5MobileDrawer from "./Hi5MobileDrawer.jsx";
import "../../styles/dashboard.css";

const categoryMeta = {
  ai: { title: "AI Providers", icon: Bot, tone: "purple" },
  remote: { title: "Remote Access", icon: Monitor, tone: "blue" },
  psa: { title: "PSA / Service Desk", icon: Ticket, tone: "orange" },
  identity: { title: "Identity", icon: Users, tone: "green" },
  messaging: { title: "Messaging", icon: Zap, tone: "blue" },
  email: { title: "Email", icon: Mail, tone: "purple" },
  storage: { title: "Storage", icon: Database, tone: "green" }
};

function Sidebar() {
  const nav = [
    [Home, "Dashboard", "/dashboard"],
    [Monitor, "Devices", "/devices"],
    [Package, "Software", "/software"],
    [AlertTriangle, "Patching", "/patching"],
    [Ticket, "Tickets", "/tickets"],
    [Plug, "Integrations", "/admin/integrations", true],
    [Bot, "AI", "/admin/integrations/ai"],
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
        <button className="hi5mobile-menu-button" type="button" onClick={onMenu}>☰</button>

        <div className="hi5dash-brand">
          <strong>Hi5Central</strong>
          <span>Managed IT Platform</span>
        </div>

        <label className="hi5dash-search">
          <Search size={16} />
          <input placeholder="Search integrations..." />
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
        <a href="/dashboard" className="hi5dash-tab"><Home size={14} /> Dashboard</a>
        <a href="/devices" className="hi5dash-tab"><Monitor size={14} /> Devices</a>
        <a href="/tickets" className="hi5dash-tab"><Ticket size={14} /> Tickets</a>
        <a href="/admin/integrations" className="hi5dash-tab active"><Plug size={14} /> Integrations</a>
        <a href="/admin/integrations/ai" className="hi5dash-tab"><Bot size={14} /> AI</a>
      </div>
    </>
  );
}

function statusFor(provider, integrations) {
  const existing = integrations.find((item) => item.provider === provider);
  return Boolean(existing?.enabled);
}

function groupByCategory(catalogue) {
  return catalogue.reduce((acc, item) => {
    const key = item.category || "other";
    acc[key] ||= [];
    acc[key].push(item);
    return acc;
  }, {});
}

function IntegrationCard({ item, enabled, onToggle }) {
  const meta = categoryMeta[item.category] || { icon: Plug, tone: "blue" };
  const Icon = meta.icon;

  return (
    <article className={`hi5integration-card ${meta.tone}`}>
      <div className="hi5integration-card-head">
        <div className="hi5integration-icon">
          <Icon size={18} />
        </div>

        <span className={`hi5dash-badge ${enabled ? "badge-blue" : "badge-orange"}`}>
          {enabled ? "Enabled" : "Disabled"}
        </span>
      </div>

      <h3>{item.display_name}</h3>
      <p>{item.provider}</p>

      <div className="hi5integration-actions">
        {item.category === "ai" ? (
          <a href="/admin/integrations/ai" className="hi5devices-action">Configure</a>
        ) : (
          <button className="hi5devices-action" type="button" onClick={() => onToggle(item.provider, !enabled)}>
            {enabled ? "Disable" : "Enable"}
          </button>
        )}
      </div>
    </article>
  );
}

export default function Hi5IntegrationsApp() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [catalogue, setCatalogue] = useState([]);
  const [integrations, setIntegrations] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadIntegrations() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/integrations");
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not load integrations");
      }

      setCatalogue(data.catalogue || []);
      setIntegrations(data.integrations || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load integrations");
    } finally {
      setLoading(false);
    }
  }

  async function toggleProvider(provider, enabled) {
    const response = await fetch(`/api/integrations/${provider}/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled })
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      alert(data?.error || "Could not update integration");
      return;
    }

    await loadIntegrations();
  }

  useEffect(() => {
    loadIntegrations();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return catalogue;

    return catalogue.filter((item) =>
      [item.provider, item.category, item.display_name].join(" ").toLowerCase().includes(q)
    );
  }, [catalogue, query]);

  const groups = groupByCategory(filtered);
  const enabledCount = integrations.filter((item) => item.enabled).length;

  return (
    <div className="hi5dash">
      <div className="hi5dash-wrap">
        <Sidebar />

        <div className="hi5dash-main">
          <Topbar onMenu={() => setDrawerOpen(true)} />

          <main className="hi5dash-content">
            <div className="hi5dash-title-row">
              <div className="hi5dash-title">
                <h1>Integrations</h1>
                <p>Connect AI, PSA, identity, email, storage, and remote providers.</p>
              </div>

              <button className="hi5dash-date" onClick={loadIntegrations}>
                Refresh <RefreshCw size={15} />
              </button>
            </div>

            <section className="hi5dash-metrics">
              <article className="hi5dash-card hi5dash-metric blue">
                <div><h3>Available</h3><strong>{catalogue.length}</strong><p>Providers</p></div>
                <div className="hi5dash-metric-icon"><Plug size={20} /></div>
              </article>

              <article className="hi5dash-card hi5dash-metric green">
                <div><h3>Enabled</h3><strong>{enabledCount}</strong><p>Connected services</p></div>
                <div className="hi5dash-metric-icon"><CheckCircle2 size={20} /></div>
              </article>

              <article className="hi5dash-card hi5dash-metric purple">
                <div><h3>AI Ready</h3><strong>Yes</strong><p>Tenant scoped</p></div>
                <div className="hi5dash-metric-icon"><Bot size={20} /></div>
              </article>

              <article className="hi5dash-card hi5dash-metric orange">
                <div><h3>Secure</h3><strong>Encrypted</strong><p>Secrets protected</p></div>
                <div className="hi5dash-metric-icon"><Shield size={20} /></div>
              </article>
            </section>

            <section className="hi5dash-card hi5devices-toolbar">
              <label className="hi5dash-search">
                <Search size={16} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter integrations..." />
              </label>
            </section>

            {loading ? (
              <article className="hi5dash-card hi5dash-panel"><h2>Loading integrations...</h2></article>
            ) : error ? (
              <article className="hi5dash-card hi5dash-panel"><h2>Could not load integrations</h2><p>{error}</p></article>
            ) : (
              Object.entries(groups).map(([category, items]) => {
                const meta = categoryMeta[category] || { title: category, icon: Plug };
                const Icon = meta.icon;

                return (
                  <section key={category} className="hi5dash-card hi5dash-panel hi5integration-section">
                    <div className="hi5dash-panel-head">
                      <h2><Icon size={17} /> {meta.title}</h2>
                    </div>

                    <div className="hi5integration-grid">
                      {items.map((item) => (
                        <IntegrationCard
                          key={item.provider}
                          item={item}
                          enabled={statusFor(item.provider, integrations)}
                          onToggle={toggleProvider}
                        />
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </main>
        </div>
      </div>

      <button className="hi5dash-ai"><Sparkles size={22} /></button>
      <Hi5MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
