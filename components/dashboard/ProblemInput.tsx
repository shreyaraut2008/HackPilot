"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Settings, Play, Sparkles, Key, Check, Info, Users, Clock, Code, Cpu, Palette } from "lucide-react";

interface ProblemInputProps {
  onSubmit: (problemStatement: string, apiKey: string, smartQuestions: any) => void;
  isLoading: boolean;
}

const EXAMPLES = [
  {
    title: "Carbon Auditing",
    text: "Create a system that automatically audits Scope 3 supply chain carbon emissions from transport invoices and ERP logs.",
    category: "Sustainability"
  },
  {
    title: "Clinical Triage",
    text: "Design a hospital Emergency Room queue orchestrator that triage patient complaints and vital signs to optimize bed allocation.",
    category: "MedTech"
  },
  {
    title: "Smart Contract security",
    text: "Build an AI-powered smart contract scanner that audits Solidity security vulnerabilities (reentrancy, overflows) and suggests patches.",
    category: "Web3"
  },
  {
    title: "Knowledge Integration",
    text: "Create an autonomous enterprise co-pilot that syncs Slack, Notion, and Jira to map system architecture dependencies and tasks.",
    category: "DevTools"
  }
];

const LOADING_LOGS = [
  "Initializing HackPilot AI Agent cluster...",
  "Parsing problem statement semantic layers...",
  "Executing Scope-3 capability analysis...",
  "Consulting judge criteria templates (Feasibility, Impact, Novelty)...",
  "Generating Winning Product ideas and tags...",
  "Selecting optimized Tech Stack components...",
  "Synthesizing system architecture nodes and data links...",
  "Mapping MVP execution Gantt milestone schedules...",
  "Classifying 4-quadrant feature priority matrix...",
  "Drafting 5-slide pitch deck presentation outline...",
  "Dividing development tasks by role (Frontend, Backend, PM)...",
  "Compiling results to Workspace Dashboard JSON..."
];

