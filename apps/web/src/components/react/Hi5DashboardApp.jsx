import React from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  CircleUserRound,
  ClipboardList,
  Cloud,
  Code2,
  Cpu,
  Gauge,
  Home,
  LayoutDashboard,
  Menu,
  Monitor,
  Package,
  Plus,
  Search,
  Settings,
  Shield,
  Sparkles,
  Ticket,
  UserRound,
  X
} from "lucide-react";

const tabs = [
  { label: "Dashboard", icon: Home, active: true },
  { label: "Devices", icon: Monitor },
  { label: "Tickets", icon: Ticket },
  { label: "Alerts", icon: AlertTriangle, dot: true },
  { label: "Software", icon: Package }
];

const nav = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Monitor, label: "Devices" },
  { icon: Activity, label: "Remote" },
  { icon: Package, label: "Software" },
  { icon: Gauge, label: "Patching" },
  { icon: Ticket, label: "Tickets" },
  { icon: BookOpen, label: "Knowledge" },
  { icon: UserRound, label: "Users" },
  { icon: Settings, label: "Settings" }
];

function IconSidebar() {
  return (
    <aside className="hidden w-[78px] shrink-0 border-r border-[var(--hi5-border)] bg-white/58 backdrop-blur-3xl lg:flex lg:flex-col lg:items-center lg:py-4">
      <div className="grid h-12 w-12 place-items-center rounded-[17px] bg-gradient-to-br from-sky-400 via-blue-500 to-violet-500 text-lg font-black text-white shadow-xl shadow-blue-500/20">
        H
      </div>

      <nav className="mt-5 flex flex-1 flex-col gap-2">
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href="#"
              title={item.label}
              className={[
                "grid h-11 w-11 place-items-center rounded-2xl transition",
                item.active
                  ? "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100"
                  : "text-slate-500 hover:bg-white/80 hover:text-slate-900"
              ].join(" ")}
            >
              <Icon size={18} strokeWidth={2.2} />
            </a>
          );
        })}
      </nav>

      <button className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-xl shadow-blue-500/25">
        <Sparkles size={18} />
      </button>

      <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
        <div className="grid h-full w-full place-items-center rounded-xl bg-slate-900 text-[11px] font-black text-white">
          DS
        </div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--hi5-border)] bg-white/62 px-4 py-3 backdrop-blur-3xl lg:px-6">
      <div className="flex items-center gap-4">
        <button className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--hi5-border)] bg-white/70 text-slate-700 lg:hidden">
          <Menu size={21} />
        </button>

        <div className="hidden min-w-[140px] lg:block">
          <p className="text-sm font-black text-slate-950">Hi5Central</p>
          <p className="text-[11px] font-semibold text-slate-500">Managed IT Platform</p>
        </div>

        <label className="hi5-glass flex h-11 min-w-0 flex-1 items-center gap-3 rounded-2xl px-4 md:max-w-[520px]">
          <Search size={17} className="text-slate-400" />
          <input
            className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
            placeholder="Search devices, users, tickets..."
          />
          <span className="hidden rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-500 sm:inline">
            ⌘ K
          </span>
        </label>

        <button className="hi5-glass hidden h-11 items-center gap-2 rounded-2xl px-4 text-sm font-bold text-slate-700 md:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          Acme Corporation
        </button>

        <button className="hi5-glass relative grid h-11 w-11 place-items-center rounded-2xl text-slate-700">
          <Bell size={18} />
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-[10px] font-black text-white">
            3
          </span>
        </button>

        <button className="hi5-glass grid h-11 w-11 place-items-center rounded-2xl text-slate-700">
          ☼
        </button>

        <button className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-black text-white shadow-lg shadow-blue-500/20">
          JS
        </button>
      </div>
    </header>
  );
}

