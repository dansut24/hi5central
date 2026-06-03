import React, { useEffect, useState } from "react";

export default function Hi5ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("hi5-theme") || "light";
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  function apply(next) {
    setTheme(next);
    localStorage.setItem("hi5-theme", next);
    document.documentElement.dataset.theme = next;
  }

  return (
    <div className="hi5-liquid-glass flex rounded-full p-1">
      {[
        ["light", "☼"],
        ["dark", "☾"],
        ["system", "▣"]
      ].map(([key, icon]) => (
        <button
          key={key}
          onClick={() => apply(key)}
          className={[
            "grid h-9 w-9 place-items-center rounded-full text-sm transition",
            theme === key
              ? "bg-[var(--hi5-text)] text-[var(--hi5-bg)] shadow-lg"
              : "text-[var(--hi5-muted)] hover:text-[var(--hi5-text)]"
          ].join(" ")}
          type="button"
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
