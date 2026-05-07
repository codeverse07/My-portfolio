"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Database, Cpu, Layers, Brain, Code2, Cloud } from "lucide-react";
import React, { useRef } from "react";

const SERVICES_DATA = [
  {
    title: "Full-Stack Development",
    icon: <Layers className="w-8 h-8 text-accent-orange" />,
    skills: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Tailwind CSS"],
    color: "orange",
  },
  {
    title: "Machine Learning & AI",
    icon: <Cpu className="w-8 h-8 text-accent-sky" />,
    skills: ["Python", "Scikit-learn", "SVM Models", "Model Training", "Data Analysis"],
    color: "sky",
  },
  {
    title: "Backend & Security",
    icon: <Database className="w-8 h-8 text-accent-peach" />,
    skills: ["RESTful APIs", "JWT Auth", "Google OAuth", "OWASP Security", "Input Validation"],
    color: "peach",
  },
  {
    title: "Intelligent Automation",
    icon: <Brain className="w-8 h-8 text-accent-orange" />,
    skills: ["AI Chatbots", "Botpress", "Voiceflow", "N8N", "Web Bots"],
    color: "orange",
  },
  {
    title: "Core Engineering & DSA",
    icon: <Code2 className="w-8 h-8 text-accent-sky" />,
    skills: ["Java (OOP)", "Data Structures", "Algorithms", "Problem Solving", "Multi-threading"],
    color: "sky",
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud className="w-8 h-8 text-accent-peach" />,
    skills: ["Vercel", "Render", "IBM Cloud", "Git/GitHub", "Postman Testing"],
    color: "peach",
  },
];

const TiltCard = ({ category, idx }: { category: typeof SERVICES_DATA[0]; idx: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: idx * 0.1, duration: 1.2, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full perspective-1000"
    >
      <div 
        className={`glass-ultra p-8 rounded-[2rem] transition-all duration-700 group h-full flex flex-col justify-between hover:scale-[1.02]
          ${idx % 2 === 0 ? 'hover:border-neon-lime shadow-[0_0_20px_rgba(205,255,0,0.1)] hover:shadow-[0_0_30px_rgba(205,255,0,0.2)]' : 'hover:border-coral shadow-[0_0_20px_rgba(255,127,80,0.1)] hover:shadow-[0_0_30px_rgba(255,127,80,0.2)]'}
        `}
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="relative z-10">
          <div 
            className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500 backdrop-blur-md"
            style={{ transform: "translateZ(50px)" }}
          >
            {React.cloneElement(category.icon as React.ReactElement, { className: `w-8 h-8 ${idx % 2 === 0 ? 'text-neon-lime' : 'text-coral'}` })}
          </div>
          
          <h3 
            className="text-2xl font-bold mb-6 text-white tracking-wide uppercase"
            style={{ transform: "translateZ(40px)" }}
          >
            {category.title}
          </h3>
          
          <div 
            className="flex flex-wrap gap-2 mb-6"
            style={{ transform: "translateZ(20px)" }}
          >
            {category.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 + i * 0.05, duration: 0.8 }}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors cursor-default
                  ${idx % 2 === 0 ? 'bg-neon-lime/10 border-neon-lime/20 text-neon-lime hover:bg-neon-lime/20' : 'bg-coral/10 border-coral/20 text-coral hover:bg-coral/20'}
                `}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Apply spring for buttery smoothness
  const smoothScale = useSpring(useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.95, 1.05, 1.05, 1.05]), { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 1]), { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} id="skills" className="py-32 relative overflow-hidden bg-transparent z-20">
      <motion.div style={{ scale: smoothScale, opacity: smoothOpacity }} className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block glass-ultra px-6 py-2 rounded-full mb-6 text-white text-xs font-bold tracking-[0.3em] uppercase border-neon-lime shadow-[0_0_15px_rgba(205,255,0,0.3)]"
            >
              System Operations
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase"
            >
              MY <span className="text-neon-lime">SERVICES</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-xl leading-relaxed font-medium"
            >
              Utilizing a robust stack of AI tools, backend frameworks, and modern frontend architecture to build production-grade solutions.
            </motion.p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 perspective-1000">
          {SERVICES_DATA.map((category, idx) => (
            <TiltCard key={category.title} category={category} idx={idx} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};
