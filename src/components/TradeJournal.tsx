import React, { useState } from 'react';
import { useTradeStore } from '../store/useTradeStore';
import { TradeDirection, QualityScore, AssetClass } from '../types';
import { Plus, Trash2, Filter, Smile } from 'lucide-react';

export const TradeJournal: React.FC = () => {
  const { trades, addTrade, deleteTrade } = useTradeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterAsset, setFilterAsset] = useState<string>('All');

  const [formData, setFormData] = useState({
    symbol: 'BTCUSDT',
    assetClass: 'Crypto' as AssetClass,
    direction: 'Long' as TradeDirection,
    entryPrice: 60000,
    exitPrice: 62000,
    size: 0.1,
    stopLoss: 59000,
    takeProfit: 63000,
    setupType: 'Breakout',
    qualityScore: 'A+' as QualityScore,
    notes: '',
    emotion: 'Disciplined',
    openedAt: new Date().toISOString().slice(0, 16),
    closedAt: new Date().toISOString().slice(0, 16)
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTrade({
      symbol: formData.symbol.toUpperCase(),
      assetClass: formData.assetClass,
      direction: formData.direction,
      entryPrice: Number(formData.entryPrice),
      exitPrice: Number(formData.exitPrice),
      size: Number(formData.size),
      stopLoss: Number(formData.stopLoss),
      takeProfit: Number(formData.takeProfit),
      setupType: formData.setupType,
      qualityScore: formData.qualityScore,
      notes: formData.notes,
      emotion: formData.emotion,
      openedAt: new Date(formData.openedAt).toISOString(),
      closedAt: new Date(formData.closedAt).toISOString()
    });
    setIsModalOpen(false);
  };

  const filteredTrades = filterAsset === 'All'
    ? trades
    : trades.filter(t => t.assetClass === filterAsset);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Trade Journal</h1>
          <p className="text-sm text-slate-400">Log, track, and review your trading execution.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-emerald-950/30"
        >
          <Plus className="w-4 h-4" /> Log New Trade
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Filter className="w-4 h-4" />
        <span>Asset Filter:</span>
        {['All', 'Crypto', 'US Stocks', 'Forex'].map((asset) => (
          <button
            key={asset}
            onClick={() => setFilterAsset(asset)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              filterAsset === asset
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {asset}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/60 text-xs uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Symbol</th>
                <th className="p-4">Direction</th>
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
                <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-xs text-slate-400">
                    {new Date(t.openedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-semibold text-slate-100">
                    {t.symbol} <span className="text-xs font-normal text-slate-500">({t.assetClass})</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                      t.direction === 'Long' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50' : 'bg-rose-950/80 text-rose-400 border border-rose-800/50'
                    }`}>
                      {t.direction}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs text-slate-300">
                    ${t.entryPrice.toLocaleString()} → ${t.exitPrice.toLocaleString()}
                  </td>
                  <td className="p-4 font-mono text-xs text-slate-300">{t.size}</td>
                  <td className={`p-4 font-bold font-mono ${t.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {t.pnl >= 0 ? '+' : ''}${t.pnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-4 text-xs text-slate-300">{t.setupType}</td>
                  <td className="p-4">
                    <span className="bg-slate-800 text-amber-400 px-2 py-0.5 rounded text-xs font-bold border border-slate-700">
                      {t.qualityScore}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-slate-400 flex items-center gap-1">
                    <Smile className="w-3.5 h-3.5 text-indigo-400" /> {t.emotion}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteTrade(t.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-100 mb-4">Log Trade Entry</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Symbol</label>
                  <input
                    type="text"
                    required
                    value={formData.symbol}
                    onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Asset Class</label>
                  <select
                    value={formData.assetClass}
                    onChange={(e) => setFormData({ ...formData, assetClass: e.target.value as AssetClass })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Crypto">Crypto</option>
                    <option value="US Stocks">US Stocks</option>
                    <option value="Forex">Forex</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Direction</label>
                  <select
                    value={formData.direction}
                    onChange={(e) => setFormData({ ...formData, direction: e.target.value as TradeDirection })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Long">Long</option>
                    <option value="Short">Short</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Position Size</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Entry Price ($)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.entryPrice}
                    onChange={(e) => setFormData({ ...formData, entryPrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Exit Price ($)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.exitPrice}
                    onChange={(e) => setFormData({ ...formData, exitPrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Setup Type</label>
                  <input
                    type="text"
                    value={formData.setupType}
                    onChange={(e) => setFormData({ ...formData, setupType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Quality Score</label>
                  <select
                    value={formData.qualityScore}
                    onChange={(e) => setFormData({ ...formData, qualityScore: e.target.value as QualityScore })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Emotion Tag</label>
                <input
                  type="text"
                  value={formData.emotion}
                  onChange={(e) => setFormData({ ...formData, emotion: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Disciplined, FOMO, Patient, Revenge"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Trade Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  placeholder="Key reflections, market context, execution notes..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-medium transition-colors"
                >
                  Save Trade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
