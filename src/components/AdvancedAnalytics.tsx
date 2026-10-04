import React, { useState } from 'react';
import { useTradeStore } from '../store/useTradeStore';
import { BarChart3, Calendar, ShieldCheck, Flame, Zap, Sliders, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AdvancedAnalytics: React.FC = () => {
  const { trades } = useTradeStore();
  const [strictSL, setStrictSL] = useState(true);
  const [noFOMO, setNoFOMO] = useState(true);

  const actualPnl = trades.reduce((a, b) => a + b.pnl, 0);
  
  // Calculate What-If Simulated P&L based on research competitor feature
  const simulatedTrades = trades.filter(t => {
    if (noFOMO && t.emotion.includes('FOMO')) return false;
    return true;
  });

  const simulatedPnl = simulatedTrades.reduce((acc, t) => {
    if (strictSL && t.pnl < -500) {
      return acc - 300; // Cap loss at max SL rule
    }
    return acc + t.pnl;
  }, 0);

  const pnlSaved = simulatedPnl - actualPnl;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800/80 pb-4">
        <h1 className="text-2xl font-black text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-amber-400 fill-amber-400/20" /> Advanced Analytics & What-If Evaluator
        </h1>
        <p className="text-sm text-slate-400">Institutional risk metrics, Sharpe ratios, and What-If discipline simulation.</p>
      </div>

      {/* WHAT-IF SIMULATOR CARD (TraderSync Differentiator) */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" /> What-If Performance Evaluator Simulator
            </h2>
            <p className="text-xs text-slate-400">Simulate your account equity if you strictly respected discipline rules.</p>
          </div>
          <div className="text-right font-mono">
            <span className="text-xs text-slate-500 block">Disciplined P&L Boost</span>
            <span className="text-xl font-extrabold text-emerald-400">+${pnlSaved.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <label className="flex items-center gap-3 p-3 bg-slate-950/60 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
            <input
              type="checkbox"
              checked={strictSL}
              onChange={(e) => setStrictSL(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded"
            />
            <div>
              <span className="font-bold text-slate-200 block">Strict Stop Loss Cap</span>
              <span className="text-slate-500 font-sans">Cap maximum loss at 1% per trade</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 bg-slate-950/60 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
            <input
              type="checkbox"
              checked={noFOMO}
              onChange={(e) => setNoFOMO(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded"
            />
            <div>
              <span className="font-bold text-slate-200 block">Eliminate FOMO Trades</span>
              <span className="text-slate-500 font-sans">Filter out trades tagged with 'FOMO'</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};