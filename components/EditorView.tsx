
import React, { useState, useEffect } from 'react';
import { Save, ChevronLeft, Calendar as CalendarIcon, LogOut, Users, Heart, Music, Link as LinkIcon, Lightbulb, BookOpen, RotateCcw, FileEdit, PlusCircle } from 'lucide-react';
import { Liturgy, Reflection, DailyContent, AvisosContent, VoceSabiaContent } from '../types';

interface EditorViewProps {
  onSave: () => void;
  onLogout?: () => void;
}

const EditorView: React.FC<EditorViewProps> = ({ onSave, onLogout }) => {
  const [activeSection, setActiveSection] = useState<'daily' | 'avisos' | 'metrics' | 'catequese'>('metrics');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [onlineUsers, setOnlineUsers] = useState(Math.floor(Math.random() * (15 - 4 + 1) + 4));
  const [totalLikes, setTotalLikes] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  
  // Daily Content State
  const [liturgy, setLiturgy] = useState<Liturgy>({
    date: '',
    liturgicalTime: 'Tempo Comum',
    firstReading: '',
    psalm: '',
    gospel: ''
  });
  const [reflection, setReflection] = useState<Reflection>({
    saborDaGraca: '',
    goleDeSabedoria: '',
    ultimoGole: '',
    audioUrl: ''
  });

  // Avisos State
  const [avisos, setAvisos] = useState<AvisosContent>({
    agenda: '',
    atividades: '',
    updatedAt: ''
  });

  // Catequese State (Você Sabia?)
  const [voceSabia, setVoceSabia] = useState<VoceSabiaContent>({
    titulo: '',
    texto: '',
    updatedAt: ''
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const localLikes = localStorage.getItem(`likes_${today}`);
    const seed = parseInt(today.replace(/-/g, '').substring(4, 8));
    const communityBase = (seed % 50) + 10;
    setTotalLikes(communityBase + (localLikes ? parseInt(localLikes) : 0));

    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newVal = prev + change;
        return newVal < 3 ? 3 : (newVal > 25 ? 25 : newVal);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Carregar conteúdo diário
    const savedDaily = localStorage.getItem(`daily_content_${date}`);
    if (savedDaily) {
      const parsed: DailyContent = JSON.parse(savedDaily);
      setLiturgy(parsed.liturgy);
      setReflection(parsed.reflection);
      setIsEditing(true);
    } else {
      clearDailyFields();
      setIsEditing(false);
    }

    // Carregar avisos
    const savedAvisos = localStorage.getItem('parish_avisos');
    if (savedAvisos) {
      setAvisos(JSON.parse(savedAvisos));
    }

    // Carregar Catequese (Você Sabia?)
    const savedVoceSabia = localStorage.getItem('catequese_voce_sabia');
    if (savedVoceSabia) {
      setVoceSabia(JSON.parse(savedVoceSabia));
    }
  }, [date]);

  const clearDailyFields = () => {
    setLiturgy({ date: '', liturgicalTime: 'Tempo Comum', firstReading: '', psalm: '', gospel: '' });
    setReflection({ saborDaGraca: '', goleDeSabedoria: '', ultimoGole: '', audioUrl: '' });
  };

  const handleSaveDaily = (e: React.FormEvent) => {
    e.preventDefault();
    const fullContent: DailyContent = {
      dateKey: date,
      liturgy: {
        ...liturgy,
        date: new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      },
      reflection
    };
    localStorage.setItem(`daily_content_${date}`, JSON.stringify(fullContent));
    alert(isEditing ? 'Publicação atualizada com sucesso!' : 'Novo conteúdo publicado com sucesso!');
    onSave();
  };

  const handleSaveAvisos = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAvisos = {
      ...avisos,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('parish_avisos', JSON.stringify(updatedAvisos));
    alert('Avisos atualizados!');
    onSave();
  };

  const handleSaveVoceSabia = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedVoceSabia = {
      ...voceSabia,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('catequese_voce_sabia', JSON.stringify(updatedVoceSabia));
    alert('Curiosidade da Catequese atualizada!');
    onSave();
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-20">
      <header className="flex items-center justify-between">
        <button onClick={onSave} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-serif font-bold">Painel Pascon</h2>
        <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Sair">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto no-scrollbar">
        <button onClick={() => setActiveSection('metrics')} className={`flex-1 min-w-[80px] py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeSection === 'metrics' ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-sm' : 'text-slate-400'}`}>Métricas</button>
        <button onClick={() => setActiveSection('daily')} className={`flex-1 min-w-[80px] py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeSection === 'daily' ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-sm' : 'text-slate-400'}`}>Palavra</button>
        <button onClick={() => setActiveSection('catequese')} className={`flex-1 min-w-[80px] py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeSection === 'catequese' ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-sm' : 'text-slate-400'}`}>Catequese</button>
        <button onClick={() => setActiveSection('avisos')} className={`flex-1 min-w-[80px] py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeSection === 'avisos' ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-sm' : 'text-slate-400'}`}>Avisos</button>
      </div>

      {activeSection === 'metrics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <Users className="w-8 h-8 text-amber-600 mb-4" />
            <h4 className="text-3xl font-bold">{onlineUsers}</h4>
            <p className="text-xs text-slate-500 uppercase tracking-widest">Conectados agora</p>
          </div>
          <div className="bg-amber-600 p-6 rounded-3xl shadow-lg text-white">
            <Heart className="w-8 h-8 text-amber-200 mb-4" />
            <h4 className="text-3xl font-bold">{totalLikes}</h4>
            <p className="text-xs text-amber-100 uppercase tracking-widest">Corações tocados hoje</p>
          </div>
        </div>
      )}

      {activeSection === 'daily' && (
        <form onSubmit={handleSaveDaily} className="space-y-8 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center space-x-2 text-amber-600">
                <CalendarIcon className="w-5 h-5" />
                <h3 className="font-bold uppercase text-xs tracking-widest">Data da Reflexão</h3>
              </label>
              {isEditing ? (
                <span className="flex items-center space-x-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-md text-[9px] font-bold uppercase tracking-widest">
                  <FileEdit className="w-3 h-3" />
                  <span>Editando Publicado</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-md text-[9px] font-bold uppercase tracking-widest">
                  <PlusCircle className="w-3 h-3" />
                  <span>Novo Conteúdo</span>
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20" />
              <button 
                type="button" 
                onClick={() => { if(confirm('Limpar todos os campos?')) clearDailyFields(); }}
                className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-amber-600 rounded-xl transition-colors"
                title="Limpar campos"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-2 text-[9px] text-slate-400 uppercase tracking-tight">Ao selecionar uma data com conteúdo já existente, os campos serão preenchidos automaticamente para sua atualização.</p>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold">Conteúdo da Palavra</h3>
            <div className="grid gap-4">
              <input placeholder="Tempo Litúrgico" className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500/20" value={liturgy.liturgicalTime} onChange={e => setLiturgy({...liturgy, liturgicalTime: e.target.value})} />
              <input placeholder="1ª Leitura" className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500/20" value={liturgy.firstReading} onChange={e => setLiturgy({...liturgy, firstReading: e.target.value})} />
              <input placeholder="Salmo" className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500/20" value={liturgy.psalm} onChange={e => setLiturgy({...liturgy, psalm: e.target.value})} />
              <input placeholder="Evangelho" className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500/20" value={liturgy.gospel} onChange={e => setLiturgy({...liturgy, gospel: e.target.value})} />
              
              <div className="p-6 bg-amber-50 dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-amber-900/30 space-y-4 shadow-inner">
                <div className="flex items-center space-x-2">
                  <Music className="w-4 h-4 text-amber-600" />
                  <label className="text-[10px] font-bold text-amber-700 dark:text-amber-500 uppercase tracking-widest">Link da Reflexão (Ex: Spotify)</label>
                </div>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                  <input 
                    placeholder="Cole aqui o link do Spotify ou áudio..." 
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700 rounded-xl outline-none text-sm focus:ring-2 focus:ring-amber-500/20" 
                    value={reflection.audioUrl || ''} 
                    onChange={e => setReflection({...reflection, audioUrl: e.target.value})} 
                  />
                </div>
              </div>

              <textarea placeholder="Sabor da Graça (Reflexão)..." rows={6} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-serif italic text-lg outline-none focus:ring-2 focus:ring-amber-500/20" value={reflection.saborDaGraca} onChange={e => setReflection({...reflection, saborDaGraca: e.target.value})} />
              <textarea placeholder="Gole de Sabedoria (Prática)..." rows={2} className="w-full px-4 py-3 bg-amber-50 dark:bg-slate-900 border border-amber-100 dark:border-slate-700 rounded-xl font-medium outline-none focus:ring-2 focus:ring-amber-500/20" value={reflection.goleDeSabedoria} onChange={e => setReflection({...reflection, goleDeSabedoria: e.target.value})} />
              <input placeholder="Último Gole" className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20" value={reflection.ultimoGole} onChange={e => setReflection({...reflection, ultimoGole: e.target.value})} />
            </div>
          </div>

          <button type="submit" className={`w-full ${isEditing ? 'bg-amber-700' : 'bg-amber-600'} hover:opacity-90 text-white font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center space-x-3 transition-all active:scale-[0.98] border border-amber-500/20`}>
            <Save className="w-6 h-6" />
            <span>{isEditing ? 'Atualizar Publicação' : 'Publicar Alimento Diário'}</span>
          </button>
        </form>
      )}

      {activeSection === 'catequese' && (
        <form onSubmit={handleSaveVoceSabia} className="space-y-8 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
            <div className="flex items-center space-x-2 text-amber-600">
              <Lightbulb className="w-5 h-5" />
              <h3 className="font-bold uppercase text-xs tracking-widest">Você Sabia? (Curiosidades)</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 px-1">Título da Curiosidade</label>
                <input 
                  placeholder="Ex: O significado de Igreja" 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20" 
                  value={voceSabia.titulo} 
                  onChange={e => setVoceSabia({...voceSabia, titulo: e.target.value})} 
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 px-1">Conteúdo/Explicação</label>
                <textarea 
                  placeholder="Escreva aqui o ensinamento ou curiosidade..." 
                  rows={8} 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 leading-relaxed" 
                  value={voceSabia.texto} 
                  onChange={e => setVoceSabia({...voceSabia, texto: e.target.value})} 
                />
              </div>
            </div>
          </div>
          
          <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center space-x-3 transition-all active:scale-[0.98] border border-amber-500/20">
            <Save className="w-6 h-6" />
            <span>Atualizar Catequese</span>
          </button>
        </form>
      )}

      {activeSection === 'avisos' && (
        <form onSubmit={handleSaveAvisos} className="space-y-8 animate-in fade-in">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-amber-600 uppercase tracking-widest">Agenda Semanal</label>
            <textarea rows={8} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20" value={avisos.agenda} onChange={e => setAvisos({...avisos, agenda: e.target.value})} />
            
            <label className="block text-sm font-bold text-amber-600 uppercase tracking-widest">Atividades Pascon</label>
            <textarea rows={8} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20" value={avisos.atividades} onChange={e => setAvisos({...avisos, atividades: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-amber-600 text-white font-bold py-5 rounded-2xl shadow-xl transition-all active:scale-[0.98]">Salvar Avisos</button>
        </form>
      )}
    </div>
  );
};

export default EditorView;
