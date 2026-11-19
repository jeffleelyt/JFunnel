"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { ApprovalBadge } from "@/components/Badges";
import ApproveBar from "@/components/ApproveBar";

export default function BrandReview() {
  const { state, dispatch } = useStore();
  const router = useRouter();
  const b = state.brand;

  useEffect(() => {
    if (!state.brief.confirmed) router.replace("/brief");
  }, [state.brief.confirmed, router]);

  if (!state.brief.confirmed) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--jf-muted)]">
            <Link href="/" className="hover:underline">Workspace</Link> / Brand
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Brand direction {b.approval === "approved" ? "" : "review"}
          </h1>
          <p className="mt-1 text-sm text-[var(--jf-muted)] max-w-xl">
            Your approved brand direction controls the wording and look of every
            campaign asset. Take your time here — this is the decision that matters most.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge bg-[var(--jf-accent-soft)] text-[var(--jf-accent)]">
            v{b.version}
          </span>
          <ApprovalBadge state={b.approval} />
        </div>
      </div>

      {b.approval === "changes_requested" ? (
        <div className="card p-6 space-y-4 border-[var(--jf-progress)]/40">
          <h2 className="font-semibold">JFunnel is revising your brand direction</h2>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--jf-muted)]">
              You asked for
            </p>
            <p className="mt-1 text-sm whitespace-pre-wrap">{b.clientNotes}</p>
          </div>
          <p className="text-sm text-[var(--jf-muted)]">
            A revised direction (v{b.version + 1}) will appear here for your review.
          </p>
          <div className="border-t border-dashed border-[var(--jf-line)] pt-4">
            <p className="text-xs text-[var(--jf-muted)] mb-2">
              Demo control — stands in for the JFunnel operator handing back the revision:
            </p>
            <button
              className="btn btn-ghost"
              onClick={() => dispatch({ type: "uploadBrandV2" })}
            >
              Operator: upload v{b.version + 1}
            </button>
          </div>
        </div>
      ) : (
        <>
          {b.version > 1 && (
            <div className="card p-4 bg-[var(--jf-progress-soft)]/40 border-[var(--jf-progress)]/30">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--jf-progress)]">
                What changed in v{b.version}
              </p>
              <p className="mt-1 text-sm">{b.operatorNote}</p>
            </div>
          )}

          <div className="card divide-y divide-[var(--jf-line)]">
            <section className="p-6">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--jf-muted)]">
                Positioning
              </h2>
              <p className="mt-2 text-lg font-medium leading-snug">{b.positioning}</p>
            </section>
            <section className="p-6">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--jf-muted)]">
                Tone of voice
              </h2>
              <p className="mt-2 text-sm">{b.toneOfVoice}</p>
            </section>
            <section className="p-6">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--jf-muted)]">
                Key messages
              </h2>
              <ul className="mt-2 space-y-2 text-sm">
                {b.keyMessages.map((m, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--jf-accent)]">—</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="p-6">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--jf-muted)]">
                Visual direction
              </h2>
              <div className="mt-3 flex flex-wrap gap-4">
                {b.colors.map((c) => (
                  <div key={c.hex} className="flex items-center gap-2">
                    <span
                      className="h-8 w-8 rounded-full border border-[var(--jf-line)]"
                      style={{ background: c.hex }}
                      aria-hidden
                    />
                    <div className="text-xs">
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-[var(--jf-muted)]">{c.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm">{b.typography}</p>
              <p className="mt-1 text-sm text-[var(--jf-muted)]">{b.logoUsage}</p>
            </section>
          </div>

          {b.approval === "approved" ? (
            <div className="card p-6 flex flex-wrap items-center justify-between gap-4 border-[var(--jf-ok)]/40">
              <div>
                <p className="font-semibold text-[var(--jf-ok)]">Brand direction approved ✓</p>
                <p className="mt-1 text-sm text-[var(--jf-muted)]">
                  Your campaign kit is being prepared on this foundation.
                </p>
              </div>
              <Link href="/campaign" className="btn btn-accent">
                Review campaign →
              </Link>
            </div>
          ) : (
            <ApproveBar
              approvedLabel="Approve this direction"
              onApprove={() => dispatch({ type: "approveBrand" })}
              onChangeRequested={(notes) =>
                dispatch({ type: "requestBrandChanges", notes })
              }
            />
          )}
        </>
      )}
    </div>
  );
}
