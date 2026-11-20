import {
  InterviewQuestion,
  JobExamPaper,
  ResumeData,
  SkillTrack,
} from '../types';

export const GRADUATE_SKILL_TRACKS: SkillTrack[] = [
  {
    id: 'sk-fullstack',
    title: 'Full-Stack TypeScript Engineering',
    roleOutcome: 'Junior Software Engineer · Product Engineering',
    durationWeeks: 8,
    coreStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'REST & Auth'],
    overview:
      'Build production-grade web applications from relational schema design and typed API contracts to resilient frontend state management.',
    milestones: [
      {
        id: 'ms-fs-1',
        week: 'Weeks 1–2',
        title: 'TypeScript Strict Modeling & Async Architecture',
        deliverable: 'Implement a type-safe fetch client with retry backoff and discriminated union error states.',
        skills: ['Discriminated Unions', 'Generics', 'AbortController'],
      },
      {
        id: 'ms-fs-2',
        week: 'Weeks 3–4',
        title: 'Accessible React Component Systems',
        deliverable: 'Build a keyboard-navigable data table with URL-synced sorting, filtering, and pagination.',
        skills: ['Custom Hooks', 'ARIA Patterns', 'Memoization'],
      },
      {
        id: 'ms-fs-3',
        week: 'Weeks 5–6',
        title: 'Backend APIs, SQL Indexing & Auth',
        deliverable: 'Design normalized tables, B-tree indexes, and JWT/session middleware with rate limiting.',
        skills: ['Express/REST', 'Query Plans', 'Input Validation'],
      },
      {
        id: 'ms-fs-4',
        week: 'Weeks 7–8',
        title: 'Testing, Observability & Deployment',
        deliverable: 'Ship end-to-end integration tests, structured request logs, and containerized production builds.',
        skills: ['Playwright/Vitest', 'Docker', 'CI Pipelines'],
      },
    ],
    capstoneBrief: {
      title: 'Multi-Tenant Issue Tracker with SLA Analytics',
      requirements: [
        'Role-based workspace access (Admin, Engineer, Viewer)',
        'Optimistic UI updates with rollback on API failure',
        'Indexed search across 10k+ seeded tickets under 50ms',
      ],
    },
  },
  {
    id: 'sk-data-analytics',
    title: 'Data Science & Applied SQL Analytics',
    roleOutcome: 'Data Analyst · Business Intelligence Engineer',
    durationWeeks: 8,
    coreStack: ['SQL Window Functions', 'Python/Pandas', 'Statistics', 'A/B Testing'],
    overview:
      'Translate raw event logs into decision-ready KPI cohorts, retention curves, and statistically valid product experiments.',
    milestones: [
      {
        id: 'ms-da-1',
        week: 'Weeks 1–2',
        title: 'Advanced SQL: CTEs, Window Functions & Funnel Queries',
        deliverable: 'Write a 7-day rolling retention and DAU/MAU stickiness query over event tables.',
        skills: ['RANK/DENSE_RANK', 'LAG/LEAD', 'Cohort Joins'],
      },
      {
        id: 'ms-da-2',
        week: 'Weeks 3–4',
        title: 'Exploratory Analysis & Data Cleaning in Python',
        deliverable: 'Handle missingness, outlier winsorization, and automated data quality assertions.',
        skills: ['Pandas', 'Vectorization', 'Anomaly Detection'],
      },
      {
        id: 'ms-da-3',
        week: 'Weeks 5–6',
        title: 'Hypothesis Testing & Experimentation Design',
        deliverable: 'Calculate sample size power, p-values, and confidence intervals for an A/B pricing test.',
        skills: ['t-test / Chi-Square', 'Statistical Power', 'Sample Ratio Mismatch'],
      },
      {
        id: 'ms-da-4',
        week: 'Weeks 7–8',
        title: 'Predictive Modeling & Executive Storytelling',
        deliverable: 'Train a churn logistic regression baseline with precision-recall tradeoff deck.',
        skills: ['Scikit-Learn', 'ROC-AUC', 'Metric Trees'],
      },
    ],
    capstoneBrief: {
      title: 'Subscription Churn & Cohort Revenue Diagnostics',
      requirements: [
        'Identify top 3 leading behavioral indicators of 30-day churn',
        'Quantify confidence intervals on projected LTV uplift',
        'Produce reproducible notebook + 1-page executive summary',
      ],
    },
  },
  {
    id: 'sk-cloud-devops',
    title: 'Cloud & DevOps Infrastructure',
    roleOutcome: 'Cloud Engineer · Site Reliability Associate',
    durationWeeks: 6,
    coreStack: ['Linux Networking', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    overview:
      'Automate reproducible cloud environments, zero-downtime container rollouts, and proactive health monitoring.',
    milestones: [
      {
        id: 'ms-cd-1',
        week: 'Weeks 1–2',
        title: 'Linux Internals, DNS & Containerization',
        deliverable: 'Author multi-stage Dockerfiles reducing image footprint by 70%+ with non-root users.',
        skills: ['Multi-stage Builds', 'systemd', 'TCP/HTTP Debugging'],
      },
      {
        id: 'ms-cd-2',
        week: 'Weeks 3–4',
        title: 'Kubernetes Orchestration & Infrastructure as Code',
        deliverable: 'Provision VPC, load balancer, and rolling deployment manifests with readiness probes.',
        skills: ['Deployments/Services', 'Terraform Modules', 'IAM Least Privilege'],
      },
      {
        id: 'ms-cd-3',
        week: 'Weeks 5–6',
        title: 'Automated CI/CD & Incident Postmortems',
        deliverable: 'Configure automated lint/test/build pipeline with canary rollback triggers.',
        skills: ['GitHub Actions', 'Prometheus Metrics', 'SLO Error Budgets'],
      },
    ],
    capstoneBrief: {
      title: 'Zero-Downtime Blue/Green Microservice Cluster',
      requirements: [
        'Automated Terraform state management with remote locking',
        'Liveness & readiness health checks verified under load',
        'Simulated node failure recovery documented in runbook',
      ],
    },
  },
  {
    id: 'sk-product-strategy',
    title: 'Product & Technical Program Strategy',
    roleOutcome: 'Associate Product Manager · Business Analyst',
    durationWeeks: 6,
    coreStack: ['PRD Writing', 'North Star Metrics', 'User Discovery', 'Roadmapping'],
    overview:
      'Bridge user pain points, engineering trade-offs, and measurable business outcomes through rigorous product specifications.',
    milestones: [
      {
        id: 'ms-pm-1',
        week: 'Weeks 1–2',
        title: 'Problem Discovery & Opportunity Sizing',
        deliverable: 'Conduct structured 5-user synthesis and build a bottom-up TAM/impact model.',
        skills: ['Jobs-To-Be-Done', 'Funnel Drop-off Audit', 'RICE Scoring'],
      },
      {
        id: 'ms-pm-2',
        week: 'Weeks 3–4',
        title: 'Writing High-Clarity PRDs & Edge-Case Specs',
        deliverable: 'Draft a complete PRD with user stories, API constraints, and success/guardrail metrics.',
        skills: ['Acceptance Criteria', 'Telemetry Spec', 'Scope Cuts'],
      },
      {
        id: 'ms-pm-3',
        week: 'Weeks 5–6',
        title: 'Launch Readiness & Post-Launch Iteration',
        deliverable: 'Design a phased rollout plan with rollback criteria and week-2 cohort review.',
        skills: ['Feature Flags', 'Go-To-Market', 'Root-Cause Analysis'],
      },
    ],
    capstoneBrief: {
      title: 'Onboarding Activation Redesign Case Study',
      requirements: [
        'Diagnose a 42% Day-1 drop-off using funnel telemetry',
        'Define 1 primary North Star metric and 2 counter-metrics',
        'Deliver interactive wireframe flow + engineering scoping sheet',
      ],
    },
  },
];

