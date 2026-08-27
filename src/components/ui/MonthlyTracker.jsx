import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Flame, CheckCircle2, Award } from 'lucide-react';
import { getLocalIsoDate } from '../../lib/dateUtils';
import styles from './MonthlyTracker.module.css';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MonthlyTracker({
  activityHistory = {},
  todayStats = { total: 0, completed: 0, percentage: 0 },
  selectedDate = null,
  onSelectDate = () => {},
}) {
  const realToday = useMemo(() => new Date(), []);
  const todayIso = useMemo(() => getLocalIsoDate(realToday), [realToday]);


  // Derive initial year and month from selectedDate or today
  const [currentYear, setCurrentYear] = useState(() => {
    if (selectedDate) {
      const parts = selectedDate.split('-');
      if (parts.length === 3) return parseInt(parts[0], 10);
    }
    return realToday.getFullYear();
  });

  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate) {
      const parts = selectedDate.split('-');
      if (parts.length === 3) return parseInt(parts[1], 10) - 1;
    }
    return realToday.getMonth();
  });

  // Sync calendar month view if selectedDate changes externally
  useEffect(() => {
    if (selectedDate) {
      const parts = selectedDate.split('-');
      if (parts.length === 3) {
        setCurrentYear(parseInt(parts[0], 10));
        setCurrentMonth(parseInt(parts[1], 10) - 1);
      }
    }
  }, [selectedDate]);

  const isCurrentMonthView = currentYear === realToday.getFullYear() && currentMonth === realToday.getMonth();
  const todayDateNum = realToday.getDate();

  // Navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleJumpToToday = () => {
    setCurrentYear(realToday.getFullYear());
    setCurrentMonth(realToday.getMonth());
    onSelectDate(todayIso);
  };

  // Compute calendar grid data for current view
  const { cells, monthStats } = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

    const resultCells = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      resultCells.push({ type: 'empty', key: `empty-${i}` });
    }

    let totalActiveDays = 0;
    let totalMonthGoals = 0;
    let totalMonthCompleted = 0;

    for (let d = 1; d <= daysInMonth; d++) {
      const monthStr = String(currentMonth + 1).padStart(2, '0');
      const dayStr = String(d).padStart(2, '0');
      const dateKey = `${currentYear}-${monthStr}-${dayStr}`;

      const historyEntry = activityHistory[dateKey];
      let pct = 0;
      let totalGoals = 0;
      let completedGoals = 0;

      if (historyEntry) {
        pct = historyEntry.percentage || 0;
        totalGoals = historyEntry.total || 0;
        completedGoals = historyEntry.completed || 0;
      }

      if (isCurrentMonthView && d === todayDateNum) {
        pct = todayStats.percentage !== undefined ? todayStats.percentage : pct;
        totalGoals = todayStats.total !== undefined ? todayStats.total : totalGoals;
        completedGoals = todayStats.completed !== undefined ? todayStats.completed : completedGoals;
      }

      if (completedGoals > 0 || pct > 0) {
        totalActiveDays += 1;
      }
      totalMonthGoals += totalGoals;
      totalMonthCompleted += completedGoals;

      let type = 'past';
      const isTodayCell = isCurrentMonthView && d === todayDateNum;
      const isFutureCell = isCurrentMonthView ? d > todayDateNum : (currentYear > realToday.getFullYear() || (currentYear === realToday.getFullYear() && currentMonth > realToday.getMonth()));

      if (isTodayCell) {
        if (pct === 100) type = 'todayFull';
        else if (pct >= 66) type = 'todayHigh';
        else if (pct >= 33) type = 'todayMedium';
        else if (pct > 0) type = 'todayLight';
        else type = 'today';
      } else if (isFutureCell) {
        type = 'future';
      } else if (pct === 100) {
        type = 'full';
      } else if (pct >= 66) {
        type = 'high';
      } else if (pct >= 33) {
        type = 'medium';
      } else if (pct > 0) {
        type = 'light';
      }

      const isSelected = selectedDate === dateKey;

      resultCells.push({
        type,
        day: d,
        dateKey,
        pct,
        totalGoals,
        completedGoals,
        isToday: isTodayCell,
        isSelected,
        key: `day-${d}`,
      });
    }

    return {
      cells: resultCells,
      monthStats: {
        totalActiveDays,
        totalMonthGoals,
        totalMonthCompleted,
        daysInMonth,
      }
    };
  }, [currentYear, currentMonth, activityHistory, todayStats, isCurrentMonthView, todayDateNum, realToday, selectedDate]);

  const getCellClass = (cell) => {
    let base = styles.day;
    switch (cell.type) {
      case 'empty': return `${styles.day} ${styles.dayEmpty}`;
      case 'todayFull':
      case 'full': base = `${styles.day} ${styles.dayFull}`; break;
      case 'todayHigh':
      case 'high': base = `${styles.day} ${styles.dayHigh}`; break;
      case 'todayMedium':
      case 'medium': base = `${styles.day} ${styles.dayMedium}`; break;
      case 'todayLight':
      case 'light': base = `${styles.day} ${styles.dayLight}`; break;
      case 'today': base = `${styles.day} ${styles.dayToday}`; break;
      case 'future': base = `${styles.day} ${styles.dayFuture}`; break;
      default: base = `${styles.day} ${styles.dayPast}`; break;
    }
    if (cell.isToday && cell.type !== 'today') {
      base += ` ${styles.todayIndicator}`;
    }
    if (cell.isSelected) {
      base += ` ${styles.daySelected}`;
    }
    return base;
  };


  const currentMonthName = MONTH_NAMES[currentMonth];

  return (
    <div className={styles.trackerContent}>

      {/* ── Month Navigation Header ── */}
      <div className={styles.navHeader}>
        <div className={styles.navControls}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={handlePrevMonth}
            title="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <span className={styles.monthTitle}>
            {currentMonthName} {currentYear}
          </span>
          <button
            type="button"
            className={styles.navBtn}
            onClick={handleNextMonth}
            title="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <button
          type="button"
          className={`${styles.todayJumpBtn} ${selectedDate === todayIso ? styles.activeTodayBtn : ''}`}
          onClick={handleJumpToToday}
        >
          {selectedDate === todayIso ? '● Today' : 'Jump to Today'}
        </button>
      </div>

      {/* ── LeetCode Stats Ribbon ── */}
      <div className={styles.statsRibbon}>
        <div className={styles.ribbonItem}>
          <Flame size={14} color="#f59e0b" />
          <span className={styles.ribbonLabel}>Active Days:</span>
          <span className={styles.ribbonValue}>{monthStats.totalActiveDays} days</span>
        </div>
        <div className={styles.ribbonItem}>
          <CheckCircle2 size={14} color="#10b981" />
          <span className={styles.ribbonLabel}>Goals Done:</span>
          <span className={styles.ribbonValue}>{monthStats.totalMonthCompleted}</span>
        </div>
        <div className={styles.ribbonItem}>
          <Award size={14} color="#6366f1" />
          <span className={styles.ribbonLabel}>Month Rate:</span>
          <span className={styles.ribbonValue}>
            {monthStats.totalMonthGoals > 0 ? Math.round((monthStats.totalMonthCompleted / monthStats.totalMonthGoals) * 100) : 0}%
          </span>
        </div>
      </div>

      {/* ── Weekday Labels ── */}
      <div className={styles.weekdays}>
        {WEEKDAY_LABELS.map((w) => (
          <span key={w} className={styles.weekday}>{w}</span>
        ))}
      </div>

      {/* ── Calendar Grid ── */}
      <div className={styles.grid}>
        {cells.map((cell) => (
          <div
            key={cell.key}
            className={getCellClass(cell)}
            onClick={() => cell.day && onSelectDate(cell.dateKey)}
            title={cell.day ? `Click to view ${currentMonthName} ${cell.day}, ${currentYear} (${cell.completedGoals}/${cell.totalGoals} goals, ${cell.pct}%)` : ''}
          >
            {cell.day || ''}
          </div>
        ))}
      </div>

      {/* ── Legend ── */}
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendFull}`} />
          100%
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendMedium}`} />
          50-99%
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendLight}`} />
          1-49%
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendToday}`} />
          Today
        </span>
        <span className={styles.legendItem} style={{ marginLeft: 'auto', fontWeight: 600, color: 'var(--color-primary)' }}>
          👆 Click any date to switch day
        </span>
      </div>

    </div>
  );
}
