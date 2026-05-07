"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal, ShieldCheck, Cpu, Zap, Activity } from "lucide-react";

export const LoadingScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const logMessages = [
    "INITIALIZING KERNEL_v4.2.0...",
    "SYNCING NEURAL_DATA_STREAM...",
    "ESTABLISHING SECURE_GATEWAY...",
    "LOADING MERN_ARCHITECT...",
    "DEPLOYING SVM_PREDICTION_ENGINE...",
    "OPTIMIZING GLASSMOPHISM_FX...",
    "AUTHENTICATING ENTITY_SACHIN...",
  ];

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setIsComplete(true);
        clearInterval(interval);
      }
      setProgress(currentProgress);
      
      // Add logs based on progress
      const logIdx = Math.floor((currentProgress / 100) * logMessages.length);
      if (logMessages[logIdx] && !logs.includes(`[OK] ${logMessages[logIdx]}`)) {
        setLogs(prev => [...prev.slice(-4), `[OK] ${logMessages[logIdx]}`]);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
        {/* User's Custom SVG Loader */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 relative flex items-center justify-center scale-125"
        >
          <div className="flex items-center gap-2">
            <svg height={0} width={0} viewBox="0 0 64 64" className="absolute pointer-events-none">
              <defs xmlns="http://www.w3.org/2000/svg">
                <linearGradient gradientUnits="userSpaceOnUse" y2={2} x2={0} y1={62} x1={0} id="grad-b">
                  <stop stopColor="#FF6B35" />
                  <stop stopColor="#F7C59F" offset={1} />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" y2={0} x2={0} y1={64} x1={0} id="grad-c">
                  <stop stopColor="#0EA5E9" />
                  <stop stopColor="#FF6B35" offset={1} />
                  <animateTransform repeatCount="indefinite" keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1" keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1" dur="8s" values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32" type="rotate" attributeName="gradientTransform" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" y2={2} x2={0} y1={62} x1={0} id="grad-d">
                  <stop stopColor="#0EA5E9" />
                  <stop stopColor="#38BDF8" offset={1} />
                </linearGradient>
              </defs>
            </svg>
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64} className="inline-block">
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={8} stroke="url(#grad-b)" d="M 54.722656,3.9726563 A 2.0002,2.0002 0 0 0 54.941406,4 h 5.007813 C 58.955121,17.046124 49.099667,27.677057 36.121094,29.580078 a 2.0002,2.0002 0 0 0 -1.708985,1.978516 V 60 H 29.587891 V 31.558594 A 2.0002,2.0002 0 0 0 27.878906,29.580078 C 14.900333,27.677057 5.0448787,17.046124 4.0507812,4 H 9.28125 c 1.231666,11.63657 10.984383,20.554048 22.6875,20.734375 a 2.0002,2.0002 0 0 0 0.02344,0 c 11.806958,0.04283 21.70649,-9.003371 22.730469,-20.7617187 z" className="loader-dash" pathLength={360} />
            </svg>
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64} className="inline-block">
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={10} stroke="url(#grad-c)" d="M 32 32 m 0 -27 a 27 27 0 1 1 0 54 a 27 27 0 1 1 0 -54" className="loader-spin" pathLength={360} />
            </svg>
            
            <div className="w-2" />
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64} className="inline-block">
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={8} stroke="url(#grad-d)" d="M 4,4 h 4.6230469 v 25.919922 c -0.00276,11.916203 9.8364941,21.550422 21.7500001,21.296875 11.616666,-0.240651 21.014356,-9.63894 21.253906,-21.25586 a 2.0002,2.0002 0 0 0 0,-0.04102 V 4 H 56.25 v 25.919922 c 0,14.33873 -11.581192,25.919922 -25.919922,25.919922 a 2.0002,2.0002 0 0 0 -0.0293,0 C 15.812309,56.052941 3.998433,44.409961 4,29.919922 Z" className="loader-dash" pathLength={360} />
            </svg>
          </div>
        </motion.div>

        {/* Gamified Progress Container */}
        <div className="w-full glass-ultra p-6 rounded-2xl border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/40 font-mono text-[10px] tracking-widest uppercase">System_Boot_Sequence</span>
            <span className="text-accent-orange font-mono text-xs font-bold">{Math.round(progress)}%</span>
          </div>

          {/* Progress Bar */}
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-accent-orange to-accent-sky shadow-[0_0_10px_rgba(255,107,53,0.8)]"
            />
          </div>

          {/* Scrolling Logs */}
          <div className="space-y-1 h-20 overflow-hidden">
            <AnimatePresence mode="popLayout">
              {logs.map((log, i) => (
                <motion.div
                  key={`${log}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-[10px] font-mono text-white/40 flex items-center gap-2"
                >
                  <Zap size={8} className="text-accent-orange" />
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Enter Button (Gamified Interaction) */}
        <div className="mt-12 h-16 flex items-center justify-center">
          <AnimatePresence>
            {isComplete && (
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onFinish}
                className="px-10 py-4 bg-accent-orange text-black font-black uppercase tracking-[0.3em] text-xs rounded-full shadow-[0_0_30px_rgba(255,107,53,0.8)] hover:bg-white transition-colors flex items-center gap-3"
              >
                Launch System <Activity size={14} />
              </motion.button>
            )}
          </AnimatePresence>
          
          {!isComplete && (
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/20 font-mono text-[10px] tracking-[0.5em] uppercase"
            >
              Analyzing_Protocols...
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-8 left-8 flex items-center gap-4 text-white/20">
        <Terminal size={14} />
        <span className="font-mono text-[8px] uppercase tracking-widest">Node_v20.x | React_v18.x</span>
      </div>
      <div className="absolute bottom-8 right-8 flex items-center gap-4 text-white/20">
        <span className="font-mono text-[8px] uppercase tracking-widest">Secure_Connection</span>
        <ShieldCheck size={14} />
      </div>
    </motion.div>
  );
};
