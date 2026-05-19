import { preferenceOptions } from "@/data/options";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cn } from "@/lib/cn";

export const PreferencesStep = () => {
  const preferences = usePortfolioStore((state) => state.preferences);
  const togglePreference = usePortfolioStore((state) => state.togglePreference);

  return (
    <div className="grid gap-4">
      {preferenceOptions.map((pref) => (
        <button
          key={pref.id}
          type="button"
          onClick={() => togglePreference(pref.id)}
          className={cn(
            "flex w-full items-center justify-between rounded-[24px] border border-slate-200 bg-white/85 p-5 text-left transition hover:-translate-y-1",
            preferences.includes(pref.id) && "border-slate-900 bg-white"
          )}
        >
          <div>
            <p className="text-lg font-semibold text-slate-900">{pref.label}</p>
            <p className="text-sm text-slate-600">{pref.helper}</p>
          </div>
          <span
            className={cn(
              "h-5 w-5 rounded-full border border-slate-400",
              preferences.includes(pref.id) && "border-4 border-slate-900"
            )}
          />
        </button>
      ))}
    </div>
  );
};
