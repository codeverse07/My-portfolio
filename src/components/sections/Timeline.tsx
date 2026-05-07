"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Star, GraduationCap, Cpu } from "lucide-react";
import { useRef } from "react";

const TIMELINE_DATA = [
  {
    year: "Jan 2026 - Present",
    title: "FOUNDER & FULL STACK DEVELOPER",
    company: "RESERVICE (LIVE WEB APPLICATION)",
    description: "Developing a full-stack live web application for home service providers. Designed modular backend architecture using Node.js/Express, RESTful APIs, and built a React-based admin dashboard with 30% improved load speeds.",
    icon: <Cpu className="w-5 h-5 text-black" />,
    color: "orange",
  },
  {
    year: "Jun 2025 - Jul 2025",
    title: "AI ENGINEER INTERN",
    company: "IIT BHU / TECHNEX '25",
    description: "Developed and deployed a Support Vector Machine (SVM) model using Python and Scikit-learn. Built a Flask REST API to serve the model for real-time predictions and integrated it with a lightweight frontend interface.",
    icon: <Briefcase className="w-5 h-5 text-black" />,
    color: "sky",
  },
  {
    year: "Jul 2023 - Jun 2027",
    title: "B.E. COMPUTER SCIENCE & ENG.",
    company: "HARIDWAR UNIVERSITY ROORKEE",
    description: "Relevant Coursework: Data Structures, Algorithms, Machine Learning, AI, Cloud Computing, Cybersecurity, Web Development, Database Systems, Software Engineering.",
    icon: <GraduationCap className="w-5 h-5 text-black" />,
    color: "peach",
  },
  {
    year: "2025 - 2026",
    title: "TECHNICAL CERTIFICATIONS",
    company: "IBM, MICROSOFT, NPTEL",
    description: "Completed IBM Cloud Platforms foundations, Microsoft ELEVATE Programme, and Cyber Security & Privacy via NPTEL with IIT Madras.",
    icon: <Star className="w-5 h-5 text-black" />,
    color: "orange",
  },
];

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-32 relative bg-transparent z-20">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block glass-ultra px-6 py-2 rounded-full mb-6 border-accent-sky shadow-[0_0_15px_rgba(14,165,233,0.3)] text-white text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Temporal Log
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white"
          >
            JOURNEY & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-sky">MILESTONES</span>
          </motion.h2>
        </div>

        <div ref={containerRef} className="relative border-l-2 border-white/10 pl-8 ml-4 md:ml-0 md:pl-0 md:border-none">
          {/* Animated Central Line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-gradient-to-b from-accent-orange via-accent-sky to-accent-peach shadow-[0_0_10px_rgba(255,107,53,0.8)]" 
            />
          </div>

          {TIMELINE_DATA.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.6 }}
                className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-center justify-between group ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Desktop layout: Item half width */}
                <div className="md:w-[45%] w-full" />

                {/* Center Node */}
                <div className={`absolute left-[-41px] md:static md:left-auto w-12 h-12 rounded-full flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-125
                  ${item.color === 'orange' ? 'bg-accent-orange shadow-[0_0_15px_rgba(255,107,53,0.8)]' : ''}
                  ${item.color === 'sky' ? 'bg-accent-sky shadow-[0_0_15px_rgba(14,165,233,0.8)]' : ''}
                  ${item.color === 'peach' ? 'bg-accent-peach shadow-[0_0_15px_rgba(247,197,159,0.8)]' : ''}
                `}>
                  {item.icon}
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`md:w-[45%] w-full glass-ultra p-8 rounded-3xl transition-all duration-500 relative mt-4 md:mt-0
                    ${item.color === 'orange' ? 'shadow-[0_0_20px_rgba(255,107,53,0.2)] hover:border-accent-orange/50 hover:shadow-none hover:bg-black/60 hover:backdrop-blur-[60px]' : ''}
                    ${item.color === 'sky' ? 'shadow-[0_0_20px_rgba(14,165,233,0.2)] hover:border-accent-sky/50 hover:shadow-none hover:bg-black/60 hover:backdrop-blur-[60px]' : ''}
                    ${item.color === 'peach' ? 'shadow-[0_0_20px_rgba(247,197,159,0.1)] hover:border-accent-peach/50 hover:shadow-none hover:bg-black/60 hover:backdrop-blur-[60px]' : ''}
                  `}
                >
                  <span className={`font-bold tracking-[0.2em] uppercase mb-3 block text-xs
                    ${item.color === 'orange' ? 'text-accent-orange' : ''}
                    ${item.color === 'sky' ? 'text-accent-sky' : ''}
                    ${item.color === 'peach' ? 'text-accent-peach' : ''}
                  `}>
                    {item.year}
                  </span>
                  <h3 className={`text-2xl font-bold mb-2 tracking-widest transition-colors duration-300
                    ${item.color === 'orange' ? 'group-hover:text-accent-orange text-white' : ''}
                    ${item.color === 'sky' ? 'group-hover:text-accent-sky text-white' : ''}
                    ${item.color === 'peach' ? 'group-hover:text-accent-peach text-white' : ''}
                  `}>{item.title}</h3>
                  <h4 className="text-white/50 text-sm font-medium mb-6 uppercase tracking-wider">{item.company}</h4>
                  <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
