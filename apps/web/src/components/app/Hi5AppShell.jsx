import React, { useState } from "react";
import Hi5AIAssistantButton from "./Hi5AIAssistantButton";
import Hi5IconSidebar from "./Hi5IconSidebar";
import Hi5MobileNav from "./Hi5MobileNav";
import Hi5Tabs from "./Hi5Tabs";
import Hi5Topbar from "./Hi5Topbar";
import MobileDrawer from "./MobileDrawer";

export default function Hi5AppShell({ title = "Dashboard", description = "", children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentPath =
    typeof window === "undefined" ? "/dashboard" : window.location.pathname;

  return (
    <div className="hi5-liquid-app min-h-screen">
      <div className="flex min-h-screen">
        <Hi5IconSidebar currentPath={currentPath} />

        <div className="min-w-0 flex-1">
          <Hi5Topbar onMenu={() => setDrawerOpen(true)} />
          <Hi5Tabs currentPath={currentPath} />

          <main className="mx-auto max-w-[1500px] px-4 pb-28 pt-5 lg:px-6 lg:pb-8">
            {title || description ? (
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-[var(--hi5-text)] sm:text-3xl">
                    {title}
                  </h1>
                  {description ? (
                    <p className="mt-1 text-sm font-semibold text-[var(--hi5-muted)]">
                      {description}
                    </p>
                  ) : null}
                </div>

                <button className="hi5-liquid-glass hi5-liquid-pill w-fit px-4 py-2 text-sm font-bold text-[var(--hi5-text)]" type="button">
                  Today
                </button>
              </div>
            ) : null}

            {children}
          </main>
        </div>
      </div>

      <Hi5AIAssistantButton />
      <Hi5MobileNav currentPath={currentPath} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} sections={[]} />
    </div>
  );
}
