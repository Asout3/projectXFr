import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icons } from '../components/Icons';
import { User } from '../types';

interface LandingPageProps {
  user: User | null;
}

const QUOTES = [
  {
    text: "If there's a book that you want to read, but it hasn't been written yet, then you must write it.",
    author: "Toni Morrison",
    role: "Nobel Prize Laureate",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    text: "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
    role: "Founding Father",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/BenFranklinDuplessis.jpg/440px-BenFranklinDuplessis.jpg"
  },
  {
    text: "There is no friend as loyal as a book.",
    author: "Ernest Hemingway",
    role: "Novelist",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/28/ErnestHemingway.jpg"
  },
  {
    text: "A room without books is like a body without a soul.",
    author: "Cicero",
    role: "Roman Philosopher",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Bust_of_Cicero_%281st-cent._BC%29_-_Palazzo_Nuovo_-_Musei_Capitolini_-_Rome_2016.jpg/440px-Bust_of_Cicero_%281st-cent._BC%29_-_Palazzo_Nuovo_-_Musei_Capitolini_-_Rome_2016.jpg"
  },
  {
    text: "So many books, so little time.",
    author: "Frank Zappa",
    role: "Musician",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Frank_Zappa_1973.jpg/440px-Frank_Zappa_1973.jpg"
  },
  {
    text: "The only thing that you absolutely have to know, is the location of the library.",
    author: "Albert Einstein",
    role: "Theoretical Physicist",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/440px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg"
  },
  {
    text: "No tears in the writer, no tears in the reader. No surprise in the writer, no surprise in the reader.",
    author: "Robert Frost",
    role: "Poet",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Robert_Frost_NYWTS.jpg/440px-Robert_Frost_NYWTS.jpg"
  },
  {
    text: "You can make anything by writing.",
    author: "C.S. Lewis",
    role: "Author",
    image: "https://upload.wikimedia.org/wikipedia/en/1/1e/C.s.lewis3.JPG"
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (user) {
      navigate('/generate');
    } else {
      navigate('/login');
    }
  };

  // Randomly select 4 quotes on mount/refresh
  const displayedQuotes = useMemo(() => {
    const shuffled = [...QUOTES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans relative isolate selection:bg-blue-500/30">
      
      {/* Animated Blur/Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Top Left - Blue/Cyan */}
        <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-blue-300/30 to-cyan-200/30 dark:from-blue-900/20 dark:to-cyan-800/20 blur-[100px] animate-float mix-blend-multiply dark:mix-blend-normal" />
        
        {/* Top Right - Violet/Fuchsia */}
        <div className="absolute top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-violet-300/30 to-fuchsia-200/30 dark:from-violet-900/20 dark:to-fuchsia-800/20 blur-[100px] animate-float mix-blend-multiply dark:mix-blend-normal" style={{ animationDelay: '2s' }} />
        
        {/* Bottom Center - Emerald/Teal */}
        <div className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[60vw] rounded-full bg-gradient-to-t from-emerald-200/30 to-teal-200/30 dark:from-emerald-900/20 dark:to-teal-800/20 blur-[120px] animate-float mix-blend-multiply dark:mix-blend-normal" style={{ animationDelay: '4s' }} />
        
        {/* Noise overlay for texture (optional premium feel) */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* Hero Section */}
      <main className="flex-grow pt-32 pb-20 px-6 relative">

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/40 dark:border-slate-700/50 mb-8 animate-fade-in-up hover:border-blue-400/50 transition-colors duration-300 shadow-sm ring-1 ring-white/30 dark:ring-white/5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">Now Generating in &lt; 7 Minutes</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 animate-fade-in-up drop-shadow-sm" style={{ animationDelay: '0.1s' }}>
            Craft Masterpieces<br />With Artificial Intelligence
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
            Transform your ideas into full-length books, research papers, and compelling stories. We are democratizing knowledge creation for everyone.
          </p>
          
          <button 
            onClick={handleStart}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/30 animate-fade-in-up ring-offset-2 focus:ring-2 ring-blue-500"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <Icons.Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Start Creating
            <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Speed Stats Section - Glassmorphism */}
        <div className="max-w-6xl mx-auto mb-32 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-white/60 dark:border-slate-700/50 shadow-lg shadow-blue-500/5 flex flex-col items-center text-center hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/20 transition-all duration-300 cursor-default ring-1 ring-white/20 dark:ring-white/5">
              <div className="w-12 h-12 bg-blue-100/80 dark:bg-blue-900/40 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 backdrop-blur-sm">
                <Icons.Sparkles size={24} />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">7m</h3>
              <p className="text-slate-600 dark:text-slate-400">Average Generation Time</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-white/60 dark:border-slate-700/50 shadow-lg shadow-violet-500/5 flex flex-col items-center text-center hover:scale-[1.02] hover:shadow-xl hover:border-violet-500/20 transition-all duration-300 cursor-default ring-1 ring-white/20 dark:ring-white/5">
              <div className="w-12 h-12 bg-violet-100/80 dark:bg-violet-900/40 rounded-full flex items-center justify-center mb-4 text-violet-600 dark:text-violet-400 backdrop-blur-sm">
                <Icons.Library size={24} />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">10k+</h3>
              <p className="text-slate-600 dark:text-slate-400">Books Generated</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-white/60 dark:border-slate-700/50 shadow-lg shadow-emerald-500/5 flex flex-col items-center text-center hover:scale-[1.02] hover:shadow-xl hover:border-emerald-500/20 transition-all duration-300 cursor-default ring-1 ring-white/20 dark:ring-white/5">
               <div className="w-12 h-12 bg-emerald-100/80 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400 backdrop-blur-sm">
                <Icons.Feather size={24} />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">100%</h3>
              <p className="text-slate-600 dark:text-slate-400">Copyright Ownership</p>
            </div>
          </div>
        </div>

        {/* Feature Grid - Fixed Opacity/Blur */}
        <div className="mt-20 relative mx-auto max-w-5xl animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl blur opacity-10 dark:opacity-30"></div>
          {/* Increased opacity (white/90 and slate-900/80) to fix blurry text issue while keeping glass border */}
          <div className="relative bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/50 dark:border-slate-700 shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
              <div className="p-8 text-left hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors group cursor-default">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <Icons.Command size={20} />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">One Prompt</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Just describe your core idea. We handle the plot, characters, and structure.</p>
              </div>
              <div className="p-8 text-left hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors group cursor-default">
                <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/40 rounded-lg flex items-center justify-center mb-4 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform duration-300">
                  <Icons.Library size={20} />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Any Format</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">From short stories to comprehensive research papers with citations.</p>
              </div>
              <div className="p-8 text-left hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors group cursor-default">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  <Icons.Download size={20} />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Instant Export</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Download your generated content immediately in clean, formatted PDF.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quotes Section - Glassmorphism */}
        <div className="max-w-6xl mx-auto mt-32 mb-20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Wisdom of the Ages</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">We are contributing to the vast ocean of human knowledge. Be inspired by those who came before you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayedQuotes.map((quote, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-700/50 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500 shadow-md hover:shadow-xl hover:-translate-y-1 ring-1 ring-white/20 dark:ring-white/5">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 group-hover:scale-110 transform origin-top-right">
                  <Icons.Book size={100} />
                </div>
                <div className="relative z-10">
                   <div className="flex items-center gap-4 mb-6">
                     <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/50 dark:border-slate-700 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                       <img src={quote.image} alt={quote.author} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{quote.author}</h4>
                       <p className="text-xs text-slate-500 uppercase tracking-wide">{quote.role}</p>
                     </div>
                   </div>
                   <blockquote className="text-lg font-medium text-slate-700 dark:text-slate-300 italic leading-relaxed">
                     "{quote.text}"
                   </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <footer className="py-8 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-950/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <p>© 2025 Lumina Scribe. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white hover:underline transition-all">Privacy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white hover:underline transition-all">Terms</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white hover:underline transition-all">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
};