-- Profits Circle Trader — Production Supabase PostgreSQL Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  starting_capital NUMERIC DEFAULT 10000,
  risk_per_trade NUMERIC DEFAULT 1.0,
  timezone TEXT DEFAULT 'UTC',
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free','pro','elite')),
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trades Table
CREATE TABLE IF NOT EXISTS public.trades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  symbol TEXT NOT NULL,
  asset_class TEXT CHECK (asset_class IN ('Crypto','US Stocks','Forex')),
  direction TEXT CHECK (direction IN ('Long','Short')),
  entry_price NUMERIC NOT NULL,
  exit_price NUMERIC NOT NULL,
  size NUMERIC NOT NULL,
  stop_loss NUMERIC,
  take_profit NUMERIC,
  pnl NUMERIC NOT NULL,
  setup_type TEXT,
  quality_score TEXT CHECK (quality_score IN ('A+','A','B','C')),
  notes TEXT,
  screenshot_url TEXT,
  emotion TEXT,
  opened_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trade Context Table (auto-populated via Worker/Edge Function)
CREATE TABLE IF NOT EXISTS public.trade_context (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_id UUID REFERENCES public.trades(id) ON DELETE CASCADE UNIQUE NOT NULL,
  session TEXT,
  vix_level NUMERIC,
  dxy_direction TEXT,
  news_event TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Credits Table
CREATE TABLE IF NOT EXISTS public.user_credits (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  balance INTEGER DEFAULT 20,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leaderboard Materialized View
CREATE MATERIALIZED VIEW IF NOT EXISTS public.leaderboard_stats AS
SELECT
  user_id,
  SUM(pnl) AS total_pnl,
  COUNT(*) AS total_trades,
  COUNT(*) FILTER (WHERE pnl > 0) * 100.0 / NULLIF(COUNT(*), 0) AS win_rate,
  AVG(pnl) FILTER (WHERE pnl > 0) AS avg_win,
  AVG(pnl) FILTER (WHERE pnl < 0) AS avg_loss
FROM public.trades
GROUP BY user_id;

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_context ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage own trades" ON public.trades FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own credits" ON public.user_credits FOR SELECT USING (auth.uid() = user_id);
