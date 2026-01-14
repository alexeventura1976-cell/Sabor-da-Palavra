
import React, { useState, useEffect } from 'react';
import { Save, ChevronLeft, Calendar as CalendarIcon, LogOut, Users, Heart, Lightbulb, RotateCcw, FileEdit, PlusCircle, Waves } from 'lucide-react';
import { Liturgy, Reflection, DailyContent, AvisosContent, VoceSabiaContent, FlowContent } from '../types';

interface EditorViewProps {
  onSave: () => void;
  onLogout?: () => void;
}

const EditorView: React.FC<EditorViewProps> = ({ onSave, onLogout }) => {
  const [activeSection, setActiveSection] = useState<'daily' | 'avisos' | 'metrics' | 'catequese' | 'flow'>('metrics');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [onlineUsers, setOnlineUsers] = useState(Math.floor(Math.random() * (15 - 4 + 1) + 4));
  const [totalLikes, setTotalLikes] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  
  // States
  const [liturgy, setLiturgy] = useState<Liturgy>({ date: '', liturgicalTime: 'Tempo Comum', firstReading: '', psalm: '', gospel: '' });
  const [reflection, setReflection] = useState<Reflection>({ saborDaGraca: '', goleDeSabedoria: '', ultimoGole: '', audioUrl: '' });
  const [avisos, setAvisos] = useState<AvisosContent>({ agenda: '', atividades: '', updatedAt: '' });
  const [voceSabia, setVoceSabia] = useState<VoceSabiaContent>({ titulo: '', texto: '', updatedAt: '' });
  const [flow, setFlow] = useState<FlowContent>({ texto: '', updatedAt: '' });

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
    const savedDaily = localStorage.getItem(`daily_content_${date}`);
    if (savedDaily) {
      const parsed: DailyContent = JSON.parse(savedDaily);
      setLiturgy(parsed.liturgy);
      setReflection(parsed.reflection);
      setIsEditing(true);
    } else {
      setLiturgy({ date: '', liturgicalTime: 'Tempo Comum', firstReading: '', psalm: '', gospel: '' });
      setReflection({ saborDaGraca: '', goleDeSabedoria: '', ultimoGole: '', audioUrl: '' });
      setIsEditing(false);
    }

    const savedAvisos = localStorage.getItem('parish_avisos');
    if (savedAvisos) setAvisos(JSON.parse(savedAvisos));

    const savedVoceSabia = localStorage.getItem('catequese_voce_sabia');
    if (savedVoceSabia) setVoceSabia(JSON.parse(savedVoceSabia));

    const savedFlow = localStorage.getItem('projeto_flow_content');
    if (savedFlow) setFlow(JSON.parse(savedFlow));
  }, [date]);

  const handleSaveDaily = (e: React.FormEvent) => {
    e.preventDefault();
    const fullContent: DailyContent = {
      dateKey: date,
      liturgy: { ...liturgy, date: new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
      reflection
    };
    localStorage.setItem(`daily_content_${date}`, JSON.stringify(fullContent));
    alert('Conteúdo diário salvo!');
    onSave();
  };

  const handleSaveFlow = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFlow = { ...flow, updatedAt: new Date().toISOString() };
    localStorage.setItem('projeto_flow_content', JSON.stringify(updatedFlow));
    alert('Conteúdo Florescer atualizado!');
    onSave();
  };

  const handleSaveAvisos = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('parish_avisos', JSON.stringify({ ...avisos, updatedAt: new Date().toISOString() }));
    alert('Avisos atualizados!');
    onSave();
  };

  const handleSaveVoceSabia = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('catequese_voce_sabia', JSON.stringify({ ...voceSabia, updatedAt: new Date().toISOString() }));
    alert('Catequese atualizada!');
    onSave();
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-20">
      <header className="flex items-center justify-between">
        <button onClick={onSave} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><ChevronLeft className="w-6 h-6" /></button>
        <h2 className="text-2xl font-serif font-bold">Painel Pascon</h2>
        <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><LogOut className="w-5 h-5" /></button>
      </header>

      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto no-scrollbar">
        <button onClick={() => setActiveSection('metrics')} className={`flex-1 min-w-[80px] py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeSection === 'metrics' ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-sm' : 'text-slate-400'}`}>Métricas</button>
        <button onClick={() => setActiveSection('daily')} className={`flex-1 min-w-[80px] py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeSection === 'daily' ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-sm' : 'text-slate-400'}`}>Palavra</button>
        <button onClick={() => setActiveSection('flow')} className={`flex-1 min-w-[80px] py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeSection === 'flow' ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-sm' : 'text-slate-400'}`}>Florescer</button>
        <button onClick={() => setActiveSection('catequese')} className={`flex-1 min-w-[80px] py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeSection === 'catequese' ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-sm' : 'text-slate-400'}`}>Catequese</button>
        <button onClick={() => setActiveSection('avisos')} className={`flex-1 min-w-[80px] py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeSection === 'avisos' ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-sm' : 'text-slate-400'}`}>Avisos</button>
      </div>

      {activeSection === 'metrics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <form onSubmit={handleSaveDaily} className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center space-x-2 text-amber-600"><CalendarIcon className="w-5 h-5" /><h3 className="font-bold uppercase text-xs tracking-widest">Data</h3></label>
              {isEditing ? <span className="px-2 py-1 bg-amber-100 text-amber-600 rounded text-[9px] font-bold uppercase">Editando</span> : <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-[9px] font-bold uppercase">Novo</span>}
            </div>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none" />
          </div>
          <div className="space-y-4">
            <input placeholder="Tempo Litúrgico" className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" value={liturgy.liturgicalTime} onChange={e => setLiturgy({...liturgy, liturgicalTime: e.target.value})} />
            <input placeholder="Evangelho" className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-amber-600" value={liturgy.gospel} onChange={e => setLiturgy({...liturgy, gospel: e.target.value})} />
            <textarea placeholder="Sabor da Graça (Reflexão)..." rows={8} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-serif italic text-lg outline-none" value={reflection.saborDaGraca} onChange={e => setReflection({...reflection, saborDaGraca: e.target.value})} />
            <textarea placeholder="Gole de Sabedoria..." rows={2} className="w-full px-4 py-3 bg-amber-50 dark:bg-slate-900 border border-amber-100 dark:border-slate-700 rounded-xl font-medium" value={reflection.goleDeSabedoria} onChange={e => setReflection({...reflection, goleDeSabedoria: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-amber-600 text-white font-bold py-5 rounded-2xl shadow-xl">Publicar Palavra</button>
        </form>
      )}

      {activeSection === 'flow' && (
        <form onSubmit={handleSaveFlow} className="space-y-8 animate-in fade-in pb-10">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
            <div className="flex items-center space-x-2 text-amber-600">
              <Waves className="w-5 h-5" />
              <h3 className="font-bold uppercase text-xs tracking-widest">FLORESCER</h3>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 ml-1">Florescer:</label>
              <textarea 
                rows={15} 
                placeholder="Insira aqui o conteúdo da caminhada Florescer..." 
                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl outline-none focus:ring-2 focus:ring-amber-500/20 font-serif text-lg leading-relaxed" 
                value={flow.texto} 
                onChange={e => setFlow({...flow, texto: e.target.value})} 
              />
              <p className="text-[10px] text-slate-400 mt-2 italic">Dica: Use parágrafos para organizar a leitura do usuário.</p>
            </div>
          </div>
          
          <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center space-x-3 transition-all">
            <Save className="w-6 h-6" />
            <span>Salvar Florescer</span>
          </button>
        </form>
      )}

      {activeSection === 'catequese' && (
        <form onSubmit={handleSaveVoceSabia} className="space-y-6">
          <input placeholder="Título da Curiosidade" className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" value={voceSabia.titulo} onChange={e => setVoceSabia({...voceSabia, titulo: e.target.value})} />
          <textarea placeholder="Conteúdo..." rows={8} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" value={voceSabia.texto} onChange={e => setVoceSabia({...voceSabia, texto: e.target.value})} />
          <button type="submit" className="w-full bg-amber-600 text-white font-bold py-5 rounded-2xl shadow-xl">Salvar Catequese</button>
        </form>
      )}

      {activeSection === 'avisos' && (
        <form onSubmit={handleSaveAvisos} className="space-y-6">
          <textarea placeholder="Atividades" rows={6} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" value={avisos.agenda} onChange={e => setAvisos({...avisos, agenda: e.target.value})} />
          <textarea placeholder="Agenda Pastoral" rows={6} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" value={avisos.atividades} onChange={e => setAvisos({...avisos, atividades: e.target.value})} />
          <button type="submit" className="w-full bg-amber-600 text-white font-bold py-5 rounded-2xl shadow-xl">Salvar Avisos</button>
        </form>
      )}
    </div>
  );
};

export default EditorView;
