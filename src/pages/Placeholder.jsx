import * as Icons from 'lucide-react';
import styles from './Placeholder.module.css';

export default function Placeholder({ title, icon }) {
  const Icon = Icons[icon] || Icons.Construction;

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Icon size={32} />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>
        This module is coming soon. It will be available in a future update.
      </p>
    </div>
  );
}
