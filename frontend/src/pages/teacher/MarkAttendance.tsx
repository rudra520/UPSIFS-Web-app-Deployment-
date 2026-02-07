import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../../utils/constants';
import { ChevronLeft, Check, X, Save } from 'lucide-react';

interface Props { onBack: () => void; }

const MarkAttendance: React.FC<Props> = ({ onBack }) => {
  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    Object.fromEntries(MOCK_STUDENTS.map(s => [s.id, true]))
  );

  const toggle = (id: string) => setAttendance(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="p-5 max-w-lg mx-auto flex flex-col min-h-full">
      <header className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 active:scale-90"><ChevronLeft size={24} /></button>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Mark Attendance</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ML Lab - {new Date().toLocaleDateString()}</p>
        </div>
      </header>

      <div className="space-y-3 flex-1">
        {MOCK_STUDENTS.map(student => (
          <div key={student.id} className="card-3d p-4 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800">{student.name}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase">{student.roll}</p>
            </div>
            <button 
              onClick={() => toggle(student.id)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                attendance[student.id] ? 'bg-green-500 text-white shadow-lg shadow-green-100' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {attendance[student.id] ? <Check size={24} strokeWidth={3} /> : <X size={24} strokeWidth={3} />}
            </button>
          </div>
        ))}
      </div>

      <button className="mt-8 mb-10 w-full py-4 bg-teal-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-100 active:scale-95 transition-all">
        <Save size={20} /> Save Attendance
      </button>
    </div>
  );
};

export default MarkAttendance;
