// Interview Preparation Central Data Architecture

export const interviewProfile = {
  level: 'Level 4 — Interview Ready',
  levelNumber: 4,
  levelTitle: 'Interview Ready',
  nextLevel: 'Level 5 — Job Offer Ready',
  progressToNext: 78,
  readinessScore: 78,
  monthlyImprovement: '+9 points this month',
  totalMockInterviews: 12,
  questionsPracticed: 87,
  currentStreak: 8,
  totalPracticeTime: '6h 42m',
  averageScore: 82,
};

export const interviewReadinessMetrics = [
  {
    id: 'readiness',
    label: 'Interview Readiness',
    score: 78,
    trend: '+9% this month',
    trendDirection: 'up',
    description: 'Comprehensive readiness across behavioral, technical, and executive communication.',
    note: 'Strong momentum. Technical depth is your highest leverage opportunity.',
  },
  {
    id: 'communication',
    label: 'Communication Clarity',
    score: 84,
    trend: '+8% this month',
    trendDirection: 'up',
    description: 'Structure, vocabulary, professional tone, and concise delivery.',
    note: 'Clear, engaging answers with natural conversational flow.',
  },
  {
    id: 'confidence',
    label: 'Confidence & Poise',
    score: 81,
    trend: '+7% this month',
    trendDirection: 'up',
    description: 'Direct eye contact, steady vocal tone, and absence of hesitation markers.',
    note: 'Answers are becoming notably more structured and assertive.',
  },
  {
    id: 'technical',
    label: 'Technical Knowledge',
    score: 72,
    trend: '+4% this month',
    trendDirection: 'up',
    description: 'Depth of system architecture, implementation trade-offs, and scalability.',
    note: 'Strong conceptual grasp; add deeper architectural trade-offs and edge-case handling.',
  },
  {
    id: 'answer_quality',
    label: 'Answer Quality (STAR)',
    score: 79,
    trend: '+6% this month',
    trendDirection: 'up',
    description: 'Clear Situation, Task, Action, and quantifiable Results.',
    note: 'Consistently strong on Action; remember to quantify final business impact.',
  },
  {
    id: 'body_language',
    label: 'Interview Presence',
    score: 76,
    trend: '+5% this month',
    trendDirection: 'up',
    description: 'Upright sitting posture, open hand framing, and camera lens focus.',
    note: 'Posture is solid; avoid downward gaze during cognitive recall.',
  },
];

export const aiInterviewCoach = {
  title: 'Your AI Interview Coach',
  priority: 'Technical Depth & Architecture Trade-offs',
  recommendation:
    'Your strongest area is communication (84%). Your biggest opportunity is technical depth (72%). In your last three sessions, you gave great overviews but missed specific architectural trade-offs and concrete performance metrics.',
  whyItMatters:
    'Senior interviewers look for how you evaluate alternatives (e.g. SQL vs NoSQL, REST vs gRPC) and measure tangible engineering outcomes.',
  actionLabel: 'Practice Technical Project Deep Dive',
  targetMetric: '72% → 82% Technical Depth',
};

export const interviewTypes = [
  {
    id: 'hr',
    title: 'HR & Screening',
    description: 'Intro, career trajectory, culture alignment, strengths, and salary expectations.',
    duration: '15 min',
    questionsCount: 5,
    difficulty: 'Beginner',
    icon: 'UserCheck',
  },
  {
    id: 'behavioral',
    title: 'Behavioral (STAR)',
    description: 'Conflict resolution, leadership, failure, prioritization, and teamwork scenarios.',
    duration: '20 min',
    questionsCount: 6,
    difficulty: 'Intermediate',
    icon: 'MessageSquare',
  },
  {
    id: 'technical',
    title: 'Technical & System Design',
    description: 'Core engineering concepts, API architecture, data structures, and scalability.',
    duration: '30 min',
    questionsCount: 6,
    difficulty: 'Advanced',
    icon: 'Code2',
  },
  {
    id: 'managerial',
    title: 'Managerial & Leadership',
    description: 'Cross-functional strategy, stakeholder alignment, team hiring, and execution.',
    duration: '25 min',
    questionsCount: 5,
    difficulty: 'Expert',
    icon: 'Briefcase',
  },
  {
    id: 'communication',
    title: 'Executive Communication',
    description: 'Concise 60-second executive summaries and high-stakes presentation pitch answers.',
    duration: '15 min',
    questionsCount: 4,
    difficulty: 'Intermediate',
    icon: 'Award',
  },
];

