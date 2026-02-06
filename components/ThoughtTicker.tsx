import React, { useEffect, useState, useRef } from 'react';
import { Terminal, Cpu, PauseCircle, PlayCircle } from 'lucide-react';

const LOGS = [
  "INITIALIZING GEMINI-3 PRO ORACLE...",
  "ESTABLISHING SECURE HANDSHAKE [SAT-LINK-04]...",
  "INGESTING MULTIMODAL SENSOR DATA...",
  "ANALYZING SUEZ_CANAL_FLOW_RATE...",
  "DETECTING ANOMALY: VESSEL_QUEUE_DENSITY > 85%...",
  "CALCULATING SUPPLY CHAIN RISK VECTORS...",
  "OPTIMIZING REROUTE PATHWAYS [ARCTIC_ROUTE_B]...",
  "GENERATING EXECUTIVE SUMMARY...",
  "SYSTEM OPTIMAL. WAITING FOR INPUT..."
];

const ThoughtTicker: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true); // Track if user is at the bottom
  const currentIndexRef = useRef(0);  // Track log index across renders

  // Handle scroll events to detect if user has scrolled up
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    // Increased tolerance to 60px to account for smooth scroll variances and rapid updates
    const atBottom = scrollHeight - scrollTop - clientHeight <= 60;
    isAtBottomRef.current = atBottom;
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setLines(prev => {
        // Append new log
        let nextLine = '';
        if (currentIndexRef.current < LOGS.length) {
            nextLine = LOGS[currentIndexRef.current];
            currentIndexRef.current++;
        } else {
            // Loop with random system noise
            if (Math.random() > 0.3) {
                 const sysLogs = [
                    `PING_LATENCY: ${Math.floor(Math.random() * 40 + 10)}ms`,
                    `MEMORY_HEAP: ${Math.floor(Math.random() * 20 + 40)}%`,
                    "RE-INDEXING VECTOR DB...",
                    "GARBAGE_COLLECTION_CYCLE_COMPLETE"
                ];
                nextLine = sysLogs[Math.floor(Math.random() * sysLogs.length)];
            } else {
                // Restart main sequence occasionally
                currentIndexRef.current = 0;
                nextLine = "--- SYSTEM SYNC ---";
            }
        }
        
        // Keep buffer limited to 50 lines to prevent DOM bloat
        const newLines = [...prev, nextLine];
        if (newLines.length > 50) return newLines.slice(newLines.length - 50);
        return newLines;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Auto-scroll effect
  useEffect(() => {
    // Only scroll if we are locked to bottom
    if (isAtBottomRef.current && containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [lines]);

  return (
    <div 
      className="flex h-full flex-col p-6 bg-slate-900/30 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-neon-cyan" />
          <h2 className="text-sm font-bold tracking-widest text-white uppercase">System Logs</h2>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isPaused ? <PauseCircle className="h-4 w-4 text-neon-red animate-pulse" /> : <PlayCircle className="h-4 w-4 text-neon-cyan" />}
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden relative font-mono text-[10px] md:text-xs leading-relaxed">
         <div 
            ref={containerRef}
            onScroll={handleScroll}
            className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700/50 hover:scrollbar-thumb-neon-cyan/50 pr-2 space-y-1"
         >
            {lines.map((line, i) => (
              <div key={i} className="text-slate-400 break-words">
                <span className="text-neon-cyan/50 mr-2 select-none">{`>`}</span>
                <span className={i === lines.length - 1 ? "text-neon-cyan animate-pulse" : "text-slate-300"}>
                  {line}
                </span>
              </div>
            ))}
         </div>
      </div>

      <div className="mt-2 pt-2 border-t border-white/5 flex justify-between items-center text-[9px] text-slate-500 font-mono select-none">
         <span>CPU: 12%</span>
         <span className="flex items-center gap-1">
           <Cpu className="h-3 w-3" />
           THREAD: {isPaused ? 'PAUSED' : 'ACTIVE'}
         </span>
      </div>
    </div>
  );
};

export default ThoughtTicker;