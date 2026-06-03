import React from "react";
import { hi5Tabs } from "./hi5Navigation";

export default function Hi5Tabs({ currentPath }) {
  return (
    <div className="border-b border-[var(--hi5-border)] bg-[color-mix(in_srgb,var(--hi5-bg)_64%,transparent)] px-4 py-2 backdrop-blur-2xl">
      <div className="flex gap-1 overflow-x-auto">
        {hi5Tabs.map((tab) => {
          const active =
            currentPath === tab.href ||
            (tab.href !== "/dashboard" && currentPath.startsWith(tab.href));

          return (
            <a
              key={tab.href}
              href={tab.href}
              className={[
                "group flex h-9 shrink-0 items-center gap-2 rounded-xl border px-3 text-xs font-black transition",
                active
                  ? "border-[color-mix(in_srgb,var(--hi5-primary)_45%,var(--hi5-border))] bg-[color-mix(in_srgb,var(--hi5-primary)_13%,transparent)] text-[var(--hi5-primary)]"
                  : "border-[var(--hi5-border)] bg-[var(--hi5-surface)] text-[var(--hi5-muted)] hover:text-[var(--hi5-text)]"
              ].join(" ")}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span className="ml-2 text-[var(--hi5-muted)]">×</span>
            </a>
          );
        })}

        <button className="flex h-9 shrink-0 items-center rounded-xl border border-[var(--hi5-border)] bg-[var(--hi5-surface)] px-3 text-sm font-black text-[var(--hi5-muted)]" type="button">
          +
        </button>
      </div>
    </div>
  );
}
