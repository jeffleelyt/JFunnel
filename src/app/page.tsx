"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { nextAction, stageState, type StageKey } from "@/lib/types";
import Stepper from "@/components/Stepper";
import { StageBadge } from "@/components/Badges";

const STAGE_INFO: { key: StageKey; title: string; desc: string; href: string }[] = [
  {
    key: "brief",
    title: "1 · Business brief",
    desc: "Tell us what you sell, who you serve, and the one offer to promote.",
    href: "/brief",
  },
  {
    key: "brand",
    title: "2 · Brand direction",
    desc: "Review the positioning, tone and look before any campaign material is made.",
    href: "/brand",
  },
  {
    key: "campaign",
    title: "3 · Campaign kit",
    desc: "Landing page, social posts and follow-up message — nothing is published until you approve.",
    href: "/campaign",
  },
  {
    key: "inquiries",
    title: "4 · Inquiries",
    desc: "See who is asking, review suggested replies, and follow up.",
    href: "/inquiries",
  },
];

export default function Home() {
  const { state } = useStore();
  const states = stageState(state);
  const action = nextAction(state);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">
          Your campaign, {state.clientName}
        </h1>
        <p className="text-sm text-[var(--jf-muted)] max-w-xl">
          Four steps take you from “what I sell” to a coordinated campaign with
          inquiries coming in. This page always shows what needs your attention.
        </p>
        <Stepper states={states} />
      </section>

      <section className="card p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--jf-accent)]">
            Next step
          </p>
          <p className="mt-1 font-semibold">{action.label}</p>
        </div>
        <Link href={action.href} className="btn btn-accent">
          Continue →
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {STAGE_INFO.map((s) => (
          <Link key={s.key} href={s.href} className="card p-5 hover:border-[var(--jf-ink)]/30">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold">{s.title}</h2>
              <StageBadge state={states[s.key]} />
            </div>
            <p className="mt-2 text-sm text-[var(--jf-muted)]">{s.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
