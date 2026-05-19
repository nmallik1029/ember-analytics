import { useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Button } from "@/components/ui/Button";

export const HoldingsStep = () => {
  const holdings = usePortfolioStore((state) => state.holdings);
  const addHolding = usePortfolioStore((state) => state.addHolding);
  const removeHolding = usePortfolioStore((state) => state.removeHolding);
  const [symbol, setSymbol] = useState("");
  const [shares, setShares] = useState("");

  const handleAdd = () => {
    const parsedShares = Number(shares);
    if (!symbol || Number.isNaN(parsedShares) || parsedShares <= 0) {
      return;
    }
    addHolding({ symbol: symbol.toUpperCase(), shares: parsedShares });
    setSymbol("");
    setShares("");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white/85 p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Add a holding
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
            placeholder="Ticker symbol"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
          />
          <input
            value={shares}
            onChange={(event) => setShares(event.target.value)}
            placeholder="Shares"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
          />
          <Button intent="secondary" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        {holdings.map((holding) => (
          <div
            key={holding.symbol}
            className="flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-slate-200 bg-white/80 px-4 py-3"
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {holding.symbol}
              </p>
              <p className="text-xs text-slate-500">
                {holding.shares} shares
              </p>
            </div>
            <Button
              intent="ghost"
              className="text-xs"
              onClick={() => removeHolding(holding.symbol)}
            >
              Remove
            </Button>
          </div>
        ))}
        {!holdings.length ? (
          <p className="text-sm text-slate-500">
            No holdings added yet. You can skip this step.
          </p>
        ) : null}
      </div>
    </div>
  );
};
