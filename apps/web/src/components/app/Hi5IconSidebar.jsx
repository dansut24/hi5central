import React from "react";
import { hi5Nav } from "./hi5Navigation";

export default function Hi5IconSidebar({ currentPath }) {
  return (
    <aside className="hidden w-[74px] shrink-0 border-r border-[var(--hi5-border)] bg-[color-mix(in_srgb,var(--hi5-bg)_70%,transparent)] p-3 backdrop-blur-2xl lg:flex lg:flex-col">
      <a href="/dashboard" className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--hi5-primary)] to-[var(--hi5-accent)] text-lg font-black text-white shadow-xl">
        H
      </a>

      <nav className="flex flex-1 flex-col gap-2">
        {hi5Nav.map((item) => {
          const active =
            currentPath === item.href ||
            (item.href !== "/dashboard" && currentPath.startsWith(item.href));

          return (
            <a
              key={item.href}
              href={item.href}
              title={item.label}
              className={[
                "grid h-11 w-11 place-items-center rounded-2xl text-base transition",
                active
                  ? "bg-[var(--hi5-primary)] text-white shadow-lg shadow-blue-500/25"
                  : "text-[var(--hi5-muted)] hover:bg-[var(--hi5-surface)] hover:text-[var(--hi5-text)]"
              ].join(" ")}
            >
              {item.icon}
            </a>
          );
        })}
      </nav>

      <div className="mt-4 grid gap-2">
        <button className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[var(--hi5-primary)] to-[var(--hi5-accent)] text-white shadow-xl" type="button">
          ✦
        </button>
        <div className="h-11 w-11 overflow-hidden rounded-2xl bg-[var(--hi5-surface-strong)] p-1">
          <div className="grid h-full w-full place-items-center rounded-xl bg-[var(--hi5-text)] text-xs font-black text-[var(--hi5-bg)]">
            DS
          </div>
        </div>
      </div>
    </aside>
  );
}
