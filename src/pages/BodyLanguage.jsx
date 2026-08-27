import { useState } from 'react';
import {
  Camera,
  Eye,
  PersonStanding,
  Smile,
  Hand,
  Activity,
  Award,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Compass,
  Layers,
  ChevronRight,
  Shield,
  Clock,
  Flame,
  HelpCircle,
  Sliders,
  Settings,
} from 'lucide-react';
import BodyLanguageRadarChart from '../components/bodyLanguage/BodyLanguageRadarChart';
import CameraPracticeModal from '../components/bodyLanguage/CameraPracticeModal';
import BodyLanguageAnalysisModal from '../components/bodyLanguage/BodyLanguageAnalysisModal';
import CameraSetupModal from '../components/bodyLanguage/CameraSetupModal';
import ScoringExplanationModal from '../components/bodyLanguage/ScoringExplanationModal';
import {
  bodyLanguageProfile,
  overallScoreData,
  performanceMetrics,
  aiPresenceCoach,
  quickPracticeCards,
  cameraPracticeModes,
  cameraDurations,
  postureAnalysisData,
  eyeContactData,
  facialExpressionData,
  gestureData,
  radarSkillsData,
  weaknessOpportunities,
  structuredDrillsLibrary,
  dailyPresenceChallenge,
  recentSessionsList,
  subtleAchievements,
} from '../data/bodyLanguageData';
import styles from './BodyLanguage.module.css';

