import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Target,
  Clock,
  CheckCircle2,
  Languages,
  CalendarDays,
  RefreshCw,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { getLocalIsoDate } from '../lib/dateUtils';
import styles from './AIGenerateMyDay.module.css';

const BLOCKS = [
  { id: 'morning', label: 'Morning Focus', time: '8:00 AM' },
  { id: 'midday', label: 'Midday Progress', time: '12:30 PM' },
  { id: 'evening', label: 'Evening Growth', time: '5:30 PM' },
  { id: 'close', label: 'Day Close', time: '7:30 PM' },
];

function parseMinutes(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const match = String(value || '').match(/(\d+)/);
  return match ? Math.max(5, Number(match[1])) : 20;
}

function priorityRank(goal) {
  if (goal.isPriority) return 0;
  const priority = String(goal.priority || '').toLowerCase();
  if (priority === 'high') return 1;
  if (priority === 'medium') return 2;
  if (priority === 'low') return 3;
  return 4;
}

function buildDayPlan(goals) {
  const sorted = [...goals]
    .filter((goal) => !goal.completed && goal.progress !== 100)
    .sort((a, b) => priorityRank(a) - priorityRank(b));

  const plan = BLOCKS.map((block) => ({ ...block, items: [] }));

  sorted.forEach((goal, index) => {
    const targetBlock = plan[Math.min(index, plan.length - 1)];
    targetBlock.items.push({
      id: goal.id,
      title: goal.title,
      category: goal.category || 'Growth',
      duration: parseMinutes(goal.estimatedTime || goal.duration),
      suggested: false,
    });
  });

  const alreadyHasEnglish = sorted.some((goal) => {
    const haystack = `${goal.title || ''} ${goal.category || ''}`.toLowerCase();
    return haystack.includes('english') || haystack.includes('vocab') || haystack.includes('grammar');
  });

  if (!alreadyHasEnglish) {
    plan[2].items.unshift({
      id: 'english-coach-core-block',
      title: 'English Coach practice',
      category: 'English',
      duration: 15,
      suggested: true,
      route: '/english-coach',
    });
  }

  return plan;
}

export default function AIGenerateMyDay() {
  const { user } = useAuth();
  const { goals, loading } = useProfile();
  const today = useMemo(() => getLocalIsoDate(), []);

  const todayGoals = useMemo(() => {
    return (goals || []).filter((goal) => {
      if (goal.isRecurring) {
        return today >= (goal.startDate || goal.date || today);
      }
      return (goal.date || today) === today;
    });
  }, [goals, today]);

  const pendingGoals = useMemo(
    () => todayGoals.filter((goal) => !goal.completed && goal.progress !== 100),
    [todayGoals]
  );

  const storageKey = user?.uid ? `elevate_generated_day_${user.uid}_${today}` : null;
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    if (!storageKey) return;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setPlan(JSON.parse(saved));
    } catch (error) {
      console.debug('Could not restore generated day plan:', error);
    }
  }, [storageKey]);

  const handleGenerate = () => {
    const nextPlan = buildDayPlan(pendingGoals);
    setPlan(nextPlan);
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(nextPlan));
      } catch (error) {
        console.debug('Could not save generated day plan:', error);
      }
    }
  };

  const totalMinutes = plan.reduce(
    (sum, block) => sum + block.items.reduce((inner, item) => inner + item.duration, 0),
    0
  );
  const totalItems = plan.reduce((sum, block) => sum + block.items.length, 0);

  return (
    <div className={styles.page}>
      <div className={styles.headerWrapper}>
        <div>
          <div className={styles.titleRow}>
            <Sparkles size={22} className={styles.titleIcon} />
            <h2 className={styles.pageTitle}>AI Generate My Day</h2>
          </div>
          <p className={styles.pageDesc}>
            Turn your real ELEVATE goals into a focused daily plan without changing your existing tasks.
          </p>
        </div>

        <button
          type="button"
          className={styles.generateBtn}
          onClick={handleGenerate}
          disabled={loading}
        >
          <Sparkles size={16} />
          {plan.length > 0 ? 'Regenerate My Day' : 'Generate My Day'}
        </button>
      </div>

      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <Target size={18} />
          <div>
            <span className={styles.summaryLabel}>Pending Tasks</span>
            <strong>{pendingGoals.length}</strong>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <CheckCircle2 size={18} />
          <div>
            <span className={styles.summaryLabel}>Completed Today</span>
            <strong>{todayGoals.length - pendingGoals.length}</strong>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <Clock size={18} />
          <div>
            <span className={styles.summaryLabel}>Planned Focus</span>
            <strong>{totalMinutes > 0 ? `${totalMinutes} min` : 'Not generated'}</strong>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <Languages size={18} />
          <div>
            <span className={styles.summaryLabel}>Core Habit</span>
            <strong>English</strong>
          </div>
        </div>
      </div>

      {pendingGoals.length === 0 && !loading && (
        <div className={styles.emptyCard}>
          <CalendarDays size={34} />
          <h3>No pending tasks for today</h3>
          <p>Add a few goals or tasks first, then generate a realistic plan from them.</p>
          <Link to="/daily-goals" className={styles.primaryLink}>
            Open Daily Goals & Tasks <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {plan.length === 0 && pendingGoals.length > 0 && (
        <div className={styles.readyCard}>
          <Lightbulb size={22} />
          <div>
            <h3>Your tasks are ready to plan</h3>
            <p>
              ELEVATE will prioritize important goals, spread work across the day, and reserve a short English growth block when needed.
            </p>
          </div>
        </div>
      )}

      {plan.length > 0 && (
        <>
          <div className={styles.planHeader}>
            <div>
              <h3>Today's Focus Plan</h3>
              <p>{totalItems} focused blocks built from your current ELEVATE data.</p>
            </div>
            <button type="button" className={styles.secondaryBtn} onClick={handleGenerate}>
              <RefreshCw size={14} />
              Refresh Plan
            </button>
          </div>

          <div className={styles.planGrid}>
            {plan.map((block) => (
              <div key={block.id} className={styles.planCard}>
                <div className={styles.blockHeader}>
                  <div>
                    <span className={styles.blockTime}>{block.time}</span>
                    <h4>{block.label}</h4>
                  </div>
                  <Clock size={16} />
                </div>

                {block.items.length === 0 ? (
                  <p className={styles.restText}>Keep this block open for rest, study, or catch-up.</p>
                ) : (
                  <div className={styles.itemList}>
                    {block.items.map((item) => (
                      <div key={item.id} className={styles.planItem}>
                        <div className={styles.itemMain}>
                          <span className={styles.itemTitle}>{item.title}</span>
                          <span className={styles.itemMeta}>
                            {item.category} • {item.duration} min
                            {item.suggested ? ' • Suggested by ELEVATE' : ''}
                          </span>
                        </div>
                        {item.route && (
                          <Link to={item.route} className={styles.openLink}>
                            Open <ArrowRight size={12} />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.footerActions}>
            <Link to="/daily-goals" className={styles.secondaryLink}>
              Review Daily Goals & Tasks
            </Link>
            <Link to="/english-coach" className={styles.primaryLink}>
              Start English Coach <ArrowRight size={14} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