export const questionBank = [
  {
    id: 'q-1',
    question: 'Tell me about yourself and walk me through your professional background.',
    category: 'HR & Screening',
    difficulty: 'Beginner',
    expectedTime: '90–120 sec',
    framework: 'Present → Past → Future',
    whyAsked: 'Assesses communication clarity, career narrative coherence, and immediate relevance to the role.',
    strongAnswerIncludes: [
      'Current role and core superpower (Present)',
      '1–2 key career accomplishments and trajectory (Past)',
      'Why this specific company & role is your natural next step (Future)',
    ],
    commonMistakes: 'Reciting your entire resume chronologically or speaking for over 3 minutes.',
    sampleAnswer:
      "I'm a Full-Stack Engineer with 4 years of experience building high-scale web platforms. Currently at TechCorp, I lead the core services team where we recently reduced API latency by 35% through Redis caching and query optimization. Prior to that, I built automated data pipelines in fintech. I'm looking for my next step at Elevate because of your focus on AI-driven personal growth platforms, where my background in scalable frontend architecture and real-time systems directly aligns.",
  },
  {
    id: 'q-2',
    question: 'Tell me about a time you had a technical disagreement with a team member.',
    category: 'Behavioral (STAR)',
    difficulty: 'Intermediate',
    expectedTime: '2 min',
    framework: 'STAR (Situation, Task, Action, Result)',
    whyAsked: 'Evaluates emotional intelligence, data-driven reasoning, and collaborative problem-solving.',
    strongAnswerIncludes: [
      'Clear context of the disagreement without blaming the colleague',
      'The objective criteria or proof-of-concept used to resolve it',
      'Positive technical and relational outcome',
    ],
    commonMistakes: 'Sounding defensive, dismissing the other perspective, or failing to mention a concrete resolution.',
    sampleAnswer:
      "At my previous company, our senior architect wanted to use MongoDB for a new transaction ledger, while I advocated for PostgreSQL. (Situation) We needed guaranteed ACID compliance and financial reporting integrity. (Task) Instead of arguing opinions, I built a quick 1-day benchmark testing concurrent writes and wrote a lightweight RFC comparing data rollback integrity. (Action) The benchmark demonstrated that PostgreSQL prevented write anomalies under simulated network partitions. The architect agreed, and we deployed Postgres with zero data consistency issues across 500,000 transactions. (Result)",
  },
  {
    id: 'q-3',
    question: 'How do you design a scalable URL shortener like Bit.ly?',
    category: 'Technical & System Design',
    difficulty: 'Advanced',
    expectedTime: '4–5 min',
    framework: 'Requirements → Scale → API → DB Schema → Caching → Trade-offs',
    whyAsked: 'Tests architectural thinking, database selection, hashing algorithms, and distributed caching.',
    strongAnswerIncludes: [
      'Functional & non-functional requirements (500M URLs/month, low latency)',
      'Base62 encoding vs MD5 hash truncation',
      'Database choice (NoSQL key-value vs SQL) and Redis LRU caching layer',
      'Handling high read-to-write ratio (100:1)',
    ],
    commonMistakes: 'Jumping straight into code before clarifying traffic constraints and read/write ratios.',
    sampleAnswer:
      'I approach this by first calculating scale: 500 million new URLs/month with a 100:1 read ratio requires ~5,000 reads/sec. I would implement an API gateway with Base62 encoding on an auto-incrementing 64-bit distributed ID generator (like Snowflake) to generate unique 7-character hashes. For storage, a distributed NoSQL Key-Value store (Cassandra or DynamoDB) keyed by hash provides sub-10ms lookups. A Redis cache in front of the database caches the top 20% most requested URLs, handling 80% of read traffic with minimal DB load.',
  },
  {
    id: 'q-4',
    question: 'Describe a project that failed or did not meet expectations. What did you learn?',
    category: 'Behavioral (STAR)',
    difficulty: 'Intermediate',
    expectedTime: '2 min',
    framework: 'STAR + Reflection',
    whyAsked: 'Assesses self-awareness, accountability, resilience, and post-mortem learning.',
    strongAnswerIncludes: [
      'Genuine failure without sugarcoating',
      'Taking ownership rather than deflecting blame to teammates',
      'Concrete process or architectural changes adopted since',
    ],
    commonMistakes: 'Choosing a fake failure like "I worked too hard" or blaming third-party vendors.',
    sampleAnswer:
      'In 2024, I led the migration of our monolith authentication service to OAuth2 microservices. We missed our launch deadline by 3 weeks because I underestimated the legacy session token dependencies across downstream teams. (Situation & Task) I took responsibility for the delay, held a blameless post-mortem, and immediately instituted automated contract testing with mock consumers. (Action) As a result, our subsequent two platform migrations launched ahead of schedule with zero regression bugs. (Result & Learning)',
  },
  {
    id: 'q-5',
    question: 'Why do you want to work at our company specifically?',
    category: 'HR & Screening',
    difficulty: 'Beginner',
    expectedTime: '90 sec',
    framework: 'Mission + Product Insight + Personal Contribution',
    whyAsked: 'Determines whether you researched the company and have genuine enthusiasm.',
    strongAnswerIncludes: [
      'Specific product feature or recent company milestone',
      'Alignment with engineering culture or mission',
      'Unique value you bring to their immediate challenges',
    ],
    commonMistakes: 'Giving generic praise that could apply to any software company.',
    sampleAnswer:
      "I've been following Elevate's product trajectory, particularly how you combine multimodal AI coaching for public speaking, fitness, and career readiness in a single unified interface. Most learning apps treat productivity in silos, whereas Elevate connects daily habits directly to personal growth. Having spent the last 3 years optimizing real-time reactive UI and client-side performance, I'm excited to help scale your interactive coaching studio to hundreds of thousands of active learners.",
  },
];

