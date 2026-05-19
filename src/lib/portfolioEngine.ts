import type {
  ExperienceLevel,
  Holding,
  TimeHorizon,
} from "@/types/portfolio";

export type Allocation = {
  symbol: string;
  name: string;
  assetClass: "us_equity" | "intl_equity" | "bond" | "reit" | "cash" | "alt";
  allocationPct: number;
  dollarAmount: number;
  isExistingHolding: boolean;
};

export type PortfolioSummary = {
  riskBand: "conservative" | "moderate" | "growth" | "aggressive";
  stockPct: number;
  bondPct: number;
  cashPct: number;
  notes: string[];
};

export type GenerateInputs = {
  budget: number;
  experienceLevel: ExperienceLevel | null;
  riskTolerance: number;
  timeHorizon: TimeHorizon | null;
  sectors: string[];
  preferences: string[];
  exclusions: string[];
  customExclusions?: string;
  holdings: Holding[];
};

export type GeneratedPortfolio = {
  allocations: Allocation[];
  summary: PortfolioSummary;
};

const HORIZON_WEIGHT: Record<TimeHorizon, number> = {
  "<1yr": 0,
  "1-3yr": 0.2,
  "3-7yr": 0.5,
  "7-15yr": 0.8,
  "15yr+": 1,
};

const clamp = (n: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, n));

const round2 = (n: number) => Math.round(n * 100) / 100;

const riskBand = (stockPct: number): PortfolioSummary["riskBand"] => {
  if (stockPct < 0.35) return "conservative";
  if (stockPct < 0.6) return "moderate";
  if (stockPct < 0.8) return "growth";
  return "aggressive";
};

