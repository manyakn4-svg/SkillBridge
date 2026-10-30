import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  // Nav
  dashboard: string;
  myProfile: string;
  skillAssessment: string;
  skillGapAnalysis: string;
  learningRoadmap: string;
  internships: string;
  projects: string;
  hackathons: string;
  learningResources: string;
  virtualLabs: string;
  studyPlanner: string;
  hackathonHub: string;
  achievements: string;
  settings: string;
  logout: string;
  login: string;
  signup: string;

  // Common buttons & actions
  startAssessment: string;
  viewDetails: string;
  applyNow: string;
  registerNow: string;
  saveProject: string;
  saved: string;
  applied: string;
  registered: string;
  submit: string;
  next: string;
  previous: string;
  reset: string;
  search: string;
  filter: string;
  all: string;
  difficulty: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  completed: string;
  inProgress: string;
  notStarted: string;
  editProfile: string;
  saveChanges: string;

  // Dashboard cards
  welcomeBack: string;
  studentSummary: string;
  overallSkillDev: string;
  completedAssessments: string;
  technicalSkillsCount: string;
  learningProgress: string;
  recommendedInternships: string;
  upcomingHackathons: string;
  recommendedProjects: string;
  careerGoal: string;

  // Assessment
  aptitudeAssessment: string;
  technicalAssessment: string;
  quantitativeAptitude: string;
  logicalReasoning: string;
  verbalAbility: string;
  analyticalThinking: string;
  timeRemaining: string;
  question: string;
  of: string;
  scoreSummary: string;
  yourScore: string;
  accuracy: string;
  reviewAnswers: string;
  retakeTest: string;

  // Skill Gap
  currentSkills: string;
  requiredSkills: string;
  missingSkills: string;
  strongSkills: string;
  weakSkills: string;
  skillGapPercentage: string;
  targetRole: string;
  suggestedImprovements: string;

  // Branches
  branch: string;
  academicYear: string;
  collegeName: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'SkillBridge',
    tagline: 'Engineering Student Career Development Platform',
    dashboard: 'Dashboard',
    myProfile: 'My Profile',
    skillAssessment: 'Skill Assessment',
    skillGapAnalysis: 'Skill Gap Analysis',
    learningRoadmap: 'Learning Roadmap',
    internships: 'Internships',
    projects: 'Projects',
    hackathons: 'Hackathons & Competitions',
    learningResources: 'Learning Resources',
    virtualLabs: 'Virtual Labs',
    studyPlanner: 'Study Planner',
    hackathonHub: 'Hackathon Hub',
    achievements: 'Achievements',
    settings: 'Settings',
    logout: 'Logout',
    login: 'Log In',
    signup: 'Sign Up',

    startAssessment: 'Start Assessment',
    viewDetails: 'View Details',
    applyNow: 'Apply Now',
    registerNow: 'Register',
    saveProject: 'Save Project',
    saved: 'Saved',
    applied: 'Applied',
    registered: 'Registered',
    submit: 'Submit Test',
    next: 'Next',
    previous: 'Previous',
    reset: 'Reset',
    search: 'Search...',
    filter: 'Filter',
    all: 'All',
    difficulty: 'Difficulty',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    completed: 'Completed',
    inProgress: 'In Progress',
    notStarted: 'Not Started',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',

    welcomeBack: 'Welcome back,',
    studentSummary: 'Student Profile Summary',
    overallSkillDev: 'Overall Skill Development',
    completedAssessments: 'Completed Assessments',
    technicalSkillsCount: 'Technical Skills Verified',
    learningProgress: 'Roadmap Progress',
    recommendedInternships: 'Recommended Internships',
    upcomingHackathons: 'Upcoming Hackathons',
    recommendedProjects: 'Recommended Projects',
    careerGoal: 'Target Career Goal',

    aptitudeAssessment: 'Aptitude Assessment',
    technicalAssessment: 'Technical Skill Assessment',
    quantitativeAptitude: 'Quantitative Aptitude',
    logicalReasoning: 'Logical Reasoning',
    verbalAbility: 'Verbal Ability',
    analyticalThinking: 'Analytical Thinking',
    timeRemaining: 'Time Remaining',
    question: 'Question',
    of: 'of',
    scoreSummary: 'Assessment Summary',
    yourScore: 'Your Score',
    accuracy: 'Accuracy',
    reviewAnswers: 'Review Answers',
    retakeTest: 'Take Another Test',

    currentSkills: 'Current Skills',
    requiredSkills: 'Required Skills',
    missingSkills: 'Missing Skills',
    strongSkills: 'Strong Skills',
    weakSkills: 'Weak Skills',
    skillGapPercentage: 'Skill Gap',
    targetRole: 'Target Engineering Role',
    suggestedImprovements: 'Actionable Improvement Plan',

    branch: 'Engineering Branch',
    academicYear: 'Academic Year',
    collegeName: 'College / Institute Name',
  },
  kn: {
    appName: 'ಸ್ಕಿಲ್‌ಬ್ರಿಡ್ಜ್ (SkillBridge)',
    tagline: 'ಇಂಜಿನಿಯರಿಂಗ್ ವಿದ್ಯಾರ್ಥಿಗಳ ವೃತ್ತಿ ಅಭಿವೃದ್ಧಿ ವೇದಿಕೆ',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    myProfile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
    skillAssessment: 'ಕೌಶಲ್ಯ ಮೌಲ್ಯಮಾಪನ',
    skillGapAnalysis: 'ಕೌಶಲ್ಯ ಅಂತರ ವಿಶ್ಲೇಷಣೆ',
    learningRoadmap: 'ಕಲಿಕಾ ಮಾರ್ಗಸೂಚಿ',
    internships: 'ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳು',
    projects: 'ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು',
    hackathons: 'ಹ್ಯಾಕಥಾನ್‌ಗಳು ಮತ್ತು ಸ್ಪರ್ಧೆಗಳು',
    learningResources: 'ಕಲಿಕಾ ಸಂಪನ್ಮೂಲಗಳು',
    virtualLabs: 'ವರ್ಚುವಲ್ ಲ್ಯಾಬ್‌ಗಳು',
    studyPlanner: 'ಸ್ಟಡಿ ಪ್ಲಾನರ್',
    hackathonHub: 'ಹ್ಯಾಕಥಾನ್ ಹಬ್',
    achievements: 'ಸಾಧನೆಗಳು ಮತ್ತು ಲೀಡರ್‌ಬೋರ್ಡ್',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    logout: 'ಲಾಗ್‌ಔಟ್',
    login: 'ಲಾಗಿನ್',
    signup: 'ಸೈನ್ ಅಪ್',

    startAssessment: 'ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ',
    viewDetails: 'ವಿವರಗಳನ್ನು ನೋಡಿ',
    applyNow: 'ಈಗಲೇ ಅರ್ಜಿ ಹಾಕಿ',
    registerNow: 'ನೋಂದಣಿ ಮಾಡಿ',
    saveProject: 'ಪ್ರಾಜೆಕ್ಟ್ ಉಳಿಸಿ',
    saved: 'ಉಳಿಸಲಾಗಿದೆ',
    applied: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ',
    registered: 'ನೋಂದಾಯಿಸಲಾಗಿದೆ',
    submit: 'ಪರೀಕ್ಷೆ ಸಲ್ಲಿಸಿ',
    next: 'ಮುಂದೆ',
    previous: 'ಹಿಂದೆ',
    reset: 'ಮರುಹೊಂದಿಸಿ',
    search: 'ಹುಡುಕಿ...',
    filter: 'ಫಿಲ್ಟರ್',
    all: 'ಎಲ್ಲವೂ',
    difficulty: 'ಕಠಿಣತೆ',
    beginner: 'ಆರಂಭಿಕ ಹಂತ',
    intermediate: 'ಮಧ್ಯಮ ಹಂತ',
    advanced: 'ಮುಂದುವರಿದ ಹಂತ',
    completed: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    inProgress: 'ಪ್ರಗತಿಯಲ್ಲಿದೆ',
    notStarted: 'ಪ್ರಾರಂಭಿಸಿಲ್ಲ',
    editProfile: 'ಪ್ರೊಫೈಲ್ ತಿದ್ದಿ',
    saveChanges: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',

    welcomeBack: 'ಮರಳಿ ಸ್ವಾಗತ,',
    studentSummary: 'ವಿದ್ಯಾರ್ಥಿ ವಿವರ ಸಂಕ್ಷಿಪ್ತ',
    overallSkillDev: 'ಒಟ್ಟಾರೆ ಕೌಶಲ್ಯ ಪ್ರಗತಿ',
    completedAssessments: 'ಪೂರ್ಣಗೊಂಡ ಪರೀಕ್ಷೆಗಳು',
    technicalSkillsCount: 'ತಾಂತ್ರಿಕ ಕೌಶಲ್ಯಗಳು',
    learningProgress: 'ಕಲಿಕಾ ಮಾರ್ಗದ ಪ್ರಗತಿ',
    recommendedInternships: 'ಶಿಫಾರಸು ಮಾಡಿದ ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳು',
    upcomingHackathons: 'ಮುಂಬರುವ ಹ್ಯಾಕಥಾನ್‌ಗಳು',
    recommendedProjects: 'ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು',
    careerGoal: 'ಗುರಿ ವೃತ್ತಿ',

    aptitudeAssessment: 'ಆಪ್ಟಿಟ್ಯೂಡ್ ಪರೀಕ್ಷೆ',
    technicalAssessment: 'ತಾಂತ್ರಿಕ ಕೌಶಲ್ಯ ಪರೀಕ್ಷೆ',
    quantitativeAptitude: 'ಗಣಿತ ಹಾಗೂ ಪರಿಮಾಣಾತ್ಮಕ ಕೌಶಲ್ಯ',
    logicalReasoning: 'ತಾರ್ಕಿಕ ತರ್ಕ (ಲಾಜಿಕಲ್ ರೀಸನಿಂಗ್)',
    verbalAbility: 'ಭಾಷಾ ಸಾಮರ್ಥ್ಯ (ವರ್ಬಲ್ ಎಬಿಲಿಟಿ)',
    analyticalThinking: 'ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಚಿಂತನೆ',
    timeRemaining: 'ಉಳಿದ ಸಮಯ',
    question: 'ಪ್ರಶ್ನೆ',
    of: 'ರಲ್ಲಿ',
    scoreSummary: 'ಫಲಿತಾಂಶದ ಸಾರಾಂಶ',
    yourScore: 'ನಿಮ್ಮ ಅಂಕಗಳು',
    accuracy: 'ನಿಖರತೆ',
    reviewAnswers: 'ಉತ್ತರಗಳ ಪರಿಶೀಲನೆ',
    retakeTest: 'ಮತ್ತೊಂದು ಪರೀಕ್ಷೆ ತೆಗೆದುಕೊಳ್ಳಿ',

    currentSkills: 'ಪ್ರಸ್ತುತ ಕೌಶಲ್ಯಗಳು',
    requiredSkills: 'ಅಗತ್ಯವಿರುವ ಕೌಶಲ್ಯಗಳು',
    missingSkills: 'ಕಲಿಯಬೇಕಾದ ಕೌಶಲ್ಯಗಳು',
    strongSkills: 'ಬಲಿಷ್ಠ ಕೌಶಲ್ಯಗಳು',
    weakSkills: 'ಸುಧಾರಿಸಬೇಕಾದ ಕೌಶಲ್ಯಗಳು',
    skillGapPercentage: 'ಕೌಶಲ್ಯದ ಅಂತರ',
    targetRole: 'ಗುರಿ ಇಂಜಿನಿಯರಿಂಗ್ ಹುದ್ದೆ',
    suggestedImprovements: 'ಸುಧಾರಣಾ ಸಲಹೆಗಳು',

    branch: 'ಇಂಜಿನಿಯರಿಂಗ್ ವಿಭಾಗ',
    academicYear: 'ಶೈಕ್ಷಣಿಕ ವರ್ಷ',
    collegeName: 'ಕಾಲೇಜು / ಸಂಸ್ಥೆಯ ಹೆಸರು',
  },
  hi: {
    appName: 'स्किलब्रिज (SkillBridge)',
    tagline: 'इंजीनियरिंग छात्र करियर विकास प्लेटफॉर्म',
    dashboard: 'डैशबोर्ड',
    myProfile: 'मेरी प्रोफाइल',
    skillAssessment: 'कौशल मूल्यांकन',
    skillGapAnalysis: 'स्किल गैप विश्लेषण',
    learningRoadmap: 'लर्निंग रोडमैप',
    internships: 'इंटर्नशिप्स',
    projects: 'प्रोजेक्ट्स',
    hackathons: 'हैकाथॉन व प्रतियोगिताएं',
    learningResources: 'अध्ययन संसाधन',
    virtualLabs: 'वर्चुअल लैब्स',
    studyPlanner: 'स्टडी प्लानर',
    hackathonHub: 'हैकाथॉन हब',
    achievements: 'उपलब्धियां और लीडरबोर्ड',
    settings: 'सेटिंग्स',
    logout: 'लॉगआउट',
    login: 'लॉग इन',
    signup: 'साइन अप',

    startAssessment: 'मूल्यांकन शुरू करें',
    viewDetails: 'विवरण देखें',
    applyNow: 'अभी आवेदन करें',
    registerNow: 'पंजीकरण करें',
    saveProject: 'प्रोजेक्ट सहेजें',
    saved: 'सहेजा गया',
    applied: 'आवेदन किया गया',
    registered: 'पंजीकृत',
    submit: 'टेस्ट सबमिट करें',
    next: 'आगे',
    previous: 'पीछे',
    reset: 'रीसेट',
    search: 'खोजें...',
    filter: 'फ़िल्टर',
    all: 'सभी',
    difficulty: 'कठिनाई स्तर',
    beginner: 'शुरुआती (Beginner)',
    intermediate: 'मध्यम (Intermediate)',
    advanced: 'उन्नत (Advanced)',
    completed: 'पूर्ण',
    inProgress: 'प्रगति पर',
    notStarted: 'शुरू नहीं हुआ',
    editProfile: 'प्रोफाइल संपादित करें',
    saveChanges: 'बदलाव सहेजें',

    welcomeBack: 'वापसी पर स्वागत है,',
    studentSummary: 'छात्र प्रोफाइल सारांश',
    overallSkillDev: 'समग्र कौशल विकास',
    completedAssessments: 'पूर्ण किए गए टेस्ट',
    technicalSkillsCount: 'सत्यापित तकनीकी कौशल',
    learningProgress: 'रोडमैप प्रगति',
    recommendedInternships: 'अनुशंसित इंटर्नशिप्स',
    upcomingHackathons: 'आगामी हैकाथॉन',
    recommendedProjects: 'अनुशंसित प्रोजेक्ट्स',
    careerGoal: 'लक्ष्य करियर पद',

    aptitudeAssessment: 'एप्टीट्यूड टेस्ट',
    technicalAssessment: 'तकनीकी कौशल टेस्ट',
    quantitativeAptitude: 'मात्रात्मक योग्यता (Quantitative)',
    logicalReasoning: 'तार्किक क्षमता (Logical Reasoning)',
    verbalAbility: 'मौखिक योग्यता (Verbal Ability)',
    analyticalThinking: 'विश्लेषणात्मक सोच (Analytical)',
    timeRemaining: 'शेष समय',
    question: 'प्रश्न',
    of: 'का',
    scoreSummary: 'टेस्ट परिणाम सारांश',
    yourScore: 'आपका स्कोर',
    accuracy: 'सटीकता',
    reviewAnswers: 'उत्तरों की समीक्षा करें',
    retakeTest: 'दूसरा टेस्ट दें',

    currentSkills: 'वर्तमान कौशल',
    requiredSkills: 'आवश्यक कौशल',
    missingSkills: 'आवश्यक नए कौशल',
    strongSkills: 'मजबूत कौशल',
    weakSkills: 'सुधार योग्य कौशल',
    skillGapPercentage: 'स्किल गैप (अंतर)',
    targetRole: 'लक्षित इंजीनियरिंग पद',
    suggestedImprovements: 'सुधार कार्य योजना',

    branch: 'इंजीनियरिंग शाखा',
    academicYear: 'शैक्षणिक वर्ष',
    collegeName: 'कॉलेज / संस्थान का नाम',
  },
};
