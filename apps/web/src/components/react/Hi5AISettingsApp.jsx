import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Bot,
  CheckCircle2,
  Home,
  KeyRound,
  Monitor,
  Package,
  RefreshCw,
  Save,
  Search,
  Shield,
  Sparkles,
  Terminal,
  Ticket
} from "lucide-react";
import Hi5ThemeButton from "./Hi5ThemeButton.jsx";
import Hi5MobileDrawer from "./Hi5MobileDrawer.jsx";
import "../../styles/dashboard.css";

function Sidebar() {
  const nav = [
    [Home, "Dashboard", "/dashboard"],
    [Monitor, "Devices", "/devices"],
    [Package, "Software", "/software"],
    [AlertTriangle, "Patching", "/patching"],
    [Ticket, "Tickets", "/tickets"],
    [Bot, "AI", "/admin/integrations/ai", true]
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
          <input placeholder="Search AI settings..." />
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
        <a href="/admin/integrations" className="hi5dash-tab">Integrations</a>
        <a href="/admin/integrations/ai" className="hi5dash-tab active"><Bot size={14} /> AI Settings</a>
      </div>
    </>
  );
}

function defaultModel(provider) {
  return {
    openai: "gpt-5",
    anthropic: "claude-sonnet-4-5",
    "azure-openai": "gpt-5",
    ollama: "llama3",
    disabled: ""
  }[provider] || "";
}

export default function Hi5AISettingsApp() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState("disabled");
  const [enabled, setEnabled] = useState(false);
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [keyStatus, setKeyStatus] = useState("Checking key status...");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadSettings() {
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/ai-settings");
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not load AI settings");
      }

      const settings = data.settings || {};
      setProviders(data.providers || []);
      setProvider(settings.provider || "disabled");
      setEnabled(Boolean(settings.enabled));
      setModel(settings.model || defaultModel(settings.provider));
      setSystemPrompt(settings.system_prompt || "You are a helpful IT support assistant. Be accurate, concise, and never suggest destructive actions without explicit technician approval.");
      setKeyStatus(settings.api_key_configured ? `API key configured: ${settings.api_key_masked}` : "No API key configured.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load AI settings");
    }
  }

  async function saveSettings() {
    setBusy(true);
    setError("");
    setMessage("");

    const response = await fetch("/api/ai-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider,
        enabled,
        model,
        api_key: apiKey,
        system_prompt: systemPrompt
      })
    });

    const data = await response.json().catch(() => null);
    setBusy(false);

    if (!response.ok || !data?.success) {
      setError(data?.error || "Could not save AI settings");
      return;
    }

    setApiKey("");
    setMessage("AI settings saved.");
    await loadSettings();
  }

  async function testConnection() {
    setBusy(true);
    setError("");
    setMessage("");

    const response = await fetch("/api/ai/test", { method: "POST" });
    const data = await response.json().catch(() => null);
    setBusy(false);

    if (!response.ok || !data?.success) {
      setError(data?.error || "AI connection test failed");
      return;
    }

    setMessage(`AI connection successful: ${data.result?.text || "OK"}`);
  }

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <div className="hi5dash">
      <div className="hi5dash-wrap">
        <Sidebar />

        <div className="hi5dash-main">
          <Topbar onMenu={() => setDrawerOpen(true)} />

          <main className="hi5dash-content">
            <div className="hi5dash-title-row">
              <div className="hi5dash-title">
                <h1>AI Settings</h1>
                <p>Configure tenant-scoped AI provider, model, encrypted key, and safety prompt.</p>
              </div>

              <button className="hi5dash-date" onClick={loadSettings}>
                Refresh <RefreshCw size={15} />
              </button>
            </div>

            <section className="hi5dash-metrics">
              <article className="hi5dash-card hi5dash-metric purple">
                <div><h3>Provider</h3><strong>{provider}</strong><p>Tenant selected</p></div>
                <div className="hi5dash-metric-icon"><Bot size={20} /></div>
              </article>

              <article className="hi5dash-card hi5dash-metric green">
                <div><h3>Status</h3><strong>{enabled ? "Enabled" : "Disabled"}</strong><p>AI availability</p></div>
                <div className="hi5dash-metric-icon"><CheckCircle2 size={20} /></div>
              </article>

              <article className="hi5dash-card hi5dash-metric blue">
                <div><h3>Model</h3><strong>{model || "—"}</strong><p>Generation model</p></div>
                <div className="hi5dash-metric-icon"><Terminal size={20} /></div>
              </article>

              <article className="hi5dash-card hi5dash-metric orange">
                <div><h3>Secrets</h3><strong>Encrypted</strong><p>Server-side only</p></div>
                <div className="hi5dash-metric-icon"><Shield size={20} /></div>
              </article>
            </section>

            <section className="hi5dash-card hi5dash-panel hi5ai-form">
              <div className="hi5dash-panel-head">
                <h2>Provider Configuration</h2>
              </div>

              <div className="hi5form-grid">
                <label>
                  <span>Provider</span>
                  <select value={provider} onChange={(event) => {
                    setProvider(event.target.value);
                    setModel(defaultModel(event.target.value));
                  }}>
                    {(providers.length ? providers : [
                      { provider: "disabled", display_name: "Disabled" },
                      { provider: "openai", display_name: "OpenAI" },
                      { provider: "anthropic", display_name: "Anthropic Claude" },
                      { provider: "azure-openai", display_name: "Azure OpenAI" },
                      { provider: "ollama", display_name: "Ollama / Local AI" }
                    ]).map((item) => (
                      <option key={item.provider} value={item.provider}>
                        {item.display_name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Model</span>
                  <input value={model} onChange={(event) => setModel(event.target.value)} placeholder="gpt-5" />
                </label>

                <label>
                  <span>API Key</span>
                  <input value={apiKey} onChange={(event) => setApiKey(event.target.value)} type="password" placeholder="Leave blank to keep existing key" />
                  <small>{keyStatus}</small>
                </label>

                <label className="hi5form-toggle">
                  <input checked={enabled} onChange={(event) => setEnabled(event.target.checked)} type="checkbox" />
                  <span>Enable AI for this tenant</span>
                </label>
              </div>

              <label className="hi5form-full">
                <span>System Prompt</span>
                <textarea value={systemPrompt} onChange={(event) => setSystemPrompt(event.target.value)} />
              </label>

              {error ? <div className="hi5form-error">{error}</div> : null}
              {message ? <div className="hi5form-success">{message}</div> : null}

              <div className="hi5form-actions">
                <button className="hi5device-primary-action" disabled={busy} onClick={saveSettings}>
                  <Save size={15} />
                  Save Settings
                </button>

                <button className="hi5dash-small-btn" disabled={busy} onClick={testConnection}>
                  <KeyRound size={14} />
                  Test Connection
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>

      <button className="hi5dash-ai"><Sparkles size={22} /></button>
      <Hi5MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
