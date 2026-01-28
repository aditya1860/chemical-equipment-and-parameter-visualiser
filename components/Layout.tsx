import React, { useState } from 'react';
import {
  LogOut,
  LayoutDashboard,
  History,
  FlaskConical,
  ChevronRight,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  username: string;
  onLogout: () => void;
  onNavigate: (view: 'dashboard' | 'history') => void;
  currentView: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  username,
  onLogout,
  onNavigate,
  currentView
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const NavButton = ({
    label,
    icon: Icon,
    view
  }: {
    label: string;
    icon: React.ElementType;
    view: 'dashboard' | 'history';
  }) => {
    const active = currentView === view;

    return (
      <button
        onClick={() => {
          onNavigate(view);
          setSidebarOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
          ${
            active
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </button>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 h-full w-72 bg-slate-900 border-r border-slate-800
        flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-md opacity-40 rounded-xl" />
            <div className="relative bg-slate-950 border border-blue-500/40 p-3 rounded-xl">
              <FlaskConical size={24} className="text-blue-400" />
            </div>
          </div>
          <div>
            <p className="font-bold text-lg tracking-tight">
              ChemEquip
            </p>
            <p className="text-xs text-slate-400">
              AI Equipment Analytics
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavButton
            label="Overview"
            icon={LayoutDashboard}
            view="dashboard"
          />
          <NavButton
            label="Analysis Timeline"
            icon={History}
            view="history"
          />
        </nav>

        {/* User / Status */}
        <div className="p-4 m-4 rounded-2xl bg-slate-800/60 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600
            flex items-center justify-center font-bold text-white shadow-md">
              {username?.[0] || 'U'}
            </div>

            <div className="overflow-hidden">
              <p className="font-semibold truncate">
                {username}
              </p>
              <p className="text-xs text-slate-400">
                Operator • AI Enabled
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 mb-3">
            <Sparkles size={14} />
            AI Engine Ready
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium
            text-red-400 hover:text-red-300 hover:bg-red-500/10
            rounded-lg transition"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur border-b border-slate-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-slate-400 hover:text-white"
              >
                {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>System</span>
                <ChevronRight size={14} />
                <span className="capitalize font-medium text-slate-100">
                  {currentView}
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full
            bg-slate-900 border border-slate-700 text-xs text-blue-400">
              <Sparkles size={14} />
              AI Assisted Mode
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
