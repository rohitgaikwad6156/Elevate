import styles from './StatCard.module.css';

export default function StatCard({ icon: Icon, label, value, color = 'primary' }) {
  return (
    <div className={styles.card}>
      <div className={`${styles.iconWrapper} ${styles[color]}`}>
        <Icon size={22} />
      </div>
      <div className={styles.info}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
      </div>
    </div>
  );
}
