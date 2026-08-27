// ELEVATE AI Fitness Coach Service — Natural, Intent-Aware & Personalized Intelligence

// 1. Explicit Out-Of-Domain Keywords (queries strictly unrelated to fitness)
const NON_FITNESS_PATTERNS = [
  /\bpython\b/i,
  /\bjavascript\b/i,
  /\bcode\b/i,
  /\bprogramming\b/i,
  /\bsoftware\b/i,
  /\bresume\b/i,
  /\bcapital of\b/i,
  /\btell me a joke\b/i,
  /\bwrite (an? )?essay\b/i,
  /\bweather in\b/i,
  /\bstock market\b/i,
  /\bcrypto\b/i,
  /\bbitcoin\b/i,
  /\bmovie\b/i,
  /\bpolitics\b/i,
  /\belection\b/i,
  /\bwho is the president\b/i,
];

// 2. Comprehensive Fitness & Anatomical Terms
const FITNESS_TERMS = [
  'chest', 'pec', 'bench', 'pushup', 'push-up', 'fly', 'incline', 'decline', 'crossover',
  'arm', 'bicep', 'tricep', 'forearm', 'curl', 'extension', 'dip', 'skull crusher',
  'shoulder', 'delt', 'overhead press', 'military press', 'lateral raise', 'face pull', 'sholder',
  'back', 'lat', 'row', 'pullup', 'pull-up', 'pulldown', 'deadlift', 'traps', 'rhomboid',
  'leg', 'quad', 'hamstring', 'glute', 'squat', 'lunge', 'rdl', 'calf', 'calves', 'leg press',
  'abs', 'core', 'plank', 'crunch', 'hanging leg raise', 'oblique', 'six pack', 'six-pack',
  'posture', 'rounded shoulder', 'neck', 'spine', 'thoracic', 'hunchback', 'wall angel', 'chin tuck',
  'workout', 'exercise', 'training', 'gym', 'fitness', 'routine', 'split', 'program', 'plan',
  'sets', 'reps', 'weight', 'overload', 'progressive overload', 'rpe', '1rm', 'failure',
  'rest', 'recovery', 'sleep', 'sore', 'soreness', 'doms', 'deload', 'overtraining',
  'nutrition', 'food', 'eat', 'diet', 'protein', 'carbs', 'fats', 'calorie', 'pre-workout', 'pre workout',
  'post-workout', 'post workout', 'creatine', 'whey', 'shake', 'hydration', 'water',
  'cardio', 'hiit', 'running', 'jogging', 'treadmill', 'jump rope', 'stamina', 'endurance',
  'mobility', 'stretch', 'stretching', 'flexibility', 'foam roller', 'warmup', 'warm-up', 'cooldown',
  'dumbbell', 'barbell', 'kettlebell', 'cable', 'machine', 'bodyweight', 'calisthenics', 'home workout',
  'fat loss', 'bulk', 'cut', 'hypertrophy', 'muscle', 'gain', 'lose weight', 'strength', 'beginner',
  'habit', 'consistency', 'motivation', 'form', 'technique', 'today', 'should i', 'jaana', 'kya karu',
  'easier', 'harder', 'modify', 'substitute', 'how long', '20 min', '30 min', '45 min'
];

export function isNonFitnessQuery(text) {
  const query = text.toLowerCase().trim();
  return NON_FITNESS_PATTERNS.some((pattern) => pattern.test(query));
}

export function isFitnessQuery(text) {
  const query = text.toLowerCase().trim();

  if (isNonFitnessQuery(query)) {
    return false;
  }

  if (
    query === 'hello' ||
    query === 'hi' ||
    query === 'hey' ||
    query === 'hey coach' ||
    query === 'help' ||
    query.startsWith('good morning') ||
    query.startsWith('good afternoon') ||
    query.startsWith('good evening')
  ) {
    return true;
  }

  return FITNESS_TERMS.some((term) => query.includes(term));
}

/**
 * Builds standard structured context from user profile & fitness data
 */
