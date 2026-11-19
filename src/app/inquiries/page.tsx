"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import type { InquiryStatus } from "@/lib/types";

const STATUS: Record<InquiryStatus, { label: string; cls: string }> = {
  new: { label: "New", cls: "bg-[var(--jf-warn-soft)] text-[var(--jf-warn)]" },
  replied: { label: "Replied", cls: "bg-[var(--jf-ok-soft)] text-[var(--jf-ok)]" },
  closed: { label: "Closed", cls: "bg-[var(--jf-line)] text-[var(--jf-muted)]" },
};

export default function Inquiries() {
  const { state } = useStore();
  const list = state.inquiries;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-[var(--jf-muted)]">
          <Link href="/" className="hover:underline">Workspace</Link> / Inquiries
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Who is asking</h1>
        <p className="mt-1 text-sm text-[var(--jf-muted)] max-w-xl">
          Inquiries arrive here from your campaign landing page. Each one comes with a
          suggested reply drafted from your approved brand voice — you stay in control
          of what actually gets sent.
        </p>
      </div>

      {list.length === 0 ? (
        <div className="card p-8 text-center space-y-2">
          <p className="font-semibold">No inquiries yet</p>
          <p className="text-sm text-[var(--jf-muted)]">
            Once your campaign is live, inquiries from the landing page appear here.
            In this demo, open the{" "}
            <Link href="/campaign/preview" className="underline">
              landing page preview
            </Link>{" "}
            and submit a test inquiry.
          </p>
        </div>
      ) : (
        <div className="card divide-y divide-[var(--jf-line)]">
          {list.map((q) => (
            <Link
              key={q.id}
              href={`/inquiries/${q.id}`}
              className="block p-5 hover:bg-[var(--jf-bg)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{q.name}</p>
                <div className="flex items-center gap-2">
                  <span className={`badge ${STATUS[q.status].cls}`}>{STATUS[q.status].label}</span>
                  <span className="text-xs text-[var(--jf-muted)]">
                    {new Date(q.receivedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="mt-1 text-sm text-[var(--jf-muted)] line-clamp-2">{q.message}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
