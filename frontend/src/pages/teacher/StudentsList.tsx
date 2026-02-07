import React, { useState } from 'react';
import { MOCK_STUDENTS, UPSIFS_LOGO_URL } from '../../utils/constants';
import { ChevronLeft, Search, Users, ChevronRight } from 'lucide-react';

interface Props { 
  onBack: () => void; 
  onSelectStudent: (id: string) => void;
}

const StudentsList: React.FC<Props> = ({ onBack, onSelectStudent }) => {
  const [search, setSearch] = useState('');
  const filtered = MOCK_STUDENTS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-5 max-w-lg mx-auto">
      <header className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 active:scale-90"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold text-slate-800">Students List</h2>
      </header>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" placeholder="Search by name or roll..." 
          className="w-full bg-white border border-slate-100 p-4 pl-12 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-800"
          value={search} onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.map(s => (
          <button 
            key={s.id} 
            onClick={() => onSelectStudent(s.id)}
            className="card-3d w-full p-4 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100 p-2 overflow-hidden">
                <img src={UPSIFS_LOGO_URL} alt="UPSIFS Logo" className="w-full h-full object-contain" />
              </div>
              <div><h4 className="font-bold text-slate-800">{s.name}</h4><p className="text-[10px] text-slate-400 font-black uppercase">{s.roll} • {s.batch}</p></div>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentsList;