export function buildUserFitnessContext(profile = {}, fitnessData = {}) {
  const fitness = profile?.fitness || {};
  const growth = profile?.growthIdentity || {};

  const level =
    profile?.fitnessLevel ||
    fitness?.level ||
    fitnessData?.fitnessProfile?.levelTitle ||
    growth?.learningLevel ||
    'Beginner';

  const goal =
    profile?.fitnessGoal ||
    fitness?.goal ||
    growth?.primaryFocus ||
    fitnessData?.personalFitnessGoals?.find((g) => g.active)?.name ||
    'Muscle Gain';

  const location =
    profile?.workoutLocation ||
    fitness?.location ||
    fitnessData?.userFitnessPreferences?.location ||
    'Home';

  const rawEquipment =
    profile?.availableEquipment ||
    fitness?.equipment ||
    fitnessData?.userFitnessPreferences?.equipment ||
    'Dumbbells only';

  let equipmentStr = 'Dumbbells only';
  let isDumbbellsOnly = false;
  let isBodyweightOnly = false;

  if (Array.isArray(rawEquipment)) {
    if (rawEquipment.length === 1 && rawEquipment[0].toLowerCase().includes('dumbbell')) {
      isDumbbellsOnly = true;
      equipmentStr = 'Dumbbells only';
    } else if (rawEquipment.length === 0 || rawEquipment[0].toLowerCase().includes('no equipment') || rawEquipment[0].toLowerCase().includes('none')) {
      isBodyweightOnly = true;
      equipmentStr = 'No equipment';
    } else {
      equipmentStr = rawEquipment.join(', ');
    }
  } else if (typeof rawEquipment === 'string') {
    equipmentStr = rawEquipment;
    const lowerEq = rawEquipment.toLowerCase();
    if (lowerEq.includes('dumbbell') && !lowerEq.includes('barbell') && !lowerEq.includes('cable')) {
      isDumbbellsOnly = true;
    } else if (lowerEq.includes('no equipment') || lowerEq.includes('bodyweight') || lowerEq === 'none') {
      isBodyweightOnly = true;
    }
  }

  if (location.toLowerCase() === 'home' && isBodyweightOnly) {
    isBodyweightOnly = true;
  }

  const duration =
    profile?.preferredDuration ||
    fitness?.preferredDuration ||
    growth?.availableTime ||
    fitnessData?.userFitnessPreferences?.preferredDuration ||
    '30 minutes';

  const daysPerWeek =
    profile?.workoutDaysPerWeek ||
    fitness?.weeklyTarget ||
    fitnessData?.userFitnessPreferences?.weeklyTarget ||
    fitnessData?.fitnessProfile?.weeklyWorkoutsTarget ||
    4;

  const currentStreak =
    profile?.currentStreak ??
    fitnessData?.fitnessProfile?.currentStreak ??
    0;

  const fitnessScore =
    profile?.overallGrowthScore ??
    fitnessData?.fitnessScoreData?.currentScore ??
    null;

  const strength =
    fitnessData?.fitnessScoreData?.pillars?.find((p) => p.name === 'Strength')?.score ?? null;

  const endurance =
    fitnessData?.fitnessScoreData?.pillars?.find((p) => p.name === 'Endurance')?.score ?? null;

  const mobilityScore =
    fitnessData?.fitnessScoreData?.pillars?.find((p) => p.name === 'Mobility')?.score ?? null;

  const consistency =
    fitnessData?.fitnessScoreData?.pillars?.find((p) => p.name === 'Consistency')?.score ?? null;

  const recoveryStatus =
    fitnessData?.recoveryData?.overallStatus || 'Ready to Train';

  const recentWorkouts =
    fitnessData?.recentWorkoutsList || [];

  return {
    name: profile?.name || 'Learner',
    age: profile?.age || fitness?.age || null,
    gender: profile?.gender || fitness?.gender || null,
    height: profile?.height || fitness?.height || null,
    weight: profile?.weight || fitness?.weight || null,
    fitnessLevel: level,
    fitnessGoal: goal,
    activityLevel: profile?.activityLevel || 'Moderate',
    workoutLocation: location,
    availableEquipment: equipmentStr,
    isDumbbellsOnly,
    isBodyweightOnly,
    workoutDaysPerWeek: daysPerWeek,
    preferredDuration: duration,
    fitnessScore,
    strength,
    endurance,
    mobilityScore,
    consistency,
    recoveryStatus,
    currentStreak,
    recentWorkouts,
  };
}

