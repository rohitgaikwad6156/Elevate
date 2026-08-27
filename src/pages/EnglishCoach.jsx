import { useState, useMemo } from 'react';
import {
  BookOpen,
  Mic,
  Headphones,
  CheckSquare,
  PenTool,
  Volume2,
  Sparkles,
  Check,
  Flame,
  TrendingUp,
  Clock,
  Award,
  Play,
  FileText,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import {
  englishHeaderData,
  learningPathStages,
  currentLearningStage,
  initialPracticeTasks,
  aiConversationData,
  speakingPracticeData,
  vocabularyList,
  grammarExercise,
  pronunciationWords,
  listeningData,
  readingData,
  writingData,
  englishProgressBreakdown,
  englishScoreBreakdown,
  streakTrackerData,
  quickPracticeList,
} from '../data/englishCoachData';
import styles from './EnglishCoach.module.css';

export default function EnglishCoach() {
  // Current Date
  const todayFormatted = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  // 1. Today's Practice Tasks local state (interactive)
  const [practiceTasks, setPracticeTasks] = useState(initialPracticeTasks);

  const toggleTask = (id) => {
    setPracticeTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedCount = practiceTasks.filter((t) => t.completed).length;
  const progressPercent = Math.round(
    (completedCount / practiceTasks.length) * 100
  );

  // 2. Grammar interactive state
  const [selectedGrammarOption, setSelectedGrammarOption] = useState(null);
  const [grammarAnswered, setGrammarAnswered] = useState(false);

  const handleSelectOption = (optionId) => {
    setSelectedGrammarOption(optionId);
    setGrammarAnswered(true);
  };

  const handleResetGrammar = () => {
    setSelectedGrammarOption(null);
    setGrammarAnswered(false);
  };

  // 3. Writing practice state (live word counter)
  const [writingText, setWritingText] = useState(writingData.defaultText);
  const [draftNotice, setDraftNotice] = useState('');

  const wordCount = useMemo(() => {
    const trimmed = writingText.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
  }, [writingText]);

  const handleSubmitWriting = () => {
    setDraftNotice('Draft saved locally. AI writing evaluation will be implemented in a future phase.');
    setTimeout(() => setDraftNotice(''), 4500);
  };

  // 4. Demo feedback notices
  const [aiDemoNotice, setAiDemoNotice] = useState('');
  const [speakingNotice, setSpeakingNotice] = useState('');
  const [listeningNotice, setListeningNotice] = useState('');
  const [readingNotice, setReadingNotice] = useState('');
  const [pronunciationNotice, setPronunciationNotice] = useState('');
  const [vocabNotice, setVocabNotice] = useState('');

  // 5. Dynamic Progress & Scores from clean scratch state
  const dynamicProgressList = useMemo(() => {
    const isVocabDone = practiceTasks.find(t => t.id === 't1')?.completed;
    const isSpeakingDone = practiceTasks.find(t => t.id === 't2')?.completed;
    const isGrammarDone = practiceTasks.find(t => t.id === 't3')?.completed || grammarAnswered;
    const isListeningDone = practiceTasks.find(t => t.id === 't4')?.completed;
    const isReadingDone = Boolean(readingNotice);
    const isWritingDone = wordCount >= 10;

    return [
      { skill: 'Vocabulary', progress: isVocabDone ? 100 : 0 },
      { skill: 'Grammar', progress: isGrammarDone ? 100 : 0 },
      { skill: 'Speaking', progress: isSpeakingDone ? 100 : 0 },
      { skill: 'Listening', progress: isListeningDone ? 100 : 0 },
      { skill: 'Reading', progress: isReadingDone ? 100 : 0 },
      { skill: 'Writing', progress: isWritingDone ? 100 : 0 },
    ];
  }, [practiceTasks, grammarAnswered, readingNotice, wordCount]);

  const dynamicScores = useMemo(() => {
    return dynamicProgressList.map(item => ({
      name: item.skill,
      score: item.progress > 0 ? 100 : 0,
    }));
  }, [dynamicProgressList]);

  const dynamicStreakDays = useMemo(() => {
    const dayOfWeek = new Date().getDay();
    const monFirst = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, i) => ({
      day,
      completed: i === monFirst ? completedCount > 0 : false,
      isToday: i === monFirst,
    }));
  }, [completedCount]);


  return (
    <div className={styles.page}>
      {/* ── 1. Header / Introduction ── */}
      <div className={styles.headerWrapper}>
        <div className={styles.headerInfo}>
          <h2 className={styles.pageTitle}>{englishHeaderData.title}</h2>
          <p className={styles.pageDesc}>{englishHeaderData.subtitle}</p>
          <div className={styles.headerMeta}>
            <span className={styles.levelBadge}>
              <Award size={13} />
              Current Level: {englishHeaderData.currentLevel}
            </span>
            <span className={styles.dateText}>{todayFormatted}</span>
          </div>
        </div>
      </div>

      {/* ── Stats Overview ── */}
      <div className={styles.statsRow}>
        <StatCard
          icon={Award}
          label="Current Level"
          value={englishHeaderData.currentLevel}
          color="primary"
        />
        <StatCard
          icon={Clock}
          label="Daily Goal"
          value="15 min"
          color="info"
        />
        <StatCard
          icon={Flame}
          label="Current Streak"
          value={`${completedCount > 0 ? 1 : 0} days`}
          color="warning"
        />
        <StatCard
          icon={TrendingUp}
          label="English Score"
          value={`${progressPercent} / ${englishHeaderData.maxScore}`}
          color="success"
        />
      </div>

      {/* ── 2. Learning Path ── */}
      <div className={styles.learningPathCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleRow}>
            <Compass size={18} className={styles.sectionIcon} />
            <div>
              <h3 className={styles.sectionTitle}>Learning Path</h3>
              <p className={styles.sectionSubtitle}>Progressive journey to confident fluency</p>
            </div>
          </div>
          <span className={styles.sectionBadge}>Step 1 Active</span>
        </div>


        <div className={styles.currentStageCallout}>
          <Compass size={15} />
          <span>Current Stage: {currentLearningStage}</span>
        </div>

        <div className={styles.pathTrack}>
          {learningPathStages.map((stage) => {
            const isDone = stage.status === 'completed';
            const isCurr = stage.status === 'current';
            return (
              <div
                key={stage.id}
                className={`${styles.pathNode} ${
                  isDone
                    ? styles.pathNodeCompleted
                    : isCurr
                    ? styles.pathNodeCurrent
                    : styles.pathNodeUpcoming
                }`}
              >
                <div
                  className={`${styles.pathNodeBadge} ${
                    isDone
                      ? styles.nodeCompleted
                      : isCurr
                      ? styles.nodeCurrent
                      : styles.nodeUpcoming
                  }`}
                >
                  {isDone ? <Check size={14} /> : stage.step}
                </div>
                <span className={styles.pathNodeName}>{stage.name}</span>
                <span className={styles.pathNodeDesc}>{stage.description}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. Today's English Practice & 4. AI Conversation ── */}
      <div className={styles.twoCol}>
        {/* Today's English Practice */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <CheckCircle2 size={18} className={styles.sectionIcon} />
              <div>
                <h3 className={styles.sectionTitle}>Today's English Practice</h3>
                <p className={styles.sectionSubtitle}>
                  Today's Progress: {completedCount} / {practiceTasks.length} completed
                </p>
              </div>
            </div>
            <span className={styles.sectionBadge}>{progressPercent}% Done</span>
          </div>

          <div className={styles.practiceProgressTrack}>
            <div
              className={styles.practiceProgressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {practiceTasks.map((task) => (
              <div
                key={task.id}
                className={styles.practiceItem}
                onClick={() => toggleTask(task.id)}
              >
                <div
                  className={`${styles.practiceCheckbox} ${
                    task.completed ? styles.practiceCheckboxChecked : ''
                  }`}
                >
                  {task.completed && <Check size={13} />}
                </div>
                <div className={styles.practiceContent}>
                  <p
                    className={`${styles.practiceTitle} ${
                      task.completed ? styles.practiceTitleDone : ''
                    }`}
                  >
                    {task.title}
                  </p>
                </div>
                <span className={styles.practiceDuration}>{task.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. AI Conversation */}
        <div className={styles.aiConvoCard}>
          <div className={styles.aiConvoHeader}>
            <div>
              <h3 className={styles.aiConvoTitle}>{aiConversationData.title}</h3>
              <p className={styles.aiTagline}>{aiConversationData.tagline}</p>
            </div>
            <span className={styles.sectionBadge}>Demo</span>
          </div>

          <div className={styles.aiMetaTags}>
            <span className={styles.metaChip}>Topic: {aiConversationData.topic}</span>
            <span className={styles.metaChip}>Difficulty: {aiConversationData.difficulty}</span>
          </div>

          <div className={styles.aiNoticeBanner}>
            <AlertCircle size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            {aiConversationData.disclaimer}
          </div>

          {aiDemoNotice && (
            <div style={{ padding: '8px 12px', background: 'var(--color-info-bg)', color: 'var(--color-info)', borderRadius: '6px', fontSize: '12px' }}>
              {aiDemoNotice}
            </div>
          )}

          <div>
            <button
              type="button"
              className={styles.btnPrimarySm}
              onClick={() => {
                setAiDemoNotice('AI integration coming in a later phase.');
                setTimeout(() => setAiDemoNotice(''), 4000);
              }}
            >
              <Sparkles size={14} />
              Start Conversation
            </button>
          </div>
        </div>
      </div>

      {/* ── 5. Speaking Practice & 7. Grammar Practice ── */}
      <div className={styles.twoCol}>
        {/* 5. Speaking Practice */}
        <div className={styles.speakingCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <Mic size={18} className={styles.sectionIcon} />
              <div>
                <h3 className={styles.sectionTitle}>{speakingPracticeData.title}</h3>
                <p className={styles.sectionSubtitle}>Topic: {speakingPracticeData.topic}</p>
              </div>
            </div>
            <span className={styles.sectionBadge}>Duration: {speakingPracticeData.duration}</span>
          </div>

          <p className={styles.speakingPromptText}>"{speakingPracticeData.prompt}"</p>

          <div className={styles.speakingInstructions}>
            <strong>Instructions: </strong>
            {speakingPracticeData.instructions}
          </div>

          <div className={styles.aiMetaTags}>
            <span className={styles.metaChip}>Difficulty: {speakingPracticeData.difficulty}</span>
            <span className={styles.metaChip}>Target: Fluency & Transition Words</span>
          </div>

          {speakingNotice && (
            <div style={{ padding: '8px 12px', background: 'var(--color-warning-bg)', color: 'var(--color-gray-800)', borderRadius: '6px', fontSize: '12px' }}>
              {speakingNotice}
            </div>
          )}

          <div>
            <button
              type="button"
              className={styles.btnPrimarySm}
              onClick={() => {
                setSpeakingNotice('Voice practice will be available in a future phase (Coming Soon).');
                setTimeout(() => setSpeakingNotice(''), 4000);
              }}
            >
              <Play size={14} />
              Start Practice
            </button>
          </div>
        </div>

        {/* 7. Grammar Practice (Interactive) */}
        <div className={styles.grammarCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <CheckSquare size={18} className={styles.sectionIcon} />
              <div>
                <h3 className={styles.sectionTitle}>Grammar Practice</h3>
                <span className={styles.grammarTopicBadge}>{grammarExercise.topic}</span>
              </div>
            </div>
            {grammarAnswered && (
              <button
                type="button"
                className={styles.btnSecondarySm}
                onClick={handleResetGrammar}
                title="Try again"
              >
                <RotateCcw size={12} />
                Reset
              </button>
            )}
          </div>

          <p className={styles.grammarQuestionText}>{grammarExercise.question}</p>

          <div className={styles.optionsList}>
            {grammarExercise.options.map((opt) => {
              const isSelected = selectedGrammarOption === opt.id;
              let btnClass = styles.optionBtn;
              if (grammarAnswered) {
                if (opt.isCorrect) btnClass += ` ${styles.optionCorrect}`;
                else if (isSelected) btnClass += ` ${styles.optionIncorrect}`;
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  className={btnClass}
                  onClick={() => handleSelectOption(opt.id)}
                >
                  <span className={styles.optionKey}>{opt.id}</span>
                  <span>{opt.text}</span>
                  {grammarAnswered && opt.isCorrect && (
                    <Check size={14} style={{ marginLeft: 'auto', color: 'var(--color-success)' }} />
                  )}
                </button>
              );
            })}
          </div>

          {grammarAnswered && (
            <div
              className={`${styles.grammarFeedback} ${
                grammarExercise.options.find((o) => o.id === selectedGrammarOption)?.isCorrect
                  ? styles.feedbackSuccess
                  : styles.feedbackError
              }`}
            >
              <strong>
                {grammarExercise.options.find((o) => o.id === selectedGrammarOption)?.isCorrect
                  ? '✓ Correct!'
                  : '✗ Incorrect.'}{' '}
              </strong>
              {grammarExercise.explanation}
            </div>
          )}
        </div>
      </div>

      {/* ── 6. Vocabulary Section (Full Width) ── */}
      <div className={styles.fullRow}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <BookOpen size={18} className={styles.sectionIcon} />
              <div>
                <h3 className={styles.sectionTitle}>Vocabulary Practice</h3>
                <p className={styles.sectionSubtitle}>High-frequency contextual vocabulary</p>
              </div>
            </div>
            <button
              type="button"
              className={styles.btnPrimarySm}
              onClick={() => {
                setVocabNotice('New vocabulary drills will refresh in next practice session!');
                setTimeout(() => setVocabNotice(''), 3500);
              }}
            >
              Practice Vocabulary
            </button>
          </div>

          {vocabNotice && (
            <div style={{ marginBottom: '12px', padding: '8px 12px', background: 'var(--color-success-bg)', color: 'var(--color-success)', borderRadius: '6px', fontSize: '12px' }}>
              {vocabNotice}
            </div>
          )}

          <div className={styles.vocabGrid}>
            {vocabularyList.map((item) => (
              <div key={item.id} className={styles.vocabCard}>
                <div className={styles.vocabHead}>
                  <div>
                    <span className={styles.vocabWord}>{item.word}</span>
                    <span className={styles.vocabPos}>({item.partOfSpeech})</span>
                  </div>
                  <span className={styles.vocabDiff}>{item.difficulty}</span>
                </div>
                <p className={styles.vocabMeaning}>{item.meaning}</p>
                <p className={styles.vocabExample}>"{item.example}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 8. Pronunciation & 9. Listening ── */}
      <div className={styles.twoCol}>
        {/* 8. Pronunciation Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <Volume2 size={18} className={styles.sectionIcon} />
              <div>
                <h3 className={styles.sectionTitle}>Pronunciation</h3>
                <p className={styles.sectionSubtitle}>Common difficult words & syllable stress</p>
              </div>
            </div>
            <span className={styles.sectionBadge}>Phonetics</span>
          </div>

          <div className={styles.pronunciationList}>
            {pronunciationWords.map((item) => (
              <div key={item.word} className={styles.pronunciationItem}>
                <span className={styles.pronunciationWord}>{item.word}</span>
                <span className={styles.pronunciationHint}>{item.hint}</span>
              </div>
            ))}
          </div>

          {pronunciationNotice && (
            <div style={{ marginTop: '12px', padding: '8px 12px', background: 'var(--color-warning-bg)', color: 'var(--color-gray-800)', borderRadius: '6px', fontSize: '12px' }}>
              {pronunciationNotice}
            </div>
          )}

          <div style={{ marginTop: '14px' }}>
            <button
              type="button"
              className={styles.btnSecondarySm}
              onClick={() => {
                setPronunciationNotice('Pronunciation speech analysis is coming soon in a future phase.');
                setTimeout(() => setPronunciationNotice(''), 4000);
              }}
            >
              Practice Pronunciation
            </button>
          </div>
        </div>

        {/* 9. Listening Practice */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <Headphones size={18} className={styles.sectionIcon} />
              <div>
                <h3 className={styles.sectionTitle}>{listeningData.title}</h3>
                <p className={styles.sectionSubtitle}>Topic: {listeningData.topic}</p>
              </div>
            </div>
            <span className={styles.sectionBadge}>{listeningData.duration}</span>
          </div>

          <div className={styles.playStyleBox}>
            <div className={styles.playIconBtn}>
              <Play size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '13px', color: 'var(--color-gray-900)' }}>
                {listeningData.topic} — Dialogue Session
              </strong>
              <p style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>
                Difficulty: {listeningData.difficulty} • Duration: {listeningData.duration}
              </p>
            </div>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--color-gray-600)', margin: '10px 0', lineHeight: '1.4' }}>
            {listeningData.description}
          </p>

          <div className={styles.aiNoticeBanner}>
            <AlertCircle size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            {listeningData.notice}
          </div>

          {listeningNotice && (
            <div style={{ marginTop: '8px', padding: '8px 12px', background: 'var(--color-info-bg)', color: 'var(--color-info)', borderRadius: '6px', fontSize: '12px' }}>
              {listeningNotice}
            </div>
          )}

          <div style={{ marginTop: '12px' }}>
            <button
              type="button"
              className={styles.btnPrimarySm}
              onClick={() => {
                setListeningNotice('Audio practice coming soon.');
                setTimeout(() => setListeningNotice(''), 4000);
              }}
            >
              <Play size={13} />
              Play Audio
            </button>
          </div>
        </div>
      </div>

      {/* ── 10. Reading & 11. Writing ── */}
      <div className={styles.twoCol}>
        {/* 10. Reading Practice */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <FileText size={18} className={styles.sectionIcon} />
              <div>
                <h3 className={styles.sectionTitle}>Reading Practice</h3>
                <p className={styles.sectionSubtitle}>{readingData.title}</p>
              </div>
            </div>
            <span className={styles.sectionBadge}>{readingData.estimatedTime}</span>
          </div>

          <div className={styles.readingPassageBox}>
            "{readingData.passage}"
          </div>

          <div className={styles.aiMetaTags} style={{ marginTop: '8px' }}>
            <span className={styles.metaChip}>Level: {readingData.level}</span>
            <span className={styles.metaChip}>Vocab Count: {readingData.vocabCount}</span>
          </div>

          {readingNotice && (
            <div style={{ marginTop: '8px', padding: '8px 12px', background: 'var(--color-success-bg)', color: 'var(--color-success)', borderRadius: '6px', fontSize: '12px' }}>
              {readingNotice}
            </div>
          )}

          <div style={{ marginTop: '12px' }}>
            <button
              type="button"
              className={styles.btnPrimarySm}
              onClick={() => {
                setReadingNotice('Reading passage completed for today!');
                setTimeout(() => setReadingNotice(''), 4000);
              }}
            >
              Start Reading
            </button>
          </div>
        </div>

        {/* 11. Writing Practice (Interactive) */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <PenTool size={18} className={styles.sectionIcon} />
              <div>
                <h3 className={styles.sectionTitle}>Writing Practice</h3>
                <p className={styles.sectionSubtitle}>Target: {writingData.targetWordCount}</p>
              </div>
            </div>
            <span className={styles.sectionBadge}>Interactive</span>
          </div>

          <p style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
            Prompt: "{writingData.prompt}"
          </p>

          <textarea
            className={styles.writingTextarea}
            placeholder="Type your response here..."
            value={writingText}
            onChange={(e) => setWritingText(e.target.value)}
          />

          <div className={styles.writingFooter}>
            <span className={styles.wordCountLabel}>
              Word count: <strong>{wordCount}</strong> words
            </span>
            <button
              type="button"
              className={styles.btnPrimarySm}
              onClick={handleSubmitWriting}
            >
              Submit Writing
            </button>
          </div>

          {draftNotice && (
            <div style={{ marginTop: '8px', padding: '8px 12px', background: 'var(--color-info-bg)', color: 'var(--color-info)', borderRadius: '6px', fontSize: '12px' }}>
              {draftNotice}
            </div>
          )}
        </div>
      </div>

      {/* ── 12. English Progress, 13. English Score & 14. Streak ── */}
      <div className={styles.threeCol}>
        {/* 12. English Progress Breakdown */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <TrendingUp size={18} className={styles.sectionIcon} />
              <h3 className={styles.sectionTitle}>English Progress</h3>
            </div>
            <span className={styles.sectionBadge}>{progressPercent}%</span>
          </div>

          <div className={styles.progressList}>
            {dynamicProgressList.map((item) => (
              <div key={item.skill} className={styles.progressRow}>
                <span className={styles.progressSkillName}>{item.skill}</span>
                <div className={styles.progressBarTrack}>
                  <div
                    className={styles.progressBarFill}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <span className={styles.progressSkillPct}>{item.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* 13. English Score Breakdown Card */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <Award size={18} className={styles.sectionIcon} />
              <h3 className={styles.sectionTitle}>English Score</h3>
            </div>
            <span className={styles.sectionBadge}>Live</span>
          </div>

          <div className={styles.scoreCardHero}>
            <div className={styles.scoreGauge}>{progressPercent}</div>
            <div>
              <span className={styles.scoreMax}>/ {englishScoreBreakdown.maxScore}</span>
              <p style={{ fontSize: '11px', color: 'var(--color-gray-500)', marginTop: '2px' }}>Overall Proficiency</p>
            </div>
          </div>

          <div className={styles.scoreGrid}>
            {dynamicScores.map((s) => (
              <div key={s.name} className={styles.scoreItem}>
                <span>{s.name}</span>
                <span className={styles.scoreItemVal}>{s.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 14. Daily Streak Tracker */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <Flame size={18} className={styles.sectionIcon} />
              <h3 className={styles.sectionTitle}>Daily Streak</h3>
            </div>
            <span className={styles.sectionBadge}>{completedCount > 0 ? 'Active' : '0 Days'}</span>
          </div>

          <div className={styles.streakHero}>
            <Flame size={28} color="var(--color-warning)" />
            <div>
              <div className={styles.streakBig}>{completedCount > 0 ? 1 : 0} Days</div>
              <p style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>English Practice Streak</p>
            </div>
          </div>

          <div className={styles.streakDays}>
            {dynamicStreakDays.map(({ day, completed, isToday }) => (
              <div key={day} className={styles.streakDay}>
                <div
                  className={`${styles.streakDot} ${
                    completed
                      ? styles.streakDotDone
                      : isToday
                      ? styles.streakDotToday
                      : ''
                  }`}
                >
                  {completed ? <Check size={11} /> : isToday ? '•' : ''}
                </div>
                <span className={styles.streakDayLabel}>{day}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '11px', color: 'var(--color-gray-400)', marginTop: '12px', textAlign: 'center' }}>
            {completedCount > 0
              ? 'Great work! You have completed practice tasks today!'
              : 'Complete your first practice task above to start your daily streak!'}
          </p>
        </div>
      </div>


      {/* ── 15. Quick Practice (6 Cards) ── */}
      <div className={styles.fullRow}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <Clock size={18} className={styles.sectionIcon} />
              <div>
                <h3 className={styles.sectionTitle}>Quick Practice</h3>
                <p className={styles.sectionSubtitle}>Bite-sized micro drills for instant practice</p>
              </div>
            </div>
            <span className={styles.sectionBadge}>6 Modules</span>
          </div>

          <div className={styles.quickGrid}>
            {quickPracticeList.map((card) => (
              <div key={card.id} className={styles.quickCard}>
                <div className={`${styles.quickIconBox} ${styles[card.color]}`}>
                  {card.name === 'Vocabulary' && <BookOpen size={16} />}
                  {card.name === 'Grammar' && <CheckSquare size={16} />}
                  {card.name === 'Speaking' && <Mic size={16} />}
                  {card.name === 'Listening' && <Headphones size={16} />}
                  {card.name === 'Reading' && <FileText size={16} />}
                  {card.name === 'Writing' && <PenTool size={16} />}
                </div>
                <span className={styles.quickName}>{card.name}</span>
                <span className={styles.quickDesc}>{card.description}</span>
                <button
                  type="button"
                  className={styles.btnSecondarySm}
                  style={{ marginTop: '4px', width: '100%', justifyContent: 'center' }}
                  onClick={() => alert(`Starting ${card.name} practice drill...`)}
                >
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
