"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";

// 3.2 — Full preview of the client's campaign landing page, rendered in the
// approved brand direction (colors/messages come from the seed brand data).
// The inquiry form is real: submitting one records an inquiry in Section 4.

const BRAND = {
  deep: "#1F4E4A",
  sand: "#F3EDE2",
  coral: "#E2725B",
};

export default function LandingPreview() {
  const { dispatch } = useStore();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    dispatch({
      type: "addInquiry",
      inquiry: {
        id: `inq-${Date.now()}`,
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        receivedAt: new Date().toISOString(),
        status: "new",
        followUpDraft: `Hi ${form.name.trim().split(" ")[0]}! Thanks for asking about the Anilao Weekend Dive Trip (13–15 Mar 2027). From RM 1,480 including transfer from Manila, boat, 5 dives and a gear check — max 4 divers, and your instructor joins the whole trip. I can hold a spot for 7 days while you decide. Which dates work for you?`,
      },
    });
    setSent(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-wide text-[var(--jf-muted)]">
          <Link href="/campaign" className="hover:underline">Campaign</Link> / Landing page preview
        </p>
        <span className="badge bg-[var(--jf-warn-soft)] text-[var(--jf-warn)]">
          Preview — not published
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--jf-line)]">
        {/* fake browser chrome */}
        <div className="flex items-center gap-2 bg-[var(--jf-line)]/60 px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white" />
          <span className="h-2.5 w-2.5 rounded-full bg-white" />
          <span className="h-2.5 w-2.5 rounded-full bg-white" />
          <span className="ml-2 rounded bg-white px-3 py-0.5 text-[11px] text-[var(--jf-muted)]">
            bluecurrent.example/anilao-mar-2027
          </span>
        </div>

        {/* the landing page itself */}
        <div style={{ background: BRAND.sand }}>
          <div className="px-8 py-12 text-center" style={{ background: BRAND.deep, color: "white" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: BRAND.coral }}>
              Blue Current Diving presents
            </p>
            <h1 className="mt-3 text-3xl font-bold">Anilao Weekend Dive Trip</h1>
            <p className="mt-2 text-sm opacity-90">13–15 March 2027 · 4 spots · from RM 1,480</p>
            <p className="mx-auto mt-4 max-w-md text-sm opacity-90">
              A small-group, safety-first overseas dive trip led personally by your
              PADI instructor — a guided holiday, not a crowded resort boat.
            </p>
            <a
              href="#inquire"
              className="mt-6 inline-block rounded-lg px-6 py-3 text-sm font-bold text-white"
              style={{ background: BRAND.coral }}
            >
              Ask about a spot
            </a>
          </div>

          <div className="mx-auto max-w-2xl space-y-6 px-8 py-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Max 4 divers", "Real attention underwater, not a tour bus with tanks."],
                ["Your instructor travels with you", "From airport transfer to the last safety stop."],
                ["Everything arranged", "Transfer, boat, air, tank and gear check included."],
                ["Beginner-friendly", "Discover-scuba and Open Water slots on every trip."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-lg bg-white p-4 border border-black/5">
                  <p className="text-sm font-bold" style={{ color: BRAND.deep }}>{t}</p>
                  <p className="mt-1 text-sm text-black/60">{d}</p>
                </div>
              ))}
            </div>

            <form id="inquire" onSubmit={submit} className="rounded-lg bg-white p-6 border border-black/5 space-y-3">
              <h2 className="text-lg font-bold" style={{ color: BRAND.deep }}>
                Questions? Ask and I’ll reply personally.
              </h2>
              {sent ? (
                <div className="rounded-md p-4 text-sm font-semibold" style={{ background: BRAND.sand, color: BRAND.deep }}>
                  Test inquiry received — open{" "}
                  <Link href="/inquiries" className="underline">
                    Inquiries
                  </Link>{" "}
                  to see it with a suggested follow-up reply.
                </div>
              ) : (
                <>
                  <p className="text-xs text-black/50">
                    Demo note: this form records a real inquiry inside your JFunnel workspace.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      className="field-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                      className="field-input"
                      placeholder="Email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <textarea
                    className="field-input"
                    rows={3}
                    placeholder="e.g. I have Open Water but haven't dived in 2 years — is this trip okay for me?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  <button
                    type="submit"
                    className="btn text-white"
                    style={{ background: BRAND.coral }}
                  >
                    Send inquiry
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      <p className="text-xs text-[var(--jf-muted)]">
        Approve or request this page from the{" "}
        <Link href="/campaign" className="underline">campaign kit overview</Link>.
      </p>
    </div>
  );
}
