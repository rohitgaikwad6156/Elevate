// Fitness Module Central Data Architecture

export const fitnessProfile = {
  level: 'Level 1 — Starter Athlete',
  levelNumber: 1,
  levelTitle: 'Starter Athlete',
  nextLevel: 'Level 2 — Active Explorer',
  progressToNext: 0,
  currentStreak: 0,
  weeklyWorkoutsCompleted: 0,
  weeklyWorkoutsTarget: 3,
  weeklyTrainingTime: '0h 00m',
  totalWorkouts: 0,
  totalVolumeLifted: '0 kg',
  personalRecordsCount: 0,
};

export const fitnessScoreData = {
  currentScore: 0,
  previousScore: 0,
  targetScore: 50,
  monthlyImprovement: '0 pts this month',
  pillars: [
    { name: 'Strength', score: 0, trend: '0%', note: 'Log your first workout to begin tracking' },
    { name: 'Endurance', score: 0, trend: '0%', note: 'Log aerobic or HIIT sessions to build stamina' },
    { name: 'Mobility', score: 0, trend: '0%', note: 'Complete posture resets to improve alignment' },
    { name: 'Consistency', score: 0, trend: '0%', note: 'Maintain training frequency to build your streak' },
    { name: 'Recovery', score: 0, trend: '0%', note: 'Log sleep and rest days' },
  ],
  explanation:
    'Your Fitness Score is a composite index computed from training frequency, volume progression, mobility consistency, and recovery logs. It is designed as coaching feedback and does not replace medical advice.',
};

export const aiFitnessCoach = {
  title: 'Your AI Fitness Coach',
  focus: '10 min Morning Posture Reset',
  recommendation:
    'Welcome! Start your fitness journey with an easy 10-minute Posture Activation workout to establish your baseline.',
  whyItMatters:
    'Regular posture resets reinforce executive presence and relaxed breathing during public speaking and communication.',
  actionLabel: 'Start Starter Workout',
  recoveryStatus: 'Ready to Train',
};


export const personalFitnessGoals = [
  { id: 'g1', name: 'Build Strength', active: true },
  { id: 'g2', name: 'Improve Mobility', active: true },
  { id: 'g3', name: 'Improve Fitness Consistency', active: true },
  { id: 'g4', name: 'Build Muscle', active: false },
  { id: 'g5', name: 'Improve Endurance', active: false },
  { id: 'g6', name: 'Athletic Performance', active: true },
];

export const userFitnessPreferences = {
  experience: 'Intermediate',
  location: 'Gym & Home Mixed',
  weeklyTarget: 5,
  preferredDuration: '45 minutes',
  equipment: ['Dumbbells', 'Barbell', 'Cables & Machines', 'Pull-up Bar', 'Resistance Bands', 'Mat'],
};

