import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TradeJournal } from './components/TradeJournal';
import { Watchlist } from './components/Watchlist';
import { AdvancedAnalytics } from './components/AdvancedAnalytics';
import { Backtester } from './components/Backtester';
import { AICoaching } from './components/AICoaching';
import { Community } from './components/Community';
import { PositionCalculator } from './components/PositionCalculator';
import { ProfileSettings } from './components/ProfileSettings';
import {
  LayoutDashboard,
  BookOpen,
  Activity,
  BarChart3,
  Cpu,
  Sparkles,
  Trophy,
  Calculator,
  Settings,
  TrendingUp
} from 'lucide-react';

type TabType = 'dashboard' | 'journal' | 'watchlist' | 'analytics' | 'backtester' | 'aicoaching' | 'community' | 'calculator' | 'profile';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'journal', label: 'Journal', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'watchlist', label: 'Watchlist', icon: <Activity className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'backtester', label: 'Backtest', icon: <Cpu className="w-4 h-4" /> },
    { id: 'aicoaching', label: 'AI Coach', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'community', label: 'Community', icon: <Trophy className="w-4 h-4" /> },
    { id: 'calculator', label: 'Position Sizer', icon: <Calculator className="w-4 h-4" /> },
    { id: 'profile', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Profits Circle Trader
              </span>
              <span className="hidden lg:inline-block text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded ml-2 font-mono">FULL PLATFORM</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs font-medium overflow-x-auto max-w-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all shrink-0 ${
                  activeTab === item.id
                    ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'journal' && <TradeJournal />}
        {activeTab === 'watchlist' && <Watchlist />}
        {activeTab === 'analytics' && <AdvancedAnalytics />}
        {activeTab === 'backtester' && <Backtester />}
        {activeTab === 'aicoaching' && <AICoaching />}
        {activeTab === 'community' && <Community />}
        {activeTab === 'calculator' && <PositionCalculator />}
        {activeTab === 'profile' && <ProfileSettings />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        Profits Circle Trader &copy; 2026 — Ultimate Day Trading Platform &amp; Analytics
      </footer>
    </div>
  );
};
export default App;
