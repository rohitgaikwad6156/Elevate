import { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Clock,
  Layers,
  MessageSquare,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import styles from './InterviewReportModal.module.css';

export default function InterviewReportModal({ session, onClose, onPracticeAgain }) {
  const [showImprovedTranscript, setShowImprovedTranscript] = useState(true);

  if (!session) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.headerBadge}>
              <Sparkles size={13} />
              <span>AI Performance Report</span>
            </div>
            <h2 className={styles.title}>Mock Interview Analysis</h2>
            <p className={styles.subtitle}>
              Role: {session.title} • Duration: {session.duration}
            </p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Score Hero */}
          <div className={styles.scoreHero}>
            <div className={styles.scoreBox}>
              <span className={styles.scoreNum}>{session.score}</span>
              <span className={styles.scoreLabel}>/ 100 Overall Score</span>
              <span className={styles.scoreVerdict}>Strong Performance</span>
            </div>

            <div className={styles.pillarGrid}>
              <div className={styles.pillarCard}>
                <span className={styles.pillarLabel}>Communication</span>
                <span className={styles.pillarScore}>{session.scores?.communication || 86}%</span>
              </div>
              <div className={styles.pillarCard}>
                <span className={styles.pillarLabel}>Confidence</span>
                <span className={styles.pillarScore}>{session.scores?.confidence || 84}%</span>
              </div>
              <div className={styles.pillarCard}>
                <span className={styles.pillarLabel}>Technical Depth</span>
                <span className={styles.pillarScore}>{session.scores?.technical || 78}%</span>
              </div>
              <div className={styles.pillarCard}>
                <span className={styles.pillarLabel}>Structure (STAR)</span>
                <span className={styles.pillarScore}>{session.scores?.structure || 88}%</span>
              </div>
              <div className={styles.pillarCard}>
                <span className={styles.pillarLabel}>Conciseness</span>
                <span className={styles.pillarScore}>{session.scores?.conciseness || 75}%</span>
              </div>
              <div className={styles.pillarCard}>
                <span className={styles.pillarLabel}>Filler Words</span>
                <span className={styles.pillarScore} style={{ color: 'var(--color-success)' }}>
                  {session.fillerWordsPerMin || '3.2 / min'}
                </span>
              </div>
            </div>
          </div>

          {/* Categorized AI Feedback Cards */}
          <div className={styles.feedbackGrid}>
            <div className={`${styles.feedbackCard} ${styles.cardGreen}`}>
              <span className={styles.tagGreen}>🟢 What You Did Well</span>
              <ul className={styles.list}>
                {session.strengths?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className={`${styles.feedbackCard} ${styles.cardYellow}`}>
              <span className={styles.tagYellow}>🟡 Biggest Opportunity</span>
              <ul className={styles.list}>
                {session.weaknesses?.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>

            <div className={`${styles.feedbackCard} ${styles.cardRed}`}>
              <span className={styles.tagRed}>🔴 #1 Priority Action</span>
              <p className={styles.priorityText}>{session.priorityImprovement}</p>
            </div>
          </div>

          {/* Transcript Diff Inspector (Original vs AI Enhanced Polish) */}
          {session.transcriptExample && (
            <div className={styles.transcriptSection}>
              <div className={styles.transcriptHead}>
                <div>
                  <h3 className={styles.transcriptTitle}>Answer-by-Answer Transcript Polish</h3>
                  <p className={styles.transcriptSub}>
                    Question: "{session.transcriptExample.question}"
                  </p>
                </div>
                <div className={styles.togglePills}>
                  <button
                    type="button"
                    className={`${styles.togglePill} ${
                      !showImprovedTranscript ? styles.pillActive : ''
                    }`}
                    onClick={() => setShowImprovedTranscript(false)}
                  >
                    Original Answer
                  </button>
                  <button
                    type="button"
                    className={`${styles.togglePill} ${
                      showImprovedTranscript ? styles.pillActive : ''
                    }`}
                    onClick={() => setShowImprovedTranscript(true)}
                  >
                    ✨ AI Enhanced Polish
                  </button>
                </div>
              </div>

              <div className={styles.transcriptCard}>
                <p className={styles.transcriptBody}>
                  {showImprovedTranscript
                    ? session.transcriptExample.improvedAnswer
                    : session.transcriptExample.originalAnswer}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Close Report
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              onClose();
              if (onPracticeAgain) onPracticeAgain(session.title);
            }}
          >
            <RotateCcw size={15} />
            Practice Recommended Weakness
          </button>
        </div>
      </div>
    </div>
  );
}
