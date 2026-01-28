import React from 'react';
import {
  History,
  FileText,
  Calendar,
  ChevronRight,
  LayoutDashboard,
  Info,
  Sparkles
} from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryViewProps {
  history: HistoryItem[];
  onLoadSession: (session: HistoryItem) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onLoadSession
}) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 text-slate-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Analysis Timeline
        </h1>
        <p className="text-slate-400 mt-1">
          AI-assisted history of your recent equipment analysis sessions.
        </p>
      </div>

      {/* Empty State */}
      {history.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl py-24 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6">
            <History className="text-slate-500" size={40} />
          </div>
          <h3 className="text-xl font-bold">
            No Sessions Recorded
          </h3>
          <p className="text-slate-400 mt-2 max-w-sm">
            Once you analyze equipment data, your AI-generated
            sessions will appear here for quick reloading.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map(item => (
            <div
              key={item.id}
              onClick={() => onLoadSession(item)}
              className="group bg-slate-900 border border-slate-800 rounded-3xl p-6
              flex flex-col md:flex-row md:items-center md:justify-between
              gap-6 cursor-pointer transition
              hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
            >
              {/* Left */}
              <div className="flex items-start gap-5">
                <div
                  className="relative p-4 rounded-2xl bg-slate-800 text-blue-400
                  group-hover:bg-blue-600 group-hover:text-white transition"
                >
                  <FileText size={24} />
                </div>

                <div>
                  <h3 className="text-lg font-bold group-hover:text-blue-400 transition">
                    {item.fileName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(item.timestamp).toLocaleString()}
                    </span>

                    <span className="flex items-center gap-1">
                      <LayoutDashboard size={14} />
                      {item.stats.totalCount} Units
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-10 ml-auto">
                <div className="hidden md:flex gap-8 text-center text-xs uppercase tracking-wide text-slate-500">
                  <div>
                    <p className="text-lg font-bold text-slate-100">
                      {item.stats.avgFlowrate.toFixed(1)}
                    </p>
                    <p>Flow</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-100">
                      {item.stats.avgPressure.toFixed(1)}
                    </p>
                    <p>Pressure</p>
                  </div>
                </div>

                <div
                  className="p-2 rounded-full bg-slate-800
                  group-hover:bg-blue-500/20 group-hover:text-blue-400 transition"
                >
                  <ChevronRight size={22} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Box */}
      <div className="bg-gradient-to-r from-amber-900/40 to-slate-900
      border border-amber-800/40 rounded-3xl p-6 flex gap-4">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
          <Info size={18} />
        </div>
        <div>
          <h4 className="font-bold text-amber-300 mb-1 flex items-center gap-2">
            <Sparkles size={14} />
            Session Persistence
          </h4>
          <p className="text-sm text-amber-200/80 leading-relaxed">
            Analysis sessions are stored locally for fast retrieval.
            Export critical insights as PDF for long-term archival
            and compliance.
          </p>
        </div>
      </div>
    </div>
  );
};
