export const welcomeData = {
  greeting: 'Welcome back',
  userName: 'User',
  date: new Date(),
};

export const overallScore = {
  score: 72,
  maxScore: 100,
  label: 'Overall Growth',
  description: 'Your growth score is based on consistency across all modules. Keep practicing daily to improve.',
};

export const dailyGoals = [
  {
    id: 1,
    title: 'Complete English practice',
    category: 'English',
    completed: true,
  },
  {
    id: 2,
    title: 'Practice public speaking',
    category: 'Speaking',
    completed: false,
  },
  {
    id: 3,
    title: 'Complete workout routine',
    category: 'Fitness',
    completed: false,
  },
  {
    id: 4,
    title: 'Review interview questions',
    category: 'Interview',
    completed: false,
  },
];

export const priorities = [
  {
    id: 1,
    priority: 1,
    task: 'Practice speaking for 15 minutes',
    completed: false,
  },
  {
    id: 2,
    priority: 2,
    task: 'Complete vocabulary exercises',
    completed: true,
  },
  {
    id: 3,
    priority: 3,
    task: 'Review body language tips',
    completed: false,
  },
];

export const aiRecommendation = {
  title: "Today's Recommendation",
  content:
    'Focus on speaking for 15 minutes today. Consistent speaking practice will improve your confidence and fluency.',
  tag: 'Demo Content',
  icon: 'Lightbulb',
};

export const streakData = {
  currentStreak: 12,
  unit: 'days',
  longestStreak: 21,
  message: 'Great momentum! Keep it going.',
};

export const quickActions = [
  {
    id: 1,
    label: 'Add Goal',
    icon: 'Plus',
    color: 'primary',
  },
  {
    id: 2,
    label: 'Practice English',
    icon: 'Languages',
    color: 'info',
  },
  {
    id: 3,
    label: 'Start Workout',
    icon: 'Dumbbell',
    color: 'success',
  },
  {
    id: 4,
    label: 'Practice Speaking',
    icon: 'Mic',
    color: 'warning',
  },
];
