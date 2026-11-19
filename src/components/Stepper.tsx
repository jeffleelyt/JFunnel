import type { StageKey, StageState } from "@/lib/types";

const LABELS: Record<StageKey, string> = {
  brief: "Brief",
  brand: "Brand",
  campaign: "Campaign",
  inquiries: "Inquiries",
};

const ORDER: StageKey[] = ["brief", "brand", "campaign", "inquiries"];

const DOT: Record<StageState, string> = {
  done: "bg-[var(--jf-ok)] text-white",
  in_progress: "bg-[var(--jf-progress-soft)] text-[var(--jf-progress)]",
  waiting_for_client: "bg-[var(--jf-warn-soft)] text-[var(--jf-warn)]",
};

export default function Stepper({
  states,
  current,
}: {
  states: Record<StageKey, StageState>;
  current?: StageKey;
}) {
  return (
    <nav aria-label="Campaign progress" className="flex items-center gap-2 flex-wrap">
      {ORDER.map((key, i) => {
        const st = states[key];
        return (
          <div key={key} className="flex items-center gap-2">
            {i > 0 && <span className="h-px w-6 bg-[var(--jf-line)]" aria-hidden />}
            <span
              className={`badge ${DOT[st]} ${
                current === key ? "ring-2 ring-[var(--jf-ink)]/20" : ""
              }`}
            >
              <span className="font-bold">{i + 1}</span>
              {LABELS[key]}
              {st === "done" ? " ✓" : st === "in_progress" ? " ···" : ""}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
