import { useState, useEffect } from 'react';
import {
  X,
  Camera,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Shield,
  Layers,
} from 'lucide-react';
import styles from './CameraFormCoachModal.module.css';

export default function CameraFormCoachModal({ onClose }) {
  const [selectedExercise, setSelectedExercise] = useState('Barbell Back Squat');
  const [livePrompt, setLivePrompt] = useState('Position yourself inside the frame. Calibrating alignment...');
  const [repCount, setRepCount] = useState(0);

  const supportedExercises = [
    'Barbell Back Squat',
    'Barbell Bench Press',
    'Standing Overhead Press',
    'Push-Up & Core Alignment',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRepCount((prev) => {
        const next = prev + 1;
        if (next === 2) {
          setLivePrompt('🟢 Spine neutral and knees tracking straight over toes.');
        } else if (next === 4) {
          setLivePrompt('🟡 Keep chest lifted during the lowest part of the descent.');
        } else if (next === 6) {
          setLivePrompt('🟢 Excellent depth and explosive ascent.');
        }
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.badge}>
              <Camera size={13} />
              <span>AI Form Coach Studio</span>
            </div>
            <h2 className={styles.title}>Visual Exercise Form Calibration</h2>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Exercise Selector */}
          <div className={styles.selectorRow}>
            {supportedExercises.map((ex) => (
              <button
                key={ex}
                type="button"
                className={`${styles.exBtn} ${
                  selectedExercise === ex ? styles.exBtnActive : ''
                }`}
                onClick={() => {
                  setSelectedExercise(ex);
                  setRepCount(0);
                  setLivePrompt('Calibration reset. Stand in full view.');
                }}
              >
                {ex}
              </button>
            ))}
          </div>

          {/* Camera View Box */}
          <div className={styles.cameraBox}>
            <div className={styles.framingOverlay}>
              <div className={styles.bodyOutline}>
                <span className={styles.guideTag}>Full Body Framing Guide</span>
              </div>
            </div>

            {/* Live HUD feedback */}
            <div className={styles.hudOverlay}>
              <div className={styles.hudPill}>
                <Layers size={14} color="var(--color-primary-light)" />
                <span>Reps Tracked: <strong>{repCount}</strong></span>
              </div>
              <div className={styles.hudPill}>
                <CheckCircle2 size={14} color="var(--color-success)" />
                <span>Depth: <strong>Optimal</strong></span>
              </div>
            </div>
          </div>

          {/* Live Coaching Prompt */}
          <div className={styles.promptBox}>
            <Sparkles size={16} className={styles.sparkleIcon} />
            <span>{livePrompt}</span>
          </div>

          {/* Safety Disclaimer */}
          <div className={styles.safetyBox}>
            <Shield size={16} className={styles.shieldIcon} />
            <span>
              <strong>Safety UX: </strong>AI form feedback is visual coaching guidance, not medical diagnosis. Stop immediately if you feel pain, pinching, or dizziness.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnPrimary} onClick={onClose}>
            Done Calibrating Form
          </button>
        </div>
      </div>
    </div>
  );
}
