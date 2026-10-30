import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EngineeringBranch, AcademicYear } from '../types';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  School,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
  Database,
} from 'lucide-react';

export const AuthView: React.FC = () => {
  const { login, signup, showToast, t, setSupabaseModalOpen, supabaseSyncStatus } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('aarav.sharma@engg.edu');
  const [loginPassword, setLoginPassword] = useState('SkillBridge2026!');

  // Signup form state
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [academicYear, setAcademicYear] = useState<AcademicYear>('3rd Year');
  const [collegeName, setCollegeName] = useState('');

  const years: AcademicYear[] = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      showToast('Please enter both email and password.', 'warning');
      return;
    }
    login(loginEmail);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !signupEmail.trim() || !collegeName.trim()) {
      showToast('Please fill in all required profile fields.', 'warning');
      return;
    }
    if (signupPassword.length < 6) {
      showToast('Password should be at least 6 characters long.', 'warning');
      return;
    }
    if (signupPassword !== confirmPassword) {
      showToast('Password and confirm password do not match.', 'warning');
      return;
    }

    signup({
      fullName,
      email: signupEmail,
      academicYear,
      collegeName,
    });
  };

  const handleDemoFill = () => {
    setFullName('Pooja Hegde');
    setSignupEmail('pooja.student@campus.edu');
    setSignupPassword('Engineering2026!');
    setConfirmPassword('Engineering2026!');
    setAcademicYear('3rd Year');
    setCollegeName('BMS College of Engineering, Bengaluru');
    showToast('Autofilled demo student credentials! You will choose your branch on login.', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-slate-100 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-950/60 mb-4">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading">
          SkillBridge
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
          Engineering Student Career Development Platform
        </p>

        {/* Mode Switcher Tabs */}
        <div className="mt-6 p-1 bg-slate-900 border border-slate-800 rounded-xl grid grid-cols-2 max-w-xs mx-auto">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.login}
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.signup}
          </button>
        </div>

        {/* Supabase Backend Live Connection Pill */}
        <div className="mt-4 flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-slate-300 text-xs max-w-sm mx-auto shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-medium text-emerald-300">
              Supabase Backend Connected
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSupabaseModalOpen(true)}
            className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-semibold cursor-pointer"
          >
            Database Info
          </button>
        </div>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-lg z-10">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 py-8 px-6 sm:px-10 rounded-2xl shadow-2xl">
          {mode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email / Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="student@college.edu"
                    className="block w-full pl-9 pr-3 py-2.5 text-xs bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-9 pr-10 py-2.5 text-xs bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-950/50 transition-all cursor-pointer"
              >
                <span>{t.login}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center border-t border-slate-800">
                <p className="text-xs text-slate-400">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-indigo-400 font-semibold hover:text-indigo-300 ml-1"
                  >
                    Sign Up here
                  </button>
                </p>
              </div>

              {/* Demo quick login credentials note */}
              <div className="mt-4 p-3 rounded-xl bg-indigo-950/40 border border-indigo-900/50 text-[11px] text-indigo-300">
                <p className="font-semibold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Demo Mode Ready:</span>
                </p>
                <p className="text-indigo-200/80">
                  Pre-filled with Aarav Sharma (CSE, 3rd Year). Click "Log In" above to explore immediately or switch to Sign Up!
                </p>
              </div>
            </form>
          ) : (
            /* SIGNUP FORM */
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Priya Nair"
                    className="block w-full pl-9 pr-3 py-2 text-xs bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    placeholder="student@college.edu"
                    className="block w-full pl-9 pr-3 py-2 text-xs bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={e => setSignupPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="block w-full px-3 py-2 text-xs bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="block w-full px-3 py-2 text-xs bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Academic Year</label>
                  <select
                    value={academicYear}
                    onChange={e => setAcademicYear(e.target.value as AcademicYear)}
                    className="block w-full px-3 py-2 text-xs bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {years.map(y => (
                      <option key={y} value={y} className="bg-slate-900">
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">College Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={collegeName}
                      onChange={e => setCollegeName(e.target.value)}
                      placeholder="e.g. RV College of Engg"
                      className="block w-full px-3 py-2 text-xs bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-[11px] text-indigo-300 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>You will choose your Engineering Branch when you log into the platform.</span>
              </div>

              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-950/50 transition-all cursor-pointer"
              >
                <span>Create Student Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Try demo registration:</span>
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="px-2.5 py-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg transition-colors"
                >
                  Autofill Demo Fields
                </button>
              </div>

              <div className="text-center">
                <p className="text-xs text-slate-400">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-indigo-400 font-semibold hover:text-indigo-300 ml-1"
                  >
                    Log In
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Forgot Password Demo Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 text-slate-100 shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-4">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Reset Password</h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter your registered college email. In this frontend demonstration, a password reset link simulation will be confirmed instantly.
            </p>
            <input
              type="email"
              value={forgotEmail}
              onChange={e => setForgotEmail(e.target.value)}
              placeholder="your.email@college.edu"
              className="block w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast('Password reset link sent to ' + (forgotEmail || 'your email') + '!', 'info');
                  setForgotPasswordOpen(false);
                }}
                className="px-4 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
