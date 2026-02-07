import React, { useState } from 'react';
import { ChevronLeft, UploadCloud, FileText } from 'lucide-react';

interface Props { onBack: () => void; }

const UploadPPT: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="p-5 max-w-lg mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 active:scale-90"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold text-slate-800">Upload PPT</h2>
      </header>

      <div className="card-3d p-6 space-y-6">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Subject</label>
          <select className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold text-slate-800 outline-none">
            <option>Machine Learning</option>
            <option>AI Basics</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Material Title</label>
          <input type="text" placeholder="e.g. Unit 1: Introduction" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold text-slate-800 outline-none" />
        </div>
        <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 hover:bg-white hover:border-blue-400 transition-all cursor-pointer">
          <UploadCloud size={48} strokeWidth={1.5} className="mb-4 text-blue-500" />
          <p className="font-bold text-sm text-center">Tap to select PDF/PPT</p>
        </div>
        <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100">Upload to LMS</button>
      </div>

      <div className="mt-10 space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Recent Uploads</h3>
        <div className="card-3d p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-500"><FileText size={20} /></div>
          <div><h5 className="font-bold text-sm text-slate-800">Linear Regression.pdf</h5><p className="text-[10px] text-slate-400">Apr 15, 2024</p></div>
        </div>
      </div>
    </div>
  );
};

export default UploadPPT;
