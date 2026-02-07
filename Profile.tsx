import React from 'react';
import { User } from '../../types';
import { Settings, Bell, Shield, LogOut, Camera, ChevronRight, GraduationCap } from 'lucide-react';
import { UPSIFS_LOGO_URL } from '../../utils/constants';

interface ProfileProps {
  user: User;
  onLogout: () => void;
  onNavigateToSettings: (page: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onNavigateToSettings }) => {
  const settingsItems = [
    { id: 'settings_notifications', label: 'Notifications', icon: Bell, sub: 'Manage alerts & push notifications' },
    { id: 'settings_security', label: 'Security', icon: Shield, sub: 'Change password & biometric login' },
    { id: 'settings_preferences', label: 'Preferences', icon: Settings, sub: 'Theme, Language & App settings' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.06)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-[#1e1b4b] opacity-[0.03]"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center mt-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2rem] border-4 border-white shadow-xl overflow-hidden bg-slate-100 flex items-center justify-center p-4">
              <img src={UPSIFS_LOGO_URL} alt="UPSIFS Logo" className="w-full h-full object-contain" />
            </div>
            <button className="absolute bottom-1 right-1 p-2.5 bg-white text-[#1e1b4b] rounded-xl shadow-lg border border-slate-100 hover:bg-slate-50 transition-colors">
              <Camera size={16} strokeWidth={2.5} />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mt-6 tracking-tight">{user.name}</h2>
          <p className="text-slate-400 font-medium text-sm uppercase tracking-widest mt-1">{user.department}</p>
          <div className="mt-6 flex gap-3">
            <span className="px-4 py-1.5 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-wider border border-slate-100 shadow-sm">Semester {user.semester}</span>
            <span className="px-4 py-1.5 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-wider border border-slate-100 shadow-sm">{user.enrollmentNo}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-12 pb-10 border-b border-slate-50">
           {[
             { label: 'Attendance', val: '84%', icon: Bell },
             { label: 'GPA', val: '8.43', icon: GraduationCap },
             { label: 'Rank', val: '#12', icon: Shield },
           ].map((stat, i) => (
             <div key={i} className="text-center">
               <div className="text-slate-800 font-bold text-2xl tracking-tight">{stat.val}</div>
               <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
             </div>
           ))}
        </div>

        <div className="space-y-3 mt-10">
          {settingsItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => onNavigateToSettings(item.id)}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-[#1e1b4b] group-hover:text-white transition-all shadow-inner border border-slate-100">
                  <item.icon size={18} strokeWidth={2} />
                </div>
                <div className="text-left">
                  <h5 className="font-semibold text-slate-800 tracking-tight text-sm">{item.label}</h5>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{item.sub}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300" />
            </button>
          ))}
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-rose-50 transition-colors group text-rose-500 mt-4"
          >
            <div className="p-3 bg-rose-50 rounded-xl group-hover:bg-rose-500 group-hover:text-white transition-all shadow-inner border border-rose-100">
              <LogOut size={18} strokeWidth={2} />
            </div>
            <span className="font-bold text-sm tracking-wide">Log Out from Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
