import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Plus,
  Target,
  CheckCircle2,
  Flame,
  TrendingUp,
  Sparkles,
  Check,
  Calendar,
  BarChart3,
  Trash2,
  Star,
  PlusCircle,
  Clock,
  Layers,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Repeat,
} from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import AddGoalModal from '../components/ui/AddGoalModal';
import MonthlyTracker from '../components/ui/MonthlyTracker';
import { useProfile } from '../hooks/useProfile';
import { getLocalIsoDate, formatLongDate, parseLocalIsoDate } from '../lib/dateUtils';
import {
  computeStats,
  computeCategoryStats,
  getWeeklyChartDataForDate,
  getStreakDaysForWeek,
  computeActivityHistoryFromGoals,
} from '../data/goalsData';
import styles from './DailyGoals.module.css';


// ─── SVG Donut Chart ────────────────────────────────────────────────
function DonutChart({ percentage = 0 }) {
  const r = 50;
  const cx = 65;
  const cy = 65;
  const circ = 2 * Math.PI * r; // ~314.159
  const offset = circ - (Math.min(100, Math.max(0, percentage)) / 100) * circ;

  return (
    <div className={styles.donutWrapper}>
      <svg viewBox="0 0 130 130" className={styles.donutSvg}>
        <circle cx={cx} cy={cy} r={r} className={styles.donutTrack} />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          className={styles.donutArc}
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={styles.donutCenter}>
        <span className={styles.donutPct}>{percentage}%</span>
      </div>
    </div>
  );
}