/**
 * Main AI Coach Dispatcher:
 * 1. Tries the secure serverless Gemini API endpoint (/api/fitness-coach)
 * 2. Falls back seamlessly to the natural conversational engine with multi-turn memory
 */
export async function fetchCoachResponse(messages = [], userContext = {}) {
  const lastMessage = messages[messages.length - 1]?.text || '';

  // Quick client-side check for non-fitness guardrail
  if (isNonFitnessQuery(lastMessage)) {
    return {
      text: "I'm your ELEVATE Fitness Coach, so I can help with workouts, exercise, posture, mobility, recovery, and fitness nutrition. Ask me a fitness question and I'll help! 😊",
      isGuardrail: true,
    };
  }

  try {
    const res = await fetch('/api/fitness-coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, userContext }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.response && !data.fallback) {
        return { text: data.response, isGuardrail: false };
      }
    }
  } catch (err) {
    console.debug('Using conversational fallback engine:', err);
  }

  const fallbackAnswer = generateConversationalResponse(lastMessage, userContext, messages);
  return { text: fallbackAnswer, isGuardrail: false };
}

/**
 * Natural, Intent-Aware Conversational Response Generator
 */
export function generateConversationalResponse(userQuery, userContext = {}, conversationHistory = []) {
  const q = userQuery.toLowerCase().trim();

  // 1. Explicit Out-of-Domain Guardrail
  if (isNonFitnessQuery(q)) {
    return (
      "I'm your ELEVATE Fitness Coach, so I can help with workouts, exercise, posture, mobility, recovery, and fitness nutrition. Ask me a fitness question and I'll help! 😊"
    );
  }

  // 2. Friendly Greetings
  if (
    q === 'hello' ||
    q === 'hi' ||
    q === 'hey' ||
    q === 'hey coach' ||
    q === 'help' ||
    q.startsWith('good morning') ||
    q.startsWith('good afternoon') ||
    q.startsWith('good evening')
  ) {
    const nameGreeting = userContext.name && userContext.name !== 'Learner' ? ` ${userContext.name}` : '';
    return (
      `Hello${nameGreeting}! 😊 I'm your ELEVATE AI Fitness Coach. What fitness goal or workout question would you like help with today?`
    );
  }

  const {
    fitnessLevel = 'Beginner',
    fitnessGoal = 'Muscle Gain',
    workoutLocation = 'Home',
    availableEquipment = 'Dumbbells only',
    isDumbbellsOnly = false,
    isBodyweightOnly = false,
    preferredDuration = '30 minutes',
    currentStreak = 0,
    recentWorkouts = [],
  } = userContext;

  const isNoEquipment = isBodyweightOnly || availableEquipment.toLowerCase().includes('no equipment') || availableEquipment.toLowerCase().includes('bodyweight') || availableEquipment.toLowerCase() === 'none';
  const isHome = (workoutLocation.toLowerCase().includes('home') || isNoEquipment) && !isDumbbellsOnly;
  const isShortDuration = preferredDuration.includes('15') || preferredDuration.includes('20') || preferredDuration.includes('30 min');
  const isEnduranceGoal = fitnessGoal.toLowerCase().includes('endurance') || fitnessGoal.toLowerCase().includes('cardio') || fitnessGoal.toLowerCase().includes('stamina');

  // Check recent conversation history for follow-ups
  const prevBotMessages = conversationHistory
    .filter((m) => m.sender === 'ai')
    .map((m) => m.text.toLowerCase());
  const lastBotMsg = prevBotMessages[prevBotMessages.length - 1] || '';

  // 3. Multi-turn Follow-up handling
  if (q.includes('make it 20') || q.includes('20 min') || q.includes('shorten') || (q.includes('make it') && q.includes('shorter'))) {
    if (lastBotMsg.includes('chest') || q.includes('chest')) {
      return (
        "Here is the streamlined **20-minute version** of your chest workout:\n\n" +
        "### 20-Min Chest Workout\n" +
        "1. Dumbbell Floor / Bench Press — 3 × 10 reps\n" +
        "2. Incline Dumbbell Press — 3 × 10 reps\n" +
        "3. Push-ups — 2 sets to near-failure\n\n" +
        "Rest: 45–60 seconds between sets\n" +
        "Duration: ~20 minutes\n\n" +
        "Keep rest intervals tight to get a high-density, effective workout in 20 minutes! ⏱️"
      );
    }
    return (
      "Here is a streamlined **20-minute express session**:\n\n" +
      "1. DB Goblet Squats — 3 × 10 reps\n" +
      "2. DB Floor Press — 3 × 10 reps\n" +
      "3. DB Bent-Over Rows — 3 × 10 reps\n" +
      "4. Plank — 2 × 45 sec\n\n" +
      "Rest 45 seconds between sets to finish right around 20 minutes! ⏱️"
    );
  }

  if (q.includes('make it easier') || q.includes('too hard') || q.includes('lighter')) {
    return (
      "No problem at all! 😊 Here is an easier version with lower volume and gentler joint angles:\n\n" +
      "1. **Knee Push-ups or Incline Push-ups** — 2 sets × 8–10 reps\n" +
      "2. **Light Dumbbell Floor Press** — 2 sets × 10 reps\n" +
      "3. **Floor Dumbbell Flyes** — 2 sets × 10 reps (Floor prevents overstretching)\n\n" +
      "Take 90 seconds of rest between sets and focus on smooth, comfortable reps! 💜"
    );
  }

  if ((q.includes('only have dumbbells') || q.includes('only dumbbells') || q.includes('just dumbbells')) && !q.includes('chest')) {
    return (
      "Got it! 👍 Here is a 100% dumbbell & bodyweight routine:\n\n" +
      "### Today's Dumbbell Workout\n" +
      "1. DB Goblet Squats — 3 × 10–12 reps\n" +
      "2. DB Floor Press — 3 × 10 reps\n" +
      "3. DB Bent-Over Rows — 3 × 10 reps\n" +
      "4. DB Overhead Shoulder Press — 3 × 10 reps\n" +
      "5. Plank — 3 × 30–45 sec\n\n" +
      "Rest: 60–90 seconds\n" +
      "Duration: ~30 minutes"
    );
  }

  if (q.includes('how many reps') || q.includes('how many sets') || q.includes('how many reps should i do') || q.includes('how many sets?')) {
    return (
      "For this workout, aim for **3 sets of 8 to 12 reps** on each exercise. 💪\n\n" +
      "• Lower the weight with control (about 2 seconds down).\n" +
      "• If you can easily complete 12 reps with good form, slightly increase the weight on your next session!"
    );
  }

  // 4. Form and Exercise Explanation Questions (Direct explanation without full workout generation)
  if (
    q.includes('how do i do bench press') ||
    q.includes('how to do bench press') ||
    q.includes('what is bench press') ||
    q.includes('bench press form') ||
    q.includes('correct bench press')
  ) {
    return (
      "Here is the proper technique for the **Bench Press**: 🏋️\n\n" +
      "**1. Setup:**\n" +
      "• Lie flat with eyes directly under the bar.\n" +
      "• Plant your feet firmly on the ground and pull your shoulder blades back and down into the bench.\n\n" +
      "**2. Grip & Unrack:**\n" +
      "• Grip the bar slightly wider than shoulder-width with wrists straight.\n" +
      "• Unrack the bar and stabilize it directly over your shoulders.\n\n" +
      "**3. Lowering:**\n" +
      "• Inhale and lower the bar with control to your mid-sternum.\n" +
      "• Keep your elbows tucked at roughly a 45-degree angle (not flared out wide).\n\n" +
      "**4. Press:**\n" +
      "• Exhale and press upward in a slight natural arc back over your shoulders."
    );
  }

  // 5. "Give me chest exercises" (Lists exercises matching equipment, NOT a full workout plan)
  if (
    q === 'give me chest exercises' ||
    q === 'give me chest exercise' ||
    q === 'chest exercises' ||
    q.includes('what exercises are good for chest') ||
    q.includes('exercises for chest')
  ) {
    if (isDumbbellsOnly || availableEquipment.toLowerCase().includes('dumbbell only')) {
      return (
        "Here are 5 great chest exercises you can do with **Dumbbells and Bodyweight**: 💪\n\n" +
        "1. **Dumbbell Flat Bench / Floor Press** — Primary compound mass builder for mid-chest.\n" +
        "2. **Incline Dumbbell Press** — Targets the clavicular head (upper chest).\n" +
        "3. **Dumbbell Chest Flyes** — Provides a deep stretch across the pectorals.\n" +
        "4. **Standard Push-ups** — Great functional bodyweight movement.\n" +
        "5. **Dumbbell Pullovers** — Stretches the ribcage and upper chest fibers."
      );
    }

    if (isNoEquipment || (isHome && !availableEquipment.toLowerCase().includes('gym'))) {
      return (
        "Here are 4 effective **Bodyweight Chest Exercises** for home: 💪\n\n" +
        "1. **Standard Push-ups** — Overall chest and core builder.\n" +
        "2. **Decline Push-ups** (Feet on chair/couch) — Focuses on the upper chest.\n" +
        "3. **Incline Push-ups** (Hands elevated on table) — Targets the lower chest with lower joint stress.\n" +
        "4. **Diamond Push-ups** — Emphasizes the inner chest and triceps."
      );
    }

    return (
      "Here are the top 5 **Chest Exercises**: 🏋️\n\n" +
      "1. **Barbell Bench Press** — Heavy compound strength builder.\n" +
      "2. **Incline Dumbbell Press** — Upper chest development.\n" +
      "3. **Standing Cable Crossover** — Constant tension and peak contraction.\n" +
      "4. **Dips** (Chest-leaning) — Lower chest mass.\n" +
      "5. **Dumbbell Chest Flyes** — Deep pectoral stretch."
    );
  }

  // 6. "Give me a chest workout"
  if (q.includes('chest workout') || (q.includes('chest') && q.includes('workout'))) {
    if (isDumbbellsOnly || availableEquipment.toLowerCase().includes('dumbbell only')) {
      return (
        "### Today's Dumbbell Chest Workout 💪\n\n" +
        "1. **Dumbbell Floor / Flat Press** — 3 sets × 10 reps\n" +
        "2. **Incline Dumbbell Press** — 3 sets × 10 reps\n" +
        "3. **Dumbbell Chest Flyes** — 3 sets × 12 reps\n" +
        "4. **Push-ups** — 2 sets × 8–12 reps\n" +
        "5. **Dumbbell Pullovers** — 2 sets × 12 reps\n\n" +
        "**Rest:** 60–90 seconds between sets\n" +
        "**Duration:** ~30 minutes\n\n" +
        "Focus on controlled eccentric lowering and squeeze at the top of each rep!"
      );
    }

    if (isNoEquipment || isHome) {
      return (
        "### Home Bodyweight Chest Workout 💪\n\n" +
        "1. **Standard Push-ups** — 3 sets × 10–12 reps\n" +
        "2. **Decline Push-ups** (Feet on chair) — 3 sets × 8–10 reps\n" +
        "3. **Incline Push-ups** (Hands on table) — 3 sets × 12–15 reps\n" +
        "4. **Diamond Push-ups** — 2 sets × 8–10 reps\n\n" +
        "**Rest:** 45–60 seconds between sets\n" +
        "**Duration:** ~20 minutes"
      );
    }

    return (
      "### Gym Chest Workout 🏋️\n\n" +
      "1. **Barbell Bench Press** — 3 sets × 8–10 reps\n" +
      "2. **Incline Dumbbell Press** — 3 sets × 10 reps\n" +
      "3. **Cable Flyes** — 3 sets × 12 reps\n" +
      "4. **Push-ups or Dips** — 2 sets × 10–15 reps\n\n" +
      "**Rest:** 90–120 seconds between sets\n" +
      "**Duration:** ~45 minutes"
    );
  }

  // 7. "Give me workout plan for today" / "What should I workout today?" (EXACTLY ONE WORKOUT FOR TODAY)
  if (
    q.includes('workout plan for today') ||
    q.includes('workout for today') ||
    q.includes('what should i workout today') ||
    q.includes('what should i train today') ||
    q.includes('what to workout today') ||
    q.includes('what workout should i do') ||
    q.includes("today's workout") ||
    q.includes('todays workout') ||
    q.includes('give me today workout')
  ) {
    const lastSession = recentWorkouts.length > 0 ? recentWorkouts[0] : null;
    let streakText = currentStreak > 0 ? `You're on a great ${currentStreak}-day active streak! 🔥 ` : '';

    if (lastSession && (lastSession.title?.toLowerCase().includes('chest') || lastSession.title?.toLowerCase().includes('upper'))) {
      return (
        `${streakText}Since your last session focused on ${lastSession.title}, let's give those upper body muscles recovery today and focus on **Lower Body & Core**! 🦵\n\n` +
        "### Today's Workout\n" +
        (isDumbbellsOnly
          ? "🏋️ **DB Goblet Squats** — 3 × 10 reps\n" +
            "🦵 **DB Romanian Deadlifts (RDLs)** — 3 × 10 reps\n" +
            "🚶 **DB Walking Lunges** — 3 × 10 reps/leg\n" +
            "🔥 **Glute Bridges** — 3 × 12 reps\n" +
            "💪 **Plank** — 3 × 30–45 sec\n\n" +
            "**Rest:** 60–90 seconds\n" +
            "**Duration:** ~30–35 minutes"
          : isNoEquipment || isHome
          ? "🏋️ **Bodyweight Squats** — 3 × 15 reps\n" +
            "🚶 **Walking Lunges** — 3 × 12 reps/leg\n" +
            "🔥 **Glute Bridges** — 3 × 15 reps (2s hold at top)\n" +
            "🦵 **Standing Calf Raises** — 3 × 20 reps\n" +
            "💪 **Plank** — 3 × 30–45 sec\n\n" +
            "**Rest:** 45–60 seconds\n" +
            "**Duration:** ~20–25 minutes"
          : "🏋️ **Barbell Back Squats** — 3 × 8 reps\n" +
            "🦵 **Romanian Deadlifts (RDLs)** — 3 × 10 reps\n" +
            "🔥 **Leg Press** — 3 × 12 reps\n" +
            "🚶 **Walking Lunges** — 3 × 10 reps/leg\n" +
            "💪 **Standing Calf Raises** — 3 × 15 reps\n\n" +
            "**Rest:** 90–120 seconds\n" +
            "**Duration:** ~45 minutes")
      );
    }

    if (isEnduranceGoal) {
      return (
        `${streakText}Based on your goal to **${fitnessGoal}**, here is an aerobic & endurance conditioning workout for today: 🏃\n\n` +
        "### Today's Endurance Circuit (4 Rounds, 45s work / 15s rest):\n" +
        "1. Bodyweight Jump Squats or Air Squats\n" +
        "2. Mountain Climbers\n" +
        "3. Push-ups or Hands-Elevated Push-ups\n" +
        "4. High Knees or Fast Step-ups\n" +
        "5. Plank Hold\n\n" +
        "**Rest:** 90 seconds between rounds\n" +
        "**Duration:** ~25 minutes"
      );
    }


    return (
      `${streakText}Here is your structured **Single Workout for Today**:\n\n` +
      "### Today's Workout\n" +
      (isDumbbellsOnly
        ? "1. **DB Goblet Squats** — 3 × 10 reps\n" +
          "2. **DB Floor / Flat Press** — 3 × 10 reps\n" +
          "3. **DB Bent-Over Rows** — 3 × 10 reps\n" +
          "4. **DB Overhead Shoulder Press** — 3 × 10 reps\n" +
          "5. **Plank** — 3 × 30–45 sec\n\n" +
          "**Rest:** 60–90 seconds\n" +
          "**Duration:** ~30 minutes"
        : isNoEquipment || isHome
        ? "1. **Bodyweight Squats** — 3 × 12–15 reps\n" +
          "2. **Push-ups** — 3 × 10–12 reps\n" +
          "3. **Glute Bridges** — 3 × 12 reps\n" +
          "4. **Doorway Rows or Prone Cobras** — 3 × 12 reps\n" +
          "5. **Plank** — 3 × 30–45 sec\n\n" +
          "**Rest:** 45–60 seconds\n" +
          "**Duration:** ~20 minutes"
        : "1. **Barbell Bench Press** — 3 × 8–10 reps\n" +
          "2. **Seated Cable Row** — 3 × 10 reps\n" +
          "3. **Standing DB Overhead Press** — 3 × 10 reps\n" +
          "4. **Lat Pulldown** — 3 × 10 reps\n" +
          "5. **Face Pulls** — 3 × 15 reps\n\n" +
          "**Rest:** 90 seconds\n" +
          "**Duration:** ~45 minutes") +
      "\n\nFocus on controlled, steady reps with good form. You've got this! 🚀"
    );
  }

  // 8. "Give me workout" (General prompt adapted to duration & equipment)
  if (q === 'give me workout' || q === 'give me a workout' || q === 'make me a workout') {
    if (isEnduranceGoal) {
      return (
        "### Full-Body Endurance Conditioning Workout 🏃\n\n" +
        "**4 Rounds (45s work / 15s rest):**\n" +
        "1. Bodyweight Jump Squats or Air Squats\n" +
        "2. Mountain Climbers\n" +
        "3. Push-ups or Incline Push-ups\n" +
        "4. High Knees or Fast Step-ups\n" +
        "5. Plank Hold\n\n" +
        "**Rest:** 90 seconds between rounds\n" +
        "**Duration:** ~20–25 minutes"
      );
    }

    if (isNoEquipment || (isHome && isShortDuration)) {
      return (
        "### 20-Minute Beginner Home Workout 🏠\n\n" +
        "1. **Bodyweight Squats** — 3 sets × 12–15 reps\n" +
        "2. **Incline or Standard Push-ups** — 3 sets × 8–10 reps\n" +
        "3. **Glute Bridges** — 3 sets × 12 reps\n" +
        "4. **Plank Taps** — 3 sets × 20 total taps\n" +
        "5. **Bird-Dog** — 2 sets × 8 reps/side\n\n" +
        "**Rest:** 45 seconds between sets\n" +
        "**Duration:** ~20 minutes"
      );
    }

    return (
      "### Today's Full-Body Workout 💪\n\n" +
      "1. **DB Goblet Squats** — 3 sets × 10 reps\n" +
      "2. **DB Floor Press** — 3 sets × 10 reps\n" +
      "3. **DB Romanian Deadlifts** — 3 sets × 10 reps\n" +
      "4. **DB Bent-Over Rows** — 3 sets × 10 reps\n" +
      "5. **Plank** — 3 sets × 30–45 sec\n\n" +
      "**Rest:** 60–90 seconds\n" +
      "**Duration:** ~30 minutes"
    );
  }

  // 9. "Give me a 3 day workout plan"
  if (q.includes('3 day') || q.includes('3-day') || q.includes('split') || q.includes('program')) {
    return (
      "Here is a simple and effective **3-Day Full Body Split**! 📅\n\n" +
      "**Schedule:** Monday / Wednesday / Friday\n\n" +
      (isDumbbellsOnly
        ? "**Day 1 (Full Body A):**\n" +
          "• DB Goblet Squats — 3 × 10\n" +
          "• DB Floor Press — 3 × 10\n" +
          "• DB Bent-Over Rows — 3 × 10\n" +
          "• Plank — 3 × 30–45s\n\n" +
          "**Day 2 (Full Body B):**\n" +
          "• DB Romanian Deadlifts — 3 × 10\n" +
          "• DB Shoulder Press — 3 × 10\n" +
          "• DB Walking Lunges — 3 × 10/leg\n" +
          "• DB Bicep Curls — 3 × 12\n\n" +
          "**Day 3 (Full Body C):**\n" +
          "• Incline DB Press — 3 × 10\n" +
          "• DB Single-Arm Row — 3 × 10/side\n" +
          "• DB Front Squats — 3 × 10\n" +
          "• DB Overhead Tricep Extension — 3 × 12"
        : "**Day 1 (Full Body A):** Barbell Squat (3 × 8), Bench Press (3 × 8), Cable Row (3 × 10), Plank (3 × 45s)\n\n" +
          "**Day 2 (Full Body B):** Romanian Deadlift (3 × 8), DB Shoulder Press (3 × 10), Lat Pulldown (3 × 10), Bicep Curls (3 × 12)\n\n" +
          "**Day 3 (Full Body C):** Leg Press (3 × 12), Incline DB Press (3 × 10), Cable Row (3 × 10), Tricep Extensions (3 × 12)") +
      "\n\n**Tip:** Aim to add 1 extra rep each week for progressive overload! 🌟"
    );
  }

  // 10. Nutrition: "What should I eat?" / "Diet plan"
  if (
    q.includes('what should i eat') ||
    q.includes('diet plan') ||
    q.includes('give me diet') ||
    q === 'diet' ||
    q === 'protein'
  ) {
    if (fitnessGoal.toLowerCase().includes('muscle')) {
      return (
        "Here is a practical daily meal guide to support **Muscle Building & Recovery**: 🥩\n\n" +
        "### 🌅 Breakfast\n" +
        "- 3 eggs (boiled or scrambled) + 2 slices of whole-grain toast\n" +
        "- 1 banana or a small bowl of oatmeal with milk\n\n" +
        "### 🍛 Lunch\n" +
        "- Rice or 2–3 rotis\n" +
        "- Dal or chickpeas\n" +
        "- 150g chicken breast, paneer, or tofu\n" +
        "- Green salad & curd\n\n" +
        "### 🥜 Evening Snack\n" +
        "- Handful of almonds & walnuts + fruit (apple or banana)\n" +
        "  *OR* a scoop of whey protein with water/milk\n\n" +
        "### 🌙 Dinner\n" +
        "- Roti or rice with chicken/paneer/dal\n" +
        "- Cooked mixed vegetables\n\n" +
        "### 💧 Hydration\n" +
        "Aim for 2.5–3 liters of water daily to keep muscles hydrated and performing at their best! ✨"
      );
    }

    return (
      "Here is a balanced daily meal structure: 🥗\n\n" +
      "### 🌅 Breakfast\n" +
      "- 2 eggs + whole-wheat toast OR oatmeal with fruit\n\n" +
      "### 🍛 Lunch\n" +
      "- Roti/rice + dal + paneer/chicken + mixed veggies\n\n" +
      "### 🥜 Evening Snack\n" +
      "- Fruit + handful of nuts or yogurt\n\n" +
      "### 🌙 Dinner\n" +
      "- Light portion of rice/roti + a protein source + vegetables\n\n" +
      "💧 Drink plenty of water throughout the day!"
    );
  }

  // 11. Pre-Workout Nutrition
  if (
    (q.includes('before') || q.includes('pre workout') || q.includes('pre-workout')) &&
    (q.includes('eat') || q.includes('food') || q.includes('gym') || q.includes('workout'))
  ) {
    return (
      "Here is what to eat **1 to 2 hours before a workout** for optimal energy: 🍌\n\n" +
      "• **Option 1:** A banana with 1 tbsp peanut butter.\n" +
      "• **Option 2:** Oatmeal with milk and a drizzle of honey.\n" +
      "• **Option 3:** 2 slices of whole-wheat toast with boiled eggs.\n\n" +
      "💧 **Hydration:** Drink 1–2 glasses of water 45 minutes before training."
    );
  }

  // 12. Posture & Rounded Shoulders
  if (
    q.includes('posture') ||
    q.includes('rounded shoulder') ||
    q.includes('hunch') ||
    q.includes('neck') ||
    q.includes('desk')
  ) {
    return (
      "Here is a quick daily 3-step routine to fix **rounded shoulders** from desk work: 🧘\n\n" +
      "1. **Strengthen the Upper Back:**\n" +
      "   • Band Pull-Aparts or Face Pulls — 3 sets of 15 reps (Hold contraction 2s).\n" +
      "   • Prone Cobras — 2 sets of 10 slow reps.\n\n" +
      "2. **Open the Tight Chest:**\n" +
      "   • Doorway Chest Stretch — Hold for 30–45 seconds per side.\n\n" +
      "3. **Desk Habit:**\n" +
      "   • Do 10 gentle **Chin Tucks** every 2 hours to align your cervical spine."
    );
  }

  // 13. General Warm Fallback
  return (
    `Here is personalized coaching advice for *" ${userQuery} "*! 😊\n\n` +
    `Tailored for your **${fitnessLevel}** level and **${fitnessGoal}** goal (${workoutLocation}):\n\n` +
    "• Focus on **3 sets of 8–12 controlled reps** per exercise.\n" +
    "• Take a 2-second controlled lowering phase.\n" +
    "• Stay consistent and stay hydrated with 2.5–3L of water daily.\n\n" +
    "If you want a specific workout modification, just let me know! 💜"
  );
}
