import React, { useState } from 'react';
import { ChevronLeft, Shield, Lock, Smartphone, LogOut, ChevronRight } from 'lucide-react';

interface Props { onBack: () => void; brandColor: string; }

const Security: React.FC<Props> = ({ onBack, brandColor }) => {
  const [biometric, setBiometric] = useState(true);

  return (
    <div className="p-5 max-w-lg mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 active:scale-90"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold text-slate-800">Security</h2>
      </header>

      <div className="space-y-4">
        <button className="card-3d w-full p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-50 rounded-xl text-slate-400 border border-slate-100"><Lock size={20} /></div>
            <div className="text-left">
              <h4 className="font-semibold text-slate-800 text-sm tracking-tight">Change Password</h4>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">Last changed 3 months ago</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-300" />
        </button>

        <div className="card-3d w-full p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-50 rounded-xl text-slate-400 border border-slate-100"><Smartphone size={20} /></div>
            <div className="text-left">
              <h4 className="font-semibold text-slate-800 text-sm tracking-tight">Biometric Login</h4>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">Face ID / Fingerprint</p>
            </div>
          </div>
          <button 
            onClick={() => setBiometric(!biometric)}
            className={`w-12 h-6 rounded-full relative transition-all duration-300 ${biometric ? '' : 'bg-slate-200'}`}
            style={{ backgroundColor: biometric ? brandColor : undefined }}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${biometric ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        <button 
          onClick={() => alert('Logged out from all other devices successfully.')}
          className="card-3d w-full p-6 flex items-center gap-4 text-rose-500 hover:bg-rose-50 transition-colors"
        >
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-100"><LogOut size={20} /></div>
          <div className="text-left">
            <h4 className="font-bold text-sm tracking-tight">Logout from all devices</h4>
            <p className="text-[10px] font-medium text-rose-400 uppercase tracking-wider mt-1">Disconnect 2 active sessions</p>
          </div>
        </button>
      </div>

      <div className="mt-10 p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-100 flex items-start gap-4">
        <Shield size={20} className="text-indigo-600 mt-1" />
        <p className="text-xs font-medium text-indigo-900/70 leading-relaxed">
          Full security logic will be active in the next production build. Current options are for interface preview.
        </p>
      </div>
    </div>
  );
};

export default Security;
