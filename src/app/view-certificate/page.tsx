"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { RotateCcw, RotateCw, X, Download, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

function CertificateViewerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const file = searchParams.get("file");
  const title = searchParams.get("title");
  
  const [rotation, setRotation] = useState(90); // Default 90 as requested

  useEffect(() => {
    if (!file) {
      router.push("/");
    }
  }, [file, router]);

  if (!file) return null;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8 bg-white/5 p-6 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.close()} 
            className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10"
            title="Go Back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{title || "Certificate View"}</h1>
            <p className="text-[10px] text-neon-lime font-bold tracking-[0.4em] uppercase opacity-70">Official Digital Credential</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => setRotation(r => r - 90)} className="p-3 bg-white/5 hover:bg-neon-lime hover:text-black rounded-full transition-all border border-white/10" title="Rotate Left">
            <RotateCcw size={20} />
          </button>
          <button onClick={() => setRotation(r => r + 90)} className="p-3 bg-white/5 hover:bg-neon-lime hover:text-black rounded-full transition-all border border-white/10" title="Rotate Right">
            <RotateCw size={20} />
          </button>
          <a href={file} download className="p-3 bg-white/5 hover:bg-coral hover:text-black rounded-full transition-all border border-white/10 ml-2" title="Download">
            <Download size={20} />
          </a>
        </div>
      </div>

      {/* Viewer Area */}
      <div className="flex-grow w-full flex items-center justify-center relative bg-white/5 rounded-[2.5rem] border border-white/10 p-6 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div 
            animate={{ 
              rotate: rotation,
              // When rotated 90 or 270, the "visual" width is the "style" height and vice versa
              // To fit a landscape doc into a vertical space, we must ensure its longest side (width) 
              // doesn't exceed the viewport height when rotated.
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="shadow-2xl rounded-xl overflow-hidden bg-white"
            style={{ 
              height: rotation % 180 === 0 ? "min(70vh, 600px)" : "min(85vw, 800px)",
              width: rotation % 180 === 0 ? "min(90vw, 850px)" : "min(60vh, 600px)",
              aspectRatio: "1.414 / 1",
            }}
          >
            <iframe 
              src={`${file}#toolbar=0&navpanes=0&scrollbar=0`} 
              className="w-full h-full border-none"
              style={{ pointerEvents: 'auto' }}
              title="Certificate Viewer"
            />
          </motion.div>
        </div>
        
        {/* Instruction overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white/40 pointer-events-none">
          Full Document View • Scaled for Clarity
        </div>
      </div>
    </div>
  );
}

export default function CertificateViewer() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-neon-lime font-black tracking-widest uppercase">Initializing Secure Viewer...</div>}>
      <CertificateViewerContent />
    </Suspense>
  );
}
