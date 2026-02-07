import React from 'react';
import { User } from '../../types';
import { MOCK_SUBJECTS } from '../../utils/constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

interface AttendanceProps {
  user: User;
}

const Attendance: React.FC<AttendanceProps> = ({ user }) => {
  const data = MOCK_SUBJECTS.map(s => ({ name: s.name, attendance: s.attendance }));
  const overall = Math.round(data.reduce((acc, curr) => acc + curr.attendance, 0) / data.length);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Attendance Tracker</h2>
          <p className="text-slate-500 font-medium">Keep your attendance above 75% to avoid debarment.</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 flex items-center gap-6 shadow-xl shadow-slate-100">
           <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                <circle cx="40" cy="40" r="36" fill="transparent" stroke="#4f46e5" strokeWidth="8" strokeDasharray={226} strokeDashoffset={226 - (226 * overall) / 100} strokeLinecap="round" />
              </svg>
              <span className="absolute text-xl font-black text-slate-800">{overall}%</span>
           </div>
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Overall Score</p>
              <h4 className="text-xl font-bold text-indigo-600">Good Standing</h4>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
         <div className="bg-teal-50 p-6 rounded-3xl border border-teal-100">
            <CheckCircle2 className="text-teal-600 mb-4" size={32} />
            <h4 className="font-bold text-slate-800">Regular</h4>
            <p className="text-xs text-slate-600 mt-1">You attended all lectures last week.</p>
         </div>
         <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
            <TrendingUp className="text-indigo-600 mb-4" size={32} />
            <h4 className="font-bold text-slate-800">Improving</h4>
            <p className="text-xs text-slate-600 mt-1">Attendance in DBMS increased by 5%.</p>
         </div>
         <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100">
            <AlertTriangle className="text-rose-600 mb-4" size={32} />
            <h4 className="font-bold text-slate-800">At Risk</h4>
            <p className="text-xs text-slate-600 mt-1">DBMS is near the 75% threshold.</p>
         </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-8">Subject-wise Analytics</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                cursor={{ fill: '#f8fafc' }}
              />
              <Bar dataKey="attendance" radius={[10, 10, 0, 0]} barSize={40}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.attendance < 75 ? '#f43f5e' : '#4f46e5'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
