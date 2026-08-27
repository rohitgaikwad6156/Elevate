import { useState } from 'react';
import {
  Award,
  Sparkles,
  Clock,
  Bell,
  Gem,
  Info,
  ChevronRight,
  CheckCircle2,
  Lock,
  Flame,
  Target,
  Crown,
  BookOpen,
  Mic,
  CheckSquare,
  Dumbbell,
  BookA,
  Eye,
  Briefcase,
  Share2,
  Calendar,
  Layers,
  Activity,
  Rocket,
} from 'lucide-react';
import AchievementDetailModal from '../components/achievements/AchievementDetailModal';
import XPHistoryModal from '../components/achievements/XPHistoryModal';
import ShareAchievementModal from '../components/achievements/ShareAchievementModal';
import {
  userAchievementProfile,
  levelTiers,
  topStats,
  almostUnlockedList,
  recentlyUnlockedList,
  categoryStreaks,
  calendarDaysAugust,
  activeChallengeData,
  achievementCategoriesList,
  growthMilestonesList,
  allAchievementsLibrary,
  personalRecordsList,
} from '../data/achievementsData';
import styles from './Achievements.module.css';

export default function Achievements() {
  // Sub-Navigation tabs
  const [activeTab, setActiveTab] = useState('overview');

  // Badge library filters
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals state
  const [selectedAchievementModal, setSelectedAchievementModal] = useState(null);
  const [showXpModal, setShowXpModal] = useState(false);
  const [shareAchievementData, setShareAchievementData] = useState(null);

  // Icon mapper helper
  const getCategoryIcon = (iconName, color) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={16} color={color || '#3b82f6'} />;
      case 'Award': return <Award size={16} color={color || '#f59e0b'} />;
      case 'Target': return <Target size={16} color={color || '#ec4899'} />;
      case 'Crown': return <Crown size={16} color={color || '#10b981'} />;
      case 'BookOpen': return <BookOpen size={14} color={color || '#8b5cf6'} />;
      case 'Mic': return <Mic size={14} color={color || '#3b82f6'} />;
      case 'CheckSquare': return <CheckSquare size={14} color={color || '#10b981'} />;
      case 'Dumbbell': return <Dumbbell size={14} color={color || '#f59e0b'} />;
      case 'BookA': return <BookA size={14} color={color || '#3b82f6'} />;
      case 'Eye': return <Eye size={14} color={color || '#10b981'} />;
      case 'Briefcase': return <Briefcase size={14} color={color || '#06b6d4'} />;
      case 'Flame': return <Flame size={14} color={color || '#ef4444'} />;
      default: return <Award size={14} color="var(--color-primary)" />;
    }
  };

  const filteredBadges = allAchievementsLibrary.filter((b) => {
    if (selectedCategory === 'all') return true;
    return b.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className={styles.page}>
      {/* ── 1. Master Header ── */}
      <div className={styles.headerWrapper}>
        <div className={styles.headerInfo}>
          <div className={styles.titleRow}>
            <Award size={24} color="var(--color-primary)" />
            <h2 className={styles.pageTitle}>Achievements</h2>
          </div>
          <p className={styles.pageDesc}>
            Celebrate your wins. Unlock your full potential.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setShowXpModal(true)}
          >
            <Clock size={13} />
            <span>View XP History</span>
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            title="Notifications"
            onClick={() => setShowXpModal(true)}
          >
            <Bell size={14} />
          </button>
          <div className={styles.xpBadgeTop}>
            <Gem size={14} />
            <span>2,350 XP</span>
          </div>
        </div>
      </div>

      {/* ── Sub-Navigation Tabs ── */}
      <div className={styles.navTabs}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Award size={15} />
          Overview
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'badges' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('badges')}
        >
          <Crown size={15} />
          Badge Library
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'challenges' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('challenges')}
        >
          <Target size={15} />
          Challenges
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'streaks' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('streaks')}
        >
          <Flame size={15} />
          Streaks & Consistency
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'personal_records' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('personal_records')}
        >
          <Sparkles size={15} />
          Personal Records
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB 1: OVERVIEW (PIXEL-PERFECT MATCHING SCREENSHOT)
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <>
          {/* ── TOP ROW: Level 12 Stepper Card + Top Stats & Almost Unlocked ── */}
          <div className={styles.topRowGrid}>
            {/* Left: Level 12 & Stepper Card */}
            <div className={styles.levelCard}>
              <div className={styles.levelMainRow}>
                <div className={styles.levelBigCol}>
                  <span className={styles.levelLabel}>Level</span>
                  <span className={styles.levelNum}>12</span>
                </div>

                <div className={styles.medalHexagon}>
                  <Crown size={36} color="#ffffff" />
                </div>

                <div className={styles.levelProgressCol}>
                  <div className={styles.levelTitleRow}>
                    <span className={styles.levelTitleText}>ELEVATE Explorer</span>
                    <Info size={11} color="#c7d2fe" />
                  </div>
                  <span className={styles.levelXpText}>2,350 / 3,000 XP</span>
                  <div className={styles.levelBarTrack}>
                    <div
                      className={styles.levelBarFill}
                      style={{ width: `${userAchievementProfile.progressPercent}%` }}
                    />
                  </div>
                  <span className={styles.levelRemText}>650 XP to Level 13</span>
                </div>
              </div>

              {/* Bottom Tier Stepper Line */}
              <div className={styles.stepperLine}>
                {levelTiers.map((tier, idx) => (
                  <div key={idx} className={styles.stepNode}>
                    <div
                      className={`${styles.stepCircle} ${tier.current ? styles.stepActive : ''}`}
                    >
                      {tier.level}
                    </div>
                    <span className={styles.stepLabel}>{tier.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Top 4 Stats + Almost Unlocked Grid */}
            <div className={styles.topRightCol}>
              {/* 4 Top Stats */}
              <div className={styles.statsRow}>
                {topStats.map((st) => (
                  <div key={st.id} className={styles.statBox}>
                    <div
                      className={styles.statIconBox}
                      style={{ background: `${st.color}18` }}
                    >
                      {getCategoryIcon(st.icon, st.color)}
                    </div>
                    <div className={styles.statInfo}>
                      <span className={styles.statLabel}>{st.label}</span>
                      <span className={styles.statVal}>{st.value}</span>
                      <span className={styles.statSub}>{st.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Almost Unlocked Card */}
              <div className={styles.card} style={{ flex: 1 }}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>
                    Almost Unlocked <Info size={12} color="var(--color-gray-400)" />
                  </span>
                  <button
                    type="button"
                    className={styles.linkAction}
                    onClick={() => setActiveTab('badges')}
                  >
                    View All
                  </button>
                </div>

                <div className={styles.almostGrid}>
                  {almostUnlockedList.map((item) => (
                    <div
                      key={item.id}
                      className={styles.almostCard}
                      onClick={() =>
                        setSelectedAchievementModal({
                          title: item.title,
                          desc: item.desc,
                          xp: item.xpReward,
                          rarity: 'Rare',
                          unlocked: false,
                          progress: item.progress,
                        })
                      }
                    >
                      <div className={styles.almostHead}>
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            background: `${item.color}18`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {getCategoryIcon(item.icon, item.color)}
                        </div>
                        <span className={styles.almostTitle}>{item.title}</span>
                      </div>
                      <p className={styles.almostDesc}>{item.desc}</p>
                      <div className={styles.almostProgRow}>
                        <span>{item.progress}</span>
                        <span>{item.percent}%</span>
                      </div>
                      <div className={styles.almostBarTrack}>
                        <div
                          className={styles.almostBarFill}
                          style={{ width: `${item.percent}%`, background: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── MIDDLE ROW: Recently Unlocked (Left) + Streaks (Center) + Active Challenge (Right) ── */}
          <div className={styles.midRowGrid}>
            {/* Left: Recently Unlocked */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Recently Unlocked</span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setActiveTab('badges')}
                >
                  View All
                </button>
              </div>

              <div className={styles.recentList}>
                {recentlyUnlockedList.map((item) => (
                  <div
                    key={item.id}
                    className={styles.recentItem}
                    onClick={() => setSelectedAchievementModal(item)}
                  >
                    <div className={styles.recentLeft}>
                      <div className={styles.recentIconCircle}>
                        {getCategoryIcon(item.icon, item.color)}
                      </div>
                      <div className={styles.recentTextCol}>
                        <strong className={styles.recentTitle}>{item.title}</strong>
                        <span className={styles.recentDesc}>{item.desc}</span>
                      </div>
                    </div>
                    <div className={styles.recentRight}>
                      <span className={styles.recentXp}>{item.xp}</span>
                      <span className={styles.recentDate}>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Center: Streaks & Calendar */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  Streaks <Info size={12} color="var(--color-gray-400)" />
                </span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setActiveTab('streaks')}
                >
                  View All
                </button>
              </div>

              <div className={styles.streakHero}>
                <Flame size={36} color="var(--color-warning)" />
                <div>
                  <div className={styles.streakBigNum}>14</div>
                  <span className={styles.streakSubtitle}>Day Streak • Keep it going!</span>
                </div>
              </div>

              <div className={styles.categoryStreaksRow}>
                {categoryStreaks.map((cs, i) => (
                  <div key={i} className={styles.catStreakBox}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      {getCategoryIcon(cs.icon, cs.color)}
                      <span>{cs.label}</span>
                    </div>
                    <strong>{cs.days} days</strong>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-gray-500)', marginBottom: '4px' }}>
                <span>August 2026</span>
                <span>&lt; &gt;</span>
              </div>

              <div className={styles.calendarGrid}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={i} className={styles.calDayLabel}>{d}</span>
                ))}
                {calendarDaysAugust.map((cd, i) => (
                  <div
                    key={i}
                    className={`${styles.calDot} ${
                      cd.level === 3
                        ? styles.dotLevel3
                        : cd.level === 2
                        ? styles.dotLevel2
                        : styles.dotLevel0
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Active Challenge */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Active Challenge</span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setActiveTab('challenges')}
                >
                  View All
                </button>
              </div>

              <div className={styles.challengeRocketRow}>
                <div className={styles.rocketBadge}>
                  <Rocket size={22} color="#ffffff" />
                </div>
                <div className={styles.challengeTitleCol}>
                  <div className={styles.chTitle}>{activeChallengeData.title}</div>
                  <div className={styles.chSub}>{activeChallengeData.reward}</div>
                  <div className={styles.chTimeLeft}>⏱ {activeChallengeData.timeLeft}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-gray-600)', marginBottom: '4px' }}>
                <span>Progress: {activeChallengeData.progress}</span>
                <span>{activeChallengeData.percent}%</span>
              </div>
              <div style={{ height: '4px', background: 'var(--color-gray-200)', borderRadius: '999px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ height: '100%', width: `${activeChallengeData.percent}%`, background: '#8b5cf6' }} />
              </div>

              <div className={styles.chTasksList}>
                {activeChallengeData.tasks.map((t, idx) => (
                  <div key={idx} className={styles.chTaskItem}>
                    <div className={styles.chTaskLeft}>
                      {t.completed ? (
                        <CheckCircle2 size={13} color="var(--color-success)" />
                      ) : (
                        <div style={{ width: '13px', height: '13px', borderRadius: '50%', border: '1px solid var(--color-gray-400)' }} />
                      )}
                      <span>{t.title}</span>
                    </div>
                    <span className={styles.chTaskXp}>{t.xp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── BOTTOM ROW: Achievement Categories (Left) + Growth Milestones (Right) ── */}
          <div className={styles.bottomRowGrid}>
            {/* Left: Achievement Categories */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Achievement Categories</span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setActiveTab('badges')}
                >
                  View All
                </button>
              </div>

              <div className={styles.catChipsGrid}>
                {achievementCategoriesList.map((cat) => (
                  <div
                    key={cat.id}
                    className={styles.catChip}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveTab('badges');
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '4px',
                        background: `${cat.color}18`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {getCategoryIcon(cat.icon, cat.color)}
                    </div>
                    <div className={styles.catChipInfo}>
                      <span className={styles.catChipName}>{cat.name}</span>
                      <span className={styles.catChipCount}>{cat.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Growth Milestones */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Growth Milestones</span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setActiveTab('badges')}
                >
                  View All
                </button>
              </div>

              <div className={styles.milestonesGrid}>
                {growthMilestonesList.map((m, idx) => (
                  <div
                    key={idx}
                    className={`${styles.milestoneMedalCard} ${
                      m.status === 'completed'
                        ? styles.medalCompleted
                        : m.status === 'active'
                        ? styles.medalActive
                        : styles.medalLocked
                    }`}
                  >
                    {m.status === 'completed' && <CheckCircle2 size={24} color="var(--color-success)" />}
                    {m.status === 'active' && <Crown size={24} color="#eab308" />}
                    {m.status === 'locked' && <Lock size={20} color="var(--color-gray-400)" />}

                    <span style={{ fontSize: '9px', color: 'var(--color-gray-500)' }}>Overall Growth</span>
                    <span className={styles.milestoneScoreNum}>{m.score}</span>
                    <span className={styles.milestoneStatusLabel}>
                      {m.status === 'completed' ? '✓ Completed' : m.progress || 'Locked'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 2: BADGE LIBRARY
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'badges' && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Complete Badge Library</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['all', 'english', 'speaking', 'fitness', 'interview', 'learning'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  style={{
                    padding: '2px 8px',
                    borderRadius: '999px',
                    border: '1px solid var(--color-gray-300)',
                    background: selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-white)',
                    color: selectedCategory === cat ? '#ffffff' : 'var(--color-gray-700)',
                    fontSize: '10px',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {filteredBadges.map((b) => (
              <div
                key={b.id}
                style={{
                  background: b.unlocked ? 'var(--color-white)' : 'var(--color-gray-50)',
                  border: '1px solid var(--color-gray-200)',
                  borderRadius: '8px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  opacity: b.unlocked ? 1 : 0.6,
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedAchievementModal(b)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Award size={20} color={b.unlocked ? 'var(--color-primary)' : 'var(--color-gray-400)'} />
                  <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--color-primary)' }}>+{b.xp} XP</span>
                </div>
                <strong style={{ fontSize: '12px', color: 'var(--color-gray-900)' }}>{b.title}</strong>
                <p style={{ fontSize: '10px', color: 'var(--color-gray-600)', margin: 0 }}>{b.desc}</p>
                <div style={{ fontSize: '9px', color: 'var(--color-gray-500)', marginTop: 'auto' }}>
                  {b.unlocked ? '✓ Unlocked' : b.progress}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 3: CHALLENGES
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'challenges' && (
        <div className={styles.card} style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              <Target size={16} color="var(--color-primary)" />
              Active & AI-Generated Challenges
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'linear-gradient(135deg, #2e1065, #4c1d95)', color: '#ffffff', padding: '16px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '14px' }}>🔥 Weekly Challenge: Communication Week</strong>
                <span style={{ fontSize: '11px', color: '#fef08a' }}>+250 XP</span>
              </div>
              <p style={{ fontSize: '12px', color: '#c4b5fd', margin: '4px 0 8px' }}>
                Complete speaking, lessons, and interview drills to master concise phrasing.
              </p>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '66%', background: '#a855f7' }} />
              </div>
            </div>

            <div style={{ background: 'var(--color-gray-50)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-gray-200)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '13px', color: 'var(--color-gray-900)' }}>✨ AI Challenge: 5-Day 60-Second Speech Sprint</strong>
                <span style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 'bold' }}>+300 XP</span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--color-gray-600)', margin: '4px 0' }}>
                Targeted exercise to reduce filler words and improve executive presence under time limits.
              </p>
              <button
                type="button"
                className={styles.btnSecondary}
                style={{ marginTop: '8px' }}
                onClick={() => alert('AI Challenge Activated!')}
              >
                Accept Challenge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 4: STREAKS & CONSISTENCY
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'streaks' && (
        <div className={styles.card} style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              <Flame size={16} color="var(--color-warning)" />
              Streak Milestones & Consistency Calendar
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
            {['3 Days', '7 Days', '14 Days ✓', '30 Days', '60 Days', '90 Days', '180 Days', '365 Days'].map((s, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--color-gray-50)',
                  border: '1px solid var(--color-gray-200)',
                  borderRadius: '6px',
                  padding: '8px',
                  textAlign: 'center',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: s.includes('✓') ? 'var(--color-success)' : 'var(--color-gray-600)',
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 5: PERSONAL RECORDS
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'personal_records' && (
        <div className={styles.card} style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              <Sparkles size={16} color="var(--color-primary)" />
              Personal Records & Bests
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {personalRecordsList.map((pr, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'var(--color-gray-50)',
                  borderRadius: '6px',
                  border: '1px solid var(--color-gray-200)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: '12px', color: 'var(--color-gray-900)' }}>{pr.title}</strong>
                  <span style={{ fontSize: '10px', color: 'var(--color-gray-500)' }}>{pr.date}</span>
                </div>
                <strong style={{ fontSize: '13px', color: 'var(--color-primary)' }}>{pr.value}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Achievement Detail Modal ── */}
      {selectedAchievementModal && (
        <AchievementDetailModal
          achievement={selectedAchievementModal}
          onClose={() => setSelectedAchievementModal(null)}
          onShare={(ach) => {
            setSelectedAchievementModal(null);
            setShareAchievementData(ach);
          }}
        />
      )}

      {/* ── XP History Modal ── */}
      {showXpModal && (
        <XPHistoryModal
          onClose={() => setShowXpModal(false)}
        />
      )}

      {/* ── Share Achievement Modal ── */}
      {shareAchievementData && (
        <ShareAchievementModal
          achievement={shareAchievementData}
          onClose={() => setShareAchievementData(null)}
        />
      )}
    </div>
  );
}
