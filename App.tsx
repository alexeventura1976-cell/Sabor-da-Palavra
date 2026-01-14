
import React, { useState } from 'react';
import { AppView } from './types';
import Navigation from './components/Navigation';
import HojeView from './components/HojeView';
import AvisosView from './components/AvisosView';
import CatequeseView from './components/CatequeseView';
import SobreView from './components/SobreView';
import OracoesView from './components/OracoesView';
import EditorView from './components/EditorView';
import AdminLogin from './components/AdminLogin';
import Logo from './components/Logo';
import { Radio } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOJE);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Modo Noite fixo
  const isDark = true;

  // Renderiza a view correta baseada no estado
  const renderView = () => {
    switch (view) {
      case AppView.HOJE: return <HojeView isDark={isDark} />;
      case AppView.AVISOS: return <AvisosView />;
      case AppView.CATEQUESE: return <CatequeseView />;
      case AppView.SOBRE: return <SobreView setView={setView} />;
      case AppView.ORACAO: return <OracoesView />;
      case AppView.EDITOR: 
        return isAdminAuthenticated ? (
          <EditorView onSave={() => setView(AppView.HOJE)} onLogout={() => setIsAdminAuthenticated(false)} />
        ) : (
          <AdminLogin onAuthenticated={() => setIsAdminAuthenticated(true)} onCancel={() => setView(AppView.SOBRE)} />
        );
      default: return <HojeView isDark={isDark} />;
    }
  };

  return (
    <div className="dark min-h-screen bg-slate-900 text-slate-100 transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white border-opacity-5 bg-slate-900/80 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView(AppView.HOJE)}>
          <Logo className="w-10 h-10" />
          <h1 className="text-xl font-serif font-bold tracking-tight text-amber-500">
            Sabor da Palavra
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <a 
            href="https://servidor28.brlogic.com:8618/live" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full text-amber-500 hover:bg-slate-800 transition-all flex items-center space-x-1"
            title="Ouvir Rádio Celebrai On"
          >
            <Radio className="w-5 h-5 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-tighter hidden md:block">Rádio Ao Vivo</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto px-6 py-8 pb-32">
        {renderView()}
      </main>

      {/* Navigation */}
      <Navigation currentView={view} setView={setView} isDark={isDark} />
    </div>
  );
};

export default App;
