import { Check } from 'lucide-react';
import styles from './PriorityCard.module.css';

export default function PriorityCard({ priority, task, completed }) {
  return (
    <div className={styles.card}>
      <div className={`${styles.number} ${completed ? styles.completed : ''}`}>
        {completed ? <Check size={14} /> : priority}
      </div>
      <span className={`${styles.task} ${completed ? styles.completedText : ''}`}>
        {task}
      </span>
      <div className={`${styles.status} ${completed ? styles.done : ''}`}>
        {completed && <Check size={12} />}
      </div>
    </div>
  );
}
