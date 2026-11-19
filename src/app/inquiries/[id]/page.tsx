"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useStore } from "@/lib/store";

function InquiryDetailInner() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useStore();
  const inquiry = state.inquiries.find((q) => q.id === id);
  const [draft, setDraft] = useState<string | null>(null);

  if (!inquiry) {
    return (
      <div className="card p-8 text-center space-y-3">
        <p className="font-semibold">Inquiry not found</p>
        <Link href="/inquiries" className="btn btn-ghost">← Back to inquiries</Link>
      </div>
    );
  }

  const text = draft ?? inquiry.followUpDraft;
  const isEdited = draft !== null && draft !== inquiry.followUpDraft;

  return (
    <div className="space-y-6">
      <p className="text-xs uppercase tracking-wide text-[var(--jf-muted)]">
        <Link href="/" className="hover:underline">Workspace</Link> /{" "}
        <Link href="/inquiries" className="hover:underline">Inquiries</Link> / {inquiry.name}
      </p>

      <div className="card p-6 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-xl font-bold tracking-tight">{inquiry.name}</h1>
          <span className="badge bg-[var(--jf-warn-soft)] text-[var(--jf-warn)]">
            {inquiry.status === "new"
              ? "New"
              : inquiry.status === "replied"
                ? "Replied"
                : "Closed"}
          </span>
        </div>
        <p className="text-xs text-[var(--jf-muted)]">
          {inquiry.email} · {new Date(inquiry.receivedAt).toLocaleString()}
        </p>
        <p className="mt-2 rounded-md bg-[var(--jf-bg)] p-4 text-sm whitespace-pre-wrap">
          {inquiry.message}
        </p>
      </div>

      <div className="card p-6 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-semibold">Suggested follow-up reply</h2>
          <span className="badge bg-[var(--jf-accent-soft)] text-[var(--jf-accent)]">
            Drafted from your brand voice
          </span>
        </div>
        <textarea
          className="field-input"
          rows={7}
          value={text}
          onChange={(e) => setDraft(e.target.value)}
        />
        <p className="text-xs text-[var(--jf-muted)]">
          In the MVP, sending happens from your own inbox — “Mark replied” records the
          follow-up in your workspace.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            className="btn btn-accent"
            onClick={() => {
              if (isEdited) dispatch({ type: "updateFollowUp", id: inquiry.id, text });
              dispatch({ type: "setInquiryStatus", id: inquiry.id, status: "replied" });
            }}
          >
            Mark replied
          </button>
          <button
            className="btn btn-ghost"
            onClick={() =>
              dispatch({ type: "setInquiryStatus", id: inquiry.id, status: "closed" })
            }
          >
            Close
          </button>
          {inquiry.status !== "new" && (
            <Link href="/inquiries" className="btn btn-ghost">
              ← Back to list
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InquiryDetail() {
  return (
    <Suspense fallback={<p className="text-sm text-[var(--jf-muted)]">Loading…</p>}>
      <InquiryDetailInner />
    </Suspense>
  );
}
