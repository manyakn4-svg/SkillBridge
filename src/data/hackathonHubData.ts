export interface HackathonTimelinePhase {
  hourRange: string;
  title: string;
  focus: string;
  actions: string[];
  deliverable: string;
}

export const hackathon24hTimeline: HackathonTimelinePhase[] = [
  {
    hourRange: 'Hour 0 – 2',
    title: 'Understanding & Ideation',
    focus: 'Deconstruct problem statements and discover target users.',
    actions: [
      'Read all provided problem statements carefully with your entire team.',
      'Identify target end-users and map their core pain points.',
      'Brainstorm 3 distinct solutions; debate pros, cons, and feasibility.',
      'Check existing market alternatives to pinpoint your unique value proposition.',
    ],
    deliverable: '1-Paragraph problem statement summary and chosen solution hypothesis.',
  },
  {
    hourRange: 'Hour 2 – 4',
    title: 'Planning & Architecture',
    focus: 'Lock down your feature scope, architecture, and roles.',
    actions: [
      'Select the final idea and commit as a united team.',
      'Define Minimum Viable Product (MVP) core features (Must-Have vs Nice-to-Have).',
      'Sketch high-level system architecture (Frontend, Backend API, Database).',
      'Explicitly divide team responsibilities according to strengths.',
    ],
    deliverable: 'Feature checklist, architecture block diagram, and team task assignments.',
  },
  {
    hourRange: 'Hour 4 – 6',
    title: 'Design & Workspace Setup',
    focus: 'Initialize repositories, UI wireframes, and project skeletons.',
    actions: [
      'Draft wireframes and user journey in Figma or Excalidraw.',
      'Create GitHub repository, initialize main branch, and invite all team members.',
      'Setup development environment, boilerplate codebase, and Supabase/Firebase DB.',
      'Define REST/GraphQL API contract schemas between frontend and backend.',
    ],
    deliverable: 'Active GitHub repository with dev branches and agreed database schema.',
  },
  {
    hourRange: 'Hour 6 – 14',
    title: 'Core Feature Sprint (Night Hack)',
    focus: 'Intensive development of primary workflows and backend APIs.',
    actions: [
      'Frontend: Build core pages, forms, and responsive components.',
      'Backend: Implement business logic endpoints and database CRUD queries.',
      'Maintain regular Git commits to prevent merge conflicts.',
      'Take 15-minute rotation breaks and stay hydrated with light meals.',
    ],
    deliverable: 'Working frontend connected to live backend APIs executing primary workflow.',
  },
  {
    hourRange: 'Hour 14 – 18',
    title: 'System Integration & Testing',
    focus: 'Connect frontend with backend and eliminate critical bugs.',
    actions: [
      'Integrate all modules and test end-to-end user journeys.',
      'Handle empty states, validation errors, and network edge cases.',
      'Seed realistic demo data (avoid dummy test strings like "asdf").',
      'Test responsiveness on both desktop laptops and mobile screens.',
    ],
    deliverable: 'Fully integrated working build with real sample data loaded.',
  },
  {
    hourRange: 'Hour 18 – 20',
    title: 'UI Polish & Cloud Deployment',
    focus: 'Deploy live build and refine user experience.',
    actions: [
      'Deploy frontend on Vercel/Netlify and backend on Render/Cloud Run.',
      'Test live deployed URL on fresh incognito browser window.',
      'Refine UI spacing, typography, colors, and button feedback states.',
      'Ensure zero critical errors appear in browser developer console.',
    ],
    deliverable: 'Public live demo URL and accessible GitHub README with setup instructions.',
  },
  {
    hourRange: 'Hour 20 – 22',
    title: 'Presentation & Pitch Deck',
    focus: 'Build the 10-slide deck and record backup demo video.',
    actions: [
      'Draft 10-slide presentation following the recommended hackathon structure.',
      'Capture crisp high-resolution screenshots of key user workflows.',
      'Record a 60-second offline backup video demo in case internet lags.',
      'Assign speaking roles: Intro, Demo, Tech Stack, and Conclusion.',
    ],
    deliverable: 'Completed 10-slide PPT/PDF and rehearsed 3-minute pitch.',
  },
  {
    hourRange: 'Hour 22 – 24',
    title: 'Submission & Judge Rehearsal',
    focus: 'Final submission verification and Q&A preparation.',
    actions: [
      'Double check submission portal requirements (GitHub link, video URL, PPT upload).',
      'Submit at least 30 minutes before the hard deadline to prevent server crashes.',
      'Conduct a mock presentation with timer set to 3 minutes.',
      'Review judge question bank and practice concise, confident answers.',
    ],
    deliverable: 'Successful portal submission confirmation and confident pitch readiness.',
  },
];

