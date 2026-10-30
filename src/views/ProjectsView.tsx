import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project, EngineeringBranch } from '../types';
import {
  Layers,
  Search,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  ArrowRight,
  X,
  Target,
  Sparkles,
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const {
    t,
    projects,
    toggleSaveProject,
    updateProjectStatus,
    user,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedBranch, setSelectedBranch] = useState<string>(user.branch);
  const [selectedProjectModal, setSelectedProjectModal] = useState<Project | null>(null);

  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty =
      selectedDifficulty === 'All' ? true : p.difficulty === selectedDifficulty;

    const matchesBranch =
      selectedBranch === 'All'
        ? true
        : p.branch === selectedBranch || p.branch === 'Interdisciplinary';

    return matchesSearch && matchesDifficulty && matchesBranch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Hands-on Engineering Portfolio Builders</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-heading">
              {t.projects}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Curated branch-specific projects categorized into Beginner, Intermediate, and Advanced tiers with implementation blueprints.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search projects by technology or title..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Branch */}
          <select
            value={selectedBranch}
            onChange={e => setSelectedBranch(e.target.value)}
            className="w-full px-3 py-2 text-xs font-medium bg-slate-950/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Engineering Disciplines</option>
            <option value="CSE">CSE – Computer Science</option>
            <option value="ISE">ISE – Information Science</option>
            <option value="AI & DS">AI & DS – Artificial Intelligence</option>
            <option value="ECE">ECE – Electronics & Communication</option>
            <option value="EEE">EEE – Electrical & Electronics</option>
            <option value="Mechanical">Mechanical Engineering</option>
            <option value="Civil">Civil Engineering</option>
          </select>

          {/* Difficulty Tabs */}
          <div className="flex bg-slate-950/80 border border-slate-700 rounded-xl p-1">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all ${
                  selectedDifficulty === diff ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {diff === 'All' ? t.all : diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-800 transition-all space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        proj.difficulty === 'Beginner'
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                          : proj.difficulty === 'Intermediate'
                          ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                          : 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800'
                      }`}
                    >
                      {proj.difficulty}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {proj.branch} · {proj.estimatedHours}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {proj.title}
                  </h3>
                </div>

                {/* Bookmark */}
                <button
                  type="button"
                  onClick={() => toggleSaveProject(proj.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  aria-label="Save project"
                >
                  {proj.saved ? (
                    <BookmarkCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                {proj.description}
              </p>

              {/* Technologies unboxed */}
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Stack:</span>
                {proj.technologies.map((tech, tIdx) => (
                  <span key={tech} className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                    <span>{tech}</span>
                    {tIdx < proj.technologies.length - 1 && <span className="text-slate-300 dark:text-slate-700">·</span>}
                  </span>
                ))}
              </div>

              {/* Required Skills unboxed */}
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Skills:</span>
                {proj.requiredSkills.map((sk, sIdx) => (
                  <span key={sk} className="inline-flex items-center gap-1 text-[11px]">
                    <span>{sk}</span>
                    {sIdx < proj.requiredSkills.length - 1 && <span className="text-slate-300 dark:text-slate-700">·</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions: Status Selector & Details */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400 font-mono">Status:</span>
                <select
                  value={proj.status || 'Not Started'}
                  onChange={e => updateProjectStatus(proj.id, e.target.value as any)}
                  className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProjectModal(proj)}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{t.viewDetails}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                  {selectedProjectModal.branch} · {selectedProjectModal.difficulty} Level
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedProjectModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedProjectModal.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Key Learning Outcomes & Architectural Milestones:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {selectedProjectModal.learningOutcomes.map((outcome, oIdx) => (
                  <li key={oIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Estimated Effort:</span>
                <span className="font-mono font-semibold">{selectedProjectModal.estimatedHours}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Required Stack:</span>
                <span className="font-mono">{selectedProjectModal.technologies.join(', ')}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => toggleSaveProject(selectedProjectModal.id)}
                className="px-4 py-2 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {selectedProjectModal.saved ? t.saved : t.saveProject}
              </button>
              <button
                type="button"
                onClick={() => setSelectedProjectModal(null)}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