export const todaysWorkoutData = {
  id: 'workout-today',
  title: 'Upper Body Strength & Posture Focus',
  category: 'Strength',
  duration: '45 min',
  estimatedVolume: '7,420 kg',
  totalExercises: 8,
  difficulty: 'Intermediate',
  targetMuscles: 'Chest, Back, Shoulders, Arms, Thoracic Spine',
  warmup: [
    { name: 'Arm Circles & Cross-Body Swings', duration: '2 min' },
    { name: 'Band Pull-Aparts', duration: '2 min' },
    { name: 'Cat-Cow & Thoracic Rotations', duration: '2 min' },
  ],
  exercises: [
    {
      id: 'ex-1',
      name: 'Barbell Bench Press',
      target: 'Chest, Anterior Deltoids, Triceps',
      equipment: 'Barbell, Bench',
      sets: 3,
      reps: 8,
      weight: 60,
      restSeconds: 90,
      completedSets: 0,
      notes: 'Drive through heels, maintain slight arch, touch mid-chest with control.',
    },
    {
      id: 'ex-2',
      name: 'Seated Cable Row',
      target: 'Lats, Rhomboids, Mid-Traps',
      equipment: 'Cable Machine',
      sets: 3,
      reps: 10,
      weight: 50,
      restSeconds: 75,
      completedSets: 0,
      notes: 'Retract shoulder blades fully, pull to lower ribcage, pause 1 second.',
    },
    {
      id: 'ex-3',
      name: 'Standing Dumbbell Overhead Press',
      target: 'Shoulders, Upper Chest, Core',
      equipment: 'Dumbbells',
      sets: 3,
      reps: 10,
      weight: 16,
      restSeconds: 75,
      completedSets: 0,
      notes: 'Brace core and glutes, press overhead in a natural arc without arching lower back.',
    },
    {
      id: 'ex-4',
      name: 'Lat Pulldown',
      target: 'Lats, Biceps, Rear Deltoids',
      equipment: 'Cable Machine',
      sets: 3,
      reps: 10,
      weight: 55,
      restSeconds: 60,
      completedSets: 0,
      notes: 'Slight lean back, pull bar toward collarbone with elbows driving downward.',
    },
    {
      id: 'ex-5',
      name: 'Dumbbell Lateral Raises',
      target: 'Lateral Deltoids',
      equipment: 'Dumbbells',
      sets: 3,
      reps: 12,
      weight: 10,
      restSeconds: 60,
      completedSets: 0,
      notes: 'Lead with elbows, lift to shoulder height with controlled tempo.',
    },
    {
      id: 'ex-6',
      name: 'Incline Dumbbell Bicep Curls',
      target: 'Biceps',
      equipment: 'Dumbbells, Incline Bench',
      sets: 2,
      reps: 12,
      weight: 12,
      restSeconds: 60,
      completedSets: 0,
      notes: 'Keep elbows pinned, full stretch at bottom, supinate at top.',
    },
    {
      id: 'ex-7',
      name: 'Overhead Rope Tricep Extension',
      target: 'Triceps (Long Head)',
      equipment: 'Cable Machine',
      sets: 2,
      reps: 12,
      weight: 22.5,
      restSeconds: 60,
      completedSets: 0,
      notes: 'Flare rope outward at full lockout, maintain stationary upper arms.',
    },
    {
      id: 'ex-8',
      name: 'Thoracic Extension on Foam Roller',
      target: 'Upper Back Mobility & Posture',
      equipment: 'Foam Roller / Mat',
      sets: 2,
      reps: 10,
      weight: 0,
      restSeconds: 45,
      completedSets: 0,
      notes: 'Support head with hands, extend gently over roller without lumbar overarching.',
    },
  ],
  cooldown: [
    { name: 'Doorway Chest Stretch', duration: '2 min' },
    { name: 'Child’s Pose with Lat Reach', duration: '2 min' },
    { name: 'Box Breathing (4-4-4-4)', duration: '1 min' },
  ],
};

