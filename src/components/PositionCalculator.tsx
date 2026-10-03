import React, { useState } from 'react';
import { useTradeStore } from '../store/useTradeStore';
import { Calculator, AlertCircle, CheckCircle2 } from 'lucide-react';

export const PositionCalculator: React.FC = () => {
  const { profile } = useTradeStore();
  const [accountSize, setAccountSize] = useState<number>(profile.startingCapital);
  const [riskPercent, setRiskPercent] = useState<number>(profile.riskPerTrade);
  const [entryPrice, setEntryPrice] = useState<number>(62000);
  const [stopLoss, setStopLoss] = useState<number>(61000);
  const [targetPrice, setTargetPrice] = useState<number>(65000);

  const riskAmount = (accountSize * riskPercent) / 100;
  const priceDistance = Math.abs(entryPrice - stopLoss);
  const positionSize = priceDistance > 0 ? riskAmount / priceDistance : 0;
  const positionValue = positionSize * entryPrice;
  const rewardDistance = Math.abs(targetPrice - entryPrice);
  const riskRewardRatio = priceDistance > 0 ? rewardDistance / priceDistance : 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-emerald-400" /> Position Size & Risk Calculator
        </h1>
        <p className="text-sm text-slate-400">Calculate exact lot size, position value, and risk/reward ratio before entering a trade.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl">
          <h2 className="text-base font-semibold text-slate-200">Trade Inputs</h2>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Account Size ($)</label>
            <input
              type="number"
              value={accountSize}
              onChange={(e) => setAccountSize(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Risk Per Trade (%)</label>
            <input
              type="number"
              step="0.1"
              value={riskPercent}
              onChange={(e) => setRiskPercent(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Entry Price ($)</label>
              <input
                type="number"
                step="any"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Stop Loss ($)</label>
              <input
                type="number"
                step="any"
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Take Profit Target ($)</label>
            <input
              type="number"
              step="any"
              value={targetPrice}
              onChange={(e) => setTargetPrice(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono text-sm"
            />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 flex flex-col justify-between shadow-xl">
          <div>
            <h2 className="text-base font-semibold text-slate-200 mb-4">Recommended Position</h2>
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-4">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Maximum Risk Amount</div>
                <div className="text-2xl font-bold font-mono text-rose-400">${riskAmount.toFixed(2)}</div>
                <div className="text-xs text-slate-500 mt-1">{riskPercent}% of ${accountSize.toLocaleString()} balance</div>
              </div>

              <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-4">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Calculated Position Size (Units)</div>
                <div className="text-2xl font-bold font-mono text-emerald-400">{positionSize.toFixed(4)}</div>
                <div className="text-xs text-slate-500 mt-1">Notional Value: ${positionValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
              </div>

              <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-4">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Risk : Reward Ratio</div>
                <div className={`text-2xl font-bold font-mono ${riskRewardRatio >= 2 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  1 : {riskRewardRatio.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex items-center gap-2 text-xs text-slate-400">
            {riskRewardRatio >= 2 ? (
              <><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> <span>High quality setup (&gt; 1:2 R:R).</span></>
            ) : (
              <><AlertCircle className="w-4 h-4 text-amber-400 shrink-0" /> <span>Sub-optimal R:R ratio (&lt; 1:2).</span></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
