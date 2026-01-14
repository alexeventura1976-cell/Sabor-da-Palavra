
import React, { useState, useEffect } from 'react';
import { CalendarDays, Users, Bell } from 'lucide-react';
import { AvisosContent } from '../types';

const AvisosView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agenda' | 'atividades'>('agenda');
  const [content, setContent] = useState<AvisosContent | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('parish_avisos');
    if (saved) {
      setContent(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <header className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <Bell className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold">Avisos</h2>
        </div>
        <p className="text-slate-500 italic">Fique por dentro da vida em nossa comunidade.</p>
      </header>

      {/* Tabs Control */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
        <button 
          onClick={() => setActiveTab('agenda')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl transition-all ${
            activeTab === 'agenda' 
            ? 'bg-white dark:bg-slate-700 shadow-sm text-amber-600 font-bold' 
            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span className="text-sm uppercase tracking-wider">Atividades</span>
        </button>
        <button 
          onClick={() => setActiveTab('atividades')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl transition-all ${
            activeTab === 'atividades' 
            ? 'bg-white dark:bg-slate-700 shadow-sm text-amber-600 font-bold' 
            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Users className="w-4 h-4" />
          <span className="text-sm uppercase tracking-wider">Agenda Pastoral</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 min-h-[300px]">
        {activeTab === 'agenda' ? (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-slate-800 dark:text-slate-100 border-b border-amber-100 dark:border-slate-700 pb-2">
              Atividades
            </h3>
            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
              {content?.agenda || "Nenhuma atividade cadastrada no momento. Em breve teremos novidades!"}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-slate-800 dark:text-slate-100 border-b border-amber-100 dark:border-slate-700 pb-2">
              Agenda Pastoral
            </h3>
            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
              {content?.atividades || "A agenda pastoral da comunidade será listada aqui."}
            </div>
          </div>
        )}
      </div>

      {content?.updatedAt && (
        <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">
          Atualizado em: {new Date(content.updatedAt).toLocaleDateString('pt-BR')}
        </p>
      )}
    </div>
  );
};

export default AvisosView;
