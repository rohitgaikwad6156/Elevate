// Body Language Module Data Architecture

export const bodyLanguageProfile = {
  level: 'Level 3 — Confident Presence',
  levelNumber: 3,
  levelTitle: 'Confident Presence',
  nextLevel: 'Level 4 — Executive Charisma',
  progressToNext: 72,
  totalCameraTime: '3h 18m',
  totalSessions: 14,
  streakDays: 12,
};

export const overallScoreData = {
  currentScore: 78,
  previousScore: 69,
  targetScore: 85,
  monthlyImprovement: '+9 pts this month',
  scoreBreakdown: [
    { skill: 'Posture', score: 84, weight: '20%', status: 'Strong' },
    { skill: 'Eye Contact', score: 74, weight: '20%', status: 'Developing' },
    { skill: 'Facial Expression', score: 79, weight: '15%', status: 'Steady' },
    { skill: 'Gestures', score: 68, weight: '15%', status: 'Opportunity' },
    { skill: 'Movement', score: 76, weight: '15%', status: 'Steady' },
    { skill: 'Presence', score: 81, weight: '15%', status: 'Strong' },
  ],
  explanation:
    'Your Body Language Score is a composite coaching index calculated from observable practice-session signals. It is designed as targeted developmental feedback, not a clinical or psychological evaluation.',
};

export const performanceMetrics = [
  {
    id: 'posture',
    label: 'Posture',
    score: 84,
    trend: '+7% this month',
    trendDirection: 'up',
    description: 'Shoulder alignment, spine neutrality, and open body orientation.',
    coachingNote: 'Shoulders are level and relaxed. Occasional forward head tilt during long answers.',
  },
  {
    id: 'eye_contact',
    label: 'Eye Contact',
    score: 74,
    trend: '+6% this month',
    trendDirection: 'up',
    description: 'Time looking directly toward the camera lens vs shifting gaze.',
    coachingNote: 'Good consistency during introductions. Gaze drops during technical explanations.',
  },
  {
    id: 'expression',
    label: 'Facial Expression',
    score: 79,
    trend: '+4% this month',
    trendDirection: 'up',
    description: 'Visible engagement, natural smile frequency, and eyebrow dynamic.',
    coachingNote: 'Expressive and friendly. Add subtle facial emphasis when stating key results.',
  },
  {
    id: 'gestures',
    label: 'Gestures',
    score: 68,
    trend: '+5% this month',
    trendDirection: 'up',
    description: 'Hand visibility, gesture variety, and purposeful emphasis.',
    coachingNote: 'Gestures are limited and occasionally repetitive. Practice open-hand framing.',
  },
  {
    id: 'movement',
    label: 'Movement',
    score: 76,
    trend: '+3% this month',
    trendDirection: 'up',
    description: 'Body stability, minimal fidgeting, and controlled weight distribution.',
    coachingNote: 'Generally grounded with minor torso shifting under high cognitive load.',
  },
  {
    id: 'presence',
    label: 'Presence',
    score: 81,
    trend: '+8% this month',
    trendDirection: 'up',
    description: 'Overall visual authority, open framing, and calm poise.',
    coachingNote: 'Strong visual authority and commanding baseline presence.',
  },
];

export const aiPresenceCoach = {
  title: 'Your AI Presence Coach',
  priority: 'Eye Contact Stability',
  recommendation:
    'Your posture is strong (84%), but you tend to look downward when explaining complex technical concepts. Practice maintaining camera eye contact for 3–4 seconds before naturally shifting your gaze.',
  whyItMatters:
    'Consistent camera eye contact builds trust, projects deep mastery of your subject, and makes virtual audiences feel directly addressed.',
  actionLabel: 'Practice Eye Contact Drill',
  targetMetric: '74% → 82%',
};

export const quickPracticeCards = [
  {
    id: 'qp1',
    title: '60-Second Confidence Check',
    description: 'Stand/sit naturally and deliver a 60-second elevator pitch.',
    duration: '60 sec',
    difficulty: 'Beginner',
    targetSkill: 'Overall Presence',
    icon: 'Camera',
  },
  {
    id: 'qp2',
    title: 'Eye Contact Drill',
    description: 'Maintain comfortable camera eye contact while explaining an idea.',
    duration: '2 min',
    difficulty: 'Intermediate',
    targetSkill: 'Eye Contact',
    icon: 'Eye',
  },
  {
    id: 'qp3',
    title: 'Posture Reset',
    description: 'Calibrate your sitting & spine alignment for executive presence.',
    duration: '1 min',
    difficulty: 'Beginner',
    targetSkill: 'Posture',
    icon: 'PersonStanding',
  },
  {
    id: 'qp4',
    title: 'Expression Drill',
    description: 'Practice transitioning between neutral, engaged, and warm expressions.',
    duration: '90 sec',
    difficulty: 'Intermediate',
    targetSkill: 'Facial Expression',
    icon: 'Smile',
  },
  {
    id: 'qp5',
    title: 'Gesture Practice',
    description: 'Explain a 3-step process using deliberate open-hand gestures.',
    duration: '2 min',
    difficulty: 'Advanced',
    targetSkill: 'Gestures',
    icon: 'Hand',
  },
];

