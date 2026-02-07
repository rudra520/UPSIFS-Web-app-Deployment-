import React, { useState } from 'react';
import { MOCK_NOTICES } from '../../utils/constants';
import { Bell, Search, Filter, Pin, Calendar, ChevronRight } from 'lucide-react';

const Notices: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Exam', 'Event', 'Holiday', 'General'];

  const filteredNotices = filter === 'All' 
    ? MOCK_NOTICES 
    : MOCK_NOTICES.filter(n => n.category === filter);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Campus Notices</h2>
          <p className="text-slate-500 font-medium">Stay updated with the latest university circulars</p>
        </div>
        <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div key={notice.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group relative overflow-hidden">
            {notice.isPinned && (
              <div className="absolute top-0 right-0 p-3">
                <Pin size={16} className="text-rose-500 rotate-45" />
              </div>
            )}
            
            <div className="flex items-start gap-5">
              <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                notice.category === 'Exam' ? 'bg-amber-100 text-amber-600' :
                notice.category === 'Holiday' ? 'bg-teal-100 text-teal-600' :
                'bg-indigo-100 text-indigo-600'
              }`}>
                <Bell size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{notice.category}</span>
                  <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <Calendar size={10} />
                    {notice.date}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{notice.title}</h4>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">{notice.content}</p>
                <button className="mt-4 flex items-center gap-2 text-indigo-600 font-bold text-xs hover:underline">
                  Read Full Circular <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notices;
