
import React from 'react';
import { AppView } from '../types';
import { Calendar, Bell, Book, Info, MessageSquare, Waves } from 'lucide-react';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isDark: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, isDark }) => {
  const navItems = [
    { id: AppView.HOJE, label: 'Hoje', icon: Calendar },
    { id: AppView.AVISOS, label: 'Avisos', icon: Bell },
    { id: AppView.CATEQUESE, label: 'Catequese', icon: Book },
    { id: AppView.FLOW, label: 'Florescer', icon: Waves },
    { id: AppView.ORACAO, label: 'Orações', icon: MessageSquare },
    { id: AppView.SOBRE, label: 'Sobre', icon: Info },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} px-1 py-3 shadow-lg`}>
      <div className="max-w-2xl mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center flex-1 transition-all duration-300 ${
                isActive ? 'text-amber-600' : 'text-slate-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : 'scale-100'}`} />
              <span className="text-[10px] mt-1 font-medium tracking-tighter">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
