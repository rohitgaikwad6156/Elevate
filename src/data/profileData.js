// Profile Central Data Architecture

export const userProfile = {
  name: 'Rohit',
  verified: true,
  title: 'ELEVATE Explorer · Level 12',
  level: 12,
  bio: 'Building stronger communication, confidence, and professional skills every day.',
  location: 'Mumbai, India',
  timingTag: 'Evening Learner',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  profileCompletion: 92,
  overallGrowthScore: 84,
  overallGrowthStatus: 'Strong Progress',
  currentStreak: 14,
  streakMessage: 'Keep it going!',
  totalXp: 2350,
  xpMax: 3000,
  xpRemaining: 650,
  achievementsCount: 42,
  achievementsPercent: 42,
};

export const myTopSkills = [
  { id: 'speaking', label: 'Public Speaking', score: 86, color: '#8b5cf6', icon: 'Mic' },
  { id: 'communication', label: 'Communication', score: 84, color: '#3b82f6', icon: 'Star' },
  { id: 'english', label: 'English', score: 82, color: '#10b981', icon: 'BookA' },
  { id: 'interview', label: 'Interview Skills', score: 80, color: '#f59e0b', icon: 'Briefcase' },
  { id: 'fitness', label: 'Fitness', score: 78, color: '#ef4444', icon: 'Dumbbell' },
  { id: 'leadership', label: 'Leadership', score: 72, color: '#14b8a6', icon: 'Award' },
];

export const myGoalsList = [
  {
    id: 'goal-1',
    title: 'Become a confident public speaker',
    targetDate: 'Sep 30, 2026',
    priority: 'High',
    progress: 68,
    icon: 'Mic',
    color: '#8b5cf6',
  },
  {
    id: 'goal-2',
    title: 'Improve professional English',
    targetDate: 'Oct 15, 2026',
    priority: 'Medium',
    progress: 52,
    icon: 'BookA',
    color: '#10b981',
  },
  {
    id: 'goal-3',
    title: 'Build consistent fitness habits',
    targetDate: 'Nov 1, 2026',
    priority: 'High',
    progress: 74,
    icon: 'Dumbbell',
    color: '#f59e0b',
  },
];

export const recentAchievementsList = [
  {
    id: 'ach-1',
    title: 'Confident Speaker',
    desc: 'Completed 10 public-speaking sessions.',
    xp: '+100 XP',
    date: 'Today',
    icon: 'Mic',
    color: '#f59e0b',
  },
  {
    id: 'ach-2',
    title: '14-Day Learner',
    desc: 'Maintained a 14-day learning streak.',
    xp: '+75 XP',
    date: 'Yesterday',
    icon: 'Flame',
    color: '#8b5cf6',
  },
  {
    id: 'ach-3',
    title: 'Interview Ready',
    desc: 'Reached 80+ Interview Readiness.',
    xp: '+150 XP',
    date: 'Aug 20',
    icon: 'Briefcase',
    color: '#06b6d4',
  },
];

export const growthIdentityData = {
  primaryFocus: 'Communication',
  secondaryFocus: 'Career Development',
  learningLevel: 'Intermediate',
  learningStyle: 'Practice-first',
  availableTime: '15 – 30 min / day',
  preferredTime: 'Evening',
};

export const aiPersonalizationData = {
  coachingStyle: 'Balanced',
  feedbackStyle: 'Action-oriented',
  recommendationFrequency: 'Balanced',
  aiInitiative: 'Recommend proactively',
  challengeLevel: 'Balanced',
  lastUpdated: 'Today, 10:30 PM',
};

export const learningPreferencesData = [
  { label: 'Short Lessons', val: 'Yes', icon: 'Clock', active: true },
  { label: 'Practice First', val: 'Yes', icon: 'Target', active: true },
  { label: 'Examples First', val: 'Sometimes', icon: 'BookOpen', active: true },
  { label: 'Quiz Heavy', val: 'No', icon: 'HelpCircle', active: false },
  { label: 'Visual Learner', val: 'Yes', icon: 'Eye', active: true },
  { label: 'Preferred Length', val: '10 – 20 min', icon: 'Hourglass', active: true },
];

export const profileShowcaseData = [
  { label: 'Confident Speaker', sub: 'Achievement', icon: 'Award', color: '#f59e0b' },
  { label: 'Level 12', sub: 'Explorer', icon: 'Crown', color: '#8b5cf6' },
  { label: '14 Days', sub: 'Longest Streak', icon: 'Flame', color: '#ef4444' },
  { label: 'Public Speaking', sub: 'Top Skill', icon: 'Star', color: '#3b82f6' },
];

export const quickSettingsList = [
  { id: 'notifications', label: 'Notifications', sub: 'Manage alerts', icon: 'Bell' },
  { id: 'privacy', label: 'Privacy', sub: 'Control your data', icon: 'Lock' },
  { id: 'appearance', label: 'Appearance', sub: 'Theme & display', icon: 'Palette' },
  { id: 'security', label: 'Security', sub: 'Password & 2FA', icon: 'Shield' },
  { id: 'data', label: 'Data & Export', sub: 'Download your data', icon: 'Download' },
  { id: 'account', label: 'Account', sub: 'Manage account', icon: 'User' },
];

export const notificationSettingsData = [
  { id: 'prog_alerts', label: 'Milestone & Progress Alerts', enabled: true },
  { id: 'daily_goals', label: 'Daily Goal Priority Reminders', enabled: true },
  { id: 'streak_remind', label: 'Streak Freeze & Warning Alerts', enabled: true },
  { id: 'ai_coach', label: 'Proactive AI Coaching Insights', enabled: true },
  { id: 'weekly_summary', label: 'Weekly Growth Performance Report', enabled: true },
];

export const securityData = {
  status: 'Strong Protection',
  twoFactorEnabled: true,
  passwordLastChanged: '3 weeks ago',
  activeSessions: '2 active devices (Windows PC, iPhone 15)',
};
