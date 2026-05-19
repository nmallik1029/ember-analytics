import { timeHorizonOptions } from "@/data/options";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cn } from "@/lib/cn";

export const HorizonStep = () => {
  const timeHorizon = usePortfolioStore((state) => state.timeHorizon);
  const setTimeHorizon = usePortfolioStore((state) => state.setTimeHorizon);

  return (
    <div className="space-y-4">
      {timeHorizonOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => setTimeHorizon(option.id)}
          className={cn(
            "flex w-full items-center justify-between rounded-[24px] border border-slate-200 bg-white/85 p-5 text-left transition hover:-translate-y-1",
            timeHorizon === option.id && "border-slate-900 bg-white"
          )}
        >
          <div>
            <p className="text-lg font-semibold text-slate-900">
              {option.label}
            </p>
            <p className="text-sm text-slate-600">{option.helper}</p>
          </div>
          <span
            className={cn(
              "h-4 w-4 rounded-full border border-slate-400",
              timeHorizon === option.id && "border-4 border-slate-900"
            )}
          />
        </button>
      ))}
    </div>
  );
};
