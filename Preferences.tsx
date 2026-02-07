import React, { useState } from 'react';
import { ChevronLeft, Moon, Globe, Trash2, Check } from 'lucide-react';

interface Props { onBack: () => void; brandColor: string; }

const Preferences: React.FC<Props> = ({ onBack, brandColor }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  return (
    <div className="p-5 max-w-lg mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 active:scale-90"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold text-slate-800">Preferences</h2>
      </header>

      <div className="space-y-6">
        {/* Theme Selection */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 flex items-center gap-2">
            <Moon size={14} /> Theme
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {['light', 'dark'].map(t => (
              <button 
                key={t}
                onClick={() => setTheme(t)}
                className={`card-3d p-4 flex items-center justify-between border ${theme === t ? 'border-indigo-100' : 'border-transparent'}`}
              >
                <span className={`text-sm font-bold capitalize ${theme === t ? 'text-slate-800' : 'text-slate-400'}`}>{t}</span>
                {theme === t && <div className="w-5 h-5 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: brandColor }}><Check size={12} strokeWidth={4} /></div>}
              </button>
            ))}
          </div>
        </section>

        {/* Language Selection */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 flex items-center gap-2">
            <Globe size={14} /> Language
          </h3>
          <div className="card-3d overflow-hidden">
            {['English', 'Hindi'].map((l, i) => {
              const code = l === 'English' ? 'en' : 'hi';
              return (
                <button 
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`w-full p-5 flex items-center justify-between transition-colors ${i === 0 ? 'border-b border-slate-50' : ''} ${language === code ? 'bg-slate-50' : ''}`}
                >
                  <span className={`text-sm font-bold ${language === code ? 'text-slate-800' : 'text-slate-500'}`}>{l}</span>
                  {language === code && <Check size={18} className="text-teal-500" />}
                </button>
              );
            })}
          </div>
        </section>

        {/* App Settings */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">App Settings</h3>
          <button 
            onClick={() => alert('Cache cleared!')}
            className="card-3d w-full p-6 flex items-center justify-between text-slate-500 hover:text-slate-800 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><Trash2 size={20} /></div>
              <div className="text-left">
                <h4 className="font-semibold text-sm tracking-tight">Clear App Cache</h4>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">Frees up 12.4 MB</p>
              </div>
            </div>
            <ChevronLeft size={18} className="rotate-180 opacity-40" />
          </button>
        </section>
      </div>

      <p className="mt-12 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">UPSIFS v2.4.0 (Alpha Build)</p>
    </div>
  );
};

export default Preferences;
