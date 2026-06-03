import React from "react";

export default function GlassCard({
  children,
  className = "",
  strong = false,
  as: Component = "section"
}) {
  return (
    <Component
      className={[
        strong ? "hi5-liquid-glass-strong" : "hi5-liquid-glass",
        "hi5-liquid-panel",
        className
      ].join(" ")}
    >
      {children}
    </Component>
  );
}
