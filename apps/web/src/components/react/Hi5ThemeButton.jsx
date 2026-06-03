import React, { useEffect, useState } from "react";

const themes = [
  ["light", "Light"],
  ["dark", "Dark"],
  ["ocean", "Ocean"],
  ["purple", "Purple"],
  ["forest", "Forest"],
  ["sunset", "Sunset"]
];

export default function Hi5ThemeButton() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("hi5-theme") || "light";
    setTheme(saved);
    document.documentElement.dataset.hi5Theme = saved;
  }, []);

  function apply(nextTheme) {
    setTheme(nextTheme);
    localStorage.setItem("hi5-theme", nextTheme);
    document.documentElement.dataset.hi5Theme = nextTheme;
    setOpen(false);
  }

  return (
    <div style={{ position: "relative" }}>
      <button className="hi5dash-icon" type="button" onClick={() => setOpen(!open)}>
        ☼
      </button>

      {open ? (
        <div className="hi5theme-menu">
          {themes.map(([key, label]) => (
            <button key={key} type="button" onClick={() => apply(key)}>
              {theme === key ? "✓ " : ""}{label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
