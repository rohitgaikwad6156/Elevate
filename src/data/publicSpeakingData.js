// Public Speaking Module Data Architecture

export const speakingProfile = {
  level: 'Level 1 — Novice Speaker',
  levelNumber: 1,
  levelTitle: 'Novice Speaker',
  nextLevel: 'Level 2 — Emerging Speaker',
  progressToNext: 0,
  totalSpeakingTime: '0m',
  totalSessions: 0,
  streakDays: 0,
};

export const topPerformanceMetrics = [
  {
    id: 'score',
    label: 'Speaking Score',
    value: 0,
    unit: '/100',
    trend: 'No data yet',
    trendDirection: 'neutral',
    description: 'Composite rating across delivery, language, clarity, and presence.',
  },
  {
    id: 'confidence',
    label: 'Confidence',
    value: 0,
    unit: '%',
    trend: 'No data yet',
    trendDirection: 'neutral',
    description: 'Vocal projection, steady pacing, and lack of hesitation markers.',
  },
  {
    id: 'clarity',
    label: 'Clarity',
    value: 0,
    unit: '%',
    trend: 'No data yet',
    trendDirection: 'neutral',
    description: 'Articulation precision, pronunciation, and thought structure.',
  },
  {
    id: 'fluency',
    label: 'Fluency',
    value: 0,
    unit: '%',
    trend: 'No data yet',
    trendDirection: 'neutral',
    description: 'Smooth sentence transitions and low pause disruption.',
  },
  {
    id: 'pace',
    label: 'Pace',
    value: 0,
    unit: 'WPM 0',
    trend: 'No data yet',
    trendDirection: 'neutral',
    description: 'Words per minute. Optimal range for comprehension is 125-140 WPM.',
  },
  {
    id: 'vocabulary',
    label: 'Vocabulary',
    value: 0,
    unit: '%',
    trend: 'No data yet',
    trendDirection: 'neutral',
    description: 'Lexical variety, precision phrasing, and absence of repetitive fillers.',
  },
];

export const aiCoachRecommendation = {
  headline: 'Focus on Tactical Pauses Between Major Ideas',
  recommendation:
    'Your confidence and fluency are strong (82%), but your pace surges to 158 WPM during complex explanations. Slow down by 10–15% and insert deliberate 1-second pauses after key takeaways.',
  whyItMatters:
    'Pauses signal authority, give listeners time to absorb your core point, and dramatically reduce the urge to use filler words like "um" or "like".',
  actionLabel: 'Practice Paced Speech Now',
  targetWpm: '130–140 WPM',
};

export const practiceTypes = [
  { id: 'free', name: 'Free Speaking', description: 'Speak freely on any thought to build spontaneous flow.' },
  { id: 'topic', name: 'Topic Speaking', description: 'Structured delivery on curated industry & everyday prompts.' },
  { id: 'read_aloud', name: 'Read Aloud', description: 'Refine cadence, syllable stress, and vocal projection.' },
  { id: 'qa', name: 'Q&A Answering', description: 'Practice crisp, structured responses to tough questions.' },
  { id: 'professional', name: 'Professional Speaking', description: 'Executive updates, pitch decks, and team briefings.' },
  { id: 'interview', name: 'Interview Speaking', description: 'Behavioral answers using STAR framework.' },
];

export const practiceDifficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
export const practiceDurations = [
  { label: '1 min', seconds: 60 },
  { label: '2 min', seconds: 120 },
  { label: '3 min', seconds: 180 },
  { label: '5 min', seconds: 300 },
];

export const curatedTopics = [
  {
    id: 't1',
    title: 'The Future of Remote Work & Hybrid Culture',
    category: 'Professional',
    difficulty: 'Intermediate',
    keyPoints: ['Autonomy vs Collaboration', 'Async communication tools', 'Trust-based performance'],
  },
  {
    id: 't2',
    title: 'How Artificial Intelligence Reshapes Creative Work',
    category: 'Technology',
    difficulty: 'Advanced',
    keyPoints: ['Augmentation over replacement', 'Human curation', 'Ethical considerations'],
  },
  {
    id: 't3',
    title: 'Overcoming Failure: A Turning Point in My Career',
    category: 'Inspirational',
    difficulty: 'Intermediate',
    keyPoints: ['The initial setback', 'Key realization', 'How it built resilience'],
  },
  {
    id: 't4',
    title: 'Why Great Leaders Prioritize Active Listening',
    category: 'Leadership',
    difficulty: 'Advanced',
    keyPoints: ['Empathy in decision making', 'Fostering psychological safety', 'Reducing misunderstandings'],
  },
];

export const speechStyles = [
  { id: 'persuasive', name: 'Persuasive', desc: 'Influence decisions, pitch ideas, and rally support with compelling rationale.' },
  { id: 'informative', name: 'Informative', desc: 'Break down complex concepts into digestible, crystal-clear insights.' },
  { id: 'inspirational', name: 'Inspirational', desc: 'Motivate and energize audiences through emotional resonance and vision.' },
  { id: 'professional', name: 'Professional', desc: 'Deliver concise executive summaries and strategic project updates.' },
  { id: 'academic', name: 'Academic', desc: 'Present rigorous research, empirical evidence, and analytical evaluations.' },
  { id: 'leadership', name: 'Leadership', desc: 'Set direction, establish team values, and cast a compelling future vision.' },
];

