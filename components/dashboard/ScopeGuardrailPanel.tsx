import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Scissors, Play, Clock, Coffee, Ban, AlertTriangle, Crosshair } from "lucide-react";
import { HackathonPlan } from "@/lib/openai";

export function ScopeGuardrailPanel({ 
  guardrail, 
  risk 
}: { 
  guardrail: HackathonPlan["scopeGuardrail"],
  risk: HackathonPlan["failureRisk"]
}) {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MVP Scope Enforcer (Takes up 2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
            <Scissors className="w-4 h-4 text-cyan-400" />
            MVP SCOPE ENFORCER
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Build Now */}
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10"><Play className="w-16 h-16 text-emerald-400" /></div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-3 relative z-10">
                1. Build Now (Hour 0-12)
              </span>
              <ul className="space-y-2 relative z-10">
                {guardrail.buildNow.map((item, i) => (
                  <li key={i} className="text-xs text-slate-200 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Build If Time Remains */}
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10"><Clock className="w-16 h-16 text-amber-400" /></div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-3 relative z-10">
                2. Build If Time Remains
              </span>
              <ul className="space-y-2 relative z-10">
                {guardrail.buildIfTimeRemains.map((item, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Build After Hackathon */}
            <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10"><Coffee className="w-16 h-16 text-indigo-400" /></div>
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-3 relative z-10">
                3. Build After Hackathon
              </span>
              <ul className="space-y-2 relative z-10">
                {guardrail.buildAfterHackathon.map((item, i) => (
                  <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* DO NOT BUILD */}
            <div className="bg-rose-950/30 border border-rose-500/50 rounded-xl p-5 relative overflow-hidden shadow-[0_0_15px_rgba(244,63,94,0.1)]">
              <div className="absolute top-0 right-0 p-2 opacity-10"><Ban className="w-16 h-16 text-rose-500" /></div>
              <span className="text-[10px] font-mono text-rose-400 font-black uppercase tracking-widest block mb-3 relative z-10 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                DO NOT BUILD
              </span>
              <ul className="space-y-2 relative z-10">
                {guardrail.doNotBuild.map((item, i) => (
                  <li key={i} className="text-xs text-rose-200/80 flex items-start gap-2 font-medium">
                    <Ban className="w-3 h-3 text-rose-500 mt-0.5 shrink-0" />
                    <span className="line-through decoration-rose-500/50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Failure Risk Analysis */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            FAILURE RISK ANALYSIS
          </h3>

          <div className="glass-panel border border-white/5 rounded-xl p-5 h-full flex flex-col">
            
            <div className="mb-6">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-3">Top Reasons This Will Fail</span>
              <div className="space-y-2">
                {risk.topReasons.map((reason, i) => (
                  <div key={i} className="bg-black/30 p-2.5 rounded border border-rose-500/10 flex items-start gap-2">
                    <span className="text-xs font-mono text-rose-500">{i + 1}.</span>
                    <span className="text-xs text-slate-300">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 p-2"><Crosshair className="w-12 h-12 text-emerald-500" /></div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-2 relative z-10">
                Mitigation Plan
              </span>
              <p className="text-xs text-emerald-100/80 leading-relaxed relative z-10 font-medium">
                {risk.mitigationPlan}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
