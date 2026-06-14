import { HackathonPlan } from "./openai";

export function getMockPlan(problemStatement: string): HackathonPlan {
  const query = problemStatement.toLowerCase();

  const basePlan: Partial<HackathonPlan> = {
    challengeIntelligence: {
      mostTeamsWillBuild: "A generic web dashboard with a simple CRUD database.",
      commonSolutions: ["Simple matching platform", "Basic CRUD app", "Generic LLM wrapper"],
      overusedIdeas: ["To-do list for X", "Tinder for Y", "Another expense tracker"],
      predictableApproaches: ["Using a basic template", "Ignoring edge cases", "No real technical depth"],
      underservedOpportunities: ["Hardware/IoT integration", "Advanced offline capabilities", "Hyper-niche gamification"],
      unexpectedAngles: ["Targeting the supplier instead of the consumer", "Focusing on B2B API infrastructure"],
      judgeAttentionMagnets: ["Live hardware demo", "Real-time interactive visualizations", "Sub-100ms latency"],
      uniqueDifferentiators: ["Proprietary custom algorithm", "Novel data pipeline", "Extreme UX polish"]
    },
    recommendedWinner: {
      ideaName: "Placeholder",
      confidence: 89,
      why: ["Highest judge appeal", "Strong demo potential", "Easier MVP execution"],
      innovationScore: 92,
      feasibilityScore: 88,
      demoScore: 95,
      impactScore: 90,
      technicalComplexity: 85,
      judgeAppeal: 94
    },
    judgeSimulator: {
      innovation: "Very strong. The approach to solving the core problem is novel and hasn't been seen in previous years.",
      feasibility: "Doable in 24-36 hours if the team sticks strictly to the MVP.",
      technicalDepth: "Impressive use of advanced APIs and real-time data streaming.",
      businessImpact: "Clear monetization path and high potential for enterprise adoption.",
      scalability: "Cloud-native architecture ensures it can handle high load.",
      demoPotential: "Highly visual and interactive. Will look great on stage.",
      presentationStrength: "Clear problem-solution narrative.",
      selectionProbability: 85,
      biggestWeaknesses: ["Scope might be too large", "Reliance on third-party APIs that might rate limit"],
      whyYouMightLose: "If the live demo fails or if another team executes a simpler version flawlessly.",
      whyAnotherTeamCouldBeatYou: "They built a simpler, more robust MVP that doesn't rely on complex external dependencies.",
      whatToImproveBeforeSubmission: "Cut features. Focus entirely on making the core 'magic moment' work perfectly."
    },
    failureRisk: {
      topReasons: ["Scope creep", "API rate limits during demo", "Overcomplicated frontend state", "Failing to deploy early", "Spending too much time on the pitch deck instead of code"],
      mitigationPlan: "Deploy the skeleton app in Hour 1. Hardcode fallback data in case APIs fail. Cut 50% of the planned features immediately."
    },
    scopeGuardrail: {
      buildNow: ["Core authentication", "Main interactive dashboard", "The single 'magic' AI feature"],
      buildIfTimeRemains: ["User profiles", "Settings page", "Export functionality"],
      buildAfterHackathon: ["Mobile app", "Admin panel", "Billing integration"],
      doNotBuild: ["Custom design system from scratch", "Complex microservices architecture"]
    },
    winningProbability: {
      score: 87,
      explanation: "The idea is highly innovative and has great judge appeal, but execution risk is moderate due to technical complexity.",
      metrics: {
        innovation: 92,
        feasibility: 85,
        executionRisk: 70,
        teamSize: 80,
        timeConstraints: 75,
        demoStrength: 95,
        pitchReadiness: 90
      }
    },
    submissionReadiness: {
      percentage: 25,
      checklist: [
        { item: "README.md completed", status: "pending" },
        { item: "Live demo deployed", status: "pending" },
        { item: "Pitch deck finalized", status: "pending" },
        { item: "Demo video recorded", status: "pending" },
        { item: "Screenshots taken", status: "pending" }
      ]
    },
    devStarterKit: {
      folderStructure: ["/app", "/components", "/lib", "/public", "/api"],
      databaseSchema: "Table User { id, email, created_at }\nTable Post { id, user_id, content }",
      apiDesign: ["GET /api/data", "POST /api/submit"],
      componentTree: ["App > Layout > Navbar", "App > Page > Hero", "App > Page > Dashboard"],
      implementationOrder: ["Initialize Next.js", "Setup Tailwind", "Create DB schema", "Build API routes", "Connect Frontend", "Deploy"],
      deploymentPlan: "Deploy frontend on Vercel, use Supabase for database."
    },
    pastWinnerInsights: {
      whatSuccessfulTeamsUsuallyDo: ["Deploy in the first 2 hours", "Practice the pitch 10 times", "Hardcode edge cases"],
      whatWinningProjectsHaveInCommon: ["A highly visual 'wow' moment in the first 10 seconds of the demo", "Clear ROI"],
      mostCommonMistakes: ["Trying to build too many features", "Reading off slides", "Live demo crashing"],
      judgesUsuallyReward: ["Technical depth", "Polished UX", "Clear business model"],
      judgesUsuallyIgnore: ["Minor bugs outside the main flow", "Complex architecture that isn't visible"]
    }
  };

  // 1. Sustainability / Eco
  if (query.includes("carbon") || query.includes("sustain") || query.includes("environment") || query.includes("green") || query.includes("climate") || query.includes("energy")) {
    return {
      ...(basePlan as HackathonPlan),
      challengeIntelligence: {
        ...basePlan.challengeIntelligence!,
        mostTeamsWillBuild: "A basic carbon footprint calculator for individuals.",
        underservedOpportunities: ["Automating Scope 3 enterprise audits", "Real-time ERP integrations"]
      },
      recommendedWinner: {
        ...basePlan.recommendedWinner!,
        ideaName: "TerraPulse AI",
        confidence: 94,
        why: ["Solves a massive enterprise pain point ($$$)", "Technically impressive use of pgvector", "Instant demo wow-factor with SVG mapping"]
      },
      ideas: [
        {
          name: "TerraPulse AI",
          tagline: "Real-time Supply Chain Carbon Leakage Auditor",
          description: "An AI-powered audit agent that integrates with enterprise ERPs (like SAP/Oracle) to ingest shipment routes, material bills, and manufacturing logs. It runs real-time carbon tracing, highlights leakage hotspots, and automatically generates compliance reports for CSRD and Scope 3 emissions using vector-search optimized carbon indices.",
          difficulty: "Hard",
          badges: ["Scope 3", "AI Agents", "ERP Integration", "IoT Core"],
          secretSauce: "Instead of self-reported carbon estimates, it utilizes multi-modal satellite spectral analysis overlayed with transport registry lookups to verify freight emissions within 3% accuracy."
        },
        {
          name: "EcoMesh",
          tagline: "Decentralized Circular Resource Matchmaker",
          description: "A hyper-local B2B circular economy platform that matches industrial waste outputs (e.g., heat, plastic scrap, organic waste) with local manufacturing facilities that require them as inputs. Uses custom graph-neural networks to optimize logistics routes and tokenized carbon credits to incentivize fast compliance.",
          difficulty: "Medium",
          badges: ["Circular Economy", "Graph Networks", "Carbon Credits"],
          secretSauce: "Includes an automated chemical compatibility matcher to ensure waste materials comply with local environmental manufacturing regulations."
        },
        {
          name: "SustanaCheck",
          tagline: "Chrome Extension for Instant Greenwashing Auditing",
          description: "A consumer-facing browser extension that checks e-commerce products in real-time. It extracts product descriptions, scans parent company financial filings and EPA databases via a RAG pipeline, and displays an 'Eco Integrity Score' alongside transparent citations of greenwashing practices.",
          difficulty: "Easy",
          badges: ["RAG Engine", "Browser Extension", "EPA API"],
          secretSauce: "Presents structured supply-chain mapping visualizers directly in the browser shopping cart, showing the actual geographical journey of the product."
        }
      ],
      techStack: {
        frontend: { name: "Next.js 16 (App Router) + Tailwind CSS + Framer Motion", reasoning: "Next.js SSR delivers instant loading times for green auditing dashboards.", alternatives: ["React Router + Vite"] },
        backend: { name: "Next.js Server Actions + Node.js", reasoning: "Encapsulates light, secure ERP integration logic.", alternatives: ["FastAPI"] },
        database: { name: "Supabase PostgreSQL + pgvector", reasoning: "Provides high-integrity relational capabilities alongside vector search.", alternatives: ["MongoDB Atlas"] },
        ai_ml: { name: "OpenAI GPT-4o RAG Pipeline", reasoning: "GPT-4o handles structured data extraction from irregular company PDF reports.", alternatives: ["Claude SDK"] },
        infra: { name: "Vercel Enterprise Edge", reasoning: "Vercel edge functions minimize API latency.", alternatives: ["Railway"] }
      },
      architecture: {
        description: "Modern edge-deployed event-driven RAG architecture.",
        nodes: [
          { id: "1", label: "ERP / IoT Ingestion", type: "frontend", x: 100, y: 150 },
          { id: "2", label: "Edge Gateway Router", type: "api", x: 300, y: 150 },
          { id: "3", label: "OpenAI Scope-3 Analyzer", type: "service", x: 500, y: 80 },
          { id: "4", label: "pgvector Carbon Index DB", type: "database", x: 720, y: 80 },
          { id: "5", label: "Audit logs", type: "database", x: 500, y: 220 }
        ],
        edges: [
          { source: "1", target: "2", label: "Telemetry Stream" },
          { source: "2", target: "3", label: "Structured Ingestion" },
          { source: "3", target: "4", label: "Similarity Check" },
          { source: "2", target: "5", label: "Audit Ledger Write" }
        ]
      },
      roadmap: [
        { phase: "Phase 1: Foundation", milestone: "ERP Schema Setup", tasks: ["Initialize Next.js", "Setup PostgreSQL"], status: "completed" },
        { phase: "Phase 2: AI Core", milestone: "GPT-4o Mapping", tasks: ["Develop prompts", "Set up RAG lookup"], status: "in-progress" },
        { phase: "Phase 3: Dashboard", milestone: "Visual Interface", tasks: ["Build SVG map", "Add filters"], status: "pending" },
        { phase: "Phase 4: Pitch", milestone: "Slide Assembly", tasks: ["Export reports", "Assemble slides"], status: "pending" }
      ],
      matrix: [
        { feature: "Scope-3 RAG Classifier", description: "Matches shipping logs against EPA.", impact: 98, effort: 35, quadrant: "Must Have" },
        { feature: "ERP Integration API", description: "Secure webhook.", impact: 90, effort: 60, quadrant: "Must Have" },
        { feature: "SVG Supply Chain Visualizer", description: "Interactive map.", impact: 85, effort: 45, quadrant: "Should Have" },
        { feature: "Carbon Offset Marketplace", description: "Direct checkout.", impact: 40, effort: 75, quadrant: "Nice to Have" }
      ],
      pitchDeck: {
        slides: [
          { slideNum: 1, title: "TerraPulse AI", subtitle: "Automating Scope 3 Carbon Audits", points: ["Regulatory pressures mandate trails.", "Manual accounting takes months."], notes: "Hook: Companies will face fines." },
          { slideNum: 2, title: "The Invisible Leakage", subtitle: "Why Current Accounting Fails", points: ["90% footprint is Scope 3.", "Spreadsheets lag."], notes: "Contrast spreadsheets vs AI." }
        ]
      },
      teamSplit: {
        frontend: { role: "Frontend Engineer", focus: "Design, interactivity.", tasks: ["Dark layout", "SVG map"] },
        backend: { role: "Backend Architect", focus: "Schemas, RAG.", tasks: ["PostgreSQL tables", "Webhook endpoints"] },
        pitcher: { role: "Product Manager", focus: "Compliance, presentation.", tasks: ["Validate formulas", "Write script"] }
      }
    };
  }

  // Healthcare / Medical
  if (query.includes("health") || query.includes("med") || query.includes("patient") || query.includes("doctor") || query.includes("hospital") || query.includes("clinical")) {
    return {
      ...(basePlan as HackathonPlan),
      challengeIntelligence: {
        ...basePlan.challengeIntelligence!,
        mostTeamsWillBuild: "A simple patient appointment booking app.",
        underservedOpportunities: ["Emergency Room triage orchestration", "Automated FHIR extraction"]
      },
      recommendedWinner: {
        ...basePlan.recommendedWinner!,
        ideaName: "CareFlow AI",
        confidence: 96,
        why: ["Directly impacts patient survival rates", "Impressive integration of clinical guidelines with LLMs", "High commercial value for hospitals"]
      },
      ideas: [
        {
          name: "CareFlow AI",
          tagline: "AI Hospital Emergency Room Queue Orchestrator",
          description: "A clinical triage assistant that analyzes incoming patient intake descriptions. Uses medical-tuned models to predict emergency severity, optimizes bed allocation, and alerts staff.",
          difficulty: "Hard",
          badges: ["Triage AI", "HIPAA Compliant", "Queue Optimization"],
          secretSauce: "Integrates clinical guideline knowledge trees with LLMs to eliminate triage hallucination risks."
        },
        {
          name: "AuraScan",
          tagline: "Dermatological Symptom Pre-screener",
          description: "An interactive portal for skin anomaly photos. Uses edge-based CV to identify rash patterns and suggests doctors.",
          difficulty: "Medium",
          badges: ["Edge Vision", "Booking API"],
          secretSauce: "Performs image validation on-device."
        },
        {
          name: "MediTranscribe",
          tagline: "Voice-to-FHIR Clinical Note Compiler",
          description: "Tablet app recording consultations and formatting into FHIR-compliant JSON records.",
          difficulty: "Hard",
          badges: ["FHIR Standards", "Whisper Speech"],
          secretSauce: "Semantic dictionaries correct audio transcription errors in drug names."
        }
      ],
      techStack: {
        frontend: { name: "Next.js 16 + Tailwind CSS", reasoning: "Renders patient flows and vital graphs at 60fps.", alternatives: ["Vite + React"] },
        backend: { name: "Next.js Server Actions + Fastify", reasoning: "Utilizes Fastify for high-speed clinical events.", alternatives: ["Python FastAPI"] },
        database: { name: "Supabase PostgreSQL (HIPAA Compliant)", reasoning: "Maintains relational audit logs securely.", alternatives: ["MongoDB Atlas"] },
        ai_ml: { name: "OpenAI GPT-4o + BioGPT", reasoning: "Combines reasoning with medical terminology vectors.", alternatives: ["Claude 3.5 Sonnet"] },
        infra: { name: "Vercel + AWS Med-Link", reasoning: "Hosts static UI and proxies HIPAA-sensitive endpoints.", alternatives: ["Heroku Private"] }
      },
      architecture: {
        description: "Secure, HIPAA-compliant patient intake architecture.",
        nodes: [
          { id: "1", label: "Medical Staff App", type: "frontend", x: 100, y: 150 },
          { id: "2", label: "Secure API", type: "api", x: 320, y: 150 },
          { id: "3", label: "Clinical AI", type: "service", x: 520, y: 80 },
          { id: "4", label: "Medical DB", type: "database", x: 740, y: 80 },
          { id: "5", label: "FHIR Database", type: "database", x: 520, y: 220 }
        ],
        edges: [
          { source: "1", target: "2", label: "TLS Encrypted" },
          { source: "2", target: "3", label: "Context Extract" },
          { source: "3", target: "4", label: "Verify Terms" },
          { source: "2", target: "5", label: "Secure Sync" }
        ]
      },
      roadmap: [
        { phase: "Phase 1: Setup", milestone: "DB & TLS Setup", tasks: ["Design schema", "Implement JWT"], status: "completed" },
        { phase: "Phase 2: Medical Model", milestone: "Prompt Engineering", tasks: ["Write prompts", "Index drugs"], status: "in-progress" },
        { phase: "Phase 3: Dashboard", milestone: "Vital Monitor HUD", tasks: ["Design clinical grid", "Add animations"], status: "pending" },
        { phase: "Phase 4: Export", milestone: "FHIR JSON", tasks: ["Create exporter", "Record demo"], status: "pending" }
      ],
      matrix: [
        { feature: "Clinical Symptom Triage", description: "Classifies severity.", impact: 98, effort: 45, quadrant: "Must Have" },
        { feature: "Real-time Queue", description: "Sorts queues dynamically.", impact: 95, effort: 35, quadrant: "Must Have" },
        { feature: "FHIR Exporter", description: "Converts to JSON schemas.", impact: 88, effort: 50, quadrant: "Should Have" },
        { feature: "Direct Specialist Booking", description: "Scheduling panel.", impact: 60, effort: 70, quadrant: "Nice to Have" }
      ],
      pitchDeck: {
        slides: [
          { slideNum: 1, title: "CareFlow AI", subtitle: "Emergency Care via Intelligent Triage", points: ["Wait times increased 22%.", "CareFlow AI analyzes symptoms instantly."], notes: "Introduce with: 'In emergency medicine, every minute is a life.'" },
          { slideNum: 2, title: "The Bottleneck", subtitle: "Triage is the Critical Point", points: ["Nurses spend 15 mins per patient.", "Subjective assessment."], notes: "Show how AI reduces variation." }
        ]
      },
      teamSplit: {
        frontend: { role: "Clinical UX Specialist", focus: "High-contrast dashboards.", tasks: ["Build status grids", "Develop queues"] },
        backend: { role: "Healthcare Integration", focus: "FHIR schemas, vector storage.", tasks: ["Construct JSON", "Implement prompts"] },
        pitcher: { role: "Product Manager", focus: "Compliance validation.", tasks: ["Verify rules", "Write pitch"] }
      }
    };
  }

  // Default / AI Productivity / Developer Tools
  return {
    ...(basePlan as HackathonPlan),
    challengeIntelligence: {
      ...basePlan.challengeIntelligence!,
      mostTeamsWillBuild: "A simple internal chatbot for the company wiki.",
      underservedOpportunities: ["Autonomous cross-platform architecture mapping", "Automated system diagram generation"]
    },
    recommendedWinner: {
      ...basePlan.recommendedWinner!,
      ideaName: "IntellectSync AI",
      confidence: 92,
      why: ["Replaces 5 different SaaS tools", "Extremely strong enterprise B2B use-case", "Visual node map is a guaranteed judge wow-factor"]
    },
    ideas: [
      {
        name: "IntellectSync AI",
        tagline: "Autonomous Enterprise Knowledge Integration Engine",
        description: "An AI co-pilot that scans Slack, Notion, GitHub, and Jira. Maps dependencies, flags missing specs, and creates live system architectures automatically.",
        difficulty: "Medium",
        badges: ["Enterprise Search", "Slack Bot", "RAG Engine"],
        secretSauce: "Uses semantic vector distance alerts to detect duplicate features across teams."
      },
      {
        name: "DevForge Co-Pilot",
        tagline: "AI-driven Auto-Scaffolder & Mock Generator",
        description: "Terminal interface generating databases, local mocks, and production Next.js workspaces.",
        difficulty: "Medium",
        badges: ["Next.js", "Terminal UI"],
        secretSauce: "Generates TypeScript interface definitions automatically."
      },
      {
        name: "DocuMind",
        tagline: "Interactive Cognitive Documentation Visualizer",
        description: "Transforms flat API pages into interactive flowcharts with live test requests.",
        difficulty: "Easy",
        badges: ["API Specs", "Interactive SDKs"],
        secretSauce: "Embeds request builder directly in diagram nodes."
      }
    ],
    techStack: {
      frontend: { name: "Next.js 16 + Tailwind CSS", reasoning: "Handles complex knowledge graphs.", alternatives: ["Vite"] },
      backend: { name: "Next.js Server Actions", reasoning: "Maintains rapid CRUD actions.", alternatives: ["FastAPI"] },
      database: { name: "Supabase PostgreSQL + pgvector", reasoning: "Stores embeddings relationally.", alternatives: ["MongoDB"] },
      ai_ml: { name: "OpenAI GPT-4o RAG", reasoning: "Logical analysis of documents.", alternatives: ["Claude SDK"] },
      infra: { name: "Vercel Enterprise Edge", reasoning: "Static layouts instantly.", alternatives: ["Railway"] }
    },
    architecture: {
      description: "Scalable event-driven enterprise knowledge integration.",
      nodes: [
        { id: "1", label: "Dev Dashboard", type: "frontend", x: 100, y: 150 },
        { id: "2", label: "Edge Functions", type: "api", x: 300, y: 150 },
        { id: "3", label: "GPT-4o Engine", type: "service", x: 500, y: 80 },
        { id: "4", label: "pgvector DB", type: "database", x: 720, y: 80 },
        { id: "5", label: "Relational DB", type: "database", x: 500, y: 220 }
      ],
      edges: [
        { source: "1", target: "2", label: "Query" },
        { source: "2", target: "3", label: "RAG Context" },
        { source: "3", target: "4", label: "Vector Search" },
        { source: "2", target: "5", label: "Log Metadata" }
      ]
    },
    roadmap: [
      { phase: "Phase 1: Setup", milestone: "Landing UI", tasks: ["Design tables", "Build landing"], status: "completed" },
      { phase: "Phase 2: RAG Pipeline", milestone: "Vector Engine", tasks: ["Write prompt", "Build vector script"], status: "in-progress" },
      { phase: "Phase 3: Dashboard", milestone: "Visual Architecture", tasks: ["Build CSS grid", "Add multi-tab"], status: "pending" },
      { phase: "Phase 4: Exporters", milestone: "Markdown Exporter", tasks: ["Create exporter", "Build Slide Carousel"], status: "pending" }
    ],
    matrix: [
      { feature: "AI Knowledge Extraction", description: "Indexes Slack/Jira.", impact: 95, effort: 40, quadrant: "Must Have" },
      { feature: "Unified Search", description: "Search bar.", impact: 90, effort: 30, quadrant: "Must Have" },
      { feature: "Interactive Node Visualizer", description: "Visual map.", impact: 85, effort: 45, quadrant: "Should Have" },
      { feature: "Slack Notification Bot", description: "Custom alerts.", impact: 60, effort: 50, quadrant: "Nice to Have" }
    ],
    pitchDeck: {
      slides: [
        { slideNum: 1, title: "IntellectSync AI", subtitle: "Connecting Knowledge", points: ["Teams waste 20% time searching."], notes: "Hook: Devs spend a full day searching." },
        { slideNum: 2, title: "The Disconnect", subtitle: "Silos Kill Projects", points: ["Duplicate dev efforts."], notes: "Highlight the cost." }
      ]
    },
    teamSplit: {
      frontend: { role: "Frontend UX Engineer", focus: "Workspace design.", tasks: ["Build interactive nodes", "Create SVG maps"] },
      backend: { role: "Systems Architect", focus: "Vector DBs.", tasks: ["Setup pgvector", "Secure webhooks"] },
      pitcher: { role: "Product Lead", focus: "Pitching.", tasks: ["Record demo", "Write slides"] }
    }
  };
}
