// Progress Central Data Architecture

export const overallGrowthScore = {
  score: 0,
  maxScore: 100,
  previousScore: 0,
  improvement: '0 points this month',
  status: 'Just Starting',
  targetScore: 50,
  pointsToTarget: 50,
  description: 'Your overall score combines progress and consistency across all areas of ELEVATE.',
};

export const growthScoreBreakdown = [
  { id: 'english', label: 'English', score: 0, trend: '0%', trendDirection: 'neutral', icon: 'BookA', color: '#3b82f6' },
  { id: 'speaking', label: 'Public Speaking', score: 0, trend: '0%', trendDirection: 'neutral', icon: 'Mic', color: '#8b5cf6' },
  { id: 'body_language', label: 'Body Language', score: 0, trend: '0%', trendDirection: 'neutral', icon: 'Eye', color: '#f59e0b' },
  { id: 'fitness', label: 'Fitness', score: 0, trend: '0%', trendDirection: 'neutral', icon: 'Dumbbell', color: '#10b981' },
  { id: 'interview', label: 'Interview', score: 0, trend: '0%', trendDirection: 'neutral', icon: 'Briefcase', color: '#ec4899' },
  { id: 'learning', label: 'Learning', score: 0, trend: '0%', trendDirection: 'neutral', icon: 'BookOpen', color: '#6366f1' },
  { id: 'goals', label: 'Goals', score: 0, trend: '0%', trendDirection: 'neutral', icon: 'CheckSquare', color: '#f97316' },
  { id: 'consistency', label: 'Consistency', score: 0, trend: '0%', trendDirection: 'neutral', icon: 'Flame', color: '#ef4444' },
];

export const skillRadarData = {
  axes: [
    { name: 'English', key: 'english' },
    { name: 'Public Speaking', key: 'speaking' },
    { name: 'Body Language', key: 'body_language' },
    { name: 'Interview', key: 'interview' },
    { name: 'Learning', key: 'learning' },
    { name: 'Consistency', key: 'consistency' },
  ],
  datasets: {
    current: { english: 0, speaking: 0, body_language: 0, interview: 0, learning: 0, consistency: 0 },
    lastMonth: { english: 0, speaking: 0, body_language: 0, interview: 0, learning: 0, consistency: 0 },
    target: { english: 50, speaking: 50, body_language: 50, interview: 50, learning: 50, consistency: 50 },
  },
};

export const growthTrendTimeRanges = {
  '30D': [
    { label: 'Week 1', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Week 2', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Week 3', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Week 4', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Today', current: 0, lastPeriod: 0, target: 50 },
  ],
  '7D': [
    { label: 'Mon', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Tue', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Wed', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Thu', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Fri', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Sat', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Sun', current: 0, lastPeriod: 0, target: 50 },
  ],
  '90D': [
    { label: 'Month 1', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Month 2', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Current', current: 0, lastPeriod: 0, target: 50 },
  ],
  '6M': [
    { label: 'Month 1', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Month 3', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Current', current: 0, lastPeriod: 0, target: 50 },
  ],
  '1Y': [
    { label: 'Q1', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Q2', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Current', current: 0, lastPeriod: 0, target: 50 },
  ],
  'All': [
    { label: 'Start', current: 0, lastPeriod: 0, target: 50 },
    { label: 'Current', current: 0, lastPeriod: 0, target: 50 },
  ],
};

export const aiGrowthInsights = {
  badge: 'Ready to Start',
  text: 'Welcome to ELEVATE! Complete your first practice sessions across Speaking, English, or Body Language to generate personalized growth insights.',
  biggestWin: {
    title: 'Ready to Begin',
    value: '0 points',
    icon: 'Sparkles',
  },
  biggestOpportunity: {
    title: 'First Practice',
    value: 'Choose a module',
    icon: 'Target',
  },
  recommendedFocus: {
    title: 'Start with 1 practice drill today',
    description: 'to establish your baseline score.',
    icon: 'Rocket',
  },
};

export const yourGrowthStory = {
  narrative:
    "You're just starting your growth journey on ELEVATE. Establish a daily habit by completing short 5-minute practice sessions.",
  coachTitle: 'AI Coach',
  coachSubtitle: 'Personalized analysis of your progress ✨',
};

export const yourStrengths = [
  {
    rank: '🎯',
    title: 'Growth Mindset',
    score: 0,
    sparkline: [0, 0, 0, 0, 0],
    reason: 'Ready to begin your practice journey.',
  },
];

export const whereYouCanImprove = [
  {
    id: 'speaking',
    title: 'Public Speaking',
    score: 0,
    opportunity: 'Baseline drill pending',
    action: 'Start 60s Speaking Drill',
  },
  {
    id: 'english',
    title: 'English Coach',
    score: 0,
    opportunity: 'Baseline drill pending',
    action: 'Start English Practice',
  },
  {
    id: 'body_language',
    title: 'Body Language',
    score: 0,
    opportunity: 'Camera drill pending',
    action: 'Start Camera Posture Drill',
  },
];

export const whatShouldYouDoNext = [
  {
    step: 1,
    action: 'Practice',
    title: '5-minute speaking drill',
    duration: '~5 min',
    type: 'speaking',
  },
  {
    step: 2,
    action: 'Learn',
    title: 'Communication lesson',
    duration: '~10 min',
    type: 'learning',
  },
  {
    step: 3,
    action: 'Goal',
    title: 'Create your first goal',
    duration: '~2 min',
    type: 'goals',
  },
];

export const bottomTelemetry = {
  practiceTime: '0h 00m',
  sessionsCompleted: 0,
  goalsCompleted: '0 / 0',
  xpEarned: '0 XP',
  currentStreak: '0 Days',
  nextMilestone: '25 Score (25 points to go!)',
};

export const scoreWeightings = [
  { category: 'English Coach', weight: '15%', score: 0, contribution: '0.0 pts' },
  { category: 'Public Speaking', weight: '15%', score: 0, contribution: '0.0 pts' },
  { category: 'Body Language', weight: '15%', score: 0, contribution: '0.0 pts' },
  { category: 'Fitness', weight: '15%', score: 0, contribution: '0.0 pts' },
  { category: 'Interview Preparation', weight: '15%', score: 0, contribution: '0.0 pts' },
  { category: 'Learning Hub', weight: '15%', score: 0, contribution: '0.0 pts' },
  { category: 'Daily Goals', weight: '10%', score: 0, contribution: '0.0 pts' },
  { category: 'Consistency', weight: '15%', score: 0, contribution: '0.0 pts' },
];

export const categoryDetailedData = {
  english: { name: 'English Coach', currentScore: 0, sessions: 0, practiceMinutes: 0 },
  speaking: { name: 'Public Speaking', currentScore: 0, sessions: 0, practiceMinutes: 0 },
  body_language: { name: 'Body Language', currentScore: 0, sessions: 0, practiceMinutes: 0 },
  fitness: { name: 'Fitness', currentScore: 0, sessions: 0, practiceMinutes: 0 },
  interview: { name: 'Interview Prep', currentScore: 0, sessions: 0, practiceMinutes: 0 },
  learning: { name: 'Learning Hub', currentScore: 0, sessions: 0, practiceMinutes: 0 },
};

export const growthTimeline = [];

export const habitCorrelations = [];

export const scoreHistoryLog = [];
