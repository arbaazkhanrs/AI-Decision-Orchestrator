import React from 'react';
import { Check, Loader2, Circle, LucideIcon, Brain, Search, Calculator, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface AgentStep {
  name: string;
  status: 'pending' | 'processing' | 'completed';
}

interface AgentProgressProps {
  steps: AgentStep[];
}

const getAgentIcon = (name: string): LucideIcon => {
  switch (name.toLowerCase()) {
    case 'analyzer': return Search;
    case 'planner': return Brain;
    case 'evaluator': return Calculator;
    case 'reporter': return FileText;
    default: return Brain;
  }
};

export default function AgentProgress({ steps }: AgentProgressProps) {
  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4">
      <div className="relative">
        {/* Main Pipeline Track */}
        <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gray-100" />

        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = getAgentIcon(step.name);
            const isActive = step.status === 'processing';
            const isCompleted = step.status === 'completed';
            const isPending = step.status === 'pending';

            return (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative flex items-start group"
              >
                {/* Node Connection Line (Active state) */}
                {index < steps.length - 1 && isCompleted && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    className="absolute left-[27px] top-8 w-0.5 bg-blue-500 z-10"
                    style={{ height: 'calc(100% + 48px)' }}
                  />
                )}

                {/* Status Indicator (Azure DevOps style) */}
                <div className="relative z-20 flex-shrink-0 mt-1">
                  <div className={`
                    w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500
                    ${isCompleted ? 'bg-blue-500 shadow-lg shadow-blue-200' : 
                      isActive ? 'bg-white border-2 border-blue-500 ring-4 ring-blue-50' : 
                      'bg-white border-2 border-gray-100'}
                  `}>
                    {isCompleted ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Check className="w-6 h-6 text-white stroke-[3]" />
                      </motion.div>
                    ) : isActive ? (
                      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-200" />
                    )}
                  </div>
                  
                  {/* Glowing pulse for active item */}
                  {isActive && (
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-blue-500 rounded-full -z-10"
                    />
                  )}
                </div>

                {/* Content Card */}
                <div className={`ml-8 flex-1 p-6 rounded-2xl border transition-all duration-300 ${
                  isActive ? 'bg-white border-blue-200 shadow-xl shadow-blue-50 translate-x-1' : 
                  isCompleted ? 'bg-white border-gray-100 opacity-90' : 
                  'bg-gray-50/50 border-transparent opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className={`font-bold font-sans tracking-tight ${isActive ? 'text-blue-600' : 'text-gray-900'}`}>
                        {step.name} Agent
                      </h3>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                      isCompleted ? 'bg-blue-50 text-blue-600' : 
                      isActive ? 'bg-blue-600 text-white animate-pulse' : 
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {step.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 font-sans leading-relaxed">
                    {step.status === 'completed' 
                      ? `${step.name} has finished synthesizing the dataset and generated intermediate results.`
                      : step.status === 'processing'
                      ? `Currently executing ${step.name.toLowerCase()} logic using dedicated neural parameters.`
                      : `Awaiting upstream execution from previous pipeline nodes.`}
                  </p>

                  {isActive && (
                    <div className="mt-4 flex gap-1">
                      {[1,2,3].map(i => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          className="h-1 flex-1 bg-blue-200 rounded-full overflow-hidden"
                        >
                          <motion.div 
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="w-1/2 h-full bg-blue-600"
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
