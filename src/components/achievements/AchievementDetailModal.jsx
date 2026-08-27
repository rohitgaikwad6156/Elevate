import {
  X,
  Sparkles,
  Award,
  Share2,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import styles from './AchievementDetailModal.module.css';

export default function AchievementDetailModal({ achievement, onClose, onShare }) {
  if (!achievement) return null;

  const getRarityBadgeStyle = (rarity) => {
    switch (rarity) {
      case 'Legendary': return { background: '#fef08a', color: '#854d0e', border: '1px solid #facc15' };
      case 'Epic': return { background: '#f3e8ff', color: '#6b21a8', border: '1px solid #d8b4fe' };
      case 'Rare': return { background: '#dbeafe', color: '#1e40af', border: '1px solid #93c5fd' };
      case 'Uncommon': return { background: '#dcfce7', color: '#166534', border: '1px solid #86efac' };
      default: return { background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1' };
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <span
              className={styles.rarityBadge}
              style={getRarityBadgeStyle(achievement.rarity || 'Rare')}
            >
              {achievement.rarity || 'Rare'} Achievement
            </span>
            <h2 className={styles.title}>{achievement.title}</h2>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Badge Visual Hero */}
          <div className={styles.badgeHero}>
            <div className={styles.hexagonWrapper}>
              <Award size={48} color="var(--color-primary)" />
            </div>
            <h3 className={styles.heroTitle}>{achievement.title}</h3>
            <p className={styles.heroDesc}>{achievement.desc}</p>
          </div>

          {/* Reward & Progress Grid */}
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>XP Reward</span>
              <strong className={styles.metaValPrimary}>
                {typeof achievement.xp === 'number' ? `+${achievement.xp} XP` : achievement.xp || '+100 XP'}
              </strong>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Category</span>
              <strong className={styles.metaVal}>{achievement.category || 'General'}</strong>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Progress Status</span>
              <strong className={styles.metaVal}>
                {achievement.unlocked !== false ? 'Completed ✓' : achievement.progress || 'In Progress'}
              </strong>
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
              if (onShare) onShare(achievement);
            }}
          >
            <Share2 size={14} />
            Share Achievement
          </button>
        </div>
      </div>
    </div>
  );
}
