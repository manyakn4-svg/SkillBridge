import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AcademicYear, EngineeringBranch } from '../types';
import { CareerId, CareerCategory, CareerRoadmap, CareerPhase } from '../types/careerRoadmap';
import { careerRoadmaps, allCareerList } from '../data/careerRoadmapsData';
import { careerTranslations } from '../data/careerRoadmapsI18n';
import {
  getRoadmapForStudent,
  allBranchRoadmaps,
  CourseSpecificRoadmap,
  DetailedRoadmapLevel,
  PracticalExercise,
  getBranchInternshipPrep,
  BranchCareerAndInternshipPrep,
} from '../data/branchRoadmaps';
import {
  Milestone,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Layers,
  Target,
  AlertTriangle,
  ExternalLink,
  Code2,
  Award,
  GraduationCap,
  Briefcase,
  Search,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  Zap,
  FastForward,
  Cpu,
  HelpCircle,
  ListChecks,
  RefreshCw,
  FolderGit2,
  Calendar,
  Building2,
  FileCheck2,
  CheckSquare,
  GitFork,
  Video,
  Workflow,
  PlayCircle,
} from 'lucide-react';
import { FlowchartCanvas } from '../components/FlowchartCanvas';
import { getBranchFlowchart, getCareerFlowchart } from '../data/flowchartData';

const ALL_BRANCHES: EngineeringBranch[] = [
  'CSE',
  'ISE',
  'AI & DS',
  'ECE',
  'EEE',
  'Mechanical',
  'Civil',
];

const ALL_YEARS: AcademicYear[] = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
];

const BRANCH_LABELS: Record<EngineeringBranch, string> = {
  CSE: 'Computer Science and Engineering',
  ISE: 'Information Science and Engineering',
  'AI & DS': 'Artificial Intelligence and Data Science',
  ECE: 'Electronics and Communication Engineering',
  EEE: 'Electrical and Electronics Engineering',
  Mechanical: 'Mechanical Engineering',
  Civil: 'Civil Engineering',
};

const CAREER_CATEGORIES: ('All' | CareerCategory)[] = [
  'All',
  'Cloud & DevOps',
  'Software & Web',
  'AI & Data',
  'Core Engineering',
  'Design & Mobile',
];