export const cameraPracticeModes = [
  { id: 'free', name: 'Free Practice', description: 'Open camera studio for spontaneous presence rehearsal.' },
  { id: 'confidence', name: 'Confidence Routine', description: 'Calibrate assertive posture and steady eye gaze.' },
  { id: 'interview', name: 'Interview Presence', description: 'Simulate virtual behavioral interview questions.' },
  { id: 'presentation', name: 'Presentation Practice', description: 'Deliver slides with expansive gestures & stage poise.' },
  { id: 'conversation', name: 'Conversational Presence', description: 'Practice warm, active listening nonverbal signals.' },
  { id: 'storytelling', name: 'Storytelling Body Language', description: 'Align facial expressions and hand pacing with narrative arcs.' },
];

export const cameraDurations = [
  { label: '30 sec', seconds: 30 },
  { label: '1 min', seconds: 60 },
  { label: '2 min', seconds: 120 },
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
];

export const cameraSetupSteps = [
  { step: 1, title: 'Camera Permissions', description: 'Enable camera access for real-time presence calibration.', status: 'ready' },
  { step: 2, title: 'Camera at Eye Level', description: 'Elevate your laptop or webcam so the lens is parallel with your eyes.', status: 'ready' },
  { step: 3, title: 'Upper Body Framing', description: 'Position yourself so head and shoulders are centered with breathing room.', status: 'ready' },
  { step: 4, title: 'Frontal Lighting Check', description: 'Ensure light source faces you to illuminate facial expressions clearly.', status: 'ready' },
  { step: 5, title: 'Background Status', description: 'Clean, uncluttered background with minimal distracting movement.', status: 'ready' },
];

export const postureAnalysisData = {
  score: 84,
  breakdown: [
    { aspect: 'Shoulder Alignment', status: 'Optimal', detail: 'Shoulders level and relaxed, no asymmetric drooping.' },
    { aspect: 'Head Position', status: 'Slight Forward Tilt', detail: 'Chin drops 8° forward during complex responses.' },
    { aspect: 'Spine Alignment', status: 'Strong', detail: 'Upright lumbar posture without stiff hyperextension.' },
    { aspect: 'Body Openness', status: 'Optimal', detail: 'Torso remains uncrossed and receptive.' },
    { aspect: 'Shoulder Tension', status: 'Low Tension', detail: 'Trapezius muscles relaxed.' },
  ],
  aiRecommendation: 'Raise your screen by 2 inches and keep your chin level with the horizon to eliminate the forward head tilt.',
};

export const eyeContactData = {
  score: 74,
  cameraEngagement: 81,
  gazeStability: 68,
  timeline: [
    { time: '00:00 - 00:30', status: 'Strong', detail: '94% camera focus during introduction' },
    { time: '00:30 - 01:15', status: 'Needs Improvement', detail: 'Frequent downward glances while recalling numbers' },
    { time: '01:15 - 02:00', status: 'Strong', detail: '88% direct gaze during conclusion' },
  ],
  aiObservation: 'You maintain direct eye contact during openings, but your gaze drops when retrieving technical metrics. Practice holding the lens gaze while formulating points.',
};

export const facialExpressionData = {
  score: 79,
  signals: [
    { pattern: 'Active Engagement', percentage: 84, rating: 'High' },
    { pattern: 'Natural Smile Frequency', percentage: 65, rating: 'Balanced' },
    { pattern: 'Neutral Focus', percentage: 72, rating: 'Optimal' },
    { pattern: 'Visible Facial Tension', percentage: 22, rating: 'Low' },
  ],
  observation: 'Your expression is composed and approachable. Adding subtle eyebrow emphasis when delivering key conclusions will enhance persuasiveness.',
};

export const gestureData = {
  score: 68,
  guidelines: {
    good: ['Open palm gestures when introducing concepts', 'Synchronized hand movement with key words'],
    improve: ['Expand gesture variety beyond two-handed chopping', 'Hold resting hands comfortably in lower third'],
    avoid: ['Repetitive finger tapping or pen clicking', 'Hiding hands below the desk line'],
  },
  aiFeedback: 'Your gestures are natural but infrequent. Use deliberate open-hand framing when outlining a multi-part agenda.',
};

