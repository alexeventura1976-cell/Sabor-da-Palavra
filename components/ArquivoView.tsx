
import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

const ArquivoView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const months = [
    { name: 'Maio 2024', count: 31 },
    { name: 'Abril 2024', count: 30 },
    { name: 'Março 2024', count: 31 },
    { name: 'Fevereiro 2024', count: 29 },
    { name: 'Janeiro 2024', count: 31 },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4">
        <h2 className="text-3xl font-serif font-bold">Arquivo</h2>
        <p className="text-slate-500 italic">Retorne ao alimento de dias passados.</p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text"
          placeholder="Buscar reflexões ou passagens..."
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {['Advento', 'Natal', 'Quaresma', 'Páscoa', 'Tempo Comum'].map((time) => (
            <button key={time} className="whitespace-nowrap px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors">
              {time}
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          {months.map((month) => (
            <button key={month.name} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-amber-400 transition-colors">
              <div className="flex flex-col items-start">
                <span className="font-medium">{month.name}</span>
                <span className="text-xs text-slate-400">{month.count} reflexões</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArquivoView;
