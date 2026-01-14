
import React, { useState, useEffect } from 'react';
import { Waves, Sparkles } from 'lucide-react';
import { FlowContent } from '../types';

const FlowView: React.FC = () => {
  const [content, setContent] = useState<FlowContent | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('projeto_flow_content');
    if (saved) {
      setContent(JSON.parse(saved));
    }
  }, []);

  const defaultText = `Muitas pessoas vivem cansadas não porque fazem demais, mas porque fazem sem sentido. Vivem no automático, divididas por dentro, sempre correndo e raramente presentes.

O florescer é aquele estado em que você está inteiro no que faz. A mente está focada, o coração acompanha e a ação não pesa. Não é excesso, é alinhamento.

Aprender a florescer ajuda as pessoas a crescer porque ensina a encontrar equilíbrio entre desafio e capacidade. Nem acomodação, nem sobrecarga. É nesse ponto que você aprende, amadurece e se fortalece verdadeiramente.

Este caminho nasce para ajudar as pessoas a organizarem a vida, as escolhas e as rotinas de modo que vivam com mais presença, sentido e engajamento. Não para fazer mais coisas, mas para fazer melhor aquilo que realmente importa.

Viver com inteireza aquilo que se faz. Quando desafio e capacidade caminham juntos, a vida flui e você pode, enfim, florescer.`;

  const display = content?.texto || defaultText;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Hero Section */}
      <header className="text-center space-y-6 py-6">
        <div className="mx-auto w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center relative">
          <Waves className="w-12 h-12 text-amber-600 animate-pulse" />
          <div className="absolute inset-0 border-2 border-amber-500/20 rounded-full animate-ping"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-serif font-bold text-slate-800 dark:text-slate-100 tracking-tight uppercase">FLORESCER</h2>
        </div>
      </header>

      {/* Main Content Block */}
      <section className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-amber-500/20"></div>
        <div className="flex items-center space-x-2 text-slate-400 mb-8 opacity-40">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Inteireza no Agir</span>
        </div>
        
        <div className="text-lg md:text-xl font-serif text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap italic first-letter:text-5xl first-letter:font-bold first-letter:text-amber-600 first-letter:mr-3 first-letter:float-left">
          {display}
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="text-center py-12 space-y-4">
        <div className="w-12 h-[1px] bg-amber-300 mx-auto opacity-50"></div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold">
          Sabor da Palavra • Florescer
        </p>
        {content?.updatedAt && (
          <p className="text-[8px] text-slate-500 uppercase">Atualizado em {new Date(content.updatedAt).toLocaleDateString('pt-BR')}</p>
        )}
      </footer>
    </div>
  );
};

export default FlowView;