export const radarSkillsData = [
  { skill: 'Posture', current: 84, previous: 76, target: 90 },
  { skill: 'Eye Contact', current: 74, previous: 66, target: 85 },
  { skill: 'Expression', current: 79, previous: 74, target: 88 },
  { skill: 'Gestures', current: 68, previous: 62, target: 82 },
  { skill: 'Movement', current: 76, previous: 71, target: 85 },
  { skill: 'Presence', current: 81, previous: 73, target: 90 },
];

export const weaknessOpportunities = [
  {
    id: 'w1',
    title: 'Gaze Shift on Hard Questions',
    score: '74% Eye Contact',
    severity: 'high',
    whyItMatters: 'Looking down or away when challenged can inadvertently signal hesitation or uncertainty.',
    howToFix: 'Take a silent breath while keeping your eyes anchored to the camera before speaking.',
    drill: 'Camera Focus Drill',
  },
  {
    id: 'w2',
    title: 'Limited Gesture Vocabulary',
    score: '68% Gestures',
    severity: 'medium',
    whyItMatters: 'Using only one repetitive hand movement reduces visual dynamism by 40%.',
    howToFix: 'Incorporate 3 distinct gesture styles: numerical counting, palm-up welcoming, and boundary framing.',
    drill: 'Gesture Variety Drill',
  },
  {
    id: 'w3',
    title: 'Forward Head Creep',
    score: '84% Posture',
    severity: 'low',
    whyItMatters: 'Leaning the neck toward the screen strains vocal projection and looks fatigued.',
    howToFix: 'Imagine a string gently pulling the crown of your head toward the ceiling.',
    drill: 'Posture Reset',
  },
];

export const structuredDrillsLibrary = [
  { id: 'd1', category: 'Posture', name: 'Neutral Spine Calibration', duration: '2 min', difficulty: 'Beginner', skill: 'Spine & Shoulders', instructions: 'Sit tall, roll shoulders back and down, align ears over shoulders.' },
  { id: 'd2', category: 'Posture', name: 'Executive Standing Stance', duration: '3 min', difficulty: 'Intermediate', skill: 'Grounded Presence', instructions: 'Feet shoulder-width apart, weight balanced 50/50, open chest.' },
  { id: 'd3', category: 'Eye Contact', name: '3-Second Lens Lock', duration: '2 min', difficulty: 'Intermediate', skill: 'Camera Engagement', instructions: 'Speak 3 full sentences while maintaining unbroken focus on the camera lens.' },
  { id: 'd4', category: 'Eye Contact', name: 'Natural Gaze Shift Drill', duration: '3 min', difficulty: 'Advanced', skill: 'Conversational Gaze', instructions: 'Hold camera gaze for 4 seconds, shift briefly for 1 second, and return smoothly.' },
  { id: 'd5', category: 'Expression', name: 'Active Listening Warmth', duration: '2 min', difficulty: 'Beginner', skill: 'Facial Engagement', instructions: 'Practice slight head nods, relaxed eyebrow position, and gentle micro-smiles.' },
  { id: 'd6', category: 'Expression', name: 'Emphasis Expression Shift', duration: '2 min', difficulty: 'Intermediate', skill: 'Vocal-Facial Harmony', instructions: 'Lift eyebrows slightly when stating major data points to highlight significance.' },
  { id: 'd7', category: 'Gestures', name: 'Open-Hand Rule of Three', duration: '3 min', difficulty: 'Intermediate', skill: 'Hand Framing', instructions: 'Introduce points 1, 2, and 3 using distinct spatial hand placements.' },
  { id: 'd8', category: 'Gestures', name: 'Resting Hand Position', duration: '2 min', difficulty: 'Beginner', skill: 'Non-Distraction', instructions: 'Rest hands comfortably in the lower third between deliberate gestures.' },
  { id: 'd9', category: 'Presence', name: 'Virtual Interview Framing', duration: '4 min', difficulty: 'Advanced', skill: 'Interview Poise', instructions: 'Deliver the "Tell me about yourself" answer with zero downward gaze slips.' },
  { id: 'd10', category: 'Presence', name: 'Executive Pitch Presence', duration: '5 min', difficulty: 'Expert', skill: 'Boardroom Impact', instructions: 'Maintain command of the frame while presenting simulated financial metrics.' },
];

