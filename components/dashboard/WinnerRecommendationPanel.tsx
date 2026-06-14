import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Shield, TrendingUp, Cpu, Activity, Award, CheckCircle } from "lucide-react";
import { HackathonPlan } from "@/lib/openai";

export function WinnerRecommendationPanel({ 
  winner, 
  probability 
}: { 
  winner: HackathonPlan["recommendedWinner"],
  probability: HackathonPlan["winningProbability"]
}) {
  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-[#0c1328] to-[#1a1138] p-8 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Trophy className="w-48 h-48 text-indigo-300" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold font-mono px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <Star className="w-3 h-3 text-amber-400" />
              Recommended Winner
            </span>
            <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold font-mono px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              {winner.confidence}% Confidence
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {winner.ideaName}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="space-y-4">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest">Why This Project Will Win</h4>
              <ul className="space-y-3">
                {winner.why.map((reason, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 bg-indigo-500/20 p-1 rounded">
                      <Award className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <span className="text-sm text-slate-200">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Innovation", score: winner.innovationScore, icon: Star },
                { label: "Feasibility", score: winner.feasibilityScore, icon: Shield },
                { label: "Demo Potential", score: winner.demoScore, icon: Activity },
                { label: "Judge Appeal", score: winner.judgeAppeal, icon: Trophy }
              ].map((item, i) => (
                <div key={i} className="bg-black/30 border border-white/5 rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <item.icon className="w-3 h-3 text-slate-500" />
                    {item.label}
                  </span>
                  <div className="flex items-end gap-1 mt-2">
                    <span className="text-2xl font-bold text-white leading-none">{item.score}</span>
                    <span className="text-xs text-slate-500 mb-0.5">/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Winning Probability Widget */}
      <div className="glass-panel border border-white/5 rounded-xl p-6">
        <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2 mb-6">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          SUCCESS PROBABILITY ENGINE
        </h3>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
            {/* Donut Chart Simulation */}
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
              <circle 
                cx="50" cy="50" r="40" fill="transparent" 
                stroke="url(#gradient)" strokeWidth="12" 
                strokeDasharray={`${probability.score * 2.51} 251`} 
                strokeLinecap="round" 
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-extrabold text-white tracking-tighter">{probability.score}%</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">Win Chance</span>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-sm text-slate-300 bg-slate-900/50 p-4 rounded-lg border border-white/5">
              {probability.explanation}
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                { label: "Execution Risk", value: probability.metrics.executionRisk, invert: true },
                { label: "Time Constraints", value: probability.metrics.timeConstraints, invert: true },
                { label: "Team Synergy", value: probability.metrics.teamSize },
                { label: "Pitch Readiness", value: probability.metrics.pitchReadiness }
              ].map((m, i) => {
                // For risks, lower is better. For others, higher is better.
                const isGood = m.invert ? m.value < 50 : m.value > 70;
                const isWarning = m.invert ? m.value >= 50 && m.value < 80 : m.value >= 40 && m.value <= 70;
                const colorClass = isGood ? "text-emerald-400" : isWarning ? "text-amber-400" : "text-rose-400";
                
                return (
                  <div key={i} className="bg-black/20 p-2 rounded border border-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{m.label}</span>
                    <span className={`text-xs font-bold ${colorClass}`}>{m.value}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
