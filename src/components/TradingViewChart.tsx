import React, { useEffect, useRef } from 'react';

interface TradingViewChartProps {
  symbol?: string;
  height?: number;
}

export const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol = 'OANDA:XAUUSD', height = 450 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    // Format symbol properly for TradingView widget
    let formattedSymbol = symbol;
    if (!symbol.includes(':')) {
      if (symbol.startsWith('BTC') || symbol.startsWith('ETH') || symbol.startsWith('SOL')) {
        formattedSymbol = `BINANCE:${symbol}`;
      } else if (symbol.includes('XAU') || symbol.includes('EUR') || symbol.includes('GBP')) {
        formattedSymbol = `OANDA:${symbol}`;
      } else {
        formattedSymbol = `NASDAQ:${symbol}`;
      }
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: formattedSymbol,
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
    <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
      <div
        className="tradingview-widget-container w-full min-h-[400px] h-[450px]"
        ref={containerRef}
      />
    </div>
  );
};
