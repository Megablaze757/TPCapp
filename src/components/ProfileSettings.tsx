import React, { useState } from 'react';
import { useTradeStore } from '../store/useTradeStore';
import { User } from 'lucide-react';

export const ProfileSettings: React.FC = () => {
  const { profile, updateProfile } = useTradeStore();
  const [username, setUsername] = useState(profile.username);
  const [startingCapital, setStartingCapital] = useState(profile.startingCapital);
  const [riskPerTrade, setRiskPerTrade] = useState(profile.riskPerTrade);
  const [timezone, setTimezone] = useState(profile.timezone);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      username,
      startingCapital: Number(startingCapital),
      riskPerTrade: Number(riskPerTrade),
      timezone
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <User className="w-6 h-6 text-emerald-400" /> Profile & Risk Settings
        </h1>
        <p className="text-sm text-slate-400">Configure starting capital, default risk rules, and timezone preferences.</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl text-sm">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Trader Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Starting Capital ($)</label>
            <input
              type="number"
              value={startingCapital}
              onChange={(e) => setStartingCapital(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Default Risk Per Trade (%)</label>
            <input
              type="number"
              step="0.1"
              value={riskPerTrade}
              onChange={(e) => setRiskPerTrade(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Preferred Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York (EST)</option>
            <option value="Europe/London">Europe/London (GMT/BST)</option>
            <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
          </select>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {saved ? (
            <span className="text-xs font-medium text-emerald-400">Settings updated successfully!</span>
          ) : (
            <span />
          )}
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-emerald-950/40"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
