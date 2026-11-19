# JFunnel — Client Campaign Workspace

JFunnel helps SMEs and one-person companies turn what they sell into a clear
offer and a **coordinated marketing campaign** — without them having to figure
out AI or marketing tooling themselves.

This repo is the **client-facing workspace** (MVP scaffold): the business owner
sees progress, approves work, and tracks inquiries. A JFunnel operator prepares
the actual work behind the scenes (in the hackathon demo, using
[QwenWork](https://luma.com/kxld1xck) — stated as a manual handoff, not an
automated integration).

## The journey this demo shows

```text
Business owner submits a brief
  → confirms JFunnel's plain-words summary (source of truth)
  → approves a brand direction (with a v2 revision loop)
  → approves the campaign kit (landing page, 3 social posts, follow-up message)
  → the landing page preview collects a real test inquiry
  → owner reviews the AI-drafted follow-up reply and marks it replied
```

Example client: **Blue Current Diving**, a fictional freelance dive instructor
promoting one overseas dive trip (Anilao, March 2027).

## Screens

| Route | Screen |
|---|---|
| `/` | 0 · Home — four-stage stepper + next action |
| `/brief` | 1.1 · Intake form (with "fill with example" for the demo) |
| `/brief/confirm` | 1.2 · Plain-words summary, edit, confirm |
| `/brand` | 2.1 · Brand direction review — approve / request changes, v2 loop |
| `/campaign` | 3.1 · Campaign kit — per-asset approval, "nothing publishes until all approved" |
| `/campaign/preview` | 3.2 · Landing page preview with a working inquiry form |
| `/inquiries` | 4.1 · Inquiry list |
| `/inquiries/[id]` | 4.2 · Inquiry detail with editable suggested reply |

## Stack & MVP boundaries

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4
- State lives in a React context (`src/lib/store.tsx`) seeded from
  `src/lib/seed.ts` — **in-memory only, resets on reload** (good for demos).
- No database, no auth yet: clients get a private link per campaign.
- Honest demo labels: revision handoffs and sending follow-ups are operator
  steps, shown as "demo controls", not faked automation.

## Run it

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Next steps (not built yet)

1. Persist state (Postgres via Drizzle) so refreshes survive.
2. Operator view for preparing/revising brief→brand→kit content.
3. Publish approved landing pages as real client URLs.
