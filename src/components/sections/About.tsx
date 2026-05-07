"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Code2 } from "lucide-react";

const SKILLS = [
  { name: "Full Stack (MERN)", progress: 95, color: "orange" },
  { name: "Python / AI / ML", progress: 90, color: "sky" },
  { name: "Java / DSA", progress: 85, color: "peach" },
  { name: "RESTful APIs", progress: 88, color: "orange" },
  { name: "AI Chatbots / Automation", progress: 92, color: "sky" },
];

export const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Progress bar trigger
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Scroll animations for the "combine" effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Apply spring for buttery smoothness
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Left column (Portrait): Comes from left, settles, then slightly moves left when leaving
  const leftX = useTransform(smoothScroll, [0, 0.45, 0.55, 1], [-30, 0, 0, -15]);
  const leftOpacity = useTransform(smoothScroll, [0, 0.25, 0.75, 1], [0.3, 1, 1, 0]);

  // Right column (Text): Comes from right, settles, then slightly moves right when leaving
  const rightX = useTransform(smoothScroll, [0, 0.45, 0.55, 1], [30, 0, 0, 15]);
  const rightOpacity = useTransform(smoothScroll, [0, 0.25, 0.75, 1], [0.3, 1, 1, 0]);

  return (
    <section id="about" className="py-32 relative bg-transparent z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Hologram Profile Container */}
          <motion.div 
            style={{ x: leftX, opacity: leftOpacity }} 
            className="relative perspective-1000"
          >
            <div className="absolute inset-0 bg-accent-orange/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="aspect-[4/5] rounded-3xl overflow-hidden glass-ultra border-accent-orange/20 relative group preserve-3d">
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-orange/20 via-transparent to-accent-sky/20 transition-transform duration-700 z-0" />
              
              <div className="absolute inset-0 z-20">
                <img 
                  src="/enhanc.png" 
                  alt="Sachin Kumar Jha" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out opacity-100 scale-100 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 glass-ultra px-8 py-6 rounded-2xl border border-accent-sky/50 shadow-[0_0_15px_rgba(14,165,233,0.5)] z-30"
            >
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-sky border-b border-white/10 pb-2 mb-2 font-mono tracking-tighter">
                2+ YRS
              </p>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/70">Operation Time</p>
            </motion.div>
          </motion.div>

          {/* Right: Text & Metrics */}
          <motion.div 
            style={{ x: rightX, opacity: rightOpacity }}
          >
            <div
              className="inline-block glass-ultra px-6 py-2 rounded-full mb-6 border-neon-lime shadow-[0_0_15px_rgba(205,255,0,0.3)] text-white text-sm font-semibold tracking-[0.2em] uppercase"
            >
              Entity Profile
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-tight text-white uppercase">
              Engineering <span className="text-neon-lime block">The Future.</span>
            </h2>
            <p className="text-lg text-white/60 mb-10 leading-relaxed font-sans">
              I am an AI-focused full-stack developer specializing in scalable MERN applications and machine learning integrations. 
              Currently pursuing a B.E. in Computer Science at Haridwar University, I combine a strong foundation in Java, Python, and DSA with avant-garde web architecture to build intelligent, high-performance digital solutions.
            </p>

            <div className="space-y-8">
              {SKILLS.map((skill, index) => (
                <div key={skill.name} className="relative">
                  <div className="flex justify-between mb-3">
                    <span className="font-bold text-xs tracking-widest uppercase font-mono text-white flex items-center gap-2">
                      <Code2 size={14} className={index % 2 === 0 ? "text-neon-lime" : "text-coral"} /> {skill.name}
                    </span>
                    <span className={`text-xs font-bold font-mono tracking-wider ${index % 2 === 0 ? "text-neon-lime" : "text-coral"}`}>
                      {skill.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#050505] border border-white/10 overflow-hidden relative rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.progress}%` } : {}}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "circOut" }}
                      className={`absolute top-0 left-0 h-full shadow-[0_0_10px_currentColor] rounded-full
                        ${index % 2 === 0 ? 'bg-neon-lime shadow-neon-lime' : 'bg-coral shadow-coral'}
                      `}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
