import React, { useState } from 'react';
import { ChevronLeft, MessageSquare, Send, User } from 'lucide-react';

interface Props { onBack: () => void; }

const TeacherQueries: React.FC<Props> = ({ onBack }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const queries = [
    { id: 1, student: 'Aman Verma', msg: 'Need clarity on Unit 2 Neural Networks assignment deadline.', date: 'Today, 10:20 AM' },
    { id: 2, student: 'Priya Das', msg: 'Unable to access the lab dataset link.', date: 'Yesterday, 4:15 PM' },
  ];

  if (selected !== null) {
    const q = queries.find(it => it.id === selected)!;
    return (
      <div className="p-5 max-w-lg mx-auto">
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => setSelected(null)} className="p-2 -ml-2 text-slate-500 active:scale-90"><ChevronLeft size={24} /></button>
          <h2 className="text-xl font-bold text-slate-800">Query Detail</h2>
        </header>
        <div className="card-3d p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500"><User size={20} /></div>
            <div><h4 className="font-bold text-slate-800">{q.student}</h4><p className="text-[10px] text-slate-400 font-bold">{q.date}</p></div>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-2xl italic">"{q.msg}"</p>
          <div className="pt-4 space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase block">Your Reply</label>
            <textarea placeholder="Type your response..." className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 min-h-[120px] transition-all" />
            <button className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-100">
              <Send size={18} /> Send Reply
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-lg mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 active:scale-90"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold text-slate-800">Student Queries</h2>
      </header>

      <div className="space-y-4">
        {queries.map(q => (
          <button 
            key={q.id} 
            onClick={() => setSelected(q.id)}
            className="card-3d w-full p-5 flex flex-col items-start gap-2 text-left"
          >
            <div className="flex justify-between w-full">
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{q.student}</span>
              <span className="text-[10px] text-slate-400 font-bold">{q.date}</span>
            </div>
            <p className="text-sm font-bold text-slate-800 line-clamp-2">{q.msg}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeacherQueries;