export const hackathon10SlideStructure = [
  {
    slideNumber: 1,
    title: 'Title Slide',
    content: ['Project Name & Catchy Tagline', 'Team Name & Logo', 'Team Members and their Engineering Branches', 'College / University Name'],
    proTip: 'Keep it clean, high contrast, and memorable.',
  },
  {
    slideNumber: 2,
    title: 'Problem Statement',
    content: ['What is the exact problem being solved?', 'Who is the target user / stakeholder affected?', 'Concrete real-world statistic or scenario highlighting the urgency'],
    proTip: 'Hook the judges within 20 seconds. Avoid generic statements.',
  },
  {
    slideNumber: 3,
    title: 'Existing Challenges & Market Gaps',
    content: ['Why is this problem unsolved or inefficient today?', 'Limitations of existing products or manual processes', 'Why current solutions fail for everyday users'],
    proTip: 'Shows judges you have researched competitors and existing workflows.',
  },
  {
    slideNumber: 4,
    title: 'Proposed Solution',
    content: ['Your core product concept in 1 sentence', 'How your solution addresses the root pain point', 'High-level user journey: Input ➡ Processing ➡ Output'],
    proTip: 'Focus on benefits and outcomes rather than internal algorithms here.',
  },
  {
    slideNumber: 5,
    title: 'Key Features & Innovation',
    content: ['3 to 4 standout functionalities built during the hackathon', 'What makes your solution unique or 10x faster/cheaper/simpler', 'Accessibility, responsive design, or automation strengths'],
    proTip: 'Highlight features that judges can verify in your live demo.',
  },
  {
    slideNumber: 6,
    title: 'Technology Stack',
    content: ['Frontend: React, Tailwind CSS, Vite', 'Backend & APIs: Node.js, Express, Python', 'Database & Storage: Supabase, PostgreSQL', 'DevOps & Hosting: Vercel, Git, Cloud Run'],
    proTip: 'Use recognizable tech logos instead of long bullet points.',
  },
  {
    slideNumber: 7,
    title: 'System Architecture Diagram',
    content: ['Clean visual block diagram illustrating data flow', 'Client UI ➡ API Layer ➡ Database / External Services', 'Security, caching, and state synchronization flow'],
    proTip: 'A single clear diagram is worth 5 minutes of explanation.',
  },
  {
    slideNumber: 8,
    title: 'Live Implementation & Demo',
    content: ['Seamless transition to live interactive browser demo', 'Demonstration of the primary happy path scenario', 'Showcase real data persistence and instant responsiveness'],
    proTip: 'Have tabs pre-opened and logged in. Have backup screen recording ready.',
  },
  {
    slideNumber: 9,
    title: 'Impact & Future Scope',
    content: ['Quantifiable business or social impact (cost savings, time efficiency)', 'Target demographic scalability', 'Next 3 roadmap milestones post-hackathon'],
    proTip: 'Judges love seeing that the project has a future beyond the weekend.',
  },
  {
    slideNumber: 10,
    title: 'Conclusion & Q&A',
    content: ['Brief 1-sentence recap of the solution', 'Public GitHub repository & Live App QR code', 'Thank you note to judges & organizers', 'Open invitation for questions'],
    proTip: 'Keep the GitHub link or contact QR visible during Q&A.',
  },
];

