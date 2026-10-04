import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TradeJournal } from './components/TradeJournal';
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
import {
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
  TrendingUp
} from 'lucide-react';

type TabType = 'dashboard' | 'journal' | 'vipsignals' | 'watchlist' | 'analytics' | 'backtester' | 'aicoaching' | 'academy' | 'community' | 'affiliates' | 'calculator' | 'profile';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const mainNavItems: { id: TabType; label: string; icon: React.ReactNode; gold?: boolean }[] = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'vipsignals', label: 'VIP Signals', icon: <Zap className="w-4 h-4 text-amber-400" />, gold: true },
    { id: 'journal', label: 'Trade Journal', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'watchlist', label: 'Live Markets', icon: <Activity className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'aicoaching', label: 'AI Coach', icon: <Sparkles className="w-4 h-4 text-indigo-400" /> },
    { id: 'backtester', label: 'Backtester', icon: <Cpu className="w-4 h-4" /> },
    { id: 'academy', label: 'Academy', icon: <GraduationCap className="w-4 h-4 text-amber-400" /> },
    { id: 'community', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" /> },
    { id: 'affiliates', label: 'Partners', icon: <Award className="w-4 h-4 text-amber-400" /> },
    { id: 'calculator', label: 'Sizer', icon: <Calculator className="w-4 h-4" /> },
    { id: 'profile', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const mobileBottomItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'vipsignals', label: 'VIP Signals', icon: <Zap className="w-5 h-5 text-amber-400" /> },
    { id: 'journal', label: 'Journal', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'watchlist', label: 'Markets', icon: <Activity className="w-5 h-5" /> },
    { id: 'aicoaching', label: 'AI Coach', icon: <Sparkles className="w-5 h-5" /> },
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/80 border border-slate-800 p-1.5 rounded-2xl text-xs font-medium overflow-x-auto">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all shrink-0 ${
                  activeTab === item.id
                    ? item.gold
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-950/40'
                      : 'bg-slate-800 text-amber-400 font-semibold shadow-md border border-slate-700/60'
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
        {activeTab === 'vipsignals' && <VipSignals />}
        {activeTab === 'journal' && <TradeJournal />}
        {activeTab === 'watchlist' && <Watchlist />}
        {activeTab === 'analytics' && <AdvancedAnalytics />}
        {activeTab === 'backtester' && <Backtester />}
        {activeTab === 'aicoaching' && <AICoaching />}
        {activeTab === 'academy' && <Academy />}
        {activeTab === 'community' && <Community />}
        {activeTab === 'affiliates' && <Affiliates />}
        {activeTab === 'calculator' && <PositionCalculator />}
        {activeTab === 'profile' && <ProfileSettings />}
      </main>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800 backdrop-blur-xl px-2 py-2 z-50 flex justify-around items-center shadow-2xl">
        {mobileBottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all text-[10px] font-medium min-w-[60px] ${
              activeTab === item.id
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
