
import React, { useState, useCallback } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Dito from './components/Dito';
import EAccess from './components/EAccess';
import Expenses from './components/Expenses';
import Sidebar from './components/Sidebar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DitoApplication, EAccessSystem, Expense } from './types';
import { CREDENTIALS } from './constants';

type View = 'dashboard' | 'dito' | 'eaccess' | 'expenses';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<View>('dashboard');

  const [ditoApplications, setDitoApplications] = useLocalStorage<DitoApplication[]>('ditoApplications', []);
  const [eAccessSystems, setEAccessSystems] = useLocalStorage<EAccessSystem[]>('eAccessSystems', []);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);

  const handleLogin = useCallback((user: string, pass: string): boolean => {
    if (user === CREDENTIALS.user && pass === CREDENTIALS.pass) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setActiveView('dashboard');
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard ditoData={ditoApplications} eAccessData={eAccessSystems} expensesData={expenses} />;
      case 'dito':
        return <Dito applications={ditoApplications} setApplications={setDitoApplications} />;
      case 'eaccess':
        return <EAccess systems={eAccessSystems} setSystems={setEAccessSystems} />;
      case 'expenses':
        return <Expenses expenses={expenses} setExpenses={setExpenses} />;
      default:
        return <Dashboard ditoData={ditoApplications} eAccessData={eAccessSystems} expensesData={expenses} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-base-100 text-gray-200">
      <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={handleLogout} />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
