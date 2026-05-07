"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Star, Loader2 } from "lucide-react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, ContactShadows, Text, MeshWobbleMaterial, useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// A component that loads and displays the user's custom robo.glb
const AIAssistant = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/robo.glb");
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth mouse follow (subtle influence)
    const targetX = mouseX.get() * 0.2;
    const targetY = -mouseY.get() * 0.2;
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.1);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.1);
    
    // Floating motion
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <group ref={meshRef}>
      {/* Dramatic Facial Lighting */}
      <pointLight 
        position={[0, 1, 2]} 
        intensity={5} 
        color="#CDFF00" 
        distance={5}
      />
      <spotLight 
        position={[0, 2, 4]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        color="#fff" 
        castShadow 
      />

      {/* The Floating Rings (Moved further back) */}
      <group position={[0, 0, -1.5]}>
        <group rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <torusGeometry args={[3.2, 0.02, 16, 100]} />
            <meshStandardMaterial color="#CDFF00" emissive="#CDFF00" emissiveIntensity={5} />
          </mesh>
        </group>
        <group rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <mesh>
            <torusGeometry args={[3.4, 0.01, 16, 100]} />
            <meshStandardMaterial color="#FF7F50" emissive="#FF7F50" emissiveIntensity={3} />
          </mesh>
        </group>
      </group>

      {/* The User's Custom Robot Model (Larger Size) */}
      <primitive 
        object={scene} 
        scale={4.2} 
        position={[0, -1.8, 0]} 
      />

      <ContactShadows
        position={[0, -3.5, 0]}
        opacity={0.4}
        scale={15}
        blur={2.5}
        far={5}
      />
    </group>
  );
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showHiee, setShowHiee] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Speech bubble position
  const bubbleX = useTransform(mouseXSpring, [-0.5, 0.5], ["-20px", "20px"]);
  const bubbleY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);

  useEffect(() => {
    // Artificial load delay to sync with loading screen
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setShowHiee(true);
    }, 1500);
    const hideTimer = setTimeout(() => setShowHiee(false), 6000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  } as const;

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-36 bg-transparent z-30"
    >
      <motion.div style={{ scale: scrollScale, opacity: scrollOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="text-center mb-6 z-20 pointer-events-none">
          <motion.div variants={itemVariants} className="inline-block glass-ultra px-4 py-1 rounded-full border border-neon-lime/30 mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neon-lime">AI and Full Stack Developer</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-medium text-white/80 mb-2 font-mono tracking-widest uppercase">
            <span className="text-neon-lime">{"<"}</span> I'm Sachin <span className="text-neon-lime">{"/>"}</span>
          </motion.h2>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[7rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-accent-sky tracking-tighter leading-none filter drop-shadow-[0_0_20px_rgba(14,165,233,0.3)] whitespace-nowrap">
            AI & Full Stack
          </motion.h1>
        </motion.div>

        <div className="relative w-full flex justify-center items-center mt-8 md:mt-16">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.6 }} className="absolute left-0 md:left-10 top-[20%] hidden md:flex flex-col items-start text-left z-20 pointer-events-none">
            <div className="flex text-accent-sky mb-2 drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]">
              {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">System</h3>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Design</h3>
            <p className="text-[10px] text-neon-lime font-bold tracking-[0.3em] uppercase mt-2">Architecture Expert</p>
          </motion.div>

          {/* 3D R3F Model Section */}
          <div className="relative w-full h-[550px] md:h-[750px] flex items-center justify-center z-10">
            <AnimatePresence>
              {showHiee && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  style={{ x: bubbleX, y: bubbleY }}
                  className="absolute top-0 md:top-20 right-10 md:right-[20%] z-50 glass-ultra px-6 py-3 rounded-[2rem] rounded-bl-none border-2 border-neon-lime shadow-[0_0_30px_rgba(205,255,0,0.5)]"
                >
                  <p className="text-white font-black text-xl md:text-2xl whitespace-nowrap tracking-wider">Hiee !! 👋🏻</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-full h-full cursor-grab active:cursor-grabbing">
              <Canvas shadows={{ type: THREE.PCFShadowMap }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false} 
                  minPolarAngle={Math.PI / 3} 
                  maxPolarAngle={Math.PI / 1.5}
                />
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
                
                <Suspense fallback={null}>
                  <AIAssistant mouseX={mouseXSpring} mouseY={mouseYSpring} />
                </Suspense>
              </Canvas>
            </div>
            
            {/* Primary Action Button */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-30">
              <motion.a 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="group relative px-12 py-4 rounded-full font-black text-white overflow-hidden transition-all duration-500"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-orange to-accent-peach opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,107,53,0.1)_0%,_rgba(255,107,53,0)_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-accent-orange blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                
                <span className="relative z-10 flex items-center gap-3 text-sm uppercase tracking-[0.2em]">
                  Let's Collaborate <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </span>
              </motion.a>
            </div>
          </div>

          {/* Right Floating Text - Machine Learning */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.8 }} className="absolute right-0 md:right-10 top-[20%] hidden md:flex flex-col items-end text-right z-20 pointer-events-none">
            <div className="flex text-neon-lime mb-2 drop-shadow-[0_0_10px_rgba(205,255,0,0.8)]">
              {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Machine</h3>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Learning</h3>
            <p className="text-[10px] text-coral font-bold tracking-[0.3em] uppercase mt-2">Neural Networks</p>
          </motion.div>

          {/* New Right Floating Text - MERN Stack */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 1 }} className="absolute right-0 md:right-16 bottom-[30%] hidden md:flex flex-col items-end text-right z-20 pointer-events-none">
            <div className="flex text-accent-sky mb-2 drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]">
              {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">MERN</h3>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Stack</h3>
            <p className="text-[10px] text-neon-lime font-bold tracking-[0.3em] uppercase mt-2">Full-Stack Dev</p>
          </motion.div>

          {/* New Left Floating Text - Cloud & DevOps */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 1.2 }} className="absolute left-0 md:left-16 bottom-[30%] hidden md:flex flex-col items-start text-left z-20 pointer-events-none">
            <div className="flex text-accent-peach mb-2 drop-shadow-[0_0_10px_rgba(255,127,80,0.8)]">
              {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Cloud</h3>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">DevOps</h3>
            <p className="text-[10px] text-accent-sky font-bold tracking-[0.3em] uppercase mt-2">System Architect</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
