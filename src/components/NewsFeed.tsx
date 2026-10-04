import React, { useState } from 'react';
import { Newspaper, Flame, ExternalLink, Clock, RefreshCw } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  category: 'Gold' | 'Crypto' | 'Forex' | 'Fed / Economy';
  impact: 'HIGH' | 'MEDIUM';
  summary: string;
  url: string;
}

export const NewsFeed: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');

  const news: NewsItem[] = [
    {
      id: 'n1',
      title: 'Gold (XAUUSD) Surges Past $2,650 as Safe-Haven Demand Accelerates',
      source: 'Bloomberg Markets',
      time: '12 mins ago',
      category: 'Gold',
      impact: 'HIGH',
      summary: 'Spot Gold posted fresh session highs following softer US inflation data and rate cut expectations from the Federal Reserve.',
      url: 'https://www.bloomberg.com/markets'
    },
    {
      id: 'n2',
      title: 'Bitcoin Reclaims $64,000 as Institutional ETF Inflows Hit 4-Month High',
      source: 'CoinDesk Pro',
      time: '28 mins ago',
      category: 'Crypto',
      impact: 'HIGH',
      summary: 'Spot Bitcoin ETFs recorded $420M in net daily inflows led by BlackRock IBIT, driving BTC funding rates back into bullish territory.',
      url: 'https://www.coindesk.com'
    },
    {
      id: 'n3',
      title: 'Federal Reserve Signals Potential 50bps Rate Cut at Upcoming FOMC',
      source: 'Reuters Financial',
      time: '1 hour ago',
      category: 'Fed / Economy',
      impact: 'HIGH',
      summary: 'Fed officials noted cooling labor market conditions, opening the door for aggressive monetary easing in Q4.',
      url: 'https://www.reuters.com/business'
    },
    {
      id: 'n4',
      title: 'EURUSD Retests 1.0880 Key Resistance Ahead of ECB Lagarde Speech',
      source: 'ForexFactory Live',
      time: '2 hours ago',
      category: 'Forex',
      impact: 'MEDIUM',
      summary: 'European currency traders brace for ECB commentary following Eurozone PMI flash estimates.',
      url: 'https://www.forexfactory.com'
    }
  ];

  const filteredNews = filter === 'ALL' ? news : news.filter(n => n.category.toUpperCase() === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100 flex items-center gap-2 tracking-tight">
            <Newspaper className="w-6 h-6 text-amber-400 fill-amber-400/20" /> Real-Time Market News & Macro Feed
          </h1>
          <p className="text-sm text-slate-400">Institutional news aggregation, central bank updates, and high-impact market drivers.</p>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-mono">
          {['ALL', 'GOLD', 'CRYPTO', 'FOREX', 'FED / ECONOMY'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filter === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNews.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="bg-slate-900/90 border border-slate-800/80 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition-all block group space-y-3"
          >
            <div className="flex justify-between items-start gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider ${
                item.impact === 'HIGH' ? 'bg-rose-950 text-rose-400 border border-rose-800/60' : 'bg-amber-950 text-amber-400 border border-amber-800/60'
              }`}>
                {item.impact} IMPACT • {item.category}
              </span>
              <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3" /> {item.time}
              </span>
            </div>

            <h2 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors leading-snug">
              {item.title}
            </h2>

            <p className="text-xs text-slate-400 leading-relaxed">
              {item.summary}
            </p>

            <div className="pt-2 flex justify-between items-center text-[11px] text-slate-500 font-mono border-t border-slate-800/60">
              <span>Source: <strong className="text-slate-300 font-sans">{item.source}</strong></span>
              <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:underline">
                Read Source <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
