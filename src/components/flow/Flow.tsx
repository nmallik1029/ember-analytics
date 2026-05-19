"use client";

import { useEffect } from "react";
import { flowSteps } from "@/data/steps";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { FlowStep } from "@/components/flow/FlowStep";
import { ProgressHeader } from "@/components/flow/ProgressHeader";
import { StepNavigation } from "@/components/flow/StepNavigation";

export const Flow = () => {
  const stepIndex = usePortfolioStore((state) => state.stepIndex);
  const nextStep = usePortfolioStore((state) => state.nextStep);
  const currentStep = flowSteps[stepIndex];

  useEffect(() => {
    if (currentStep?.id !== "build") {
      return;
    }
    const timer = setTimeout(() => nextStep(), 2200);
    return () => clearTimeout(timer);
  }, [currentStep?.id, nextStep]);

  if (!currentStep) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f1ea] via-[#f6f7fb] to-[#e9f1f4] text-slate-900">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute left-10 top-20 h-48 w-48 rounded-full bg-[#fcd5ce] blur-[90px]" />
        <div className="absolute right-10 top-40 h-56 w-56 rounded-full bg-[#d4e1f7] blur-[110px]" />
        <div className="absolute bottom-10 left-20 h-64 w-64 rounded-full bg-[#c7f0d8] blur-[140px]" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <ProgressHeader />
        <FlowStep step={currentStep} />
        <StepNavigation />
      </div>
    </div>
  );
};
