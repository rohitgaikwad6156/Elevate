import {
  createOwnedDocument,
  deleteOwnedDocument,
  getOwnedDocument,
  listOwnedDocuments,
  updateOwnedDocument,
} from './databaseService';

const COLLECTION = 'tasks';

function normalizeTask(task = {}) {
  if (!task.title?.trim()) {
    throw new Error('Task title is required.');
  }

  return {
    title: task.title.trim(),
    description: task.description || '',
    category: task.category || 'General',
    priority: task.priority || 'Medium',
    dueDate: task.dueDate || null,
    startTime: task.startTime || null,
    duration: task.duration ?? null,
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
    return dueA.localeCompare(dueB);
  });
}

export function updateTask(taskId, changes) {
  const safeChanges = { ...changes };
  if (safeChanges.title !== undefined) {
    if (!String(safeChanges.title).trim()) throw new Error('Task title is required.');
    safeChanges.title = String(safeChanges.title).trim();
  }
  return updateOwnedDocument(COLLECTION, taskId, safeChanges);
}

export function setTaskCompleted(taskId, completed) {
  return updateOwnedDocument(COLLECTION, taskId, { completed: Boolean(completed) });
}

export function deleteTask(taskId) {
  return deleteOwnedDocument(COLLECTION, taskId);
}
