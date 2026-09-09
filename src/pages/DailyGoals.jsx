import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  CalendarDays,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  Flag,
  ListTodo,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from 'lucide-react';
import { getLocalIsoDate } from '../lib/dateUtils';
import {
  TASK_CATEGORIES,
  TASK_PRIORITIES,
} from '../lib/database/taskService';
import { useTasks } from '../hooks/useTasks';
import styles from './DailyGoals.module.css';

const EMPTY_TASK = {
  title: '',
  description: '',
  category: 'Study',
  priority: 'Medium',
  dueDate: '',
  startTime: '',
  duration: 30,
};

const PRIORITY_RANK = { High: 0, Medium: 1, Low: 2 };

function formatCalendarDate(dateString) {
  if (!dateString) return 'No due date';
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: year !== new Date().getFullYear() ? 'numeric' : undefined,
  }).format(date);
}

function relativeDueLabel(dateString, today) {
  if (!dateString) return 'No due date';
  if (dateString === today) return 'Today';

  const todayDate = new Date(`${today}T00:00:00`);
  const dueDate = new Date(`${dateString}T00:00:00`);
  const difference = Math.round((dueDate - todayDate) / 86400000);

  if (difference === 1) return 'Tomorrow';
  if (difference === -1) return 'Yesterday';
  return formatCalendarDate(dateString);
}

