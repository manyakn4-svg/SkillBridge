import { EngineeringBranch } from './index';

export type CareerId =
  | 'cloud-engineer'
  | 'software-developer'
  | 'full-stack-developer'
  | 'ai-engineer'
  | 'machine-learning-engineer'
  | 'data-scientist'
  | 'data-analyst'
  | 'cybersecurity-engineer'
  | 'devops-engineer'
  | 'web-developer'
  | 'android-developer'
  | 'ui-ux-designer'
  | 'embedded-systems-engineer'
  | 'vlsi-engineer'
  | 'mechanical-design-engineer'
  | 'civil-engineer';

export type CareerCategory =
  | 'Cloud & DevOps'
  | 'Software & Web'
  | 'AI & Data'
  | 'Core Engineering'
  | 'Design & Mobile';

export interface RoadmapTaskItem {
  id: string;
  title: string;
  type: 'Theory' | 'Practice' | 'Project' | 'Quiz';
}

export interface CareerPhase {
  phaseNumber: number;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  practicalTask: string;
  skillsAcquired: string[];
  tasks: RoadmapTaskItem[];
}

export interface CareerProject {
  title: string;
  description: string;
  technologies?: string[];
  tech?: string[];
}

export interface CareerCertification {
  name: string;
  provider: string;
  badge: string;
  description: string;
}

export interface InterviewPrepCategory {
  category: string;
  keyQuestions: string[];
}

export interface CareerRoadmap {
  id: CareerId;
  title: string;
  category: CareerCategory;
  iconName: string;
  recommendedBranches: EngineeringBranch[];
  estimatedDuration: string;
  marketDemand: 'Very High' | 'High' | 'Rising';
  averageSalary: string;
  overview: string;
  skillsRequired: string[];
  prerequisites: string[];
  phases: CareerPhase[];
  projects: {
    beginner: CareerProject[];
    intermediate: CareerProject[];
    advanced: CareerProject[];
  };
  certifications: CareerCertification[];
  certificationAdvisory: string;
  interviewPreparation: InterviewPrepCategory[];
  placementPrepChecklist: string[];
  recommendedResources: {
    title: string;
    type: 'Course' | 'Documentation' | 'Practice' | 'Cheat Sheet' | 'Video' | 'Article';
    provider: string;
    url: string;
  }[];
  jobReadinessChecklist: string[];
}
