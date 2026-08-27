import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import UserMenu from './UserMenu';
import { formatLongDate } from '../../lib/dateUtils';
import styles from './Header.module.css';

export default function Header({ title, onMenuToggle }) {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    // Keep date/time updated every 10 seconds
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const dateString = formatLongDate(currentDate);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuButton} onClick={onMenuToggle}>
          <Menu size={22} />
        </button>
        <h1 className={styles.pageTitle}>{title}</h1>
      </div>
      <div className={styles.right}>
        <span className={styles.dateText}>{dateString}</span>
        <UserMenu />
      </div>
    </header>
  );
}