export const mockInterviewQuestions = [
  {
    id: 'mq-1',
    question: 'Tell me about yourself and your background in software engineering.',
    category: 'Introduction',
    difficulty: 'Beginner',
    expectedDuration: '90s',
    starType: false,
    followUps: [
      'What was the most challenging project in your recent role?',
      'Why did you choose your primary tech stack for that application?',
    ],
  },
  {
    id: 'mq-2',
    question: 'Describe a time you solved a high-severity production outage under time pressure.',
    category: 'Behavioral',
    difficulty: 'Intermediate',
    expectedDuration: '120s',
    starType: true,
    followUps: [
      'How did you communicate with non-technical stakeholders during the incident?',
      'What automated safeguards did you implement to prevent recurrence?',
    ],
  },
  {
    id: 'mq-3',
    question: 'How do you ensure web application performance and optimize rendering bottlenecks?',
    category: 'Technical',
    difficulty: 'Intermediate',
    expectedDuration: '120s',
    starType: false,
    followUps: [
      'How do you measure First Contentful Paint vs Interaction to Next Paint?',
      'What are the trade-offs of server-side rendering vs client-side caching?',
    ],
  },
  {
    id: 'mq-4',
    question: 'Tell me about a time you mentored a junior engineer or improved team code quality.',
    category: 'Leadership',
    difficulty: 'Intermediate',
    expectedDuration: '120s',
    starType: true,
    followUps: [
      'How did you measure the engineer’s growth over time?',
    ],
  },
];

export const fourteenDayRoadmap = [
  { day: 1, topic: 'Tell Me About Yourself Masterclass', type: 'HR', status: 'completed', score: 88 },
  { day: 2, topic: 'Strengths, Weaknesses & Career Narrative', type: 'HR', status: 'completed', score: 85 },
  { day: 3, topic: 'STAR Behavioral: Teamwork & Conflict', type: 'Behavioral', status: 'completed', score: 82 },
  { day: 4, topic: 'STAR Behavioral: Failure, Adaptability & Ownership', type: 'Behavioral', status: 'completed', score: 80 },
  { day: 5, topic: 'Technical Fundamentals & Data Structures', type: 'Technical', status: 'completed', score: 76 },
  { day: 6, topic: '30-Minute Full Mock Interview #1', type: 'Mock', status: 'completed', score: 84 },
  { day: 7, topic: 'System Design: Scalable Architecture Basics', type: 'System Design', status: 'planned', score: null },
  { day: 8, topic: 'Technical Deep Dive: Project Architecture', type: 'Technical', status: 'planned', score: null },
  { day: 9, topic: '60-Second Concise Executive Answers', type: 'Communication', status: 'planned', score: null },
  { day: 10, topic: 'System Design: Distributed Caching & Databases', type: 'System Design', status: 'planned', score: null },
  { day: 11, topic: 'Behavioral: High-Stakes Leadership Scenarios', type: 'Behavioral', status: 'planned', score: null },
  { day: 12, topic: 'Company-Specific Culture & Role Tailoring', type: 'HR', status: 'planned', score: null },
  { day: 13, topic: '45-Minute Full Executive Mock Interview #2', type: 'Mock', status: 'planned', score: null },
  { day: 14, topic: 'Final Readiness Check & Negotiation Primer', type: 'Strategy', status: 'planned', score: null },
];

