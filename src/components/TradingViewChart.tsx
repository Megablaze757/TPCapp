import React, { useEffect, useRef } from 'react';

interface TradingViewChartProps {
  symbol?: string;
  height?: number;
}

export const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol = 'BINANCE:BTCUSDT', height = 400 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      enable_publishing: false,
      allow_symbol_change: true,
      calendar: false,
      support_host: 'https://www.tradingview.com'
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="w-full bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl p-1">
      <div className="tradingview-widget-container" ref={containerRef} style={{ height: `${height}px`, width: '100%' }} />
    </div>
  );
};
