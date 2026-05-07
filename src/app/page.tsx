"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Timeline } from "@/components/sections/Timeline";
import { Certificates } from "@/components/sections/Certificates";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/ui/Navbar";

const MistyBackground = () => (
  <div className="misty-background fixed inset-0 overflow-hidden pointer-events-none">
    <motion.div 
      animate={{ 
        x: [0, 50, 0], 
        y: [0, 30, 0],
        scale: [1, 1.1, 1] 
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="misty-blob blob-orange opacity-30 md:opacity-50" 
    />
    <motion.div 
      animate={{ 
        x: [0, -40, 0], 
        y: [0, 50, 0],
        scale: [1, 1.2, 1] 
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="misty-blob blob-blue opacity-30 md:opacity-50" 
    />
    <motion.div 
      animate={{ 
        x: [0, 30, 0], 
        y: [0, -40, 0],
        scale: [1, 1.1, 1] 
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="misty-blob blob-red opacity-30 md:opacity-50" 
    />
  </div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isLoading]);

  return (
    <>
      <MistyBackground />
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onFinish={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && <Navbar />}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.2 }}
        className="flex flex-col min-h-screen relative z-10"
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Certificates />
        <Resume />
        <Contact />
        <Footer />
      </motion.main>
    </>
  );
}
