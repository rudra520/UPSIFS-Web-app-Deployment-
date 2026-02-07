import React, { useState } from 'react';
import { ChevronLeft, Bell } from 'lucide-react';

interface Props { onBack: () => void; brandColor: string; }

const Notifications: React.FC<Props> = ({ onBack, brandColor }) => {
  const [settings, setSettings] = useState({
    app: true,
    attendance: true,
    assignments: true,
    notices: true,
  });

  const toggle = (key: keyof typeof settings) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const items = [
    { id: 'app', label: 'App Notifications', sub: 'Enable main system alerts' },
    { id: 'attendance', label: 'Attendance Alerts', sub: 'Low attendance warnings' },
    { id: 'assignments', label: 'Assignment Reminders', sub: 'Deadline push notifications' },
    { id: 'notices', label: 'Notice Updates', sub: 'New circular announcements' },
  ];

  return (
    <div className="p-5 max-w-lg mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 active:scale-90"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold text-slate-800">Notifications</h2>
      </header>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="card-3d p-6 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-slate-800 text-sm leading-tight tracking-tight">{item.label}</h4>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">{item.sub}</p>
            </div>
            <button 
              onClick={() => toggle(item.id as keyof typeof settings)}
              className={`w-12 h-6 rounded-full relative transition-all duration-300 ${settings[item.id as keyof typeof settings] ? '' : 'bg-slate-200'}`}
              style={{ backgroundColor: settings[item.id as keyof typeof settings] ? brandColor : undefined }}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${settings[item.id as keyof typeof settings] ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        ))}
      </div>
      
      <p className="mt-10 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Settings will be saved automatically</p>
    </div>
  );
};

export default Notifications;
