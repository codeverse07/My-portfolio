"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Award, Mail, Rocket, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#skills" },
  { name: "Certificates", href: "#certificates" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Hide Navbar on view-certificate page
  if (pathname === "/view-certificate") return null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map(link => link.name.toLowerCase());
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const id = section === 'services' ? 'skills' : section;
        const element = document.getElementById(id);
        if (
          element &&
          element.offsetTop <= scrollPosition &&
          element.offsetTop + element.offsetHeight > scrollPosition
        ) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - (window.innerWidth < 768 ? 0 : 100),
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Desktop Top Navbar */}
      <div className="fixed top-6 left-0 right-0 z-[100] hidden md:flex justify-center px-6 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={cn(
            "pointer-events-auto glass-ultra rounded-full border border-white/10 px-4 py-2 flex items-center gap-2 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500",
            scrolled ? "bg-black/60 backdrop-blur-[20px] py-2" : "bg-black/20 backdrop-blur-[10px] py-3"
          )}
        >
          <div className="flex items-center gap-1">
            {NAV_LINKS.map((link, idx) => {
              const isActive = activeSection === link.name.toLowerCase();
              const isCertificates = link.name === "Certificates";
              
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={cn(
                    "relative px-4 py-2 rounded-full transition-all duration-300",
                    isCertificates 
                      ? "text-lg font-black tracking-widest uppercase text-accent-orange hover:text-white"
                      : "text-sm font-medium text-white/70 hover:text-white",
                    isActive && !isCertificates && "text-black font-bold"
                  )}
                >
                  {isActive && !isCertificates && (
                    <motion.div
                      layoutId="active-pill"
                      className={cn(
                        "absolute inset-0 rounded-full z-0",
                        idx < 3 ? "bg-accent-orange shadow-[0_0_15px_rgba(255,127,80,0.6)]" : "bg-accent-sky shadow-[0_0_15px_rgba(14,165,233,0.6)]"
                      )}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>
        </motion.nav>
      </div>

      {/* Mobile App-like Bottom Navigation */}
      <div className="fixed bottom-6 left-6 right-6 z-[100] md:hidden pointer-events-none">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto glass-ultra rounded-[2.5rem] border border-white/10 p-2 flex items-center justify-between shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        >
          {NAV_LINKS.filter(l => l.name !== "Services").map((link) => {
            const isActive = activeSection === link.name.toLowerCase();
            const Icon = link.name === "Home" ? Rocket : 
                         link.name === "About" ? User : 
                         link.name === "Certificates" ? Award : 
                         link.name === "Projects" ? Briefcase : Mail;
            
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={cn(
                  "flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 relative",
                  isActive ? "bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)]" : "text-white/40"
                )}
              >
                <Icon size={20} />
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-glow"
                    className="absolute inset-0 rounded-full bg-white/20 blur-md -z-10"
                  />
                )}
              </a>
            );
          })}
        </motion.div>
      </div>
    </>
  );
};
