import styles from './ProgressCard.module.css';

export default function ProgressCard({ score, maxScore, label, description }) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / maxScore) * 100;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.card}>
      <div className={styles.scoreWrapper}>
        <svg className={styles.scoreSvg} viewBox="0 0 120 120">
          <circle className={styles.trackCircle} cx="60" cy="60" r={radius} />
          <circle
            className={styles.progressCircle}
            cx="60"
            cy="60"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className={styles.scoreText}>
          <span className={styles.scoreValue}>{score}</span>
          <span className={styles.scoreMax}>/ {maxScore}</span>
        </div>
      </div>
      <h3 className={styles.label}>{label}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
