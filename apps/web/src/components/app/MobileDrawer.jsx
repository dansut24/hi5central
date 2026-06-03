import React from "react";
import { ThemeToggle } from "./ThemeProvider.jsx";

export default function MobileDrawer({
  open,
  onClose,
  sections
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      <aside className="hi5-liquid-app absolute right-0 top-0 h-full w-[88%] max-w-md overflow-y-auto border-l border-[var(--hi5-border)] p-5">
        <div className="flex items-center justify-between gap-3">
          <a href="/dashboard" className="flex min-w-0 items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--hi5-primary)] to-[var(--hi5-accent)] text-lg font-black text-white">
              H
            </div>

            <div className="min-w-0">
              <p className="truncate text-xl font-black text-[var(--hi5-text)]">Hi5Central</p>
              <p className="truncate text-xs font-semibold text-[var(--hi5-muted)]">Managed IT Platform</p>
            </div>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="grid h-12 w-12 place-items-center rounded-2xl border border-[var(--hi5-border)] bg-[var(--hi5-surface)] text-2xl text-[var(--hi5-text)]"
          >
            ×
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {sections.map((section) => (
            <section key={section.title} className="hi5-liquid-glass hi5-liquid-panel p-4">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--hi5-muted)]">
                {section.title}
              </p>

              <div className="mt-3 grid gap-2">
                {section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl px-3 py-3 text-lg font-black text-[var(--hi5-text)] transition hover:bg-white/10"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </section>
          ))}

          <section className="hi5-liquid-glass hi5-liquid-panel p-4">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--hi5-muted)]">
              Theme
            </p>
            <div className="mt-3">
              <ThemeToggle />
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
