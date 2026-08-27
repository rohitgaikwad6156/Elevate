import { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Eye,
  Activity,
  Smile,
  Hand,
  PersonStanding,
  Award,
  Layers,
} from 'lucide-react';
import styles from './BodyLanguageAnalysisModal.module.css';

export default function BodyLanguageAnalysisModal({ session, onClose, onPracticeAgain }) {
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(0);

  if (!session) return null;

  const currentEvent = session.timelineEvents ? session.timelineEvents[selectedTimelineIndex] : null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.headerBadge}>
              <Sparkles size={14} />
              <span>AI Nonverbal Presence Analysis Complete</span>
            </div>
            <h2 className={styles.title}>Your Body Language Analysis</h2>
            <p className={styles.subtitle}>Session: {session.topic} • Duration: {session.duration}</p>
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
              <div className={styles.scoreNumber}>{session.overallScore}</div>
              <div className={styles.scoreMaxLabel}>/ 100 Overall Score</div>
              <span className={styles.scoreImprovement}>{session.improvement} vs last week</span>
            </div>

            <div className={styles.pillarGrid}>
              <div className={styles.pillarCard}>
                <div className={styles.pillarHead}>
                  <PersonStanding size={15} className={styles.pillarIcon} />
                  <span>Posture</span>
                </div>
                <div className={styles.pillarScore}>{session.scores?.posture || 88}%</div>
                <span className={styles.pillarDetail}>Upright spine • Level shoulders</span>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarHead}>
                  <Eye size={15} className={styles.pillarIcon} />
                  <span>Eye Contact</span>
                </div>
                <div className={styles.pillarScore}>{session.scores?.eyeContact || 82}%</div>
                <span className={styles.pillarDetail}>88% direct camera lens gaze</span>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarHead}>
                  <Smile size={15} className={styles.pillarIcon} />
                  <span>Expression</span>
                </div>
                <div className={styles.pillarScore}>{session.scores?.expression || 84}%</div>
                <span className={styles.pillarDetail}>Approachable & composed</span>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarHead}>
                  <Hand size={15} className={styles.pillarIcon} />
                  <span>Gestures</span>
                </div>
                <div className={styles.pillarScore}>{session.scores?.gestures || 78}%</div>
                <span className={styles.pillarDetail}>Open-hand framing used</span>
              </div>
            </div>
          </div>

          {/* 4 Categorized Feedback Cards */}
          <div className={styles.feedbackGrid}>
            {/* 🟢 What You're Doing Well */}
            <div className={`${styles.feedbackCard} ${styles.cardGreen}`}>
              <div className={styles.cardHeaderRow}>
                <span className={styles.tagGreen}>🟢 What You're Doing Well</span>
              </div>
              <ul className={styles.feedbackList}>
                {session.strengths?.map((str, idx) => (
                  <li key={idx} className={styles.feedbackItem}>
                    <CheckCircle2 size={15} className={styles.iconGreen} />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 🟡 Biggest Opportunity */}
            <div className={`${styles.feedbackCard} ${styles.cardYellow}`}>
              <div className={styles.cardHeaderRow}>
                <span className={styles.tagYellow}>🟡 Biggest Opportunity</span>
              </div>
              <p className={styles.opportunityText}>{session.biggestOpportunity}</p>
              <div className={styles.impactBox}>
                <strong>Impact: </strong>Slight gaze drops can make complex points appear uncertain.
              </div>
            </div>

            {/* 🔴 Small Adjustment */}
            <div className={`${styles.feedbackCard} ${styles.cardRed}`}>
              <div className={styles.cardHeaderRow}>
                <span className={styles.tagRed}>🔴 Small Tactical Adjustment</span>
              </div>
              <p className={styles.adjustmentText}>{session.smallAdjustment}</p>
              <div className={styles.nextPracticeBox}>
                <strong>💡 Recommended Drill: </strong>
                {session.nextPractice}
              </div>
            </div>
          </div>

          {/* Visual Interactive Session Timeline */}
          {session.timelineEvents && (
            <div className={styles.timelineSection}>
              <div className={styles.timelineHead}>
                <h3 className={styles.timelineTitle}>Session Timeline Telemetry</h3>
                <span className={styles.timelineSubtitle}>Click any timestamp to view AI observation</span>
              </div>

              <div className={styles.timelineBar}>
                {session.timelineEvents.map((evt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.timelineNode} ${
                      selectedTimelineIndex === idx ? styles.timelineNodeActive : ''
                    } ${evt.rating === 'warning' ? styles.nodeWarning : styles.nodeGood}`}
                    onClick={() => setSelectedTimelineIndex(idx)}
                  >
                    <span className={styles.timeTag}>{evt.time}</span>
                  </button>
                ))}
              </div>

              {currentEvent && (
                <div className={styles.eventDetailCard}>
                  <div className={styles.eventTimeBadge}>{currentEvent.time} Observation</div>
                  <p className={styles.eventText}>{currentEvent.title}</p>
                </div>
              )}
            </div>
          )}

          {/* Body Language Heatmap Matrix */}
          {session.heatmap && (
            <div className={styles.heatmapSection}>
              <h3 className={styles.timelineTitle}>Nonverbal Signal Heatmap Over Time</h3>
              <div className={styles.heatmapGrid}>
                {session.heatmap.map((row) => (
                  <div key={row.skill} className={styles.heatmapRow}>
                    <span className={styles.heatmapSkillName}>{row.skill}</span>
                    <div className={styles.heatmapCells}>
                      {row.points.map((pt, pIdx) => (
                        <span
                          key={pIdx}
                          className={`${styles.heatmapCell} ${
                            pt === 'good' ? styles.cellGood : styles.cellWarning
                          }`}
                          title={`${row.skill} at T+${pIdx * 30}s: ${pt}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
