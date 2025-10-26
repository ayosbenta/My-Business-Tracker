
import React from 'react';

type View = 'dashboard' | 'dito' | 'eaccess' | 'expenses';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  onLogout: () => void;
}

const SidebarIcon: React.FC<{
  d: string;
  isActive: boolean;
}> = ({ d, isActive }) => (
    <svg className={`h-6 w-6 mr-3 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
    </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', iconD: 'M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-7 0a2 2 0 012-2h2a2 2 0 012 2m-7 0a2 2 0 00-2 2h11a2 2 0 00-2-2m-9-6v-6a2 2 0 012-2h2a2 2 0 012 2v6m-7 0a2 2 0 012-2h2a2 2 0 012 2m-9 6h11' },
    { id: 'dito', label: 'DITO', iconD: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-12 0v1z' },
    { id: 'eaccess', label: 'eAccess Travel', iconD: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: 'expenses', label: 'Expenses', iconD: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' }
  ];

  return (
    <div className="w-64 bg-base-200 flex flex-col h-full shadow-lg">
      <div className="flex items-center justify-center h-20 border-b border-base-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
        </svg>
        <h1 className="text-2xl font-bold text-white ml-2">Tracker</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as View)}
            className={`w-full flex items-center px-4 py-3 my-1 rounded-lg text-sm font-medium transition-colors duration-200 group ${
              activeView === item.id ? 'bg-primary text-white' : 'text-gray-300 hover:bg-base-300 hover:text-white'
            }`}
          >
            <SidebarIcon d={item.iconD} isActive={activeView === item.id} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-base-300">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-base-300 hover:text-white transition-colors duration-200 group"
        >
            <svg className="h-6 w-6 mr-3 text-gray-400 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
