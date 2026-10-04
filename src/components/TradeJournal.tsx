import React, { useState } from 'react';
import { useTradeStore } from '../store/useTradeStore';
import { TradeDirection, QualityScore, AssetClass } from '../types';
import { Plus, Trash2, Filter, Zap, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react';

export const TradeJournal: React.FC = () => {
  const { trades, addTrade, deleteTrade } = useTradeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterAsset, setFilterAsset] = useState<string>('All');

  // Fast 1-click state
  const [symbol, setSymbol] = useState<string>('XAUUSD');
  const [assetClass, setAssetClass] = useState<AssetClass>('Forex');
  const [direction, setDirection] = useState<TradeDirection>('Long');
  const [entryPrice, setEntryPrice] = useState<number>(2650.00);
  const [exitPrice, setExitPrice] = useState<number>(2665.00);
  const [size, setSize] = useState<number>(1.0);
  const [pnlOverride, setPnlOverride] = useState<string>('1500');
  const [setupType, setSetupType] = useState<string>('London Breakout');
  const [qualityScore, setQualityScore] = useState<QualityScore>('A+');
  const [emotion, setEmotion] = useState<string>('🔥 Disciplined');

  const handleFastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTrade({
      symbol: symbol.toUpperCase(),
      assetClass,
      direction,
      entryPrice: Number(entryPrice),
      exitPrice: Number(exitPrice),
      size: Number(size),
      stopLoss: Number(entryPrice) * 0.99,
      takeProfit: Number(exitPrice) * 1.01,
      setupType,
      qualityScore,
      notes: 'Quick logged trade via Fast HUD',
      emotion,
      openedAt: new Date().toISOString(),
      closedAt: new Date().toISOString()
    });
    setIsModalOpen(false);
  };

  const filteredTrades = filterAsset === 'All'
    ? trades
    : trades.filter(t => t.assetClass === filterAsset);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100 flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400 fill-amber-400/20" /> Fast Trade Journal HUD
          </h1>
          <p className="text-sm text-slate-400">5-second trade execution logging with 1-click presets.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-amber-950/40 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Fast Log Trade (5s)
        </button>
      </div>

      {/* Asset Filter Bar */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Filter className="w-4 h-4 text-amber-400" />
        <span>Filter:</span>
        {['All', 'Forex', 'Crypto', 'US Stocks'].map((asset) => (
          <button
            key={asset}
            onClick={() => setFilterAsset(asset)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterAsset === asset
                ? 'bg-slate-800 text-amber-400 border border-amber-500/30 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {asset}
          </button>
        ))}
      </div>

      {/* Trades Log Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 font-mono">
            <thead className="bg-slate-950/80 text-[11px] uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Asset</th>
                <th className="p-4">Type</th>
                <th className="p-4">Entry / Exit</th>
                <th className="p-4">Size</th>
                <th className="p-4">P&L ($)</th>
                <th className="p-4">Setup</th>
                <th className="p-4">Quality</th>
                <th className="p-4">Emotion</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTrades.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 text-xs text-slate-500">
                    {new Date(t.openedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-bold text-slate-100 font-sans">
                    {t.symbol} <span className="text-[10px] text-slate-500 font-mono">({t.assetClass})</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold ${
                      t.direction === 'Long' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60' : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                    }`}>
                      {t.direction === 'Long' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {t.direction}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-slate-300">
                    ${t.entryPrice.toLocaleString()} → ${t.exitPrice.toLocaleString()}
                  </td>
                  <td className="p-4 text-xs text-slate-300">{t.size}</td>
                  <td className={`p-4 font-extrabold text-base ${t.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {t.pnl >= 0 ? '+' : ''}${t.pnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-4 text-xs font-sans text-slate-300">{t.setupType}</td>
                  <td className="p-4">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-xs font-bold">
                      {t.qualityScore}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-slate-300 font-sans">{t.emotion}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteTrade(t.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1.5"
                      title="Delete Trade"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAST 1-CLICK TRADE LOGGER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800/90 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400 fill-amber-400/20" /> Fast 1-Click Trade Logger
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200 text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleFastSubmit} className="space-y-4 text-xs font-sans">
              {/* Symbol Presets */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Quick Symbol Select</label>
                <div className="grid grid-cols-4 gap-2 font-mono font-bold">
                  {['XAUUSD', 'BTCUSDT', 'EURUSD', 'NVDA'].map((sym) => (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => {
                        setSymbol(sym);
                        setAssetClass(sym === 'XAUUSD' || sym === 'EURUSD' ? 'Forex' : sym === 'BTCUSDT' ? 'Crypto' : 'US Stocks');
                        if (sym === 'XAUUSD') { setEntryPrice(2650); setExitPrice(2665); }
                        if (sym === 'BTCUSDT') { setEntryPrice(63500); setExitPrice(64800); }
                        if (sym === 'EURUSD') { setEntryPrice(1.0850); setExitPrice(1.0890); }
                        if (sym === 'NVDA') { setEntryPrice(122); setExitPrice(125); }
                      }}
                      className={`py-2 rounded-xl border text-center transition-all ${
                        symbol === sym ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-950/40' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {sym}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direction Presets */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Direction</label>
                <div className="grid grid-cols-2 gap-2 font-bold font-mono text-sm">
                  <button
                    type="button"
                    onClick={() => setDirection('Long')}
                    className={`py-2.5 rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                      direction === 'Long' ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-950/50' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" /> LONG (BUY)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirection('Short')}
                    className={`py-2.5 rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                      direction === 'Short' ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-950/50' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    <ArrowDownRight className="w-4 h-4" /> SHORT (SELL)
                  </button>
                </div>
              </div>

              {/* Entry / Exit Prices */}
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 uppercase">Entry Price ($)</label>
                  <input
                    type="number"
                    step="any"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 uppercase">Exit Price ($)</label>
                  <input
                    type="number"
                    step="any"
                    value={exitPrice}
                    onChange={(e) => setExitPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Emotion Tag Presets */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Emotion State</label>
                <div className="grid grid-cols-3 gap-2 font-bold text-[11px]">
                  {['🔥 Disciplined', '🎯 Sniper Entry', '🚀 FOMO Reaction'].map((emo) => (
                    <button
                      key={emo}
                      type="button"
                      onClick={() => setEmotion(emo)}
                      className={`py-2 px-1 rounded-xl border text-center transition-all ${
                        emotion === emo ? 'bg-slate-800 text-amber-400 border-amber-500/40 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {emo}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-6 py-2 rounded-xl text-xs transition-all shadow-lg shadow-amber-950/50"
                >
                  Save Fast Trade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