export const weeklyPlannerData = [
  {
    day: 'Monday',
    workout: 'Upper Body Strength',
    duration: '45 min',
    focus: 'Chest & Back',
    targetMuscles: 'Chest, Upper Back, Front Delts, Biceps',
    difficulty: 'Intermediate',
    equipment: 'Barbell, Dumbbells, Bench',
    status: 'completed',
    score: 88,
    exercises: [
      'Barbell Bench Press',
      'Seated Cable Row',
      'Incline Dumbbell Press',
      'Pull-Ups',
      'Dumbbell Bicep Curl',
      'Triceps Rope Pushdown',
    ],
  },
  {
    day: 'Tuesday',
    workout: 'Lower Body Power',
    duration: '50 min',
    focus: 'Quads & Glutes',
    targetMuscles: 'Quadriceps, Glutes, Hamstrings, Calves',
    difficulty: 'Intermediate',
    equipment: 'Barbell, Squat Rack, Leg Press',
    status: 'planned',
    score: null,
    exercises: [
      'Barbell Back Squat',
      'Barbell Romanian Deadlift (RDL)',
      'Leg Press',
      'Walking Dumbbell Lunges',
      'Standing Calf Raises',
    ],
  },
  {
    day: 'Wednesday',
    workout: 'Mobility & Active Recovery',
    duration: '20 min',
    focus: 'Spine & Hips',
    targetMuscles: 'Thoracic Spine, Hip Flexors, Hamstrings',
    difficulty: 'Beginner',
    equipment: 'No Equipment (Mat)',
    status: 'completed',
    score: 92,
    exercises: [
      'World’s Greatest Stretch',
      'Cat-Cow Stretch',
      '90/90 Hip Rotation',
      'Deep Squat Hold (Malasana / Asian Squat)',
    ],
  },
  {
    day: 'Thursday',
    workout: 'Push & Core Hypertrophy',
    duration: '45 min',
    focus: 'Shoulders & Triceps',
    targetMuscles: 'Shoulders, Triceps, Core, Upper Chest',
    difficulty: 'Beginner',
    equipment: 'Dumbbells, Bench',
    status: 'today',
    score: null,
    exercises: [
      'Standing Dumbbell Overhead Press',
      'Dumbbell Lateral Raise',
      'Dumbbell Bench Press',
      'Overhead Dumbbell Triceps Extension',
      'Plank',
      'Bicycle Crunch',
    ],
  },
  {
    day: 'Friday',
    workout: 'Upper Body Strength & Pull',
    duration: '45 min',
    focus: 'Posture & Pull',
    targetMuscles: 'Lats, Rhomboids, Rear Delts, Biceps',
    difficulty: 'Intermediate',
    equipment: 'Cable Machine, Pull-Up Bar, Dumbbells',
    status: 'planned',
    score: null,
    exercises: [
      'Pull-Ups',
      'Barbell Bent-Over Row',
      'Lat Pulldown',
      'Face Pull',
      'Hammer Curl',
    ],
  },
  {
    day: 'Saturday',
    workout: 'Full Body Athletic Flow',
    duration: '40 min',
    focus: 'Conditioning & Core',
    targetMuscles: 'Full Body, Core, Stamina',
    difficulty: 'Intermediate',
    equipment: 'Dumbbells, Bodyweight',
    status: 'planned',
    score: null,
    exercises: [
      'Goblet Squat',
      'Push-Ups',
      'One-Arm Dumbbell Row',
      'Mountain Climbers',
      'Dead Bug',
    ],
  },
  {
    day: 'Sunday',
    workout: 'Rest & Deep Mobility Reset',
    duration: '15 min',
    focus: 'Full Recovery',
    targetMuscles: 'Full Body Joint Decompression',
    difficulty: 'Beginner',
    equipment: 'No Equipment',
    status: 'rest',
    score: null,
    exercises: [
      'Child’s Pose with Lat Reach',
      'Thoracic Spine Windmill',
      'Half-Kneeling Hip Flexor Stretch',
    ],
  },
];



import { exerciseLibraryData } from './exerciseLibraryData';

export const exerciseLibrary = exerciseLibraryData;


export const homeWorkoutRoutines = [
  {
    id: 'home-1',
    title: '15-Minute Bodyweight Desk Reset',
    duration: '15 min',
    difficulty: 'Beginner',
    equipment: 'No Equipment',
    target: 'Full Body Mobility & Core',
    exercisesCount: 5,
    exercises: ['Cat-Cow Stretch', 'Doorway Chest Stretch', 'Bodyweight Squats', 'Wall Angels', 'Plank Holds'],
  },
  {
    id: 'home-2',
    title: '20-Minute Dumbbell Upper Body Sculpt',
    duration: '20 min',
    difficulty: 'Intermediate',
    equipment: 'Dumbbells',
    target: 'Chest, Shoulders & Arms',
    exercisesCount: 6,
    exercises: ['DB Floor Press', 'DB Bent-Over Row', 'DB Shoulder Press', 'Hammer Curls', 'Overhead Extensions', 'Push-ups'],
  },
  {
    id: 'home-3',
    title: '30-Minute Full Body Athletic HIIT',
    duration: '30 min',
    difficulty: 'Advanced',
    equipment: 'Dumbbells, Mat',
    target: 'Conditioning & Functional Strength',
    exercisesCount: 7,
    exercises: ['DB Goblet Squats', 'Push-Up to Row', 'Reverse Lunges', 'Mountain Climbers', 'DB Thrusters', 'Plank Taps', 'Jump Rope'],
  },
  {
    id: 'home-4',
    title: '10-Minute Morning Posture Activation',
    duration: '10 min',
    difficulty: 'Beginner',
    equipment: 'Mat',
    target: 'Spine, Shoulders & Glutes',
    exercisesCount: 4,
    exercises: ['Glute Bridges', 'Bird-Dog', 'Prone Cobra', 'Child’s Pose'],
  },
];

