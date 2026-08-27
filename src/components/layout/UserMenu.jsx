// src/components/layout/UserMenu.jsx
// Shows the logged-in user's avatar + name with a sign-out dropdown.

import { useState, useRef, useEffect } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;

  const initials = user.displayName
    ? user.displayName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : user.email?.[0]?.toUpperCase() ?? 'U';

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        id="user-menu-btn"
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        type="button"
        aria-label="User menu"
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.displayName} className={styles.avatar} referrerPolicy="no-referrer" />
        ) : (
          <div className={styles.avatarFallback}>{initials}</div>
        )}
        <span className={styles.name}>{user.displayName?.split(' ')[0] ?? 'You'}</span>
        <ChevronDown size={14} className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            {user.photoURL ? (
              <img src={user.photoURL} alt="" className={styles.dropdownAvatar} referrerPolicy="no-referrer" />
            ) : (
              <div className={styles.avatarFallbackLg}>{initials}</div>
            )}
            <div className={styles.dropdownInfo}>
              <span className={styles.dropdownName}>{user.displayName}</span>
              <span className={styles.dropdownEmail}>{user.email}</span>
            </div>
          </div>
          <div className={styles.dropdownDivider} />
          <button
            id="sign-out-btn"
            className={styles.signOutBtn}
            onClick={handleSignOut}
            type="button"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
