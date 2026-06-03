import React from "react";

const toneMap = {
  default: "var(--hi5-text)",
  primary: "var(--hi5-primary)",
  accent: "var(--hi5-accent)",
  success: "var(--hi5-success)",
  warning: "var(--hi5-warning)",
  danger: "var(--hi5-danger)"
};

export default function MetricCard({
  label,
  value,
  detail,
  tone = "default"
}) {
  return (
    <article className="hi5-liquid-glass hi5-liquid-panel p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--hi5-muted)]">
        {label}
      </p>

      <p
        className="mt-3 text-3xl font-black tracking-tight"
        style={{ color: toneMap[tone] || toneMap.default }}
      >
        {value}
      </p>

      {detail ? (
        <p className="mt-2 text-xs font-semibold text-[var(--hi5-muted)]">
          {detail}
        </p>
      ) : null}
    </article>
  );
}
