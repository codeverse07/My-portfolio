"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, Cpu, LayoutGrid, Layers, Star } from "lucide-react";
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
        ${isEven 
          ? 'shadow-[0_0_20px_rgba(205,255,0,0.2)] border-neon-lime/30 md:border-white/10 md:shadow-none md:hover:shadow-[0_0_30px_rgba(205,255,0,0.3)] md:hover:border-neon-lime/50' 
          : 'shadow-[0_0_20px_rgba(255,127,80,0.2)] border-coral/30 md:border-white/10 md:shadow-none md:hover:shadow-[0_0_30px_rgba(255,127,80,0.3)] md:hover:border-coral/50'}
      `}
    >
      <div 
        style={{ transform: "translateZ(50px)" }} 
        className="w-full aspect-[16/9] rounded-2xl bg-white/5 mb-6 overflow-hidden relative flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-500 backdrop-blur-sm"
      >
        <div className={`absolute inset-0 bg-gradient-to-br opacity-20 md:opacity-0 md:group-hover:opacity-20 transition-opacity duration-500 mix-blend-screen z-10
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
          style={{ 
            backgroundColor: isEven ? '#CDFF00' : '#FF7F50', 
            color: '#000000' 
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all duration-300 shadow-lg`}
        >
          <ExternalLink size={14} color="#000000" /> 
          <span style={{ color: '#000000', fontWeight: 900 }}>Deploy</span>
        </a>
        <a 
          href={project.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-xl glass-ultra border border-white/20 md:border-white/10 md:hover:border-white transition-colors shadow-lg"
        >
          <Code2 size={18} className="text-white" />
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 relative bg-transparent z-20 overflow-hidden snap-start">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block glass-ultra px-6 py-2 rounded-full mb-6 text-white text-xs font-bold tracking-[0.3em] uppercase border-accent-sky shadow-[0_0_15px_rgba(14,165,233,0.3)]"
            >
              Execution_Logs
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase"
            >
              Selected <span className="text-accent-sky">Projects.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-xl leading-relaxed font-medium"
            >
              Architecting high-performance digital experiences with cutting-edge tech.
            </motion.p>
          </div>

          <button 
            onClick={() => setIsAllView(!isAllView)}
            className="group px-8 py-4 glass-ultra rounded-2xl flex items-center gap-3 text-white font-bold tracking-widest uppercase text-xs hover:border-accent-sky transition-all duration-500 shadow-xl"
          >
            {isAllView ? (
              <><Layers className="group-hover:rotate-180 transition-transform duration-500" size={16} /> Stack View</>
            ) : (
              <><LayoutGrid className="group-hover:scale-110 transition-transform duration-500" size={16} /> All Systems</>
            )}
          </button>
        </div>

        <motion.div 
          layout
          className={isAllView || isMobile
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12" 
            : "relative md:h-[600px] flex items-center justify-center w-full"
          }
        >
          <AnimatePresence mode="popLayout">
            {PROJECTS.map((project, idx) => {
              const offset = (idx - currentIndex + PROJECTS.length) % PROJECTS.length;
              
              let carouselX: string | number = 0;
              let carouselScale = 1;
              let carouselOpacity = 1;
              let carouselZIndex = 50;

              if (offset === 0) {
                carouselX = 0;
                carouselScale = 1;
                carouselOpacity = 1;
                carouselZIndex = 50;
              } else if (offset === 1) {
                carouselX = "100%";
                carouselScale = 0.8;
                carouselOpacity = 0;
                carouselZIndex = 40;
              } else if (offset === PROJECTS.length - 1) {
                carouselX = "-100%";
                carouselScale = 0.8;
                carouselOpacity = 0;
                carouselZIndex = 60;
              } else {
                carouselX = "200%";
                carouselScale = 0.7;
                carouselOpacity = 0;
                carouselZIndex = 10;
              }

              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={isAllView || isMobile ? {
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    zIndex: 1,
                  } : {
                    x: carouselX,
                    scale: carouselScale,
                    opacity: carouselOpacity,
                    zIndex: carouselZIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 25,
                  }}
                  className={isAllView || isMobile ? "relative w-full h-full" : "absolute w-[90vw] md:max-w-[450px]"}
                >
                  <ProjectCard project={project} idx={idx} />
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Dots - Only show in carousel mode on desktop */}
          {!isAllView && !isMobile && (
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
