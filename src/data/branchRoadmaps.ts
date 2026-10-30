import { AcademicYear, EngineeringBranch } from '../types';

export interface DetailedRoadmapTask {
  id: string;
  day: number;
  title: string;
  duration: string;
  type: 'Theory' | 'Practice' | 'Project' | 'Quiz';
  topic: string;
  resourceLink?: string;
}

export interface DetailedRoadmapWeek {
  weekNumber: number;
  title: string;
  focus: string;
  tasks: DetailedRoadmapTask[];
}

export interface DetailedRoadmapLevel {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  title: string;
  objective: string;
  duration: string;
  weeks: DetailedRoadmapWeek[];
}

export interface PracticalExercise {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  description: string;
  deliverable: string;
}

export interface CourseSpecificRoadmap {
  branch: EngineeringBranch;
  year: AcademicYear;
  title: string;
  semesters: string;
  coreCurriculumTopics: string[];
  keyHighlights: string;
  levels: DetailedRoadmapLevel[];
  practicalExercises: PracticalExercise[];
  miniProject: {
    title: string;
    description: string;
    technologies: string[];
  };
  majorProject: {
    title: string;
    description: string;
    technologies: string[];
  };
  recommendedResources: {
    title: string;
    type: 'Video' | 'Documentation' | 'Practice' | 'Cheat Sheet' | 'Article';
    provider: string;
    url: string;
  }[];
}

