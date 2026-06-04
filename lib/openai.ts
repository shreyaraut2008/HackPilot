import OpenAI from "openai";

export interface HackathonPlan {
  ideas: Array<{
    name: string;
    tagline: string;
    description: string;
    innovationScore: number;
    feasibilityScore: number;
    impactScore: number;
    difficulty: "Easy" | "Medium" | "Hard";
    badges: string[];
    secretSauce: string;
  }>;
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
    impact: number; // 0-100
    effort: number; // 0-100
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

export async function generateHackathonPlan(
  problemStatement: string,
  apiKeyOverride?: string
): Promise<HackathonPlan> {
  const apiKey = apiKeyOverride || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("No OpenAI API key found.");
  }

  const openai = new OpenAI({ apiKey });

  const systemPrompt = `You are HackPilot AI, an elite AI Hackathon Co-Pilot and System Architect. Your job is to analyze a hackathon problem statement and generate a comprehensive, premium, execution-ready roadmap to build a winning project.
Output a valid JSON object matching the following structure:
{
  "ideas": [
    {
      "name": "Project Name",
      "tagline": "Short compelling hook",
      "description": "Comprehensive explanation of how it solves the problem statement uniquely.",
      "innovationScore": 95,
      "feasibilityScore": 85,
      "impactScore": 90,
      "difficulty": "Easy",
      "badges": ["AI-Driven", "Web3", "Serverless"],
      "secretSauce": "What makes this design win the hackathon judges' hearts."
    }
  ],
  "techStack": {
    "frontend": { "name": "Next.js 16 + React 19", "reasoning": "...", "alternatives": ["Vite", "Remix"] },
    "backend": { "name": "Next.js Server Actions / Node.js", "reasoning": "...", "alternatives": ["Express", "Fastify"] },
    "database": { "name": "MongoDB / Supabase Postgres", "reasoning": "...", "alternatives": ["Redis", "Prisma SQLite"] },
    "ai_ml": { "name": "OpenAI API / LangChain / HuggingFace", "reasoning": "...", "alternatives": ["Claude SDK", "Gemini API"] },
    "infra": { "name": "Vercel / AWS", "reasoning": "...", "alternatives": ["Netlify", "Railway"] }
  },
  "architecture": {
    "description": "Architectural strategy overview",
    "nodes": [
      { "id": "1", "label": "Client UI (Next.js)", "type": "frontend", "x": 100, "y": 150 },
      { "id": "2", "label": "API Gateway / Serverless Functions", "type": "api", "x": 300, "y": 150 },
      { "id": "3", "label": "LLM Orchestration Layer", "type": "service", "x": 500, "y": 80 },
      { "id": "4", "label": "Vector Database (Pinecone)", "type": "database", "x": 700, "y": 80 },
      { "id": "5", "label": "Relational DB (Postgres)", "type": "database", "x": 500, "y": 220 }
    ],
    "edges": [
      { "source": "1", "target": "2", "label": "HTTPS Request" },
      { "source": "2", "target": "3", "label": "gRPC / REST" },
      { "source": "3", "target": "4", "label": "Embeddings Search" },
      { "source": "2", "target": "5", "label": "CRUD Operations" }
    ]
  },
  "roadmap": [
    {
      "phase": "Phase 1: Ingestion & Environment (Hours 0-6)",
      "milestone": "Setup & Scaffolding",
      "tasks": [
        "Initialize Next.js app with Tailwind and Framer Motion",
        "Configure OpenAI / database client wrappers",
        "Set up local mocks for API route testing"
      ],
      "status": "completed"
    }
  ],
  "matrix": [
    {
      "feature": "Core AI Agent Logic",
      "description": "Integrates LLM models with problem prompts",
      "impact": 95,
      "effort": 40,
      "quadrant": "Must Have"
    }
  ],
  "pitchDeck": {
    "slides": [
      {
        "slideNum": 1,
        "title": "Title Slide",
        "subtitle": "Connecting Vision to Code",
        "points": ["Introducing [Idea Name]", "A premium solution targeting [Problem]"],
        "notes": "Intro hook: Start with a relatable story about the problem domain."
      }
    ]
  },
  "teamSplit": {
    "frontend": {
      "role": "Frontend Developer",
      "focus": "Polishing UI/UX and dynamic client flow",
      "tasks": ["Implement responsive landing", "Set up Framer Motion wrappers", "Integrate state-management dashboards"]
    },
    "backend": {
      "role": "Backend / AI Engineer",
      "focus": "API Routes, databases, LLM logic",
      "tasks": ["Set up vector DB indexes", "Create API endpoints", "Integrate OpenAI system prompts"]
    },
    "pitcher": {
      "role": "Product Manager / Pitcher",
      "focus": "Slide decks, video demo, copy editing",
      "tasks": ["Refine slide deck copy", "Record 2-minute project walkthrough", "Write project README.md and submissions"]
    }
  }
}
Generate exactly 3 winning Ideas, a complete Tech Stack, at least 5 Architecture Nodes and 4 connection Edges (with appropriate standard coordinate layouts x: 50-800, y: 50-350 for visualization), a 4-Phase Roadmap, at least 6 features in the Priority Matrix, a 5-Slide Pitch Deck, and tasks for 3 roles. Make the outputs extremely innovative, creative, and highly specific to the given problem statement. 
You MUST return ONLY the JSON object. Do not output any backticks or markdown formatting.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Cost-effective, fast, and highly capable
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Problem Statement: "${problemStatement}"` },
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
