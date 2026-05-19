import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const ExportStep = () => {
  const [accepted, setAccepted] = useState(false);

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
        <Button intent="primary" disabled={!accepted}>
          Download Educational Report
        </Button>
        <Button intent="secondary" disabled={!accepted}>
          Export to Spreadsheet
        </Button>
        <Button intent="ghost" disabled={!accepted}>
          Share View-Only Link
        </Button>
      </div>
    </div>
  );
};