// ---------------------------------------------------------------------------------
// 1. CSE ROADMAPS (1st Year, 2nd Year, 3rd Year, 4th Year)
// ---------------------------------------------------------------------------------
const cseRoadmaps: Record<AcademicYear, CourseSpecificRoadmap> = {
  '1st Year': {
    branch: 'CSE',
    year: '1st Year',
    title: 'CSE Year 1: Foundational Programming, Logic & Tooling',
    semesters: 'Semesters 1 & 2',
    coreCurriculumTopics: ['C Programming', 'Python Basics', 'Mathematics for Computing', 'Problem Solving', 'Git and GitHub'],
    keyHighlights: 'Master command line, pointer arithmetic in C, syntax fluency in Python, and Git version control workflows.',
    levels: [
      {
        level: 'Beginner',
        title: 'C Syntax, Pointers & Problem Solving',
        objective: 'Build computational thinking, control flow logic, and memory model intuition in ANSI C.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: C Primitives & Control Flow',
            focus: 'Data types, loops, nested conditionals, and math library functions',
            tasks: [
              { id: 'cse-1-w1-d1', day: 1, title: 'Install GCC compiler, configure VS Code & write Hello World', duration: '1.5 hrs', type: 'Theory', topic: 'C Environment' },
              { id: 'cse-1-w1-d2', day: 2, title: 'Implement arithmetic series, prime checkers & factorial logic', duration: '2 hrs', type: 'Practice', topic: 'Control Flow' },
              { id: 'cse-1-w1-d3', day: 3, title: 'Understand memory models: Stack frames & scope lifecycles', duration: '2 hrs', type: 'Theory', topic: 'Memory Fundamentals' },
              { id: 'cse-1-w1-d4', day: 4, title: 'Solve 10 HackerRank C warmup syntax problems', duration: '2.5 hrs', type: 'Practice', topic: 'Problem Solving' },
              { id: 'cse-1-w1-d5', day: 5, title: 'Week 1 Assessment: C Fundamentals & Conditionals Quiz', duration: '1 hr', type: 'Quiz', topic: 'Quiz' },
            ],
          },
          {
            weekNumber: 2,
            title: 'Week 2: Pointers, Arrays & Functions',
            focus: 'Pass by value vs reference, array indexing, and pointer dereferencing',
            tasks: [
              { id: 'cse-1-w2-d1', day: 6, title: 'Direct memory addressing: Pointer syntax & address-of operators', duration: '2 hrs', type: 'Theory', topic: 'Pointers' },
              { id: 'cse-1-w2-d2', day: 7, title: 'Implement array reversals and string manipulations using pointers', duration: '3 hrs', type: 'Practice', topic: 'Pointers & Arrays' },
              { id: 'cse-1-w2-d3', day: 8, title: 'Dynamic memory allocation with malloc(), calloc(), and free()', duration: '2.5 hrs', type: 'Theory', topic: 'Dynamic Memory' },
              { id: 'cse-1-w2-d4', day: 9, title: 'Debug memory leaks using Valgrind on Linux CLI', duration: '2 hrs', type: 'Practice', topic: 'Debugging' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Python Essentials & Computational Math',
        objective: 'Learn rapid algorithmic prototyping in Python and discrete mathematics essentials.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Python Data Structures & Idioms',
            focus: 'Lists, Tuples, Dictionaries, Sets, and List Comprehensions',
            tasks: [
              { id: 'cse-1-w3-d1', day: 10, title: 'Python environment setup, virtual environments & PEP 8', duration: '1.5 hrs', type: 'Theory', topic: 'Python Basics' },
              { id: 'cse-1-w3-d2', day: 11, title: 'Master Python collections: dict lookups & set intersections', duration: '2.5 hrs', type: 'Practice', topic: 'Collections' },
              { id: 'cse-1-w3-d3', day: 12, title: 'File I/O and CSV parsing using native Python context managers', duration: '2 hrs', type: 'Practice', topic: 'File I/O' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Git Version Control & Open Source Collaboration',
        objective: 'Master branches, merges, rebases, pull requests, and GitHub portfolio setup.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 4,
            title: 'Week 4: Professional Git Workflows',
            focus: 'Git CLI, remote remotes, conflicts resolution, and markdown docs',
            tasks: [
              { id: 'cse-1-w4-d1', day: 13, title: 'Git init, staging area, commit graphs & diff inspection', duration: '2 hrs', type: 'Practice', topic: 'Git Basics' },
              { id: 'cse-1-w4-d2', day: 14, title: 'Branching strategies (Git Flow), merge conflict resolution', duration: '2.5 hrs', type: 'Practice', topic: 'Git Advanced' },
              { id: 'cse-1-w4-d3', day: 15, title: 'Publish your 1st Year GitHub Portfolio with clean README', duration: '3 hrs', type: 'Project', topic: 'GitHub' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'cse-1-p1', title: 'Dynamic String Library in C', difficulty: 'Beginner', estimatedTime: '4 hrs', description: 'Create a custom string utility reproducing strlen, strcpy, strcat using raw char pointers.', deliverable: 'Source code in c_string_lib.c with unit tests.' },
      { id: 'cse-1-p2', title: 'Python CLI Word Frequency Counter', difficulty: 'Beginner', estimatedTime: '3 hrs', description: 'Parse text files and output Top 20 most frequent words sorted in descending frequency.', deliverable: 'Python script word_count.py with argument parser.' },
    ],
    miniProject: {
      title: 'Console Student Grade & Attendance System',
      description: 'C/Python interactive CLI application maintaining student records, calculating CGPA, and saving records to persistent disk files.',
      technologies: ['C Programming', 'File I/O', 'Memory Allocation'],
    },
    majorProject: {
      title: 'Command-Line Task & Habit Tracker with Git Sync',
      description: 'A robust CLI tool supporting todo lists, priority flags, CSV data exports, and automated GitHub repository backup.',
      technologies: ['Python 3', 'Argparse', 'Git Subprocess API'],
    },
    recommendedResources: [
      { title: 'The C Programming Language (K&R Interactive Notes)', type: 'Cheat Sheet', provider: 'ISO C Codex', url: 'https://isocpp.org' },
      { title: 'Official Python 3.12 Comprehensive Tutorial', type: 'Documentation', provider: 'Python Software Foundation', url: 'https://docs.python.org/3/tutorial/' },
      { title: 'Pro Git Book (Ch 1 - 3: Getting Started & Branching)', type: 'Article', provider: 'Git-SCM Official', url: 'https://git-scm.com/book/en/v2' },
    ],
  },

  '2nd Year': {
    branch: 'CSE',
    year: '2nd Year',
    title: 'CSE Year 2: Core Computer Science Foundations',
    semesters: 'Semesters 3 & 4',
    coreCurriculumTopics: ['Java', 'Object-Oriented Programming (OOP)', 'Data Structures and Algorithms', 'DBMS', 'Operating Systems'],
    keyHighlights: 'Master trees, graphs, sorting complexities, SQL schema normalization, ACID transactions, and OS process scheduling.',
    levels: [
      {
        level: 'Beginner',
        title: 'Java OOP & Linear Data Structures',
        objective: 'Inheritance, interfaces, polymorphic design patterns, and implementing Stacks/Queues/Linked Lists from scratch.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Object-Oriented Java Architecture',
            focus: 'Encapsulation, abstract classes, interfaces, and Java Collections Framework',
            tasks: [
              { id: 'cse-2-w1-d1', day: 1, title: 'JVM Architecture: ClassLoader, Bytecode execution, Garbage Collection', duration: '2 hrs', type: 'Theory', topic: 'Java Fundamentals' },
              { id: 'cse-2-w1-d2', day: 2, title: 'Design modular OOP hierarchy: Abstract classes vs Interfaces', duration: '2.5 hrs', type: 'Practice', topic: 'OOP Design' },
              { id: 'cse-2-w1-d3', day: 3, title: 'Implement custom Singly and Doubly Linked Lists in Java with generics', duration: '3 hrs', type: 'Practice', topic: 'Linked Lists' },
              { id: 'cse-2-w1-d4', day: 4, title: 'Solve 5 LeetCode Linked List problems (Reverse, Detect Cycle)', duration: '2.5 hrs', type: 'Practice', topic: 'DSA Practice' },
            ],
          },
          {
            weekNumber: 2,
            title: 'Week 2: Stacks, Queues & Hash Tables',
            focus: 'Circular Queues, Monotonic Stacks, Hash collisions and separate chaining',
            tasks: [
              { id: 'cse-2-w2-d1', day: 5, title: 'Stack implementations & Parentheses validation algorithms', duration: '2 hrs', type: 'Practice', topic: 'Stacks' },
              { id: 'cse-2-w2-d2', day: 6, title: 'Build custom HashTable with dynamic resizing and prime hashing', duration: '3 hrs', type: 'Practice', topic: 'Hash Tables' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Trees, Graphs & Relational Databases (DBMS)',
        objective: 'Binary Search Trees, Heaps, Graph BFS/DFS, Dijkstra, SQL joins, and 3NF normalization.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Trees, Heaps & Graph Traversals',
            focus: 'AVL Trees, Priority Queues, BFS, DFS, and topological sorting',
            tasks: [
              { id: 'cse-2-w3-d1', day: 7, title: 'Construct Binary Search Trees & implement in-order/pre-order traversals', duration: '3 hrs', type: 'Practice', topic: 'Trees' },
              { id: 'cse-2-w3-d2', day: 8, title: 'Graph representation with Adjacency Lists & BFS/DFS implementations', duration: '3 hrs', type: 'Practice', topic: 'Graphs' },
              { id: 'cse-2-w3-d3', day: 9, title: 'Dijkstra shortest path algorithm with priority queues', duration: '2.5 hrs', type: 'Practice', topic: 'Graph Shortest Path' },
            ],
          },
          {
            weekNumber: 4,
            title: 'Week 4: SQL, Indexing & Relational Normalization',
            focus: 'DDL/DML, complex JOINs, B-Tree indices, and ACID concurrency',
            tasks: [
              { id: 'cse-2-w4-d1', day: 10, title: 'Entity-Relationship modeling & converting ER diagrams to 3NF/BCNF schemas', duration: '2.5 hrs', type: 'Theory', topic: 'Normalization' },
              { id: 'cse-2-w4-d2', day: 11, title: 'Write advanced PostgreSQL queries: Aggregate functions & window analytical queries', duration: '3 hrs', type: 'Practice', topic: 'SQL Queries' },
              { id: 'cse-2-w4-d3', day: 12, title: 'Analyze query plans using EXPLAIN ANALYZE and composite index optimization', duration: '2 hrs', type: 'Practice', topic: 'Indexing' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Operating Systems & Concurrency Mechanics',
        objective: 'Processes vs threads, mutexes, condition variables, CPU scheduling, and page replacement.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 5,
            title: 'Week 5: CPU Scheduling, Virtual Memory & Deadlocks',
            focus: 'Round Robin, Multilevel Feedback Queues, TLB, Page Faults, and Banker algorithm',
            tasks: [
              { id: 'cse-2-w5-d1', day: 13, title: 'Process control blocks, context switching, and fork/exec system calls', duration: '2.5 hrs', type: 'Theory', topic: 'Processes' },
              { id: 'cse-2-w5-d2', day: 14, title: 'Solve the Producer-Consumer problem with Java Semaphore and ReentrantLock', duration: '3 hrs', type: 'Practice', topic: 'Concurrency' },
              { id: 'cse-2-w5-d3', day: 15, title: 'Simulate LRU and FIFO Page Replacement algorithms in Java', duration: '2.5 hrs', type: 'Practice', topic: 'Virtual Memory' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'cse-2-p1', title: 'Balanced Binary Search Tree with Deletion', difficulty: 'Intermediate', estimatedTime: '5 hrs', description: 'Build an AVL tree that performs left and right rotations to maintain log(n) height.', deliverable: 'Java AVLTree class with JUnit validation suite.' },
      { id: 'cse-2-p2', title: 'Hospital Patient Scheduling & Triage System', difficulty: 'Intermediate', estimatedTime: '4 hrs', description: 'Design a priority queue data structure and SQL relational schema for hospital emergency admissions.', deliverable: 'Schema DDL and Java priority dispatcher.' },
    ],
    miniProject: {
      title: 'Database-Backed Inventory Management System',
      description: 'Java desktop or console application connected via JDBC to PostgreSQL, supporting transaction rollbacks and stock auditing.',
      technologies: ['Java', 'PostgreSQL', 'JDBC', 'OOP'],
    },
    majorProject: {
      title: 'Multithreaded Web Server & File Cache Engine',
      description: 'A multi-threaded HTTP server written in Java utilizing thread pools, socket programming, and an in-memory LRU cache.',
      technologies: ['Java Sockets', 'Concurrency', 'HTTP/1.1 Protocol', 'Data Structures'],
    },
    recommendedResources: [
      { title: 'VisuAlgo: Visualizing Data Structures and Algorithms', type: 'Practice', provider: 'National University of Singapore', url: 'https://visualgo.net/en' },
      { title: 'Use The Index, Luke! A Guide to Database Performance', type: 'Article', provider: 'Markus Winand', url: 'https://use-the-index-luke.com' },
      { title: 'Operating Systems: Three Easy Pieces (OSTEP)', type: 'Documentation', provider: 'Univ of Wisconsin-Madison', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/' },
    ],
  },

  '3rd Year': {
    branch: 'CSE',
    year: '3rd Year',
    title: 'CSE Year 3: Advanced Systems, Web & Cloud Engineering',
    semesters: 'Semesters 5 & 6',
    coreCurriculumTopics: ['Advanced DSA', 'Computer Networks', 'Web Development', 'Cloud Computing', 'Software Engineering'],
    keyHighlights: 'Dynamic programming, subnetting & TCP congestion control, modern React/TypeScript full-stack apps, and AWS/Docker cloud deployments.',
    levels: [
      {
        level: 'Beginner',
        title: 'Full-Stack Web Foundations (TypeScript & React)',
        objective: 'Build type-safe responsive single-page web applications with RESTful API backends.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Modern TypeScript, React 19 & Component Architecture',
            focus: 'Hooks, state management, Tailwind CSS, and asynchronous data fetching',
            tasks: [
              { id: 'cse-3-w1-d1', day: 1, title: 'TypeScript interfaces, generics & strict compile configuration', duration: '2 hrs', type: 'Theory', topic: 'TypeScript' },
              { id: 'cse-3-w1-d2', day: 2, title: 'Build modern responsive dashboard using React hooks & Tailwind CSS', duration: '3.5 hrs', type: 'Practice', topic: 'React UI' },
              { id: 'cse-3-w1-d3', day: 3, title: 'Design REST API with Express.js, input validation, and JWT authentication', duration: '3 hrs', type: 'Practice', topic: 'Node Backend' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Computer Networks, TCP/IP & Socket Programming',
        objective: 'Understand the 5-layer Internet model, routing protocols, sliding window flow control, and HTTP/3.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Transport & Network Layer Protocols',
            focus: 'TCP 3-way handshake, sliding window, IPv4 CIDR subnetting, and DNS resolution',
            tasks: [
              { id: 'cse-3-w2-d1', day: 4, title: 'Analyze packet captures in Wireshark: TCP SYN/ACK, TLS 1.3 handshake', duration: '2.5 hrs', type: 'Practice', topic: 'Wireshark' },
              { id: 'cse-3-w2-d2', day: 5, title: 'Solve CIDR IP subnetting and routing table longest-prefix matching', duration: '2 hrs', type: 'Practice', topic: 'Subnetting' },
              { id: 'cse-3-w2-d3', day: 6, title: 'Implement a bi-directional chat socket server using WebSocket protocol', duration: '3 hrs', type: 'Project', topic: 'WebSockets' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Cloud Computing, Docker & Advanced Dynamic Programming',
        objective: 'Containerize microservices, deploy to AWS/GCP, and master hard algorithmic DP patterns.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Containerization & Cloud Native Architecture',
            focus: 'Multi-stage Docker builds, AWS EC2, S3, IAM roles, and serverless Lambda functions',
            tasks: [
              { id: 'cse-3-w3-d1', day: 7, title: 'Write minimal production Dockerfile with Alpine Linux & multi-stage caching', duration: '2 hrs', type: 'Practice', topic: 'Docker' },
              { id: 'cse-3-w3-d2', day: 8, title: 'Provision AWS VPC, EC2 instance, security groups & deploy container', duration: '3 hrs', type: 'Practice', topic: 'Cloud AWS' },
              { id: 'cse-3-w3-d3', day: 9, title: 'Solve 10 classic Dynamic Programming problems (Knapsack, LCS, Edit Distance)', duration: '4 hrs', type: 'Practice', topic: 'DP Patterns' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'cse-3-p1', title: 'Packet Sniffer & TCP Flow Reassembler', difficulty: 'Advanced', estimatedTime: '6 hrs', description: 'Capture raw Ethernet packets and reconstruct TCP streams, parsing HTTP payloads.', deliverable: 'Python / C socket packet listener with report.' },
      { id: 'cse-3-p2', title: 'Containerized Microservices Cluster', difficulty: 'Intermediate', estimatedTime: '5 hrs', description: 'Create docker-compose setup containing React client, Node.js API, PostgreSQL, and Redis cache.', deliverable: 'docker-compose.yml with health checks.' },
    ],
    miniProject: {
      title: 'Real-Time Collaborative Code Editor',
      description: 'Full-stack application allowing multiple users to code together in real time with syntax highlighting and operational transformation.',
      technologies: ['React', 'Node.js', 'Socket.IO', 'TypeScript'],
    },
    majorProject: {
      title: 'Cloud-Native Video Transcoding & Streaming Pipeline',
      description: 'Distributed pipeline taking user video uploads, slicing HLS playlists using FFmpeg workers, and storing streams on S3/CloudFront.',
      technologies: ['Docker', 'AWS S3', 'Node.js', 'FFmpeg', 'Redis Queue'],
    },
    recommendedResources: [
      { title: 'Computer Networking: A Top-Down Approach (Interactive Labs)', type: 'Documentation', provider: 'Kurose & Ross', url: 'https://gaia.cs.umass.edu/kurose_ross/' },
      { title: 'Full Stack Open 2026: Deep Dive Into Modern Web Development', type: 'Video', provider: 'University of Helsinki', url: 'https://fullstackopen.com/en/' },
      { title: 'AWS Well-Architected Framework Whitepaper', type: 'Article', provider: 'Amazon Web Services', url: 'https://aws.amazon.com/architecture/well-architected/' },
    ],
  },

  '4th Year': {
    branch: 'CSE',
    year: '4th Year',
    title: 'CSE Year 4: Enterprise Scale, DevOps & Placement Capstone',
    semesters: 'Semesters 7 & 8',
    coreCurriculumTopics: ['Advanced Cloud Computing', 'System Design', 'DevOps & CI/CD', 'Placement Preparation', 'Major Projects'],
    keyHighlights: 'High-availability system design, Kubernetes orchestration, CI/CD automation pipelines, mock placement interviews, and capstone deployment.',
    levels: [
      {
        level: 'Beginner',
        title: 'CI/CD Pipelines & Infrastructure as Code (Terraform)',
        objective: 'Automate build/test/deploy cycles with GitHub Actions and declare cloud infrastructure declaratively.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Continuous Integration & Automated Deployment',
            focus: 'GitHub Actions workflows, unit testing, semantic versioning, and zero-downtime releases',
            tasks: [
              { id: 'cse-4-w1-d1', day: 1, title: 'Build automated GitHub Actions pipeline with linting, testing & Docker publishing', duration: '3 hrs', type: 'Practice', topic: 'CI/CD' },
              { id: 'cse-4-w1-d2', day: 2, title: 'Infrastructure as Code: Provision AWS resources using Terraform HCL scripts', duration: '3 hrs', type: 'Practice', topic: 'Terraform' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'High-Scale Distributed System Design',
        objective: 'Database sharding, CAP theorem, consistent hashing, rate limiting, and message brokers (Kafka/RabbitMQ).',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Distributed System Design Patterns',
            focus: 'Load balancing, CDN caching, database read replicas, and distributed locks',
            tasks: [
              { id: 'cse-4-w2-d1', day: 3, title: 'Architect high-volume URL Shortener (100M daily active requests)', duration: '3.5 hrs', type: 'Theory', topic: 'System Design' },
              { id: 'cse-4-w2-d2', day: 4, title: 'Design a distributed rate limiter using Redis Token Bucket algorithm', duration: '3 hrs', type: 'Practice', topic: 'Rate Limiting' },
              { id: 'cse-4-w2-d3', day: 5, title: 'Message queues: Publish-Subscribe architectures with Apache Kafka', duration: '3 hrs', type: 'Practice', topic: 'Event Streaming' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Placement Technical Drills & Capstone Engineering',
        objective: 'Timed competitive placement tests, live coding mock interviews, and deploying production capstones.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Final Placement Mock Interviews & Capstone Polish',
            focus: '90-minute timed algorithmic rounds, system architecture whiteboarding, and resume review',
            tasks: [
              { id: 'cse-4-w3-d1', day: 6, title: 'Complete full 90-minute national campus placement assessment simulation', duration: '2 hrs', type: 'Quiz', topic: 'Mock Test' },
              { id: 'cse-4-w3-d2', day: 7, title: 'System design whiteboarding mock: Uber/Ride-Sharing dispatch architecture', duration: '3 hrs', type: 'Theory', topic: 'Mock Interview' },
              { id: 'cse-4-w3-d3', day: 8, title: 'Deploy Final Year Capstone Project with public URL and CI/CD status badge', duration: '4 hrs', type: 'Project', topic: 'Capstone' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'cse-4-p1', title: 'Consistent Hashing Ring Implementation', difficulty: 'Advanced', estimatedTime: '6 hrs', description: 'Implement consistent hashing algorithm in Go / TypeScript with virtual nodes for load balancing.', deliverable: 'ConsistentHash class with test benchmarks.' },
      { id: 'cse-4-p2', title: 'Complete Kubernetes Microservice Helm Chart', difficulty: 'Advanced', estimatedTime: '5 hrs', description: 'Package a multi-tier service into Helm charts with ingress routing, TLS certificates, and secrets.', deliverable: 'Helm chart repo with values.yaml.' },
    ],
    miniProject: {
      title: 'Distributed Log Aggregation & Telemetry Collector',
      description: 'Lightweight daemon that scrapes logs across servers, ships events through Kafka, and indexes metrics into Elasticsearch.',
      technologies: ['Go / Node.js', 'Apache Kafka', 'Elasticsearch', 'Docker'],
    },
    majorProject: {
      title: 'Autonomous Multi-Cloud Kubernetes Orchestration Engine',
      description: 'Production-ready platform providing auto-scaling, dynamic canary traffic routing, and health metric dashboards for container workloads.',
      technologies: ['Kubernetes', 'Go', 'Prometheus', 'Terraform', 'React'],
    },
    recommendedResources: [
      { title: 'The System Design Primer (Complete GitHub Guide)', type: 'Cheat Sheet', provider: 'Donne Martin', url: 'https://github.com/donnemartin/system-design-primer' },
      { title: 'Designing Data-Intensive Applications (DDIA Notes)', type: 'Article', provider: 'Martin Kleppmann', url: 'https://dataintensive.net' },
      { title: 'Kubernetes Official Interactive Scenarios & Katacoda', type: 'Practice', provider: 'CNCF', url: 'https://kubernetes.io/docs/tutorials/' },
    ],
  },
};

// ---------------------------------------------------------------------------------
// 2. ISE ROADMAPS (1st Year, 2nd Year, 3rd Year, 4th Year)
// ---------------------------------------------------------------------------------
const iseRoadmaps: Record<AcademicYear, CourseSpecificRoadmap> = {
  '1st Year': {
    branch: 'ISE',
    year: '1st Year',
    title: 'ISE Year 1: Programming Fundamentals & Information Systems',
    semesters: 'Semesters 1 & 2',
    coreCurriculumTopics: ['C Programming', 'Python', 'Mathematics', 'Computer Fundamentals'],
    keyHighlights: 'Master basic programming paradigms, discrete math, data representations, and Unix shell fundamentals.',
    levels: [
      {
        level: 'Beginner',
        title: 'Foundational C & Logic Development',
        objective: 'Construct clean algorithms, manage pointers, and understand computer architecture fundamentals.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Computer Organization & C Programming',
            focus: 'Binary representations, memory architectures, and ANSI C programming primitives',
            tasks: [
              { id: 'ise-1-w1-d1', day: 1, title: 'Number systems, binary two’s complement & memory endianness', duration: '2 hrs', type: 'Theory', topic: 'Fundamentals' },
              { id: 'ise-1-w1-d2', day: 2, title: 'Write C programs for modular mathematical computations', duration: '2.5 hrs', type: 'Practice', topic: 'C Coding' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Python for Information Systems',
        objective: 'Automate repetitive tasks, manipulate JSON/CSV data files, and write Python scripts.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Python Scripting & Structured File Handling',
            focus: 'Data parsing, regular expressions, and modular programming',
            tasks: [
              { id: 'ise-1-w2-d1', day: 3, title: 'Python string processing and regular expressions (re module)', duration: '2.5 hrs', type: 'Practice', topic: 'Regex' },
              { id: 'ise-1-w2-d2', day: 4, title: 'Read and write JSON/CSV files with automated schema verification', duration: '2 hrs', type: 'Practice', topic: 'File I/O' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Discrete Mathematics & Algorithmic Problem Solving',
        objective: 'Master set theory, graph relations, Boolean logic, and asymptotic complexity.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Discrete Mathematics & Big-O Notation',
            focus: 'Propositional logic, recurrence relations, and sorting efficiency',
            tasks: [
              { id: 'ise-1-w3-d1', day: 5, title: 'Solve Boolean logic simplifications with Karnaugh Maps', duration: '2 hrs', type: 'Theory', topic: 'Math' },
              { id: 'ise-1-w3-d2', day: 6, title: 'Implement Bubble, Selection, and Insertion sorts with operation counts', duration: '3 hrs', type: 'Practice', topic: 'Sorting' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'ise-1-p1', title: 'Automated CSV Student Record Normalizer', difficulty: 'Beginner', estimatedTime: '3 hrs', description: 'Write a Python utility that cleans corrupted CSV rosters and validates email domains.', deliverable: 'Python script clean_roster.py' },
    ],
    miniProject: {
      title: 'Terminal-Based Library Information Catalog',
      description: 'Structured C application managing book ISBNs, borrower records, and date overdue fee calculations.',
      technologies: ['C Programming', 'File Storage', 'Structs'],
    },
    majorProject: {
      title: 'Automated Information Extraction & Report Engine',
      description: 'Python system parsing messy text dumps, summarizing key metrics into formatted Markdown and HTML reports.',
      technologies: ['Python 3', 'Regex', 'Data Parsing'],
    },
    recommendedResources: [
      { title: 'Harvard CS50: Introduction to Computer Science', type: 'Video', provider: 'edX / Harvard', url: 'https://cs50.harvard.edu' },
      { title: 'Automate the Boring Stuff with Python', type: 'Article', provider: 'Al Sweigart', url: 'https://automatetheboringstuff.com' },
    ],
  },

  '2nd Year': {
    branch: 'ISE',
    year: '2nd Year',
    title: 'ISE Year 2: Data Structures, Databases & Web Development',
    semesters: 'Semesters 3 & 4',
    coreCurriculumTopics: ['Java', 'OOP', 'DSA', 'DBMS', 'Web Development'],
    keyHighlights: 'Master enterprise Java, trees, graph algorithms, SQL transactions, and interactive web application frontends.',
    levels: [
      {
        level: 'Beginner',
        title: 'Object-Oriented Java & Core Data Structures',
        objective: 'Implement Stacks, Queues, Binary Trees, and Hash Tables using robust OOP principles.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Enterprise Java OOP & Collections',
            focus: 'Classes, encapsulation, interfaces, generics, and List/Set/Map interfaces',
            tasks: [
              { id: 'ise-2-w1-d1', day: 1, title: 'Java collections framework deep dive (ArrayList, LinkedList, HashMap)', duration: '2.5 hrs', type: 'Theory', topic: 'Java' },
              { id: 'ise-2-w1-d2', day: 2, title: 'Implement Binary Search Tree with search, insertion, and deletion', duration: '3 hrs', type: 'Practice', topic: 'Trees' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Relational DBMS & Query Optimization',
        objective: 'Design normalized SQL databases, write complex multi-table JOINs, and enforce integrity constraints.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: SQL Architecture & ACID Concurrency',
            focus: 'Foreign keys, cascading updates, transactions, and indexing strategies',
            tasks: [
              { id: 'ise-2-w2-d1', day: 3, title: 'Design database schema for an e-commerce platform in 3NF', duration: '2.5 hrs', type: 'Practice', topic: 'Database Design' },
              { id: 'ise-2-w2-d2', day: 4, title: 'Practice 15 complex SQL queries on LeetCode / HackerRank', duration: '3 hrs', type: 'Practice', topic: 'SQL' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Full-Stack Web Engineering',
        objective: 'HTML5, modern CSS, JavaScript DOM manipulation, and building RESTful Node backends.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Interactive Web Portals & REST APIs',
            focus: 'Frontend state, fetch APIs, Express server routes, and JSON communication',
            tasks: [
              { id: 'ise-2-w3-d1', day: 5, title: 'Build modern responsive client with HTML5, CSS Flexbox/Grid, and vanilla JS', duration: '3 hrs', type: 'Practice', topic: 'Frontend' },
              { id: 'ise-2-w3-d2', day: 6, title: 'Build Node.js/Express API connected to PostgreSQL via pg-promise / Prisma', duration: '3.5 hrs', type: 'Project', topic: 'Full Stack' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'ise-2-p1', title: 'In-Memory Generic LRU Cache in Java', difficulty: 'Intermediate', estimatedTime: '4 hrs', description: 'Build an LRU cache combining a HashMap and a Doubly Linked List with O(1) get and put.', deliverable: 'LRUCache.java with unit tests.' },
    ],
    miniProject: {
      title: 'Campus Course Registration Portal',
      description: 'Web application allowing students to enroll in elective courses with seat availability validation and prerequisite checks.',
      technologies: ['Java / Node.js', 'PostgreSQL', 'HTML/CSS', 'JavaScript'],
    },
    majorProject: {
      title: 'Enterprise Multi-Tier Information Management System',
      description: 'Complete web application with role-based access control, analytics charts, and encrypted session authentication.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
    },
    recommendedResources: [
      { title: 'Java Brains: Object-Oriented Design in Java', type: 'Video', provider: 'Java Brains', url: 'https://javabrains.io' },
      { title: 'The Odin Project: Foundations of Web Development', type: 'Practice', provider: 'The Odin Project', url: 'https://theodinproject.com' },
    ],
  },

  '3rd Year': {
    branch: 'ISE',
    year: '3rd Year',
    title: 'ISE Year 3: Networks, Cloud Computing & Full Stack Systems',
    semesters: 'Semesters 5 & 6',
    coreCurriculumTopics: ['Computer Networks', 'Software Engineering', 'Cloud Computing', 'Full Stack Development'],
    keyHighlights: 'Master distributed networks, cloud infrastructure (AWS/GCP), microservices architectures, and software design patterns.',
    levels: [
      {
        level: 'Beginner',
        title: 'Modern Full-Stack Engineering (React & Node.js)',
        objective: 'Construct responsive TypeScript web applications consuming secure backend microservices.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Modern Single-Page Architectures',
            focus: 'React state hooks, component lifecycles, and type-safe API consumption',
            tasks: [
              { id: 'ise-3-w1-d1', day: 1, title: 'React 19 hooks: useState, useEffect, useMemo & custom hooks', duration: '3 hrs', type: 'Practice', topic: 'React' },
              { id: 'ise-3-w1-d2', day: 2, title: 'Implement JWT authentication flow with refresh tokens & secure cookies', duration: '3 hrs', type: 'Practice', topic: 'Auth' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Computer Networks & Enterprise Software Architecture',
        objective: 'Network layer routing, TCP flow control, Agile software sprints, and design patterns.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Networking Protocols & Design Patterns',
            focus: 'TCP/IP socket communication, Factory, Singleton, and Observer design patterns',
            tasks: [
              { id: 'ise-3-w2-d1', day: 3, title: 'Implement Observer and Factory design patterns in an enterprise app', duration: '2.5 hrs', type: 'Practice', topic: 'Patterns' },
              { id: 'ise-3-w2-d2', day: 4, title: 'Socket programming: Build multi-client TCP server in Java / Node', duration: '3 hrs', type: 'Practice', topic: 'Sockets' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Cloud Computing Infrastructure & Virtualization',
        objective: 'Docker containers, AWS cloud services (EC2, S3, RDS, Lambda), and serverless architectures.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Cloud Deployment & Container Orchestration',
            focus: 'Containerizing services, deploying on cloud instances, and monitoring latency',
            tasks: [
              { id: 'ise-3-w3-d1', day: 5, title: 'Containerize multi-tier web application using Docker & Docker Compose', duration: '3 hrs', type: 'Practice', topic: 'Docker' },
              { id: 'ise-3-w3-d2', day: 6, title: 'Deploy full-stack app to AWS with automated SSL/TLS certificates', duration: '3.5 hrs', type: 'Project', topic: 'AWS' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'ise-3-p1', title: 'Multi-Room WebSocket Collaboration Server', difficulty: 'Intermediate', estimatedTime: '5 hrs', description: 'Build an interactive collaborative whiteboard server handling real-time JSON stroke broadcasts.', deliverable: 'Node.js server with live browser demo.' },
    ],
    miniProject: {
      title: 'Cloud-Based Secure File Vault',
      description: 'Web application encrypting user files client-side before uploading directly to AWS S3 buckets with presigned URLs.',
      technologies: ['React', 'AWS S3', 'CryptoJS', 'Node.js'],
    },
    majorProject: {
      title: 'Scalable Hospital Management & Telemedicine System',
      description: 'Full-stack enterprise application with doctor appointment slots, real-time video consult integration, and billing reports.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'WebRTC'],
    },
    recommendedResources: [
      { title: 'AWS Cloud Practitioner & Solutions Architect Fundamentals', type: 'Video', provider: 'AWS Training', url: 'https://aws.amazon.com/training/' },
      { title: 'Refactoring Guru: Design Patterns Interactive Guide', type: 'Cheat Sheet', provider: 'Refactoring Guru', url: 'https://refactoring.guru' },
    ],
  },

  '4th Year': {
    branch: 'ISE',
    year: '4th Year',
    title: 'ISE Year 4: System Design, DevOps & Advanced Databases',
    semesters: 'Semesters 7 & 8',
    coreCurriculumTopics: ['System Design', 'DevOps', 'Advanced Database Systems', 'Placement Preparation', 'Projects'],
    keyHighlights: 'Master NoSQL distributed stores, CI/CD automation, system scalability whiteboarding, and technical placement tests.',
    levels: [
      {
        level: 'Beginner',
        title: 'Advanced Database Systems (NoSQL & Distributed Stores)',
        objective: 'MongoDB document stores, Cassandra wide-column stores, Redis caching, and CAP tradeoffs.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Distributed Databases & In-Memory Caching',
            focus: 'Document modeling, sharding keys, eventual consistency, and Redis caching',
            tasks: [
              { id: 'ise-4-w1-d1', day: 1, title: 'Compare Relational vs Document NoSQL for high-write analytics', duration: '2.5 hrs', type: 'Theory', topic: 'NoSQL' },
              { id: 'ise-4-w1-d2', day: 2, title: 'Implement Redis Cache-Aside pattern for an existing API endpoint', duration: '3 hrs', type: 'Practice', topic: 'Redis' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'System Design & DevOps Automation',
        objective: 'Scalable system design, load balancing, GitHub Actions CI/CD pipelines, and Kubernetes.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Scalable Architecture & CI/CD Pipelines',
            focus: 'Horizontal scaling, message brokers, and automated zero-downtime deployment',
            tasks: [
              { id: 'ise-4-w2-d1', day: 3, title: 'Design high-scale Notification Service delivering SMS, Email & Push', duration: '3 hrs', type: 'Theory', topic: 'System Design' },
              { id: 'ise-4-w2-d2', day: 4, title: 'Set up GitHub Actions to run automated testing & build Docker containers', duration: '2.5 hrs', type: 'Practice', topic: 'DevOps' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Placement Preparation & Major Capstone Deployment',
        objective: 'Placement mock assessments, technical whiteboarding, and production capstone launch.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Placement Assessments & Capstone Delivery',
            focus: 'Timed placement test simulations, behavioral rounds, and project defense',
            tasks: [
              { id: 'ise-4-w3-d1', day: 5, title: 'Complete comprehensive aptitude and technical placement mock test', duration: '2 hrs', type: 'Quiz', topic: 'Placement' },
              { id: 'ise-4-w3-d2', day: 6, title: 'Finalize and deploy major capstone project with architectural documentation', duration: '4 hrs', type: 'Project', topic: 'Major Project' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'ise-4-p1', title: 'Distributed Task Queue with Redis Streams', difficulty: 'Advanced', estimatedTime: '5 hrs', description: 'Build an idempotent distributed task consumer with exponential backoff retries.', deliverable: 'Node / Python worker service code.' },
    ],
    miniProject: {
      title: 'Automated CI/CD DevOps Pipeline for Web Apps',
      description: 'End-to-end continuous integration workflow executing unit tests, building Docker images, and deploying to cloud VMs.',
      technologies: ['GitHub Actions', 'Docker', 'Linux', 'AWS'],
    },
    majorProject: {
      title: 'Distributed Enterprise Resource Planning (ERP) Platform',
      description: 'Full-scale cloud-native ERP handling multi-warehouse inventories, automated invoicing, and role-based analytics.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    },
    recommendedResources: [
      { title: 'System Design Primer', type: 'Cheat Sheet', provider: 'GitHub Open Source', url: 'https://github.com/donnemartin/system-design-primer' },
      { title: 'DevOps Roadmap & Best Practices Guide', type: 'Article', provider: 'Roadmap.sh', url: 'https://roadmap.sh/devops' },
    ],
  },
};

// ---------------------------------------------------------------------------------
// 3. AI & DS ROADMAPS (1st Year, 2nd Year, 3rd Year, 4th Year)
// ---------------------------------------------------------------------------------
const aidsRoadmaps: Record<AcademicYear, CourseSpecificRoadmap> = {
  '1st Year': {
    branch: 'AI & DS',
    year: '1st Year',
    title: 'AI & DS Year 1: Python, Mathematics & Statistical Foundations',
    semesters: 'Semesters 1 & 2',
    coreCurriculumTopics: ['Python', 'Mathematics', 'Statistics', 'Programming Fundamentals'],
    keyHighlights: 'Master NumPy vectorization, linear algebra matrices, probability concepts, and writing algorithmic Python code.',
    levels: [
      {
        level: 'Beginner',
        title: 'Python for Scientific Computing',
        objective: 'Variables, loops, functions, NumPy array manipulation, and fast vectorized operations.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Python Mastery & NumPy Vectorization',
            focus: 'Array broadcasting, linear indexing, slicing, and matrix algebra',
            tasks: [
              { id: 'aids-1-w1-d1', day: 1, title: 'Python fundamentals: Functions, generators & list comprehensions', duration: '2 hrs', type: 'Practice', topic: 'Python' },
              { id: 'aids-1-w1-d2', day: 2, title: 'NumPy arrays vs Python lists: Memory layout & vectorized math', duration: '2.5 hrs', type: 'Practice', topic: 'NumPy' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Linear Algebra & Calculus for Data Science',
        objective: 'Vectors, matrix multiplications, eigenvalues/eigenvectors, and partial derivatives.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Matrices, Vectors & Gradients',
            focus: 'Dot products, determinants, matrix inversions, and gradient vectors',
            tasks: [
              { id: 'aids-1-w2-d1', day: 3, title: 'Implement matrix multiplication from scratch and verify with np.dot', duration: '2.5 hrs', type: 'Practice', topic: 'Linear Algebra' },
              { id: 'aids-1-w2-d2', day: 4, title: 'Compute partial derivatives and gradient descent steps numerically', duration: '3 hrs', type: 'Theory', topic: 'Calculus' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Descriptive & Inferential Statistics',
        objective: 'Mean, variance, standard deviation, normal distributions, and Central Limit Theorem.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Probability Distributions & Statistical Simulations',
            focus: 'Binomial, Poisson, Gaussian distributions, and random sampling simulations',
            tasks: [
              { id: 'aids-1-w3-d1', day: 5, title: 'Simulate Central Limit Theorem using 10,000 synthetic random samples', duration: '2.5 hrs', type: 'Practice', topic: 'Statistics' },
              { id: 'aids-1-w3-d2', day: 6, title: 'Compute Pearson correlation and covariance matrices for tabular data', duration: '2 hrs', type: 'Practice', topic: 'Correlation' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'aids-1-p1', title: 'Vectorized Gradient Descent Algorithm', difficulty: 'Beginner', estimatedTime: '4 hrs', description: 'Implement batch gradient descent for 1D linear regression without using scikit-learn.', deliverable: 'Jupyter notebook with convergence loss curve.' },
    ],
    miniProject: {
      title: 'Statistical Survey Analyzer in Python',
      description: 'Script calculating summary statistics, skewness, kurtosis, and outlier detection using IQR on student survey data.',
      technologies: ['Python', 'NumPy', 'SciPy'],
    },
    majorProject: {
      title: 'Interactive Statistical Simulation & Distribution Tool',
      description: 'Python GUI / Web tool allowing users to tweak parameters of normal, binomial, and Poisson curves in real time.',
      technologies: ['Python', 'Streamlit', 'Matplotlib', 'NumPy'],
    },
    recommendedResources: [
      { title: '3Blue1Brown: Essence of Linear Algebra (Video Series)', type: 'Video', provider: '3Blue1Brown', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab' },
      { title: 'StatQuest with Josh Starmer: Statistics Fundamentals', type: 'Video', provider: 'StatQuest', url: 'https://statquest.org' },
    ],
  },

  '2nd Year': {
    branch: 'AI & DS',
    year: '2nd Year',
    title: 'AI & DS Year 2: Data Structures, SQL, Probability & EDA',
    semesters: 'Semesters 3 & 4',
    coreCurriculumTopics: ['Data Structures', 'SQL', 'Probability', 'Data Analysis', 'Data Visualization'],
    keyHighlights: 'Master Pandas DataFrame wrangling, exploratory data analysis, Seaborn/Plotly charts, Bayes Theorem, and SQL aggregations.',
    levels: [
      {
        level: 'Beginner',
        title: 'Data Structures for Analytics',
        objective: 'Hash maps, binary trees, priority queues, and algorithmic complexity for data pipelines.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Algorithmic Structures in Python',
            focus: 'Binary Search Trees, Heaps, and graph adjacency structures',
            tasks: [
              { id: 'aids-2-w1-d1', day: 1, title: 'Implement Priority Queue and Min-Heap for streaming top-k statistics', duration: '2.5 hrs', type: 'Practice', topic: 'Data Structures' },
              { id: 'aids-2-w1-d2', day: 2, title: 'Hash map collisions and optimizing O(1) feature lookups', duration: '2 hrs', type: 'Practice', topic: 'Hash Maps' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'SQL & Relational Data Wrangling',
        objective: 'Complex SQL queries, window functions, CTEs, and relational database schema design.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Advanced SQL & Data Extraction',
            focus: 'Window functions (RANK, ROW_NUMBER), GROUP BY ROLLUP, and subqueries',
            tasks: [
              { id: 'aids-2-w2-d1', day: 3, title: 'Write advanced analytical queries on retail transactional schemas', duration: '3 hrs', type: 'Practice', topic: 'SQL Analytics' },
              { id: 'aids-2-w2-d2', day: 4, title: 'Design database schema for multimodal sensor logs with indexing', duration: '2 hrs', type: 'Practice', topic: 'Schema Design' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Pandas Data Analysis & Visualization',
        objective: 'Handling missing values, outlier treatment, feature encoding, and interactive dashboards.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Exploratory Data Analysis & Visual Storytelling',
            focus: 'Pandas groupby, pivot tables, Seaborn heatmaps, and interactive Plotly figures',
            tasks: [
              { id: 'aids-2-w3-d1', day: 5, title: 'Clean real-world messy dataset: Impute nulls, normalize datetimes & cast types', duration: '3 hrs', type: 'Practice', topic: 'Pandas' },
              { id: 'aids-2-w3-d2', day: 6, title: 'Generate correlation matrices, box plots, and distribution histograms', duration: '2.5 hrs', type: 'Project', topic: 'Visualization' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'aids-2-p1', title: 'Complete EDA on Campus Placement Dataset', difficulty: 'Intermediate', estimatedTime: '5 hrs', description: 'Analyze CGPA, branches, and placement CTCs to produce statistical insights and interactive charts.', deliverable: 'Annotated Jupyter notebook with observations.' },
    ],
    miniProject: {
      title: 'Interactive Sales & Churn Analytics Dashboard',
      description: 'Streamlit dashboard connected to SQLite database visualizing revenue trends, cohort retentions, and customer segments.',
      technologies: ['Python', 'Pandas', 'Plotly', 'Streamlit'],
    },
    majorProject: {
      title: 'Automated Tabular Data Profiler & Cleaning Engine',
      description: 'Automated tool taking arbitrary CSV uploads, identifying data types, highlighting anomalies, and generating downloadable clean datasets.',
      technologies: ['Python', 'Pandas', 'Seaborn', 'FastAPI'],
    },
    recommendedResources: [
      { title: 'Pandas Official Documentation & Cookbooks', type: 'Documentation', provider: 'Pandas Dev Team', url: 'https://pandas.pydata.org/docs/' },
      { title: 'Kaggle: Learn Data Cleaning & Feature Engineering', type: 'Practice', provider: 'Kaggle', url: 'https://www.kaggle.com/learn' },
    ],
  },

  '3rd Year': {
    branch: 'AI & DS',
    year: '3rd Year',
    title: 'AI & DS Year 3: Machine Learning, Deep Learning, NLP & AI Tools',
    semesters: 'Semesters 5 & 6',
    coreCurriculumTopics: ['Machine Learning', 'Deep Learning', 'Data Science', 'NLP', 'AI Tools'],
    keyHighlights: 'Master Scikit-Learn, PyTorch neural networks, CNN computer vision, transformer NLP architectures, and evaluation metrics.',
    levels: [
      {
        level: 'Beginner',
        title: 'Supervised & Unsupervised Machine Learning',
        objective: 'Linear/Logistic Regression, Decision Trees, Random Forests, SVM, K-Means clustering, and ROC-AUC metrics.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Classical Machine Learning with Scikit-Learn',
            focus: 'Bias-Variance tradeoff, cross-validation, regularization (L1/L2), and model evaluation',
            tasks: [
              { id: 'aids-3-w1-d1', day: 1, title: 'Train and tune Random Forest classifier with GridSearchCV', duration: '3 hrs', type: 'Practice', topic: 'Machine Learning' },
              { id: 'aids-3-w1-d2', day: 2, title: 'Evaluate models using Confusion Matrix, Precision, Recall & F1-score', duration: '2.5 hrs', type: 'Practice', topic: 'Metrics' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Deep Learning & Neural Networks with PyTorch',
        objective: 'Multi-layer perceptrons, backpropagation gradients, activation functions, and CNNs for computer vision.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: PyTorch Architecture & Convolutional Neural Networks',
            focus: 'Tensors, autograd, torch.nn layers, optimizers (Adam), and CNN image classification',
            tasks: [
              { id: 'aids-3-w2-d1', day: 3, title: 'Build feedforward neural network from scratch in PyTorch with GPU cuda', duration: '3 hrs', type: 'Practice', topic: 'PyTorch' },
              { id: 'aids-3-w2-d2', day: 4, title: 'Train CNN on CIFAR-10 dataset achieving 85%+ validation accuracy', duration: '3.5 hrs', type: 'Practice', topic: 'Computer Vision' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Natural Language Processing & Modern AI Tools',
        objective: 'Tokenization, TF-IDF, Word2Vec, HuggingFace transformers, BERT, and modern AI tool integrations.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Transformers, Embeddings & Text Classification',
            focus: 'Self-attention mechanism, fine-tuning Hugging Face transformers, and sentiment analysis',
            tasks: [
              { id: 'aids-3-w3-d1', day: 5, title: 'Fine-tune DistilBERT for multi-class customer review sentiment classification', duration: '3.5 hrs', type: 'Practice', topic: 'NLP' },
              { id: 'aids-3-w3-d2', day: 6, title: 'Generate vector embeddings and perform nearest-neighbor semantic search', duration: '3 hrs', type: 'Project', topic: 'Embeddings' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'aids-3-p1', title: 'Medical X-Ray Pneumonia Classifier using ResNet', difficulty: 'Advanced', estimatedTime: '6 hrs', description: 'Apply transfer learning with pretrained ResNet50 to classify chest X-ray images with data augmentation.', deliverable: 'PyTorch script and ROC-AUC curve.' },
    ],
    miniProject: {
      title: 'Intelligent Resume Parsing & Skill Extraction Engine',
      description: 'NLP application parsing PDF resumes, extracting entities (skills, experience, college) using spaCy and BERT embeddings.',
      technologies: ['Python', 'spaCy', 'Hugging Face', 'Streamlit'],
    },
    majorProject: {
      title: 'Multimodal Autonomous Traffic Sign & Hazard Detection System',
      description: 'Real-time computer vision system running YOLOv8 object detection on dashboard camera feeds to identify road hazards.',
      technologies: ['Python', 'PyTorch', 'OpenCV', 'YOLOv8', 'FastAPI'],
    },
    recommendedResources: [
      { title: 'DeepLearning.AI: Deep Learning Specialization Notes', type: 'Article', provider: 'Andrew Ng', url: 'https://www.deeplearning.ai' },
      { title: 'Hugging Face NLP Course (Free & Interactive)', type: 'Practice', provider: 'Hugging Face', url: 'https://huggingface.co/learn/nlp-course' },
    ],
  },

  '4th Year': {
    branch: 'AI & DS',
    year: '4th Year',
    title: 'AI & DS Year 4: Advanced ML, Generative AI, MLOps & Capstone',
    semesters: 'Semesters 7 & 8',
    coreCurriculumTopics: ['Advanced Machine Learning', 'Generative AI', 'MLOps', 'Real-World AI Projects', 'Placement Preparation'],
    keyHighlights: 'Master Large Language Models (LLMs), RAG pipelines, model quantization, MLflow experiment tracking, Dockerized model deployment, and placement mock rounds.',
    levels: [
      {
        level: 'Beginner',
        title: 'Generative AI, RAG & Vector Databases',
        objective: 'Retrieval-Augmented Generation (RAG), vector similarity search (Chroma/FAISS), prompt engineering, and LLM orchestration.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Enterprise RAG Architecture',
            focus: 'Document chunking, vector stores (FAISS/ChromaDB), embedding models, and grounded generation',
            tasks: [
              { id: 'aids-4-w1-d1', day: 1, title: 'Build local RAG system querying technical PDF engineering documentation', duration: '3.5 hrs', type: 'Practice', topic: 'RAG' },
              { id: 'aids-4-w1-d2', day: 2, title: 'Evaluate hallucination rates and answer relevance using RAGAS framework', duration: '2.5 hrs', type: 'Theory', topic: 'Evaluation' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'MLOps: Experiment Tracking & Model Serving',
        objective: 'Model versioning with MLflow, containerizing models with Docker, writing FastAPI inference APIs, and latency optimization.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Production Model Serving & Monitoring',
            focus: 'MLflow registry, FastAPI async endpoints, batch inference, and model drift detection',
            tasks: [
              { id: 'aids-4-w2-d1', day: 3, title: 'Track hyperparameter runs and register optimal model artifact with MLflow', duration: '3 hrs', type: 'Practice', topic: 'MLOps' },
              { id: 'aids-4-w2-d2', day: 4, title: 'Deploy high-throughput FastAPI inference server in a multi-stage Docker container', duration: '3 hrs', type: 'Practice', topic: 'Model Serving' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Placement Technical Drills & Capstone Delivery',
        objective: 'Timed coding rounds, statistics whiteboard mock interviews, and final year AI research capstone project.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Final Placement Mock Interviews & Capstone Launch',
            focus: 'Campus placement technical rounds, ML architecture design, and capstone presentation',
            tasks: [
              { id: 'aids-4-w3-d1', day: 5, title: 'Complete full-length campus placement coding and analytical assessment', duration: '2 hrs', type: 'Quiz', topic: 'Placement' },
              { id: 'aids-4-w3-d2', day: 6, title: 'Finalize and benchmark Major Capstone Project with live demonstration', duration: '4 hrs', type: 'Project', topic: 'Capstone' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'aids-4-p1', title: 'End-to-End MLOps Pipeline with Drift Alerts', difficulty: 'Advanced', estimatedTime: '6 hrs', description: 'Build automated pipeline that retrains an ML classifier when data distribution shifts beyond threshold.', deliverable: 'FastAPI service + Evidently AI monitoring report.' },
    ],
    miniProject: {
      title: 'Domain-Specific RAG Knowledge Assistant',
      description: 'Production-ready question answering system indexing engineering textbooks with source citations and vector search.',
      technologies: ['Python', 'ChromaDB', 'LangChain', 'FastAPI', 'React'],
    },
    majorProject: {
      title: 'Autonomous Multimodal Medical Diagnosis Platform',
      description: 'Enterprise AI system analyzing patient electronic health records and medical chest CT scans with calibrated confidence scores.',
      technologies: ['PyTorch', 'Transformers', 'FastAPI', 'Docker', 'MLflow', 'React'],
    },
    recommendedResources: [
      { title: 'Made With ML: Production MLOps Course', type: 'Practice', provider: 'Goku Mohandas', url: 'https://madewithml.com' },
      { title: 'LangChain & Vector Database RAG Playbook', type: 'Documentation', provider: 'LangChain', url: 'https://python.langchain.com' },
    ],
  },
};

// ---------------------------------------------------------------------------------
// 4. ECE ROADMAPS (1st Year, 2nd Year, 3rd Year, 4th Year)
// ---------------------------------------------------------------------------------
const eceRoadmaps: Record<AcademicYear, CourseSpecificRoadmap> = {
  '1st Year': {
    branch: 'ECE',
    year: '1st Year',
    title: 'ECE Year 1: Basic Electronics, C & Engineering Physics',
    semesters: 'Semesters 1 & 2',
    coreCurriculumTopics: ['Basic Electronics', 'C Programming', 'Mathematics', 'Physics'],
    keyHighlights: 'Master semiconductor diodes, BJT transistors, Kirchhoff laws, oscilloscopes, and C programming for embedded logic.',
    levels: [
      {
        level: 'Beginner',
        title: 'Semiconductors, Diodes & DC Circuits',
        objective: 'P-N junction physics, rectifiers, Ohm’s Law, Kirchhoff’s Current/Voltage Laws, and circuit breadboarding.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Semiconductor Physics & Circuit Fundamentals',
            focus: 'Diode I-V characteristics, half-wave/full-wave rectifiers, and Zener regulators',
            tasks: [
              { id: 'ece-1-w1-d1', day: 1, title: 'Analyze P-N junction forward and reverse bias characteristics in lab simulator', duration: '2 hrs', type: 'Theory', topic: 'Semiconductors' },
              { id: 'ece-1-w1-d2', day: 2, title: 'Simulate full-wave bridge rectifier with capacitor filter in LTspice', duration: '2.5 hrs', type: 'Practice', topic: 'Simulation' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'BJT Transistors & Analog Amplifiers',
        objective: 'Common Emitter configurations, transistor biasing, load lines, and small-signal amplification.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Bipolar Junction Transistors (BJT)',
            focus: 'Cutoff, active, and saturation operating regions of NPN transistors',
            tasks: [
              { id: 'ece-1-w2-d1', day: 3, title: 'Calculate Q-point biasing resistors for Common-Emitter amplifier', duration: '2.5 hrs', type: 'Theory', topic: 'Transistors' },
              { id: 'ece-1-w2-d2', day: 4, title: 'Measure voltage gain and frequency cutoff using oscilloscope', duration: '2 hrs', type: 'Practice', topic: 'Lab Work' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'C Programming for Hardware Registers',
        objective: 'Bitwise operators (&, |, ^, ~, <<, >>), bit masks, and simulating hardware registers.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Bit Manipulation in C',
            focus: 'Setting, clearing, and toggling specific bits in 8-bit/32-bit registers',
            tasks: [
              { id: 'ece-1-w3-d1', day: 5, title: 'Write bitwise macro utilities: SET_BIT, CLEAR_BIT, TOGGLE_BIT', duration: '2 hrs', type: 'Practice', topic: 'Bitwise C' },
              { id: 'ece-1-w3-d2', day: 6, title: 'Simulate micro-controller GPIO input/output status register flags in C', duration: '3 hrs', type: 'Project', topic: 'Hardware Emulation' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'ece-1-p1', title: 'Regulated 5V DC Power Supply Design in LTspice', difficulty: 'Beginner', estimatedTime: '3 hrs', description: 'Design step-down transformer circuit, diode rectifier, filter capacitor, and 7805 regulator.', deliverable: 'LTspice schematic with output voltage ripple analysis.' },
    ],
    miniProject: {
      title: 'Automatic Night Lamp Circuit using LDR & BJT',
      description: 'Breadboard circuit that senses ambient darkness through a photoresistor and switches high-brightness LEDs via transistor switching.',
      technologies: ['Analog Electronics', 'BJT', 'Sensors', 'Breadboarding'],
    },
    majorProject: {
      title: 'Programmable 8-Channel LED Chaser with Bitwise C',
      description: 'C firmware simulating multiple pattern sequences on an 8-LED port with variable delay intervals.',
      technologies: ['C Programming', 'Bitwise Registers', 'Simulation'],
    },
    recommendedResources: [
      { title: 'All About Circuits: Electronic Textbooks', type: 'Documentation', provider: 'All About Circuits', url: 'https://www.allaboutcircuits.com/textbook/' },
      { title: 'LTspice Free Circuit Simulator & Tutorials', type: 'Practice', provider: 'Analog Devices', url: 'https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html' },
    ],
  },

  '2nd Year': {
    branch: 'ECE',
    year: '2nd Year',
    title: 'ECE Year 2: Digital Electronics, Analog Circuits & Signals',
    semesters: 'Semesters 3 & 4',
    coreCurriculumTopics: ['Digital Electronics', 'Analog Circuits', 'Signals and Systems', 'Network Theory'],
    keyHighlights: 'Master logic gates, Flip-Flops, FSM state machines, Op-Amps, Fourier transforms, and two-port network theorems.',
    levels: [
      {
        level: 'Beginner',
        title: 'Combinational & Sequential Digital Logic',
        objective: 'K-maps, multiplexers, decoders, JK/D Flip-flops, shift registers, and synchronous counters.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Digital Logic & Flip-Flops',
            focus: 'Boolean algebra simplification, timing diagrams, setup/hold times',
            tasks: [
              { id: 'ece-2-w1-d1', day: 1, title: 'Design synchronous 4-bit Up/Down counter using D Flip-Flops', duration: '3 hrs', type: 'Practice', topic: 'Digital Logic' },
              { id: 'ece-2-w1-d2', day: 2, title: 'Construct Mealy and Moore Finite State Machines (FSM) state diagrams', duration: '2.5 hrs', type: 'Theory', topic: 'FSM Design' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Operational Amplifiers (Op-Amps) & Active Filters',
        objective: 'Inverting/non-inverting amplifiers, differential amps, active Butterworth filters, and Schmitt triggers.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Operational Amplifiers (Op-Amps)',
            focus: 'Virtual ground, feedback loop analysis, CMRR, and slew rate',
            tasks: [
              { id: 'ece-2-w2-d1', day: 3, title: 'Calculate frequency response for 2nd-order active low-pass Butterworth filter', duration: '2.5 hrs', type: 'Practice', topic: 'Op-Amps' },
              { id: 'ece-2-w2-d2', day: 4, title: 'Build Schmitt trigger comparator with hysteresis for noise rejection', duration: '2 hrs', type: 'Practice', topic: 'Comparators' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Signals & Systems: Fourier, Laplace & Convolution',
        objective: 'Continuous & discrete time signals, LTI systems, impulse responses, and frequency domain filtering.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Signals, Transforms & Frequency Response',
            focus: 'Fourier Transform, Laplace s-plane pole-zero stability, and convolution integrals',
            tasks: [
              { id: 'ece-2-w3-d1', day: 5, title: 'Compute continuous convolution integral of rectangular pulses in MATLAB', duration: '2.5 hrs', type: 'Practice', topic: 'Convolution' },
              { id: 'ece-2-w3-d2', day: 6, title: 'Analyze s-plane pole stability and Bode magnitude/phase plots', duration: '3 hrs', type: 'Theory', topic: 'Bode Plots' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'ece-2-p1', title: 'Digital Stopwatch with 7-Segment Displays', difficulty: 'Intermediate', estimatedTime: '5 hrs', description: 'Design combinational BCD to 7-segment decoder and sequential timer circuit.', deliverable: 'Digital schematic simulation in Logisim / Proteus.' },
    ],
    miniProject: {
      title: 'Analog Audio Function Generator with Op-Amps',
      description: 'Op-amp circuit producing Sine, Square, and Triangular waveforms with adjustable frequency and amplitude.',
      technologies: ['Op-Amps (LM741/TL084)', 'Analog Circuits', 'LTspice'],
    },
    majorProject: {
      title: 'Digital Frequency Counter & Signal Analyzer',
      description: 'Hardware counter using digital logic ICs and microcontroller displaying incoming input signal frequency up to 1 MHz.',
      technologies: ['Digital Electronics', 'Counters', '7-Segment Display', 'Microcontrollers'],
    },
    recommendedResources: [
      { title: 'NPTEL: Digital Electronic Circuits by Prof. Goutam Saha', type: 'Video', provider: 'NPTEL / IIT Kharagpur', url: 'https://nptel.ac.in' },
      { title: 'Signals and Systems (Oppenheim & Willsky companion notes)', type: 'Article', provider: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu' },
    ],
  },

  '3rd Year': {
    branch: 'ECE',
    year: '3rd Year',
    title: 'ECE Year 3: Microprocessors, Embedded Systems, Comm & VLSI',
    semesters: 'Semesters 5 & 6',
    coreCurriculumTopics: ['Microprocessors', 'Embedded Systems', 'Communication Systems', 'VLSI Design'],
    keyHighlights: 'Master ARM Cortex / 8051 assembly, FreeRTOS, I2C/SPI protocols, analog/digital modulation (AM/FM/QAM), and Verilog RTL synthesis.',
    levels: [
      {
        level: 'Beginner',
        title: 'Microcontroller Architecture & Embedded C',
        objective: 'GPIO configuration, interrupt service routines (ISR), hardware timers, and PWM generation.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Embedded C Firmware & Peripheral Interfacing',
            focus: 'Timers, external interrupts, ADC conversion, and UART serial communication',
            tasks: [
              { id: 'ece-3-w1-d1', day: 1, title: 'Configure hardware timer interrupts for precise 10ms periodic tasks in C', duration: '3 hrs', type: 'Practice', topic: 'Timers & ISR' },
              { id: 'ece-3-w1-d2', day: 2, title: 'Implement UART bidirectional serial transmission with circular ring buffer', duration: '3.5 hrs', type: 'Practice', topic: 'UART Communication' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Communication Systems & Modulation Techniques',
        objective: 'AM, FM, Phase-Locked Loops (PLL), PCM sampling, Nyquist criteria, and QAM digital modulations.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Digital Modulation & Spectral Analysis',
            focus: 'BPSK, QPSK, Constellation diagrams, Signal-to-Noise Ratio (SNR), and Bit Error Rates',
            tasks: [
              { id: 'ece-3-w2-d1', day: 3, title: 'Simulate BPSK and QPSK modulation with AWGN noise in MATLAB/Python', duration: '3 hrs', type: 'Practice', topic: 'Modulation' },
              { id: 'ece-3-w2-d2', day: 4, title: 'Analyze spectrum analyzer Fourier plots and bandwidth efficiencies', duration: '2.5 hrs', type: 'Theory', topic: 'Spectral Analysis' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Digital VLSI Design with Verilog HDL',
        objective: 'RTL modeling, testbenches, behavioral synthesis, FPGA programming, and timing closure.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Verilog HDL & FPGA Synthesis',
            focus: 'Blocking vs non-blocking assignments, pipelined ALUs, and Vivado synthesis',
            tasks: [
              { id: 'ece-3-w3-d1', day: 5, title: 'Write parameterized 32-bit Arithmetic Logic Unit (ALU) in Verilog', duration: '3.5 hrs', type: 'Practice', topic: 'Verilog' },
              { id: 'ece-3-w3-d2', day: 6, title: 'Write comprehensive Verilog testbench and inspect ModelSim waveforms', duration: '3 hrs', type: 'Project', topic: 'Simulation' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'ece-3-p1', title: 'I2C OLED Display & Sensor Driver in Embedded C', difficulty: 'Intermediate', estimatedTime: '5 hrs', description: 'Write bare-metal I2C master driver reading temperature sensor and rendering text on SSD1306 OLED.', deliverable: 'Firmware source files with logic analyzer capture.' },
    ],
    miniProject: {
      title: 'Wireless Environmental Sensor Node with NRF24L01 / LoRa',
      description: 'Low-power battery-operated microcontroller node transmitting sensor packets to a base station receiver.',
      technologies: ['Embedded C', 'STM32 / Arduino', 'SPI Protocol', 'RF Transceivers'],
    },
    majorProject: {
      title: 'Pipelined RISC Microprocessor Core on FPGA',
      description: 'Complete 8-bit / 16-bit RISC processor implemented in Verilog featuring instruction fetch, decode, execute, memory, and writeback stages.',
      technologies: ['Verilog HDL', 'Vivado', 'ModelSim', 'Digital Architecture'],
    },
    recommendedResources: [
      { title: 'Embedded Systems with ARM Cortex-M: Valvano Labs', type: 'Video', provider: 'Univ of Texas Austin', url: 'https://users.ece.utexas.edu/~valvano/' },
      { title: 'ASIC World: Verilog HDL Complete Tutorials', type: 'Cheat Sheet', provider: 'ASIC World', url: 'https://www.asic-world.com' },
    ],
  },

  '4th Year': {
    branch: 'ECE',
    year: '4th Year',
    title: 'ECE Year 4: Advanced VLSI, IoT, Wireless & Placement',
    semesters: 'Semesters 7 & 8',
    coreCurriculumTopics: ['Advanced VLSI', 'IoT', 'Wireless Communication', 'Embedded Projects', 'Placement Preparation'],
    keyHighlights: 'Static timing analysis, SystemVerilog verification, LoRaWAN / Cellular IoT, RTOS multi-threading, and core electronics placement mock tests.',
    levels: [
      {
        level: 'Beginner',
        title: 'Real-Time Operating Systems (FreeRTOS) & IoT Gateways',
        objective: 'Task scheduling, mutexes, message queues, MQTT protocol, and connecting edge devices to AWS IoT.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: FreeRTOS & Industrial IoT Protocols',
            focus: 'Preemptive multitasking, semaphores, priority inversion, and MQTT/TLS communication',
            tasks: [
              { id: 'ece-4-w1-d1', day: 1, title: 'Create FreeRTOS tasks with priority scheduling and inter-task queue communications', duration: '3.5 hrs', type: 'Practice', topic: 'RTOS' },
              { id: 'ece-4-w1-d2', day: 2, title: 'Publish telemetry over MQTT to AWS IoT Core with X.509 client certificate authentication', duration: '3 hrs', type: 'Practice', topic: 'IoT Protocols' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Advanced VLSI & Physical Design (STA)',
        objective: 'Clock domain crossing, setup/hold slack, layout DRC/LVS, and SystemVerilog assertions.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Static Timing Analysis & SystemVerilog',
            focus: 'Setup and hold time slack calculation, clock jitter, and constrained-random verification',
            tasks: [
              { id: 'ece-4-w2-d1', day: 3, title: 'Calculate worst-case critical path delay and fix timing violations', duration: '3 hrs', type: 'Theory', topic: 'Timing Analysis' },
              { id: 'ece-4-w2-d2', day: 4, title: 'Write SystemVerilog assertions for a standard AXI / Wishbone bus interface', duration: '3.5 hrs', type: 'Practice', topic: 'Verification' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Core ECE Placement Drills & Major Capstone',
        objective: 'Semiconductor industry interview prep, DSP filtering, and end-to-end embedded capstone.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Placement Assessments & Capstone Delivery',
            focus: 'Hardware coding tests, digital design interview puzzles, and final hardware demonstration',
            tasks: [
              { id: 'ece-4-w3-d1', day: 5, title: 'Complete comprehensive core electronics placement mock test (Digital, Analog, C)', duration: '2 hrs', type: 'Quiz', topic: 'Placement' },
              { id: 'ece-4-w3-d2', day: 6, title: 'Finalize and test hardware capstone prototype with PCB fabrication documents', duration: '4 hrs', type: 'Project', topic: 'Hardware Capstone' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'ece-4-p1', title: 'Complete 2-Layer Custom PCB Layout in KiCAD', difficulty: 'Advanced', estimatedTime: '6 hrs', description: 'Design schematic, footprint assignment, copper routing, and generate Gerber files for an IoT sensor board.', deliverable: 'KiCAD project files and Gerber ZIP archive.' },
    ],
    miniProject: {
      title: 'Smart Energy Meter with LoRaWAN & Cloud Dashboard',
      description: 'Microcontroller board sampling AC voltage and current via ADC, computing true RMS power, and broadcasting via LoRa.',
      technologies: ['Embedded C', 'LoRa SX1276', 'Current Transformers', 'FreeRTOS'],
    },
    majorProject: {
      title: 'Autonomous Mobile Robot with LiDAR SLAM Navigation',
      description: 'Embedded robot navigating mapped indoor terrain using real-time LiDAR sensor fusion, wheel encoders, and ROS 2 middleware.',
      technologies: ['ROS 2', 'Embedded C++', 'STM32', 'LiDAR', 'Motor Drivers'],
    },
    recommendedResources: [
      { title: 'FreeRTOS Official Kernel Documentation & Architecture', type: 'Documentation', provider: 'Amazon FreeRTOS', url: 'https://www.freertos.org' },
      { title: 'ChipVerify: SystemVerilog Verification Tutorial', type: 'Cheat Sheet', provider: 'ChipVerify', url: 'https://www.chipverify.com' },
    ],
  },
};

// ---------------------------------------------------------------------------------
// 5. EEE ROADMAPS (1st Year, 2nd Year, 3rd Year, 4th Year)
// ---------------------------------------------------------------------------------
const eeeRoadmaps: Record<AcademicYear, CourseSpecificRoadmap> = {
  '1st Year': {
    branch: 'EEE',
    year: '1st Year',
    title: 'EEE Year 1: Electrical Fundamentals, Physics & Circuit Principles',
    semesters: 'Semesters 1 & 2',
    coreCurriculumTopics: ['Electrical Fundamentals', 'C Programming', 'Mathematics', 'Physics'],
    keyHighlights: 'Master electric and magnetic circuits, AC waveforms, Thevenin/Norton equivalents, and basic programming.',
    levels: [
      {
        level: 'Beginner',
        title: 'DC & AC Circuit Theorems',
        objective: "Kirchhoff's Laws, Thevenin theorem, Norton theorem, Superposition, and maximum power transfer.",
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Network Theorems & DC Analysis',
            focus: 'Mesh analysis, nodal analysis, and equivalent resistance calculations',
            tasks: [
              { id: 'eee-1-w1-d1', day: 1, title: 'Solve 5 complex bridge circuits using Thevenin and Norton equivalents', duration: '2.5 hrs', type: 'Practice', topic: 'Network Theorems' },
              { id: 'eee-1-w1-d2', day: 2, title: 'Simulate AC sinusoidal steady-state RLC series resonant circuits in MATLAB', duration: '2 hrs', type: 'Practice', topic: 'RLC Resonance' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Electromagnetic Field Theory & Magnetic Circuits',
        objective: "Faraday's laws of induction, Lenz's law, reluctance, permeability, and B-H hysteresis curves.",
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Magnetic Circuits & Inductive Coupling',
            focus: 'Self and mutual inductance, core losses (eddy current and hysteresis)',
            tasks: [
              { id: 'eee-1-w2-d1', day: 3, title: 'Calculate core flux density and winding turns for a step-down magnetic core', duration: '2.5 hrs', type: 'Theory', topic: 'Electromagnetics' },
              { id: 'eee-1-w2-d2', day: 4, title: 'Analyze single-phase transformer equivalent circuit parameters from lab tests', duration: '3 hrs', type: 'Practice', topic: 'Transformers' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'C Programming for Electrical Computations',
        objective: 'Writing C code to compute phasor impedances, power factors, and solve linear circuit matrices.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Numerical Computation of Circuit Phasors',
            focus: 'Complex number structs in C, matrix inversion for nodal voltages',
            tasks: [
              { id: 'eee-1-w3-d1', day: 5, title: 'Build a C utility computing active (kW), reactive (kVAR), and apparent (kVA) power', duration: '2.5 hrs', type: 'Practice', topic: 'Phasor Code' },
              { id: 'eee-1-w3-d2', day: 6, title: 'Solve 3-node linear DC circuit matrix using Gaussian elimination in C', duration: '3 hrs', type: 'Project', topic: 'Matrix Solver' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'eee-1-p1', title: 'Single-Phase Transformer OC & SC Test Analysis', difficulty: 'Beginner', estimatedTime: '4 hrs', description: 'Determine core loss, copper loss, and efficiency curve from open and short circuit experimental data.', deliverable: 'Efficiency and regulation curves plotted in Excel/Python.' },
    ],
    miniProject: {
      title: 'Power Factor Calculation & Indicator System',
      description: 'Microcontroller circuit measuring phase angle difference between AC voltage and current waveforms to calculate power factor.',
      technologies: ['AC Circuits', 'Zero-Crossing Detectors', 'Microcontrollers'],
    },
    majorProject: {
      title: 'Automated DC Load Regulation & Circuit Breaker',
      description: 'Solid-state circuit breaker disconnecting DC loads during overcurrent conditions within 2 milliseconds.',
      technologies: ['Power MOSFETs', 'Current Sensing', 'Analog Comparators'],
    },
    recommendedResources: [
      { title: 'MIT OpenCourseWare: Circuits and Electronics (Prof. Anant Agarwal)', type: 'Video', provider: 'MIT OCW', url: 'https://ocw.mit.edu' },
      { title: 'Electrical4U: Comprehensive Electrical Engineering Guides', type: 'Cheat Sheet', provider: 'Electrical4U', url: 'https://www.electrical4u.com' },
    ],
  },

  '2nd Year': {
    branch: 'EEE',
    year: '2nd Year',
    title: 'EEE Year 2: Electrical Machines, Circuit Theory & Electronics',
    semesters: 'Semesters 3 & 4',
    coreCurriculumTopics: ['Electrical Machines', 'Circuit Theory', 'Analog and Digital Electronics'],
    keyHighlights: 'Master DC motors, 3-phase induction motors, synchronous generators, Op-Amp active filters, and transient analysis.',
    levels: [
      {
        level: 'Beginner',
        title: 'DC Generators & Motors',
        objective: 'Armature reaction, commutation, torque-speed characteristics of series/shunt motors, and speed control methods.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: DC Machines & Ward-Leonard Speed Control',
            focus: 'Back EMF, armature resistance control, field flux weakening, and motor efficiency tests',
            tasks: [
              { id: 'eee-2-w1-d1', day: 1, title: 'Plot torque-speed curves for DC shunt and series motors under varying loads', duration: '2.5 hrs', type: 'Practice', topic: 'DC Motors' },
              { id: 'eee-2-w1-d2', day: 2, title: 'Calculate starting resistance steps for 3-point DC motor starter', duration: '2 hrs', type: 'Theory', topic: 'Starters' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: '3-Phase Induction Motors & Synchronous Machines',
        objective: 'Rotating magnetic field, slip calculation, equivalent circuits, circle diagrams, and V-curves.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: AC Induction Motors & Alternators',
            focus: 'Torque-slip characteristics, synchronous impedance method, and power factor correction',
            tasks: [
              { id: 'eee-2-w2-d1', day: 3, title: 'Analyze slip and rotor frequency at starting, rated load, and no-load', duration: '2 hrs', type: 'Theory', topic: 'Induction Motors' },
              { id: 'eee-2-w2-d2', day: 4, title: 'Simulate 3-phase squirrel cage induction motor starting in MATLAB/Simulink', duration: '3 hrs', type: 'Practice', topic: 'Simulink' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Analog & Digital Electronics for Electrical Systems',
        objective: 'Power amplifiers, 555 timer oscillators, logic gates, and microcontroller ADC interfacing.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Power Op-Amps & Digital Interfacing',
            focus: 'Instrumentation amplifiers, PWM generation, and optocoupler isolation circuits',
            tasks: [
              { id: 'eee-2-w3-d1', day: 5, title: 'Design high-gain instrumentation amplifier for thermocouple temperature monitoring', duration: '2.5 hrs', type: 'Practice', topic: 'Instrumentation' },
              { id: 'eee-2-w3-d2', day: 6, title: 'Build optoisolated relay driver circuit for high-voltage AC appliance switching', duration: '3 hrs', type: 'Project', topic: 'Optoisolators' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'eee-2-p1', title: 'Induction Motor Torque-Speed Simulation in Simulink', difficulty: 'Intermediate', estimatedTime: '4 hrs', description: 'Model a 5 HP 415V induction motor in MATLAB Simulink and observe starting inrush currents.', deliverable: 'Simulink .slx model file with current and torque waveforms.' },
    ],
    miniProject: {
      title: 'Automatic Star-Delta Starter for 3-Phase Induction Motor',
      description: 'Control circuit with timers and contactors that starts the motor in star connection and switches to delta at 80% speed.',
      technologies: ['Contactors', 'Relay Logic', '3-Phase Machines', 'Safety Interlocks'],
    },
    majorProject: {
      title: 'Variable Frequency Drive (VFD) Inverter for AC Motor',
      description: 'Microcontroller-driven single-phase to three-phase variable frequency inverter utilizing Sinusoidal PWM (SPWM).',
      technologies: ['Power Electronics', 'IGBTs', 'Microcontroller', 'PWM', 'Induction Motors'],
    },
    recommendedResources: [
      { title: 'Electrical Machines by P.S. Bimbhra (Video & Lecture Guides)', type: 'Video', provider: 'NPTEL / IIT Delhi', url: 'https://nptel.ac.in' },
      { title: 'MATLAB & Simulink for Electrical Engineering Students', type: 'Practice', provider: 'MathWorks', url: 'https://www.mathworks.com/learn' },
    ],
  },

  '3rd Year': {
    branch: 'EEE',
    year: '3rd Year',
    title: 'EEE Year 3: Power Systems, Control & Power Electronics',
    semesters: 'Semesters 5 & 6',
    coreCurriculumTopics: ['Power Systems', 'Control Systems', 'Power Electronics', 'Electrical Measurements'],
    keyHighlights: 'Master transmission line parameters, load flow, PID controller tuning, Bode plots, SCR/MOSFET converters, and sensors.',
    levels: [
      {
        level: 'Beginner',
        title: 'Transmission Lines, Grid Faults & Power Systems',
        objective: 'ABCD parameters, Ferranti effect, symmetrical components, and short-circuit fault calculations.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Transmission Network Modeling & Faults',
            focus: 'Line capacitance, surge impedance loading, and symmetrical 3-phase fault currents',
            tasks: [
              { id: 'eee-3-w1-d1', day: 1, title: 'Calculate ABCD parameters and voltage regulation for a 200 km transmission line', duration: '3 hrs', type: 'Practice', topic: 'Transmission Lines' },
              { id: 'eee-3-w1-d2', day: 2, title: 'Analyze symmetrical 3-phase fault on a 3-bus power system using per-unit system', duration: '3 hrs', type: 'Practice', topic: 'Fault Analysis' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Control Systems: Root Locus, Bode & PID Tuning',
        objective: 'Transfer functions, block diagram reduction, Routh-Hurwitz stability, Root Locus, and PID tuning.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Feedback Stability & PID Controller Tuning',
            focus: 'Gain margin, phase margin, frequency response, and Ziegler-Nichols tuning',
            tasks: [
              { id: 'eee-3-w2-d1', day: 3, title: 'Plot Root Locus and determine gain range for closed-loop stability in MATLAB', duration: '2.5 hrs', type: 'Practice', topic: 'Root Locus' },
              { id: 'eee-3-w2-d2', day: 4, title: 'Tune a PID speed controller for a DC servomotor achieving <5% overshoot', duration: '3 hrs', type: 'Practice', topic: 'PID Tuning' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Power Electronics: Choppers, Inverters & Converters',
        objective: 'Buck, Boost, Buck-Boost DC-DC converters, single-phase full-bridge inverters, and THD harmonic analysis.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Power Switching Topologies & Inverters',
            focus: 'MOSFET/IGBT gate drivers, inductor sizing, continuous conduction mode (CCM)',
            tasks: [
              { id: 'eee-3-w3-d1', day: 5, title: 'Design synchronous Buck converter (24V down to 5V at 5A) with inductor sizing', duration: '3.5 hrs', type: 'Practice', topic: 'DC-DC Converters' },
              { id: 'eee-3-w3-d2', day: 6, title: 'Simulate single-phase H-bridge inverter and calculate output voltage THD', duration: '3 hrs', type: 'Project', topic: 'Inverters' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'eee-3-p1', title: 'Gauss-Seidel Load Flow Analysis on 3-Bus Power System', difficulty: 'Intermediate', estimatedTime: '5 hrs', description: 'Perform iterative load flow calculations in Python/MATLAB determining voltage magnitudes and bus angles.', deliverable: 'Bus voltage vector and transmission line power losses.' },
    ],
    miniProject: {
      title: 'Digital Solar MPPT Charge Controller',
      description: 'Perturb & Observe algorithm executing on a microcontroller driving a buck converter to track maximum power point of solar panels.',
      technologies: ['MATLAB', 'Buck Converter', 'Microcontroller', 'PWM', 'Current Sensors'],
    },
    majorProject: {
      title: 'Grid-Connected Pure Sine Wave Inverter with PLL Sync',
      description: 'Single-phase inverter synchronized to utility grid frequency and phase using a software Phase-Locked Loop (PLL).',
      technologies: ['Power Electronics', 'DSP / STM32', 'H-Bridge', 'LC Filter', 'Grid Sync'],
    },
    recommendedResources: [
      { title: 'Power System Analysis & Design by J. Duncan Glover', type: 'Documentation', provider: 'Cengage', url: 'https://www.cengage.com' },
      { title: 'Control Systems Engineering by Norman S. Nise (Interactive Notes)', type: 'Cheat Sheet', provider: 'Wiley', url: 'https://wiley.com' },
    ],
  },

  '4th Year': {
    branch: 'EEE',
    year: '4th Year',
    title: 'EEE Year 4: Smart Grids, Renewable Energy & Industrial Automation',
    semesters: 'Semesters 7 & 8',
    coreCurriculumTopics: ['Smart Grids', 'Renewable Energy', 'Industrial Automation', 'Electrical Projects', 'Placement Preparation'],
    keyHighlights: 'Master microgrid dispatch, EV battery management systems, PLC ladder logic programming, SCADA, and power industry placements.',
    levels: [
      {
        level: 'Beginner',
        title: 'Smart Grids, Microgrids & Energy Storage',
        objective: 'Renewable solar/wind integration, battery energy storage systems (BESS), and bidirectional power flow.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Microgrids & Battery Energy Storage',
            focus: 'Islanded vs grid-tied modes, state of charge (SoC) estimation, and peak shaving',
            tasks: [
              { id: 'eee-4-w1-d1', day: 1, title: 'Model lithium-ion battery equivalent circuit (Thevenin model) in Simulink', duration: '3 hrs', type: 'Practice', topic: 'BESS' },
              { id: 'eee-4-w1-d2', day: 2, title: 'Simulate microgrid frequency regulation under sudden cloud irradiance drops', duration: '3 hrs', type: 'Practice', topic: 'Microgrids' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Industrial Automation: PLCs, SCADA & VFDs',
        objective: 'Ladder logic programming for industrial PLCs, HMI display configuration, and Modbus RTU communications.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Programmable Logic Controllers (PLCs)',
            focus: 'Timers, counters, safety interlocks, and industrial VFD motor control',
            tasks: [
              { id: 'eee-4-w2-d1', day: 3, title: 'Write PLC ladder logic program for automated multi-floor elevator control', duration: '3 hrs', type: 'Practice', topic: 'Ladder Logic' },
              { id: 'eee-4-w2-d2', day: 4, title: 'Interface industrial VFD with PLC over Modbus RS-485 for speed setpoints', duration: '3 hrs', type: 'Practice', topic: 'Modbus' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Power Industry Placements & Capstone Delivery',
        objective: 'Technical mock interviews for core power & automation firms, and deploying major electrical capstones.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Core Electrical Placement Drills & Major Capstone',
            focus: 'Power systems, machines, and circuit interview questions + project demonstration',
            tasks: [
              { id: 'eee-4-w3-d1', day: 5, title: 'Complete comprehensive core EEE placement assessment simulation', duration: '2 hrs', type: 'Quiz', topic: 'Placement' },
              { id: 'eee-4-w3-d2', day: 6, title: 'Commission and test final year hardware electrical capstone prototype', duration: '4 hrs', type: 'Project', topic: 'Capstone' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'eee-4-p1', title: 'PLC Automated Industrial Conveyor Bottle Filling System', difficulty: 'Advanced', estimatedTime: '5 hrs', description: 'Write ladder logic managing bottle detection sensor, solenoid valve fill, and conveyor motor start/stop.', deliverable: 'Ladder diagram and simulator logic trace.' },
    ],
    miniProject: {
      title: 'Smart Solar EV Charging Station Controller',
      description: 'Microcontroller system managing EV battery charging current based on real-time solar generation and grid tariff rates.',
      technologies: ['Power Electronics', 'Current Sensors', 'CAN Bus', 'Solar Inverter'],
    },
    majorProject: {
      title: 'Islanded Hybrid Renewable Microgrid Energy Management System',
      description: 'Microgrid supervisory controller balancing solar PV, wind turbine, and battery storage with automated load shedding.',
      technologies: ['MATLAB/Simulink', 'SCADA', 'Industrial PLC', 'Power Converters'],
    },
    recommendedResources: [
      { title: 'IEEE Power & Energy Society (PES) Resource Center', type: 'Documentation', provider: 'IEEE PES', url: 'https://resourcecenter.ieee-pes.org' },
      { title: 'Siemens TIA Portal & PLC Automation Learning Curriculum', type: 'Video', provider: 'Siemens Industry', url: 'https://www.siemens.com/sce' },
    ],
  },
};

// ---------------------------------------------------------------------------------
// 6. MECHANICAL ROADMAPS (1st Year, 2nd Year, 3rd Year, 4th Year)
// ---------------------------------------------------------------------------------
const mechanicalRoadmaps: Record<AcademicYear, CourseSpecificRoadmap> = {
  '1st Year': {
    branch: 'Mechanical',
    year: '1st Year',
    title: 'Mechanical Year 1: Mechanics, Engineering Drawing & Programming',
    semesters: 'Semesters 1 & 2',
    coreCurriculumTopics: ['Engineering Mechanics', 'Engineering Drawing', 'Mathematics', 'C Programming'],
    keyHighlights: 'Master statics equilibrium, free body diagrams, orthographic projections, isometric views, and C programming.',
    levels: [
      {
        level: 'Beginner',
        title: 'Statics, Force Equilibrium & Truss Analysis',
        objective: 'Free body diagrams, concurrent force systems, friction, and method of joints/sections for structural trusses.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Free Body Diagrams & Truss Members',
            focus: "Coplanar force systems, Lami's theorem, moment of forces, and pin-jointed trusses",
            tasks: [
              { id: 'mech-1-w1-d1', day: 1, title: 'Draw free body diagrams and solve member forces for a 7-member bridge truss', duration: '2.5 hrs', type: 'Practice', topic: 'Truss Analysis' },
              { id: 'mech-1-w1-d2', day: 2, title: 'Calculate center of gravity and moment of inertia for composite T and I sections', duration: '2.5 hrs', type: 'Practice', topic: 'Moment of Inertia' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Engineering Drawing & Orthographic Projections',
        objective: 'First angle vs third angle projection, projections of points, straight lines, planes, and solids.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: 2D Orthographic Drafting & Sectioning',
            focus: 'Projections of cylinders, cones, and prisms cut by inclined planes',
            tasks: [
              { id: 'mech-1-w2-d1', day: 3, title: 'Draft front, top, and side orthographic views of machine components in CAD', duration: '3 hrs', type: 'Practice', topic: 'Orthographic' },
              { id: 'mech-1-w2-d2', day: 4, title: 'Create isometric 3D drawing from 2D multi-view orthographic blueprints', duration: '2.5 hrs', type: 'Practice', topic: 'Isometric' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'C Programming for Mechanical Computations',
        objective: 'Automating beam deflection equations, gear ratios, and projectile trajectories in C.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Computational Mechanics in C',
            focus: 'Iterative numerical solutions, projectile trajectory tables, and stress-strain calculations',
            tasks: [
              { id: 'mech-1-w3-d1', day: 5, title: 'Write C program calculating shear force and bending moment at 0.1m intervals', duration: '2.5 hrs', type: 'Practice', topic: 'Mechanics Code' },
              { id: 'mech-1-w3-d2', day: 6, title: 'Simulate projectile drag resistance in air using Euler numerical method in C', duration: '3 hrs', type: 'Project', topic: 'Numerical C' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'mech-1-p1', title: 'Complete Orthographic CAD Sheet for Flanged Coupling', difficulty: 'Beginner', estimatedTime: '4 hrs', description: 'Draft detailed sectioned assembly drawings with dimensions, tolerances, and title block.', deliverable: 'AutoCAD .dwg / PDF drawing sheet.' },
    ],
    miniProject: {
      title: 'Manual Screw Jack Design & Force Calculator',
      description: 'Calculations and mechanical drawing for a square-threaded screw jack lifting a 5-ton vehicle with self-locking verification.',
      technologies: ['Engineering Mechanics', 'CAD Drafting', 'Material Selection'],
    },
    majorProject: {
      title: 'Automated 2D Truss Solver & Stress Calculator in C',
      description: 'C/Python software taking arbitrary 2D truss node coordinates and external loads, solving member tensions/compressions via matrix algebra.',
      technologies: ['C Programming', 'Matrix Mathematics', 'Statics'],
    },
    recommendedResources: [
      { title: 'Engineering Mechanics by S. Timoshenko & D.H. Young', type: 'Documentation', provider: 'McGraw-Hill', url: 'https://mheducation.com' },
      { title: 'AutoCAD Basics: Official Autodesk Design Tutorials', type: 'Video', provider: 'Autodesk', url: 'https://www.autodesk.com/certification/learn/autocad' },
    ],
  },

  '2nd Year': {
    branch: 'Mechanical',
    year: '2nd Year',
    title: 'Mechanical Year 2: Thermodynamics, Materials & Manufacturing',
    semesters: 'Semesters 3 & 4',
    coreCurriculumTopics: ['Thermodynamics', 'Material Science', 'Manufacturing Processes', 'Strength of Materials'],
    keyHighlights: 'Master laws of thermodynamics, Carnot/Otto/Diesel cycles, iron-carbon phase diagrams, casting, machining, and stress-strain Mohr circles.',
    levels: [
      {
        level: 'Beginner',
        title: 'Thermodynamics & Power Cycles',
        objective: 'First and second laws of thermodynamics, enthalpy, entropy, Otto, Diesel, and Rankine steam cycles.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Thermodynamic Cycles & Steam Tables',
            focus: 'P-V and T-s state diagrams, thermal efficiency calculations, and reheat Rankine cycle',
            tasks: [
              { id: 'mech-2-w1-d1', day: 1, title: 'Calculate thermal efficiency and compression ratio for an Otto cycle engine', duration: '2.5 hrs', type: 'Practice', topic: 'Thermodynamics' },
              { id: 'mech-2-w1-d2', day: 2, title: 'Analyze superheated steam enthalpy and entropy from mollier steam tables', duration: '2 hrs', type: 'Practice', topic: 'Steam Tables' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Material Science & Iron-Carbon Phase Equilibrium',
        objective: 'Crystal lattices, TTT curves, heat treatments (quenching, annealing, tempering), and composite materials.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Iron-Carbon Phase Diagram & Heat Treatment',
            focus: 'Austenite, ferrite, pearlite, martensite transformations, and hardness testing',
            tasks: [
              { id: 'mech-2-w2-d1', day: 3, title: 'Identify microstructures and phase compositions across the Fe-Fe3C phase diagram', duration: '2.5 hrs', type: 'Theory', topic: 'Metallurgy' },
              { id: 'mech-2-w2-d2', day: 4, title: 'Compare Rockwell vs Brinell hardness testing procedures and material wear', duration: '2 hrs', type: 'Practice', topic: 'Hardness Testing' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Strength of Materials: Bending, Torsion & Mohr Circle',
        objective: 'Shear force & bending moment diagrams, flexural bending formula (M/I = sigma/y = E/R), and Mohr circle stress.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Mohr Circle & Complex Stress States',
            focus: 'Principal stresses, maximum in-plane shear stress, and shaft torsional deflections',
            tasks: [
              { id: 'mech-2-w3-d1', day: 5, title: 'Draw Mohr circle of stress for a plane stress element under biaxial tension and shear', duration: '3 hrs', type: 'Practice', topic: 'Mohr Circle' },
              { id: 'mech-2-w3-d2', day: 6, title: 'Size a solid circular transmission shaft subjected to combined bending and torsion', duration: '2.5 hrs', type: 'Practice', topic: 'Shaft Design' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'mech-2-p1', title: 'Complete SFD & BMD Generator for Overhanging Beams', difficulty: 'Intermediate', estimatedTime: '4 hrs', description: 'Plot accurate Shear Force and Bending Moment Diagrams locating point of contraflexure.', deliverable: 'Calculated engineering sheet with diagrams.' },
    ],
    miniProject: {
      title: 'Design of Heat Treatment Schedule for Tool Steel',
      description: 'Comprehensive specification of austenitizing, oil-quenching, and double-tempering cycle for AISI D2 high-wear tool steel.',
      technologies: ['Material Science', 'TTT Curves', 'Heat Treatment'],
    },
    majorProject: {
      title: 'Automated Hydraulic Floor Crane Mechanism',
      description: 'Complete mechanical design, cylinder force calculations, pin shear stress verification, and 3D CAD modeling of a 2-ton shop crane.',
      technologies: ['SolidWorks', 'Strength of Materials', 'Hydraulics', 'GD&T'],
    },
    recommendedResources: [
      { title: 'Thermodynamics: An Engineering Approach by Yunus A. Cengel', type: 'Documentation', provider: 'McGraw-Hill', url: 'https://mheducation.com' },
      { title: 'Callister: Materials Science and Engineering Interactive Resources', type: 'Article', provider: 'Wiley', url: 'https://wiley.com' },
    ],
  },

  '3rd Year': {
    branch: 'Mechanical',
    year: '3rd Year',
    title: 'Mechanical Year 3: Fluids, Machine Design, CAD/CAM & Heat Transfer',
    semesters: 'Semesters 5 & 6',
    coreCurriculumTopics: ['Fluid Mechanics', 'Machine Design', 'CAD/CAM', 'Heat Transfer'],
    keyHighlights: 'Master Bernoulli equations, pipe head losses, spur gear design, conduction/convection heat exchangers, and CNC G-code programming.',
    levels: [
      {
        level: 'Beginner',
        title: 'Fluid Mechanics & Hydraulic Machinery',
        objective: 'Navier-Stokes basics, Bernoulli theorem, Moody chart friction factor, Pelton/Francis turbines, and pumps.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Fluid Dynamics & Pipe Flow Losses',
            focus: 'Major and minor head losses, Darcy-Weisbach equation, and pump sizing',
            tasks: [
              { id: 'mech-3-w1-d1', day: 1, title: 'Calculate total head loss and pump power required for a 500m commercial pipe run', duration: '2.5 hrs', type: 'Practice', topic: 'Fluid Mechanics' },
              { id: 'mech-3-w1-d2', day: 2, title: 'Analyze velocity triangles and power output for an impulse Pelton turbine runner', duration: '3 hrs', type: 'Practice', topic: 'Turbines' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Machine Component Design: Gears, Bearings & Clutches',
        objective: 'Lewis formula for gear bending, contact fatigue stresses, hydrodynamic journal bearings, and multi-plate clutches.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Spur Gear & Roller Bearing Design',
            focus: 'Module calculation, dynamic tooth load, L10 bearing service life',
            tasks: [
              { id: 'mech-3-w2-d1', day: 3, title: 'Design a single-stage spur gearbox reducing 1440 RPM down to 360 RPM at 10 kW', duration: '3.5 hrs', type: 'Practice', topic: 'Gearbox Design' },
              { id: 'mech-3-w2-d2', day: 4, title: 'Select deep-groove ball bearing for combined radial and thrust loads from catalog', duration: '2 hrs', type: 'Practice', topic: 'Bearings' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Heat Transfer & CAD/CAM CNC Machining',
        objective: 'Fourier conduction, Newton cooling convection, LMTD heat exchangers, and CNC mill G-code programming.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Heat Exchangers & CNC G-Code Generation',
            focus: 'Counter-flow shell & tube exchangers, CNC circular interpolation (G02/G03)',
            tasks: [
              { id: 'mech-3-w3-d1', day: 5, title: 'Size a counter-flow shell and tube oil cooler using LMTD and NTU methods', duration: '3 hrs', type: 'Practice', topic: 'Heat Exchangers' },
              { id: 'mech-3-w3-d2', day: 6, title: 'Write complete ISO G-code and M-code part program for a contoured milled component', duration: '3 hrs', type: 'Project', topic: 'CNC Machining' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'mech-3-p1', title: 'Complete 3D Assembly & FEA of a Single-Stage Reduction Gearbox', difficulty: 'Intermediate', estimatedTime: '6 hrs', description: 'Model casing, shafts, bearings, and gears in SolidWorks; perform stress analysis on output shaft.', deliverable: 'SolidWorks assembly files with von Mises stress plots.' },
    ],
    miniProject: {
      title: 'Counter-Flow Shell & Tube Heat Exchanger Simulation',
      description: 'Thermal and fluid pressure drop sizing for an industrial heat exchanger with baffle spacing and tube bundle layouts.',
      technologies: ['Heat Transfer', 'ANSYS Fluent / CFD', 'CAD'],
    },
    majorProject: {
      title: 'Automated 3-Axis Desktop CNC Milling Machine',
      description: 'Physical fabrication or complete CAD/CAM design of a 3-axis CNC router with lead screws, stepper motors, and G-code parser.',
      technologies: ['SolidWorks', 'CAD/CAM', 'G-Code', 'Stepper Drivers', 'Mechatronics'],
    },
    recommendedResources: [
      { title: 'Design of Machine Elements by V.B. Bhandari', type: 'Documentation', provider: 'Tata McGraw-Hill', url: 'https://mheducation.co.in' },
      { title: 'SolidWorks Tutorials: Parametric Assemblies & Motion Simulation', type: 'Video', provider: 'Dassault Systèmes', url: 'https://www.solidworks.com' },
    ],
  },

  '4th Year': {
    branch: 'Mechanical',
    year: '4th Year',
    title: 'Mechanical Year 4: Robotics, Automation & Industrial Capstone',
    semesters: 'Semesters 7 & 8',
    coreCurriculumTopics: ['Robotics', 'Automation', 'Industrial Engineering', 'Advanced CAD', 'Major Projects', 'Placement Preparation'],
    keyHighlights: 'Master robot kinematics (DH parameters), electro-pneumatic automation, supply chain optimization, advanced FEA, and automotive placement rounds.',
    levels: [
      {
        level: 'Beginner',
        title: 'Robotics & Mechatronic Actuators',
        objective: 'Forward and inverse kinematics, Denavit-Hartenberg (DH) parameters, robotic grippers, and servo controls.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Robot Kinematics & Coordinate Frames',
            focus: 'Homogeneous transformation matrices, workspace envelope, and inverse kinematic Jacobians',
            tasks: [
              { id: 'mech-4-w1-d1', day: 1, title: 'Derive DH parameter table and forward kinematic transformation matrix for 3-DOF planar arm', duration: '3 hrs', type: 'Practice', topic: 'Robotics Kinematics' },
              { id: 'mech-4-w1-d2', day: 2, title: 'Simulate robotic manipulator trajectory interpolation in MATLAB Robotics Toolbox', duration: '3 hrs', type: 'Practice', topic: 'Trajectory Planning' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Advanced CAD & Finite Element Analysis (FEA)',
        objective: 'Nonlinear meshing, modal vibration analysis, fatigue life estimation, and composite layup simulations.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Structural FEA Simulation & Stress Convergence',
            focus: 'Meshing density, boundary condition convergence, and thermal-structural coupled field analysis',
            tasks: [
              { id: 'mech-4-w2-d1', day: 3, title: 'Perform finite element stress analysis on vehicle suspension upright in ANSYS', duration: '3.5 hrs', type: 'Practice', topic: 'ANSYS FEA' },
              { id: 'mech-4-w2-d2', day: 4, title: 'Modal frequency analysis determining natural resonance modes of machine frame', duration: '3 hrs', type: 'Practice', topic: 'Vibration Modal' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Mechanical Placements & Final Capstone Project',
        objective: 'Core automotive and design interview preparation, GD&T drawing audits, and building major capstones.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Core Mechanical Placement Drills & Capstone Defense',
            focus: 'Manufacturing, thermo, and design mock interviews + hardware capstone commissioning',
            tasks: [
              { id: 'mech-4-w3-d1', day: 5, title: 'Complete comprehensive core mechanical placement assessment simulation', duration: '2 hrs', type: 'Quiz', topic: 'Placement' },
              { id: 'mech-4-w3-d2', day: 6, title: 'Commission and defend major mechanical engineering capstone prototype', duration: '4 hrs', type: 'Project', topic: 'Capstone Defense' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'mech-4-p1', title: 'Topological Weight Optimization of Aircraft Bracket', difficulty: 'Advanced', estimatedTime: '5 hrs', description: 'Perform topology optimization in ANSYS reducing mass by 40% while preserving stiffness.', deliverable: 'ANSYS report with stress contours and STL model.' },
    ],
    miniProject: {
      title: 'Automated Electro-Pneumatic Pick-and-Place Gantry',
      description: 'Pneumatic double-acting cylinders with 5/2 solenoid directional control valves sorting stamped components.',
      technologies: ['Automation', 'Pneumatics', 'PLC / Relay', 'CAD'],
    },
    majorProject: {
      title: 'Design, FEA Simulation & Fabrication of Formula Student Race Car Spaceframe',
      description: 'Complete chassis structural rigidity optimization, crash attenuator impact simulation, and suspension kinematics for a student formula car.',
      technologies: ['SolidWorks', 'ANSYS Mechanical', 'HyperMesh', 'Vehicle Dynamics'],
    },
    recommendedResources: [
      { title: 'Introduction to Robotics: Mechanics and Control by John J. Craig', type: 'Documentation', provider: 'Pearson', url: 'https://pearson.com' },
      { title: 'ANSYS Innovation Courses: Free Structural & Fluid FEA Courses', type: 'Video', provider: 'ANSYS', url: 'https://innovationspace.ansys.com/courses/' },
    ],
  },
};

// ---------------------------------------------------------------------------------
// 7. CIVIL ROADMAPS (1st Year, 2nd Year, 3rd Year, 4th Year)
// ---------------------------------------------------------------------------------
const civilRoadmaps: Record<AcademicYear, CourseSpecificRoadmap> = {
  '1st Year': {
    branch: 'Civil',
    year: '1st Year',
    title: 'Civil Year 1: Mechanics, Engineering Drawing & Basic Civil',
    semesters: 'Semesters 1 & 2',
    coreCurriculumTopics: ['Engineering Mechanics', 'Engineering Drawing', 'Mathematics', 'Basic Civil Engineering'],
    keyHighlights: 'Master forces in equilibrium, structural support reactions, foundation types, building plan layouts, and AutoCAD drafting.',
    levels: [
      {
        level: 'Beginner',
        title: 'Statics & Structural Equilibrium',
        objective: 'Coplanar force systems, moment of inertia, centroid of structural sections, and beam reactions.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Resultant Forces & Beam Support Reactions',
            focus: 'Simply supported beams, cantilever beams, point loads, and uniformly distributed loads (UDL)',
            tasks: [
              { id: 'civ-1-w1-d1', day: 1, title: 'Calculate support reactions for statically determinate beams with UDL and point loads', duration: '2.5 hrs', type: 'Practice', topic: 'Beam Reactions' },
              { id: 'civ-1-w1-d2', day: 2, title: 'Find centroid and centroidal moment of inertia for uneven I-beam and channel sections', duration: '2.5 hrs', type: 'Practice', topic: 'Centroid' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Building Components & Basic Civil Principles',
        objective: 'Substructure vs superstructure, shallow/deep foundations, brick masonry bonds, and lintel beams.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Masonry Construction & Foundation Types',
            focus: 'English bond, Flemish bond, isolated footings, pile foundations, and DPC damp proofing',
            tasks: [
              { id: 'civ-1-w2-d1', day: 3, title: 'Draft architectural elevation cross-section of a 1-brick thick English bond wall', duration: '2 hrs', type: 'Practice', topic: 'Masonry' },
              { id: 'civ-1-w2-d2', day: 4, title: 'Identify soil bearing pressure requirements for shallow pad footings', duration: '2 hrs', type: 'Theory', topic: 'Foundations' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'AutoCAD 2D Architectural Drafting',
        objective: 'Drafting floor plans, setbacks, elevations, section views, and dimensioning standards in AutoCAD.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: CAD Building Plans & Elevation Views',
            focus: 'Wall layers, door/window schedules, staircases, and floor area ratios (FAR)',
            tasks: [
              { id: 'civ-1-w3-d1', day: 5, title: 'Draft standard 2BHK residential building floor plan with proper room dimensions', duration: '3 hrs', type: 'Practice', topic: 'AutoCAD Plan' },
              { id: 'civ-1-w3-d2', day: 6, title: 'Generate vertical cross-sectional elevation detailing RCC slab thickness and plinth', duration: '3 hrs', type: 'Project', topic: 'Section View' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'civ-1-p1', title: 'Complete 2BHK Residential Floor Plan & Elevation in AutoCAD', difficulty: 'Beginner', estimatedTime: '4 hrs', description: 'Draft building layout following national building code setbacks, ventilation percentages, and door schedule.', deliverable: 'AutoCAD .dwg blueprint sheet.' },
    ],
    miniProject: {
      title: 'Architectural Model & Layout for Eco-Friendly Residential Unit',
      description: 'Design and scaled drafting of an energy-efficient single-family home with natural cross-ventilation and solar roof orientation.',
      technologies: ['AutoCAD', 'Building Planning', 'Green Architecture'],
    },
    majorProject: {
      title: 'Campus Rainwater Harvesting Drainage Network Design',
      description: 'Hydrological catchment calculations and AutoCAD layout for campus building runoff collection tanks.',
      technologies: ['AutoCAD', 'Hydrology Calculations', 'Civil Layouts'],
    },
    recommendedResources: [
      { title: 'National Building Code of India (NBC) Compendium', type: 'Documentation', provider: 'Bureau of Indian Standards', url: 'https://www.bis.gov.in' },
      { title: 'Civil Engineering Drawing: Tutorials & Standards', type: 'Video', provider: 'NPTEL / IIT Roorkee', url: 'https://nptel.ac.in' },
    ],
  },

  '2nd Year': {
    branch: 'Civil',
    year: '2nd Year',
    title: 'Civil Year 2: Surveying, Materials, Strength & Fluid Mechanics',
    semesters: 'Semesters 3 & 4',
    coreCurriculumTopics: ['Surveying', 'Building Materials', 'Strength of Materials', 'Fluid Mechanics'],
    keyHighlights: 'Master Total Station levelling, concrete mix design, cement testing, beam bending stresses, and open channel pipe hydraulics.',
    levels: [
      {
        level: 'Beginner',
        title: 'Surveying: Levelling, Theodolite & Total Station',
        objective: 'Height of instrument method, rise & fall method, closed traverse compass corrections, and Total Station coordinates.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Differential Levelling & Contour Maps',
            focus: 'Benchmark reduction, arithmetic checks, profile levelling, and contour intervals',
            tasks: [
              { id: 'civ-2-w1-d1', day: 1, title: 'Compute reduced levels (RL) using Rise & Fall and Height of Instrument methods', duration: '2.5 hrs', type: 'Practice', topic: 'Levelling' },
              { id: 'civ-2-w1-d2', day: 2, title: 'Balance closed traverse angular errors using Bowditch Rule', duration: '2.5 hrs', type: 'Practice', topic: 'Traverse Survey' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Concrete Technology & Building Materials',
        objective: 'Portland cement hydration, aggregate gradation, slump test workability, and IS 10262 concrete mix design.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Concrete Mix Design & Testing',
            focus: 'Water-cement ratio, compressive strength of 28-day cubes, and admixtures',
            tasks: [
              { id: 'civ-2-w2-d1', day: 3, title: 'Design M25 grade concrete mix per IS 10262 guidelines specifying cement/sand/aggregate proportions', duration: '3 hrs', type: 'Practice', topic: 'Mix Design' },
              { id: 'civ-2-w2-d2', day: 4, title: 'Review laboratory testing of slump cone, compaction factor, and Vee-Bee consistometer', duration: '2 hrs', type: 'Theory', topic: 'Workability' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Strength of Materials & Fluid Mechanics',
        objective: 'Bending stress, shear stress distribution in beams, deflection equations, Bernoulli equation, and pipe friction.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Beam Deflection & Flow Through Pipes',
            focus: "Macaulay's method, venturimeter discharge coefficient, and hydraulic gradient lines",
            tasks: [
              { id: 'civ-2-w3-d1', day: 5, title: "Calculate maximum beam deflection using Macaulay's method for stepped loads", duration: '3 hrs', type: 'Practice', topic: 'Deflections' },
              { id: 'civ-2-w3-d2', day: 6, title: 'Compute discharge through venturimeter and plot hydraulic gradient line (HGL)', duration: '2.5 hrs', type: 'Project', topic: 'Hydraulics' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'civ-2-p1', title: 'Total Station Topographic Boundary Survey Plot', difficulty: 'Intermediate', estimatedTime: '5 hrs', description: 'Process field Total Station raw coordinate readings into 3D topographical contour map.', deliverable: 'Contour CAD sheet with elevation annotations.' },
    ],
    miniProject: {
      title: 'M30 Grade Concrete Mix Design Report & Batching Sheet',
      description: 'Complete mix design calculation for severe exposure conditions incorporating fly ash and superplasticizers per IS codes.',
      technologies: ['Concrete Technology', 'IS 10262', 'Material Testing'],
    },
    majorProject: {
      title: 'Highway Alignment & Profile Survey using Total Station',
      description: 'Longitudinal and cross-sectional surveying of a 1 km road corridor with cut and fill earthwork volume calculations.',
      technologies: ['Total Station', 'AutoCAD Civil 3D', 'Earthwork Estimation'],
    },
    recommendedResources: [
      { title: 'Surveying Vol 1 & 2 by B.C. Punmia & Ashok Jain', type: 'Documentation', provider: 'Laxmi Publications', url: 'https://laxmipublications.com' },
      { title: 'Concrete Technology: Theory and Practice by M.S. Shetty', type: 'Article', provider: 'S. Chand', url: 'https://schandpublishing.com' },
    ],
  },

  '3rd Year': {
    branch: 'Civil',
    year: '3rd Year',
    title: 'Civil Year 3: Structures, Geotech, Transportation & Environment',
    semesters: 'Semesters 5 & 6',
    coreCurriculumTopics: ['Structural Engineering', 'Geotechnical Engineering', 'Transportation Engineering', 'Environmental Engineering'],
    keyHighlights: 'Master RCC beam/column design (IS 456 limit state), soil bearing capacity (Terzaghi), flexible pavement design, and water treatment plants.',
    levels: [
      {
        level: 'Beginner',
        title: 'Reinforced Concrete Design (Limit State Method - IS 456)',
        objective: 'Singly and doubly reinforced beams, flanged T-beams, one-way and two-way slabs, and shear reinforcement.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Limit State Design of RCC Beams & Slabs',
            focus: 'Neutral axis depth, moment of resistance, limit state of collapse, and rebar curtailment',
            tasks: [
              { id: 'civ-3-w1-d1', day: 1, title: 'Design singly reinforced rectangular beam section per IS 456 limit state method', duration: '3 hrs', type: 'Practice', topic: 'RCC Beams' },
              { id: 'civ-3-w1-d2', day: 2, title: 'Design two-way simply supported RCC slab with corner torsion reinforcement', duration: '3 hrs', type: 'Practice', topic: 'RCC Slabs' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Soil Mechanics & Foundation Engineering',
        objective: 'Soil classification, compaction, consolidation settlement, shear strength (Mohr-Coulomb), and Terzaghi bearing capacity.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Geotechnical Soil Bearing & Stability',
            focus: 'Direct shear test, Triaxial test, Terzaghi bearing capacity equations, and slope stability',
            tasks: [
              { id: 'civ-3-w2-d1', day: 3, title: 'Calculate ultimate and net safe bearing capacity for shallow strip footing on clay', duration: '2.5 hrs', type: 'Practice', topic: 'Soil Bearing' },
              { id: 'civ-3-w2-d2', day: 4, title: 'Determine primary consolidation settlement of a saturated clay layer under footing', duration: '2.5 hrs', type: 'Theory', topic: 'Consolidation' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Transportation & Water Treatment Engineering',
        objective: 'Stopping sight distance, horizontal curve super-elevation, pavement CBR design, and rapid sand filter treatment.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Highway Geometric Design & Water Filtration',
            focus: 'IRC guidelines for super-elevation, sedimentation tanks, and chlorination dosage',
            tasks: [
              { id: 'civ-3-w3-d1', day: 5, title: 'Design highway horizontal curve with transition spiral curve and super-elevation', duration: '3 hrs', type: 'Practice', topic: 'Highway Design' },
              { id: 'civ-3-w3-d2', day: 6, title: 'Dimension coagulation, flocculation, and rapid sand filtration units for city water supply', duration: '3 hrs', type: 'Project', topic: 'Water Treatment' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'civ-3-p1', title: 'Complete Structural Bar Bending Schedule (BBS) for G+1 Frame', difficulty: 'Intermediate', estimatedTime: '5 hrs', description: 'Detail beam, slab, and column rebar detailing drawings with bar lengths and bending schedules.', deliverable: 'AutoCAD structural detailing sheet.' },
    ],
    miniProject: {
      title: 'Design of 10 MLD Municipal Water Treatment Plant',
      description: 'Hydraulic dimensioning of aerator, rapid flash mixer, clariflocculator, rapid gravity sand filters, and clear water reservoir.',
      technologies: ['Environmental Engineering', 'Hydraulic Design', 'CAD'],
    },
    majorProject: {
      title: 'Structural Analysis & Design of G+5 Commercial Building in ETABS',
      description: '3D frame modeling under dead, live, and wind loads, verifying column axial-bending interaction and beam reinforcement.',
      technologies: ['ETABS / STAAD.Pro', 'IS 456', 'IS 875', 'AutoCAD Structural'],
    },
    recommendedResources: [
      { title: 'Design of Reinforced Concrete Structures by S. Unnikrishna Pillai & Devdas Menon', type: 'Documentation', provider: 'Tata McGraw-Hill', url: 'https://mheducation.co.in' },
      { title: 'Soil Mechanics and Foundation Engineering by K.R. Arora', type: 'Article', provider: 'Standard Publishers', url: 'https://standardpublishers.com' },
    ],
  },

  '4th Year': {
    branch: 'Civil',
    year: '4th Year',
    title: 'Civil Year 4: Construction Management, Costing, Advanced Design & Capstone',
    semesters: 'Semesters 7 & 8',
    coreCurriculumTopics: ['Construction Management', 'Estimation and Costing', 'Advanced Structural Design', 'AutoCAD', 'Major Projects', 'Placement Preparation'],
    keyHighlights: 'Master CPM/PERT project scheduling, detailed rate analysis, seismic retrofitting (IS 1893), BIM 3D/4D modeling, and infrastructure placement tests.',
    levels: [
      {
        level: 'Beginner',
        title: 'Estimation, Quantity Surveying & Rate Analysis',
        objective: 'Detailed quantity take-offs for excavation, concrete, masonry, plastering, and preparation of abstract estimates.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 1,
            title: 'Week 1: Quantity Surveying & Material Take-Offs',
            focus: 'Centerline method, crossing method, analysis of rates per PWD/CPWD schedules',
            tasks: [
              { id: 'civ-4-w1-d1', day: 1, title: 'Prepare detailed estimate of G+1 residential building using Centerline method', duration: '3.5 hrs', type: 'Practice', topic: 'Estimation' },
              { id: 'civ-4-w1-d2', day: 2, title: 'Conduct market rate analysis for M25 RCC work including labor, formwork & steel', duration: '2.5 hrs', type: 'Practice', topic: 'Rate Analysis' },
            ],
          },
        ],
      },
      {
        level: 'Intermediate',
        title: 'Construction Planning with CPM / PERT & BIM',
        objective: 'Network diagrams, critical path method, floats (total, free, independent), crashing, and Revit BIM coordination.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 2,
            title: 'Week 2: Project Management Network Scheduling',
            focus: 'Early start/finish, late start/finish, time-cost trade-offs, and resource leveling',
            tasks: [
              { id: 'civ-4-w2-d1', day: 3, title: 'Construct CPM network for commercial construction and identify critical path', duration: '3 hrs', type: 'Practice', topic: 'CPM / PERT' },
              { id: 'civ-4-w2-d2', day: 4, title: 'Model 3D parametric building in Autodesk Revit with BIM material schedules', duration: '3.5 hrs', type: 'Practice', topic: 'Revit BIM' },
            ],
          },
        ],
      },
      {
        level: 'Advanced',
        title: 'Seismic Structural Design & Civil Placement Drills',
        objective: 'Response spectrum seismic analysis (IS 1893), ductile detailing (IS 13920), and infrastructure placement mock tests.',
        duration: '4 Weeks',
        weeks: [
          {
            weekNumber: 3,
            title: 'Week 3: Seismic Design, Placement Assessment & Capstone Defense',
            focus: 'Base shear, story drift limits, placement tests, and defending capstone drawings',
            tasks: [
              { id: 'civ-4-w3-d1', day: 5, title: 'Calculate seismic base shear and lateral force distribution for 10-story building', duration: '3 hrs', type: 'Practice', topic: 'Seismic Design' },
              { id: 'civ-4-w3-d2', day: 6, title: 'Complete comprehensive core civil placement assessment simulation', duration: '2 hrs', type: 'Quiz', topic: 'Placement' },
              { id: 'civ-4-w3-d3', day: 7, title: 'Finalize and present final year major civil engineering capstone dossier', duration: '4 hrs', type: 'Project', topic: 'Capstone' },
            ],
          },
        ],
      },
    ],
    practicalExercises: [
      { id: 'civ-4-p1', title: 'Complete Project Schedule & Cash Flow Curve in MS Project / Primavera', difficulty: 'Advanced', estimatedTime: '5 hrs', description: 'Build construction schedule with dependencies, milestones, resource leveling, and S-curve cash flow forecast.', deliverable: 'Gantt chart and cash flow curve report.' },
    ],
    miniProject: {
      title: 'Detailed Bill of Quantities (BOQ) & Tender Dossier',
      description: 'Complete tender document, technical specifications, and priced bill of quantities for an institutional building.',
      technologies: ['Quantity Surveying', 'Excel / CostX', 'CPWD Specs'],
    },
    majorProject: {
      title: 'Seismic Analysis, Design & 4D BIM Simulation of G+10 Commercial Complex',
      description: 'End-to-end ETABS structural analysis per IS 1893, foundation design in SAFE, and 4D construction schedule linking in Revit/Navisworks.',
      technologies: ['ETABS', 'SAFE Foundation', 'Revit BIM', 'AutoCAD', 'IS 1893 & IS 13920'],
    },
    recommendedResources: [
      { title: 'Project Planning and Control with PERT and CPM by B.C. Punmia', type: 'Documentation', provider: 'Laxmi Publications', url: 'https://laxmipublications.com' },
      { title: 'IS 1893 (Part 1): Criteria for Earthquake Resistant Design of Structures', type: 'Cheat Sheet', provider: 'Bureau of Indian Standards', url: 'https://www.bis.gov.in' },
    ],
  },
};

// ---------------------------------------------------------------------------------
// Aggregate Map by Branch & Year
// ---------------------------------------------------------------------------------
export const allBranchRoadmaps: Record<EngineeringBranch, Record<AcademicYear, CourseSpecificRoadmap>> = {
  CSE: cseRoadmaps,
  ISE: iseRoadmaps,
  'AI & DS': aidsRoadmaps,
  ECE: eceRoadmaps,
  EEE: eeeRoadmaps,
  Mechanical: mechanicalRoadmaps,
  Civil: civilRoadmaps,
};

export const getRoadmapForStudent = (
  branch: EngineeringBranch,
  year: AcademicYear
): CourseSpecificRoadmap => {
  const branchMap = allBranchRoadmaps[branch] || allBranchRoadmaps['CSE'];
  return branchMap[year] || branchMap['1st Year'];
};

export interface BranchCareerAndInternshipPrep {
  targetRoles: string[];
  topRecruiters: string[];
  internshipTimeline: string;
  interviewFocusTopics: string[];
  recommendedCertifications: string[];
  actionItems: string[];
}

export const getBranchInternshipPrep = (
  branch: EngineeringBranch,
  year: AcademicYear
): BranchCareerAndInternshipPrep => {
  const prepDatabase: Record<EngineeringBranch, Record<AcademicYear, BranchCareerAndInternshipPrep>> = {
    CSE: {
      '1st Year': {
        targetRoles: ['Open Source Contributor', 'Junior Web Developer Intern', 'Competitive Programming Trainee'],
        topRecruiters: ['Google Summer of Code (GSoC)', 'Local Tech Startups', 'College Innovation Cells', 'Remote Hackathons'],
        internshipTimeline: 'Summer Break (June - July) / Virtual Open-Source Fellowships',
        interviewFocusTopics: ['C & Python Fundamentals', 'Git/GitHub Workflow', 'Basic Problem Solving', 'Logic Puzzles'],
        recommendedCertifications: ['CS50x Certificate by Harvard', 'Python for Everybody (Coursera)', 'GitHub Foundations'],
        actionItems: [
          'Publish 3 clean repositories on GitHub with README documentation',
          'Solve 50+ foundational logic problems on HackerRank / CodeChef',
          'Contribute documentation or bug fixes to 1 open-source project',
          'Create a 1-page student resume highlighting academic coursework & coding projects',
        ],
      },
      '2nd Year': {
        targetRoles: ['Frontend / Backend Developer Intern', 'Software Engineer Intern', 'DSA Problem Solver'],
        topRecruiters: ['Amazon WOW', 'Microsoft Engage', 'Swiggy', 'Zomato', 'Infosys Springboard', 'FinTech Startups'],
        internshipTimeline: 'Summer Internship (May - July) & Winter Break Cohorts',
        interviewFocusTopics: ['Data Structures (Trees, Graphs, Stacks, Queues)', 'OOP in Java/C++', 'SQL Queries & Normalization', 'OS Process Management'],
        recommendedCertifications: ['Oracle Certified Associate Java Programmer', 'Meta Frontend / Backend Developer (Coursera)', 'PostgreSQL Essentials'],
        actionItems: [
          'Solve 150+ LeetCode problems (Focus: Arrays, HashMaps, Trees, Two Pointers)',
          'Build and deploy a full-stack web application with database persistence',
          'Participate in at least 2 national-level 24-hour hackathons (Smart India Hackathon, Unstop)',
          'Set up a technical portfolio website showcasing live deployed demo links',
        ],
      },
      '3rd Year': {
        targetRoles: ['Software Development Engineer (SDE) Intern', 'Cloud / DevOps Intern', 'Full-Stack Engineer'],
        topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Cisco', 'Goldman Sachs', 'Adobe', 'Uber', 'Salesforce'],
        internshipTimeline: 'Campus Summer Internship Drives (July - October) for Pre-Placement Offers (PPO)',
        interviewFocusTopics: ['Advanced DSA (Dynamic Programming, Graph Shortest Path)', 'Low-Level Design (LLD / OOP Patterns)', 'DBMS ACID & Indexing', 'Computer Networks (TCP/UDP, HTTP/HTTPS)'],
        recommendedCertifications: ['AWS Certified Cloud Practitioner or Solutions Architect Associate', 'CKAD (Certified Kubernetes Application Developer)', 'Docker Certified Associate'],
        actionItems: [
          'Master Blind 75 / NeetCode 150 DSA questions with time and space complexity explanations',
          'Build an enterprise-grade project featuring microservices, Redis caching, and CI/CD pipelines',
          'Conduct 5 peer mock interviews focusing on live coding on Google Docs / coderpad',
          'Secure an 8-to-12 week summer internship with strong conversion potential to PPO',
        ],
      },
      '4th Year': {
        targetRoles: ['SDE-1 (Full-Time)', 'Systems Software Engineer', 'Cloud Infrastructure Engineer', 'Graduate Trainee Engineer'],
        topRecruiters: ['FAANG / Big Tech', 'Tier 1 Product Companies (Oracle, Atlassian, Intuit)', 'Service IT Leaders (TCS Digital, Infosys PP, Cognizant)', 'Fast-Growing Unicorns'],
        internshipTimeline: 'Final Year Full-Time Campus Placement Drives (August - December) & 6-Month Industry Project',
        interviewFocusTopics: ['High-Level System Design (Scalability, Sharding, Load Balancers)', 'Operating System Concurrency & Multithreading', 'Behavioral HR (STAR Method)', 'Live Code Debugging'],
        recommendedCertifications: ['AWS Solutions Architect', 'HashiCorp Certified Terraform Associate', 'Confluent Kafka Fundamentals'],
        actionItems: [
          'Complete final year Capstone project with production cloud deployment and load testing',
          'Prepare tailored STAR-format stories for leadership principles and behavioral rounds',
          'Review company-specific previous interview question archives (GeeksforGeeks / LeetCode Discuss)',
          'Clear technical assessments with 85%+ speed and code accuracy',
        ],
      },
    },
    ISE: {
      '1st Year': {
        targetRoles: ['Information Systems Trainee', 'Python Automation Intern', 'Web Design Apprentice'],
        topRecruiters: ['Campus IT Support', 'Local Web Agencies', 'Open Source Communities', 'EdTech Startups'],
        internshipTimeline: 'Summer Vacation (June - July)',
        interviewFocusTopics: ['C & Python Syntax', 'Computer Hardware & Network Basics', 'Number Systems', 'Linux CLI'],
        recommendedCertifications: ['Google IT Support Professional Certificate', 'Python for Everybody', 'Linux Foundation Introduction'],
        actionItems: [
          'Automate 3 routine file manipulation tasks using Python scripts',
          'Build a personal landing page using HTML5, CSS3, and JavaScript',
          'Participate in college coding contests on HackerEarth',
          'Document learning notes on GitHub Wiki or Hashnode tech blog',
        ],
      },
      '2nd Year': {
        targetRoles: ['Database Developer Intern', 'Junior Web Developer', 'Information Security Trainee'],
        topRecruiters: ['Wipro', 'TCS', 'Mindtree', 'LTI', 'Capgemini', 'Fintech Startups'],
        internshipTimeline: 'Summer Internship (May - July)',
        interviewFocusTopics: ['Core Java OOP', 'SQL Queries, Joins, Triggers', 'Data Structures (Arrays, Lists, Stacks)', 'Software Engineering Methodologies'],
        recommendedCertifications: ['Oracle Database SQL Certified Associate', 'Meta Full-Stack Professional', 'MongoDB Certified Developer Associate'],
        actionItems: [
          'Design an e-commerce or campus portal database in 3rd Normal Form with ER diagrams',
          'Solve 100+ data structure problems in Java on LeetCode / GeeksforGeeks',
          'Build a REST API with authentication and database integration',
          'Participate in departmental codeathons and technical paper presentations',
        ],
      },
      '3rd Year': {
        targetRoles: ['Cloud & Data Engineering Intern', 'Full Stack Developer Intern', 'DevOps Intern'],
        topRecruiters: ['Cisco', 'SAP Labs', 'Dell Technologies', 'VMware', 'Amazon Web Services', 'Accenture Strategy'],
        internshipTimeline: 'Summer Internship Drives (August - October) targeting PPOs',
        interviewFocusTopics: ['Cloud Architecture (AWS / Azure)', 'Computer Networks & Socket Programming', 'Distributed Databases (SQL vs NoSQL)', 'System Security & Cryptography'],
        recommendedCertifications: ['AWS Certified Solutions Architect Associate', 'Microsoft Azure Fundamentals (AZ-900)', 'Docker Certified Associate'],
        actionItems: [
          'Deploy a multi-tier microservice architecture to AWS/GCP with automated CI/CD',
          'Build an end-to-end data processing pipeline utilizing message queues (RabbitMQ/Kafka)',
          'Prepare for company specific aptitude, logical reasoning, and coding rounds',
          'Participate in Hackathons and submit innovative entries to national tech symposiums',
        ],
      },
      '4th Year': {
        targetRoles: ['Information Systems Specialist', 'Associate Software Engineer', 'Cloud Operations Engineer', 'Data Solutions Architect'],
        topRecruiters: ['Cisco', 'Oracle', 'SAP', 'TCS Digital', 'Infosys Power Programmer', 'Cognizant GenC Elevate'],
        internshipTimeline: 'Final Year Campus Placements (August - November) & Capstone Internship',
        interviewFocusTopics: ['High-Level Architecture & Microservices', 'Container Orchestration with Kubernetes', 'Database Indexing & Query Tuning', 'Behavioral HR Rounds'],
        recommendedCertifications: ['AWS DevOps Engineer', 'Certified Information Systems Security Professional (CISSP - Associate)', 'Terraform Associate'],
        actionItems: [
          'Deliver an enterprise-grade Information Management System with audit logging and RBAC',
          'Optimize resume for corporate ATS parsers with quantifiable impact metrics',
          'Practice 20+ mock interview rounds with senior alumni and industry mentors',
          'Consolidate placement offers and negotiate joining terms effectively',
        ],
      },
    },
    'AI & DS': {
      '1st Year': {
        targetRoles: ['Data Science Enthusiast', 'Python Developer Intern', 'Research Assistant Trainee'],
        topRecruiters: ['Kaggle Communities', 'AI Research Labs', 'College Data Analytics Clubs', 'Data Analytics Startups'],
        internshipTimeline: 'Summer Break (June - July) / Kaggle Competitions',
        interviewFocusTopics: ['Python for Data Science (NumPy, Pandas)', 'Calculus & Linear Algebra', 'Probability & Statistics', 'Exploratory Data Analysis'],
        recommendedCertifications: ['DeepLearning.AI AI for Everyone', 'IBM Data Science Professional Certificate', 'Kaggle Python & Pandas Badges'],
        actionItems: [
          'Complete Kaggle Titanic and House Prices introductory data science competitions',
          'Build 3 interactive data visualization notebooks using Matplotlib, Seaborn, and Plotly',
          'Master matrix arithmetic, eigenvalues, and multivariable gradient descent mathematics',
          'Publish exploratory findings on Kaggle Datasets and LinkedIn',
        ],
      },
      '2nd Year': {
        targetRoles: ['Junior Data Analyst Intern', 'BI Developer Intern', 'Machine Learning Apprentice'],
        topRecruiters: ['Mu Sigma', 'Fractal Analytics', 'LatentView', 'Tredence', 'Tiger Analytics', 'E-commerce Platforms'],
        internshipTimeline: 'Summer Internship (May - July)',
        interviewFocusTopics: ['Classical Machine Learning (Regression, Classification, Clustering)', 'Advanced SQL Window Functions', 'Hypothesis Testing & A/B Testing', 'Tableau / PowerBI Dashboards'],
        recommendedCertifications: ['Google Advanced Data Analytics Certificate', 'Microsoft Certified: Power BI Data Analyst Associate', 'Coursera Machine Learning Specialization (Andrew Ng)'],
        actionItems: [
          'Train and evaluate 5 scikit-learn models on real-world datasets with cross-validation',
          'Build an interactive business intelligence dashboard connected to a live PostgreSQL database',
          'Solve 80+ SQL aggregation and window function challenges on LeetCode / HackerRank',
          'Write a technical article breaking down an ML algorithm’s mathematical intuitions',
        ],
      },
      '3rd Year': {
        targetRoles: ['Machine Learning Engineer Intern', 'Data Scientist Intern', 'NLP / Computer Vision Intern'],
        topRecruiters: ['Microsoft Research', 'Google AI', 'Amazon AI', 'Walmart Global Tech', 'Flipkart', 'Paytm', 'Fractal'],
        internshipTimeline: 'Campus Summer Internship Drives (August - October)',
        interviewFocusTopics: ['Deep Learning Architectures (CNNs, RNNs, Transformers)', 'PyTorch & TensorFlow Model Training', 'Feature Engineering & Hyperparameter Optimization', 'Model Deployment with FastAPI / Docker'],
        recommendedCertifications: ['TensorFlow Developer Certificate', 'AWS Certified Machine Learning - Specialty', 'NVIDIA Deep Learning Institute Certificate'],
        actionItems: [
          'Fine-tune an open-source Large Language Model (Hugging Face Transformers) on custom domain data',
          'Deploy a computer vision model with real-time inference on FastAPI and Streamlit',
          'Participate in active Kaggle competitions and achieve an Expert tier badge',
          'Complete 10 mock technical rounds covering mathematical derivations of Backprop and Attention',
        ],
      },
      '4th Year': {
        targetRoles: ['AI Engineer', 'Associate Data Scientist', 'MLOps Engineer', 'Computer Vision Specialist'],
        topRecruiters: ['NVIDIA', 'Qualcomm AI Labs', 'Microsoft', 'Google', 'Tiger Analytics', 'EY AI Advisory', 'Deloitte Analytics'],
        internshipTimeline: 'Campus Placement Drives (August - November) & Final Year Industry Capstone',
        interviewFocusTopics: ['MLOps Pipelines (MLflow, Kubeflow, Model Monitoring)', 'Vector Databases & Retrieval Augmented Generation (RAG)', 'Model Quantization & TensorRT Inference', 'AI System Design'],
        recommendedCertifications: ['Databricks Certified Machine Learning Professional', 'AWS Certified Machine Learning Specialist', 'GCP Professional Data Engineer'],
        actionItems: [
          'Build a production RAG application using LangChain/LlamaIndex and Pinecone vector store',
          'Setup continuous model retraining, drift monitoring, and automated deployment pipelines',
          'Author and present a research paper at an IEEE / Springer national conference',
          'Secure high-tier placements in corporate AI R&D or specialized analytics consulting',
        ],
      },
    },
    ECE: {
      '1st Year': {
        targetRoles: ['Electronics Hobbyist', 'Hardware Prototyping Trainee', 'Circuit Simulation Apprentice'],
        topRecruiters: ['Makerspaces', 'Robotics Clubs', 'Campus Tinkering Labs', 'IoT Startups'],
        internshipTimeline: 'Summer Break (June - July)',
        interviewFocusTopics: ['Ohm’s & Kirchhoff’s Laws', 'Diodes & BJT Transistors', 'Oscilloscope / Multimeter Usage', 'C Programming & Bitwise Logic'],
        recommendedCertifications: ['NPTEL Basic Electronics by IIT', 'Arduino Fundamentals Certificate', 'Introduction to Electronic Circuits (edX)'],
        actionItems: [
          'Build and test 5 analog circuits on a solderless breadboard with DC power supply',
          'Simulate complex amplifier and rectifier schematics in LTspice / Proteus',
          'Write C programs using bitwise operators to emulate hardware register manipulation',
          'Participate in line-follower robotics competitions at college tech fests',
        ],
      },
      '2nd Year': {
        targetRoles: ['PCB Design Intern', 'Embedded C Programmer Trainee', 'Digital Systems Intern'],
        topRecruiters: ['Bosch', 'Schneider Electric', 'Continental', 'Ather Energy', 'Hero MotoCorp', 'Local PCB Fabricators'],
        internshipTimeline: 'Summer Break (May - July)',
        interviewFocusTopics: ['Digital Logic Design (K-Maps, Flip-Flops, Counters, FSMs)', 'Op-Amps & Active Filters', 'Microcontroller Architecture (8051 / AVR / PIC)', 'PCB Schematic & Layout in KiCad'],
        recommendedCertifications: ['Autodesk KiCad PCB Design Essentials', 'Arm Education Embedded Systems', 'NPTEL Digital Electronic Circuits by IIT Kharagpur'],
        actionItems: [
          'Design, route, and order a custom two-layer PCB board using KiCad / EasyEDA',
          'Program an AVR/STM32 microcontroller to interface with LCDs, ultrasonic sensors, and keypads',
          'Simulate finite state machines in Logisim and ModelSim',
          'Attend industrial visits to electronic assembly and SMT manufacturing plants',
        ],
      },
      '3rd Year': {
        targetRoles: ['Embedded Firmware Intern', 'VLSI Verification Intern', 'IoT Solutions Intern'],
        topRecruiters: ['Texas Instruments', 'Qualcomm', 'Intel', 'Broadcom', 'NXP Semiconductors', 'MediaTek', 'STMicroelectronics'],
        internshipTimeline: 'Summer Internship Drives (July - October) for PPOs',
        interviewFocusTopics: ['Verilog / VHDL RTL Design & Simulation', 'ARM Cortex-M Architecture & Bare-Metal C', 'Communication Protocols (I2C, SPI, UART, CAN, Bluetooth)', 'RTOS Tasks & Semaphores (FreeRTOS)'],
        recommendedCertifications: ['Certified LabVIEW Associate Developer (CLAD)', 'Cadence / Synopsys EDA Tool Proficiency', 'Arm Accredited Engineer (AAE)'],
        actionItems: [
          'Synthesize and implement a 32-bit RISC-V or MIPS processor core in Verilog on an FPGA board',
          'Build a connected IoT node with FreeRTOS multitasking and MQTT cloud telemetry',
          'Master Static Timing Analysis (STA), clock domain crossing, and setup/hold time Slack calculations',
          'Solve 50+ core hardware interview questions from "Digital Design" and "CMOS VLSI"',
        ],
      },
      '4th Year': {
        targetRoles: ['ASIC / FPGA Design Engineer', 'Embedded Firmware Engineer', 'Hardware Verification Engineer', 'RF / Telecom Engineer'],
        topRecruiters: ['Qualcomm', 'Intel', 'Broadcom', 'Texas Instruments', 'Synopsys', 'Cadence', 'Ericsson', 'Nokia', 'ISRO / DRDO'],
        internshipTimeline: 'Core Hardware Campus Placement Drives (August - December) & 6-Month Semester Internship',
        interviewFocusTopics: ['SystemVerilog & UVM Verification Methodology', 'CMOS Inverter Characteristics & Fabrication', 'High-Speed Signal Integrity & RF Design', 'Core Technical Aptitude & GATE ECE'],
        recommendedCertifications: ['Cadence Design Systems Verification Specialist', 'Synopsys EDA Certified', 'Certified Embedded Systems Engineer'],
        actionItems: [
          'Complete capstone project on SoC hardware acceleration or real-time digital signal processing',
          'Create a comprehensive hardware portfolio with GitHub Verilog source code, simulation waveforms, and PCB photos',
          'Practice 15+ mock interviews covering timing closure, pipelining, and cache coherence',
          'Secure a core semiconductor / telecom R&D placement offer',
        ],
      },
    },
    EEE: {
      '1st Year': {
        targetRoles: ['Electrical Engineering Trainee', 'Circuit Testing Apprentice', 'Laboratory Assistant'],
        topRecruiters: ['Campus Electrical Maintenance', 'Solar Energy Startups', 'College Labs', 'Robotics Clubs'],
        internshipTimeline: 'Summer Break (June - July)',
        interviewFocusTopics: ['Ohm’s & Kirchhoff’s Laws', 'AC Single-Phase & Three-Phase Circuits', 'Magnetic Circuits & Transformers', 'Electrical Safety & Earthing'],
        recommendedCertifications: ['NPTEL Basic Electrical Circuits by IIT Madras', 'MATLAB Onramp Certificate', 'OSHA Electrical Safety Standards'],
        actionItems: [
          'Verify Thevenin, Norton, and Superposition theorems experimentally in laboratory',
          'Write MATLAB scripts to plot sinusoidal AC waveforms, power factor, and harmonic analysis',
          'Understand residential distribution boards, circuit breakers (MCBs/ELCBs), and proper ground earthing',
          'Participate in technical presentations on emerging clean energy technologies',
        ],
      },
      '2nd Year': {
        targetRoles: ['Motor Drives Intern', 'Power Electronics Trainee', 'Electrical CAD Drafter'],
        topRecruiters: ['Kirloskar Electric', 'Havells', 'Crompton Greaves', 'L&T Electrical & Automation', 'State Electricity Boards (BESCOM/KPTCL)'],
        internshipTimeline: 'Summer Break (May - July)',
        interviewFocusTopics: ['DC Machines & Induction Motors', 'Power Semiconductor Devices (SCR, MOSFET, IGBT)', 'Single-Phase / Three-Phase Inverters', 'AutoCAD Electrical'],
        recommendedCertifications: ['AutoCAD Electrical Certified User', 'Simulink for Power Electronics (MathWorks)', 'NPTEL Electrical Machines by IIT Roorkee'],
        actionItems: [
          'Perform open-circuit and short-circuit tests on a single-phase transformer and compute efficiency',
          'Simulate buck, boost, and buck-boost DC-DC power converters in MATLAB Simulink',
          'Draft single-line diagrams (SLD) of electrical industrial substations in AutoCAD Electrical',
          'Participate in industrial training at a 66kV/11kV electrical power substation',
        ],
      },
      '3rd Year': {
        targetRoles: ['Industrial Automation & PLC Intern', 'EV Powertrain Intern', 'Renewable Energy Systems Intern'],
        topRecruiters: ['ABB', 'Siemens', 'Schneider Electric', 'Ather Energy', 'Tata Power', 'Ola Electric', 'L&T Construction'],
        internshipTimeline: 'Summer Internship Drives (July - October) for PPOs',
        interviewFocusTopics: ['PLC Programming (Ladder Logic) & SCADA', 'Battery Management Systems (BMS) for Electric Vehicles', 'Power System Transmission Line Modeling & Faults', 'Control Systems (Root Locus, Bode Plots, PID)'],
        recommendedCertifications: ['Siemens TIA Portal / Rockwell Automation PLC Certification', 'MATLAB & Simulink for Electric Vehicle Design', 'NABCEP Solar PV Associate'],
        actionItems: [
          'Program an industrial PLC with ladder logic for automated conveyor sortation and motor sequencing',
          'Design an EV battery pack with thermal modeling and lithium-ion cell balancing circuitry',
          'Perform symmetrical and unsymmetrical fault analysis on IEEE 9-bus power system using ETAP / PowerWorld',
          'Apply for core industrial internships with top multinational power engineering firms',
        ],
      },
      '4th Year': {
        targetRoles: ['Graduate Engineer Trainee (GET) - Power', 'Substation Automation Engineer', 'Control & Instrumentation Engineer', 'Power Systems Analyst'],
        topRecruiters: ['Schneider Electric', 'ABB', 'Siemens', 'Tata Power', 'PowerGrid Corporation of India (PGCIL)', 'NTPC', 'BHEL', 'L&T'],
        internshipTimeline: 'Campus Placement Drives (August - December) & Final Year Industry Project',
        interviewFocusTopics: ['Smart Grids & Microgrid Control', 'Switchgear & Relay Protection (Overcurrent, Differential, Distance)', 'High Voltage DC (HVDC) Transmission', 'GATE Electrical Engineering Drills'],
        recommendedCertifications: ['Certified Energy Manager (BEE India)', 'ETAP Power System Analysis Specialist', 'ISA Automation Certified Professional'],
        actionItems: [
          'Complete Capstone project on grid-connected solar PV inverter or smart energy management system',
          'Master power system protection schemes, CT/PT sizing, and numerical relay configurations',
          'Prepare rigorously for technical interviews and public sector PSU exams (GATE EE)',
          'Secure placement in high-growth green energy, electric mobility, or industrial automation sectors',
        ],
      },
    },
    Mechanical: {
      '1st Year': {
        targetRoles: ['CAD Drafting Trainee', 'Workshop Apprentice', 'Automotive Club Member'],
        topRecruiters: ['SAE India Collegiate Clubs', 'Fabrication Workshops', 'Campus Makerspaces', 'Rapid Prototyping Labs'],
        internshipTimeline: 'Summer Vacation (June - July)',
        interviewFocusTopics: ['Orthographic & Isometric Projections', 'Engineering Mechanics (Statics, Friction, Trusses)', 'Workshop Manufacturing Operations (Lathe, Milling, Welding)', 'AutoCAD 2D'],
        recommendedCertifications: ['Autodesk Certified Associate in CAD for Mechanical Design', 'SolidWorks CSWA (Certified SolidWorks Associate)', 'NPTEL Engineering Mechanics'],
        actionItems: [
          'Draft 20 orthographic multi-view engineering drawings with tolerances in AutoCAD',
          'Turn shafts, cut threads, and face components on an engine lathe in machine workshop',
          'Join the college SAE BAJA or Formula Student design team to build real vehicle chassis',
          'Study introductory materials science and stress-strain tensile test curves',
        ],
      },
      '2nd Year': {
        targetRoles: ['3D CAD Modeling Intern', 'Manufacturing Operations Trainee', 'Quality Assurance Intern'],
        topRecruiters: ['TVS Motor Company', 'Bharat Forge', 'Bosch India', 'Jindal Steel & Power', 'Local CNC Toolrooms'],
        internshipTimeline: 'Summer Break (May - July)',
        interviewFocusTopics: ['Parametric 3D Solid Modeling (SolidWorks / CATIA)', 'Thermodynamics (Rankine, Brayton, Diesel Cycles)', 'Strength of Materials (SFD / BMD, Mohr’s Circle)', 'Manufacturing Processes (Casting, Forging, CNC Machining)'],
        recommendedCertifications: ['SolidWorks CSWP (Certified SolidWorks Professional)', 'Autodesk Inventor Certified Professional', 'ASQ Six Sigma Yellow Belt'],
        actionItems: [
          'Model and assemble a complete 4-cylinder internal combustion engine in SolidWorks with motion constraints',
          'Calculate factor of safety for structural beams under combined bending and torsion loads',
          'Generate G-code / M-code for CNC milling using Mastercam or Fusion 360 CAM',
          'Complete 4-week industrial vocational training at an automotive OEM or manufacturing plant',
        ],
      },
      '3rd Year': {
        targetRoles: ['CAE / FEA Simulation Intern', 'Thermal Systems Intern', 'Mechanical Design Engineer Trainee'],
        topRecruiters: ['Tata Motors', 'Mahindra & Mahindra', 'Airbus', 'Boeing', 'L&T Heavy Engineering', 'Caterpillar', 'Cummins'],
        internshipTimeline: 'Campus Summer Internship Drives (July - October) for PPOs',
        interviewFocusTopics: ['Finite Element Analysis (FEA with ANSYS)', 'Fluid Mechanics & Computational Fluid Dynamics (CFD)', 'Design of Machine Elements (Shafts, Gears, Bearings, Springs)', 'Geometric Dimensioning & Tolerancing (GD&T) per ASME Y14.5'],
        recommendedCertifications: ['ANSYS Mechanical Certified Associate', 'ASME GD&T Professional (Technologist Level)', 'Siemens NX CAD/CAM Certification'],
        actionItems: [
          'Perform structural static and modal FEA on an automotive suspension arm in ANSYS Workbench',
          'Simulate aerodynamic drag coefficient of a streamlined car body in ANSYS Fluent CFD',
          'Select standard SKF rolling contact bearings and spur gears using mechanical design data handbooks',
          'Compete in national mobility events (SAE BAJA / E-BAJA / Formula Bharat)',
        ],
      },
      '4th Year': {
        targetRoles: ['Mechanical Design Engineer (Full-Time)', 'CAE Analyst', 'Production & Operations Engineer', 'Robotics & Automation Specialist'],
        topRecruiters: ['Tata Motors', 'Mahindra', 'Boeing', 'Airbus', 'Caterpillar', 'John Deere', 'BHEL', 'L&T', 'ISRO / DRDO'],
        internshipTimeline: 'Campus Placement Drives (August - December) & Capstone Project',
        interviewFocusTopics: ['Product Lifecycle Management (PLM)', 'Robotics Kinematics & Mechatronics', 'Supply Chain & Lean Six Sigma Manufacturing', 'Core Technical Aptitude & GATE Mechanical'],
        recommendedCertifications: ['SolidWorks CSWE (Certified SolidWorks Expert)', 'Six Sigma Green Belt (SSGB)', 'ANSYS CFD Certified Professional'],
        actionItems: [
          'Design and fabricate final year Capstone project (e.g. Electric Vehicle chassis, automated drone, hybrid energy harvester)',
          'Prepare detailed mechanical engineering design calculation dossiers and production drawings with GD&T callouts',
          'Master technical interview questions on thermodynamic steam tables, psychrometry, and vibration resonance',
          'Secure full-time engineering placements with leading global automotive or aerospace corporations',
        ],
      },
    },
    Civil: {
      '1st Year': {
        targetRoles: ['Civil Drafting Trainee', 'Surveying Apprentice', 'Building Materials Inspector'],
        topRecruiters: ['Campus Infrastructure Maintenance', 'Local Surveying Firms', 'Architectural Drafting Studios'],
        internshipTimeline: 'Summer Vacation (June - July)',
        interviewFocusTopics: ['AutoCAD 2D Architectural Plans & Elevations', 'Engineering Surveying (Chain, Compass, Leveling)', 'Building Materials (Cement types, Aggregates, Bricks)', 'Engineering Mechanics & Force Equilibrium'],
        recommendedCertifications: ['Autodesk Certified User: AutoCAD for Civil Engineering', 'NPTEL Surveying by IIT Roorkee', 'RICS Introduction to Built Environment'],
        actionItems: [
          'Draw complete 2D floor plans, elevations, and sectional views of a residential building in AutoCAD',
          'Carry out fly-leveling and profile leveling in the field using Dumpy Level and auto level',
          'Test compressive strength of concrete cubes and fineness of OPC cement in laboratory',
          'Document local construction projects and identify foundation excavation techniques',
        ],
      },
      '2nd Year': {
        targetRoles: ['Site Engineering Trainee', 'Total Station Surveyor', 'Quality Testing Lab Intern'],
        topRecruiters: ['Sobha Developers', 'Prestige Group', 'Brigade Group', 'Local PWD Contractors', 'Material Testing Laboratories'],
        internshipTimeline: 'Summer Break (May - July)',
        interviewFocusTopics: ['Strength of Materials (SFD / BMD for Beams, Deflection)', 'Advanced Surveying with Electronic Total Station & GIS Basics', 'Fluid Mechanics & Open Channel Flow', 'Concrete Mix Design per IS 10262'],
        recommendedCertifications: ['Autodesk Civil 3D Certified Professional', 'ArcGIS Fundamentals (Esri)', 'NPTEL Strength of Materials by IIT Madras'],
        actionItems: [
          'Conduct comprehensive field survey with Electronic Total Station and generate digital contour maps',
          'Design M25 and M30 grade concrete mixes per IS 10262 guidelines with targeted slump and water-cement ratios',
          'Draw Shear Force and Bending Moment Diagrams for complex cantilever, overhanging, and continuous beams',
          'Complete 4-week on-site summer training at an active residential or commercial high-rise construction site',
        ],
      },
      '3rd Year': {
        targetRoles: ['Structural Design Intern', 'Geotechnical Engineering Intern', 'Highway & Transportation Intern'],
        topRecruiters: ['L&T Construction', 'Shapoorji Pallonji', 'Afcons Infrastructure', 'Tata Projects', 'AECOM', 'WSP', 'Atkins'],
        internshipTimeline: 'Campus Summer Internship Drives (July - October) for PPOs',
        interviewFocusTopics: ['Reinforced Concrete Design per IS 456 (Limit State Method)', 'Soil Mechanics & Bearing Capacity (Terzaghi Equations)', 'Structural Analysis with STAAD.Pro / ETABS', 'Highway Geometric Design per Indian Road Congress (IRC)'],
        recommendedCertifications: ['Bentley STAAD.Pro Certified Associate', 'CSI ETABS Structural Analysis Specialist', 'IS 456 RCC Design Proficiency'],
        actionItems: [
          'Model and analyze a multi-story RCC framed building in ETABS/STAAD.Pro under dead, live, and wind loads',
          'Prepare detailed Bar Bending Schedules (BBS) and structural reinforcement detailing drawings',
          'Conduct Standard Penetration Test (SPT) and direct shear tests to calculate soil safe bearing capacity',
          'Secure an 8-to-10 week summer internship with leading infrastructure engineering contractors',
        ],
      },
      '4th Year': {
        targetRoles: ['Graduate Engineer Trainee (GET) - Civil / Structural', 'BIM Coordinator', 'Quantity Surveyor & Cost Estimator', 'Project Planning Engineer'],
        topRecruiters: ['L&T Construction', 'Shapoorji Pallonji', 'Tata Projects', 'AECOM', 'Jacobs', 'Bechtel', 'CPWD / NHAI', 'L&T Transportation'],
        internshipTimeline: 'Campus Placement Drives (August - December) & Capstone Project',
        interviewFocusTopics: ['Construction Planning with CPM/PERT (Primavera / MS Project)', 'BIM 3D/4D Modeling in Autodesk Revit & Navisworks', 'Seismic Analysis per IS 1893 & Ductile Detailing IS 13920', 'Detailed Rate Analysis & PWD Tender Estimation'],
        recommendedCertifications: ['Autodesk Certified Professional: Revit for Structural Design', 'Oracle Primavera P6 Project Management', 'RICS Certified Quantity Surveyor Foundation'],
        actionItems: [
          'Deliver Capstone project on seismic-resistant structural design or sustainable green building BIM modeling',
          'Prepare complete Bill of Quantities (BOQ), tender specifications, and cash flow S-curve forecasts for an institutional building',
          'Master structural design interview questions regarding IS 456, IS 800 (Steel), IS 875 (Wind), and IS 1893 (Earthquake)',
          'Secure top placement offers in infrastructure, consulting, or public sector engineering organizations',
        ],
      },
    },
  };

  const branchPrep = prepDatabase[branch] || prepDatabase['CSE'];
  return branchPrep[year] || branchPrep['1st Year'];
};

