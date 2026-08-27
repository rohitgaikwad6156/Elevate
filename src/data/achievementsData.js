// Achievements Central Data Architecture

export const userAchievementProfile = {
  name: 'Learner',
  level: 1,
  levelTitle: 'ELEVATE Explorer',
  totalXp: 0,
  xpForNextLevel: 1000,
  xpEarnedToday: '+0 today',
  xpRemaining: 1000,
  progressPercent: 0,
  totalAchievements: 100,
  unlockedAchievements: 0,
  totalChallengesCompleted: 0,
  totalMilestonesUnlocked: 0,
  currentStreak: 0,
  longestStreak: 0,
};

export const levelTiers = [
  { level: 1, title: 'Explorer', current: true },
  { level: 5, title: 'Builder', locked: true },
  { level: 10, title: 'Achiever', locked: true },
  { level: 15, title: 'Performer', locked: true },
  { level: 20, title: 'Expert', locked: true },
  { level: 30, title: 'Elite', locked: true },
  { level: 50, title: 'Legend', locked: true },
];

export const topStats = [
  { id: 'xp', label: 'Total XP', value: '0', sub: 'Start your journey', icon: 'Sparkles', color: '#3b82f6' },
  { id: 'achievements', label: 'Achievements', value: '0 / 100', sub: '0% Completed', icon: 'Award', color: '#f59e0b' },
  { id: 'challenges', label: 'Challenges', value: '0', sub: 'Completed', icon: 'Target', color: '#ec4899' },
  { id: 'milestones', label: 'Milestones', value: '0', sub: 'Unlocked', icon: 'Crown', color: '#10b981' },
];

export const almostUnlockedList = [
  {
    id: 'alm-1',
    title: 'First Step',
    desc: 'Complete your very first practice session',
    progress: '0 / 1',
    percent: 0,
    icon: 'Rocket',
    color: '#8b5cf6',
    xpReward: '+50 XP',
  },
  {
    id: 'alm-2',
    title: 'Goal Setter',
    desc: 'Create your first growth goal',
    progress: '0 / 1',
    percent: 0,
    icon: 'CheckSquare',
    color: '#10b981',
    xpReward: '+50 XP',
  },
];

export const recentlyUnlockedList = [];

export const categoryStreaks = [
  { label: 'Learning', days: 0, icon: 'BookOpen', color: '#3b82f6' },
  { label: 'Fitness', days: 0, icon: 'Dumbbell', color: '#10b981' },
  { label: 'Speaking', days: 0, icon: 'Mic', color: '#8b5cf6' },
  { label: 'Goals', days: 0, icon: 'CheckSquare', color: '#ec4899' },
];

export const calendarDaysAugust = Array.from({ length: 28 }, (_, i) => ({
  day: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i % 7],
  active: false,
  level: 0,
}));

export const activeChallengeData = {
  id: 'ch-starter',
  title: 'Welcome Starter Challenge',
  timeLeft: 'Ongoing',
  reward: '+100 XP & Welcome Pioneer Badge',
  progress: '0 / 3',
  percent: 0,
  tasks: [
    { title: 'Complete your profile bio & picture', progress: '0 / 1', completed: false, xp: '+30 XP' },
    { title: 'Create your first growth goal', progress: '0 / 1', completed: false, xp: '+30 XP' },
    { title: 'Complete your first practice drill', progress: '0 / 1', completed: false, xp: '+40 XP' },
  ],
};

export const achievementCategoriesList = [
  { id: 'all', name: 'All', count: '0 / 100', icon: 'Award', color: '#8b5cf6' },
  { id: 'english', name: 'English', count: '0 / 20', icon: 'BookA', color: '#3b82f6' },
  { id: 'speaking', name: 'Public Speaking', count: '0 / 20', icon: 'Mic', color: '#8b5cf6' },
  { id: 'body_language', name: 'Body Language', count: '0 / 15', icon: 'Eye', color: '#10b981' },
  { id: 'fitness', name: 'Fitness', count: '0 / 15', icon: 'Dumbbell', color: '#f59e0b' },
  { id: 'interview', name: 'Interview', count: '0 / 15', icon: 'Briefcase', color: '#06b6d4' },
  { id: 'learning', name: 'Learning', count: '0 / 20', icon: 'BookOpen', color: '#6366f1' },
  { id: 'goals', name: 'Goals', count: '0 / 10', icon: 'CheckSquare', color: '#ec4899' },
  { id: 'consistency', name: 'Consistency', count: '0 / 5', icon: 'Flame', color: '#eab308' },
];

