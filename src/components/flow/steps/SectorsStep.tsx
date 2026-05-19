import { sectorOptions } from "@/data/options";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cn } from "@/lib/cn";

export const SectorsStep = () => {
  const sectors = usePortfolioStore((state) => state.sectors);
  const toggleSector = usePortfolioStore((state) => state.toggleSector);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sectorOptions.map((sector) => (
        <button
          key={sector.id}
          type="button"
          onClick={() => toggleSector(sector.id)}
          className={cn(
            "rounded-[26px] border border-slate-200 bg-white/85 p-5 text-left transition hover:-translate-y-1",
            sectors.includes(sector.id) &&
              "border-slate-900 bg-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)]"
          )}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Sector
          </span>
          <p className="mt-3 text-lg font-semibold text-slate-900">
            {sector.label}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            {sectors.includes(sector.id) ? "Selected" : "Tap to select"}
          </p>
        </button>
      ))}
    </div>
  );
};
