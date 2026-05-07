"use client";

import { motion } from "framer-motion";
import { FileText, Download, Eye, Scan } from "lucide-react";

export const Resume = () => {
  return (
    <section id="resume" className="py-32 relative bg-transparent z-20">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-ultra rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center group border border-accent-orange/20 transition-all duration-500 shadow-[0_0_30px_rgba(255,107,53,0.15)] hover:shadow-none hover:bg-black/60 hover:backdrop-blur-[60px]"
        >
          {/* Cyber Scanning effect on hover */}
          <div className="absolute left-0 top-0 w-full h-[2px] bg-accent-orange shadow-[0_0_15px_rgba(255,107,53,0.8)] opacity-0 group-hover:opacity-100 group-hover:animate-scan z-0 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-white/5 flex items-center justify-center mb-8 rotate-3 shadow-[0_0_15px_rgba(255,107,53,0.3)] border border-accent-orange/30 group-hover:scale-110 transition-transform duration-500">
                <FileText className="w-12 h-12 text-accent-orange" />
              </div>
              <Scan className="absolute -top-4 -right-4 w-8 h-8 text-accent-sky opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase text-white">
              Extract <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-sky">Data File</span>
            </h2>
            <p className="text-white/60 mb-10 max-w-lg mx-auto text-lg leading-relaxed font-mono group-hover:text-white/90 transition-colors duration-300">
              Initialize download sequence to retrieve complete technical specifications, work history, and architecture logs.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <a 
                href="/sachin_kumar_jha_resume.pdf" 
                download
                className="group/btn relative px-8 py-5 bg-transparent border border-accent-orange text-accent-orange font-bold rounded-none tracking-widest uppercase text-sm hover:bg-accent-orange hover:text-black transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent-orange opacity-0 group-hover/btn:opacity-10 transition-opacity" />
                <Download size={18} className="group-hover/btn:-translate-y-1 transition-transform" />
                Download
              </a>
              <a 
                href="/sachin_kumar_jha_resume.pdf"
                target="_blank"
                className="group/btn px-8 py-5 glass-ultra text-white font-bold rounded-none border border-white/20 hover:border-accent-sky tracking-widest uppercase text-sm flex items-center justify-center gap-3 transition-colors"
              >
                <Eye size={18} className="group-hover/btn:text-accent-sky transition-colors" />
                Preview
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
