import { Lightbulb } from 'lucide-react';
import styles from './RecommendationCard.module.css';

export default function RecommendationCard({ title, content, tag }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <Lightbulb size={20} className={styles.icon} />
          <h3 className={styles.title}>{title}</h3>
        </div>
        {tag && <span className={styles.tag}>{tag}</span>}
      </div>
      <p className={styles.content}>{content}</p>
    </div>
  );
}
