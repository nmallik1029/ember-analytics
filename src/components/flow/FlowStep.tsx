"use client";

import { AnimatePresence, motion } from "framer-motion";
import { flowSteps } from "@/data/steps";
import { WelcomeStep } from "@/components/flow/steps/WelcomeStep";
import { BudgetStep } from "@/components/flow/steps/BudgetStep";
import { ExperienceStep } from "@/components/flow/steps/ExperienceStep";
import { RiskStep } from "@/components/flow/steps/RiskStep";
import { HorizonStep } from "@/components/flow/steps/HorizonStep";
import { SectorsStep } from "@/components/flow/steps/SectorsStep";
import { PreferencesStep } from "@/components/flow/steps/PreferencesStep";
import { ExclusionsStep } from "@/components/flow/steps/ExclusionsStep";
import { HoldingsStep } from "@/components/flow/steps/HoldingsStep";
import { BuildStep } from "@/components/flow/steps/BuildStep";
import { RevealStep } from "@/components/flow/steps/RevealStep";
import { ExportStep } from "@/components/flow/steps/ExportStep";

const stepMap: Record<string, () => JSX.Element> = {
  welcome: WelcomeStep,
  budget: BudgetStep,
  experience: ExperienceStep,
  risk: RiskStep,
  horizon: HorizonStep,
  sectors: SectorsStep,
  preferences: PreferencesStep,
  exclusions: ExclusionsStep,
  holdings: HoldingsStep,
  build: BuildStep,
  reveal: RevealStep,
  export: ExportStep,
};

export const FlowStep = ({ step }: { step: (typeof flowSteps)[number] }) => {
  const StepComponent = stepMap[step.id];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="flex flex-col gap-5">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              {step.label}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              {step.title}
            </h1>
            <p className="text-base text-slate-600">{step.helper}</p>
          </div>
          {StepComponent ? <StepComponent /> : null}
        </div>
        <aside className="hidden flex-col gap-4 rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur lg:flex">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Educational Notice
            </p>
            <p className="text-sm leading-6 text-slate-700">
              This flow generates hypothetical, educational examples only. It does
              not provide financial advice, recommendations, or solicitations.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Data Usage
            </p>
            <p className="text-sm leading-6 text-slate-700">
              Inputs stay local to this session. You can export an educational
              report or share a model, but no execution happens here.
            </p>
          </div>
          <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-4 text-xs uppercase tracking-[0.18em] text-slate-500">
            Portfolio Builder Platform
          </div>
        </aside>
      </motion.div>
    </AnimatePresence>
  );
};
