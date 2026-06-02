"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowGrid } from "@/components/ui/GlowGrid";
import { ProblemInput } from "@/components/dashboard/ProblemInput";
import { IdeasPanel } from "@/components/dashboard/IdeasPanel";
import { TechStackPanel } from "@/components/dashboard/TechStackPanel";
import { ArchitecturePanel } from "@/components/dashboard/ArchitecturePanel";
import { RoadmapPanel } from "@/components/dashboard/RoadmapPanel";
import { MatrixPanel } from "@/components/dashboard/MatrixPanel";
import { PitchDeckPanel } from "@/components/dashboard/PitchDeckPanel";
import { TaskSplitterPanel } from "@/components/dashboard/TaskSplitterPanel";
import { ExportPanel } from "@/components/dashboard/ExportPanel";

import {
  Sparkles,
  RefreshCw,
  Cpu,
  Trophy,
  GitBranch,
  Calendar,
  Grid as GridIcon,
  Presentation,
  Users,
  Terminal as TerminalIcon,
  Lightbulb,
  ArrowRight,
  Layers
} from "lucide-react";
import { HackathonPlan } from "@/lib/openai";

type TabKey = "ideas" | "stack" | "arch" | "roadmap" | "matrix" | "pitch" | "tasks" | "export";

interface TabMeta {
  key: TabKey;
  label: string;
  icon: React.ComponentType<any>;
  glowColor: string;
}

