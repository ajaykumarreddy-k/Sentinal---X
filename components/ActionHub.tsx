import React, { useState } from 'react';
import { Mail, Navigation, FileText, ArrowRight, Zap, X, Download, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   generateMitigationProtocols,
   generateRouteOptimization,
   generateExecutiveSummary,
   ActionResult
} from '../services/geminiService';

interface ActionModalProps {
   isOpen: boolean;
   onClose: () => void;
   result: ActionResult | null;
   isLoading: boolean;
   actionType: string;
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, onClose, result, isLoading, actionType }) => {
   const [copied, setCopied] = useState(false);

   const handleCopy = () => {
      if (result?.content) {
         navigator.clipboard.writeText(result.content);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      }
   };

   const handleDownload = () => {
      if (result?.content) {
         const blob = new Blob([result.content], { type: 'text/plain' });
         const url = URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.href = url;
         a.download = `${result.title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
         URL.revokeObjectURL(url);
      }
   };

   const getAccentColor = () => {
      switch (actionType) {
         case 'mitigation': return 'neon-cyan';
         case 'route': return 'neon-yellow';
         case 'summary': return 'neon-red';
         default: return 'neon-cyan';
      }
   };

   if (!isOpen) return null;

   return (
      <AnimatePresence>
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
         >
            <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               transition={{ duration: 0.3 }}
               className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl"
               onClick={(e) => e.stopPropagation()}
            >
               {/* Header */}
               <div className={`flex items-center justify-between p-4 border-b border-slate-700 bg-${getAccentColor()}/5`}>
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-lg bg-${getAccentColor()}/20 border border-${getAccentColor()}/30`}>
                        {actionType === 'mitigation' && <Mail className={`h-5 w-5 text-${getAccentColor()}`} />}
                        {actionType === 'route' && <Navigation className={`h-5 w-5 text-${getAccentColor()}`} />}
                        {actionType === 'summary' && <FileText className={`h-5 w-5 text-${getAccentColor()}`} />}
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-white">{result?.title || 'Processing...'}</h3>
                        {result?.timestamp && (
                           <p className="text-xs text-slate-400 font-mono">
                              Generated: {new Date(result.timestamp).toLocaleString()}
                           </p>
                        )}
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     {result && !isLoading && (
                        <>
                           <button
                              onClick={handleCopy}
                              className="p-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                              title="Copy to clipboard"
                           >
                              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                           </button>
                           <button
                              onClick={handleDownload}
                              className="p-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                              title="Download as file"
                           >
                              <Download className="h-4 w-4" />
                           </button>
                        </>
                     )}
                     <button
                        onClick={onClose}
                        className="p-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                     >
                        <X className="h-4 w-4" />
                     </button>
                  </div>
               </div>

               {/* Content */}
               <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)] scrollbar-thin">
                  {isLoading ? (
                     <div className="flex flex-col items-center justify-center py-20">
                        <div className={`w-12 h-12 border-4 border-${getAccentColor()}/20 border-t-${getAccentColor()} rounded-full animate-spin mb-4`}></div>
                        <p className="text-slate-400 font-mono text-sm">PROCESSING REQUEST...</p>
                        <p className="text-slate-500 text-xs mt-2">Gemini AI is generating your report</p>
                     </div>
                  ) : result ? (
                     <div className={`font-mono text-sm leading-relaxed ${result.success ? 'text-slate-300' : 'text-red-400'}`}>
                        <pre className="whitespace-pre-wrap break-words">{result.content}</pre>
                     </div>
                  ) : null}
               </div>
            </motion.div>
         </motion.div>
      </AnimatePresence>
   );
};

const ActionHub: React.FC = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [result, setResult] = useState<ActionResult | null>(null);
   const [actionType, setActionType] = useState<string>('');

   const handleMitigation = async () => {
      setActionType('mitigation');
      setIsModalOpen(true);
      setIsLoading(true);
      setResult(null);

      const res = await generateMitigationProtocols();
      setResult(res);
      setIsLoading(false);
   };

   const handleRouteOptimization = async () => {
      setActionType('route');
      setIsModalOpen(true);
      setIsLoading(true);
      setResult(null);

      const res = await generateRouteOptimization();
      setResult(res);
      setIsLoading(false);
   };

   const handleExecutiveSummary = async () => {
      setActionType('summary');
      setIsModalOpen(true);
      setIsLoading(true);
      setResult(null);

      const res = await generateExecutiveSummary();
      setResult(res);
      setIsLoading(false);
   };

   const closeModal = () => {
      setIsModalOpen(false);
      setResult(null);
   };

   return (
      <>
         <div className="flex h-full flex-col p-6 justify-center bg-slate-900/30">
            <div className="flex items-center gap-2 mb-4">
               <Zap className="h-4 w-4 text-neon-cyan" />
               <h2 className="text-sm font-bold tracking-widest text-white uppercase">Action Hub</h2>
               <span className="text-xs text-slate-500 font-mono ml-2">POWERED BY GEMINI AI</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">

               {/* Button 1: Draft Mitigation */}
               <button
                  onClick={handleMitigation}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/40 p-5 transition-all duration-300 hover:border-neon-cyan hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:-translate-y-1"
               >
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
               <button
                  onClick={handleRouteOptimization}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/40 p-5 transition-all duration-300 hover:border-neon-yellow hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(250,255,0,0.15)] hover:-translate-y-1"
               >
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
               <button
                  onClick={handleExecutiveSummary}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/40 p-5 transition-all duration-300 hover:border-neon-red hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(255,0,60,0.15)] hover:-translate-y-1"
               >
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

         <ActionModal
            isOpen={isModalOpen}
            onClose={closeModal}
            result={result}
            isLoading={isLoading}
            actionType={actionType}
         />
      </>
   );
};

export default ActionHub;