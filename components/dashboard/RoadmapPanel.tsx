"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Clock, PlayCircle, Lock } from "lucide-react";
import { HackathonPlan } from "@/lib/openai";

interface RoadmapPanelProps {
  roadmap: HackathonPlan["roadmap"];
}

const STATUS_ICONS = {
  completed: CheckCircle2,
  "in-progress": PlayCircle,
  pending: Lock
};

const STATUS_COLORS = {
  completed: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  "in-progress": "text-cyan-400 border-cyan-500/20 bg-cyan-500/5 animate-pulse",
  pending: "text-slate-500 border-white/5 bg-white/5"
};

const CARD_BORDERS = {
  completed: "border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]",
  "in-progress": "border-cyan-500/35 shadow-[0_0_20px_rgba(6,182,212,0.1)]",
  pending: "border-white/5"
};

export function RoadmapPanel({ roadmap }: RoadmapPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <span>36-Hour MVP Implementation Timeline</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Gantt-inspired chronological checkpoints structured for maximum development speed and feature safety.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 px-3 py-1 rounded-full">
          <Clock className="w-3.5 h-3.5" />
          <span>TIME LIMIT: 36 HOURS TOTAL</span>
        </div>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative pl-6 md:pl-10 space-y-8 py-4">
        {/* Continuous Timeline Line */}
        <div className="absolute left-[13px] md:left-[21px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 via-cyan-500 to-slate-800" />

        {roadmap.map((phase, idx) => {
          const StatusIcon = STATUS_ICONS[phase.status] || Lock;
          const statusStyle = STATUS_COLORS[phase.status] || STATUS_COLORS.pending;
          const borderStyle = CARD_BORDERS[phase.status] || CARD_BORDERS.pending;

          return (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[20px] md:-left-[28px] top-1.5 z-10">
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center bg-[#050816] ${statusStyle}`}>
                  <StatusIcon className="w-4 h-4" />
                </div>
              </div>

              {/* Phase Card Content */}
              <div className={`glass-panel p-5 rounded-2xl border ${borderStyle} max-w-3xl ml-4`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                    {phase.phase}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                        phase.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : phase.status === "in-progress"
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {phase.status.replace("-", " ")}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mt-2">
                  {phase.milestone}
                </h3>

                {/* Subtask Checklists */}
                <div className="mt-4 space-y-2">
                  {phase.tasks.map((task, tIdx) => (
                    <div key={tIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <input
                        type="checkbox"
                        readOnly
                        checked={phase.status === "completed"}
                        className={`w-3.5 h-3.5 rounded mt-0.5 accent-cyan-500 bg-slate-900 border-white/10 ${
                          phase.status === "completed" ? "cursor-default text-emerald-400" : "cursor-default"
                        }`}
                      />
                      <span className={phase.status === "completed" ? "line-through text-slate-500" : "text-slate-300"}>
                        {task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
export default RoadmapPanel;
