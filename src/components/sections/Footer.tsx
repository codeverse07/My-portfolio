"use client";

import { ArrowUp, Code2, Briefcase, MessageSquare, Mail } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#050505]/80 backdrop-blur-3xl py-12 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-50 shadow-[0_0_15px_rgba(0,240,255,0.8)]" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        <div className="text-center md:text-left">
          <p className="text-2xl font-black tracking-widest text-white mb-2 font-mono">
            SACHIN<span className="text-accent-cyan">.</span>KUMAR
          </p>
          <p className="text-white/40 text-xs tracking-widest font-mono uppercase">
            System Online. © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {[
            { 
              name: "LinkedIn",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, 
              link: "https://linkedin.com/in/sachin-kumar-jha-devs07" 
            },
            { 
              name: "GitHub",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>, 
              link: "https://github.com/codeverse07" 
            },
            { 
              name: "Email",
              icon: <Mail size={18} />, 
              link: "#contact" 
            }
          ].map((item, idx) => (
            <a 
              key={idx} 
              href={item.link} 
              target={item.name === "LinkedIn" || item.name === "GitHub" ? "_blank" : undefined}
              rel={item.name === "LinkedIn" || item.name === "GitHub" ? "noopener noreferrer" : undefined}
              className="w-12 h-12 rounded-full glass-ultra flex items-center justify-center text-white/50 hover:text-neon-lime border border-white/10 hover:border-neon-lime transition-all duration-300 shadow-lg"
              title={item.name}
            >
              {item.icon}
            </a>
          ))}
        </div>

        <button 
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full glass-ultra hover:bg-accent-cyan/10 border border-white/10 hover:border-accent-cyan flex items-center justify-center text-accent-cyan transition-all duration-300 group shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>

      </div>

    </footer>
  );
};
