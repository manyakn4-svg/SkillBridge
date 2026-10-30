import { Language } from '../types';

export interface CareerI18nDict {
  catalogTitle: string;
  catalogSubtitle: string;
  searchPlaceholder: string;
  allDomains: string;
  viewRoadmap: string;
  backToCareers: string;
  changeCareer: string;
  estimatedDuration: string;
  marketDemand: string;
  averageSalary: string;
  overview: string;
  skillsRequired: string;
  prerequisites: string;
  recommendedFor: string;
  setTargetGoal: string;
  currentGoal: string;
  goalUpdated: string;
  
  // Progress tracker
  totalCompletion: string;
  completedPhases: string;
  remainingPhases: string;
  currentPhase: string;
  skillsAcquired: string;
  startLearning: string;
  markPhaseDone: string;
  nextPhase: string;
  phaseDone: string;
  inProgress: string;
  notStarted: string;

  // Sections
  phasesTab: string;
  projectsTab: string;
  certificationsTab: string;
  placementTab: string;
  checklistTab: string;

  // Details
  practicalAssignment: string;
  topicsCovered: string;
  interactiveTasks: string;
  beginnerProjects: string;
  intermediateProjects: string;
  advancedProjects: string;
  certAdvisoryHeader: string;
  interviewQuestions: string;
  placementChecklistHeader: string;
  jobReadinessHeader: string;
  recommendedResources: string;

  // Personalization
  personalizeTitle: string;
  branchLabel: string;
  yearLabel: string;
  levelLabel: string;
  skipFoundations: string;
  foundationsSkipped: string;
  branchRoadmapTab: string;
  careerRolesTab: string;
  branchDegreeSubtitle: string;
  saveToProfile: string;
  flowchartTab: string;
  watchTeachingVideos: string;
}

