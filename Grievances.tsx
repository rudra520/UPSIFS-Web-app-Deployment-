import React, { useState } from 'react';
import { User } from '../../types';
import { MOCK_GRIEVANCES } from '../../utils/constants';
import { MessageSquare, Send, Paperclip, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface GrievancesProps {
  user: User;
}

const Grievances: React.FC<GrievancesProps> = ({ user }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState('General');

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
      <div className="md:w-1/2 space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Support & Feedback</h2>
          <p className="text-slate-500 font-medium">Have an issue? We're here to help.</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700 bg-slate-50"
              >
                <option>General</option>
                <option>Infrastructure</option>
                <option>Academic</option>
                <option>Canteen</option>
                <option>Hostel</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
              <textarea 
                rows={4}
                placeholder="Describe your concern in detail..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50"
              ></textarea>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-3">
               <button className="p-2 bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                  <Paperclip size={20} />
               </button>
               <span className="text-xs font-bold text-slate-400">Attach Screenshot (Optional)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Anonymous</span>
              <button 
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`w-10 h-5 rounded-full relative transition-colors ${isAnonymous ? 'bg-indigo-600' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${isAnonymous ? 'left-5.5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
             <Send size={18} />
             Submit Ticket
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 px-2">
          <Clock size={20} className="text-indigo-600" />
          Previous Tickets
        </h3>
        
        <div className="space-y-4">
          {MOCK_GRIEVANCES.map((g) => (
            <div key={g.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                  g.status === 'Open' ? 'bg-indigo-100 text-indigo-700' :
                  g.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                  'bg-teal-100 text-teal-700'
                }`}>
                  {g.status}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{g.date}</span>
              </div>
              <h4 className="font-bold text-slate-800 mb-1">{g.category} Issue</h4>
              <p className="text-sm text-slate-600 line-clamp-2">{g.description}</p>
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                   {g.status === 'Resolved' ? <CheckCircle2 size={12} className="text-teal-600" /> : <AlertCircle size={12} className="text-amber-500" />}
                </div>
                <span className="text-[10px] font-bold text-slate-400">Ref: #{g.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grievances;