export const hackathonJudgeQA = [
  {
    question: 'What is your unique competitive advantage over existing solutions?',
    answer: 'Unlike existing tools which require complex manual configuration or expensive licensing, our solution provides an automated, lightweight workflow with instant setup, accessible directly from mobile and desktop with zero friction.',
  },
  {
    question: 'How does your application scale if 100,000 users access it simultaneously?',
    answer: 'Our architecture leverages stateless backend microservices hosted on serverless infrastructure paired with managed PostgreSQL (Supabase) connection pooling and indexed queries, ensuring seamless horizontal scaling without server bottlenecking.',
  },
  {
    question: 'What was the hardest technical challenge your team overcame during the 24 hours?',
    answer: 'The primary challenge was managing real-time state synchronization and optimizing database query latency during high-frequency updates. We solved this by implementing optimistic UI updates and targeted caching.',
  },
  {
    question: 'How do you ensure data security and user privacy?',
    answer: 'We enforce Row Level Security (RLS) directly at the database layer, sanitize all client inputs against SQL/XSS injections, and avoid storing sensitive plaintext credentials on the frontend.',
  },
  {
    question: 'What would your team build if you had 2 more weeks?',
    answer: 'We would expand analytics reporting, integrate automated email/SMS webhook notifications, add multi-tenant role-based team management, and launch native PWA offline caching.',
  },
];

export const initialHackathonChecklist = {
  before: [
    { id: 'b1', text: 'Register team on hackathon portal (Devpost, Unstop, etc.)', done: true },
    { id: 'b2', text: 'Form team with balanced roles (Frontend, Backend, Design)', done: true },
    { id: 'b3', text: 'Research theme tracks and review past winning projects', done: true },
    { id: 'b4', text: 'Prepare laptops, extension cords, chargers, and mouse', done: false },
    { id: 'b5', text: 'Install required software (Node.js, VS Code, Git, Docker)', done: true },
    { id: 'b6', text: 'Initialize GitHub organization/repo with starter boilerplate', done: false },
    { id: 'b7', text: 'Create free Supabase / Vercel cloud accounts for deployment', done: true },
  ],
  during: [
    { id: 'd1', text: 'Deconstruct problem statement and select single target persona', done: false },
    { id: 'd2', text: 'Define MVP scope and explicitly cut non-essential features', done: false },
    { id: 'd3', text: 'Divide tasks and establish Git branch workflow rules', done: false },
    { id: 'd4', text: 'Develop working core flow before adding visual animations', done: false },
    { id: 'd5', text: 'Seed realistic demo database records (no placeholder gibberish)', done: false },
    { id: 'd6', text: 'Deploy working prototype to public URL early (by Hour 18)', done: false },
  ],
  submission: [
    { id: 's1', text: 'Test all primary user paths on live public URL in incognito mode', done: false },
    { id: 's2', text: 'Verify public GitHub repo has informative README with screenshots', done: false },
    { id: 's3', text: 'Finalize 10-slide pitch presentation and convert to PDF backup', done: false },
    { id: 's4', text: 'Record 60-second video demo showing key features as safety backup', done: false },
    { id: 's5', text: 'Submit portal form at least 30 minutes before hard deadline', done: false },
  ],
};

export const curatedHackathonResources = [
  {
    category: 'Hackathon Portals & Platforms',
    items: [
      { name: 'Devpost', url: 'https://devpost.com', desc: 'The world’s largest online and in-person hackathon discovery and submission platform.' },
      { name: 'Unstop (Dare2Compete)', url: 'https://unstop.com', desc: 'Premier student competition and campus hackathon portal across India and globally.' },
      { name: 'Major League Hacking (MLH)', url: 'https://mlh.io', desc: 'Official student hackathon league empowering 65,000+ hackers annually.' },
    ],
  },
  {
    category: 'Fast Prototyping & Design Tools',
    items: [
      { name: 'Figma', url: 'https://www.figma.com', desc: 'Industry-standard collaborative interface design, wireframing, and interactive prototyping.' },
      { name: 'Excalidraw', url: 'https://excalidraw.com', desc: 'Instant virtual collaborative whiteboard for sketch-style architecture diagrams.' },
      { name: 'Canva', url: 'https://www.canva.com', desc: 'Fast presentation deck builder with modern hackathon slide templates.' },
    ],
  },
  {
    category: 'Developer Hosting & Cloud Backends',
    items: [
      { name: 'Vercel', url: 'https://vercel.com', desc: 'Instant global frontend deployment with automatic GitHub CI/CD integration.' },
      { name: 'Supabase', url: 'https://supabase.com', desc: 'Open-source Firebase alternative with PostgreSQL, Auth, and Storage.' },
      { name: 'GitHub Student Developer Pack', url: 'https://education.github.com/pack', desc: 'Free access to thousands of dollars of premium developer tools and cloud credits.' },
    ],
  },
];
