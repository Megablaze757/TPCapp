import React, { useEffect, useState } from 'react';
import { Activity, Radio, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface CryptoTicker {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
}

export const Watchlist: React.FC = () => {
  const [tickers, setTickers] = useState<Record<string, CryptoTicker>>({
    BTCUSDT: { symbol: 'BTCUSDT', name: 'Bitcoin', price: 63850.20, change24h: 2.45, volume: 1420500000 },
    ETHUSDT: { symbol: 'ETHUSDT', name: 'Ethereum', price: 2510.80, change24h: -1.12, volume: 850200000 },
    SOLUSDT: { symbol: 'SOLUSDT', name: 'Solana', price: 148.75, change24h: 5.60, volume: 420100000 },
    BNBUSDT: { symbol: 'BNBUSDT', name: 'Binance Coin', price: 578.40, change24h: 0.85, volume: 190000000 },
    DOGEUSDT: { symbol: 'DOGEUSDT', name: 'Dogecoin', price: 0.1145, change24h: 3.20, volume: 110000000 },
    XRPUSDT: { symbol: 'XRPUSDT', name: 'Ripple', price: 0.5420, change24h: -0.45, volume: 230000000 },
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Binance WebSocket streaming
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
        // ignore json parse glitch
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-400" /> Live Market Watchlist
          </h1>
          <p className="text-sm text-slate-400">Real-time crypto tick streaming via Binance WebSocket & Stock benchmarks.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <Radio className={`w-3.5 h-3.5 ${isConnected ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
          <span className={isConnected ? 'text-emerald-400' : 'text-slate-400'}>
            {isConnected ? 'LIVE WS CONNECTED' : 'CONNECTING WS...'}
          </span>
        </div>
      </div>

      {/* Crypto Realtime Grid */}
      <div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Crypto Live Tickers (WebSocket)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(tickers).map((t) => (
            <div key={t.symbol} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all shadow-lg flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-100 text-lg">{t.symbol}</div>
                  <div className="text-xs text-slate-500">{t.name}</div>
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                  t.change24h >= 0 ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50' : 'bg-rose-950/80 text-rose-400 border border-rose-800/50'
                }`}>
                  {t.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {t.change24h >= 0 ? '+' : ''}{t.change24h}%
                </div>
              </div>

              <div className="mt-4 flex justify-between items-end">
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">Last Price</div>
                  <div className="text-2xl font-bold font-mono text-slate-100">
                    ${t.price > 1 ? t.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : t.price.toFixed(4)}
                  </div>
                </div>
                <div className="text-right text-xs text-slate-500 font-mono">
                  Vol: ${(t.volume / 1e6).toFixed(1)}M
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Indices & Forex Benchmark Cards */}
      <div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Macro Benchmarks & Indices (Cached)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-500">S&P 500 (SPY)</div>
            <div className="text-lg font-bold font-mono text-slate-200 mt-1">$572.40</div>
            <div className="text-xs text-emerald-400 mt-0.5">+0.65% Today</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-500">Nasdaq (QQQ)</div>
            <div className="text-lg font-bold font-mono text-slate-200 mt-1">$488.10</div>
            <div className="text-xs text-emerald-400 mt-0.5">+1.12% Today</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-500">Vol Index (VIX)</div>
            <div className="text-lg font-bold font-mono text-slate-200 mt-1">15.42</div>
            <div className="text-xs text-rose-400 mt-0.5">-2.10% (Low Vol)</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-500">US Dollar (DXY)</div>
            <div className="text-lg font-bold font-mono text-slate-200 mt-1">101.85</div>
            <div className="text-xs text-slate-400 mt-0.5">Neutral Range</div>
          </div>
        </div>
      </div>
    </div>
  );
};
