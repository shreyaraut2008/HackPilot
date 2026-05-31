"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function GlowGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Smooth springs for cursor follow glow
  const springConfig = { damping: 40, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 -z-50 w-full h-full bg-[#050816] overflow-hidden pointer-events-none">
      {/* Mesh grid background */}
      <div className="absolute inset-0 w-full h-full animated-grid animate-grid-shift opacity-30" />

      {/* Noise overlay */}
      <div className="absolute inset-0 w-full h-full noise-overlay" />

      {/* Static mesh grid points overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,24,48,0.3)_0%,transparent_70%)]" />

      {/* Floating Aurora / Mesh Orbs */}
      {/* Orb 1: Indigo */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -50, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/10 glow-orb"
      />

      {/* Orb 2: Purple */}
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 40, -50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 glow-orb"
      />

      {/* Orb 3: Cyan */}
      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, 60, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-cyan-600/10 glow-orb"
      />

      {/* Interactive mouse follow spotlight */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 glow-orb mix-blend-screen"
      />
    </div>
  );
}
export default GlowGrid;
