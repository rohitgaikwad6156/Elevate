// Mock and local data structure for English Coach module

export const englishProfile = {
  level: 'Intermediate (B2)',
  dailyGoalMinutes: 15,
  currentStreak: 12,
  longestStreak: 24,
  overallProgress: 64,
  wordsLearnedToday: 5,
  totalWordsMastered: 680,
};

export const learningPathSteps = [
  {
    id: 1,
    title: 'Foundation',
    description: 'Core grammar & fundamental structures',
    status: 'completed', // 'completed' | 'in_progress' | 'locked'
    stepNumber: 1,
  },
  {
    id: 2,
    title: 'Vocabulary',
    description: 'Essential 3,000 words & common collocations',
    status: 'completed',
    stepNumber: 2,
  },
  {
    id: 3,
    title: 'Grammar',
    description: 'Complex tenses, modal verbs & clause variation',
    status: 'completed',
    stepNumber: 3,
  },
  {
    id: 4,
    title: 'Listening',
    description: 'Conversational pace & diverse global accents',
    status: 'in_progress',
    stepNumber: 4,
  },
  {
    id: 5,
    title: 'Speaking',
    description: 'Spontaneous dialogues, stress & pronunciation',
    status: 'in_progress',
    stepNumber: 5,
  },
  {
    id: 6,
    title: 'Writing',
    description: 'Structured essays, articles & business emails',
    status: 'locked',
    stepNumber: 6,
  },
  {
    id: 7,
    title: 'Fluency',
    description: 'Effortless natural communication in any context',
    status: 'locked',
    stepNumber: 7,
  },
];

export const initialDailyPractice = [
  {
    id: 'p1',
    title: 'Daily Vocabulary Builder',
    detail: 'Learn 5 contextual vocabulary words with examples',
    duration: '5 min',
    minutes: 5,
    category: 'Vocabulary',
    completed: true,
  },
  {
    id: 'p2',
    title: 'Grammar Precision Drill',
    detail: 'Complete Tenses & Prepositions mini-quiz',
    duration: '5 min',
    minutes: 5,
    category: 'Grammar',
    completed: false,
  },
  {
    id: 'p3',
    title: 'Speaking Self-Introduction',
    detail: 'Practice 2-minute spontaneous audio prompt',
    duration: '5 min',
    minutes: 5,
    category: 'Speaking',
    completed: false,
  },
];

export const englishSkills = [
  {
    id: 'speaking',
    name: 'Speaking',
    icon: 'Mic',
    description: 'Fluency, conversational pacing & vocal confidence',
    progress: 60,
    status: 'Active',
    level: 'Intermediate',
  },
  {
    id: 'reading',
    name: 'Reading',
    icon: 'BookOpen',
    description: 'Speed reading, comprehension & vocabulary inference',
    progress: 65,
    status: 'Steady',
    level: 'Advanced',
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: 'PenTool',
    description: 'Grammar syntax, essay structure & email clarity',
    progress: 50,
    status: 'Developing',
    level: 'Intermediate',
  },
  {
    id: 'listening',
    name: 'Listening',
    icon: 'Headphones',
    description: 'Comprehending native cadence & global accents',
    progress: 55,
    status: 'Active',
    level: 'Intermediate',
  },
  {
    id: 'vocabulary',
    name: 'Vocabulary',
    icon: 'Library',
    description: 'Active word recall, idioms & phrasal verbs',
    progress: 70,
    status: 'Strong',
    level: 'Advanced',
  },
  {
    id: 'grammar',
    name: 'Grammar',
    icon: 'CheckSquare',
    description: 'Tenses, sentence logic, clauses & subject agreement',
    progress: 80,
    status: 'Mastered',
    level: 'Advanced',
  },
  {
    id: 'pronunciation',
    name: 'Pronunciation',
    icon: 'Volume2',
    description: 'Intonation contours, minimal pairs & word stress',
    progress: 45,
    status: 'Needs Focus',
    level: 'Intermediate',
  },
];

