import React from "react";
import { Gavel, AlertOctagon, ThumbsDown, Target, BrainCircuit, LineChart, Briefcase, Layout, Presentation, Zap } from "lucide-react";
import { HackathonPlan } from "@/lib/openai";

export function JudgeSimulatorPanel({ simulator }: { simulator: HackathonPlan["judgeSimulator"] }) {
  return (
    <div className="space-y-6">
      
      {/* Brutally Honest Banner */}
      <div className="bg-rose-950/30 border border-rose-500/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Gavel className="w-32 h-32 text-rose-500" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-bold text-rose-400 font-mono uppercase tracking-widest">
              Judge's Verdict
            </h3>
          </div>
          
          <p className="text-lg font-semibold text-white mb-6 leading-relaxed">
            "{simulator.whyYouMightLose}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 border border-white/5 rounded-xl p-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Why Another Team Could Beat You</span>
              <p className="text-sm text-slate-300">
                {simulator.whyAnotherTeamCouldBeatYou}
              </p>
            </div>
            <div className="bg-amber-950/30 border border-amber-500/20 rounded-xl p-4">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                <Zap className="w-3 h-3" />
                What To Improve Before Submission
              </span>
              <p className="text-sm text-amber-100/80">
                {simulator.whatToImproveBeforeSubmission}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric Cards */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Innovation", text: simulator.innovation, icon: BrainCircuit, color: "text-purple-400", bg: "bg-purple-950/20" },
            { label: "Feasibility", text: simulator.feasibility, icon: Target, color: "text-emerald-400", bg: "bg-emerald-950/20" },
            { label: "Technical Depth", text: simulator.technicalDepth, icon: Layout, color: "text-cyan-400", bg: "bg-cyan-950/20" },
            { label: "Business Impact", text: simulator.businessImpact, icon: Briefcase, color: "text-indigo-400", bg: "bg-indigo-950/20" },
            { label: "Scalability", text: simulator.scalability, icon: LineChart, color: "text-amber-400", bg: "bg-amber-950/20" },
            { label: "Demo & Pitch", text: `${simulator.demoPotential} ${simulator.presentationStrength}`, icon: Presentation, color: "text-rose-400", bg: "bg-rose-950/20" },
          ].map((item, i) => (
            <div key={i} className={`border border-white/5 rounded-xl p-4 ${item.bg}`}>
              <div className="flex items-center gap-2 mb-2">
                <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${item.color}`}>
                  {item.label}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Weaknesses List */}
        <div className="glass-panel border border-white/5 rounded-xl p-5 h-full">
          <div className="flex flex-col h-full">
            <h4 className="text-xs font-bold text-slate-200 font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
              <ThumbsDown className="w-4 h-4 text-rose-500" />
              Biggest Weaknesses
            </h4>
            
            <ul className="space-y-3 flex-1">
              {simulator.biggestWeaknesses.map((weakness, i) => (
                <li key={i} className="flex items-start gap-3 bg-black/30 p-3 rounded-lg border border-white/5">
                  <span className="text-rose-500 font-bold font-mono text-sm leading-none mt-0.5">{i + 1}.</span>
                  <span className="text-xs text-slate-300 leading-relaxed">{weakness}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Selection Probability</span>
              <span className={`text-xl font-black ${simulator.selectionProbability > 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {simulator.selectionProbability}%
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
