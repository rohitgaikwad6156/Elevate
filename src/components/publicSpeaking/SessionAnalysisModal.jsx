import { useState } from 'react';
import {
  X,
  Award,
  Sparkles,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Volume2,
  FileText,
  Eye,
  Sliders,
} from 'lucide-react';
import styles from './SessionAnalysisModal.module.css';

export default function SessionAnalysisModal({ session, onClose, onPracticeAgain }) {
  const [transcriptTab, setTranscriptTab] = useState('improved'); // 'original' | 'improved'

  if (!session) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.headerBadge}>
              <Sparkles size={14} />
              <span>AI Speaking Evaluation Complete</span>
            </div>
            <h2 className={styles.title}>Your Speaking Analysis</h2>
            <p className={styles.subtitle}>Topic: {session.topic} • Duration: {session.duration}</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className={styles.body}>
          {/* Top Score Banner */}
          <div className={styles.scoreHero}>
            <div className={styles.overallScoreBox}>
              <div className={styles.scoreNumber}>{session.score}</div>
              <div className={styles.scoreMaxLabel}>/ 100</div>
              <span className={styles.scoreImprovement}>{session.improvement} vs baseline</span>
            </div>

            <div className={styles.pillarGrid}>
              <div className={styles.pillarCard}>
                <div className={styles.pillarHead}>
                  <Volume2 size={16} className={styles.pillarIcon} />
                  <span>Delivery</span>
                </div>
                <div className={styles.pillarScore}>{session.metrics?.delivery || 84}%</div>
                <span className={styles.pillarDetail}>Pace 138 WPM • Steady</span>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarHead}>
                  <FileText size={16} className={styles.pillarIcon} />
                  <span>Language</span>
                </div>
                <div className={styles.pillarScore}>{session.metrics?.language || 88}%</div>
                <span className={styles.pillarDetail}>{session.fillers || 4} fillers • Clean syntax</span>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarHead}>
                  <Sliders size={16} className={styles.pillarIcon} />
                  <span>Communication</span>
                </div>
                <div className={styles.pillarScore}>{session.metrics?.communication || 89}%</div>
                <span className={styles.pillarDetail}>Clear problem-solution flow</span>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarHead}>
                  <Eye size={16} className={styles.pillarIcon} />
                  <span>Presence</span>
                </div>
                <div className={styles.pillarScore}>{session.metrics?.presence || 82}%</div>
                <span className={styles.pillarDetail}>92% direct eye engagement</span>
              </div>
            </div>
          </div>

          {/* AI Feedback Categorization (🟢 Strengths, 🟡 Improve, 🔴 Priority) */}
          <div className={styles.feedbackSection}>
            {/* 🟢 What You Did Well */}
            <div className={`${styles.feedbackCard} ${styles.feedbackStrengths}`}>
              <div className={styles.feedbackTitleRow}>
                <span className={styles.badgeGreen}>🟢 What You Did Well</span>
              </div>
              <ul className={styles.feedbackList}>
                {session.strengths?.map((str, idx) => (
                  <li key={idx} className={styles.feedbackItem}>
                    <CheckCircle2 size={15} className={styles.itemGreenIcon} />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 🟡 What To Improve */}
            <div className={`${styles.feedbackCard} ${styles.feedbackImprove}`}>
              <div className={styles.feedbackTitleRow}>
                <span className={styles.badgeYellow}>🟡 What To Improve</span>
              </div>
              <ul className={styles.feedbackList}>
                {session.improvements?.map((imp, idx) => (
                  <li key={idx} className={styles.feedbackItem}>
                    <AlertTriangle size={15} className={styles.itemYellowIcon} />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 🔴 Priority Opportunity */}
            <div className={`${styles.feedbackCard} ${styles.feedbackPriority}`}>
              <div className={styles.feedbackTitleRow}>
                <span className={styles.badgeRed}>🔴 Your #1 Priority</span>
              </div>
              <p className={styles.priorityText}>{session.priority}</p>
              <div className={styles.aiSuggestionBox}>
                <strong>💡 AI Coach Action Plan: </strong>
                Repeat this speech once more while deliberately adding a 1-second pause after every major assertion.
              </div>
            </div>
          </div>

          {/* Transcript Inspector (Original vs Improved) */}
          <div className={styles.transcriptSection}>
            <div className={styles.transcriptHeader}>
              <h3 className={styles.transcriptTitle}>Speech Transcript & AI Polish</h3>
              <div className={styles.tabToggleBox}>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${transcriptTab === 'original' ? styles.tabBtnActive : ''}`}
                  onClick={() => setTranscriptTab('original')}
                >
                  Original Speech
                </button>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${transcriptTab === 'improved' ? styles.tabBtnActive : ''}`}
                  onClick={() => setTranscriptTab('improved')}
                >
                  ✨ AI Enhanced Version
                </button>
              </div>
            </div>

            <div className={styles.transcriptBox}>
              {transcriptTab === 'original' ? (
                <p className={styles.transcriptText}>
                  {session.transcript?.original ||
                    "Good afternoon everyone. Today I'm excited to share our Q3 milestones. We sort of exceeded our user growth target by 24%, um, primarily driven by our new onboarding funnel."}
                </p>
              ) : (
                <div className={styles.improvedBox}>
                  <p className={styles.transcriptText}>
                    {session.transcript?.improved ||
                      "Good afternoon everyone. Today I am proud to share our Q3 milestones. We exceeded our user growth target by 24%, driven primarily by our redesigned onboarding funnel."}
                  </p>
                  <span className={styles.improvedBadge}>
                    ✨ 0 Fillers • 100% Concise • Elevated Phrasing
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Close Report
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              onClose();
              if (onPracticeAgain) onPracticeAgain(session.topic);
            }}
          >
            <RotateCcw size={16} />
            Practice Again with Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