export const DEFAULT_RESUME_DATA: ResumeData = {
  fullName: 'Arjun Deshmukh',
  headline: 'B.Tech Computer Science Graduate · Full-Stack & Distributed Systems',
  email: 'arjun.deshmukh@example.edu',
  phone: '+91 98765 43210',
  location: 'Hyderabad, India',
  portfolioUrl: 'github.com/arjundeshmukh',
  summary:
    'Computer Science graduate specializing in TypeScript, React, and scalable PostgreSQL backends. Built production-ready web tools handling 12k+ monthly active sessions with sub-100ms API latency.',
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'JNTUH College of Engineering',
      period: '2022 – 2026',
      gpa: '8.7 / 10.0 CGPA',
    },
  ],
  experience: [
    {
      role: 'Software Engineering Intern',
      company: 'FinGrid Systems',
      period: 'May 2025 – Aug 2025',
      bullets: [
        'Engineered a batched CSV reconciliation pipeline in TypeScript, reducing invoice import time by 64%.',
        'Optimized 6 slow PostgreSQL reporting queries via composite indexing, cutting p95 latency from 820ms to 95ms.',
        'Wrote 42 automated integration tests covering payment webhook edge cases and idempotency keys.',
      ],
    },
  ],
  projects: [
    {
      name: 'CampusPulse Exam Scheduler',
      stack: 'React, TypeScript, Express, SQLite',
      bullets: [
        'Built a constraint-based room allocation solver serving 1,400+ students with zero timetable clashes.',
        'Implemented role-based access control and instant PDF seating chart generation.',
      ],
    },
  ],
  skills: 'TypeScript, JavaScript, React, Node.js, Express, PostgreSQL, Python, Docker, Git, REST APIs, Data Structures',
};