function Tabs() {
  return (
    <div className="border-b border-[var(--hi5-border)] bg-white/46 px-4 py-2 backdrop-blur-3xl lg:px-6">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              className={[
                "flex h-9 shrink-0 items-center gap-2 rounded-xl border px-3 text-xs font-bold transition",
                tab.active
                  ? "border-blue-200 bg-blue-50 text-blue-600"
                  : "border-slate-200 bg-white/55 text-slate-600 hover:bg-white"
              ].join(" ")}
            >
              <Icon size={14} />
              {tab.label}
              {tab.dot && <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>}
              <X size={12} className="ml-2 text-slate-400" />
            </button>
          );
        })}

        <button className="grid h-9 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white/55 text-slate-500">
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, tone, icon: Icon }) {
  const toneClass =
    tone === "purple"
      ? "text-violet-600 hi5-card-glow-purple"
      : tone === "orange"
        ? "text-orange-600 hi5-card-glow-orange"
        : tone === "green"
          ? "text-emerald-600 hi5-card-glow-green"
          : "text-blue-600 hi5-card-glow-blue";

  return (
    <article className={`hi5-glass rounded-[22px] p-5 ${toneClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold">{title}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">{value}</p>
          <p className="mt-2 text-xs font-semibold text-slate-500">{change}</p>
        </div>

        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/65 shadow-sm ring-1 ring-black/5">
          <Icon size={20} />
        </div>
      </div>
    </article>
  );
}

function LineChart() {
  return (
    <div className="relative mt-4 h-[170px] overflow-hidden rounded-2xl">
      <svg viewBox="0 0 640 180" className="h-full w-full">
        <defs>
          <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[30, 70, 110, 150].map((y) => (
          <line key={y} x1="0" y1={y} x2="640" y2={y} stroke="#e5e7eb" strokeWidth="1" />
        ))}
        <path
          d="M0,106 C55,135 68,65 123,78 C178,91 173,50 232,62 C291,75 304,20 362,42 C421,64 408,118 470,92 C532,66 530,130 589,54 C612,24 627,40 640,48 L640,180 L0,180 Z"
          fill="url(#lineFill)"
        />
        <path
          d="M0,106 C55,135 68,65 123,78 C178,91 173,50 232,62 C291,75 304,20 362,42 C421,64 408,118 470,92 C532,66 530,130 589,54 C612,24 627,40 640,48"
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Donut({ value = 72, colors = ["#3b82f6", "#ef4444", "#f59e0b", "#22c55e"] }) {
  return (
    <div className="relative grid h-40 w-40 place-items-center">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(${colors[0]} 0 42%, ${colors[1]} 42% 58%, ${colors[2]} 58% 78%, ${colors[3]} 78% 100%)`
        }}
      ></div>
      <div className="absolute inset-5 rounded-full bg-white shadow-inner"></div>
      <div className="relative text-center">
        <p className="text-3xl font-black text-slate-950">{value}</p>
        <p className="text-xs font-semibold text-slate-500">Total</p>
      </div>
    </div>
  );
}

function TicketList() {
  const tickets = [
    ["VPN access issue for remote users", "INC-00524 · Network", "Critical", "12m ago", "red"],
    ["Microsoft 365 license renewal", "SR-00481 · Software", "High", "1h ago", "orange"],
    ["New employee laptop setup", "SR-00482 · Hardware", "Medium", "3h ago", "blue"]
  ];

  return (
    <div className="mt-3 divide-y divide-slate-200/70">
      {tickets.map(([title, meta, priority, time, tone]) => (
        <div key={title} className="flex items-center gap-3 py-3">
          <div
            className={[
              "grid h-9 w-9 place-items-center rounded-xl text-white",
              tone === "red" ? "bg-red-500" : tone === "orange" ? "bg-orange-500" : "bg-blue-500"
            ].join(" ")}
          >
            <ClipboardList size={16} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black text-slate-950">{title}</p>
            <p className="text-xs font-medium text-slate-500">{meta}</p>
          </div>

          <span
            className={[
              "rounded-full border px-2 py-1 text-xs font-bold",
              tone === "red"
                ? "border-red-200 bg-red-50 text-red-600"
                : tone === "orange"
                  ? "border-orange-200 bg-orange-50 text-orange-600"
                  : "border-blue-200 bg-blue-50 text-blue-600"
            ].join(" ")}
          >
            {priority}
          </span>
          <span className="text-xs font-medium text-slate-500">{time}</span>
        </div>
      ))}
    </div>
  );
}

