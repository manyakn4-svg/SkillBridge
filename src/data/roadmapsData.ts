import { RoadmapLevel } from '../types';

export const sampleRoadmapLevels: RoadmapLevel[] = [
  {
    level: 'Beginner',
    title: 'Phase 1: Core Fundamentals & Algorithmic Foundation',
    objective: 'Build rock-solid fluency in language syntax, fundamental data structures, memory models, and basic problem solving.',
    duration: '4 Weeks',
    weeks: [
      {
        weekNumber: 1,
        title: 'Week 1: Language Syntax & Control Flow',
        description: 'Variables, loops, pointers/references, functions, and standard library primitives.',
        tasks: [
          { id: 'b-w1-d1', day: 1, title: 'Understand memory layout: Stack vs Heap allocation', duration: '2 hours', type: 'Theory', completed: true },
          { id: 'b-w1-d2', day: 2, title: 'Write 10 basic array manipulation & pointer functions', duration: '2.5 hours', type: 'Practice', completed: true },
          { id: 'b-w1-d3', day: 3, title: 'Study asymptotic time complexity (Big-O analysis)', duration: '1.5 hours', type: 'Theory', completed: true },
          { id: 'b-w1-d4', day: 4, title: 'Solve 5 linear search & binary search problems', duration: '2 hours', type: 'Practice', completed: true },
          { id: 'b-w1-d5', day: 5, title: 'Implement basic recursion and mathematical series', duration: '2 hours', type: 'Practice', completed: false },
        ],
      },
      {
        weekNumber: 2,
        title: 'Week 2: Linear Data Structures',
        description: 'Singly and Doubly Linked Lists, Stacks, Queues, and Circular Buffers.',
        tasks: [
          { id: 'b-w2-d1', day: 6, title: 'Implement Singly Linked List with reverse and cycle detection', duration: '3 hours', type: 'Practice', completed: true },
          { id: 'b-w2-d2', day: 7, title: 'Build Stack using arrays and dynamic resizing', duration: '2 hours', type: 'Practice', completed: true },
          { id: 'b-w2-d3', day: 8, title: 'Implement Queue and Circular Buffer for I/O simulation', duration: '2 hours', type: 'Practice', completed: false },
          { id: 'b-w2-d4', day: 9, title: 'Solve classic interview stack problems: Balanced Parentheses', duration: '2.5 hours', type: 'Practice', completed: false },
          { id: 'b-w2-d5', day: 10, title: 'Weekly Assessment: Data Structures Baseline Quiz', duration: '1 hour', type: 'Quiz', completed: false },
        ],
      },
      {
        weekNumber: 3,
        title: 'Week 3: Sorting & Searching Algorithms',
        description: 'Merge Sort, Quick Sort, Binary Search variants, and two-pointer strategies.',
        tasks: [
          { id: 'b-w3-d1', day: 11, title: 'Deep dive: Divide & Conquer paradigm and recursion trees', duration: '2 hours', type: 'Theory', completed: false },
          { id: 'b-w3-d2', day: 12, title: 'Implement Merge Sort and count inversions', duration: '2.5 hours', type: 'Practice', completed: false },
          { id: 'b-w3-d3', day: 13, title: 'Implement Quick Sort with randomized pivot selection', duration: '2.5 hours', type: 'Practice', completed: false },
          { id: 'b-w3-d4', day: 14, title: 'Master Two-Pointer & Sliding Window search patterns', duration: '3 hours', type: 'Practice', completed: false },
        ],
      },
      {
        weekNumber: 4,
        title: 'Week 4: Hash Tables & String Algorithms',
        description: 'Hash functions, collision resolution, sliding window string parsing.',
        tasks: [
          { id: 'b-w4-d1', day: 15, title: 'Implement custom Hash Map with separate chaining', duration: '3 hours', type: 'Practice', completed: false },
          { id: 'b-w4-d2', day: 16, title: 'String pattern matching: Rabin-Karp & KMP concepts', duration: '2.5 hours', type: 'Theory', completed: false },
          { id: 'b-w4-d3', day: 17, title: 'Complete Beginner Milestone Project', duration: '4 hours', type: 'Project', completed: false },
        ],
      },
    ],
    milestoneProject: {
      title: 'In-Memory File & Key-Value Storage Engine',
      description: 'Build a lightweight terminal-based key-value store with transaction support (COMMIT/ROLLBACK) and crash-consistent write-ahead logging.',
    },
  },
  {
    level: 'Intermediate',
    title: 'Phase 2: Systems, Trees, Graphs & Cloud Architecture',
    objective: 'Scale up to non-linear structures, OS primitives, database transactions, and building production REST APIs.',
    duration: '4 Weeks',
    weeks: [
      {
        weekNumber: 5,
        title: 'Week 5: Trees, Heaps & Binary Search Trees',
        description: 'Tree traversals, AVL self-balancing trees, Min/Max Heap priority queues.',
        tasks: [
          { id: 'i-w5-d1', day: 18, title: 'Binary Tree traversals: Preorder, Inorder, Postorder & Level-order', duration: '2.5 hours', type: 'Practice', completed: false },
          { id: 'i-w5-d2', day: 19, title: 'Construct Max-Heap from array in O(n) time', duration: '2 hours', type: 'Theory', completed: false },
          { id: 'i-w5-d3', day: 20, title: 'Solve Top-K frequent elements using Priority Queue', duration: '2.5 hours', type: 'Practice', completed: false },
        ],
      },
      {
        weekNumber: 6,
        title: 'Week 6: Graphs & Shortest Paths',
        description: 'Adjacency lists, BFS/DFS, Dijkstra, Bellman-Ford, and Topological Sort.',
        tasks: [
          { id: 'i-w6-d1', day: 21, title: 'Represent directed & undirected graphs with adjacency lists', duration: '2 hours', type: 'Practice', completed: false },
          { id: 'i-w6-d2', day: 22, title: 'Implement Dijkstra algorithm with min-heap priority queue', duration: '3 hours', type: 'Practice', completed: false },
          { id: 'i-w6-d3', day: 23, title: 'Topological sort for course schedule & task dependency resolver', duration: '2.5 hours', type: 'Practice', completed: false },
        ],
      },
      {
        weekNumber: 7,
        title: 'Week 7: Relational Databases & SQL Optimization',
        description: 'B-Tree indexes, ACID transactions, 3NF normalization, and query plan analysis.',
        tasks: [
          { id: 'i-w7-d1', day: 24, title: 'Write complex JOINs, window functions & aggregations', duration: '2.5 hours', type: 'Practice', completed: false },
          { id: 'i-w7-d2', day: 25, title: 'Analyze EXPLAIN query plans and design composite indexes', duration: '2 hours', type: 'Theory', completed: false },
        ],
      },
      {
        weekNumber: 8,
        title: 'Week 8: REST APIs & Containerization with Docker',
        description: 'Build authenticated backend microservices and containerize using Docker.',
        tasks: [
          { id: 'i-w8-d1', day: 26, title: 'Build modular REST API with JWT authentication & validation', duration: '3 hours', type: 'Practice', completed: false },
          { id: 'i-w8-d2', day: 27, title: 'Write optimized multi-stage Dockerfile and docker-compose.yml', duration: '2.5 hours', type: 'Practice', completed: false },
        ],
      },
    ],
    milestoneProject: {
      title: 'Full-Stack Campus Event & Ticket Booking System',
      description: 'Design a microservice backend with PostgreSQL transactions, redis rate limiting, and an interactive React client interface.',
    },
  },
  {
    level: 'Advanced',
    title: 'Phase 3: High-Throughput Distributed Systems & Interview Mastery',
    objective: 'Tackle distributed consensus, message queues, system design interviews, and competitive placement assessments.',
    duration: '4 Weeks',
    weeks: [
      {
        weekNumber: 9,
        title: 'Week 9: Concurrency, Multithreading & Asynchronous I/O',
        description: 'Thread pools, race conditions, mutex locks, and event-driven architectures.',
        tasks: [
          { id: 'a-w9-d1', day: 28, title: 'Producer-Consumer problem with blocking queues & mutexes', duration: '3 hours', type: 'Practice', completed: false },
          { id: 'a-w9-d2', day: 29, title: 'Epoll & non-blocking network socket handling', duration: '2.5 hours', type: 'Theory', completed: false },
        ],
      },
      {
        weekNumber: 10,
        title: 'Week 10: System Design at Scale',
        description: 'Consistent hashing, CDN caching, database sharding, and Kafka streaming.',
        tasks: [
          { id: 'a-w10-d1', day: 30, title: 'Design a high-volume URL Shortener & Analytics service', duration: '3 hours', type: 'Theory', completed: false },
          { id: 'a-w10-d2', day: 31, title: 'Design a real-time collaborative document sync engine', duration: '3.5 hours', type: 'Theory', completed: false },
        ],
      },
      {
        weekNumber: 11,
        title: 'Week 11: Dynamic Programming & Hard Algorithmic Patterns',
        description: 'Bitmask DP, Digit DP, Segment Trees, and Fenwick Trees.',
        tasks: [
          { id: 'a-w11-d1', day: 32, title: 'Implement Segment Tree with lazy propagation for range queries', duration: '3 hours', type: 'Practice', completed: false },
          { id: 'a-w11-d2', day: 33, title: 'Solve 4 hard Dynamic Programming optimization problems', duration: '4 hours', type: 'Practice', completed: false },
        ],
      },
      {
        weekNumber: 12,
        title: 'Week 12: Final Placement Mock Interviews & Portfolio Polish',
        description: 'Timed full-length technical interviews, behavioral STAR drills, and GitHub portfolio review.',
        tasks: [
          { id: 'a-w12-d1', day: 34, title: 'Complete full 90-minute algorithmic placement simulation', duration: '2 hours', type: 'Quiz', completed: false },
          { id: 'a-w12-d2', day: 35, title: 'Finalize resume & deploy Capstone Project with live demo URL', duration: '4 hours', type: 'Project', completed: false },
        ],
      },
    ],
    milestoneProject: {
      title: 'Real-Time Distributed Telemetry & Alerting Engine',
      description: 'Stream millions of synthetic sensor metrics through an asynchronous pipeline, computing rolling window anomalies in real-time.',
    },
  },
];
