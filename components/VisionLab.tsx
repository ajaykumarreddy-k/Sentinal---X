import React, { useRef, useState, useEffect } from 'react';
import { Upload, CheckCircle2, Scan, BoxSelect, X } from 'lucide-react';
import { gsap } from 'gsap';
import { analyzeUploadedImage } from '../services/geminiService';
import { SimulationStatus } from '../types';

const VisionLab: React.FC = () => {
  const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use GSAP Context for scope-based cleanup
  useEffect(() => {
    const ctx = gsap.context(() => {}, containerRef);
    return () => ctx.revert();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        processFile(file, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const processFile = async (file: File, base64Full: string) => {
    setStatus(SimulationStatus.SCANNING);
    setAnalysis(null);
    const base64Data = base64Full.split(',')[1];

    // Using context to safely animate
    const ctx = gsap.context(() => {
      if (scanLineRef.current) {
        gsap.killTweensOf(scanLineRef.current);
        
        const tl = gsap.timeline({
          onComplete: async () => {
               setStatus(SimulationStatus.PROCESSING);
               const result = await analyzeUploadedImage(base64Data);
               setAnalysis(result);
               setStatus(SimulationStatus.COMPLETE);
               
               if (scanLineRef.current) {
                  gsap.to(scanLineRef.current, { opacity: 0, duration: 0.3 });
               }
          }
        });
        
        // Use standard hex #00F0FF for neon cyan consistency
        tl.fromTo(scanLineRef.current, 
          { top: '0%', opacity: 1, scaleX: 1.2, boxShadow: 'none' }, 
          { 
            top: '100%', 
            duration: 1.5, 
            ease: 'power2.inOut', 
            repeat: 1, 
            yoyo: true,
            boxShadow: '0 0 40px 4px #00F0FF' 
          }
        );
      }
    }, containerRef);

    // Fallback if ref missing (though unlikely in this context)
    if (!scanLineRef.current) {
         const result = await analyzeUploadedImage(base64Data);
         setAnalysis(result);
         setStatus(SimulationStatus.COMPLETE);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        processFile(file, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreview(null);
    setStatus(SimulationStatus.IDLE);
    setAnalysis(null);
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex h-full w-full flex-col overflow-hidden p-0 group"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onClick={() => status === SimulationStatus.IDLE && fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Header Overlay */}
      <div className="absolute left-6 top-6 z-30 flex items-center gap-3 pointer-events-none">
        <div className="bg-neon-cyan/10 p-1.5 rounded-md border border-neon-cyan/20 backdrop-blur-md">
           <Scan className="h-5 w-5 text-neon-cyan" />
        </div>
        <div>
           <h2 className="text-sm font-bold tracking-widest text-white uppercase">Vision Lab</h2>
           <p className="text-[10px] text-slate-400 font-mono">MULTIMODAL SENSOR ARRAY</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative h-full w-full bg-slate-950/20 flex flex-col items-center justify-center">
        
        {/* Idle State */}
        {!imagePreview && (
           <div className="text-center cursor-pointer p-12 border border-dashed border-slate-700/50 rounded-3xl hover:border-neon-cyan/50 hover:bg-slate-900/40 transition-all duration-500 group">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 border border-slate-800 shadow-[0_0_50px_rgba(34,211,238,0.1)] group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-8 w-8 text-neon-cyan" />
              </div>
              <p className="text-xl font-medium text-slate-200 tracking-tight">Drop Manifest / Satellite Data</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                 <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-mono">JPG</span>
                 <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-mono">PNG</span>
                 <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-mono">TIFF</span>
              </div>
           </div>
        )}

        {/* Image Preview & Scan Layer */}
        {imagePreview && (
          <div className="relative h-full w-full">
            <img 
              src={imagePreview} 
              alt="Analysis Target" 
              className="h-full w-full object-cover opacity-60 mix-blend-overlay"
            />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-slate-950/40" />
            
            {/* Grid Overlay Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(34, 211, 238, .3) 25%, rgba(34, 211, 238, .3) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, .3) 75%, rgba(34, 211, 238, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(34, 211, 238, .3) 25%, rgba(34, 211, 238, .3) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, .3) 75%, rgba(34, 211, 238, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>

            {/* High-Fidelity Scanning Beam */}
            <div 
              ref={scanLineRef} 
              className="absolute left-0 right-0 h-[3px] bg-neon-cyan shadow-[0_0_30px_6px_rgba(34,211,238,0.5)] z-20 opacity-0 mix-blend-screen" 
            >
               <div className="absolute right-4 -top-6 bg-neon-cyan text-slate-950 text-[10px] font-bold px-2 py-0.5 font-mono">SCANNING_OBJECT...</div>
            </div>

            {/* Simulated AI Bounding Boxes */}
            {(status === SimulationStatus.PROCESSING || status === SimulationStatus.COMPLETE) && (
              <>
                <div className="absolute top-[30%] left-[20%] w-[25%] h-[25%] border-2 border-neon-cyan shadow-[0_0_20px_rgba(34,211,238,0.2)] animate-pulse bg-neon-cyan/5">
                   {/* Tech Corners */}
                   <div className="absolute -top-1 -left-1 w-2 h-2 bg-neon-cyan"></div>
                   <div className="absolute -top-1 -right-1 w-2 h-2 bg-neon-cyan"></div>
                   <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-neon-cyan"></div>
                   <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-neon-cyan"></div>
                   
                   <div className="absolute -top-8 left-0 flex items-center gap-2">
                      <div className="bg-neon-cyan text-slate-950 text-[10px] font-bold font-mono px-2 py-1">VESSEL_ID_742</div>
                   </div>
                </div>
              </>
            )}

            {/* Results Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
               {status === SimulationStatus.PROCESSING && (
                 <div className="flex items-center gap-3 text-neon-cyan animate-pulse bg-slate-950/60 backdrop-blur-md p-3 rounded-lg border border-neon-cyan/20 w-fit">
                   <BoxSelect className="h-5 w-5" />
                   <span className="font-mono text-xs tracking-wider uppercase">Processing Neural Vectors...</span>
                 </div>
               )}
               
               {status === SimulationStatus.COMPLETE && (
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center gap-2 text-green-400">
                         <CheckCircle2 className="h-5 w-5" />
                         <span className="font-mono text-sm font-bold tracking-wider">ANALYSIS COMPLETE</span>
                       </div>
                       <button onClick={reset} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                         <X className="h-5 w-5" />
                       </button>
                    </div>
                    <div className="flex gap-4">
                      <div className="hidden md:block h-auto w-1 bg-gradient-to-b from-neon-cyan to-transparent rounded-full"></div>
                      <p className="text-sm text-slate-300 leading-relaxed font-mono">
                        {analysis}
                      </p>
                    </div>
                 </div>
               )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisionLab;