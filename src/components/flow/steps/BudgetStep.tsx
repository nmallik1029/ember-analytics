import { budgetPresets } from "@/data/options";
import { formatCurrency } from "@/lib/format";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const getBudgetTone = (value: number) => {
  if (value < 5000) return "A great starting point.";
  if (value < 25000) return "Solid foundation.";
  if (value < 100000) return "Significant portfolio.";
  return "Institutional scale.";
};

export const BudgetStep = () => {
  const budget = usePortfolioStore((state) => state.budget);
  const setBudget = usePortfolioStore((state) => state.setBudget);

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-3xl font-semibold text-slate-900">
            {formatCurrency(budget)}
          </p>
          <span className="text-sm uppercase tracking-[0.25em] text-slate-500">
            {getBudgetTone(budget)}
          </span>
        </div>
        <input
          type="range"
          min={500}
          max={1000000}
          step={500}
          value={budget}
          onChange={(event) => setBudget(Number(event.target.value))}
          className="mt-6 w-full accent-slate-900"
        />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {budgetPresets.map((preset) => (
            <Button
              key={preset}
              intent="secondary"
              className={cn(
                "justify-center text-xs",
                preset === budget && "border border-slate-900"
              )}
              onClick={() => setBudget(preset)}
            >
              {formatCurrency(preset)}
            </Button>
          ))}
          <Button
            intent="secondary"
            className="justify-center text-xs"
            onClick={() => setBudget(250000)}
          >
            $100K+
          </Button>
        </div>
      </div>
      <div className="rounded-[28px] border border-slate-200 bg-white/80 p-6">
        <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Exact amount
        </label>
        <input
          type="number"
          min={500}
          max={10000000}
          value={budget}
          onChange={(event) => setBudget(Number(event.target.value))}
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-lg text-slate-900 outline-none focus:border-slate-900"
        />
      </div>
    </div>
  );
};
