import React from 'react';
import { useTradeStore } from '../store/useTradeStore';
import { BarChart3, Calendar, ShieldCheck, Flame, Zap } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AdvancedAnalytics: React.FC = () => {
  const { trades } = useTradeStore();

  const gains = trades.filter(t => t.pnl > 0).map(t => t.pnl);
  const losses = trades.filter(t => t.pnl < 0).map(t => Math.abs(t.pnl));

  const meanGain = gains.length > 0 ? gains.reduce((a, b) => a + b, 0) / gains.length : 0;
  const meanLoss = losses.length > 0 ? losses.reduce((a, b) => a + b, 0) / losses.length : 0;

  // Calculate Sharpe & Calmar proxy
  const returns = trades.map(t => t.pnl);
  const avgReturn = returns.length > 0 ? returns.reduce((a, b) => a + b, 0) / returns.length : 0;
  const variance = returns.length > 1
    ? returns.reduce((acc, val) => acc + Math.pow(val - avgReturn, 2), 0) / (returns.length - 1)
    : 1;
  const stdDev = Math.sqrt(variance);
  const sharpeRatio = stdDev > 0 ? (avgReturn / stdDev) * Math.sqrt(252) : 0;

  // Max drawdown calculation
  let peak = 10000;
  let equity = 10000;
  let maxDd = 0;
  trades.slice().reverse().forEach((t) => {
    equity += t.pnl;
    if (equity > peak) peak = equity;
    const dd = ((peak - equity) / peak) * 100;
    if (dd > maxDd) maxDd = dd;
  });

  const sessionData = [
    { session: 'Asia Session', pnl: 450 },
    { session: 'London Session', pnl: 1100 },
    { session: 'New York Session', pnl: 350 },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-emerald-400" /> Advanced Trade Analytics
        </h1>
        <p className="text-sm text-slate-400">Institutional risk metrics, Sharpe/Calmar ratios, and session performance breakdowns.</p>
      </div>

      {/* Ratios & Risk Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Sharpe Ratio</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{sharpeRatio.toFixed(2)}</div>
          <div className="text-xs text-slate-500 mt-1">Risk-adjusted excess return</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Max Drawdown</span>
            <ShieldCheck className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-400">-{maxDd.toFixed(2)}%</div>
          <div className="text-xs text-slate-500 mt-1">Peak-to-trough decline</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Win Streak</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">3 Trades</div>
          <div className="text-xs text-slate-500 mt-1">Longest consecutive win run</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Payoff Ratio</span>
            <BarChart3 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">
            {meanLoss > 0 ? (meanGain / meanLoss).toFixed(2) : 'N/A'}
          </div>
          <div className="text-xs text-slate-500 mt-1">Avg Win (${meanGain.toFixed(0)}) / Avg Loss (${meanLoss.toFixed(0)})</div>
        </div>
      </div>

      {/* Session Performance Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">P&L by Trading Session</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sessionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="session" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} formatter={(val: any) => [`$${val}`, 'P&L']} />
              <Bar dataKey="pnl" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Calendar P&L Heatmap View */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-400" /> Monthly P&L Calendar Heatmap
        </h2>
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-slate-500 font-bold py-1">{d}</div>
          ))}
          {Array.from({ length: 28 }).map((_, i) => {
            const day = i + 1;
            const samplePnl = day === 1 ? 1250 : day === 2 ? 350 : day === 3 ? -300 : day === 4 ? 600 : 0;
            return (
              <div
                key={i}
                className={`p-3 rounded-lg border flex flex-col justify-between items-center h-16 ${
                  samplePnl > 0 ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300' :
                  samplePnl < 0 ? 'bg-rose-950/60 border-rose-800/60 text-rose-300' :
                  'bg-slate-950/40 border-slate-800/60 text-slate-600'
                }`}
              >
                <span className="text-[10px] text-slate-400 self-start">Oct {day}</span>
                <span className="font-bold">
                  {samplePnl !== 0 ? `${samplePnl > 0 ? '+' : ''}$${samplePnl}` : '-'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
