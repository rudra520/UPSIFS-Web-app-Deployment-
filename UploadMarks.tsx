import React from 'react';
import { MOCK_STUDENTS } from '../../utils/constants';
import { ChevronLeft, Save } from 'lucide-react';

interface Props { onBack: () => void; }

const UploadMarks: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="p-5 max-w-lg mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 active:scale-90"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold text-slate-800">Upload Marks</h2>
      </header>

      <div className="card-3d p-6 mb-6 space-y-4">
        <select className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold text-slate-800 outline-none">
          <option>Mid-Sem Exam</option>
          <option>Practical Lab</option>
        </select>
        <select className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold text-slate-800 outline-none">
          <option>Database Management</option>
          <option>Machine Learning</option>
        </select>
      </div>

      <div className="space-y-3 mb-10">
        {MOCK_STUDENTS.map(s => (
          <div key={s.id} className="card-3d p-4 flex items-center justify-between">
            <div><h4 className="font-bold text-slate-800">{s.name}</h4><p className="text-[10px] text-slate-400 uppercase">{s.roll}</p></div>
            <input type="number" placeholder="Marks" className="w-20 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center font-bold text-slate-800" />
          </div>
        ))}
      </div>

      <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-100 active:scale-95 transition-all">
        <Save size={20} /> Submit Marks
      </button>
    </div>
  );
};

export default UploadMarks;
