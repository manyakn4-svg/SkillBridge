import React from 'react';
import { useApp } from '../context/AppContext';
import { ActiveNav } from '../types';
import {
  LayoutDashboard,
  UserCircle,
  FileCheck2,
  GitCompare,
  Milestone,
  Briefcase,
  Layers,
  Trophy,
  BookOpen,
  FlaskConical,
  CalendarDays,
  Rocket,
  Award,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap,
  X,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const {
    t,
    activeNav,
    setActiveNav,
    sidebarCollapsed,
    setSidebarCollapsed,
    user,
    setBranchModalOpen,
  } = useApp();

  const navItems: { id: ActiveNav; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'profile', label: t.myProfile, icon: UserCircle },
    { id: 'assessment', label: t.skillAssessment, icon: FileCheck2 },
    { id: 'skill-gap', label: t.skillGapAnalysis, icon: GitCompare },
    { id: 'roadmap', label: t.learningRoadmap, icon: Milestone },
    { id: 'resources', label: t.learningResources, icon: BookOpen },
    { id: 'virtual-labs', label: t.virtualLabs, icon: FlaskConical },
    { id: 'study-planner', label: t.studyPlanner, icon: CalendarDays },
    { id: 'internships', label: t.internships, icon: Briefcase },
    { id: 'projects', label: t.projects, icon: Layers },
    { id: 'hackathons', label: t.hackathons, icon: Trophy },
    { id: 'hackathon-hub', label: t.hackathonHub, icon: Rocket },
    { id: 'achievements', label: t.achievements, icon: Award },
    { id: 'settings', label: t.settings, icon: Settings },
  ];

  const handleNavClick = (id: ActiveNav) => {
    setActiveNav(id);
    if (mobileOpen) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-slate-900 text-slate-200 border-r border-slate-800 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-950/50 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 font-heading">
                  SkillBridge
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                  Engineering Hub
                </span>
              </div>
            )}
          </div>

          {/* Close for mobile drawer */}
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Collapse button for desktop */}
          <button
            onClick={() => setSidebarCollapsed(prev => !prev)}
            className="hidden lg:flex items-center justify-center w-7 h-7 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-900/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Bottom Student Branch Badge */}
        {!sidebarCollapsed ? (
          <button
            type="button"
            onClick={() => setBranchModalOpen(true)}
            className="p-3.5 m-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 transition-colors text-left cursor-pointer group"
            title="Click to choose or change Engineering Branch"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-mono text-indigo-400 group-hover:text-indigo-300 font-bold tracking-wider flex items-center gap-1">
                {user.branch} ▾
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {user.academicYear}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${user.overallProgress}%` }}
              />
            </div>
            <p className="mt-1.5 text-[10px] text-slate-400 flex justify-between">
              <span>{t.overallSkillDev}</span>
              <span className="font-mono text-slate-200 font-semibold">{user.overallProgress}%</span>
            </p>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setBranchModalOpen(true)}
            className="p-2 w-full text-center text-[10px] font-mono text-indigo-400 hover:text-indigo-300 hover:bg-slate-800 border-t border-slate-800 cursor-pointer"
            title="Click to change branch"
          >
            {user.branch}
          </button>
        )}
      </aside>
    </>
  );
};
