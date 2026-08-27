import { useState } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  CheckCircle2,
  Play,
  RotateCcw,
} from 'lucide-react';
import styles from './GrowthPlanModal.module.css';

export default function GrowthPlanModal({ onClose, onAccept }) {
  const [schedule] = useState([
    { day: 'Monday', category: 'English & Vocabulary', duration: '15 min', activity: 'Executive Vocabulary Drill & Phrasing' },
    { day: 'Tuesday', category: 'Fitness & Physical Recovery', duration: '40 min', activity: 'Upper Body Strength + Thoracic Mobility' },
    { day: 'Wednesday', category: 'Public Speaking', duration: '20 min', activity: 'Impromptu Speaking & 60-Second Drill' },
    { day: 'Thursday', category: 'Learning Hub', duration: '15 min', activity: 'The PREP Framework for Spontaneous Answers' },
    { day: 'Friday', category: 'Interview Preparation', duration: '25 min', activity: 'Technical Mock Interview & Architecture Trade-offs' },
    { day: 'Saturday', category: 'Body Language', duration: '15 min', activity: 'Camera Practice & Gesture Variety Calibration' },
    { day: 'Sunday', category: 'Weekly Review', duration: '10 min', activity: 'Weekly Growth Summary & Next Goal Setting' },
  ]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.badgeRow}>
              <Sparkles size={13} />
              <span>AI Growth Strategy Engine</span>
            </div>
            <h2 className={styles.title}>Your 7-Day Personalized Growth Plan</h2>
            <p className={styles.subtitle}>
              Tailored to bridge your 6-point gap toward a 90 Growth Score
            </p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <div className={styles.planList}>
            {schedule.map((item, idx) => (
              <div key={idx} className={styles.planItem}>
                <div className={styles.dayCol}>
                  <span className={styles.dayName}>{item.day}</span>
                  <span className={styles.dayDur}>{item.duration}</span>
                </div>
                <div className={styles.activityCol}>
                  <span className={styles.catBadge}>{item.category}</span>
                  <strong className={styles.actTitle}>{item.activity}</strong>
                </div>
                <CheckCircle2 size={16} color="var(--color-gray-300)" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              onClose();
              if (onAccept) onAccept();
            }}
          >
            <CheckCircle2 size={15} />
            Accept & Add to Weekly Goals
          </button>
        </div>
      </div>
    </div>
  );
}
