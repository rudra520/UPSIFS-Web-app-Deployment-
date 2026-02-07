import React from 'react';
import { User } from '../../types';
import { MOCK_ASSIGNMENTS } from '../../utils/constants';
import { ClipboardList, Clock, CheckCircle, FileText, Upload } from 'lucide-react';

interface AssignmentsProps {
  user: User;
}

const Assignments: React.FC<AssignmentsProps> = ({ user }) => {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Assignments & Tasks</h2>
        <p className="text-slate-500">Track your pending submissions and feedback.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {MOCK_ASSIGNMENTS.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  assignment.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                  assignment.status === 'Graded' ? 'bg-teal-100 text-teal-700' :
                  'bg-indigo-100 text-indigo-700'
                }`}>
                  {assignment.status}
                </span>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={16} />
                  <span className="text-xs font-bold">{assignment.deadline}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2">{assignment.title}</h3>
              <p className="text-indigo-600 text-sm font-semibold mb-6">{assignment.subject}</p>
              
              {assignment.status === 'Graded' ? (
                <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-500">Marks Secured:</span>
                    <span className="text-lg font-black text-teal-600">{assignment.marks}</span>
                  </div>
                  <p className="text-xs text-slate-600 italic">"{assignment.remarks}"</p>
                </div>
              ) : (
                <div className="flex gap-4">
                  <div className="bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-2">
                    <FileText size={16} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-600">Problem_Statement.pdf</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              {assignment.status === 'Pending' ? (
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                  <Upload size={18} />
                  Submit Assignment
                </button>
              ) : (
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-500 rounded-2xl font-bold cursor-default">
                  <CheckCircle size={18} />
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
