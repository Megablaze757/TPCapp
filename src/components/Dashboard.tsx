import React from 'react';
import { useTradeStore } from '../store/useTradeStore';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Percent, Award, ShieldAlert } from 'lucide-react';

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

  // Build cumulative equity curve data
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">Trading Dashboard</h1>
          <p className="text-sm text-slate-400">Performance metrics, equity curve & trade analytics.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-300">
          Account Balance: <span className="font-semibold text-emerald-400">${(profile.startingCapital + totalPnl).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Net P&L</span>
            {totalPnl >= 0 ? <TrendingUp className="w-5 h-5 text-emerald-400" /> : <TrendingDown className="w-5 h-5 text-rose-400" />}
          </div>
          <div className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalPnl >= 0 ? '+' : ''}${totalPnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {trades.length} total trades logged
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Win Rate</span>
            <Percent className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100">
            {winRate.toFixed(1)}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {winningTrades.length} Wins / {losingTrades.length} Losses
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Profit Factor</span>
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">
            {profitFactor.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Gross Gains / Gross Losses
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Avg Win / Loss</span>
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100">
            <span className="text-emerald-400">${avgWin.toFixed(0)}</span> / <span className="text-rose-400">${avgLoss.toFixed(0)}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Payoff Ratio: {avgLoss > 0 ? (avgWin / avgLoss).toFixed(2) : 'N/A'}
          </div>
        </div>
      </div>

      {/* Equity Curve Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">Account Equity Curve</h2>
        <div className="h-72 w-full">
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
    </div>
  );
};
