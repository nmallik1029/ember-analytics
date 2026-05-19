export type ExperienceLevel = "beginner" | "intermediate" | "experienced" | "professional";
export type TimeHorizon = "<1yr" | "1-3yr" | "3-7yr" | "7-15yr" | "15yr+";

export type Holding = {
  symbol: string;
  shares: number;
  estimatedValue?: number;
};

export type PortfolioInputs = {
  budget: number;
  experienceLevel: ExperienceLevel | null;
  riskTolerance: number;
  timeHorizon: TimeHorizon | null;
  sectors: string[];
  preferences: string[];
  exclusions: string[];
  customExclusions: string;
  holdings: Holding[];
};
