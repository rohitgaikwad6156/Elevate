import { useState, useEffect } from 'react';
import {
  X,
  Mic,
  Video,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Volume2,
  User,
  Shield,
  Layers,
  HelpCircle,
} from 'lucide-react';
import styles from './MockInterviewModal.module.css';

export default function MockInterviewModal({ questions, role, onFinish, onClose }) {
  const qList = questions || [
    {
      id: 'mq-1',
      question: 'Tell me about yourself and your professional background.',
      category: 'Introduction',
      expectedDuration: '90s',
      starType: false,
      followUps: ['What was the most challenging project in your recent role?'],
    },
    {
      id: 'mq-2',
      question: 'Describe a time you solved a high-severity production outage under time pressure.',
      category: 'Behavioral',
      expectedDuration: '120s',
      starType: true,
      followUps: ['What automated safeguards did you implement to prevent recurrence?'],
    },
    {
      id: 'mq-3',
      question: 'How do you ensure web application performance and optimize rendering bottlenecks?',
      category: 'Technical',
      expectedDuration: '120s',
      starType: false,
      followUps: ['What are the trade-offs of server-side rendering vs client-side caching?'],
    },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [mode, setMode] = useState('text'); // 'text', 'voice', 'video'
  const [elapsedSec, setElapsedSec] = useState(0);
  const [showStarGuide, setShowStarGuide] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [activeFollowUp, setActiveFollowUp] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const currentQ = qList[currentIdx];

  // Session elapsed timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSec((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (activeFollowUp === null && currentQ.followUps && currentQ.followUps.length > 0) {
      // Trigger dynamic AI interviewer follow-up question
      setIsAiThinking(true);
      setTimeout(() => {
        setIsAiThinking(false);
        setActiveFollowUp(currentQ.followUps[0]);
        setUserAnswer('');
      }, 900);
    } else {
      // Proceed to next main question
      if (currentIdx < qList.length - 1) {
        setCurrentIdx((prev) => prev + 1);
        setActiveFollowUp(null);
        setUserAnswer('');
        setShowStarGuide(false);
      } else {
        // Complete interview
        handleCompleteInterview();
      }
    }
  };

  const handleCompleteInterview = () => {
    onFinish({
      durationFormatted: formatTime(elapsedSec),
      questionsAnswered: qList.length,
      role: role || 'Senior Software Engineer',
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Top Header */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.roleBadge}>🎯 {role || 'Software Engineer'}</span>
            <span className={styles.qCounter}>
              Question {currentIdx + 1} of {qList.length}
            </span>
          </div>

          <div className={styles.headerControls}>
            <div className={styles.timerBox}>
              <Clock size={14} />
              <span>{formatTime(elapsedSec)}</span>
            </div>
            <button type="button" className={styles.closeBtn} onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Interviewer Stage */}
        <div className={styles.stage}>
          {/* AI Interviewer Avatar & Speech Card */}
          <div className={styles.interviewerCard}>
            <div className={styles.interviewerAvatarBox}>
              <div className={styles.avatarCircle}>
                <User size={22} color="var(--color-primary)" />
              </div>
              <div className={styles.interviewerNameCol}>
                <span className={styles.interviewerName}>Alex</span>
                <span className={styles.interviewerRole}>AI Lead Technical Interviewer</span>
              </div>
            </div>

            <div className={styles.questionPromptBox}>
              <span className={styles.categoryTag}>
                {activeFollowUp ? '⚡ Follow-Up Question' : currentQ.category}
              </span>
              <h2 className={styles.questionText}>
                "{activeFollowUp || currentQ.question}"
              </h2>
            </div>
          </div>

          {/* Video Mirror / Mode Selector */}
          <div className={styles.modeTabsRow}>
            <div className={styles.modeTabs}>
              <button
                type="button"
                className={`${styles.modeTab} ${mode === 'text' ? styles.modeTabActive : ''}`}
                onClick={() => setMode('text')}
              >
                <FileText size={14} />
                Text Response
              </button>
              <button
                type="button"
                className={`${styles.modeTab} ${mode === 'voice' ? styles.modeTabActive : ''}`}
                onClick={() => setMode('voice')}
              >
                <Mic size={14} />
                Voice Mode
              </button>
              <button
                type="button"
                className={`${styles.modeTab} ${mode === 'video' ? styles.modeTabActive : ''}`}
                onClick={() => setMode('video')}
              >
                <Video size={14} />
                Video Simulator
              </button>
            </div>

            {currentQ.starType && (
              <button
                type="button"
                className={`${styles.starToggleBtn} ${showStarGuide ? styles.starToggleActive : ''}`}
                onClick={() => setShowStarGuide((prev) => !prev)}
              >
                <Sparkles size={13} />
                {showStarGuide ? 'Hide STAR Guide' : 'Show STAR Framework'}
              </button>
            )}
          </div>

          {/* STAR Framework Helper Box */}
          {showStarGuide && (
            <div className={styles.starBox}>
              <div className={styles.starStep}>
                <strong>S (Situation): </strong>Set the context and problem constraint.
              </div>
              <div className={styles.starStep}>
                <strong>T (Task): </strong>What was your specific responsibility?
              </div>
              <div className={styles.starStep}>
                <strong>A (Action): </strong>Describe the exact technical steps you took.
              </div>
              <div className={styles.starStep}>
                <strong>R (Result): </strong>Quantify the outcome (e.g. 35% latency reduction).
              </div>
            </div>
          )}

          {/* Answer Workspace Area */}
          {mode === 'text' && (
            <div className={styles.textAreaWrapper}>
              <textarea
                className={styles.answerTextArea}
                placeholder="Type your structured answer here. Speak clearly, explain trade-offs, and quantify business/technical results..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
            </div>
          )}

          {mode === 'voice' && (
            <div className={styles.voiceWrapper}>
              <button
                type="button"
                className={`${styles.micCircleBtn} ${isRecording ? styles.micActive : ''}`}
                onClick={() => setIsRecording((prev) => !prev)}
              >
                <Mic size={28} />
              </button>
              <span className={styles.voiceStatusText}>
                {isRecording ? 'Listening... Speak your answer.' : 'Click to start voice recording'}
              </span>
            </div>
          )}

          {mode === 'video' && (
            <div className={styles.videoWrapper}>
              <div className={styles.videoScreen}>
                <div className={styles.videoOverlay}>
                  <span>Eye Contact: 88% • Posture: Upright</span>
                </div>
              </div>
              <textarea
                className={styles.videoAnswerInput}
                placeholder="Type notes or bullet points while maintaining camera lens engagement..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setUserAnswer('')}
          >
            <RotateCcw size={15} />
            Clear Answer
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className={styles.finishEarlyBtn}
              onClick={handleCompleteInterview}
            >
              End Interview & View AI Report
            </button>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={handleNextQuestion}
              disabled={isAiThinking}
            >
              {isAiThinking ? (
                <span>Alex is analyzing...</span>
              ) : activeFollowUp === null && currentQ.followUps?.length > 0 ? (
                <>
                  <span>Submit Answer</span>
                  <ChevronRight size={16} />
                </>
              ) : currentIdx < qList.length - 1 ? (
                <>
                  <span>Next Question</span>
                  <ChevronRight size={16} />
                </>
              ) : (
                <>
                  <span>Finish Interview</span>
                  <CheckCircle2 size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
