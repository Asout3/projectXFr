import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { GeneratorPage } from './pages/GeneratorPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { User } from './types';
import { Icons } from './components/Icons';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for "logged in" user in localStorage to persist session across refreshes
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
    // Simulate a brief initial load for smoother UX
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const handleLogin = () => {
    // Simulate a successful Google Login
    const mockUser: User = {
      uid: "demo-user-" + Math.random().toString(36).substr(2, 9),
      displayName: "Demo User",
      email: "user@example.com",
      photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100"
    };
    
    setUser(mockUser);
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mock_user');
  };

  //
  // Global Loading Screen (App Initialization)
  //
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center transition-colors duration-300">
        <div className="relative mb-4">
          {/* Outer Ring */}
          <div className="w-16 h-16 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
          {/* Spinner */}
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
          {/* Center Logo */}
          <Icons.Feather className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-slate-900 dark:text-white animate-pulse" />
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
           <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
           Initializing Lumina Scribe...
        </div>
      </div>
    );
  }

  //
  // Routes
  //
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 font-sans">
        <Navbar user={user} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<LandingPage user={user} />} />

          <Route 
            path="/login" 
            element={
              user ? <Navigate to="/generate" replace /> : <LoginPage onLogin={handleLogin} />
            }
          />

          <Route 
            path="/generate" 
            element={
              user ? <GeneratorPage user={user} /> : <Navigate to="/login" replace />
            }
          />

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;