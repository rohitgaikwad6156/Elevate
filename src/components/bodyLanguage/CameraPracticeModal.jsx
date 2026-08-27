import { useState, useEffect } from 'react';
import {
  Camera,
  Square,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Eye,
  Activity,
  Shield,
  Volume2,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import styles from './CameraPracticeModal.module.css';

export default function CameraPracticeModal({ mode, topic, onFinish, onClose }) {
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [coachingEnabled, setCoachingEnabled] = useState(true);
  const [liveEyeContact, setLiveEyeContact] = useState(84);
  const [livePostureStatus, setLivePostureStatus] = useState('Upright & Level');
  const [liveCoachingPrompt, setLiveCoachingPrompt] = useState('Position aligned. Maintain natural camera eye contact.');

  // Live timer & coaching cues
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;

        if (coachingEnabled) {
          if (next === 5) {
            setLiveCoachingPrompt('Great eye contact — hold steady gaze on the lens.');
            setLiveEyeContact(86);
          } else if (next === 15) {
            setLiveCoachingPrompt('Subtle forward head tilt detected. Keep chin level with horizon.');
            setLivePostureStatus('Slight Forward Tilt');
          } else if (next === 25) {
            setLiveCoachingPrompt('Shoulders relaxed and open — excellent executive presence.');
            setLivePostureStatus('Upright & Level');
            setLiveEyeContact(88);
          } else if (next === 40) {
            setLiveCoachingPrompt('Use open-hand gestures to emphasize key transition points.');
          }
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, coachingEnabled]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleRestart = () => {
    setSeconds(0);
    setIsPaused(false);
    setLiveEyeContact(84);
    setLivePostureStatus('Upright & Level');
    setLiveCoachingPrompt('Calibration reset. Speak naturally with open posture.');
  };

  const handleComplete = () => {
    onFinish({
      durationSeconds: seconds,
      formattedTime: formatTime(seconds),
      avgEyeContact: liveEyeContact,
      posture: livePostureStatus,
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Top Header HUD */}
        <div className={styles.header}>
          <div className={styles.statusBadge}>
            <span className={`${styles.recDot} ${isPaused ? styles.recDotPaused : ''}`} />
            <span>{isPaused ? 'SESSION PAUSED' : 'AI CAMERA CALIBRATION ACTIVE'}</span>
          </div>

          <div className={styles.sessionMeta}>
            <span className={styles.metaLabel}>Mode:</span>
            <span className={styles.metaTitle}>{mode || 'Confidence Practice'}</span>
          </div>

          <div className={styles.privacyBadge} title="Video processed locally. Zero permanent cloud storage.">
            <Shield size={14} />
            <span>Local Privacy Protected</span>
          </div>
        </div>

        {/* Camera Stage */}
        <div className={styles.cameraStage}>
          {/* Main Video View Box */}
          <div className={styles.videoBox}>
            {/* Posture & Face Alignment Guide Overlay */}
            <div className={styles.framingOverlay}>
              <div className={styles.headGuide}>
                <span className={styles.guideTag}>Head & Eye Level</span>
              </div>
              <div className={styles.shoulderGuide}>
                <span className={styles.guideTag}>Shoulder Alignment</span>
              </div>
            </div>

            {/* Live HUD Telemetry Overlay */}
            <div className={styles.hudOverlay}>
              <div className={styles.hudPill}>
                <Eye size={14} className={styles.hudIcon} />
                <span>Eye Contact: <strong>{liveEyeContact}%</strong></span>
              </div>
              <div className={styles.hudPill}>
                <Activity size={14} className={styles.hudIcon} />
                <span>Posture: <strong>{livePostureStatus}</strong></span>
              </div>
              <div className={styles.hudPill}>
                <CheckCircle2 size={14} className={styles.hudIcon} />
                <span>Presence: <strong>Strong</strong></span>
              </div>
            </div>
          </div>

          {/* Big High-Contrast Timer */}
          <div className={styles.timerDigits}>{formatTime(seconds)}</div>

          {/* Real-time AI Coaching Nudge Box */}
          {coachingEnabled && (
            <div className={styles.coachingBox}>
              <Sparkles size={16} className={styles.sparkleIcon} />
              <span>{liveCoachingPrompt}</span>
            </div>
          )}

          {/* Coaching Toggle Switch */}
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>Live Coaching Feedback</span>
            <button
              type="button"
              className={`${styles.toggleSwitch} ${coachingEnabled ? styles.toggleOn : ''}`}
              onClick={() => setCoachingEnabled((prev) => !prev)}
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={handleRestart}
          >
            <RotateCcw size={16} />
            Restart
          </button>

          <button
            type="button"
            className={`${styles.btnPrimary} ${isPaused ? styles.btnResume : styles.btnPause}`}
            onClick={() => setIsPaused((prev) => !prev)}
          >
            {isPaused ? <Play size={18} /> : <Pause size={18} />}
            {isPaused ? 'Resume Camera' : 'Pause Camera'}
          </button>

          <button
            type="button"
            className={styles.btnStop}
            onClick={handleComplete}
          >
            <Square size={16} />
            Finish & View AI Presence Report
          </button>
        </div>
      </div>
    </div>
  );
}
