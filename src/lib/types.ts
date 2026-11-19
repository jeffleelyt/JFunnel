// JFunnel client workspace — domain types
// One client campaign moves through four stages: Brief -> Brand -> Campaign -> Inquiries.

export type StageKey = "brief" | "brand" | "campaign" | "inquiries";

export type StageState =
  | "waiting_for_client" // needs the business owner's input/approval
  | "in_progress" // JFunnel is working (manual handoff in MVP)
  | "done";

export type ApprovalState = "pending" | "changes_requested" | "approved";

export interface Brief {
  businessName: string;
  whatYouSell: string;
  whoAreCustomers: string;
  offerToPromote: string;
  extras: string; // links, logo notes, anything the owner wants included
  submitted: boolean;
  confirmed: boolean;
}

export interface BrandDirection {
  version: number;
  positioning: string;
  toneOfVoice: string;
  keyMessages: string[];
  colors: { name: string; hex: string }[];
  typography: string;
  logoUsage: string;
  approval: ApprovalState;
  clientNotes: string; // latest change request from the owner
  operatorNote: string; // what JFunnel changed in this version
}

export type AssetKind = "landing_page" | "social_post" | "follow_up_message";

export interface CampaignAsset {
  id: string;
  kind: AssetKind;
  title: string;
  summary: string; // preview copy shown on the card
  approval: ApprovalState;
  clientNotes: string;
}

export interface CampaignKit {
  assets: CampaignAsset[];
}

export type InquiryStatus = "new" | "replied" | "closed";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string; // ISO date
  status: InquiryStatus;
  followUpDraft: string; // AI-drafted reply the owner can edit before sending
}

export interface WorkspaceState {
  clientName: string; // the example business, for the header
  brief: Brief;
  brand: BrandDirection;
  kit: CampaignKit;
  inquiries: Inquiry[];
}

export function stageState(s: WorkspaceState): Record<StageKey, StageState> {
  const brief: StageState = !s.brief.submitted
    ? "waiting_for_client"
    : s.brief.confirmed
      ? "done"
      : "waiting_for_client";
  const brand: StageState = !s.brief.confirmed
    ? "waiting_for_client" // not started yet, but blocked on brief
    : s.brand.approval === "approved"
      ? "done"
      : s.brand.approval === "changes_requested"
        ? "in_progress"
        : "waiting_for_client";
  const campaign: StageState = s.kit.assets.every((a) => a.approval === "approved")
    ? "done"
    : s.kit.assets.some((a) => a.approval === "changes_requested")
      ? "in_progress"
      : "waiting_for_client";
  const inquiries: StageState = s.inquiries.length === 0 ? "waiting_for_client" : "done";
  return { brief, brand, campaign, inquiries };
}

export function nextAction(s: WorkspaceState): { label: string; href: string } {
  if (!s.brief.submitted) return { label: "Fill in your business brief", href: "/brief" };
  if (!s.brief.confirmed) return { label: "Review and confirm your brief", href: "/brief/confirm" };
  if (s.brand.approval === "changes_requested")
    return { label: "Brand direction being revised", href: "/brand" };
  if (s.brand.approval !== "approved") return { label: "Review your brand direction", href: "/brand" };
  if (!s.kit.assets.every((a) => a.approval === "approved"))
    return { label: "Review your campaign kit", href: "/campaign" };
  return { label: "Check your inquiries", href: "/inquiries" };
}
