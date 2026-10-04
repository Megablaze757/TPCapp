import React from 'react';
import { Radio, Zap, Shield, Send, ExternalLink, CheckCircle } from 'lucide-react';

interface Signal {
  id: string;
  symbol: string;
  direction: 'BUY' | 'SELL';
  entryRange: string;
  tp1: string;
  tp2: string;
  stopLoss: string;
  riskLevel: string;
  status: 'ACTIVE' | 'TARGET HIT' | 'STOPPED';
  pips: string;
  time: string;
}

export const VipSignals: React.FC = () => {
  const signals: Signal[] = [
    {
      id: 's1',
      symbol: 'XAUUSD (GOLD)',
      direction: 'BUY',
      entryRange: '2650.00 - 2652.50',
      tp1: '2660.00 (+80 pips)',
      tp2: '2672.00 (+200 pips)',
      stopLoss: '2643.00 (-70 pips)',
      riskLevel: 'Medium (1% Risk)',
      status: 'TARGET HIT',
      pips: '+120 Pips',
      time: 'Today 08:30 London Open'
    },
    {
      id: 's2',
      symbol: 'EURUSD',
      direction: 'SELL',
      entryRange: '1.0880 - 1.0890',
      tp1: '1.0840 (+40 pips)',
      tp2: '1.0800 (+80 pips)',
      stopLoss: '1.0915 (-30 pips)',
      riskLevel: 'Conservative (0.5% Risk)',
      status: 'ACTIVE',
      pips: '+25 Pips Running',
      time: 'Today 10:15 UTC'
    },
    {
      id: 's3',
      symbol: 'BTCUSDT',
      direction: 'BUY',
      entryRange: '63200 - 63500',
      tp1: '64800 (+1300 pts)',
      tp2: '66000 (+2500 pts)',
      stopLoss: '62400 (-800 pts)',
      riskLevel: 'Medium (1% Risk)',
      status: 'TARGET HIT',
      pips: '+1600 Pts',
      time: 'Yesterday 14:00 NY Session'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400 fill-amber-400/20" /> VIP Trading Signals & Live Setups
          </h1>
          <p className="text-sm text-slate-400">Institutional XAUUSD Gold, Forex, and Crypto trade ideas from the Profits Circle desk.</p>
        </div>
        <a
          href="https://t.me/TheProfitsCircleVIP"
          target="_blank"
          rel="noreferrer"
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-950/40 shrink-0"
        >
          <Send className="w-4 h-4 fill-current" /> Join Telegram VIP Channel <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Signal Feed Cards */}
      <div className="space-y-4">
        {signals.map((sig) => (
          <div key={sig.id} className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition-all space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-lg text-xs font-black font-mono tracking-wider ${
                  sig.direction === 'BUY' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60' : 'bg-rose-950 text-rose-400 border border-rose-800/60'
                }`}>
                  {sig.direction} {sig.symbol}
                </span>
                <span className="text-xs text-slate-400 font-mono">{sig.time}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                  {sig.pips}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700">
                  {sig.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Entry Zone</span>
                <span className="font-bold text-slate-200">{sig.entryRange}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Take Profit 1</span>
                <span className="font-bold text-emerald-400">{sig.tp1}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Take Profit 2</span>
                <span className="font-bold text-emerald-400">{sig.tp2}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Stop Loss</span>
                <span className="font-bold text-rose-400">{sig.stopLoss}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
