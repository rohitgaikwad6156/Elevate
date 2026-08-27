import { useState } from 'react';
import { X, Star, Calendar, Repeat } from 'lucide-react';
import { CATEGORIES, PRIORITY_OPTIONS } from '../../data/goalsData';
import styles from './AddGoalModal.module.css';

const TIME_OPTIONS = [
  '5 min',
  '10 min',
  '15 min',
  '20 min',
  '30 min',
  '45 min',
  '1 hr',
  '1.5 hr',
  '2 hr',
];

export default function AddGoalModal({
  onClose,
  onAdd,
  defaultIsPriority = false,
  targetDate = null,
  targetDateLabel = null,
  isViewingToday = true,
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState('High');
  const [estimatedTime, setEstimatedTime] = useState('15 min');
  const [notes, setNotes] = useState('');
  const [isPriority, setIsPriority] = useState(defaultIsPriority || true);
  const [isRecurring, setIsRecurring] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Goal title is required.');
      return;
    }
    onAdd({
      title: trimmed,
      category,
      priority,
      estimatedTime,
      notes: notes.trim(),
      description: notes.trim(),
      isPriority,
      isRecurring,
    });
    onClose();
  };

  const displayDateText = isViewingToday ? 'Today' : (targetDateLabel || targetDate);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <form
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className={styles.header}>
          <div>
            <h2 className={styles.headerTitle}>Add New Goal</h2>
            <span style={{ fontSize: '12px', color: 'var(--color-primary, #6366f1)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
              <Calendar size={13} /> For {displayDateText}
            </span>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          {/* Goal Title */}
          <div className={styles.field}>
            <label className={styles.label}>
              Goal Title <span className={styles.required}>*</span>
            </label>
            <input
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              type="text"
              placeholder="e.g. 15 min daily speaking practice"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              autoFocus
            />
            {error && <span className={styles.errorText}>{error}</span>}
          </div>

          {/* Category + Priority */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Category</label>
              <select
                className={styles.select}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value === 'General') {
                    setIsRecurring(true);
                  }
                }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Priority Level</label>
              <select
                className={styles.select}
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                  if (e.target.value === 'High') setIsPriority(true);
                }}
              >
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* General / Daily Recurring Goal Toggle */}
          <div style={{
            background: isRecurring ? '#f0fdf4' : 'var(--color-gray-50, #f9fafb)',
            border: `1.5px solid ${isRecurring ? '#86efac' : 'var(--color-gray-200, #e5e7eb)'}`,
            borderRadius: 'var(--radius-md, 8px)',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            transition: 'all 180ms ease',
          }}
          onClick={() => setIsRecurring(!isRecurring)}
          >
            <input
              type="checkbox"
              id="isRecurringCheckbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              style={{ cursor: 'pointer', width: 16, height: 16, accentColor: '#10b981' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="isRecurringCheckbox" style={{ cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: isRecurring ? '#065f46' : 'var(--color-gray-800, #1f2937)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Repeat size={14} color={isRecurring ? '#10b981' : '#6b7280'} />
                General Goal (Repeats on all future days)
              </label>
              <span style={{ fontSize: '11px', color: isRecurring ? '#047857' : 'var(--color-gray-500, #6b7280)', marginTop: 1 }}>
                Automatically schedules this routine on today and every future day
              </span>
            </div>
          </div>

          {/* Top Priority Checkbox */}
          <div style={{
            background: 'var(--color-primary-bg, #eef2ff)',
            border: '1px solid var(--color-primary-light, #c7d2fe)',
            borderRadius: 'var(--radius-md, 8px)',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
          onClick={() => setIsPriority(!isPriority)}
          >
            <input
              type="checkbox"
              id="isPriorityCheckbox"
              checked={isPriority}
              onChange={(e) => setIsPriority(e.target.checked)}
              style={{ cursor: 'pointer', width: 16, height: 16, accentColor: 'var(--color-primary, #6366f1)' }}
            />
            <label htmlFor="isPriorityCheckbox" style={{ cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--color-gray-800, #1f2937)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={14} color="#f59e0b" fill={isPriority ? '#f59e0b' : 'none'} />
              Pin to Top 3 Priorities for {displayDateText}
            </label>
          </div>

          {/* Estimated Time */}
          <div className={styles.field}>
            <label className={styles.label}>Estimated Time (optional)</label>
            <select
              className={styles.select}
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
            >
              <option value="">— Select duration —</option>
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div className={styles.field}>
            <label className={styles.label}>Notes (optional)</label>
            <textarea
              className={styles.textarea}
              placeholder="Add key milestones, links, or notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.btnCancel} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={styles.btnSubmit}>
            Add Goal
          </button>
        </div>
      </form>
    </div>
  );
}
