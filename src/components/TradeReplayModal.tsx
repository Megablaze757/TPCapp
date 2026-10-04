import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, FastForward, CheckCircle2, ArrowUpRight, ArrowDownRight, X } from 'lucide-react';
import { Trade } from '../types';

interface TradeReplayModalProps {
  trade: Trade;
  onClose: () => void;
}

export const TradeReplayModal: React.FC<TradeReplayModalProps> = ({ trade, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState(0);

  // Generate simulated candle steps for execution replay
  const totalSteps = 20;
  const basePrice = trade.entryPrice;
  const targetPrice = trade.exitPrice;
  const priceDelta = (targetPrice - basePrice) / totalSteps;

  const simulatedCandles = Array.from({ length: totalSteps + 1 }).map((_, i) => {
    const currentPrice = basePrice + priceDelta * i + (Math.sin(i) * (basePrice * 0.001));
    const runningPnl = trade.direction === 'Long'
      ? (currentPrice - trade.entryPrice) * trade.size
      : (trade.entryPrice - currentPrice) * trade.size;
    return {
      step: i,
      price: currentPrice,
      pnl: parseFloat(runningPnl.toFixed(2))
    };
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= totalSteps) {
            setIsPlaying(false);
            return totalSteps;
          }
          return prev + 1;
        });
      }, 800 / speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  const activeCandle = simulatedCandles[currentStep];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 shadow-2xl space-y-5">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <div className="text-xs text-amber-400 font-mono font-bold uppercase tracking-wider">CANDLE-BY-CANDLE TRADE REPLAY</div>
            <h2 className="text-xl font-black text-slate-100 flex items-center gap-2 mt-0.5">
              {trade.symbol} <span className="text-xs font-mono text-slate-400">({trade.direction})</span>
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Replay Display Screen */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 font-mono relative overflow-hidden">
          <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800/80 pb-3">
            <div>Entry: <span className="text-slate-100 font-bold">${trade.entryPrice.toLocaleString()}</span></div>
            <div>Current Bar: <span className="text-amber-400 font-bold">${activeCandle.price.toFixed(2)}</span></div>
            <div>Target: <span className="text-emerald-400 font-bold">${trade.takeProfit.toLocaleString()}</span></div>
          </div>

          {/* Live P&L HUD in Replay */}
          <div className="text-center space-y-1 py-4">
            <div className="text-xs text-slate-500 uppercase tracking-widest">Running Trade P&L</div>
            <div className={`text-4xl font-extrabold ${activeCandle.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {activeCandle.pnl >= 0 ? '+' : ''}${activeCandle.pnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-400 font-sans">Bar {currentStep} of {totalSteps} Execution Sequence</div>
          </div>

          {/* Simulated Candle Visualizer Bar */}
          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800 flex">
            <div
              className="bg-gradient-to-r from-amber-500 via-teal-400 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-wrap justify-between items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-amber-950/40"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>
            <button
              onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-xl transition-all"
              title="Reset Replay"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-sans">Speed:</span>
            {[1, 2, 5].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all ${ 
                  speed === s ? 'bg-slate-800 text-amber-400 border-amber-500/30' : 'text-slate-500 border-slate-800'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
