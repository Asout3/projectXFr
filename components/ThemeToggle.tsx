import React, { useEffect, useState } from 'react';
import { Icons } from './Icons';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check local storage. If 'light', set light. Otherwise (undefined or 'dark'), set dark.
    if (localStorage.theme === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all duration-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700 hover:scale-110 hover:rotate-12 active:scale-95 hover:shadow-lg dark:hover:shadow-slate-800/50"
      aria-label="Toggle Theme"
    >
      {isDark ? <Icons.Sun size={18} /> : <Icons.Moon size={18} />}
    </button>
  );
};