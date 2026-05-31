"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Trophy, Sparkles, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { HackathonPlan } from "@/lib/openai";

interface IdeasPanelProps {
  ideas: HackathonPlan["ideas"];
  selectedIdeaIndex: number;
  onSelectIdea: (index: number) => void;
}

export function IdeasPanel({ ideas, selectedIdeaIndex, onSelectIdea }: IdeasPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-indigo-400" />
            <span>Winning Product Concepts</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Choose a concept to act as the primary blueprint across the remaining dashboard modules.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 px-3 py-1 rounded-full">
          <Trophy className="w-3.5 h-3.5" />
          <span>JUDGE OPTIMIZED: NOVELTY + EXECUTION</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {ideas.map((idea, idx) => {
          const isSelected = selectedIdeaIndex === idx;
          return (
            <motion.div
              key={idea.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => onSelectIdea(idx)}
              className={`glass-panel rounded-2xl border transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? "border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)] bg-[#0b142d]"
                  : "border-white/5 hover:border-indigo-500/20 hover:bg-[#0c1224]"
              }`}
            >
              {/* Highlight Background Orbs */}
              <div
                className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-[40px] opacity-20 pointer-events-none transition-colors duration-300 ${
                  isSelected ? "bg-cyan-500" : "bg-indigo-500"
                }`}
              />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                      idea.difficulty === "Easy"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : idea.difficulty === "Medium"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {idea.difficulty} Difficulty
                  </span>
                  
                  {isSelected && (
                    <motion.div
                      layoutId="selected-checkmark"
                      className="flex items-center space-x-1 text-cyan-400 text-xs font-mono"
                    >
                      <CheckCircle2 className="w-4 h-4 fill-cyan-950" />
                      <span>Blueprint</span>
                    </motion.div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mt-4 group-hover:text-cyan-300 transition-colors">
                  {idea.name}
                </h3>
                <p className="text-xs font-medium text-indigo-300 mt-1 line-clamp-1">
                  {idea.tagline}
                </p>

                {/* Description */}
                <p className="text-[11px] leading-relaxed text-slate-400 mt-3.5">
                  {idea.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {idea.badges.map((badge) => (
                    <span
                      key={badge}
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800/80 border border-white/5 text-slate-300"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scores & Metrics Section */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="text-[8px] font-mono text-slate-500 uppercase">Innovation</span>
                    <span className="text-xs font-bold text-slate-200 mt-1 font-mono">{idea.innovationScore}%</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="text-[8px] font-mono text-slate-500 uppercase">Feasibility</span>
                    <span className="text-xs font-bold text-slate-200 mt-1 font-mono">{idea.feasibilityScore}%</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="text-[8px] font-mono text-slate-500 uppercase">Impact</span>
                    <span className="text-xs font-bold text-slate-200 mt-1 font-mono">{idea.impactScore}%</span>
                  </div>
                </div>

                {/* Secret Sauce */}
                <div className="mt-4 p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/30">
                  <div className="flex items-center space-x-1.5 text-[9px] font-bold font-mono text-indigo-300 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>Secret Sauce</span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
                    {idea.secretSauce}
                  </p>
                </div>
              </div>

              {/* Selection Border Glow Indicator */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 ${
                  isSelected ? "bg-cyan-400" : "bg-transparent"
                }`}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
export default IdeasPanel;
