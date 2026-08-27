import { useState } from 'react';
import {
  Award,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  X,
  Flame,
  Clock,
  Layers,
} from 'lucide-react';
import styles from './WorkoutSummaryModal.module.css';

export default function WorkoutSummaryModal({ summaryData, onClose }) {
  const [selectedRpe, setSelectedRpe] = useState('😐 Moderate');
  const [selectedEnergy, setSelectedEnergy] = useState('High');
  const [saved, setSaved] = useState(false);

  const rpeOptions = ['😌 Easy', '🙂 Comfortable', '😐 Moderate', '😤 Hard', '🔥 Very Hard'];
  const energyOptions = ['Low', 'Medium', 'High'];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.celebrationBadge}>
            <Sparkles size={15} />
            <span>Workout Complete</span>
          </div>
          <h2 className={styles.title}>Great Session! 🎉</h2>
          <p className={styles.subtitle}>Upper Body Strength & Posture Focus • 45 minutes</p>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Top Score Banner */}
          <div className={styles.scoreHero}>
            <div className={styles.scoreBox}>
              <span className={styles.scoreNum}>91</span>
              <span className={styles.scoreLabel}>/ 100 Session Score</span>
              <span className={styles.perfBadge}>↑ 8% Performance</span>
            </div>

            <div className={styles.metricsGrid}>
              <div className={styles.metricItem}>
                <Clock size={16} className={styles.metricIcon} />
                <span className={styles.metricVal}>45 min</span>
                <span className={styles.metricLabel}>Duration</span>
              </div>
              <div className={styles.metricItem}>
                <Layers size={16} className={styles.metricIcon} />
                <span className={styles.metricVal}>7,420 kg</span>
                <span className={styles.metricLabel}>Total Volume</span>
              </div>
              <div className={styles.metricItem}>
                <Award size={16} className={styles.metricIcon} />
                <span className={styles.metricVal}>23</span>
                <span className={styles.metricLabel}>Sets Logged</span>
              </div>
              <div className={styles.metricItem}>
                <Flame size={16} className={styles.metricIcon} />
                <span className={styles.metricVal}>8</span>
                <span className={styles.metricLabel}>Exercises</span>
              </div>
            </div>
          </div>

          {/* Personal Record Highlight */}
          <div className={styles.prCard}>
            <div className={styles.prIconBox}>
              <Award size={20} className={styles.prIcon} />
            </div>
            <div className={styles.prInfo}>
              <span className={styles.prBadge}>🏆 New Personal Record</span>
              <h4 className={styles.prTitle}>Barbell Bench Press: 60 kg × 8 reps</h4>
              <span className={styles.prCompare}>Previous benchmark: 55 kg × 8 (+5 kg progressive overload)</span>
            </div>
          </div>

          {/* AI Coach Feedback */}
          <div className={styles.coachCard}>
            <div className={styles.coachHead}>
              <Sparkles size={15} color="var(--color-primary)" />
              <span className={styles.coachTitle}>AI Coach Takeaways</span>
            </div>
            <p className={styles.coachText}>
              "Strong session! You achieved progressive overload on chest and lats without sacrificing rest interval consistency. Keep this exact load next session if your recovery logs remain high."
            </p>
          </div>

          {/* RPE / Effort Question */}
          <div className={styles.rpeSection}>
            <label className={styles.questionLabel}>How did this workout feel?</label>
            <div className={styles.rpeBtnRow}>
              {rpeOptions.map((rpe) => (
                <button
                  key={rpe}
                  type="button"
                  className={`${styles.rpeBtn} ${selectedRpe === rpe ? styles.rpeBtnActive : ''}`}
                  onClick={() => setSelectedRpe(rpe)}
                >
                  {rpe}
                </button>
              ))}
            </div>
          </div>

          {/* Energy Rating */}
          <div className={styles.rpeSection}>
            <label className={styles.questionLabel}>Your Energy Level Today:</label>
            <div className={styles.energyBtnRow}>
              {energyOptions.map((energy) => (
                <button
                  key={energy}
                  type="button"
                  className={`${styles.energyBtn} ${selectedEnergy === energy ? styles.energyBtnActive : ''}`}
                  onClick={() => setSelectedEnergy(energy)}
                >
                  {energy}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              setSaved(true);
              setTimeout(() => {
                onClose();
              }, 400);
            }}
          >
            <CheckCircle2 size={16} />
            {saved ? 'Workout Saved!' : 'Save Workout & Update Progress (+50 XP)'}
          </button>
        </div>
      </div>
    </div>
  );
}
