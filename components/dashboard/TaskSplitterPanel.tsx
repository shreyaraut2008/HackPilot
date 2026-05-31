"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Layout, Database, FileText, CheckCircle2, Award, ClipboardList } from "lucide-react";
import { HackathonPlan } from "@/lib/openai";
import confetti from "canvas-confetti";

interface TaskSplitterPanelProps {
  teamSplit: HackathonPlan["teamSplit"];
}

const ROLE_ICONS = {
  frontend: Layout,
  backend: Database,
  pitcher: FileText
};

const GLOWS = {
  frontend: "border-indigo-500/20 text-indigo-400 bg-indigo-500/5",
  backend: "border-cyan-500/20 text-cyan-400 bg-cyan-500/5",
  pitcher: "border-purple-500/20 text-purple-400 bg-purple-500/5"
};

export function TaskSplitterPanel({ teamSplit }: TaskSplitterPanelProps) {
  const [activeRole, setActiveRole] = useState<"frontend" | "backend" | "pitcher">("frontend");

  // Track task completions in state. Key is: role-index
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const role = teamSplit[activeRole];
  const Icon = ROLE_ICONS[activeRole];
  const glowClass = GLOWS[activeRole];

  // Calculate progress percent
  const totalTasksCount = role.tasks.length;
  const completedTasksCount = role.tasks.filter((_, idx) => completedTasks[`${activeRole}-${idx}`]).length;
  const progressPercent = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  // Launch confetti upon 100% completion
  useEffect(() => {
    if (progressPercent === 100 && totalTasksCount > 0) {
      // Fire confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#6366f1", "#a855f7", "#06b6d4", "#3b82f6"]
      });
    }
  }, [progressPercent, totalTasksCount]);

  const toggleTask = (idx: number) => {
    const key = `${activeRole}-${idx}`;
    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <span>Team Task Allocations & Splitter</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic checklists segmented by hackathon role. Track progress in real-time during development.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 px-3 py-1 rounded-full">
          <ClipboardList className="w-3.5 h-3.5" />
          <span>TEAM CAPACITY MODEL: LOADED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Side Role Selector Tabs */}
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-custom">
          {(Object.keys(teamSplit) as Array<"frontend" | "backend" | "pitcher">).map((roleKey) => {
            const roleItem = teamSplit[roleKey];
            const RoleIcon = ROLE_ICONS[roleKey];
            const isActive = activeRole === roleKey;

            // calculate individual completion ratios
            const total = roleItem.tasks.length;
            const completed = roleItem.tasks.filter((_, idx) => completedTasks[`${roleKey}-${idx}`]).length;
            const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <button
                key={roleKey}
                type="button"
                onClick={() => setActiveRole(roleKey)}
                className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all flex-1 lg:flex-initial whitespace-nowrap lg:whitespace-normal group ${
                  isActive
                    ? "border-cyan-500/40 bg-cyan-950/20 text-white shadow-md shadow-cyan-500/5"
                    : "border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200 bg-black/10"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg border ${
                    isActive ? "border-cyan-500/30 text-cyan-400" : "border-white/5 text-slate-500 group-hover:text-slate-300"
                  }`}>
                    <RoleIcon className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold block leading-none">{roleItem.role.split(" ")[0]}</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">{roleItem.role.split(" ").slice(1).join(" ")}</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-500 ml-4 hidden md:inline">
                  {percentage}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Task Board Card */}
        <div className="lg:col-span-3 glass-panel p-6 rounded-2xl border border-white/5 relative bg-gradient-to-br from-[#0c1328]/50 to-transparent">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-lg border ${glowClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  {role.role}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Core Area Focus: <strong className="text-slate-200">{role.focus}</strong>
                </p>
              </div>
            </div>

            {/* Progress Meter */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 block">COMPLETION</span>
                <span className="text-xs font-bold text-slate-200 font-mono">
                  {completedTasksCount} / {totalTasksCount} ({progressPercent}%)
                </span>
              </div>
              <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Checklist list */}
          <div className="mt-6 space-y-3">
            <AnimatePresence mode="popLayout">
              {role.tasks.map((task, idx) => {
                const key = `${activeRole}-${idx}`;
                const isChecked = completedTasks[key] || false;

                return (
                  <motion.div
                    key={task}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    onClick={() => toggleTask(idx)}
                    className={`p-4 rounded-xl border cursor-pointer select-none transition-all duration-200 flex items-start space-x-3 ${
                      isChecked
                        ? "bg-slate-900/40 border-emerald-500/20 text-slate-500"
                        : "bg-black/20 border-white/5 text-slate-200 hover:border-cyan-500/10"
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${
                        isChecked ? "bg-emerald-500 border-emerald-500 text-[#050816]" : "border-white/20 bg-slate-950/50"
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </div>
                    </div>
                    <span className={`text-xs leading-relaxed ${isChecked ? "line-through text-slate-500" : ""}`}>
                      {task}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Role Complete Award Card */}
          {progressPercent === 100 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-6 p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/20 flex items-center space-x-3"
            >
              <Award className="w-5 h-5 text-cyan-400" />
              <div className="text-xs">
                <span className="font-bold text-slate-200 block">ROLE COMPLETED!</span>
                <span className="text-slate-400 mt-0.5 block">Confetti triggered. Share tasks with team and proceed to deployment prep.</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
export default TaskSplitterPanel;
