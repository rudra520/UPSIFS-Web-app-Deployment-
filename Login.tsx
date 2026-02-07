import React, { useState } from 'react';
import { UserRole, LoginCredentials } from '../types';
import { GraduationCap, UserCircle, Users, ShieldCheck, Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react';
import { UPSIFS_LOGO_URL } from '../utils/constants';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  onNavigateToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigateToSignup }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    role: UserRole.STUDENT,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { id: UserRole.STUDENT, label: 'Student', icon: GraduationCap, color: 'text-indigo-500', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
    { id: UserRole.TEACHER, label: 'Teacher', icon: UserCircle, color: 'text-teal-600', bgColor: 'bg-teal-50', borderColor: 'border-teal-200' },
    { id: UserRole.PARENT, label: 'Parent', icon: Users, color: 'text-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
    { id: UserRole.MANAGEMENT, label: 'Management', icon: ShieldCheck, color: 'text-rose-700', bgColor: 'bg-rose-50', borderColor: 'border-rose-200' },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCredentials(prev => ({ ...prev, role }));
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // Basic validation
      if (!credentials.email || !credentials.password) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      if (credentials.password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      // Simulate successful login
      onLogin(selectedRole || UserRole.STUDENT);
      setIsLoading(false);
    }, 1500);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setError('');
  };

  // Role Selection Screen
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-12">
          {/* Logo and Welcome */}
          <div className="text-center space-y-4">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)] border border-slate-100 mx-auto p-3">
              <img src={UPSIFS_LOGO_URL} alt="UPSIFS Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Welcome to UPSIFS</h1>
              <p className="text-slate-500 mt-1">Select your role to continue</p>
            </div>
          </div>

          {/* Role Grid */}
          <div className="w-full max-w-sm grid grid-cols-2 gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`card-3d aspect-square rounded-[22px] flex flex-col items-center justify-center p-6 space-y-4 hover:shadow-lg transition-all group ${role.bgColor} border-2 ${role.borderColor}`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <role.icon className={role.color} size={32} strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-slate-700 text-sm tracking-wide">{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center">
          <p className="text-sm text-slate-400">
            Don't have an account?{' '}
            <button onClick={onNavigateToSignup} className="text-indigo-600 font-semibold hover:underline">
              Sign up
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Login Form Screen
  const selectedRoleData = roles.find(r => r.id === selectedRole);

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Back Button and Header */}
        <div className="w-full max-w-sm mb-8">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-6"
          >
            <ArrowRight className="rotate-180" size={18} />
            <span className="text-sm font-medium">Back to roles</span>
          </button>
          
          <div className="text-center">
            <div className={`w-20 h-20 ${selectedRoleData?.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 ${selectedRoleData?.borderColor}`}>
              {selectedRoleData && <selectedRoleData.icon className={selectedRoleData.color} size={36} />}
            </div>
            <h1 className="text-2xl font-bold text-slate-800">{selectedRoleData?.label} Login</h1>
            <p className="text-slate-500 mt-1">Enter your credentials to continue</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="your.email@upsifs.ac.in"
                className="w-full bg-white border border-slate-200 pl-12 pr-4 py-4 rounded-2xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full bg-white border border-slate-200 pl-12 pr-12 py-4 rounded-2xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-slate-500">Remember me</span>
            </label>
            <button type="button" className="text-indigo-600 font-medium hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Demo Credentials</p>
          <div className="text-sm text-slate-600 space-y-1">
            <p><span className="font-medium">Email:</span> demo@upsifs.ac.in</p>
            <p><span className="font-medium">Password:</span> password123</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-sm text-slate-400">
          Don't have an account?{' '}
          <button onClick={onNavigateToSignup} className="text-indigo-600 font-semibold hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
