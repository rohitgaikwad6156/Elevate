// Learning Hub Central Data Architecture

export const learningProfile = {
  userName: 'Rohit',
  learningScore: 72,
  monthlyImprovement: '+11% this month',
  lessonsCompleted: 48,
  totalLearningTime: '18h 32m',
  skillsCount: 14,
  currentStreak: 14,
  longestStreak: 21,
  vocabularyWordsLearned: 428,
  averageQuizScore: '84%',
  learningPathsActive: 3,
  learningPathsCompleted: 1,
};

export const learningScorePillars = [
  { name: 'Knowledge', score: 78, trend: '+8%', note: 'Broad conceptual mastery across communication frameworks' },
  { name: 'Practice', score: 74, trend: '+12%', note: 'Interactive quiz accuracy and scenario completions' },
  { name: 'Consistency', score: 88, trend: '+9%', note: '14-day continuous daily lesson habit' },
  { name: 'Skill Application', score: 70, trend: '+15%', note: 'Applying concepts in mock interviews & speaking practice' },
];

export const continueLearningCard = {
  id: 'path-1',
  pathTitle: 'Professional Communication',
  currentLesson: 'Lesson 4 of 8: Speaking With Direct Clarity',
  progressPercent: 48,
  estimatedTimeLeft: '12 min',
};

export const todaysDailyLesson = {
  id: 'lesson-today',
  title: 'How to Speak More Clearly & Eliminate Word Padding',
  duration: '10 min',
  skill: 'Communication',
  difficulty: 'Intermediate',
  whyRecommended: 'Your recent speaking practice shows clarity and concise phrasing are your highest-leverage opportunities.',
  xpReward: '+20 XP',
};

export const aiLearningCoach = {
  title: 'Your AI Learning Coach',
  recommendedSkill: 'Answer Structure (The PREP Framework)',
  time: '12 min',
  recommendation:
    "You've been actively practicing mock interviews and public speaking. Today, learn how to structure high-impact answers using Point, Reason, Example, Point (PREP) to eliminate rambling.",
  whyItMatters:
    'The PREP framework cuts answer formulation time by 50% while making executive communication sound crisp and decisive.',
  actionLabel: 'Start PREP Framework Lesson',
};

export const learningPathsList = [
  {
    id: 'path-1',
    title: 'Professional Communication & Influence',
    subtitle: 'Become a clearer, more confident workplace communicator',
    level: 'Beginner → Advanced',
    lessonsCount: 12,
    totalDuration: '3h 40m',
    progress: 68,
    skills: ['Direct Speaking', 'Active Listening', 'Persuasion', 'Executive Tone'],
    modules: [
      { id: 'm-1', title: '1. Communication Foundations', duration: '25 min', status: 'completed' },
      { id: 'm-2', title: '2. Active Listening & Asking Deep Questions', duration: '30 min', status: 'completed' },
      { id: 'm-3', title: '3. Speaking With Direct Clarity', duration: '20 min', status: 'completed' },
      { id: 'm-4', title: '4. The PREP Framework for Spontaneous Answers', duration: '25 min', status: 'active' },
      { id: 'm-5', title: '5. Persuasive Structuring & Executive Summaries', duration: '30 min', status: 'locked' },
      { id: 'm-6', title: '6. Navigating Difficult Conversations & Disagreements', duration: '35 min', status: 'locked' },
      { id: 'm-7', title: '7. Executive Presence & Cross-Functional Alignment', duration: '40 min', status: 'locked' },
    ],
  },
  {
    id: 'path-2',
    title: 'Executive Presence & Public Speaking Mastery',
    subtitle: 'Deliver captivating presentations and lead boardroom discussions',
    level: 'Intermediate → Expert',
    lessonsCount: 10,
    totalDuration: '2h 50m',
    progress: 40,
    skills: ['Storytelling Arc', 'Vocal Variety', 'Slide Delivery', 'Q&A Control'],
    modules: [
      { id: 'm-21', title: '1. The 6-Stage Narrative Arc for Leaders', duration: '25 min', status: 'completed' },
      { id: 'm-22', title: '2. Vocal Cadence, Pitch & Tactical Pauses', duration: '20 min', status: 'completed' },
      { id: 'm-23', title: '3. High-Stakes Presentation Slide Flow', duration: '30 min', status: 'active' },
      { id: 'm-24', title: '4. Commanding the Room: Nonverbal Poise', duration: '25 min', status: 'locked' },
      { id: 'm-25', title: '5. Handling Hostile Questions with Grace', duration: '30 min', status: 'locked' },
    ],
  },
  {
    id: 'path-3',
    title: 'Career Acceleration & Behavioral STAR Mastery',
    subtitle: 'Interview frameworks, salary negotiation, and career strategy',
    level: 'All Levels',
    lessonsCount: 14,
    totalDuration: '4h 15m',
    progress: 25,
    skills: ['STAR Method', 'Negotiation', 'Technical Project Framing', 'Leadership Narrative'],
    modules: [
      { id: 'm-31', title: '1. Deconstructing Behavioral Questions', duration: '30 min', status: 'completed' },
      { id: 'm-32', title: '2. Quantifying Engineering & Business Outcomes', duration: '25 min', status: 'active' },
      { id: 'm-33', title: '3. Answering "Tell Me About Yourself"', duration: '20 min', status: 'locked' },
      { id: 'm-34', title: '4. The Psychology of Value-Based Compensation', duration: '35 min', status: 'locked' },
    ],
  },
];

