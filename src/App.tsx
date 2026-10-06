import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TradeJournal } from './components/TradeJournal';
import { NewsFeed } from './components/NewsFeed';
import { VipSignals } from './components/VipSignals';
import { Watchlist } from './components/Watchlist';
import { AdvancedAnalytics } from './components/AdvancedAnalytics';
import { Backtester } from './components/Backtester';
import { AICoaching } from './components/AICoaching';
import { Academy } from './components/Academy';
import { Community } from './components/Community';
import { Affiliates } from './components/Affiliates';
import { PositionCalculator } from './components/PositionCalculator';
import { ProfileSettings } from './components/ProfileSettings';
import { CommandPalette } from './components/CommandPalette';
import {
  LayoutDashboard,
  BookOpen,
  Activity,
  Sparkles,
  Trophy,
  TrendingUp,
  Command
} from 'lucide-react';

type SectionType = 'terminal' | 'journal' | 'markets' | 'ai' | 'community';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('terminal');
  const [subTab, setSubTab] = useState<string>('default');
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const simplifiedMenu: { id: SectionType; label: string; icon: React.ReactNode }[] = [
    { id: 'terminal', label: 'Terminal', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'journal', label: 'Trade Journal', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'markets', label: 'Markets & News', icon: <Activity className="w-4 h-4" /> },
    { id: 'ai', label: 'AI & Analytics', icon: <Sparkles className="w-4 h-4 text-indigo-400" /> },
    { id: 'community', label: 'Community & VIP', icon: <Trophy className="w-4 h-4 text-amber-400" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-20 md:pb-0">
      {/* Top Header */}
      <header className="bg-slate-900/95 border-b border-slate-800/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-2 bg-gradient-to-tr from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-xl text-amber-400 shadow-md shadow-amber-950/40">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight gold-gradient-text">
                  The Profits Circle
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold font-mono bg-amber-950/80 text-amber-400 border border-amber-800/50 px-2 py-0.5 rounded-full">
                  UK PREMIER PLATFORM
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">XAUUSD Gold & Multi-Asset Institutional Trading Desk</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Command Launcher Button */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className="bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-all shadow-md"
            >
              <Command className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Cmd+K Search</span>
            </button>

            {/* SIMPLIFIED 5 CORE MENU TABS */}
            <nav className="hidden md:flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 p-1.5 rounded-2xl text-xs font-medium">
              {simplifiedMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSubTab('default');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-950/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Section Sub-Navigation Header */}
        {activeSection === 'markets' && (
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 p-1.5 rounded-xl text-xs font-mono w-fit">
            <button
              onClick={() => setSubTab('default')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${subTab === 'default' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Live Watchlist & Tickers
            </button>
            <button
              onClick={() => setSubTab('news')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${subTab === 'news' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Macro News Feed
            </button>
          </div>
        )}

        {activeSection === 'ai' && (
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 p-1.5 rounded-xl text-xs font-mono w-fit">
            <button
              onClick={() => setSubTab('default')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${subTab === 'default' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Groq AI Coach
            </button>
            <button
              onClick={() => setSubTab('analytics')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${subTab === 'analytics' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              What-If Evaluator & Analytics
            </button>
            <button
              onClick={() => setSubTab('backtest')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${subTab === 'backtest' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Strategy Backtester
            </button>
          </div>
        )}

        {activeSection === 'community' && (
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 p-1.5 rounded-xl text-xs font-mono w-fit overflow-x-auto">
            <button
              onClick={() => setSubTab('default')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${subTab === 'default' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              VIP Signals
            </button>
            <button
              onClick={() => setSubTab('leaderboard')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${subTab === 'leaderboard' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => setSubTab('academy')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${subTab === 'academy' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Academy Playbooks
            </button>
            <button
              onClick={() => setSubTab('partners')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${subTab === 'partners' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Brokers & Prop Firms
            </button>
            <button
              onClick={() => setSubTab('sizer')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${subTab === 'sizer' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Position Sizer
            </button>
            <button
              onClick={() => setSubTab('settings')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${subTab === 'settings' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Settings
            </button>
          </div>
        )}

        {/* Tab Routing Body */}
        {activeSection === 'terminal' && <Dashboard />}
        {activeSection === 'journal' && <TradeJournal />}
        
        {activeSection === 'markets' && subTab === 'default' && <Watchlist />}
        {activeSection === 'markets' && subTab === 'news' && <NewsFeed />}

        {activeSection === 'ai' && subTab === 'default' && <AICoaching />}
        {activeSection === 'ai' && subTab === 'analytics' && <AdvancedAnalytics />}
        {activeSection === 'ai' && subTab === 'backtest' && <Backtester />}

        {activeSection === 'community' && subTab === 'default' && <VipSignals />}
        {activeSection === 'community' && subTab === 'leaderboard' && <Community />}
        {activeSection === 'community' && subTab === 'academy' && <Academy />}
        {activeSection === 'community' && subTab === 'partners' && <Affiliates />}
        {activeSection === 'community' && subTab === 'sizer' && <PositionCalculator />}
        {activeSection === 'community' && subTab === 'settings' && <ProfileSettings />}
      </main>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectTab={(section) => {
          if (['dashboard', 'terminal'].includes(section)) setActiveSection('terminal');
          else if (section === 'journal') setActiveSection('journal');
          else if (['watchlist', 'news'].includes(section)) { setActiveSection('markets'); setSubTab(section === 'news' ? 'news' : 'default'); }
          else if (['analytics', 'aicoaching', 'backtester'].includes(section)) { setActiveSection('ai'); setSubTab(section === 'analytics' ? 'analytics' : section === 'backtester' ? 'backtest' : 'default'); }
          else { setActiveSection('community'); setSubTab(section === 'vipsignals' ? 'default' : section); }
        }}
      />

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800 backdrop-blur-xl px-2 py-2 z-50 flex justify-around items-center shadow-2xl">
        {simplifiedMenu.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              setSubTab('default');
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all text-[10px] font-medium min-w-[60px] ${
              activeSection === item.id
                ? 'text-amber-400 bg-amber-500/10 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <footer className="hidden md:block border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        The Profits Circle &copy; 2026 — UK Premier Gold &amp; Multi-Asset Trading Community
      </footer>
    </div>
  );
};
export default App;
