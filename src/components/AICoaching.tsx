import React, { useState } from 'react';
import { useTradeStore } from '../store/useTradeStore';
import { Sparkles, Brain, ShieldAlert, Coins, CheckCircle, RefreshCw } from 'lucide-react';

export const AICoaching: React.FC = () => {
  const { trades, aiCredits, deductCredit, killSwitchActive, toggleKillSwitch } = useTradeStore();
  const [loadingReview, setLoadingReview] = useState(false);
  const [reviewOutput, setReviewOutput] = useState<string | null>(
    "AI Review (BTCUSDT Long): Good risk discipline (1:2.5 R:R). Entry executed cleanly above 4H resistance. Recommended improvement: Trailing stop loss behind 15M EMA to lock in partial profits during high volatility."
  );

  const handleRunReview = () => {
    if (deductCredit(5)) {
      setLoadingReview(true);
      setTimeout(() => {
        setLoadingReview(false);
        setReviewOutput(
          "AI Performance Analysis: Your win rate is strong (66.7%) on Crypto breakout setups. Loss pattern detected on Forex: Avoid trading during major red-folder news releases like NFP. Overall trade quality score average: A."
        );
      }, 1500);
    } else {
      alert('Insufficient AI Credits! Top up credits or wait for monthly renewal.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-400" /> AI Coaching & Risk Guardrails
          </h1>
          <p className="text-sm text-slate-400">Automated trade feedback, emotion detection, and automated cool-down kill switch.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/60 px-4 py-2 rounded-xl font-mono text-sm">
          <Coins className="w-4 h-4 text-amber-400" />
          <span className="text-slate-300">AI Credits Balance:</span>
          <span className="font-bold text-amber-400">{aiCredits} / 20</span>
        </div>
      </div>

      {/* Kill Switch & Behavior Guard Banner */}
      <div className={`p-5 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        killSwitchActive ? 'bg-rose-950/80 border-rose-800 text-rose-200 shadow-rose-950/50' : 'bg-slate-900 border-slate-800 text-slate-300'
      }`}>
        <div className="flex items-start gap-3">
          <ShieldAlert className={`w-6 h-6 shrink-0 ${killSwitchActive ? 'text-rose-400 animate-bounce' : 'text-slate-400'}`} />
          <div>
            <div className="font-bold text-base text-slate-100">
              Behavior Guard & Cool-Down Kill Switch
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {killSwitchActive
                ? '🚨 KILL SWITCH ENGAGED: Trading access suspended to prevent emotional revenge trading after loss threshold.'
                : 'Monitors revenge trading (3+ rapid losses) and daily max drawdown thresholds.'}
            </div>
          </div>
        </div>
        <button
          onClick={toggleKillSwitch}
          className={`px-4 py-2 rounded-lg font-medium text-xs tracking-wider uppercase transition-all shadow-md ${
            killSwitchActive
              ? 'bg-rose-600 hover:bg-rose-500 text-white font-bold'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
          }`}
        >
          {killSwitchActive ? 'Deactivate Kill Switch' : 'Test Kill Switch'}
        </button>
      </div>

      {/* AI Review Generator */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-slate-200 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" /> Groq AI Trade Execution Review
          </h2>
          <button
            onClick={handleRunReview}
            disabled={loadingReview}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-indigo-950/40 disabled:opacity-50"
          >
            {loadingReview ? (
              <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Analyzing Trade...</>
            ) : (
              <><Sparkles className="w-3.5 h-3.5" /> Generate AI Feedback (5 Credits)</>
            )}
          </button>
        </div>

        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 text-sm font-mono text-slate-300 leading-relaxed shadow-inner">
          {reviewOutput}
        </div>
      </div>
    </div>
  );
};