export const aiConversationTopics = [
  'Daily Life',
  'College & Campus',
  'Travel & Airports',
  'Job Interview',
  'Technology & AI',
  'Friends & Socializing',
  'Public Speaking',
];

export const conversationDifficulties = ['Beginner', 'Intermediate', 'Advanced'];

export const sampleConversation = [
  {
    id: 1,
    sender: 'ai',
    text: "Hello! Welcome to your English conversational practice session. I'm ready to help you sharpen your fluency. What topic would you like to practice today?",
    time: '10:00 AM',
  },
  {
    id: 2,
    sender: 'user',
    text: "I'd like to practice discussing my career goals and answering common behavioral interview questions.",
    time: '10:01 AM',
  },
  {
    id: 3,
    sender: 'ai',
    text: "Great choice! Let's start with a foundational question: Could you describe a recent project you led, and what key obstacle you had to overcome?",
    time: '10:02 AM',
  },
];

export const speakingTopic = {
  title: 'Introduce Yourself & Career Aspirations',
  duration: '2 minutes',
  difficulty: 'Intermediate',
  instructions:
    'Speak clearly into your microphone about your background, key strengths, and what you aim to achieve over the next 12 months. Pay attention to pacing and pauses.',
  tips: [
    'Begin with a strong 1-sentence hook.',
    'Mention 2 concrete accomplishments.',
    'End with a forward-looking vision statement.',
  ],
};

export const grammarTopics = [
  {
    id: 'g1',
    name: 'Tenses (Present Perfect vs Past Simple)',
    progress: 85,
    difficulty: 'Intermediate',
    status: 'In Review',
    lessons: '12 / 14 lessons completed',
  },
  {
    id: 'g2',
    name: 'Articles (A, An, The Rules & Exceptions)',
    progress: 90,
    difficulty: 'Beginner',
    status: 'Mastered',
    lessons: '8 / 8 lessons completed',
  },
  {
    id: 'g3',
    name: 'Prepositions (In, On, At of Time & Place)',
    progress: 75,
    difficulty: 'Intermediate',
    status: 'In Progress',
    lessons: '9 / 12 lessons completed',
  },
  {
    id: 'g4',
    name: 'Sentence Structure (Compound & Complex Clauses)',
    progress: 60,
    difficulty: 'Advanced',
    status: 'In Progress',
    lessons: '6 / 10 lessons completed',
  },
  {
    id: 'g5',
    name: 'Subject-Verb Agreement (Singular & Plural)',
    progress: 95,
    difficulty: 'Beginner',
    status: 'Mastered',
    lessons: '10 / 10 lessons completed',
  },
];

export const pronunciationData = {
  topics: [
    { title: 'TH Sounds', detail: '/θ/ (think) vs /ð/ (this)', progress: 70 },
    { title: 'R / L Consonants', detail: 'Minimal pairs: read / lead, raw / law', progress: 50 },
    { title: 'V / W Differentiation', detail: 'Lip placement: very / wary, vest / west', progress: 65 },
    { title: 'Word Stress', detail: 'Primary syllables: PHRA-se-o-lo-gy vs PHO-to-graph', progress: 55 },
    { title: 'Sentence Rhythm', detail: 'Content words emphasis & pitch variation', progress: 40 },
  ],
  practiceWords: [
    { word: 'Articulate', ipa: '/ɑːrˈtɪk.jə.lət/', difficulty: 'Advanced' },
    { word: 'Specifically', ipa: '/spəˈsɪf.ɪ.kəl.i/', difficulty: 'Intermediate' },
    { word: 'Phenomenon', ipa: '/fəˈnɑː.mə.nɑːn/', difficulty: 'Advanced' },
    { word: 'Vulnerable', ipa: '/ˈvʌl.nɚ.ə.bəl/', difficulty: 'Intermediate' },
    { word: 'Thoughtful', ipa: '/ˈθɑːt.fəl/', difficulty: 'Beginner' },
  ],
  tip: 'Place the tip of your tongue slightly between your upper and lower teeth for the "TH" sound, ensuring smooth airflow without biting down.',
};

