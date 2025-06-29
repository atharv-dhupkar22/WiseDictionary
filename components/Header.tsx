import React from 'react';
import { BookOpen, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-900 border-b-2 border-indigo-100 dark:border-slate-700 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-2.5 rounded-lg shadow-md">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                WordWise
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Your personal word companion
              </p>
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 border border-slate-200 dark:border-slate-600"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;