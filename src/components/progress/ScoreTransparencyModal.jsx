import {
  X,
  Sparkles,
  Info,
  Shield,
  Layers,
  Award,
} from 'lucide-react';
import { scoreWeightings } from '../../data/progressData';
import styles from './ScoreTransparencyModal.module.css';

export default function ScoreTransparencyModal({ onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.badgeRow}>
              <Sparkles size={13} />
              <span>Score Transparency Engine</span>
            </div>
            <h2 className={styles.title}>How Your Growth Score (84/100) is Calculated</h2>
            <p className={styles.subtitle}>
              Transparent weighting across all 7 ELEVATE personal growth modules
            </p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Weighting Table */}
          <div className={styles.tableCard}>
            <div className={styles.tableHead}>
              <span>Development Module</span>
              <span>Weight</span>
              <span>Category Score</span>
              <span>Contribution</span>
            </div>
            <div className={styles.tableBody}>
              {scoreWeightings.map((item, idx) => (
                <div key={idx} className={styles.tableRow}>
                  <strong className={styles.catName}>{item.category}</strong>
                  <span className={styles.catWeight}>{item.weight}</span>
                  <span className={styles.catScore}>{item.score}%</span>
                  <strong className={styles.catContrib}>{item.contribution}</strong>
                </div>
              ))}
            </div>
            <div className={styles.tableFooter}>
              <span>Total Calculated Score</span>
              <strong>84 / 100 (Strong Progress)</strong>
            </div>
          </div>

          {/* Non-clinical Disclaimer */}
          <div className={styles.disclaimerBox}>
            <Info size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p className={styles.disclaimerText}>
              The ELEVATE Overall Growth Score is a behavioral and progress index designed to track your consistency, practice volume, and skill mastery. It is an educational tool and personal benchmark, not a clinical, psychological, or certified medical diagnostic metric.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnPrimary} onClick={onClose}>
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
}
