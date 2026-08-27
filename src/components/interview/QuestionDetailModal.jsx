import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  Layers,
  HelpCircle,
} from 'lucide-react';
import styles from './QuestionDetailModal.module.css';

export default function QuestionDetailModal({ question, onPractice, onClose }) {
  if (!question) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.categoryRow}>
              <span className={styles.categoryBadge}>{question.category}</span>
              <span className={styles.frameworkBadge}>📐 {question.framework}</span>
            </div>
            <h2 className={styles.title}>"{question.question}"</h2>
            <p className={styles.subtitle}>
              Difficulty: {question.difficulty} • Target Duration: {question.expectedTime}
            </p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Why Asked */}
          <div className={styles.infoBox}>
            <span className={styles.infoLabel}>Why Interviewers Ask This:</span>
            <p className={styles.infoText}>{question.whyAsked}</p>
          </div>

          {/* Strong Answer Checklist */}
          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionHeading}>What A Strong Answer Includes</h3>
            <ul className={styles.checkList}>
              {question.strongAnswerIncludes?.map((item, idx) => (
                <li key={idx} className={styles.checkItem}>
                  <CheckCircle2 size={14} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes */}
          <div className={styles.mistakeBox}>
            <div className={styles.mistakeHead}>
              <AlertTriangle size={14} color="var(--color-error)" />
              <span>Common Mistake to Avoid</span>
            </div>
            <p className={styles.mistakeText}>{question.commonMistakes}</p>
          </div>

          {/* Sample Authentic Answer */}
          <div className={styles.sampleAnswerBox}>
            <div className={styles.sampleHead}>
              <Sparkles size={14} color="var(--color-primary)" />
              <span>Authentic Example Response</span>
            </div>
            <p className={styles.sampleText}>"{question.sampleAnswer}"</p>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              onClose();
              if (onPractice) onPractice(question);
            }}
          >
            <Play size={15} />
            Practice This Question Now
          </button>
        </div>
      </div>
    </div>
  );
}
