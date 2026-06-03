import React, { useMemo, useState } from "react";
import MobileDrawer from "./MobileDrawer.jsx";
import { ThemeProvider, ThemeToggle } from "./ThemeProvider.jsx";

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
  const first = host.split(".")[0];

  if (!first || first === "hi5central" || first.includes("vercel")) {
    return "Hi5Central";
  }

  return first;
}

function Sidebar({ currentPath }) {
  return (
    <aside className="hidden min-h-screen w-[300px] shrink-0 border-r border-[var(--hi5-border)] bg-[color-mix(in_srgb,var(--hi5-bg)_82%,transparent)] p-5 backdrop-blur-2xl xl:block">
      <a href="/dashboard" className="flex items-center gap-3">
        <div className="grid h-13 w-13 place-items-center rounded-[1.35rem] bg-gradient-to-br from-[var(--hi5-primary)] to-[var(--hi5-accent)] text-xl font-black text-white shadow-2xl shadow-blue-500/20">
          H
        </div>

        <div className="min-w-0">
          <p className="truncate text-2xl font-black tracking-tight text-[var(--hi5-text)]">Hi5Central</p>
          <p className="truncate text-sm font-semibold text-[var(--hi5-muted)]">Managed IT Platform</p>
        </div>
      </a>

      <nav className="mt-7 space-y-5">
        {sections.map((section) => (
          <section key={section.title} className="hi5-liquid-glass hi5-liquid-panel p-4">
            <p className="px-2 text-[0.68rem] font-black uppercase tracking-[0.24em] text-[var(--hi5-muted)]">
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
                    className={[
                      "rounded-2xl px-4 py-3 text-sm font-black transition",
                      active
                        ? "bg-[var(--hi5-text)] text-[var(--hi5-bg)] shadow-xl"
                        : "text-[var(--hi5-muted)] hover:bg-white/10 hover:text-[var(--hi5-text)]"
                    ].join(" ")}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  );
}

function Topbar({ title, description, onMenu }) {
  const tenantName = useMemo(getTenantName, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--hi5-border)] bg-[color-mix(in_srgb,var(--hi5-bg)_76%,transparent)] px-4 py-4 backdrop-blur-2xl sm:px-6">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.24em]" style={{ color: "var(--hi5-primary)" }}>
            {tenantName}
          </p>

          <h1 className="truncate text-2xl font-black tracking-tight text-[var(--hi5-text)]">
            {title}
          </h1>

          {description ? (
            <p className="mt-1 hidden truncate text-sm font-semibold text-[var(--hi5-muted)] md:block">
              {description}
            </p>
          ) : null}
        </div>

        <div className="hidden min-w-[320px] max-w-[560px] flex-1 lg:block">
          <label className="flex h-13 items-center gap-3 rounded-full border border-[var(--hi5-border)] bg-[var(--hi5-surface)] px-5 backdrop-blur-xl">
            <span className="text-[var(--hi5-muted)]">⌕</span>
            <input
              className="w-full bg-transparent text-sm font-semibold text-[var(--hi5-text)] outline-none placeholder:text-[var(--hi5-muted)]"
              placeholder="Search devices, users, tickets..."
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <button
            type="button"
            className="grid h-13 w-13 place-items-center rounded-2xl border border-[var(--hi5-border)] bg-[var(--hi5-surface)] text-lg text-[var(--hi5-text)] backdrop-blur-xl"
          >
            🔔
          </button>

          <button
            type="button"
            onClick={onMenu}
            className="grid h-13 w-13 place-items-center rounded-2xl border border-[var(--hi5-border)] bg-[var(--hi5-surface)] text-2xl text-[var(--hi5-text)] backdrop-blur-xl xl:hidden"
          >
            ≡
          </button>
        </div>
      </div>
    </header>
  );
}

function ShellContent({ title, description, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath =
    typeof window === "undefined" ? "/dashboard" : window.location.pathname;

  return (
    <div className="hi5-liquid-app">
      <div className="flex min-h-screen">
        <Sidebar currentPath={currentPath} />

        <div className="min-w-0 flex-1">
          <Topbar
            title={title}
            description={description}
            onMenu={() => setMenuOpen(true)}
          />

          <main className="mx-auto max-w-[1500px] p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>

      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        sections={sections}
      />
    </div>
  );
}

export default function AppShell({
  title = "Dashboard",
  description = "",
  children
}) {
  return (
    <ThemeProvider>
      <ShellContent title={title} description={description}>
        {children}
      </ShellContent>
    </ThemeProvider>
  );
}
