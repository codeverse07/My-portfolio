"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 100,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "pointer-events-auto glass-ultra rounded-full border border-white/10 px-4 py-2 flex items-center gap-2 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500",
          scrolled ? "bg-black/60 backdrop-blur-[20px] py-2" : "bg-black/20 backdrop-blur-[10px] py-3"
        )}
      >
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link, idx) => {
            const isActive = activeSection === link.name.toLowerCase();
            const isEven = idx % 2 === 0;
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

        {/* Mobile View Toggle */}
        <div className="md:hidden flex items-center justify-between w-full min-w-[200px] px-2">
          <span className="text-neon-lime font-black tracking-tighter flex items-center gap-2">
            <Rocket size={16} /> SACHIN
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/70 hover:text-white"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute top-full left-0 right-0 mt-4 glass-ultra rounded-[2rem] border border-white/10 p-4 flex flex-col gap-2 md:hidden shadow-2xl overflow-hidden"
            >
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={cn(
                    "px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all",
                    activeSection === link.name.toLowerCase() 
                      ? idx % 2 === 0 ? "bg-neon-lime text-black" : "bg-coral text-black"
                      : "text-white/60 hover:bg-white/5"
                  )}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
