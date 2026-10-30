import React from 'react';
import { useApp } from '../context/AppContext';
import { EngineeringBranch } from '../types';
import {
  GraduationCap,
  Cpu,
  Layers,
  Sparkles,
  Bot,
  Radio,
  Zap,
  Wrench,
  Building,
  CheckCircle2,
  X,
  ArrowRight,
} from 'lucide-react';

interface BranchSelectionModalProps {
  isOpen: boolean;
  onClose?: () => void;
  isMandatory?: boolean;
}

export const BranchSelectionModal: React.FC<BranchSelectionModalProps> = ({
  isOpen,
  onClose,
  isMandatory = false,
}) => {
  const { user, updateProfile, showToast, t, setSelectedRole } = useApp();

  if (!isOpen) return null;

  const branchList: {
    branch: EngineeringBranch;
    name: string;
    description: string;
    skills: string[];
    icon: React.FC<{ className?: string }>;
    accentColor: string;
  }[] = [
    {
      branch: 'CSE',
      name: 'Computer Science & Engineering',
      description: 'Software development, distributed systems, algorithms & web platforms.',
      skills: ['C/Java/Python', 'DSA', 'DBMS', 'OS', 'Networks', 'Web Dev'],
      icon: Cpu,
      accentColor: 'indigo',
    },
    {
      branch: 'ISE',
      name: 'Information Science & Engineering',
      description: 'Cloud systems, enterprise data engineering, algorithms & software architecture.',
      skills: ['Programming', 'DSA', 'DBMS', 'Cloud Computing', 'Web Systems'],
      icon: Layers,
      accentColor: 'sky',
    },
    {
      branch: 'AI & DS',
      name: 'Artificial Intelligence & Data Science',
      description: 'Machine learning, deep neural networks, mathematical modeling & big data.',
      skills: ['Python for AI', 'Statistics', 'Machine Learning', 'Data Science'],
      icon: Bot,
      accentColor: 'purple',
    },
    {
      branch: 'ECE',
      name: 'Electronics & Communication',
      description: 'Embedded microcontrollers, digital VLSI systems & telecommunications.',
      skills: ['Digital Electronics', 'Communication Systems', 'Embedded Firmware'],
      icon: Radio,
      accentColor: 'emerald',
    },
    {
      branch: 'EEE',
      name: 'Electrical & Electronics',
      description: 'Power grid networks, electrical drive machines, EV converters & smart control.',
      skills: ['Electrical Circuits', 'Power Systems', 'Electrical Machines'],
      icon: Zap,
      accentColor: 'amber',
    },
    {
      branch: 'Mechanical',
      name: 'Mechanical Engineering',
      description: 'CAD parametric design, thermodynamics, structural FEA & manufacturing.',
      skills: ['Thermodynamics', 'CAD & FEA', 'Mechanics', 'Manufacturing'],
      icon: Wrench,
      accentColor: 'rose',
    },
    {
      branch: 'Civil',
      name: 'Civil Engineering',
      description: 'Structural building design, total station surveying, AutoCAD & project BIM.',
      skills: ['Structural Engineering', 'Surveying', 'AutoCAD', 'BIM Construction'],
      icon: Building,
      accentColor: 'teal',
    },
  ];

  const handleSelectBranch = (selected: EngineeringBranch) => {
    updateProfile({ branch: selected });
    showToast(`Engineering branch set to ${selected}! Content updated.`, 'success');
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading">
                Choose Your Engineering Branch
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select your engineering discipline to personalize your curriculum, technical assessments, roadmaps, and internship recommendations.
              </p>
            </div>
          </div>

          {!isMandatory && onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Branch Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {branchList.map(item => {
            const Icon = item.icon;
            const isCurrent = user.branch === item.branch;

            return (
              <button
                key={item.branch}
                type="button"
                onClick={() => handleSelectBranch(item.branch)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                  isCurrent
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-600 dark:border-indigo-500 shadow-sm'
                    : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.branch}
                      </span>
                    </div>

                    {isCurrent && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                    {item.description}
                  </p>
                </div>

                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                  {item.skills.slice(0, 3).join(' · ')}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[11px] text-slate-400">
            You can change your discipline anytime from the top bar or profile.
          </p>
          {!isMandatory && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
