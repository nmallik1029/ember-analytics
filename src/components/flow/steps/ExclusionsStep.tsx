import { exclusionOptions } from "@/data/options";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cn } from "@/lib/cn";

export const ExclusionsStep = () => {
  const exclusions = usePortfolioStore((state) => state.exclusions);
  const toggleExclusion = usePortfolioStore((state) => state.toggleExclusion);
  const customExclusions = usePortfolioStore((state) => state.customExclusions);
  const setCustomExclusions = usePortfolioStore(
    (state) => state.setCustomExclusions
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {exclusionOptions.map((exclusion) => (
          <button
            key={exclusion.id}
            type="button"
            onClick={() => toggleExclusion(exclusion.id)}
            className={cn(
              "rounded-[22px] border border-slate-200 bg-white/85 px-4 py-3 text-left text-sm font-medium text-slate-700 transition",
              exclusions.includes(exclusion.id) && "border-slate-900 text-slate-900"
            )}
          >
            {exclusion.label}
          </button>
        ))}
      </div>
      <div className="rounded-[24px] border border-slate-200 bg-white/80 p-5">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-500">
          Specific companies to avoid
        </label>
        <input
          value={customExclusions}
          onChange={(event) => setCustomExclusions(event.target.value)}
          placeholder="e.g. Tobacco brands, specific tickers"
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
        />
      </div>
    </div>
  );
};
