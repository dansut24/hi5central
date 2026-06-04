import React from "react";
import {
  AlertTriangle,
  Bot,
  Brush,
  CheckCircle2,
  Clock,
  Database,
  Globe,
  KeyRound,
  Package,
  Plug,
  Shield,
  Sparkles,
  Ticket,
  UserRound,
  Zap
} from "lucide-react";
import Hi5ModuleApp from "./Hi5ModuleApp.jsx";
import "../../styles/dashboard.css";

export default function Hi5SettingsApp() {
  return (
    <Hi5ModuleApp
      moduleKey="settings"
      title="Settings"
      description="Tenant configuration, security, notifications, and platform preferences."
      apiUrl="/api/settings"
      primaryAction="Save Settings"
      metrics={[
        { title: "Active", value: "12", detail: "Enabled items", icon: CheckCircle2, tone: "green" },
        { title: "Attention", value: "3", detail: "Needs review", icon: AlertTriangle, tone: "orange" },
        { title: "Automated", value: "8", detail: "Running policies", icon: Zap, tone: "blue" },
        { title: "Secure", value: "Yes", detail: "Tenant scoped", icon: Shield, tone: "purple" }
      ]}
      cards={[
        { title: "Overview", description: "Review current configuration and health.", icon: Database, tone: "blue" },
        { title: "Policies", description: "Control how this module behaves for the tenant.", icon: Shield, tone: "purple" },
        { title: "Automation", description: "Set automated checks, workflows, and actions.", icon: Sparkles, tone: "green" },
        { title: "Audit", description: "Track changes and recent module activity.", icon: Clock, tone: "orange" }
      ]}
      rows={[
        { title: "Initial React page created", meta: "Module shell active", icon: CheckCircle2, color: "#10b981", badge: "Ready", badgeClass: "badge-blue" },
        { title: "API connection preserved", meta: "/api/settings", icon: Plug, color: "#2563eb", badge: "API", badgeClass: "badge-blue" },
        { title: "Themeable liquid glass styling", meta: "Uses shared Hi5 CSS variables", icon: Brush, color: "#7c3aed", badge: "Theme", badgeClass: "badge-orange" }
      ]}
    />
  );
}
