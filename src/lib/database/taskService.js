import {
  createOwnedDocument,
  deleteOwnedDocument,
  getOwnedDocument,
  listOwnedDocuments,
  updateOwnedDocument,
} from './databaseService';

const COLLECTION = 'tasks';

export const TASK_CATEGORIES = [
  'Study',
  'English',
  'Fitness',
  'Project',
  'Personal',
  'Other',
];

export const TASK_PRIORITIES = ['Low', 'Medium', 'High'];

function normalizeCategory(value) {
  return TASK_CATEGORIES.includes(value) ? value : 'Other';
}

function normalizePriority(value) {
  return TASK_PRIORITIES.includes(value) ? value : 'Medium';
}

function normalizeDuration(value) {
  if (value === '' || value === null || value === undefined) return null;
  const minutes = Number(value);
  if (!Number.isFinite(minutes) || minutes <= 0) {
    throw new Error('Duration must be a positive number of minutes.');
  }
  return Math.round(minutes);
}

function normalizeTask(task = {}) {
  if (!task.title?.trim()) {
    throw new Error('Task title is required.');
  }

  return {
    title: task.title.trim(),
    description: String(task.description || '').trim(),
    category: normalizeCategory(task.category),
    priority: normalizePriority(task.priority),
    dueDate: task.dueDate || null,
    startTime: task.startTime || null,
    duration: normalizeDuration(task.duration),
    completed: Boolean(task.completed),
  };
}

export function createTask(task) {
  return createOwnedDocument(COLLECTION, normalizeTask(task));
}

export function getTask(taskId) {
  return getOwnedDocument(COLLECTION, taskId);
}

export async function listTasks() {
  const tasks = await listOwnedDocuments(COLLECTION);
  return tasks.sort((a, b) => {
    const dueA = a.dueDate || '9999-12-31';
    const dueB = b.dueDate || '9999-12-31';
    if (dueA !== dueB) return dueA.localeCompare(dueB);

    const priorityRank = { High: 0, Medium: 1, Low: 2 };
    return (priorityRank[a.priority] ?? 1) - (priorityRank[b.priority] ?? 1);
  });
}

export function updateTask(taskId, changes) {
  const safeChanges = { ...changes };

  if (safeChanges.title !== undefined) {
    if (!String(safeChanges.title).trim()) throw new Error('Task title is required.');
    safeChanges.title = String(safeChanges.title).trim();
  }

  if (safeChanges.description !== undefined) {
    safeChanges.description = String(safeChanges.description || '').trim();
  }

  if (safeChanges.category !== undefined) {
    safeChanges.category = normalizeCategory(safeChanges.category);
  }

  if (safeChanges.priority !== undefined) {
    safeChanges.priority = normalizePriority(safeChanges.priority);
  }

  if (safeChanges.duration !== undefined) {
    safeChanges.duration = normalizeDuration(safeChanges.duration);
  }

  if (safeChanges.dueDate === '') safeChanges.dueDate = null;
  if (safeChanges.startTime === '') safeChanges.startTime = null;
  if (safeChanges.completed !== undefined) safeChanges.completed = Boolean(safeChanges.completed);

  return updateOwnedDocument(COLLECTION, taskId, safeChanges);
}

export function setTaskCompleted(taskId, completed) {
  return updateOwnedDocument(COLLECTION, taskId, { completed: Boolean(completed) });
}

export function deleteTask(taskId) {
  return deleteOwnedDocument(COLLECTION, taskId);
}
