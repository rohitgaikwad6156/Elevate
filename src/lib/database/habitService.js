import {
  createOwnedDocument,
  deleteOwnedDocument,
  getOwnedDocument,
  listOwnedDocuments,
  stripProtectedFields,
  updateOwnedDocument,
} from './databaseService';

const COLLECTION = 'habits';

export function createHabit(habit = {}) {
  if (!habit.title?.trim()) throw new Error('Habit title is required.');

  const safeHabit = stripProtectedFields(habit);
  return createOwnedDocument(COLLECTION, {
    ...safeHabit,
    title: habit.title.trim(),
    category: habit.category || 'General',
    frequency: habit.frequency || 'daily',
    target: habit.target ?? 1,
    streak: habit.streak ?? 0,
    active: habit.active !== false,
    completionDates: Array.isArray(habit.completionDates) ? habit.completionDates : [],
  });
}

export function getHabit(habitId) {
  return getOwnedDocument(COLLECTION, habitId);
}

export async function listHabits() {
  return listOwnedDocuments(COLLECTION);
}

export function updateHabit(habitId, changes) {
  return updateOwnedDocument(COLLECTION, habitId, changes);
}

export function deleteHabit(habitId) {
  return deleteOwnedDocument(COLLECTION, habitId);
}
