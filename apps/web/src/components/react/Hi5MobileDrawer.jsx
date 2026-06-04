import React from "react";
import {
  AlertTriangle,
  BookOpen,
  Brush,
  Home,
  Monitor,
  Package,
  Settings,
  Sparkles,
  Ticket,
  UserRound,
  X,
  Zap
} from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/devices", label: "Devices", icon: Monitor },
  { href: "/software", label: "Software", icon: Package },
  { href: "/patching", label: "Patching", icon: AlertTriangle },
  { href: "/tickets", label: "Tickets", icon: Ticket },
  { href: "/knowledge", label: "Knowledge", icon: BookOpen },
  { href: "/admin/integrations", label: "Integrations", icon: Zap },
  { href: "/admin/integrations/ai", label: "AI Assistant", icon: Sparkles },
  { href: "/admin/branding", label: "Branding", icon: Brush },
  { href: "/admin/users", label: "Users", icon: UserRound },
  { href: "/settings", label: "Settings", icon: Settings }
];

export default function Hi5MobileDrawer({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="hi5mobile-drawer-root">
      <button className="hi5mobile-drawer-backdrop" type="button" onClick={onClose} />

      <aside className="hi5mobile-drawer">
        <div className="hi5mobile-drawer-head">
          <div className="hi5mobile-drawer-brand">
            <div className="hi5dash-logo">H</div>
            <div>
              <strong>Hi5Central</strong>
              <span>Managed IT Platform</span>
            </div>
          </div>

          <button className="hi5mobile-drawer-close" type="button" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <nav className="hi5mobile-drawer-nav">
          {nav.map((item) => {
            const Icon = item.icon;
            const active =
              typeof window !== "undefined" &&
              window.location.pathname.startsWith(item.href);

            return (
              <a key={item.href} href={item.href} className={active ? "active" : ""}>
                <Icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