export const dailyPresenceChallenge = {
  title: '60-Second Confident Introduction on Camera',
  description: 'Record a crisp 1-minute intro while maintaining relaxed posture and unbroken camera engagement.',
  duration: '60 seconds',
  rewardXp: '+50 XP',
  targetScore: '80+ Presence',
  completed: false,
};

export const recentSessionsList = [
  {
    id: 'bl-sess-1',
    topic: 'Virtual Executive Briefing & Roadmap',
    type: 'Presentation',
    date: 'Today, 3:40 PM',
    duration: '3m 15s',
    overallScore: 84,
    improvement: '+8 pts',
    scores: {
      posture: 88,
      eyeContact: 82,
      expression: 84,
      gestures: 78,
      movement: 85,
      presence: 86,
    },
    strengths: [
      'Shoulder posture remained upright and relaxed throughout.',
      'Excellent 88% direct camera engagement during opening remarks.',
      'Open hand gestures effectively reinforced key milestones.',
    ],
    biggestOpportunity: 'Eye contact dropped to 65% when discussing Q4 headcount constraints.',
    smallAdjustment: 'Elevate your camera 1.5 inches higher to maintain natural horizontal gaze.',
    nextPractice: 'Repeat the Q4 resource slide with intentional 4-second camera lens focus.',
    timelineEvents: [
      { time: '00:00', title: 'Strong open posture established', rating: 'good' },
      { time: '00:45', title: 'Effective hand gestures highlighting 3 pillars', rating: 'good' },
      { time: '01:30', title: 'Gaze dropped to bottom left during budget topic', rating: 'warning' },
      { time: '02:15', title: 'Regained solid camera focus and upright stance', rating: 'good' },
      { time: '03:00', title: 'Decisive closing posture and direct eye contact', rating: 'good' },
    ],
    heatmap: [
      { skill: 'Posture', points: ['good', 'good', 'good', 'good', 'good'] },
      { skill: 'Eye Contact', points: ['good', 'good', 'warning', 'good', 'good'] },
      { skill: 'Expression', points: ['good', 'good', 'good', 'good', 'good'] },
      { skill: 'Gestures', points: ['warning', 'good', 'good', 'warning', 'good'] },
      { skill: 'Movement', points: ['good', 'good', 'good', 'good', 'good'] },
    ],
  },
  {
    id: 'bl-sess-2',
    topic: 'Behavioral Interview: Overcoming Team Conflict',
    type: 'Interview',
    date: 'Yesterday',
    duration: '2m 10s',
    overallScore: 80,
    improvement: '+5 pts',
    scores: {
      posture: 82,
      eyeContact: 76,
      expression: 80,
      gestures: 72,
      movement: 80,
      presence: 82,
    },
    strengths: [
      'Warm and approachable facial expression during conflict description.',
      'Zero fidgeting or excessive torso movement.',
    ],
    biggestOpportunity: 'Hands remained hidden below the desk line during the entire answer.',
    smallAdjustment: 'Bring hands into the lower frame to emphasize collaborative resolution.',
    nextPractice: 'Practice gesture drill #7 to bring hands into natural visual frame.',
    timelineEvents: [
      { time: '00:00', title: 'Calm breathing and centered alignment', rating: 'good' },
      { time: '01:00', title: 'Hands hidden below camera view', rating: 'warning' },
      { time: '02:00', title: 'Strong closing smile and direct gaze', rating: 'good' },
    ],
    heatmap: [
      { skill: 'Posture', points: ['good', 'good', 'good', 'good'] },
      { skill: 'Eye Contact', points: ['good', 'warning', 'good', 'good'] },
      { skill: 'Expression', points: ['good', 'good', 'good', 'good'] },
      { skill: 'Gestures', points: ['warning', 'warning', 'warning', 'good'] },
      { skill: 'Movement', points: ['good', 'good', 'good', 'good'] },
    ],
  },
];

export const subtleAchievements = [
  { id: 'ach1', icon: '🏆', title: 'First Camera Practice', desc: 'Completed baseline presence assessment', unlocked: true },
  { id: 'ach2', icon: '🔥', title: '12-Day Presence Streak', desc: 'Maintained daily nonverbal consistency', unlocked: true },
  { id: 'ach3', icon: '🎯', title: 'Eye Contact Master', desc: 'Maintained >85% camera focus across 3 sessions', unlocked: true },
  { id: 'ach4', icon: '💪', title: 'Confident Posture', desc: 'Zero shoulder slouch detected across 5 drills', unlocked: true },
  { id: 'ach5', icon: '🎤', title: 'Presentation Ready', desc: 'Completed full 5-minute slide rehearsal', unlocked: false },
];
