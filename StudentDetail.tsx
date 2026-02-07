import React from 'react';
import { MOCK_STUDENTS, UPSIFS_LOGO_URL } from '../../utils/constants';
import { ChevronLeft, BarChart2, GraduationCap, Calendar } from 'lucide-react';

interface Props { studentId: string | null; onBack: () => void; }

const StudentDetail: React.FC<Props> = ({ studentId, onBack }) => {
  const student = MOCK_STUDENTS.find(s => s.id === studentId) || MOCK_STUDENTS[0];

  return (
    <div className="p-5 max-w-lg mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 active:scale-90">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-slate-800">Student Detail</h2>
      </header>

      <div className="card-3d p-8 flex flex-col items-center text-center mb-6">
        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center border border-slate-100 p-4 shadow-xl shadow-slate-100 overflow-hidden">
          <img src={UPSIFS_LOGO_URL} alt="UPSIFS Logo" className="w-full h-full object-contain" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mt-4 tracking-tight">{student.name}</h3>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
          {student.roll} • Batch {student.batch}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card-3d p-6 flex flex-col items-center">
          <BarChart2 className="text-teal-500 mb-3" size={24} />
          <span className="text-2xl font-black text-slate-800">{student.attendance}%</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Attendance</span>
        </div>
        <div className="card-3d p-6 flex flex-col items-center">
          <GraduationCap className="text-indigo-500 mb-3" size={24} />
          <span className="text-2xl font-black text-slate-800">{student.marks}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Current GPA</span>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Recent Activities</h3>
        <div className="card-3d p-5 flex items-center gap-4">
          <div className="p-3 bg-slate-50 rounded-xl text-slate-400 border border-slate-100 shadow-inner">
            <Calendar size={20} />
          </div>
          <div>
            <h5 className="font-bold text-sm text-slate-800">Lab session attended</h5>
            <p className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">2 days ago</p>
          </div>
        </div>
        <div className="card-3d p-5 flex items-center gap-4">
          <div className="p-3 bg-slate-50 rounded-xl text-slate-400 border border-slate-100 shadow-inner">
            <GraduationCap size={20} />
          </div>
          <div>
            <h5 className="font-bold text-sm text-slate-800">Internal marks updated</h5>
            <p className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">1 week ago</p>
          </div>
        </div>
      </div>
      
      {/* Bottom spacing for safety */}
      <div className="h-10"></div>
    </div>
  );
};

export default StudentDetail;
