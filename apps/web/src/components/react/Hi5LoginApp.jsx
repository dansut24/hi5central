import React, { useState } from "react";
import { Lock, Mail, Sparkles } from "lucide-react";
import Hi5ThemeButton from "./Hi5ThemeButton.jsx";
import "../../styles/dashboard.css";

export default function Hi5LoginApp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json().catch(() => null);
    setBusy(false);

    if (!response.ok || !data?.success) {
      setError(data?.error || "Login failed");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="hi5login min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <section className="grid w-full gap-5 lg:grid-cols-[1fr_420px]">
          <div className="hidden rounded-[32px] border border-[var(--hi5-line)] bg-white/45 p-8 shadow-2xl shadow-slate-900/5 backdrop-blur-3xl lg:block">
            <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-[var(--hi5-primary)] to-[var(--hi5-accent)] text-2xl font-black text-white shadow-xl">
              H
            </div>

            <h1 className="mt-10 max-w-xl text-5xl font-black tracking-tight">
              Welcome to your managed IT command centre.
            </h1>

            <p className="mt-5 max-w-lg text-base font-medium leading-7">
              Remote control, patching, tickets, automation, integrations, and AI assistance in one clean workspace.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {["Control", "ITSM", "AI"].map((item) => (
                <div key={item} className="rounded-3xl border border-[var(--hi5-line)] bg-white/55 p-4 backdrop-blur-xl">
                  <Sparkles className="text-[var(--hi5-primary)]" size={18} />
                  <p className="mt-4 text-sm font-black">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="hi5login-card rounded-[32px] border p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-3xl sm:p-8">
            <div className="flex items-center justify-between">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[var(--hi5-primary)] to-[var(--hi5-accent)] text-xl font-black text-white">
                H
              </div>

              <Hi5ThemeButton />
            </div>

            <h1 className="mt-8 text-3xl font-black tracking-tight">
              Sign in
            </h1>

            <p className="mt-2 text-sm font-medium">
              Access Hi5Central using your work account.
            </p>

            <label className="mt-8 block text-sm font-black">
              Email address
              <div className="mt-2 flex h-12 items-center gap-3 rounded-2xl border border-[var(--hi5-line)] bg-white/55 px-4">
                <Mail size={17} className="text-[var(--hi5-muted)]" />
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="you@company.com"
                  type="email"
                  autoComplete="email"
                />
              </div>
            </label>

            <label className="mt-4 block text-sm font-black">
              Password
              <div className="mt-2 flex h-12 items-center gap-3 rounded-2xl border border-[var(--hi5-line)] bg-white/55 px-4">
                <Lock size={17} className="text-[var(--hi5-muted)]" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="••••••••"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
            </label>

            {error ? (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-600">
                {error}
              </div>
            ) : null}

            <button
              disabled={busy}
              className="mt-6 h-12 w-full rounded-2xl bg-gradient-to-r from-[var(--hi5-primary)] to-[var(--hi5-accent)] text-sm font-black text-white shadow-xl shadow-blue-500/20 disabled:opacity-60"
              type="submit"
            >
              {busy ? "Signing in..." : "Sign in"}
            </button>

            <p className="mt-5 text-center text-xs font-semibold">
              Powered by Hi5Central
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
