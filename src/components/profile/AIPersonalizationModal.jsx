import { useState } from 'react';
import {
  X,
  Sparkles,
  Bot,
  Save,
} from 'lucide-react';
import styles from './AIPersonalizationModal.module.css';

export default function AIPersonalizationModal({ data, onClose, onSave }) {
  const [coachingStyle, setCoachingStyle] = useState(data?.coachingStyle || 'Balanced');
  const [feedbackStyle, setFeedbackStyle] = useState(data?.feedbackStyle || 'Action-oriented');
  const [recommendationFreq, setRecommendationFreq] = useState(data?.recommendationFrequency || 'Balanced');
  const [aiInitiative, setAiInitiative] = useState(data?.aiInitiative || 'Recommend proactively');
  const [challengeLevel, setChallengeLevel] = useState(data?.challengeLevel || 'Balanced');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        coachingStyle,
        feedbackStyle,
        recommendationFrequency: recommendationFreq,
        aiInitiative,
        challengeLevel,
        lastUpdated: 'Just now',
      });
    }
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.badgeRow}>
              <Sparkles size={13} />
              <span>AI Coaching Calibration</span>
            </div>
            <h3 className={styles.title}>AI Coach Personalization</h3>
            <p className={styles.subtitle}>Fine-tune how your personal AI presence & communication coach interacts with you</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Coaching Tone</label>
            <select
              className={styles.select}
              value={coachingStyle}
              onChange={(e) => setCoachingStyle(e.target.value)}
            >
              <option value="Balanced">Balanced — Encouraging with clear constructive feedback</option>
              <option value="Supportive">Supportive — Celebrates consistency and positive momentum</option>
              <option value="Direct">Direct — Gets straight to technical specifics and execution</option>
              <option value="Challenger">Challenger — Pushes you outside your comfort zone</option>
            </select>
          </div>

          <div className={styles.row2Col}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Feedback Style</label>
              <select
                className={styles.select}
                value={feedbackStyle}
                onChange={(e) => setFeedbackStyle(e.target.value)}
              >
                <option value="Action-oriented">Action-oriented</option>
                <option value="Detailed">Detailed & Analytical</option>
                <option value="Encouraging">Encouraging</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Challenge Level</label>
              <select
                className={styles.select}
                value={challengeLevel}
                onChange={(e) => setChallengeLevel(e.target.value)}
              >
                <option value="Comfortable">Comfortable</option>
                <option value="Balanced">Balanced</option>
                <option value="Challenging">Challenging</option>
                <option value="Aggressive">Aggressive</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>AI Initiative</label>
            <select
              className={styles.select}
              value={aiInitiative}
              onChange={(e) => setAiInitiative(e.target.value)}
            >
              <option value="Recommend proactively">Recommend proactively (Tailors daily drills)</option>
              <option value="Ask before recommending">Ask before recommending</option>
              <option value="Actively coach me">Actively coach me (High frequency prompts)</option>
            </select>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary}>
              <Save size={14} />
              Save AI Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
