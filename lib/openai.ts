import OpenAI from "openai";

export interface HackathonPlan {
  challengeIntelligence: {
    mostTeamsWillBuild: string;
    commonSolutions: string[];
    overusedIdeas: string[];
    predictableApproaches: string[];
    underservedOpportunities: string[];
    unexpectedAngles: string[];
    judgeAttentionMagnets: string[];
    uniqueDifferentiators: string[];
  };
  ideas: Array<{
    name: string;
    tagline: string;
    description: string;
    badges: string[];
    difficulty: "Easy" | "Medium" | "Hard";
    secretSauce: string;
  }>;
  recommendedWinner: {
    ideaName: string;
    confidence: number;
    why: string[];
    innovationScore: number;
    feasibilityScore: number;
    demoScore: number;
    impactScore: number;
    technicalComplexity: number;
    judgeAppeal: number;
  };
  judgeSimulator: {
    innovation: string;
    feasibility: string;
    technicalDepth: string;
    businessImpact: string;
    scalability: string;
    demoPotential: string;
    presentationStrength: string;
    selectionProbability: number;
    biggestWeaknesses: string[];
    whyYouMightLose: string;
    whyAnotherTeamCouldBeatYou: string;
    whatToImproveBeforeSubmission: string;
  };
  failureRisk: {
    topReasons: string[];
    mitigationPlan: string;
  };
  scopeGuardrail: {
    buildNow: string[];
    buildIfTimeRemains: string[];
    buildAfterHackathon: string[];
    doNotBuild: string[];
  };
  winningProbability: {
    score: number;
    explanation: string;
    metrics: {
      innovation: number;
      feasibility: number;
      executionRisk: number;
      teamSize: number;
      timeConstraints: number;
      demoStrength: number;
      pitchReadiness: number;
    };
  };
  submissionReadiness: {
    percentage: number;
    checklist: Array<{ item: string; status: "ready" | "pending" }>;
  };
  devStarterKit: {
    folderStructure: string[];
    databaseSchema: string;
    apiDesign: string[];
    componentTree: string[];
    implementationOrder: string[];
    deploymentPlan: string;
  };
  pastWinnerInsights: {
    whatSuccessfulTeamsUsuallyDo: string[];
    whatWinningProjectsHaveInCommon: string[];
    mostCommonMistakes: string[];
    judgesUsuallyReward: string[];
    judgesUsuallyIgnore: string[];
  };
  techStack: {
    frontend: { name: string; reasoning: string; alternatives: string[] };
    backend: { name: string; reasoning: string; alternatives: string[] };
    database: { name: string; reasoning: string; alternatives: string[] };
    ai_ml: { name: string; reasoning: string; alternatives: string[] };
    infra: { name: string; reasoning: string; alternatives: string[] };
  };
  architecture: {
    description: string;
    nodes: Array<{ id: string; label: string; type: "frontend" | "api" | "service" | "database"; x: number; y: number }>;
    edges: Array<{ source: string; target: string; label: string }>;
  };
  roadmap: Array<{
    phase: string;
    milestone: string;
    tasks: string[];
    status: "completed" | "in-progress" | "pending";
  }>;
  matrix: Array<{
    feature: string;
    description: string;
    impact: number;
    effort: number;
    quadrant: "Must Have" | "Should Have" | "Nice to Have" | "Won't Have";
  }>;
  pitchDeck: {
    slides: Array<{
      slideNum: number;
      title: string;
      subtitle: string;
      points: string[];
      notes: string;
    }>;
  };
  teamSplit: {
    frontend: { role: string; focus: string; tasks: string[] };
    backend: { role: string; focus: string; tasks: string[] };
    pitcher: { role: string; focus: string; tasks: string[] };
  };
}

export interface SmartQuestions {
  teamSize?: string;
  experienceLevel?: string;
  hackathonDuration?: string;
  preferredStack?: string;
  aiExperience?: string;
  designExperience?: string;
}

export async function generateHackathonPlan(
  problemStatement: string,
  apiKeyOverride?: string,
  smartQuestions?: SmartQuestions
): Promise<HackathonPlan> {
  const apiKey = apiKeyOverride || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("No OpenAI API key found.");
  }

  const openai = new OpenAI({ apiKey });

  const contextStr = smartQuestions
    ? `\nContext for the team:\nTeam Size: ${smartQuestions.teamSize || "Unknown"}\nExperience Level: ${smartQuestions.experienceLevel || "Unknown"}\nDuration: ${smartQuestions.hackathonDuration || "Unknown"}\nPreferred Stack: ${smartQuestions.preferredStack || "Unknown"}\nAI Experience: ${smartQuestions.aiExperience || "Unknown"}\nDesign Experience: ${smartQuestions.designExperience || "Unknown"}\n`
    : "";

  const systemPrompt = `You are HackPilot AI, an elite Hackathon Strategy Operating System. You are not a generic AI text generator. You act as an experienced hackathon mentor, strict judge, startup strategist, and technical lead.
Your job is to read a hackathon problem statement and output a specific, highly opinionated, strategic, and actionable blueprint to maximize the team's chance of winning.
Do NOT just generate generic ideas. Make recommendations. Tell them what to avoid. Be brutally honest.
Output a valid JSON object matching the requested schema. Ensure all fields are populated.
The output MUST be a JSON object with the keys matching the HackathonPlan interface.
For "challengeIntelligence", expose what most teams will build (avoid) and what underserved opportunities exist.
For "recommendedWinner", pick the BEST idea out of your 3 ideas and explain why, giving it high confidence.
For "judgeSimulator", be extremely critical and honest about why they might lose.
For "scopeGuardrail", force them to drop scope. Prevent overengineering.
For "winningProbability", calculate a real score based on constraints.
For "devStarterKit", give them tangible files and schema to start coding.
For "pastWinnerInsights", provide insider knowledge.
Return ONLY the JSON object. Do not output markdown code blocks.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Cost-effective, fast, and highly capable
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Problem Statement: "${problemStatement}"${contextStr}\nGenerate the complete HackathonPlan JSON.` },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response received from OpenAI API.");
  }

  return JSON.parse(content) as HackathonPlan;
}
