import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HackathonPersonalRecord } from '../types';
import {
  hackathon24hTimeline,
  hackathon10SlideStructure,
  hackathonJudgeQA,
  initialHackathonChecklist,
  curatedHackathonResources,
} from '../data/hackathonHubData';
import {
  Rocket,
  Clock,
  BookOpen,
  Users,
  Code2,
  Presentation,
  CheckSquare,
  Award,
  ExternalLink,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  FolderGit2,
  Target,
  X,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const HackathonHubView: React.FC = () => {
  const {
    personalHackathons,
    addPersonalHackathon,
    deletePersonalHackathon,
    hackathonChecklist,
    toggleHackathonChecklist,
    showToast,
  } = useApp();

  const [activeSection, setActiveSection] = useState<
    'guide' | 'steps' | 'problem' | 'team' | 'tech' | 'timeline' | 'ppt' | 'judges' | 'checklist' | 'resources' | 'portfolio'
  >('timeline');

  // 24-Hour Countdown Simulator State
  const [timerSeconds, setTimerSeconds] = useState<number>(24 * 3600);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatTimer = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Problem Analysis Worksheet State
  const [wsTitle, setWsTitle] = useState('');
  const [wsUser, setWsUser] = useState('');
  const [wsFeasibility, setWsFeasibility] = useState<number>(8);
  const [wsImpact, setWsImpact] = useState<number>(8);
  const [wsUniqueness, setWsUniqueness] = useState<number>(7);

  // Portfolio Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [hName, setHName] = useState('');
  const [hDate, setHDate] = useState('');
  const [hMode, setHMode] = useState<'Online' | 'Offline' | 'Hybrid'>('Hybrid');
  const [hTeam, setHTeam] = useState('');
  const [hMembers, setHMembers] = useState('');
  const [hProjectTitle, setHProjectTitle] = useState('');
  const [hProjectDesc, setHProjectDesc] = useState('');
  const [hGithub, setHGithub] = useState('');
  const [hDemo, setHDemo] = useState('');
  const [hAward, setHAward] = useState('Participant');

  const handleAddHackathon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hName.trim() || !hProjectTitle.trim()) {
      showToast('Please provide hackathon name and project title', 'warning');
      return;
    }

    await addPersonalHackathon({
      hackathonName: hName.trim(),
      eventDate: hDate || new Date().toISOString().split('T')[0],
      mode: hMode,
      teamName: hTeam.trim() || 'Team Innovators',
      teamMembers: hMembers ? hMembers.split(',').map(m => m.trim()) : ['Team Member'],
      projectTitle: hProjectTitle.trim(),
      projectDescription: hProjectDesc.trim(),
      githubUrl: hGithub.trim(),
      demoUrl: hDemo.trim(),
      achievementAward: hAward,
    });

    setModalOpen(false);
    setHName('');
    setHDate('');
    setHTeam('');
    setHMembers('');
    setHProjectTitle('');
    setHProjectDesc('');
    setHGithub('');
    setHDemo('');
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
              <span className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300">
                <Rocket className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-rose-400 font-bold">
                Competitive Hackathon Mastery
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
              Hackathon Hub – 24-Hour Sprint Guide
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Everything engineering students need to master 24-hour hackathons: problem selection, team roles, technology stack, pitch deck architecture, and personal hackathon portfolio.
            </p>
          </div>

          {/* 24-Hour Timer Widget */}
          <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-xl flex items-center gap-4 shrink-0">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block uppercase">
                Sprint Stopwatch
              </span>
              <span className="text-2xl font-black font-mono text-amber-400 tracking-wider">
                {formatTimer(timerSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setTimerRunning(!timerRunning)}
                className={`p-2 rounded-lg text-white font-bold transition cursor-pointer ${
                  timerRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
                title={timerRunning ? 'Pause timer' : 'Start 24h sprint countdown'}
              >
                {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => { setTimerRunning(false); setTimerSeconds(24 * 3600); }}
                className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition cursor-pointer"
                title="Reset timer to 24:00:00"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* NAVIGATION TABS                                                     */}
      {/* ------------------------------------------------------------------- */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-0.5 overflow-x-auto scrollbar-none">
        {[
          { id: 'timeline', label: '24-Hour Timeline', icon: Clock },
          { id: 'guide', label: 'What is a Hackathon?', icon: BookOpen },
          { id: 'steps', label: '15-Step Guide', icon: Target },
          { id: 'problem', label: 'Problem Worksheet', icon: FileText },
          { id: 'team', label: 'Team Roles', icon: Users },
          { id: 'tech', label: 'Tech Stack', icon: Code2 },
          { id: 'ppt', label: '10-Slide PPT Guide', icon: Presentation },
          { id: 'judges', label: 'Judge Q&A', icon: HelpCircle },
          { id: 'checklist', label: 'Sprint Checklist', icon: CheckSquare },
          { id: 'resources', label: 'Free Resources', icon: ExternalLink },
          { id: 'portfolio', label: `My Hackathons (${personalHackathons.length})`, icon: FolderGit2 },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id as any)}
              className={`pb-3 px-3 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* SECTION F: 24-HOUR INTERACTIVE TIMELINE                             */}
      {/* ------------------------------------------------------------------- */}
      {activeSection === 'timeline' && (
        <div className="space-y-4">
          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/60 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between gap-3">
            <span>
              <strong>The 24-Hour Sprint Blueprint:</strong> Proven hour-by-hour roadmap used by winning collegiate hackathon teams to deliver a live working prototype with a polished pitch deck.
            </span>
            <span className="font-mono text-[10px] px-2 py-1 rounded bg-indigo-200 dark:bg-indigo-900 font-bold shrink-0">
              8 Milestones
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hackathon24hTimeline.map((phase, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-extrabold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {phase.hourRange}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {phase.focus}
                  </p>

                  <ul className="space-y-1.5 pt-2 text-xs text-slate-600 dark:text-slate-300">
                    {phase.actions.map((act, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-1.5">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 p-2 rounded-lg">
                  <strong>Deliverable:</strong> {phase.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SECTION A: WHAT IS A HACKATHON?                                     */}
      {/* ------------------------------------------------------------------- */}
      {activeSection === 'guide' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              What Is an Engineering Hackathon?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              A hackathon is an invention marathon where multidisciplinary students collaborate intensely over 24 to 48 hours to design, develop, and present a functional technological solution to a real-world problem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 block">
                Why Students Participate
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Build real portfolio projects under sprint deadlines, network directly with corporate recruiters, win cash prizes, and experience fast-paced collaborative development.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 block">
                Types of Hackathons
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Internal College Hackathons:</strong> Great for beginners.<br />
                <strong>National Collegiate (SIH, Unstop):</strong> Industry-sponsored themes.<br />
                <strong>Open Global (Devpost, MLH):</strong> International participation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 block">
                Individual vs. Team
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Most hackathons favor teams of 3 to 4 members with complementary skills (Frontend, Backend, and Design/Presentation) to maximize velocity and code quality.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SECTION B: 15-STEP PARTICIPATION BLUEPRINT                          */}
      {/* ------------------------------------------------------------------- */}
      {activeSection === 'steps' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            15-Step End-to-End Hackathon Workflow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {[
              { num: 1, title: 'Find a Suitable Hackathon', desc: 'Browse Devpost, Unstop, or college event boards matching your tech stack.' },
              { num: 2, title: 'Read Problem Statements', desc: 'Analyze all problem themes with your team before deciding.' },
              { num: 3, title: 'Register for the Event', desc: 'Complete team registration before deadlines and join Discord/Slack channels.' },
              { num: 4, title: 'Create or Join a Team', desc: 'Assemble 3-4 members balancing frontend, backend, and presentation skills.' },
              { num: 5, title: 'Select Problem Statement', desc: 'Choose a problem with clear feasibility within 24 hours.' },
              { num: 6, title: 'Brainstorm Ideas', desc: 'Generate 3 alternative solutions and compare trade-offs.' },
              { num: 7, title: 'Choose the Best Idea', desc: 'Commit 100% to one cohesive solution without second-guessing mid-hack.' },
              { num: 8, title: 'Plan the Solution (MVP)', desc: 'Explicitly define core Must-Have features and defer non-essentials.' },
              { num: 9, title: 'Select Tech Stack', desc: 'Choose tools your team already knows (e.g. React + Supabase + Tailwind).' },
              { num: 10, title: 'Divide Responsibilities', desc: 'Assign clear ownership: Lead, UI, API, Database, and Pitch Deck.' },
              { num: 11, title: 'Start Development', desc: 'Implement core functionality first; ensure end-to-end happy path works.' },
              { num: 12, title: 'Test the Project', desc: 'Seed realistic demo data and eliminate console errors.' },
              { num: 13, title: 'Prepare Presentation', desc: 'Build the 10-slide deck and record a 60-second offline backup video.' },
              { num: 14, title: 'Submit Project', desc: 'Submit repository and video 30 minutes before the portal deadline.' },
              { num: 15, title: 'Present to Judges', desc: 'Deliver an engaging 3-minute pitch followed by confident technical answers.' },
            ].map(step => (
              <div
                key={step.num}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                  {step.num}
                </span>
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white leading-tight">
                    {step.title}
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SECTION C: PROBLEM STATEMENT ANALYSIS WORKSHEET                     */}
      {/* ------------------------------------------------------------------- */}
      {activeSection === 'problem' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Problem Statement Evaluation & Feasibility Worksheet
            </h2>
            <p className="text-xs text-slate-500">
              Score potential ideas before coding to avoid overly complex solutions that cannot be completed in 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Problem Title / Theme
                </label>
                <input
                  type="text"
                  value={wsTitle}
                  onChange={e => setWsTitle(e.target.value)}
                  placeholder="e.g. Decentralized Crop Traceability for Small Farmers"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target User Persona
                </label>
                <input
                  type="text"
                  value={wsUser}
                  onChange={e => setWsUser(e.target.value)}
                  placeholder="e.g. Rural farmers, logistics middlemen, or retail consumers"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Feasibility Slider */}
              <div className="space-y-1">
                <div className="flex justify-between font-mono">
                  <span>24-Hour Technical Feasibility (1-10):</span>
                  <span className="font-bold text-indigo-400">{wsFeasibility} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={wsFeasibility}
                  onChange={e => setWsFeasibility(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Real World Impact Slider */}
              <div className="space-y-1">
                <div className="flex justify-between font-mono">
                  <span>Real-World User Impact (1-10):</span>
                  <span className="font-bold text-emerald-400">{wsImpact} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={wsImpact}
                  onChange={e => setWsImpact(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Uniqueness Slider */}
              <div className="space-y-1">
                <div className="flex justify-between font-mono">
                  <span>Uniqueness vs Existing Market (1-10):</span>
                  <span className="font-bold text-purple-400">{wsUniqueness} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={wsUniqueness}
                  onChange={e => setWsUniqueness(parseInt(e.target.value, 10))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Score Card */}
            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Aggregate Hackathon Viability Score
                </span>
                <div className="flex items-baseline gap-2 my-2">
                  <span className="text-4xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                    {Math.round(((wsFeasibility + wsImpact + wsUniqueness) / 30) * 100)}%
                  </span>
                  <span className="text-xs text-slate-400">({wsFeasibility + wsImpact + wsUniqueness} / 30 pts)</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 border-t border-slate-200 dark:border-slate-800 pt-3">
                <span className="font-bold block">Advisory Verdict:</span>
                {wsFeasibility < 5 ? (
                  <p className="text-rose-500">
                    ⚠️ <strong>High Scope Risk:</strong> This concept appears too large for a 24-hour sprint. Strip down requirements to a minimal working prototype.
                  </p>
                ) : (
                  <p className="text-emerald-500">
                    ✅ <strong>Balanced & Feasible:</strong> Great potential for a successful 24-hour hackathon submission! Focus on a rock-solid MVP.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SECTION D: TEAM ROLES & RESPONSIBILITIES                            */}
      {/* ------------------------------------------------------------------- */}
      {activeSection === 'team' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Team Formation & Functional Responsibilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {[
              { role: 'Team Leader', desc: 'Maintains product roadmap, keeps team on schedule, resolves code conflicts, and coordinates the 3-minute pitch.' },
              { role: 'Frontend Developer', desc: 'Builds responsive UI, interactive dashboards, forms, and handles client-side state and navigation.' },
              { role: 'Backend Developer', desc: 'Implements REST APIs, authentication endpoints, server logic, and connects cloud microservices.' },
              { role: 'UI/UX Designer', desc: 'Prepares quick Figma wireframes, color palettes, visual diagrams, and pitch deck graphic assets.' },
              { role: 'Database Engineer', desc: 'Designs schemas, defines primary/foreign keys, writes optimized queries, and seeds sample records.' },
              { role: 'Research & Pitch Lead', desc: 'Conducts competitor analysis, calculates impact statistics, structures the 10 slides, and practices Q&A.' },
            ].map((r, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400 block">
                  {r.role}
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SECTION G: 10-SLIDE PPT GUIDE                                       */}
      {/* ------------------------------------------------------------------- */}
      {activeSection === 'ppt' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Winning 10-Slide Hackathon Presentation Structure
              </h2>
              <p className="text-xs text-slate-500">
                Follow this structure to convince technical and business judges within 3 minutes.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-lg">
              3-Minute Rehearsal Standard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {hackathon10SlideStructure.map(slide => (
              <div
                key={slide.slideNumber}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                    Slide {slide.slideNumber}: {slide.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    ~18 seconds
                  </span>
                </div>

                <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                  {slide.content.map((c, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-1.5">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                  💡 <strong>Pro Tip:</strong> {slide.proTip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SECTION H: JUDGE Q&A BANK                                           */}
      {/* ------------------------------------------------------------------- */}
      {activeSection === 'judges' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Top Technical Interview & Judge Questions with Model Answers
          </h2>

          <div className="space-y-3">
            {hackathonJudgeQA.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
              >
                <span className="font-bold text-slate-900 dark:text-white block">
                  Q{idx + 1}: {item.question}
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <strong>Recommended Answer:</strong> "{item.answer}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SECTION I: SPRINT CHECKLIST                                         */}
      {/* ------------------------------------------------------------------- */}
      {activeSection === 'checklist' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Interactive Hackathon Readiness Checklist
            </h2>
            <p className="text-xs text-slate-500">
              Check off tasks before, during, and right before portal submission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Before Event */}
            <div className="space-y-3">
              <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400 block border-b border-slate-200 dark:border-slate-800 pb-2">
                1. Before the Event ({initialHackathonChecklist.before.length})
              </span>
              <div className="space-y-2">
                {initialHackathonChecklist.before.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleHackathonChecklist(item.id)}
                    className="w-full p-2.5 rounded-lg border text-left flex items-start gap-2 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 cursor-pointer"
                  >
                    <span className="mt-0.5 text-indigo-600">
                      {hackathonChecklist[item.id] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 rounded-full border border-slate-400" />}
                    </span>
                    <span className={hackathonChecklist[item.id] ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* During Event */}
            <div className="space-y-3">
              <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400 block border-b border-slate-200 dark:border-slate-800 pb-2">
                2. During the 24h Sprint ({initialHackathonChecklist.during.length})
              </span>
              <div className="space-y-2">
                {initialHackathonChecklist.during.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleHackathonChecklist(item.id)}
                    className="w-full p-2.5 rounded-lg border text-left flex items-start gap-2 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 cursor-pointer"
                  >
                    <span className="mt-0.5 text-indigo-600">
                      {hackathonChecklist[item.id] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 rounded-full border border-slate-400" />}
                    </span>
                    <span className={hackathonChecklist[item.id] ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submission */}
            <div className="space-y-3">
              <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400 block border-b border-slate-200 dark:border-slate-800 pb-2">
                3. Before Submission Deadline ({initialHackathonChecklist.submission.length})
              </span>
              <div className="space-y-2">
                {initialHackathonChecklist.submission.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleHackathonChecklist(item.id)}
                    className="w-full p-2.5 rounded-lg border text-left flex items-start gap-2 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 cursor-pointer"
                  >
                    <span className="mt-0.5 text-indigo-600">
                      {hackathonChecklist[item.id] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 rounded-full border border-slate-400" />}
                    </span>
                    <span className={hackathonChecklist[item.id] ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SECTION J: CURATED RESOURCES                                        */}
      {/* ------------------------------------------------------------------- */}
      {activeSection === 'resources' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {curatedHackathonResources.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-xs"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                  {cat.category}
                </h3>
                <div className="space-y-3">
                  {cat.items.map((it, iIdx) => (
                    <div key={iIdx} className="space-y-1 text-xs">
                      <a
                        href={it.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        <span>{it.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-snug">
                        {it.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SECTION 5: PERSONAL HACKATHON PROGRESS TRACKER                      */}
      {/* ------------------------------------------------------------------- */}
      {activeSection === 'portfolio' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                My Participated Hackathons & Projects Portfolio
              </h2>
              <p className="text-xs text-slate-500">
                Log your hackathon projects, team roles, code repositories, and awards for recruiters and Supabase profile.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Hackathon</span>
            </button>
          </div>

          {personalHackathons.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
              <Rocket className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                No Hackathons Recorded Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Record your first hackathon project to claim <strong>+40 points</strong> toward your student rank and unlock the Hackathon Participant badge!
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white cursor-pointer"
              >
                + Record Participation
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalHackathons.map(rec => (
                <div
                  key={rec.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                        {rec.hackathonName}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">
                        {rec.achievementAward || 'Participant'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {rec.projectTitle}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                      {rec.projectDescription}
                    </p>

                    <div className="text-[11px] text-slate-500 font-mono space-y-0.5 pt-1">
                      <div>Team: <strong>{rec.teamName}</strong></div>
                      <div>Members: {rec.teamMembers?.join(', ') || 'N/A'}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {rec.githubUrl && (
                        <a
                          href={rec.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 font-mono"
                        >
                          <FolderGit2 className="w-3.5 h-3.5" /> Code
                        </a>
                      )}
                      {rec.demoUrl && (
                        <a
                          href={rec.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 font-mono"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Demo
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => deletePersonalHackathon(rec.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition cursor-pointer"
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
      {/* MODAL: RECORD HACKATHON PARTICIPATION                               */}
      {/* ------------------------------------------------------------------- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Rocket className="w-4 h-4 text-indigo-500" />
                Record Hackathon Participation
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddHackathon} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Hackathon Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={hName}
                    onChange={e => setHName(e.target.value)}
                    placeholder="e.g. Smart India Hackathon"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={hDate}
                    onChange={e => setHDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={hTeam}
                    onChange={e => setHTeam(e.target.value)}
                    placeholder="e.g. ByteBrigade"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Achievement / Award
                  </label>
                  <select
                    value={hAward}
                    onChange={e => setHAward(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Winner">Winner (1st Place)</option>
                    <option value="1st Runner Up">1st Runner Up</option>
                    <option value="Special Mention">Special Category Mention</option>
                    <option value="Finalist">Grand Finalist</option>
                    <option value="Participant">Verified Participant</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Team Members (comma separated)
                </label>
                <input
                  type="text"
                  value={hMembers}
                  onChange={e => setHMembers(e.target.value)}
                  placeholder="e.g. Aarav Sharma, Priya K., Rohan D."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={hProjectTitle}
                  onChange={e => setHProjectTitle(e.target.value)}
                  placeholder="e.g. EcoRoute – Green Delivery Optimization"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Project Description
                </label>
                <textarea
                  rows={2}
                  value={hProjectDesc}
                  onChange={e => setHProjectDesc(e.target.value)}
                  placeholder="Brief summary of solution and technology stack..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={hGithub}
                    onChange={e => setHGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Demo URL
                  </label>
                  <input
                    type="url"
                    value={hDemo}
                    onChange={e => setHDemo(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md cursor-pointer"
                >
                  Save Hackathon (+40 pts)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
