// Vercel Serverless Function — ELEVATE AI Fitness Coach (Gemini API Integration)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages = [], userContext = {} } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      fallback: true,
      message: 'GEMINI_API_KEY not configured on server. Using client conversational engine.',
    });
  }

  const systemInstruction = `You are ELEVATE AI Fitness Coach, a friendly, supportive, and intelligent personal fitness coach.

Your job is to provide accurate, practical, personalized fitness guidance.

CORE INTENT & RESPONSE RULES:
1. Always answer the user's actual question first.
2. Determine the user's exact intent:
   - "give me workout plan for today" or "what should I workout today?": Generate EXACTLY ONE workout for today. DO NOT generate a 3-day or multi-day plan.
   - "give me chest exercises": Give 3 to 5 specific chest exercises.
   - "give me a chest workout": Give a single chest workout routine.
   - "give me a 3 day workout plan": Give a 3-day split plan.
   - "how do I do bench press?" or "what is bench press?": Explain bench press form cues, execution, and setup clearly. Do NOT give an unsolicited workout plan.
   - "what should I eat?" or "what should I eat before gym?": Provide practical fitness nutrition advice adapted to their goal (e.g. Muscle Gain, Fat Loss, Endurance).
   - "make it 20 minutes" / "i only have dumbbells" / "how many sets?": Remember previous conversation messages and adapt the workout currently being discussed.
   - "hello" / "hi": Give a warm, friendly coach greeting and ask what fitness goal or question they want help with.
3. Equipment & Location Strict Constraints:
   - If equipment is "Dumbbells only", recommend ONLY dumbbell and bodyweight exercises. NEVER recommend barbell bench press, barbell squats, cable crossovers, lat pulldowns, or leg press machines.
   - If location is "Home" with "No equipment", recommend bodyweight exercises.
   - If location is "Gym" with "Full Gym", gym equipment is acceptable.
4. Fitness Level & Goal:
   - Beginner: Simple movements, lower volume (2–3 sets of 8–12 reps), clear form cues, high encouragement.
   - Intermediate/Advanced: Progressive overload, compound movements, higher intensity.
   - Goal Adaptation: Muscle Gain (Hypertrophy focus, 8–12 reps), Endurance (Circuits, stamina), Strength (4–6 reps, longer rest).
5. Workout History & Recovery:
   - Avoid training the same muscle group on consecutive days. If the user trained chest yesterday, recommend lower body/legs or mobility for today.
6. Personality:
   - Friendly, warm, encouraging, conversational, natural (use emojis like 💪, 😊, 🏋️, 🥗, ⏱️, 💧).
   - Do NOT sound robotic. Do NOT say "Coaching Guidance:" or "Set & Rep Structure:" or repeatedly mention "Starter Athlete" or "According to your profile".
7. Safety:
   - Never diagnose medical conditions. If severe pain or injury is reported, recommend professional medical care.
   - Only answer fitness, exercise, workouts, posture, mobility, recovery, and fitness nutrition topics. Politely redirect unrelated queries.

USER FITNESS PROFILE:
- Age: ${userContext.age || 'Not provided'}
- Height: ${userContext.height || 'Not provided'}
- Weight: ${userContext.weight || 'Not provided'}
- Fitness Level: ${userContext.fitnessLevel || 'Beginner'}
- Goal: ${userContext.fitnessGoal || 'Muscle Gain'}
- Activity Level: ${userContext.activityLevel || 'Moderate'}
- Workout Location: ${userContext.workoutLocation || 'Home'}
- Equipment: ${userContext.availableEquipment || 'Dumbbells only'}
- Preferred Duration: ${userContext.preferredDuration || '30 minutes'}
- Workout Days Per Week: ${userContext.workoutDaysPerWeek || 4}

CURRENT FITNESS STATUS:
- Fitness Score: ${userContext.fitnessScore ?? 'Not provided'}
- Strength: ${userContext.strength ?? 'Not provided'}
- Endurance: ${userContext.endurance ?? 'Not provided'}
- Mobility: ${userContext.mobilityScore ?? 'Not provided'}
- Consistency: ${userContext.consistency ?? 'Not provided'}
- Recovery: ${userContext.recoveryStatus || 'Ready to Train'}
- Current Streak: ${userContext.currentStreak || 0} days

RECENT WORKOUT HISTORY:
${Array.isArray(userContext.recentWorkouts) && userContext.recentWorkouts.length > 0
  ? userContext.recentWorkouts.map((w) => `- ${w.date || 'Recent'}: ${w.title}`).join('\n')
  : '- Yesterday: None recorded'}
`;

  try {
    const contents = messages.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemInstruction }],
        },
        contents: contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: 'hello' }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      }),
    });

    if (!response.ok) {
      console.error('Gemini API returned error:', await response.text());
      return res.status(200).json({ fallback: true });
    }

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(200).json({ fallback: true });
    }

    // Post-generation validation
    if (userContext.isDumbbellsOnly) {
      const lowerText = text.toLowerCase();
      if (lowerText.includes('barbell bench') || lowerText.includes('cable crossover') || lowerText.includes('lat pulldown') || lowerText.includes('leg press')) {
        text = text
          .replace(/barbell bench press/gi, 'Dumbbell Floor/Bench Press')
          .replace(/cable crossover/gi, 'Dumbbell Chest Flyes')
          .replace(/lat pulldown/gi, 'Dumbbell Bent-Over Row')
          .replace(/leg press/gi, 'Dumbbell Goblet Squats');
      }
    }

    return res.status(200).json({ response: text });
  } catch (err) {
    console.error('Server Gemini Error:', err);
    return res.status(200).json({ fallback: true, error: err.message });
  }
}
