import {
  X,
  Play,
  Calendar,
  Clock,
  Dumbbell,
  CheckCircle2,
  Layers,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { exerciseLibraryData } from '../../data/exerciseLibraryData';
import styles from './DayWorkoutModal.module.css';

export default function DayWorkoutModal({
  dayData,
  onStartWorkout,
  onOpenExerciseDetail,
  onClose,
}) {
  if (!dayData) return null;

  const isRest = dayData.status === 'rest';

  // Match exercise strings to full exerciseLibraryData objects if available
  const exerciseObjects = (dayData.exercises || []).map((name) => {
    const found = exerciseLibraryData.find(
      (ex) => ex.name.toLowerCase() === name.toLowerCase()
    );
    return (
      found || {
        id: `custom-${name}`,
        name,
        primaryMuscle: dayData.targetMuscles || 'Targeted Muscle',
        equipment: dayData.equipment || 'Standard Equipment',
        difficulty: dayData.difficulty || 'Intermediate',
      }
    );
  });

  const handleStart = () => {
    const workoutToStart = {
      id: `workout-${dayData.day}`,
      title: `${dayData.workout} (${dayData.day})`,
      category: dayData.focus,
      duration: dayData.duration,
      exercises: exerciseObjects.map((ex, idx) => ({
        id: `day-ex-${idx}`,
        name: ex.name,
        target: ex.primaryMuscle || dayData.targetMuscles,
        sets: isRest ? 2 : 3,
        reps: isRest ? 10 : 10,
        weight: ex.equipment?.toLowerCase().includes('barbell') ? 45 : ex.equipment?.toLowerCase().includes('dumbbell') ? 14 : 0,
        restSeconds: isRest ? 30 : 60,
        completedSets: 0,
        notes: ex.formTips?.[0] || 'Focus on controlled tempo and breathing.',
      })),
    };
    onStartWorkout(workoutToStart);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.dayBadgeRow}>
              <span className={styles.dayPill}>{dayData.day.toUpperCase()}</span>
              {dayData.status === 'completed' && (
                <span className={styles.statusCompleted}>✓ Completed</span>
              )}
              {dayData.status === 'today' && (
                <span className={styles.statusToday}>● Today</span>
              )}
              {dayData.status === 'planned' && (
                <span className={styles.statusPlanned}>○ Upcoming</span>
              )}
              {dayData.status === 'rest' && (
                <span className={styles.statusRest}>🧘 Recovery Day</span>
              )}
            </div>
            <h2 className={styles.title}>{dayData.workout}</h2>
            <div className={styles.metaRow}>
              <span>
                <Clock size={13} /> {dayData.duration}
              </span>
              <span>
                <Layers size={13} /> {dayData.difficulty}
              </span>
              <span>
                <Dumbbell size={13} /> {dayData.equipment}
              </span>
            </div>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <div className={styles.targetCard}>
            <span className={styles.targetLabel}>Target Muscle Groups</span>
            <span className={styles.targetValue}>{dayData.targetMuscles}</span>
          </div>

          <div className={styles.exerciseSection}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionTitle}>
                {isRest ? 'Recovery Flow Exercises' : 'Planned Exercises'}
              </span>
              <span className={styles.exerciseCount}>
                {exerciseObjects.length} exercises
              </span>
            </div>

            <div className={styles.exerciseList}>
              {exerciseObjects.map((ex, idx) => (
                <div
                  key={idx}
                  className={styles.exerciseRow}
                  onClick={() => onOpenExerciseDetail && onOpenExerciseDetail(ex)}
                  title="Click to view instructions and video tutorial"
                >
                  <span className={styles.exIndex}>0{idx + 1}</span>
                  <div className={styles.exInfo}>
                    <span className={styles.exName}>{ex.name}</span>
                    <span className={styles.exSub}>
                      {ex.primaryMuscle} • {ex.equipment}
                    </span>
                  </div>
                  <ChevronRight size={16} className={styles.exChevron} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Close
          </button>
          <button type="button" className={styles.btnPrimary} onClick={handleStart}>
            <Play size={15} fill="currentColor" />
            {isRest ? 'Start Recovery Flow' : 'Start Workout'}
          </button>
        </div>
      </div>
    </div>
  );
}
