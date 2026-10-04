import React from 'react';
import { GraduationCap, BookOpen, Target, Shield, CheckCircle2 } from 'lucide-react';

export const Academy: React.FC = () => {
  const playbooks = [
    {
      id: 'p1',
      title: 'London Breakout XAUUSD Scalp',
      asset: 'XAUUSD (GOLD)',
      timeframe: '5M / 15M',
      description: 'Capitalize on the 08:00 UTC London session open volume spike in Gold by identifying the Asian session high/low range.',
      rules: [
        'Draw Asian session high & low between 00:00 - 07:00 UTC',
        'Wait for 15M candle close outside Asian range after 08:00 UTC',
        'Enter retest of Asian range boundary with tight 30-pip Stop Loss',
        'Target 1:2 Risk/Reward ratio minimum (60 pips)'
      ]
    },
    {
      id: 'p2',
      title: 'VWAP Mean Reversion',
      asset: 'US Stocks & Crypto',
      timeframe: '15M / 1H',
      description: 'Fade overextended price moves returning to Volume Weighted Average Price (VWAP) during high liquidity windows.',
      rules: [
        'Confirm price is > 2 standard deviations away from daily VWAP',
        'Wait for exhaustion candle (pinbar or engulfing pattern)',
        'Enter towards VWAP midline target',
        'Place stop loss beyond previous swing high/low'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800/80 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-amber-400" /> Profits Circle Academy & Playbooks
        </h1>
        <p className="text-sm text-slate-400">Institutional trading strategies, risk management protocols, and XAUUSD scalping frameworks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playbooks.map((pb) => (
          <div key={pb.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-2 mb-2">
                <h2 className="text-lg font-bold text-slate-100">{pb.title}</h2>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0">
                  {pb.asset}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{pb.description}</p>

              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-amber-400" /> Strategy Execution Rules
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                  {pb.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500 font-mono">
              <span>Timeframe: {pb.timeframe}</span>
              <span className="text-emerald-400 font-bold">Rules-Based Execution</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
