
import React from 'react';
import { History, FileText, Calendar, ChevronRight, LayoutDashboard } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryViewProps {
  history: HistoryItem[];
  onLoadSession: (session: HistoryItem) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ history, onLoadSession }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analysis History</h1>
        <p className="text-slate-500">View and reload your last 5 analysis sessions.</p>
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-slate-200">
          <div className="bg-slate-50 p-6 rounded-full mb-6">
            <History className="text-slate-300" size={48} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No History Yet</h3>
          <p className="text-slate-500 mt-2">Upload your first dataset to see it listed here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {history.map((item) => (
            <div 
              key={item.id}
              onClick={() => onLoadSession(item)}
              className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-6">
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.fileName}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(item.timestamp).toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <LayoutDashboard size={14} />
                      <span>{item.stats.totalCount} Units</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-8 mr-4">
                <div className="hidden md:flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <div className="text-center">
                    <p className="text-slate-900 text-base font-bold">{item.stats.avgFlowrate.toFixed(1)}</p>
                    <p>Flow</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-900 text-base font-bold">{item.stats.avgPressure.toFixed(1)}</p>
                    <p>Press</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-2 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start space-x-4">
        <div className="bg-amber-500/10 p-2 rounded-lg text-amber-600">
          <History size={20} />
        </div>
        <div>
          <h4 className="text-amber-900 font-bold mb-1">Session Management</h4>
          <p className="text-sm text-amber-700/80 leading-relaxed">
            Historical sessions are stored locally in your browser cache. For compliance and persistence across workstations, ensure you export critical reports as PDF before ending your shift. 
          </p>
        </div>
      </div>
    </div>
  );
};
