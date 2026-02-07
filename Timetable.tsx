import React from 'react';
import { ChevronLeft, Calendar } from 'lucide-react';

interface Props { onBack: () => void; }

const TeacherTimetable: React.FC<Props> = ({ onBack }) => {
  const schedule = [
    { day: 'Monday', slots: [{ time: '10:00 - 11:30', sub: 'Machine Learning', room: 'Lab 4' }, { time: '01:00 - 02:30', sub: 'AI Ethics', room: 'Hall A' }] },
    { day: 'Tuesday', slots: [{ time: '11:30 - 01:00', sub: 'Deep Learning', room: 'Lab 2' }] },
    { day: 'Wednesday', slots: [{ time: '10:00 - 11:30', sub: 'Machine Learning', room: 'Lab 4' }] },
  ];

  return (
    <div className="p-5 max-w-lg mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 active:scale-90"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold text-slate-800">Timetable</h2>
      </header>

      <div className="space-y-8">
        {schedule.map(item => (
          <div key={item.day} className="space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">{item.day}</h3>
            {item.slots.map((slot, i) => (
              <div key={i} className="card-3d p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{slot.sub}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{slot.time} • {slot.room}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherTimetable;
