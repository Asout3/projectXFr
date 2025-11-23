import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/Icons';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-slate-950 px-6 font-sans">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-400/20 dark:bg-violet-600/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="text-center max-w-lg z-10 animate-fade-in-up relative">
        {/* Large Decorative 404 */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-slate-100 dark:text-slate-900 select-none transition-colors duration-300">404</h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500/80 dark:text-blue-400/80 animate-float">
             <Icons.FileQuestion size={80} strokeWidth={1.5} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 relative z-20">Page Not Found</h2>
        
        <p className="text-slate-500 dark:text-slate-400 mb-8 relative z-20 text-lg leading-relaxed">
          Oops! It seems the chapter you are looking for hasn't been written yet, or it was removed from the library.
        </p>

        <Link 
          to="/"
          className="group relative z-20 inline-flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 ring-offset-2 focus:ring-2 ring-blue-500"
        >
          <Icons.ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Return Home
        </Link>
      </div>
    </div>
  );
};