export const growthMilestonesList = [
  { score: 25, status: 'active', label: 'Overall Growth 25', progress: '0 / 25' },
  { score: 50, status: 'locked', label: 'Overall Growth 50' },
  { score: 70, status: 'locked', label: 'Overall Growth 70' },
  { score: 90, status: 'locked', label: 'Overall Growth 90' },
  { score: 100, status: 'locked', label: 'Overall Growth 100' },
];

export const allAchievementsLibrary = [
  { id: 'ach-1', title: 'Vocabulary Builder', category: 'English', rarity: 'Rare', xp: 150, unlocked: false, desc: 'Learn 500 vocabulary words', progress: '0 / 500' },
  { id: 'ach-2', title: 'Grammar Grinder', category: 'English', rarity: 'Common', xp: 50, unlocked: false, desc: 'Complete 25 grammar exercises', progress: '0 / 25' },
  { id: 'ach-3', title: 'Fluent Steps', category: 'English', rarity: 'Epic', xp: 200, unlocked: false, desc: 'Complete 50 English practice sessions', progress: '0 / 50' },
  { id: 'ach-4', title: 'Confident Speaker', category: 'Public Speaking', rarity: 'Rare', xp: 100, unlocked: false, desc: 'Complete 10 public speaking sessions', progress: '0 / 10' },
  { id: 'ach-5', title: 'Storyteller', category: 'Public Speaking', rarity: 'Epic', xp: 200, unlocked: false, desc: 'Complete 20 storytelling practices', progress: '0 / 20' },
  { id: 'ach-6', title: 'Impromptu Pro', category: 'Public Speaking', rarity: 'Legendary', xp: 300, unlocked: false, desc: 'Complete 25 impromptu sessions', progress: '0 / 25' },
  { id: 'ach-7', title: 'Eye Contact Mastery', category: 'Body Language', rarity: 'Rare', xp: 120, unlocked: false, desc: 'Reach 80% camera eye-contact score', progress: '0%' },
  { id: 'ach-8', title: 'Strong Posture', category: 'Body Language', rarity: 'Uncommon', xp: 80, unlocked: false, desc: 'Complete 15 posture drills', progress: '0 / 15' },
  { id: 'ach-9', title: 'Consistent Athlete', category: 'Fitness', rarity: 'Epic', xp: 200, unlocked: false, desc: 'Maintain a 14-day fitness streak', progress: '0 / 14' },
  { id: 'ach-10', title: 'Strength Builder', category: 'Fitness', rarity: 'Rare', xp: 150, unlocked: false, desc: 'Log a personal strength PR in barbell bench', progress: '0 PR' },
  { id: 'ach-11', title: 'Interview Ready', category: 'Interview', rarity: 'Epic', xp: 150, unlocked: false, desc: 'Reach 80+ Interview Readiness', progress: '0%' },
  { id: 'ach-12', title: 'STAR Method Champion', category: 'Interview', rarity: 'Rare', xp: 120, unlocked: false, desc: 'Complete 25 behavioral questions', progress: '0 / 25' },
  { id: 'ach-13', title: 'Knowledge Builder', category: 'Learning', rarity: 'Rare', xp: 150, unlocked: false, desc: 'Complete 40 structured lessons', progress: '0 / 40' },
  { id: 'ach-14', title: 'Curious Mind', category: 'Learning', rarity: 'Common', xp: 50, unlocked: false, desc: 'Complete your first 10 lessons', progress: '0 / 10' },
  { id: 'ach-15', title: '14-Day Streak', category: 'Consistency', rarity: 'Epic', xp: 150, unlocked: false, desc: 'Maintain 14 consecutive active days', progress: '0 / 14' },
  { id: 'ach-16', title: 'Goal Crusher', category: 'Goals', rarity: 'Uncommon', xp: 80, unlocked: false, desc: 'Complete 10 daily goals', progress: '0 / 10' },
];

export const todayXpSources = [];

export const personalRecordsList = [];
