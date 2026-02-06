import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SpotlightCard } from './components/SpotlightCard';
import GlobalMap from './components/GlobalMap';
import OracleFeed from './components/OracleFeed';
import VisionLab from './components/VisionLab';
import ActionHub from './components/ActionHub';
import ThoughtTicker from './components/ThoughtTicker';
import PixelBlast from './components/PixelBlast';
import KeyGate from './components/KeyGate';
import { Key, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = localStorage.getItem('ORACLE_KEY');
    const keyRegex = /^AIza/;
    if (key && keyRegex.test(key)) {
      setIsKeyValid(true);
    }
  }, []);

  useEffect(() => {
    if (!isKeyValid) return;

    // Master GSAP Timeline for Entrance
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from('.header-item', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      })
        .from('.bento-card', {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'all' // Ensure interactive styles (hover) work after animation
        }, "-=0.5");

    }, gridRef);

    return () => ctx.revert();
  }, [isKeyValid]);

  const handleChangeKey = () => {
    setShowKeyModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('ORACLE_KEY');
    setIsKeyValid(false);
    setShowKeyModal(false);
  };

  const handleKeyValid = (valid: boolean) => {
    setIsKeyValid(valid);
    setShowKeyModal(false);
  };

  // Show KeyGate if not valid or if user wants to change key
  if (!isKeyValid || showKeyModal) {
    return <KeyGate onKeyValid={handleKeyValid} onCancel={showKeyModal ? () => setShowKeyModal(false) : undefined} />;
  }

  return (
    <div className="min-h-screen w-full bg-obsidian text-slate-200 p-4 md:p-8 lg:p-12 font-sans overflow-x-hidden selection:bg-neon-cyan/20 relative">

      {/* Interactive Pixel Blast Background */}
      <PixelBlast />

      <div ref={gridRef} className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 flex items-end justify-between px-2">
          <div className="header-item">
            <h1 className="text-4xl font-bold tracking-tighter text-white flex items-center gap-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan shadow-[0_0_20px_#00F0FF]"></span>
              </span>
              SENTINEL<span className="text-neon-cyan">-X</span>
            </h1>
            <p className="text-sm text-slate-500 font-mono mt-2 ml-7 tracking-widest uppercase">Autonomous Supply Chain Oracle</p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2 header-item">
            <div className="flex items-center gap-2 text-xs font-mono text-neon-cyan bg-neon-cyan/5 px-3 py-1.5 rounded-full border border-neon-cyan/20 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
              GEMINI-3 PRO: ONLINE
            </div>
            {/* API Key Management Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleChangeKey}
                className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-neon-cyan px-3 py-1.5 rounded-full border border-slate-700 hover:border-neon-cyan/40 transition-all duration-300"
              >
                <Key className="w-3 h-3" />
                Change Key
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-neon-red px-3 py-1.5 rounded-full border border-slate-700 hover:border-neon-red/40 transition-all duration-300"
              >
                <LogOut className="w-3 h-3" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:auto-rows-[minmax(280px,auto)]">

          {/* Row 1: Vision Lab [2x2] & Oracle [1x2] */}
          <SpotlightCard className="bento-card col-span-1 md:col-span-2 row-span-2 min-h-[500px] lg:min-h-0">
            <VisionLab />
          </SpotlightCard>

          <SpotlightCard className="bento-card col-span-1 row-span-2 min-h-[500px] lg:min-h-0 border-slate-800/60">
            <OracleFeed />
          </SpotlightCard>

          {/* Row 2: Global Map [2x1] & Thought Ticker [1x1] */}
          <SpotlightCard className="bento-card col-span-1 md:col-span-2 row-span-1 min-h-[300px]">
            <GlobalMap />
          </SpotlightCard>

          <SpotlightCard className="bento-card col-span-1 row-span-1 min-h-[300px]">
            <ThoughtTicker />
          </SpotlightCard>

          {/* Row 3: Action Hub [3x1] */}
          <SpotlightCard className="bento-card col-span-1 md:col-span-2 lg:col-span-3 row-span-1 min-h-[200px]">
            <ActionHub />
          </SpotlightCard>

        </div>

        {/* Footer */}
        <div className="mt-12 flex justify-between items-center text-[10px] text-slate-600 font-mono border-t border-slate-800/50 pt-6">
          <span>ENCRYPTED CONNECTION: TLS 1.3</span>
          <span>POWERED BY GOOGLE GEMINI</span>
        </div>
      </div>
    </div>
  );
};

export default App;