export const careerTranslations: Record<Language, CareerI18nDict> = {
  en: {
    catalogTitle: 'Career-Based Step-by-Step Learning Roadmaps',
    catalogSubtitle: 'Select a specialized engineering career role to access an exhaustive, job-ready roadmap from fundamentals to high-tier placement.',
    searchPlaceholder: 'Search 16 career roles (e.g. Cloud Engineer, AI, Full Stack)...',
    allDomains: 'All Domains',
    viewRoadmap: 'View Roadmap',
    backToCareers: 'Back to All Careers',
    changeCareer: 'Switch Career',
    estimatedDuration: 'Duration',
    marketDemand: 'Market Demand',
    averageSalary: 'Salary Range',
    overview: 'Career Overview',
    skillsRequired: 'Required Core Competencies',
    prerequisites: 'Prerequisites & Foundations',
    recommendedFor: 'Recommended For',
    setTargetGoal: 'Set as My Target Career Goal',
    currentGoal: 'Your Active Target Goal',
    goalUpdated: 'Target Career Goal updated in your profile!',
    
    totalCompletion: 'Total Roadmap Progress',
    completedPhases: 'Completed Phases',
    remainingPhases: 'Remaining Phases',
    currentPhase: 'Current Learning Phase',
    skillsAcquired: 'Skills Acquired',
    startLearning: 'Start Learning',
    markPhaseDone: 'Mark Phase as Completed',
    nextPhase: 'Next Phase',
    phaseDone: 'Completed',
    inProgress: 'In Progress',
    notStarted: 'Not Started',

    phasesTab: 'Step-by-Step Learning Phases',
    projectsTab: 'Real-World Projects',
    certificationsTab: 'Industry Certifications',
    placementTab: 'Placement & Interviews',
    checklistTab: 'Job-Readiness Checklist',

    practicalAssignment: 'Practical Hands-on Assignment',
    topicsCovered: 'Topics to Master in this Phase',
    interactiveTasks: 'Interactive Daily & Weekly Tasks Checklist',
    beginnerProjects: 'Beginner Projects',
    intermediateProjects: 'Intermediate Projects',
    advancedProjects: 'Advanced Projects',
    certAdvisoryHeader: 'Certification Milestone Advisory',
    interviewQuestions: 'Frequently Asked Technical Interview Questions',
    placementChecklistHeader: 'Campus Placement & Portfolio Checklist',
    jobReadinessHeader: 'Final Job-Readiness Checklist',
    recommendedResources: 'Curated Free Learning Resources',

    personalizeTitle: 'Personalize Your Career Pathway',
    branchLabel: 'Branch',
    yearLabel: 'Academic Year',
    levelLabel: 'Skill Level',
    skipFoundations: 'Fast-Track: Mark Prerequisite Foundations Completed',
    foundationsSkipped: 'Foundational phases marked completed! Focus on core engineering & projects.',
    branchRoadmapTab: 'Academic Degree Roadmap',
    careerRolesTab: 'Career Role Tracks',
    branchDegreeSubtitle: 'Tailored year-by-year curriculum, practical exercises, mini & major projects, and placement prep.',
    saveToProfile: 'Set as My Degree (Save to Supabase)',
    flowchartTab: 'Visual Learning Flowchart',
    watchTeachingVideos: 'Watch Teaching Videos',
  },
  kn: {
    catalogTitle: 'ವೃತ್ತಿ-ಆಧಾರಿತ ಹಂತ-ಹಂತದ ಕಲಿಕಾ ಮಾರ್ಗಸೂಚಿಗಳು',
    catalogSubtitle: 'ಮೂಲಭೂತ ವಿಷಯಗಳಿಂದ ಉನ್ನತ ಉದ್ಯೋಗ ನಿಯೋಜನೆವರೆಗೆ ಸಮಗ್ರ, ಉದ್ಯೋಗ-ಸಿದ್ಧ ಮಾರ್ಗಸೂಚಿಯನ್ನು ವೀಕ್ಷಿಸಲು ವೃತ್ತಿ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    searchPlaceholder: '16 ವೃತ್ತಿ ಪಾತ್ರಗಳನ್ನು ಹುಡುಕಿ (ಉದಾ: ಕ್ಲೌಡ್ ಇಂಜಿನಿಯರ್, ಎಐ, ಫುಲ್ ಸ್ಟಾಕ್)...',
    allDomains: 'ಎಲ್ಲಾ ವಿಭಾಗಗಳು',
    viewRoadmap: 'ಮಾರ್ಗಸೂಚಿ ವೀಕ್ಷಿಸಿ',
    backToCareers: 'ಎಲ್ಲಾ ವೃತ್ತಿಗಳಿಗೆ ಹಿಂತಿರುಗಿ',
    changeCareer: 'ವೃತ್ತಿ ಬದಲಾಯಿಸಿ',
    estimatedDuration: 'ಅವಧಿ',
    marketDemand: 'ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆ',
    averageSalary: 'ವೇತನ ಶ್ರೇಣಿ',
    overview: 'ವೃತ್ತಿ ಅವಲೋಕನ',
    skillsRequired: 'ಅಗತ್ಯವಿರುವ ಮುಖ್ಯ ಕೌಶಲ್ಯಗಳು',
    prerequisites: 'ಪೂರ್ವಭಾವಿ ಅರ್ಹತೆಗಳು',
    recommendedFor: 'ಶಿಫಾರಸು ಮಾಡಲಾದ ವಿಭಾಗಗಳು',
    setTargetGoal: 'ನನ್ನ ಗುರಿ ವೃತ್ತಿಯಾಗಿ ಹೊಂದಿಸಿ',
    currentGoal: 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಗುರಿ',
    goalUpdated: 'ಗುರಿ ವೃತ್ತಿಯನ್ನು ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ನವೀಕರಿಸಲಾಗಿದೆ!',

    totalCompletion: 'ಒಟ್ಟಾರೆ ಮಾರ್ಗಸೂಚಿ ಪ್ರಗತಿ',
    completedPhases: 'ಪೂರ್ಣಗೊಂಡ ಹಂತಗಳು',
    remainingPhases: 'ಉಳಿದಿರುವ ಹಂತಗಳು',
    currentPhase: 'ಪ್ರಸ್ತುತ ಕಲಿಕಾ ಹಂತ',
    skillsAcquired: 'ಗಳಿಸಿದ ಕೌಶಲ್ಯಗಳು',
    startLearning: 'ಕಲಿಕೆ ಪ್ರಾರಂಭಿಸಿ',
    markPhaseDone: 'ಹಂತವನ್ನು ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ',
    nextPhase: 'ಮುಂದಿನ ಹಂತ',
    phaseDone: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    inProgress: 'ಪ್ರಗತಿಯಲ್ಲಿದೆ',
    notStarted: 'ಪ್ರಾರಂಭವಾಗಿಲ್ಲ',

    phasesTab: 'ಹಂತ-ಹಂತದ ಕಲಿಕಾ ಹಂತಗಳು',
    projectsTab: 'ನೈಜ-ಪ್ರಪಂಚದ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು',
    certificationsTab: 'ಉದ್ಯಮ ಪ್ರಮಾಣಪತ್ರಗಳು',
    placementTab: 'ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಮತ್ತು ಸಂದರ್ಶನಗಳು',
    checklistTab: 'ಉದ್ಯೋಗ-ಸಿದ್ಧತೆ ಪರಿಶೀಲನಾಪಟ್ಟಿ',

    practicalAssignment: 'ಪ್ರಾಯೋಗಿಕ ನಿಯೋಜನೆ ಕಾರ್ಯ',
    topicsCovered: 'ಈ ಹಂತದಲ್ಲಿ ಕಲಿಯಬೇಕಾದ ವಿಷಯಗಳು',
    interactiveTasks: 'ದೈನಂದಿನ ಮತ್ತು ಸಾಪ್ತಾಹಿಕ ಕಾರ್ಯಗಳ ಪಟ್ಟಿ',
    beginnerProjects: 'ಆರಂಭಿಕ ಹಂತದ ಯೋಜನೆಗಳು',
    intermediateProjects: 'ಮಧ್ಯಮ ಹಂತದ ಯೋಜನೆಗಳು',
    advancedProjects: 'ಸುಧಾರಿತ ಹಂತದ ಯೋಜನೆಗಳು',
    certAdvisoryHeader: 'ಪ್ರಮಾಣಪತ್ರಗಳ ಮಹತ್ವದ ಸಲಹೆ',
    interviewQuestions: 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ತಾಂತ್ರಿಕ ಸಂದರ್ಶನ ಪ್ರಶ್ನೆಗಳು',
    placementChecklistHeader: 'ಕ್ಯಾಂಪಸ್ ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಪರಿಶೀಲನಾಪಟ್ಟಿ',
    jobReadinessHeader: 'ಅಂತಿಮ ಉದ್ಯೋಗ-ಸಿದ್ಧತೆ ಪರಿಶೀಲನಾಪಟ್ಟಿ',
    recommendedResources: 'ಉಚಿತ ಶಿಫಾರಸು ಕಲಿಕಾ ಸಂಪನ್ಮೂಲಗಳು',

    personalizeTitle: 'ನಿಮ್ಮ ಕಲಿಕಾ ಮಾರ್ಗವನ್ನು ವೈಯಕ್ತೀಕರಿಸಿ',
    branchLabel: 'ವಿಭಾಗ',
    yearLabel: 'ಶೈಕ್ಷಣಿಕ ವರ್ಷ',
    levelLabel: 'ಕೌಶಲ್ಯ ಮಟ್ಟ',
    skipFoundations: 'ವೇಗದ ಕಲಿಕೆ: ಮೂಲಭೂತ ಹಂತಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ',
    foundationsSkipped: 'ಮೂಲಭೂತ ಹಂತಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಲಾಗಿದೆ! ನೇರವಾಗಿ ಪ್ರಮುಖ ವಿಷಯಗಳತ್ತ ಗಮನಹರಿಸಿ.',
    branchRoadmapTab: 'ಶೈಕ್ಷಣಿಕ ಪದವಿ ಮಾರ್ಗಸೂಚಿ',
    careerRolesTab: 'ವೃತ್ತಿ ಪಾತ್ರಗಳು',
    branchDegreeSubtitle: 'ವರ್ಷವಾರು ಪಠ್ಯಕ್ರಮ, ಪ್ರಾಯೋಗಿಕ ಕಾರ್ಯಗಳು, ಕಿರು ಮತ್ತು ಪ್ರಮುಖ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು ಹಾಗೂ ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಸಿದ್ಧತೆ.',
    saveToProfile: 'ನನ್ನ ಪದವಿಯಾಗಿ ಹೊಂದಿಸಿ (Supabase ನಲ್ಲಿ ಉಳಿಸಿ)',
    flowchartTab: 'ದೃಶ್ಯ ಕಲಿಕಾ ಹರಿವು (ಫ್ಲೋಚಾರ್ಟ್)',
    watchTeachingVideos: 'ಬೋಧನಾ ವೀಡಿಯೊಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
  },
  hi: {
    catalogTitle: 'करियर-आधारित चरण-दर-चरण शिक्षण रोडमैप',
    catalogSubtitle: 'मूल सिद्धांतों से लेकर शीर्ष कैंपस प्लेसमेंट तक एक संपूर्ण, नौकरी-तैयार रोडमैप देखने के लिए एक करियर भूमिका चुनें।',
    searchPlaceholder: '16 करियर भूमिकाएं खोजें (उदा. क्लाउड इंजीनियर, एआई, फुल स्टैक)...',
    allDomains: 'सभी डोमेन',
    viewRoadmap: 'रोडमैप देखें',
    backToCareers: 'सभी करियर पर वापस जाएं',
    changeCareer: 'करियर बदलें',
    estimatedDuration: 'अवधि',
    marketDemand: 'बाजार मांग',
    averageSalary: 'वेतन सीमा',
    overview: 'करियर अवलोकन',
    skillsRequired: 'आवश्यक मुख्य दक्षताएं',
    prerequisites: 'पूर्वापेक्षाएँ और बुनियादी बातें',
    recommendedFor: 'अनुशंसित शाखाएं',
    setTargetGoal: 'इसे मेरा लक्षित करियर लक्ष्य बनाएं',
    currentGoal: 'आपका सक्रिय लक्ष्य',
    goalUpdated: 'लक्षित करियर लक्ष्य आपकी प्रोफ़ाइल में अपडेट किया गया!',

    totalCompletion: 'कुल रोडमैप प्रगति',
    completedPhases: 'पूर्ण चरण',
    remainingPhases: 'शेष चरण',
    currentPhase: 'वर्तमान शिक्षण चरण',
    skillsAcquired: 'अर्जित कौशल',
    startLearning: 'सीखना शुरू करें',
    markPhaseDone: 'चरण को पूर्ण के रूप में चिह्नित करें',
    nextPhase: 'अगला चरण',
    phaseDone: 'पूर्ण',
    inProgress: 'प्रगति पर है',
    notStarted: 'शुरू नहीं हुआ',

    phasesTab: 'चरण-दर-चरण शिक्षण चरण',
    projectsTab: 'वास्तविक दुनिया की परियोजनाएं',
    certificationsTab: 'उद्योग प्रमाणपत्र',
    placementTab: 'प्लेसमेंट और साक्षात्कार',
    checklistTab: 'नौकरी-तैयारी चेकलिस्ट',

    practicalAssignment: 'व्यावहारिक असाइनमेंट',
    topicsCovered: 'इस चरण में सीखने योग्य विषय',
    interactiveTasks: 'दैनिक और साप्ताहिक कार्यों की चेकलिस्ट',
    beginnerProjects: 'शुरुआती परियोजनाएं',
    intermediateProjects: 'मध्यम परियोजनाएं',
    advancedProjects: 'उन्नत परियोजनाएं',
    certAdvisoryHeader: 'प्रमाणपत्र मील का पत्थर सलाह',
    interviewQuestions: 'अक्सर पूछे जाने वाले तकनीकी साक्षात्कार प्रश्न',
    placementChecklistHeader: 'कैंपस प्लेसमेंट और पोर्टफोलियो चेकलिस्ट',
    jobReadinessHeader: 'अंतिम नौकरी-तैयारी चेकलिस्ट',
    recommendedResources: 'अनुशंसित निःशुल्क शिक्षण संसाधन',

    personalizeTitle: 'अपने करियर पथ को वैयक्तिकृत करें',
    branchLabel: 'शाखा',
    yearLabel: 'शैक्षणिक वर्ष',
    levelLabel: 'कौशल स्तर',
    skipFoundations: 'फास्ट-ट्रैक: बुनियादी चरणों को पूर्ण चिह्नित करें',
    foundationsSkipped: 'बुनियादी चरण पूर्ण चिह्नित किए गए! मुख्य इंजीनियरिंग और प्रोजेक्ट्स पर ध्यान दें।',
    branchRoadmapTab: 'शैक्षणिक डिग्री रोडमैप',
    careerRolesTab: 'करियर रोल ट्रैक्स',
    branchDegreeSubtitle: 'वर्ष-वार पाठ्यक्रम, व्यावहारिक कार्य, मिनी और प्रमुख प्रोजेक्ट्स तथा प्लेसमेंट तैयारी।',
    saveToProfile: 'मेरी डिग्री के रूप में सेट करें (Supabase में सहेजें)',
    flowchartTab: 'विजुअल लर्निंग फ्लोचार्ट',
    watchTeachingVideos: 'शिक्षण वीडियो देखें',
  },
};
