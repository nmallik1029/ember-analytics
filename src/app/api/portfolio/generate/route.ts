import { NextResponse } from "next/server";
import { generatePortfolio, type GenerateInputs } from "@/lib/portfolioEngine";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<GenerateInputs>;

    if (typeof body.budget !== "number" || body.budget <= 0) {
      return NextResponse.json(
        { error: "budget must be a positive number" },
        { status: 400 }
      );
    }
    if (
      typeof body.riskTolerance !== "number" ||
      body.riskTolerance < 1 ||
      body.riskTolerance > 10
    ) {
      return NextResponse.json(
        { error: "riskTolerance must be between 1 and 10" },
        { status: 400 }
      );
    }

    const portfolio = generatePortfolio({
      budget: body.budget,
      experienceLevel: body.experienceLevel ?? null,
      riskTolerance: body.riskTolerance,
      timeHorizon: body.timeHorizon ?? null,
      sectors: body.sectors ?? [],
      preferences: body.preferences ?? [],
      exclusions: body.exclusions ?? [],
      customExclusions: body.customExclusions,
      holdings: body.holdings ?? [],
    });

    return NextResponse.json(portfolio);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
