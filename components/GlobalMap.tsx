import React from 'react';
import { Globe, Radio } from 'lucide-react';

const GlobalMap: React.FC = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#020617]">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20">
         <svg width="100%" height="100%">
            <pattern id="grid-map" width="60" height="60" patternUnits="userSpaceOnUse">
               <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-map)" />
         </svg>
      </div>

      {/* Abstract World Map SVG */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 z-0">
        <svg viewBox="0 0 1000 450" className="w-full h-full fill-slate-800/80 stroke-slate-700/50 stroke-1 drop-shadow-2xl">
           <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
              </feMerge>
          </filter>
          {/* Americas */}
          <path d="M150,80 L250,80 L280,150 L260,250 L280,380 L200,400 L180,280 L120,200 L100,100 Z" className="hover:fill-slate-700 transition-colors duration-500" />
          {/* Eurasia/Africa */}
          <path d="M400,100 L550,80 L800,80 L900,150 L850,250 L900,350 L750,380 L650,280 L550,300 L450,250 L420,150 Z" className="hover:fill-slate-700 transition-colors duration-500" />
          {/* Australia */}
          <path d="M780,300 L880,300 L880,380 L780,380 Z" className="hover:fill-slate-700 transition-colors duration-500" />
        </svg>
      </div>

      {/* Header UI */}
      <div className="absolute top-6 left-6 z-20">
         <div className="flex items-center gap-2 mb-1">
            <Globe className="h-4 w-4 text-neon-cyan" />
            <h2 className="text-sm font-bold tracking-widest text-white uppercase">Global Risk Map</h2>
         </div>
         <div className="text-[10px] text-slate-500 font-mono">NODES: 4 ACTIVE</div>
      </div>

      <div className="absolute top-6 right-6 z-20 flex flex-col items-end">
         <div className="flex items-center gap-2 text-[10px] font-mono text-neon-red bg-neon-red/10 px-2 py-1 rounded border border-neon-red/20 animate-pulse">
            <Radio className="h-3 w-3" />
            <span>CRITICAL ALERT</span>
         </div>
      </div>

      {/* Hotspots Container */}
      <div className="absolute inset-0 z-10">
          {/* SUEZ CANAL */}
          <div className="absolute top-[38%] left-[53%] group">
              <div className="absolute -inset-8 bg-neon-red/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -inset-2 border border-neon-red/40 rounded-full animate-ping opacity-30" />
              <div className="relative h-3 w-3 bg-neon-red rounded-full ring-4 ring-slate-900 group-hover:scale-125 transition-transform duration-300 cursor-pointer shadow-[0_0_20px_#ef4444]" />
              
              {/* Info Card */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none z-50">
                 <div className="bg-slate-900/95 backdrop-blur-xl border border-neon-red/30 px-4 py-2 rounded-lg text-center min-w-[140px] shadow-2xl">
                    <div className="text-[10px] font-bold text-neon-red tracking-wider uppercase mb-1">Suez Canal</div>
                    <div className="text-[9px] text-slate-300 font-mono">VESSEL COUNT: 412 (+12%)</div>
                 </div>
              </div>
          </div>
          
           {/* PANAMA CANAL */}
           <div className="absolute top-[45%] left-[23%] group">
              <div className="absolute -inset-6 bg-neon-cyan/10 rounded-full blur-lg" />
              <div className="relative h-2 w-2 bg-neon-cyan rounded-full ring-4 ring-slate-900 group-hover:scale-150 transition-transform cursor-pointer shadow-[0_0_15px_#22d3ee]" />
          </div>

          {/* SINGAPORE STRAIT */}
           <div className="absolute top-[55%] left-[78%] group">
              <div className="absolute -inset-6 bg-neon-cyan/10 rounded-full blur-lg" />
              <div className="relative h-2 w-2 bg-neon-cyan rounded-full ring-4 ring-slate-900 group-hover:scale-150 transition-transform cursor-pointer shadow-[0_0_15px_#22d3ee]" />
          </div>

          {/* Connection Lines (Data Flow) */}
          <svg className="absolute inset-0 pointer-events-none stroke-neon-cyan/30 stroke-[1px]" style={{strokeDasharray: "4 4"}}>
             <path d="M 230 210 Q 400 350 530 171" fill="none" className="opacity-40" />
             <path d="M 530 171 Q 650 250 780 247" fill="none" className="opacity-40" />
          </svg>
      </div>
    </div>
  );
};

export default GlobalMap;