import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  ActiveNav,
  AssessmentResult,
  EngineeringBranch,
  Hackathon,
  Internship,
  Language,
  LearningResource,
  Project,
  RoadmapLevel,
  TargetRole,
  UserProfile,
  LabSubmission,
  StudyPlannerPreferences,
  StudyTask,
  CertificateRecord,
  BadgeRecord,
  LeaderboardEntry,
  HackathonPersonalRecord,
} from '../types';
import { translations, Translations } from '../i18n/translations';
import { sampleInternships } from '../data/internshipsData';
import { sampleProjects } from '../data/projectsData';
import { sampleHackathons } from '../data/hackathonsData';
import { sampleResources } from '../data/resourcesData';
import { sampleRoadmapLevels } from '../data/roadmapsData';
import { targetRolesByBranch } from '../data/skillGapData';
import { getRoadmapForStudent } from '../data/branchRoadmaps';
import { defaultStudyPreferences, getRecommendedTasksForStudent } from '../data/studyPlannerData';
import { systemBadgesCatalog, initialLeaderboardPeers } from '../data/achievementsData';
import { initialHackathonChecklist } from '../data/hackathonHubData';

import {
  syncStudentToSupabase,
  fetchStudentFromSupabase,
  syncAssessmentToSupabase,
  testSupabaseConnection,
  syncRoadmapProgressToSupabase,
  fetchRoadmapProgressFromSupabase,
  syncLabSubmissionToSupabase,
  fetchLabSubmissionsFromSupabase,
  syncStudyPlannerToSupabase,
  fetchStudyPlannerFromSupabase,
  syncCertificateToSupabase,
  deleteCertificateFromSupabase,
  fetchCertificatesFromSupabase,
  syncHackathonRecordToSupabase,
  fetchHackathonRecordsFromSupabase,
  syncLeaderboardEntryToSupabase,
  fetchLeaderboardFromSupabase,
} from '../lib/supabase';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  // Auth & Profile
  user: UserProfile;
  isAuthenticated: boolean;
  login: (email?: string) => Promise<void>;
  signup: (profile: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => Promise<void>;

  // Supabase Cloud State
  supabaseSyncStatus: 'idle' | 'syncing' | 'synced' | 'error';
  supabaseLastSynced: string | null;
  supabaseSyncMessage: string | null;
  supabaseModalOpen: boolean;
  setSupabaseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  syncStudentNow: () => Promise<boolean>;


  // Language & Theme
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Navigation
  activeNav: ActiveNav;
  setActiveNav: (nav: ActiveNav) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;

  // Data & State
  assessmentHistory: AssessmentResult[];
  addAssessmentResult: (result: Omit<AssessmentResult, 'id' | 'date'>) => void;
  
  internships: Internship[];
  applyToInternship: (id: string) => void;

  projects: Project[];
  toggleSaveProject: (id: string) => void;
  updateProjectStatus: (id: string, status: 'Not Started' | 'In Progress' | 'Completed') => void;

  hackathons: Hackathon[];
  registerForHackathon: (id: string) => void;
  toggleSaveHackathon: (id: string) => void;

  resources: LearningResource[];
  toggleSaveResource: (id: string) => void;

  roadmapLevels: RoadmapLevel[];
  toggleTaskCompletion: (taskId: string) => void;

  // Course-Specific & Branch-Specific Roadmap
  completedTaskIds: Record<string, boolean>;
  toggleBranchTaskCompletion: (taskId: string, taskTitle?: string) => void;
  setBatchTaskCompletion: (taskIds: string[], completed: boolean, message?: string) => void;
  isTaskCompleted: (taskId: string) => boolean;
  branchRoadmapProgress: { total: number; completed: number; percentage: number };

  selectedRole: TargetRole;
  setSelectedRole: (role: TargetRole) => void;

  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  branchModalOpen: boolean;
  setBranchModalOpen: (open: boolean) => void;

  // Video Learning Integration
  selectedCourseForVideos: string | null;
  setSelectedCourseForVideos: (courseId: string | null) => void;
  navigateToCourseVideos: (courseId: string) => void;

  // 1. Virtual Labs
  labSubmissions: LabSubmission[];
  submitLabExperiment: (sub: Omit<LabSubmission, 'id' | 'submittedAt' | 'studentEmail'>) => Promise<boolean>;
  isLabCompleted: (labId: string) => boolean;

  // 2. Personalized Study Planner
  studyPreferences: StudyPlannerPreferences;
  updateStudyPreferences: (prefs: Partial<StudyPlannerPreferences>) => Promise<void>;
  studyTasks: StudyTask[];
  addStudyTask: (task: Omit<StudyTask, 'id' | 'completed'>) => void;
  updateStudyTask: (id: string, updated: Partial<StudyTask>) => void;
  deleteStudyTask: (id: string) => void;
  toggleStudyTask: (id: string) => void;
  generateRecommendedSchedule: () => void;

  // 3. Achievements & Leaderboard
  certificates: CertificateRecord[];
  addCertificate: (cert: Omit<CertificateRecord, 'id' | 'uploadedAt' | 'studentEmail'>) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;
  badges: BadgeRecord[];
  leaderboard: LeaderboardEntry[];
  userPoints: number;
  userRank: number;

  // 4. Hackathon Hub
  personalHackathons: HackathonPersonalRecord[];
  addPersonalHackathon: (rec: Omit<HackathonPersonalRecord, 'id' | 'createdAt' | 'studentEmail'>) => Promise<void>;
  deletePersonalHackathon: (id: string) => Promise<void>;
  hackathonChecklist: Record<string, boolean>;
  toggleHackathonChecklist: (itemId: string) => void;

  resetDemoData: () => void;
}

