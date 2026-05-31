"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Cpu, Server, Database, Globe, ArrowRightLeft, Info } from "lucide-react";
import { HackathonPlan } from "@/lib/openai";

interface TechStackPanelProps {
  techStack: HackathonPlan["techStack"];
}

const ICONS = {
  frontend: Layers,
  backend: Server,
  database: Database,
  ai_ml: Cpu,
  infra: Globe
};

const LABELS = {
  frontend: "Frontend Architecture",
  backend: "Backend Services",
  database: "Data & Storage",
  ai_ml: "AI & ML Intelligence",
  infra: "Cloud Infrastructure"
};

const GLOW_COLORS = {
  frontend: "rgba(99, 102, 241, 0.15)", // Indigo
  backend: "rgba(168, 85, 247, 0.15)", // Purple
  database: "rgba(6, 182, 212, 0.15)", // Cyan
  ai_ml: "rgba(59, 130, 246, 0.15)",   // Blue
  infra: "rgba(16, 185, 129, 0.15)"    // Emerald
};

const TEXT_GLOW_COLORS = {
  frontend: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
  backend: "text-purple-400 border-purple-500/20 bg-purple-500/5",
  database: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
  ai_ml: "text-blue-400 border-blue-500/20 bg-blue-500/5",
  infra: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
};

export function TechStackPanel({ techStack }: TechStackPanelProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
          <Layers className="w-5 h-5 text-purple-400" />
          <span>Curated Technology Stack</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          High-performance, production-ready stack optimized for speed, reliability, and judge approval.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(Object.keys(techStack) as Array<keyof typeof techStack>).map((key, idx) => {
          const item = techStack[key];
          const Icon = ICONS[key];
          const label = LABELS[key];
          const glowColor = GLOW_COLORS[key];
          const textGlow = TEXT_GLOW_COLORS[key];

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="glass-panel p-5 rounded-2xl border border-white/5 relative flex flex-col justify-between"
              style={{
                boxShadow: `0 8px 32px 0 rgba(0,0,0,0.4), 0 0 15px ${glowColor}`
              }}
            >
              <div>
                {/* Header Section */}
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-lg border ${textGlow}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      {label}
                    </span>
                    <h3 className="text-sm font-bold text-slate-200 mt-0.5">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Reasoning text */}
                <p className="text-xs text-slate-400 mt-4 leading-relaxed bg-black/25 p-3 rounded-xl border border-white/5">
                  {item.reasoning}
                </p>
              </div>

              {/* Alternatives Selection */}
              <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
                <div className="flex items-center space-x-1 text-[10px] font-mono text-slate-400">
                  <ArrowRightLeft className="w-3 h-3 text-cyan-400" />
                  <span>DEVIATION ALTERNATIVES:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.alternatives.map((alt) => (
                    <span
                      key={alt}
                      className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-white/5 text-slate-300 hover:text-white hover:border-cyan-500/20 cursor-help transition-all"
                      title={`Alternative: ${alt}`}
                    >
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* ProTip Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5 * 0.08, duration: 0.4 }}
          className="glass-panel p-5 rounded-2xl border border-white/5 relative bg-gradient-to-br from-indigo-950/20 via-purple-950/15 to-transparent flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-cyan-400">
              <div className="p-2.5 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
                <Info className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-bold tracking-wider uppercase">CO-PILOT OPTIMIZATION PRO-TIP</span>
            </div>
            <h3 className="text-xs font-bold text-slate-200 mt-2">
              Scaffold With Direct Pre-configurations
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              This stack prioritizes <strong>single-repository deployment</strong> capabilities (e.g. Next.js Server Actions or serverless layers). In a short 36-hour sprint, minimizing system connectivity configurations between external hosting providers will save your developers an average of 4-6 hours.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-[9px] font-mono text-slate-500">SPEED RATING:</span>
            <span className="text-[10px] font-mono font-bold text-emerald-400">9.8/10 FASTEST</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default TechStackPanel;
