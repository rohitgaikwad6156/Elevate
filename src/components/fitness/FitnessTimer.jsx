import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Clock, Flame } from 'lucide-react';
import styles from './FitnessTimer.module.css';

export default function FitnessTimer() {
  const [mode, setMode] = useState('rest');
  const [totalSeconds, setTotalSeconds] = useState(90);
  const [secondsLeft, setSecondsLeft] = useState(90);
  const [isActive, setIsActive] = useState(false);

  const presets = [
    { label: '30s', sec: 30 },
    { label: '45s', sec: 45 },
    { label: '60s', sec: 60 },
    { label: '90s', sec: 90 },
    { label: '2 min', sec: 120 },
    { label: '5 min', sec: 300 },
  ];

  const modes = [
    { id: 'rest', name: 'Rest Timer' },
    { id: 'countdown', name: 'Countdown' },
    { id: 'emom', name: 'EMOM (1 min)' },
    { id: 'amrap', name: 'AMRAP (5 min)' },
  ];

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const selectPreset = (sec) => {
    setIsActive(false);
    setTotalSeconds(sec);
    setSecondsLeft(sec);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'emom') {
      setTotalSeconds(60);
      setSecondsLeft(60);
    } else if (newMode === 'amrap') {
      setTotalSeconds(300);
      setSecondsLeft(300);
    } else {
      setTotalSeconds(90);
      setSecondsLeft(90);
    }
  };

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // SVG Circular progress
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    totalSeconds > 0 ? circumference - (secondsLeft / totalSeconds) * circumference : 0;

  return (
    <div className={styles.container}>
      {/* Mode Selector */}
      <div className={styles.modeTabs}>
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`${styles.modeBtn} ${mode === m.id ? styles.modeBtnActive : ''}`}
            onClick={() => handleModeChange(m.id)}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Preset Buttons */}
      <div className={styles.presetRow}>
        {presets.map((p) => (
          <button
            key={p.sec}
            type="button"
            className={`${styles.presetBtn} ${
              totalSeconds === p.sec ? styles.presetBtnActive : ''
            }`}
            onClick={() => selectPreset(p.sec)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Circular Progress Timer */}
      <div className={styles.timerWrapper}>
        <svg width="240" height="240" className={styles.timerSvg}>
          <circle
            cx="120"
            cy="120"
            r={radius}
            strokeWidth="8"
            className={styles.trackCircle}
          />
          <circle
            cx="120"
            cy="120"
            r={radius}
            strokeWidth="8"
            className={styles.progressCircle}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
            transform="rotate(-90 120 120)"
          />
        </svg>

        <div className={styles.centerDigitsBox}>
          <span className={styles.timeDigits}>{formatTime(secondsLeft)}</span>
          <span className={styles.timerSubLabel}>
            {isActive ? 'TIMER RUNNING' : 'PAUSED'}
          </span>
        </div>
      </div>

      {/* Action Controls */}
      <div className={styles.controlsRow}>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={() => {
            setIsActive(false);
            setSecondsLeft(totalSeconds);
          }}
        >
          <RotateCcw size={18} />
        </button>

        <button
          type="button"
          className={`${styles.btnMain} ${isActive ? styles.btnPause : styles.btnPlay}`}
          onClick={() => setIsActive((prev) => !prev)}
        >
          {isActive ? <Pause size={22} /> : <Play size={22} />}
        </button>

        <button
          type="button"
          className={styles.btnSecondary}
          onClick={() => setSecondsLeft((prev) => prev + 15)}
        >
          <Plus size={14} />
          15s
        </button>
      </div>
    </div>
  );
}
