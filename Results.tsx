import React from 'react';
import { Award, Calculator, ChevronRight, GraduationCap, Star } from 'lucide-react';

const Results: React.FC = () => {
  const semesters = [
    { sem: 1, sgpa: 8.2, status: 'Pass' },
    { sem: 2, sgpa: 8.5, status: 'Pass' },
    { sem: 3, sgpa: 8.6, status: 'Pass' },
    { sem: 4, sgpa: 'Awaiting', status: '-' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Academic Results</h2>
          <p className="text-slate-500">Official statement of marks and credits.</p>
        </div>
        <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-6 rounded-[2rem] text-white flex items-center gap-6 shadow-xl shadow-amber-100">
          <div className="p-3 bg-white/20 rounded-2xl">
            <GraduationCap size={32} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Current CGPA</p>
            <h4 className="text-3xl font-black">8.43</h4>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 px-2">
            <Award size={20} className="text-indigo-600" />
            Semester Performance
          </h3>
          <div className="space-y-3">
            {semesters.map((s, i) => (
              <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black">
                    {s.sem}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Semester {s.sem}</h5>
                    <span className="text-[10px] font-bold text-teal-600 uppercase">{s.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-slate-800">{s.sgpa}</div>
                  <p className="text-[10px] font-bold text-slate-400">SGPA</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-600 rounded-2xl">
              <Calculator size={24} />
            </div>
            <h3 className="text-xl font-bold">Grade Estimator</h3>
          </div>
          <p className="text-slate-400 text-sm mb-8">Estimate your upcoming SGPA based on internal and practical assessments.</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Subject Internals (Avg)</label>
              <input type="range" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Lab Practicals (Avg)</label>
              <input type="range" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
            </div>
            
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Estimated SGPA</p>
                <h4 className="text-2xl font-black text-teal-400">~ 8.75</h4>
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-2xl font-bold transition-colors">
                Detailed Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