// ─── Weekly Bar Chart (CSS bars) ────────────────────────────────────
function WeeklyBarChart({ data, onSelectDate }) {
  return (
    <div className={styles.weeklyChart}>
      <div className={styles.barsContainer}>
        {data.map(({ day, pct, isToday, isSelected, dateStr }) => (
          <div
            key={day}
            className={styles.barCol}
            onClick={() => onSelectDate && onSelectDate(dateStr)}
            style={{ cursor: 'pointer' }}
            title={`View ${day} (${dateStr}): ${pct}% completed`}
          >
            <div className={styles.barTrack} style={isSelected ? { outline: '2px solid #f59e0b', outlineOffset: '1px' } : {}}>
              <div
                className={`${styles.barFill} ${isToday ? styles.todayBar : ''}`}
                style={{ height: `${pct}%` }}
              />
            </div>
            <span className={`${styles.barLabel} ${isToday ? styles.todayLabel : ''} ${isSelected ? styles.selectedLabel : ''}`}>
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Weekly Trend Line Graph (Curved Area Graph) ───────────────────────
function WeeklyLineGraph({ data, onSelectDate }) {
  const width = 360;
  const height = 150;
  const padLeft = 30;
  const padRight = 30;
  const padTop = 25;
  const padBottom = 30;

  const innerWidth = width - padLeft - padRight;
  const innerHeight = height - padTop - padBottom;

  const points = data.map((d, i) => {
    const x = padLeft + (i / (data.length - 1)) * innerWidth;
    const y = padTop + (1 - (d.pct || 0) / 100) * innerHeight;
    return { x, y, ...d };
  });

  // Create smooth Bezier curve path
  const linePath = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
  }, '');

  const lastPt = points[points.length - 1];
  const firstPt = points[0];
  const areaPath = `${linePath} L ${lastPt.x} ${padTop + innerHeight} L ${firstPt.x} ${padTop + innerHeight} Z`;

  return (
    <div className={styles.lineGraphCard}>
      <div className={styles.lineGraphHeader}>
        <span className={styles.lineGraphTitle}>Weekly Completion Trend</span>
        <span className={styles.lineGraphBadge}>Mon – Sun</span>
      </div>

      <div className={styles.lineGraphSvgWrapper}>
        <svg viewBox={`0 0 ${width} ${height}`} className={styles.lineSvg}>
          <defs>
            <linearGradient id="lineTrendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineStrokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Gridlines */}
          <line x1={padLeft} y1={padTop} x2={width - padRight} y2={padTop} stroke="#f3f4f6" strokeDasharray="3 3" />
          <line x1={padLeft} y1={padTop + innerHeight / 2} x2={width - padRight} y2={padTop + innerHeight / 2} stroke="#f3f4f6" strokeDasharray="3 3" />
          <line x1={padLeft} y1={padTop + innerHeight} x2={width - padRight} y2={padTop + innerHeight} stroke="#e5e7eb" />

          {/* Area Fill */}
          <path d={areaPath} fill="url(#lineTrendGradient)" />

          {/* Smooth Trend Line */}
          <path
            d={linePath}
            fill="none"
            stroke="url(#lineStrokeGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((pt) => (
            <g
              key={pt.day}
              className={styles.lineNodeGroup}
              onClick={() => onSelectDate && onSelectDate(pt.dateStr)}
              style={{ cursor: 'pointer' }}
            >
              {(pt.isSelected || pt.isToday) && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="9"
                  fill={pt.isSelected ? 'rgba(245, 158, 11, 0.25)' : 'rgba(99, 102, 241, 0.25)'}
                />
              )}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                fill={pt.pct > 0 ? '#10b981' : '#ffffff'}
                stroke={pt.isSelected ? '#f59e0b' : pt.pct > 0 ? '#10b981' : '#6366f1'}
                strokeWidth="2.5"
              />
              {pt.pct > 0 && (
                <text
                  x={pt.x}
                  y={pt.y - 10}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill="#059669"
                >
                  {pt.pct}%
                </text>
              )}
              <text
                x={pt.x}
                y={height - 8}
                textAnchor="middle"
                fontSize="11"
                fontWeight={pt.isToday || pt.isSelected ? '700' : '500'}
                fill={pt.isSelected ? '#f59e0b' : pt.isToday ? '#6366f1' : '#6b7280'}
              >
                {pt.day}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

// ─── Category Breakdown Bar ──────────────────────────────────────────
function CategoryBreakdown({ categories }) {
  const max = Math.max(...categories.map((c) => c.total), 1);
  return (
    <div className={styles.catList}>
      {categories.map(({ name, total, completed }) => (
        <div key={name} className={styles.catItem}>
          <span className={styles.catName}>{name}</span>
          <div className={styles.catBarWrapper}>
            <div
              className={styles.catBarTotal}
              style={{ width: `${(total / max) * 100}%` }}
            >
              <div
                className={styles.catBarDone}
                style={{ width: total > 0 ? `${(completed / total) * 100}%` : '0%' }}
              />
            </div>
          </div>
          <span className={styles.catCount}>{completed}/{total}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function DailyGoals() {

  const { goals: profileGoals, activityHistory: profileHistory, updateGoals, loading } = useProfile();
  const allGoals = profileGoals || [];

  const [todayIso, setTodayIso] = useState(() => getLocalIsoDate());
  const [selectedDate, setSelectedDate] = useState(() => getLocalIsoDate());
  const isViewingToday = selectedDate === todayIso;

  // Live timer to ensure today rolls over automatically at midnight
  useEffect(() => {
    const timer = setInterval(() => {
      const current = getLocalIsoDate();
      setTodayIso((prev) => (prev !== current ? current : prev));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [modalPriorityDefault, setModalPriorityDefault] = useState(false);
  const dateInputRef = useRef(null);

  // Filter goals specifically for the active selected date (including General / Recurring goals)
  const selectedGoals = useMemo(() => {
    return allGoals.filter((g) => {
      if (g.isRecurring) {
        return selectedDate >= (g.startDate || g.date || todayIso);
      }
      return (g.date || todayIso) === selectedDate;
    });
  }, [allGoals, selectedDate, todayIso]);

  // Derived live stats for the selected date
  const stats = useMemo(() => computeStats(selectedGoals, selectedDate), [selectedGoals, selectedDate]);
  const categoryStats = useMemo(() => computeCategoryStats(selectedGoals, selectedDate), [selectedGoals, selectedDate]);

  // Derived live stats specifically for TODAY independent of selectedDate
  const realTodayGoals = useMemo(() => {
    return allGoals.filter((g) => {
      if (g.isRecurring) {
        return todayIso >= (g.startDate || g.date || todayIso);
      }
      return (g.date || todayIso) === todayIso;
    });
  }, [allGoals, todayIso]);
  const realTodayStats = useMemo(() => computeStats(realTodayGoals, todayIso), [realTodayGoals, todayIso]);

  // Weekly bar chart for the week containing selectedDate
  const weeklyChartData = useMemo(
    () => getWeeklyChartDataForDate(allGoals, selectedDate),
    [allGoals, selectedDate]
  );

  // 7-Day streak indicator for the active week
  const streakDays = useMemo(
    () => getStreakDaysForWeek(allGoals, selectedDate),
    [allGoals, selectedDate]
  );

  // Full history map computed from all goals (augmented with Firestore history)
  const fullActivityHistory = useMemo(() => {
    const fromGoals = computeActivityHistoryFromGoals(allGoals);
    return { ...profileHistory, ...fromGoals };
  }, [allGoals, profileHistory]);

  // Priority slots (first 3 goals marked isPriority for selected date)
  const priorityGoals = selectedGoals.filter((g) => g.isPriority);
  const prioritySlots = [0, 1, 2].map((i) => priorityGoals[i] || null);

  // ── Date Navigation Handlers ───────────────────────────────────────
  const handlePrevDay = () => {
    const current = parseLocalIsoDate(selectedDate);
    current.setDate(current.getDate() - 1);
    setSelectedDate(getLocalIsoDate(current));
  };

  const handleNextDay = () => {
    const current = parseLocalIsoDate(selectedDate);
    current.setDate(current.getDate() + 1);
    setSelectedDate(getLocalIsoDate(current));
  };

  const handleJumpToToday = () => {
    setSelectedDate(todayIso);
  };

  // Formatted date string (e.g. "Friday, August 28, 2026")
  const formattedDateTitle = useMemo(() => {
    return formatLongDate(selectedDate);
  }, [selectedDate]);


  const isPastDate = selectedDate < todayIso;

  // ── Goal Action Handlers (All Persisted to Firestore) ───────────────
  const toggleGoal = (id) => {
    if (isPastDate) return; // Goals of past dates are read-only logs
    const updated = allGoals.map((g) => {
      if (g.id === id) {
        if (g.isRecurring) {
          const existing = g.completedDates || [];
          const isDoneOnSelectedDate = existing.includes(selectedDate);
          const nextCompletedDates = isDoneOnSelectedDate
            ? existing.filter((d) => d !== selectedDate)
            : [...existing, selectedDate];
          return {
            ...g,
            completedDates: nextCompletedDates,
            completed: nextCompletedDates.includes(todayIso),
          };
        } else {
          const nextDone = !g.completed;
          return { ...g, completed: nextDone, progress: nextDone ? 100 : 0 };
        }
      }
      return g;
    });
    updateGoals(updated);
  };

  const deleteGoal = (id, e) => {
    e.stopPropagation();
    if (isPastDate) return; // Cannot delete historical records
    const updated = allGoals.filter((g) => g.id !== id);
    updateGoals(updated);
  };

  const togglePriority = (id, e) => {
    e.stopPropagation();
    if (isPastDate) return; // Cannot modify past priorities
    const target = allGoals.find((g) => g.id === id);
    if (!target) return;
    const currentDayPriorityCount = selectedGoals.filter((g) => g.isPriority).length;
    if (!target.isPriority && currentDayPriorityCount >= 3) {
      alert('You already have 3 Top Priorities pinned for this date. Unpin one first.');
      return;
    }
    const updated = allGoals.map((g) => (g.id === id ? { ...g, isPriority: !g.isPriority } : g));
    updateGoals(updated);
  };

  const addGoal = ({ title, category, priority, estimatedTime, notes, description, isPriority, isRecurring }) => {
    if (isPastDate) return; // Cannot add goals to past dates
    const shouldBePriority = isPriority !== undefined ? isPriority : priority === 'High';
    const isGeneral = isRecurring || category === 'General';
    const categoryColor =
      category === 'General' ? '#10b981' :
      category === 'English' ? '#3b82f6' :
      category === 'Speaking' ? '#8b5cf6' :
      category === 'Fitness' ? '#ef4444' :
      category === 'Interview' ? '#f59e0b' :
      category === 'Learning' ? '#6366f1' : '#10b981';

    const newGoal = {
      id: `goal-${Date.now()}`,
      title,
      category: category || 'General',
      priority: priority || 'High',
      estimatedTime: estimatedTime || '',
      notes: notes || '',
      description: description || '',
      completed: false,
      progress: 0,
      color: categoryColor,
      date: selectedDate,
      startDate: selectedDate,
      isRecurring: isGeneral,
      completedDates: [],
      isPriority: shouldBePriority,
    };
    updateGoals([...allGoals, newGoal]);
  };


  const handleOpenAddPriority = () => {
    if (isPastDate) return;
    setModalPriorityDefault(true);
    setShowModal(true);
  };

  const handleOpenAddNormal = () => {
    if (isPastDate) return;
    setModalPriorityDefault(false);
    setShowModal(true);
  };

  return (
    <div className={styles.page}>

      {/* ── Page Header ── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerInfo}>
          <h2 className={styles.pageTitle}>Daily Goals & History</h2>
          <p className={styles.pageDesc}>
            Manage today&apos;s tasks or travel back to inspect historical activity records.
          </p>
        </div>
        {!isPastDate && (
          <button className={styles.addBtn} onClick={handleOpenAddNormal}>
            <Plus size={18} />
            Add Goal {isViewingToday ? '' : `for ${selectedDate}`}
          </button>
        )}
      </div>



      {/* ── Interactive Date Navigator Bar ── */}
      <div className={styles.dateNavigatorBar}>
        <div className={styles.dateNavControls}>
          <button
            type="button"
            className={styles.dateNavBtn}
            onClick={handlePrevDay}
            title="Previous Day"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            className={styles.dateDisplayWrapper}
            onClick={() => dateInputRef.current?.showPicker ? dateInputRef.current.showPicker() : dateInputRef.current?.focus()}
          >
            <span className={styles.currentDateLabel}>
              <Calendar size={18} color="var(--color-primary)" />
              {formattedDateTitle}
            </span>

            {isViewingToday ? (
              <span className={styles.todayPill}>● TODAY</span>
            ) : selectedDate < todayIso ? (
              <span className={styles.pastPill}>PAST DATE</span>
            ) : (
              <span className={styles.futurePill}>UPCOMING</span>
            )}

            <input
              ref={dateInputRef}
              type="date"
              className={styles.datePickerHidden}
              value={selectedDate}
              onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
            />
          </div>

          <button
            type="button"
            className={styles.dateNavBtn}
            onClick={handleNextDay}
            title="Next Day"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {!isViewingToday && (
          <button
            type="button"
            className={styles.jumpTodayActionBtn}
            onClick={handleJumpToToday}
          >
            <RotateCcw size={13} style={{ display: 'inline', marginRight: 4 }} />
            Return to Today
          </button>
        )}
      </div>

      {/* ── Historical Date Notice (if viewing past date) ── */}
      {!isViewingToday && selectedDate < todayIso && (
        <div className={styles.historicalNoticeBanner}>
          <span>
            📜 Viewing historical activity for <strong>{formattedDateTitle}</strong> (Past Date — Read-only log).
          </span>
          <button
            type="button"
            style={{ background: 'transparent', border: 'none', color: '#92400e', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
            onClick={handleJumpToToday}
          >
            Return to Today
          </button>
        </div>
      )}

      {/* ── Stats Row for Selected Date ── */}
      <div className={styles.statsRow}>
        <StatCard icon={Target}       label="Date Goals"    value={stats.total}      color="primary" />
        <StatCard icon={CheckCircle2} label="Completed"     value={stats.completed}  color="success" />
        <StatCard icon={Flame}        label="Remaining"     value={stats.remaining}  color="warning" />
        <StatCard icon={TrendingUp}   label="Completion"    value={`${stats.percentage}%`} color="info" />
      </div>

      {/* ── Goals for Selected Date + Top 3 Priorities ── */}
      <div className={styles.twoCol}>


        {/* Goals List */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              {isViewingToday ? "Today's Goals" : `Goals for ${selectedDate}`}
            </h3>
            <span className={styles.sectionBadge}>{stats.completed}/{stats.total}</span>
          </div>

          {selectedGoals.length === 0 && (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--color-gray-500)' }}>
              <p className={styles.emptyState}>
                {selectedDate < todayIso
                  ? `No goals were recorded on ${formattedDateTitle}.`
                  : `No goals planned yet. Click "+ Add Goal" to get started!`}
              </p>
            </div>
          )}


          {selectedGoals.map((goal) => {
            const isDone = goal.isRecurring
              ? Boolean(goal.completedDates?.includes(selectedDate))
              : Boolean(goal.completed);

            return (
              <div
                key={goal.id}
                className={`${styles.goalItem} ${isPastDate ? styles.goalItemReadOnly : ''}`}
                onClick={() => !isPastDate && selectedDate <= todayIso && toggleGoal(goal.id)}
                style={isPastDate || selectedDate > todayIso ? { cursor: 'default' } : {}}
              >
                {selectedDate > todayIso ? (
                  <div className={styles.futureScheduleIcon} title="Scheduled for future date">
                    <Clock size={12} />
                  </div>
                ) : (
                  <div
                    className={`${styles.goalCheckbox} ${isDone ? styles.checked : ''} ${
                      isPastDate ? styles.readOnlyCheckbox : ''
                    }`}
                    title={isPastDate ? (isDone ? 'Completed on this date (Read-only record)' : 'Not completed on this date (Read-only record)') : ''}
                  >
                    {isDone && <Check size={13} />}
                  </div>
                )}
                <div className={styles.goalContent}>
                  <p className={`${styles.goalTitle} ${isDone ? styles.done : ''}`}>
                    {goal.title}
                  </p>
                  <div className={styles.goalMeta}>
                    <span className={styles.goalCategory}>{goal.category}</span>
                    <span className={`${styles.goalPriority} ${styles[(goal.priority || 'medium').toLowerCase()]}`}>
                      {goal.priority || 'Medium'}
                    </span>
                    {goal.isRecurring && (
                      <span className={styles.recurringBadge} title="Repeats every day automatically">
                        <Repeat size={10} /> General Goal
                      </span>
                    )}
                    {goal.estimatedTime && (
                      <span className={styles.goalTime}>{goal.estimatedTime}</span>
                    )}
                    {goal.isPriority && (
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: '#f59e0b',
                        background: '#fffbeb',
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-full)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 2,
                      }}>
                        <Star size={10} fill="#f59e0b" /> Top Priority
                      </span>
                    )}
                  </div>
                </div>

                {/* Star toggle button (only interactive for today and future) */}
                {!isPastDate ? (
                  <button
                    type="button"
                    className={`${styles.starBtn} ${goal.isPriority ? styles.starred : ''}`}
                    onClick={(e) => togglePriority(goal.id, e)}
                    title={goal.isPriority ? 'Remove from Top 3 Priorities' : 'Pin to Top 3 Priorities'}
                  >
                    <Star size={15} fill={goal.isPriority ? '#f59e0b' : 'none'} />
                  </button>
                ) : goal.isPriority ? (
                  <div className={styles.starReadOnly} title="Was pinned as top priority on this date">
                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  </div>
                ) : null}

                {/* Delete button (hidden on past dates) */}
                {!isPastDate && (
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={(e) => deleteGoal(goal.id, e)}
                    title="Delete goal"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Top 3 Priorities for Selected Date */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.sectionTitle}>Top 3 Priorities</h3>
              <span style={{ fontSize: '11px', color: 'var(--color-gray-400)', display: 'block', marginTop: 2 }}>
                {isViewingToday
                  ? 'Pin up to 3 high-impact goals for today'
                  : selectedDate < todayIso
                  ? `Historical priorities for ${formattedDateTitle}`
                  : `Plan priority goals for ${formattedDateTitle}`}
              </span>
            </div>
          </div>
          {priorityGoals.length === 0 && selectedDate < todayIso ? (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--color-gray-400)', fontStyle: 'italic', fontSize: '13px' }}>
              No Top 3 Priorities were assigned for this past date.
            </div>
          ) : (
            prioritySlots.map((goal, idx) => {
              if (!goal) {
                return selectedDate < todayIso ? (
                  <div key={`empty-${idx}`} className={styles.emptyPriorityPast}>
                    Priority {idx + 1} — Not set for this date
                  </div>
                ) : (
                  <div
                    key={`empty-${idx}`}
                    className={styles.emptyPriority}
                    onClick={handleOpenAddPriority}
                    title="Click to add a Top Priority goal"
                  >
                    <PlusCircle size={16} />
                    <span>
                      Priority {idx + 1} — {isViewingToday ? 'Click to assign top priority goal' : `Click to assign priority for ${selectedDate}`}
                    </span>
                  </div>
                );
              }

              const isPriorityDone = goal.isRecurring
                ? Boolean(goal.completedDates?.includes(selectedDate))
                : Boolean(goal.completed);

              return (
                <div
                  key={goal.id}
                  className={`${styles.priorityItem} ${isPastDate ? styles.goalItemReadOnly : ''}`}
                  onClick={() => !isPastDate && selectedDate <= todayIso && toggleGoal(goal.id)}
                  style={isPastDate || selectedDate > todayIso ? { cursor: 'default' } : {}}
                >
                  <div className={`${styles.priorityNumber} ${isPriorityDone ? styles.completed : ''}`}>
                    {isPriorityDone ? <Check size={13} /> : idx + 1}
                  </div>
                  <span className={`${styles.priorityTask} ${isPriorityDone ? styles.done : ''}`}>
                    {goal.title}
                  </span>

                  {!isPastDate ? (
                    <button
                      type="button"
                      className={styles.starBtn}
                      style={{ color: '#f59e0b' }}
                      onClick={(e) => togglePriority(goal.id, e)}
                      title="Unpin from Top 3 Priorities"
                    >
                      <Star size={14} fill="#f59e0b" />
                    </button>
                  ) : (
                    <div className={styles.starReadOnly} title="Top priority on this date">
                      <Star size={14} fill="#f59e0b" color="#f59e0b" />
                    </div>
                  )}

                  {selectedDate <= todayIso && (
                    <div className={`${styles.priorityCheck} ${isPriorityDone ? styles.checked : ''}`}>
                      {isPriorityDone && <Check size={11} />}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>




      </div>

      {/* ── Analytics Header ── */}
      <div className={styles.analyticsHeader}>
        <BarChart3 size={20} className={styles.analyticsIcon} />
        <h3 className={styles.analyticsTitle}>Goal Analytics ({isViewingToday ? 'Today' : selectedDate})</h3>
      </div>

      {/* ── Chart Row: Weekly Bar + Date Donut ── */}
      <div className={styles.twoCol}>

        {/* Weekly Completion Bar Chart */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Weekly Goal Completion</h3>
            <span className={styles.sectionBadge}>Click bar to switch day</span>
          </div>
          <WeeklyBarChart data={weeklyChartData} onSelectDate={setSelectedDate} />
        </div>

        {/* Selected Date Goal Progress Donut */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Progress for {isViewingToday ? 'Today' : selectedDate}</h3>
          </div>
          <div className={styles.donutSection}>
            <DonutChart percentage={stats.percentage} />
            <div className={styles.donutLegend}>
              <div className={styles.donutLegendItem}>
                <span className={`${styles.legendDot} ${styles.primaryDot}`} />
                <span className={styles.legendLabel}>Completed ({stats.completed})</span>
              </div>
              <div className={styles.donutLegendItem}>
                <span className={`${styles.legendDot} ${styles.grayDot}`} />
                <span className={styles.legendLabel}>Remaining ({stats.remaining})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Breakdown for Selected Date ── */}
      <div className={styles.fullWidthSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Goals by Category ({isViewingToday ? 'Today' : selectedDate})</h3>
        </div>
        {categoryStats.length === 0 ? (
          <div style={{ padding: '20px 16px', textAlign: 'center', color: 'var(--color-gray-400)', fontSize: '13px' }}>
            No goals recorded for this date. Add a goal above to see your category breakdown.
          </div>
        ) : (
          <CategoryBreakdown categories={categoryStats} />
        )}
      </div>

      {/* ── Streak Tracker & LeetCode Monthly Calendar Row ── */}
      <div className={styles.twoCol}>

        {/* 7-Day Streak Tracker */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Weekly Consistency</h3>
            <span className={styles.sectionBadge}>Active Week</span>
          </div>
          <div className={styles.streakDaysRow}>
            {streakDays.map(({ day, done, isToday, dateStr }) => (
              <div
                key={day}
                className={`${styles.streakDayBox} ${done ? styles.streakDone : ''} ${isToday ? styles.streakToday : ''}`}
                onClick={() => setSelectedDate(dateStr)}
                style={{ cursor: 'pointer' }}
                title={`Click to view ${day} (${dateStr})`}
              >
                <span className={styles.streakDayName}>{day}</span>
                <div className={styles.streakDayIcon}>
                  {done ? <Check size={14} /> : <span className={styles.streakEmptyDot} />}
                </div>
              </div>
            ))}
          </div>
          <WeeklyLineGraph data={weeklyChartData} onSelectDate={setSelectedDate} />
        </div>


        {/* Monthly Activity Tracker (LeetCode Style with interactive date selection) */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Monthly Consistency</h3>
            <span className={styles.sectionBadge}>LeetCode Calendar</span>
          </div>
          <MonthlyTracker
            activityHistory={fullActivityHistory}
            todayStats={realTodayStats}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

        </div>
      </div>

      {/* ── Add Goal Modal ── */}
      {showModal && (
        <AddGoalModal
          onClose={() => setShowModal(false)}
          onAdd={addGoal}
          defaultIsPriority={modalPriorityDefault}
          targetDate={selectedDate}
          targetDateLabel={formattedDateTitle}
          isViewingToday={isViewingToday}
        />
      )}


    </div>
  );
}
