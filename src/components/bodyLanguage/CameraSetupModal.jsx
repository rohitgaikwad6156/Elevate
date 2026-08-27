import { useState } from 'react';
import {
  X,
  CheckCircle2,
  Camera,
  Sun,
  Eye,
  Layers,
  ArrowRight,
  Shield,
} from 'lucide-react';
import styles from './CameraSetupModal.module.css';

export default function CameraSetupModal({ onClose, onReadyToPractice }) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { step: 1, title: 'Camera Permissions', desc: 'Allow your browser to stream your video feed for local nonverbal calibration.', icon: Camera },
    { step: 2, title: 'Position Camera at Eye Level', desc: 'Elevate laptop/webcam so your gaze rests horizontally without tilting down.', icon: Eye },
    { step: 3, title: 'Upper Body Framing', desc: 'Ensure head, shoulders, and upper chest are clearly visible in frame.', icon: Layers },
    { step: 4, title: 'Frontal Lighting', desc: 'Position light source in front of you to eliminate harsh facial shadows.', icon: Sun },
    { step: 5, title: 'Clean Background & Test', desc: 'Minimize background distraction and verify camera stability.', icon: CheckCircle2 },
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Camera Setup Assistant</h2>
            <p className={styles.subtitle}>Calibrate your physical setup for optimal AI presence analysis</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          {/* Step Progress Bar */}
          <div className={styles.stepProgressRow}>
            {steps.map((s) => (
              <button
                key={s.step}
                type="button"
                className={`${styles.stepPill} ${currentStep >= s.step ? styles.stepPillActive : ''}`}
                onClick={() => setCurrentStep(s.step)}
              >
                Step {s.step}
              </button>
            ))}
          </div>

          {/* Active Step Card */}
          <div className={styles.activeStepCard}>
            <div className={styles.stepIconBox}>
              <Camera size={24} className={styles.stepIcon} />
            </div>
            <div className={styles.stepInfo}>
              <h3 className={styles.stepTitle}>
                Step {currentStep}: {steps[currentStep - 1].title}
              </h3>
              <p className={styles.stepDesc}>{steps[currentStep - 1].desc}</p>
            </div>
          </div>

          {/* Visual Alignment Simulator Box */}
          <div className={styles.visualGuideBox}>
            <div className={styles.guideFrame}>
              <div className={styles.headOutline}>
                <span>Face Centered</span>
              </div>
              <div className={styles.shoulderLine}>
                <span>Shoulder Width Guide</span>
              </div>
            </div>
            <div className={styles.checklist}>
              <div className={styles.checkItem}>
                <CheckCircle2 size={15} color="var(--color-success)" />
                <span>Camera angle parallel to eye line</span>
              </div>
              <div className={styles.checkItem}>
                <CheckCircle2 size={15} color="var(--color-success)" />
                <span>Headroom: 2 inches from top of frame</span>
              </div>
              <div className={styles.checkItem}>
                <CheckCircle2 size={15} color="var(--color-success)" />
                <span>Soft frontal illumination verified</span>
              </div>
            </div>
          </div>

          <div className={styles.privacyNote}>
            <Shield size={14} />
            <span>Privacy Promise: All analysis is processed client-side. No permanent video storage.</span>
          </div>
        </div>

        <div className={styles.footer}>
          {currentStep > 1 && (
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              Previous
            </button>
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={() => setCurrentStep((prev) => prev + 1)}
            >
              Next Step
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={() => {
                onClose();
                if (onReadyToPractice) onReadyToPractice();
              }}
            >
              Setup Complete — Start Practice
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
