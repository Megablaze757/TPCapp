import React from 'react';
import { Shield, ExternalLink, Award, Sparkles } from 'lucide-react';

export const Affiliates: React.FC = () => {
  const brokers = [
    {
      id: 'b1',
      name: 'Exness Pro Gold Broker',
      type: 'Forex & XAUUSD Gold',
      leverage: '1:2000 Unlimited',
      spreads: 'Raw Spread from 0.0 Pips',
      perks: 'Instant UK Faster Payments & Zero Withdrawal Fees',
      badge: 'RECOMMENDED FOR GOLD',
      url: 'https://www.exness.com/?partner_id=TheProfitsCircle'
    },
    {
      id: 'b2',
      name: 'IC Markets Global',
      type: 'Forex, Indices & Commodities',
      leverage: '1:500 ECN',
      spreads: 'Ultra-Low Raw Spreads',
      perks: 'cTrader & MetaTrader 5 High Liquidity execution',
      badge: 'ECN BEST EXECUTION',
      url: 'https://www.icmarkets.com/?camp=TheProfitsCircle'
    },
    {
      id: 'b3',
      name: 'FTMO Prop Firm',
      type: 'Funded Trader Accounts',
      leverage: '1:100 Account Scale',
      spreads: '90% Profit Split',
      perks: 'Up to $200,000 Funded Account Scaling',
      badge: 'OFFICIAL PROP PARTNER',
      url: 'https://ftmo.com/?ref=TheProfitsCircle'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800/80 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-400" /> Recommended Brokers & Prop Firm Partners
        </h1>
        <p className="text-sm text-slate-400">Vetted institutional liquidity providers with raw spreads and fast execution for Profits Circle members.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {brokers.map((broker) => (
          <div key={broker.id} className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between transition-all">
            <div>
              <div className="flex justify-between items-start gap-2 mb-3">
                <h2 className="text-lg font-bold text-slate-100">{broker.name}</h2>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 uppercase">
                  {broker.badge}
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <div><span className="text-slate-500">Market:</span> {broker.type}</div>
                <div><span className="text-slate-500">Leverage:</span> {broker.leverage}</div>
                <div><span className="text-slate-500">Spreads:</span> <span className="text-emerald-400 font-bold">{broker.spreads}</span></div>
                <div className="pt-2 border-t border-slate-800/60 text-slate-400 font-sans text-xs">{broker.perks}</div>
              </div>
            </div>

            <a
              href={broker.url}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-950/30"
            >
              Open Partner Account <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