export const mobilityRoutines = [
  {
    id: 'mob-1',
    title: '8-Minute Desk Worker Reset',
    duration: '8 min',
    target: 'Neck, Shoulders, Thoracic Spine, Hip Flexors',
    difficulty: 'Beginner',
    exercises: [
      { name: 'Chin Tucks & Neck Retraction', time: '90 sec' },
      { name: 'Wall Angels for Posture', time: '2 min' },
      { name: 'Kneeling Hip Flexor Stretch', time: '2 min' },
      { name: 'Thoracic Windmills', time: '2.5 min' },
    ],
  },
  {
    id: 'mob-2',
    title: '12-Minute Deep Hip & Lower Back Opener',
    duration: '12 min',
    target: 'Glutes, Hip Adductors, Hamstrings, Lumbar Spine',
    difficulty: 'Intermediate',
    exercises: [
      { name: '90/90 Hip Switches', time: '3 min' },
      { name: 'Pigeon Pose', time: '3 min' },
      { name: 'Frog Stretch', time: '3 min' },
      { name: 'World’s Greatest Stretch', time: '3 min' },
    ],
  },
  {
    id: 'mob-3',
    title: '10-Minute Pre-Workout Dynamic Primer',
    duration: '10 min',
    target: 'Shoulders, Hips, Ankles & Core',
    difficulty: 'Intermediate',
    exercises: [
      { name: 'Arm Circles & Hugs', time: '2 min' },
      { name: 'Bodyweight Cossack Squats', time: '3 min' },
      { name: 'Inchworm to Downward Dog', time: '3 min' },
      { name: 'Glute Bridge Holds', time: '2 min' },
    ],
  },
];

export const personalRecordsList = [];

export const recoveryData = {
  overallStatus: 'Ready for First Workout',
  score: 0,
  metrics: [
    { label: 'Energy Level', value: 'Ready', status: 'optimal' },
    { label: 'Sleep Quality', value: 'Not logged', status: 'normal' },
    { label: 'Muscle Soreness', value: 'None', status: 'optimal' },
    { label: 'Training Readiness', value: '100%', status: 'optimal' },
  ],
  aiInsight:
    'Start your first training session to begin tracking volume, progressive overload, and recovery metrics.',
};

export const dailyFitnessChallenge = {
  title: '10-Minute Starter Posture & Core Reset',
  description: 'Complete 8–10 minutes of basic posture activation drills.',
  duration: '10 minutes',
  rewardXp: '+50 XP',
  completed: false,
};

export const recentWorkoutsList = [];

export const subtleAchievements = [
  { id: 'ach-fit-1', icon: '🏆', title: 'First Workout', desc: 'Complete baseline fitness assessment', unlocked: false },
  { id: 'ach-fit-2', icon: '🔥', title: '3-Day Fitness Streak', desc: 'Train 3 consecutive planned days', unlocked: false },
  { id: 'ach-fit-3', icon: '💪', title: '5 Workouts Logged', desc: 'Log 5 gym or mobility sessions', unlocked: false },
];

