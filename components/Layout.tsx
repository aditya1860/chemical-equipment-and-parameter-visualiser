
import React from 'react';
import { LogOut, LayoutDashboard, History, FlaskConical, ChevronRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  username: string;
  onLogout: () => void;
  onNavigate: (view: 'dashboard' | 'history') => void;
  currentView: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, username, onLogout, onNavigate, currentView }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FlaskConical size={24} />
          </div>
          <span className="font-bold text-lg tracking-tight">ChemEquip</span>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              currentView === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => onNavigate('history')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              currentView === 'history' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <History size={20} />
            <span className="font-medium">History</span>
          </button>
        </nav>

        <div className="p-4 bg-slate-800/50 m-4 rounded-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
              {username[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold truncate">{username}</p>
              <p className="text-xs text-slate-400">Plant Operator</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-500 text-sm">
            <span>Home</span>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-medium capitalize">{currentView}</span>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
