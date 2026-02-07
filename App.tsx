import React, { useState } from 'react';
import { User, UserRole } from './types';
import { MOCK_USER_STUDENT, UPSIFS_LOGO_URL } from './utils/constants';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Student Pages
import Dashboard from './pages/student/Dashboard';
import Attendance from './pages/student/Attendance';
import LMS from './pages/student/LMS';
import Assignments from './pages/student/Assignments';
import Results from './pages/student/Results';
import Notices from './pages/student/Notices';
import Grievances from './pages/student/Grievances';
import Profile from './pages/student/Profile';

// Teacher Pages
import MarkAttendance from './pages/teacher/MarkAttendance';
import TeacherTimetable from './pages/teacher/Timetable';
import UploadPPT from './pages/teacher/UploadPPT';
import UploadMarks from './pages/teacher/UploadMarks';
import EditTimetable from './pages/teacher/EditTimetable';
import StudentsList from './pages/teacher/StudentsList';
import StudentDetail from './pages/teacher/StudentDetail';
import TeacherQueries from './pages/teacher/Queries';

// Settings Pages
import NotificationsPage from './pages/settings/Notifications';
import SecurityPage from './pages/settings/Security';
import PreferencesPage from './pages/settings/Preferences';

import { Menu, X, Home, BarChart2, Calendar, BookOpen, FileText, Bell, CreditCard, MessageSquare, LogOut, Users, UserCog, ShieldCheck, UploadCloud, Pencil } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = (role: UserRole) => {
    setUser({ ...MOCK_USER_STUDENT, role, name: role === UserRole.TEACHER ? 'Dr. Sarah Smith' : 'Aryan Sharma' });
    setCurrentPage('dashboard');
  };

  const handleSignup = (role: UserRole) => {
    setUser({ ...MOCK_USER_STUDENT, role, name: role === UserRole.TEACHER ? 'Dr. Sarah Smith' : 'Aryan Sharma' });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
    setIsDrawerOpen(false);
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const navigateTo = (page: string, params?: any) => {
    setCurrentPage(page);
    if (params?.studentId) setSelectedStudentId(params.studentId);
    setIsDrawerOpen(false);
  };

  // Show Login/Signup if not authenticated
  if (!user) {
    if (showSignup) {
      return <Signup onSignup={handleSignup} onNavigateToLogin={() => setShowSignup(false)} />;
    }
    return <Login onLogin={handleLogin} onNavigateToSignup={() => setShowSignup(true)} />;
  }

  const brandColor = user.role === UserRole.TEACHER ? '#0d9488' : '#1e1b4b';

  const renderPage = () => {
    // Shared / System Pages
    if (currentPage === 'settings_notifications') return <NotificationsPage onBack={() => navigateTo('profile')} brandColor={brandColor} />;
    if (currentPage === 'settings_security') return <SecurityPage onBack={() => navigateTo('profile')} brandColor={brandColor} />;
    if (currentPage === 'settings_preferences') return <PreferencesPage onBack={() => navigateTo('profile')} brandColor={brandColor} />;
    if (currentPage === 'profile') return <Profile user={user} onLogout={handleLogout} onNavigateToSettings={navigateTo} />;

    // Dynamic Role Check
    if (user.role === UserRole.TEACHER) {
      switch (currentPage) {
        case 'dashboard': return <Dashboard user={user} setCurrentPage={navigateTo} />;
        case 'mark_attendance': return <MarkAttendance onBack={() => navigateTo('dashboard')} />;
        case 'timetable': return <TeacherTimetable onBack={() => navigateTo('dashboard')} />;
        case 'upload_ppt': return <UploadPPT onBack={() => navigateTo('dashboard')} />;
        case 'upload_marks': return <UploadMarks onBack={() => navigateTo('dashboard')} />;
        case 'edit_timetable': return <EditTimetable onBack={() => navigateTo('dashboard')} />;
        case 'students_list': return <StudentsList onBack={() => navigateTo('dashboard')} onSelectStudent={(id) => navigateTo('student_detail', { studentId: id })} />;
        case 'student_detail': return <StudentDetail studentId={selectedStudentId} onBack={() => navigateTo('students_list')} />;
        case 'queries': return <TeacherQueries onBack={() => navigateTo('dashboard')} />;
        default: return <Dashboard user={user} setCurrentPage={navigateTo} />;
      }
    }

    // Default (Student View)
    switch (currentPage) {
      case 'dashboard': return <Dashboard user={user} setCurrentPage={navigateTo} />;
      case 'attendance': return <Attendance user={user} />;
      case 'lms': return <LMS user={user} />;
      case 'assignments': return <Assignments user={user} />;
      case 'results': return <Results />;
      case 'notices': return <Notices />;
      case 'grievance': return <Grievances user={user} />;
      default: return <Dashboard user={user} setCurrentPage={navigateTo} />;
    }
  };

  const getMenuItems = (role: UserRole) => {
    const common = [{ id: 'dashboard', label: 'Dashboard', icon: Home }];
    
    switch (role) {
      case UserRole.STUDENT:
        return [
          ...common,
          { id: 'attendance', label: 'Attendance', icon: BarChart2 },
          { id: 'timetable', label: 'Time Table', icon: Calendar },
          { id: 'lms', label: 'Study Material', icon: BookOpen },
          { id: 'results', label: 'Results', icon: FileText },
          { id: 'notices', label: 'Notices', icon: Bell },
          { id: 'fee', label: 'Fee', icon: CreditCard },
          { id: 'grievance', label: 'Student Support', icon: MessageSquare },
        ];
      case UserRole.TEACHER:
        return [
          ...common,
          { id: 'mark_attendance', label: 'Mark Attendance', icon: BarChart2 },
          { id: 'timetable', label: 'Time Table', icon: Calendar },
          { id: 'upload_ppt', label: 'Upload PPT', icon: UploadCloud },
          { id: 'upload_marks', label: 'Upload Marks', icon: FileText },
          { id: 'students_list', label: 'Students List', icon: Users },
          { id: 'queries', label: 'Queries', icon: MessageSquare },
        ];
      default:
        return common;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col">
      <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-100 z-40 sticky top-0">
        <button onClick={toggleDrawer} className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors active:scale-95">
          <Menu size={22} strokeWidth={2} />
        </button>
        <h1 className="text-base font-medium tracking-tight" style={{ color: brandColor }}>{user.role}</h1>
        <button onClick={() => navigateTo('profile')} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 overflow-hidden active:scale-95 transition-all shadow-sm flex items-center justify-center p-1">
          <img src={UPSIFS_LOGO_URL} alt="UPSIFS Logo" className="w-full h-full object-contain" />
        </button>
      </header>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="drawer-overlay fixed inset-0" onClick={toggleDrawer}></div>
          <div className="drawer-content relative w-72 bg-white h-full shadow-2xl flex flex-col border-r border-slate-50">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-100 p-1.5 shadow-sm">
                  <img src={UPSIFS_LOGO_URL} alt="UPSIFS Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-semibold text-xl text-slate-800 tracking-tight">UPSIFS</span>
              </div>
              <button onClick={toggleDrawer} className="text-slate-300 hover:text-slate-500 transition-colors"><X size={20} /></button>
            </div>
            <nav className="flex-1 py-6 px-4 overflow-y-auto space-y-1.5">
              {getMenuItems(user.role).map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    currentPage === item.id 
                      ? 'bg-slate-50 font-semibold shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] border border-slate-100' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                  style={currentPage === item.id ? { color: brandColor } : {}}
                >
                  <item.icon size={18} strokeWidth={currentPage === item.id ? 2.5 : 2} />
                  <span className="text-sm tracking-wide">{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="p-8 border-t border-slate-50">
              <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 text-rose-500 font-semibold hover:bg-rose-50 rounded-xl transition-all">
                <LogOut size={18} /><span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-x-hidden">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
