"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { ApprovalBadge } from "@/components/Badges";
import type { CampaignAsset } from "@/lib/types";

const KIND_LABEL: Record<string, string> = {
  landing_page: "Landing page",
  social_post: "Social post",
  follow_up_message: "Follow-up message",
};

function AssetCard({ asset }: { asset: CampaignAsset }) {
  const { dispatch } = useStore();
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--jf-muted)]">
            {KIND_LABEL[asset.kind]}
          </p>
          <h3 className="mt-1 font-semibold">{asset.title}</h3>
        </div>
        <ApprovalBadge state={asset.approval} />
      </div>
      <p className="text-sm text-[var(--jf-muted)] flex-1">{asset.summary}</p>

      {asset.kind === "landing_page" && (
        <Link href="/campaign/preview" className="btn btn-ghost self-start text-xs">
          Open full preview →
        </Link>
      )}

      {asset.approval === "approved" ? (
        <p className="text-sm text-[var(--jf-ok)] font-semibold">Approved ✓</p>
      ) : asset.approval === "changes_requested" ? (
        <div className="text-sm">
          <p className="font-semibold text-[var(--jf-progress)]">Being revised</p>
          <p className="text-[var(--jf-muted)] mt-1">You asked: “{asset.clientNotes}”</p>
          <p className="text-[var(--jf-muted)] mt-1 text-xs">
            Demo note: the operator updates this asset behind the scenes; in this
            scaffold the request is recorded and shown here.
          </p>
        </div>
      ) : showNotes ? (
        <div className="space-y-2">
          <textarea
            className="field-input"
            rows={2}
            placeholder="What should change?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              className="btn btn-primary text-xs"
              disabled={!notes.trim()}
              onClick={() => {
                dispatch({
                  type: "setAssetApproval",
                  id: asset.id,
                  approval: "changes_requested",
                  notes: notes.trim(),
                });
                setShowNotes(false);
                setNotes("");
              }}
            >
              Send
            </button>
            <button className="btn btn-ghost text-xs" onClick={() => setShowNotes(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            className="btn btn-accent text-xs"
            onClick={() =>
              dispatch({ type: "setAssetApproval", id: asset.id, approval: "approved", notes: "" })
            }
          >
            Approve
          </button>
          <button className="btn btn-ghost text-xs" onClick={() => setShowNotes(true)}>
            Request changes
          </button>
        </div>
      )}
    </div>
  );
}

export default function CampaignKit() {
  const { state } = useStore();
  const router = useRouter();
  const brandApproved = state.brand.approval === "approved";

  useEffect(() => {
    if (!brandApproved) router.replace("/brand");
  }, [brandApproved, router]);

  if (!brandApproved) return null;

  const assets = state.kit.assets;
  const approvedCount = assets.filter((a) => a.approval === "approved").length;
  const allApproved = approvedCount === assets.length;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-[var(--jf-muted)]">
          <Link href="/" className="hover:underline">Workspace</Link> / Campaign
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Your campaign kit</h1>
        <p className="mt-1 text-sm text-[var(--jf-muted)] max-w-xl">
          Every asset was built from your approved brand direction. Approve them one by
          one, or request changes with a note.
        </p>
      </div>

      <div className="card p-4 bg-[var(--jf-accent-soft)]/50 border-[var(--jf-accent)]/30">
        <p className="text-sm font-semibold text-[var(--jf-accent)]">
          Nothing is published until you approve everything. ({approvedCount}/{assets.length} approved)
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {assets.map((a) => (
          <AssetCard key={a.id} asset={a} />
        ))}
      </div>

      {allApproved && (
        <div className="card p-6 flex flex-wrap items-center justify-between gap-4 border-[var(--jf-ok)]/40">
          <div>
            <p className="font-semibold text-[var(--jf-ok)]">
              Campaign approved — ready to launch ✓
            </p>
            <p className="mt-1 text-sm text-[var(--jf-muted)]">
              In the MVP, the JFunnel operator publishes the landing page and hands the
              social posts to you. Inquiries then appear in your workspace.
            </p>
          </div>
          <Link href="/inquiries" className="btn btn-accent">
            Go to inquiries →
          </Link>
        </div>
      )}
    </div>
  );
}
