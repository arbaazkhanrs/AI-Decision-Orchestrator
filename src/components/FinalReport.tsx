import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ShieldCheck, ListChecks, ThumbsUp, ThumbsDown, ArrowRightLeft } from 'lucide-react';

interface FinalReportProps {
  report: any;
  analysis: any;
  evaluation: any;
}

export default function FinalReport({ report, analysis, evaluation }: FinalReportProps) {
  // Use properties from the concrete models
  const recommendedOption = report?.recommendedOption || 'Strategic Recommendation';
  const confidence = report?.confidence || 0;
  const reasoning = report?.reasoning || report?.executiveSummary || 'Execution plan finalized.';
  
  const goal = analysis?.goal || 'Project Objective';
  const constraints = analysis?.constraints || [];
  
  const evaluationsList = evaluation?.evaluations || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-12 pb-20"
    >
      {/* Hero Recommendation */}
      <section className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Trophy className="w-48 h-48 text-blue-600" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-blue-600 mb-4">
            <ShieldCheck className="w-6 h-6" />
            <span className="font-bold uppercase tracking-widest text-xs">Final Recommendation</span>
          </div>
          
          <h3 className="text-5xl font-extrabold text-gray-900 mb-8 leading-tight font-sans tracking-tight">
            {recommendedOption}
          </h3>
          
          <div className="flex items-center gap-6 mb-10">
            <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(0, Math.min(100, Number(confidence) || 0))}%` }}
                className="h-full bg-blue-600 rounded-full"
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <span className="font-mono text-lg font-black text-blue-600 whitespace-nowrap">{confidence}% Confidence</span>
          </div>
  
          <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100/50 backdrop-blur-sm">
            <p className="text-xl text-gray-700 leading-relaxed font-medium italic">
              "{reasoning}"
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Analysis Summary */}
        <section className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gray-50 rounded-lg">
              <ListChecks className="w-5 h-5 text-gray-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 font-sans">Analysis Summary</h2>
          </div>
          
          <div className="space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-3">Primary Goal</p>
              <p className="text-gray-800 font-semibold text-lg leading-snug">{goal}</p>
            </div>
            {constraints.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-4">Active Constraints</p>
                <div className="flex flex-wrap gap-2">
                  {constraints.map((c: any, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-100">
                      {String(c)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Trade-off Matrix */}
        <section className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl overflow-hidden flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gray-50 rounded-lg">
              <ArrowRightLeft className="w-5 h-5 text-gray-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 font-sans">Trade-off Matrix</h2>
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[500px]">
             {evaluationsList.length > 0 ? (
              evaluationsList.map((item: any, i: number) => {
                const optName = item.option || 'Architectural Option';
                const pros = item.pros || [];
                const cons = item.cons || [];
                
                return (
                  <div key={i} className="group p-6 rounded-2xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:shadow-md transition-all duration-300">
                    <p className="font-bold text-gray-900 text-base mb-4 group-hover:text-blue-600 transition-colors">{optName}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] text-green-600 font-black uppercase mb-2">
                          <ThumbsUp className="w-3 h-3" /> Key Advantages
                        </div>
                        <ul className="space-y-1.5">
                          {Array.isArray(pros) && pros.slice(0, 3).map((p: any, idx: number) => (
                            <li key={idx} className="text-[11px] text-gray-500 leading-tight flex gap-2">
                              <span className="text-green-400 opacity-50">•</span>
                              {String(p)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 text-[10px] text-red-600 font-black uppercase mb-2">
                          <ThumbsDown className="w-3 h-3" /> Critical Risks
                        </div>
                        <ul className="space-y-1.5">
                          {Array.isArray(cons) && cons.slice(0, 3).map((c: any, idx: number) => (
                            <li key={idx} className="text-[11px] text-gray-500 leading-tight flex gap-2">
                              <span className="text-red-400 opacity-50">•</span>
                              {String(c)}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {(item.complexity || item.costEstimation) && (
                        <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                           {item.complexity && (
                             <div>
                               <p className="text-[9px] uppercase font-bold text-gray-400 mb-1">Complexity</p>
                               <p className="text-[10px] text-gray-600 font-semibold">{item.complexity}</p>
                             </div>
                           )}
                           {item.costEstimation && (
                             <div>
                               <p className="text-[9px] uppercase font-bold text-gray-400 mb-1">Cost Impact</p>
                               <p className="text-[10px] text-gray-600 font-semibold">{item.costEstimation}</p>
                             </div>
                           )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                <ShieldCheck className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm italic font-medium">Awaiting evaluation metrics...</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
