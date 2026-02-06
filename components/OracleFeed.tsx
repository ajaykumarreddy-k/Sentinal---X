import React, { useEffect, useState } from 'react';
import { fetchLiveIntelligence } from '../services/geminiService';
import { IntelItem } from '../types';
import { BrainCircuit, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OracleFeed: React.FC = () => {
  const [feed, setFeed] = useState<IntelItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchLiveIntelligence();
    // Prepend new data, ensure uniqueness by ID, keep last 6
    setFeed(prev => {
       const existingIds = new Set(prev.map(item => item.id));
       const newData = data.filter(item => !existingIds.has(item.id));
       return [...newData, ...prev].slice(0, 6);
    }); 
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full flex-col p-6 overflow-hidden bg-slate-900/20">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-neon-cyan/10 rounded-xl border border-neon-cyan/20">
             <BrainCircuit className="h-5 w-5 text-neon-cyan" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-widest text-white uppercase leading-none">Oracle Feed</h2>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] text-slate-400 font-mono">LIVE INTELLIGENCE STREAM</span>
            </div>
          </div>
        </div>
        <button onClick={loadData} className="p-2 hover:bg-slate-800 rounded-full transition-colors group">
           <RefreshCw className={`h-4 w-4 text-slate-500 group-hover:text-neon-cyan ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-slate-900/0 via-slate-900/0 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-900/50 to-transparent z-10 pointer-events-none" />
        
        <div className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent space-y-4 pb-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {feed.map((item) => (
              <motion.div
                key={item.id} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 p-5 hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300"
              >
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                       <div className="flex items-center gap-2">
                          {/* Reasoning Level Tag */}
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold font-mono border backdrop-blur-sm ${
                             item.type === 'geopolitical' ? 'bg-neon-red/10 border-neon-red/20 text-neon-red' : 
                             item.type === 'weather' ? 'bg-neon-yellow/10 border-neon-yellow/20 text-neon-yellow' :
                             'bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan'
                          }`}>
                            RISK: {item.riskScore}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{item.timestamp}</span>
                       </div>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-200 leading-snug mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                    
                    <div className="flex gap-3 items-start">
                       <div className="mt-1.5 min-w-[2px] h-8 bg-slate-800 rounded-full group-hover:bg-neon-cyan/50 transition-colors" />
                       <p className="text-xs text-slate-400 leading-relaxed font-light">
                         {item.reasoning}
                       </p>
                    </div>
                 </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OracleFeed;