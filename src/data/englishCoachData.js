// English Coach Data Architecture (Clean / Scratch State for New Users)

export const englishHeaderData = {
  title: 'English Coach',
  subtitle: 'Build confidence, improve fluency, and communicate better every day.',
  currentLevel: 'Beginner',
  overallProgress: 0,
  score: 0,
  maxScore: 100,
};

export const learningPathStages = [
  { id: 'p1', name: 'Foundation', description: 'Basic grammar & core sentence structure', status: 'current', step: 1 },
  { id: 'p2', name: 'Vocabulary', description: 'Essential 2,000 words & idioms', status: 'upcoming', step: 2 },
  { id: 'p3', name: 'Grammar', description: 'Complex tenses & clause variations', status: 'upcoming', step: 3 },
  { id: 'p4', name: 'Speaking', description: 'Spontaneous dialogues & active pacing', status: 'upcoming', step: 4 },
  { id: 'p5', name: 'Fluency', description: 'Effortless articulation & rhythm', status: 'upcoming', step: 5 },
  { id: 'p6', name: 'Confidence', description: 'Mastery in public speaking & debates', status: 'upcoming', step: 6 },
];

export const currentLearningStage = 'Foundation & Sentence Structure';

export const initialPracticeTasks = [
  { id: 't1', title: 'Vocabulary', duration: '10 minutes', minutes: 10, completed: false },
  { id: 't2', title: 'Speaking', duration: '15 minutes', minutes: 15, completed: false },
  { id: 't3', title: 'Grammar', duration: '10 minutes', minutes: 10, completed: false },
  { id: 't4', title: 'Listening', duration: '10 minutes', minutes: 10, completed: false },
];

export const aiConversationData = {
  title: '🤖 AI Conversation Practice',
  tagline: 'Practice a real-world conversation with an AI tutor.',
  topic: 'Self Introduction',
  difficulty: 'Beginner',
  disclaimer: 'Demo — AI integration coming in a later phase.',
  sampleDialogue: [],
};

export const speakingPracticeData = {
  title: '🎤 Speaking Practice',
  prompt: 'Introduce yourself and talk about your favorite hobbies for 1-2 minutes.',
  topic: 'Self Introduction & Hobbies',
  duration: '2 minutes',
  difficulty: 'Beginner',
  instructions: 'Speak clearly for 1-2 minutes introducing yourself, where you are from, and what you enjoy doing in your free time.',
  status: 'Coming Soon',
};

export const vocabularyList = [
  {
    id: 'v1',
    word: 'Confident',
    partOfSpeech: 'adjective',
    meaning: 'Feeling sure about your abilities and qualities.',
    example: 'She became more confident after practicing every day.',
    difficulty: 'Beginner',
  },
  {
    id: 'v2',
    word: 'Consistent',
    partOfSpeech: 'adjective',
    meaning: 'Acting or done in the same way over time to make progress.',
    example: 'Consistent daily practice is key to learning English.',
    difficulty: 'Beginner',
  },
  {
    id: 'v3',
    word: 'Communicate',
    partOfSpeech: 'verb',
    meaning: 'Share or exchange ideas and information clearly.',
    example: 'He learned to communicate effectively with his team.',
    difficulty: 'Beginner',
  },
  {
    id: 'v4',
    word: 'Fluency',
    partOfSpeech: 'noun',
    meaning: 'The ability to speak or write easily, smoothly, and expressively.',
    example: 'Daily speaking drills help build natural fluency.',
    difficulty: 'Intermediate',
  },
  {
    id: 'v5',
    word: 'Opportunity',
    partOfSpeech: 'noun',
    meaning: 'A set of circumstances that makes it possible to do something.',
    example: 'Speaking English opens up new career opportunities.',
    difficulty: 'Beginner',
  },
];

export const grammarExercise = {
  topic: 'Simple Present Tense',
  question: 'She ____ English every morning to improve her speaking.',
  options: [
    { id: 'A', text: 'practice', isCorrect: false },
    { id: 'B', text: 'practices', isCorrect: true },
    { id: 'C', text: 'practicing', isCorrect: false },
    { id: 'D', text: 'practiced', isCorrect: false },
  ],
  explanation: "'practices' is correct because third-person singular (he/she/it) in Simple Present takes an '-s' or '-es' suffix.",
};

export const pronunciationWords = [
  { word: 'Comfortable', hint: '3 syllables: "KUMF-ter-bull"' },
  { word: 'Development', hint: 'Stress 2nd syllable: "di-VEL-up-ment"' },
  { word: 'Environment', hint: 'Keep the \'n\': "en-VY-run-ment"' },
  { word: 'Communication', hint: 'Primary stress on \'CA\': "kuh-myoo-nih-KAY-shun"' },
  { word: 'Opportunity', hint: 'Stress on \'TU\': "op-per-TOO-nih-tee"' },
];

export const listeningData = {
  title: 'Listening Practice',
  topic: 'Self Introduction & Greetings',
  difficulty: 'Beginner',
  duration: '3 minutes',
  notice: 'Audio practice coming soon.',
  description: 'Listen to a natural introduction between two professionals meeting for the first time.',
};

export const readingData = {
  title: 'Why Starting Small Matters',
  level: 'Beginner (A2-B1)',
  estimatedTime: '2 min read',
  vocabCount: '58 words',
  passage: 'Starting your English journey does not require hours of complex study. Dedicating just ten to fifteen minutes every single day to active practice rewires your confidence. Simple daily habits compound over time to build natural expression, clear pronunciation, and effortless conversational fluency.',
};

export const writingData = {
  prompt: 'Write 3-5 sentences introducing yourself and your goals for learning English.',
  targetWordCount: '50–100 words',
  defaultText: '',
};

export const englishProgressBreakdown = [
  { skill: 'Vocabulary', progress: 0 },
  { skill: 'Grammar', progress: 0 },
  { skill: 'Speaking', progress: 0 },
  { skill: 'Listening', progress: 0 },
  { skill: 'Reading', progress: 0 },
  { skill: 'Writing', progress: 0 },
];

export const englishScoreBreakdown = {
  overallScore: 0,
  maxScore: 100,
  skills: [
    { name: 'Vocabulary', score: 0 },
    { name: 'Grammar', score: 0 },
    { name: 'Speaking', score: 0 },
    { name: 'Listening', score: 0 },
    { name: 'Reading', score: 0 },
    { name: 'Writing', score: 0 },
  ],
};

export const streakTrackerData = {
  currentStreak: 0,
  days: [
    { day: 'Mon', completed: false },
    { day: 'Tue', completed: false },
    { day: 'Wed', completed: false },
    { day: 'Thu', completed: false },
    { day: 'Fri', completed: false },
    { day: 'Sat', completed: false, isToday: true },
    { day: 'Sun', completed: false },
  ],
};

export const quickPracticeList = [
  { id: 'q1', name: 'Vocabulary', icon: 'BookOpen', description: 'Learn 5 high-impact words', color: 'primary' },
  { id: 'q2', name: 'Grammar', icon: 'CheckSquare', description: 'Quick 5-question quiz', color: 'success' },
  { id: 'q3', name: 'Speaking', icon: 'Mic', description: '2-minute audio prompt', color: 'warning' },
  { id: 'q4', name: 'Listening', icon: 'Headphones', description: 'Short dialogue drill', color: 'info' },
  { id: 'q5', name: 'Reading', icon: 'FileText', description: '2-minute speed passage', color: 'primary' },
  { id: 'q6', name: 'Writing', icon: 'PenTool', description: 'Prompt challenge', color: 'success' },
];