export function ProblemInput({ onSubmit, isLoading }: ProblemInputProps) {
  const [problemText, setProblemText] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [logIndex, setLogIndex] = useState(0);

  // Smart Questions State
  const [teamSize, setTeamSize] = useState("3-4");
  const [experienceLevel, setExperienceLevel] = useState("Intermediate");
  const [hackathonDuration, setHackathonDuration] = useState("36 Hours");
  const [preferredStack, setPreferredStack] = useState("React/Next.js");
  const [aiExperience, setAiExperience] = useState("Used APIs");
  const [designExperience, setDesignExperience] = useState("Can use Tailwind");

  // Load API Key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("hackpilot_openai_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  // Save API Key to localStorage
  const handleSaveKey = () => {
    localStorage.setItem("hackpilot_openai_key", apiKey);
    setShowSettings(false);
  };

  // Cycling logs while loading
  useEffect(() => {
    if (!isLoading) {
      setLogIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setLogIndex((prev) => (prev < LOADING_LOGS.length - 1 ? prev + 1 : prev));
    }, 1100);

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemText.trim()) return;
    onSubmit(problemText, apiKey, {
      teamSize,
      experienceLevel,
      hackathonDuration,
      preferredStack,
      aiExperience,
      designExperience
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 z-10">
      {/* Outer Glow Terminal Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-panel rounded-2xl border border-white/10 overflow-hidden relative"
      >
        {/* Neon Active Bar */}
        <div className="h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 w-full" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a0f1d]/90 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 block" />
            </div>
            <div className="h-4 w-[1px] bg-white/15" />
            <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>hackpilot-agent-cluster-v1.0.sh</span>
            </div>
          </div>

          {/* Settings Trigger */}
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition duration-200"
          >
            <Settings className={`w-4 h-4 ${showSettings ? "rotate-45" : ""} transition-transform duration-300`} />
            <span>Settings</span>
          </button>
        </div>

        {/* Settings Sub-Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-[#0b1328]/95 border-b border-white/5 overflow-hidden"
            >
              <div className="p-6 flex flex-col space-y-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
                  <Key className="w-3.5 h-3.5" />
                  <span>CUSTOM OPENAI API KEY (OPTIONAL)</span>
                </div>
                <p className="text-xs text-slate-400">
                  By default, HackPilot AI runs on a simulated engine with built-in templates so you can demo instantly. Provide your key below to call GPT-4o-mini directly for your custom problem statements. Stored locally in your browser.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="relative flex-1">
                    <input
                      type="password"
                      placeholder="sk-proj-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-slate-200 font-mono focus:border-cyan-500/40 transition duration-200"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveKey}
                    className="flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-2 rounded-lg text-xs font-medium transition duration-200 border border-white/10"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Key</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <textarea
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                placeholder="Paste the hackathon challenge/problem statement here..."
                disabled={isLoading}
                rows={4}
                className="w-full bg-black/20 border border-white/5 rounded-xl px-5 py-4 text-sm text-slate-200 font-sans focus:border-indigo-500/30 transition duration-300 placeholder-slate-500 scrollbar-custom resize-none"
              />
            </div>

            {/* Smart Questions Configuration Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 flex items-center space-x-1.5">
                  <Users className="w-3 h-3 text-cyan-500" />
                  <span>Team Size</span>
                </label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 appearance-none"
                >
                  <option>1-2</option>
                  <option>3-4</option>
                  <option>5+</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 flex items-center space-x-1.5">
                  <Info className="w-3 h-3 text-purple-500" />
                  <span>Experience</span>
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500/50 appearance-none"
                >
                  <option>Beginners</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 flex items-center space-x-1.5">
                  <Clock className="w-3 h-3 text-emerald-500" />
                  <span>Duration</span>
                </label>
                <select
                  value={hackathonDuration}
                  onChange={(e) => setHackathonDuration(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50 appearance-none"
                >
                  <option>24 Hours</option>
                  <option>36 Hours</option>
                  <option>48 Hours</option>
                  <option>1 Week+</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 flex items-center space-x-1.5">
                  <Code className="w-3 h-3 text-indigo-500" />
                  <span>Preferred Stack</span>
                </label>
                <select
                  value={preferredStack}
                  onChange={(e) => setPreferredStack(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50 appearance-none"
                >
                  <option>React/Next.js</option>
                  <option>Vue/Nuxt</option>
                  <option>Python/Django</option>
                  <option>No Preference</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 flex items-center space-x-1.5">
                  <Cpu className="w-3 h-3 text-amber-500" />
                  <span>AI Experience</span>
                </label>
                <select
                  value={aiExperience}
                  onChange={(e) => setAiExperience(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50 appearance-none"
                >
                  <option>None</option>
                  <option>Used APIs</option>
                  <option>Built Models</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 flex items-center space-x-1.5">
                  <Palette className="w-3 h-3 text-rose-500" />
                  <span>Design Skill</span>
                </label>
                <select
                  value={designExperience}
                  onChange={(e) => setDesignExperience(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500/50 appearance-none"
                >
                  <option>None</option>
                  <option>Can use Tailwind</option>
                  <option>UI/UX Designer</option>
                </select>
              </div>

            </div>

            {/* Ingestion Console Details (Cyclic logs) */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-black/60 rounded-xl p-4 font-mono text-[11px] border border-cyan-500/20 text-cyan-400 overflow-hidden"
                >
                  <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-slate-400 font-bold uppercase tracking-wider">MISSION CONTROL SYNTHESIS IN PROGRESS</span>
                  </div>
                  <div className="space-y-1 scrollbar-custom max-h-[120px] overflow-y-auto">
                    {LOADING_LOGS.slice(0, logIndex + 1).map((log, idx) => (
                      <motion.div
                        key={log}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={idx === logIndex ? "text-slate-100 font-semibold" : "text-slate-500"}
                      >
                        <span className="text-slate-600 select-none mr-2">&gt;</span>
                        {log}
                        {idx === logIndex && <span className="animate-pulse ml-0.5">_</span>}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Info className="w-3.5 h-3.5 text-indigo-400" />
                <span>Strategy is customized based on your team context.</span>
              </div>

              {/* Generate CTA Button with Glow/Animations */}
              <motion.button
                type="submit"
                disabled={isLoading || !problemText.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-6 py-3 rounded-xl font-semibold text-xs flex items-center space-x-2 transition-all duration-300 border border-white/10 group ${
                  !problemText.trim()
                    ? "bg-slate-800/40 text-slate-500 cursor-not-allowed border-white/5"
                    : "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                    <span>Synthesizing Strategy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Forge Mission Control OS</span>
                    <Play className="w-3 h-3 text-white/70 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Examples Grid */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 space-y-3"
          >
            <div className="text-center">
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                OR PRE-LOAD A CHALLENGE THEME
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {EXAMPLES.map((example, idx) => (
                <motion.div
                  key={example.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.3)" }}
                  onClick={() => setProblemText(example.text)}
                  className="glass-panel p-4 rounded-xl border border-white/5 cursor-pointer text-left transition-all duration-300 flex flex-col justify-between group hover:bg-[#0e162d]/90 relative"
                >
                  <div className="absolute top-0 right-0 w-[40px] h-[40px] bg-gradient-to-br from-indigo-500/10 to-transparent rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                      {example.category}
                    </span>
                    <h4 className="text-xs font-semibold text-slate-200 mt-2.5 group-hover:text-white transition-colors">
                      {example.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                      {example.text}
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] text-indigo-400 font-mono group-hover:text-cyan-400 flex items-center space-x-1">
                    <span>Load payload</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default ProblemInput;
