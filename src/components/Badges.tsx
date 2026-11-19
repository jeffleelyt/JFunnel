import type { ApprovalState, StageState } from "@/lib/types";

const STAGE_TEXT: Record<StageState, string> = {
  waiting_for_client: "Waiting for you",
  in_progress: "In progress with JFunnel",
  done: "Done",
};

const APPROVAL_TEXT: Record<ApprovalState, string> = {
  pending: "Needs your review",
  changes_requested: "Being revised",
  approved: "Approved",
};

export function StageBadge({ state }: { state: StageState }) {
  const cls =
    state === "done"
      ? "bg-[var(--jf-ok-soft)] text-[var(--jf-ok)]"
      : state === "in_progress"
        ? "bg-[var(--jf-progress-soft)] text-[var(--jf-progress)]"
        : "bg-[var(--jf-warn-soft)] text-[var(--jf-warn)]";
  return <span className={`badge ${cls}`}>{STAGE_TEXT[state]}</span>;
}

export function ApprovalBadge({ state }: { state: ApprovalState }) {
  const cls =
    state === "approved"
      ? "bg-[var(--jf-ok-soft)] text-[var(--jf-ok)]"
      : state === "changes_requested"
        ? "bg-[var(--jf-progress-soft)] text-[var(--jf-progress)]"
        : "bg-[var(--jf-warn-soft)] text-[var(--jf-warn)]";
  return <span className={`badge ${cls}`}>{APPROVAL_TEXT[state]}</span>;
}
