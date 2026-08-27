import { useState } from 'react';
import {
  X,
  Target,
  Calendar,
  Save,
} from 'lucide-react';
import styles from './AddGoalModal.module.css';

export default function AddGoalModal({ onClose, onAddGoal }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Public Speaking');
  const [targetDate, setTargetDate] = useState('2026-10-30');
  const [priority, setPriority] = useState('High');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    if (onAddGoal) {
      onAddGoal({
        id: `goal-${Date.now()}`,
        title,
        category,
        targetDate: 'Oct 30, 2026',
        priority,
        progress: 0,
        icon: category === 'Fitness' ? 'Dumbbell' : category === 'English' ? 'BookA' : 'Mic',
        color: category === 'Fitness' ? '#f59e0b' : category === 'English' ? '#10b981' : '#8b5cf6',
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
            <h3 className={styles.title}>Add New Growth Goal</h3>
            <p className={styles.subtitle}>Set milestones with target deadlines to guide your AI recommendations</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Goal Title</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g., Deliver a 10-minute keynote speech"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={styles.row2Col}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Category</label>
              <select
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Public Speaking">Public Speaking</option>
                <option value="English">English & Vocabulary</option>
                <option value="Fitness">Fitness & Habits</option>
                <option value="Interview">Interview Preparation</option>
                <option value="Body Language">Body Language & Presence</option>
                <option value="Learning">Continuous Learning</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Priority Level</label>
              <select
                className={styles.select}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Target Completion Date</label>
            <input
              type="date"
              className={styles.input}
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Why does this goal matter?</label>
            <textarea
              className={styles.textarea}
              rows={2}
              placeholder="e.g., To communicate more confidently during interviews and professional meetings."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary}>
              <Save size={14} />
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
