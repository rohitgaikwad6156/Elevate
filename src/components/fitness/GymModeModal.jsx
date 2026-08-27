import { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  RotateCcw,
  Sparkles,
  Flame,
  Award,
  Volume2,
  Clock,
} from 'lucide-react';
import styles from './GymModeModal.module.css';

export default function GymModeModal({ workout, onFinish, onClose }) {
  const exercises = workout?.exercises || [];
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [completedSetsCount, setCompletedSetsCount] = useState(0);
  const [activeSetNum, setActiveSetNum] = useState(1);
  const [currentWeight, setCurrentWeight] = useState(exercises[0]?.weight || 60);
  const [currentReps, setCurrentReps] = useState(exercises[0]?.reps || 8);
  const [isResting, setIsResting] = useState(false);
  const [restRemaining, setRestRemaining] = useState(0);
  const [totalWorkoutSeconds, setTotalWorkoutSeconds] = useState(0);

  const currentExercise = exercises[currentExIndex];

  // Workout duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalWorkoutSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rest countdown timer
  useEffect(() => {
    if (!isResting || restRemaining <= 0) {
      if (isResting && restRemaining <= 0) {
        setIsResting(false);
      }
      return;
    }

    const restTimer = setInterval(() => {
      setRestRemaining((prev) => {
        if (prev <= 1) {
          setIsResting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(restTimer);
  }, [isResting, restRemaining]);

  // Sync weight & reps when exercise changes
  useEffect(() => {
    if (currentExercise) {
      setCurrentWeight(currentExercise.weight || 0);
      setCurrentReps(currentExercise.reps || 10);
      setActiveSetNum(1);
    }
  }, [currentExIndex, currentExercise]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCompleteSet = () => {
    setCompletedSetsCount((prev) => prev + 1);

    if (activeSetNum < currentExercise.sets) {
      setActiveSetNum((prev) => prev + 1);
      // Trigger rest timer
      setRestRemaining(currentExercise.restSeconds || 60);
      setIsResting(true);
    } else {
      // Last set of current exercise completed
      if (currentExIndex < exercises.length - 1) {
        setCurrentExIndex((prev) => prev + 1);
        setRestRemaining(90);
        setIsResting(true);
      } else {
        // Workout fully complete!
        handleFinishWorkout();
      }
    }
  };

  const handleNextExercise = () => {
    if (currentExIndex < exercises.length - 1) {
      setCurrentExIndex((prev) => prev + 1);
      setIsResting(false);
    }
  };

  const handlePrevExercise = () => {
    if (currentExIndex > 0) {
      setCurrentExIndex((prev) => prev - 1);
      setIsResting(false);
    }
  };

  const handleFinishWorkout = () => {
    onFinish({
      durationFormatted: formatTime(totalWorkoutSeconds),
      totalSets: completedSetsCount + 1,
      totalExercises: exercises.length,
      volumeEstimated: '7,420 kg',
    });
  };

  if (!currentExercise) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Top Header HUD */}
        <div className={styles.header}>
          <div className={styles.workoutMeta}>
            <span className={styles.gymModeBadge}>🏋️ GYM MODE</span>
            <span className={styles.workoutTitle}>{workout.title}</span>
          </div>

          <div className={styles.topRightControls}>
            <div className={styles.timerChip}>
              <Clock size={14} />
              <span>{formatTime(totalWorkoutSeconds)}</span>
            </div>
            <button type="button" className={styles.closeBtn} onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Workout Progress Bar */}
        <div className={styles.progressBarWrapper}>
          <div
            className={styles.progressBarFill}
            style={{
              width: `${((currentExIndex + (activeSetNum - 1) / currentExercise.sets) / exercises.length) * 100}%`,
            }}
          />
        </div>

        {/* Main Exercise Stage */}
        <div className={styles.stage}>
          <div className={styles.exerciseHeader}>
            <span className={styles.exerciseOrder}>
              EXERCISE {currentExIndex + 1} OF {exercises.length}
            </span>
            <h1 className={styles.exerciseName}>{currentExercise.name}</h1>
            <span className={styles.targetMuscles}>{currentExercise.target}</span>
          </div>

          {/* Rest Overlay or Active Set Card */}
          {isResting ? (
            <div className={styles.restCard}>
              <span className={styles.restTag}>REST INTERVAL</span>
              <div className={styles.restDigits}>{formatTime(restRemaining)}</div>
              <div className={styles.restNextLabel}>
                Next: {currentExercise.name} — Set {activeSetNum} of {currentExercise.sets}
              </div>
              <div className={styles.restControlsRow}>
                <button
                  type="button"
                  className={styles.restBtnSecondary}
                  onClick={() => setRestRemaining((prev) => prev + 15)}
                >
                  +15s
                </button>
                <button
                  type="button"
                  className={styles.restBtnPrimary}
                  onClick={() => setIsResting(false)}
                >
                  Skip Rest & Start Set
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.activeSetCard}>
              {/* Set Counter */}
              <div className={styles.setCounterPill}>
                SET {activeSetNum} OF {currentExercise.sets}
              </div>

              {/* Weight & Reps Big Controls */}
              <div className={styles.inputsGrid}>
                {/* Weight Input */}
                <div className={styles.inputBox}>
                  <span className={styles.inputLabel}>Weight (kg)</span>
                  <div className={styles.valControlRow}>
                    <button
                      type="button"
                      className={styles.adjustBtn}
                      onClick={() => setCurrentWeight((prev) => Math.max(0, prev - 2.5))}
                    >
                      <Minus size={18} />
                    </button>
                    <span className={styles.bigVal}>{currentWeight}</span>
                    <button
                      type="button"
                      className={styles.adjustBtn}
                      onClick={() => setCurrentWeight((prev) => prev + 2.5)}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                {/* Reps Input */}
                <div className={styles.inputBox}>
                  <span className={styles.inputLabel}>Reps</span>
                  <div className={styles.valControlRow}>
                    <button
                      type="button"
                      className={styles.adjustBtn}
                      onClick={() => setCurrentReps((prev) => Math.max(1, prev - 1))}
                    >
                      <Minus size={18} />
                    </button>
                    <span className={styles.bigVal}>{currentReps}</span>
                    <button
                      type="button"
                      className={styles.adjustBtn}
                      onClick={() => setCurrentReps((prev) => prev + 1)}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Cue Note */}
              <div className={styles.formCueBox}>
                <Sparkles size={14} className={styles.sparkleIcon} />
                <span>{currentExercise.notes}</span>
              </div>

              {/* Complete Set Action */}
              <button
                type="button"
                className={styles.completeSetBtn}
                onClick={handleCompleteSet}
              >
                <CheckCircle2 size={24} />
                <span>COMPLETE SET {activeSetNum}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={handlePrevExercise}
            disabled={currentExIndex === 0}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <button
            type="button"
            className={styles.finishEarlyBtn}
            onClick={handleFinishWorkout}
          >
            Finish Workout Early
          </button>

          <button
            type="button"
            className={styles.navBtn}
            onClick={handleNextExercise}
            disabled={currentExIndex === exercises.length - 1}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
