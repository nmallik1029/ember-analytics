export const flowSteps = [
  {
    id: "welcome",
    label: "Welcome",
    title: "Build a model portfolio in minutes",
    helper: "Educational examples only - no financial advice.",
  },
  {
    id: "budget",
    label: "Budget",
    title: "How much would you like to explore?",
    helper: "We use this number to size a model allocation.",
  },
  {
    id: "experience",
    label: "Experience",
    title: "How familiar are you with investing?",
    helper: "This shapes the vocabulary we use in the model.",
  },
  {
    id: "risk",
    label: "Risk",
    title: "How do you feel about risk?",
    helper: "This sets a hypothetical volatility band.",
  },
  {
    id: "horizon",
    label: "Horizon",
    title: "When might you need this money?",
    helper: "Time horizon influences the mix we illustrate.",
  },
  {
    id: "sectors",
    label: "Sectors",
    title: "Which themes interest you?",
    helper: "Select any to tilt the model allocation.",
  },
  {
    id: "preferences",
    label: "Preferences",
    title: "Any style preferences?",
    helper: "These toggle illustrative tilts - not recommendations.",
  },
  {
    id: "exclusions",
    label: "Exclusions",
    title: "Anything you want to avoid?",
    helper: "Optional exclusions for the model mix.",
  },
  {
    id: "holdings",
    label: "Holdings",
    title: "Do you already own anything?",
    helper: "Optional holdings help avoid over-concentration.",
  },
  {
    id: "build",
    label: "Build",
    title: "Crafting your model portfolio",
    helper: "Creating an illustrative mix based on your inputs.",
  },
  {
    id: "reveal",
    label: "Reveal",
    title: "Model Portfolio (Educational)",
    helper: "Illustrative allocation only - not advice or solicitation.",
  },
  {
    id: "export",
    label: "Export",
    title: "Save or share the model",
    helper: "Confirm you understand this is educational content.",
  },
] as const;
