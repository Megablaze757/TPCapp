import React, { useState } from 'react';
import { useTradeStore } from '../store/useTradeStore';
import { TradingViewChart } from './TradingViewChart';
import { EconomicCalendar } from './EconomicCalendar';
import { PropFirmTracker } from './PropFirmTracker';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Percent, Award, ShieldAlert, Zap, Trophy, Search } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { trades, profile } = useTradeStore();
  const [activeChartSymbol, setActiveChartSymbol] = useState('XAUUSD');
  const [customInput, setCustomInput] = useState('');

  const totalPnl = trades.reduce((acc, t) => acc + t.pnl, 0);
  const winningTrades = trades.filter((t) => t.pnl > 0);
  const losingTrades = trades.filter((t) => t.pnl < 0);
  const winRate = trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0;

  const totalGains = winningTrades.reduce((acc, t) => acc + t.pnl, 0);
  const totalLosses = Math.abs(losingTrades.reduce((acc, t) => acc + t.pnl, 0));
  const profitFactor = totalLosses > 0 ? totalGains / totalLosses : totalGains > 0 ? 99 : 0;

  const avgWin = winningTrades.length > 0 ? totalGains / winningTrades.length : 0;
  const avgLoss = losingTrades.length > 0 ? totalLosses / losingTrades.length : 0;

  let runningEquity = profile.startingCapital;
  const equityData = [
    { name: 'Start', equity: profile.startingCapital },
    ...trades.slice().reverse().map((t, idx) => {
      runningEquity += t.pnl;
      return {
        name: `T${idx + 1}`,
        equity: runningEquity,
        pnl: t.pnl
      };
    })
  ];

  const presetSymbols = ['XAUUSD', 'BTCUSDT', 'ETHUSDT', 'EURUSD', 'NVDA', 'AAPL', 'TSLA', 'SPY'];

  const handleAddCustomSymbol = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      setActiveChartSymbol(customInput.trim().toUpperCase());
      setCustomInput('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Level Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-mono font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400 fill-current" /> LEVEL 12 GOLD MASTER • 2,450 XP
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-100 flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400 fill-amber-400/20" /> Executive Cyber Trading Terminal
          </h1>
        </div>
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-5 py-2.5 text-sm text-slate-300 font-mono shadow-xl flex items-center gap-3">
          <span className="text-slate-500 text-xs uppercase">Account Equity:</span>
          <span className="font-black text-xl text-emerald-400">${(profile.startingCapital + totalPnl).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      {/* Prop Firm Challenge Tracker */}
      <PropFirmTracker />

      {/* Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl hover:border-amber-500/30 transition-all">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Net Realized P&L</span>
            {totalPnl >= 0 ? <TrendingUp className="w-5 h-5 text-emerald-400" /> : <TrendingDown className="w-5 h-5 text-rose-400" />}
          </div>
          <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalPnl >= 0 ? '+' : ''}${totalPnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            {trades.length} trades executed
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl hover:border-amber-500/30 transition-all">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Win Rate</span>
            <Percent className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100">
            {winRate.toFixed(1)}%
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            {winningTrades.length} Wins / {losingTrades.length} Losses
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl hover:border-amber-500/30 transition-all">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Profit Factor</span>
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
            {profitFactor.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            Gross Gains / Gross Losses
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl hover:border-amber-500/30 transition-all">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Win / Loss</span>
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-100">
            <span className="text-emerald-400">${avgWin.toFixed(0)}</span> / <span className="text-rose-400">${avgLoss.toFixed(0)}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            Payoff: {avgLoss > 0 ? (avgWin / avgLoss).toFixed(2) : 'N/A'}
          </div>
        </div>
      </div>

      {/* Interactive TradingView Chart with Dynamic Symbol Switcher */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400/20" /> Live Interactive Chart ({activeChartSymbol})
            </h2>
            <span className="text-xs text-slate-500 font-mono">Switch to any symbol below or enter custom ticker</span>
          </div>

          {/* Custom Symbol Search Form */}
          <form onSubmit={handleAddCustomSymbol} className="flex items-center gap-2 text-xs font-mono w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Symbol (e.g. SOLUSDT, GOOGL)"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500 uppercase"
              />
            </div>
            <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-2 rounded-xl shrink-0">
              Load
            </button>
          </form>
        </div>

        {/* Symbol Quick Ticker Chips */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono pb-2">
          <span className="text-slate-500 shrink-0">Quick Select:</span>
          {presetSymbols.map((sym) => (
            <button
              key={sym}
              onClick={() => setActiveChartSymbol(sym)}
              className={`px-3 py-1 rounded-xl font-bold transition-all shrink-0 ${
                activeChartSymbol === sym
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-950/40'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {sym}
            </button>
          ))}
        </div>

        <TradingViewChart symbol={activeChartSymbol} height={450} />
      </div>

      {/* Equity Curve Chart */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">Cumulative Equity Growth Curve</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={equityData}>
              <defs>
                <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Equity']}
              />
              <Area type="monotone" dataKey="equity" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#equityGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Macro Economic Calendar */}
      <EconomicCalendar />
    </div>
  );
};
