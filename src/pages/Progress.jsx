import { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  Download,
  Share2,
  ChevronRight,
  Info,
  Sparkles,
  Bot,
  User,
  Clock,
  CheckCircle2,
  Target,
  Award,
  Flame,
  Zap,
  BookA,
  Mic,
  Eye,
  Dumbbell,
  Briefcase,
  BookOpen,
  CheckSquare,
  Activity,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import GrowthRadarChart from '../components/progress/GrowthRadarChart';
import GrowthTrendChart from '../components/progress/GrowthTrendChart';
import ScoreTransparencyModal from '../components/progress/ScoreTransparencyModal';
import GrowthPlanModal from '../components/progress/GrowthPlanModal';
import CategoryDetailModal from '../components/progress/CategoryDetailModal';
import {
  overallGrowthScore,
  growthScoreBreakdown,
  skillRadarData,
  aiGrowthInsights,
  yourGrowthStory,
  yourStrengths,
  whereYouCanImprove,
  whatShouldYouDoNext,
  bottomTelemetry,
  categoryDetailedData,
  growthTimeline,
  habitCorrelations,
} from '../data/progressData';
import styles from './Progress.module.css';

export default function Progress() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('overview');

  // Trend chart range state
  const [trendRange, setTrendRange] = useState('30D');

  // Modals state
  const [showTransparencyModal, setShowTransparencyModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedCategoryModal, setSelectedCategoryModal] = useState(null);

  // Icon mapper helper
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'BookA': return <BookA size={14} color="#3b82f6" />;
      case 'Mic': return <Mic size={14} color="#8b5cf6" />;
      case 'Eye': return <Eye size={14} color="#f59e0b" />;
      case 'Dumbbell': return <Dumbbell size={14} color="#10b981" />;
      case 'Briefcase': return <Briefcase size={14} color="#ec4899" />;
      case 'BookOpen': return <BookOpen size={14} color="#6366f1" />;
      case 'CheckSquare': return <CheckSquare size={14} color="#f97316" />;
      case 'Flame': return <Flame size={14} color="#ef4444" />;
      default: return <Activity size={14} color="var(--color-primary)" />;
    }
  };

  const handleOpenCategoryDetail = (catId) => {
    const detail = categoryDetailedData[catId] || categoryDetailedData.speaking;
    setSelectedCategoryModal(detail);
  };

  return (
    <div className={styles.page}>
      {/* ── 1. Master Header ── */}
      <div className={styles.headerWrapper}>
        <div className={styles.headerInfo}>
          <h2 className={styles.pageTitle}>Progress Overview</h2>
          <p className={styles.pageDesc}>
            Track your growth across all areas. Understand your progress. Take action.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button type="button" className={styles.datePickerBtn}>
            <Calendar size={13} />
            <span>This Month (Aug 1 – Aug 24)</span>
          </button>
          <button
            type="button"
            className={styles.iconActionBtn}
            title="Export Growth Report"
            onClick={() => setShowPlanModal(true)}
          >
            <Download size={14} />
          </button>
          <button
            type="button"
            className={styles.iconActionBtn}
            title="Share Progress"
            onClick={() => setShowTransparencyModal(true)}
          >
            <Share2 size={14} />
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
          <Activity size={15} />
          Progress Overview
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'timeline' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          <Clock size={15} />
          Growth Timeline
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'habits' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('habits')}
        >
          <Sparkles size={15} />
          Habit Patterns & Results
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB 1: PROGRESS OVERVIEW (MATCHING SCREENSHOT)
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <>
          {/* ── TOP ROW: Overall Score (Card 1) + Breakdown (Card 2) + Radar (Card 3) ── */}
          <div className={styles.grid3Col}>
            {/* Card 1: Overall Growth Score */}
            <div
              className={styles.card}
              style={{ cursor: 'pointer' }}
              onClick={() => setShowTransparencyModal(true)}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  Overall Growth Score <Info size={13} color="var(--color-gray-400)" />
                </span>
              </div>

              <div className={styles.scoreRow}>
                <div className={styles.scoreValCol}>
                  <div className={styles.scoreHuge}>
                    {overallGrowthScore.score}
                    <span className={styles.scoreMax}> / 100</span>
                  </div>
                  <span className={styles.scoreTrendPill}>
                    ↑ {overallGrowthScore.improvement}
                  </span>
                  <div className={styles.statusPill}>
                    <TrendingUp size={12} />
                    <span>{overallGrowthScore.status}</span>
                  </div>
                </div>

                {/* Circular Gauge Ring */}
                <div className={styles.ringGauge}>
                  <svg className={styles.ringSvg} viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="var(--color-gray-100)"
                      strokeWidth="3.2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="var(--color-primary)"
                      strokeWidth="3.2"
                      strokeDasharray={`${overallGrowthScore.score}, 100`}
                    />
                  </svg>
                  <div className={styles.ringCenterText}>
                    <span className={styles.ringNum}>{overallGrowthScore.score}</span>
                    <span className={styles.ringSub}>of 100</span>
                  </div>
                </div>
              </div>

              <p className={styles.scoreDesc}>{overallGrowthScore.description}</p>
            </div>

            {/* Card 2: Growth Score Breakdown */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  Growth Score Breakdown <Info size={13} color="var(--color-gray-400)" />
                </span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setShowTransparencyModal(true)}
                >
                  View All
                </button>
              </div>

              <div className={styles.breakdownGrid}>
                {growthScoreBreakdown.map((item) => (
                  <div
                    key={item.id}
                    className={styles.breakdownItem}
                    onClick={() => handleOpenCategoryDetail(item.id)}
                  >
                    <div className={styles.itemIconBox}>
                      {getCategoryIcon(item.icon)}
                    </div>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemLabel}>{item.label}</span>
                      <div className={styles.itemScoreRow}>
                        <span className={styles.itemScore}>{item.score}%</span>
                        <span className={styles.itemTrend}>{item.trend}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Skill Radar */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  Skill Radar <Info size={13} color="var(--color-gray-400)" />
                </span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setShowTransparencyModal(true)}
                >
                  View Details
                </button>
              </div>

              <GrowthRadarChart data={skillRadarData} />
            </div>
          </div>

          {/* ── MIDDLE ROW: Trend Chart (Card 4) + AI Insights (Card 5) + Growth Story (Card 6) ── */}
          <div className={styles.grid3Col}>
            {/* Card 4: Your Growth Over Time */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  Your Growth Over Time <Info size={13} color="var(--color-gray-400)" />
                </span>
              </div>

              <GrowthTrendChart
                selectedRange={trendRange}
                onSelectRange={(r) => setTrendRange(r)}
              />
            </div>

            {/* Card 5: AI Growth Insights */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  <Sparkles size={14} color="var(--color-primary)" />
                  AI Growth Insights <Info size={13} color="var(--color-gray-400)" />
                </span>
                <span className={styles.aiInsightBadge}>{aiGrowthInsights.badge}</span>
              </div>

              <p className={styles.insightNarrative}>{aiGrowthInsights.text}</p>

              <div className={styles.insightPointsList}>
                <div className={styles.insightPoint}>
                  <div className={styles.pointLeft}>
                    <Mic size={14} color="var(--color-primary)" />
                    <span>Biggest Win: <strong>{aiGrowthInsights.biggestWin.title}</strong></span>
                  </div>
                  <span className={styles.pointVal}>{aiGrowthInsights.biggestWin.value}</span>
                </div>

                <div className={styles.insightPoint}>
                  <div className={styles.pointLeft}>
                    <Eye size={14} color="var(--color-warning)" />
                    <span>Biggest Opportunity: <strong>{aiGrowthInsights.biggestOpportunity.title}</strong></span>
                  </div>
                  <span className={styles.pointValWarn}>{aiGrowthInsights.biggestOpportunity.value}</span>
                </div>

                <div className={styles.insightPoint}>
                  <div className={styles.pointLeft}>
                    <Award size={14} color="var(--color-primary)" />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span><strong>{aiGrowthInsights.recommendedFocus.title}</strong></span>
                      <span style={{ fontSize: '10px', color: 'var(--color-gray-500)' }}>
                        {aiGrowthInsights.recommendedFocus.description}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className={styles.btnPrimaryFull}
                onClick={() => setShowPlanModal(true)}
              >
                View Recommended Plan
              </button>
            </div>

            {/* Card 6: Your Growth Story */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  Your Growth Story <Info size={13} color="var(--color-gray-400)" />
                </span>
              </div>

              <div className={styles.quoteBox}>
                "{yourGrowthStory.narrative}"
              </div>

              <div className={styles.coachFooter}>
                <div className={styles.coachAvatar}>
                  <User size={18} color="var(--color-primary)" />
                </div>
                <div className={styles.coachNameCol}>
                  <span className={styles.coachName}>{yourGrowthStory.coachTitle}</span>
                  <span className={styles.coachSub}>{yourGrowthStory.coachSubtitle}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM ROW: Strengths (Card 7) + Improvements (Card 8) + Next Steps (Card 9) ── */}
          <div className={styles.grid3Col}>
            {/* Card 7: Your Strengths */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  Your Strengths <Info size={13} color="var(--color-gray-400)" />
                </span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setShowTransparencyModal(true)}
                >
                  View All
                </button>
              </div>

              <div className={styles.strengthList}>
                {yourStrengths.map((s, idx) => (
                  <div key={idx} className={styles.strengthItem}>
                    <div className={styles.strengthLeft}>
                      <div className={styles.strengthTitleRow}>
                        <span className={styles.strengthRank}>{s.rank}</span>
                        <span className={styles.strengthTitle}>{s.title}</span>
                      </div>
                      <span className={styles.strengthReason}>{s.reason}</span>
                    </div>
                    <span className={styles.strengthScore}>{s.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 8: Where You Can Improve */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  Where You Can Improve <Info size={13} color="var(--color-gray-400)" />
                </span>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={() => setShowPlanModal(true)}
                >
                  View All
                </button>
              </div>

              <div className={styles.oppList}>
                {whereYouCanImprove.map((item) => (
                  <div
                    key={item.id}
                    className={styles.oppItem}
                    onClick={() => handleOpenCategoryDetail(item.id)}
                  >
                    <div className={styles.oppLeft}>
                      <div className={styles.oppTitleRow}>
                        <span className={styles.oppTitle}>{item.title}</span>
                        <span className={styles.oppScore}>{item.score}%</span>
                      </div>
                      <span className={styles.oppSub}>{item.opportunity}</span>
                    </div>
                    <ChevronRight size={15} color="var(--color-gray-400)" />
                  </div>
                ))}
              </div>
            </div>

            {/* Card 9: What Should You Do Next? */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  What Should You Do Next? <Info size={13} color="var(--color-gray-400)" />
                </span>
              </div>

              <div className={styles.nextStepsList}>
                {whatShouldYouDoNext.map((step) => (
                  <div
                    key={step.step}
                    className={styles.nextStepItem}
                    onClick={() => setShowPlanModal(true)}
                  >
                    <div className={styles.nextStepLeft}>
                      <div className={styles.stepNumBox}>{step.step}</div>
                      <div className={styles.stepInfo}>
                        <span className={styles.stepAction}>{step.action}</span>
                        <span className={styles.stepTitle}>{step.title}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span className={styles.stepDur}>{step.duration}</span>
                      <ChevronRight size={13} color="var(--color-gray-400)" />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className={styles.btnPrimaryFull}
                onClick={() => setShowPlanModal(true)}
              >
                View Full Plan
              </button>
            </div>
          </div>

          {/* ── BOTTOM TELEMETRY STRIP ── */}
          <div className={styles.telemetryStrip}>
            <div className={styles.telemetryItem}>
              <Clock size={16} className={styles.telemetryIcon} />
              <div className={styles.telemetryTextCol}>
                <span className={styles.telemetryLabel}>Practice Time</span>
                <span className={styles.telemetryVal}>{bottomTelemetry.practiceTime}</span>
              </div>
            </div>

            <div className={styles.telemetryItem}>
              <CheckCircle2 size={16} className={styles.telemetryIcon} />
              <div className={styles.telemetryTextCol}>
                <span className={styles.telemetryLabel}>Sessions Completed</span>
                <span className={styles.telemetryVal}>{bottomTelemetry.sessionsCompleted}</span>
              </div>
            </div>

            <div className={styles.telemetryItem}>
              <Target size={16} className={styles.telemetryIcon} />
              <div className={styles.telemetryTextCol}>
                <span className={styles.telemetryLabel}>Goals Completed</span>
                <span className={styles.telemetryVal}>{bottomTelemetry.goalsCompleted}</span>
              </div>
            </div>

            <div className={styles.telemetryItem}>
              <Award size={16} className={styles.telemetryIcon} />
              <div className={styles.telemetryTextCol}>
                <span className={styles.telemetryLabel}>XP Earned</span>
                <span className={styles.telemetryVal}>{bottomTelemetry.xpEarned}</span>
              </div>
            </div>

            <div className={styles.telemetryItem}>
              <Flame size={16} color="var(--color-warning)" />
              <div className={styles.telemetryTextCol}>
                <span className={styles.telemetryLabel}>Current Streak</span>
                <span className={styles.telemetryVal}>{bottomTelemetry.currentStreak}</span>
              </div>
            </div>

            <div
              className={styles.telemetryItem}
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPlanModal(true)}
            >
              <Award size={16} color="var(--color-primary)" />
              <div className={styles.telemetryTextCol}>
                <span className={styles.telemetryLabel}>Next Milestone</span>
                <span className={styles.telemetryVal}>{bottomTelemetry.nextMilestone}</span>
              </div>
              <ChevronRight size={14} color="var(--color-gray-400)" />
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 2: GROWTH TIMELINE
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'timeline' && (
        <div className={styles.card} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              <Clock size={16} color="var(--color-primary)" />
              Chronological Growth Timeline
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '8px 0' }}>
            {growthTimeline.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'var(--color-gray-50)',
                  borderRadius: '8px',
                  border: '1px solid var(--color-gray-200)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-primary)', width: '60px' }}>
                    {item.date}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ fontSize: '13px', color: 'var(--color-gray-900)' }}>{item.event}</strong>
                    <span style={{ fontSize: '10px', color: 'var(--color-gray-500)' }}>Category: {item.category}</span>
                  </div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-gray-900)' }}>
                  {item.score}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 3: HABIT PATTERNS & RESULTS
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'habits' && (
        <div className={styles.card} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              <Sparkles size={16} color="var(--color-primary)" />
              Observed Habit Correlations & Outcomes
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '8px 0' }}>
            {habitCorrelations.map((hc, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, var(--color-primary-bg), var(--color-white))',
                  borderRadius: '8px',
                  border: '1px solid var(--color-primary-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--color-gray-900)' }}>{hc.habit}</strong>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-success)' }}>
                    → {hc.result}
                  </span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--color-gray-700)', margin: 0 }}>
                  <strong>Evidence: </strong>{hc.evidence}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Score Transparency Modal ── */}
      {showTransparencyModal && (
        <ScoreTransparencyModal
          onClose={() => setShowTransparencyModal(false)}
        />
      )}

      {/* ── Growth Plan Modal ── */}
      {showPlanModal && (
        <GrowthPlanModal
          onClose={() => setShowPlanModal(false)}
          onAccept={() => setShowPlanModal(false)}
        />
      )}

      {/* ── Category Detail Modal ── */}
      {selectedCategoryModal && (
        <CategoryDetailModal
          categoryData={selectedCategoryModal}
          onClose={() => setSelectedCategoryModal(null)}
        />
      )}
    </div>
  );
}
