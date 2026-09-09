import {
  createOwnedDocument,
  deleteOwnedDocument,
  getOwnedDocument,
  listOwnedDocuments,
  updateOwnedDocument,
} from './databaseService';

const COLLECTION = 'goals';

function normalizeGoal(goal = {}) {
  if (!goal.title?.trim()) {
    throw new Error('Goal title is required.');
  }

  const completed = Boolean(goal.completed) || Number(goal.progress) === 100;

  return {
    ...goal,
    title: goal.title.trim(),
    category: goal.category || 'General',
    targetDate: goal.targetDate || goal.date || null,
    progress: Number.isFinite(Number(goal.progress)) ? Number(goal.progress) : 0,
    status: goal.status || (completed ? 'completed' : 'active'),
    completed,
  };
}

export function createGoal(goal, options = {}) {
  return createOwnedDocument(COLLECTION, normalizeGoal(goal), options);
}

export function getGoal(goalId) {
  return getOwnedDocument(COLLECTION, goalId);
}

export async function listGoals() {
  const goals = await listOwnedDocuments(COLLECTION);
  return goals.sort((a, b) => {
    const dateA = a.targetDate || a.date || '9999-12-31';
    const dateB = b.targetDate || b.date || '9999-12-31';
    return dateA.localeCompare(dateB);
  });
}

export function updateGoal(goalId, changes) {
  const next = { ...changes };

  if (next.title !== undefined) {
    if (!String(next.title).trim()) throw new Error('Goal title is required.');
    next.title = String(next.title).trim();
  }

  if (next.progress !== undefined) {
    next.progress = Math.max(0, Math.min(100, Number(next.progress) || 0));
    if (next.progress === 100) {
      next.completed = true;
      next.status = 'completed';
    }
  }

  if (next.completed === true) {
    next.progress = 100;
    next.status = 'completed';
  }

  return updateOwnedDocument(COLLECTION, goalId, next);
}

export function deleteGoal(goalId) {
  return deleteOwnedDocument(COLLECTION, goalId);
}

export async function migrateLegacyGoals(legacyGoals = []) {
  if (!Array.isArray(legacyGoals) || legacyGoals.length === 0) return listGoals();

  const existing = await listGoals();
  const existingIds = new Set(existing.map((goal) => String(goal.id)));

  for (const legacyGoal of legacyGoals) {
    const preferredId = legacyGoal.id ? String(legacyGoal.id) : undefined;
    if (preferredId && existingIds.has(preferredId)) continue;

    const created = await createGoal(
      legacyGoal,
      preferredId ? { id: preferredId } : undefined
    );
    existingIds.add(String(created.id));
  }

  return listGoals();
}
