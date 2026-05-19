"use client";

import { flowSteps } from "@/data/steps";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Button } from "@/components/ui/Button";

const nextLabels: Record<string, string> = {
  welcome: "Start",
  build: "Building...",
  reveal: "Continue",
  export: "Finish",
};

export const StepNavigation = () => {
  const stepIndex = usePortfolioStore((state) => state.stepIndex);
  const nextStep = usePortfolioStore((state) => state.nextStep);
  const prevStep = usePortfolioStore((state) => state.prevStep);
  const currentStep = flowSteps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === flowSteps.length - 1;
  const isBuild = currentStep?.id === "build";

  const nextLabel = nextLabels[currentStep?.id ?? ""] ?? "Next";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <Button
        intent="ghost"
        className="px-4"
        disabled={isFirst || isBuild}
        onClick={prevStep}
      >
        Back
      </Button>
      <div className="flex items-center gap-4">
        <p className="text-xs uppercase tracking-[0.26em] text-slate-500">
          {currentStep?.label}
        </p>
        <Button
          intent="primary"
          disabled={isLast || isBuild}
          onClick={nextStep}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};
