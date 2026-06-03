export const hi5Nav = [
  { href: "/dashboard", label: "Dashboard", icon: "⌂", tab: true },
  { href: "/devices", label: "Devices", icon: "▱", tab: true },
  { href: "/remote", label: "Remote", icon: "◴", tab: false },
  { href: "/software", label: "Software", icon: "◫", tab: true },
  { href: "/patching", label: "Patching", icon: "↻", tab: false },
  { href: "/tickets", label: "Tickets", icon: "✉", tab: true },
  { href: "/knowledge", label: "Knowledge", icon: "◨", tab: false },
  { href: "/admin/integrations", label: "Integrations", icon: "⚭", tab: false },
  { href: "/admin/integrations/ai", label: "AI", icon: "✦", tab: false },
  { href: "/admin/branding", label: "Branding", icon: "◎", tab: false },
  { href: "/settings", label: "Settings", icon: "⚙", tab: false }
];

export const hi5Tabs = hi5Nav.filter((item) => item.tab);
