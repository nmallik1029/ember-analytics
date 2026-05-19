import { Button } from "@/components/ui/Button";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export const WelcomeStep = () => {
  const nextStep = usePortfolioStore((state) => state.nextStep);

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Welcome
        </p>
        <h2 className="mt-3 text-3xl text-slate-900">
          Explore how different inputs shape a model portfolio.
        </h2>
        <p className="mt-3 text-base text-slate-600">
          We will guide you through a short, conversational flow and build an
          illustrative mix. No accounts, no execution, just a clear educational
          snapshot.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button onClick={nextStep}>Build a Model Portfolio</Button>
        <Button intent="secondary" onClick={nextStep}>
          See How It Works
        </Button>
      </div>
    </div>
  );
};
