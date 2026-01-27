
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { HistoryView } from './components/HistoryView';
import { AuthState, EquipmentItem, HistoryItem } from './types';
import { getHistory } from './services/dataService';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false, username: null });
  const [currentData, setCurrentData] = useState<EquipmentItem[] | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [view, setView] = useState<'dashboard' | 'history'>('dashboard');

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  if (!auth.isAuthenticated) {
    return <Login onLogin={(user) => setAuth({ isAuthenticated: true, username: user })} />;
  }

  return (
    <Layout 
      username={auth.username || 'User'} 
      onLogout={() => setAuth({ isAuthenticated: false, username: null })}
      onNavigate={setView}
      currentView={view}
    >
      {view === 'dashboard' ? (
        <Dashboard 
          data={currentData} 
          setData={setCurrentData} 
          fileName={currentFileName}
          setFileName={setCurrentFileName}
          setHistory={setHistory}
        />
      ) : (
        <HistoryView 
          history={history} 
          onLoadSession={(session) => {
            setCurrentData(session.data);
            setCurrentFileName(session.fileName);
            setView('dashboard');
          }}
        />
      )}
    </Layout>
  );
};

export default App;
