import React from 'react';
import { useTradeStore } from '../store/useTradeStore';
import { TradingViewChart } from './TradingViewChart';
import { EconomicCalendar } from './EconomicCalendar';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Percent, Award, ShieldAlert, Zap } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { trades, profile } = useTradeStore();

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

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            <Zap className="w-6 h-6 text-emerald-400 fill-emerald-500/20" /> Pro Trader Executive Dashboard
          </h1>
          <p className="text-sm text-slate-400">Real-time portfolio metrics, live charts, and macro event calendar.</p>
        </div>
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-300 font-mono shadow-md">
          Account Balance: <span className="font-bold text-emerald-400">${(profile.startingCapital + totalPnl).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      {/* Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Net Realized P&L</span>
            {totalPnl >= 0 ? <TrendingUp className="w-5 h-5 text-emerald-400" /> : <TrendingDown className="w-5 h-5 text-rose-400" />}
          </div>
          <div className={`text-2xl sm:text-3xl font-bold font-mono ${totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalPnl >= 0 ? '+' : ''}${totalPnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            {trades.length} trades executed
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Win Rate</span>
            <Percent className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-100">
            {winRate.toFixed(1)}%
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            {winningTrades.length} Wins / {losingTrades.length} Losses
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Profit Factor</span>
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">
            {profitFactor.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            Gross Gains / Gross Losses
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Win / Loss</span>
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-slate-100">
            <span className="text-emerald-400">${avgWin.toFixed(0)}</span> / <span className="text-rose-400">${avgLoss.toFixed(0)}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            Payoff: {avgLoss > 0 ? (avgWin / avgLoss).toFixed(2) : 'N/A'}
          </div>
        </div>
      </div>

      {/* Grid Layout: Equity Curve + TradingView Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equity Curve Chart */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Cumulative Equity Growth</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equityData}>
                <defs>
                  <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Equity']}
                />
                <Area type="monotone" dataKey="equity" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#equityGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Embedded TradingView Pro Chart */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Live Interactive TradingView Chart</h2>
          <TradingViewChart symbol="BINANCE:BTCUSDT" height={320} />
        </div>
      </div>

      {/* High Impact Economic Calendar */}
      <EconomicCalendar />
    </div>
  );
};
