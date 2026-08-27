import { X, Award, Shield, CheckCircle2 } from 'lucide-react';
import { overallScoreData } from '../../data/bodyLanguageData';
import styles from './ScoringExplanationModal.module.css';

export default function ScoringExplanationModal({ onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Body Language Score Methodology</h2>
            <p className={styles.subtitle}>Transparent breakdown of how your 78/100 presence score is calculated</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.scoreSummaryCard}>
            <div className={styles.scoreGauge}>{overallScoreData.currentScore}</div>
            <div>
              <span className={styles.scoreLabel}>/ 100 Nonverbal Composite Index</span>
              <p className={styles.scoreNote}>
                Target: {overallScoreData.targetScore} (Executive Presence Benchmark)
              </p>
            </div>
          </div>

          <h3 className={styles.sectionHeading}>Weighted Skill Distribution</h3>
          <div className={styles.breakdownGrid}>
            {overallScoreData.scoreBreakdown.map((item) => (
              <div key={item.skill} className={styles.skillItem}>
                <div className={styles.skillTop}>
                  <span className={styles.skillName}>{item.skill}</span>
                  <span className={styles.skillWeight}>Weight: {item.weight}</span>
                </div>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: `${item.score}%` }} />
                </div>
                <div className={styles.skillBottom}>
                  <span className={styles.skillScoreVal}>{item.score}/100</span>
                  <span className={styles.skillStatus}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.ethicsDisclaimer}>
            <Shield size={18} className={styles.shieldIcon} />
            <div>
              <strong>Ethical AI Coaching Principle: </strong>
              {overallScoreData.explanation}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.btnPrimary} onClick={onClose}>
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
