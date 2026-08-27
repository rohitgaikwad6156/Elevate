import { useState } from 'react';
import {
  BookOpen,
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
  Bookmark,
  MessageSquare,
  Bot,
  Sliders,
  Plus,
  HelpCircle,
} from 'lucide-react';
import LessonViewerModal from '../components/learning/LessonViewerModal';
import AITutorModal from '../components/learning/AITutorModal';
import QuizEngineModal from '../components/learning/QuizEngineModal';
import PathDetailModal from '../components/learning/PathDetailModal';
import {
  learningProfile,
  learningScorePillars,
  continueLearningCard,
  todaysDailyLesson,
  aiLearningCoach,
  learningPathsList,
  sampleLessonDetail,
  microLessonsList,
  vocabularyHubData,
  workplaceScenarios,
  quizBank,
  skillMasteryData,
  dailyLearningChallenge,
  subtleAchievements,
} from '../data/learningData';
import styles from './LearningHub.module.css';

export default function LearningHub() {
  // Sub-Navigation tabs
  const [activeTab, setActiveTab] = useState('overview');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExploreCategory, setSelectedExploreCategory] = useState('All');

  // Modals state
  const [activeLessonModal, setActiveLessonModal] = useState(null);
  const [showAITutorModal, setShowAITutorModal] = useState(false);
  const [tutorContextTopic, setTutorContextTopic] = useState('Professional Communication');
  const [activeQuizModal, setActiveQuizModal] = useState(null);
  const [selectedPathDetail, setSelectedPathDetail] = useState(null);

  // Scenario simulator state
  const [selectedScenarioOption, setSelectedScenarioOption] = useState({});

  const exploreCategories = ['All', 'Communication', 'English', 'Career Skills', 'Soft Skills', 'Public Speaking'];

  const filteredPaths = learningPathsList.filter((p) => {
    const matchesCat =
      selectedExploreCategory === 'All' ||
      p.skills.some((s) => s.toLowerCase().includes(selectedExploreCategory.toLowerCase())) ||
      p.title.toLowerCase().includes(selectedExploreCategory.toLowerCase());
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenTutor = (topic) => {
    setTutorContextTopic(topic || 'Professional Communication');
    setShowAITutorModal(true);
  };

  const handleStartLesson = (lessonObj) => {
    setActiveLessonModal(lessonObj || sampleLessonDetail);
  };

  return (
    <div className={styles.page}>
      {/* ── 1. Master Header ── */}
      <div className={styles.headerWrapper}>
        <div className={styles.headerInfo}>
          <div className={styles.greetingText}>Good evening, {learningProfile.userName}</div>
          <div className={styles.titleRow}>
            <h2 className={styles.pageTitle}>Learning Hub</h2>
            <span className={styles.levelBadge}>
              <Award size={13} />
              Score: {learningProfile.learningScore}/100
            </span>
          </div>
          <p className={styles.pageDesc}>
            Build useful skills, one lesson at a time. Master structured communication, workplace frameworks, executive presence, and practical English.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => handleOpenTutor('General Learning Strategy')}
          >
            <Bot size={15} />
            Ask AI Tutor
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => handleStartLesson()}
          >
            <Play size={15} />
            Continue Lesson
          </button>
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
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
          className={`${styles.tabBtn} ${activeTab === 'paths' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('paths')}
        >
          <Layers size={15} />
          Learning Paths
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'explore' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('explore')}
        >
          <Search size={15} />
          Explore Skills
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'vocabulary' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('vocabulary')}
        >
          <BookOpen size={15} />
          Vocabulary Hub
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'scenarios' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('scenarios')}
        >
          <MessageSquare size={15} />
          Workplace Scenarios
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'quizzes' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('quizzes')}
        >
          <Sparkles size={15} />
          Quiz Center
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'analytics' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <TrendingUp size={15} />
          Progress & Streaks
        </button>
      </div>

      {/* ── Top Score Pillars (4 Cards) ── */}
      <div className={styles.scoreGrid}>
        {learningScorePillars.map((pillar, idx) => (
          <div key={idx} className={styles.scoreCard} title={pillar.note}>
            <span className={styles.scoreLabel}>{pillar.name}</span>
            <span className={styles.scoreVal}>{pillar.score}%</span>
            <div className={styles.scoreBarTrack}>
              <div
                className={styles.scoreBarFill}
                style={{ width: `${pillar.score}%` }}
              />
            </div>
            <span className={styles.scoreTrend}>{pillar.trend} this month</span>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB 1: OVERVIEW
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <>
          {/* Continue Learning + Today's Daily Lesson */}
          <div className={styles.twoCol}>
            {/* Continue Learning Card */}
            <div className={styles.continueCard}>
              <div className={styles.continueTag}>▶ In Progress</div>
              <h3 className={styles.continueTitle}>{continueLearningCard.pathTitle}</h3>
              <p className={styles.continueLesson}>{continueLearningCard.currentLesson}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--color-gray-600)' }}>
                <div style={{ flex: 1, height: '6px', background: 'var(--color-gray-200)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${continueLearningCard.progressPercent}%`, background: 'var(--color-primary)' }} />
                </div>
                <span>{continueLearningCard.progressPercent}% Complete</span>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleStartLesson()}
                >
                  <Play size={14} />
                  Continue Lesson ({continueLearningCard.estimatedTimeLeft})
                </button>
              </div>
            </div>

            {/* Today's Daily Lesson Card */}
            <div className={styles.dailyLessonCard}>
              <div className={styles.dailyHead}>
                <span className={styles.sectionBadge}>🔥 Today's Pick</span>
                <span className={styles.dailyMeta}>⏱ {todaysDailyLesson.duration} • {todaysDailyLesson.difficulty}</span>
              </div>

              <h3 className={styles.dailyTitle}>"{todaysDailyLesson.title}"</h3>
              <div className={styles.dailyWhy}>
                <strong>Why recommended: </strong>{todaysDailyLesson.whyRecommended}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleStartLesson()}
                >
                  <Play size={14} />
                  Start Lesson ({todaysDailyLesson.xpReward})
                </button>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => handleOpenTutor(todaysDailyLesson.title)}
                >
                  <Bot size={14} />
                  Tutor Notes
                </button>
              </div>
            </div>
          </div>

          {/* AI Learning Coach Card */}
          <div className={styles.fullRow}>
            <div className={styles.aiCoachCard}>
              <div className={styles.sectionTitleRow}>
                <Sparkles size={18} className={styles.sectionIcon} />
                <h3 className={styles.aiCoachTitle}>{aiLearningCoach.title}</h3>
                <span className={styles.sectionBadge}>Recommended: {aiLearningCoach.recommendedSkill}</span>
              </div>

              <div className={styles.aiCoachQuote}>
                "{aiLearningCoach.recommendation}"
              </div>

              <div style={{ fontSize: '12px', color: 'var(--color-gray-600)' }}>
                <strong>Why this matters: </strong>{aiLearningCoach.whyItMatters}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '6px', display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleStartLesson()}
                >
                  <Play size={14} />
                  {aiLearningCoach.actionLabel} ({aiLearningCoach.time})
                </button>
              </div>
            </div>
          </div>

          {/* Micro-Learning Section */}
          <div className={styles.fullRow}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleRow}>
                  <Zap size={18} className={styles.sectionIcon} />
                  <div>
                    <h3 className={styles.sectionTitle}>Micro-Learning (5–10 Min Drills)</h3>
                    <p className={styles.sectionSubtitle}>Quick actionable mental models for busy days</p>
                  </div>
                </div>
                <span className={styles.sectionBadge}>Bite-Sized</span>
              </div>

              <div className={styles.microGrid}>
                {microLessonsList.map((m) => (
                  <div
                    key={m.id}
                    className={styles.microCard}
                    onClick={() => handleStartLesson({ title: m.title, pathName: m.skill, lessonNumber: m.duration })}
                  >
                    <span className={styles.microTitle}>{m.title}</span>
                    <div className={styles.microMeta}>
                      <span>⏱ {m.duration}</span> • <span>{m.skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 2: LEARNING PATHS
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'paths' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Layers size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Structured Learning Curricula</h3>
                  <p className={styles.sectionSubtitle}>Step-by-step masterclasses with progressive difficulty</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>{learningPathsList.length} Paths</span>
            </div>

            <div className={styles.pathGrid}>
              {learningPathsList.map((path) => (
                <div
                  key={path.id}
                  className={styles.pathCard}
                  onClick={() => setSelectedPathDetail(path)}
                >
                  <span className={styles.continueTag}>{path.level}</span>
                  <h3 className={styles.pathTitle}>{path.title}</h3>
                  <p className={styles.pathSubtitle}>{path.subtitle}</p>

                  <div style={{ height: '4px', background: 'var(--color-gray-100)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${path.progress}%`, background: 'var(--color-primary)' }} />
                  </div>

                  <div className={styles.pathMeta}>
                    <span>{path.lessonsCount} Lessons • {path.totalDuration}</span>
                    <strong style={{ color: 'var(--color-primary)' }}>{path.progress}% Done</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 3: EXPLORE SKILLS
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'explore' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Search size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Explore Skill Catalog</h3>
                  <p className={styles.sectionSubtitle}>Find lessons across Communication, Career, English, and Soft Skills</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                className={styles.searchInput}
                style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--color-gray-300)', borderRadius: '6px', fontSize: '13px' }}
                placeholder="Search topics, skills, frameworks (e.g. PREP, BLUF, Active Listening)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.pathGrid}>
              {filteredPaths.map((path) => (
                <div
                  key={path.id}
                  className={styles.pathCard}
                  onClick={() => setSelectedPathDetail(path)}
                >
                  <span className={styles.continueTag}>{path.level}</span>
                  <h3 className={styles.pathTitle}>{path.title}</h3>
                  <p className={styles.pathSubtitle}>{path.subtitle}</p>
                  <div className={styles.pathMeta}>
                    <span>{path.lessonsCount} Lessons</span>
                    <span>{path.totalDuration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 4: VOCABULARY HUB
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'vocabulary' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <BookOpen size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Executive Vocabulary Hub</h3>
                  <p className={styles.sectionSubtitle}>Precision language for presentations, leadership, and interviews</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>
                {vocabularyHubData.wordsLearned} Words Mastered
              </span>
            </div>

            <div className={styles.vocabGrid}>
              {vocabularyHubData.todayWords.map((w) => (
                <div key={w.id} className={styles.vocabCard}>
                  <div className={styles.vocabWordRow}>
                    <span className={styles.vocabWord}>{w.word}</span>
                    <span className={styles.vocabPhonetic}>{w.phonetic}</span>
                  </div>
                  <p className={styles.vocabMeaning}>{w.meaning}</p>
                  <div className={styles.vocabExample}>"{w.example}"</div>
                  <div style={{ fontSize: '10px', color: 'var(--color-gray-500)', marginTop: 'auto' }}>
                    Synonyms: {w.synonyms.slice(0, 3).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 5: WORKPLACE SCENARIOS
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'scenarios' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <MessageSquare size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Workplace Scenario Simulator</h3>
                  <p className={styles.sectionSubtitle}>Evaluate responses to realistic professional dilemmas</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Simulation Mode</span>
            </div>

            <div className={styles.twoCol}>
              {workplaceScenarios.map((scen) => (
                <div key={scen.id} className={styles.section} style={{ background: 'var(--color-gray-50)' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>{scen.title}</h4>
                  <p style={{ fontSize: '11px', color: 'var(--color-gray-600)', marginBottom: '12px' }}>"{scen.context}"</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {scen.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        style={{
                          padding: '8px 12px',
                          border: '1px solid var(--color-gray-300)',
                          borderRadius: '6px',
                          background: selectedScenarioOption[scen.id]?.id === opt.id ? 'var(--color-primary-bg)' : 'var(--color-white)',
                          borderColor: selectedScenarioOption[scen.id]?.id === opt.id ? 'var(--color-primary)' : 'var(--color-gray-300)',
                          textAlign: 'left',
                          fontSize: '11px',
                          color: 'var(--color-gray-800)',
                          cursor: 'pointer',
                        }}
                        onClick={() => setSelectedScenarioOption((prev) => ({ ...prev, [scen.id]: opt }))}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>

                  {selectedScenarioOption[scen.id] && (
                    <div style={{ marginTop: '12px', padding: '8px 12px', background: 'var(--color-white)', borderLeft: '3px solid var(--color-primary)', borderRadius: '4px', fontSize: '11px' }}>
                      <strong>Evaluation ({selectedScenarioOption[scen.id].rating}): </strong>
                      {selectedScenarioOption[scen.id].feedback}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 6: QUIZ CENTER
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'quizzes' && (
        <div className={styles.fullRow}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Sparkles size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Quiz Assessment Center</h3>
                  <p className={styles.sectionSubtitle}>Test your mastery across frameworks, vocabulary, and communication clarity</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>Interactive</span>
            </div>

            <div className={styles.twoCol}>
              <div style={{ background: 'var(--color-gray-50)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold' }}>{quizBank[0].title}</h4>
                <p style={{ fontSize: '11px', color: 'var(--color-gray-600)' }}>
                  3 Questions • ~5 Minutes • Tests BLUF, PREP framework, and executive phrasing.
                </p>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
                  onClick={() => setActiveQuizModal(quizBank[0])}
                >
                  <Play size={14} />
                  Start Clarity Quiz
                </button>
              </div>

              <div style={{ background: 'linear-gradient(135deg, var(--color-primary-bg), var(--color-white))', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-primary-light)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} color="var(--color-primary)" />
                  <h4 style={{ fontSize: '13px', fontWeight: 'bold' }}>✨ AI-Generated Custom Quiz</h4>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--color-gray-700)' }}>
                  AI synthesizes a 5-question review targeting your weakest vocabulary and scenario responses from this week.
                </p>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
                  onClick={() => setActiveQuizModal(quizBank[0])}
                >
                  Generate Personalized Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 7: PROGRESS & STREAKS
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'analytics' && (
        <div className={styles.twoCol}>
          {/* Skill Mastery Map */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <TrendingUp size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Skill Mastery Map</h3>
                  <p className={styles.sectionSubtitle}>Progression across core competencies</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {skillMasteryData.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-gray-800)' }}>
                    <span><strong>{s.skill}</strong> ({s.level})</span>
                    <span>{s.mastery}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--color-gray-100)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${s.mastery}%`, background: 'var(--color-primary)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges & Achievements */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Award size={18} className={styles.sectionIcon} />
                <div>
                  <h3 className={styles.sectionTitle}>Learning Badges</h3>
                  <p className={styles.sectionSubtitle}>Milestones earned</p>
                </div>
              </div>
              <span className={styles.sectionBadge}>6 Unlocked</span>
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

      {/* ── Interactive Lesson Modal ── */}
      {activeLessonModal && (
        <LessonViewerModal
          lesson={activeLessonModal}
          onFinish={() => setActiveLessonModal(null)}
          onClose={() => setActiveLessonModal(null)}
        />
      )}

      {/* ── AI Tutor Modal ── */}
      {showAITutorModal && (
        <AITutorModal
          contextTopic={tutorContextTopic}
          onClose={() => setShowAITutorModal(false)}
        />
      )}

      {/* ── Quiz Engine Modal ── */}
      {activeQuizModal && (
        <QuizEngineModal
          quiz={activeQuizModal}
          onFinish={() => setActiveQuizModal(null)}
          onClose={() => setActiveQuizModal(null)}
        />
      )}

      {/* ── Path Detail Modal ── */}
      {selectedPathDetail && (
        <PathDetailModal
          path={selectedPathDetail}
          onStartLesson={() => {
            setSelectedPathDetail(null);
            handleStartLesson();
          }}
          onClose={() => setSelectedPathDetail(null)}
        />
      )}
    </div>
  );
}
