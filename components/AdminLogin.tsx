
import React, { useState } from 'react';
import { Lock, ChevronLeft, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import Logo from './Logo';

interface AdminLoginProps {
  onAuthenticated: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onAuthenticated, onCancel }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const CORRECT_PASSWORD = 'saojoaquim2026';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === CORRECT_PASSWORD) {
      onAuthenticated();
    } else {
      setError(true);
      // Feedback visual de erro
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-10 fade-in px-4">
      <div className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 mb-6">
          <Logo className="w-full h-full opacity-40" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 italic">Acesso Restrito</h2>
        <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">Identificação Pastoral</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div className="relative group">
          <input 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a palavra-passe"
            className={`w-full px-6 py-4 bg-white dark:bg-slate-800 border-2 rounded-2xl outline-none transition-all text-center text-lg ${
              error 
                ? 'border-red-500 animate-shake' 
                : 'border-slate-100 dark:border-slate-700 focus:border-amber-500 shadow-sm'
            }`}
            autoFocus
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && (
          <div className="flex items-center justify-center space-x-2 text-red-500 animate-in fade-in slide-in-from-top-1">
            <ShieldAlert size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Palavra incorreta. Tente novamente.</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center space-x-2 py-4 px-6 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft size={18} />
            <span className="text-sm">Voltar</span>
          </button>
          <button
            type="submit"
            className="py-4 px-6 bg-amber-600 text-white rounded-2xl font-bold shadow-lg shadow-amber-200/50 dark:shadow-none hover:bg-amber-700 transition-all active:scale-[0.98] text-sm"
          >
            Entrar
          </button>
        </div>
      </form>

      <div className="pt-8 text-center space-y-2">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed max-w-[280px]">
          Área destinada exclusivamente à Pastoral da Comunicação da Paróquia de São Joaquim.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;