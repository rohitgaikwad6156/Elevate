import { useState, useEffect } from 'react';
import {
  Mic,
  Square,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Camera,
  Activity,
  AlertCircle,
  CheckCircle2,
  Volume2,
} from 'lucide-react';
import styles from './LiveRecordingModal.module.css';

export default function LiveRecordingModal({ topic, onFinish, onClose }) {
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [livePace, setLivePace] = useState(134);
  const [fillerCount, setFillerCount] = useState(0);
  const [liveCoachTip, setLiveCoachTip] = useState('Maintain strong eye contact with your virtual audience.');

  // Timer simulation
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;

        // Dynamic coaching cues at milestones
        if (next === 5) {
          setLiveCoachTip('Great opening! Keep your pace measured at ~135 WPM.');
          setLivePace(136);
        } else if (next === 15) {
          setLiveCoachTip('Deliberate 1-second pause detected — excellent cadence.');
          setLivePace(132);
        } else if (next === 25) {
          setLiveCoachTip('Filler word avoided! Take a silent breath before your next point.');
          setLivePace(138);
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Format seconds to mm:ss
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleRestart = () => {
    setSeconds(0);
    setIsPaused(false);
    setFillerCount(0);
    setLivePace(130);
    setLiveCoachTip('Ready to begin. Speak naturally and clearly.');
  };

  const handleComplete = () => {
    onFinish({
      durationSeconds: seconds,
      formattedTime: formatTime(seconds),
      avgPace: livePace,
      fillers: fillerCount,
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Header Bar */}
        <div className={styles.header}>
          <div className={styles.recordingBadge}>
            <span className={`${styles.recDot} ${isPaused ? styles.recDotPaused : ''}`} />
            <span>{isPaused ? 'PAUSED' : 'LIVE RECORDING'}</span>
          </div>

          <div className={styles.topicInfo}>
            <span className={styles.topicLabel}>Active Prompt:</span>
            <span className={styles.topicTitle}>{topic || 'General Impromptu Practice'}</span>
          </div>

          <button
            type="button"
            className={`${styles.cameraToggle} ${isCameraActive ? styles.cameraActive : ''}`}
            onClick={() => setIsCameraActive((prev) => !prev)}
            title="Toggle video mirror"
          >
            <Camera size={16} />
            <span>{isCameraActive ? 'Camera On' : 'Camera Off'}</span>
          </button>
        </div>

        {/* Central Workspace */}
        <div className={styles.workspace}>
          {isCameraActive ? (
            <div className={styles.cameraBox}>
              <div className={styles.faceGuide}>
                <span className={styles.faceGuideText}>Align Face & Posture Here</span>
              </div>
              <div className={styles.cameraOverlayInfo}>
                <span>Eye Contact: <strong>Optimal 92%</strong></span>
                <span>Posture: <strong>Upright & Open</strong></span>
              </div>
            </div>
          ) : (
            <div className={styles.audioVisualizerBox}>
              {/* Dynamic Waveform Bars */}
              <div className={styles.waveform}>
                {[40, 65, 80, 45, 90, 75, 60, 85, 50, 70, 95, 60, 40, 80, 55, 90, 75, 50, 85, 65].map(
                  (height, idx) => (
                    <div
                      key={idx}
                      className={`${styles.waveBar} ${isPaused ? styles.waveBarPaused : ''}`}
                      style={{
                        height: isPaused ? '8px' : `${height}%`,
                        animationDelay: `${idx * 0.08}s`,
                      }}
                    />
                  )
                )}
              </div>

              <div className={styles.micCircle}>
                <Mic size={36} className={styles.micIcon} />
              </div>
            </div>
          )}

          {/* Big Timer */}
          <div className={styles.timerDisplay}>{formatTime(seconds)}</div>

          {/* Live Coaching Nudge */}
          <div className={styles.coachNudgeBox}>
            <Sparkles size={16} className={styles.nudgeIcon} />
            <span>{liveCoachTip}</span>
          </div>

          {/* Real-time Telemetry Grid */}
          <div className={styles.liveMetricsGrid}>
            <div className={styles.metricPill}>
              <Activity size={14} className={styles.pillIcon} />
              <span>Pace:</span>
              <strong>{livePace} WPM</strong>
              <span className={styles.statusGood}>Optimal</span>
            </div>

            <div className={styles.metricPill}>
              <AlertCircle size={14} className={styles.pillIcon} />
              <span>Fillers:</span>
              <strong>{fillerCount}</strong>
              <span className={styles.statusGood}>Clean</span>
            </div>

            <div className={styles.metricPill}>
              <Volume2 size={14} className={styles.pillIcon} />
              <span>Volume:</span>
              <strong>Strong</strong>
              <span className={styles.statusGood}>Clear</span>
            </div>

            <div className={styles.metricPill}>
              <CheckCircle2 size={14} className={styles.pillIcon} />
              <span>Pauses:</span>
              <strong>1.2s avg</strong>
              <span className={styles.statusGood}>Effective</span>
            </div>
          </div>
        </div>

        {/* Bottom Action Controls */}
        <div className={styles.footerControls}>
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
            {isPaused ? 'Resume Speech' : 'Pause Speech'}
          </button>

          <button
            type="button"
            className={styles.btnStop}
            onClick={handleComplete}
          >
            <Square size={16} />
            Stop & View AI Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
