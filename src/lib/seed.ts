import type { WorkspaceState } from "./types";

// Demo seed: a fictional freelance dive instructor using JFunnel to launch
// her first coordinated campaign for one overseas dive trip.
// Nothing here is real pricing or a real business.

export const seedState: WorkspaceState = {
  clientName: "Blue Current Diving",
  brief: {
    businessName: "",
    whatYouSell: "",
    whoAreCustomers: "",
    offerToPromote: "",
    extras: "",
    submitted: false,
    confirmed: false,
  },
  brand: {
    version: 1,
    positioning:
      "Small-group, safety-first overseas dive trips led personally by a PADI instructor — for divers who want a guided holiday, not a crowded resort boat.",
    toneOfVoice: "Warm, direct, reassuring. Speaks to keen beginners and busy recreational divers.",
    keyMessages: [
      "Max 4 divers per trip — real attention, not a tour bus with tanks.",
      "Your instructor travels with you and dives with you, start to finish.",
      "Everything arranged for you: transfer, boat, air, gear check.",
      "Beginner-friendly: discover-scuba and Open Water slots on every trip.",
    ],
    colors: [
      { name: "Deep Kelp", hex: "#1F4E4A" },
      { name: "Reef Sand", hex: "#F3EDE2" },
      { name: "Coral Signal", hex: "#E2725B" },
    ],
    typography: "Clean humanist sans for body, one confident serif for headlines.",
    logoUsage: "Compass-rose mark on sand background; coral reserved for buttons and prices.",
    approval: "pending",
    clientNotes: "",
    operatorNote: "First direction prepared from your confirmed brief.",
  },
  kit: {
    assets: [
      {
        id: "lp1",
        kind: "landing_page",
        title: "Campaign landing page",
        summary:
          "Anilao Weekend Dive Trip — 13–15 Mar 2027. One page: what's included, the instructor, 4 spots left, inquiry form.",
        approval: "pending",
        clientNotes: "",
      },
      {
        id: "sp1",
        kind: "social_post",
        title: "Social post 1 — announcement",
        summary:
          "\u201cFirst trip of 2027 is open.\u201d Photo-led post announcing the Anilao weekend, 4 spots, link to page.",
        approval: "pending",
        clientNotes: "",
      },
      {
        id: "sp2",
        kind: "social_post",
        title: "Social post 2 — what's included",
        summary:
          "Carousel: transfer, boat, 5 dives, gear check — the \u201cwe arrange everything\u201d promise in 4 slides.",
        approval: "pending",
        clientNotes: "",
      },
      {
        id: "sp3",
        kind: "social_post",
        title: "Social post 3 — beginner angle",
        summary:
          "\u201cNever dived overseas? That's exactly who this trip is for.\u201d Discover-scuba slots, reassurance tone.",
        approval: "pending",
        clientNotes: "",
      },
      {
        id: "fu1",
        kind: "follow_up_message",
        title: "Inquiry follow-up message",
        summary:
          "Short reply template for new inquiries: answer, trip sheet attached, soft 7-day hold on the spot.",
        approval: "pending",
        clientNotes: "",
      },
    ],
  },
  inquiries: [
    {
      id: "inq-demo-1",
      name: "Rachel T.",
      email: "rachel@example.com",
      message:
        "Saw your Anilao trip post — I have my Open Water but haven't dived in 2 years. Is this trip okay for rusty divers? And what's the price?",
      receivedAt: "2026-11-10T09:24:00Z",
      status: "new",
      followUpDraft:
        "Hi Rachel! Great to hear from you. Two years off the water is very normal — the trip is built for exactly this: we start Saturday morning with a shallow refresher dive and your instructor stays with you the whole weekend. Full price is RM 1,480 including transfer from Manila, boat, 5 dives and gear check. Want me to hold a spot for 7 days while you check dates?",
    },
  ],
};

// Prefilled example answers for the intake form's "use example" path in the demo.
export const exampleBrief = {
  businessName: "Blue Current Diving",
  whatYouSell:
    "PADI courses and small-group overseas dive trips led personally by a freelance instructor.",
  whoAreCustomers:
    "Busy beginners and recreational divers (25–45) in Kuala Lumpur who want a guided holiday, not a resort crowd.",
  offerToPromote: "Anilao Weekend Dive Trip — 13–15 Mar 2027, 4 spots, from RM 1,480.",
  extras: "Instagram: @bluecurrentdiving. Students keep asking for weekend trips — this is the first one.",
};
