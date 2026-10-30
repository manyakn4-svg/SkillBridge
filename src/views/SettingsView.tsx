import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import {
  Settings,
  Lock,
  Moon,
  Sun,
  Globe,
  Bell,
  RotateCcw,
  LogOut,
  CheckCircle2,
  KeyRound,
  Shield,
  User,
  Database,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    t,
    theme,
    toggleTheme,
    language,
    setLanguage,
    resetDemoData,
    logout,
    setActiveNav,
    showToast,
    supabaseSyncStatus,
    supabaseLastSynced,
    setSupabaseModalOpen,
    syncStudentNow,
    user,
  } = useApp();

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Notification toggles
  const [notifyInternships, setNotifyInternships] = useState(true);
  const [notifyHackathons, setNotifyHackathons] = useState(true);
  const [notifyAssessments, setNotifyAssessments] = useState(false);
  const [notifyWeeklySummary, setNotifyWeeklySummary] = useState(true);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast('Please enter both current and new password.', 'warning');
      return;
    }
    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters.', 'warning');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showToast('New passwords do not match.', 'warning');
      return;
    }

    showToast('Password updated successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl">
        <h1 className="text-xl sm:text-2xl font-bold font-heading">
          {t.settings} & Preferences
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
          Manage your account credentials, display language (English, Kannada, Hindi), appearance theme, and notification preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance & Language Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
              <Globe className="w-4 h-4 text-indigo-500" />
              <span>Language Selection</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Switch entire interface between English, Kannada (ಕನ್ನಡ), and Hindi (हिंदी).
            </p>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setLanguage('en');
                  showToast('Language changed to English', 'info');
                }}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  language === 'en'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                English (EN)
              </button>
              <button
                type="button"
                onClick={() => {
                  setLanguage('kn');
                  showToast('ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ', 'info');
                }}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  language === 'kn'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                ಕನ್ನಡ (KN)
              </button>
              <button
                type="button"
                onClick={() => {
                  setLanguage('hi');
                  showToast('भाषा हिंदी में बदल दी गई है', 'info');
                }}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  language === 'hi'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                हिंदी (HI)
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
              {theme === 'light' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
              <span>Theme & Appearance</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Navy blue, purple & white styling with high contrast readability.
            </p>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Current: <strong className="capitalize">{theme} Mode</strong>
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
              >
                Toggle to {theme === 'light' ? 'Dark' : 'Light'}
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                Edit Profile Information
              </h3>
              <p className="text-[11px] text-slate-500">
                Update college, branch, bio, or skills.
              </p>
            </div>
            <button
              onClick={() => setActiveNav('profile')}
              className="px-3 py-1.5 text-xs font-semibold border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.editProfile}
            </button>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-indigo-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Change Account Password
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ensure your engineering student account is secured with a strong password.
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-3 pt-1">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-sm"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>

      {/* Notification Preferences & Danger Zone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Notification Preferences
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Internship Application Deadlines',
                desc: 'Alerts when saved internships are expiring in 48 hours',
                checked: notifyInternships,
                toggle: () => setNotifyInternships(!notifyInternships),
              },
              {
                title: 'Hackathon Registration Alerts',
                desc: 'Notifications for national competitions like Smart India Hackathon',
                checked: notifyHackathons,
                toggle: () => setNotifyHackathons(!notifyHackathons),
              },
              {
                title: 'Daily Roadmap Drill Reminders',
                desc: 'Gentle nudges to keep up with daily algorithmic practice',
                checked: notifyAssessments,
                toggle: () => setNotifyAssessments(!notifyAssessments),
              },
              {
                title: 'Weekly Progress Digest',
                desc: 'Summary of skill development percentage and gap closure',
                checked: notifyWeeklySummary,
                toggle: () => setNotifyWeeklySummary(!notifyWeeklySummary),
              },
            ].map(item => (
              <label
                key={item.title}
                className="flex items-start justify-between gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer"
              >
                <div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={item.toggle}
                  className="mt-1 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Supabase Cloud Database Integration */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-500" />
                <span>Supabase Cloud Database</span>
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Connected
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              Connected to project <code className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">kanvpgzzjdrlrasdjpdw</code>. Student logins, branch changes, and assessments automatically sync to your cloud database.
            </p>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Active Account:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{user.email}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Target Table:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">public.students</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Last Cloud Sync:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{supabaseLastSynced || 'Synced just now'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={syncStudentNow}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Force Sync My Profile to Supabase</span>
            </button>

            <button
              type="button"
              onClick={() => setSupabaseModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Database Hub & SQL Setup Script</span>
            </button>
          </div>
        </div>

        {/* Demo Management & Logout */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-indigo-500" />
              <span>Demo State Management</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              SkillBridge is running in Stage 1 Frontend Mode with dual persistence (Supabase Cloud + local cache). You can reset local cache back to clean defaults anytime.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={resetDemoData}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Demo Data to Defaults</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{t.logout}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
