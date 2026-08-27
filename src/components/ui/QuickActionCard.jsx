import * as Icons from 'lucide-react';
import styles from './QuickActionCard.module.css';

export default function QuickActionCard({ label, icon, color = 'primary', onClick }) {
  const Icon = Icons[icon];
  return (
    <button className={styles.card} onClick={onClick}>
      <div className={`${styles.iconWrapper} ${styles[color]}`}>
        {Icon && <Icon size={22} />}
      </div>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