export const vocabularyWords = [
  {
    id: 'v1',
    word: 'Confident',
    partOfSpeech: 'adjective',
    meaning: 'Feeling or showing certainty about something; self-assured.',
    example: 'She gave a confident and articulate presentation to the board.',
    difficulty: 'Intermediate',
    learned: true,
  },
  {
    id: 'v2',
    word: 'Consistent',
    partOfSpeech: 'adjective',
    meaning: 'Acting or done in the same way over time, especially to be fair or accurate.',
    example: 'Consistent 15-minute daily practice compounds into high fluency.',
    difficulty: 'Intermediate',
    learned: true,
  },
  {
    id: 'v3',
    word: 'Communicate',
    partOfSpeech: 'verb',
    meaning: 'Share or exchange information, news, or ideas effectively.',
    example: 'Empathetic leaders communicate clearly with diverse teams.',
    difficulty: 'Beginner',
    learned: true,
  },
  {
    id: 'v4',
    word: 'Improve',
    partOfSpeech: 'verb',
    meaning: 'Make or become better in quality, skill, or performance.',
    example: 'Targeted speaking exercises rapidly improve pronunciation clarity.',
    difficulty: 'Beginner',
    learned: true,
  },
  {
    id: 'v5',
    word: 'Fluent',
    partOfSpeech: 'adjective',
    meaning: 'Able to express oneself easily and articulately in a language.',
    example: 'He aims to become fully fluent in professional English this year.',
    difficulty: 'Intermediate',
    learned: true,
  },
];

export const listeningLesson = {
  title: 'Navigating Cross-Functional Team Conversations',
  level: 'Intermediate (B2)',
  duration: '3 min 30 sec',
  difficulty: 'Intermediate',
  accent: 'General American & British RP',
  description:
    'Listen to a short workplace dialogue discussing sprint deadlines, trade-offs, and collaborative problem-solving.',
};

export const readingLesson = {
  title: 'The Compound Power of Daily Micro-Habits',
  topic: 'Productivity & Growth',
  difficulty: 'Intermediate',
  estimatedTime: '3 min read',
  excerpt:
    'Small improvements done daily lead to staggering long-term results. When you improve your spoken and written vocabulary by just 1% each day, you end up 37 times better over the course of a single year. Consistency always outperforms intensity.',
  progress: '65% completed',
};

export const writingPrompt = {
  prompt: 'Describe one skill you want to improve and explain why it is important for your personal and professional growth.',
  suggestedWords: '80 - 150 words',
  initialDraft:
    'I want to significantly improve my public speaking and English presentation skills. Being able to explain complex ideas clearly allows me to inspire teammates and express my ideas with confidence in global meetings.',
};

export const weeklyEnglishActivity = [
  { day: 'Mon', minutes: 15 },
  { day: 'Tue', minutes: 20 },
  { day: 'Wed', minutes: 10 },
  { day: 'Thu', minutes: 25 },
  { day: 'Fri', minutes: 15 },
  { day: 'Sat', minutes: 30 },
  { day: 'Sun', minutes: 20 },
];

export const quickPracticeActions = [
  { id: 'q1', label: '5 min Vocabulary', icon: 'BookOpen', color: 'primary', count: '5 words' },
  { id: 'q2', label: '5 min Grammar', icon: 'CheckSquare', color: 'success', count: '10 drills' },
  { id: 'q3', label: '10 min Reading', icon: 'FileText', color: 'info', count: '1 article' },
  { id: 'q4', label: '10 min Speaking', icon: 'Mic', color: 'warning', count: '2 prompts' },
];
