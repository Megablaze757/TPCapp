import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TradeJournal } from './components/TradeJournal';
import { PositionCalculator } from './components/PositionCalculator';
import { ProfileSettings } from './components/ProfileSettings';
import { LayoutDashboard, BookOpen, Calculator, Settings, TrendingUp } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'journal' | 'calculator' | 'profile'>('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-900/80 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Profits Circle Trader
              </span>
              <span className="hidden sm:inline-block text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded ml-2 font-mono">v1.0 MVP</span>
            </div>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2 bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'journal'
                  ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" /> <span className="hidden sm:inline">Journal</span>
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'calculator'
                  ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calculator className="w-4 h-4" /> <span className="hidden sm:inline">Position Sizer</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'profile'
                  ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Settings className="w-4 h-4" /> <span className="hidden sm:inline">Settings</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'journal' && <TradeJournal />}
        {activeTab === 'calculator' && <PositionCalculator />}
        {activeTab === 'profile' && <ProfileSettings />}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        Profits Circle Trader &copy; 2026 — Client-side Day Trading Platform & Analytics
      </footer>
    </div>
  );
};
export default App;
