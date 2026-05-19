"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";
import { formatCurrency } from "@/lib/format";
import { Card } from "@/components/ui/Card";

const assetClassLabel: Record<string, string> = {
  us_equity: "US Equity",
  intl_equity: "International Equity",
  bond: "Bonds",
  reit: "Real Estate",
  cash: "Cash",
  alt: "Alternatives",
};

export const RevealStep = () => {
  const budget = usePortfolioStore((state) => state.budget);
  const generated = usePortfolioStore((state) => state.generated);

  if (!generated) {
    return (
      <Card className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Model Portfolio
        </p>
        <p className="text-sm text-slate-600">
          No model has been generated yet. Step back to <strong>Build</strong> to create one.
        </p>
      </Card>
    );
  }

  const { allocations, summary } = generated;

  return (
    <div className="space-y-6">
      <Card className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Model Portfolio · {summary.riskBand}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">
              {summary.stockPct}% stocks · {summary.bondPct}% bonds · {summary.cashPct}% cash
            </h3>
          </div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Budget {formatCurrency(budget)}
          </p>
        </div>
        <div className="space-y-3">
          {allocations.map((item) => (
            <div key={item.symbol} className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                {item.name}
                <span className="ml-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                  {assetClassLabel[item.assetClass] ?? item.assetClass}
                </span>
              </span>
              <span className="text-sm text-slate-500">
                {item.allocationPct}% · {formatCurrency(item.dollarAmount)}
              </span>
            </div>
          ))}
        </div>
      </Card>
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Sample holdings
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Illustrative only
          </p>
        </div>
        <div className="space-y-3">
          {allocations.map((item) => (
            <div
              key={item.symbol}
              className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white/60 px-4 py-3"
            >
              <span className="font-semibold text-slate-900">
                {item.symbol}
                {item.isExistingHolding ? (
                  <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    held
                  </span>
                ) : null}
              </span>
              <span className="text-sm text-slate-600">{item.name}</span>
              <span className="text-sm text-slate-500">{item.allocationPct}%</span>
            </div>
          ))}
        </div>
        {summary.notes.length ? (
          <ul className="mt-3 space-y-1 text-xs text-slate-500">
            {summary.notes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        ) : null}
      </Card>
    </div>
  );
};
