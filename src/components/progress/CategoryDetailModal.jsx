import {
  X,
  Sparkles,
  TrendingUp,
  Play,
  Award,
} from 'lucide-react';
import styles from './CategoryDetailModal.module.css';

export default function CategoryDetailModal({ categoryData, onClose, onPractice }) {
  if (!categoryData) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>Category Deep Dive</span>
            <h2 className={styles.title}>{categoryData.title}</h2>
            <p className={styles.subtitle}>
              Current Score: <strong>{categoryData.score}%</strong> ({categoryData.trend})
            </p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Highlight Box */}
          <div className={styles.highlightBox}>
            <Sparkles size={16} color="var(--color-primary)" />
            <p className={styles.highlightText}>
              <strong>AI Growth Insight: </strong>
              {categoryData.highlight}
            </p>
          </div>

          {/* Sub-Pillars Grid */}
          <div className={styles.pillarList}>
            <h3 className={styles.pillarListTitle}>Core Skill Sub-Pillars</h3>
            {categoryData.pillars?.map((p, idx) => (
              <div key={idx} className={styles.pillarItem}>
                <div className={styles.pillarMeta}>
                  <strong className={styles.pillarName}>{p.name}</strong>
                  <span className={styles.pillarScores}>
                    {p.score}% <span className={styles.targetLabel}>/ Target {p.target}%</span>
                  </span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${p.score}%` }}
                  />
                </div>
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
              if (onPractice) onPractice(categoryData.title);
            }}
          >
            <Play size={14} />
            Practice This Category
          </button>
        </div>
      </div>
    </div>
  );
}