export const impromptuTopics = [
  'Should artificial intelligence replace traditional university education?',
  'Is failure a necessary prerequisite for exceptional success?',
  'What is the single most important skill for the next generation of leaders?',
  'Should social media algorithms be legally required to be open-source?',
  'If you could solve one global challenge in 5 years, which would you pick and why?',
];

export const storytellingStages = [
  { step: 1, name: 'Hook', desc: 'Grab immediate attention with a startling statement, question, or vivid scene.' },
  { step: 2, name: 'Setup', desc: 'Establish context, the protagonist stakes, and ordinary baseline reality.' },
  { step: 3, name: 'Conflict', desc: 'Introduce the unexpected challenge, crisis, or insurmountable obstacle.' },
  { step: 4, name: 'Turning Point', desc: 'The moment of decisive action, breakthrough insight, or critical shift.' },
  { step: 5, name: 'Resolution', desc: 'How the struggle concluded and what immediate transformation occurred.' },
  { step: 6, name: 'Lesson', desc: 'The universal principle, takeaway, or moral that inspires the audience.' },
];

export const debateScenarios = [
  {
    id: 'deb1',
    topic: 'Should remote work become the universal default for knowledge workers?',
    userPosition: 'For',
    aiPosition: 'Against',
    rounds: [
      {
        round: 1,
        name: 'Opening Argument',
        userPrompt: 'Deliver your 90-second opening statement on why remote work boosts productivity and quality of life.',
        aiResponse: 'While flexibility is appealing, universal remote work erodes company culture, destroys serendipitous collaboration, and leads to isolation.',
      },
      {
        round: 2,
        name: 'Counterargument',
        userPrompt: 'Rebut the AI point regarding culture erosion and serendipity with concrete async collaboration solutions.',
        aiResponse: 'Even with async tools, junior talent suffers from lack of in-person mentorship and tacit knowledge transfer.',
      },
      {
        round: 3,
        name: 'Rebuttal',
        userPrompt: 'Defend how structured onboarding and global talent access outweigh in-person co-location limits.',
        aiResponse: 'Global access is real, but cross-timezone synchronization creates cognitive fatigue and fragmented teamwork.',
      },
      {
        round: 4,
        name: 'Closing Statement',
        userPrompt: 'Synthesize your core arguments into a decisive 60-second closing summary.',
        aiResponse: 'In conclusion, while hybrid models offer balance, mandatory universal remote work sacrifices long-term innovation velocity.',
      },
    ],
  },
];

export const radarSkillsData = [
  { skill: 'Confidence', current: 0, previous: 0 },
  { skill: 'Clarity', current: 0, previous: 0 },
  { skill: 'Fluency', current: 0, previous: 0 },
  { skill: 'Vocabulary', current: 0, previous: 0 },
  { skill: 'Pace Control', current: 0, previous: 0 },
  { skill: 'Pronunciation', current: 0, previous: 0 },
  { skill: 'Structure', current: 0, previous: 0 },
  { skill: 'Persuasion', current: 0, previous: 0 },
];

export const weaknessOpportunities = [
  {
    id: 'w1',
    title: 'Speaking Pace Surges',
    stat: '154 WPM avg',
    target: '130–140 WPM',
    severity: 'high',
    whyItMatters: 'Speaking too rapidly reduces listener retention by 35% and signals nervous energy.',
    howToFix: 'Tap your finger lightly on every major noun to establish a deliberate cadence.',
    practiceMode: 'read_aloud',
  },
  {
    id: 'w2',
    title: 'Filler Word Dependency',
    stat: '8.5 fillers / min',
    target: '< 2 / min',
    severity: 'medium',
    whyItMatters: 'Frequent "um", "like", and "you know" undermine your perceived authority.',
    howToFix: 'When searching for your next word, close your lips and take a silent breath instead of vocalizing.',
    practiceMode: 'qa',
  },
  {
    id: 'w3',
    title: 'Transition Pauses',
    stat: '0.4s pause avg',
    target: '1.0s–1.5s',
    severity: 'medium',
    whyItMatters: 'Listeners need micro-pauses to process one idea before you introduce the next.',
    howToFix: 'Count silently "one, two" in your head when transitioning between slides or bullet points.',
    practiceMode: 'topic',
  },
];

export const dailyChallenge = {
  title: "Explain Your Favorite Technology in Exactly 60 Seconds",
  description: "Deliver a crisp, high-impact breakdown of a tool you use daily. Focus on the core problem it solves.",
  duration: "60 seconds",
  rewardXp: "+50 XP",
  targetScore: "80+",
  completed: false,
};

export const recentSessionsList = [];
