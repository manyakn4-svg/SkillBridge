export type EngineeringBranch =
  | 'CSE'
  | 'ISE'
  | 'AI & DS'
  | 'ECE'
  | 'EEE'
  | 'Mechanical'
  | 'Civil';

export type AcademicYear = '1st Year' | '2nd Year' | '3rd Year' | '4th Year';

export type Language = 'en' | 'kn' | 'hi';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  collegeName: string;
  branch: EngineeringBranch;
  academicYear: AcademicYear;
  careerGoal: string;
  bio: string;
  technicalSkills: { name: string; level: 'Beginner' | 'Intermediate' | 'Advanced'; rating: number }[];
  softSkills: string[];
  overallProgress: number; // 0 - 100
  avatarUrl?: string;
}

export type AssessmentCategory =
  | 'Quantitative Aptitude'
  | 'Logical Reasoning'
  | 'Verbal Ability'
  | 'Analytical Thinking';

export interface Question {
  id: string;
  category: AssessmentCategory | string;
  subtopic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface AssessmentResult {
  id: string;
  date: string;
  type: 'Aptitude' | 'Technical';
  categoryOrSubject: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  answers: {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
  }[];
}

export interface SkillGapItem {
  skill: string;
  category: 'Core' | 'Tool' | 'Domain' | 'Soft';
  currentLevel: number; // 0 - 100
  requiredLevel: number; // 0 - 100
  status: 'Strong' | 'Weak' | 'Missing';
  recommendation: string;
}

export interface TargetRole {
  id: string;
  title: string;
  branch: EngineeringBranch;
  description: string;
  requiredSkills: { name: string; target: number }[];
}

export interface RoadmapTask {
  id: string;
  day: number;
  title: string;
  duration: string;
  type: 'Theory' | 'Practice' | 'Project' | 'Quiz';
  completed: boolean;
  resourceLink?: string;
}

export interface RoadmapWeek {
  weekNumber: number;
  title: string;
  description: string;
  tasks: RoadmapTask[];
}

export interface RoadmapLevel {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  title: string;
  objective: string;
  duration: string;
  weeks: RoadmapWeek[];
  milestoneProject: {
    title: string;
    description: string;
  };
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  logoText: string;
  requiredSkills: string[];
  eligibility: string;
  location: string;
  isRemote: boolean;
  duration: string;
  isPaid: boolean;
  stipend: string;
  deadline: string;
  branchEligibility: (EngineeringBranch | 'All')[];
  description: string;
  applied?: boolean;
  appliedDate?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  branch: EngineeringBranch | 'Interdisciplinary';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  technologies: string[];
  requiredSkills: string[];
  learningOutcomes: string[];
  estimatedHours: string;
  status?: 'Not Started' | 'In Progress' | 'Completed';
  saved?: boolean;
}

export interface Hackathon {
  id: string;
  name: string;
  organizer: string;
  date: string;
  registrationDeadline: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  location: string;
  eligibility: string;
  prizePool: string;
  tags: string[];
  description: string;
  registered?: boolean;
  saved?: boolean;
}

export interface LearningResource {
  id: string;
  title: string;
  category:
    | 'Programming'
    | 'Aptitude'
    | 'DSA'
    | 'Cloud Computing'
    | 'Artificial Intelligence'
    | 'Web Development'
    | 'Interview Preparation'
    | 'Communication Skills';
  type: 'Video' | 'Article' | 'Documentation' | 'Practice' | 'Cheat Sheet' | 'Interactive';
  provider: string;
  durationOrPages: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  url: string;
  description: string;
  tags: string[];
  saved?: boolean;
}

export type ActiveNav =
  | 'dashboard'
  | 'profile'
  | 'assessment'
  | 'skill-gap'
  | 'roadmap'
  | 'resources'
  | 'virtual-labs'
  | 'study-planner'
  | 'internships'
  | 'projects'
  | 'hackathons'
  | 'hackathon-hub'
  | 'achievements'
  | 'settings';

// ============================================================================
// 1. VIRTUAL LABS TYPES
// ============================================================================
export type InteractiveSimType =
  | 'stack-queue'
  | 'array-sort'
  | 'logic-gates'
  | 'ohms-circuit'
  | 'beam-deflection'
  | 'linear-regression'
  | 'concrete-mix'
  | 'guided-code'
  | 'none';

export interface LabMCQ {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface VirtualLabExperiment {
  id: string;
  branch: EngineeringBranch;
  labName: string;
  experimentTitle: string;
  objective: string;
  theory: string;
  requiredTools: string[];
  procedure: string[];
  simType: InteractiveSimType;
  defaultInputs?: Record<string, any>;
  observationsGuide: string;
  conclusionGuide: string;
  mcqs: LabMCQ[];
}

export interface LabSubmission {
  id: string;
  labId: string;
  experimentTitle: string;
  branch: EngineeringBranch;
  studentEmail: string;
  submittedAt: string;
  mcqScore: number;
  maxScore: number;
  observations: string;
  inputsUsed?: Record<string, any>;
}

// ============================================================================
// 2. PERSONALIZED STUDY PLANNER TYPES
// ============================================================================
export type PreferredStudyTime = 'Morning' | 'Afternoon' | 'Evening' | 'Night';
export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskCategory =
  | 'College Subject'
  | 'Roadmap Topic'
  | 'Video Lesson'
  | 'Virtual Lab'
  | 'Project Work'
  | 'Assessment'
  | 'General';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface StudyPlannerPreferences {
  branch: EngineeringBranch;
  semester: number; // 1 - 8
  targetCareerGoal: string;
  preferredTime: PreferredStudyTime;
  availableHoursPerDay: number;
  preferredStudyDays: DayOfWeek[];
  targetCompletionDate: string;
  interests: string[];
  technicalSkillsToLearn: string[];
}

export interface StudyTask {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  day: DayOfWeek;
  startTime: string; // e.g. "09:00"
  endTime: string;   // e.g. "10:30"
  durationMinutes: number;
  completed: boolean;
  dateScheduled?: string; // YYYY-MM-DD
  relatedCourseOrLabId?: string;
  notes?: string;
}

// ============================================================================
// 3. ACHIEVEMENTS & LEADERBOARD TYPES
// ============================================================================
export type CertificateCategory =
  | 'Technical Courses'
  | 'Programming'
  | 'Internships'
  | 'Hackathons'
  | 'Workshops'
  | 'Competitions'
  | 'Other Achievements';

export interface CertificateRecord {
  id: string;
  studentEmail: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  category: CertificateCategory;
  description: string;
  fileUrl?: string;
  fileName?: string;
  credentialId?: string;
  uploadedAt: string;
}

export interface BadgeRecord {
  id: string;
  name: string;
  category: 'Learning' | 'Practice' | 'Projects' | 'Excellence' | 'Consistency';
  description: string;
  unlockCondition: string;
  iconName: string;
  points: number;
  isUnlocked: boolean;
  earnedDate?: string;
  progressCurrent?: number;
  progressTarget?: number;
}

export interface LeaderboardEntry {
  id: string;
  studentName: string;
  studentEmail?: string;
  avatarUrl?: string;
  branch: EngineeringBranch;
  academicYear: AcademicYear;
  totalPoints: number;
  rank: number;
  badgesCount: number;
  isCurrentUser?: boolean;
  weeklyPoints?: number;
  monthlyPoints?: number;
}

// ============================================================================
// 4. HACKATHON HUB TYPES
// ============================================================================
export interface HackathonPersonalRecord {
  id: string;
  studentEmail: string;
  hackathonName: string;
  eventDate: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  teamName: string;
  teamMembers: string[];
  projectTitle: string;
  projectDescription: string;
  githubUrl?: string;
  demoUrl?: string;
  pptUrl?: string;
  certificateUploaded?: boolean;
  achievementAward?: string;
  createdAt: string;
}

