import { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Clock,
  Flame,
  Award,
  TrendingUp,
  Search,
  Layers,
  ChevronRight,
  Shield,
  Activity,
  Zap,
  Camera,
  Sliders,
  Settings,
  Plus,
  UserCheck,
  MessageSquare,
  Code2,
  FileText,
  HelpCircle,
} from 'lucide-react';
import MockInterviewModal from '../components/interview/MockInterviewModal';
import InterviewSetupModal from '../components/interview/InterviewSetupModal';
import InterviewReportModal from '../components/interview/InterviewReportModal';
import QuestionDetailModal from '../components/interview/QuestionDetailModal';
import JobPrepModal from '../components/interview/JobPrepModal';
import {
  interviewProfile,
  interviewReadinessMetrics,
  aiInterviewCoach,
  interviewTypes,
  questionBank,
  mockInterviewQuestions,
  fourteenDayRoadmap,
  readinessGaps,
  dailyInterviewChallenge,
  recentInterviewsList,
  subtleAchievements,
} from '../data/interviewData';
import styles from './InterviewPrep.module.css';

export default function InterviewPrep() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('overview');

  // Search & filter state for Question Bank
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals state
  const [isMockModalActive, setIsMockModalActive] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [selectedQuestionDetail, setSelectedQuestionDetail] = useState(null);
  const [completedReportSession, setCompletedReportSession] = useState(null);
  const [showJobPrepModal, setShowJobPrepModal] = useState(false);

  // Active mock interview config
  const [activeRoleTitle, setActiveRoleTitle] = useState('Senior Software Engineer');
  const [activeQuestions, setActiveQuestions] = useState(mockInterviewQuestions);

  const categories = ['All', 'HR & Screening', 'Behavioral (STAR)', 'Technical & System Design'];

  const filteredQuestions = questionBank.filter((q) => {
    const matchesCat = selectedCategory === 'All' || q.category.includes(selectedCategory) || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.whyAsked.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleLaunchMock = (customConfig) => {
    if (customConfig?.role) {
      setActiveRoleTitle(customConfig.role);
    }
    if (customConfig?.questions) {
      setActiveQuestions(customConfig.questions);
    } else {
      setActiveQuestions(mockInterviewQuestions);
    }
    setIsMockModalActive(true);
  };

  const handleFinishMockSession = (sessionData) => {
    setIsMockModalActive(false);
    const reportData = {
      ...recentInterviewsList[0],
      id: `mock-sess-${Date.now()}`,
      title: sessionData.role || activeRoleTitle,
      duration: sessionData.durationFormatted,
      date: 'Just now',
    };
    setCompletedReportSession(reportData);
  };

  return (
    <div className={styles.page}>
      {/* ── 1. Master Header ── */}
      <div className={styles.headerWrapper}>
        <div className={styles.headerInfo}>
          <div className={styles.titleRow}>
            <h2 className={styles.pageTitle}>Interview Preparation</h2>
            <span className={styles.levelBadge}>
              <Award size={13} />
              {interviewProfile.level}
            </span>
          </div>
          <p className={styles.pageDesc}>
            Practice smarter. Answer confidently. Master behavioral STAR stories, technical architecture, and executive presence with AI coaching.
          </p>
          <div className={styles.levelProgressRow}>
            <div className={styles.levelProgressBar}>
              <div
                className={styles.levelProgressFill}
                style={{ width: `${interviewProfile.progressToNext}%` }}
              />
            </div>
            <span>{interviewProfile.progressToNext}% to {interviewProfile.nextLevel}</span>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setShowSetupModal(true)}
          >
            <Sliders size={15} />
            Configure Setup
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => handleLaunchMock()}
          >
            <Briefcase size={16} />
            Start Mock Interview
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
          Overview
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'mock_interview' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('mock_interview')}
        >
          <Briefcase size={15} />
          Mock Interview Studio
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'question_bank' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('question_bank')}
        >
          <Search size={15} />
          Question Bank
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'job_prep' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('job_prep')}
        >
          <FileText size={15} />
          Job & Resume Prep
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'technical' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('technical')}
        >
          <Code2 size={15} />
          Technical & System Design
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'roadmap' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('roadmap')}
        >
          <Calendar size={15} />
          14-Day Roadmap
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'analytics' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <TrendingUp size={15} />
          Readiness & Analytics
        </button>
      </div>

      {/* ── 2. Top Performance Metrics (6 Cards) ── */}
      <div className={styles.perfGrid}>
        {interviewReadinessMetrics.map((metric) => (
          <div key={metric.id} className={styles.perfCard} title={metric.note}>
            <span className={styles.perfLabel}>{metric.label}</span>
            <span className={styles.perfScore}>{metric.score}%</span>
            <div className={styles.perfBarTrack}>
              <div
                className={styles.perfBarFill}
                style={{ width: `${metric.score}%` }}
              />
            </div>
            <span className={styles.perfTrend}>{metric.trend}</span>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB 1: OVERVIEW
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <>
          {/* AI Interview Coach + Daily Challenge */}
          <div className={styles.twoCol}>
            {/* AI Coach Card */}
            <div className={styles.aiCoachCard}>
              <div className={styles.sectionTitleRow}>
                <Sparkles size={18} className={styles.sectionIcon} />
                <h3 className={styles.aiCoachTitle}>{aiInterviewCoach.title}</h3>
                <span className={styles.sectionBadge}>Priority: {aiInterviewCoach.priority}</span>
              </div>

              <div className={styles.aiCoachQuote}>
                "{aiInterviewCoach.recommendation}"
              </div>

              <div className={styles.whyMattersBox}>
                <strong>Why this matters: </strong>
                {aiInterviewCoach.whyItMatters}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '8px', display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleLaunchMock()}
                >
                  <Play size={14} />
                  {aiInterviewCoach.actionLabel}
                </button>
              </div>
            </div>

            {/* Daily Interview Challenge */}
            <div className={styles.challengeCard}>
              <div className={styles.sectionTitleRow}>
                <Flame size={18} color="var(--color-warning)" />
                <h3 className={styles.challengeTitle}>🔥 Today's Interview Challenge</h3>
                <span className={styles.sectionBadge} style={{ background: '#fef3c7', color: '#b45309' }}>
                  {dailyInterviewChallenge.rewardXp}
                </span>
              </div>

              <strong style={{ fontSize: '14px', color: 'var(--color-gray-900)' }}>
                "{dailyInterviewChallenge.title}"
              </strong>

              <p className={styles.challengeDesc}>{dailyInterviewChallenge.description}</p>

              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--color-gray-600)' }}>
                <span>Duration: <strong>{dailyInterviewChallenge.duration}</strong></span>
                <span>Target: <strong>{dailyInterviewChallenge.targetScore}</strong></span>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => setSelectedQuestionDetail(questionBank[1])}
                >
                  <Play size={14} />
                  Practice 2-Minute STAR Answer
                </button>
              </div>
            </div>
          </div>

          {/* Interview Type Selector Row */}
          <div className={styles.fullRow}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleRow}>
                  <Briefcase size={18} className={styles.sectionIcon} />
                  <div>
                    <h3 className={styles.sectionTitle}>Interview Formats</h3>
                    <p className={styles.sectionSubtitle}>Select an interview category to launch targeted simulation</p>
                  </div>
                </div>
                <span className={styles.sectionBadge}>5 Formats</span>
              </div>

              <div className={styles.typeGrid}>
                {interviewTypes.map((type) => (
                  <div
                    key={type.id}
                    className={styles.typeCard}
                    onClick={() => handleLaunchMock({ role: `${type.title} Simulation` })}
                  >
                    <span className={styles.typeCardTitle}>{type.title}</span>
                    <span className={styles.typeCardDesc}>{type.description}</span>
                    <div className={styles.typeCardMeta}>
                      <span>{type.duration}</span>
                      <span>{type.difficulty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Readiness Gaps + Recent Sessions */}
          <div className={styles.twoCol}>
            {/* Readiness Gaps */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleRow}>
                  <Shield size={18} className={styles.sectionIcon} />
                  <div>
                    <h3 className={styles.sectionTitle}>Your Interview Gaps</h3>
                    <p className={styles.sectionSubtitle}>Areas where interviewers notice friction</p>
                  </div>
                </div>
                <span className={styles.sectionBadge}>3 Priority Areas</span>
              </div>

              <div className={styles.gapList}>
                {readinessGaps.map((g) => (
                  <div key={g.id} className={styles.gapCard}>
                    <div className={styles.gapTop}>
                      <span className={styles.gapTitle}>{g.title}</span>
                      <span className={styles.gapScore}>{g.score}</span>
                    </div>
                    <p className={styles.gapWhy}>{g.whyItMatters}</p>
                    <div className={styles.gapFix}>
                      <strong>Fix: </strong>{g.howToFix}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Sessions */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleRow}>
                  <Clock size={18} className={styles.sectionIcon} />
                  <div>
                    <h3 className={styles.sectionTitle}>Recent Mock Sessions</h3>
                    <p className={styles.sectionSubtitle}>Click any session to view AI answer breakdown</p>
                  </div>
                </div>
                <span className={styles.sectionBadge}>{recentInterviewsList.length} Sessions</span>
              </div>

              <div className={styles.recentList}>
                {recentInterviewsList.map((sess) => (
                  <div
                    key={sess.id}
                    className={styles.recentItem}
                    onClick={() => setCompletedReportSession(sess)}
                  >
                    <div className={styles.recentInfo}>
                      <span className={styles.recentTitle}>{sess.title}</span>
                      <span className={styles.recentMeta}>
                        {sess.date} • {sess.duration} • Filler: {sess.fillerWordsPerMin}
                      </span>
                    </div>
                    <div className={styles.recentScoreBox}>
                      <span className={styles.recentScore}>{sess.score}</span>
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
          TAB 2: MOCK INTERVIEW STUDIO
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'mock_interview' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Briefcase size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>AI Mock Interview Launchpad</h3>
                  <p className={styles.sectionSubtitle}>Real-time conversational interview with AI lead interviewer Alex</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Interactive Studio</span>
            </div>

            <div className={styles.twoCol} style={{ marginBottom: '16px' }}>
              <div style={{ background: 'var(--color-gray-50)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-gray-200)' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Active Configuration</h4>
                <div style={{ fontSize: '12px', color: 'var(--color-gray-700)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>Target Role: <strong>{activeRoleTitle}</strong></div>
                  <div>Interviewer: <strong>Alex (Professional & Adaptive)</strong></div>
                  <div>Total Questions: <strong>{activeQuestions.length} Questions</strong></div>
                  <div>Modes Supported: <strong>Text, Voice, Video Simulator</strong></div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => setShowSetupModal(true)}
                >
                  <Sliders size={14} />
                  Change Role & Persona Settings
                </button>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleLaunchMock()}
                >
                  <Play size={14} />
                  Start Full Mock Interview (Alex)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 3: QUESTION BANK
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'question_bank' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Search size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Searchable Question Bank</h3>
                  <p className={styles.sectionSubtitle}>Curated behavioral, technical, and executive questions with STAR frameworks</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>{questionBank.length} Questions</span>
            </div>

            <div className={styles.searchBarRow}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search questions by keyword, topic, or concept..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.qBankList}>
              {filteredQuestions.map((q) => (
                <div
                  key={q.id}
                  className={styles.qBankItem}
                  onClick={() => setSelectedQuestionDetail(q)}
                >
                  <div className={styles.qBankInfo}>
                    <span className={styles.qBankTitle}>"{q.question}"</span>
                    <span className={styles.qBankMeta}>
                      {q.category} • {q.difficulty} • Framework: {q.framework}
                    </span>
                  </div>
                  <ChevronRight size={16} color="var(--color-gray-400)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 4: JOB & RESUME PREP
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'job_prep' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <FileText size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Job & Resume-Specific Preparation</h3>
                  <p className={styles.sectionSubtitle}>Generate custom questions from real job descriptions and resumes</p>
                </div>
              </div>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => setShowJobPrepModal(true)}
              >
                <Sparkles size={14} />
                Generate Tailored Plan
              </button>
            </div>

            <div className={styles.twoCol}>
              <div style={{ background: 'var(--color-gray-50)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-gray-200)' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>How it works</h4>
                <ol style={{ fontSize: '12px', color: 'var(--color-gray-700)', paddingLeft: '16px', lineHeight: '1.6' }}>
                  <li>Paste any job posting description or upload your resume.</li>
                  <li>AI identifies core technical requirements, company values, and project keywords.</li>
                  <li>Synthesizes 12 high-probability interview questions.</li>
                </ol>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => setShowJobPrepModal(true)}
                >
                  <Plus size={14} />
                  Paste Job Posting Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 5: TECHNICAL & SYSTEM DESIGN
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'technical' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Code2 size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Technical & System Design Studio</h3>
                  <p className={styles.sectionSubtitle}>Architectural trade-offs, scalability, and algorithms</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Architect Mode</span>
            </div>

            <div className={styles.twoCol}>
              <div className={styles.gapCard}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-gray-900)' }}>
                  System Design: Scalable URL Shortener
                </h4>
                <p style={{ fontSize: '11px', color: 'var(--color-gray-600)' }}>
                  Scale: 500M URLs/month, 100:1 read ratio, Base62 vs MD5 hashing, Redis caching.
                </p>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  style={{ alignSelf: 'flex-start', marginTop: 'auto', fontSize: '11px', padding: '4px 10px' }}
                  onClick={() => setSelectedQuestionDetail(questionBank[2])}
                >
                  Practice System Design
                </button>
              </div>

              <div className={styles.gapCard}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-gray-900)' }}>
                  Technical Deep Dive: Web Performance & Rendering
                </h4>
                <p style={{ fontSize: '11px', color: 'var(--color-gray-600)' }}>
                  Optimize Interaction to Next Paint (INP), selective memoization, API caching.
                </p>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  style={{ alignSelf: 'flex-start', marginTop: 'auto', fontSize: '11px', padding: '4px 10px' }}
                  onClick={() => setSelectedQuestionDetail(questionBank[0])}
                >
                  Practice Technical Architecture
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 6: 14-DAY ROADMAP
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'roadmap' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Calendar size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>14-Day Interview Preparation Roadmap</h3>
                  <p className={styles.sectionSubtitle}>Daily structured progression from intro to executive mock interviews</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>6 / 14 Days Complete (42%)</span>
            </div>

            <div className={styles.roadmapGrid}>
              {fourteenDayRoadmap.map((d) => (
                <div
                  key={d.day}
                  className={`${styles.dayNode} ${
                    d.status === 'completed' ? styles.dayCompleted : styles.dayPlanned
                  }`}
                >
                  <span className={styles.dayNum}>Day {d.day}</span>
                  <span className={styles.dayTopic}>{d.topic}</span>
                  {d.score && (
                    <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--color-success)' }}>
                      Score: {d.score}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 7: READINESS & ANALYTICS
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'analytics' && (
        <div className={styles.twoCol}>
          {/* Consistency & Filler Words */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <TrendingUp size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Communication Telemetry</h3>
                  <p className={styles.sectionSubtitle}>Filler words and speech pacing</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Pacing</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-gray-900)' }}>
                3.2 / min
              </span>
              <span style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 'bold' }}>
                ↓ 37% Filler words this month
              </span>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--color-gray-700)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>Total Mock Sessions: <strong>{interviewProfile.totalMockInterviews}</strong></div>
              <div>Questions Practiced: <strong>{interviewProfile.questionsPracticed}</strong></div>
              <div>Total Practice Time: <strong>{interviewProfile.totalPracticeTime}</strong></div>
              <div>Current Streak: <strong>{interviewProfile.currentStreak} Days</strong></div>
            </div>
          </div>

          {/* Achievements */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Award size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Interview Badges</h3>
                  <p className={styles.sectionSubtitle}>Milestones achieved</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>4 / 5 Unlocked</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {subtleAchievements.map((ach) => (
                <div
                  key={ach.id}
                  style={{
                    background: 'var(--color-gray-50)',
                    border: '1px solid var(--color-gray-200)',
                    borderRadius: '6px',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    opacity: ach.unlocked ? 1 : 0.5,
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{ach.icon}</span>
                  <strong style={{ fontSize: '11px', color: 'var(--color-gray-900)' }}>{ach.title}</strong>
                  <span style={{ fontSize: '9px', color: 'var(--color-gray-500)' }}>{ach.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Interactive Mock Interview Modal ── */}
      {isMockModalActive && (
        <MockInterviewModal
          role={activeRoleTitle}
          questions={activeQuestions}
          onFinish={handleFinishMockSession}
          onClose={() => setIsMockModalActive(false)}
        />
      )}

      {/* ── Setup Modal ── */}
      {showSetupModal && (
        <InterviewSetupModal
          onStart={(config) => handleLaunchMock(config)}
          onClose={() => setShowSetupModal(false)}
        />
      )}

      {/* ── Question Detail Modal ── */}
      {selectedQuestionDetail && (
        <QuestionDetailModal
          question={selectedQuestionDetail}
          onPractice={(q) => handleLaunchMock({ questions: [q] })}
          onClose={() => setSelectedQuestionDetail(null)}
        />
      )}

      {/* ── Post-Interview AI Report Modal ── */}
      {completedReportSession && (
        <InterviewReportModal
          session={completedReportSession}
          onPracticeAgain={(title) => handleLaunchMock({ role: title })}
          onClose={() => setCompletedReportSession(null)}
        />
      )}

      {/* ── Job Prep Engine Modal ── */}
      {showJobPrepModal && (
        <JobPrepModal
          onStartMock={(plan) => handleLaunchMock(plan)}
          onClose={() => setShowJobPrepModal(false)}
        />
      )}
    </div>
  );
}
