import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from './Icons';
import { ThemeToggle } from './ThemeToggle';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  // High-end glassmorphism: Lower opacity + Higher Blur + Subtle Border
  const navClasses = "fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/60 dark:bg-slate-950/60 border-b border-white/20 dark:border-slate-800/50 transition-all duration-300 supports-[backdrop-filter]:bg-white/50";

  // Only show full nav if logged in
  if (!user) {
    return (
      <nav className={navClasses}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Icons.Feather className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 group-hover:opacity-80 transition-opacity">
              Lumina Scribe
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login" className="hidden md:flex text-sm font-medium px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300 ease-out">
              Sign In
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
             <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Icons.Feather className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Lumina</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === '/' ? 'text-slate-900 dark:text-white bg-black/5 dark:bg-white/10 scale-105 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              Home
            </Link>
            <Link 
              to="/generate" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === '/generate' ? 'text-slate-900 dark:text-white bg-black/5 dark:bg-white/10 scale-105 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              Generate
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none group"
            >
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 object-cover group-hover:ring-2 group-hover:ring-blue-500 group-hover:ring-offset-2 dark:group-hover:ring-offset-slate-900 transition-all duration-300 shadow-sm"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-300 dark:group-hover:bg-slate-700 transition-colors shadow-sm">
                   <Icons.User size={18} className="text-slate-500" />
                </div>
              )}
            </button>

            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
                <div className="absolute right-0 mt-3 w-56 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 dark:border-slate-700 z-50 py-2 animate-fade-in-up origin-top-right ring-1 ring-black/5">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.displayName || 'User'}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-mono mt-0.5">{user.email}</p>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2.5 transition-colors group"
                  >
                    <Icons.LogOut size={16} className="group-hover:scale-110 transition-transform" />
                    Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};