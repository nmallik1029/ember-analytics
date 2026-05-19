"use client";

import { flowSteps } from "@/data/steps";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export const ProgressHeader = () => {
  const stepIndex = usePortfolioStore((state) => state.stepIndex);

  return (
    <header className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Badge>Model Portfolio Studio</Badge>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Step {stepIndex + 1} of {flowSteps.length}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {flowSteps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-3">
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                index <= stepIndex ? "bg-slate-900" : "bg-slate-300"
              )}
            />
            {index < flowSteps.length - 1 && (
              <span
                className={cn(
                  "h-px w-10",
                  index < stepIndex ? "bg-slate-900" : "bg-slate-300"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </header>
  );
};