const defaultUser: UserProfile = {
  id: 'usr-101',
  fullName: 'Aarav Sharma',
  email: 'aarav.sharma@engg.edu',
  collegeName: 'National Institute of Engineering (NIE), Mysuru',
  branch: 'CSE',
  academicYear: '3rd Year',
  careerGoal: 'Full Stack & Cloud Systems Architect',
  bio: 'Driven 3rd-year Computer Science undergraduate passionate about building fault-tolerant distributed platforms, modern Web3/Web2 architectures, and competing in national hackathons.',
  technicalSkills: [
    { name: 'Data Structures & Algorithms', level: 'Intermediate', rating: 78 },
    { name: 'JavaScript & TypeScript', level: 'Advanced', rating: 86 },
    { name: 'React & Frontend', level: 'Advanced', rating: 88 },
    { name: 'Node.js & Express', level: 'Intermediate', rating: 80 },
    { name: 'SQL & Database Design', level: 'Intermediate', rating: 84 },
    { name: 'Docker & Linux', level: 'Beginner', rating: 55 },
    { name: 'Computer Networks & TCP/IP', level: 'Intermediate', rating: 72 },
  ],
  softSkills: [
    'Systematic Problem Solving',
    'Technical Whiteboard Presentations',
    'Cross-Disciplinary Teamwork',
    'Time Management Under Sprints',
  ],
  overallProgress: 72,
};

