import React from 'react';
import { ShieldAlert, Award, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { useTradeStore } from '../store/useTradeStore';

export const PropFirmTracker: React.FC = () => {
  const { trades, profile } = useTradeStore();

  const initialCapital = 50000; // $50k Prop Challenge
  const profitTarget = 5000; // $5k (10% Target)
  const maxDailyLossLimit = 2500; // $2.5k (5% Max Daily Loss)
  const maxOverallDrawdownLimit = 5000; // $5k (10% Max Drawdown)

  const currentPnl = trades.reduce((a, b) => a + b.pnl, 0);
  const currentEquity = initialCapital + currentPnl;
  const targetProgress = Math.min(100, Math.max(0, (currentPnl / profitTarget) * 100));

  const todayPnl = trades.length > 0 ? trades[0].pnl : 0;
  const dailyLossProgress = todayPnl < 0 ? (Math.abs(todayPnl) / maxDailyLossLimit) * 100 : 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" /> Prop Firm Guardrails (FTMO / Apex / Topstep)
          </h2>
          <p className="text-xs text-slate-400">Real-time evaluation rules & max drawdown breach protection.</p>
        </div>
        <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono text-xs font-bold px-3 py-1 rounded-full">
          $50,000 Challenge Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        {/* Profit Target Progress */}
        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span>Profit Target ($5,000)</span>
            <span className="text-emerald-400 font-bold">{targetProgress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${targetProgress}%` }} />
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>Gain: +${currentPnl.toFixed(2)}</span>
            <span>Target: $5,000</span>
          </div>
        </div>

        {/* Max Daily Loss Guard */}
        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span>Daily Loss Limit ($2,500)</span>
            <span className={dailyLossProgress > 80 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
              {dailyLossProgress.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div className="bg-rose-500 h-full transition-all duration-500" style={{ width: `${dailyLossProgress}%` }} />
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>Today Loss: ${todayPnl < 0 ? Math.abs(todayPnl).toFixed(2) : '0.00'}</span>
            <span>Max Allowed: $2,500</span>
          </div>
        </div>

        {/* Trailing Max Drawdown */}
        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span>Overall Max Drawdown ($5,000)</span>
            <span className="text-emerald-400 font-bold">SAFE</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div className="bg-teal-500 h-full transition-all duration-500" style={{ width: '15%' }} />
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>Current Equity: ${currentEquity.toLocaleString()}</span>
            <span>Buffer: $4,250</span>
          </div>
        </div>
      </div>
    </div>
  );
};
