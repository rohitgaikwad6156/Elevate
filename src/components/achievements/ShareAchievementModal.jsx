import { useState } from 'react';
import {
  X,
  Sparkles,
  Share2,
  Copy,
  Check,
  Award,
} from 'lucide-react';
import styles from './ShareAchievementModal.module.css';

export default function ShareAchievementModal({ achievement, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!achievement) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>Share Achievement</h3>
            <p className={styles.subtitle}>Celebrate your progress with friends or on LinkedIn</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Card Preview */}
          <div className={styles.shareCard}>
            <div className={styles.shareBadgeCircle}>
              <Award size={40} color="var(--color-primary)" />
            </div>
            <span className={styles.unlockedTag}>🏆 Achievement Unlocked</span>
            <h2 className={styles.achTitle}>{achievement.title}</h2>
            <p className={styles.achDesc}>{achievement.desc}</p>

            <div className={styles.shareFooter}>
              <div className={styles.brandCol}>
                <span className={styles.brandTitle}>ELEVATE</span>
                <span className={styles.brandSub}>Level 12 • Explorer</span>
              </div>
              <span className={styles.rewardTag}>
                {typeof achievement.xp === 'number' ? `+${achievement.xp} XP` : achievement.xp || '+100 XP'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnSecondary} onClick={handleCopy}>
            {copied ? <Check size={14} color="var(--color-success)" /> : <Copy size={14} />}
            {copied ? 'Copied Link!' : 'Copy Share Link'}
          </button>
          <button type="button" className={styles.btnPrimary} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