export const JOB_EXAM_PAPERS: JobExamPaper[] = [
  {
    id: 'job-gate-cs-2025',
    exam: 'GATE CS',
    year: 2025,
    title: 'GATE Computer Science — Core Algorithms, OS & DBMS Set',
    durationMin: 20,
    cutoffNote: 'General Qualifying Cutoff ~27.6 / 100 · Target Top-500: 62+',
    questions: [
      {
        id: 'gc-1',
        section: 'Algorithms',
        question:
          'What is the worst-case time complexity of building a binary max-heap from an unsorted array of n elements using bottom-up heapify?',
        options: ['O(n log n)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctIndex: 1,
        shortcutTip: 'Most nodes are near the leaves and sift down at most 1–2 levels; ∑(h·n/2^(h+1)) converges to O(n).',
        solution: 'Bottom-up Floyd’s algorithm runs in O(n) linear time, unlike n repeated insertions which take O(n log n).',
      },
      {
        id: 'gc-2',
        section: 'Operating Systems',
        question:
          'A system uses 32-bit virtual addresses, 4 KB page size, and 4-byte page table entries. What is the size of a single-level page table per process?',
        options: ['1 MB', '2 MB', '4 MB', '8 MB'],
        correctIndex: 2,
        shortcutTip: 'Pages = 2³² / 2¹² = 2²⁰ (1M pages). Multiply by 4 bytes/entry = 4 MB.',
        solution: '4 KB = 2¹² bytes ⇒ 20 bits for page number ⇒ 2²⁰ entries × 4 B = 4 MB.',
      },
      {
        id: 'gc-3',
        section: 'DBMS',
        question: 'Which normal form strictly eliminates transitive functional dependencies of non-prime attributes on candidate keys?',
        options: ['1NF', '2NF', '3NF', '4NF'],
        correctIndex: 2,
        shortcutTip: '2NF removes partial dependencies; 3NF removes transitive dependencies.',
        solution: 'Third Normal Form (3NF) requires that for every X → A, either X is a superkey or A is a prime attribute.',
      },
    ],
  },
  {
    id: 'job-tcs-nqt-2025',
    exam: 'TCS NQT',
    year: 2025,
    title: 'TCS NQT Foundation & Advanced Numerical / Coding Aptitude',
    durationMin: 15,
    cutoffNote: 'Digital/Prime Shortlist Benchmark: ≥75% Accuracy in Quantitative & Logic',
    questions: [
      {
        id: 'tcs-1',
        section: 'Quantitative Aptitude',
        question:
          'Pipe A fills a tank in 12 hours and Pipe B fills it in 15 hours. If both are opened together and Pipe A is closed after 3 hours, how many more hours will Pipe B take to fill the remaining tank?',
        options: ['6.25 hrs', '7.5 hrs', '8.25 hrs', '9.0 hrs'],
        correctIndex: 2,
        shortcutTip: 'Take tank capacity = LCM(12, 15) = 60 units. A = 5 u/hr, B = 4 u/hr.',
        solution: 'In 3 hrs, A+B fill 3×(5+4) = 27 units. Remaining = 60 − 27 = 33 units. B alone takes 33 / 4 = 8.25 hours.',
      },
      {
        id: 'tcs-2',
        section: 'Profit & Loss',
        question:
          'A merchant marks an item 40% above cost price and offers a 25% discount. What is his net profit percentage?',
        options: ['5%', '10%', '12.5%', '15%'],
        correctIndex: 0,
        shortcutTip: 'Successive % formula: +40 − 25 + (40×−25)/100 = 15 − 10 = +5%.',
        solution: 'Let CP = 100 ⇒ MP = 140 ⇒ SP = 140 × 0.75 = 105 ⇒ Net profit = 5%.',
      },
      {
        id: 'tcs-3',
        section: 'Logical Reasoning',
        question: 'In a certain code, STREAM is written as TVUIFO? Wait—if LOGIC is coded as MPHJD, how is SMART coded?',
        options: ['TNBSU', 'TNBRU', 'TNBSS', 'UMBSU'],
        correctIndex: 0,
        shortcutTip: 'Each letter shifts +1 alphabetically: L→M, O→P, G→H, I→J, C→D.',
        solution: 'Applying +1 shift to SMART yields S→T, M→N, A→B, R→S, T→U ⇒ TNBSU.',
      },
    ],
  },
  {
    id: 'job-infosys-sp-2024',
    exam: 'Infosys SP',
    year: 2024,
    title: 'Infosys Specialist Programmer — Pseudocode & DSA Reasoning',
    durationMin: 15,
    cutoffNote: 'Specialist Programmer Round 1 Benchmark: 2/3 Coding + Clean Complexity Analysis',
    questions: [
      {
        id: 'inf-1',
        section: 'Data Structures',
        question:
          'Given an array of n integers where every element appears twice except one unique element, what is the optimal time and space complexity to find the unique element?',
        options: ['O(n log n) time, O(1) space', 'O(n) time, O(n) space', 'O(n) time, O(1) space', 'O(n²) time, O(1) space'],
        correctIndex: 2,
        shortcutTip: 'XOR all elements together: a ⊕ a = 0 and a ⊕ 0 = a.',
        solution: 'Bitwise XOR cancellation runs in a single O(n) pass using O(1) extra memory.',
      },
      {
        id: 'inf-2',
        section: 'Dynamic Programming',
        question: 'How many distinct ways can you climb n stairs if you can take 1 or 2 steps at a time, for n = 6?',
        options: ['8', '13', '21', '12'],
        correctIndex: 1,
        shortcutTip: 'Follows Fibonacci sequence starting f(1)=1, f(2)=2, f(3)=3, f(4)=5, f(5)=8, f(6)=13.',
        solution: 'dp[i] = dp[i−1] + dp[i−2]; computing up to i = 6 gives 13 distinct paths.',
      },
    ],
  },
  {
    id: 'job-cat-quant-2024',
    exam: 'CAT Quant & DILR',
    year: 2024,
    title: 'CAT Quantitative Ability & Data Sufficiency Drill',
    durationMin: 15,
    cutoffNote: '95+ Percentile Target: Selective Accuracy Over Attempt Volume',
    questions: [
      {
        id: 'cat-1',
        section: 'Number Systems',
        question: 'What is the remainder when 7¹⁰⁰ is divided by 6?',
        options: ['0', '1', '3', '5'],
        correctIndex: 1,
        shortcutTip: '7 ≡ 1 (mod 6), so 7^k ≡ 1^k (mod 6) for any positive integer k.',
        solution: 'Since 7 = 6 + 1, binomial expansion leaves only 1¹⁰⁰ = 1 as remainder.',
      },
      {
        id: 'cat-2',
        section: 'Mixtures & Alligation',
        question:
          'A 40-litre mixture of milk and water contains 20% water. How many litres of pure water must be added to make water 36% of the new mixture?',
        options: ['8 litres', '10 litres', '12 litres', '15 litres'],
        correctIndex: 1,
        shortcutTip: 'Milk volume stays unchanged! Milk = 80% of 40 = 32 L, which becomes 64% of the new mixture.',
        solution: '0.64 × V_new = 32 ⇒ V_new = 50 L. Added water = 50 − 40 = 10 litres.',
      },
    ],
  },
];

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'iq-fe-1',
    track: 'Frontend & Full-Stack',
    difficulty: 'Junior / Fresher',
    recommendedSec: 180,
    isBehavioral: false,
    prompt:
      'Walk through how you would prevent unnecessary re-renders and race conditions in a live search input that fetches results from a backend API as the user types.',
    rubricCriteria: [
      'Mentions debouncing (250–350ms) to cut redundant network calls',
      'Handles out-of-order responses using AbortController or request sequence IDs',
      'Addresses loading, empty, and error UI states cleanly',
      'Explains memoization or state isolation so unrelated siblings do not re-render',
    ],
    followUps: [
      'How would you cache repeated search queries on the client?',
      'What happens if the user clears the input while a previous fetch is still in flight?',
    ],
    modelAnswer:
      'First, separate the controlled input state from the debounced query state (e.g., 300ms delay) so typing stays responsive while API calls throttle. Second, attach an AbortController inside the effect cleanup: whenever the query changes or the component unmounts, abort the stale in-flight request to eliminate out-of-order race conditions. Keep search results scoped to the results component and display explicit loading, zero-result, and retry states.',
  },
  {
    id: 'iq-be-1',
    track: 'Backend & System Design',
    difficulty: 'Mid-Level',
    recommendedSec: 240,
    isBehavioral: false,
    prompt:
      'Design an idempotent payment or order-creation API endpoint so that accidental client retries on flaky mobile networks never double-charge a customer.',
    rubricCriteria: [
      'Requires a client-generated Idempotency-Key header (UUID)',
      'Persists key + request payload hash + cached response inside a DB transaction or Redis lock',
      'Returns the original response on duplicate key or 409/422 if payload differs',
      'Discusses TTL cleanup and concurrency locking for simultaneous retries',
    ],
    followUps: [
      'What happens if two identical retry requests hit two different servers at the exact same millisecond?',
      'How long should idempotency keys be retained?',
    ],
    modelAnswer:
      'Require the client to send a unique Idempotency-Key header generated per checkout intent. On the server, wrap the check-and-insert in a relational unique constraint (or atomic Redis SETNX lock) with status = IN_PROGRESS. If a duplicate arrives concurrently, return 409 Conflict or wait briefly; if completed, verify the request body hash matches and replay the exact stored HTTP response without re-executing the payment gateway call.',
  },
  {
    id: 'iq-da-1',
    track: 'Data & Analytics',
    difficulty: 'Junior / Fresher',
    recommendedSec: 180,
    isBehavioral: false,
    prompt:
      'Your product dashboard shows Day-7 user retention dropped from 34% to 22% this week. How do you systematically diagnose the root cause?',
    rubricCriteria: [
      'Validates data pipeline / tracking instrumentation health before assuming product regression',
      'Segments drop-off by platform (iOS/Android/Web), acquisition channel, and geography',
      'Checks funnel step conversion and recent feature/release timestamps',
      'Proposes a concrete verification metric or fix hypothesis',
    ],
    followUps: [
      'How do you distinguish a tracking bug from a genuine user drop-off?',
      'Which SQL dimensions would you join first?',
    ],
    modelAnswer:
      'Start with a sanity check on event ingestion volume and schema changes to rule out broken telemetry. Next, slice the retention cohort across OS version, signup source, and onboarding funnel steps—if the drop isolates to Android v3.4 after Tuesday’s release, inspect crash logs and onboarding step-2 completion. Summarize findings with quantified cohort impact and validate recovery after rollback or patch.',
  },
  {
    id: 'iq-hr-1',
    track: 'HR & Behavioral',
    difficulty: 'High Impact',
    recommendedSec: 180,
    isBehavioral: true,
    prompt:
      'Tell me about a time you disagreed with a teammate or mentor on a technical or project decision, and how you resolved it.',
    rubricCriteria: [
      'Follows STAR structure clearly without blaming teammates',
      'Uses objective criteria (latency, maintainability, user impact, deadlines) rather than ego',
      'Demonstrates active listening and willingness to prototype or compromise',
      'Closes with measurable outcome and lesson learned',
    ],
    followUps: [
      'If you had to make that decision again with less time, what would you do differently?',
      'How did you maintain trust with that teammate afterward?',
    ],
    modelAnswer:
      'Situation: During our final-year capstone, a teammate wanted to build a custom WebSocket server from scratch, while we had only 10 days before evaluation. Task: Deliver real-time quiz sync reliably without jeopardizing core features. Action: Instead of debating opinions, I proposed a 2-hour spike comparing build effort and listed the top 3 risks (reconnection handling, state drift). We agreed to adopt a proven pub/sub channel for v1 and revisit custom sockets if latency exceeded 200ms. Result: We shipped 3 days early with zero sync bugs during live demo.',
  },
];
