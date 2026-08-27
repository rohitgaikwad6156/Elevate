import { useState } from 'react';
import {
  Mic,
  Sparkles,
  Zap,
  Clock,
  Flame,
  Award,
  Play,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  FileText,
  Sliders,
  Compass,
  Layers,
  ChevronRight,
  BookOpen,
  Volume2,
  MessageSquare,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import RadarChart from '../components/publicSpeaking/RadarChart';
import LiveRecordingModal from '../components/publicSpeaking/LiveRecordingModal';
import SessionAnalysisModal from '../components/publicSpeaking/SessionAnalysisModal';
import SpeechTimer from '../components/publicSpeaking/SpeechTimer';
import {
  speakingProfile,
  topPerformanceMetrics,
  aiCoachRecommendation,
  practiceTypes,
  practiceDifficulties,
  practiceDurations,
  curatedTopics,
  speechStyles,
  impromptuTopics,
  storytellingStages,
  debateScenarios,
  radarSkillsData,
  weaknessOpportunities,
  dailyChallenge,
  recentSessionsList,
} from '../data/publicSpeakingData';
import styles from './PublicSpeaking.module.css';

export default function PublicSpeaking() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('overview');

  // Practice Workspace state
  const [selectedType, setSelectedType] = useState('topic');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Intermediate');
  const [selectedDuration, setSelectedDuration] = useState(120);
  const [customTopic, setCustomTopic] = useState('The Future of Remote Work & Hybrid Culture');

  // Modals state
  const [isRecording, setIsRecording] = useState(false);
  const [activeRecordingTopic, setActiveRecordingTopic] = useState('');
  const [analyzedSession, setAnalyzedSession] = useState(null);

  // Impromptu state
  const [impromptuIndex, setImpromptuIndex] = useState(0);

  // Speech Practice state
  const [selectedStyle, setSelectedStyle] = useState('persuasive');
  const [speechOutline, setSpeechOutline] = useState([
    'Hook: Start with a surprising industry metric',
    'Point 1: The hidden productivity cost of context-switching',
    'Point 2: Why async communication restores deep focus',
    'Conclusion: The 30-day team pilot framework',
  ]);

  // Debate state
  const [activeDebateRound, setActiveDebateRound] = useState(1);

  // Handlers for launching practice
  const handleStartPractice = (topic) => {
    setActiveRecordingTopic(topic || customTopic || 'General Speaking Session');
    setIsRecording(true);
  };

  const handleFinishRecording = (recordingMeta) => {
    setIsRecording(false);
    // Create new session analysis object based on recent session template
    const newSession = {
      ...recentSessionsList[0],
      id: `sess-${Date.now()}`,
      topic: activeRecordingTopic,
      duration: recordingMeta.formattedTime,
      wpm: recordingMeta.avgPace,
      fillers: recordingMeta.fillers,
      date: 'Just now',
    };
    setAnalyzedSession(newSession);
  };

  return (
    <div className={styles.page}>
      {/* ── 1. Master Header ── */}
      <div className={styles.headerWrapper}>
        <div className={styles.headerInfo}>
          <div className={styles.titleRow}>
            <h2 className={styles.pageTitle}>Public Speaking</h2>
            <span className={styles.levelBadge}>
              <Award size={13} />
              {speakingProfile.level}
            </span>
          </div>
          <p className={styles.pageDesc}>
            Build confidence. Speak clearly. Communicate with impact through structured AI coaching and real-time live feedback.
          </p>
          <div className={styles.levelProgressRow}>
            <div className={styles.levelProgressBar}>
              <div
                className={styles.levelProgressFill}
                style={{ width: `${speakingProfile.progressToNext}%` }}
              />
            </div>
            <span>{speakingProfile.progressToNext}% to {speakingProfile.nextLevel}</span>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setActiveTab('timer')}
          >
            <Clock size={16} />
            Speech Timer
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => handleStartPractice(customTopic)}
          >
            <Mic size={16} />
            Start Speaking Practice
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
          className={`${styles.tabBtn} ${activeTab === 'speech_practice' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('speech_practice')}
        >
          <FileText size={15} />
          Speech Practice
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'impromptu' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('impromptu')}
        >
          <Zap size={15} />
          Impromptu
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'presentations' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('presentations')}
        >
          <Layers size={15} />
          Presentations
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'storytelling' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('storytelling')}
        >
          <BookOpen size={15} />
          Storytelling
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'debate' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('debate')}
        >
          <MessageSquare size={15} />
          Debate Simulator
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'timer' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('timer')}
        >
          <Clock size={15} />
          Speech Timer
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'analytics' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <TrendingUp size={15} />
          Skill Radar & Analytics
        </button>
      </div>

      {/* ── 2. Top Performance Overview (6 Cards) ── */}
      <div className={styles.perfGrid}>
        {topPerformanceMetrics.map((metric) => (
          <div key={metric.id} className={styles.perfCard} title={metric.description}>
            <span className={styles.perfLabel}>{metric.label}</span>
            <div className={styles.perfValRow}>
              <span className={styles.perfNumber}>{metric.value}</span>
              <span className={styles.perfUnit}>{metric.unit}</span>
            </div>
            <div className={styles.perfBarTrack}>
              <div
                className={styles.perfBarFill}
                style={{ width: `${Math.min(metric.value, 100)}%` }}
              />
            </div>
            <span
              className={`${styles.perfTrend} ${
                metric.trendDirection === 'neutral' ? styles.trendNeutral : ''
              }`}
            >
              {metric.trend}
            </span>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB 1: OVERVIEW & DASHBOARD
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <>
          {/* AI Speaking Coach Card + Daily Challenge */}
          <div className={styles.twoCol}>
            {/* AI Coach Card */}
            <div className={styles.aiCoachCard}>
              <div className={styles.sectionTitleRow}>
                <Sparkles size={18} className={styles.sectionIcon} />
                <h3 className={styles.aiCoachTitle}>Your AI Speaking Coach</h3>
                <span className={styles.sectionBadge}>Personalized</span>
              </div>

              <div className={styles.aiCoachQuote}>
                "{aiCoachRecommendation.recommendation}"
              </div>

              <div className={styles.whyMattersBox}>
                <strong>Why this matters: </strong>
                {aiCoachRecommendation.whyItMatters}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleStartPractice('Paced Speech Practice: Tactical Pauses')}
                >
                  <Play size={15} />
                  {aiCoachRecommendation.actionLabel}
                </button>
              </div>
            </div>

            {/* Daily Speaking Challenge */}
            <div className={styles.challengeCard}>
              <div className={styles.sectionTitleRow}>
                <Flame size={18} color="var(--color-warning)" />
                <h3 className={styles.challengeTitle}>🔥 Today's Speaking Challenge</h3>
                <span className={styles.sectionBadge} style={{ background: '#fef3c7', color: '#b45309' }}>
                  {dailyChallenge.rewardXp}
                </span>
              </div>

              <strong style={{ fontSize: '14px', color: 'var(--color-gray-900)' }}>
                "{dailyChallenge.title}"
              </strong>

              <p className={styles.challengeDesc}>{dailyChallenge.description}</p>

              <div className={styles.challengeMetaRow}>
                <span>Duration: {dailyChallenge.duration}</span>
                <span>Target Score: {dailyChallenge.targetScore}</span>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleStartPractice(dailyChallenge.title)}
                >
                  <Play size={14} />
                  Start Challenge
                </button>
              </div>
            </div>
          </div>

          {/* Speaking Practice Workspace */}
          <div className={styles.fullRow}>
            <div className={styles.workspaceCard}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleRow}>
                  <Mic size={18} className={styles.sectionIcon} />
                  <div>
                    <h3 className={styles.sectionTitle}>Practice Workspace</h3>
                    <p className={styles.sectionSubtitle}>Customize your session parameters and start recording</p>
                  </div>
                </div>
                <span className={styles.sectionBadge}>Interactive Studio</span>
              </div>

              {/* 1. Practice Type */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Select Practice Mode</label>
                <div className={styles.chipGrid}>
                  {practiceTypes.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`${styles.chipBtn} ${
                        selectedType === t.id ? styles.chipBtnActive : ''
                      }`}
                      onClick={() => setSelectedType(t.id)}
                    >
                      <span className={styles.chipTitle}>{t.name}</span>
                      <span className={styles.chipDesc}>{t.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Duration & Difficulty */}
              <div className={styles.twoCol} style={{ marginBottom: 0 }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Target Duration</label>
                  <div className={styles.durationRow}>
                    {practiceDurations.map((d) => (
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

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Difficulty Level</label>
                  <div className={styles.durationRow}>
                    {practiceDifficulties.map((diff) => (
                      <button
                        key={diff}
                        type="button"
                        className={`${styles.durationBtn} ${
                          selectedDifficulty === diff ? styles.durationBtnActive : ''
                        }`}
                        onClick={() => setSelectedDifficulty(diff)}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Topic Input */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Topic / Prompt</label>
                <input
                  type="text"
                  className={styles.topicInput}
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Enter custom speech topic or choose a curated topic..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => {
                    const random = curatedTopics[Math.floor(Math.random() * curatedTopics.length)];
                    setCustomTopic(random.title);
                  }}
                >
                  <Sparkles size={15} />
                  AI Generate Topic
                </button>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleStartPractice(customTopic)}
                >
                  <Mic size={16} />
                  Start Recording Session
                </button>
              </div>
            </div>
          </div>

          {/* Weakness Detection Opportunities + Recent Sessions */}
          <div className={styles.twoCol}>
            {/* Weakness Opportunities */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleRow}>
                  <AlertCircle size={18} className={styles.sectionIcon} />
                  <div>
                    <h3 className={styles.sectionTitle}>Your Biggest Opportunities</h3>
                    <p className={styles.sectionSubtitle}>Data-detected friction points</p>
                  </div>
                </div>
                <span className={styles.sectionBadge}>3 Focus Areas</span>
              </div>

              <div className={styles.weaknessList}>
                {weaknessOpportunities.map((w) => (
                  <div key={w.id} className={styles.weaknessCard}>
                    <div className={styles.weaknessTop}>
                      <span className={styles.weaknessTitle}>{w.title}</span>
                      <span className={styles.weaknessStat}>{w.stat}</span>
                    </div>
                    <p className={styles.weaknessWhy}>{w.whyItMatters}</p>
                    <div className={styles.weaknessFix}>
                      <strong>Fix: </strong>{w.howToFix}
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
                    <h3 className={styles.sectionTitle}>Recent Sessions</h3>
                    <p className={styles.sectionSubtitle}>Click any session to view detailed AI analysis</p>
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
                      <span className={styles.sessionScore}>{sess.score}</span>
                      <span className={styles.sessionImprovement}>{sess.improvement}</span>
                      <ChevronRight size={16} color="var(--color-gray-400)" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 2: SPEECH PRACTICE & OUTLINES
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'speech_practice' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <FileText size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Speech Practice & Outlines</h3>
                  <p className={styles.sectionSubtitle}>Structure comprehensive speeches across 6 proven delivery frameworks</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Speech Builder</span>
            </div>

            <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
              <label className={styles.formLabel}>Select Speech Style</label>
              <div className={styles.chipGrid}>
                {speechStyles.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    className={`${styles.chipBtn} ${
                      selectedStyle === style.id ? styles.chipBtnActive : ''
                    }`}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <span className={styles.chipTitle}>{style.name}</span>
                    <span className={styles.chipDesc}>{style.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.promptHeroBox} style={{ marginBottom: '16px' }}>
              <span className={styles.promptTag}>Generated Speech Outline</span>
              <ul style={{ margin: '8px 0 0 16px', fontSize: '13px', lineHeight: '1.6', color: 'var(--color-gray-800)' }}>
                {speechOutline.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => alert('Regenerated outline with alternate persuasion structure.')}
              >
                <Sparkles size={15} />
                Regenerate Outline
              </button>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => handleStartPractice('Structured Speech: Async Team Communication')}
              >
                <Mic size={15} />
                Practice Speech with Outline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 3: IMPROMPTU SPEAKING ("Think Fast. Speak Clearly.")
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'impromptu' && (
        <div className={styles.fullRow}>
          <div className={styles.impromptuCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Zap size={18} color="var(--color-warning)" />
                <div>
                  <h3 className={styles.sectionTitle}>Impromptu Speaking</h3>
                  <p className={styles.sectionSubtitle}>Think Fast. Speak Clearly.</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Spontaneous Flow</span>
            </div>

            <div className={styles.promptHeroBox}>
              <span className={styles.promptTag}>Random Impromptu Prompt</span>
              <h4 className={styles.promptText}>"{impromptuTopics[impromptuIndex]}"</h4>
            </div>

            <div className={styles.impromptuMetaRow}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} />
                <span>Preparation: <strong>30 seconds</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mic size={14} />
                <span>Speaking Time: <strong>2 minutes</strong></span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => setImpromptuIndex((prev) => (prev + 1) % impromptuTopics.length)}
              >
                <RotateCcw size={15} />
                Try Another Topic
              </button>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => handleStartPractice(impromptuTopics[impromptuIndex])}
              >
                <Play size={15} />
                Start Impromptu Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 4: PRESENTATIONS PRACTICE
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'presentations' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Layers size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Presentation Simulator</h3>
                  <p className={styles.sectionSubtitle}>Practice executive pitch decks, slide transitions, and pacing</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Slide Simulator</span>
            </div>

            <div className={styles.formGroup} style={{ marginBottom: '12px' }}>
              <label className={styles.formLabel}>Presentation Title & Slide Notes</label>
              <textarea
                className={styles.topicInput}
                style={{ minHeight: '110px', resize: 'vertical' }}
                defaultValue={`Slide 1: Problem Statement — Friction in current customer workflow\nSlide 2: Our Solution — 3-step automated self-service funnel\nSlide 3: Impact & ROI — 24% uplift in conversion rate\nSlide 4: Next Steps & Q4 Roadmap`}
              />
            </div>

            <div className={styles.perfGrid} style={{ marginBottom: '16px' }}>
              <div className={styles.perfCard}>
                <span className={styles.perfLabel}>Opening Strength</span>
                <span className={styles.perfNumber}>88%</span>
              </div>
              <div className={styles.perfCard}>
                <span className={styles.perfLabel}>Slide Transitions</span>
                <span className={styles.perfNumber}>82%</span>
              </div>
              <div className={styles.perfCard}>
                <span className={styles.perfLabel}>Pace Control</span>
                <span className={styles.perfNumber}>136 WPM</span>
              </div>
              <div className={styles.perfCard}>
                <span className={styles.perfLabel}>Engagement</span>
                <span className={styles.perfNumber}>85%</span>
              </div>
              <div className={styles.perfCard}>
                <span className={styles.perfLabel}>Confidence</span>
                <span className={styles.perfNumber}>90%</span>
              </div>
              <div className={styles.perfCard}>
                <span className={styles.perfLabel}>Closing Impact</span>
                <span className={styles.perfNumber}>84%</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => handleStartPractice('Executive Presentation: Product Roadmap Pitch')}
              >
                <Play size={15} />
                Start Presentation Simulation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 5: STORYTELLING MODE (6-Part Framework)
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'storytelling' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <BookOpen size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Storytelling Architecture</h3>
                  <p className={styles.sectionSubtitle}>Master narrative arc progression to captivate any audience</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>6-Step Narrative Arc</span>
            </div>

            <div className={styles.storyTrack} style={{ marginBottom: '20px' }}>
              {storytellingStages.map((stage) => (
                <div key={stage.step} className={styles.storyNode}>
                  <span className={styles.storyStepNum}>Step {stage.step}</span>
                  <span className={styles.storyName}>{stage.name}</span>
                  <span className={styles.storyDesc}>{stage.desc}</span>
                </div>
              ))}
            </div>

            <div className={styles.promptHeroBox} style={{ marginBottom: '16px' }}>
              <span className={styles.promptTag}>Current Story Prompt</span>
              <p className={styles.promptText}>
                "Describe a high-stakes failure that fundamentally shifted your engineering philosophy."
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => handleStartPractice('Personal Narrative: The Midnight Database Outage')}
              >
                <Mic size={15} />
                Record Narrative Speech
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 6: DEBATE SIMULATOR (Multi-Round AI Opponent)
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'debate' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <MessageSquare size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>AI Debate Simulator</h3>
                  <p className={styles.sectionSubtitle}>Test your persuasion, logic, and rapid rebuttal capabilities</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Topic: Remote Work</span>
            </div>

            <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', fontSize: '13px' }}>
              <span>Topic: <strong>{debateScenarios[0].topic}</strong></span>
              <span>Your Position: <strong style={{ color: 'var(--color-primary)' }}>{debateScenarios[0].userPosition}</strong></span>
              <span>AI Opponent: <strong style={{ color: 'var(--color-gray-700)' }}>{debateScenarios[0].aiPosition}</strong></span>
            </div>

            <div className={styles.debateRoundsList}>
              {debateScenarios[0].rounds.map((round) => (
                <div key={round.round} className={styles.debateRoundCard}>
                  <div className={styles.debateRoundHead}>
                    Round {round.round} — {round.name}
                  </div>
                  <div className={styles.debateRoundBody}>
                    <div className={styles.userSpeechBox}>
                      <strong>Your Goal: </strong>{round.userPrompt}
                    </div>
                    <div className={styles.aiOpponentBox}>
                      <strong>AI Counterpoint: </strong>"{round.aiResponse}"
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => handleStartPractice('Debate Round 1: Remote Work Opening Statement')}
              >
                <Play size={15} />
                Begin Round 1 Debate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 7: SPEECH TIMER (Standalone Tool)
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'timer' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Clock size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Precision Speech Timer</h3>
                  <p className={styles.sectionSubtitle}>Train your internal clock with checkpoint alert pacing</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Pro Stopwatch</span>
            </div>

            <SpeechTimer />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 8: SKILL RADAR & PROGRESS ANALYTICS
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'analytics' && (
        <div className={styles.twoCol}>
          {/* Skill Radar Card */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <TrendingUp size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>8-Axis Speaking Skill Radar</h3>
                  <p className={styles.sectionSubtitle}>Current month vs previous baseline</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Comprehensive</span>
            </div>

            <RadarChart data={radarSkillsData} size={300} />
          </div>

          {/* Progress Breakdown & Streak */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Flame size={18} color="var(--color-warning)" />
                <div>
                  <h3 className={styles.sectionTitle}>Practice Consistency</h3>
                  <p className={styles.sectionSubtitle}>12-Day Speaking Streak Active</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Active Streak</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-gray-900)' }}>
                {speakingProfile.totalSpeakingTime}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>
                Total Recorded Practice across {speakingProfile.totalSessions} sessions
              </span>
            </div>

            <div className={styles.perfBarTrack} style={{ height: '8px', marginBottom: '16px' }}>
              <div className={styles.perfBarFill} style={{ width: '74%' }} />
            </div>

            <div className={styles.weaknessList}>
              {radarSkillsData.map((item) => (
                <div key={item.skill} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', padding: '4px 0', borderBottom: '1px dashed var(--color-gray-200)' }}>
                  <span style={{ color: 'var(--color-gray-700)', fontWeight: '500' }}>{item.skill}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--color-gray-400)' }}>Prev: {item.previous}%</span>
                    <strong style={{ color: 'var(--color-primary)' }}>Now: {item.current}%</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Interactive Live Recording Simulator Modal ── */}
      {isRecording && (
        <LiveRecordingModal
          topic={activeRecordingTopic}
          onFinish={handleFinishRecording}
          onClose={() => setIsRecording(false)}
        />
      )}

      {/* ── Post-Practice AI Analysis & Session Detail Modal ── */}
      {analyzedSession && (
        <SessionAnalysisModal
          session={analyzedSession}
          onClose={() => setAnalyzedSession(null)}
          onPracticeAgain={(topic) => handleStartPractice(topic)}
        />
      )}
    </div>
  );
}
