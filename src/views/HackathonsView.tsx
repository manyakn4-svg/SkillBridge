import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Hackathon } from '../types';
import {
  Trophy,
  Calendar,
  MapPin,
  Clock,
  Search,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Users,
  Award,
  ExternalLink,
  X,
  Sparkles,
} from 'lucide-react';

export const HackathonsView: React.FC = () => {
  const {
    t,
    hackathons,
    registerForHackathon,
    toggleSaveHackathon,
    user,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'All' | 'Online' | 'Offline' | 'Hybrid'>('All');
  const [registeringHack, setRegisteringHack] = useState<Hackathon | null>(null);
  const [teamName, setTeamName] = useState('CodeVanguard');
  const [teamSize, setTeamSize] = useState('4');

  const filteredHackathons = hackathons.filter(h => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMode = filterMode === 'All' ? true : h.mode === filterMode;

    return matchesSearch && matchesMode;
  });

  const handleConfirmRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registeringHack) return;
    registerForHackathon(registeringHack.id);
    setRegisteringHack(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              <span>National & Collegiate Competitions</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-heading">
              {t.hackathons}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Participate in nationwide hardware hackathons, AI coding sprints, smart city innovation contests, and inter-college design challenges.
            </p>
          </div>
        </div>

        {/* Search & Mode Filters */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by contest name, theme, or organizer..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex bg-slate-950/80 border border-slate-700 rounded-xl p-1">
            {(['All', 'Online', 'Offline', 'Hybrid'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all ${
                  filterMode === mode ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHackathons.map(hack => (
          <div
            key={hack.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-purple-300 dark:hover:border-purple-800 transition-all space-y-4"
          >
            <div>
              {/* Top header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        hack.mode === 'Online'
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                          : hack.mode === 'Offline'
                          ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                          : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                      }`}
                    >
                      {hack.mode}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {hack.location}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {hack.name}
                  </h3>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                    {hack.organizer}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSaveHackathon(hack.id)}
                  className="p-2 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  aria-label="Bookmark competition"
                >
                  {hack.saved ? (
                    <BookmarkCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                {hack.description}
              </p>

              {/* Dates & Prize */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">
                    Event Dates
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {hack.date}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">
                    Prize Pool
                  </span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400 font-mono mt-0.5 block">
                    {hack.prizePool}
                  </span>
                </div>
              </div>

              {/* Eligibility & Deadline */}
              <div className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <p>
                  <strong className="text-slate-700 dark:text-slate-300">Eligibility: </strong>
                  {hack.eligibility}
                </p>
                <p>
                  <strong className="text-slate-700 dark:text-slate-300">Deadline: </strong>
                  {hack.registrationDeadline}
                </p>
              </div>

              {/* Tags unboxed */}
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Themes:</span>
                {hack.tags.map((tag, tIdx) => (
                  <span key={tag} className="inline-flex items-center gap-1 font-mono text-[11px]">
                    <span>{tag}</span>
                    {tIdx < hack.tags.length - 1 && <span className="text-slate-300 dark:text-slate-700">·</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom action */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Official AICTE / Campus Portal
              </span>

              {hack.registered ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.registered}</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setRegisteringHack(hack)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  {t.registerNow}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Registration Modal */}
      {registeringHack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold">
                  Event Registration
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {registeringHack.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Organizer: {registeringHack.organizer}
                </p>
              </div>
              <button
                onClick={() => setRegisteringHack(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmRegistration} className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <p>
                  <strong>Team Leader: </strong> {user.fullName} ({user.email})
                </p>
                <p>
                  <strong>Institution: </strong> {user.collegeName}
                </p>
                <p>
                  <strong>Branch: </strong> {user.branch} · {user.academicYear}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Team Name
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  placeholder="e.g. CodeTitans"
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Team Size (Members)
                </label>
                <select
                  value={teamSize}
                  onChange={e => setTeamSize(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                >
                  <option value="1">Solo (1 Member)</option>
                  <option value="2">Duo (2 Members)</option>
                  <option value="3">Trio (3 Members)</option>
                  <option value="4">Quad (4 Members)</option>
                  <option value="6">Full Squad (6 Members - SIH Rule)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRegisteringHack(null)}
                  className="px-4 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Confirm Registration</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
