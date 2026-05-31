"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, Eye, AlertCircle, ArrowUpRight } from "lucide-react";
import { HackathonPlan } from "@/lib/openai";

interface MatrixPanelProps {
  matrix: HackathonPlan["matrix"];
}

const QUADRANTS = {
  "Must Have": {
    label: "Must Have (High Impact, Low Effort)",
    color: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5",
    badge: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
  },
  "Should Have": {
    label: "Should Have (High Impact, High Effort)",
    color: "border-cyan-500/20 text-cyan-400 bg-cyan-500/5",
    badge: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
  },
  "Nice to Have": {
    label: "Nice to Have (Low Impact, Low Effort)",
    color: "border-indigo-500/20 text-indigo-400 bg-indigo-500/5",
    badge: "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
  },
  "Won't Have": {
    label: "Won't Have (Low Impact, High Effort)",
    color: "border-slate-800 text-slate-500 bg-slate-900/40",
    badge: "bg-slate-800 text-slate-500 border border-white/5"
  }
};

export function MatrixPanel({ matrix }: MatrixPanelProps) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  // Group features by quadrant
  const groupedFeatures = React.useMemo(() => {
    const groups: Record<string, typeof matrix> = {
      "Must Have": [],
      "Should Have": [],
      "Nice to Have": [],
      "Won't Have": []
    };
    matrix.forEach((item) => {
      if (groups[item.quadrant]) {
        groups[item.quadrant].push(item);
      } else {
        // Fallback or default
        groups["Must Have"].push(item);
      }
    });
    return groups;
  }, [matrix]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
          <Grid className="w-5 h-5 text-indigo-400" />
          <span>Feature Priority Matrix</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Judge-targeted 4-quadrant feasibility chart. Build Must-Haves first to secure core demo requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Interactive Visual Graph Coordinate Plot */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-[#070c1b]/50 flex flex-col justify-between min-h-[380px]">
          {/* Axis Labels */}
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 px-4">
            <span>EFFORT &rarr; (Low to High)</span>
            <span>IMPACT &uarr; (Low to High)</span>
          </div>

          {/* Coordinate Canvas Grid */}
          <div className="relative w-full h-[300px] border border-white/5 bg-black/35 rounded-xl overflow-hidden mt-4">
            
            {/* Axis Lines Grid */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] border-t border-dashed border-white/10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-full w-[1px] border-l border-dashed border-white/10" />
            </div>

            {/* Quadrant Labels inside Canvas */}
            <div className="absolute top-2 left-3 text-[8px] font-mono font-semibold tracking-wider text-emerald-400/50 uppercase">
              Must Have
            </div>
            <div className="absolute top-2 right-3 text-[8px] font-mono font-semibold tracking-wider text-cyan-400/50 uppercase">
              Should Have
            </div>
            <div className="absolute bottom-2 left-3 text-[8px] font-mono font-semibold tracking-wider text-indigo-400/50 uppercase">
              Nice to Have
            </div>
            <div className="absolute bottom-2 right-3 text-[8px] font-mono font-semibold tracking-wider text-slate-500/50 uppercase">
              Won't Have
            </div>

            {/* Plotted Feature Nodes */}
            {matrix.map((item, idx) => {
              // Convert effort (0-100) and impact (0-100) to coordinates (5% - 95%)
              // effort: X-axis (left: effort%), impact: Y-axis (bottom: impact%, so top: 100 - impact%)
              const leftPercent = 5 + (item.effort * 0.9);
              const topPercent = 95 - (item.impact * 0.9);

              const isHovered = hoveredFeature === item.feature;
              
              let colorClasses = "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]";
              if (item.quadrant === "Must Have") colorClasses = "bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)]";
              else if (item.quadrant === "Should Have") colorClasses = "bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]";
              else if (item.quadrant === "Won't Have") colorClasses = "bg-slate-600 shadow-none";

              return (
                <motion.div
                  key={item.feature}
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                  }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-help z-20"
                  onMouseEnter={() => setHoveredFeature(item.feature)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  whileHover={{ scale: 1.4 }}
                >
                  {/* Glowing Node Dot */}
                  <div className={`w-3.5 h-3.5 rounded-full border border-[#050816] ${colorClasses}`} />
                  
                  {/* Tooltip Hover Bubble */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: -25, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-48 p-2 rounded-lg bg-slate-950/95 border border-cyan-500/30 text-slate-200 z-50 text-[10px] shadow-2xl pointer-events-none"
                      >
                        <div className="font-bold text-white flex items-center justify-between">
                          <span>{item.feature}</span>
                          <span className="text-[8px] text-cyan-400">({item.impact} / {item.effort})</span>
                        </div>
                        <p className="text-slate-400 mt-1 leading-normal">{item.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Feature Groups List */}
        <div className="space-y-4">
          {(Object.keys(groupedFeatures) as Array<keyof typeof QUADRANTS>).map((quadName) => {
            const quadMeta = QUADRANTS[quadName];
            const features = groupedFeatures[quadName];
            if (!features || features.length === 0) return null;

            return (
              <div
                key={quadName}
                className={`glass-panel p-4 rounded-xl border ${quadMeta.color} transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-mono tracking-wide uppercase">
                    {quadMeta.label}
                  </span>
                  <span className={`text-[8px] font-mono px-2 py-0.5 rounded-full ${quadMeta.badge}`}>
                    {features.length} {features.length === 1 ? "Feature" : "Features"}
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  {features.map((feat) => {
                    const isHovered = hoveredFeature === feat.feature;
                    return (
                      <div
                        key={feat.feature}
                        className={`p-2.5 rounded-lg border transition-colors ${
                          isHovered
                            ? "bg-white/5 border-white/10"
                            : "bg-black/15 border-transparent"
                        }`}
                        onMouseEnter={() => setHoveredFeature(feat.feature)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-100 flex items-center space-x-1">
                            <span>{feat.feature}</span>
                            {isHovered && <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />}
                          </h4>
                          <span className="text-[9px] font-mono text-slate-400">
                            Imp: {feat.impact} | Eff: {feat.effort}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default MatrixPanel;
