import React from 'react';
import { ChevronLeft, Pencil } from 'lucide-react';

interface Props { onBack: () => void; }

const EditTimetable: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="p-5 max-w-lg mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 active:scale-90"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold text-slate-800">Edit Timetable</h2>
      </header>

      <div className="space-y-4">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
          <div key={day} className="card-3d p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 font-bold">{day[0]}</div>
              <div><h4 className="font-bold text-slate-800">{day} Schedule</h4><p className="text-[10px] text-slate-400 uppercase tracking-widest">2 Sessions active</p></div>
            </div>
            <button className="p-3 text-slate-300 hover:text-orange-500 transition-colors"><Pencil size={20} /></button>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-xs font-bold text-slate-400">Request change for major rescheduling</p>
    </div>
  );
};

export default EditTimetable;
