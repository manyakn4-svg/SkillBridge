import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AssessmentCategory, EngineeringBranch, Question } from '../types';
import { aptitudeQuestions } from '../data/aptitudeQuestions';
import { branchSubjects, technicalQuestions } from '../data/technicalQuestions';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  ChevronRight,
  Layers,
  Cpu,
  BookOpen,
  AlertCircle,
  Flag,
} from 'lucide-react';

export const AssessmentView: React.FC = () => {
  const { t, user, addAssessmentResult } = useApp();

  // Mode: Aptitude vs Technical
  const [activeTab, setActiveTab] = useState<'Aptitude' | 'Technical'>('Aptitude');

  // Test state: 'idle' | 'taking' | 'result'
  const [testState, setTestState] = useState<'idle' | 'taking' | 'result'>('idle');

  // Selected Category / Branch
  const [selectedAptitudeCat, setSelectedAptitudeCat] = useState<AssessmentCategory>('Quantitative Aptitude');
  const [selectedBranch, setSelectedBranch] = useState<EngineeringBranch>(user.branch);

  // Active Test questions & state
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [initialTime, setInitialTime] = useState(600);
  const [activeTestTitle, setActiveTestTitle] = useState('');

  // Result computed state
  const [finalScore, setFinalScore] = useState(0);
  const [finalPercentage, setFinalPercentage] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  // Categories config
  const aptitudeCategories: {
    category: AssessmentCategory;
    title: string;
    subtopics: string[];
    description: string;
  }[] = [
    {
      category: 'Quantitative Aptitude',
      title: t.quantitativeAptitude,
      subtopics: [
        'Mathematics',
        'Percentages',
        'Profit and Loss',
        'Time and Work',
        'Time, Speed and Distance',
        'Ratios and Proportions',
      ],
      description: 'Master core numerical speed, arithmetic progressions, commercial math, and algebraic ratios.',
    },
    {
      category: 'Logical Reasoning',
      title: t.logicalReasoning,
      subtopics: [
        'Patterns',
        'Puzzles',
        'Coding-Decoding',
        'Number Sequences',
        'Blood Relations',
      ],
      description: 'Test inductive reasoning, alphanumeric code patterns, direction sense, and relation chains.',
    },
    {
      category: 'Verbal Ability',
      title: t.verbalAbility,
      subtopics: [
        'Grammar',
        'Vocabulary',
        'Reading Comprehension',
        'Sentence Correction',
        'Synonyms and Antonyms',
      ],
      description: 'Assess grammatical precision, vocabulary richness, technical reading comprehension, and error spotting.',
    },
    {
      category: 'Analytical Thinking',
      title: t.analyticalThinking,
      subtopics: [
        'Problem-solving',
        'Data Interpretation',
        'Critical Thinking',
        'Decision-making',
      ],
      description: 'Evaluate technical trade-off decisions, algorithmic bottlenecks, graphs, and critical logic deductions.',
    },
  ];

  // Countdown Timer
  useEffect(() => {
    let interval: any = null;
    if (testState === 'taking' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleTestSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testState, timeLeft]);

  // Start Aptitude Test
  const handleStartAptitude = (cat: AssessmentCategory) => {
    const questions = aptitudeQuestions.filter(q => q.category === cat);
    setActiveQuestions(questions);
    setSelectedAptitudeCat(cat);
    setCurrentQIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeLeft(600);
    setInitialTime(600);
    setActiveTestTitle(cat);
    setTestState('taking');
  };

  // Start Technical Test
  const handleStartTechnical = (branch: EngineeringBranch) => {
    const questions = technicalQuestions[branch] || technicalQuestions['CSE'];
    setActiveQuestions(questions);
    setSelectedBranch(branch);
    setCurrentQIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeLeft(600);
    setInitialTime(600);
    setActiveTestTitle(`${branch} Technical Skill Assessment`);
    setTestState('taking');
  };

  // Handle Option Select
  const handleSelectOption = (optionIndex: number) => {
    const q = activeQuestions[currentQIndex];
    if (!q) return;
    setUserAnswers(prev => ({
      ...prev,
      [q.id]: optionIndex,
    }));
  };

  const handleToggleFlag = () => {
    const q = activeQuestions[currentQIndex];
    if (!q) return;
    setFlaggedQuestions(prev => ({
      ...prev,
      [q.id]: !prev[q.id],
    }));
  };

  // Handle Test Submit
  const handleTestSubmit = () => {
    let score = 0;
    const answerResults = activeQuestions.map(q => {
      const selected = userAnswers[q.id];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) score += 1;
      return {
        questionId: q.id,
        selectedOption: selected !== undefined ? selected : -1,
        isCorrect,
      };
    });

    const total = activeQuestions.length;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const spentSecs = initialTime - timeLeft;

    setFinalScore(score);
    setFinalPercentage(pct);
    setTimeSpent(spentSecs);
    setTestState('result');

    addAssessmentResult({
      type: activeTab,
      categoryOrSubject: activeTestTitle,
      score,
      totalQuestions: total,
      percentage: pct,
      timeSpentSeconds: spentSecs,
      answers: answerResults,
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // -------------------------------------------------------------
  // TEST TAKING SCREEN
  // -------------------------------------------------------------
  if (testState === 'taking') {
    const currentQ = activeQuestions[currentQIndex];
    const totalQ = activeQuestions.length;
    const answeredCount = Object.keys(userAnswers).length;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Test Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
              {activeTab} Test · {activeTestTitle}
            </span>
            <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
              {t.question} {currentQIndex + 1} {t.of} {totalQ}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold tabular-nums ${
                timeLeft < 120
                  ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 animate-pulse'
                  : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={handleToggleFlag}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                flaggedQuestions[currentQ?.id]
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border-slate-200 dark:border-slate-800'
              }`}
              title="Flag question for review"
            >
              <Flag className="w-4 h-4" />
            </button>

            <button
              onClick={handleTestSubmit}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-sm"
            >
              {t.submit}
            </button>
          </div>
        </div>

        {/* Question & Options Area */}
        {currentQ && (
          <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-400">
                Subtopic: {currentQ.subtopic}
              </span>
              <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                {currentQ.question}
              </p>
            </div>

            {/* 4 Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = userAnswers[currentQ.id] === idx;
                const optLetter = ['A', 'B', 'C', 'D'][idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-600 dark:border-indigo-500 text-indigo-950 dark:text-indigo-200 shadow-sm'
                        : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {optLetter}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex(prev => prev - 1)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-800 transition-colors ${
                  currentQIndex === 0
                    ? 'opacity-40 cursor-not-allowed text-slate-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.previous}</span>
              </button>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
                <span>Answered: {answeredCount}/{totalQ}</span>
              </div>

              {currentQIndex < totalQ - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQIndex(prev => prev + 1)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-sm"
                >
                  <span>{t.next}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleTestSubmit}
                  className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-sm"
                >
                  <span>{t.submit}</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Question Palette Grid */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
            Question Palette
          </p>
          <div className="flex flex-wrap gap-2">
            {activeQuestions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = idx === currentQIndex;
              const isFlagged = flaggedQuestions[q.id];

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold transition-all relative ${
                    isCurrent
                      ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900 font-bold'
                      : ''
                  } ${
                    isAnswered
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white dark:ring-slate-900" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // TEST RESULT & ANALYSIS SCREEN
  // -------------------------------------------------------------
  if (testState === 'result') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Scorecard Hero */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl text-center space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-lg mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-heading">
            {t.scoreSummary}: {activeTestTitle}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6 pt-2">
            <div className="px-5 py-3 rounded-xl bg-slate-800/80 border border-slate-700/60 min-w-[120px]">
              <span className="text-[11px] text-slate-400 uppercase font-mono block">
                {t.yourScore}
              </span>
              <span className="text-2xl font-extrabold font-mono text-white tabular-nums">
                {finalScore} / {activeQuestions.length}
              </span>
            </div>
            <div className="px-5 py-3 rounded-xl bg-slate-800/80 border border-slate-700/60 min-w-[120px]">
              <span className="text-[11px] text-slate-400 uppercase font-mono block">
                {t.accuracy}
              </span>
              <span className="text-2xl font-extrabold font-mono text-indigo-400 tabular-nums">
                {finalPercentage}%
              </span>
            </div>
            <div className="px-5 py-3 rounded-xl bg-slate-800/80 border border-slate-700/60 min-w-[120px]">
              <span className="text-[11px] text-slate-400 uppercase font-mono block">
                Time Taken
              </span>
              <span className="text-2xl font-extrabold font-mono text-purple-300 tabular-nums">
                {formatTime(timeSpent)}
              </span>
            </div>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setTestState('idle')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.retakeTest}</span>
            </button>
          </div>
        </div>

        {/* Question-by-Question Detailed Review */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{t.reviewAnswers} & Detailed Explanations</span>
          </h3>

          <div className="space-y-4">
            {activeQuestions.map((q, idx) => {
              const userPick = userAnswers[q.id];
              const isCorrect = userPick === q.correctIndex;
              const isSkipped = userPick === undefined;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCorrect
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                      : isSkipped
                      ? 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                      : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Q{idx + 1}. {q.question}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shrink-0 ${
                        isCorrect
                          ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                          : isSkipped
                          ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          : 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {isCorrect ? 'Correct (+1)' : isSkipped ? 'Skipped (0)' : 'Incorrect (0)'}
                    </span>
                  </div>

                  {/* Options Review */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {q.options.map((opt, oIdx) => {
                      const isCorrectOpt = oIdx === q.correctIndex;
                      const isChosen = userPick === oIdx;

                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl text-xs flex items-center justify-between border ${
                            isCorrectOpt
                              ? 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 font-semibold text-emerald-900 dark:text-emerald-200'
                              : isChosen
                              ? 'bg-rose-100/70 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200 line-through'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <span className="truncate">{['A', 'B', 'C', 'D'][oIdx]}. {opt}</span>
                          {isCorrectOpt && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                          {!isCorrectOpt && isChosen && <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Note */}
                  <div className="mt-3 p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white font-semibold">Explanation: </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // DEFAULT LANDING SCREEN (Aptitude & Technical test selection)
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl">
        <h1 className="text-xl sm:text-2xl font-bold font-heading">
          {t.skillAssessment}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Standardized campus placement mock tests, subtopic aptitude drills, and branch-specific core technical assessments.
        </p>

        {/* Tab switch */}
        <div className="mt-6 inline-flex p-1 bg-slate-900/80 border border-slate-700/80 rounded-xl">
          <button
            onClick={() => setActiveTab('Aptitude')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'Aptitude'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            A. {t.aptitudeAssessment}
          </button>
          <button
            onClick={() => setActiveTab('Technical')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'Technical'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            B. {t.technicalAssessment}
          </button>
        </div>
      </div>

      {activeTab === 'Aptitude' ? (
        /* SECTION A: APTITUDE ASSESSMENT */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                4 Core Aptitude Categories (10 Questions Each · Timed)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Each category contains 10 comprehensive sample questions with detailed step-by-step solutions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aptitudeCategories.map(cat => (
              <div
                key={cat.category}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-800 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {cat.title}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                      10 Questions · 10 Min
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="space-y-1 mb-4">
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                      Subtopics Covered:
                    </span>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap gap-x-2 gap-y-1">
                      {cat.subtopics.map((sub, sIdx) => (
                        <span key={sub} className="inline-flex items-center gap-1">
                          <span>{sub}</span>
                          {sIdx < cat.subtopics.length - 1 && <span className="text-slate-300 dark:text-slate-700">·</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartAptitude(cat.category)}
                  className="w-full mt-4 py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>{t.startAssessment}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* SECTION B: TECHNICAL ASSESSMENT */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Branch-Specific Technical Skill Assessment
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select your engineering branch to view curriculum subjects and take verified technical tests.
              </p>
            </div>

            {/* Branch selector */}
            <select
              value={selectedBranch}
              onChange={e => setSelectedBranch(e.target.value as EngineeringBranch)}
              className="px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="CSE">CSE – Computer Science & Engineering</option>
              <option value="ISE">ISE – Information Science & Engineering</option>
              <option value="AI & DS">AI & DS – Artificial Intelligence & Data Science</option>
              <option value="ECE">ECE – Electronics & Communication Engineering</option>
              <option value="EEE">EEE – Electrical & Electronics Engineering</option>
              <option value="Mechanical">Mechanical Engineering</option>
              <option value="Civil">Civil Engineering</option>
            </select>
          </div>

          {/* Subjects Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Curriculum Subjects for {selectedBranch}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleStartTechnical(selectedBranch)}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Take {selectedBranch} Technical Test</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {(branchSubjects[selectedBranch] || []).map(subject => (
                <div
                  key={subject.name}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                >
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                    {subject.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {subject.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
