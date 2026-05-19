import { usePortfolioStore } from "@/store/usePortfolioStore";
import { formatCurrency } from "@/lib/format";
import { Card } from "@/components/ui/Card";

const allocation = [
  { label: "US Stocks", pct: 45, symbol: "VTI" },
  { label: "Int'l Stocks", pct: 20, symbol: "VXUS" },
  { label: "Bonds", pct: 25, symbol: "BND" },
  { label: "REITs", pct: 5, symbol: "VNQ" },
  { label: "Cash", pct: 5, symbol: "CASH" },
];

export const RevealStep = () => {
  const budget = usePortfolioStore((state) => state.budget);
  const holdings = usePortfolioStore((state) => state.holdings);

  return (
    <div className="space-y-6">
      <Card className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Model Portfolio
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">
              Illustrative allocation
            </h3>
          </div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Budget {formatCurrency(budget)}
          </p>
        </div>
        <div className="space-y-3">
          {allocation.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                {item.label}
              </span>
              <span className="text-sm text-slate-500">
                {item.pct}% · {formatCurrency((budget * item.pct) / 100)}
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
          {allocation.map((item) => (
            <div
              key={item.symbol}
              className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white/60 px-4 py-3"
            >
              <span className="font-semibold text-slate-900">{item.symbol}</span>
              <span className="text-sm text-slate-600">{item.label}</span>
              <span className="text-sm text-slate-500">{item.pct}%</span>
            </div>
          ))}
          {holdings.length ? (
            <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-3 text-xs uppercase tracking-[0.24em] text-slate-500">
              Existing holdings recognized: {holdings.map((h) => h.symbol).join(", ")}
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
};
