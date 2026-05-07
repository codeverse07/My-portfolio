"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, ExternalLink, Award, X, RotateCcw, RotateCw, Cpu, Brain, MessageSquare, Code2, Target } from "lucide-react";
import React, { useState } from "react";

const CERTIFICATES_DATA = [
  {
    title: "AI Professional Certificate",
    issuer: "IBM / Industry Standard",
    date: "2024",
    file: "/certificates/ai certificate.pdf",
    icon: <Cpu className="w-16 h-16" />,
    color: "neon-lime",
  },
  {
    title: "Large Language Models Mastery",
    issuer: "DeepLearning.AI",
    date: "2024",
    file: "/certificates/large language models.pdf",
    icon: <Brain className="w-16 h-16" />,
    color: "coral",
  },
  {
    title: "Art of Prompt Engineering",
    issuer: "Prompt Design Excellence",
    date: "2024",
    file: "/certificates/art of prompting.pdf",
    icon: <MessageSquare className="w-16 h-16" />,
    color: "neon-lime",
  },
  {
    title: "Introduction to AI",
    issuer: "Foundational Principles",
    date: "2023",
    file: "/certificates/introduction to ai.pdf",
    icon: <Code2 className="w-16 h-16" />,
    color: "coral",
  },
  {
    title: "Earn It Certificate",
    issuer: "Professional Milestone",
    date: "2023",
    file: "/certificates/earn it.pdf",
    icon: <Target className="w-16 h-16" />,
    color: "coral",
  },
];

const CertificateCard = ({ cert, idx, onView }: { cert: typeof CERTIFICATES_DATA[0]; idx: number; onView: () => void }) => {
  const isEven = idx % 2 === 0;
  const glowShadow = isEven ? 'hover:shadow-[0_0_20px_rgba(205,255,0,0.2)] hover:border-neon-lime/50' : 'hover:shadow-[0_0_20px_rgba(255,127,80,0.2)] hover:border-coral/50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.6 }}
      className={`glass-ultra rounded-3xl overflow-hidden group flex flex-col transition-all duration-500 border border-white/10 ${glowShadow}`}
    >
      <div className="w-full aspect-[4/3] bg-white/5 relative overflow-hidden flex items-center justify-center border-b border-white/10 group-hover:bg-white/10 transition-colors">
        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10
          ${isEven ? 'from-neon-lime to-transparent' : 'from-coral to-transparent'}
        `} />
        
        <div className="relative z-20 flex flex-col items-center gap-4 group-hover:scale-110 transition-transform duration-500">
          <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl
            ${isEven ? 'text-neon-lime group-hover:border-neon-lime/30' : 'text-coral group-hover:border-coral/30'}
          `}>
            {cert.icon}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-white/60 transition-colors">
            {cert.issuer}
          </span>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-white/10" />
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/10" />
      </div>

      <div className="p-6 flex flex-col flex-grow relative">
        <div className={`absolute top-0 right-6 -translate-y-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg
          ${isEven ? 'bg-neon-lime text-black' : 'bg-coral text-black'}
        `}>
          {cert.date}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 leading-tight min-h-[3rem]">{cert.title}</h3>
        <p className="text-white/50 text-sm font-mono mb-6">{cert.issuer}</p>
        
        <div className="flex gap-4">
          <button 
            onClick={onView}
            className="flex-1 glass-ultra py-3 rounded-xl flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10"
          >
            <ExternalLink size={14} /> View
          </button>
          <a 
            href={cert.file} 
            download 
            className={`flex-1 py-3 rounded-xl flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-black transition-colors
              ${isEven ? 'bg-neon-lime hover:bg-white' : 'bg-coral hover:bg-white'}
            `}
          >
            <Download size={14} /> DL
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const Certificates = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleView = (cert: typeof CERTIFICATES_DATA[0]) => {
    const url = `/view-certificate?file=${encodeURIComponent(cert.file)}&title=${encodeURIComponent(cert.title)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="certificates" className="py-32 relative bg-transparent z-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-white uppercase"
            >
              Verified <span className="text-neon-lime block">Credentials.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-lg leading-relaxed font-sans"
            >
              Official certifications validating specialized technical expertise. Every document opens in a dedicated vertical viewer for maximum clarity.
            </motion.p>
          </div>
        </div>

        <div className="relative">
          <motion.div 
            layout 
            className={isExpanded ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" : "relative flex justify-center items-center h-[550px] w-full"}
          >
            {CERTIFICATES_DATA.map((cert, idx) => (
              <motion.div
                layout
                key={cert.title}
                onClick={() => !isExpanded && setIsExpanded(true)}
                initial={false}
                animate={!isExpanded ? {
                  rotateZ: (idx - 1) * 4,
                  x: (idx - 1) * 20,
                  y: idx * -10,
                  scale: 1 - idx * 0.03,
                  zIndex: CERTIFICATES_DATA.length - idx
                } : {
                  rotateZ: 0,
                  x: 0,
                  y: 0,
                  scale: 1,
                  zIndex: 1
                }}
                transition={{ type: "spring", stiffness: 100, damping: 25 }}
                className={isExpanded ? "w-full" : "absolute w-full max-w-[350px] cursor-pointer"}
              >
                {!isExpanded && idx === 0 && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 rounded-3xl opacity-0 hover:opacity-100 transition-opacity backdrop-blur-sm pointer-events-none">
                    <span className="bg-neon-lime text-black px-6 py-2 rounded-full font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(205,255,0,0.8)]">Open Stack</span>
                  </div>
                )}
                
                <CertificateCard 
                  cert={cert} 
                  idx={idx} 
                  onView={() => isExpanded && handleView(cert)} 
                />
                
                {!isExpanded && <div className="absolute inset-0 z-40" />}
              </motion.div>
            ))}
          </motion.div>

          {isExpanded && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-12">
              <button 
                onClick={() => setIsExpanded(false)}
                className="px-8 py-3 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-neon-lime transition-all uppercase tracking-widest text-xs font-bold"
              >
                Collapse Stack
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
