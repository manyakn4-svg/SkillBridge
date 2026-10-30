import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Internship, EngineeringBranch } from '../types';
import {
  Briefcase,
  MapPin,
  Clock,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  DollarSign,
  Building2,
  X,
  Send,
  FileText,
} from 'lucide-react';

export const InternshipsView: React.FC = () => {
  const { t, internships, applyToInternship, user, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Paid' | 'Unpaid'>('All');
  const [filterMode, setFilterMode] = useState<'All' | 'Remote' | 'Onsite'>('All');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');

  // Application modal state
  const [applyingInternship, setApplyingInternship] = useState<Internship | null>(null);
  const [applicantResumeNote, setApplicantResumeNote] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('+91 98765 43210');

  // Filtering
  const filteredInternships = internships.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType =
      filterType === 'All'
        ? true
        : filterType === 'Paid'
        ? item.isPaid
        : !item.isPaid;

    const matchesMode =
      filterMode === 'All'
        ? true
        : filterMode === 'Remote'
        ? item.isRemote
        : !item.isRemote;

    const matchesBranch =
      selectedBranch === 'All'
        ? true
        : item.branchEligibility.includes('All') ||
          item.branchEligibility.includes(selectedBranch as EngineeringBranch);

    return matchesSearch && matchesType && matchesMode && matchesBranch;
  });

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingInternship) return;
    applyToInternship(applyingInternship.id);
    setApplyingInternship(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Opportunities · Industry Placements</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-heading">
              {t.internships}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Curated corporate internships, research apprenticeships, and summer training openings for engineering students.
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, or skill..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Branch Filter */}
          <select
            value={selectedBranch}
            onChange={e => setSelectedBranch(e.target.value)}
            className="w-full px-3 py-2 text-xs font-medium bg-slate-950/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="ISE">ISE</option>
            <option value="AI & DS">AI & DS</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
          </select>

          {/* Paid / Unpaid */}
          <div className="flex bg-slate-950/80 border border-slate-700 rounded-xl p-1">
            {(['All', 'Paid', 'Unpaid'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all ${
                  filterType === type ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Mode */}
          <div className="flex bg-slate-950/80 border border-slate-700 rounded-xl p-1">
            {(['All', 'Remote', 'Onsite'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all ${
                  filterMode === mode ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Internship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInternships.map(intern => (
          <div
            key={intern.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-800 transition-all space-y-4"
          >
            <div>
              {/* Header: Logo + Title + Stipend */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-white font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-500/20 shadow-sm">
                    {intern.logoText}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                      {intern.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {intern.company}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-[11px] font-mono font-bold block ${
                      intern.isPaid
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {intern.stipend}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">
                    {intern.isPaid ? 'Stipend' : 'Unpaid'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                {intern.description}
              </p>

              {/* Meta row */}
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{intern.location} {intern.isRemote ? '(Remote)' : ''}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{intern.duration}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Deadline: {intern.deadline}</span>
                </span>
              </div>

              {/* Eligibility */}
              <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                <strong className="text-slate-800 dark:text-slate-200">Eligibility: </strong>
                {intern.eligibility}
              </div>

              {/* Required Skills unboxed list */}
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Skills:</span>
                {intern.requiredSkills.map((skill, sIdx) => (
                  <span key={skill} className="inline-flex items-center gap-1">
                    <span className="text-slate-700 dark:text-slate-300 font-mono text-[11px]">{skill}</span>
                    {sIdx < intern.requiredSkills.length - 1 && <span className="text-slate-300 dark:text-slate-700">·</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">
                Branches: {intern.branchEligibility.join(', ')}
              </span>

              {intern.applied ? (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.applied}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setApplyingInternship(intern)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  {t.applyNow}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Apply Modal */}
      {applyingInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                  Internship Application
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {applyingInternship.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {applyingInternship.company} · {applyingInternship.location}
                </p>
              </div>
              <button
                onClick={() => setApplyingInternship(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmApply} className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <p>
                  <strong>Applicant: </strong> {user.fullName} ({user.branch}, {user.academicYear})
                </p>
                <p>
                  <strong>College: </strong> {user.collegeName}
                </p>
                <p>
                  <strong>Email: </strong> {user.email}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={applicantPhone}
                  onChange={e => setApplicantPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Brief Cover Note / Pitch (Optional)
                </label>
                <textarea
                  rows={3}
                  value={applicantResumeNote}
                  onChange={e => setApplicantResumeNote(e.target.value)}
                  placeholder="Share a short summary of relevant projects or why you are a great fit..."
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-[11px] text-indigo-700 dark:text-indigo-300">
                <FileText className="w-4 h-4 shrink-0" />
                <span>Your SkillBridge verified profile & assessment scores will be attached automatically.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setApplyingInternship(null)}
                  className="px-4 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
