import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Target, Zap, Lightbulb, TrendingUp, HelpCircle, AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react";
import { HackathonPlan } from "@/lib/openai";

export function ProblemDecoderPanel({ 
  intelligence, 
  insights 
}: { 
  intelligence: HackathonPlan["challengeIntelligence"],
  insights: HackathonPlan["pastWinnerInsights"]
}) {
  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Challenge Intelligence */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
            <Target className="w-4 h-4 text-rose-400" />
            CHALLENGE INTELLIGENCE
          </h3>
          
          <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-5 space-y-4">
            <div>
              <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider block mb-1">What Most Teams Will Build</span>
              <p className="text-sm text-slate-300 bg-black/40 p-3 rounded-lg border border-white/5">{intelligence.mostTeamsWillBuild}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-2">Overused Ideas</span>
                <ul className="space-y-1.5">
                  {intelligence.overusedIdeas.map((idea, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500/70 shrink-0 mt-0.5" />
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-2">Predictable Approaches</span>
                <ul className="space-y-1.5">
                  {intelligence.predictableApproaches.map((app, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500/70 shrink-0 mt-0.5" />
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-2">Underserved Opportunities</span>
                <ul className="space-y-1.5">
                  {intelligence.underservedOpportunities.map((opp, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      {opp}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-2">Unexpected Angles</span>
                <ul className="space-y-1.5">
                  {intelligence.unexpectedAngles.map((angle, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      {angle}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Past Winner Insights */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            PAST WINNER INSIGHTS
          </h3>

          <div className="glass-panel border border-white/5 rounded-xl p-5 space-y-5">
            <div>
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                What Winning Projects Have In Common
              </span>
              <ul className="space-y-2">
                {insights.whatWinningProjectsHaveInCommon.map((item, i) => (
                  <li key={i} className="text-xs text-slate-300 bg-indigo-950/20 p-2 rounded border border-indigo-500/10">{item}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-2">Judges Usually Reward</span>
                <ul className="space-y-1.5">
                  {insights.judgesUsuallyReward.map((item, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block mb-2">Judges Usually Ignore</span>
                <ul className="space-y-1.5">
                  {insights.judgesUsuallyIgnore.map((item, i) => (
                    <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                      <span className="text-slate-600 font-bold">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-rose-950/10 border border-rose-900/30 p-4 rounded-lg">
              <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider block mb-2">Most Common Mistakes</span>
              <ul className="space-y-1">
                {insights.mostCommonMistakes.map((mistake, i) => (
                  <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="w-1 h-1 bg-rose-500 rounded-full" />
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
