import React from 'react';
import { useTradeStore } from '../store/useTradeStore';
import { Trophy, Award, Users, Flame, ExternalLink } from 'lucide-react';

export const Community: React.FC = () => {
  const { badges } = useTradeStore();

  const leaderboard = [
    { rank: 1, name: 'AlphaTrader', winRate: 78.4, pnl: '+$24,850', sharpe: 2.42, badge: '👑' },
    { rank: 2, name: 'ProTrader99', winRate: 75.0, pnl: '+$18,900', sharpe: 2.15, badge: '🛡️' },
    { rank: 3, name: 'CryptoQuant', winRate: 71.2, pnl: '+$14,200', sharpe: 1.92, badge: '🎯' },
    { rank: 4, name: 'SwingKing', winRate: 68.5, pnl: '+$9,650', sharpe: 1.74, badge: '🔥' },
    { rank: 5, name: 'ForexMaster', winRate: 65.0, pnl: '+$6,400', sharpe: 1.50, badge: '⚡' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-400" /> Community & Gamification
        </h1>
        <p className="text-sm text-slate-400">Traders leaderboard, achievement badges, and entry-fee competitions.</p>
      </div>

      {/* Badges Section */}
      <div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" /> Your Unlocked Badges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border transition-all ${
                b.unlocked
                  ? 'bg-slate-900 border-emerald-800/60 shadow-lg shadow-emerald-950/20'
                  : 'bg-slate-950/40 border-slate-800/40 opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">{b.icon}</div>
              <div className="font-bold text-slate-100 text-sm">{b.name}</div>
              <div className="text-xs text-slate-400 mt-1">{b.description}</div>
              <div className="mt-3 text-[10px] uppercase tracking-wider font-semibold font-mono">
                {b.unlocked ? <span className="text-emerald-400">✓ Unlocked</span> : <span className="text-slate-600">Locked</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-base font-semibold text-slate-200 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" /> Monthly Performance Leaderboard
          </h2>
          <span className="text-xs text-slate-500 font-mono">Updated Hourly via Supabase Realtime</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/60 text-xs uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Trader</th>
                <th className="p-4">Win Rate</th>
                <th className="p-4">Sharpe Ratio</th>
                <th className="p-4 text-right">Total P&L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {leaderboard.map((row) => (
                <tr key={row.rank} className={`hover:bg-slate-800/30 transition-colors ${row.name === 'ProTrader99' ? 'bg-emerald-950/20' : ''}`}>
                  <td className="p-4 font-bold">
                    {row.rank === 1 ? '🥇 #1' : row.rank === 2 ? '🥈 #2' : row.rank === 3 ? '🥉 #3' : `#${row.rank}`}
                  </td>
                  <td className="p-4 font-sans font-semibold text-slate-100 flex items-center gap-2">
                    <span>{row.badge}</span> {row.name}
                    {row.name === 'ProTrader99' && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">(You)</span>}
                  </td>
                  <td className="p-4 text-slate-200">{row.winRate}%</td>
                  <td className="p-4 text-indigo-300">{row.sharpe}</td>
                  <td className="p-4 text-right font-bold text-emerald-400">{row.pnl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
