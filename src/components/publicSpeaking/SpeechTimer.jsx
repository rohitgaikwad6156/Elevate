import { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  Plus,
  Bell,
  CheckCircle2,
} from 'lucide-react';
import styles from './SpeechTimer.module.css';

const PRESETS = [
  { label: '1 min', seconds: 60 },
  { label: '2 min', seconds: 120 },
  { label: '3 min', seconds: 180 },
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
];

export default function SpeechTimer() {
  const [targetSeconds, setTargetSeconds] = useState(300); // default 5 min
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [checkpointReached, setCheckpointReached] = useState(null);

  useEffect(() => {
    let interval = null;
    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          const next = prev - 1;

          // Checkpoint alerts
          if (next === 60) setCheckpointReached('1 Minute Remaining!');
          else if (next === 180) setCheckpointReached('3 Minutes Remaining');
          else if (next === 0) setCheckpointReached('Time Complete! Well Done.');

          return next;
        });
      }, 1000);
    } else if (remainingSeconds === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds]);

  const selectPreset = (secs) => {
    setIsRunning(false);
    setTargetSeconds(secs);
    setRemainingSeconds(secs);
    setCheckpointReached(null);
  };

  const handleTogglePlay = () => {
    if (remainingSeconds === 0) {
      setRemainingSeconds(targetSeconds);
    }
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingSeconds(targetSeconds);
    setCheckpointReached(null);
  };

  const handleAdd30 = () => {
    setRemainingSeconds((prev) => prev + 30);
    setTargetSeconds((prev) => prev + 30);
  };

  // Format mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // SVG Progress Ring calculations
  const size = 260;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = targetSeconds > 0 ? remainingSeconds / targetSeconds : 0;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className={styles.container}>
      {/* Preset Chips */}
      <div className={styles.presetRow}>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            className={`${styles.presetBtn} ${
              targetSeconds === p.seconds ? styles.presetBtnActive : ''
            }`}
            onClick={() => selectPreset(p.seconds)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Circular Progress Timer */}
      <div className={styles.timerWrapper}>
        <svg width={size} height={size} className={styles.timerSvg}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={styles.trackCircle}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={styles.progressCircle}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>

        <div className={styles.timerCenterContent}>
          <div className={styles.bigDigits}>{formatTime(remainingSeconds)}</div>
          <span className={styles.timerSubLabel}>
            {isRunning ? 'Speaking in progress...' : remainingSeconds === 0 ? 'Time Complete' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Checkpoint Banner */}
      {checkpointReached && (
        <div className={styles.checkpointBanner}>
          <Bell size={14} />
          <span>{checkpointReached}</span>
        </div>
      )}

      {/* Checkpoint Indicators Bar */}
      <div className={styles.checkpointPills}>
        <span className={`${styles.pill} ${remainingSeconds <= 300 && targetSeconds >= 300 ? styles.pillActive : ''}`}>
          5 min
        </span>
        <span className={`${styles.pill} ${remainingSeconds <= 180 && targetSeconds >= 180 ? styles.pillActive : ''}`}>
          3 min
        </span>
        <span className={`${styles.pill} ${remainingSeconds <= 60 && targetSeconds >= 60 ? styles.pillActive : ''}`}>
          1 min
        </span>
      </div>

      {/* Controls */}
      <div className={styles.controlsRow}>
        <button
          type="button"
          className={styles.btnIcon}
          onClick={handleReset}
          title="Reset timer"
        >
          <RotateCcw size={18} />
        </button>

        <button
          type="button"
          className={`${styles.btnMain} ${isRunning ? styles.btnPause : styles.btnPlay}`}
          onClick={handleTogglePlay}
        >
          {isRunning ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: '2px' }} />}
        </button>

        <button
          type="button"
          className={styles.btnIcon}
          onClick={handleAdd30}
          title="Add +30 seconds"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