export const sampleLessonDetail = {
  id: 'lesson-1',
  pathName: 'Professional Communication',
  lessonNumber: 'Lesson 4 of 8',
  title: 'Speaking With Direct Clarity (The PREP Method)',
  duration: '10 min',
  skill: 'Communication & Structure',
  difficulty: 'Intermediate',
  concept:
    'When asked a spontaneous question in meetings or interviews, professionals often ramble while trying to figure out what they want to say. The PREP framework provides an instant, structured mental roadmap: Point, Reason, Example, and Point.',
  keyPrinciple: 'Lead with your conclusion first (BLUF: Bottom Line Up Front) rather than building up to it slowly.',
  beforeAfter: {
    before: '"I was thinking that maybe, if everyone is open to it, we could potentially consider testing a weekly async check-in..."',
    after: '"I recommend moving our daily status sync to an async Slack thread. (Point) It will save the team 4 hours of context-switching weekly. (Reason)"',
  },
  practiceTask: {
    question: 'Which response demonstrates stronger executive clarity?',
    options: [
      { id: 'a', text: '"I don’t really know for sure, but maybe we could test changing the API endpoint."', correct: false, explanation: 'Contains 3 hedge phrases ("don’t really know", "maybe", "could") that dilute authority.' },
      { id: 'b', text: '"I recommend migrating to the v2 endpoint. It cuts P99 latency by 30% and is already tested in staging."', correct: true, explanation: 'Direct recommendation followed immediately by quantifiable technical rationale.' },
    ],
  },
  learningObjectives: [
    'Master the 4-step PREP framework for meetings and interviews',
    'Identify and eliminate hedge words ("maybe", "kind of", "I feel like")',
    'Structure concise 60-second updates with measurable impact',
  ],
};

export const microLessonsList = [
  { id: 'micro-1', title: 'Stop Using Filler Words: The 2-Second Silent Pause', duration: '5 min', skill: 'Public Speaking', difficulty: 'Beginner' },
  { id: 'micro-2', title: 'How to Give Crisp Answers Using BLUF (Bottom Line Up Front)', duration: '7 min', skill: 'Communication', difficulty: 'Intermediate' },
  { id: 'micro-3', title: '3 Ways to Sound Confident When You Disagree with Your Manager', duration: '8 min', skill: 'Career Skills', difficulty: 'Intermediate' },
  { id: 'micro-4', title: 'How to Tell a High-Stakes Engineering Story in 90 Seconds', duration: '10 min', skill: 'Storytelling', difficulty: 'Advanced' },
];

export const vocabularyHubData = {
  wordsLearned: 428,
  streakDays: 14,
  masteryPercent: 68,
  todayWords: [
    {
      id: 'w-1',
      word: 'Concise',
      phonetic: '/kənˈsaɪs/',
      meaning: 'Expressing much in few words; clear and succinct without unnecessary elaboration.',
      example: 'Her concise executive summary enabled the leadership team to approve the budget immediately.',
      synonyms: ['Succinct', 'Pithy', 'Direct', 'Terse'],
      category: 'Workplace Communication',
      mastered: true,
    },
    {
      id: 'w-2',
      word: 'Articulate',
      phonetic: '/ɑːrˈtɪkjuleɪt/',
      meaning: 'Having or showing the ability to speak fluently and coherently.',
      example: 'He was able to articulate complex system trade-offs to non-technical stakeholders.',
      synonyms: ['Eloquent', 'Coherent', 'Expressive', 'Lucid'],
      category: 'Professional Presence',
      mastered: true,
    },
    {
      id: 'w-3',
      word: 'Pragmatic',
      phonetic: '/præɡˈmætɪk/',
      meaning: 'Dealing with things sensibly and realistically based on practical rather than theoretical considerations.',
      example: 'We took a pragmatic engineering approach, shipping an MVP rather than over-engineering.',
      synonyms: ['Practical', 'Realistic', 'Down-to-earth', 'Sensible'],
      category: 'Leadership & Strategy',
      mastered: false,
    },
    {
      id: 'w-4',
      word: 'Leverage',
      phonetic: '/ˈlevərɪdʒ/',
      meaning: 'Use something to maximum advantage.',
      example: 'We leveraged existing Redis clusters to handle the sudden 5x traffic surge without extra infrastructure cost.',
      synonyms: ['Utilize', 'Capitalize on', 'Exploit', 'Harness'],
      category: 'Technical Leadership',
      mastered: true,
    },
  ],
};

