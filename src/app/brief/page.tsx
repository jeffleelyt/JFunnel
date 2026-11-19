"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { exampleBrief } from "@/lib/seed";

export default function BriefForm() {
  const { state, dispatch } = useStore();
  const router = useRouter();
  const [form, setForm] = useState(exampleBrief);

  useEffect(() => {
    if (state.brief.submitted) router.replace("/brief/confirm");
  }, [state.brief.submitted, router]);

  const valid =
    form.businessName.trim() &&
    form.whatYouSell.trim() &&
    form.whoAreCustomers.trim() &&
    form.offerToPromote.trim();

  const fields = [
    { key: "businessName" as const, label: "Business name", placeholder: "e.g. Blue Current Diving" },
    {
      key: "whatYouSell" as const,
      label: "What do you sell?",
      placeholder: "Courses, trips, services — in plain words.",
      area: true,
    },
    {
      key: "whoAreCustomers" as const,
      label: "Who are your customers?",
      placeholder: "Describe the people you want, not a market report.",
      area: true,
    },
    {
      key: "offerToPromote" as const,
      label: "The one offer to promote",
      placeholder: "e.g. Anilao weekend dive trip, 13–15 Mar 2027, 4 spots.",
      area: true,
    },
    {
      key: "extras" as const,
      label: "Anything else? (optional)",
      placeholder: "Links, logo, things customers always ask you…",
      area: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-[var(--jf-muted)]">
          <Link href="/" className="hover:underline">Workspace</Link> / Brief
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Tell us about your business</h1>
        <p className="mt-1 text-sm text-[var(--jf-muted)] max-w-xl">
          Five plain questions. Your answers become the source of truth for the brand
          direction and every campaign asset that follows.
        </p>
      </div>

      <form
        className="card space-y-5 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid) return;
          dispatch({
            type: "submitBrief",
            brief: { ...form, submitted: true, confirmed: false },
          });
          router.push("/brief/confirm");
        }}
      >
        {fields.map((f) => (
          <div key={f.key}>
            <label className="field-label" htmlFor={f.key}>
              {f.label}
            </label>
            {f.area ? (
              <textarea
                id={f.key}
                className="field-input"
                rows={3}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              />
            ) : (
              <input
                id={f.key}
                className="field-input"
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              />
            )}
          </div>
        ))}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button type="submit" className="btn btn-accent" disabled={!valid}>
            Submit brief
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setForm(exampleBrief)}
          >
            Fill with example (demo)
          </button>
        </div>
      </form>
    </div>
  );
}
