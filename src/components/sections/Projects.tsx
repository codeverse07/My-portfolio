"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, Cpu } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const PROJECTS = [
  {
    title: "RESERVICE",
    description: "Full-stack live web application for home service providers. Modular architecture, React admin dashboard, and RESTful booking API.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    live: "https://frontend-umber-three-92.vercel.app",
    github: "#",
    image: "/proj_reservice.png",
    color: "orange",
  },
  {
    title: "SVM PREDICTION ENGINE",
    description: "Deployed Support Vector Machine (SVM) model for classification. Features a Flask REST API for real-time predictions and a responsive frontend.",
    tech: ["Python", "Scikit-learn", "Flask", "React"],
    live: "#",
    github: "#",
    image: "/proj_svm.png",
    color: "sky",
  },
  {
    title: "AI CHATBOT AUTOMATION",
    description: "Intelligent workflow automation bots integrating N8N, Botpress, and custom Python scripts to optimize business processes.",
    tech: ["Botpress", "Voiceflow", "N8N", "Python"],
    live: "https://frontend-umber-three-92.vercel.app",
    github: "#",
    image: "/proj_chatbot.png",
    color: "peach",
  },
  {
    title: "KREATIV AD STUDIO",
    description: "A premium, cinematic creative agency portfolio and production studio platform. Features high-end video integration and fluid motion design.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "Vercel"],
    live: "https://kreativstudio-o25p.vercel.app",
    github: "#",
    image: "/proj_adstudio.png",
    color: "orange",
  },
];

const ProjectCard = ({ project, idx }: { project: typeof PROJECTS[0], idx: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

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

  const isEven = idx % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative glass-ultra rounded-3xl p-6 h-full flex flex-col transition-all duration-500 group
        ${isEven ? 'shadow-[0_0_20px_rgba(205,255,0,0.2)] hover:shadow-[0_0_30px_rgba(205,255,0,0.3)]' : 'shadow-[0_0_20px_rgba(255,127,80,0.2)] hover:shadow-[0_0_30px_rgba(255,127,80,0.3)]'}
      `}
    >
      <div 
        style={{ transform: "translateZ(50px)" }} 
        className="w-full aspect-[16/9] rounded-2xl bg-white/5 mb-6 overflow-hidden relative flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-500 backdrop-blur-sm"
      >
        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 mix-blend-screen z-10
          ${isEven ? 'from-neon-lime to-transparent' : 'from-coral to-transparent'}
        `} />
        
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>

      <div style={{ transform: "translateZ(30px)" }} className="flex-grow">
        <h3 className={`text-2xl font-bold mb-3 tracking-widest transition-colors duration-300
          ${isEven ? 'group-hover:text-neon-lime text-white' : 'group-hover:text-coral text-white'}
        `}>{project.title}</h3>
        <p className="text-white/60 text-sm mb-6 line-clamp-3 leading-relaxed group-hover:text-white/90 transition-colors duration-300">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map(tech => (
            <span key={tech} className={`text-xs px-3 py-1 rounded-full border bg-white/5 font-medium tracking-wider transition-colors
              ${isEven ? 'border-neon-lime/30 text-neon-lime group-hover:bg-neon-lime/10' : 'border-coral/30 text-coral group-hover:bg-coral/10'}
            `}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div style={{ transform: "translateZ(40px)" }} className="flex items-center gap-4 mt-auto">
        <a 
          href={project.live} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 border
          ${isEven ? 'bg-neon-lime/10 text-neon-lime border-neon-lime hover:bg-neon-lime hover:text-black' : 'bg-coral/10 text-coral border-coral hover:bg-coral hover:text-black'}
        `}>
          <ExternalLink size={16} /> Deploy
        </a>
        <a 
          href={project.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-xl glass-ultra border border-white/10 hover:border-white transition-colors"
        >
          <Code2 size={20} className="text-white" />
        </a>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAllView, setIsAllView] = useState(false);

  useEffect(() => {
    if (isAllView) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isAllView]);

  return (
    <section id="projects" className="py-32 relative bg-transparent z-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block glass-ultra px-6 py-2 rounded-full mb-6 text-white text-sm font-semibold tracking-[0.2em] uppercase border-neon-lime shadow-[0_0_15px_rgba(205,255,0,0.3)]"
            >
              Execution Logs
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white"
            >
              FEATURED <span className="text-neon-lime">SYSTEMS</span>
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-[2px] bg-neon-lime rounded-full shadow-[0_0_10px_rgba(205,255,0,0.8)]" 
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAllView(!isAllView)}
            className="group relative px-8 py-3 rounded-full font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 border border-white/20 hover:border-neon-lime"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isAllView ? 'Collapse Stack' : 'View All Systems'}
            </span>
            <div className="absolute inset-0 bg-neon-lime opacity-0 group-hover:opacity-10 transition-opacity" />
          </motion.button>
        </div>

        <motion.div 
          layout
          className={isAllView 
            ? "grid md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12" 
            : "relative h-[650px] md:h-[600px] flex items-center justify-center w-full"
          }
        >
          <AnimatePresence initial={false}>
            {PROJECTS.map((project, idx) => {
              // Carousel Logic (only used when not in All View)
              const offset = (idx - currentIndex + PROJECTS.length) % PROJECTS.length;
              let carouselX = 0;
              let carouselScale = 1;
              let carouselOpacity = 1;
              let carouselZIndex = 50;

              if (offset === 0) {
                carouselX = 0;
                carouselScale = 1;
                carouselOpacity = 1;
                carouselZIndex = 50;
              } else if (offset === 1) {
                carouselX = 400;
                carouselScale = 0.9;
                carouselOpacity = 0.4;
                carouselZIndex = 40;
              } else if (offset === PROJECTS.length - 1) {
                carouselX = -400;
                carouselScale = 0.9;
                carouselOpacity = 0;
                carouselZIndex = 60;
              } else {
                carouselX = 800;
                carouselScale = 0.8;
                carouselOpacity = 0;
                carouselZIndex = 10;
              }

              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    x: isAllView ? 0 : carouselX,
                    y: 0,
                    scale: isAllView ? 1 : carouselScale,
                    opacity: isAllView ? 1 : carouselOpacity,
                    zIndex: isAllView ? 1 : carouselZIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 25,
                  }}
                  className={isAllView ? "relative w-full h-full" : "absolute w-full max-w-[450px]"}
                >
                  <ProjectCard project={project} idx={idx} />
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {/* Navigation Dots - Only show in carousel mode */}
          {!isAllView && (
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-neon-lime' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
