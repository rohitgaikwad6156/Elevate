import { Check } from 'lucide-react';
import styles from './GoalCard.module.css';

export default function GoalCard({ title, category, completed }) {
  return (
    <div className={styles.card}>
      <div className={`${styles.checkbox} ${completed ? styles.completed : ''}`}>
        {completed && <Check size={14} />}
      </div>
      <div className={styles.content}>
        <p className={`${styles.title} ${completed ? styles.completedText : ''}`}>
          {title}
        </p>
        {category && <p className={styles.category}>{category}</p>}
      </div>
    </div>
  );
}