export default function BodyLanguage() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('overview');

  // Camera Workspace selection state
  const [selectedMode, setSelectedMode] = useState('confidence');
  const [selectedDuration, setSelectedDuration] = useState(120);

  // Modals state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [activePracticeTopic, setActivePracticeTopic] = useState('');
  const [analyzedSession, setAnalyzedSession] = useState(null);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  // Handlers for launching camera practice
  const handleLaunchCamera = (topicTitle) => {
    setActivePracticeTopic(topicTitle || `${selectedMode.toUpperCase()} Practice Session`);
    setIsCameraActive(true);
  };

  const handleFinishCameraSession = (recordingMeta) => {
    setIsCameraActive(false);
    const newSession = {
      ...recentSessionsList[0],
      id: `bl-sess-${Date.now()}`,
      topic: activePracticeTopic,
      duration: recordingMeta.formattedTime,
      date: 'Just now',
      scores: {
        ...recentSessionsList[0].scores,
        eyeContact: recordingMeta.avgEyeContact,
      },
    };
    setAnalyzedSession(newSession);
  };

  return (
    <div className={styles.page}>
      {/* ── 1. Header ── */}
      <div className={styles.headerWrapper}>
        <div className={styles.headerInfo}>
          <div className={styles.titleRow}>
            <h2 className={styles.pageTitle}>Body Language</h2>
            <span className={styles.levelBadge}>
              <Award size={13} />
              {bodyLanguageProfile.level}
            </span>
          </div>
          <p className={styles.pageDesc}>
            Build confident presence through posture, eye contact, expression, and movement. See how you communicate without words.
          </p>
          <div className={styles.levelProgressRow}>
            <div className={styles.levelProgressBar}>
              <div
                className={styles.levelProgressFill}
                style={{ width: `${bodyLanguageProfile.progressToNext}%` }}
              />
            </div>
            <span>{bodyLanguageProfile.progressToNext}% to {bodyLanguageProfile.nextLevel}</span>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setShowSetupModal(true)}
          >
            <Settings size={15} />
            Setup Check
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => handleLaunchCamera('Executive Confidence Camera Practice')}
          >
            <Camera size={16} />
            Start Camera Practice
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
          <Compass size={15} />
          Overview
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'camera_practice' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('camera_practice')}
        >
          <Camera size={15} />
          Camera Practice Studio
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'posture' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('posture')}
        >
          <PersonStanding size={15} />
          Posture
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'eye_contact' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('eye_contact')}
        >
          <Eye size={15} />
          Eye Contact
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'expression' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('expression')}
        >
          <Smile size={15} />
          Facial Expression
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'gestures' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('gestures')}
        >
          <Hand size={15} />
          Gestures & Movement
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'drills' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('drills')}
        >
          <Layers size={15} />
          Drills Library
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'progress' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          <TrendingUp size={15} />
          Skill Radar & Heatmap
        </button>
      </div>

      {/* ── 2. Body Language Score + 6 Performance Cards ── */}
      <div className={styles.scoreRow}>
        {/* Central Score Card */}
        <div
          className={styles.scoreHeroCard}
          onClick={() => setShowScoreModal(true)}
          title="Click to view scoring methodology"
        >
          <span className={styles.scoreSubLabel}>Body Language Score</span>
          <div className={styles.scoreBigNum}>{overallScoreData.currentScore}</div>
          <span className={styles.scoreTrendBadge}>{overallScoreData.monthlyImprovement}</span>
          <span className={styles.scoreCalcHint}>View Scoring Breakdown</span>
        </div>

        {/* 6 Performance Metrics */}
        <div className={styles.perfGrid}>
          {performanceMetrics.map((m) => (
            <div key={m.id} className={styles.perfCard} title={m.coachingNote}>
              <span className={styles.perfLabel}>{m.label}</span>
              <span className={styles.perfScore}>{m.score}%</span>
              <div className={styles.perfBarTrack}>
                <div
                  className={styles.perfBarFill}
                  style={{ width: `${m.score}%` }}
                />
              </div>
              <span className={styles.perfTrend}>{m.trend}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB 1: OVERVIEW
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <>
          {/* AI Presence Coach + Daily Presence Challenge */}
          <div className={styles.twoCol}>
            {/* AI Presence Coach */}
            <div className={styles.aiCoachCard}>
              <div className={styles.sectionTitleRow}>
                <Sparkles size={18} className={styles.sectionIcon} />
                <h3 className={styles.aiCoachTitle}>{aiPresenceCoach.title}</h3>
                <span className={styles.sectionBadge}>Priority: {aiPresenceCoach.priority}</span>
              </div>

              <div className={styles.aiCoachQuote}>
                "{aiPresenceCoach.recommendation}"
              </div>

              <div className={styles.whyMattersBox}>
                <strong>Why this matters: </strong>
                {aiPresenceCoach.whyItMatters}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleLaunchCamera('Camera Eye Contact Calibration Drill')}
                >
                  <Play size={14} />
                  {aiPresenceCoach.actionLabel}
                </button>
              </div>
            </div>

            {/* Daily Presence Challenge */}
            <div className={styles.challengeCard}>
              <div className={styles.sectionTitleRow}>
                <Flame size={18} color="var(--color-warning)" />
                <h3 className={styles.challengeTitle}>🔥 Today's Presence Challenge</h3>
                <span className={styles.sectionBadge} style={{ background: '#fef3c7', color: '#b45309' }}>
                  {dailyPresenceChallenge.rewardXp}
                </span>
              </div>

              <strong style={{ fontSize: '14px', color: 'var(--color-gray-900)' }}>
                "{dailyPresenceChallenge.title}"
              </strong>

              <p className={styles.challengeDesc}>{dailyPresenceChallenge.description}</p>

              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--color-gray-600)' }}>
                <span>Duration: <strong>{dailyPresenceChallenge.duration}</strong></span>
                <span>Goal: <strong>{dailyPresenceChallenge.targetScore}</strong></span>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleLaunchCamera(dailyPresenceChallenge.title)}
                >
                  <Play size={14} />
                  Start 60s Challenge
                </button>
              </div>
            </div>
          </div>

          {/* Quick Practice 5 Cards */}
          <div className={styles.fullRow}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleRow}>
                  <Clock size={18} className={styles.sectionIcon} />
                  <div>
                    <h3 className={styles.sectionTitle}>Quick Practice</h3>
                    <p className={styles.sectionSubtitle}>Targeted micro-drills to calibrate your visual presence in under 2 minutes</p>
                  </div>
                </div>
                <span className={styles.sectionBadge}>Micro Drills</span>
              </div>

              <div className={styles.quickDrillsGrid}>
                {quickPracticeCards.map((qp) => (
                  <div key={qp.id} className={styles.drillCard}>
                    <div className={styles.drillIconBox}>
                      {qp.icon === 'Camera' && <Camera size={16} />}
                      {qp.icon === 'Eye' && <Eye size={16} />}
                      {qp.icon === 'PersonStanding' && <PersonStanding size={16} />}
                      {qp.icon === 'Smile' && <Smile size={16} />}
                      {qp.icon === 'Hand' && <Hand size={16} />}
                    </div>
                    <span className={styles.drillTitle}>{qp.title}</span>
                    <span className={styles.drillDesc}>{qp.description}</span>
                    <div className={styles.drillMeta}>
                      <span>{qp.duration}</span>
                      <span>{qp.difficulty}</span>
                    </div>
                    <button
                      type="button"
                      className={styles.btnSecondary}
                      style={{ marginTop: '4px', width: '100%', justifyContent: 'center', fontSize: '11px' }}
                      onClick={() => handleLaunchCamera(qp.title)}
                    >
                      Start Drill
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weaknesses + Recent Sessions */}
          <div className={styles.twoCol}>
            {/* Weakness Opportunities */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleRow}>
                  <AlertCircle size={18} className={styles.sectionIcon} />
                  <div>
                    <h3 className={styles.sectionTitle}>Your Biggest Opportunities</h3>
                    <p className={styles.sectionSubtitle}>Observable friction points detected in recent sessions</p>
                  </div>
                </div>
                <span className={styles.sectionBadge}>3 Focus Areas</span>
              </div>

              <div className={styles.weaknessList}>
                {weaknessOpportunities.map((w) => (
                  <div key={w.id} className={styles.weaknessCard}>
                    <div className={styles.weaknessTop}>
                      <span className={styles.weaknessTitle}>{w.title}</span>
                      <span className={styles.weaknessScore}>{w.score}</span>
                    </div>
                    <p className={styles.weaknessWhy}>{w.whyItMatters}</p>
                    <div className={styles.weaknessFix}>
                      <strong>Fix: </strong>{w.howToFix}
                    </div>
                    <div style={{ alignSelf: 'flex-end', marginTop: '2px' }}>
                      <button
                        type="button"
                        className={styles.btnSecondary}
                        style={{ fontSize: '11px', padding: '2px 8px' }}
                        onClick={() => handleLaunchCamera(`Targeted Drill: ${w.drill}`)}
                      >
                        Practice {w.drill}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Sessions List */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleRow}>
                  <Clock size={18} className={styles.sectionIcon} />
                  <div>
                    <h3 className={styles.sectionTitle}>Recent Camera Sessions</h3>
                    <p className={styles.sectionSubtitle}>Click any session to inspect detailed nonverbal analysis</p>
                  </div>
                </div>
                <span className={styles.sectionBadge}>{recentSessionsList.length} Sessions</span>
              </div>

              <div className={styles.sessionList}>
                {recentSessionsList.map((sess) => (
                  <div
                    key={sess.id}
                    className={styles.sessionItem}
                    onClick={() => setAnalyzedSession(sess)}
                  >
                    <div className={styles.sessionInfo}>
                      <p className={styles.sessionTopic}>{sess.topic}</p>
                      <p className={styles.sessionMeta}>
                        {sess.date} • {sess.duration} • {sess.type}
                      </p>
                    </div>
                    <div className={styles.sessionScoreBox}>
                      <span className={styles.sessionScore}>{sess.overallScore}</span>
                      <span className={styles.sessionImprovement}>{sess.improvement}</span>
                      <ChevronRight size={16} color="var(--color-gray-400)" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements Row */}
          <div className={styles.fullRow}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleRow}>
                  <Award size={18} className={styles.sectionIcon} />
                  <h3 className={styles.sectionTitle}>Presence Milestones</h3>
                </div>
                <span className={styles.sectionBadge}>4 / 5 Unlocked</span>
              </div>

              <div className={styles.achievementsGrid}>
                {subtleAchievements.map((ach) => (
                  <div
                    key={ach.id}
                    className={`${styles.achievementCard} ${!ach.unlocked ? styles.achLocked : ''}`}
                  >
                    <span className={styles.achIcon}>{ach.icon}</span>
                    <span className={styles.achTitle}>{ach.title}</span>
                    <span className={styles.achDesc}>{ach.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 2: CAMERA PRACTICE STUDIO
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'camera_practice' && (
        <div className={styles.fullRow}>
          <div className={styles.workspaceCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Camera size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Camera Practice Workspace</h3>
                  <p className={styles.sectionSubtitle}>Practice your nonverbal presence while AI analyzes posture, eye contact, and gestures</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Studio Calibration</span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Select Presence Mode</label>
              <div className={styles.chipGrid}>
                {cameraPracticeModes.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    className={`${styles.chipBtn} ${
                      selectedMode === mode.id ? styles.chipBtnActive : ''
                    }`}
                    onClick={() => setSelectedMode(mode.id)}
                  >
                    <span className={styles.chipTitle}>{mode.name}</span>
                    <span className={styles.chipDesc}>{mode.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Select Session Duration</label>
              <div className={styles.durationRow}>
                {cameraDurations.map((d) => (
                  <button
                    key={d.seconds}
                    type="button"
                    className={`${styles.durationBtn} ${
                      selectedDuration === d.seconds ? styles.durationBtnActive : ''
                    }`}
                    onClick={() => setSelectedDuration(d.seconds)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => setShowSetupModal(true)}
              >
                <Settings size={15} />
                Setup Assistant
              </button>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => handleLaunchCamera(`${selectedMode.toUpperCase()} Practice Session`)}
              >
                <Camera size={16} />
                Start Live Camera Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 3: POSTURE ANALYSIS & GUIDE
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'posture' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <PersonStanding size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Posture & Alignment Telemetry</h3>
                  <p className={styles.sectionSubtitle}>Head position, shoulder symmetry, and spine neutrality</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Score: {postureAnalysisData.score}/100</span>
            </div>

            <div className={styles.postureGuideBox} style={{ marginBottom: '16px' }}>
              <div className={styles.guideCol}>
                <span className={styles.guideColTitle}>Alignment Telemetry</span>
                {postureAnalysisData.breakdown.map((item) => (
                  <div key={item.aspect} className={styles.guideItem}>
                    <CheckCircle2 size={14} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>{item.aspect}: </strong>
                      <span style={{ color: 'var(--color-gray-600)' }}>{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.guideCol}>
                <span className={styles.guideColTitle}>AI Ergonomic Prescription</span>
                <div style={{ padding: '12px', background: 'var(--color-primary-bg)', borderRadius: '6px', fontSize: '12px', color: 'var(--color-primary-dark)', lineHeight: '1.5' }}>
                  {postureAnalysisData.aiRecommendation}
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <button
                    type="button"
                    className={styles.btnPrimary}
                    onClick={() => handleLaunchCamera('Neutral Posture Calibration Drill')}
                  >
                    <Play size={14} />
                    Practice Posture Reset Drill
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 4: EYE CONTACT TELEMETRY
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'eye_contact' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Eye size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Eye Contact Gaze Stability</h3>
                  <p className={styles.sectionSubtitle}>Camera lens engagement vs cognitive gaze shifts</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Score: {eyeContactData.score}%</span>
            </div>

            <div className={styles.twoCol} style={{ marginBottom: '16px' }}>
              <div style={{ background: 'var(--color-gray-50)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-gray-200)' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>Gaze Distribution Over Time</h4>
                {eyeContactData.timeline.map((tl) => (
                  <div key={tl.time} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '6px 0', borderBottom: '1px dashed var(--color-gray-200)' }}>
                    <span>{tl.time}</span>
                    <span style={{ color: tl.status === 'Strong' ? 'var(--color-success)' : 'var(--color-warning)', fontWeight: 'bold' }}>
                      {tl.detail}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ padding: '14px', background: 'var(--color-primary-bg)', borderRadius: '8px', fontSize: '12px', color: 'var(--color-primary-dark)', lineHeight: '1.5' }}>
                  <strong>Observation: </strong>{eyeContactData.aiObservation}
                </div>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
                  onClick={() => handleLaunchCamera('3-Second Camera Lens Lock Drill')}
                >
                  <Play size={14} />
                  Start 3-Second Lens Lock Drill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 5: FACIAL EXPRESSION
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'expression' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Smile size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Facial Expression Signals</h3>
                  <p className={styles.sectionSubtitle}>Observable nonverbal patterns & engagement dynamics</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Score: {facialExpressionData.score}/100</span>
            </div>

            <div className={styles.twoCol} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {facialExpressionData.signals.map((sig) => (
                  <div key={sig.pattern} style={{ background: 'var(--color-gray-50)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold' }}>
                      <span>{sig.pattern}</span>
                      <span>{sig.percentage}%</span>
                    </div>
                    <div style={{ height: '4px', background: 'var(--color-gray-200)', borderRadius: '9999px', marginTop: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${sig.percentage}%`, background: 'var(--color-primary)' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '14px', background: 'var(--color-primary-bg)', borderRadius: '8px', fontSize: '12px', color: 'var(--color-primary-dark)', lineHeight: '1.5' }}>
                  <strong>Coaching Rationale: </strong>{facialExpressionData.observation}
                </div>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
                  onClick={() => handleLaunchCamera('Active Listening Warmth Drill')}
                >
                  <Play size={14} />
                  Practice Expression Drill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 6: GESTURE COACH
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'gestures' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Hand size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Gesture & Hand Framing Coach</h3>
                  <p className={styles.sectionSubtitle}>Deliberate open-hand dynamics to reinforce verbal points</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Score: {gestureData.score}/100</span>
            </div>

            <div className={styles.gestureRuleGrid} style={{ marginBottom: '16px' }}>
              <div className={styles.ruleCard}>
                <span className={styles.ruleHeadGood}>🟢 Effective Gestures</span>
                <ul style={{ fontSize: '12px', lineHeight: '1.5', paddingLeft: '16px', color: 'var(--color-gray-700)' }}>
                  {gestureData.guidelines.good.map((g, idx) => (
                    <li key={idx}>{g}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.ruleCard}>
                <span className={styles.ruleHeadImprove}>🟡 Areas to Expand</span>
                <ul style={{ fontSize: '12px', lineHeight: '1.5', paddingLeft: '16px', color: 'var(--color-gray-700)' }}>
                  {gestureData.guidelines.improve.map((g, idx) => (
                    <li key={idx}>{g}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.ruleCard}>
                <span className={styles.ruleHeadAvoid}>🔴 Movements to Avoid</span>
                <ul style={{ fontSize: '12px', lineHeight: '1.5', paddingLeft: '16px', color: 'var(--color-gray-700)' }}>
                  {gestureData.guidelines.avoid.map((g, idx) => (
                    <li key={idx}>{g}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => handleLaunchCamera('Open-Hand Rule of Three Gesture Drill')}
              >
                <Play size={14} />
                Practice Open-Hand Gesture Drill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 7: DRILLS LIBRARY
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'drills' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Layers size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Structured Drills Library</h3>
                  <p className={styles.sectionSubtitle}>10 curated presence exercises across 5 core competency pillars</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>10 Drills</span>
            </div>

            <div className={styles.drillList}>
              {structuredDrillsLibrary.map((d) => (
                <div key={d.id} className={styles.drillItem}>
                  <div className={styles.drillInfo}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={styles.drillName}>{d.name}</span>
                      <span className={styles.drillCategory}>• {d.category}</span>
                    </div>
                    <p className={styles.drillInstructions}>{d.instructions}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-gray-400)' }}>{d.duration}</span>
                    <button
                      type="button"
                      className={styles.btnSecondary}
                      style={{ fontSize: '11px', padding: '4px 10px' }}
                      onClick={() => handleLaunchCamera(d.name)}
                    >
                      Launch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 8: SKILL RADAR & PROGRESS
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'progress' && (
        <div className={styles.twoCol}>
          {/* Skill Radar Card */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <TrendingUp size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>6-Axis Presence Skill Radar</h3>
                  <p className={styles.sectionSubtitle}>Current vs Previous Month vs Target (85%+)</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Radar</span>
            </div>

            <BodyLanguageRadarChart data={radarSkillsData} size={300} />
          </div>

          {/* Consistency & Total Camera Time */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Flame size={18} color="var(--color-warning)" />
                <div>
                  <h3 className={styles.sectionTitle}>Practice Consistency</h3>
                  <p className={styles.sectionSubtitle}>12-Day Presence Streak Active</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Active Streak</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-gray-900)' }}>
                {bodyLanguageProfile.totalCameraTime}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>
                Total Recorded Camera Practice across {bodyLanguageProfile.totalSessions} sessions
              </span>
            </div>

            <div className={styles.perfBarTrack} style={{ height: '8px', marginBottom: '16px' }}>
              <div className={styles.perfBarFill} style={{ width: '78%' }} />
            </div>

            <div className={styles.weaknessList}>
              {radarSkillsData.map((item) => (
                <div key={item.skill} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', padding: '4px 0', borderBottom: '1px dashed var(--color-gray-200)' }}>
                  <span style={{ color: 'var(--color-gray-700)', fontWeight: '500' }}>{item.skill}</span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ color: 'var(--color-gray-400)' }}>Prev: {item.previous}%</span>
                    <strong style={{ color: 'var(--color-primary)' }}>Now: {item.current}%</strong>
                    <span style={{ color: 'var(--color-success)' }}>Goal: {item.target}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Interactive Camera Practice Modal ── */}
      {isCameraActive && (
        <CameraPracticeModal
          mode={selectedMode}
          topic={activePracticeTopic}
          onFinish={handleFinishCameraSession}
          onClose={() => setIsCameraActive(false)}
        />
      )}

      {/* ── Post-Session AI Analysis Modal ── */}
      {analyzedSession && (
        <BodyLanguageAnalysisModal
          session={analyzedSession}
          onClose={() => setAnalyzedSession(null)}
          onPracticeAgain={(topic) => handleLaunchCamera(topic)}
        />
      )}

      {/* ── Camera Setup Wizard Modal ── */}
      {showSetupModal && (
        <CameraSetupModal
          onClose={() => setShowSetupModal(false)}
          onReadyToPractice={() => handleLaunchCamera('Executive Posture Practice')}
        />
      )}

      {/* ── Scoring Explanation Modal ── */}
      {showScoreModal && (
        <ScoringExplanationModal onClose={() => setShowScoreModal(false)} />
      )}
    </div>
  );
}
