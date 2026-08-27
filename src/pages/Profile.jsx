import { useState } from 'react';
import {
  User,
  CheckCircle2,
  ExternalLink,
  Bell,
  Settings,
  Camera,
  Target,
  Flame,
  Sparkles,
  Award,
  Crown,
  Star,
  BookA,
  Briefcase,
  Dumbbell,
  Mic,
  Clock,
  Info,
  Calendar,
  Lock,
  Palette,
  Shield,
  Download,
  Trash2,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Eye,
  Hourglass,
} from 'lucide-react';
import EditProfileModal from '../components/profile/EditProfileModal';
import AddGoalModal from '../components/profile/AddGoalModal';
import AIPersonalizationModal from '../components/profile/AIPersonalizationModal';
import DataExportModal from '../components/profile/DataExportModal';
import DeleteAccountModal from '../components/profile/DeleteAccountModal';
import {
  myTopSkills,
  recentAchievementsList,
  growthIdentityData,
  learningPreferencesData,
  profileShowcaseData,
  quickSettingsList,
  securityData,
} from '../data/profileData';
import { useProfile } from '../hooks/useProfile';
import styles from './Profile.module.css';

export default function Profile() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('overview');

  // Modals state
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ── Firestore-backed state via custom hook ──────────────────────────────────
  const {
    profile,
    goals,
    aiSettings,
    notifications,
    loading,
    saving,
    updateProfile,
    updateAiSettings,
    toggleNotification,
    addGoal,
    resetAllData,
  } = useProfile();

  // Icon mapper helper
  const getIcon = (iconName, color) => {
    switch (iconName) {
      case 'Mic': return <Mic size={14} color={color || '#8b5cf6'} />;
      case 'Star': return <Star size={14} color={color || '#3b82f6'} />;
      case 'BookA': return <BookA size={14} color={color || '#10b981'} />;
      case 'Briefcase': return <Briefcase size={14} color={color || '#f59e0b'} />;
      case 'Dumbbell': return <Dumbbell size={14} color={color || '#ef4444'} />;
      case 'Award': return <Award size={14} color={color || '#14b8a6'} />;
      case 'Flame': return <Flame size={14} color={color || '#ef4444'} />;
      case 'Crown': return <Crown size={14} color={color || '#8b5cf6'} />;
      case 'Bell': return <Bell size={16} color="var(--color-primary)" />;
      case 'Lock': return <Lock size={16} color="var(--color-primary)" />;
      case 'Palette': return <Palette size={16} color="var(--color-primary)" />;
      case 'Shield': return <Shield size={16} color="var(--color-primary)" />;
      case 'Download': return <Download size={16} color="var(--color-primary)" />;
      case 'User': return <User size={16} color="var(--color-primary)" />;
      default: return <User size={14} color="var(--color-primary)" />;
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className={styles.page}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
              height: '120px',
              borderRadius: '12px',
              background: 'var(--color-gray-100)',
              opacity: 0.6,
            }} />
          ))}
          <p style={{ textAlign: 'center', color: 'var(--color-gray-400)', fontSize: '13px' }}>
            Loading your profile…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* ── 1. Master Header ── */}
      <div className={styles.headerWrapper}>
        <div className={styles.headerInfo}>
          <h2 className={styles.pageTitle}>My Profile</h2>
          <p className={styles.pageDesc}>
            Your personal growth identity and preferences.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setShowEditModal(true)}
          >
            <span>View Public Profile</span>
            <ExternalLink size={13} />
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            title="Notifications"
            onClick={() => setActiveTab('preferences')}
          >
            <Bell size={14} />
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            title="Settings"
            onClick={() => setActiveTab('preferences')}
          >
            <Settings size={14} />
          </button>
        </div>
      </div>

      {/* ── Sub-Navigation Tabs ── */}
      <div className={styles.navTabs}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <User size={15} />
          Profile Overview
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'personalization' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('personalization')}
        >
          <Sparkles size={15} />
          AI & Learning Personalization
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'goals' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('goals')}
        >
          <Target size={15} />
          My Goals
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'preferences' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          <Palette size={15} />
          Preferences & Notifications
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'security' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <Shield size={15} />
          Security & Privacy
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB 1: PROFILE OVERVIEW (MATCHING SCREENSHOT)
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <>
          {/* ── MASTER HERO CARD: Profile Identity & Stats Row ── */}
          <div className={styles.heroCard}>
            {/* Left: Avatar + Name + Bio + Meta */}
            <div className={styles.heroLeft}>
              <div className={styles.avatarWrapper}>
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className={styles.avatarImg}
                />
                <button
                  type="button"
                  className={styles.cameraBtn}
                  onClick={() => setShowEditModal(true)}
                  title="Change avatar"
                >
                  <Camera size={12} />
                </button>
              </div>

              <div className={styles.heroIdentity}>
                <div className={styles.nameRow}>
                  <h3 className={styles.userName}>{profile.name}</h3>
                  <CheckCircle2 size={16} color="#3b82f6" fill="#3b82f6" stroke="#ffffff" />
                </div>
                <span className={styles.userRoleTitle}>
                  <Crown size={13} />
                  {profile.title}
                </span>
                <p className={styles.bioQuote}>"{profile.bio}"</p>
                <div className={styles.metaTagsRow}>
                  <span>📍 {profile.location}</span>
                  <span>🌙 {profile.timingTag}</span>
                </div>
              </div>
            </div>

            {/* Right: 4 Metrics + Level Bar */}
            <div className={styles.heroRight}>
              <div className={styles.heroMetricsGrid}>
                {/* Metric 1 */}
                <div className={styles.heroMetricBox}>
                  <Target size={18} color="#3b82f6" />
                  <div className={styles.metricTextCol}>
                    <span className={styles.metricLabel}>Overall Growth</span>
                    <span className={styles.metricVal}>{profile.overallGrowthScore || 0} / 100</span>
                    <span className={styles.metricSub}>{profile.overallGrowthStatus || 'Just Starting'}</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className={styles.heroMetricBox}>
                  <Flame size={18} color="var(--color-warning)" />
                  <div className={styles.metricTextCol}>
                    <span className={styles.metricLabel}>Current Streak</span>
                    <span className={styles.metricVal}>{profile.currentStreak || 0} Days</span>
                    <span className={styles.metricSub}>{profile.streakMessage || 'Start your first session!'}</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className={styles.heroMetricBox}>
                  <Sparkles size={18} color="#8b5cf6" />
                  <div className={styles.metricTextCol}>
                    <span className={styles.metricLabel}>Total XP</span>
                    <span className={styles.metricVal}>{(profile.totalXp || 0).toLocaleString()}</span>
                    <span className={styles.metricSub}>{profile.xpRemaining || 1000} XP to Level {(profile.level || 1) + 1}</span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className={styles.heroMetricBox}>
                  <Award size={18} color="#f59e0b" />
                  <div className={styles.metricTextCol}>
                    <span className={styles.metricLabel}>Achievements</span>
                    <span className={styles.metricVal}>{profile.achievementsCount || 0}</span>
                    <span className={styles.metricSub}>{profile.achievementsPercent || 0}% Completed</span>
                  </div>
                </div>
              </div>

              {/* Level Progress Bar in Hero */}
              <div className={styles.heroLevelRow}>
                <div className={styles.medalHexMini}>{profile.level || 1}</div>
                <div className={styles.heroLevelBarCol}>
                  <div className={styles.levelTitleRowHero}>
                    <span>Level {profile.level || 1} — {profile.title || 'ELEVATE Explorer'}</span>
                    <span>{profile.xpRemaining || 1000} XP to Level {(profile.level || 1) + 1}</span>
                  </div>
                  <div className={styles.heroBarTrack}>
                    <div
                      className={styles.heroBarFill}
                      style={{
                        width: `${Math.min(100, Math.max(5, Math.round(((profile.totalXp || 0) / (profile.xpMax || 1000)) * 100)))}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── MIDDLE ROW: My Top Skills + My Goals + Recent Achievements ── */}
          <div className={styles.grid3Col}>
            {/* Card 1: My Top Skills */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>My Top Skills</span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setActiveTab('personalization')}
                >
                  View Progress
                </button>
              </div>

              <div className={styles.skillsList}>
                {(profile.skills || [
                  { id: 'speaking', label: 'Public Speaking', score: 0, color: '#8b5cf6', icon: 'Mic' },
                  { id: 'communication', label: 'Communication', score: 0, color: '#3b82f6', icon: 'Star' },
                  { id: 'english', label: 'English', score: 0, color: '#10b981', icon: 'BookA' },
                  { id: 'interview', label: 'Interview Skills', score: 0, color: '#f59e0b', icon: 'Briefcase' },
                  { id: 'fitness', label: 'Fitness', score: 0, color: '#ef4444', icon: 'Dumbbell' },
                  { id: 'leadership', label: 'Leadership', score: 0, color: '#14b8a6', icon: 'Award' },
                ]).map((sk) => (
                  <div key={sk.id} className={styles.skillItem}>
                    <div className={styles.skillMetaRow}>
                      <div className={styles.skillLabelRow}>
                        {getIcon(sk.icon, sk.color)}
                        <span>{sk.label}</span>
                      </div>
                      <span className={styles.skillScore}>{sk.score}%</span>
                    </div>
                    <div className={styles.skillTrack}>
                      <div
                        className={styles.skillFill}
                        style={{ width: `${Math.max(0, sk.score)}%`, background: sk.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: My Goals */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>My Goals</span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setActiveTab('goals')}
                >
                  Manage Goals
                </button>
              </div>

              {goals.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '28px 12px', color: 'var(--color-gray-500)', fontSize: '13px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <Target size={32} style={{ opacity: 0.35, color: 'var(--color-primary)' }} />
                  <strong style={{ color: 'var(--color-gray-700)' }}>No active goals yet</strong>
                  <span style={{ fontSize: '11px', color: 'var(--color-gray-400)' }}>Set your first objective to start building habits and skills!</span>
                </div>
              ) : (
                <div className={styles.goalsList}>
                  {goals.map((g) => (
                    <div key={g.id} className={styles.goalItem}>
                      <div className={styles.goalLeft}>
                        <div
                          className={styles.goalIconBox}
                          style={{ background: `${g.color}18` }}
                        >
                          {getIcon(g.icon, g.color)}
                        </div>
                        <div className={styles.goalTextCol}>
                          <strong className={styles.goalTitle}>{g.title}</strong>
                          <span className={styles.goalMetaSub}>
                            Target: {g.targetDate} 📅 • {g.priority}
                          </span>
                        </div>
                      </div>

                      {/* Progress Circle Ring */}
                      <div className={styles.goalRingMini}>
                        <svg className={styles.ringSvgMini} viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="var(--color-gray-200)"
                            strokeWidth="3.6"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={g.color}
                            strokeWidth="3.6"
                            strokeDasharray={`${g.progress}, 100`}
                          />
                        </svg>
                        <span className={styles.ringNumMini}>{g.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                className={styles.btnAddGoalFull}
                onClick={() => setShowAddGoalModal(true)}
              >
                + Add New Goal
              </button>
            </div>

            {/* Card 3: Recent Achievements */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Recent Achievements</span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setActiveTab('preferences')}
                >
                  View All
                </button>
              </div>

              {(profile.achievements || []).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '28px 12px', color: 'var(--color-gray-500)', fontSize: '13px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <Award size={32} style={{ opacity: 0.35, color: 'var(--color-warning)' }} />
                  <strong style={{ color: 'var(--color-gray-700)' }}>No achievements unlocked yet</strong>
                  <span style={{ fontSize: '11px', color: 'var(--color-gray-400)' }}>Complete practice drills and courses to earn badges and XP!</span>
                </div>
              ) : (
                <div className={styles.recentList}>
                  {profile.achievements.map((ach) => (
                    <div key={ach.id} className={styles.recentItem}>
                      <div className={styles.recentLeft}>
                        <div className={styles.recentIconBox}>
                          {getIcon(ach.icon, ach.color)}
                        </div>
                        <div className={styles.recentTextCol}>
                          <strong className={styles.recentTitle}>{ach.title}</strong>
                          <span className={styles.recentDesc}>{ach.desc}</span>
                        </div>
                      </div>
                      <div className={styles.recentRight}>
                        <span className={styles.recentXp}>{ach.xp}</span>
                        <span className={styles.recentDate}>{ach.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                className={styles.btnPrimaryFull}
                onClick={() => setShowExportModal(true)}
              >
                View All Achievements
              </button>
            </div>
          </div>

          {/* ── BOTTOM ROW: Growth Identity + AI Personalization + Learning Preferences/Showcase ── */}
          <div className={styles.grid3Col}>
            {/* Card 4: Growth Identity */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Growth Identity</span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setShowEditModal(true)}
                >
                  Edit
                </button>
              </div>

              <div className={styles.growthIdentityList}>
                <div className={styles.identityRow}>
                  <span className={styles.identityLabel}>Primary Focus</span>
                  <strong className={styles.identityVal}>{(profile.growthIdentity?.primaryFocus) || 'Not set yet'}</strong>
                </div>
                <div className={styles.identityRow}>
                  <span className={styles.identityLabel}>Secondary Focus</span>
                  <strong className={styles.identityVal}>{(profile.growthIdentity?.secondaryFocus) || 'Not set yet'}</strong>
                </div>
                <div className={styles.identityRow}>
                  <span className={styles.identityLabel}>Learning Level</span>
                  <span className={styles.identityValDark}>{(profile.growthIdentity?.learningLevel) || 'Beginner'}</span>
                </div>
                <div className={styles.identityRow}>
                  <span className={styles.identityLabel}>Learning Style</span>
                  <span className={styles.identityValDark}>{(profile.growthIdentity?.learningStyle) || 'Practice-first'}</span>
                </div>
                <div className={styles.identityRow}>
                  <span className={styles.identityLabel}>Available Time</span>
                  <span className={styles.identityValDark}>{(profile.growthIdentity?.availableTime) || '15 – 30 min / day'}</span>
                </div>
                <div className={styles.identityRow}>
                  <span className={styles.identityLabel}>Preferred Time</span>
                  <span className={styles.identityValDark}>{(profile.growthIdentity?.preferredTime) || 'Evening'}</span>
                </div>
              </div>

              <div className={styles.coachStatusBanner}>
                <Info size={13} color="var(--color-primary)" />
                <span>This helps ELEVATE personalize your recommendations</span>
              </div>
            </div>

            {/* Card 5: AI Personalization */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>AI Personalization</span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setShowAiModal(true)}
                >
                  Manage
                </button>
              </div>

              <div className={styles.growthIdentityList}>
                <div className={styles.identityRow}>
                  <span className={styles.identityLabel}>🤖 Coaching Style</span>
                  <strong className={styles.identityValDark}>{aiSettings?.coachingStyle || 'Balanced'}</strong>
                </div>
                <div className={styles.identityRow}>
                  <span className={styles.identityLabel}>💬 Feedback Style</span>
                  <strong className={styles.identityValDark}>{aiSettings?.feedbackStyle || 'Action-oriented'}</strong>
                </div>
                <div className={styles.identityRow}>
                  <span className={styles.identityLabel}>⏱ Recommendation Frequency</span>
                  <strong className={styles.identityValDark}>{aiSettings?.recommendationFrequency || 'Balanced'}</strong>
                </div>
                <div className={styles.identityRow}>
                  <span className={styles.identityLabel}>⚡ AI Initiative</span>
                  <strong className={styles.identityValDark}>{aiSettings?.aiInitiative || 'Recommend proactively'}</strong>
                </div>
                <div className={styles.identityRow}>
                  <span className={styles.identityLabel}>🎯 Challenge Level</span>
                  <strong className={styles.identityValDark}>{aiSettings?.challengeLevel || 'Balanced'}</strong>
                </div>
              </div>

              <div className={styles.coachStatusBanner}>
                <Sparkles size={13} color="var(--color-primary)" />
                <span>Your AI Coach adapts to your progress. (Status: {aiSettings?.lastUpdated || 'Ready'})</span>
              </div>
            </div>

            {/* Card 6: Learning Preferences & Profile Showcase */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Learning Preferences</span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setShowAiModal(true)}
                >
                  Edit
                </button>
              </div>

              <div className={styles.learningPrefsGrid}>
                {learningPreferencesData.map((lp, idx) => (
                  <div key={idx} className={styles.prefChip}>
                    <span className={styles.prefLabel}>{lp.label}</span>
                    <span className={styles.prefVal}>{lp.val}</span>
                  </div>
                ))}
              </div>

              <div className={styles.cardHeader} style={{ marginTop: 'var(--space-2)' }}>
                <span className={styles.cardTitle}>Profile Showcase</span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setShowEditModal(true)}
                >
                  Preview
                </button>
              </div>

              <div className={styles.showcaseBadgesRow}>
                {[
                  { label: `Level ${profile.level || 1}`, sub: profile.title || 'Explorer', icon: 'Crown', color: '#8b5cf6' },
                  { label: `${profile.currentStreak || 0} Days`, sub: 'Current Streak', icon: 'Flame', color: '#ef4444' },
                  { label: `${profile.totalXp || 0} XP`, sub: 'Total Earned', icon: 'Sparkles', color: '#3b82f6' },
                  { label: `${profile.achievementsCount || 0}`, sub: 'Achievements', icon: 'Award', color: '#f59e0b' },
                ].map((sc, idx) => (
                  <div key={idx} className={styles.showcaseBadgeCard}>
                    {getIcon(sc.icon, sc.color)}
                    <span className={styles.showcaseTitle}>{sc.label}</span>
                    <span className={styles.showcaseSub}>{sc.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── QUICK SETTINGS STRIP ── */}
          <div className={styles.quickSettingsStrip}>
            {quickSettingsList.map((qs) => (
              <div
                key={qs.id}
                className={styles.quickSettingItem}
                onClick={() => {
                  if (qs.id === 'data') setShowExportModal(true);
                  else if (qs.id === 'security') setActiveTab('security');
                  else if (qs.id === 'account') setShowDeleteModal(true);
                  else setActiveTab('preferences');
                }}
              >
                {getIcon(qs.icon)}
                <div className={styles.qsTextCol}>
                  <strong className={styles.qsLabel}>{qs.label}</strong>
                  <span className={styles.qsSub}>{qs.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 2: AI & LEARNING PERSONALIZATION
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'personalization' && (
        <div className={styles.card} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              <Sparkles size={16} color="var(--color-primary)" />
              AI Presence & Communication Coach Personalization
            </span>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setShowAiModal(true)}
            >
              Calibrate Coach
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '10px 0' }}>
            <div style={{ background: 'var(--color-primary-bg)', border: '1px solid var(--color-primary-light)', padding: '14px', borderRadius: '8px' }}>
              <strong style={{ fontSize: '13px', color: 'var(--color-primary-dark)' }}>
                Active Coach Personality: Balanced Action-Oriented
              </strong>
              <p style={{ fontSize: '11px', color: 'var(--color-gray-700)', margin: '4px 0 0' }}>
                "ELEVATE prioritizes actionable real-time feedback with structured speech and posture breakdowns, automatically adapting challenge tiers based on your practice streak."
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: 'var(--color-gray-50)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)' }}>
                <strong style={{ fontSize: '12px', color: 'var(--color-gray-900)' }}>Adaptive Difficulty</strong>
                <p style={{ fontSize: '10px', color: 'var(--color-gray-600)', margin: '4px 0 0' }}>
                  Progressive challenge pacing enabled across English vocabulary, speech drills, and STAR mock interview prompts.
                </p>
              </div>

              <div style={{ background: 'var(--color-gray-50)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)' }}>
                <strong style={{ fontSize: '12px', color: 'var(--color-gray-900)' }}>Feedback Pacing</strong>
                <p style={{ fontSize: '10px', color: 'var(--color-gray-600)', margin: '4px 0 0' }}>
                  Action-oriented highlights deliver immediate suggestions on conciseness, filler word count, and eye contact.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 3: MY GOALS
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'goals' && (
        <div className={styles.card} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              <Target size={16} color="var(--color-primary)" />
              Personal Growth Objectives & Target Deadlines
            </span>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setShowAddGoalModal(true)}
            >
              + Add Goal
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '8px 0' }}>
            {goals.map((g) => (
              <div
                key={g.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'var(--color-gray-50)',
                  borderRadius: '8px',
                  border: '1px solid var(--color-gray-200)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      background: `${g.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getIcon(g.icon, g.color)}
                  </div>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--color-gray-900)' }}>{g.title}</strong>
                    <div style={{ fontSize: '10px', color: 'var(--color-gray-500)' }}>
                      Target: {g.targetDate} • Priority: {g.priority}
                    </div>
                  </div>
                </div>
                <strong style={{ fontSize: '14px', color: g.color }}>{g.progress}% Completed</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 4: PREFERENCES & NOTIFICATIONS
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'preferences' && (
        <div className={styles.card} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              <Bell size={16} color="var(--color-primary)" />
              Notification & Practice Alert Settings
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '8px 0' }}>
            {notifications.map((n) => (
              <div
                key={n.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: 'var(--color-gray-50)',
                  borderRadius: '8px',
                  border: '1px solid var(--color-gray-200)',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-gray-800)' }}>
                  {n.label}
                </span>
                <input
                  type="checkbox"
                  checked={n.enabled}
                  onChange={() => toggleNotification(n.id)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 5: SECURITY & PRIVACY
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'security' && (
        <div className={styles.card} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              <Shield size={16} color="var(--color-primary)" />
              Account Security & Privacy Center
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '8px 0' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '14px', borderRadius: '8px' }}>
              <strong style={{ fontSize: '13px', color: 'var(--color-success)' }}>
                ✓ {securityData.status}
              </strong>
              <p style={{ fontSize: '11px', color: 'var(--color-gray-700)', margin: '4px 0 0' }}>
                Two-factor authentication (2FA) is active. {securityData.activeSessions}.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--color-gray-50)', borderRadius: '8px' }}>
              <div>
                <strong style={{ fontSize: '12px', color: 'var(--color-gray-900)' }}>Export Archive</strong>
                <p style={{ fontSize: '10px', color: 'var(--color-gray-500)', margin: 0 }}>
                  Download all your practice metrics, telemetry logs, and goal history.
                </p>
              </div>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => setShowExportModal(true)}
              >
                <Download size={13} />
                Export Data
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px' }}>
              <div>
                <strong style={{ fontSize: '12px', color: 'var(--color-error)' }}>Delete Account</strong>
                <p style={{ fontSize: '10px', color: 'var(--color-gray-600)', margin: 0 }}>
                  Permanently remove your account and all associated practice history.
                </p>
              </div>
              <button
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  background: 'var(--color-error)',
                  color: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Profile Modal ── */}
      {showEditModal && (
        <EditProfileModal
          profileData={profile}
          onClose={() => setShowEditModal(false)}
          onSave={(updated) => {
            // Persist to Firestore (optimistic update handled inside hook)
            updateProfile({ ...profile, ...updated });
            setShowEditModal(false);
          }}
        />
      )}

      {/* ── Add Goal Modal ── */}
      {showAddGoalModal && (
        <AddGoalModal
          onClose={() => setShowAddGoalModal(false)}
          onAddGoal={(newG) => {
            addGoal(newG);
            setShowAddGoalModal(false);
          }}
        />
      )}

      {/* ── AI Personalization Modal ── */}
      {showAiModal && (
        <AIPersonalizationModal
          data={aiSettings}
          onClose={() => setShowAiModal(false)}
          onSave={(updated) => {
            // Persist to Firestore
            updateAiSettings({ ...aiSettings, ...updated });
            setShowAiModal(false);
          }}
        />
      )}

      {/* ── Data Export Modal ── */}
      {showExportModal && (
        <DataExportModal
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* ── Delete Account / Reset Modal ── */}
      {showDeleteModal && (
        <DeleteAccountModal
          onClose={() => setShowDeleteModal(false)}
          onConfirmDelete={async () => {
            await resetAllData();
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}
