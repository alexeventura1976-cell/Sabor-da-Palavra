
import React, { useState } from 'react';
import { Send, HeartHandshake } from 'lucide-react';

const PedidosOracaoView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', request: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.request.trim()) {
      setSubmitted(true);
      // Logic for sending prayer request could go here
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-20 space-y-6 animate-in zoom-in duration-500">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full mx-auto flex items-center justify-center">
          <HeartHandshake className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-serif font-bold">Oração Recebida</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
          Seu pedido foi acolhido. Estaremos em comunhão de oração por suas intenções hoje. Deus o abençoe.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-amber-600 font-medium hover:underline"
        >
          Fazer outro pedido
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4">
        <h2 className="text-3xl font-serif font-bold">Pedidos de Oração</h2>
        <div className="bg-amber-50 dark:bg-slate-800 p-4 rounded-xl border-l-4 border-amber-400">
          <p className="text-slate-700 dark:text-slate-300 italic text-sm">
            "Pedi, e dar-se-vos-á; buscai, e encontrareis; batei, e abrir-se-vos-á." (Mateus 7:7)
          </p>
        </div>
        <p className="text-slate-500 leading-relaxed">
          Compartilhe suas intenções conosco. Tratamos cada pedido com profundo cuidado, respeito e absoluto sigilo.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Seu nome (opcional)</label>
          <input 
            type="text" 
            placeholder="Como podemos chamá-lo?"
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Intenção de Oração</label>
          <textarea 
            rows={5}
            placeholder="Abra seu coração... Por quem ou pelo que você gostaria que rezássemos hoje?"
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none"
            value={formData.request}
            onChange={e => setFormData({ ...formData, request: e.target.value })}
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-200 dark:shadow-none flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
        >
          <Send className="w-5 h-5" />
          <span>Enviar meu pedido ao Altar</span>
        </button>
      </form>
    </div>
  );
};

export default PedidosOracaoView;
