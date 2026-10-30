import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EngineeringBranch, VirtualLabExperiment } from '../types';
import { virtualLabExperiments, getLabsForBranch } from '../data/virtualLabsData';
import {
  FlaskConical,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Play,
  Layers,
  BookOpen,
  Wrench,
  FileText,
  HelpCircle,
  Award,
  ChevronRight,
  Sparkles,
  Info,
  Check,
  Send,
} from 'lucide-react';

// Interactive Simulation components
import { DsaVisualizer } from '../components/labs/DsaVisualizer';
import { LogicGatesSimulator } from '../components/labs/LogicGatesSimulator';
import { CircuitSimulator } from '../components/labs/CircuitSimulator';
import { LinearRegressionSim } from '../components/labs/LinearRegressionSim';
import { BeamStructuralSimulator } from '../components/labs/BeamStructuralSimulator';
import { ConcreteMixCalculator } from '../components/labs/ConcreteMixCalculator';

const ALL_BRANCHES: EngineeringBranch[] = [
  'CSE',
  'ISE',
  'AI & DS',
  'ECE',
  'EEE',
  'Mechanical',
  'Civil',
];

export const VirtualLabsView: React.FC = () => {
  const { user, isLabCompleted, submitLabExperiment, labSubmissions, showToast } = useApp();

  const [selectedBranch, setSelectedBranch] = useState<EngineeringBranch>(user.branch);
  const [activeExperiment, setActiveExperiment] = useState<VirtualLabExperiment | null>(null);
  const [activeTab, setActiveTab] = useState<'simulation' | 'theory' | 'procedure' | 'mcqs'>('simulation');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [studentObservation, setStudentObservation] = useState<string>('');

  const branchExperiments = getLabsForBranch(selectedBranch);

  const completedCount = branchExperiments.filter(e => isLabCompleted(e.id)).length;
  const completionPct = branchExperiments.length > 0 ? Math.round((completedCount / branchExperiments.length) * 100) : 0;

  const handleSelectExperiment = (exp: VirtualLabExperiment) => {
    setActiveExperiment(exp);
    setActiveTab('simulation');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setStudentObservation('');
  };

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitExperiment = async () => {
    if (!activeExperiment) return;

    // Calculate MCQ score
    let correctCount = 0;
    activeExperiment.mcqs.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    setQuizSubmitted(true);

    await submitLabExperiment({
      labId: activeExperiment.id,
      experimentTitle: activeExperiment.experimentTitle,
      branch: activeExperiment.branch,
      mcqScore: correctCount,
      maxScore: activeExperiment.mcqs.length,
      observations: studentObservation || activeExperiment.conclusionGuide,
    });
  };

  const renderSimulation = (simType: string) => {
    switch (simType) {
      case 'stack-queue':
        return <DsaVisualizer initialType="stack" />;
      case 'array-sort':
        return <DsaVisualizer initialType="sort" />;
      case 'logic-gates':
        return <LogicGatesSimulator />;
      case 'ohms-circuit':
        return <CircuitSimulator />;
      case 'linear-regression':
        return <LinearRegressionSim />;
      case 'beam-deflection':
        return <BeamStructuralSimulator />;
      case 'concrete-mix':
        return <ConcreteMixCalculator />;
      default:
        return (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
            <span className="p-3 rounded-2xl bg-indigo-950 text-indigo-400 inline-block">
              <FlaskConical className="w-8 h-8" />
            </span>
            <h4 className="text-sm font-bold text-slate-200">Guided Interactive Terminal Lab</h4>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Follow the experimental procedure below. Verify inputs, trace memory registers, and answer the post-experiment questions to submit your findings.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------- */}
      {/* HEADER SECTION                                                      */}
      {/* ------------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800/80 rounded-2xl p-5 md:p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-600/40 border border-indigo-500/50 text-indigo-300">
                <FlaskConical className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
                Practical Engineering Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
              Virtual Labs & Interactive Experiments
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore branch-specific engineering laboratories. Run live physics and circuit simulations, visualize algorithms, record observations, and submit laboratory assessments.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 bg-slate-800/70 border border-slate-700/60 p-3 rounded-xl shrink-0">
            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Completed Labs</span>
              <span className="text-lg font-bold text-emerald-400">
                {completedCount} / {branchExperiments.length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 flex items-center justify-center font-mono text-xs font-bold text-white">
              {completionPct}%
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* VIEW 1: EXPERIMENT WORKSPACE (WHEN OPENED)                           */}
      {/* ------------------------------------------------------------------- */}
      {activeExperiment ? (
        <div className="space-y-5 animate-in fade-in">
          {/* Top Return Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveExperiment(null)}
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Lab Catalog</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                {activeExperiment.branch}
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
                {activeExperiment.labName}
              </span>
            </div>
          </div>

          {/* Experiment Title Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold uppercase">
                Experiment Active
              </span>
              {isLabCompleted(activeExperiment.id) && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Submitted in Supabase
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {activeExperiment.experimentTitle}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Objective:</strong> {activeExperiment.objective}
            </p>
          </div>

          {/* Workspace Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-0.5 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('simulation')}
              className={`pb-3 px-3.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'simulation'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Interactive Simulation</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('theory')}
              className={`pb-3 px-3.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'theory'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Theory & Equations</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('procedure')}
              className={`pb-3 px-3.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'procedure'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Step-by-Step Procedure</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mcqs')}
              className={`pb-3 px-3.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'mcqs'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>MCQ Quiz ({activeExperiment.mcqs.length})</span>
            </button>
          </div>

          {/* Tab 1: Interactive Simulation */}
          {activeTab === 'simulation' && (
            <div className="space-y-4">
              {renderSimulation(activeExperiment.simType)}

              {/* Observation & Submission Box */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Laboratory Observations & Conclusions
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Guideline: {activeExperiment.observationsGuide}
                  </span>
                </div>

                <textarea
                  rows={3}
                  value={studentObservation}
                  onChange={e => setStudentObservation(e.target.value)}
                  placeholder="Record your simulated observations, values, and experimental findings here..."
                  className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Submit experiment to award <strong className="text-amber-500">+25 points</strong> to your leaderboard score and unlock the Lab Explorer badge!
                  </span>

                  <button
                    type="button"
                    onClick={handleSubmitExperiment}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 text-white shadow-md shadow-indigo-900/30 flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Experiment (Supabase)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Theory */}
          {activeTab === 'theory' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Theoretical Background
              </h3>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-mono bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                {activeExperiment.theory}
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-indigo-500" />
                  Required Tools and Equipment
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeExperiment.requiredTools.map((tool, idx) => (
                    <li key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 3: Procedure */}
          {activeTab === 'procedure' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Experimental Step-by-Step Procedure
              </h3>
              <ol className="space-y-3">
                {activeExperiment.procedure.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Tab 4: MCQs */}
          {activeTab === 'mcqs' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Post-Experiment Viva & Conceptual MCQs
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  {Object.keys(quizAnswers).length} / {activeExperiment.mcqs.length} Answered
                </span>
              </div>

              <div className="space-y-4">
                {activeExperiment.mcqs.map((q, qIdx) => {
                  const selected = quizAnswers[q.id];
                  const isCorrect = selected === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"
                    >
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Q{qIdx + 1}. {q.question}
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selected === optIdx;
                          let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                            } else if (isOptionSelected && !isCorrect) {
                              btnStyle = 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-800 dark:text-rose-200';
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'bg-indigo-100 dark:bg-indigo-950 border-indigo-500 text-indigo-700 dark:text-indigo-200 font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectAnswer(q.id, optIdx)}
                              className={`p-2.5 rounded-lg border text-left text-xs transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {isOptionSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[11px] text-indigo-900 dark:text-indigo-200">
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSubmitExperiment}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md cursor-pointer transition flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Verify MCQs & Submit Experiment</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ------------------------------------------------------------------- */
        /* VIEW 2: LAB CATALOG (BY BRANCH)                                     */
        /* ------------------------------------------------------------------- */
        <div className="space-y-6">
          {/* Branch Filter Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-0.5 overflow-x-auto scrollbar-none">
            {ALL_BRANCHES.map(branch => {
              const count = virtualLabExperiments.filter(e => e.branch === branch).length;
              const isSelected = selectedBranch === branch;

              return (
                <button
                  key={branch}
                  type="button"
                  onClick={() => setSelectedBranch(branch)}
                  className={`pb-3 px-3.5 text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <span>{branch}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Experiments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {branchExperiments.map(exp => {
              const isCompleted = isLabCompleted(exp.id);

              return (
                <div
                  key={exp.id}
                  className={`rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 p-5 flex flex-col justify-between shadow-xs hover:shadow-md ${
                    isCompleted
                      ? 'border-emerald-300 dark:border-emerald-900/60 ring-1 ring-emerald-400/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-900/60">
                        {exp.labName}
                      </span>
                      {isCompleted ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Ready
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {exp.experimentTitle}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {exp.objective}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">
                      {exp.simType !== 'none' ? 'Interactive Simulator' : 'Guided Procedure'}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleSelectExperiment(exp)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>Start Lab</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
