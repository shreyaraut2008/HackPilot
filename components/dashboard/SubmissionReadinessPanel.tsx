import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Send, Box, Code, Play } from "lucide-react";
import { HackathonPlan } from "@/lib/openai";

export function SubmissionReadinessPanel({ readiness }: { readiness: HackathonPlan["submissionReadiness"] }) {
  // Determine color based on percentage
  const getColor = (pct: number) => {
    if (pct >= 80) return "text-emerald-400 border-emerald-400 bg-emerald-500/20";
    if (pct >= 50) return "text-amber-400 border-amber-400 bg-amber-500/20";
    return "text-rose-400 border-rose-400 bg-rose-500/20";
  };
  
  const colorClasses = getColor(readiness.percentage);
  const strokeColor = readiness.percentage >= 80 ? "#34d399" : readiness.percentage >= 50 ? "#fbbf24" : "#fb7185";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      {/* Big Meter */}
      <div className="glass-panel border border-white/5 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
        <h3 className="text-sm font-bold text-slate-200 font-mono uppercase tracking-widest mb-8 flex items-center gap-2">
          <Send className="w-4 h-4 text-cyan-400" />
          Submission Readiness Checker
        </h3>

        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Background Circle */}
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            <circle cx="50" cy="50" r="45" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle 
              cx="50" cy="50" r="45" fill="transparent" 
              stroke={strokeColor} strokeWidth="8" 
              strokeDasharray={`${readiness.percentage * 2.827} 282.7`} 
              strokeLinecap="round" 
              className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-6xl font-black ${colorClasses.split(' ')[0]}`}>{readiness.percentage}%</span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-2">Ready</span>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-black/30 border border-white/5 rounded-2xl p-6">
        <div className="space-y-4">
          {readiness.checklist.map((item, i) => (
            <div 
              key={i} 
              className={`flex items-center justify-between p-4 rounded-xl border ${
                item.status === 'ready' 
                  ? "bg-emerald-950/20 border-emerald-500/20" 
                  : "bg-slate-900/30 border-white/5"
              } transition-colors`}
            >
              <div className="flex items-center gap-3">
                {item.status === 'ready' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600 shrink-0" />
                )}
                <span className={`text-sm font-medium ${item.status === 'ready' ? 'text-emerald-100' : 'text-slate-300'}`}>
                  {item.item}
                </span>
              </div>
              <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded ${
                item.status === 'ready' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