const TABS: TabMeta[] = [
  { key: "ideas", label: "Ideas", icon: Lightbulb, glowColor: "from-indigo-500/20 to-transparent" },
  { key: "stack", label: "Tech Stack", icon: Layers, glowColor: "from-purple-500/20 to-transparent" },
  { key: "arch", label: "Architecture", icon: GitBranch, glowColor: "from-cyan-500/20 to-transparent" },
  { key: "roadmap", label: "Roadmap", icon: Calendar, glowColor: "from-blue-500/20 to-transparent" },
  { key: "matrix", label: "Priority Matrix", icon: GridIcon, glowColor: "from-emerald-500/20 to-transparent" },
  { key: "pitch", label: "Pitch Deck", icon: Presentation, glowColor: "from-rose-500/20 to-transparent" },
  { key: "tasks", label: "Team Splitter", icon: Users, glowColor: "from-amber-500/20 to-transparent" },
  { key: "export", label: "Export Hub", icon: TerminalIcon, glowColor: "from-slate-500/20 to-transparent" }
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<HackathonPlan | null>(null);
  const [selectedIdeaIndex, setSelectedIdeaIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("ideas");
  const [error, setError] = useState<string | null>(null);
  
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (problemStatement: string, apiKey: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ problemStatement, apiKey })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Generation failed.");
      }

      const planData = (await response.json()) as HackathonPlan;
      setPlan(planData);
      setSelectedIdeaIndex(0);
      setActiveTab("ideas");
      
      // Scroll to dashboard after short delay for animations
      setTimeout(() => {
        dashboardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);

    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An unexpected error occurred during synthesis.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setError(null);
    setSelectedIdeaIndex(0);
    setActiveTab("ideas");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedIdea = plan?.ideas[selectedIdeaIndex] || plan?.ideas[0];

  return (
    <div className="flex-1 w-full relative min-h-screen pb-24">
      {/* Dynamic Glow and Grid Backdrop */}
      <GlowGrid />

      {/* Main Container */}
      <main className="w-full relative z-10">
        
        {/* Top Header Navigation */}
        <header className="w-full py-5 px-6 border-b border-white/5 bg-[#050816]/75 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-white/10">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-sm tracking-widest text-slate-100 font-mono">
              HACKPILOT AI
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 bg-emerald-950/40 border border-emerald-800/30 px-3 py-1 rounded-full text-[10px] font-mono text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CO-PILOT ENGINE ONLINE</span>
            </div>
            {plan && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Blueprint</span>
              </button>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <AnimatePresence mode="wait">
          {!plan && (
            <motion.section
              key="hero"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="py-16 md:py-24 text-center max-w-4xl mx-auto px-4 space-y-6"
            >
              {/* Top pill badge */}
              <div className="inline-flex items-center space-x-2 bg-indigo-950/40 border border-indigo-500/20 px-3 py-1 rounded-full text-xs text-indigo-300 font-mono shadow-inner shadow-indigo-500/10">
                <Trophy className="w-3.5 h-3.5 text-indigo-400" />
                <span>Next-Gen Hackathon Project Synthesizer</span>
              </div>

              {/* Title heading with text gradients */}
              <h1 className="text-4xl md:text-7xl font-extrabold leading-[1.08] text-white tracking-tight text-glow-indigo">
                Build, ship, pitch,
                <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent mt-1 pb-1">
                  and win hackathons.
                </span>
              </h1>

              {/* Description */}
              <p className="max-w-2xl mx-auto text-sm md:text-lg text-slate-400 leading-relaxed">
                Paste your hackathon challenge statement. HackPilot AI instantly engineers optimal project proposals, robust tech stacks, detailed visual architectures, 36-hour Gantt timelines, priority matrices, presentation slide outline decks, and customized team splits.
              </p>

              {/* Problem Statement input box */}
              <div className="pt-6">
                <ProblemInput onSubmit={handleGenerate} isLoading={isLoading} />
              </div>

              {/* Error messages */}
              {error && (
                <div className="max-w-lg mx-auto bg-rose-950/30 border border-rose-800/30 p-4 rounded-xl text-xs text-rose-300 font-mono mt-4">
                  ERROR: {error}
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Dashboard Workspace */}
        <AnimatePresence>
          {plan && (
            <motion.section
              key="dashboard"
              ref={dashboardRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
            >
              {/* Workspace Status Head */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden bg-gradient-to-r from-[#0c1328]/90 to-[#070c1b]/95">
                <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-b from-indigo-500 to-cyan-500" />
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block">
                    ACTIVE PROJECT WORKSPACE
                  </span>
                  <h1 className="text-xl md:text-3xl font-extrabold text-white mt-1">
                    {selectedIdea?.name || "Workspace Dashboard"}
                  </h1>
                  <p className="text-xs text-slate-400 mt-1 italic">
                    &ldquo;{selectedIdea?.tagline}&rdquo;
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="bg-black/45 border border-white/5 px-3 py-1.5 rounded-lg text-xs flex items-center space-x-2">
                    <span className="text-slate-500 font-mono">Difficulty:</span>
                    <span className="font-bold text-slate-200 font-mono">{selectedIdea?.difficulty}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs px-4 py-2 rounded-lg border border-white/10 transition"
                  >
                    Reset & Generate New
                  </button>
                </div>
              </div>

              {/* Workspace Navigation Tabs Grid */}
              <div className="flex overflow-x-auto pb-2 scrollbar-custom border-b border-white/5 gap-1.5">
                {TABS.map((t) => {
                  const TabIcon = t.icon;
                  const isActive = activeTab === t.key;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setActiveTab(t.key)}
                      className={`px-4 py-3 rounded-xl border text-xs font-bold font-mono transition-all flex items-center space-x-2 whitespace-nowrap ${
                        isActive
                          ? "bg-slate-900 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                          : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      <TabIcon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Panel Renderer */}
              <div className="min-h-[450px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {activeTab === "ideas" && (
                      <IdeasPanel
                        ideas={plan.ideas}
                        selectedIdeaIndex={selectedIdeaIndex}
                        onSelectIdea={setSelectedIdeaIndex}
                      />
                    )}

                    {activeTab === "stack" && (
                      <TechStackPanel techStack={plan.techStack} />
                    )}

                    {activeTab === "arch" && (
                      <ArchitecturePanel architecture={plan.architecture} />
                    )}

                    {activeTab === "roadmap" && (
                      <RoadmapPanel roadmap={plan.roadmap} />
                    )}

                    {activeTab === "matrix" && (
                      <MatrixPanel matrix={plan.matrix} />
                    )}

                    {activeTab === "pitch" && (
                      <PitchDeckPanel
                        pitchDeck={plan.pitchDeck}
                        selectedIdeaName={selectedIdea?.name || "Winning Project"}
                      />
                    )}

                    {activeTab === "tasks" && (
                      <TaskSplitterPanel teamSplit={plan.teamSplit} />
                    )}

                    {activeTab === "export" && (
                      <ExportPanel plan={plan} selectedIdeaIndex={selectedIdeaIndex} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
