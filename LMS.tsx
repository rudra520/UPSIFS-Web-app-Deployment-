import React, { useState } from 'react';
import { User, Subject } from '../../types';
import { MOCK_SUBJECTS } from '../../utils/constants';
import { BookOpen, ChevronDown, ChevronRight, FileText, PlayCircle, Download } from 'lucide-react';

interface LMSProps {
  user: User;
}

const LMS: React.FC<LMSProps> = ({ user }) => {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(MOCK_SUBJECTS[0].id);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-800">Study Material</h2>
        <p className="text-slate-500 font-medium">Semester {user.semester} - {user.department}</p>
      </div>

      <div className="space-y-4">
        {MOCK_SUBJECTS.map((subject) => (
          <div key={subject.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
              onClick={() => setExpandedSubject(expandedSubject === subject.id ? null : subject.id)}
              className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${expandedSubject === subject.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <BookOpen size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800 text-lg">{subject.name}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs font-bold text-teal-600">{subject.attendance}% Attendance</span>
                    <span className="text-xs font-bold text-slate-400">{subject.units.length} Units available</span>
                  </div>
                </div>
              </div>
              {expandedSubject === subject.id ? <ChevronDown size={24} className="text-slate-400" /> : <ChevronRight size={24} className="text-slate-400" />}
            </button>

            {expandedSubject === subject.id && (
              <div className="p-6 bg-slate-50 space-y-6">
                {subject.units.length > 0 ? (
                  subject.units.map((unit) => (
                    <div key={unit.id} className="space-y-3">
                      <h5 className="font-bold text-indigo-900 text-sm uppercase tracking-wider pl-2 border-l-4 border-indigo-600">{unit.title}</h5>
                      <div className="grid md:grid-cols-2 gap-3">
                        {unit.resources.map((res) => (
                          <div key={res.id} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-200 group hover:border-indigo-600 transition-colors shadow-sm">
                            <div className="flex items-center gap-3">
                              {res.type === 'VIDEO' ? (
                                <PlayCircle size={20} className="text-rose-500" />
                              ) : (
                                <FileText size={20} className="text-indigo-600" />
                              )}
                              <span className="text-sm font-bold text-slate-700">{res.name}</span>
                            </div>
                            <button className="text-slate-400 hover:text-indigo-600 p-2 rounded-lg transition-colors">
                              <Download size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-slate-400 text-sm italic">No materials uploaded yet for this subject.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LMS;
