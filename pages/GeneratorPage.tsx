import React, { useState } from 'react';
import { BookType, BookTypeLabels, User } from '../types';
import { Icons } from '../components/Icons';
import { generateBookPDF, cancelGeneration } from '../services/api';

type Language = 'English' | 'Amharic';

interface GeneratorPageProps {
  user: User;
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ user }) => {
  const [prompt, setPrompt] = useState('');
  const [bookType, setBookType] = useState<BookType>(BookType.MEDIUM);
  const [language, setLanguage] = useState<Language>('English');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    // Use real Firebase User UID
    const userId = user.uid;

    setIsGenerating(true);
    setProgress(0);
    setPdfUrl(null);
    setPdfName(null);
    setError(null);

    // Append language instruction to the prompt
    const fullPrompt = `${prompt} (IMPORTANT: Write this entire content in ${language})`;

    try {
      const result = await generateBookPDF(
        fullPrompt,
        bookType,
        userId,
        (percent) => setProgress(percent)
      );
      setPdfUrl(result.url);
      setPdfName(result.fileName);
    } catch (e: any) {
      console.error(e);
      if (e.name === 'CanceledError') {
         // Handled by cancel
      } else {
         setError("Failed to generate book. Please check the backend connection.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCancel = async () => {
    const userId = user.uid;
    
    await cancelGeneration(userId);
    setIsGenerating(false);
    setError("Generation cancelled by user.");
    setProgress(0);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative isolate">
      
      {/* Animated Blur/Gradient Background (Shared with Landing Page) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Top Left - Blue/Cyan */}
        <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-blue-300/30 to-cyan-200/30 dark:from-blue-900/20 dark:to-cyan-800/20 blur-[100px] animate-float mix-blend-multiply dark:mix-blend-normal" />
        
        {/* Top Right - Violet/Fuchsia */}
        <div className="absolute top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-violet-300/30 to-fuchsia-200/30 dark:from-violet-900/20 dark:to-fuchsia-800/20 blur-[100px] animate-float mix-blend-multiply dark:mix-blend-normal" style={{ animationDelay: '2s' }} />
        
        {/* Bottom Center - Emerald/Teal */}
        <div className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[60vw] rounded-full bg-gradient-to-t from-emerald-200/30 to-teal-200/30 dark:from-emerald-900/20 dark:to-teal-800/20 blur-[120px] animate-float mix-blend-multiply dark:mix-blend-normal" style={{ animationDelay: '4s' }} />
        
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* Left Panel: Controls - Glassmorphism */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6 animate-fade-in-up">
        <div className="bg-white/50 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-slate-700/50 p-6 shadow-xl sticky top-24 transition-all duration-300 hover:shadow-2xl hover:border-white/60 ring-1 ring-white/20 dark:ring-white/5">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <Icons.Sparkles className="w-5 h-5 text-blue-500" />
            Create New Book
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Configure your masterpiece settings.</p>

          <div className="space-y-5">
            {/* Language Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Output Language
              </label>
              <div className="relative group">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full appearance-none px-4 py-3 bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700/50 rounded-lg text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer hover:border-blue-400 hover:bg-white/80 dark:hover:bg-slate-900/80 backdrop-blur-sm"
                >
                  <option value="English">English</option>
                  <option value="Amharic">Amharic</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-blue-500 transition-colors">
                  <Icons.Globe size={16} />
                </div>
              </div>
            </div>

            {/* Type Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Length & Format
              </label>
              <div className="grid grid-cols-1 gap-2">
                {Object.values(BookType).map((type) => (
                  <button
                    key={type}
                    onClick={() => setBookType(type)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-300 text-sm active:scale-95 hover:shadow-md transform hover:-translate-y-0.5 ${
                      bookType === type
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-md scale-[1.02]'
                        : 'bg-white/40 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:scale-[1.01] backdrop-blur-sm'
                    }`}
                  >
                    <span>{BookTypeLabels[type]}</span>
                    {bookType === type && <Icons.Check size={14} className="animate-fade-in-up" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Concept / Plot
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your book idea... e.g., 'A cyberpunk detective solving crimes in a world where dreams are currency'"
                className="w-full h-32 px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-sm hover:border-slate-300 dark:hover:border-slate-600 backdrop-blur-sm"
              />
            </div>

            {/* Error Message */}
            {error && (
               <div className="p-3 bg-red-50/80 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-sm rounded-lg flex items-center gap-2 animate-fade-in-up backdrop-blur-sm border border-red-100 dark:border-red-900/30">
                 <Icons.X size={16} />
                 {error}
               </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className={`flex-1 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 group`}
              >
                {isGenerating ? (
                  <>
                    <Icons.Loader2 className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Icons.Book className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                    Generate PDF
                  </>
                )}
              </button>

              {isGenerating && (
                <button
                  onClick={handleCancel}
                  className="px-4 py-4 bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400 rounded-xl font-semibold border border-red-500/20 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 backdrop-blur-sm"
                  title="Cancel Generation"
                >
                  <Icons.X size={20} />
                </button>
              )}
            </div>

            {/* Premium Progress Bar */}
            {isGenerating && (
              <div className="space-y-2 animate-fade-in-up">
                <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Generating Content
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700/50">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 bg-[length:200%_100%] animate-shimmer transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel: Preview / Download - Glassmorphism */}
      <div className="w-full lg:w-2/3 h-[80vh] flex flex-col animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-full backdrop-blur-sm inline-block">Result Preview</h3>
        </div>

        <div className="relative flex-grow bg-white/50 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-xl overflow-hidden flex flex-col items-center justify-center p-8 transition-colors duration-300 ring-1 ring-white/20 dark:ring-white/5">
           
           {/* Empty State */}
           {!pdfUrl && !isGenerating && (
             <div className="text-center text-slate-400">
               <div className="w-20 h-20 bg-slate-50/50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300 border border-slate-100 dark:border-slate-700">
                  <Icons.Book size={32} strokeWidth={1.5} className="text-slate-300 dark:text-slate-600" />
               </div>
               <h4 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-1">Ready to Write</h4>
               <p className="max-w-xs mx-auto text-sm">Select a book type and enter a prompt to generate your custom PDF.</p>
             </div>
           )}

           {/* PREMIUM LOADING ANIMATION */}
           {isGenerating && (
             <div className="flex flex-col items-center">
               {/* Animated Book & Pen */}
               <div className="relative w-48 h-48 mb-8 animate-float">
                 {/* Glow Behind */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/30 rounded-full blur-[50px] animate-pulse"></div>
                 
                 {/* Rotating Rings */}
                 <div className="absolute inset-0 border border-slate-200/50 dark:border-slate-700/50 rounded-full animate-spin-slow opacity-30"></div>
                 <div className="absolute inset-4 border border-dashed border-blue-500/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>

                 {/* Icons Container */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Book Icon */}
                      <Icons.Book 
                        size={64} 
                        className="text-slate-800 dark:text-white relative z-10 drop-shadow-2xl" 
                        strokeWidth={1}
                      />
                      
                      {/* Writing Feather - Animated */}
                      <div className="absolute -right-8 -top-8 animate-wiggle origin-bottom-left z-20">
                         <div className="relative">
                           <Icons.Feather 
                             size={40} 
                             className="text-violet-500 drop-shadow-lg" 
                             fill="currentColor"
                             fillOpacity={0.2}
                           />
                           {/* Ink Drip Particles */}
                           <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-violet-500 rounded-full animate-ping"></div>
                         </div>
                      </div>

                      {/* Sparkles */}
                      <Icons.Sparkles size={24} className="absolute -top-6 -left-4 text-amber-400 animate-bounce delay-100" />
                      <Icons.Sparkles size={16} className="absolute bottom-0 -right-8 text-blue-400 animate-bounce delay-300" />
                    </div>
                 </div>
               </div>

               {/* Status Text */}
               <h4 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 animate-shimmer background-size-200 mb-3 text-center">
                 Crafting Your Narrative
               </h4>
               <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm text-center leading-relaxed">
                 Our AI is weaving character arcs, plot twists, and intricate details into your masterpiece.
               </p>
             </div>
           )}

           {/* Success State */}
           {pdfUrl && !isGenerating && (
             <div className="text-center w-full max-w-md animate-fade-in-up">
               <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20 animate-bounce-short border border-green-200 dark:border-green-800/50 backdrop-blur-sm">
                 <Icons.Check size={40} strokeWidth={3} />
               </div>
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Book Generated!</h2>
               <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">{pdfName}</p>
               
               <div className="grid gap-4">
                 <a 
                   href={pdfUrl} 
                   download={pdfName || 'book.pdf'}
                   className="flex items-center justify-center gap-3 w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 group"
                 >
                   <Icons.Download size={20} className="group-hover:animate-bounce" />
                   Download PDF
                 </a>
                 <a 
                   href={pdfUrl} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center gap-3 w-full px-8 py-4 bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-medium hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-md backdrop-blur-sm"
                 >
                   <Icons.Book size={18} />
                   Preview in Browser
                 </a>
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};