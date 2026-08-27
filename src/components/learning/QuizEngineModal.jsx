import { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Award,
} from 'lucide-react';
import styles from './QuizEngineModal.module.css';

export default function QuizEngineModal({ quiz, onFinish, onClose }) {
  const currentQuiz = quiz || {
    title: 'Workplace Communication & Clarity Check',
    questions: [
      {
        q: 'What is the primary objective of the "Bottom Line Up Front" (BLUF) communication method?',
        options: [
          'To hide negative results until the very end',
          'To give the key decision or takeaway in the first sentence so executives understand the point immediately',
          'To write long formal emails with extensive background history',
          'To avoid giving recommendations directly',
        ],
        correct: 1,
        explanation: 'BLUF respects cognitive attention by placing the actionable recommendation first.',
      },
      {
        q: 'In the PREP framework, what does the second "P" stand for?',
        options: ['Presentation', 'Priority', 'Point (Restatement of your core conclusion)', 'Planning'],
        correct: 2,
        explanation: 'PREP concludes by reinforcing your initial Point with decisive conviction.',
      },
      {
        q: 'Which phrase is the most effective replacement for "I might be wrong, but maybe we should..."?',
        options: [
          '"I recommend that we..."',
          '"I feel kind of like we could..."',
          '"Don’t blame me if this fails, but..."',
          '"I guess we could consider..."',
        ],
        correct: 0,
        explanation: '"I recommend that we..." demonstrates clear ownership and professional confidence.',
      },
    ],
  };

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = currentQuiz.questions[currentIdx];

  const handleSelect = (idx) => {
    if (selectedOpt !== null) return; // Prevent changing after selection
    setSelectedOpt(idx);
    if (idx === currentQ.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < currentQuiz.questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <span className={styles.quizTag}>Quiz Assessment</span>
            <h3 className={styles.title}>{currentQuiz.title}</h3>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {!isFinished ? (
            <>
              <div className={styles.progressRow}>
                <span className={styles.qCounter}>
                  Question {currentIdx + 1} of {currentQuiz.questions.length}
                </span>
                <span className={styles.scoreLive}>Score: {score}</span>
              </div>

              <h4 className={styles.questionText}>"{currentQ.q}"</h4>

              <div className={styles.optionsList}>
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`${styles.optionBtn} ${
                      selectedOpt !== null
                        ? i === currentQ.correct
                          ? styles.optCorrect
                          : selectedOpt === i
                          ? styles.optWrong
                          : ''
                        : ''
                    }`}
                    onClick={() => handleSelect(i)}
                  >
                    <span>{opt}</span>
                    {selectedOpt !== null && i === currentQ.correct && (
                      <CheckCircle2 size={16} color="var(--color-success)" />
                    )}
                    {selectedOpt === i && i !== currentQ.correct && (
                      <AlertTriangle size={16} color="var(--color-error)" />
                    )}
                  </button>
                ))}
              </div>

              {selectedOpt !== null && (
                <div className={styles.feedbackBox}>
                  <strong>{selectedOpt === currentQ.correct ? 'Correct! ' : 'Explanation: '}</strong>
                  {currentQ.explanation}
                </div>
              )}
            </>
          ) : (
            <div className={styles.resultBox}>
              <div className={styles.trophy}>
                <Award size={40} color="var(--color-primary)" />
              </div>
              <h3 className={styles.resultTitle}>Quiz Completed! 🎉</h3>
              <p className={styles.resultScore}>
                You scored <strong>{score} / {currentQuiz.questions.length}</strong> (
                {Math.round((score / currentQuiz.questions.length) * 100)}% Accuracy)
              </p>
              <span className={styles.rewardBadge}>+15 XP Earned</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          {!isFinished ? (
            <button
              type="button"
              className={styles.btnPrimary}
              disabled={selectedOpt === null}
              onClick={handleNext}
            >
              {currentIdx < currentQuiz.questions.length - 1 ? 'Next Question' : 'View Results'}
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={() => {
                onClose();
                if (onFinish) onFinish();
              }}
            >
              Return to Learning Hub
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