const initialAssessmentHistory: AssessmentResult[] = [
  {
    id: 'res-init-1',
    date: '2026-10-24',
    type: 'Aptitude',
    categoryOrSubject: 'Quantitative Aptitude',
    score: 8,
    totalQuestions: 10,
    percentage: 80,
    timeSpentSeconds: 420,
    answers: [],
  },
  {
    id: 'res-init-2',
    date: '2026-10-26',
    type: 'Aptitude',
    categoryOrSubject: 'Logical Reasoning',
    score: 9,
    totalQuestions: 10,
    percentage: 90,
    timeSpentSeconds: 380,
    answers: [],
  },
  {
    id: 'res-init-3',
    date: '2026-10-28',
    type: 'Technical',
    categoryOrSubject: 'CSE (DSA & Operating Systems)',
    score: 7,
    totalQuestions: 8,
    percentage: 87.5,
    timeSpentSeconds: 490,
    answers: [],
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme initialization
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('skillpath_theme');
    return saved === 'dark' || saved === 'light' ? saved : 'light';
  });

  useEffect(() => {
    localStorage.setItem('skillpath_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('skillpath_lang');
    return saved === 'en' || saved === 'kn' || saved === 'hi' ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('skillpath_lang', lang);
  };

  const t = translations[language];

  // Auth & Profile
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('skillpath_auth');
    return saved !== null ? saved === 'true' : true; // Default true so user immediately sees rich interactive app
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('skillpath_user');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const [activeNav, setActiveNav] = useState<ActiveNav>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Assess History
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentResult[]>(() => {
    const saved = localStorage.getItem('skillpath_assessments');
    return saved ? JSON.parse(saved) : initialAssessmentHistory;
  });

  // Internships
  const [internships, setInternships] = useState<Internship[]>(() => {
    const saved = localStorage.getItem('skillpath_internships');
    return saved ? JSON.parse(saved) : sampleInternships;
  });

  // Projects
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('skillpath_projects');
    return saved ? JSON.parse(saved) : sampleProjects;
  });

  // Hackathons
  const [hackathons, setHackathons] = useState<Hackathon[]>(() => {
    const saved = localStorage.getItem('skillpath_hackathons');
    return saved ? JSON.parse(saved) : sampleHackathons;
  });

  // Resources
  const [resources, setResources] = useState<LearningResource[]>(() => {
    const saved = localStorage.getItem('skillpath_resources');
    return saved ? JSON.parse(saved) : sampleResources;
  });

  // Roadmap
  const [roadmapLevels, setRoadmapLevels] = useState<RoadmapLevel[]>(() => {
    const saved = localStorage.getItem('skillpath_roadmap');
    return saved ? JSON.parse(saved) : sampleRoadmapLevels;
  });

  // Course-specific & branch-specific completed task IDs
  const [completedTaskIds, setCompletedTaskIds] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('skillbridge_branch_tasks');
    return saved ? JSON.parse(saved) : {
      'cse-3-w1-d1': true,
      'cse-3-w1-d2': true,
      'cse-1-w1-d1': true,
      'cse-1-w1-d2': true,
    };
  });

  // Selected Target Role
  const [selectedRole, setSelectedRole] = useState<TargetRole>(() => {
    const branchRoles = targetRolesByBranch[user.branch] || targetRolesByBranch['CSE'];
    return branchRoles[0];
  });

  // Whenever user branch changes, update default target role if incompatible
  useEffect(() => {
    const branchRoles = targetRolesByBranch[user.branch];
    if (branchRoles && branchRoles.length > 0 && selectedRole.branch !== user.branch) {
      setSelectedRole(branchRoles[0]);
    }
  }, [user.branch, selectedRole.branch]);

  // Save changes
  useEffect(() => {
    localStorage.setItem('skillpath_auth', String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('skillpath_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('skillpath_assessments', JSON.stringify(assessmentHistory));
  }, [assessmentHistory]);

  useEffect(() => {
    localStorage.setItem('skillpath_internships', JSON.stringify(internships));
  }, [internships]);

  useEffect(() => {
    localStorage.setItem('skillpath_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('skillpath_hackathons', JSON.stringify(hackathons));
  }, [hackathons]);

  useEffect(() => {
    localStorage.setItem('skillpath_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('skillpath_roadmap', JSON.stringify(roadmapLevels));
  }, [roadmapLevels]);

  useEffect(() => {
    localStorage.setItem('skillbridge_branch_tasks', JSON.stringify(completedTaskIds));
  }, [completedTaskIds]);

  // ==========================================================================
  // 1. VIRTUAL LABS STATE
  // ==========================================================================
  const [labSubmissions, setLabSubmissions] = useState<LabSubmission[]>(() => {
    const saved = localStorage.getItem('skillbridge_lab_submissions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('skillbridge_lab_submissions', JSON.stringify(labSubmissions));
  }, [labSubmissions]);

  const submitLabExperiment = async (
    sub: Omit<LabSubmission, 'id' | 'submittedAt' | 'studentEmail'>
  ): Promise<boolean> => {
    const fullSubmission: LabSubmission = {
      ...sub,
      id: `labsub-${Date.now()}`,
      studentEmail: user.email,
      submittedAt: new Date().toISOString(),
    };

    setLabSubmissions(prev => [fullSubmission, ...prev.filter(p => p.labId !== sub.labId)]);
    showToast(`Experiment "${sub.experimentTitle}" submitted! Score: ${sub.mcqScore}/${sub.maxScore}`, 'success');

    // Sync to Supabase
    try {
      const res = await syncLabSubmissionToSupabase(fullSubmission);
      if (res.success) {
        showToast('Lab experiment record saved to Supabase!', 'info');
      }
    } catch {
      // offline safe
    }
    return true;
  };

  const isLabCompleted = (labId: string) => {
    return labSubmissions.some(s => s.labId === labId);
  };

  // ==========================================================================
  // 2. PERSONALIZED STUDY PLANNER STATE
  // ==========================================================================
  const [studyPreferences, setStudyPreferencesState] = useState<StudyPlannerPreferences>(() => {
    const saved = localStorage.getItem('skillbridge_study_prefs');
    return saved ? JSON.parse(saved) : defaultStudyPreferences;
  });

  const [studyTasks, setStudyTasks] = useState<StudyTask[]>(() => {
    const saved = localStorage.getItem('skillbridge_study_tasks');
    return saved ? JSON.parse(saved) : getRecommendedTasksForStudent(user.branch, user.careerGoal, 'Evening');
  });

  useEffect(() => {
    localStorage.setItem('skillbridge_study_prefs', JSON.stringify(studyPreferences));
  }, [studyPreferences]);

  useEffect(() => {
    localStorage.setItem('skillbridge_study_tasks', JSON.stringify(studyTasks));
  }, [studyTasks]);

  const updateStudyPreferences = async (prefs: Partial<StudyPlannerPreferences>) => {
    const updated = { ...studyPreferences, ...prefs };
    setStudyPreferencesState(updated);
    showToast('Study preferences updated!', 'success');
    try {
      await syncStudyPlannerToSupabase(user.email, updated, studyTasks);
    } catch {
      // silent
    }
  };

  const addStudyTask = (task: Omit<StudyTask, 'id' | 'completed'>) => {
    const newTask: StudyTask = {
      ...task,
      id: `task-${Date.now()}`,
      completed: false,
    };
    const nextTasks = [newTask, ...studyTasks];
    setStudyTasks(nextTasks);
    showToast(`Added task: ${task.title}`, 'success');
    syncStudyPlannerToSupabase(user.email, studyPreferences, nextTasks).catch(() => {});
  };

  const updateStudyTask = (id: string, updated: Partial<StudyTask>) => {
    const nextTasks = studyTasks.map(t => (t.id === id ? { ...t, ...updated } : t));
    setStudyTasks(nextTasks);
    showToast('Task updated!', 'info');
    syncStudyPlannerToSupabase(user.email, studyPreferences, nextTasks).catch(() => {});
  };

  const deleteStudyTask = (id: string) => {
    const nextTasks = studyTasks.filter(t => t.id !== id);
    setStudyTasks(nextTasks);
    showToast('Task removed from timetable', 'info');
    syncStudyPlannerToSupabase(user.email, studyPreferences, nextTasks).catch(() => {});
  };

  const toggleStudyTask = (id: string) => {
    let completedState = false;
    const nextTasks = studyTasks.map(t => {
      if (t.id === id) {
        completedState = !t.completed;
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setStudyTasks(nextTasks);
    showToast(completedState ? 'Task marked as completed! (+5 points)' : 'Task marked as pending', 'info');
    syncStudyPlannerToSupabase(user.email, studyPreferences, nextTasks).catch(() => {});
  };

  const generateRecommendedSchedule = () => {
    const recs = getRecommendedTasksForStudent(studyPreferences.branch || user.branch, studyPreferences.targetCareerGoal || user.careerGoal, studyPreferences.preferredTime);
    setStudyTasks(recs);
    showToast('Generated personalized study timetable matching your degree & career goal!', 'success');
    syncStudyPlannerToSupabase(user.email, studyPreferences, recs).catch(() => {});
  };

  // ==========================================================================
  // 3. ACHIEVEMENTS & LEADERBOARD STATE
  // ==========================================================================
  const [certificates, setCertificates] = useState<CertificateRecord[]>(() => {
    const saved = localStorage.getItem('skillbridge_certificates');
    return saved ? JSON.parse(saved) : [
      {
        id: 'cert-sample-1',
        studentEmail: user.email,
        title: 'Python for Data Structures and Algorithms',
        issuingOrganization: 'NPTEL / IIT Madras',
        issueDate: '2025-11-20',
        category: 'Programming',
        description: 'Comprehensive examination covering dynamic memory, sorting, trees, and algorithmic problem-solving.',
        credentialId: 'NPTEL25CS88912',
        uploadedAt: new Date().toISOString(),
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('skillbridge_certificates', JSON.stringify(certificates));
  }, [certificates]);

  const addCertificate = async (cert: Omit<CertificateRecord, 'id' | 'uploadedAt' | 'studentEmail'>) => {
    const newCert: CertificateRecord = {
      ...cert,
      id: `cert-${Date.now()}`,
      studentEmail: user.email,
      uploadedAt: new Date().toISOString(),
    };
    setCertificates(prev => [newCert, ...prev]);
    showToast(`Certificate "${cert.title}" uploaded successfully!`, 'success');
    try {
      await syncCertificateToSupabase(newCert);
    } catch {
      // safe
    }
  };

  const deleteCertificate = async (id: string) => {
    setCertificates(prev => prev.filter(c => c.id !== id));
    showToast('Certificate deleted.', 'info');
    try {
      await deleteCertificateFromSupabase(id);
    } catch {
      // safe
    }
  };

  // ==========================================================================
  // 4. HACKATHON HUB STATE
  // ==========================================================================
  const [personalHackathons, setPersonalHackathons] = useState<HackathonPersonalRecord[]>(() => {
    const saved = localStorage.getItem('skillbridge_personal_hackathons');
    return saved ? JSON.parse(saved) : [
      {
        id: 'hack-rec-1',
        studentEmail: user.email,
        hackathonName: 'Smart India Hackathon (SIH)',
        eventDate: '2025-12-15',
        mode: 'Hybrid',
        teamName: 'ByteBrigade',
        teamMembers: ['Aarav Sharma (Lead)', 'Priya K.', 'Rohan D.', 'Neha S.'],
        projectTitle: 'SkillBridge Career Readiness Platform',
        projectDescription: 'Interactive engineering student portal featuring roadmaps, virtual experiments, and portfolio builders.',
        githubUrl: 'https://github.com/skillbridge/project',
        demoUrl: 'https://skillbridge.dev',
        achievementAward: 'Finalist',
        createdAt: new Date().toISOString(),
      }
    ];
  });

  const [hackathonChecklist, setHackathonChecklist] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('skillbridge_hack_checklist');
    return saved ? JSON.parse(saved) : { b1: true, b2: true, b3: true, b5: true, b7: true };
  });

  useEffect(() => {
    localStorage.setItem('skillbridge_personal_hackathons', JSON.stringify(personalHackathons));
  }, [personalHackathons]);

  useEffect(() => {
    localStorage.setItem('skillbridge_hack_checklist', JSON.stringify(hackathonChecklist));
  }, [hackathonChecklist]);

  const addPersonalHackathon = async (rec: Omit<HackathonPersonalRecord, 'id' | 'createdAt' | 'studentEmail'>) => {
    const newRec: HackathonPersonalRecord = {
      ...rec,
      id: `hrec-${Date.now()}`,
      studentEmail: user.email,
      createdAt: new Date().toISOString(),
    };
    setPersonalHackathons(prev => [newRec, ...prev]);
    showToast(`Hackathon "${rec.hackathonName}" saved to your portfolio! (+40 points)`, 'success');
    try {
      await syncHackathonRecordToSupabase(newRec);
    } catch {
      // safe
    }
  };

  const deletePersonalHackathon = async (id: string) => {
    setPersonalHackathons(prev => prev.filter(h => h.id !== id));
    showToast('Hackathon record deleted.', 'info');
  };

  const toggleHackathonChecklist = (itemId: string) => {
    setHackathonChecklist(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // ==========================================================================
  // DYNAMIC POINTS, BADGES & LEADERBOARD EVALUATION
  // ==========================================================================
  const completedRoadmapCount = useMemo(() => {
    return Object.values(completedTaskIds).filter(Boolean).length;
  }, [completedTaskIds]);

  const completedProjectsCount = useMemo(() => {
    return projects.filter(p => p.status === 'Completed').length;
  }, [projects]);

  const completedPlannerCount = useMemo(() => {
    return studyTasks.filter(t => t.completed).length;
  }, [studyTasks]);

  const highestScore = useMemo(() => {
    if (assessmentHistory.length === 0) return 0;
    return Math.max(...assessmentHistory.map(a => a.percentage));
  }, [assessmentHistory]);

  // Compute Verified Student Points
  const userPoints = useMemo(() => {
    let pts = 0;
    pts += completedRoadmapCount * 10;
    pts += labSubmissions.length * 25;
    pts += completedProjectsCount * 50;
    pts += personalHackathons.length * 40;
    pts += completedPlannerCount * 5;
    pts += certificates.length * 30;
    if (highestScore > 0) {
      pts += Math.round(highestScore * 0.5);
    }
    return Math.max(120, pts); // baseline participation
  }, [completedRoadmapCount, labSubmissions.length, completedProjectsCount, personalHackathons.length, completedPlannerCount, certificates.length, highestScore]);

  // Evaluate System Badges in Real Time
  const badges: BadgeRecord[] = useMemo(() => {
    return systemBadgesCatalog.map(b => {
      let isUnlocked = false;
      let progressCurrent = 0;

      if (b.id === 'badge-first-step') {
        progressCurrent = completedRoadmapCount;
        isUnlocked = completedRoadmapCount >= 1;
      } else if (b.id === 'badge-quick-learner') {
        progressCurrent = completedRoadmapCount;
        isUnlocked = completedRoadmapCount >= 10;
      } else if (b.id === 'badge-quiz-master') {
        progressCurrent = Math.round(highestScore);
        isUnlocked = highestScore >= 90;
      } else if (b.id === 'badge-lab-explorer') {
        progressCurrent = labSubmissions.length;
        isUnlocked = labSubmissions.length >= 3;
      } else if (b.id === 'badge-project-builder') {
        progressCurrent = completedProjectsCount;
        isUnlocked = completedProjectsCount >= 1;
      } else if (b.id === 'badge-consistent-learner') {
        progressCurrent = completedPlannerCount;
        isUnlocked = completedPlannerCount >= 5;
      } else if (b.id === 'badge-hackathon-participant') {
        progressCurrent = personalHackathons.length;
        isUnlocked = personalHackathons.length >= 1;
      } else if (b.id === 'badge-roadmap-champion') {
        progressCurrent = completedRoadmapCount;
        isUnlocked = completedRoadmapCount >= 25;
      }

      return {
        ...b,
        isUnlocked,
        progressCurrent,
      };
    });
  }, [completedRoadmapCount, highestScore, labSubmissions.length, completedProjectsCount, completedPlannerCount, personalHackathons.length]);

  const unlockedBadgesCount = useMemo(() => {
    return badges.filter(b => b.isUnlocked).length;
  }, [badges]);

  // Construct Leaderboard with Current Student
  const { leaderboard, userRank } = useMemo(() => {
    const currentUserEntry: LeaderboardEntry = {
      id: user.id || 'usr-current',
      studentName: user.fullName || 'Engineering Student',
      studentEmail: user.email,
      branch: user.branch,
      academicYear: user.academicYear,
      totalPoints: userPoints,
      rank: 1,
      badgesCount: unlockedBadgesCount,
      isCurrentUser: true,
      weeklyPoints: Math.round(userPoints * 0.25),
      monthlyPoints: Math.round(userPoints * 0.6),
    };

    const combined = [...initialLeaderboardPeers, currentUserEntry].sort((a, b) => b.totalPoints - a.totalPoints);
    const ranked = combined.map((entry, idx) => ({ ...entry, rank: idx + 1 }));
    const myRank = ranked.find(r => r.isCurrentUser)?.rank || 1;

    return { leaderboard: ranked, userRank: myRank };
  }, [user, userPoints, unlockedBadgesCount]);

  // Branch Selection Modal
  const [branchModalOpen, setBranchModalOpen] = useState(false);

  // Video Learning Integration
  const [selectedCourseForVideos, setSelectedCourseForVideos] = useState<string | null>(null);

  const navigateToCourseVideos = (courseId: string) => {
    setSelectedCourseForVideos(courseId);
    setActiveNav('resources');
  };

  // Supabase Cloud State
  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [supabaseLastSynced, setSupabaseLastSynced] = useState<string | null>(() => {
    return localStorage.getItem('skillbridge_supabase_sync') || null;
  });
  const [supabaseSyncMessage, setSupabaseSyncMessage] = useState<string | null>(null);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);

  // Helper to sync student data to Supabase
  const performSupabaseSync = async (
    targetUser: UserProfile,
    eventType: 'login' | 'signup' | 'profile_update' | 'branch_change' = 'login'
  ): Promise<boolean> => {
    setSupabaseSyncStatus('syncing');
    try {
      const res = await syncStudentToSupabase(targetUser, eventType);
      if (res.success) {
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setSupabaseSyncStatus('synced');
        setSupabaseLastSynced(timeNow);
        setSupabaseSyncMessage(res.message);
        localStorage.setItem('skillbridge_supabase_sync', timeNow);
        return true;
      } else {
        setSupabaseSyncStatus('error');
        setSupabaseSyncMessage(res.message);
        return false;
      }
    } catch (err: any) {
      setSupabaseSyncStatus('error');
      setSupabaseSyncMessage(err.message || 'Sync error');
      return false;
    }
  };

  const syncStudentNow = async (): Promise<boolean> => {
    showToast('Syncing student profile to Supabase database...', 'info');
    const ok = await performSupabaseSync(user, 'profile_update');
    if (ok) {
      showToast('Successfully synced to Supabase (public.students)!', 'success');
    } else {
      showToast('Supabase sync notice: Check SQL schema setup in Supabase dialog.', 'warning');
    }
    return ok;
  };

  // Initial silent ping and sync on load if authenticated
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      performSupabaseSync(user, 'login');
    }
  }, []);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Actions
  const login = async (email?: string) => {
    setIsAuthenticated(true);
    let targetUser = { ...user };
    if (email && email.trim() !== '') {
      targetUser = { ...targetUser, email: email.toLowerCase().trim() };
      setUser(targetUser);
    }

    setBranchModalOpen(true);
    showToast(`Logged in successfully! Syncing with Supabase (kanvpgzzjdrlrasdjpdw)...`, 'success');

    // Attempt to fetch profile and saved roadmap progress from Supabase if previously saved
    if (email) {
      try {
        const cloudProfile = await fetchStudentFromSupabase(email);
        if (cloudProfile) {
          targetUser = { ...targetUser, ...cloudProfile };
          setUser(targetUser);
        }
        const cloudTasks = await fetchRoadmapProgressFromSupabase(
          email,
          targetUser.branch,
          targetUser.academicYear
        );
        if (cloudTasks && Object.keys(cloudTasks).length > 0) {
          setCompletedTaskIds(prev => ({ ...prev, ...cloudTasks }));
        }

        // Fetch student's virtual lab submissions from Supabase
        const cloudLabs = await fetchLabSubmissionsFromSupabase(email);
        if (cloudLabs && cloudLabs.length > 0) {
          setLabSubmissions(cloudLabs);
        }

        // Fetch student's study planner preferences and timetable from Supabase
        const cloudPlanner = await fetchStudyPlannerFromSupabase(email);
        if (cloudPlanner && cloudPlanner.tasks && cloudPlanner.tasks.length > 0) {
          if (cloudPlanner.preferences) setStudyPreferencesState(cloudPlanner.preferences);
          setStudyTasks(cloudPlanner.tasks);
        }

        // Fetch student's certificates from Supabase
        const cloudCerts = await fetchCertificatesFromSupabase(email);
        if (cloudCerts && cloudCerts.length > 0) {
          setCertificates(cloudCerts);
        }

        // Fetch student's hackathon records from Supabase
        const cloudHacks = await fetchHackathonRecordsFromSupabase(email);
        if (cloudHacks && cloudHacks.length > 0) {
          setPersonalHackathons(cloudHacks);
        }
      } catch (e) {
        // non-blocking
      }
    }

    // Automatically sync student record to Supabase database
    const synced = await performSupabaseSync(targetUser, 'login');
    if (synced) {
      showToast(`Student record saved in Supabase database!`, 'success');
    }
  };

  const signup = async (newProfile: Partial<UserProfile>) => {
    const created: UserProfile = {
      ...defaultUser,
      ...newProfile,
      id: 'usr-' + Date.now(),
    };
    setUser(created);
    setIsAuthenticated(true);
    setBranchModalOpen(true);
    showToast(`Account created for ${created.fullName}! Syncing with Supabase...`, 'success');

    // Automatically save new student signup to Supabase
    const synced = await performSupabaseSync(created, 'signup');
    if (synced) {
      showToast(`Student profile saved to Supabase (students table)!`, 'success');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Logged out of SkillBridge.', 'info');
  };

  const updateProfile = async (updated: Partial<UserProfile>) => {
    const updatedUser = { ...user, ...updated };
    setUser(updatedUser);
    showToast('Profile updated successfully!', 'success');

    // Automatically sync updated profile (branch, year, skills) to Supabase
    await performSupabaseSync(updatedUser, updated.branch ? 'branch_change' : 'profile_update');
  };

  const addAssessmentResult = (result: Omit<AssessmentResult, 'id' | 'date'>) => {
    const newResult: AssessmentResult = {
      ...result,
      id: 'res-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setAssessmentHistory(prev => [newResult, ...prev]);

    // Recalculate student overall skill development percentage based on assessments
    setUser(prev => {
      const avg = Math.round(
        ([newResult, ...assessmentHistory].reduce((acc, curr) => acc + curr.percentage, 0)) /
        (assessmentHistory.length + 1)
      );
      const updatedUser = {
        ...prev,
        overallProgress: Math.min(100, Math.max(30, Math.round((prev.overallProgress + avg) / 2))),
      };
      // Background sync updated progress to Supabase
      performSupabaseSync(updatedUser, 'profile_update');
      return updatedUser;
    });

    // Also sync assessment result record to Supabase
    syncAssessmentToSupabase(user.email, newResult);

    showToast(`Test submitted! Score: ${result.score}/${result.totalQuestions} (${result.percentage}%)`, 'success');
  };

  const applyToInternship = (id: string) => {
    setInternships(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            applied: true,
            appliedDate: new Date().toISOString().split('T')[0],
          };
        }
        return item;
      })
    );
    showToast('Application submitted successfully to employer!', 'success');
  };

  const toggleSaveProject = (id: string) => {
    setProjects(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextState = !item.saved;
          showToast(nextState ? 'Project bookmarked in your workspace!' : 'Project removed from saved list.', 'info');
          return { ...item, saved: nextState };
        }
        return item;
      })
    );
  };

  const updateProjectStatus = (id: string, status: 'Not Started' | 'In Progress' | 'Completed') => {
    setProjects(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, status };
        }
        return item;
      })
    );
    showToast(`Project status updated to: ${status}`, 'success');
  };

  const registerForHackathon = (id: string) => {
    setHackathons(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, registered: true };
        }
        return item;
      })
    );
    showToast('Registered for hackathon! Confirmation code sent.', 'success');
  };

  const toggleSaveHackathon = (id: string) => {
    setHackathons(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextState = !item.saved;
          showToast(nextState ? 'Hackathon bookmarked!' : 'Hackathon removed from bookmarks.', 'info');
          return { ...item, saved: nextState };
        }
        return item;
      })
    );
  };

  const toggleSaveResource = (id: string) => {
    setResources(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextState = !item.saved;
          showToast(nextState ? 'Resource added to bookmarks!' : 'Resource removed.', 'info');
          return { ...item, saved: nextState };
        }
        return item;
      })
    );
  };

  const toggleTaskCompletion = (taskId: string) => {
    setRoadmapLevels(prev =>
      prev.map(level => ({
        ...level,
        weeks: level.weeks.map(week => ({
          ...week,
          tasks: week.tasks.map(task => {
            if (task.id === taskId) {
              const completed = !task.completed;
              if (completed) {
                showToast(`Task completed: "${task.title}"`, 'success');
              }
              return { ...task, completed };
            }
            return task;
          }),
        })),
      }))
    );
  };

  const toggleBranchTaskCompletion = (taskId: string, taskTitle?: string) => {
    setCompletedTaskIds(prev => {
      const nextState = !prev[taskId];
      if (nextState) {
        showToast(taskTitle ? `Completed: "${taskTitle}"` : 'Task marked as completed!', 'success');
      } else {
        showToast(taskTitle ? `Marked incomplete: "${taskTitle}"` : 'Task marked incomplete.', 'info');
      }
      const updated = { ...prev, [taskId]: nextState };

      // Background persistence to Supabase
      if (user.email) {
        const curAllTasks = currentBranchRoadmap.levels.flatMap(lvl => lvl.weeks.flatMap(w => w.tasks));
        const curCompleted = curAllTasks.filter(t => !!updated[t.id]).length;
        const pct = curAllTasks.length > 0 ? Math.round((curCompleted / curAllTasks.length) * 100) : 0;
        syncRoadmapProgressToSupabase(user.email, user.branch, user.academicYear, updated, pct).catch(() => {});
      }

      return updated;
    });
  };

  const setBatchTaskCompletion = (taskIds: string[], completed: boolean, message?: string) => {
    setCompletedTaskIds(prev => {
      const updated = { ...prev };
      taskIds.forEach(id => {
        updated[id] = completed;
      });

      // Background persistence to Supabase
      if (user.email) {
        const curAllTasks = currentBranchRoadmap.levels.flatMap(lvl => lvl.weeks.flatMap(w => w.tasks));
        const curCompleted = curAllTasks.filter(t => !!updated[t.id]).length;
        const pct = curAllTasks.length > 0 ? Math.round((curCompleted / curAllTasks.length) * 100) : 0;
        syncRoadmapProgressToSupabase(user.email, user.branch, user.academicYear, updated, pct).catch(() => {});
      }

      return updated;
    });
    if (message) {
      showToast(message, 'success');
    }
  };

  const isTaskCompleted = (taskId: string) => {
    return !!completedTaskIds[taskId];
  };

  // Dynamic branch & academic year roadmap progress calculation
  const currentBranchRoadmap = getRoadmapForStudent(user.branch, user.academicYear);
  const currentBranchAllTasks = currentBranchRoadmap.levels.flatMap(lvl => lvl.weeks.flatMap(w => w.tasks));
  const currentBranchCompletedCount = currentBranchAllTasks.filter(t => !!completedTaskIds[t.id]).length;
  const branchRoadmapProgress = {
    total: currentBranchAllTasks.length,
    completed: currentBranchCompletedCount,
    percentage: currentBranchAllTasks.length > 0
      ? Math.round((currentBranchCompletedCount / currentBranchAllTasks.length) * 100)
      : 0,
  };

  const resetDemoData = () => {
    localStorage.removeItem('skillpath_user');
    localStorage.removeItem('skillpath_assessments');
    localStorage.removeItem('skillpath_internships');
    localStorage.removeItem('skillpath_projects');
    localStorage.removeItem('skillpath_hackathons');
    localStorage.removeItem('skillpath_resources');
    localStorage.removeItem('skillpath_roadmap');
    localStorage.removeItem('skillbridge_branch_tasks');
    setUser(defaultUser);
    setAssessmentHistory(initialAssessmentHistory);
    setInternships(sampleInternships);
    setProjects(sampleProjects);
    setHackathons(sampleHackathons);
    setResources(sampleResources);
    setRoadmapLevels(sampleRoadmapLevels);
    setCompletedTaskIds({
      'cse-3-w1-d1': true,
      'cse-3-w1-d2': true,
      'cse-1-w1-d1': true,
      'cse-1-w1-d2': true,
    });
    showToast('Demo data reset to clean factory defaults.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        updateProfile,
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        activeNav,
        setActiveNav,
        sidebarCollapsed,
        setSidebarCollapsed,
        assessmentHistory,
        addAssessmentResult,
        internships,
        applyToInternship,
        projects,
        toggleSaveProject,
        updateProjectStatus,
        hackathons,
        registerForHackathon,
        toggleSaveHackathon,
        resources,
        toggleSaveResource,
        roadmapLevels,
        toggleTaskCompletion,
        completedTaskIds,
        toggleBranchTaskCompletion,
        setBatchTaskCompletion,
        isTaskCompleted,
        branchRoadmapProgress,
        selectedRole,
        setSelectedRole,
        toasts,
        showToast,
        removeToast,
        branchModalOpen,
        setBranchModalOpen,
        selectedCourseForVideos,
        setSelectedCourseForVideos,
        navigateToCourseVideos,
        // 1. Virtual Labs
        labSubmissions,
        submitLabExperiment,
        isLabCompleted,
        // 2. Personalized Study Planner
        studyPreferences,
        updateStudyPreferences,
        studyTasks,
        addStudyTask,
        updateStudyTask,
        deleteStudyTask,
        toggleStudyTask,
        generateRecommendedSchedule,
        // 3. Achievements & Leaderboard
        certificates,
        addCertificate,
        deleteCertificate,
        badges,
        leaderboard,
        userPoints,
        userRank,
        // 4. Hackathon Hub
        personalHackathons,
        addPersonalHackathon,
        deletePersonalHackathon,
        hackathonChecklist,
        toggleHackathonChecklist,
        resetDemoData,
        supabaseSyncStatus,
        supabaseLastSynced,
        supabaseSyncMessage,
        supabaseModalOpen,
        setSupabaseModalOpen,
        syncStudentNow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
