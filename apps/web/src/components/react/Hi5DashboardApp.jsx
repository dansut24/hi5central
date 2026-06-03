import React from "react";
import dashboardCss from "../../styles/dashboard.css?inline";
import {
  Activity,
  AlertTriangle,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Cloud,
  Code2,
  Gauge,
  Home,
  Menu,
  Monitor,
  Package,
  Plus,
  Search,
  Settings,
  Sparkles,
  Ticket,
  UserRound,
  X
} from "lucide-react";

const nav = [Home, Monitor, Activity, Package, Gauge, Ticket, BookOpen, UserRound, Settings];

function Sidebar() {
  return (
    <aside className="hi5dash-sidebar">
      <div className="hi5dash-logo">H</div>
      <nav className="hi5dash-nav">
        {nav.map((Icon, index) => (
          <a key={index} className={index === 0 ? "active" : ""} href="#">
            <Icon size={18} />
          </a>
        ))}
      </nav>
      <button className="hi5dash-ai-mini">✦</button>
      <div className="hi5dash-user">DS</div>
    </aside>
  );
}

function Topbar() {
  return (
    <>
      <header className="hi5dash-topbar">
        <button className="hi5dash-icon mobile-only"><Menu size={20} /></button>
        <div className="hi5dash-brand">
          <strong>Hi5Central</strong>
          <span>Managed IT Platform</span>
        </div>

        <label className="hi5dash-search">
          <Search size={16} />
          <input placeholder="Search devices, users, tickets..." />
          <span>⌘ K</span>
        </label>

        <button className="hi5dash-chip"><span style={{color:"#10b981"}}>●</span> Acme Corporation</button>
        <button className="hi5dash-icon"><Bell size={17} /></button>
        <button className="hi5dash-icon">☼</button>
        <button className="hi5dash-user">JS</button>
      </header>

      <div className="hi5dash-tabs">
        {[
          [Home, "Dashboard", true],
          [Monitor, "Devices"],
          [Ticket, "Tickets"],
          [AlertTriangle, "Alerts"],
          [Package, "Software"]
        ].map(([Icon, label, active]) => (
          <button key={label} className={`hi5dash-tab ${active ? "active" : ""}`}>
            <Icon size={14} />
            {label}
            <X size={12} />
          </button>
        ))}
        <button className="hi5dash-tab"><Plus size={14} /></button>
      </div>
    </>
  );
}

function Metric({ title, value, change, tone, icon: Icon }) {
  return (
    <article className={`hi5dash-card hi5dash-metric ${tone}`}>
      <div>
        <h3>{title}</h3>
        <strong>{value}</strong>
        <p>{change}</p>
      </div>
      <div className="hi5dash-metric-icon"><Icon size={20} /></div>
    </article>
  );
}

function LineChart() {
  return (
    <div className="hi5dash-chart">
      <svg viewBox="0 0 640 180" width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient id="fillBlue" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity=".30" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity=".02" />
          </linearGradient>
        </defs>
        {[30,70,110,150].map(y => <line key={y} x1="0" y1={y} x2="640" y2={y} stroke="#e5e7eb" />)}
        <path d="M0,106 C55,135 68,65 123,78 C178,91 173,50 232,62 C291,75 304,20 362,42 C421,64 408,118 470,92 C532,66 530,130 589,54 C612,24 627,40 640,48 L640,180 L0,180 Z" fill="url(#fillBlue)" />
        <path d="M0,106 C55,135 68,65 123,78 C178,91 173,50 232,62 C291,75 304,20 362,42 C421,64 408,118 470,92 C532,66 530,130 589,54 C612,24 627,40 640,48" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Donut({ value = 32 }) {
  return <div className="hi5dash-donut"><span>{value}<small>Total</small></span></div>;
}

function Tickets() {
  const rows = [
    ["VPN access issue for remote users", "INC-00524 · Network", "Critical", "12m ago", "badge-red", "#ef4444"],
    ["Microsoft 365 license renewal", "SR-00481 · Software", "High", "1h ago", "badge-orange", "#f97316"],
    ["New employee laptop setup", "SR-00482 · Hardware", "Medium", "3h ago", "badge-blue", "#2563eb"]
  ];

  return (
    <div className="hi5dash-list">
      {rows.map(([title, meta, badge, time, badgeClass, color]) => (
        <div className="hi5dash-ticket" key={title}>
          <div className="hi5dash-ticket-icon" style={{background: color}}><ClipboardList size={16} /></div>
          <div><strong>{title}</strong><small>{meta}</small></div>
          <span className={`hi5dash-badge ${badgeClass}`}>{badge}</span>
          <small>{time}</small>
        </div>
      ))}
    </div>
  );
}

function Dashboard() {
  return (
    <main className="hi5dash-content">
      <div className="hi5dash-title-row">
        <div className="hi5dash-title">
          <h1>Good morning, John 👋</h1>
          <p>Here’s what’s happening with your IT environment today.</p>
        </div>
        <button className="hi5dash-date">May 12, 2025 <Calendar size={15} /></button>
      </div>

      <section className="hi5dash-metrics">
        <Metric title="Total Devices" value="248" change="↑ 12 this week" tone="blue" icon={Monitor} />
        <Metric title="Open Tickets" value="18" change="↓ 4 from yesterday" tone="purple" icon={Ticket} />
        <Metric title="Critical Alerts" value="7" change="↑ 2 requiring attention" tone="orange" icon={AlertTriangle} />
        <Metric title="SLA Compliance" value="98.6%" change="↑ 2.4% this week" tone="green" icon={CheckCircle2} />
      </section>

      <section className="hi5dash-grid">
        <article className="hi5dash-card hi5dash-panel">
          <div className="hi5dash-panel-head"><h2>System Health</h2><button className="hi5dash-small-btn">7 Days</button></div>
          <LineChart />
        </article>

        <article className="hi5dash-card hi5dash-panel">
          <h2>Alerts by Severity</h2>
          <div className="hi5dash-donut-row">
            <Donut />
            <div className="hi5dash-legend">
              <div><span><i className="dot" style={{background:"#ef4444"}} />Critical</span><strong>7</strong></div>
              <div><span><i className="dot" style={{background:"#f97316"}} />High</span><strong>11</strong></div>
              <div><span><i className="dot" style={{background:"#facc15"}} />Medium</span><strong>9</strong></div>
              <div><span><i className="dot" style={{background:"#2563eb"}} />Low</span><strong>5</strong></div>
            </div>
          </div>
        </article>

        <article className="hi5dash-card hi5dash-panel">
          <div className="hi5dash-panel-head"><h2>Recent Tickets</h2><button className="hi5dash-small-btn">View all</button></div>
          <Tickets />
        </article>
      </section>
    </main>
  );
}

function MobileNav() {
  return (
    <nav className="hi5dash-mobile-nav">
      {[[Home,"Home",true],[Monitor,"Devices"],[Ticket,"Tickets"],[AlertTriangle,"Alerts"],[Menu,"More"]].map(([Icon,label,active]) => (
        <a href="#" className={active ? "active" : ""} key={label}><Icon size={18}/>{label}</a>
      ))}
    </nav>
  );
}

export default function Hi5DashboardApp() {
  return (
    <>
      <style>{dashboardCss}</style>
      <div className="hi5dash">
      <div className="hi5dash-wrap">
        <Sidebar />
        <div className="hi5dash-main">
          <Topbar />
          <Dashboard />
        </div>
      </div>
      <button className="hi5dash-ai"><Sparkles size={22} /></button>
      <MobileNav />
    </div>
    </>
  );
}
