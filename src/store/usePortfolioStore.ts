import { create } from "zustand";
import type { ExperienceLevel, Holding, TimeHorizon } from "@/types/portfolio";

const defaultBudget = 25000;

const createHoldings = (): Holding[] => [
  { symbol: "AAPL", shares: 50, estimatedValue: 9500 },
  { symbol: "VTI", shares: 30, estimatedValue: 7200 },
];

type PortfolioState = {
  stepIndex: number;
  budget: number;
  experienceLevel: ExperienceLevel | null;
  riskTolerance: number;
  timeHorizon: TimeHorizon | null;
  sectors: string[];
  preferences: string[];
  exclusions: string[];
  customExclusions: string;
  holdings: Holding[];
  setStepIndex: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setBudget: (value: number) => void;
  setExperienceLevel: (value: ExperienceLevel) => void;
  setRiskTolerance: (value: number) => void;
  setTimeHorizon: (value: TimeHorizon) => void;
  toggleSector: (value: string) => void;
  togglePreference: (value: string) => void;
  toggleExclusion: (value: string) => void;
  setCustomExclusions: (value: string) => void;
  addHolding: (holding: Holding) => void;
  removeHolding: (symbol: string) => void;
};

export const usePortfolioStore = create<PortfolioState>((set) => ({
  stepIndex: 0,
  budget: defaultBudget,
  experienceLevel: null,
  riskTolerance: 5,
  timeHorizon: null,
  sectors: [],
  preferences: [],
  exclusions: [],
  customExclusions: "",
  holdings: createHoldings(),
  setStepIndex: (index) => set({ stepIndex: index }),
  nextStep: () => set((state) => ({ stepIndex: state.stepIndex + 1 })),
  prevStep: () => set((state) => ({ stepIndex: Math.max(0, state.stepIndex - 1) })),
  setBudget: (value) => set({ budget: value }),
  setExperienceLevel: (value) => set({ experienceLevel: value }),
  setRiskTolerance: (value) => set({ riskTolerance: value }),
  setTimeHorizon: (value) => set({ timeHorizon: value }),
  toggleSector: (value) =>
    set((state) => ({
      sectors: state.sectors.includes(value)
        ? state.sectors.filter((sector) => sector !== value)
        : [...state.sectors, value],
    })),
  togglePreference: (value) =>
    set((state) => ({
      preferences: state.preferences.includes(value)
        ? state.preferences.filter((pref) => pref !== value)
        : [...state.preferences, value],
    })),
  toggleExclusion: (value) =>
    set((state) => ({
      exclusions: state.exclusions.includes(value)
        ? state.exclusions.filter((item) => item !== value)
        : [...state.exclusions, value],
    })),
  setCustomExclusions: (value) => set({ customExclusions: value }),
  addHolding: (holding) =>
    set((state) => ({ holdings: [...state.holdings, holding] })),
  removeHolding: (symbol) =>
    set((state) => ({
      holdings: state.holdings.filter((holding) => holding.symbol !== symbol),
    })),
}));
