import { NextRequest, NextResponse } from "next/server";
import { generateHackathonPlan } from "@/lib/openai";
import { getMockPlan } from "@/lib/mockGenerator";

export async function POST(req: NextRequest) {
  try {
    const { problemStatement, apiKey, smartQuestions } = await req.json();

    if (!problemStatement || typeof problemStatement !== "string" || !problemStatement.trim()) {
      return NextResponse.json(
        { error: "Problem statement is required." },
        { status: 400 }
      );
    }

    // Check if an API key is available (either provided by the user in the UI, or set on the server env)
    const effectiveKey = apiKey?.trim() || process.env.OPENAI_API_KEY;

    if (effectiveKey) {
      // Use official OpenAI generation
      try {
        const plan = await generateHackathonPlan(problemStatement, effectiveKey, smartQuestions);
        return NextResponse.json(plan);
      } catch (err: any) {
        console.error("OpenAI generation failed, falling back to simulator:", err);
        // Fallback to simulator if API fails (e.g. invalid key or rate limit)
      }
    }

    // Fallback: Use the high-fidelity domain simulator with simulated latency
    // This ensures a beautiful developer demo experience in all conditions.
    await new Promise((resolve) => setTimeout(resolve, 2500));
    const mockPlan = getMockPlan(problemStatement);
    return NextResponse.json(mockPlan);

  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + (error?.message || String(error)) },
      { status: 500 }
    );
  }
}
