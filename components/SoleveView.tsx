
import React from 'react';
import { ArrowUpCircle, Heart, Brain, Sparkles, Footprints, Church } from 'lucide-react';

const SoleveView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* Hero Section */}
      <header className="text-center space-y-4 py-6">
        <div className="mx-auto w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
          <ArrowUpCircle className="w-12 h-12 text-amber-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-serif font-bold text-slate-800 dark:text-slate-100">SOLEVE</h2>
          <p className="text-amber-600 font-medium italic">Erguer, levantar, sustentar.</p>
        </div>
      </header>

      {/* Intro Card */}
      <section className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 leading-relaxed">
        <p className="text-xl font-serif text-slate-700 dark:text-slate-300 italic">
          "Um caminho de cuidado, formação e amadurecimento da pessoa humana, inspirado no Evangelho e fundamentado na psicoeducação."
        </p>
      </section>

      {/* O que é o SOLEVE */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-amber-600 uppercase tracking-[0.2em] px-2">A Essência</h3>
        <div className="bg-amber-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/20 space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Vivemos tempos em que muitas pessoas creem e servem, mas carregam cansaços interiores. O SOLEVE nasce para ajudar a integrar fé e vida, espiritualidade e humanidade, oferecendo compreensão e ferramentas para o cotidiano.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            {[
              { icon: Brain, label: "Consciência" },
              { icon: Heart, label: "Equilíbrio" },
              { icon: Sparkles, label: "Virtudes" },
              { icon: Church, label: "Fé e Vida" }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-2 text-xs font-medium text-slate-500">
                <item.icon className="w-4 h-4 text-amber-500" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Propósitos */}
      <section className="bg-slate-900 text-slate-100 p-8 rounded-[2.5rem] shadow-xl space-y-6">
        <h3 className="font-serif text-2xl font-bold text-amber-500">Este caminho busca:</h3>
        <ul className="space-y-4">
          {[
            "Crescer em autoconhecimento",
            "Amadurecer emocionalmente",
            "Melhorar a forma de lidar com desafios",
            "Fortalecer as relações interpessoais",
            "Viver a fé com mais coerência e liberdade"
          ].map((text, i) => (
            <li key={i} className="flex items-center space-x-3 text-sm border-b border-slate-800 pb-3 last:border-0">
              <Footprints className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer SOLEVE */}
      <footer className="text-center py-8 space-y-4">
        <p className="text-slate-500 font-serif italic text-lg max-w-xs mx-auto">
          "Acreditamos que uma Igreja que evangeliza também educa, acompanha e cuida."
        </p>
        <div className="w-12 h-[1px] bg-amber-300 mx-auto"></div>
        <p className="text-[10px] uppercase tracking-widest text-slate-400">Um serviço à comunidade</p>
      </footer>
    </div>
  );
};

export default SoleveView;
