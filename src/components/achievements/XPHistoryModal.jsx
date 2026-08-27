import {
  X,
  Sparkles,
  Award,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { todayXpSources } from '../../data/achievementsData';
import styles from './XPHistoryModal.module.css';

export default function XPHistoryModal({ onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.badgeRow}>
              <Sparkles size={13} />
              <span>XP Activity Log</span>
            </div>
            <h2 className={styles.title}>XP History & Daily Breakdown</h2>
            <p className={styles.subtitle}>
              Total XP: <strong>2,350 XP</strong> (+85 earned today)
            </p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <div className={styles.sourcesList}>
            <span className={styles.sectionHeading}>Today's Completed Activities</span>
            {todayXpSources.map((item, idx) => (
              <div key={idx} className={styles.sourceItem}>
                <div className={styles.itemLeft}>
                  <CheckCircle2 size={16} color="var(--color-success)" />
                  <div className={styles.itemTextCol}>
                    <strong className={styles.itemTitle}>{item.activity}</strong>
                    <span className={styles.itemTime}>{item.time}</span>
                  </div>
                </div>
                <span className={styles.itemXp}>{item.xp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnPrimary} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
