export type TradeDirection = 'Long' | 'Short';
export type QualityScore = 'A+' | 'A' | 'B' | 'C';
export type AssetClass = 'Crypto' | 'US Stocks' | 'Forex';

export interface Trade {
  id: string;
  symbol: string;
  assetClass: AssetClass;
  direction: TradeDirection;
  entryPrice: number;
  exitPrice: number;
  size: number;
  stopLoss: number;
  takeProfit: number;
  pnl: number;
  setupType: string;
  qualityScore: QualityScore;
  notes: string;
  screenshotUrl?: string;
  emotion: string;
  openedAt: string;
  closedAt: string;
}

export interface UserProfile {
  username: string;
  startingCapital: number;
  riskPerTrade: number; // percentage e.g. 1.0
  timezone: string;
}
