import { useState } from 'react';
import {
  X,
  Download,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import styles from './DataExportModal.module.css';

export default function DataExportModal({ onClose }) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
      onClose();
    }, 1800);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>Export Your Personal Data</h3>
            <p className={styles.subtitle}>Download an archive of all your practice logs, telemetry, and achievements</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <div className={styles.exportList}>
            <div className={styles.exportItem}>
              <FileText size={18} color="var(--color-primary)" />
              <div className={styles.itemTextCol}>
                <strong className={styles.itemTitle}>Progress & Skill Scores</strong>
                <span className={styles.itemSub}>Historical metrics across all 7 growth areas (JSON / CSV)</span>
              </div>
              <CheckCircle2 size={16} color="var(--color-success)" />
            </div>

            <div className={styles.exportItem}>
              <FileText size={18} color="var(--color-primary)" />
              <div className={styles.itemTextCol}>
                <strong className={styles.itemTitle}>Daily Goals & Habit Streaks</strong>
                <span className={styles.itemSub}>Completion timestamps and priority logs</span>
              </div>
              <CheckCircle2 size={16} color="var(--color-success)" />
            </div>

            <div className={styles.exportItem}>
              <FileText size={18} color="var(--color-primary)" />
              <div className={styles.itemTextCol}>
                <strong className={styles.itemTitle}>Achievements & XP History</strong>
                <span className={styles.itemSub}>Unlocked badge milestones and daily XP source breakdown</span>
              </div>
              <CheckCircle2 size={16} color="var(--color-success)" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={styles.btnPrimary} onClick={handleDownload}>
            <Download size={14} />
            {downloaded ? 'Preparing Download...' : 'Download Data (.JSON)'}
          </button>
        </div>
      </div>
    </div>
  );
}
