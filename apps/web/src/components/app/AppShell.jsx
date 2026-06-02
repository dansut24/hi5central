import React, { useMemo, useState } from "react";

const sections = [
  {
    title: "Control",
    items: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/devices", label: "Devices" },
      { href: "/remote", label: "Remote Access" },
      { href: "/software", label: "Software" },
      { href: "/patching", label: "Patching" }
    ]
  },
  {
    title: "Service",
    items: [
      { href: "/tickets", label: "Tickets" },
      { href: "/knowledge", label: "Knowledge Base" }
    ]
  },
  {
    title: "Admin",
    items: [
      { href: "/admin/users", label: "Users" },
      { href: "/admin/branding", label: "Branding" },
      { href: "/admin/integrations", label: "Integrations" },
      { href: "/admin/integrations/ai", label: "AI" }
    ]
  },
  {
    title: "System",
    items: [
      { href: "/audit", label: "Audit Logs" },
      { href: "/settings", label: "Settings" }
    ]
  }
];

function getTenantName() {
  if (typeof window === "undefined") return "Hi5Central";
  const host = window.location.hostname;
  const slug = host.split(".")[0];

  if (!slug || slug === "hi5central" || slug.includes("vercel")) {
    return "Hi5Central";
  }

  return slug;
}

function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  return (
    <div className="flex rounded-full border border-white/10 bg-white/8 p-1 shadow-lg shadow-black/10">
      {[
        ["light", "☼"],
        ["dark", "☾"],
        ["system", "▣"]
      ].map(([key, icon]) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`grid h-10 w-10 place-items-center rounded-full text-lg transition ${
            theme === key
              ? "bg-white text-slate-950 shadow-lg"
              : "text-slate-400 hover:text-white"
          }`}
          type="button"
        >
          {icon}
        </button>
      ))}
    </div>
  );
}

function Sidebar({ currentPath }) {
  return (
    <aside className="hidden min-h-screen w-[310px] shrink-0 border-r border-white/10 bg-[#070B16]/80 p-5 backdrop-blur-2xl xl:block">
      <a href="/dashboard" className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-300 via-blue-500 to-violet-500 text-xl font-black text-white shadow-2xl shadow-blue-500/25">
          H
        </div>
        <div>
          <p className="text-2xl font-black tracking-tight text-white">Hi5Central</p>
          <p className="text-sm font-semibold text-slate-400">Managed IT Platform</p>
        </div>
      </a>

      <div className="mt-8 space-y-6">
        {sections.map((section) => (
          <section key={section.title} className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4">
            <p className="px-2 text-xs font-black uppercase tracking-[0.28em] text-slate-500">
              {section.title}
            </p>

            <div className="mt-3 grid gap-1">
              {section.items.map((item) => {
                const active =
                  currentPath === item.href ||
                  (item.href !== "/dashboard" && currentPath.startsWith(item.href));

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`rounded-2xl px-4 py-3 text-sm font-black transition ${
                      active
                        ? "bg-white text-slate-950 shadow-xl shadow-white/10"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}

function MobileMenu({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      <button
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        type="button"
        aria-label="Close menu"
      />

      <aside className="absolute right-0 top-0 h-full w-[88%] max-w-md overflow-y-auto border-l border-white/10 bg-[#070B16] p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <a href="/dashboard" className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-300 via-blue-500 to-violet-500 text-xl font-black text-white">
              H
            </div>
            <div>
              <p className="text-2xl font-black text-white">Hi5Central</p>
              <p className="text-sm text-slate-400">Tenant Portal</p>
            </div>
          </a>

          <button
            onClick={onClose}
            className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/8 text-3xl text-white"
            type="button"
          >
            ×
          </button>
        </div>

        <div className="mt-8 space-y-5">
          {sections.map((section) => (
            <section key={section.title} className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-500">
                {section.title}
              </p>

              <div className="mt-4 grid gap-3">
                {section.items.map((item) => (
                  <a key={item.href} href={item.href} className="text-xl font-black text-white">
                    {item.label}
                  </a>
                ))}
              </div>
            </section>
          ))}

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-500">Theme</p>
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Topbar({ title, description, onMenu }) {
  const tenantName = useMemo(getTenantName, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070B16]/80 px-5 py-4 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-300">
            {tenantName}
          </p>
          <h1 className="truncate text-2xl font-black tracking-tight text-white">
            {title}
          </h1>
          {description ? (
            <p className="mt-1 hidden truncate text-sm text-slate-400 md:block">
              {description}
            </p>
          ) : null}
        </div>

        <div className="hidden min-w-[320px] max-w-[560px] flex-1 lg:block">
          <label className="flex h-13 items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 shadow-lg shadow-black/10">
            <span className="text-slate-400">⌕</span>
            <input
              className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-slate-500"
              placeholder="Search devices, users, tickets..."
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <button
            className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-xl text-white shadow-lg shadow-black/10"
            type="button"
          >
            🔔
          </button>

          <button
            onClick={onMenu}
            className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-3xl text-white shadow-lg shadow-black/10 xl:hidden"
            type="button"
          >
            ≡
          </button>
        </div>
      </div>
    </header>
  );
}

export default function AppShell({ title = "Dashboard", description = "", children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath =
    typeof window === "undefined" ? "/dashboard" : window.location.pathname;

  return (
    <div className="min-h-screen bg-[#050914] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_95%_20%,rgba(124,58,237,0.24),transparent_34%),linear-gradient(180deg,#07101f_0%,#050914_45%,#020617_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="flex min-h-screen">
        <Sidebar currentPath={currentPath} />

        <div className="min-w-0 flex-1">
          <Topbar
            title={title}
            description={description}
            onMenu={() => setMenuOpen(true)}
          />

          <main className="mx-auto max-w-[1500px] p-5 sm:p-7">
            {children}
          </main>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
