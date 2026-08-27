import {
  X,
  Sparkles,
  CheckCircle2,
  Lock,
  Play,
  Clock,
  Award,
} from 'lucide-react';
import styles from './PathDetailModal.module.css';

export default function PathDetailModal({ path, onStartLesson, onClose }) {
  if (!path) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <span className={styles.levelTag}>Structured Curriculum • {path.level}</span>
            <h2 className={styles.title}>{path.title}</h2>
            <p className={styles.subtitle}>{path.subtitle}</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Progress Bar & Stats */}
          <div className={styles.statsCard}>
            <div className={styles.statCol}>
              <span className={styles.statLabel}>Total Curriculum</span>
              <span className={styles.statVal}>{path.totalDuration} • {path.lessonsCount} Lessons</span>
            </div>
            <div className={styles.statCol}>
              <span className={styles.statLabel}>Path Progress</span>
              <span className={styles.statVal}>{path.progress}% Completed</span>
            </div>
          </div>

          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${path.progress}%` }}
            />
          </div>

          {/* Skills Covered */}
          <div className={styles.skillsRow}>
            <span className={styles.skillsHeading}>Skills You Will Build:</span>
            <div className={styles.pillRow}>
              {path.skills?.map((s, i) => (
                <span key={i} className={styles.skillPill}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Vertical Modules Syllabus */}
          <div className={styles.syllabusSection}>
            <h3 className={styles.syllabusTitle}>Curriculum Modules</h3>
            <div className={styles.moduleList}>
              {path.modules?.map((m) => (
                <div
                  key={m.id}
                  className={`${styles.moduleItem} ${
                    m.status === 'completed'
                      ? styles.modCompleted
                      : m.status === 'active'
                      ? styles.modActive
                      : styles.modLocked
                  }`}
                >
                  <div className={styles.modStatusIcon}>
                    {m.status === 'completed' && (
                      <CheckCircle2 size={16} color="var(--color-success)" />
                    )}
                    {m.status === 'active' && (
                      <Play size={15} color="var(--color-primary)" />
                    )}
                    {m.status === 'locked' && (
                      <Lock size={14} color="var(--color-gray-400)" />
                    )}
                  </div>
                  <div className={styles.modInfo}>
                    <span className={styles.modTitle}>{m.title}</span>
                    <span className={styles.modMeta}>{m.duration}</span>
                  </div>
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
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              onClose();
              if (onStartLesson) onStartLesson();
            }}
          >
            <Play size={14} />
            Continue Learning Path
          </button>
        </div>
      </div>
    </div>
  );
}
