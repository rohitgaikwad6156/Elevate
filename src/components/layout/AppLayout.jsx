import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './AppLayout.module.css';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/daily-goals': 'Daily Goals',
  '/english-coach': 'English Coach',
  '/public-speaking': 'Public Speaking',
  '/body-language': 'Body Language',
  '/fitness': 'Fitness',
  '/interview-prep': 'Interview Prep',
  '/learning-hub': 'Learning Hub',
  '/progress': 'Progress',
  '/achievements': 'Achievements',
  '/profile': 'Profile',
};

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'ELEVATE';

  return (
    <div className={styles.layout}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className={styles.main}>
        <Header
          title={title}
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
