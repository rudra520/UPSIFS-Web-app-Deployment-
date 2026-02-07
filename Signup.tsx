import React, { useState } from 'react';
import { UserRole, RegisterData } from '../types';
import { GraduationCap, UserCircle, Users, ShieldCheck, Eye, EyeOff, ArrowRight, Mail, Lock, User, Building2, BookOpen } from 'lucide-react';
import { UPSIFS_LOGO_URL } from '../utils/constants';

interface SignupProps {
  onSignup: (role: UserRole) => void;
  onNavigateToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup, onNavigateToLogin }) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    role: UserRole.STUDENT,
    department: '',
    semester: 1,
    enrollmentNo: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { id: UserRole.STUDENT, label: 'Student', icon: GraduationCap, color: 'text-indigo-500', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
    { id: UserRole.TEACHER, label: 'Teacher', icon: UserCircle, color: 'text-teal-600', bgColor: 'bg-teal-50', borderColor: 'border-teal-200' },
    { id: UserRole.PARENT, label: 'Parent', icon: Users, color: 'text-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
    { id: UserRole.MANAGEMENT, label: 'Management', icon: ShieldCheck, color: 'text-rose-700', bgColor: 'bg-rose-50', borderColor: 'border-rose-200' },
  ];

  const departments = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Business Administration',
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setFormData(prev => ({ ...prev, role }));
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'semester' ? parseInt(value) : value }));
    setError('');
  };

  const validateStep1 = () => {
    if (!selectedRole) {
      setError('Please select a role');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Please enter a password');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.department) {
      setError('Please select your department');
      return false;
    }
    if (selectedRole === UserRole.STUDENT && !formData.enrollmentNo) {
      setError('Please enter your enrollment number');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    } else {
      onNavigateToLogin();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      onSignup(selectedRole || UserRole.STUDENT);
      setIsLoading(false);
    }, 1500);
  };

  const selectedRoleData = roles.find(r => r.id === selectedRole);

  // Step 1: Role Selection
  if (step === 1) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-12">
          {/* Logo and Welcome */}
          <div className="text-center space-y-4">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)] border border-slate-100 mx-auto p-3">
              <img src={UPSIFS_LOGO_URL} alt="UPSIFS Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
              <p className="text-slate-500 mt-1">Select your role to get started</p>
            </div>
          </div>

          {/* Role Grid */}
          <div className="w-full max-w-sm grid grid-cols-2 gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`card-3d aspect-square rounded-[22px] flex flex-col items-center justify-center p-6 space-y-4 hover:shadow-lg transition-all group ${
                  selectedRole === role.id ? `${role.bgColor} border-2 ${role.borderColor} ring-2 ring-offset-2 ring-indigo-500` : 'border-2 border-transparent'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl ${selectedRole === role.id ? 'bg-white' : 'bg-slate-50'} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <role.icon className={role.color} size={32} strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-slate-700 text-sm tracking-wide">{role.label}</span>
              </button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="w-full max-w-sm p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-full max-w-sm py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
          >
            Continue <ArrowRight size={18} />
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <button onClick={onNavigateToLogin} className="text-indigo-600 font-semibold hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Step 2: Account Details
  if (step === 2) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Progress Indicator */}
          <div className="w-full max-w-sm mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-2 flex-1 bg-indigo-600 rounded-full" />
              <div className="h-2 flex-1 bg-indigo-600 rounded-full" />
              <div className="h-2 flex-1 bg-slate-200 rounded-full" />
            </div>
            
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-6"
            >
              <ArrowRight className="rotate-180" size={18} />
              <span className="text-sm font-medium">Back</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-800">Account Details</h1>
              <p className="text-slate-500 mt-1">Enter your personal information</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="w-full max-w-sm space-y-5">
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full bg-white border border-slate-200 pl-12 pr-4 py-4 rounded-2xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
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
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password (min 6 chars)"
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

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full bg-white border border-slate-200 pl-12 pr-4 py-4 rounded-2xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
            >
              Continue <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Step 3: Additional Details
  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Progress Indicator */}
        <div className="w-full max-w-sm mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-2 flex-1 bg-indigo-600 rounded-full" />
            <div className="h-2 flex-1 bg-indigo-600 rounded-full" />
            <div className="h-2 flex-1 bg-indigo-600 rounded-full" />
          </div>
          
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-6"
          >
            <ArrowRight className="rotate-180" size={18} />
            <span className="text-sm font-medium">Back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800">Complete Profile</h1>
            <p className="text-slate-500 mt-1">Fill in your academic details</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Department</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 pl-12 pr-4 py-4 rounded-2xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {selectedRole === UserRole.STUDENT && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Enrollment Number</label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    name="enrollmentNo"
                    value={formData.enrollmentNo}
                    onChange={handleInputChange}
                    placeholder="e.g., CS2021001"
                    className="w-full bg-white border border-slate-200 pl-12 pr-4 py-4 rounded-2xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Semester</label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-200 pl-12 pr-4 py-4 rounded-2xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-center text-slate-400">
            By creating an account, you agree to our{' '}
            <button type="button" className="text-indigo-600 hover:underline">Terms of Service</button>
            {' '}and{' '}
            <button type="button" className="text-indigo-600 hover:underline">Privacy Policy</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
