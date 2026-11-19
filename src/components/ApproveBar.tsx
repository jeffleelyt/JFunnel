"use client";

import { useState } from "react";

export default function ApproveBar({
  onApprove,
  onChangeRequested,
  approvedLabel = "Approve",
  disabled = false,
}: {
  onApprove: () => void;
  onChangeRequested: (notes: string) => void;
  approvedLabel?: string;
  disabled?: boolean;
}) {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");

  return (
    <div className="card p-4 flex flex-wrap items-center gap-3">
      <button
        className="btn btn-accent"
        onClick={onApprove}
        disabled={disabled}
      >
        {approvedLabel}
      </button>
      <button
        className="btn btn-ghost"
        onClick={() => setShowNotes((v) => !v)}
        disabled={disabled}
      >
        Request changes
      </button>
      {showNotes && (
        <div className="w-full mt-1">
          <textarea
            className="field-input"
            rows={3}
            placeholder="Tell JFunnel what to change — plain words are fine."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <button
              className="btn btn-primary"
              disabled={!notes.trim()}
              onClick={() => {
                onChangeRequested(notes.trim());
                setShowNotes(false);
                setNotes("");
              }}
            >
              Send change request
            </button>
            <button className="btn btn-ghost" onClick={() => setShowNotes(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
