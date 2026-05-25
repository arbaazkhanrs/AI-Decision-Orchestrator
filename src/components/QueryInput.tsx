import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

interface QueryInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function QueryInput({ onSearch, isLoading }: QueryInputProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Should I use SQL or NoSQL for my startup?"
          className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl shadow-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all pr-14 text-gray-700 placeholder-gray-400 font-sans"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
      <p className="mt-4 text-center text-sm text-gray-500 font-sans">
        Ask the agents for an orchestrated decision report
      </p>
    </motion.form>
  );
}
