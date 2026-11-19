"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import type { Brief } from "@/lib/types";

export default function BriefConfirm() {
  const { state, dispatch } = useStore();
  const router = useRouter();
  const [draft, setDraft] = useState<Brief>(state.brief);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!state.brief.submitted) router.replace("/brief");
    if (state.brief.confirmed) router.replace("/brand");
  }, [state.brief.submitted, state.brief.confirmed, router]);

  if (!state.brief.submitted || state.brief.confirmed) return null;

  const rows = [
    { key: "businessName" as const, label: "Business" },
    { key: "whatYouSell" as const, label: "What you sell" },
    { key: "whoAreCustomers" as const, label: "Your customers" },
    { key: "offerToPromote" as const, label: "Offer to promote" },
    { key: "extras" as const, label: "Anything else" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-[var(--jf-muted)]">
          <Link href="/" className="hover:underline">Workspace</Link> / Brief / Confirm
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Is this right?</h1>
        <p className="mt-1 text-sm text-[var(--jf-muted)] max-w-xl">
          Here is what JFunnel understood from your brief, in plain words. Fix anything
          that sounds wrong — once confirmed, this becomes the source of truth for your
          brand direction and campaign.
        </p>
      </div>

      <div className="card divide-y divide-[var(--jf-line)]">
        {rows.map((r) => (
          <div key={r.key} className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--jf-muted)]">
              {r.label}
            </p>
            {editing ? (
              <textarea
                className="field-input mt-2"
                rows={2}
                value={draft[r.key]}
                onChange={(e) => setDraft({ ...draft, [r.key]: e.target.value })}
              />
            ) : (
              <p className="mt-1 text-sm">{state.brief[r.key] || "—"}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {editing ? (
          <>
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch({ type: "updateBrief", brief: draft });
                setEditing(false);
              }}
            >
              Save edits
            </button>
            <button className="btn btn-ghost" onClick={() => { setDraft(state.brief); setEditing(false); }}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-accent"
              onClick={() => {
                dispatch({ type: "confirmBrief" });
                router.push("/brand");
              }}
            >
              Confirm — this is correct
            </button>
            <button className="btn btn-ghost" onClick={() => setEditing(true)}>
              Edit something
            </button>
          </>
        )}
      </div>
    </div>
  );
}
