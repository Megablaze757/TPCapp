import React, { useEffect, useState } from 'react';
import { Activity, Radio, TrendingUp, TrendingDown, Plus, Trash2, Search } from 'lucide-react';

interface CryptoTicker {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
}

export const Watchlist: React.FC = () => {
  const [tickers, setTickers] = useState<Record<string, CryptoTicker>>({
    XAUUSD: { symbol: 'XAUUSD', name: 'Spot Gold', price: 2652.40, change24h: 1.85, volume: 3890000000 },
    BTCUSDT: { symbol: 'BTCUSDT', name: 'Bitcoin', price: 63850.20, change24h: 2.45, volume: 1420500000 },
    ETHUSDT: { symbol: 'ETHUSDT', name: 'Ethereum', price: 2510.80, change24h: -1.12, volume: 850200000 },
    SOLUSDT: { symbol: 'SOLUSDT', name: 'Solana', price: 148.75, change24h: 5.60, volume: 420100000 },
    EURUSD: { symbol: 'EURUSD', name: 'Euro / US Dollar', price: 1.0885, change24h: 0.35, volume: 950000000 },
    NVDA: { symbol: 'NVDA', name: 'NVIDIA Corp', price: 124.50, change24h: 3.80, volume: 2100000000 },
  });
  const [newSymbolInput, setNewSymbolInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Binance WebSocket streaming for crypto tickers
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr');

    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    ws.onerror = () => setIsConnected(false);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          setTickers((prev) => {
            const updated = { ...prev };
            data.forEach((item: any) => {
              if (updated[item.s]) {
                const currentPrice = parseFloat(item.c);
                const openPrice = parseFloat(item.o);
                const change = openPrice > 0 ? ((currentPrice - openPrice) / openPrice) * 100 : 0;
                updated[item.s] = {
                  ...updated[item.s],
                  price: currentPrice,
                  change24h: parseFloat(change.toFixed(2)),
                  volume: parseFloat(item.q)
                };
              }
            });
            return updated;
          });
        }
      } catch (err) {
        // ignore json parse error
      }
    };

    return () => ws.close();
  }, []);

  const handleAddSymbol = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSym = newSymbolInput.trim().toUpperCase();
    if (cleanSym && !tickers[cleanSym]) {
      setTickers((prev) => ({
        ...prev,
        [cleanSym]: {
          symbol: cleanSym,
          name: `${cleanSym} Asset`,
          price: cleanSym.startsWith('BTC') ? 63800 : cleanSym.includes('XAU') ? 2650 : 150.00,
          change24h: 1.25,
          volume: 500000000
        }
      }));
      setNewSymbolInput('');
    }
  };

  const handleDeleteSymbol = (sym: string) => {
    setTickers((prev) => {
      const copy = { ...prev };
      delete copy[sym];
      return copy;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100 flex items-center gap-2">
            <Activity className="w-6 h-6 text-amber-400 fill-amber-400/20" /> Live Market Watchlist & Custom Ticker Adder
          </h1>
          <p className="text-sm text-slate-400">Binance WebSocket real-time tick streaming & custom asset monitoring.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl shadow-md">
          <Radio className={`w-3.5 h-3.5 ${isConnected ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
          <span className={isConnected ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
            {isConnected ? 'LIVE WS TICKER CONNECTED' : 'WS STREAM READY'}
          </span>
        </div>
      </div>

      {/* Add Custom Symbol Input Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <form onSubmit={handleAddSymbol} className="flex items-center gap-3 text-xs font-mono">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Add custom symbol to live watchlist (e.g. AAPL, AMZN, SOLUSDT, GBPUSD)..."
              value={newSymbolInput}
              onChange={(e) => setNewSymbolInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-100 uppercase font-bold focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-amber-950/40 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add Symbol
          </button>
        </form>
      </div>

      {/* Watchlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(tickers).map((t) => (
          <div key={t.symbol} className="bg-slate-900/80 border border-slate-800/80 hover:border-amber-500/40 rounded-2xl p-5 transition-all shadow-xl flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-extrabold text-slate-100 text-lg font-mono flex items-center gap-2">
                  {t.symbol}
                  {t.symbol === 'XAUUSD' && <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-mono">GOLD</span>}
                </div>
                <div className="text-xs text-slate-500 font-sans">{t.name}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black font-mono ${
                  t.change24h >= 0 ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60' : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                }`}>
                  {t.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {t.change24h >= 0 ? '+' : ''}{t.change24h}%
                </div>
                <button
                  onClick={() => handleDeleteSymbol(t.symbol)}
                  className="text-slate-600 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
                  title="Remove Symbol"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-end border-t border-slate-800/60 pt-3 font-mono">
              <div>
                <div className="text-[10px] text-slate-500 uppercase">Market Price</div>
                <div className="text-2xl font-black text-slate-100 mt-0.5">
                  ${t.price > 1 ? t.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : t.price.toFixed(4)}
                </div>
              </div>
              <div className="text-right text-xs text-slate-500">
                24h Vol: ${(t.volume / 1e6).toFixed(1)}M
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
