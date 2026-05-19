"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import getSupabaseClient from "@/lib/supabase";

type SaveState =
  | { status: "idle" }
  | { status: "saving" }
  | { status: "saved"; id: string }
  | { status: "error"; message: string };

export const ExportStep = () => {
  const [accepted, setAccepted] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>({ status: "idle" });
  const generated = usePortfolioStore((s) => s.generated);
  const inputs = usePortfolioStore((s) => ({
    budget: s.budget,
    experienceLevel: s.experienceLevel,
    riskTolerance: s.riskTolerance,
    timeHorizon: s.timeHorizon,
    sectors: s.sectors,
    preferences: s.preferences,
    exclusions: s.exclusions,
    customExclusions: s.customExclusions,
    holdings: s.holdings,
  }));

  const handleSave = async () => {
    if (!generated) {
      setSaveState({ status: "error", message: "No portfolio to save." });
      return;
    }
    setSaveState({ status: "saving" });
    try {
      const supabase = getSupabaseClient();
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id;
      if (!userId) {
        throw new Error("Sign in to save this model portfolio.");
      }
      const res = await fetch("/api/portfolio/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          inputs,
          allocations: generated.allocations,
          summary: generated.summary,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `Save failed (${res.status})`);
      }
      const body = await res.json();
      setSaveState({ status: "saved", id: body.portfolio?.id ?? "" });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setSaveState({ status: "error", message });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Before you export
        </p>
        <p className="text-base text-slate-700">
          This report is educational and hypothetical. It is not financial
          advice, and it does not constitute a recommendation or solicitation.
        </p>
        <label className="flex items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            className="h-4 w-4 accent-slate-900"
          />
          I understand this is educational content only.
        </label>
      </Card>
      <div className="grid gap-3 sm:grid-cols-3">
        <Button
          intent="primary"
          disabled={!accepted || saveState.status === "saving"}
          onClick={handleSave}
        >
          {saveState.status === "saving" ? "Saving..." : "Save to my vault"}
        </Button>
        <Button intent="secondary" disabled={!accepted}>
          Export to Spreadsheet
        </Button>
        <Button intent="ghost" disabled={!accepted}>
          Share View-Only Link
        </Button>
      </div>
      {saveState.status === "saved" ? (
        <p className="text-sm text-emerald-700">
          Saved. Portfolio id: <code>{saveState.id}</code>
        </p>
      ) : null}
      {saveState.status === "error" ? (
        <p className="text-sm text-red-600">{saveState.message}</p>
      ) : null}
    </div>
  );
};
