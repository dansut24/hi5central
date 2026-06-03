import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("hi5-theme") || "dark";
    setThemeState(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  function setTheme(nextTheme) {
    setThemeState(nextTheme);
    window.localStorage.setItem("hi5-theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    return {
      theme: "dark",
      setTheme: () => {}
    };
  }

  return context;
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex rounded-full border border-[var(--hi5-border)] bg-[var(--hi5-surface)] p-1 backdrop-blur-xl">
      {[
        ["light", "☼"],
        ["dark", "☾"],
        ["system", "◐"]
      ].map(([key, icon]) => (
        <button
          key={key}
          type="button"
          onClick={() => setTheme(key)}
          className={[
            "grid h-10 w-10 place-items-center rounded-full text-base transition",
            theme === key
              ? "bg-[var(--hi5-text)] text-[var(--hi5-bg)] shadow-lg"
              : "text-[var(--hi5-muted)] hover:text-[var(--hi5-text)]"
          ].join(" ")}
          aria-label={`Use ${key} theme`}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
