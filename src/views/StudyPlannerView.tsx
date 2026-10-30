import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DayOfWeek, StudyTask, TaskCategory, TaskPriority, PreferredStudyTime } from '../types';
import {
  CalendarDays,
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Sliders,
  Trash2,
  Calendar as CalendarIcon,
  CheckSquare,
  AlertCircle,
  BookOpen,
  FlaskConical,
  Layers,
  ChevronRight,
  TrendingUp,
  X,
  Target,
} from 'lucide-react';

const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const StudyPlannerView: React.FC = () => {
  const {
    user,
    studyPreferences,
    updateStudyPreferences,
    studyTasks,
    addStudyTask,
    updateStudyTask,
    deleteStudyTask,
    toggleStudyTask,
    generateRecommendedSchedule,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'weekly' | 'daily' | 'calendar' | 'preferences'>('weekly');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<TaskCategory>('College Subject');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('Medium');
  const [newTaskDay, setNewTaskDay] = useState<DayOfWeek>('Monday');
  const [newTaskStartTime, setNewTaskStartTime] = useState('18:00');
  const [newTaskEndTime, setNewTaskEndTime] = useState('19:30');
  const [newTaskNotes, setNewTaskNotes] = useState('');

  // Weekly stats
  const totalTasks = studyTasks.length;
  const completedTasks = studyTasks.filter(t => t.completed).length;
  const weeklyPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter tasks for selected day
  const dayTasks = useMemo(() => {
    return studyTasks.filter(t => t.day === selectedDay);
  }, [studyTasks, selectedDay]);

  // Today's upcoming task
  const upcomingTodayTasks = useMemo(() => {
    const todayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
    const dayMap: Record<number, DayOfWeek> = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };
    const currentDayName = dayMap[todayIndex];
    return studyTasks.filter(t => t.day === currentDayName && !t.completed);
  }, [studyTasks]);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      showToast('Please enter a task title', 'warning');
      return;
    }

    addStudyTask({
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      priority: newTaskPriority,
      day: newTaskDay,
      startTime: newTaskStartTime,
      endTime: newTaskEndTime,
      durationMinutes: 90,
      notes: newTaskNotes.trim(),
    });

    setTaskModalOpen(false);
    setNewTaskTitle('');
    setNewTaskNotes('');
  };

  const getCategoryBadge = (cat: TaskCategory) => {
    switch (cat) {
      case 'Virtual Lab':
        return 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'Video Lesson':
        return 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      case 'Roadmap Topic':
        return 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'Project Work':
        return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Assessment':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
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
              <span className="p-2 rounded-xl bg-indigo-600/40 border border-indigo-500/50 text-indigo-300">
                <CalendarDays className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
                Personalized Timetable Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
              Personalized Study Planner
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Plan your weekly timetable based on your engineering branch ({studyPreferences.branch || user.branch}), semester ({studyPreferences.semester || 5}), and career goal ({studyPreferences.targetCareerGoal || user.careerGoal}).
            </p>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={generateRecommendedSchedule}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm transition flex items-center gap-2 cursor-pointer"
              title="Generate a rule-based timetable based on your branch and career target"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Auto-Generate Plan</span>
            </button>

            <button
              type="button"
              onClick={() => setTaskModalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-950 transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Task</span>
            </button>
          </div>
        </div>

        {/* Weekly Progress Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-mono">Weekly Completion:</span>
            <span className="font-bold text-emerald-400 font-mono text-sm">
              {completedTasks} / {totalTasks} Tasks ({weeklyPct}%)
            </span>
          </div>
          <div className="w-full sm:w-64 bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${weeklyPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* UPCOMING TODAY REMINDER BANNER                                      */}
      {/* ------------------------------------------------------------------- */}
      {upcomingTodayTasks.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 p-4 rounded-xl flex items-center justify-between gap-3 text-amber-900 dark:text-amber-200 text-xs shadow-xs">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              <strong>Upcoming Today:</strong> You have {upcomingTodayTasks.length} pending task(s) scheduled for today. First up: <em>"{upcomingTodayTasks[0].title}"</em> at {upcomingTodayTasks[0].startTime}.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              const todayIndex = new Date().getDay();
              const dayMap: Record<number, DayOfWeek> = { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday' };
              setSelectedDay(dayMap[todayIndex]);
              setActiveTab('daily');
            }}
            className="px-3 py-1 rounded-lg bg-amber-200/80 dark:bg-amber-900/60 hover:bg-amber-300 dark:hover:bg-amber-800 text-amber-950 dark:text-amber-100 font-bold shrink-0 transition cursor-pointer"
          >
            View Today
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* NAVIGATION TABS                                                     */}
      {/* ------------------------------------------------------------------- */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-0.5 overflow-x-auto">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('weekly')}
            className={`pb-3 px-3.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'weekly'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Weekly Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('daily')}
            className={`pb-3 px-3.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'daily'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Daily Schedule ({selectedDay})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preferences')}
            className={`pb-3 px-3.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'preferences'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Study Preferences</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* TAB 1: WEEKLY TIMETABLE MATRIX                                      */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'weekly' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {DAYS_OF_WEEK.map(day => {
              const tasksForDay = studyTasks.filter(t => t.day === day);
              const doneCount = tasksForDay.filter(t => t.completed).length;

              return (
                <div
                  key={day}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition"
                >
                  <div className="space-y-3">
                    {/* Day Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <button
                        type="button"
                        onClick={() => { setSelectedDay(day); setActiveTab('daily'); }}
                        className="text-xs font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer flex items-center gap-1"
                      >
                        <span>{day}</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {doneCount}/{tasksForDay.length}
                      </span>
                    </div>

                    {/* Task Cards in this Day */}
                    <div className="space-y-2">
                      {tasksForDay.length === 0 ? (
                        <div className="text-[11px] text-slate-400 italic py-4 text-center">
                          No tasks scheduled.
                        </div>
                      ) : (
                        tasksForDay.map(task => (
                          <div
                            key={task.id}
                            className={`p-2.5 rounded-xl border text-xs transition space-y-1.5 ${
                              task.completed
                                ? 'bg-slate-50 dark:bg-slate-950/60 border-emerald-300 dark:border-emerald-900/60 text-slate-400 line-through'
                                : 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1.5">
                              <button
                                type="button"
                                onClick={() => toggleStudyTask(task.id)}
                                className="cursor-pointer text-left flex-1"
                              >
                                <span className="font-semibold block leading-tight">{task.title}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleStudyTask(task.id)}
                                className="text-slate-400 hover:text-emerald-500 cursor-pointer shrink-0 mt-0.5"
                              >
                                {task.completed ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                ) : (
                                  <Circle className="w-4 h-4 text-slate-400" />
                                )}
                              </button>
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {task.startTime} - {task.endTime}
                              </span>
                              <span className={`px-1.5 py-0.2 rounded border ${getCategoryBadge(task.category)}`}>
                                {task.category}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Quick Add For Day */}
                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => { setNewTaskDay(day); setTaskModalOpen(true); }}
                      className="w-full py-1.5 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Add to {day}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* TAB 2: DAILY SCHEDULE VIEW                                          */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          {/* Day Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {DAYS_OF_WEEK.map(day => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  selectedDay === day
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Day Task List */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Schedule for {selectedDay}
                </h3>
                <span className="text-xs text-slate-500">
                  {dayTasks.filter(t => t.completed).length} of {dayTasks.length} tasks completed
                </span>
              </div>
              <button
                type="button"
                onClick={() => { setNewTaskDay(selectedDay); setTaskModalOpen(true); }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Task
              </button>
            </div>

            {dayTasks.length === 0 ? (
              <div className="py-10 text-center space-y-2">
                <span className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 inline-block">
                  <CalendarDays className="w-6 h-6" />
                </span>
                <p className="text-xs text-slate-500">No study tasks planned for {selectedDay}.</p>
                <button
                  type="button"
                  onClick={() => { setNewTaskDay(selectedDay); setTaskModalOpen(true); }}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer"
                >
                  + Add task now
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {dayTasks.map(task => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      task.completed
                        ? 'bg-slate-50 dark:bg-slate-950/60 border-emerald-300 dark:border-emerald-900/60'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggleStudyTask(task.id)}
                        className="mt-0.5 cursor-pointer text-slate-400 hover:text-emerald-500 transition"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-400" />
                        )}
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-sm font-bold ${
                            task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                          }`}>
                            {task.title}
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getCategoryBadge(task.category)}`}>
                            {task.category}
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            task.priority === 'High'
                              ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                              : task.priority === 'Medium'
                              ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}>
                            {task.priority}
                          </span>
                        </div>

                        {task.notes && (
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {task.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {task.startTime} – {task.endTime} ({task.durationMinutes}m)
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteStudyTask(task.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 transition cursor-pointer"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* TAB 3: STUDY PREFERENCES CONFIGURATION                              */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'preferences' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Student Learning Preferences & Parameters
            </h3>
            <p className="text-xs text-slate-500">
              Configure your study habits. SkillBridge automatically balances college subjects with roadmap topics and practical labs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* Preferred Time */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Preferred Study Time
              </label>
              <select
                value={studyPreferences.preferredTime}
                onChange={e => updateStudyPreferences({ preferredTime: e.target.value as PreferredStudyTime })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200"
              >
                <option value="Morning">Morning (07:30 – 09:00)</option>
                <option value="Afternoon">Afternoon (14:00 – 15:30)</option>
                <option value="Evening">Evening (18:30 – 20:00)</option>
                <option value="Night">Night (21:00 – 22:30)</option>
              </select>
            </div>

            {/* Daily Hours */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Available Study Hours Per Day
              </label>
              <input
                type="number"
                min="1"
                max="8"
                value={studyPreferences.availableHoursPerDay}
                onChange={e => updateStudyPreferences({ availableHoursPerDay: parseInt(e.target.value, 10) || 2 })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono"
              />
            </div>

            {/* Career Goal */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Target Career Goal
              </label>
              <input
                type="text"
                value={studyPreferences.targetCareerGoal}
                onChange={e => updateStudyPreferences({ targetCareerGoal: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                placeholder="e.g. Cloud Engineer, Full Stack, Embedded Systems"
              />
            </div>

            {/* Target Completion Date */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Semester / Target Completion Date
              </label>
              <input
                type="date"
                value={studyPreferences.targetCompletionDate}
                onChange={e => updateStudyPreferences({ targetCompletionDate: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={generateRecommendedSchedule}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Regenerate Study Plan From Preferences</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* MODAL: ADD CUSTOM STUDY TASK                                        */}
      {/* ------------------------------------------------------------------- */}
      {taskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-500" />
                Add Study Task
              </h3>
              <button
                type="button"
                onClick={() => setTaskModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Data Structures Tree Traversal Practice"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={newTaskCategory}
                    onChange={e => setNewTaskCategory(e.target.value as TaskCategory)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="College Subject">College Subject</option>
                    <option value="Roadmap Topic">Roadmap Topic</option>
                    <option value="Video Lesson">Video Lesson</option>
                    <option value="Virtual Lab">Virtual Lab</option>
                    <option value="Project Work">Project Work</option>
                    <option value="Assessment">Assessment</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Priority
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={e => setNewTaskPriority(e.target.value as TaskPriority)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Day
                  </label>
                  <select
                    value={newTaskDay}
                    onChange={e => setNewTaskDay(e.target.value as DayOfWeek)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    {DAYS_OF_WEEK.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={newTaskStartTime}
                    onChange={e => setNewTaskStartTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={newTaskEndTime}
                    onChange={e => setNewTaskEndTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Notes / Resource Link
                </label>
                <textarea
                  rows={2}
                  value={newTaskNotes}
                  onChange={e => setNewTaskNotes(e.target.value)}
                  placeholder="Optional goals, textbook chapters, or reference URLs..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setTaskModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md cursor-pointer"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
