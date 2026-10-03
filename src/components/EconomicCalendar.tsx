import React from 'react';
import { Calendar, AlertTriangle, Clock, Globe } from 'lucide-react';

interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  event: string;
  impact: 'High' | 'Medium' | 'Low';
  forecast: string;
  previous: string;
}

export const EconomicCalendar: React.FC = () => {
  const events: EconomicEvent[] = [
    {
      id: 'e1',
      time: '12:30 UTC',
      currency: 'USD',
      event: 'Core CPI (MoM)',
      impact: 'High',
      forecast: '0.3%',
      previous: '0.2%'
    },
    {
      id: 'e2',
      time: '14:00 UTC',
      currency: 'USD',
      event: 'FED Interest Rate Decision',
      impact: 'High',
      forecast: '5.25%',
      previous: '5.50%'
    },
    {
      id: 'e3',
      time: '15:30 UTC',
      currency: 'EUR',
      event: 'ECB President Lagarde Speaks',
      impact: 'Medium',
      forecast: '-',
      previous: '-'
    },
    {
      id: 'e4',
      time: '18:00 UTC',
      currency: 'USD',
      event: 'FOMC Press Conference',
      impact: 'High',
      forecast: '-',
      previous: '-'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-400" /> High-Impact Macro Economic Calendar
        </h2>
        <span className="text-xs text-slate-500 font-mono">Updated Weekly via Cloudflare Worker</span>
      </div>

      <div className="space-y-3">
        {events.map((evt) => (
          <div key={evt.id} className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-slate-400 font-sans font-semibold">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> {evt.time}
              </div>
              <span className="font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded font-mono">{evt.currency}</span>
              <span className="font-sans text-slate-200 font-medium">{evt.event}</span>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <span className={`px-2 py-0.5 rounded font-sans text-[10px] font-bold uppercase tracking-wider ${
                evt.impact === 'High' ? 'bg-rose-950 text-rose-400 border border-rose-800/50' :
                evt.impact === 'Medium' ? 'bg-amber-950 text-amber-400 border border-amber-800/50' :
                'bg-slate-800 text-slate-400'
              }`}>
                {evt.impact} Impact
              </span>
              <div className="text-slate-400 hidden sm:block">
                Fcst: <span className="text-slate-200 font-bold">{evt.forecast}</span> | Prev: <span className="text-slate-400">{evt.previous}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
