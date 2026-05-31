"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Laptop, Shield, Cpu, Database, Activity } from "lucide-react";
import { HackathonPlan } from "@/lib/openai";

interface ArchitecturePanelProps {
  architecture: HackathonPlan["architecture"];
}

const TYPE_ICONS = {
  frontend: Laptop,
  api: Shield,
  service: Cpu,
  database: Database
};

const TYPE_COLORS = {
  frontend: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
  api: "text-purple-400 border-purple-500/20 bg-purple-500/5",
  service: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
  database: "text-blue-400 border-blue-500/20 bg-blue-500/5"
};

const GLOW_SHADOWS = {
  frontend: "rgba(99, 102, 241, 0.2)",
  api: "rgba(168, 85, 247, 0.2)",
  service: "rgba(6, 182, 212, 0.2)",
  database: "rgba(59, 130, 246, 0.2)"
};

export function ArchitecturePanel({ architecture }: ArchitecturePanelProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);

  // Map to get node coordinates easily
  const coordsMap = React.useMemo(() => {
    const map: Record<string, { x: number; y: number; label: string; type: string }> = {};
    architecture.nodes.forEach((n) => {
      map[n.id] = { x: n.x, y: n.y, label: n.label, type: n.type };
    });
    return map;
  }, [architecture.nodes]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <span>Interactive System Architecture Flow</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visual data topology mapping client triggers, serverless gateways, cognitive search, and indexes.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 px-3 py-1 rounded-full">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>DATA FLOW ROUTING: ACTIVE</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
        {architecture.description}
      </p>

      {/* Diagram Area Wrapper */}
      <div className="glass-panel rounded-2xl border border-white/5 p-6 overflow-x-auto relative min-h-[400px] flex items-center justify-center bg-[#070c1b]/60">
        {/* Scroll helper */}
        <div className="absolute top-2 right-4 text-[9px] font-mono text-slate-500 pointer-events-none md:hidden">
          Scroll horizontally to view map &rarr;
        </div>

        {/* Viewport size normalized to 850px width by 350px height */}
        <div className="w-[850px] h-[350px] relative flex-shrink-0">
          
          {/* Edge Connection SVG Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="22" // offset to avoid overlapping node borders
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="url(#edge-gradient)" />
              </marker>
            </defs>

            {architecture.edges.map((edge, idx) => {
              const src = coordsMap[edge.source];
              const dest = coordsMap[edge.target];
              if (!src || !dest) return null;

              const isHighlighted =
                hoveredNode === edge.source ||
                hoveredNode === edge.target ||
                hoveredEdge === `${edge.source}-${edge.target}`;

              return (
                <g key={idx} className="transition-all duration-300">
                  {/* Outer glowing path */}
                  <path
                    d={`M ${src.x} ${src.y} L ${dest.x} ${dest.y}`}
                    stroke={isHighlighted ? "rgba(6, 182, 212, 0.4)" : "rgba(255, 255, 255, 0.05)"}
                    strokeWidth={isHighlighted ? 4 : 2}
                    fill="none"
                    className="transition-all"
                  />
                  {/* Core data path with flowing dashes */}
                  <path
                    d={`M ${src.x} ${src.y} L ${dest.x} ${dest.y}`}
                    stroke="url(#edge-gradient)"
                    strokeWidth={1.5}
                    strokeDasharray={isHighlighted ? "6, 6" : "8, 12"}
                    fill="none"
                    markerEnd="url(#arrow)"
                    className={isHighlighted ? "animate-[dash_1s_linear_infinite]" : "animate-[dash_4s_linear_infinite]"}
                    style={{
                      strokeDashoffset: isHighlighted ? -20 : -100
                    }}
                  />
                  {/* Connection Labels */}
                  <foreignObject
                    x={(src.x + dest.x) / 2 - 60}
                    y={(src.y + dest.y) / 2 - 12}
                    width="120"
                    height="24"
                    className="overflow-visible"
                  >
                    <div className="flex justify-center">
                      <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-slate-950/80 border border-white/10 text-slate-400 shadow-md">
                        {edge.label}
                      </span>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>

          {/* Node Renderers */}
          {architecture.nodes.map((node) => {
            const Icon = TYPE_ICONS[node.type];
            const typeColor = TYPE_COLORS[node.type];
            const shadowColor = GLOW_SHADOWS[node.type];
            const isHovered = hoveredNode === node.id;

            return (
              <motion.div
                key={node.id}
                style={{
                  left: node.x,
                  top: node.y,
                  transform: "translate(-50%, -50%)",
                  boxShadow: isHovered ? `0 0 25px ${shadowColor}` : "none"
                }}
                className={`absolute z-10 p-3 rounded-xl border flex items-center space-x-3 transition-all duration-300 select-none cursor-crosshair glass-panel-glow ${
                  isHovered ? "border-cyan-500/40" : "border-white/10"
                }`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Visual Icon Badge */}
                <div className={`p-2 rounded-lg border ${typeColor}`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="text-left">
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">
                    {node.type}
                  </span>
                  <span className="text-[11px] font-bold text-slate-100 mt-0.5">
                    {node.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default ArchitecturePanel;