export function generatePortfolio(inputs: GenerateInputs): GeneratedPortfolio {
  const {
    budget,
    riskTolerance,
    timeHorizon,
    sectors,
    preferences,
    exclusions,
    holdings,
  } = inputs;

  const risk = clamp(riskTolerance, 1, 10);
  const riskWeight = (risk - 1) / 9;
  const horizonWeight = timeHorizon ? HORIZON_WEIGHT[timeHorizon] : 0.5;

  let stockPct = clamp(0.3 + 0.5 * riskWeight + 0.15 * horizonWeight, 0.2, 0.95);
  const cashPct = clamp(0.15 - 0.12 * riskWeight, 0.02, 0.15);
  let bondPct = clamp(1 - stockPct - cashPct, 0, 1);

  const excludeIntl = exclusions.includes("intl");
  const excludeSmall = exclusions.includes("smallcap");
  const excludeStocks = exclusions.includes("stocks");
  const excludeCrypto = exclusions.includes("crypto");

  const intlShare = excludeIntl ? 0 : 0.25;
  const intlPct = stockPct * intlShare;
  let usPct = stockPct - intlPct;

  const buckets: Array<{
    symbol: string;
    name: string;
    assetClass: Allocation["assetClass"];
    weight: number;
  }> = [];

  let reitPct = 0;
  if (sectors.includes("realestate")) {
    reitPct = Math.min(0.08, usPct * 0.15);
    usPct -= reitPct;
  }

  const usTilts: Array<{ symbol: string; name: string; share: number }> = [];
  const tiltSize = 0.18;
  if (preferences.includes("dividend"))
    usTilts.push({ symbol: "VYM", name: "Vanguard High Dividend Yield", share: tiltSize });
  if (preferences.includes("growth"))
    usTilts.push({ symbol: "VUG", name: "Vanguard Growth", share: tiltSize });
  if (preferences.includes("value"))
    usTilts.push({ symbol: "VTV", name: "Vanguard Value", share: tiltSize });
  if (preferences.includes("sustainable") || sectors.includes("esg"))
    usTilts.push({ symbol: "ESGV", name: "Vanguard ESG U.S. Stock", share: tiltSize });

  const sectorEtfs: Record<string, { symbol: string; name: string }> = {
    tech: { symbol: "VGT", name: "Vanguard Information Technology" },
    healthcare: { symbol: "VHT", name: "Vanguard Healthcare" },
    energy: { symbol: "VDE", name: "Vanguard Energy" },
    financial: { symbol: "VFH", name: "Vanguard Financials" },
    consumer: { symbol: "VCR", name: "Vanguard Consumer Discretionary" },
    industrial: { symbol: "VIS", name: "Vanguard Industrials" },
    telecom: { symbol: "VOX", name: "Vanguard Communication Services" },
  };
  const sectorTilts = sectors
    .filter((s) => sectorEtfs[s])
    .map((s) => ({ ...sectorEtfs[s], share: 0.08 }));

  const totalTiltShare =
    usTilts.reduce((a, t) => a + t.share, 0) +
    sectorTilts.reduce((a, t) => a + t.share, 0);
  const tiltCap = excludeStocks ? 0.6 : 0.7;
  const tiltScale = totalTiltShare > tiltCap ? tiltCap / totalTiltShare : 1;
  let coreUsPct = usPct;

  for (const tilt of [...usTilts, ...sectorTilts]) {
    const pct = usPct * tilt.share * tiltScale;
    coreUsPct -= pct;
    buckets.push({
      symbol: tilt.symbol,
      name: tilt.name,
      assetClass: "us_equity",
      weight: pct,
    });
  }

  if (coreUsPct > 0.001) {
    const indexHeavy = preferences.includes("index");
    const useSmallCap = !excludeSmall && riskWeight > 0.6;
    if (useSmallCap && !indexHeavy) {
      const smallPct = coreUsPct * 0.15;
      buckets.push({
        symbol: "VB",
        name: "Vanguard Small-Cap",
        assetClass: "us_equity",
        weight: smallPct,
      });
      coreUsPct -= smallPct;
    }
    buckets.push({
      symbol: "VTI",
      name: "Vanguard Total US Stock Market",
      assetClass: "us_equity",
      weight: coreUsPct,
    });
  }

  if (intlPct > 0.001) {
    buckets.push({
      symbol: "VXUS",
      name: "Vanguard Total International Stock",
      assetClass: "intl_equity",
      weight: intlPct,
    });
  }

  if (reitPct > 0.001) {
    buckets.push({
      symbol: "VNQ",
      name: "Vanguard Real Estate",
      assetClass: "reit",
      weight: reitPct,
    });
  }

  if (bondPct > 0.001) {
    const longBonds = horizonWeight >= 0.8;
    if (longBonds && bondPct > 0.1) {
      const longPct = bondPct * 0.4;
      buckets.push({
        symbol: "BLV",
        name: "Vanguard Long-Term Bond",
        assetClass: "bond",
        weight: longPct,
      });
      bondPct -= longPct;
    }
    buckets.push({
      symbol: "BND",
      name: "Vanguard Total Bond Market",
      assetClass: "bond",
      weight: bondPct,
    });
  }

  if (cashPct > 0.001) {
    buckets.push({
      symbol: "CASH",
      name: "Cash / Money Market",
      assetClass: "cash",
      weight: cashPct,
    });
  }

  const totalWeight = buckets.reduce((a, b) => a + b.weight, 0);
  const normalized = buckets.map((b) => ({ ...b, weight: b.weight / totalWeight }));

  const heldSymbols = new Set(holdings.map((h) => h.symbol.toUpperCase()));
  const allocations: Allocation[] = normalized
    .filter((b) => b.weight > 0.001)
    .map((b) => ({
      symbol: b.symbol,
      name: b.name,
      assetClass: b.assetClass,
      allocationPct: round2(b.weight * 100),
      dollarAmount: round2(b.weight * budget),
      isExistingHolding: heldSymbols.has(b.symbol.toUpperCase()),
    }));

  const stockTotal = allocations
    .filter((a) => a.assetClass === "us_equity" || a.assetClass === "intl_equity")
    .reduce((sum, a) => sum + a.allocationPct, 0);
  const bondTotal = allocations
    .filter((a) => a.assetClass === "bond")
    .reduce((sum, a) => sum + a.allocationPct, 0);
  const cashTotal = allocations
    .filter((a) => a.assetClass === "cash")
    .reduce((sum, a) => sum + a.allocationPct, 0);

  const notes: string[] = ["Educational example only", "No execution"];
  if (excludeIntl) notes.push("International equity excluded per your preference");
  if (excludeSmall) notes.push("Small-cap exposure excluded per your preference");
  if (excludeCrypto) notes.push("Crypto / alternatives are not included");
  if (heldSymbols.size > 0) {
    notes.push(
      `Recognized existing holdings: ${[...heldSymbols].join(", ")}`
    );
  }

  return {
    allocations,
    summary: {
      riskBand: riskBand(stockTotal / 100),
      stockPct: round2(stockTotal),
      bondPct: round2(bondTotal),
      cashPct: round2(cashTotal),
      notes,
    },
  };
}
