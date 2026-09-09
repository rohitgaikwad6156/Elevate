import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  Sparkles,
  MessageSquare,
  Mic,
  PersonStanding,
  Dumbbell,
  Briefcase,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
  TrendingUp,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  // Core ELEVATE experience
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/daily-goals', label: 'Daily Goals & Tasks', icon: Target },
  { path: '/generate-my-day', label: 'AI Generate My Day', icon: Sparkles },
  { path: '/english-coach', label: 'English Coach', icon: MessageSquare },

  // Existing growth modules — preserved and available
  { divider: true },
  { path: '/public-speaking', label: 'Public Speaking', icon: Mic },
  { path: '/body-language', label: 'Body Language', icon: PersonStanding },
  { path: '/fitness', label: 'Fitness', icon: Dumbbell },
  { path: '/interview-prep', label: 'Interview Prep', icon: Briefcase },
  { divider: true },
  { path: '/learning-hub', label: 'Learning Hub', icon: BookOpen },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
  { path: '/achievements', label: 'Achievements', icon: Trophy },
  { divider: true },
  { path: '/profile', label: 'Profile', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <TrendingUp size={20} />
          </div>
          <span className={styles.logoText}>ELEVATE</span>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item, index) => {
            if (item.divider) {
              return <div key={`divider-${index}`} className={styles.navDivider} />;
            }
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={onClose}
              >
                <Icon className={styles.navIcon} size={20} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
