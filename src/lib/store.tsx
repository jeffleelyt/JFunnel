"use client";

import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import type { ApprovalState, Brief, Inquiry, WorkspaceState } from "./types";
import { seedState } from "./seed";

type Action =
  | { type: "submitBrief"; brief: Brief }
  | { type: "updateBrief"; brief: Brief }
  | { type: "confirmBrief" }
  | { type: "approveBrand" }
  | { type: "requestBrandChanges"; notes: string }
  | { type: "uploadBrandV2" } // demo-only: simulates the JFunnel operator handing back a revision
  | { type: "setAssetApproval"; id: string; approval: ApprovalState; notes: string }
  | { type: "addInquiry"; inquiry: Inquiry }
  | { type: "setInquiryStatus"; id: string; status: Inquiry["status"] }
  | { type: "updateFollowUp"; id: string; text: string }
  | { type: "reset" };

function reducer(state: WorkspaceState, action: Action): WorkspaceState {
  switch (action.type) {
    case "submitBrief":
      return { ...state, brief: { ...action.brief, submitted: true, confirmed: false } };
    case "updateBrief":
      return { ...state, brief: action.brief };
    case "confirmBrief":
      return { ...state, brief: { ...state.brief, confirmed: true } };
    case "approveBrand":
      return { ...state, brand: { ...state.brand, approval: "approved", clientNotes: "" } };
    case "requestBrandChanges":
      return {
        ...state,
        brand: { ...state.brand, approval: "changes_requested", clientNotes: action.notes },
      };
    case "uploadBrandV2":
      return {
        ...state,
        brand: {
          ...state.brand,
          version: state.brand.version + 1,
          approval: "pending",
          operatorNote:
            "v2: sharpened the small-group promise, moved price language out of the headline, and added the beginner reassurance line you asked for.",
        },
      };
    case "setAssetApproval":
      return {
        ...state,
        kit: {
          ...state.kit,
          assets: state.kit.assets.map((a) =>
            a.id === action.id
              ? { ...a, approval: action.approval, clientNotes: action.notes }
              : a,
          ),
        },
      };
    case "addInquiry":
      return { ...state, inquiries: [action.inquiry, ...state.inquiries] };
    case "setInquiryStatus":
      return {
        ...state,
        inquiries: state.inquiries.map((i) =>
          i.id === action.id ? { ...i, status: action.status } : i,
        ),
      };
    case "updateFollowUp":
      return {
        ...state,
        inquiries: state.inquiries.map((i) =>
          i.id === action.id ? { ...i, followUpDraft: action.text } : i,
        ),
      };
    case "reset":
      return structuredClone(seedState);
    default:
      return state;
  }
}

const StoreContext = createContext<{
  state: WorkspaceState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, seedState, (s) => structuredClone(s));
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