function Dashboard() {
  return (
    <main className="mx-auto max-w-[1500px] px-4 pb-28 pt-5 lg:px-6 lg:pb-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Good morning, John 👋
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Here’s what’s happening with your IT environment today.
          </p>
        </div>

        <button className="hi5-glass flex h-12 w-fit items-center gap-2 rounded-2xl px-4 text-sm font-bold text-slate-700">
          May 12, 2025
          <Calendar size={16} />
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total Devices" value="248" change="↑ 12 this week" tone="blue" icon={Monitor} />
        <MetricCard title="Open Tickets" value="18" change="↓ 4 from yesterday" tone="purple" icon={Ticket} />
        <MetricCard title="Critical Alerts" value="7" change="↑ 2 requiring attention" tone="orange" icon={AlertTriangle} />
        <MetricCard title="SLA Compliance" value="98.6%" change="↑ 2.4% this week" tone="green" icon={CheckCircle2} />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_1fr_1fr]">
        <article className="hi5-glass rounded-[22px] p-5 xl:col-span-1">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-950">System Health</h2>
            <button className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-bold text-slate-700">
              7 Days
            </button>
          </div>
          <LineChart />
        </article>

        <article className="hi5-glass rounded-[22px] p-5">
          <h2 className="text-base font-black text-slate-950">Alerts by Severity</h2>
          <div className="mt-4 flex items-center gap-6">
            <Donut value={32} />
            <div className="grid flex-1 gap-3 text-sm">
              {[
                ["Critical", 7, "bg-red-500"],
                ["High", 11, "bg-orange-500"],
                ["Medium", 9, "bg-yellow-400"],
                ["Low", 5, "bg-blue-500"]
              ].map(([label, count, color]) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-slate-700">
                    <span className={`h-3 w-3 rounded-full ${color}`}></span>
                    {label}
                  </span>
                  <strong className="text-slate-950">{count}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="hi5-glass rounded-[22px] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-950">Recent Tickets</h2>
            <button className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-bold text-slate-700">
              View all
            </button>
          </div>
          <TicketList />
        </article>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[0.95fr_1fr_1.1fr]">
        <article className="hi5-glass rounded-[22px] p-5">
          <h2 className="text-base font-black text-slate-950">Device Status</h2>
          <div className="mt-4 flex items-center gap-8">
            <Donut value={248} colors={["#22c55e", "#ef4444", "#facc15", "#22c55e"]} />
            <div className="grid flex-1 gap-3 text-sm">
              {[
                ["Online", 198, "bg-emerald-400"],
                ["Offline", 32, "bg-red-500"],
                ["Maintenance", 18, "bg-yellow-400"]
              ].map(([label, count, color]) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-slate-700">
                    <span className={`h-3 w-3 rounded-full ${color}`}></span>
                    {label}
                  </span>
                  <strong className="text-slate-950">{count}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="hi5-glass rounded-[22px] p-5">
          <h2 className="text-base font-black text-slate-950">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              ["Add Device", Monitor],
              ["New Ticket", Ticket],
              ["Remote Access", Cloud],
              ["Run Script", Code2]
            ].map(([label, Icon]) => (
              <button key={label} className="rounded-2xl border border-slate-200 bg-white/65 px-4 py-4 text-left text-sm font-bold text-slate-700">
                <Icon size={17} className="mb-2 text-blue-600" />
                {label}
              </button>
            ))}
          </div>
        </article>

        <article className="hi5-glass rounded-[22px] p-5">
          <h2 className="text-base font-black text-slate-950">Recent Activity</h2>
          <div className="mt-4 grid gap-4">
            {[
              ["Windows Update deployed", "DESKTOP-72FJHIK · Success", "5m ago", Shield],
              ["Backup completed successfully", "SRV-BACKUP-01 · Success", "15m ago", CheckCircle2],
              ["New user added", "jane.doe@acme.com · By John Smith", "1h ago", CircleUserRound]
            ].map(([title, meta, time, Icon]) => (
              <div key={title} className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <Icon size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-slate-950">{title}</p>
                  <p className="truncate text-xs text-slate-500">{meta}</p>
                </div>
                <p className="text-xs font-medium text-slate-500">{time}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/80 px-3 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-3xl lg:hidden">
      <div className="grid grid-cols-5">
        {[
          [Home, "Home", true],
          [Monitor, "Devices"],
          [Ticket, "Tickets"],
          [AlertTriangle, "Alerts"],
          [Menu, "More"]
        ].map(([Icon, label, active]) => (
          <a key={label} href="#" className={`grid place-items-center rounded-2xl py-2 text-[11px] font-bold ${active ? "text-blue-600" : "text-slate-500"}`}>
            <Icon size={18} />
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function AIAssistant() {
  return (
    <button className="fixed bottom-24 right-5 z-40 grid h-14 w-14 place-items-center rounded-[22px] bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-2xl shadow-blue-500/25 lg:bottom-6">
      <Sparkles size={22} />
    </button>
  );
}

export default function Hi5DashboardApp() {
  return (
    <div className="hi5-gradient-bg min-h-screen text-slate-950">
      <div className="flex min-h-screen">
        <IconSidebar />
        <div className="min-w-0 flex-1">
          <Topbar />
          <Tabs />
          <Dashboard />
        </div>
      </div>

      <AIAssistant />
      <MobileBottomNav />
    </div>
  );
}