function TaskModal({ task, today, saving, onClose, onSubmit }) {
  const isEditing = Boolean(task?.id);
  const [form, setForm] = useState(() => ({
    ...EMPTY_TASK,
    dueDate: today,
  }));
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setForm(task?.id
      ? {
          title: task.title || '',
          description: task.description || '',
          category: TASK_CATEGORIES.includes(task.category) ? task.category : 'Other',
          priority: TASK_PRIORITIES.includes(task.priority) ? task.priority : 'Medium',
          dueDate: task.dueDate || '',
          startTime: task.startTime || '',
          duration: task.duration ?? '',
        }
      : { ...EMPTY_TASK, dueDate: today });
    setFormError('');
  }, [task, today]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !saving) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, saving]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (formError) setFormError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = form.title.trim();
    const duration = form.duration === '' ? null : Number(form.duration);

    if (!title) {
      setFormError('Please add a task title.');
      return;
    }
    if (duration !== null && (!Number.isFinite(duration) || duration <= 0)) {
      setFormError('Duration must be greater than 0 minutes.');
      return;
    }

    try {
      await onSubmit({
        ...form,
        title,
        description: form.description.trim(),
        duration,
      });
      onClose();
    } catch {
      // The shared task hook already exposes the database error state.
    }
  };

  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget && !saving) onClose();
    }}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="task-modal-title">
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.eyebrow}>{isEditing ? 'Edit task' : 'New task'}</p>
            <h3 id="task-modal-title" className={styles.modalTitle}>
              {isEditing ? 'Update your task' : 'What needs your attention?'}
            </h3>
          </div>
          <button
            type="button"
            className={styles.iconButton}
            onClick={onClose}
            disabled={saving}
            aria-label="Close task form"
          >
            <X size={18} />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.fullField}>
            <span>Task title <strong>*</strong></span>
            <input
              autoFocus
              type="text"
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="e.g. Complete DSA practice"
              maxLength={120}
              disabled={saving}
            />
          </label>

          <label className={styles.fullField}>
            <span>Description</span>
            <textarea
              value={form.description}
              onChange={(event) => updateField('description', event.target.value)}
              placeholder="Add a short note or context"
              rows={3}
              maxLength={500}
              disabled={saving}
            />
          </label>

          <div className={styles.formGrid}>
            <label>
              <span>Category</span>
              <select
                value={form.category}
                onChange={(event) => updateField('category', event.target.value)}
                disabled={saving}
              >
                {TASK_CATEGORIES.map((category) => (
                  <option value={category} key={category}>{category}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Priority</span>
              <select
                value={form.priority}
                onChange={(event) => updateField('priority', event.target.value)}
                disabled={saving}
              >
                {TASK_PRIORITIES.map((priority) => (
                  <option value={priority} key={priority}>{priority}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Due date</span>
              <input
                type="date"
                value={form.dueDate}
                onChange={(event) => updateField('dueDate', event.target.value)}
                disabled={saving}
              />
            </label>

            <label>
              <span>Start time</span>
              <input
                type="time"
                value={form.startTime}
                onChange={(event) => updateField('startTime', event.target.value)}
                disabled={saving}
              />
            </label>

            <label>
              <span>Duration (minutes)</span>
              <input
                type="number"
                min="1"
                max="1440"
                step="5"
                value={form.duration}
                onChange={(event) => updateField('duration', event.target.value)}
                placeholder="30"
                disabled={saving}
              />
            </label>
          </div>

          {formError && (
            <div className={styles.formError} role="alert">
              <AlertCircle size={15} /> {formError}
            </div>
          )}

          <div className={styles.modalActions}>
            <button type="button" className={styles.secondaryButton} onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className={styles.primaryButton} disabled={saving}>
              {saving ? <Loader2 className={styles.spin} size={16} /> : isEditing ? <Check size={16} /> : <Plus size={16} />}
              {saving ? 'Saving...' : isEditing ? 'Save changes' : 'Add task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteTaskDialog({ task, busy, onCancel, onConfirm }) {
  if (!task) return null;

  return (
    <div className={styles.modalBackdrop} role="presentation">
      <div className={`${styles.modal} ${styles.confirmModal}`} role="dialog" aria-modal="true" aria-labelledby="delete-task-title">
        <div className={styles.dangerIcon}><Trash2 size={20} /></div>
        <h3 id="delete-task-title" className={styles.confirmTitle}>Delete this task?</h3>
        <p className={styles.confirmText}>
          “{task.title}” will be permanently removed from your account.
        </p>
        <div className={styles.modalActions}>
          <button type="button" className={styles.secondaryButton} onClick={onCancel} disabled={busy}>Cancel</button>
          <button type="button" className={styles.deleteConfirmButton} onClick={onConfirm} disabled={busy}>
            {busy ? <Loader2 className={styles.spin} size={16} /> : <Trash2 size={16} />}
            {busy ? 'Deleting...' : 'Delete task'}
          </button>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, today, busy, onToggle, onEdit, onDelete }) {
  const overdue = !task.completed && task.dueDate && task.dueDate < today;

  return (
    <article className={`${styles.taskCard} ${task.completed ? styles.taskCompleted : ''}`}>
      <button
        type="button"
        className={`${styles.completeButton} ${task.completed ? styles.completeButtonDone : ''}`}
        onClick={() => onToggle(task.id, !task.completed)}
        disabled={busy}
        aria-label={task.completed ? `Mark ${task.title} pending` : `Mark ${task.title} completed`}
      >
        {busy ? <Loader2 className={styles.spin} size={15} /> : task.completed ? <Check size={15} /> : <Circle size={15} />}
      </button>

      <div className={styles.taskContent}>
        <div className={styles.taskTitleRow}>
          <h3 className={styles.taskTitle}>{task.title}</h3>
          <span className={`${styles.priorityBadge} ${styles[`priority${task.priority || 'Medium'}`]}`}>
            <Flag size={11} /> {task.priority || 'Medium'}
          </span>
        </div>

        {task.description && <p className={styles.taskDescription}>{task.description}</p>}

        <div className={styles.taskMeta}>
          <span className={styles.categoryBadge}>{task.category || 'Other'}</span>
          <span className={overdue ? styles.overdueMeta : ''}>
            <CalendarDays size={13} /> {overdue ? `Overdue · ${formatCalendarDate(task.dueDate)}` : relativeDueLabel(task.dueDate, today)}
          </span>
          {task.startTime && <span><Clock3 size={13} /> {task.startTime}</span>}
          {task.duration && <span><Clock3 size={13} /> {task.duration} min</span>}
        </div>
      </div>

      <div className={styles.taskActions}>
        <button type="button" className={styles.iconButton} onClick={() => onEdit(task)} disabled={busy} aria-label={`Edit ${task.title}`}>
          <Pencil size={16} />
        </button>
        <button type="button" className={`${styles.iconButton} ${styles.deleteIconButton}`} onClick={() => onDelete(task)} disabled={busy} aria-label={`Delete ${task.title}`}>
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}

export default function DailyGoals() {
  const today = getLocalIsoDate();
  const {
    tasks,
    loading,
    saving,
    busyTaskId,
    error,
    success,
    addTask,
    editTask,
    removeTask,
    toggleTask,
    reloadTasks,
    clearMessages,
  } = useTasks();

  const [scope, setScope] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  const todayTasks = useMemo(() => tasks.filter((task) => (
    task.dueDate === today || (!task.completed && task.dueDate && task.dueDate < today)
  )), [tasks, today]);

  const upcomingTasks = useMemo(() => tasks.filter((task) => task.dueDate && task.dueDate > today), [tasks, today]);
  const completedCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  const pendingCount = tasks.length - completedCount;

  const filteredTasks = useMemo(() => {
    let scoped = tasks;
    if (scope === 'today') {
      scoped = todayTasks;
    } else if (scope === 'upcoming') {
      scoped = upcomingTasks;
    }

    if (statusFilter === 'pending') scoped = scoped.filter((task) => !task.completed);
    if (statusFilter === 'completed') scoped = scoped.filter((task) => task.completed);

    return [...scoped].sort((a, b) => {
      const dueA = a.dueDate || '9999-12-31';
      const dueB = b.dueDate || '9999-12-31';
      if (dueA !== dueB) return dueA.localeCompare(dueB);
      return (PRIORITY_RANK[a.priority] ?? 1) - (PRIORITY_RANK[b.priority] ?? 1);
    });
  }, [tasks, scope, statusFilter, todayTasks, upcomingTasks]);

  const openCreateModal = () => {
    clearMessages();
    setEditingTask(null);
    setTaskModalOpen(true);
  };

  const openEditModal = (task) => {
    clearMessages();
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  const handleSubmitTask = async (values) => {
    if (editingTask?.id) {
      await editTask(editingTask.id, values);
    } else {
      await addTask(values);
    }
  };

  const handleDelete = async () => {
    if (!deleteCandidate?.id) return;
    try {
      await removeTask(deleteCandidate.id);
      setDeleteCandidate(null);
    } catch {
      // Error is displayed by the shared task hook.
    }
  };

  const emptyTitle = statusFilter === 'completed'
    ? 'No completed tasks here yet'
    : statusFilter === 'pending'
      ? 'Nothing pending here'
      : scope === 'upcoming'
        ? 'No upcoming tasks'
        : scope === 'all'
          ? 'Your task list is empty'
          : 'Nothing due today';

  const emptyDescription = statusFilter !== 'all'
    ? 'Try another status filter or switch the task view.'
    : scope === 'upcoming'
      ? 'Future tasks with a due date will appear here.'
      : 'Add a task when there is something worth remembering.';

  if (loading) {
    return (
      <div className={styles.page} aria-busy="true">
        <div className={styles.headerSkeleton} />
        <div className={styles.statsGrid}>
          {[0, 1, 2].map((item) => <div className={styles.statSkeleton} key={item} />)}
        </div>
        <div className={styles.listSkeleton}>
          {[0, 1, 2].map((item) => <div className={styles.taskSkeleton} key={item} />)}
        </div>
      </div>
    );
  }

  if (error && tasks.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.fullStateCard}>
          <div className={styles.stateIconError}><AlertCircle size={24} /></div>
          <h2>We couldn’t load your tasks</h2>
          <p>{error}</p>
          <button type="button" className={styles.primaryButton} onClick={reloadTasks}>
            <RefreshCw size={16} /> Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Daily Goals & Tasks</p>
          <h1 className={styles.pageTitle}>Plan less. Finish more.</h1>
          <p className={styles.pageDescription}>
            Keep today clear, capture what is coming next, and check things off as you go.
          </p>
        </div>
        <button type="button" className={styles.primaryButton} onClick={openCreateModal}>
          <Plus size={17} /> Add task
        </button>
      </div>

      {(success || error) && (
        <div className={`${styles.messageBanner} ${error ? styles.messageError : styles.messageSuccess}`} role={error ? 'alert' : 'status'}>
          <div>
            {error ? <AlertCircle size={17} /> : <CheckCircle2 size={17} />}
            <span>{error || success}</span>
          </div>
          <button type="button" onClick={clearMessages} aria-label="Dismiss message"><X size={15} /></button>
        </div>
      )}

      <div className={styles.statsGrid}>
        <button type="button" className={`${styles.statCard} ${scope === 'today' ? styles.statCardActive : ''}`} onClick={() => setScope('today')}>
          <div className={styles.statIcon}><CalendarDays size={18} /></div>
          <div><span>Today</span><strong>{todayTasks.length}</strong><small>due + overdue</small></div>
        </button>
        <button type="button" className={`${styles.statCard} ${scope === 'upcoming' ? styles.statCardActive : ''}`} onClick={() => setScope('upcoming')}>
          <div className={styles.statIcon}><Clock3 size={18} /></div>
          <div><span>Upcoming</span><strong>{upcomingTasks.length}</strong><small>future tasks</small></div>
        </button>
        <button type="button" className={`${styles.statCard} ${scope === 'all' ? styles.statCardActive : ''}`} onClick={() => setScope('all')}>
          <div className={styles.statIcon}><ListTodo size={18} /></div>
          <div><span>All tasks</span><strong>{tasks.length}</strong><small>{pendingCount} pending · {completedCount} done</small></div>
        </button>
      </div>

      <section className={styles.taskSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>{scope === 'today' ? "Today's tasks" : scope === 'upcoming' ? 'Upcoming tasks' : 'All tasks'}</h2>
            <p>{filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} shown</p>
          </div>

          <div className={styles.statusFilters} aria-label="Filter tasks by completion">
            {[
              ['all', 'All'],
              ['pending', 'Pending'],
              ['completed', 'Completed'],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={statusFilter === value ? styles.filterActive : ''}
                onClick={() => setStatusFilter(value)}
                aria-pressed={statusFilter === value}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>{statusFilter === 'completed' ? <CheckCircle2 size={24} /> : <ListTodo size={24} />}</div>
            <h3>{emptyTitle}</h3>
            <p>{emptyDescription}</p>
            {statusFilter !== 'all' ? (
              <button type="button" className={styles.secondaryButton} onClick={() => setStatusFilter('all')}>Show all statuses</button>
            ) : (
              <button type="button" className={styles.secondaryButton} onClick={openCreateModal}><Plus size={16} /> Add a task</button>
            )}
          </div>
        ) : (
          <div className={styles.taskList}>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                today={today}
                busy={busyTaskId === task.id}
                onToggle={toggleTask}
                onEdit={openEditModal}
                onDelete={setDeleteCandidate}
              />
            ))}
          </div>
        )}
      </section>

      {taskModalOpen && (
        <TaskModal
          task={editingTask}
          today={today}
          saving={saving}
          onClose={() => {
            if (!saving) {
              setTaskModalOpen(false);
              setEditingTask(null);
            }
          }}
          onSubmit={handleSubmitTask}
        />
      )}

      <DeleteTaskDialog
        task={deleteCandidate}
        busy={Boolean(deleteCandidate && busyTaskId === deleteCandidate.id)}
        onCancel={() => setDeleteCandidate(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
