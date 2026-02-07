import React from 'react';
import { User, UserRole } from '../../types';
import { DASHBOARD_CONFIGS } from '../../utils/constants';
import { ChevronRight } from 'lucide-react';

interface DashboardProps {
  user: User;
  setCurrentPage: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setCurrentPage }) => {
  const config = DASHBOARD_CONFIGS[user.role] || DASHBOARD_CONFIGS[UserRole.STUDENT];

  return (
    <div className="p-5 space-y-5 max-w-lg mx-auto">
      {/* Welcome Message */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Hello, {user.name.split(' ')[0]}! 👋</h1>
        <p className="text-slate-500 text-sm mt-1">Here's your academic overview</p>
      </div>

      {/* 1. Primary Card (Stat or Action focused) - Full-width */}
      <section 
        className="card-3d w-full p-8 flex flex-col items-center justify-center text-center cursor-pointer"
        onClick={() => config.primary1.id && setCurrentPage(config.primary1.id)}
      >
        {config.primary1.value ? (
          <>
            <span className="text-5xl font-semibold text-slate-800 tracking-tight">{config.primary1.value}</span>
            <span className="text-[11px] font-semibold text-slate-400 mt-3 uppercase tracking-[0.15em] icon-label">
              {config.primary1.label}
            </span>
          </>
        ) : (
          <div className="flex flex-col items-center">
             <span className="text-3xl mb-3">{config.primary1.emoji}</span>
             <h4 className="font-semibold text-xl text-slate-800 leading-tight">{config.primary1.label}</h4>
             <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">{config.primary1.sub}</p>
          </div>
        )}
        <div className={`w-14 h-1.5 ${config.primary1.accent || 'bg-indigo-600'} rounded-full mt-5 opacity-40`}></div>
      </section>

      {/* 2. Secondary Card (Info/Status focused) - Full-width */}
      <section 
        className="card-3d w-full p-6 flex items-center justify-between cursor-pointer"
        onClick={() => config.primary2.id && setCurrentPage(config.primary2.id)}
      >
        <div className="flex items-center gap-4 text-slate-700">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100 shadow-inner">
            {config.primary2.emoji ? (
              <span className="text-xl">{config.primary2.emoji}</span>
            ) : (
              <config.primary2.icon size={20} strokeWidth={2} />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-lg text-slate-800 leading-tight">{config.primary2.label}</h4>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">{config.primary2.sub}</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-slate-300" />
      </section>

      {/* 3. Grid Section (2x2 Grid) */}
      <section className="grid grid-cols-2 gap-5">
        {config.grid.map((card: any) => (
          <button
            key={card.id}
            onClick={() => setCurrentPage(card.id)}
            className="card-3d aspect-square p-6 flex flex-col items-start justify-between text-left"
          >
            <div className={`${card.bg || 'bg-slate-50'} p-3 rounded-xl ${card.color || 'text-slate-500'} border border-slate-100 shadow-inner`}>
              {card.emoji ? (
                <span className="text-xl">{card.emoji}</span>
              ) : (
                <card.icon size={20} strokeWidth={1.8} />
              )}
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 text-sm leading-tight tracking-tight">{card.label}</h4>
              <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">{card.sub}</p>
            </div>
          </button>
        ))}
      </section>

      {/* 4. Support Card (Action focused) - Full-width */}
      <section 
        onClick={() => setCurrentPage(config.support.id)}
        className="card-3d w-full p-6 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="bg-indigo-50 p-3 rounded-xl text-[#1e1b4b] border border-indigo-100 flex items-center justify-center">
            {config.support.emoji ? (
              <span className="text-xl">{config.support.emoji}</span>
            ) : (
              <ChevronRight size={22} className="rotate-180 opacity-40" />
            )}
          </div>
          <div>
            <span className="font-semibold text-lg text-slate-800 tracking-tight">{config.support.label}</span>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">{config.support.sub}</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-slate-300" />
      </section>

      {/* Bottom spacing for safety */}
      <div className="h-10"></div>
    </div>
  );
};

export default Dashboard;
