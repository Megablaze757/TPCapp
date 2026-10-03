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
  TrendingUp,
  Zap
} from 'lucide-react';

type TabType = 'dashboard' | 'journal' | 'watchlist' | 'analytics' | 'backtester' | 'aicoaching' | 'community' | 'calculator' | 'profile';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const mainNavItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'journal', label: 'Journal', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'watchlist', label: 'Live Market', icon: <Activity className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'backtester', label: 'Backtest', icon: <Cpu className="w-5 h-5" /> },
    { id: 'aicoaching', label: 'AI Coach', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'community', label: 'Community', icon: <Trophy className="w-5 h-5" /> },
    { id: 'calculator', label: 'Sizer', icon: <Calculator className="w-5 h-5" /> },
    { id: 'profile', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  // Primary mobile navigation icons (bottom bar)
  const mobileBottomItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'journal', label: 'Journal', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'watchlist', label: 'Markets', icon: <Activity className="w-5 h-5" /> },
    { id: 'aicoaching', label: 'AI Coach', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-20 md:pb-0">
      {/* Top Header */}
      <header className="bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-2 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 shadow-md shadow-emerald-950/40">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Profits Circle Trader
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                  <Zap className="w-3 h-3 fill-current" /> PRO TERMINAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Institutional-Grade Client-Side Trading Platform</p>
            </div>
          </div>

          {/* Desktop Responsive Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/80 border border-slate-800 p-1.5 rounded-2xl text-xs font-medium overflow-x-auto">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all shrink-0 ${ 
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-slate-800 to-slate-800/90 text-emerald-400 font-semibold shadow-md border border-slate-700/60'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800 backdrop-blur-xl px-2 py-2 z-50 flex justify-around items-center shadow-2xl">
        {mobileBottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all text-[10px] font-medium min-w-[60px] ${ 
              activeTab === item.id
                ? 'text-emerald-400 bg-emerald-500/10 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Desktop Footer */}
      <footer className="hidden md:block border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        Profits Circle Trader &copy; 2026 — Institutional Client-Side Trading Platform &amp; Analytics
      </footer>
    </div>
  );
};
export default App;
