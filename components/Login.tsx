import React, { useState } from 'react';
import {
  FlaskConical,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Sparkles
} from 'lucide-react';

interface LoginProps {
  onLogin: (user: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(username.trim());
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <div className="relative w-full max-w-md">
        {/* Glow */}
        <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-2xl" />

        <div className="relative bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 text-center border-b border-slate-800">
            <div className="relative mx-auto w-fit mb-4">
              <div className="absolute inset-0 bg-blue-500 blur-md opacity-40 rounded-2xl" />
              <div className="relative bg-slate-950 border border-blue-500/40 p-4 rounded-2xl">
                <FlaskConical size={36} className="text-blue-400" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              ChemEquip Visualizer
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              AI-Driven Equipment Analytics Platform
            </p>

            <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5
              rounded-full bg-slate-800 border border-slate-700 text-xs text-blue-400">
              <Sparkles size={14} />
              AI Assisted Mode
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                  Username
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl
                    bg-slate-950 border border-slate-700 text-slate-100
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    outline-none transition"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl
                    bg-slate-950 border border-slate-700 text-slate-100
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    outline-none transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-400 font-medium">
                {error}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-500 hover:to-indigo-500
              text-white font-bold transition
              shadow-lg shadow-blue-500/30
              disabled:opacity-70 disabled:cursor-not-allowed
              active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Authenticating…
                </>
              ) : (
                <>
                  Enter Dashboard
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            {/* Footer */}
            <p className="text-center text-xs text-slate-500 leading-relaxed">
              Demo environment enabled
              <br />
              <span className="text-slate-400 font-medium">
                Credentials:
              </span>{' '}
              Admin / password
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
