import React from 'react';
import { Link, QrCode, Moon, Sun, UserCog } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  role: 'admin' | 'viewer';
  toggleRole: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, role, toggleRole }) => {
  return (
    <header className="py-4 px-4 sm:px-6 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
          <Link className="w-6 h-6" />
          <h1 className="text-xl font-bold">LinkHub</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <QrCode className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          
          {/* Role indicator and toggle */}
          <button
            onClick={toggleRole}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm
              bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
              hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <UserCog className="w-4 h-4" />
            <span>{role === 'admin' ? 'Admin' : 'Viewer'}</span>
          </button>
          
          {/* Theme toggle (only for admin) */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 
              hover:text-primary-600 dark:hover:text-primary-400 transition-colors
              ${role === 'viewer' ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            disabled={role === 'viewer'}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;