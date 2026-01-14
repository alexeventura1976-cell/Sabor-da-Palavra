
import React from 'react';
import { ShieldCheck, Lock, Smartphone, Mail, Copyright } from 'lucide-react';
import { AppView } from '../types';
import Logo from './Logo';

interface SobreViewProps {
  setView?: (view: AppView) => void;
}

const SobreView: React.FC<SobreViewProps> = ({ setView }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <header className="text-center space-y-6 py-8">
        <div className="mx-auto w-32 h-32 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-amber-100 rounded-full animate-pulse blur-2xl opacity-40"></div>
          <Logo className="w-full h-full drop-shadow-2xl relative z-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-serif font-bold text-amber-600">Sabor da Palavra</h2>
          <p className="text-lg text-slate-500 italic">Onde a Palavra de Deus ganha gosto de vida.</p>
        </div>
      </header>

      {/* Introdução */}
      <section className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm space-y-6 leading-relaxed border border-slate-100 dark:border-slate-700">
        <p className="text-xl font-serif text-slate-800 dark:text-slate-200 first-letter:text-5xl first-letter:font-bold first-letter:text-amber-600 first-letter:mr-3 first-letter:float-left">
          Sabor da Palavra nasceu para ser o seu alimento diário.
          Um convite da nossa Paróquia de São Joaquim para que você possa ler a Palavra, acolhê-la no coração e praticá-la no seu dia a dia.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          Este aplicativo é mantido pela <span className="text-amber-600 font-bold">Pascon</span> (Pastoral da Comunicação), com o objetivo de aproximar o Evangelho da sua realidade, com carinho, profundidade e sabor.
        </p>
      </section>

      {/* Guia de Instalação PWA */}
      <section className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg space-y-4">
        <div className="flex items-center space-x-3">
          <Smartphone className="w-6 h-6 text-amber-500" />
          <h3 className="font-bold text-lg">Tenha o App na sua tela</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 text-sm">
          <div className="bg-slate-800 p-5 rounded-2xl border border-white/5">
            <p className="font-bold text-amber-500 mb-2 flex items-center"><span className="mr-2"></span> No iPhone (Safari)</p>
            <p className="opacity-80">Toque no botão de <strong>Compartilhar</strong> (o quadrado com uma seta para cima) e deslize até encontrar <strong>"Adicionar à Tela de Início"</strong>.</p>
          </div>
          <div className="bg-slate-800 p-5 rounded-2xl border border-white/5">
            <p className="font-bold text-amber-500 mb-2 flex items-center"><span className="mr-2">🤖</span> No Android (Chrome)</p>
            <p className="opacity-80">Toque nos <strong>três pontinhos</strong> no canto superior e escolha <strong>"Instalar Aplicativo"</strong> ou "Adicionar à tela inicial".</p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 pt-4">
        {/* Privacidade */}
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg shrink-0">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Privacidade</h4>
            <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
              <p>O Sabor da Palavra não coleta dados pessoais. Seus "Corações" e "Orações Salvas" ficam guardados apenas no seu próprio celular.</p>
            </div>
          </div>
        </div>

        {/* Contato */}
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg shrink-0">
            <Mail className="w-6 h-6 text-amber-600" />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Pascon São Joaquim</h4>
            <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
              <p>Sugestões ou dúvidas? Fale com a equipe da nossa pastoral:</p>
              <a href="mailto:sabordapalavrasabedoria@gmail.com" className="text-amber-600 font-bold hover:underline block pt-1">
                sabordapalavrasabedoria@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10 flex flex-col items-center space-y-6">
        <button 
          onClick={() => setView?.(AppView.EDITOR)}
          className="flex items-center space-x-2 text-slate-300 dark:text-slate-600 hover:text-amber-600 transition-colors text-[10px] uppercase tracking-[0.3em] font-bold"
        >
          <Lock className="w-3 h-3" />
          <span>Gestão Pastoral</span>
        </button>
        
        <footer className="text-center space-y-2">
          <div className="w-12 h-[1px] bg-amber-200 mx-auto mb-4"></div>
          <p className="text-slate-400 text-[10px] uppercase tracking-widest">© Sabor da Palavra</p>
          <p className="text-slate-400 text-[10px] uppercase tracking-tighter">Paróquia São Joaquim</p>
        </footer>
      </div>
    </div>
  );
};

export default SobreView;
