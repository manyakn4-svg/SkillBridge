import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CertificateCategory, CertificateRecord, EngineeringBranch } from '../types';
import {
  Award,
  Upload,
  Trophy,
  CheckCircle2,
  Lock,
  Trash2,
  Download,
  ExternalLink,
  Plus,
  X,
  FileCheck2,
  Sparkles,
  Zap,
  Footprints,
  Layers,
  CalendarCheck,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Filter,
  User,
  FlaskConical,
} from 'lucide-react';

const CERT_CATEGORIES: CertificateCategory[] = [
  'Technical Courses',
  'Programming',
  'Internships',
  'Hackathons',
  'Workshops',
  'Competitions',
  'Other Achievements',
];

const ALL_BRANCHES: ('All' | EngineeringBranch)[] = [
  'All',
  'CSE',
  'ISE',
  'AI & DS',
  'ECE',
  'EEE',
  'Mechanical',
  'Civil',
];

export const AchievementsView: React.FC = () => {
  const {
    user,
    certificates,
    addCertificate,
    deleteCertificate,
    badges,
    leaderboard,
    userPoints,
    userRank,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'certificates' | 'badges' | 'leaderboard'>('leaderboard');

  // Certificate Modal State
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certTitle, setCertTitle] = useState('');
  const [certOrg, setCertOrg] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certCategory, setCertCategory] = useState<CertificateCategory>('Technical Courses');
  const [certDesc, setCertDesc] = useState('');
  const [certCredentialId, setCertCredentialId] = useState('');
  const [certFileName, setCertFileName] = useState('');

  // Leaderboard filters
  const [leaderboardBranch, setLeaderboardBranch] = useState<'All' | EngineeringBranch>('All');
  const [leaderboardTimeframe, setLeaderboardTimeframe] = useState<'all' | 'monthly' | 'weekly'>('all');

  // Filtered Leaderboard
  const filteredLeaderboard = useMemo(() => {
    let list = [...leaderboard];
    if (leaderboardBranch !== 'All') {
      list = list.filter(l => l.branch === leaderboardBranch);
    }

    if (leaderboardTimeframe === 'weekly') {
      list.sort((a, b) => (b.weeklyPoints || 0) - (a.weeklyPoints || 0));
    } else if (leaderboardTimeframe === 'monthly') {
      list.sort((a, b) => (b.monthlyPoints || 0) - (a.monthlyPoints || 0));
    } else {
      list.sort((a, b) => b.totalPoints - a.totalPoints);
    }

    return list.map((item, idx) => ({ ...item, displayRank: idx + 1 }));
  }, [leaderboard, leaderboardBranch, leaderboardTimeframe]);

  const handleCreateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle.trim() || !certOrg.trim()) {
      showToast('Please provide certificate title and issuing organization', 'warning');
      return;
    }

    await addCertificate({
      title: certTitle.trim(),
      issuingOrganization: certOrg.trim(),
      issueDate: certDate || new Date().toISOString().split('T')[0],
      category: certCategory,
      description: certDesc.trim(),
      credentialId: certCredentialId.trim(),
      fileName: certFileName || 'certificate.pdf',
    });

    setCertModalOpen(false);
    setCertTitle('');
    setCertOrg('');
    setCertDesc('');
    setCertCredentialId('');
    setCertFileName('');
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints':
        return <Footprints className="w-6 h-6" />;
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6" />;
      case 'Layers':
        return <Layers className="w-6 h-6" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-6 h-6" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------- */}
      {/* HEADER HERO                                                         */}
      {/* ------------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800/80 rounded-2xl p-5 md:p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
                <Trophy className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Student Gamification & Recognition
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
              Achievements, Certificates & Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Earn verified points from roadmaps, virtual labs, assessments, and projects. Showcase credentials and climb the engineering leaderboard.
            </p>
          </div>

          {/* Student Status Card */}
          <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-xl flex items-center gap-5 shrink-0">
            <div className="text-center font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Your Rank</span>
              <span className="text-2xl font-black text-amber-400">#{userRank}</span>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div className="text-center font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Total Points</span>
              <span className="text-2xl font-black text-emerald-400">{userPoints}</span>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div className="text-center font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Badges</span>
              <span className="text-2xl font-black text-purple-400">
                {badges.filter(b => b.isUnlocked).length} / {badges.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* TABS NAVIGATION                                                     */}
      {/* ------------------------------------------------------------------- */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-0.5 overflow-x-auto">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('leaderboard')}
            className={`pb-3 px-3.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'leaderboard'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Student Leaderboard</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('badges')}
            className={`pb-3 px-3.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'badges'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>Badges & Gamification ({badges.filter(b => b.isUnlocked).length}/{badges.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('certificates')}
            className={`pb-3 px-3.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'certificates'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>My Certificates ({certificates.length})</span>
          </button>
        </div>

        {activeTab === 'certificates' && (
          <button
            type="button"
            onClick={() => setCertModalOpen(true)}
            className="mb-2 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Certificate</span>
          </button>
        )}
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* SUBSECTION C: LEADERBOARD                                           */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Branch Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="font-mono text-slate-500 font-bold">Branch:</span>
              <div className="flex gap-1">
                {ALL_BRANCHES.map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setLeaderboardBranch(b)}
                    className={`px-2.5 py-1 rounded-lg font-mono font-bold transition cursor-pointer ${
                      leaderboardBranch === b
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe Filter */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setLeaderboardTimeframe('all')}
                className={`px-3 py-1 rounded-md font-bold transition cursor-pointer ${
                  leaderboardTimeframe === 'all' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-500'
                }`}
              >
                All-Time
              </button>
              <button
                type="button"
                onClick={() => setLeaderboardTimeframe('monthly')}
                className={`px-3 py-1 rounded-md font-bold transition cursor-pointer ${
                  leaderboardTimeframe === 'monthly' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-500'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setLeaderboardTimeframe('weekly')}
                className={`px-3 py-1 rounded-md font-bold transition cursor-pointer ${
                  leaderboardTimeframe === 'weekly' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-500'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          {/* Leaderboard Table Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-mono border-b border-slate-200 dark:border-slate-800 uppercase text-[10px]">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Branch & Year</th>
                    <th className="py-3 px-4 text-center">Badges</th>
                    <th className="py-3 px-4 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredLeaderboard.map((entry, idx) => {
                    const isSelf = entry.isCurrentUser;
                    const pointsToShow =
                      leaderboardTimeframe === 'weekly'
                        ? entry.weeklyPoints || 0
                        : leaderboardTimeframe === 'monthly'
                        ? entry.monthlyPoints || 0
                        : entry.totalPoints;

                    return (
                      <tr
                        key={entry.id}
                        className={`transition-colors ${
                          isSelf
                            ? 'bg-indigo-50/80 dark:bg-indigo-950/40 font-bold border-l-4 border-l-indigo-600'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {/* Rank */}
                        <td className="py-3.5 px-4 font-mono">
                          {entry.displayRank === 1 ? (
                            <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold shadow-sm">
                              🥇
                            </span>
                          ) : entry.displayRank === 2 ? (
                            <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-950 flex items-center justify-center font-extrabold shadow-sm">
                              🥈
                            </span>
                          ) : entry.displayRank === 3 ? (
                            <span className="w-7 h-7 rounded-full bg-amber-700 text-white flex items-center justify-center font-extrabold shadow-sm">
                              🥉
                            </span>
                          ) : (
                            <span className="text-slate-500 pl-2">#{entry.displayRank}</span>
                          )}
                        </td>

                        {/* Student Name */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                              isSelf ? 'bg-indigo-600 text-white ring-2 ring-indigo-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}>
                              {entry.studentName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <span className="font-bold block text-slate-900 dark:text-white">
                                {entry.studentName} {isSelf && <span className="text-[10px] text-indigo-600 dark:text-indigo-400">(You)</span>}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                Engineering Scholar
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Branch */}
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                          {entry.branch} · {entry.academicYear}
                        </td>

                        {/* Badges count */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono text-[10px] font-bold">
                            {entry.badgesCount} Badges
                          </span>
                        </td>

                        {/* Total Points */}
                        <td className="py-3.5 px-4 text-right font-mono font-black text-sm text-emerald-600 dark:text-emerald-400">
                          {pointsToShow.toLocaleString()} pts
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SUBSECTION B: BADGES & GAMIFICATION                                */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'badges' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map(badge => {
              const isUnlocked = badge.isUnlocked;

              return (
                <div
                  key={badge.id}
                  className={`rounded-2xl p-5 border transition-all flex flex-col justify-between shadow-xs ${
                    isUnlocked
                      ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 ring-1 ring-indigo-400/20'
                      : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-75'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                        isUnlocked
                          ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-md shadow-indigo-900/30'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700'
                      }`}>
                        {getBadgeIcon(badge.iconName)}
                      </div>

                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                        isUnlocked
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {isUnlocked ? <CheckCircle2 className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        {isUnlocked ? 'Unlocked' : 'Locked'}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {badge.name}
                      </h3>
                      <span className="text-[10px] font-mono text-indigo-500 block">
                        +{badge.points} Points
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress condition */}
                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-mono space-y-1">
                    <div className="flex justify-between text-slate-500">
                      <span>Condition:</span>
                      <span className="text-indigo-400 font-bold">
                        {badge.progressCurrent || 0} / {badge.progressTarget}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isUnlocked ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                        style={{
                          width: `${Math.min(100, Math.round(((badge.progressCurrent || 0) / (badge.progressTarget || 1)) * 100))}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SUBSECTION A: CERTIFICATES MANAGEMENT                               */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          {certificates.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
              <span className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 inline-block">
                <FileCheck2 className="w-8 h-8" />
              </span>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                No Certificates Uploaded Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Upload your course completions, internships, and hackathon certificates to verify achievements and showcase on your SkillBridge profile.
              </p>
              <button
                type="button"
                onClick={() => setCertModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs cursor-pointer inline-flex items-center gap-2"
              >
                <Upload className="w-3.5 h-3.5" /> Upload First Certificate
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {certificates.map(cert => (
                <div
                  key={cert.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
                        {cert.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {cert.issueDate}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {cert.title}
                      </h3>
                      <span className="text-xs text-indigo-500 dark:text-indigo-400 font-medium block mt-0.5">
                        {cert.issuingOrganization}
                      </span>
                    </div>

                    {cert.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {cert.description}
                      </p>
                    )}

                    {cert.credentialId && (
                      <div className="text-[10px] font-mono text-slate-500 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
                        Credential ID: <span className="text-slate-700 dark:text-slate-300">{cert.credentialId}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Verified Record
                    </span>

                    <button
                      type="button"
                      onClick={() => deleteCertificate(cert.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition cursor-pointer"
                      title="Delete certificate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* MODAL: UPLOAD CERTIFICATE                                           */}
      {/* ------------------------------------------------------------------- */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-indigo-500" />
                Upload Certificate
              </h3>
              <button
                type="button"
                onClick={() => setCertModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCertificate} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Certificate Title *
                </label>
                <input
                  type="text"
                  required
                  value={certTitle}
                  onChange={e => setCertTitle(e.target.value)}
                  placeholder="e.g. AWS Certified Cloud Practitioner / NPTEL Java"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  required
                  value={certOrg}
                  onChange={e => setCertOrg(e.target.value)}
                  placeholder="e.g. Amazon Web Services, NPTEL, Coursera, HackerRank"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={certCategory}
                    onChange={e => setCertCategory(e.target.value as CertificateCategory)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    {CERT_CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={certDate}
                    onChange={e => setCertDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Credential ID / Verification URL
                </label>
                <input
                  type="text"
                  value={certCredentialId}
                  onChange={e => setCertCredentialId(e.target.value)}
                  placeholder="e.g. AWS-89230182 or verification URL"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Description / Key Topics
                </label>
                <textarea
                  rows={2}
                  value={certDesc}
                  onChange={e => setCertDesc(e.target.value)}
                  placeholder="Summary of skills validated..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setCertModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md cursor-pointer"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
