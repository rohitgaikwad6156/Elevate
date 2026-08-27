import { useState } from 'react';
import {
  X,
  Briefcase,
  UserCheck,
  Code2,
  Clock,
  Sparkles,
  ArrowRight,
  Play,
} from 'lucide-react';
import styles from './InterviewSetupModal.module.css';

export default function InterviewSetupModal({ onStart, onClose }) {
  const [role, setRole] = useState('Senior Software Engineer');
  const [company, setCompany] = useState('Elevate Tech');
  const [type, setType] = useState('technical');
  const [level, setLevel] = useState('Mid–Senior');
  const [duration, setDuration] = useState('20 min');
  const [persona, setPersona] = useState('Professional');

  const types = [
    { id: 'hr', name: 'HR & Screening', desc: 'Career narrative & cultural fit' },
    { id: 'behavioral', name: 'Behavioral (STAR)', desc: 'Conflict, leadership, failure' },
    { id: 'technical', name: 'Technical & System Design', desc: 'Architecture, APIs, trade-offs' },
    { id: 'managerial', name: 'Managerial & Strategy', desc: 'Team scaling & execution' },
  ];

  const levels = ['Fresher / Junior', 'Mid–Senior', 'Lead / Principal', 'Executive'];
  const durations = ['10 min', '20 min', '30 min', '45 min'];
  const personas = ['Friendly', 'Professional', 'Challenging', 'Technical Deep'];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Configure AI Mock Interview</h2>
            <p className={styles.subtitle}>Customize your role, interviewer persona, and duration</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* 1. Target Role & Company */}
          <div className={styles.twoCol}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Target Role / Job Title</label>
              <input
                type="text"
                className={styles.input}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Target Company (Optional)</label>
              <input
                type="text"
                className={styles.input}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Stripe, Google, Startup"
              />
            </div>
          </div>

          {/* 2. Interview Type */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Select Interview Focus</label>
            <div className={styles.typeGrid}>
              {types.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.typeBtn} ${type === t.id ? styles.typeBtnActive : ''}`}
                  onClick={() => setType(t.id)}
                >
                  <span className={styles.typeTitle}>{t.name}</span>
                  <span className={styles.typeDesc}>{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Experience Level & Duration */}
          <div className={styles.twoCol}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Experience Level</label>
              <div className={styles.pillRow}>
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    className={`${styles.pillBtn} ${level === lvl ? styles.pillActive : ''}`}
                    onClick={() => setLevel(lvl)}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Target Duration</label>
              <div className={styles.pillRow}>
                {durations.map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`${styles.pillBtn} ${duration === d ? styles.pillActive : ''}`}
                    onClick={() => setDuration(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Interviewer Persona */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Interviewer Persona Style</label>
            <div className={styles.pillRow}>
              {personas.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`${styles.pillBtn} ${persona === p ? styles.pillActive : ''}`}
                  onClick={() => setPersona(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              onClose();
              if (onStart) onStart({ role, company, type, level, duration, persona });
            }}
          >
            <Play size={15} />
            Start Mock Interview
          </button>
        </div>
      </div>
    </div>
  );
}
