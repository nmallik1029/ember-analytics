"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import type { GeneratedPortfolio } from "@/lib/portfolioEngine";

export const BuildStep = () => {
  const startedRef = useRef(false);
  const status = usePortfolioStore((s) => s.generationStatus);
  const error = usePortfolioStore((s) => s.generationError);
  const nextStep = usePortfolioStore((s) => s.nextStep);
  const setGenerationStatus = usePortfolioStore((s) => s.setGenerationStatus);
  const setGenerated = usePortfolioStore((s) => s.setGenerated);
  const setGenerationError = usePortfolioStore((s) => s.setGenerationError);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const state = usePortfolioStore.getState();
    setGenerationStatus("loading");
    setGenerationError(null);

    const controller = new AbortController();
    const minDelay = new Promise((r) => setTimeout(r, 1400));

    const run = async () => {
      try {
        const res = await fetch("/api/portfolio/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            budget: state.budget,
            experienceLevel: state.experienceLevel,
            riskTolerance: state.riskTolerance,
            timeHorizon: state.timeHorizon,
            sectors: state.sectors,
            preferences: state.preferences,
            exclusions: state.exclusions,
            customExclusions: state.customExclusions,
            holdings: state.holdings,
          }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error ?? `Request failed (${res.status})`);
        }
        const data = (await res.json()) as GeneratedPortfolio;
        await minDelay;
        setGenerated(data);
        setGenerationStatus("ready");
        nextStep();
      } catch (err) {
        if (controller.signal.aborted) return;
        const message = err instanceof Error ? err.message : String(err);
        setGenerationError(message);
        setGenerationStatus("error");
      }
    };

    run();
    return () => controller.abort();
  }, [setGenerationStatus, setGenerated, setGenerationError, nextStep]);

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-white/70 bg-white/90 p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
          Crafting
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-slate-900">
          {status === "error"
            ? "We hit a snag building your model"
            : "Assembling an illustrative allocation"}
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          {status === "error"
            ? error ?? "Please go back and try again."
            : "This takes a few seconds to create a balanced model mix."}
        </p>
      </div>
      <div className="rounded-[28px] border border-slate-200 bg-white/85 p-6">
        <div className="grid grid-cols-5 gap-3">
          {[32, 20, 18, 12, 18].map((height, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height * 2}px` }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="w-full rounded-full bg-slate-900/80"
            />
          ))}
        </div>
        <div className="mt-6 h-4 w-full rounded-full bg-slate-200/60">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: status === "error" ? "20%" : "100%" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className={`h-4 rounded-full ${
              status === "error" ? "bg-red-400" : "bg-slate-900"
            }`}
          />
        </div>
      </div>
    </div>
  );
};
