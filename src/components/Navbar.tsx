import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Menu,
  GraduationCap,
  Sparkles,
  User,
  LogOut,
  Database,
} from 'lucide-react';
import { Language } from '../types';

export const Navbar: React.FC<{ onMobileMenuToggle: () => void }> = ({ onMobileMenuToggle }) => {
  const {
    t,
    language,
    setLanguage,
    theme,
    toggleTheme,
    user,
    isAuthenticated,
    logout,
    activeNav,
    setActiveNav,
    setBranchModalOpen,
    supabaseSyncStatus,
    setSupabaseModalOpen,
  } = useApp();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageLabels: Record<Language, { label: string; native: string }> = {
    en: { label: 'English', native: 'EN' },
    kn: { label: 'ಕನ್ನಡ', native: 'ಕನ್ನ' },
    hi: { label: 'हिंदी', native: 'हिं' },
  };

  const navTitles: Record<string, string> = {
    dashboard: t.dashboard,
    profile: t.myProfile,
    assessment: t.skillAssessment,
    'skill-gap': t.skillGapAnalysis,
    roadmap: t.learningRoadmap,
    internships: t.internships,
    projects: t.projects,
    hackathons: t.hackathons,
    resources: t.learningResources,
    settings: t.settings,
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-6 px-4 md:px-7 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Zone 1 & 2: Mobile toggle + Breadcrumb & Section indicator */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 font-bold text-xs tracking-wider">
            SB
          </span>
          <div>
            <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              {navTitles[activeNav] || t.dashboard}
            </h1>
            <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400">
              {user.branch} · {user.academicYear} · {user.collegeName.split(',')[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Zone 3: Actions (Supabase, Branch, Language, Theme, User) */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Supabase Cloud Sync Status Pill */}
        <button
          onClick={() => setSupabaseModalOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors cursor-pointer"
          title="Supabase Cloud Database (kanvpgzzjdrlrasdjpdw) - Click to inspect"
        >
          <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="hidden sm:inline">Supabase</span>
          <span
            className={`w-2 h-2 rounded-full ${
              supabaseSyncStatus === 'syncing'
                ? 'bg-amber-400 animate-ping'
                : supabaseSyncStatus === 'error'
                ? 'bg-rose-500'
                : 'bg-emerald-500'
            }`}
          />
        </button>

        {/* Branch Selector Button */}
        <button
          onClick={() => setBranchModalOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer"
          title="Change Engineering Branch"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{user.branch}</span>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </button>

        {/* Language Switcher */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200/70 dark:border-slate-700 transition-colors whitespace-nowrap"
            aria-label="Select language"
            aria-expanded={langDropdownOpen}
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{languageLabels[language].native}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {langDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-36 py-1 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95">
              {(['en', 'kn', 'hi'] as Language[]).map(langKey => (
                <button
                  key={langKey}
                  onClick={() => {
                    setLanguage(langKey);
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                    language === langKey
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{languageLabels[langKey].label}</span>
                  <span className="text-[10px] text-slate-400">{languageLabels[langKey].native}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200/70 dark:border-slate-700 transition-colors"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 text-slate-700" />
          ) : (
            <Sun className="w-4 h-4 text-amber-300" />
          )}
        </button>

        {/* Profile Pill / Dropdown */}
        {isAuthenticated ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-2 text-xs font-medium text-slate-800 dark:text-slate-100 bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200/70 dark:border-slate-700 transition-colors"
              aria-label="User account menu"
            >
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-700 to-purple-600 flex items-center justify-center text-white font-bold text-[11px] shadow-sm">
                {user.fullName.charAt(0)}
              </div>
              <span className="hidden sm:inline-block max-w-[110px] truncate">{user.fullName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-52 py-1.5 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    {user.fullName}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {user.email}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveNav('profile');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.myProfile}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveNav('settings');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.settings}</span>
                </button>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                <button
                  onClick={() => {
                    logout();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.logout}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setActiveNav('dashboard')}
            className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
          >
            {t.login}
          </button>
        )}
      </div>
    </header>
  );
};
