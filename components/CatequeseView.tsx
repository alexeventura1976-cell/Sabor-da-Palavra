
import React, { useState, useEffect } from 'react';
import { Waves, Flame, Heart, HeartPulse, UserRound, Users, ChevronRight, X, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import { VoceSabiaContent } from '../types';

// Ícone personalizado para a Eucaristia: Cálice e Hóstia
const EucaristiaIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Hóstia */}
    <circle cx="12" cy="7" r="4" fill="currentColor" fillOpacity="0.2" />
    <path d="M10 7h4M12 5v4" strokeWidth="1" opacity="0.5" />
    
    {/* Cálice */}
    <path d="M7 12c0 3 2.5 5 5 5s5-2 5-5H7z" />
    <path d="M12 17v4" />
    <path d="M9 21h6" />
  </svg>
);

interface Sacramento {
  id: string;
  nome: string;
  icon: any;
  cor: string;
  descricaoCurta: string;
  fundamentacao: string;
  cicRef: string;
}

const CatequeseView: React.FC = () => {
  const [selectedSacramento, setSelectedSacramento] = useState<Sacramento | null>(null);
  const [voceSabia, setVoceSabia] = useState<VoceSabiaContent | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('catequese_voce_sabia');
    if (saved) {
      setVoceSabia(JSON.parse(saved));
    } else {
      // Valor padrão caso nunca tenha sido editado
      setVoceSabia({
        titulo: 'O significado de "Igreja"',
        texto: 'A palavra Igreja vem do grego Ekklesia, que significa "convocação". Não se refere primeiramente a um prédio de pedra, mas ao povo que Deus chama e reúne de todas as partes da terra.',
        updatedAt: new Date().toISOString()
      });
    }
  }, []);

  const sacramentos: Sacramento[] = [
    {
      id: 'batismo',
      nome: 'Batismo',
      icon: Waves,
      cor: 'bg-blue-50 text-blue-600',
      descricaoCurta: 'O fundamento de toda a vida cristã.',
      fundamentacao: 'O santo Batismo é o fundamento de toda a vida cristã, a porta da vida no Espírito e a porta que abre o acesso aos demais sacramentos. Pelo Batismo somos libertados do pecado e regenerados como filhos de Deus, tornamo-nos membros de Cristo e somos incorporados na Igreja.',
      cicRef: 'CIC 1213'
    },
    {
      id: 'crisma',
      nome: 'Confirmação',
      icon: Flame,
      cor: 'bg-orange-50 text-orange-600',
      descricaoCurta: 'A plenitude da graça batismal.',
      fundamentacao: 'O sacramento da Confirmação é necessário para a consumação da graça batismal. Pelo sacramento da Confirmação, os fiéis vinculam-se mais perfeitamente à Igreja, são enriquecidos com uma força especial do Espírito Santo e, deste modo, ficam mais estritamente obrigados a difundir e a defender a fé por palavras e obras.',
      cicRef: 'CIC 1285'
    },
    {
      id: 'eucaristia',
      nome: 'Eucaristia',
      icon: EucaristiaIcon,
      cor: 'bg-amber-50 text-amber-600',
      descricaoCurta: 'Fonte e ápice da vida cristã.',
      fundamentacao: 'A Eucaristia é o coração e o ápice da vida da Igreja, pois nela Cristo associa sua Igreja e todos os seus membros ao seu sacrifício de louvor e de ação de graças oferecido uma vez por todas na cruz a seu Pai; por este sacrifício Ele derrama as graças da salvação sobre o seu Corpo, que é a Igreja.',
      cicRef: 'CIC 1324'
    },
    {
      id: 'penitencia',
      nome: 'Penitência',
      icon: Heart,
      cor: 'bg-purple-50 text-purple-600',
      descricaoCurta: 'Sacramento do perdão e da cura.',
      fundamentacao: 'Aqueles que se aproximam do sacramento da Penitência obtêm da misericórdia de Deus o perdão da ofensa feita a Ele e, ao mesmo tempo, são reconciliados com a Igreja, que feriram pecando, e que colabora para sua conversão com caridade, exemplo e orações.',
      cicRef: 'CIC 1422'
    },
    {
      id: 'uncao',
      nome: 'Unção dos Enfermos',
      icon: HeartPulse,
      cor: 'bg-emerald-50 text-emerald-600',
      descricaoCurta: 'Força e consolo na enfermidade.',
      fundamentacao: 'Pela sagrada Unção dos Enfermos e pela oração dos presbíteros, a Igreja inteira encomenda os enfermos ao Senhor, sofredor e glorificado, para que os alivie e os salve; exorta-os ainda a que, associando-se livremente à paixão e à morte de Cristo, contribuam para o bem do Povo de Deus.',
      cicRef: 'CIC 1511'
    },
    {
      id: 'ordem',
      nome: 'Ordem',
      icon: UserRound,
      cor: 'bg-indigo-50 text-indigo-600',
      descricaoCurta: 'Serviço e missão apostólica.',
      fundamentacao: 'A Ordem é o sacramento graças ao qual a missão confiada por Cristo a seus Apóstolos continua a ser exercida na Igreja até o fim dos tempos: é, pois, o sacramento do ministério apostólico. Compreende três graus: o episcopado, o presbiterado e o diaconado.',
      cicRef: 'CIC 1536'
    },
    {
      id: 'matrimonio',
      nome: 'Matrimônio',
      icon: Users,
      cor: 'bg-rose-50 text-rose-600',
      descricaoCurta: 'Aliança de amor e vida.',
      fundamentacao: 'A aliança matrimonial, pela qual o homem e a mulher constituem entre si uma comunhão de toda a vida, ordenada por sua índole natural ao bem dos cônjuges e à geração e educação da prole, foi elevada por Cristo Senhor à dignidade de sacramento entre os batizados.',
      cicRef: 'CIC 1601'
    }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <header className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <BookOpen className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold">Catequese</h2>
        </div>
        <p className="text-slate-500 italic">Sinais visíveis da graça de Deus em nossa jornada.</p>
      </header>

      {/* Seção Você Sabia? Dinâmica */}
      {voceSabia && (
        <section className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
            <Sparkles className="w-20 h-20 text-amber-600" />
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/50 p-6 md:p-8 rounded-[2rem] border border-amber-100 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-500">
              <Lightbulb className="w-5 h-5 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Você Sabia?</h3>
            </div>
            <div className="space-y-3">
              <h4 className="text-xl font-serif font-bold text-slate-800 dark:text-slate-100 italic">
                {voceSabia.titulo}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-wrap">
                {voceSabia.texto}
              </p>
            </div>
            {voceSabia.updatedAt && (
              <div className="pt-2 text-[8px] uppercase tracking-widest text-slate-400 font-bold opacity-50">
                Alimentado pela Pascon em {new Date(voceSabia.updatedAt).toLocaleDateString('pt-BR')}
              </div>
            )}
          </div>
        </section>
      )}

      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] px-2">Os Sete Sacramentos</h3>
        <div className="grid gap-4">
          {sacramentos.map((sac) => (
            <button 
              key={sac.id}
              onClick={() => setSelectedSacramento(sac)}
              className="flex items-center p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl hover:border-amber-400 transition-all text-left group"
            >
              <div className={`p-4 rounded-xl mr-4 transition-transform group-hover:scale-110 ${sac.cor}`}>
                <sac.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 dark:text-slate-100">{sac.nome}</h3>
                <p className="text-sm text-slate-500">{sac.descricaoCurta}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedSacramento && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedSacramento(null)}
              className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-500 hover:text-amber-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10 space-y-6">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-2xl ${selectedSacramento.cor}`}>
                  <selectedSacramento.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100">{selectedSacramento.nome}</h3>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-amber-600">{selectedSacramento.cicRef}</span>
                </div>
              </div>

              <div className="w-12 h-[1px] bg-amber-200"></div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-serif text-lg italic text-justify">
                  "{selectedSacramento.fundamentacao}"
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={() => setSelectedSacramento(null)}
                  className="px-6 py-2 bg-slate-900 dark:bg-amber-600 text-white rounded-full text-sm font-bold tracking-wide transition-all active:scale-95"
                >
                  Entendi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
        <p className="text-xs text-slate-400 uppercase tracking-widest leading-loose">
          Fundamentado no Catecismo da Igreja Católica (CIC)<br/>e nos Documentos do Magistério.
        </p>
      </footer>
    </div>
  );
};

export default CatequeseView;
