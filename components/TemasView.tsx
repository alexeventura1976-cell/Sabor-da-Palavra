
import React from 'react';

const TemasView: React.FC = () => {
  const themes = [
    { label: 'Dor', color: 'bg-indigo-100 text-indigo-700' },
    { label: 'Esperança', color: 'bg-green-100 text-green-700' },
    { label: 'Conversão', color: 'bg-purple-100 text-purple-700' },
    { label: 'Família', color: 'bg-amber-100 text-amber-700' },
    { label: 'Fé', color: 'bg-blue-100 text-blue-700' },
    { label: 'Perdão', color: 'bg-rose-100 text-rose-700' },
    { label: 'Confiança', color: 'bg-teal-100 text-teal-700' },
    { label: 'Vocação', color: 'bg-orange-100 text-orange-700' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4">
        <h2 className="text-3xl font-serif font-bold">Temas</h2>
        <p className="text-slate-500 italic">Encontre luz para os momentos específicos da sua jornada.</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {themes.map((theme) => (
          <button 
            key={theme.label}
            className={`p-6 rounded-2xl flex items-center justify-center text-lg font-medium shadow-sm hover:scale-[1.02] transition-transform ${theme.color}`}
          >
            {theme.label}
          </button>
        ))}
      </div>
      
      <div className="mt-12 p-8 bg-amber-50 dark:bg-slate-800 rounded-3xl border border-amber-100 dark:border-slate-700">
        <h3 className="font-serif text-xl font-bold text-amber-900 dark:text-amber-500 mb-2">Busca por Sentimento</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">Como você se sente hoje? Deixe a Palavra falar com você.</p>
        <div className="flex flex-wrap gap-2">
          {['Cansado', 'Agradecido', 'Perdido', 'Ansioso', 'Forte', 'Inseguro'].map(s => (
            <button key={s} className="px-3 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-600 dark:text-slate-300">
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemasView;