export const readinessGaps = [
  {
    id: 'gap-1',
    title: 'Technical Depth & Architecture Trade-offs',
    score: '72%',
    severity: 'high',
    whyItMatters: 'Explaining "why" a technology was chosen over alternatives shows senior maturity.',
    howToFix: 'Structure technical answers with Problem → Approach → Trade-offs → Metrics.',
    drill: 'Technical Deep Dive',
  },
  {
    id: 'gap-2',
    title: 'Quantifying Measurable Results in STAR',
    score: '76%',
    severity: 'medium',
    whyItMatters: 'Answers that end with vague phrases like "the team was happy" miss executive credibility.',
    howToFix: 'Always include specific percentages, dollar impact, or latency improvements in your Result step.',
    drill: 'STAR Results Booster',
  },
  {
    id: 'gap-3',
    title: 'Answer Conciseness on Open-Ended Questions',
    score: '68%',
    severity: 'medium',
    whyItMatters: 'Answers extending beyond 2.5 minutes cause interviewer fatigue and loss of attention.',
    howToFix: 'Aim for the 90-second sweet spot, then check in: "Would you like me to dive deeper into any part?"',
    drill: '60-Second Elevator Pitch',
  },
];

export const dailyInterviewChallenge = {
  title: 'STAR Drill: "Tell me about a time you disagreed with a teammate."',
  description: 'Deliver a structured 2-minute answer highlighting objective data-driven resolution without defensiveness.',
  duration: '2 minutes',
  rewardXp: '+50 XP',
  targetScore: '80+ STAR Score',
};

export const recentInterviewsList = [
  {
    id: 'int-rec-1',
    title: 'Senior Software Engineer Mock Interview',
    type: 'Mock Interview (Alex)',
    date: 'Today, 4:15 PM',
    duration: '22 min',
    score: 84,
    questionsCount: 4,
    fillerWordsPerMin: '3.2 / min (↓ 37%)',
    scores: {
      communication: 86,
      confidence: 84,
      technical: 78,
      structure: 88,
      conciseness: 75,
      professionalism: 92,
    },
    strengths: [
      'Strong, charismatic opening on the introductory background question.',
      'Clear STAR structure applied to production outage incident.',
      'Calm body language with 88% camera lens engagement.',
    ],
    weaknesses: [
      'Technical architecture answer lacked specific latency and throughput metrics.',
      'Minor filler word spikes ("like", "basically") when formulating complex system points.',
    ],
    priorityImprovement: 'Incorporate concrete engineering metrics (RPS, P99 latency) into technical project answers.',
    transcriptExample: {
      question: 'How do you ensure web application performance and optimize rendering bottlenecks?',
      originalAnswer:
        "Well, um, basically we use React DevTools and look at re-renders, and then, you know, we memoize things and add Redis caching on the backend so the API responds fast.",
      improvedAnswer:
        "I approach web performance through three pillars: telemetry, frontend rendering optimization, and API caching. First, I profile real-user metrics like Interaction to Next Paint (INP) using Lighthouse. On the frontend, I eliminate unnecessary re-renders through component splitting and selective memoization. On the backend, I introduce Redis caching with strict TTLs, which in my last project reduced P99 latency from 450ms to 95ms.",
    },
  },
  {
    id: 'int-rec-2',
    title: 'HR Behavioral & Cultural Fit Screening',
    type: 'HR Practice',
    date: 'Yesterday',
    duration: '14 min',
    score: 88,
    questionsCount: 3,
    fillerWordsPerMin: '2.8 / min',
    scores: {
      communication: 90,
      confidence: 88,
      technical: 80,
      structure: 86,
      conciseness: 82,
      professionalism: 94,
    },
    strengths: [
      'Compelling career narrative from self-taught roots to senior engineer.',
      'Authentic enthusiasm for collaborative culture.',
    ],
    weaknesses: [
      'Could be slightly more concise on "Why are you leaving your current role?"',
    ],
    priorityImprovement: 'Frame career transitions purely in terms of growth toward new challenges.',
    transcriptExample: {
      question: 'Tell me about yourself and your background.',
      originalAnswer:
        "I started coding in college, then worked at a couple of startups doing frontend, and now I'm looking for a bigger engineering team.",
      improvedAnswer:
        "I'm a Full-Stack Engineer specializing in high-performance web applications. Over the last 4 years at fintech startups, I scaled customer-facing platforms to 200,000 active users while leading our migration to TypeScript. I'm excited about this role because it allows me to bring that scaling experience to your core product team.",
    },
  },
];

export const subtleAchievements = [
  { id: 'ach-int-1', icon: '🏆', title: 'First Mock Interview', desc: 'Completed full AI interview simulation', unlocked: true },
  { id: 'ach-int-2', icon: '🎤', title: '10 Interview Sessions', desc: 'Completed 10 practice rounds', unlocked: true },
  { id: 'ach-int-3', icon: '🔥', title: '8-Day Interview Streak', desc: 'Maintained consistent daily preparation', unlocked: true },
  { id: 'ach-int-4', icon: '⭐', title: '90+ Interview Score', desc: 'Achieved executive excellence score', unlocked: false },
  { id: 'ach-int-5', icon: '💼', title: 'Interview Ready', desc: 'Achieved >75% across all 6 readiness pillars', unlocked: true },
];