export const workplaceScenarios = [
  {
    id: 'scen-1',
    title: 'Pushing Back on an Unrealistic Product Deadline',
    context: 'Your product manager asks to compress a 4-week architectural refactor into 5 days to hit an arbitrary marketing event.',
    options: [
      { id: 'a', text: '"Sure, we will try our best to work overtime and see how much gets done."', rating: 'Weak', feedback: 'Sets false expectations and guarantees technical debt or burnout.' },
      { id: 'b', text: '"That is impossible. Engineering cannot cut corners like that."', rating: 'Defensive', feedback: 'Creates emotional friction without presenting constructive alternatives.' },
      { id: 'c', text: '"To hit the 5-day marketing date, we can ship a scoped v1 with read-only traffic, and deploy the full write-pipeline in sprint 2."', rating: 'Optimal', feedback: 'Pragmatic, solutions-oriented executive trade-off.' },
    ],
  },
  {
    id: 'scen-2',
    title: 'Disagreement in Architecture Review',
    context: 'A peer engineer advocates for an unproven framework that adds considerable maintenance overhead.',
    options: [
      { id: 'a', text: '"I propose we run a 1-day benchmark comparing build size, cold-start latency, and team ramp-up time before deciding."', rating: 'Optimal', feedback: 'Uses objective data and consensus-building without personal bias.' },
      { id: 'b', text: '"I have more experience in this stack, so we should stick to what I know works."', rating: 'Weak', feedback: 'Appeals to personal authority rather than objective engineering rationale.' },
    ],
  },
];

export const quizBank = [
  {
    id: 'quiz-1',
    title: 'Workplace Communication & Clarity Check',
    questionCount: 5,
    estimatedMinutes: 5,
    difficulty: 'Intermediate',
    questions: [
      {
        q: 'What is the primary objective of the "Bottom Line Up Front" (BLUF) communication method?',
        options: [
          'To hide negative results until the very end',
          'To give the key decision or takeaway in the first sentence so executives understand the point immediately',
          'To write long formal emails with extensive background history',
          'To avoid giving recommendations directly',
        ],
        correct: 1,
        explanation: 'BLUF respects cognitive attention by placing the actionable recommendation first.',
      },
      {
        q: 'In the PREP framework, what does the second "P" stand for?',
        options: ['Presentation', 'Priority', 'Point (Restatement of your core conclusion)', 'Planning'],
        correct: 2,
        explanation: 'PREP concludes by reinforcing your initial Point with decisive conviction.',
      },
      {
        q: 'Which phrase is the most effective replacement for "I might be wrong, but maybe we should..."?',
        options: [
          '"I recommend that we..."',
          '"I feel kind of like we could..."',
          '"Don’t blame me if this fails, but..."',
          '"I guess we could consider..."',
        ],
        correct: 0,
        explanation: '"I recommend that we..." demonstrates clear ownership and professional confidence.',
      },
    ],
  },
];

export const skillMasteryData = [
  { skill: 'Communication Clarity', level: 'Level 4', mastery: 82, nextStep: 'Difficult Conversations' },
  { skill: 'Vocabulary Depth', level: 'Level 3', mastery: 71, nextStep: 'Executive Phrasing' },
  { skill: 'Public Speaking', level: 'Level 4', mastery: 80, nextStep: 'Storytelling Arc' },
  { skill: 'Interview Readiness', level: 'Level 4', mastery: 74, nextStep: 'Technical Trade-offs' },
  { skill: 'Workplace Soft Skills', level: 'Level 3', mastery: 62, nextStep: 'Negotiation & Consensus' },
];

export const dailyLearningChallenge = {
  title: 'Master 3 Executive Vocabulary Words in Sentences',
  description: 'Complete the 3-minute vocabulary drill for "Concise", "Articulate", and "Pragmatic".',
  duration: '3 minutes',
  rewardXp: '+50 XP',
  completed: false,
};

export const subtleAchievements = [
  { id: 'ach-learn-1', icon: '📚', title: 'First Lesson', desc: 'Completed baseline learning module', unlocked: true },
  { id: 'ach-learn-2', icon: '🔥', title: '14-Day Learning Streak', desc: 'Maintained two weeks of daily skill growth', unlocked: true },
  { id: 'ach-learn-3', icon: '🧠', title: '40+ Lessons Logged', desc: 'Finished over 40 structured lessons', unlocked: true },
  { id: 'ach-learn-4', icon: '🎯', title: 'Skill Master', desc: 'Achieved >80% mastery in Communication', unlocked: true },
  { id: 'ach-learn-5', icon: '🏆', title: 'Learning Path Complete', desc: 'Finished full Foundations curriculum', unlocked: true },
  { id: 'ach-learn-6', icon: '📖', title: 'Vocabulary Builder', desc: 'Mastered over 400 professional words', unlocked: true },
];
