import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { targetRolesByBranch, sampleSkillGaps } from '../data/skillGapData';
import { TargetRole, SkillGapItem } from '../types';
import {
  GitCompare,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Milestone,
  Target,
  Sparkles,
} from 'lucide-react';

export const SkillGapView: React.FC = () => {
  const { t, user, selectedRole, setSelectedRole, setActiveNav } = useApp();

  const availableRoles = targetRolesByBranch[user.branch] || targetRolesByBranch['CSE'];

  // Current skill gap items for this role
  const skillItems: SkillGapItem[] =
    sampleSkillGaps[selectedRole.id] || [
      {
        skill: 'Core Engineering Analysis',
        category: 'Core',
        currentLevel: 75,
        requiredLevel: 85,
        status: 'Weak',
        recommendation: 'Solidify advanced analytical problem solving and numerical methods.',
      },
      {
        skill: 'Modern Domain Tooling',
        category: 'Tool',
        currentLevel: 50,
        requiredLevel: 80,
        status: 'Missing',
        recommendation: 'Complete hands-on projects utilizing industry standard CAD/simulation software.',
      },
      {
        skill: 'Foundational Theory & Mechanics',
        category: 'Core',
        currentLevel: 88,
        requiredLevel: 85,
        status: 'Strong',
        recommendation: 'Strong theoretical grounding. Maintain with quarterly practice drills.',
      },
      {
        skill: 'Project Documentation & Technical Writing',
        category: 'Soft',
        currentLevel: 70,
        requiredLevel: 75,
        status: 'Weak',
        recommendation: 'Publish detailed project READMEs and architectural design records on GitHub.',
      },
    ];

  // Calculate stats
  const strongCount = skillItems.filter(s => s.status === 'Strong').length;
  const weakCount = skillItems.filter(s => s.status === 'Weak').length;
  const missingCount = skillItems.filter(s => s.status === 'Missing').length;

  const totalRequired = skillItems.reduce((acc, s) => acc + s.requiredLevel, 0);
  const totalCurrent = skillItems.reduce((acc, s) => acc + s.currentLevel, 0);
  const gapPercentage = totalRequired > 0 ? Math.max(0, Math.round(((totalRequired - totalCurrent) / totalRequired) * 100)) : 0;
  const matchPercentage = 100 - gapPercentage;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
              <GitCompare className="w-3.5 h-3.5" />
              <span>Career Role Benchmark</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-heading">
              {t.skillGapAnalysis}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Compare your current verified proficiencies against real-world engineering job requirements for <strong className="text-indigo-300 font-semibold">{selectedRole.title}</strong>.
            </p>
          </div>

          {/* Role selector dropdown */}
          <div className="shrink-0 bg-slate-900/90 p-3 rounded-xl border border-slate-700/80">
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Select Target Role:
            </label>
            <select
              value={selectedRole.id}
              onChange={e => {
                const found = availableRoles.find(r => r.id === e.target.value);
                if (found) setSelectedRole(found);
              }}
              className="w-full sm:w-64 px-3 py-1.5 text-xs font-semibold bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {availableRoles.map(r => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gap Percentage */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.skillGapPercentage}
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
              {gapPercentage}%
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              ({matchPercentage}% Match)
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            Estimated time to bridge: ~6 weeks
          </p>
        </div>

        {/* Strong Skills */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.strongSkills}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
              {strongCount}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Competencies
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            Meets or exceeds market expectations
          </p>
        </div>

        {/* Weak Skills */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.weakSkills}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
              {weakCount}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Need Practice
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            Requires structured revision drills
          </p>
        </div>

        {/* Missing Skills */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.missingSkills}
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 font-mono tabular-nums">
              {missingCount}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              To Acquire
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            Critical prerequisite gap
          </p>
        </div>
      </div>

      {/* Comparison Matrix Table & Visual Comparison */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Skill Comparison Matrix: Current vs Required
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Visual comparison calibrated against industry hiring benchmarks
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-indigo-600" /> Current Score
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-slate-300 dark:bg-slate-700" /> Required Benchmark
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {skillItems.map(item => {
            const delta = item.requiredLevel - item.currentLevel;
            return (
              <div
                key={item.skill}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {item.skill}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      · {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md font-mono ${
                        item.status === 'Strong'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : item.status === 'Weak'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                          : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-300 tabular-nums">
                      {item.currentLevel}% / {item.requiredLevel}%
                    </span>
                  </div>
                </div>

                {/* Progress bar comparison */}
                <div className="relative w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  {/* Required Target Marker / Background */}
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-slate-300 dark:bg-slate-600 opacity-60 rounded-full"
                    style={{ width: `${item.requiredLevel}%` }}
                  />
                  {/* Current Level */}
                  <div
                    className={`relative h-2.5 rounded-full transition-all duration-500 ${
                      item.status === 'Strong'
                        ? 'bg-emerald-500'
                        : item.status === 'Weak'
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${item.currentLevel}%` }}
                  />
                </div>

                {/* Recommendation */}
                <p className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-1.5 pt-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-700 dark:text-slate-300">Action: </strong>
                    {item.recommendation}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggested Improvements & Direct Action Plan */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>{t.suggestedImprovements}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-2">
            <h3 className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
              1. Bridge Missing Architecture Skills via Roadmap
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Start Phase 2 of your learning roadmap to build containerized microservices and distributed caching fundamentals.
            </p>
            <button
              onClick={() => setActiveNav('roadmap')}
              className="pt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              Go to Learning Roadmap <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl border border-purple-100 dark:border-purple-950 bg-purple-50/50 dark:bg-purple-950/20 space-y-2">
            <h3 className="text-xs font-bold text-purple-950 dark:text-purple-200">
              2. Reinforce Core Weak Points with Resource Guides
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Explore dynamic programming blueprints and system design cheat sheets in the Learning Resource library.
            </p>
            <button
              onClick={() => setActiveNav('resources')}
              className="pt-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              Explore Learning Resources <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
