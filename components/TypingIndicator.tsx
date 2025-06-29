import React from 'react';
import { Hash } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-6">
      <div className="flex items-end gap-3">
        <div className="w-9 h-9 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center shadow-md">
          <Hash className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 px-5 py-4 rounded-2xl rounded-tl-md shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Searching global dictionaries...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;