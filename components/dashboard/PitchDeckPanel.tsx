"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Presentation, ChevronLeft, ChevronRight, MessageSquare, Sparkles, Tv } from "lucide-react";
import { HackathonPlan } from "@/lib/openai";

interface PitchDeckPanelProps {
  pitchDeck: HackathonPlan["pitchDeck"];
  selectedIdeaName: string;
}

export function PitchDeckPanel({ pitchDeck, selectedIdeaName }: PitchDeckPanelProps) {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  const totalSlides = pitchDeck.slides.length;
  const slide = pitchDeck.slides[currentSlideIdx];

  const handlePrev = () => {
    setCurrentSlideIdx((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setCurrentSlideIdx((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  // Replace boilerplate slide names dynamically with user selection
  const slideTitle = slide.title.replace("[Idea Name]", selectedIdeaName);
  const slidePoints = slide.points.map((p) => p.replace("[Idea Name]", selectedIdeaName));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Presentation className="w-5 h-5 text-indigo-400" />
            <span>Interactive Pitch Deck Draft</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Slide outlines compiled for a high-intensity 3-minute hackathon judge showcase.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 px-3 py-1 rounded-full">
          <Tv className="w-3.5 h-3.5" />
          <span>SPEAKER LOGS GENERATED: READY</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Slide Display Arena */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden glass-panel border border-white/10 flex flex-col justify-between p-8 md:p-12 bg-gradient-to-br from-[#0c1328]/95 to-[#050816]/95">
          {/* Neon Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/20" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/20" />

          {/* Slide Header Row */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center space-x-2 font-mono text-[9px] text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>HACKPILOT AI DECK ENGINE // SLIDE {slide.slideNum} OF {totalSlides}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {selectedIdeaName.toUpperCase()} MVP
            </span>
          </div>

          {/* Slide Text Content (Animated Slide transitions) */}
          <div className="z-10 my-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl md:text-3xl font-extrabold text-white text-gradient-indigo-blue leading-tight">
                  {slideTitle}
                </h3>
                <p className="text-xs md:text-base font-semibold text-cyan-400 font-mono tracking-wide">
                  {slide.subtitle}
                </p>
                <ul className="space-y-3 mt-6">
                  {slidePoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-xs md:text-sm text-slate-300 flex items-start space-x-2"
                    >
                      <span className="text-cyan-400 select-none font-bold mt-0.5">&bull;</span>
                      <span className="leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Control Footer */}
          <div className="flex items-center justify-between border-t border-white/5 pt-4 z-10 mt-4">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2 rounded-lg bg-black/40 border border-white/10 hover:bg-slate-800 text-slate-300 hover:text-white transition duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2 rounded-lg bg-black/40 border border-white/10 hover:bg-slate-800 text-slate-300 hover:text-white transition duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlideIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlideIdx ? "w-6 bg-cyan-400" : "w-1.5 bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Presenter / Speaker Notes Panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#0a0f1d]/75 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-tr-2xl pointer-events-none" />
          <div className="flex items-center space-x-2 text-indigo-400 border-b border-white/5 pb-3">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase">JUDGE SPEAKER CUES & NOTES</span>
          </div>
          <div className="mt-3">
            <p className="text-xs leading-relaxed text-slate-300 italic font-medium">
              &ldquo;{slide.notes}&rdquo;
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono text-slate-500 uppercase">Pro Tip: Keep pacing within 30s for this slide.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default PitchDeckPanel;
