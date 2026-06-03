import React from "react";

const items = [
  { href: "/dashboard", label: "Home", icon: "⌂" },
  { href: "/devices", label: "Devices", icon: "▱" },
  { href: "/tickets", label: "Tickets", icon: "✉" },
  { href: "/patching", label: "Alerts", icon: "△" },
  { href: "/admin/integrations", label: "More", icon: "…" }
];

export default function Hi5MobileNav({ currentPath }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--hi5-border)] bg-[color-mix(in_srgb,var(--hi5-bg)_84%,transparent)] px-3 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-2xl lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const active = currentPath.startsWith(item.href);

          return (
            <a
              key={item.href}
              href={item.href}
              className={[
                "grid place-items-center rounded-2xl px-2 py-2 text-[11px] font-bold",
                active ? "text-[var(--hi5-primary)]" : "text-[var(--hi5-muted)]"
              ].join(" ")}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
