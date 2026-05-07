"use client";

import { motion } from "framer-motion";

export const FramerMotionBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0a0a0c] pointer-events-none">
      
      {/* Massive Misty Orange Blob 1 */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: ["0%", "5%", "-5%", "0%"],
          y: ["0%", "5%", "-5%", "0%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-accent-orange/20 rounded-full blur-[150px] mix-blend-screen"
      />

      {/* Massive Sky Blue Blob 2 */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
          x: ["0%", "-5%", "5%", "0%"],
          y: ["0%", "-5%", "5%", "0%"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-accent-sky/20 rounded-full blur-[150px] mix-blend-screen"
      />

      {/* Center Peach Blob */}
      <motion.div
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] bg-accent-peach/15 rounded-full blur-[120px] mix-blend-screen"
      />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />
      
      {/* Vignette effect for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0a0a0c] opacity-80" />
    </div>
  );
};
