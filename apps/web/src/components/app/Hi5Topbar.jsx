import React from "react";
import Hi5ThemeSwitcher from "./Hi5ThemeSwitcher";

export default function Hi5Topbar({ onMenu }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--hi5-border)] bg-[color-mix(in_srgb,var(--hi5-bg)_76%,transparent)] px-4 py-3 backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenu}
          className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--hi5-border)] bg-[var(--hi5-surface)] text-xl text-[var(--hi5-text)] lg:hidden"
          type="button"
        >
          ≡
        </button>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="text-sm font-black text-[var(--hi5-text)]">Hi5Central</span>
        </div>

        <label className="hi5-liquid-glass hi5-liquid-pill flex h-11 min-w-0 flex-1 items-center gap-3 px-4 md:max-w-[520px]">
          <span className="text-[var(--hi5-muted)]">⌕</span>
          <input
            className="w-full bg-transparent text-sm font-semibold text-[var(--hi5-text)] outline-none placeholder:text-[var(--hi5-muted)]"
            placeholder="Search devices, users, tickets..."
          />
          <span className="hidden rounded-lg bg-[color-mix(in_srgb,var(--hi5-muted)_10%,transparent)] px-2 py-1 text-xs text-[var(--hi5-muted)] sm:inline">
            ⌘ K
          </span>
        </label>

        <button className="hi5-liquid-glass hidden h-11 items-center gap-2 rounded-full px-4 text-sm font-bold text-[var(--hi5-text)] md:flex" type="button">
          <span className="h-2 w-2 rounded-full bg-[var(--hi5-success)]"></span>
          Acme Corporation
        </button>

        <button className="hi5-liquid-glass relative grid h-11 w-11 place-items-center rounded-full text-[var(--hi5-text)]" type="button">
          🔔
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--hi5-danger)] text-[10px] font-black text-white">
            3
          </span>
        </button>

        <div className="hidden md:block">
          <Hi5ThemeSwitcher />
        </div>

        <button className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[var(--hi5-primary)] to-[var(--hi5-accent)] text-sm font-black text-white" type="button">
          JS
        </button>
      </div>
    </header>
  );
}
