import { HackathonPlan } from "./openai";

export function getMockPlan(problemStatement: string): HackathonPlan {
  const query = problemStatement.toLowerCase();

  // 1. Sustainability / Eco
  if (query.includes("carbon") || query.includes("sustain") || query.includes("environment") || query.includes("green") || query.includes("climate") || query.includes("energy")) {
    return {
      ideas: [
        {
          name: "TerraPulse AI",
          tagline: "Real-time Supply Chain Carbon Leakage Auditor",
          description: "An AI-powered audit agent that integrates with enterprise ERPs (like SAP/Oracle) to ingest shipment routes, material bills, and manufacturing logs. It runs real-time carbon tracing, highlights leakage hotspots, and automatically generates compliance reports for CSRD and Scope 3 emissions using vector-search optimized carbon indices.",
          innovationScore: 94,
          feasibilityScore: 82,
          impactScore: 96,
          difficulty: "Hard",
          badges: ["Scope 3", "AI Agents", "ERP Integration", "IoT Core"],
          secretSauce: "Instead of self-reported carbon estimates, it utilizes multi-modal satellite spectral analysis overlayed with transport registry lookups to verify freight emissions within 3% accuracy."
        },
        {
          name: "EcoMesh",
          tagline: "Decentralized Circular Resource Matchmaker",
          description: "A hyper-local B2B circular economy platform that matches industrial waste outputs (e.g., heat, plastic scrap, organic waste) with local manufacturing facilities that require them as inputs. Uses custom graph-neural networks to optimize logistics routes and tokenized carbon credits to incentivize fast compliance.",
          innovationScore: 89,
          feasibilityScore: 90,
          impactScore: 92,
          difficulty: "Medium",
          badges: ["Circular Economy", "Graph Networks", "Carbon Credits"],
          secretSauce: "Includes an automated chemical compatibility matcher to ensure waste materials comply with local environmental manufacturing regulations."
        },
        {
          name: "SustanaCheck",
          tagline: "Chrome Extension for Instant Greenwashing Auditing",
          description: "A consumer-facing browser extension that checks e-commerce products in real-time. It extracts product descriptions, scans parent company financial filings and EPA databases via a RAG pipeline, and displays an 'Eco Integrity Score' alongside transparent citations of greenwashing practices.",
          innovationScore: 86,
          feasibilityScore: 95,
          impactScore: 88,
          difficulty: "Easy",
          badges: ["RAG Engine", "Browser Extension", "EPA API"],
          secretSauce: "Presents structured supply-chain mapping visualizers directly in the browser shopping cart, showing the actual geographical journey of the product."
        }
      ],
      techStack: {
        frontend: {
          name: "Next.js 16 (App Router) + Tailwind CSS + Framer Motion",
          reasoning: "Next.js SSR delivers instant loading times for green auditing dashboards. Framer Motion provides physics-based visual flow transitions representing supply chains.",
          alternatives: ["React Router + Vite", "Remix v3"]
        },
        backend: {
          name: "Next.js Server Actions + Node.js (TypeScript)",
          reasoning: "Encapsulates light, secure ERP integration logic and database writes without spinning up dedicated API instances.",
          alternatives: ["FastAPI (Python)", "Go (Fiber)"]
        },
        database: {
          name: "Supabase PostgreSQL + pgvector for Carbon Indices",
          reasoning: "Provides high-integrity relational capabilities for shipping logs alongside vector similarity search for EPA compliance databases.",
          alternatives: ["MongoDB Atlas", "Prisma + PostgreSQL"]
        },
        ai_ml: {
          name: "OpenAI GPT-4o RAG Pipeline + LangChain",
          reasoning: "GPT-4o handles structured data extraction from irregular company PDF reports and classifies EPA chemical regulations efficiently.",
          alternatives: ["Anthropic Claude SDK", "LlamaIndex + Gemini 1.5"]
        },
        infra: {
          name: "Vercel Enterprise Edge + AWS IoT Core",
          reasoning: "Vercel edge functions minimize API latency for global ERP synchronization, while AWS IoT channels live shipping telemetry.",
          alternatives: ["Railway", "Render + Heroku"]
        }
      },
      architecture: {
        description: "Modern edge-deployed event-driven RAG architecture mapping real-time ERP data into Supabase and OpenAI pipelines.",
        nodes: [
          { id: "1", label: "ERP / IoT Ingestion Client", type: "frontend", x: 100, y: 150 },
          { id: "2", label: "Edge Gateway Router (Next.js)", type: "api", x: 300, y: 150 },
          { id: "3", label: "OpenAI Scope-3 Analyzer", type: "service", x: 500, y: 80 },
          { id: "4", label: "pgvector Carbon Index DB", type: "database", x: 720, y: 80 },
          { id: "5", label: "PostgreSQL Audit logs", type: "database", x: 500, y: 220 }
        ],
        edges: [
          { source: "1", target: "2", label: "Telemetry Stream" },
          { source: "2", target: "3", label: "Structured Ingestion" },
          { source: "3", target: "4", label: "Scope Similarity Check" },
          { source: "2", target: "5", label: "Audit Ledger Write" }
        ]
      },
      roadmap: [
        {
          phase: "Phase 1: Foundation & Data Pipelines (Hours 0-12)",
          milestone: "ERP Schema Setup & Ingestion API",
          tasks: [
            "Initialize Next.js workspace, Tailwind CSS v4 design system, and configure UI base.",
            "Write database schema in PostgreSQL supporting pgvector for carbon categories.",
            "Create high-throughput mock ERP payload ingestion endpoint with verification tokens."
          ],
          status: "completed"
        },
        {
          phase: "Phase 2: Core AI Carbon Model (Hours 12-24)",
          milestone: "GPT-4o Extraction & Mapping",
          tasks: [
            "Develop OpenAI assistant prompts for Scope-3 emissions classification.",
            "Set up RAG lookup script matching shipment logs against EPA carbon tables.",
            "Test model consistency on 50 mock shipping logs containing mixed transport classes."
          ],
          status: "in-progress"
        },
        {
          phase: "Phase 3: Interactive Dashboard (Hours 24-32)",
          milestone: "Visual Audit Interface & Graphs",
          tasks: [
            "Build SVG supply chain mapping flow showing emission leakages.",
            "Implement multi-tab detail view: Ideas, Tech Stack, Roadmap, and Feature Matrix.",
            "Add animated filters for emissions by transport type, warehouse, and supplier."
          ],
          status: "pending"
        },
        {
          phase: "Phase 4: Optimization & Pitch Prep (Hours 32-36)",
          milestone: "Export Hub & Slide Deck Assembly",
          tasks: [
            "Enable Markdown/JSON auditing report exports.",
            "Assemble slides in Pitch Deck Generator and write speaker cues.",
            "Test client performance and run final build checklist."
          ],
          status: "pending"
        }
      ],
      matrix: [
        { feature: "Scope-3 RAG Classifier", description: "Matches shipping logs against EPA emission factors via similarity lookup.", impact: 98, effort: 35, quadrant: "Must Have" },
        { feature: "ERP Integration API", description: "Secure, authenticated webhook endpoint for enterprise logistics data.", impact: 90, effort: 60, quadrant: "Must Have" },
        { feature: "SVG Supply Chain Visualizer", description: "Interactive map plotting delivery routes and emission hotspots.", impact: 85, effort: 45, quadrant: "Should Have" },
        { feature: "CSRD Report Generator", description: "Auto-generates compliant compliance PDFs for enterprise stakeholder review.", impact: 70, effort: 50, quadrant: "Should Have" },
        { feature: "Carbon Offset Marketplace", description: "Direct checkout widget to purchase offset certificates via Stripe.", impact: 40, effort: 75, quadrant: "Nice to Have" },
        { feature: "IoT Telemetry Agent", description: "Hardware container script for tracking real-time delivery trucks.", impact: 55, effort: 90, quadrant: "Won't Have" }
      ],
      pitchDeck: {
        slides: [
          { slideNum: 1, title: "TerraPulse AI", subtitle: "Automating Scope 3 Carbon Audits at the Source", points: ["Regulatory pressures (CSRD, SEC) mandate Scope 3 audit trails.", "Manual carbon accounting takes months and is rife with greenwashing.", "TerraPulse automates audits directly from enterprise ERP systems in real-time."], notes: "Open with: 'By 2027, companies that can't trace their supply chain emissions will face massive compliance fines. Today, we're fixing this.'" },
          { slideNum: 2, title: "The Invisible Leakage", subtitle: "Why Current Carbon Accounting Fails", points: ["90% of a company's footprint is Scope 3 (indirect value chain).", "Relying on quarterly manual surveys creates a feedback lag.", "We capture live logistics, material changes, and supplier spectral data."], notes: "Highlight that current spreadsheets are guesses. Show the contrast between spreadsheets and automated AI audit agents." },
          { slideNum: 3, title: "How TerraPulse Works", subtitle: "Edge Ingestion meets Cognitive Search", points: ["1. Ingestion: ERP routes and freight manifests stream via secure webhooks.", "2. Classification: GPT-4o RAG indexes data against EPA emission databases.", "3. Analysis: Pinpoints high-carbon lanes and suggests optimal materials."], notes: "Explain our pgvector system. Judges love to hear how vector search makes classification scale." },
          { slideNum: 4, title: "Market Size & Traction", subtitle: "An Untapped $18B Corporate Compliance Market", points: ["Global ESG reporting software market is growing at 16.4% CAGR.", "Initial market focus: Mid-market logistics and retail supply chains.", "Subscription SaaS model based on volume of ERP audit logs processed."], notes: "Address the commercial viability. Explain that ESG is no longer public relations; it's a strict financial liability." },
          { slideNum: 5, title: "MVP Milestones & Demo", subtitle: "From 36-Hour Hack to Scalable Enterprise Agent", points: ["Complete API ingestion pipeline validated against 10,000 logs.", "Interactive SVG leakage visualizer fully functional.", "Next step: Native integrations with SAP and Oracle NetSuite."], notes: "Summarize the hackathon execution. Bring focus back to the live interactive demo the judges are about to see." }
        ]
      },
      teamSplit: {
        frontend: {
          role: "Frontend Engineer (SaaS UX)",
          focus: "Design, dashboard interactivity, SVG charts, and slide components.",
          tasks: ["Construct dark glassmorphic layout using Outfit typography.", "Create SVG map visualizer with glowing nodes and data flows.", "Implement state transitions between panels using Framer Motion."]
        },
        backend: {
          role: "Backend & AI Architect",
          focus: "Database schemas, API endpoints, RAG pipeline, and mock payloads.",
          tasks: ["Define PostgreSQL tables and pgvector indexes in Supabase.", "Write OpenAI service utility and prompts for ESG classification.", "Build secure webhook endpoints to handle mock shipping logs."]
        },
        pitcher: {
          role: "Product Manager & Presenter",
          focus: "Validation, compliance rules, presentation slide contents, and demo video.",
          tasks: ["Validate EPA emission formulas to ensure correct calculations.", "Write slide deck script and refine speaker notes.", "Record the 2-minute project walkthrough demo video."]
        }
      }
    };
  }

  // 2. Healthcare / Medical
  if (query.includes("health") || query.includes("med") || query.includes("patient") || query.includes("doctor") || query.includes("hospital") || query.includes("clinical")) {
    return {
      ideas: [
        {
          name: "CareFlow AI",
          tagline: "AI Hospital Emergency Room Queue Orchestrator",
          description: "A clinical triage assistant that analyzes incoming patient intake descriptions, voice records, and vital signals. It uses medical-tuned models to predict emergency severity, optimizes bed allocation algorithms, and alerts medical staff of impending critical condition risks before they manifest.",
          innovationScore: 96,
          feasibilityScore: 78,
          impactScore: 98,
          difficulty: "Hard",
          badges: ["Triage AI", "HIPAA Compliant", "Queue Optimization"],
          secretSauce: "Integrates clinical guideline knowledge trees with LLMs to eliminate triage hallucination risks, verified by real-time clinical verification checkpoints."
        },
        {
          name: "AuraScan",
          tagline: "Dermatological Symptom Pre-screener",
          description: "An interactive patient portal allowing users to capture high-definition skin anomaly photos. Uses edge-based computer vision classifiers to identify skin rash patterns and suggests nearby specialist doctors, integrating directly with booking APIs.",
          innovationScore: 88,
          feasibilityScore: 92,
          impactScore: 90,
          difficulty: "Medium",
          badges: ["Edge Vision", "Patient Engagement", "Booking API"],
          secretSauce: "Performs image validation on-device to ensure contrast and focus are sufficient before querying server APIs."
        },
        {
          name: "MediTranscribe",
          tagline: "Voice-to-FHIR Clinical Note Compiler",
          description: "A tablet app for doctors that records consultations, extracts key patient history, diagnoses, and medication prescriptions, and formats them into FHIR-compliant JSON records for instant upload into Epic or Cerner.",
          innovationScore: 91,
          feasibilityScore: 86,
          impactScore: 95,
          difficulty: "Hard",
          badges: ["FHIR Standards", "Whisper Speech", "EHR Sync"],
          secretSauce: "Utilizes medical term semantic dictionaries to correct audio transcription errors in drug names automatically."
        }
      ],
      techStack: {
        frontend: {
          name: "Next.js 16 (App Router) + Tailwind CSS + Framer Motion",
          reasoning: "Renders patient flows and vital graphs at 60fps, essential for high-stress emergency room interfaces.",
          alternatives: ["Vite + React", "SvelteKit"]
        },
        backend: {
          name: "Next.js Server Actions + Node.js (TypeScript) + Fastify API",
          reasoning: "Utilizes Fastify for high-speed clinical events, combined with Next.js App Router for serverless dashboard rendering.",
          alternatives: ["Python FastAPI", "Golang"]
        },
        database: {
          name: "Supabase PostgreSQL (HIPAA Compliant Configuration)",
          reasoning: "Maintains relational audit logs of emergency patient assignments with strict row-level security policies.",
          alternatives: ["MongoDB Atlas M10", "CockroachDB"]
        },
        ai_ml: {
          name: "OpenAI GPT-4o + BioGPT / Med-PaLM embeddings",
          reasoning: "Combines GPT-4o's reasoning and JSON generation capabilities with medical terminology vector databases.",
          alternatives: ["Anthropic Claude 3.5 Sonnet", "Gemini 1.5 Pro"]
        },
        infra: {
          name: "Vercel + AWS Med-Link (HIPAA-dedicated instance)",
          reasoning: "Hosts static web UI components on Vercel, proxying HIPAA-sensitive client endpoints securely to dedicated AWS servers.",
          alternatives: ["Heroku Private Spaces", "Render Teams"]
        }
      },
      architecture: {
        description: "Secure, HIPAA-compliant patient intake architecture with clinical data validation filters and direct FHIR EHR outputs.",
        nodes: [
          { id: "1", label: "Medical Staff Triage App", type: "frontend", x: 100, y: 150 },
          { id: "2", label: "Secure API (Next.js Node.js)", type: "api", x: 320, y: 150 },
          { id: "3", label: "Clinical AI Classifier", type: "service", x: 520, y: 80 },
          { id: "4", label: "BioGPT Medical Index DB", type: "database", x: 740, y: 80 },
          { id: "5", label: "Patient FHIR Database", type: "database", x: 520, y: 220 }
        ],
        edges: [
          { source: "1", target: "2", label: "TLS Encrypted Payload" },
          { source: "2", target: "3", label: "Clinical Context Extract" },
          { source: "3", target: "4", label: "Verify Medical Terms" },
          { source: "2", target: "5", label: "Secure Database Sync" }
        ]
      },
      roadmap: [
        {
          phase: "Phase 1: Setup & HIPAA Security Base (Hours 0-10)",
          milestone: "Database Schema & TLS Setup",
          tasks: [
            "Initialize Next.js project and layout design system config.",
            "Design PostgreSQL schema for patients, triage queues, and doctors.",
            "Implement secure JWT authentication and mock encryption helpers."
          ],
          status: "completed"
        },
        {
          phase: "Phase 2: Medical Extraction Model (Hours 10-22)",
          milestone: "Clinical Prompt Engineering",
          tasks: [
            "Write OpenAI structured prompts for medical symptom triage.",
            "Index a list of 1,000 standard drugs and diseases in vector database.",
            "Create test suite of 25 medical triage scenarios to measure triage score consistency."
          ],
          status: "in-progress"
        },
        {
          phase: "Phase 3: Real-time Dashboard UI (Hours 22-30)",
          milestone: "Clinical Vital Monitor HUD",
          tasks: [
            "Design clinical grid displaying emergency room bed map.",
            "Integrate active pulsing animations mimicking patient heartbeats.",
            "Implement priority-based medical action queues."
          ],
          status: "pending"
        },
        {
          phase: "Phase 4: EHR Export & Demo Prep (Hours 30-36)",
          milestone: "FHIR JSON Export & Submissions",
          tasks: [
            "Create exporter converting active patient logs into valid FHIR schema JSON.",
            "Record demo video highlighting rapid clinical response times.",
            "Ensure full build success and test responsive layouts."
          ],
          status: "pending"
        }
      ],
      matrix: [
        { feature: "Clinical Symptom Triage", description: "Classifies severity of incoming patient profiles using AI prompts.", impact: 98, effort: 45, quadrant: "Must Have" },
        { feature: "Real-time Priority Queue", description: "Sorts emergency patient queues dynamically by clinical urgency.", impact: 95, effort: 35, quadrant: "Must Have" },
        { feature: "FHIR Exporter API", description: "Converts clinical records into standard JSON schemas for EHR software.", impact: 88, effort: 50, quadrant: "Should Have" },
        { feature: "Active Vital Charts", description: "Live SVG telemetry tracking simulated heart rates and oxygen levels.", impact: 82, effort: 40, quadrant: "Should Have" },
        { feature: "Direct Specialist Booking", description: "Scheduling panel linked to nearby doctor directories and calendars.", impact: 60, effort: 70, quadrant: "Nice to Have" },
        { feature: "Medical Device Bluetooth Sync", description: "Direct hardware data collection from physical Bluetooth oximeters.", impact: 50, effort: 95, quadrant: "Won't Have" }
      ],
      pitchDeck: {
        slides: [
          { slideNum: 1, title: "CareFlow AI", subtitle: "Orchestrating Emergency Care via Intelligent Triage", points: ["Hospital emergency room wait times have increased by 22% globally.", "Overloaded ER queues lead to delayed care and preventable deaths.", "CareFlow AI analyzes symptoms instantly, allocating beds and clinical attention."], notes: "Introduce with: 'In emergency medicine, every minute is a life. But doctors spend 40% of their shifts sorting through paperwork rather than treating patients. We are changing that.'" },
          { slideNum: 2, title: "The Clinical Bottleneck", subtitle: "Triage is the Critical Point of Failure", points: ["Nurses spend 10-15 minutes performing intake documentation per patient.", "Subjective assessment leads to triage score variation between clinics.", "CareFlow AI creates objective, standardized vital scores in seconds."], notes: "Show how a clinical co-pilot reduces triage variation, saving critical patients from waiting." },
          { slideNum: 3, title: "Structured AI Care Model", subtitle: "Ensuring Clinical Quality & Security", points: ["1. Capture: Secure tablet ingest records patient symptoms and vital telemetry.", "2. Reference: OpenAI classifies complaints against medical index trees.", "3. Dispatch: Automatically places patient in the ER queue with full clinical tags."], notes: "Reassure judges of safety: 'We don't diagnose; we sort and structure data to help human doctors work 3x faster.'" },
          { slideNum: 4, title: "Enterprise Hospital Integration", subtitle: "Targeting the $40B Healthcare Operations Sector", points: ["Initial business model: Monthly licensing fee per emergency department.", "Scales via integration as a premium feature in Epic EHR system App Orchard.", "Reduces ER patient length-of-stay, increasing hospital daily revenue."], notes: "Explain the ROI. Hospitals want to reduce bottlenecks because open beds mean they can treat more patients." },
          { slideNum: 5, title: "Interactive Demo & Roadmap", subtitle: "Validating Clinical Co-Pilot Execution", points: ["Full EHR integration simulated using standard FHIR API payloads.", "Responsive dashboards optimized for emergency room tablet screens.", "Next milestone: Clinical trials in partnership with local university clinics."], notes: "Conclude with confidence. Reiterate the engineering rigor of our Next.js + FHIR project." }
        ]
      },
      teamSplit: {
        frontend: {
          role: "Clinical UX Specialist",
          focus: "High-contrast clinical dashboards, responsive layouts, and vital charts.",
          tasks: ["Build medical status grids using bright, easy-to-read clinical indicators.", "Develop interactive triage queues with drag-and-drop support.", "Add smooth state transitions when patient priorities change."]
        },
        backend: {
          role: "Healthcare Integration & AI Engineer",
          focus: "FHIR schemas, symptom extraction, vector storage, and security.",
          tasks: ["Construct FHIR-compliant patient JSON data structures.", "Implement OpenAI clinical symptom classification prompts.", "Secure API routes with request sanitizers and mock encryption layers."]
        },
        pitcher: {
          role: "Product Manager & Clinical Liaison",
          focus: "Compliance validation, presentation scripts, and showcase demo.",
          tasks: ["Cross-verify symptom triage rules against standard clinical triage guides.", "Write pitch presentation slides and script.", "Record the 2-minute clinical demo showing tablet dashboard integration."]
        }
      }
    };
  }

  // 3. Web3 / Decentralized / Crypto
  if (query.includes("web3") || query.includes("crypto") || query.includes("blockchain") || query.includes("contract") || query.includes("defi") || query.includes("token")) {
    return {
      ideas: [
        {
          name: "DecentraTrust AI",
          tagline: "Autonomous Smart Contract Security Agent",
          description: "An AI-powered security scanner that audits Solidity/Rust smart contracts. It integrates RAG with formal verification models to spot logical exploits, reentrancy vectors, and flash loan vulnerabilities, generating interactive threat map diagrams and remediation patches.",
          innovationScore: 95,
          feasibilityScore: 80,
          impactScore: 97,
          difficulty: "Hard",
          badges: ["Smart Contracts", "Security Audits", "Solidity RAG"],
          secretSauce: "Generates custom formal verification assertions automatically from contract code to prove the absence of critical mathematical bugs in DeFi logic."
        },
        {
          name: "DeFi Copilot",
          tagline: "Real-time Protocol Risk & Liquidation Alert HUD",
          description: "A tracking dashboard that monitors user addresses across multiple chains. It runs predictive simulations on protocol health, debt ratios, and asset slippages, sending Telegram/SMS alerts before liquidation thresholds are crossed.",
          innovationScore: 87,
          feasibilityScore: 94,
          impactScore: 92,
          difficulty: "Medium",
          badges: ["Cross-chain Core", "Risk Modeling", "Alert Webhooks"],
          secretSauce: "Uses local Monte Carlo simulation scripts inside browser workers to project liquidation hazards based on real-time price feeds."
        },
        {
          name: "TokenMint AI",
          tagline: "AI-driven Tokenomics & Utility Simulation Engine",
          description: "A sandbox application that lets founders input desired utility rules and emission schedules. The AI models run market scenarios, forecasting inflationary pressures, treasury runaways, and token price stability indicators.",
          innovationScore: 90,
          feasibilityScore: 88,
          impactScore: 89,
          difficulty: "Medium",
          badges: ["Tokenomics", "Agent Simulations", "Economics Sandbox"],
          secretSauce: "Renders visual treasury dashboards showing simulated runway and user retention metrics across 5 years of network activity."
        }
      ],
      techStack: {
        frontend: {
          name: "Next.js 16 (App Router) + Tailwind CSS + Framer Motion",
          reasoning: "Provides high-performance interactive threat maps and glowing risk dashboards required by Web3 engineers.",
          alternatives: ["Vite + React", "SolidJS"]
        },
        backend: {
          name: "Next.js Server Actions + Node.js (TypeScript) + ethers.js / viem",
          reasoning: "Performs RPC node queries, compiles smart contracts, and maps transaction histories securely on server endpoints.",
          alternatives: ["Golang (go-ethereum)", "Rust (Axum)"]
        },
        database: {
          name: "Supabase PostgreSQL + Prisma ORM",
          reasoning: "Stores code audit results, verified contracts, user profiles, and threat metrics in high-security relational tables.",
          alternatives: ["MongoDB Atlas", "DynamoDB"]
        },
        ai_ml: {
          name: "OpenAI GPT-4o + Custom Solidity AST parser",
          reasoning: "GPT-4o audits logic flow and identifies developer intent, while AST parsers verify syntax correctness.",
          alternatives: ["Claude 3.5 Sonnet", "DeepSeek Coder"]
        },
        infra: {
          name: "Vercel Enterprise Edge + QuickNode RPC Nodes",
          reasoning: "Vercel hosts web logic, and QuickNode supplies instant transaction data from Ethereum, Arbitrum, and Base.",
          alternatives: ["Railway + Infura", "AWS ECS"]
        }
      },
      architecture: {
        description: "Event-driven smart contract compiler and vulnerability scanner indexing audit ledgers via Supabase and QuickNode.",
        nodes: [
          { id: "1", label: "Web3 Developer IDE (Next.js)", type: "frontend", x: 100, y: 150 },
          { id: "2", label: "Audit Orchestrator API", type: "api", x: 300, y: 150 },
          { id: "3", label: "GPT-4o Threat Scanner", type: "service", x: 500, y: 80 },
          { id: "4", label: "AST Parse Compiler", type: "service", x: 710, y: 80 },
          { id: "5", label: "Audit Ledger Database", type: "database", x: 500, y: 220 }
        ],
        edges: [
          { source: "1", target: "2", label: "Upload Code Payload" },
          { source: "2", target: "3", label: "Extract Logic Intent" },
          { source: "2", target: "4", label: "Generate Syntax Trees" },
          { source: "2", target: "5", label: "Save Security Reports" }
        ]
      },
      roadmap: [
        {
          phase: "Phase 1: Compiler Setup & Ingestion (Hours 0-10)",
          milestone: "AST Parser Integration",
          tasks: [
            "Initialize Next.js App, set up Tailwind v4 theme, and configure typography.",
            "Write Solidity contract parser utility to extract smart contract syntax trees.",
            "Build database tables to store contract files, AST maps, and audit outputs."
          ],
          status: "completed"
        },
        {
          phase: "Phase 2: Vulnerability Detection Models (Hours 10-22)",
          milestone: "GPT-4o Threat Engine & RAG",
          tasks: [
            "Structure system prompts with common DeFi exploit databases (reentrancy, overflows).",
            "Develop AST validation checks to detect raw math errors in contracts.",
            "Test scanner accuracy against 15 intentionally vulnerable smart contracts."
          ],
          status: "in-progress"
        },
        {
          phase: "Phase 3: Interactive Auditing HUD (Hours 22-30)",
          milestone: "Threat Flow Map & Diff Reviewer",
          tasks: [
            "Design visual code reviewer with inline AI comment cards.",
            "Build interactive threat flow mapping showing transaction paths.",
            "Implement high-performance code diff view to compare fixes."
          ],
          status: "pending"
        },
        {
          phase: "Phase 4: Optimization & Pitch Prep (Hours 30-36)",
          milestone: "Audit Report Exporter & Slides",
          tasks: [
            "Build report exporter for professional Markdown/PDF security sheets.",
            "Add simulated token checkout features for locking in audits.",
            "Compile pitch deck slides and record 2-minute project overview."
          ],
          status: "pending"
        }
      ],
      matrix: [
        { feature: "Solidity Vulnerability Audit", description: "Performs deep AI logic scans looking for reentrancy, overflow, or logic flaws.", impact: 98, effort: 45, quadrant: "Must Have" },
        { feature: "AST Syntax Validation", description: "Extracts code trees to verify code compiled without warnings.", impact: 90, effort: 30, quadrant: "Must Have" },
        { feature: "Interactive Threat Map", description: "Visual node chart tracking how tokens flow during malicious exploits.", impact: 85, effort: 45, quadrant: "Should Have" },
        { feature: "AI Remediation Patches", description: "Provides inline code diff suggestions to fix vulnerable code snippets.", impact: 80, effort: 50, quadrant: "Should Have" },
        { feature: "Multi-Chain RPC Auditor", description: "Analyzes live state variables of deployed protocols via node queries.", impact: 65, effort: 75, quadrant: "Nice to Have" },
        { feature: "Automatic Multi-Sig Proposer", description: "Submits threat-response configurations directly to SAFE multisigs.", impact: 40, effort: 90, quadrant: "Won't Have" }
      ],
      pitchDeck: {
        slides: [
          { slideNum: 1, title: "DecentraTrust AI", subtitle: "Automating Smart Contract Audits with Rigorous AI Security", points: ["DeFi protocols lost over $2.1B to smart contract exploits last year.", "Professional security audits cost upwards of $50k and take months.", "DecentraTrust provides instantaneous, high-fidelity security scans at a fraction of the cost."], notes: "Hook: 'Last year, $2.1 billion vanished from smart contracts because of simple coding mistakes. Today we introduce the solution to secure DeFi in seconds.'" },
          { slideNum: 2, title: "The Security Deficit", subtitle: "Manual Audits Can't Scale with Rapid DeFi Development", points: ["Development teams face major bottlenecks waiting weeks for audit spots.", "Traditional tools generate noise and miss complex cross-contract logical exploits.", "We combine AST structural validation with LLM conceptual auditing."], notes: "Explain that static analyzers miss logic. That's why combining compiler ASTs with reasoning AI changes the game." },
          { slideNum: 3, title: "Intelligent Security Auditing", subtitle: "Compiler Precision Meets Generative Logic Scan", points: ["1. Ingestion: Developer pastes Solidity or Rust code directly in the app.", "2. Compile: AST parser breaks down function structures and state variables.", "3. Audit: GPT-4o scans logic patterns, predicting reentrancy and access flaws."], notes: "Emphasize security. Walk through how we isolate logic checks and output interactive remediation diffs." },
          { slideNum: 4, title: "Product Commercialization", subtitle: "Tapping the Expanding Web3 Compliance Market", points: ["B2B SaaS pricing model: Flat monthly fee for continuous GitHub repository scanning.", "Pay-per-scan API credits for developers and freelance contract authors.", "Affiliate partnership programs with smart contract deployment suites."], notes: "Explain our business: 'We charge teams a monthly subscription to run scans automatically on every Git commit.'" },
          { slideNum: 5, title: "Developer Demo & Execution", subtitle: "Robust MVP Completed in 36 Hours", points: ["Working code parser and security rating engine fully online.", "Beautiful interactive threat dashboard displaying remediation diffs.", "Next milestone: Integration with GitHub Actions and Hardhat plugins."], notes: "Close by directing attention back to the threat mapping dashboard. Show the judges the precision of the generated fixes." }
        ]
      },
      teamSplit: {
        frontend: {
          role: "Web3 UI Designer",
          focus: "Interactive threat mapping charts, syntax-highlighted code editors, and diff dashboards.",
          tasks: ["Implement dark cyber-style terminal components for code reviews.", "Create SVG threat connection diagrams representing transaction states.", "Build layout tabs with smooth slide panels using Framer Motion."]
        },
        backend: {
          role: "Smart Contract & Security Architect",
          focus: "AST compilation, vulnerability patterns, RAG databases, and RPC sync.",
          tasks: ["Build Solidity AST parser wrappers inside server endpoints.", "Design GPT-4o system instructions for audit logic classification.", "Configure Postgres database tables for storage of contract audits."]
        },
        pitcher: {
          role: "Product Manager & Technical Author",
          focus: "Exploit databases, presentation design, and recording the walk-through.",
          tasks: ["Cross-verify AI audits against documented DeFi exploits.", "Write slide script content and structure presenter notes.", "Record the 2-minute developer showcase video demonstrating contract audits."]
        }
      }
    };
  }

  // 4. Default / AI Productivity / Developer Tools
  return {
    ideas: [
      {
        name: "IntellectSync AI",
        tagline: "Autonomous Enterprise Knowledge Integration Engine",
        description: "An AI-powered co-pilot that scans company Slack, Notion, GitHub, and Jira channels. It maps cross-platform task requirements, flags missing technical specifications, and creates live system architectures, data flows, and team assignments automatically as tickets are created.",
        innovationScore: 92,
        feasibilityScore: 85,
        impactScore: 94,
        difficulty: "Medium",
        badges: ["Enterprise Search", "Slack Bot", "Jira Sync", "RAG Engine"],
        secretSauce: "Uses semantic vector distance alerts to detect when developers are working on duplicate features or diverging architectures across different teams."
      },
      {
        name: "DevForge Co-Pilot",
        tagline: "AI-driven Auto-Scaffolder & Mock Generator",
        description: "A terminal interface where developer leads specify a database schema and API routing goals. The AI compiles folders, sets up local mock endpoints, creates mock data arrays, and exports a production-ready Next.js workspace in one click.",
        innovationScore: 89,
        feasibilityScore: 92,
        impactScore: 91,
        difficulty: "Medium",
        badges: ["Next.js", "Terminal UI", "Mocking API"],
        secretSauce: "Generates TypeScript interface definitions automatically, aligning client and server state types without manual compilation."
      },
      {
        name: "DocuMind",
        tagline: "Interactive Cognitive Documentation Visualizer",
        description: "A documentation portal that parses long technical API specifications. It transforms flat pages into interactive flowcharts, allowing developers to query functional points, try live test requests, and generate client SDK scripts instantly.",
        innovationScore: 86,
        feasibilityScore: 96,
        impactScore: 88,
        difficulty: "Easy",
        badges: ["API Specs", "Interactive SDKs", "RAG Pipeline"],
        secretSauce: "Embeds an interactive request builder directly in the diagram nodes, letting developers test routes without leaving the visualizer."
      }
    ],
    techStack: {
      frontend: {
        name: "Next.js 16 (App Router) + Tailwind CSS + Framer Motion",
        reasoning: "Next.js server-side loading handles complex knowledge graphs, while Framer Motion handles dynamic dashboard tab changes and timeline steps.",
        alternatives: ["React Router + Vite", "SolidJS"]
      },
      backend: {
        name: "Next.js Server Actions + Node.js (TypeScript)",
        reasoning: "Maintains rapid database CRUD actions and securely forwards Slack/GitHub webhooks without dedicated server instances.",
        alternatives: ["FastAPI (Python)", "Go (Fiber)"]
      },
      database: {
        name: "Supabase PostgreSQL + pgvector for RAG indexing",
        reasoning: "Stores structured user records, chat history, and document embeddings in a unified relational structure.",
        alternatives: ["MongoDB Atlas", "Prisma + PostgreSQL"]
      },
      ai_ml: {
        name: "OpenAI GPT-4o RAG pipeline + LangChain",
        reasoning: "GPT-4o delivers industry-leading logical analysis of documents and produces highly structured JSON co-pilot roadmaps.",
        alternatives: ["Claude SDK", "LlamaIndex + Gemini 1.5 Pro"]
      },
      infra: {
        name: "Vercel Enterprise Edge + AWS Lambda API",
        reasoning: "Vercel delivers static layouts and UI states instantly, while AWS serverless handles long-running document processing tasks.",
        alternatives: ["Railway", "Render + Heroku"]
      }
    },
    architecture: {
      description: "Scalable event-driven enterprise knowledge integration system with RAG query pipelines and relational storage.",
      nodes: [
        { id: "1", label: "Dev Dashboard Interface (Next.js)", type: "frontend", x: 100, y: 150 },
        { id: "2", label: "Edge Functions Gateway (Next.js)", type: "api", x: 300, y: 150 },
        { id: "3", label: "GPT-4o Knowledge Engine", type: "service", x: 500, y: 80 },
        { id: "4", label: "pgvector Knowledge Vector DB", type: "database", x: 720, y: 80 },
        { id: "5", label: "System Relational database", type: "database", x: 500, y: 220 }
      ],
      edges: [
        { source: "1", target: "2", label: "User Ingestion Query" },
        { source: "2", target: "3", label: "RAG Context Retrieve" },
        { source: "3", target: "4", label: "Vector Search Query" },
        { source: "2", target: "5", label: "Log Query Metadata" }
      ]
    },
    roadmap: [
      {
        phase: "Phase 1: Project Scaffolding & Setup (Hours 0-8)",
        milestone: "Database Schema & Landing UI",
        tasks: [
          "Initialize Next.js App, write Tailwind v4 configuration variables.",
          "Design database tables for files, chat history, and project nodes.",
          "Build landing layout and responsive input terminal components."
        ],
        status: "completed"
      },
      {
        phase: "Phase 2: RAG Pipeline Integration (Hours 8-20)",
        milestone: "OpenAI Vector Search Engine",
        tasks: [
          "Write OpenAI system prompt template for knowledge extraction.",
          "Build vector processing script to generate embeddings for API specifications.",
          "Run benchmark tests of search queries against 100 sample documents."
        ],
        status: "in-progress"
      },
      {
        phase: "Phase 3: Interactive Dashboard (Hours 20-30)",
        milestone: "Visual Architecture Diagram & HUD",
        tasks: [
          "Build CSS grid layout representing knowledge nodes.",
          "Implement animated active connections mapping data streams.",
          "Add multi-tab dashboard switching (Ideas, Stack, Timeline, Matrix)."
        ],
        status: "pending"
      },
      {
        phase: "Phase 4: Exporters & Pitch Deck (Hours 30-36)",
        milestone: "Markdown Exporter & Slides Engine",
        tasks: [
          "Create exporter utility for Markdown and custom JSON configs.",
          "Build Slide Carousel inside Pitch Deck panel and write speaker logs.",
          "Verify Next.js build correctness and test component responsivity."
        ],
        status: "pending"
      }
    ],
    matrix: [
      { feature: "AI Knowledge Extraction", description: "Indexes Slack/Jira channels and auto-formats specs.", impact: 95, effort: 40, quadrant: "Must Have" },
      { feature: "Unified Search Interface", description: "Search bar searching files, vector embeddings, and tasks simultaneously.", impact: 90, effort: 30, quadrant: "Must Have" },
      { feature: "Interactive Node Visualizer", description: "Visual node map representing enterprise knowledge dependencies.", impact: 85, effort: 45, quadrant: "Should Have" },
      { feature: "Automatic Jira Ticket Sync", description: "Webhook to auto-create tickets from AI architecture diagrams.", impact: 75, effort: 60, quadrant: "Should Have" },
      { feature: "Slack Notification Bot", description: "Custom Slack bot pushing system architecture alerts.", impact: 60, effort: 50, quadrant: "Nice to Have" },
      { feature: "Offline Local Llama Support", description: "Container system to run indexing models locally on developer machines.", impact: 45, effort: 95, quadrant: "Won't Have" }
    ],
    pitchDeck: {
      slides: [
        { slideNum: 1, title: "IntellectSync AI", subtitle: "Connecting Enterprise Knowledge Channels Automatically", points: ["Teams waste 20% of their time searching for information across scattered tools.", "Diverging tech specs lead to expensive development mistakes.", "IntellectSync maps Slack, Notion, and Jira into one unified model in real-time."], notes: "Hook: 'Did you know developers spend a full day every week just searching for tickets and specs? Today we show how AI resolves this bottleneck.'" },
        { slideNum: 2, title: "The Knowledge Disconnect", subtitle: "Static Documentation and Chat Silos Kill Projects", points: ["Information gets buried in Slack channels or stale Notion files.", "No unified view exists mapping active tasks to system databases.", "Duplicate development efforts occur because teams lack visibility."], notes: "Highlight the cost: 'When documentation is stale, code breaks. It's that simple.'" },
        { slideNum: 3, title: "The Solution: Semantic Maps", subtitle: "Cognitive Knowledge Ingest & Vector Retrieval", points: ["1. Scrape: Event-driven webhooks ingest conversations and technical files.", "2. Index: pgvector database embeds knowledge blocks.", "3. Map: Automatically builds interactive architecture graphs for teams."], notes: "Reassure on security: 'Data remains fully encrypted. We scan indices to build relational maps, never storing secrets.'" },
        { slideNum: 4, title: "Business Strategy & Traction", subtitle: "A Highly Lucrative Developer Operations Market", points: ["Target: Enterprise tech teams and high-growth remote software companies.", "SaaS pricing based on active workspace integrations (Slack, Jira, etc.).", "Reduces project onboarding times by 40%, boosting developer velocity."], notes: "Explain ROI: 'Saving onboarding hours means engineers build features faster, boosting velocity.'" },
        { slideNum: 5, title: "Live MVP Demo & Future Goals", subtitle: "A Complete Team Workspace Built in 36 Hours", points: ["Full working vector indexing pipeline and search UI completed.", "Interactive SVG system diagram and Gantt timelines active.", "Next milestone: Release GitHub actions plugin for automatic README generation."], notes: "Conclude with confidence. Reiterate the engineering speed and high visual quality of the HackForge AI MVP dashboard." }
      ]
    },
    teamSplit: {
      frontend: {
        role: "Frontend UX Engineer",
        focus: "Workspace design, SVG dashboards, and transition states.",
        tasks: ["Build interactive nodes dashboard using Outfit typography.", "Create SVG knowledge maps with active data flows.", "Implement state transitions between panels using Framer Motion."]
      },
      backend: {
        role: "Backend & Systems Architect",
        focus: "Vector database schemas, API routes, and integration connectors.",
        tasks: ["Setup pgvector schema and index query tables.", "Build OpenAI indexing prompts for specifications.", "Create secure webhook routes to capture mock Slack data streams."]
      },
      pitcher: {
        role: "Product Lead & Speaker",
        focus: "Domain analysis, presentation deck alignment, and showcase demo video.",
        tasks: ["Review accuracy of search indices against sample specifications.", "Draft script outline and write presentation slides.", "Record 2-minute video walkthrough of the software workspace dashboard."]
      }
    }
  };
}
