import {
  Target,
  TrendingUp,
  Flame,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import StatCard from '../components/ui/StatCard';
import GoalCard from '../components/ui/GoalCard';
import PriorityCard from '../components/ui/PriorityCard';
import ProgressCard from '../components/ui/ProgressCard';
import RecommendationCard from '../components/ui/RecommendationCard';
import QuickActionCard from '../components/ui/QuickActionCard';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { quickActions } from '../data/dashboardData';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, goals } = useProfile();

  const firstName = user?.displayName ? user.displayName.split(' ')[0] : (profile?.name || 'there');
  const growthScore = profile?.overallGrowthScore || 0;
  const currentStreak = profile?.currentStreak || 0;
  const completedGoals = goals.filter((g) => g.progress === 100 || g.completed).length;

  return (
    <div className={styles.dashboard}>
      {/* Welcome Section */}
      <div className={styles.welcome}>
        <h2 className={styles.welcomeText}>
          Welcome, {firstName}! 👋
        </h2>
        <p className={styles.welcomeSub}>
          Plan your day, complete your priorities, and keep improving your English.
        </p>
      </div>

      {/* Stats Overview */}
      <div className={styles.statsGrid}>
        <StatCard
          icon={TrendingUp}
          label="Growth Score"
          value={`${growthScore}%`}
          color="primary"
        />
        <StatCard
          icon={Target}
          label="Goals Tracked"
          value={goals.length > 0 ? `${completedGoals}/${goals.length}` : '0'}
          color="info"
        />
        <StatCard
          icon={Flame}
          label="Current Streak"
          value={`${currentStreak} days`}
          color="warning"
        />
        <StatCard
          icon={CheckCircle2}
          label="Level"
          value={`Lvl ${profile?.level || 1}`}
          color="success"
        />
      </div>

      {/* Two Column: Goals + Core Focus */}
      <div className={styles.twoCol}>
        <div className={styles.section}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 className={styles.sectionTitle} style={{ margin: 0 }}>Daily Goals & Tasks</h3>
            <Link to="/daily-goals" style={{ fontSize: '12px', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              + Manage
            </Link>
          </div>
          {goals.length === 0 ? (
            <div style={{
              background: 'var(--color-white)',
              border: '1px dashed var(--color-gray-300)',
              borderRadius: 'var(--radius-md)',
              padding: '24px 16px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Target size={28} color="var(--color-primary)" style={{ opacity: 0.5 }} />
              <strong style={{ fontSize: '13px', color: 'var(--color-gray-800)' }}>No goals or tasks set yet</strong>
              <p style={{ fontSize: '11px', color: 'var(--color-gray-500)', margin: 0 }}>
                Add your first task, then let ELEVATE structure your day around it.
              </p>
              <Link
                to="/daily-goals"
                style={{
                  marginTop: 6,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  background: 'var(--color-primary-bg)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none'
                }}
              >
                Open Daily Goals <ArrowRight size={11} />
              </Link>
            </div>
          ) : (
            goals.slice(0, 3).map((goal) => (
              <GoalCard
                key={goal.id}
                title={goal.title}
                category={goal.priority || goal.category || 'Growth'}
                completed={goal.progress === 100 || goal.completed}
              />
            ))
          )}
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Core Focus</h3>
          <PriorityCard
            priority="High"
            task="Review today's goals and choose your most important tasks"
            completed={goals.length > 0}
          />
          <PriorityCard
            priority="Medium"
            task="Use AI Generate My Day to turn those tasks into a focused schedule"
            completed={false}
          />
          <PriorityCard
            priority="Low"
            task="Complete one focused English Coach practice block"
            completed={false}
          />
        </div>
      </div>

      {/* Two Column: Growth Score + Recommendation */}
      <div className={styles.twoCol}>
        <ProgressCard
          score={growthScore}
          maxScore={100}
          label={profile?.overallGrowthStatus || 'Ready to Begin'}
          description="Your wider ELEVATE modules remain available, while your daily workflow now centers on goals, planning, and English practice."
        />
        <RecommendationCard
          title="Today's ELEVATE Focus"
          content={
            goals.length === 0
              ? 'Start with Daily Goals & Tasks. Add what matters today, then generate a practical schedule around those priorities.'
              : `You have ${goals.length} tracked goal${goals.length === 1 ? '' : 's'}. Generate your day now to turn them into a clear action plan.`
          }
          tag="Core Flow"
        />
      </div>

      {/* Streak */}
      <div className={styles.streakCard}>
        <div className={styles.streakIcon}>
          <Flame size={28} />
        </div>
        <div className={styles.streakInfo}>
          <div>
            <span className={styles.streakValue}>{currentStreak}</span>
            <span className={styles.streakUnit}>days</span>
          </div>
          <p className={styles.streakLabel}>
            {currentStreak === 0 ? 'Start your daily learning streak today!' : `${currentStreak} day streak — keep it going!`}
          </p>
          <p className={styles.streakBest}>Level {profile?.level || 1} • {profile?.totalXp || 0} Total XP</p>
        </div>
      </div>

      {/* Core Quick Actions */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Core Actions</h3>
        <div className={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <QuickActionCard
              key={action.id}
              label={action.label}
              icon={action.icon}
              color={action.color}
              onClick={() => action.path && navigate(action.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
