import React, { useState, useEffect } from 'react';
import {
  Search,
  LayoutDashboard,
  BookOpen,
  Zap,
  Activity,
  BarChart3,
  Cpu,
  Sparkles,
  GraduationCap,
  Trophy,
  Award,
  Calculator,
  Settings,
  X
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: any) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelectTab }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const commands = [
    { id: 'dashboard', name: 'Go to Executive Dashboard', category: 'Navigation', icon: <LayoutDashboard className="w-4 h-4 text-emerald-400" /> },
    { id: 'vipsignals', name: 'View VIP Trading Signals', category: 'Signals', icon: <Zap className="w-4 h-4 text-amber-400" /> },
    { id: 'journal', name: 'Open Fast Trade Journal', category: 'Journal', icon: <BookOpen className="w-4 h-4 text-teal-400" /> },
    { id: 'watchlist', name: 'Open Live Binance Market Watchlist', category: 'Markets', icon: <Activity className="w-4 h-4 text-cyan-400" /> },
    { id: 'analytics', name: 'View Advanced Analytics & What-If Evaluator', category: 'Analytics', icon: <BarChart3 className="w-4 h-4 text-indigo-400" /> },
    { id: 'aicoaching', name: 'Run Groq AI Trade Execution Review', category: 'AI', icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { id: 'backtester', name: 'Execute Strategy Backtest & Monte Carlo', category: 'Strategy', icon: <Cpu className="w-4 h-4 text-rose-400" /> },
    { id: 'academy', name: 'Open London Breakout & XAUUSD Playbooks', category: 'Education', icon: <GraduationCap className="w-4 h-4 text-amber-400" /> },
    { id: 'calculator', name: 'Open Risk & Position Size Calculator', category: 'Sizer', icon: <Calculator className="w-4 h-4 text-emerald-400" /> },
  ];

  const filteredCommands = commands.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-start justify-center pt-20 p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden space-y-2">
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/80">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search page... (Cmd+K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none font-mono"
          />
          <button onClick={onClose} className="p-1 text-slate-500 hover:text-slate-200"><X className="w-4 h-4" /></button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1 font-mono text-xs">
          {filteredCommands.map((cmd) => (
            <button
              key={cmd.id}
              onClick={() => {
                onSelectTab(cmd.id);
                onClose();
              }}
              className="w-full p-3 rounded-xl hover:bg-slate-800/80 flex items-center justify-between transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                {cmd.icon}
                <span className="font-bold text-slate-200 group-hover:text-amber-400 transition-colors">{cmd.name}</span>
              </div>
              <span className="text-[10px] bg-slate-950 text-slate-500 border border-slate-800 px-2 py-0.5 rounded-md uppercase">
                {cmd.category}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
