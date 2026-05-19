export const budgetPresets = [1000, 5000, 10000, 25000, 50000, 100000];

export const experienceOptions = [
  {
    id: "beginner",
    title: "New to this",
    description: "I'm just getting started",
  },
  {
    id: "intermediate",
    title: "Some experience",
    description: "I've bought stocks or funds before",
  },
  {
    id: "experienced",
    title: "Experienced",
    description: "I actively manage investments",
  },
  {
    id: "professional",
    title: "Professional",
    description: "This is what I do",
  },
] as const;

export const timeHorizonOptions = [
  {
    id: "<1yr",
    label: "Less than 1 year",
    helper: "Short-term, we keep the model stable",
  },
  { id: "1-3yr", label: "1-3 years", helper: "Near-term goal in mind" },
  { id: "3-7yr", label: "3-7 years", helper: "Medium-term growth potential" },
  { id: "7-15yr", label: "7-15 years", helper: "Long-term, can weather volatility" },
  { id: "15yr+", label: "15+ years", helper: "Retirement-focused runway" },
] as const;

export const sectorOptions = [
  { id: "tech", label: "Tech" },
  { id: "healthcare", label: "Healthcare" },
  { id: "energy", label: "Energy" },
  { id: "financial", label: "Financial" },
  { id: "consumer", label: "Consumer" },
  { id: "industrial", label: "Industrial" },
  { id: "realestate", label: "Real Estate" },
  { id: "telecom", label: "Telecom" },
  { id: "esg", label: "ESG" },
] as const;

export const preferenceOptions = [
  { id: "dividend", label: "Dividend-focused", helper: "Regular income tilt" },
  { id: "growth", label: "Growth-oriented", helper: "Long-term gains tilt" },
  { id: "value", label: "Value investing", helper: "Undervalued focus" },
  { id: "index", label: "Index-heavy", helper: "Broad market exposure" },
  { id: "stocks", label: "Individual stocks", helper: "Specific company picks" },
  { id: "sustainable", label: "ESG/Sustainable", helper: "Values-aligned focus" },
] as const;

export const exclusionOptions = [
  { id: "tobacco", label: "Tobacco" },
  { id: "weapons", label: "Weapons" },
  { id: "gambling", label: "Gambling" },
  { id: "intl", label: "International exposure" },
  { id: "smallcap", label: "Small-cap volatility" },
  { id: "crypto", label: "Crypto/alternatives" },
  { id: "stocks", label: "Individual stocks entirely" },
] as const;
