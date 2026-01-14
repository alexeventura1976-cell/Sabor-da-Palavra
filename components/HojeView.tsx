
import React, { useState, useEffect, useRef } from 'react';
import { Liturgy, Reflection, DailyContent } from '../types';
import { fetchFullDailyContent } from '../services/geminiService';
import { Copy, Play, Pause, Coffee, Heart, BookOpen, Music, ScrollText, Cross, ExternalLink } from 'lucide-react';
import Logo from './Logo';

interface HojeViewProps {
  isDark: boolean;
}

const HojeView: React.FC<HojeViewProps> = ({ isDark }) => {
  const [loading, setLoading] = useState(true);
  const [liturgy, setLiturgy] = useState<Liturgy | null>(null);
  const [reflection, setReflection] = useState<Reflection | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [dateKey, setDateKey] = useState('');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const today = new Date();
      const currentKey = today.toISOString().split('T')[0];
      setDateKey(currentKey);
      
      const savedData = localStorage.getItem(`daily_content_${currentKey}`);
      
      const localLikes = localStorage.getItem(`likes_${currentKey}`);
      const alreadyLiked = localStorage.getItem(`has_liked_${currentKey}`);
      
      const seed = parseInt(currentKey.replace(/-/g, '').substring(4, 8));
      const communityBase = (seed % 50) + 10; 
      
      setLikes(communityBase + (localLikes ? parseInt(localLikes) : 0));
      setHasLiked(!!alreadyLiked);

      if (savedData) {
        const parsed: DailyContent = JSON.parse(savedData);
        setLiturgy(parsed.liturgy);
        setReflection(parsed.reflection);
      } else {
        const result = await fetchFullDailyContent(today);
        setLiturgy(result.liturgy);
        setReflection(result.reflection);
      }
      
      setLoading(false);
    };

    fetchData();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleToggleAudio = () => {
    if (!reflection?.audioUrl) {
      alert("A reflexão em áudio para hoje ainda não foi disponibilizada. Fique atento às atualizações da Pascon!");
      return;
    }

    const isDirectLink = /\.(mp3|wav|ogg|m4a|aac)$/i.test(reflection.audioUrl);
    
    // Se for link externo (ex: Spotify), abrir em nova aba conforme pedido
    if (!isDirectLink) {
      window.open(reflection.audioUrl, '_blank');
      return;
    }

    // Caso seja link direto para arquivo de áudio (opcional)
    if (!audioRef.current) {
      audioRef.current = new Audio(reflection.audioUrl);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current.addEventListener('error', () => {
        alert("Ocorreu um problema ao carregar este arquivo de áudio.");
        setIsPlaying(false);
        audioRef.current = null;
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => {
        console.error("Playback failed:", err);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const handleLike = () => {
    if (hasLiked) return;
    const newLikes = likes + 1;
    setLikes(newLikes);
    setHasLiked(true);
    localStorage.setItem(`likes_${dateKey}`, "1");
    localStorage.setItem(`has_liked_${dateKey}`, "true");
  };

  const handleCopy = () => {
    if (reflection && liturgy) {
      const textToCopy = `
SABOR DA PALAVRA ☕📖
${liturgy.date}

--- LITURGIA ---
1ª Leitura: ${liturgy.firstReading}
Salmo: ${liturgy.psalm}
${liturgy.secondReading ? `2ª Leitura: ${liturgy.secondReading}\n` : ''}
Evangelho: ${liturgy.gospel}

--- SABOR DA GRAÇA ---
${reflection.saborDaGraca}

--- GOLE DE SABEDORIA ---
"${reflection.goleDeSabedoria}"

---
Acompanhe diariamente pelo app Sabor da Palavra.
      `.trim();

      navigator.clipboard.writeText(textToCopy);
      alert('Conteúdo copiado com sucesso!');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-8 animate-pulse">
        <div className="relative">
          <Logo className="w-28 h-28 opacity-80" />
          <div className="absolute inset-0 border-[3px] border-amber-600/30 border-t-amber-600 rounded-full animate-spin w-28 h-28"></div>
        </div>
        <p className="text-amber-800/60 font-serif italic text-lg tracking-wide">Colhendo a Palavra do dia...</p>
      </div>
    );
  }

  const isExternalAudio = reflection?.audioUrl && !/\.(mp3|wav|ogg|m4a|aac)$/i.test(reflection.audioUrl);

  return (
    <div className="space-y-12 fade-in pb-10">
      {/* 1. CABEÇALHO */}
      <section className="text-center space-y-3">
        <span className="inline-block px-3 py-1 bg-amber-100/50 dark:bg-slate-800 rounded-full text-[10px] font-bold text-amber-700 dark:text-amber-500 uppercase tracking-widest border border-amber-200/50">
          {liturgy?.liturgicalTime || "Tempo Litúrgico"}
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 dark:text-slate-100 capitalize leading-tight">
          {liturgy?.date}
        </h2>
        <div className="w-12 h-[1px] bg-amber-300 mx-auto opacity-50"></div>
      </section>

      {/* 2. LITURGIA */}
      <section className="bg-white/40 dark:bg-slate-800/40 p-6 md:p-8 rounded-3xl border border-white dark:border-slate-700/50 shadow-sm space-y-8">
        <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-500 mb-2">
          <BookOpen className="w-5 h-5" />
          <h3 className="text-xs font-bold uppercase tracking-[0.3em]">Liturgia do Dia</h3>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center">
              <ScrollText className="w-3 h-3 mr-2" /> 1ª Leitura
            </h4>
            <p className="text-base md:text-lg font-serif text-slate-800 dark:text-slate-100 leading-snug">{liturgy?.firstReading}</p>
          </div>

          <div className="space-y-2 pl-4 border-l-2 border-amber-200 dark:border-amber-900/30">
            <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center">
              <Music className="w-3 h-3 mr-2" /> Salmo Responsorial
            </h4>
            <p className="text-base md:text-lg font-serif italic text-slate-700 dark:text-slate-300 leading-snug">{liturgy?.psalm}</p>
          </div>

          {liturgy?.secondReading && (
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center">
                <ScrollText className="w-3 h-3 mr-2" /> 2ª Leitura
              </h4>
              <p className="text-base md:text-lg font-serif text-slate-800 dark:text-slate-100 leading-snug">{liturgy.secondReading}</p>
            </div>
          )}

          <div className="space-y-2 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
            <h4 className="text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest flex items-center">
              <Cross className="w-3 h-3 mr-2" /> Evangelho
            </h4>
            <p className="text-lg md:text-xl font-serif font-bold text-amber-800 dark:text-amber-600 leading-snug">{liturgy?.gospel}</p>
          </div>
        </div>

        {/* Botão Ouvir Reflexão - Ajustado para Sabor da Palavra / Spotify */}
        <div className="pt-4">
          <button 
            onClick={handleToggleAudio}
            className={`w-full flex items-center justify-center space-x-3 rounded-2xl py-4 md:py-5 transition-all shadow-lg active:scale-[0.98] ${
              isPlaying 
              ? 'bg-amber-100 text-amber-700 border border-amber-200' 
              : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-6 h-6 fill-current" />
                <span className="font-bold tracking-wider text-lg">Pausar Reflexão</span>
              </>
            ) : (
              <>
                {isExternalAudio ? (
                  <Music className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 fill-current" />
                )}
                <span className="font-bold tracking-wider text-lg">
                  {isExternalAudio ? "Ouvir: Sabor da Palavra" : "Ouvir Reflexão"}
                </span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* 3. SABOR DA GRAÇA */}
      <section className="space-y-6 relative">
        <div className="flex items-center justify-center space-x-4 opacity-30">
          <div className="h-[1px] flex-1 bg-amber-400"></div>
          <Coffee className="w-5 h-5 text-amber-600" />
          <div className="h-[1px] flex-1 bg-amber-400"></div>
        </div>
        <div className="text-center px-2">
          <h3 className="font-serif text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6 italic">Sabor da Graça</h3>
          <div className="text-lg md:text-xl leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap text-justify font-serif italic first-letter:text-4xl first-letter:font-bold first-letter:text-amber-600 first-letter:mr-1">
            {reflection?.saborDaGraca}
          </div>
        </div>
      </section>

      {/* 4. GOLE DE SABEDORIA */}
      <section className="relative bg-white dark:bg-slate-800 border-2 border-amber-100 dark:border-amber-900/30 rounded-[2.5rem] p-8 md:p-10 shadow-xl text-center space-y-6">
          <h3 className="text-amber-700 dark:text-amber-500 font-serif text-2xl font-bold italic">Gole de Sabedoria</h3>
          <p className="text-xl md:text-2xl text-slate-800 dark:text-slate-100 font-medium leading-tight max-w-md mx-auto">
            "{reflection?.goleDeSabedoria}"
          </p>
      </section>

      {/* 5. ÚLTIMO GOLE */}
      <section className="py-12 text-center space-y-3">
          <h3 className="font-serif text-xl italic text-slate-400 dark:text-slate-500">Último Gole</h3>
          <p className="text-lg text-slate-500 dark:text-slate-400 italic font-serif max-w-sm mx-auto">
            {reflection?.ultimoGole}
          </p>
      </section>

      {/* 6. AÇÕES */}
      <section className="flex justify-center space-x-12 pt-4">
        <button onClick={handleLike} className="flex flex-col items-center space-y-2 group">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${hasLiked ? 'bg-amber-100 dark:bg-amber-900/40' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-amber-50'}`}>
            <Heart className={`w-6 h-6 ${hasLiked ? 'text-amber-600 fill-amber-600' : 'text-slate-500 group-hover:text-amber-600'}`} />
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${hasLiked ? 'text-amber-600' : 'text-slate-400'}`}>
            {likes} Curtidas
          </span>
        </button>

        <button onClick={handleCopy} className="flex flex-col items-center space-y-2 group">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
            <Copy className="w-6 h-6 text-slate-500 group-hover:text-amber-600" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Copiar Tudo</span>
        </button>
      </section>
    </div>
  );
};

export default HojeView;
