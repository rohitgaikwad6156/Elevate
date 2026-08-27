import { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  FileText,
  HelpCircle,
  RotateCcw,
  Award,
} from 'lucide-react';
import styles from './LessonViewerModal.module.css';

export default function LessonViewerModal({ lesson, onFinish, onClose }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userNote, setUserNote] = useState('');

  const currentLesson = lesson || {
    title: 'Speaking With Direct Clarity (The PREP Method)',
    lessonNumber: 'Lesson 4 of 8',
    pathName: 'Professional Communication',
    concept:
      'When asked spontaneous questions in meetings or interviews, professionals often ramble while searching for what to say. The PREP framework provides an instant, structured mental roadmap: Point, Reason, Example, and Point.',
    keyPrinciple: 'Lead with your conclusion first (BLUF: Bottom Line Up Front) rather than building up to it slowly.',
    beforeAfter: {
      before: '"I was thinking that maybe, if everyone is open to it, we could potentially consider testing a weekly async check-in..."',
      after: '"I recommend moving our daily status sync to an async Slack thread. (Point) It will save the team 4 hours of context-switching weekly. (Reason)"',
    },
    practiceTask: {
      question: 'Which response demonstrates stronger executive clarity?',
      options: [
        {
          id: 'a',
          text: '"I don’t really know for sure, but maybe we could test changing the API endpoint."',
          correct: false,
          explanation: 'Contains 3 hedge phrases ("don’t really know", "maybe", "could") that dilute your technical authority.',
        },
        {
          id: 'b',
          text: '"I recommend migrating to the v2 endpoint. It cuts P99 latency by 30% and is already tested in staging."',
          correct: true,
          explanation: 'Direct recommendation followed immediately by quantifiable technical rationale.',
        },
      ],
    },
    learningObjectives: [
      'Master the 4-step PREP framework for meetings and interviews',
      'Identify and eliminate hedge words ("maybe", "kind of", "I feel like")',
      'Structure concise 60-second updates with measurable impact',
    ],
  };

  const handleSelectOption = (opt) => {
    setSelectedOption(opt);
    setShowExplanation(true);
  };

  const handleFinishLesson = () => {
    setIsCompleted(true);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <span className={styles.pathTag}>
              {currentLesson.pathName} • {currentLesson.lessonNumber}
            </span>
            <h2 className={styles.title}>{currentLesson.title}</h2>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {!isCompleted ? (
            <>
              {/* Core Concept Box */}
              <div className={styles.conceptCard}>
                <div className={styles.conceptHead}>
                  <BookOpen size={16} className={styles.iconPrimary} />
                  <span className={styles.conceptHeadTitle}>Core Concept & Mental Model</span>
                </div>
                <p className={styles.conceptText}>{currentLesson.concept}</p>
                <div className={styles.keyPrincipleBox}>
                  <strong>Key Principle: </strong>
                  {currentLesson.keyPrinciple}
                </div>
              </div>

              {/* Before vs After Comparison */}
              {currentLesson.beforeAfter && (
                <div className={styles.comparisonGrid}>
                  <div className={styles.beforeCard}>
                    <span className={styles.beforeTag}>❌ Weak / Padding Phrasing</span>
                    <p className={styles.phrasingText}>{currentLesson.beforeAfter.before}</p>
                  </div>
                  <div className={styles.afterCard}>
                    <span className={styles.afterTag}>✅ High-Impact Direct Phrasing</span>
                    <p className={styles.phrasingText}>{currentLesson.beforeAfter.after}</p>
                  </div>
                </div>
              )}

              {/* Interactive Practice Question */}
              {currentLesson.practiceTask && (
                <div className={styles.practiceSection}>
                  <div className={styles.practiceHead}>
                    <Sparkles size={15} color="var(--color-primary)" />
                    <span className={styles.practiceTitle}>Interactive Knowledge Check</span>
                  </div>
                  <h4 className={styles.practiceQuestion}>{currentLesson.practiceTask.question}</h4>

                  <div className={styles.optionList}>
                    {currentLesson.practiceTask.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`${styles.optionBtn} ${
                          selectedOption?.id === opt.id
                            ? opt.correct
                              ? styles.optionCorrect
                              : styles.optionIncorrect
                            : ''
                        }`}
                        onClick={() => handleSelectOption(opt)}
                      >
                        <span className={styles.optionText}>{opt.text}</span>
                        {selectedOption?.id === opt.id && (
                          <span className={styles.optionStatus}>
                            {opt.correct ? '✓ Correct' : '✕ Try Again'}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {showExplanation && selectedOption && (
                    <div
                      className={`${styles.explanationBox} ${
                        selectedOption.correct ? styles.expSuccess : styles.expWarning
                      }`}
                    >
                      <strong>{selectedOption.correct ? 'Well Done! ' : 'Notice: '}</strong>
                      {selectedOption.explanation}
                    </div>
                  )}
                </div>
              )}

              {/* Learning Objectives Checklist */}
              {currentLesson.learningObjectives && (
                <div className={styles.objectivesBox}>
                  <span className={styles.objHeading}>After this lesson you will:</span>
                  <ul className={styles.objList}>
                    {currentLesson.learningObjectives.map((obj, i) => (
                      <li key={i}>
                        <CheckCircle2 size={13} color="var(--color-success)" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Personal Notes */}
              <div className={styles.notesSection}>
                <label className={styles.notesLabel}>My Study Notes for this Lesson:</label>
                <input
                  type="text"
                  className={styles.notesInput}
                  placeholder="Capture a key takeaway or personal reflection..."
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                />
              </div>
            </>
          ) : (
            <div className={styles.completionScreen}>
              <div className={styles.trophyCircle}>
                <Award size={36} color="var(--color-primary)" />
              </div>
              <h3 className={styles.completionHeading}>Lesson Complete! 🎉</h3>
              <p className={styles.completionSub}>
                You earned <strong>+20 XP</strong> for mastering the PREP Framework.
              </p>
              <div className={styles.takeawayCard}>
                <span className={styles.takeawayTag}>Key Takeaway Recap</span>
                <p style={{ fontSize: '12px', color: 'var(--color-gray-700)', marginTop: '4px' }}>
                  Always state your conclusion (Point) first before providing reasons and examples. Respect your listener's cognitive attention.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          {!isCompleted ? (
            <>
              <button type="button" className={styles.btnSecondary} onClick={onClose}>
                Save & Exit
              </button>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={handleFinishLesson}
              >
                Complete Lesson (+20 XP)
                <ArrowRight size={15} />
              </button>
            </>
          ) : (
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={() => {
                onClose();
                if (onFinish) onFinish();
              }}
            >
              Continue to Next Lesson
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
