import React from 'react';
import { Mail, Navigation, FileText, ArrowRight, Zap } from 'lucide-react';

const ActionHub: React.FC = () => {
  return (
    <div className="flex h-full flex-col p-6 justify-center bg-slate-900/30">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-4 w-4 text-neon-cyan" />
        <h2 className="text-sm font-bold tracking-widest text-white uppercase">Action Hub</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        
        {/* Button 1: Draft Mitigation */}
        <button className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/40 p-5 transition-all duration-300 hover:border-neon-cyan hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:-translate-y-1">
           <div className="absolute right-0 top-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="h-5 w-5 text-neon-cyan -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
           </div>
           <div className="mb-3 p-2 w-fit rounded-lg bg-neon-cyan/10 border border-neon-cyan/20">
              <Mail className="h-6 w-6 text-neon-cyan" />
           </div>
           <div className="text-left">
              <div className="text-sm font-bold text-white tracking-wide">DRAFT MITIGATION</div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">GENERATE PROTOCOLS</div>
           </div>
        </button>

        {/* Button 2: Reroute GPS */}
        <button className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/40 p-5 transition-all duration-300 hover:border-neon-yellow hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(250,255,0,0.15)] hover:-translate-y-1">
           <div className="absolute right-0 top-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="h-5 w-5 text-neon-yellow -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
           </div>
           <div className="mb-3 p-2 w-fit rounded-lg bg-neon-yellow/10 border border-neon-yellow/20">
              <Navigation className="h-6 w-6 text-neon-yellow" />
           </div>
           <div className="text-left">
              <div className="text-sm font-bold text-white tracking-wide">REROUTE GPS</div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">OPTIMIZE PATHWAYS</div>
           </div>
        </button>

        {/* Button 3: Executive Summary */}
        <button className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/40 p-5 transition-all duration-300 hover:border-neon-red hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(255,0,60,0.15)] hover:-translate-y-1">
           <div className="absolute right-0 top-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="h-5 w-5 text-neon-red -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
           </div>
           <div className="mb-3 p-2 w-fit rounded-lg bg-neon-red/10 border border-neon-red/20">
              <FileText className="h-6 w-6 text-neon-red" />
           </div>
           <div className="text-left">
              <div className="text-sm font-bold text-white tracking-wide">EXECUTIVE SUMMARY</div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">COMPILE PDF REPORT</div>
           </div>
        </button>

      </div>
    </div>
  );
};

export default ActionHub;