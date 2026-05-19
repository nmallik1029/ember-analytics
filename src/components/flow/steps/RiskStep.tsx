import { usePortfolioStore } from "@/store/usePortfolioStore";
import { formatPercent } from "@/lib/format";

const getVolatilityRange = (risk: number) => {
  const low = Math.round(4 + risk * 1.2);
  const high = low + 6;
  return `${formatPercent(low)}-${formatPercent(high)}`;
};

const getScenario = (risk: number) => {
  if (risk <= 3) {
    return { good: "+6%", bad: "-4%" };
  }
  if (risk <= 7) {
    return { good: "+12%", bad: "-9%" };
  }
  return { good: "+20%", bad: "-18%" };
};

export const RiskStep = () => {
  const riskTolerance = usePortfolioStore((state) => state.riskTolerance);
  const setRiskTolerance = usePortfolioStore((state) => state.setRiskTolerance);
  const range = getVolatilityRange(riskTolerance);
  const scenario = getScenario(riskTolerance);

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-white/70 bg-white/85 p-6">
        <div className="flex items-center justify-between text-sm uppercase tracking-[0.25em] text-slate-500">
          <span>Conservative</span>
          <span>Aggressive</span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          value={riskTolerance}
          onChange={(event) => setRiskTolerance(Number(event.target.value))}
          className="mt-5 w-full accent-slate-900"
        />
        <p className="mt-4 text-base text-slate-700">
          With this setting, a model portfolio might fluctuate {range} in a
          typical year.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white/80 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Sample good year
          </p>
          <p className="mt-2 text-2xl font-semibold text-emerald-600">
            {scenario.good}
          </p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white/80 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Sample bad year
          </p>
          <p className="mt-2 text-2xl font-semibold text-rose-600">
            {scenario.bad}
          </p>
        </div>
      </div>
    </div>
  );
};
