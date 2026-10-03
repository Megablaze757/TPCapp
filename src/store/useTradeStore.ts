import { create } from 'zustand';
import { Trade, UserProfile } from '../types';

interface TradeState {
  trades: Trade[];
  profile: UserProfile;
  addTrade: (trade: Omit<Trade, 'id' | 'pnl'>) => void;
  deleteTrade: (id: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const initialTrades: Trade[] = [
  {
    id: '1',
    symbol: 'BTCUSDT',
    assetClass: 'Crypto',
    direction: 'Long',
    entryPrice: 62000,
    exitPrice: 64500,
    size: 0.5,
    stopLoss: 61000,
    takeProfit: 65000,
    pnl: 1250,
    setupType: 'Breakout',
    qualityScore: 'A+',
    notes: 'Clean 4H resistance breakout with strong volume.',
    emotion: 'Disciplined',
    openedAt: '2026-10-01T09:30:00Z',
    closedAt: '2026-10-01T14:15:00Z'
  },
  {
    id: '2',
    symbol: 'NVDA',
    assetClass: 'US Stocks',
    direction: 'Short',
    entryPrice: 125.50,
    exitPrice: 122.00,
    size: 100,
    stopLoss: 127.00,
    takeProfit: 120.00,
    pnl: 350,
    setupType: 'Mean Reversion',
    qualityScore: 'A',
    notes: 'Overextended at market open, VWAP rejection.',
    emotion: 'Calm',
    openedAt: '2026-10-02T13:30:00Z',
    closedAt: '2026-10-02T15:45:00Z'
  },
  {
    id: '3',
    symbol: 'EURUSD',
    assetClass: 'Forex',
    direction: 'Long',
    entryPrice: 1.0850,
    exitPrice: 1.0820,
    size: 100000,
    stopLoss: 1.0830,
    takeProfit: 1.0900,
    pnl: -300,
    setupType: 'Liquidity Grab',
    qualityScore: 'C',
    notes: 'Chased entry ahead of NFP news release.',
    emotion: 'FOMO',
    openedAt: '2026-10-03T08:00:00Z',
    closedAt: '2026-10-03T08:30:00Z'
  }
];

export const useTradeStore = create<TradeState>((set) => ({
  trades: initialTrades,
  profile: {
    username: 'TraderOne',
    startingCapital: 10000,
    riskPerTrade: 1.0,
    timezone: 'UTC'
  },
  addTrade: (newTrade) => set((state) => {
    const pnl = newTrade.direction === 'Long'
      ? (newTrade.exitPrice - newTrade.entryPrice) * newTrade.size
      : (newTrade.entryPrice - newTrade.exitPrice) * newTrade.size;
    const trade: Trade = {
      ...newTrade,
      id: Date.now().toString(),
      pnl: parseFloat(pnl.toFixed(2))
    };
    return { trades: [trade, ...state.trades] };
  }),
  deleteTrade: (id) => set((state) => ({
    trades: state.trades.filter((t) => t.id !== id)
  })),
  updateProfile: (updated) => set((state) => ({
    profile: { ...state.profile, ...updated }
  }))
}));
