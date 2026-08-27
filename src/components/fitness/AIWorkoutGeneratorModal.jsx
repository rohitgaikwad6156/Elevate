import { useState, useEffect, useMemo } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Sliders,
  Play,
  Layers,
  Clock,
  Flame,
} from 'lucide-react';
import styles from './AIWorkoutGeneratorModal.module.css';

export default function AIWorkoutGeneratorModal({ profile, onAccept, onClose }) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [generationStage, setGenerationStage] = useState(0);

  const userGoal = profile?.fitnessGoal || 'Build Strength & Posture';
  const userLevel = profile?.fitnessLevel || 'Beginner';
  const userEquip = profile?.availableEquipment || 'Dumbbells & Bodyweight';
  const userLocation = profile?.workoutLocation || 'Home / Gym';

  const stages = [
    `Analyzing profile: ${userLevel} • ${userGoal}...`,
    `Filtering available equipment (${userEquip})...`,
    `Balancing push/pull volume and joint alignment...`,
    `Personalizing rest intervals and progressive overload...`,
    `ELEVATE workout generated successfully! ✨`,
  ];

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setGenerationStage((prev) => {
        if (prev >= stages.length - 1) {
          setIsGenerating(false);
          clearInterval(stageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(stageInterval);
  }, []);

  const generatedPlan = useMemo(() => {
    const isHome = userLocation.toLowerCase().includes('home');
    const isDumbbell = userEquip.toLowerCase().includes('dumbbell') || isHome;

    if (isDumbbell) {
      return {
        title: `AI Personalized ${userGoal.slice(0, 20)} Home Flow`,
        duration: '40 min',
        target: 'Chest, Shoulders, Back, Arms & Core',
        warmup: '5 min (Arm Circles, Cat-Cow Stretch, World’s Greatest Stretch)',
        exercises: [
          { name: 'Dumbbell Bench Press', sets: 3, reps: 10, rest: '75s', weight: '14 kg' },
          { name: 'One-Arm Dumbbell Row', sets: 3, reps: 10, rest: '60s', weight: '14 kg' },
          { name: 'Standing Dumbbell Overhead Press', sets: 3, reps: 10, rest: '60s', weight: '10 kg' },
          { name: 'Dumbbell Romanian Deadlift (DB RDL)', sets: 3, reps: 10, rest: '75s', weight: '16 kg' },
          { name: 'Dumbbell Bicep Curl', sets: 3, reps: 12, rest: '45s', weight: '10 kg' },
          { name: 'Plank', sets: 3, reps: 45, rest: '45s', weight: 'Bodyweight' },
        ],
        cooldown: '5 min (Child’s Pose with Lat Reach, Doorway Chest Stretch)',
      };
    }

    return {
      title: `AI Personalized ${userGoal.slice(0, 20)} Hypertrophy Routine`,
      duration: '45 min',
      target: 'Chest, Lats, Shoulders, Triceps, Thoracic Spine',
      warmup: '6 min (Arm Swings, Band Pull-Aparts, Thoracic Windmills)',
      exercises: [
        { name: 'Barbell Bench Press', sets: 3, reps: 8, rest: '90s', weight: '60 kg' },
        { name: 'Seated Cable Row', sets: 3, reps: 10, rest: '75s', weight: '50 kg' },
        { name: 'Standing Dumbbell Overhead Press', sets: 3, reps: 10, rest: '75s', weight: '16 kg' },
        { name: 'Lat Pulldown', sets: 3, reps: 10, rest: '60s', weight: '55 kg' },
        { name: 'Dumbbell Lateral Raise', sets: 3, reps: 12, rest: '45s', weight: '10 kg' },
        { name: 'Triceps Rope Pushdown', sets: 3, reps: 12, rest: '45s', weight: '22 kg' },
      ],
      cooldown: '5 min (Doorway Chest Stretch, Child’s Pose)',
    };
  }, [userGoal, userEquip, userLocation]);

  const handleRegenerate = () => {
    setIsGenerating(true);
    setGenerationStage(0);
    const interval = setInterval(() => {
      setGenerationStage((prev) => {
        if (prev >= stages.length - 1) {
          setIsGenerating(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 500);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerTitleRow}>
            <Sparkles size={18} className={styles.sparkleIcon} />
            <h2 className={styles.title}>AI Routine Generator</h2>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          {isGenerating ? (
            <div className={styles.loadingBox}>
              <div className={styles.spinner} />
              <h3 className={styles.generatingHeading}>ELEVATE is building your routine... ✨</h3>
              <p className={styles.stageText}>{stages[generationStage]}</p>
              <div className={styles.stageProgressRow}>
                {stages.map((_, idx) => (
                  <span
                    key={idx}
                    className={`${styles.stageDot} ${
                      generationStage >= idx ? styles.stageDotActive : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.resultBox}>
              <div className={styles.resultHeader}>
                <div>
                  <span className={styles.resultBadge}>✨ Tailored for {userGoal}</span>
                  <h3 className={styles.resultTitle}>{generatedPlan.title}</h3>
                  <p className={styles.resultMeta}>
                    Duration: {generatedPlan.duration} • Focus: {generatedPlan.target}
                  </p>
                </div>
              </div>

              {/* Warmup */}
              <div className={styles.sectionPillBox}>
                <span className={styles.sectionLabel}>Warm-Up:</span>
                <span className={styles.sectionContent}>{generatedPlan.warmup}</span>
              </div>

              {/* Exercises List */}
              <div className={styles.exerciseList}>
                {generatedPlan.exercises.map((ex, idx) => (
                  <div key={idx} className={styles.exerciseRow}>
                    <span className={styles.exNumber}>{idx + 1}</span>
                    <div className={styles.exInfo}>
                      <span className={styles.exName}>{ex.name}</span>
                      <span className={styles.exDetails}>
                        {ex.sets} sets × {ex.reps} reps • Rest: {ex.rest}
                      </span>
                    </div>
                    <span className={styles.exWeight}>{ex.weight}</span>
                  </div>
                ))}
              </div>

              {/* Cooldown */}
              <div className={styles.sectionPillBox}>
                <span className={styles.sectionLabel}>Cooldown:</span>
                <span className={styles.sectionContent}>{generatedPlan.cooldown}</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          {!isGenerating && (
            <>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={handleRegenerate}
              >
                <RotateCcw size={15} />
                Regenerate
              </button>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => {
                  onClose();
                  if (onAccept) onAccept(generatedPlan);
                }}
              >
                <Play size={15} />
                Accept & Start Workout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
