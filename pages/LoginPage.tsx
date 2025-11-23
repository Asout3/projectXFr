import React, { useState } from 'react';
import { Icons } from '../components/Icons';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    // Simulate network delay for realistic feel
    setTimeout(() => {
      try {
        onLogin();
        // Navigation handled by App component redirect
      } catch (err) {
        console.error("Login Error:", err);
        setError("Failed to sign in. Please try again.");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden selection:bg-blue-500/30">
      
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-400/20 dark:bg-violet-600/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/10 dark:bg-cyan-600/5 rounded-full blur-[120px] animate-pulse"></div>
         {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="bg-white/50 dark:bg-slate-900/60 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 dark:border-slate-700/50 p-8 text-center transition-all duration-300 hover:shadow-blue-500/10 hover:border-blue-500/20 ring-1 ring-white/20 dark:ring-white/5">
          
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25 transform transition-transform duration-500 hover:rotate-6 hover:scale-110">
            <Icons.Feather className="text-white w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Sign in with Google to continue</p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-200 text-sm rounded-lg text-left flex items-start gap-2 animate-fade-in-up">
              <Icons.X size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white/70 dark:bg-slate-800/80 text-slate-700 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:shadow-slate-200/50 dark:hover:shadow-black/50 font-medium disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none active:scale-95 backdrop-blur-sm"
          >
            {isLoading ? (
              <Icons.Loader2 className="w-5 h-5 animate-spin text-slate-400" />
            ) : (
              <>
                <svg className="w-5 h-5 transition-transform group-hover:scale-110 shadow-sm rounded-full" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Icons.Lock size={12} />
            <span>Secure, passwordless authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
};