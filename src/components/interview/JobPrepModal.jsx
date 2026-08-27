import { useState } from 'react';
import {
  X,
  Sparkles,
  FileText,
  Briefcase,
  CheckCircle2,
  Play,
  Layers,
} from 'lucide-react';
import styles from './JobPrepModal.module.css';

export default function JobPrepModal({ onStartMock, onClose }) {
  const [jobTitle, setJobTitle] = useState('Senior Full-Stack Engineer');
  const [company, setCompany] = useState('ScaleUp AI');
  const [jobDesc, setJobDesc] = useState(
    'Looking for a Senior Full-Stack Engineer with strong React, Node.js, and distributed system skills. Experience with real-time architectures, WebSockets, and performance optimization is required.'
  );
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleGeneratePlan = () => {
    setGeneratedPlan({
      title: `${jobTitle} at ${company}`,
      focusAreas: ['Distributed Systems & Caching', 'React INP & Rendering Optimization', 'Cross-Functional STAR Scenarios'],
      topics: ['Redis Cache Invalidation', 'WebSocket Connection Lifecycle', 'P99 Latency Metrics', 'System Trade-offs'],
      customQuestions: [
        'How do you manage WebSocket reconnection and state synchronization across multiple client tabs?',
        'Describe how you would architect an end-to-end caching layer to handle 10,000 requests/second.',
        'Tell me about a time you resolved a conflict between engineering velocity and technical debt.',
      ],
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.headerBadge}>
              <Sparkles size={13} />
              <span>Tailored Interview Preparation Engine</span>
            </div>
            <h2 className={styles.title}>Job & Resume-Specific Plan</h2>
            <p className={styles.subtitle}>
              Paste a Job Description or Resume to synthesize targeted interview questions
            </p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {!generatedPlan ? (
            <>
              <div className={styles.twoCol}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Target Role</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Company</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Job Description / Key Requirements</label>
                <textarea
                  className={styles.textarea}
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Paste job posting requirements, stack, and responsibilities..."
                />
              </div>

              <button
                type="button"
                className={styles.btnGenerate}
                onClick={handleGeneratePlan}
              >
                <Sparkles size={16} />
                Generate Tailored Interview Plan
              </button>
            </>
          ) : (
            <div className={styles.planBox}>
              <div className={styles.planHead}>
                <span className={styles.planBadge}>✨ Generated Preparation Plan</span>
                <h3 className={styles.planTitle}>{generatedPlan.title}</h3>
              </div>

              <div className={styles.planSection}>
                <span className={styles.sectionLabel}>Key Focus Areas:</span>
                <div className={styles.pillRow}>
                  {generatedPlan.focusAreas.map((f, i) => (
                    <span key={i} className={styles.pillTag}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.planSection}>
                <span className={styles.sectionLabel}>Synthesized Job-Specific Questions:</span>
                <ol className={styles.qList}>
                  {generatedPlan.customQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ol>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => setGeneratedPlan(null)}
                >
                  Edit Input
                </button>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => {
                    onClose();
                    if (onStartMock) {
                      onStartMock({
                        role: generatedPlan.title,
                        questions: generatedPlan.customQuestions.map((q, idx) => ({
                          id: `custom-job-q-${idx}`,
                          question: q,
                          category: 'Job Specific',
                          expectedDuration: '120s',
                          starType: true,
                          followUps: ['How would you measure the success of that solution?'],
                        })),
                      });
                    }
                  }}
                >
                  <Play size={15} />
                  Start Tailored Mock Interview
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!generatedPlan && (
          <div className={styles.footer}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
