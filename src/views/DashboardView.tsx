import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Trophy,
  Briefcase,
  FileCheck2,
  Milestone,
  ArrowRight,
  TrendingUp,
  Target,
  Clock,
  Layers,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Calendar,
  ExternalLink,
  FlaskConical,
  CalendarDays,
  Rocket,
  Award,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    t,
    user,
    assessmentHistory,
    internships,
    hackathons,
    projects,
    roadmapLevels,
    branchRoadmapProgress,
    setActiveNav,
    setSelectedRole,
    selectedRole,
    userPoints,
    userRank,
    labSubmissions,
    studyTasks,
  } = useApp();

  // Calculate stats
  const totalAssessments = assessmentHistory.length;
  const latestAssessment = assessmentHistory[0];
  const verifiedSkillsCount = user.technicalSkills.length;

  // Calculate roadmap task completed percentage from branch-specific roadmap
  const totalTasks = branchRoadmapProgress.total;
  const completedTasks = branchRoadmapProgress.completed;
  const roadmapPct = branchRoadmapProgress.percentage;

  // Recommended internships for user's branch
  const recommendedInternships = internships
    .filter(i => i.branchEligibility.includes('All') || i.branchEligibility.includes(user.branch))
    .slice(0, 3);

  // Upcoming hackathons
  const upcomingHackathons = hackathons.slice(0, 2);

  // Recommended projects for branch
  const recommendedProjects = projects
    .filter(p => p.branch === user.branch || p.branch === 'Interdisciplinary')
    .slice(0, 2);

  return (
    <div className="space-y-6">
      {/* 1. Welcome Banner & Student Profile Summary */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-900/60 border border-indigo-700/50 text-[11px] font-medium text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{user.branch} · {user.academicYear}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
              {t.welcomeBack} {user.fullName}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {user.collegeName} · Target Career: <strong className="text-indigo-300 font-semibold">{user.careerGoal}</strong>
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveNav('assessment')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-950/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>{t.startAssessment}</span>
            </button>
            <button
              onClick={() => setActiveNav('skill-gap')}
              className="px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-2"
            >
              <span>{t.skillGapAnalysis}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics & Overall Skill Development Percentage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Overall Skill Development Percentage */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-indigo-300 dark:hover:border-indigo-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.overallSkillDev}
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {user.overallProgress}%
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              +4% this week
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-700"
              style={{ width: `${user.overallProgress}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Completed Assessments */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-purple-300 dark:hover:border-purple-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.completedAssessments}
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {totalAssessments}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {latestAssessment ? `Last: ${latestAssessment.percentage}%` : 'Tests Taken'}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Aptitude & Technical</span>
            <button
              onClick={() => setActiveNav('assessment')}
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-0.5"
            >
              Test Now <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 3: Technical Skills */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-cyan-300 dark:hover:border-cyan-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.technicalSkillsCount}
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {verifiedSkillsCount}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Benchmarked
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Target: {selectedRole.title.split(' ')[0]}</span>
            <button
              onClick={() => setActiveNav('profile')}
              className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline flex items-center gap-0.5"
            >
              View Skills <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 4: Learning Progress */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.learningProgress}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Milestone className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {roadmapPct}%
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              {completedTasks}/{totalTasks} Tasks
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-700"
              style={{ width: `${roadmapPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* New Modules Hub: Virtual Labs, Study Planner, Achievements & Hackathon Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Virtual Labs */}
        <div
          onClick={() => setActiveNav('virtual-labs')}
          className="group p-4 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <FlaskConical className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
              {labSubmissions.length} Done
            </span>
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center justify-between">
            <span>{t.virtualLabs}</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            Interactive circuit & algorithm simulations with live calculations and MCQs.
          </p>
        </div>

        {/* Study Planner */}
        <div
          onClick={() => setActiveNav('study-planner')}
          className="group p-4 rounded-2xl bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all cursor-pointer shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <CalendarDays className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
              {studyTasks.filter(st => st.completed).length}/{studyTasks.length} Done
            </span>
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center justify-between">
            <span>{t.studyPlanner}</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            Weekly matrix & personalized rule-based study schedules tailored to {user.branch}.
          </p>
        </div>

        {/* Achievements & Leaderboard */}
        <div
          onClick={() => setActiveNav('achievements')}
          className="group p-4 rounded-2xl bg-gradient-to-br from-amber-50/50 via-white to-yellow-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20 border border-amber-100 dark:border-amber-900/40 hover:border-amber-400 dark:hover:border-amber-600 transition-all cursor-pointer shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-mono">
              Rank #{userRank}
            </span>
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 flex items-center justify-between">
            <span>{t.achievements}</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            {userPoints} Points · Verified certificate locker & activity badge unlocks.
          </p>
        </div>

        {/* Hackathon Hub */}
        <div
          onClick={() => setActiveNav('hackathon-hub')}
          className="group p-4 rounded-2xl bg-gradient-to-br from-purple-50/50 via-white to-pink-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/20 border border-purple-100 dark:border-purple-900/40 hover:border-purple-400 dark:hover:border-purple-600 transition-all cursor-pointer shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform">
              <Rocket className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
              10-Part Blueprint
            </span>
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 flex items-center justify-between">
            <span>{t.hackathonHub}</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            24H sprint simulator, 10-slide deck blueprint, judge Q&A bank & portfolio.
          </p>
        </div>
      </div>

      {/* 3. Mid Section: Skill Development Radar & Career Goal Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Technical Skills & Proficiency Breakdown */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                {t.technicalSkillsCount} & Proficiency
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calibrated against {user.branch} industry standards
              </p>
            </div>
            <button
              onClick={() => setActiveNav('profile')}
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              Update Skills <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {user.technicalSkills.slice(0, 5).map(skill => (
              <div key={skill.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      · {skill.level}
                    </span>
                  </div>
                  <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold tabular-nums">
                    {skill.rating}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      skill.rating >= 80
                        ? 'bg-indigo-600'
                        : skill.rating >= 60
                        ? 'bg-purple-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${skill.rating}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Career Goal Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-900/10 via-white dark:via-slate-900 to-white dark:to-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
              <Target className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider font-mono">
                {t.careerGoal}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {user.careerGoal}
            </h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Target role: <strong className="text-slate-800 dark:text-slate-200">{selectedRole.title}</strong>. Your current skill match is estimated at <strong className="text-indigo-600 dark:text-indigo-400">74%</strong>.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Role Match</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">74%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '74%' }} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveNav('skill-gap')}
              className="w-full py-2 px-3 text-xs font-semibold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Analyze Skill Gaps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Grid: Recommended Internships, Upcoming Hackathons & Recommended Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Internships */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t.recommendedInternships}
                </h3>
              </div>
              <button
                onClick={() => setActiveNav('internships')}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {t.all}
              </button>
            </div>

            <div className="space-y-3">
              {recommendedInternships.map(intern => (
                <div
                  key={intern.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">
                        {intern.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {intern.company} · {intern.location.split(',')[0]}
                      </p>
                    </div>
                    {intern.isPaid && (
                      <span className="text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400 shrink-0">
                        {intern.stipend.split('/')[0]}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Deadline: {intern.deadline}</span>
                    {intern.applied ? (
                      <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {t.applied}
                      </span>
                    ) : (
                      <button
                        onClick={() => setActiveNav('internships')}
                        className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        {t.applyNow}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Hackathons */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t.upcomingHackathons}
                </h3>
              </div>
              <button
                onClick={() => setActiveNav('hackathons')}
                className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
              >
                {t.all}
              </button>
            </div>

            <div className="space-y-3">
              {upcomingHackathons.map(hack => (
                <div
                  key={hack.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">
                    {hack.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {hack.organizer}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" /> {hack.date.split('-')[0]}
                    </span>
                    <span className="font-mono text-purple-600 dark:text-purple-400 font-semibold text-[10px]">
                      {hack.prizePool.split(' ')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveNav('hackathons')}
            className="w-full mt-4 py-2 px-3 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Explore All Competitions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Recommended Projects */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t.recommendedProjects}
                </h3>
              </div>
              <button
                onClick={() => setActiveNav('projects')}
                className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                {t.all}
              </button>
            </div>

            <div className="space-y-3">
              {recommendedProjects.map(proj => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">
                      {proj.title}
                    </h4>
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">
                      {proj.difficulty}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {proj.description}
                  </p>
                  <div className="mt-2 text-[10px] text-slate-400 font-mono">
                    {proj.technologies.slice(0, 3).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveNav('projects')}
            className="w-full mt-4 py-2 px-3 text-xs font-semibold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View All Engineering Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
