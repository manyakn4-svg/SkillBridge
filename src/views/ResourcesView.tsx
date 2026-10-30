import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { EngineeringBranch } from '../types';
import {
  teachingCourses,
  CourseSubject,
  TeachingVideo,
  VideoCategory,
  getRecommendedCourses,
} from '../data/teachingVideosData';
import {
  BookOpen,
  Search,
  Video,
  FileText,
  Star,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Code2,
  Play,
  Clock,
  Layers,
  GraduationCap,
  Briefcase,
  ArrowLeft,
  Sparkles,
  Check,
  RotateCcw,
  Film,
  FolderGit2,
  CheckSquare,
  Filter,
} from 'lucide-react';

const VIDEO_CATEGORIES: ('All' | VideoCategory)[] = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Practical Tutorials',
  'Project Tutorials',
];

const ALL_BRANCHES: EngineeringBranch[] = [
  'CSE',
  'ISE',
  'AI & DS',
  'ECE',
  'EEE',
  'Mechanical',
  'Civil',
];

export const ResourcesView: React.FC = () => {
  const {
    t,
    user,
    resources,
    toggleSaveResource,
    showToast,
    selectedCourseForVideos,
    setSelectedCourseForVideos,
    completedTaskIds,
    toggleBranchTaskCompletion,
  } = useApp();

  // Top Section: 'videos' (Teaching Videos) vs 'docs' (Reading Materials & Cheatsheets)
  const [activeSection, setActiveSection] = useState<'videos' | 'docs'>('videos');

  // Filter State for Teaching Videos
  const [selectedBranch, setSelectedBranch] = useState<EngineeringBranch>(user.branch);
  const [selectedSemester, setSelectedSemester] = useState<number | 'All'>('All');
  const [selectedCareer, setSelectedCareer] = useState<string>('All');
  const [courseSearch, setCourseSearch] = useState('');

  // Course & Active Video State
  const [activeCourse, setActiveCourse] = useState<CourseSubject | null>(null);
  const [activeVideo, setActiveVideo] = useState<TeachingVideo | null>(null);
  const [videoCategoryFilter, setVideoCategoryFilter] = useState<'All' | VideoCategory>('All');

  // Sync with selectedCourseForVideos from AppContext (e.g. when coming from Roadmap Flowchart)
  useEffect(() => {
    if (selectedCourseForVideos) {
      const found = teachingCourses.find(c => c.id === selectedCourseForVideos);
      if (found) {
        setActiveCourse(found);
        setActiveVideo(found.videos[0] || null);
        setActiveSection('videos');
      }
    }
  }, [selectedCourseForVideos]);

  // Keep branch in sync with student profile on initial load
  useEffect(() => {
    setSelectedBranch(user.branch);
  }, [user.branch]);

  // Default semester calculation based on academic year
  useEffect(() => {
    if (user.academicYear === '1st Year') setSelectedSemester(1);
    else if (user.academicYear === '2nd Year') setSelectedSemester(3);
    else if (user.academicYear === '3rd Year') setSelectedSemester(5);
    else if (user.academicYear === '4th Year') setSelectedSemester(7);
  }, [user.academicYear]);

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    return teachingCourses.filter(course => {
      const matchesBranch = course.branch.includes(selectedBranch);
      const matchesSemester =
        selectedSemester === 'All' ? true : course.semester === selectedSemester;
      const matchesCareer =
        selectedCareer === 'All'
          ? true
          : course.careerGoals.some(g => g.toLowerCase().includes(selectedCareer.toLowerCase()));
      const matchesSearch =
        course.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
        course.code.toLowerCase().includes(courseSearch.toLowerCase()) ||
        course.description.toLowerCase().includes(courseSearch.toLowerCase());

      return (matchesBranch || matchesCareer) && matchesSemester && matchesSearch;
    });
  }, [selectedBranch, selectedSemester, selectedCareer, courseSearch]);

  // Filtered Videos inside active course
  const activeCourseFilteredVideos = useMemo(() => {
    if (!activeCourse) return [];
    if (videoCategoryFilter === 'All') return activeCourse.videos;
    return activeCourse.videos.filter(v => v.category === videoCategoryFilter);
  }, [activeCourse, videoCategoryFilter]);

  // Open a course
  const handleOpenCourse = (course: CourseSubject) => {
    setActiveCourse(course);
    setActiveVideo(course.videos[0] || null);
    setSelectedCourseForVideos(course.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close course learning view
  const handleBackToCourses = () => {
    setActiveCourse(null);
    setActiveVideo(null);
    setSelectedCourseForVideos(null);
  };

  // ---------------------------------------------------------------------------
  // FILTERING FOR STUDY MATERIALS / DOCS TAB (Preserves existing feature)
  // ---------------------------------------------------------------------------
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [selectedDocCategory, setSelectedDocCategory] = useState<string>('All');
  const [selectedDocType, setSelectedDocType] = useState<string>('All');

  const docCategories = [
    'All',
    'Programming',
    'Aptitude',
    'DSA',
    'Cloud Computing',
    'Artificial Intelligence',
    'Web Development',
    'Interview Preparation',
    'Communication Skills',
  ];

  const filteredDocs = resources.filter(res => {
    const matchesSearch =
      res.title.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      res.tags.some(tag => tag.toLowerCase().includes(docSearchQuery.toLowerCase()));

    const matchesCategory =
      selectedDocCategory === 'All' ? true : res.category === selectedDocCategory;

    const matchesType =
      selectedDocType === 'All' ? true : res.type === selectedDocType;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-semibold border border-indigo-500/30">
              <Film className="w-3.5 h-3.5 text-indigo-400" />
              <span>SkillBridge Video & Reference Academy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
              {t.learningResources}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Curated teaching videos, practical code walkthroughs, textbook summaries, and interactive lab tutorials tailored for {user.branch} students.
            </p>
          </div>

          {/* Mode Switcher: Videos vs Docs */}
          <div className="flex bg-slate-950/80 border border-slate-700/80 rounded-2xl p-1 shrink-0">
            <button
              type="button"
              onClick={() => setActiveSection('videos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'videos'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Teaching Videos</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-700/70 text-white">
                Interactive
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveSection('docs');
                setActiveCourse(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'docs'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Reference Documents</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SECTION 1: TEACHING VIDEOS PORTAL                                     */}
      {/* ===================================================================== */}
      {activeSection === 'videos' && (
        <div className="space-y-6">
          {/* A. DEDICATED COURSE VIDEO LEARNING PAGE */}
          {activeCourse ? (
            <div className="space-y-6 animate-in fade-in">
              {/* Back button & Course Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleBackToCourses}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to All Courses</span>
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
                        {activeCourse.code} · Sem {activeCourse.semester}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {activeCourse.videos.length} Video Lessons
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {activeCourse.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Branches: {activeCourse.branch.join(', ')}
                  </span>
                </div>
              </div>

              {/* Main Interactive Video Player Area */}
              {activeVideo && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Embedded YouTube Player & Details */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* YouTube Embed Container */}
                    <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                        title={activeVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </div>

                    {/* Active Video Meta & Actions */}
                    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                            {activeVideo.category}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{activeVideo.duration}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Open Original Video on YouTube */}
                          <a
                            href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Watch on YouTube</span>
                          </a>

                          {/* Toggle Task Completion */}
                          <button
                            type="button"
                            onClick={() => {
                              toggleBranchTaskCompletion(activeVideo.id, activeVideo.title);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                              completedTaskIds[activeVideo.id]
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-600 hover:text-white'
                            }`}
                          >
                            {completedTaskIds[activeVideo.id] ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Lesson Completed</span>
                              </>
                            ) : (
                              <>
                                <CheckSquare className="w-3.5 h-3.5" />
                                <span>Mark Lesson Done</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white">
                          {activeVideo.title}
                        </h2>
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5 block">
                          Channel: {activeVideo.channel}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {activeVideo.description}
                      </p>

                      {/* Covered Topics */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-mono text-slate-400 mr-1">
                          Key Concepts:
                        </span>
                        {activeVideo.topics.map(top => (
                          <span
                            key={top}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          >
                            {top}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Playlist / Lesson Queue */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
                          <Film className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <span>Course Video Lessons ({activeCourse.videos.length})</span>
                        </h3>
                      </div>

                      {/* Video Category Filter Tabs */}
                      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                        {VIDEO_CATEGORIES.map(cat => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setVideoCategoryFilter(cat)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                              videoCategoryFilter === cat
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Playlist items */}
                      <div className="space-y-2.5 max-h-[520px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 pr-1">
                        {activeCourseFilteredVideos.map((vid, idx) => {
                          const isCurrent = vid.id === activeVideo.id;
                          const isDone = !!completedTaskIds[vid.id];

                          return (
                            <div
                              key={vid.id}
                              onClick={() => setActiveVideo(vid)}
                              className={`p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer group ${
                                isCurrent
                                  ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 shadow-sm'
                                  : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                              }`}
                            >
                              {/* Thumbnail preview */}
                              <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                                <img
                                  src={vid.thumbnailUrl}
                                  alt={vid.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  onError={e => {
                                    // Fallback to high quality YouTube thumbnail
                                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`;
                                  }}
                                />
                                <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                                  <Play className="w-4 h-4 text-white drop-shadow" />
                                </div>
                                <span className="absolute bottom-0.5 right-0.5 px-1 rounded bg-black/80 text-[8px] font-mono text-white">
                                  {vid.duration.split(':')[0]}m
                                </span>
                              </div>

                              <div className="space-y-0.5 min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                                    {vid.category}
                                  </span>
                                  {isDone && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                  )}
                                </div>
                                <h4
                                  className={`text-xs font-bold line-clamp-2 leading-snug ${
                                    isCurrent
                                      ? 'text-indigo-600 dark:text-indigo-300'
                                      : 'text-slate-800 dark:text-slate-200'
                                  }`}
                                >
                                  {vid.title}
                                </h4>
                                <span className="text-[10px] text-slate-400 font-medium block truncate">
                                  {vid.channel}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* B. COURSE SELECTION CATALOG (Filter by Branch, Semester & Career) */
            <div className="space-y-6">
              {/* Dynamic Filter Controls Bar */}
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Filter Courses by Degree & Semester
                    </h3>
                  </div>

                  {/* Search bar */}
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={courseSearch}
                      onChange={e => setCourseSearch(e.target.value)}
                      placeholder="Search courses (e.g. C++, Java, VLSI, CAD)..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {/* Branch selector */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      Engineering Branch:
                    </span>
                    <select
                      value={selectedBranch}
                      onChange={e => setSelectedBranch(e.target.value as EngineeringBranch)}
                      className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                    >
                      {ALL_BRANCHES.map(b => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Semester selector */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      Semester Level:
                    </span>
                    <select
                      value={selectedSemester}
                      onChange={e =>
                        setSelectedSemester(
                          e.target.value === 'All' ? 'All' : Number(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Semesters (1 to 8)</option>
                      <option value="1">Semester 1 (Year 1)</option>
                      <option value="2">Semester 2 (Year 1)</option>
                      <option value="3">Semester 3 (Year 2)</option>
                      <option value="4">Semester 4 (Year 2)</option>
                      <option value="5">Semester 5 (Year 3)</option>
                      <option value="6">Semester 6 (Year 3)</option>
                      <option value="7">Semester 7 (Year 4)</option>
                      <option value="8">Semester 8 (Year 4)</option>
                    </select>
                  </div>

                  {/* Career Goal selector */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      Target Career Alignment:
                    </span>
                    <select
                      value={selectedCareer}
                      onChange={e => setSelectedCareer(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Career Goals</option>
                      <option value="Software Developer">Software Developer</option>
                      <option value="Cloud Engineer">Cloud Engineer</option>
                      <option value="AI Engineer">AI Engineer</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="Embedded Systems">Embedded Systems</option>
                      <option value="VLSI Engineer">VLSI Engineer</option>
                      <option value="Power Systems">Power Systems</option>
                      <option value="Mechanical Design">Mechanical Design</option>
                      <option value="Civil Engineer">Civil Engineer</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Course Subject Cards Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>
                      Available Video Courses for {selectedBranch}
                      {selectedSemester !== 'All' ? ` (Semester ${selectedSemester})` : ''}
                    </span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500">
                    {filteredCourses.length} Courses Found
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredCourses.map(course => (
                    <div
                      key={course.id}
                      className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-700 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Course banner image */}
                        <div className="relative h-36 w-full overflow-hidden bg-slate-950">
                          <img
                            src={course.thumbnailUrl}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                          <div className="absolute top-3 left-3 flex items-center gap-1.5">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900/80 text-white font-bold backdrop-blur-md border border-slate-700">
                              {course.code}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-600/90 text-white font-bold backdrop-blur-md">
                              Semester {course.semester}
                            </span>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                            <span className="text-[11px] font-mono font-semibold flex items-center gap-1">
                              <Film className="w-3.5 h-3.5 text-indigo-400" />
                              <span>{course.videos.length} Teaching Videos</span>
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 space-y-3">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                              {course.category}
                            </span>
                            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {course.title}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {course.description}
                            </p>
                          </div>

                          {/* Video titles preview */}
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                              Featured Lessons:
                            </span>
                            <div className="space-y-1">
                              {course.videos.slice(0, 2).map(v => (
                                <div
                                  key={v.id}
                                  className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5 truncate"
                                >
                                  <Play className="w-3 h-3 text-indigo-500 shrink-0" />
                                  <span className="truncate">{v.title}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Button */}
                      <div className="p-5 pt-0">
                        <button
                          type="button"
                          onClick={() => handleOpenCourse(course)}
                          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                        >
                          <Video className="w-4 h-4" />
                          <span>Open Course & Watch Videos</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 2: REFERENCE DOCUMENTS & PRACTICE (Preserves existing repo)   */}
      {/* ===================================================================== */}
      {activeSection === 'docs' && (
        <div className="space-y-6">
          {/* Search & Type Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={docSearchQuery}
                onChange={e => setDocSearchQuery(e.target.value)}
                placeholder="Search reference books, cheat sheets, docs..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
              {(['All', 'Video', 'Article', 'Cheat Sheet', 'Practice'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedDocType(type)}
                  className={`flex-1 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                    selectedDocType === type
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {docCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedDocCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                  selectedDocCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Resource cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDocs.map(resource => (
              <div
                key={resource.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-semibold">
                      {resource.category}
                    </span>
                    <button
                      onClick={() => toggleSaveResource(resource.id)}
                      className="text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      {resource.saved ? (
                        <BookmarkCheck className="w-4 h-4 text-indigo-600" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {resource.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">{resource.provider}</span>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1.5"
                  >
                    <span>Read Guide</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