export const RoadmapView: React.FC = () => {
  const {
    user,
    language,
    updateProfile,
    completedTaskIds,
    toggleBranchTaskCompletion,
    setBatchTaskCompletion,
    isTaskCompleted,
    showToast,
    navigateToCourseVideos,
  } = useApp();

  const tRoadmap = careerTranslations[language] || careerTranslations['en'];

  // Top-level View Mode: 'branch' (Academic Degree) vs 'career' (16 Industry Roles)
  const [viewMode, setViewMode] = useState<'branch' | 'career'>('branch');

  // ---------------------------------------------------------------------------
  // 1. BRANCH-SPECIFIC ROADMAP STATE (Default)
  // ---------------------------------------------------------------------------
  const [selectedBranch, setSelectedBranch] = useState<EngineeringBranch>(user.branch);
  const [selectedYear, setSelectedYear] = useState<AcademicYear>(user.academicYear);
  const [branchTab, setBranchTab] = useState<'flowchart' | 'phases' | 'exercises' | 'projects' | 'resources' | 'placement' | 'checklist'>('flowchart');
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({
    Beginner: true,
    Intermediate: true,
    Advanced: true,
  });
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('skillbridge_completed_exercises');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [branchSearch, setBranchSearch] = useState('');
  const [checklistFilter, setChecklistFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Keep branch & year aligned with user profile when user logs in or profile changes
  useEffect(() => {
    setSelectedBranch(user.branch);
    setSelectedYear(user.academicYear);
  }, [user.branch, user.academicYear]);

  // Active Branch Roadmap Object
  const currentBranchRoadmap: CourseSpecificRoadmap = useMemo(() => {
    return getRoadmapForStudent(selectedBranch, selectedYear);
  }, [selectedBranch, selectedYear]);

  // Active Branch Internship & Placement Prep
  const currentBranchPrep: BranchCareerAndInternshipPrep = useMemo(() => {
    return getBranchInternshipPrep(selectedBranch, selectedYear);
  }, [selectedBranch, selectedYear]);

  // Toggle exercise completion
  const toggleExerciseCompletion = (exerciseId: string, title: string) => {
    setCompletedExercises(prev => {
      const next = !prev[exerciseId];
      const updated = { ...prev, [exerciseId]: next };
      localStorage.setItem('skillbridge_completed_exercises', JSON.stringify(updated));
      showToast(next ? `Exercise Completed: ${title}` : `Exercise marked incomplete`, 'info');
      return updated;
    });
  };

  // Compute Branch Roadmap Progress Metrics
  const branchMetrics = useMemo(() => {
    const allTasks = currentBranchRoadmap.levels.flatMap(lvl => lvl.weeks.flatMap(w => w.tasks));
    const total = allTasks.length;
    const completed = allTasks.filter(t => !!completedTaskIds[t.id]).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    let completedLevelsCount = 0;
    currentBranchRoadmap.levels.forEach(lvl => {
      const lvlTasks = lvl.weeks.flatMap(w => w.tasks);
      if (lvlTasks.length > 0 && lvlTasks.every(t => !!completedTaskIds[t.id])) {
        completedLevelsCount++;
      }
    });

    return {
      total,
      completed,
      percentage,
      totalLevels: currentBranchRoadmap.levels.length,
      completedLevels: completedLevelsCount,
      allTasks,
    };
  }, [currentBranchRoadmap, completedTaskIds]);

  // Save selected branch & year as student's primary degree in Supabase
  const handleSaveToProfile = () => {
    updateProfile({
      branch: selectedBranch,
      academicYear: selectedYear,
    });
    showToast(`Saved ${selectedBranch} (${selectedYear}) to your Supabase profile!`, 'success');
  };

  // Reset selector back to student's active profile
  const handleResetToProfile = () => {
    setSelectedBranch(user.branch);
    setSelectedYear(user.academicYear);
    showToast(`Reset roadmap to your profile (${user.branch} · ${user.academicYear})`, 'info');
  };

  // Mark all tasks in a branch level as completed
  const handleMarkLevelCompleted = (level: DetailedRoadmapLevel) => {
    const taskIds = level.weeks.flatMap(w => w.tasks.map(t => t.id));
    setBatchTaskCompletion(taskIds, true, `All tasks in ${level.title} marked as completed!`);
  };

  // ---------------------------------------------------------------------------
  // 2. CAREER ROLE TRACKS STATE (16 Industry Careers)
  // ---------------------------------------------------------------------------
  const [selectedCareerId, setSelectedCareerId] = useState<CareerId | null>('cloud-engineer');
  const [careerSearchQuery, setCareerSearchQuery] = useState('');
  const [selectedCareerCategory, setSelectedCareerCategory] = useState<'All' | CareerCategory>('All');
  const [careerTab, setCareerTab] = useState<'flowchart' | 'phases' | 'projects' | 'certifications' | 'placement' | 'checklist'>('flowchart');
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({ 1: true, 2: true });

  const activeCareerRoadmap: CareerRoadmap | undefined = selectedCareerId
    ? careerRoadmaps[selectedCareerId]
    : undefined;

  const filteredCareers = useMemo(() => {
    return allCareerList.filter(career => {
      const matchesSearch =
        career.title.toLowerCase().includes(careerSearchQuery.toLowerCase()) ||
        career.overview.toLowerCase().includes(careerSearchQuery.toLowerCase()) ||
        career.skillsRequired.some(s => s.toLowerCase().includes(careerSearchQuery.toLowerCase()));
      const matchesCategory =
        selectedCareerCategory === 'All' || career.category === selectedCareerCategory;
      return matchesSearch && matchesCategory;
    });
  }, [careerSearchQuery, selectedCareerCategory]);

  const careerProgressMetrics = useMemo(() => {
    if (!activeCareerRoadmap) {
      return { totalTasks: 0, completedTasks: 0, percentage: 0, completedPhases: 0, totalPhases: 0 };
    }
    const allTasks = activeCareerRoadmap.phases.flatMap(p => p.tasks);
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(t => !!completedTaskIds[t.id]).length;
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const completedPhases = activeCareerRoadmap.phases.filter(
      p => p.tasks.length > 0 && p.tasks.every(t => !!completedTaskIds[t.id])
    ).length;

    return {
      totalTasks,
      completedTasks,
      percentage,
      completedPhases,
      totalPhases: activeCareerRoadmap.phases.length,
    };
  }, [activeCareerRoadmap, completedTaskIds]);

  const togglePhase = (phaseNumber: number) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseNumber]: !prev[phaseNumber],
    }));
  };

  const isDifferentFromProfile =
    selectedBranch !== user.branch || selectedYear !== user.academicYear;

  return (
    <div className="space-y-6">
      {/* --------------------------------------------------------------------- */}
      {/* TOP VIEW MODE SWITCHER: BRANCH ROADMAP vs CAREER ROLE TRACKS          */}
      {/* --------------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 bg-slate-200/70 dark:bg-slate-900/90 rounded-2xl border border-slate-300/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-950 rounded-xl shadow-inner">
          <button
            type="button"
            onClick={() => setViewMode('branch')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'branch'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{tRoadmap.branchRoadmapTab}</span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                viewMode === 'branch'
                  ? 'bg-indigo-700/80 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              {user.branch} · {user.academicYear}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('career')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'career'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>{tRoadmap.careerRolesTab}</span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                viewMode === 'career'
                  ? 'bg-indigo-700/80 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              16 Roles
            </span>
          </button>
        </div>

        {/* Dynamic Branch Quick Switcher in Header */}
        {viewMode === 'branch' && (
          <div className="flex items-center gap-2 px-2">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden md:inline">
              Branch:
            </span>
            <select
              value={selectedBranch}
              onChange={e => setSelectedBranch(e.target.value as EngineeringBranch)}
              className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none cursor-pointer"
            >
              {ALL_BRANCHES.map(b => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value as AcademicYear)}
              className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none cursor-pointer"
            >
              {ALL_YEARS.map(y => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* MODE A: ACADEMIC DEGREE ROADMAP (BRANCH & YEAR)                       */}
      {/* ===================================================================== */}
      {viewMode === 'branch' && (
        <div className="space-y-6">
          {/* 1. Branch Roadmap Header Banner */}
          <div className="relative overflow-hidden p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-2xl space-y-4">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-md bg-indigo-600/80 text-white font-bold tracking-wider uppercase flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{selectedBranch} · {selectedYear}</span>
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-purple-900/60 text-purple-200 border border-purple-700/50">
                    {currentBranchRoadmap.semesters}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-emerald-900/60 text-emerald-200 border border-emerald-700/50 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Supabase Live Sync</span>
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-white">
                    {currentBranchRoadmap.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    {currentBranchRoadmap.keyHighlights}
                  </p>
                </div>

                {/* Core Curriculum Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-mono text-slate-400 mr-1">Core Subjects:</span>
                  {currentBranchRoadmap.coreCurriculumTopics.map(topic => (
                    <span
                      key={topic}
                      className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-indigo-300 font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Save to Profile / Supabase */}
              <div className="relative z-10 shrink-0 flex flex-col sm:items-end gap-2.5">
                {isDifferentFromProfile ? (
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={handleSaveToProfile}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/60 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{tRoadmap.saveToProfile}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetToProfile}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset to My Active Profile</span>
                    </button>
                  </div>
                ) : (
                  <div className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-900/40 text-indigo-200 border border-indigo-700/50 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Active Student Degree Profile</span>
                  </div>
                )}

                <span className="text-[10px] text-slate-400 font-mono">
                  Full 4-Year Engineering Syllabus · All 7 Branches
                </span>
              </div>
            </div>
          </div>

          {/* 2. Interactive KPI Status Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* KPI 1: Total Completion */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                Academic Progress
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                  {branchMetrics.percentage}%
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ({branchMetrics.completed}/{branchMetrics.total} tasks)
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${branchMetrics.percentage}%` }}
                />
              </div>
            </div>

            {/* KPI 2: Completed Phases */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                Learning Phases
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                  {branchMetrics.completedLevels}
                </span>
                <span className="text-xs text-slate-400">/ {branchMetrics.totalLevels} Completed</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                Beginner, Intermediate, Advanced
              </span>
            </div>

            {/* KPI 3: Practical Exercises */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                Lab & Practical Drills
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
                  {Object.keys(completedExercises).filter(k => k.startsWith(selectedBranch.toLowerCase().replace(/[^a-z0-9]/g, ''))).length}
                </span>
                <span className="text-xs text-slate-400">/ {currentBranchRoadmap.practicalExercises.length} Submitted</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                Hands-on deliverables
              </span>
            </div>

            {/* KPI 4: Projects */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                Projects Aligned
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold font-mono text-purple-600 dark:text-purple-400">
                  2
                </span>
                <span className="text-xs text-slate-400">Projects (Mini + Capstone)</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                {currentBranchRoadmap.miniProject.title}
              </span>
            </div>
          </div>

          {/* 3. Branch Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none pb-0.5">
            <button
              type="button"
              onClick={() => setBranchTab('flowchart')}
              className={`pb-3 px-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                branchTab === 'flowchart'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <GitFork className="w-3.5 h-3.5 text-indigo-500" />
              <span>Visual Learning Flowchart</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold">
                Interactive
              </span>
            </button>

            <button
              type="button"
              onClick={() => setBranchTab('phases')}
              className={`pb-3 px-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                branchTab === 'phases'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Curriculum & Phases ({currentBranchRoadmap.levels.length})
            </button>

            <button
              type="button"
              onClick={() => setBranchTab('exercises')}
              className={`pb-3 px-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                branchTab === 'exercises'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Practical Exercises ({currentBranchRoadmap.practicalExercises.length})
            </button>

            <button
              type="button"
              onClick={() => setBranchTab('projects')}
              className={`pb-3 px-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                branchTab === 'projects'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Mini & Major Projects
            </button>

            <button
              type="button"
              onClick={() => setBranchTab('resources')}
              className={`pb-3 px-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                branchTab === 'resources'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Free Learning Resources ({currentBranchRoadmap.recommendedResources.length})
            </button>

            <button
              type="button"
              onClick={() => setBranchTab('placement')}
              className={`pb-3 px-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                branchTab === 'placement'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Internship & Career Prep
            </button>

            <button
              type="button"
              onClick={() => setBranchTab('checklist')}
              className={`pb-3 px-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                branchTab === 'checklist'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              All Tasks Checklist ({branchMetrics.total})
            </button>
          </div>

          {/* 4. SUB-TAB 0: INTERACTIVE VISUAL LEARNING FLOWCHART */}
          {branchTab === 'flowchart' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 p-4 sm:p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-sm">
                      <Workflow className="w-4 h-4" />
                    </span>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      {selectedBranch} ({selectedYear}) – 10-Stage Visual Learning Pathway
                    </h2>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                      Connected Curriculum
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Follow the verified curriculum from fundamentals to career placement. Click on any stage to see syllabus subtopics, check off completion, and watch linked teaching video tutorials.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setBranchTab('phases')}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-indigo-500" />
                    <span>View Syllabus Outline</span>
                  </button>
                </div>
              </div>

              <FlowchartCanvas
                flowchart={getBranchFlowchart(selectedBranch, selectedYear)}
                completedNodeIds={completedTaskIds}
                onToggleNode={toggleBranchTaskCompletion}
                onWatchVideos={navigateToCourseVideos}
                language={language}
              />
            </div>
          )}

          {/* 4. SUB-TAB 1: CURRICULUM & PHASES (BEGINNER, INTERMEDIATE, ADVANCED) */}
          {branchTab === 'phases' && (
            <div className="space-y-5">
              {currentBranchRoadmap.levels.map((level, levelIdx) => {
                const isExpanded = expandedLevels[level.level] !== false;
                const levelTasks = level.weeks.flatMap(w => w.tasks);
                const completedCount = levelTasks.filter(t => !!completedTaskIds[t.id]).length;
                const isDone = completedCount === levelTasks.length && levelTasks.length > 0;
                const pct = levelTasks.length > 0 ? Math.round((completedCount / levelTasks.length) * 100) : 0;

                return (
                  <div
                    key={level.level}
                    className={`rounded-2xl bg-white dark:bg-slate-900 border transition-all overflow-hidden ${
                      isDone
                        ? 'border-emerald-200 dark:border-emerald-900/60 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 shadow-sm'
                    }`}
                  >
                    {/* Level Accordion Header */}
                    <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/60 dark:bg-slate-800/30">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-[10px] font-mono px-2.5 py-0.5 rounded font-bold uppercase ${
                              level.level === 'Beginner'
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                                : level.level === 'Intermediate'
                                ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                                : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                            }`}
                          >
                            Phase {levelIdx + 1}: {level.level}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {level.duration}
                          </span>
                          {isDone ? (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Completed
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                              {completedCount} / {levelTasks.length} tasks done
                            </span>
                          )}
                        </div>

                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                          {level.title}
                        </h2>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {level.objective}
                        </p>
                      </div>

                      {/* Level Progress Bar & Batch Button */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="flex items-center gap-1.5 font-mono text-xs">
                            <span className="font-bold text-slate-900 dark:text-white">{pct}%</span>
                            <span className="text-slate-400 text-[11px]">({completedCount}/{levelTasks.length})</span>
                          </div>
                          <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full transition-all ${
                                isDone ? 'bg-emerald-500' : 'bg-indigo-600'
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>

                        {!isDone && (
                          <button
                            type="button"
                            onClick={() => handleMarkLevelCompleted(level)}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm cursor-pointer whitespace-nowrap"
                          >
                            Mark Phase Done
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            setExpandedLevels(prev => ({
                              ...prev,
                              [level.level]: !isExpanded,
                            }))
                          }
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Level Body: Weeks and Tasks */}
                    {isExpanded && (
                      <div className="p-5 space-y-6 border-t border-slate-100 dark:border-slate-800">
                        {level.weeks.map(week => (
                          <div key={week.weekNumber} className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100 dark:border-slate-800">
                              <h3 className="text-xs font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                                <span>{week.title}</span>
                              </h3>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                                Focus: {week.focus}
                              </span>
                            </div>

                            {/* Task List */}
                            <div className="grid grid-cols-1 gap-2.5">
                              {week.tasks.map(task => {
                                const done = isTaskCompleted(task.id);
                                return (
                                  <div
                                    key={task.id}
                                    onClick={() => toggleBranchTaskCompletion(task.id, task.title)}
                                    className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                                      done
                                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                                    }`}
                                  >
                                    <div className="flex items-start gap-3 min-w-0">
                                      <button
                                        type="button"
                                        className="mt-0.5 shrink-0 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                                      >
                                        {done ? (
                                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        ) : (
                                          <Circle className="w-4 h-4 text-slate-400" />
                                        )}
                                      </button>
                                      <div className="space-y-0.5 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className="text-[10px] font-mono font-bold text-slate-400">
                                            Day {task.day}
                                          </span>
                                          <span
                                            className={`text-[10px] font-mono px-2 py-0.2 rounded font-semibold ${
                                              task.type === 'Practice'
                                                ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300'
                                                : task.type === 'Theory'
                                                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                                                : task.type === 'Project'
                                                ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                                                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                                            }`}
                                          >
                                            {task.type}
                                          </span>
                                          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {task.duration}
                                          </span>
                                        </div>
                                        <p
                                          className={`text-xs font-medium leading-relaxed ${
                                            done
                                              ? 'line-through text-slate-400 dark:text-slate-500'
                                              : 'text-slate-800 dark:text-slate-200'
                                          }`}
                                        >
                                          {task.title}
                                        </p>
                                      </div>
                                    </div>

                                    <span className="text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 shrink-0 hidden sm:inline">
                                      {task.topic}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* 5. SUB-TAB 2: PRACTICAL EXERCISES & ASSIGNMENTS */}
          {branchTab === 'exercises' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-xs text-indigo-950 dark:text-indigo-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Hands-On Laboratory & Application Drills</h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Mandatory assignments designed to prove engineering competency for {selectedBranch} ({selectedYear}).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentBranchRoadmap.practicalExercises.map(ex => {
                  const done = !!completedExercises[ex.id];
                  return (
                    <div
                      key={ex.id}
                      className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between space-y-4 ${
                        done
                          ? 'border-emerald-200 dark:border-emerald-900/60 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 shadow-sm'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                              ex.difficulty === 'Beginner'
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                                : ex.difficulty === 'Intermediate'
                                ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                                : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                            }`}
                          >
                            {ex.difficulty}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {ex.estimatedTime}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {ex.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {ex.description}
                        </p>

                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
                          <strong className="text-slate-900 dark:text-white font-semibold">Deliverable: </strong>
                          <span>{ex.deliverable}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleExerciseCompletion(ex.id, ex.title)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          done
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-600 hover:text-white'
                        }`}
                      >
                        {done ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Deliverable Submitted</span>
                          </>
                        ) : (
                          <>
                            <CheckSquare className="w-3.5 h-3.5" />
                            <span>Mark Assignment Complete</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 6. SUB-TAB 3: MINI & MAJOR PROJECTS */}
          {branchTab === 'projects' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mini Project */}
                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-bold uppercase">
                        Mini Project · Semester Term Work
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {currentBranchRoadmap.miniProject.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {currentBranchRoadmap.miniProject.description}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Technologies & Tools:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentBranchRoadmap.miniProject.technologies.map(t => (
                          <span
                            key={t}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <span>Estimated: 2 - 3 Weeks</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">Semester Portfolio</span>
                  </div>
                </div>

                {/* Major Capstone Project */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-900/60 shadow-md flex flex-col justify-between space-y-4 text-white">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-900 text-indigo-200 font-bold uppercase border border-indigo-700/50">
                        Major Capstone Project
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {currentBranchRoadmap.majorProject.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentBranchRoadmap.majorProject.description}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-[11px] font-mono text-indigo-300 uppercase tracking-wider block">
                        Full Architecture Stack:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentBranchRoadmap.majorProject.technologies.map(t => (
                          <span
                            key={t}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-indigo-600 text-white font-semibold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-indigo-900/60 flex items-center justify-between text-xs text-slate-300">
                    <span>Industry Evaluation Ready</span>
                    <span className="font-semibold text-emerald-400">Final Year Capstone Grade</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. SUB-TAB 4: FREE LEARNING RESOURCES */}
          {branchTab === 'resources' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Curated Open-Access Textbooks, NPTEL Lectures & Practice Portals
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {currentBranchRoadmap.recommendedResources.length} Verified Sources
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {currentBranchRoadmap.recommendedResources.map(res => (
                  <a
                    key={res.title}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex items-center justify-between gap-3 group shadow-sm cursor-pointer"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
                          {res.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {res.provider}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {res.title}
                      </h4>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 8. SUB-TAB 5: INTERNSHIP & CAREER PREPARATION */}
          {branchTab === 'placement' && (
            <div className="space-y-6">
              {/* Target Roles & Top Recruiters Banner */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 uppercase font-bold tracking-wider">
                      Internship & Campus Placement Track
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {selectedBranch} · {selectedYear} Industry Readiness
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Timeline: {currentBranchPrep.internshipTimeline}</span>
                  </div>
                </div>

                {/* Target Roles */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Target Job & Internship Roles for this Phase:</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentBranchPrep.targetRoles.map(role => (
                      <span
                        key={role}
                        className="text-xs px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top Recruiters */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Key Recruiting Companies & Programs:</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentBranchPrep.topRecruiters.map(rec => (
                      <span
                        key={rec}
                        className="text-xs px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-100 dark:border-indigo-900"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interview Focus Topics & Recommended Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase font-mono tracking-wider flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>Core Technical Interview Topics</span>
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {currentBranchPrep.interviewFocusTopics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase font-mono tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Recommended Industry Certifications</span>
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {currentBranchPrep.recommendedCertifications.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Items Checklist */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Year {selectedYear.charAt(0)} Placement Readiness Checklist</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {currentBranchPrep.actionItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 9. SUB-TAB 6: ALL TASKS CHECKLIST (SEARCH & FILTER) */}
          {branchTab === 'checklist' && (
            <div className="space-y-4">
              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setChecklistFilter('all')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      checklistFilter === 'all'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    All ({branchMetrics.total})
                  </button>
                  <button
                    type="button"
                    onClick={() => setChecklistFilter('pending')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      checklistFilter === 'pending'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Pending ({branchMetrics.total - branchMetrics.completed})
                  </button>
                  <button
                    type="button"
                    onClick={() => setChecklistFilter('completed')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      checklistFilter === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Completed ({branchMetrics.completed})
                  </button>
                </div>

                <div className="relative flex-1 max-w-xs">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={branchSearch}
                    onChange={e => setBranchSearch(e.target.value)}
                    placeholder="Search tasks..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-2">
                {branchMetrics.allTasks
                  .filter(task => {
                    const done = isTaskCompleted(task.id);
                    if (checklistFilter === 'pending' && done) return false;
                    if (checklistFilter === 'completed' && !done) return false;
                    if (branchSearch && !task.title.toLowerCase().includes(branchSearch.toLowerCase())) {
                      return false;
                    }
                    return true;
                  })
                  .map(task => {
                    const done = isTaskCompleted(task.id);
                    return (
                      <div
                        key={task.id}
                        onClick={() => toggleBranchTaskCompletion(task.id, task.title)}
                        className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          done
                            ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <button type="button" className="shrink-0">
                            {done ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                          <span
                            className={`text-xs font-medium ${
                              done
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {task.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                            {task.duration}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold">
                            {task.type}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE B: CAREER ROLE TRACKS (16 INDUSTRY ROLES)                        */}
      {/* ===================================================================== */}
      {viewMode === 'career' && (
        <div className="space-y-6">
          {!activeCareerRoadmap ? (
            /* Career Catalog */
            <div className="space-y-6">
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
                <div className="max-w-3xl space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
                    <Milestone className="w-3.5 h-3.5" />
                    <span>SkillBridge Career Tracks</span>
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
                    {tRoadmap.catalogTitle}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {tRoadmap.catalogSubtitle}
                  </p>
                </div>

                <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={careerSearchQuery}
                      onChange={e => setCareerSearchQuery(e.target.value)}
                      placeholder={tRoadmap.searchPlaceholder}
                      className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {CAREER_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCareerCategory(cat)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                          selectedCareerCategory === cat
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700/60'
                        }`}
                      >
                        {cat === 'All' ? tRoadmap.allDomains : cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 16 Career Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCareers.map(career => {
                  const isTarget = user.careerGoal
                    .toLowerCase()
                    .includes(career.title.toLowerCase());
                  const isBranchMatch = career.recommendedBranches.includes(user.branch);

                  return (
                    <div
                      key={career.id}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-400 dark:hover:border-indigo-700 transition-all hover:shadow-md group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                            {career.category}
                          </span>

                          {isTarget && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>My Goal</span>
                            </span>
                          )}

                          {!isTarget && isBranchMatch && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium">
                              Matches {user.branch}
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {career.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {career.overview}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {career.skillsRequired.slice(0, 4).map(sk => (
                            <span
                              key={sk}
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{career.estimatedDuration}</span>
                          </span>
                          <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                            {career.averageSalary}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCareerId(career.id);
                          setCareerTab('phases');
                        }}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <span>{tRoadmap.viewRoadmap}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Detailed Career Role Roadmap */
            <div className="space-y-6">
              {/* Top Controls */}
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCareerId(null)}
                    className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{tRoadmap.backToCareers}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-400">{tRoadmap.changeCareer}:</span>
                    <select
                      value={activeCareerRoadmap.id}
                      onChange={e => {
                        setSelectedCareerId(e.target.value as CareerId);
                        setCareerTab('phases');
                      }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      {allCareerList.map(c => (
                        <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pt-2">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold px-2.5 py-0.5 rounded bg-indigo-900/50 border border-indigo-700/50">
                        {activeCareerRoadmap.category}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/50">
                        Demand: {activeCareerRoadmap.marketDemand}
                      </span>
                      <span className="text-[11px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/50">
                        Est: {activeCareerRoadmap.estimatedDuration}
                      </span>
                      <span className="text-[11px] font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/50">
                        Avg: {activeCareerRoadmap.averageSalary}
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
                      {activeCareerRoadmap.title} – Career Track
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeCareerRoadmap.overview}
                    </p>
                  </div>

                  <div className="shrink-0 flex flex-col sm:items-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        updateProfile({ careerGoal: activeCareerRoadmap.title });
                        showToast(tRoadmap.goalUpdated, 'success');
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 text-white shadow-lg shadow-indigo-950/60 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Target className="w-4 h-4" />
                      <span>{tRoadmap.setTargetGoal}</span>
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Recommended for: {activeCareerRoadmap.recommendedBranches.join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Career Sub-Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none pb-0.5">
                <button
                  type="button"
                  onClick={() => setCareerTab('flowchart')}
                  className={`pb-3 px-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    careerTab === 'flowchart'
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <GitFork className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{tRoadmap.flowchartTab}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold">
                    Visual
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setCareerTab('phases')}
                  className={`pb-3 px-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                    careerTab === 'phases'
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {tRoadmap.phasesTab} ({activeCareerRoadmap.phases.length})
                </button>
                <button
                  type="button"
                  onClick={() => setCareerTab('projects')}
                  className={`pb-3 px-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                    careerTab === 'projects'
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {tRoadmap.projectsTab}
                </button>
                <button
                  type="button"
                  onClick={() => setCareerTab('certifications')}
                  className={`pb-3 px-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                    careerTab === 'certifications'
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {tRoadmap.certificationsTab}
                </button>
                <button
                  type="button"
                  onClick={() => setCareerTab('placement')}
                  className={`pb-3 px-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                    careerTab === 'placement'
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {tRoadmap.placementTab}
                </button>
                <button
                  type="button"
                  onClick={() => setCareerTab('checklist')}
                  className={`pb-3 px-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                    careerTab === 'checklist'
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {tRoadmap.checklistTab}
                </button>
              </div>

              {/* Career Flowchart View */}
              {careerTab === 'flowchart' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 p-4 sm:p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-sm">
                          <Workflow className="w-4 h-4" />
                        </span>
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                          {activeCareerRoadmap.title} – Career Mastery Flowchart
                        </h2>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold">
                          Job-Ready Pathway
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Progress step-by-step through core requirements, coding assignments, and portfolio capstones. Click any node to open lesson details and stream video tutorials.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setCareerTab('phases')}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5 text-indigo-500" />
                        <span>View Phase Outline</span>
                      </button>
                    </div>
                  </div>

                  <FlowchartCanvas
                    flowchart={getCareerFlowchart(activeCareerRoadmap.id)}
                    completedNodeIds={completedTaskIds}
                    onToggleNode={toggleBranchTaskCompletion}
                    onWatchVideos={navigateToCourseVideos}
                    language={language}
                  />
                </div>
              )}

              {/* Career Phase List */}
              {careerTab === 'phases' && (
                <div className="space-y-5">
                  {activeCareerRoadmap.phases.map(phase => {
                    const isExpanded = expandedPhases[phase.phaseNumber] !== false;
                    const phaseTasks = phase.tasks;
                    const completedCount = phaseTasks.filter(t => !!completedTaskIds[t.id]).length;
                    const isDone = completedCount === phaseTasks.length && phaseTasks.length > 0;
                    const phasePct = phaseTasks.length > 0 ? Math.round((completedCount / phaseTasks.length) * 100) : 0;

                    return (
                      <div
                        key={phase.phaseNumber}
                        className={`rounded-2xl bg-white dark:bg-slate-900 border transition-all overflow-hidden ${
                          isDone
                            ? 'border-emerald-200 dark:border-emerald-900/60 shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 shadow-sm'
                        }`}
                      >
                        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/30">
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-100 dark:border-indigo-900">
                                Phase {phase.phaseNumber} of {activeCareerRoadmap.phases.length}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {phase.duration}
                              </span>
                              {isDone && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Done
                                </span>
                              )}
                            </div>

                            <h2 className="text-base font-bold text-slate-900 dark:text-white">
                              {phase.title}
                            </h2>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                              {phase.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-right">
                              <div className="flex items-center gap-1.5 font-mono text-xs">
                                <span className="font-bold text-slate-900 dark:text-white">{phasePct}%</span>
                                <span className="text-slate-400 text-[11px]">({completedCount}/{phaseTasks.length})</span>
                              </div>
                              <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1 overflow-hidden">
                                <div
                                  className={`h-1.5 rounded-full transition-all ${
                                    isDone ? 'bg-emerald-500' : 'bg-indigo-600'
                                  }`}
                                  style={{ width: `${phasePct}%` }}
                                />
                              </div>
                            </div>

                            {!isDone && (
                              <button
                                type="button"
                                onClick={() => {
                                  const ids = phase.tasks.map(t => t.id);
                                  setBatchTaskCompletion(ids, true, `${phase.title} marked as completed!`);
                                }}
                                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm cursor-pointer whitespace-nowrap"
                              >
                                Mark Phase Done
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => togglePhase(phase.phaseNumber)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="p-5 space-y-4 border-t border-slate-100 dark:border-slate-800">
                            {/* Practical Assignment */}
                            <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 text-xs">
                              <span className="font-bold text-indigo-950 dark:text-indigo-200 block mb-1">
                                {tRoadmap.practicalAssignment}:
                              </span>
                              <p className="text-slate-700 dark:text-slate-300">
                                {phase.practicalTask}
                              </p>
                            </div>

                            {/* Task Checklist */}
                            <div className="grid grid-cols-1 gap-2">
                              {phase.tasks.map(task => {
                                const done = !!completedTaskIds[task.id];
                                return (
                                  <div
                                    key={task.id}
                                    onClick={() => toggleBranchTaskCompletion(task.id, task.title)}
                                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                                      done
                                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-indigo-300'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <button type="button" className="shrink-0">
                                        {done ? (
                                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        ) : (
                                          <Circle className="w-4 h-4 text-slate-400" />
                                        )}
                                      </button>
                                      <span
                                        className={`text-xs font-medium ${
                                          done
                                            ? 'line-through text-slate-400 dark:text-slate-500'
                                            : 'text-slate-800 dark:text-slate-200'
                                        }`}
                                      >
                                        {task.title}
                                      </span>
                                    </div>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold shrink-0">
                                      {task.type}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Career Projects Tab */}
              {careerTab === 'projects' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span>Beginner Projects</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeCareerRoadmap.projects.beginner.map(proj => (
                        <div
                          key={proj.title}
                          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                        >
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {proj.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {proj.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                      <span>Advanced Capstone Projects</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeCareerRoadmap.projects.advanced.map(proj => (
                        <div
                          key={proj.title}
                          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                        >
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {proj.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {proj.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Career Certifications Tab */}
              {careerTab === 'certifications' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase font-mono tracking-wider">
                        Certification Advisory
                      </h3>
                      <p className="text-xs text-amber-950 dark:text-amber-300 leading-relaxed font-medium">
                        {activeCareerRoadmap.certificationAdvisory}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeCareerRoadmap.certifications.map(cert => (
                      <div
                        key={cert.name}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                      >
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                          {cert.provider}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {cert.name}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Placement Tab */}
              {careerTab === 'placement' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeCareerRoadmap.interviewPreparation.map(item => (
                      <div
                        key={item.category}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                      >
                        <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-mono">
                          {item.category}
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {item.keyQuestions.map((q, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                              <span className="text-indigo-500 font-bold">Q{idx + 1}.</span>
                              <span>{q}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Checklist Tab */}
              {careerTab === 'checklist' && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Job Readiness Checklist
                    </h3>
                    <div className="space-y-2">
                      {activeCareerRoadmap.jobReadinessChecklist.map((chk, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs flex items-center gap-2.5 text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{chk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
