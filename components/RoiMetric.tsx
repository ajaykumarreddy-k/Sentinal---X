import React, { useEffect, useRef } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';
import { gsap } from 'gsap';

const RoiMetric: React.FC = () => {
  const countRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter Animation
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 12.4,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.innerText = obj.val.toFixed(1);
          }
        }
      });

      // Subtle scaling of the graph/icon
      gsap.from(".trend-icon", {
        scale: 0,
        rotation: -45,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.7)"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-full flex flex-col justify-between p-6 bg-gradient-to-br from-green-500/5 to-transparent">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-400 tracking-wide uppercase">Mitigation Value</h2>
          <p className="text-[10px] text-slate-500 font-mono mt-1">REAL-TIME ROI</p>
        </div>
        <div className="p-2 bg-green-500/10 rounded-full trend-icon">
           <TrendingUp className="h-5 w-5 text-green-500" />
        </div>
      </div>

      <div className="flex items-baseline gap-1 mt-4">
         <span className="text-2xl font-light text-green-500">$</span>
         <span ref={countRef} className="text-5xl font-bold text-white tracking-tighter">0.0</span>
         <span className="text-2xl font-medium text-slate-400">M</span>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
           <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[75%] rounded-full shadow-[0_0_10px_#22c55e]"></div>
           </div>
           <span className="text-xs font-mono text-green-400">+18%</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">
          Projected savings from rerouting away from Suez chokepoint.
        </p>
      </div>
    </div>
  );
};

export default RoiMetric;