import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, RotateCcw } from 'lucide-react';
import QueryInput from './components/QueryInput';
import AgentProgress from './components/AgentProgress';
import FinalReport from './components/FinalReport';

type StepStatus = 'pending' | 'processing' | 'completed';

interface AgentStep {
  name: string;
  status: StepStatus;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<AgentStep[]>([
    { name: 'Analyzer', status: 'pending' },
    { name: 'Planner', status: 'pending' },
    { name: 'Evaluator', status: 'pending' },
    { name: 'Reporter', status: 'pending' }
  ]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    
    // Initial reset of steps
    setSteps([
      { name: 'Analyzer', status: 'processing' },
      { name: 'Planner', status: 'pending' },
      { name: 'Evaluator', status: 'pending' },
      { name: 'Reporter', status: 'pending' }
    ]);

    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const url = isLocal ? 'http://localhost:5000/api/agents/run' : '/api/agents/run';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

        if (!response.ok) {
          const detailStr = data.details ? ` Details: ${data.details}` : '';
          const errorMsg = `[Backend Error ${response.status}] ${data.message || 'Orchestration failed'}.${detailStr}`;
          throw new Error(errorMsg);
        }
      
      // Simulate sequential completion for UI polish
      const updateSteps = async () => {
        setSteps(s => s.map(step => step.name === 'Analyzer' ? { ...step, status: 'completed' } : step));
        setSteps(s => s.map(step => step.name === 'Planner' ? { ...step, status: 'processing' } : step));
        await new Promise(r => setTimeout(r, 800));
        
        setSteps(s => s.map(step => step.name === 'Planner' ? { ...step, status: 'completed' } : step));
        setSteps(s => s.map(step => step.name === 'Evaluator' ? { ...step, status: 'processing' } : step));
        await new Promise(r => setTimeout(r, 800));

        setSteps(s => s.map(step => step.name === 'Evaluator' ? { ...step, status: 'completed' } : step));
        setSteps(s => s.map(step => step.name === 'Reporter' ? { ...step, status: 'processing' } : step));
        await new Promise(r => setTimeout(r, 800));

        setSteps(s => s.map(step => step.name === 'Reporter' ? { ...step, status: 'completed' } : step));
        setIsLoading(false);
        
        // Normalize property names from backend (PascalCase vs camelCase)
        setResult({
          analysis: data.analysis || data.Analysis,
          planning: data.planning || data.Planning,
          evaluation: data.evaluation || data.Evaluation,
          recommendation: data.recommendation || data.Recommendation
        });
      };

      updateSteps();
      
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      setSteps(s => s.map(step => ({ ...step, status: 'pending' })));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-blue-100">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100/30 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center p-3 bg-blue-600 text-white rounded-2xl shadow-lg mb-4"
          >
            <Cpu className="w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold font-sans tracking-tight text-gray-900"
          >
            AI Decision <span className="text-blue-600">Orchestrator</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 max-w-xl mx-auto font-sans"
          >
            A multi-agent pipeline for structured analysis and architectural decision making.
          </motion.p>
        </header>

        {/* Query Phase */}
        <AnimatePresence mode="wait">
          {!result && !isLoading ? (
            <QueryInput onSearch={handleSearch} isLoading={isLoading} />
          ) : isLoading ? (
            <motion.div key="progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AgentProgress steps={steps} />
            </motion.div>
          ) : result ? (
            <motion.div key="result" className="space-y-6">
              <div className="flex justify-center">
                <button 
                  onClick={() => setResult(null)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-blue-600 transition-colors font-sans font-medium"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Orchestrator
                </button>
              </div>
              <FinalReport 
                report={result.recommendation} 
                analysis={result.analysis} 
                evaluation={result.evaluation} 
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center font-medium font-sans"
          >
            {error}
          </motion.div>
        )}
      </main>
    </div>
  );
}
