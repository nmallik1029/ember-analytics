import { experienceOptions } from "@/data/options";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cn } from "@/lib/cn";

export const ExperienceStep = () => {
  const experienceLevel = usePortfolioStore((state) => state.experienceLevel);
  const setExperienceLevel = usePortfolioStore(
    (state) => state.setExperienceLevel
  );

  return (
    <div className="grid gap-4">
      {experienceOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => setExperienceLevel(option.id)}
          className={cn(
            "flex w-full items-center justify-between rounded-[28px] border border-slate-200 bg-white/90 p-5 text-left transition hover:-translate-y-1 hover:border-slate-400 hover:shadow-lg",
            experienceLevel === option.id &&
              "border-slate-900 bg-white shadow-[0_20px_40px_-30px_rgba(15,23,42,0.4)]"
          )}
        >
          <div>
            <p className="text-lg font-semibold text-slate-900">
              {option.title}
            </p>
            <p className="text-sm text-slate-600">{option.description}</p>
          </div>
          <span
            className={cn(
              "h-3 w-3 rounded-full border border-slate-400",
              experienceLevel === option.id && "border-4 border-slate-900"
            )}
          />
        </button>
      ))}
    </div>
  );
};
