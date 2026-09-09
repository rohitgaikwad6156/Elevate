import {
  createOwnedDocument,
  deleteOwnedDocument,
  getAuthenticatedIdentity,
  getOwnedDocument,
  listOwnedDocuments,
  stripProtectedFields,
  updateOwnedDocument,
} from './databaseService';

const COLLECTION = 'schedules';

function normalizeSchedule(schedule = {}) {
  if (!schedule.date) {
    throw new Error('Schedule date is required.');
  }

  const safeSchedule = stripProtectedFields(schedule);

  return {
    ...safeSchedule,
    date: schedule.date,
    tasks: Array.isArray(schedule.tasks) ? schedule.tasks : [],
    generatedByAI: Boolean(schedule.generatedByAI),
  };
}

export function createSchedule(schedule) {
  return createOwnedDocument(COLLECTION, normalizeSchedule(schedule));
}

export function getSchedule(scheduleId) {
  return getOwnedDocument(COLLECTION, scheduleId);
}

export async function listSchedules() {
  const schedules = await listOwnedDocuments(COLLECTION);
  return schedules.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
}

export async function getScheduleForDate(date) {
  const schedules = await listOwnedDocuments(COLLECTION);
  return schedules.find((schedule) => schedule.date === date) || null;
}

export async function saveScheduleForDate(date, schedule = {}) {
  const { userId } = getAuthenticatedIdentity();
  const safeSchedule = normalizeSchedule({ ...schedule, date });
  const existing = await getScheduleForDate(date);

  if (existing) {
    await updateOwnedDocument(COLLECTION, existing.id, safeSchedule);
    return { id: existing.id, ...safeSchedule, userId };
  }

  return createOwnedDocument(
    COLLECTION,
    safeSchedule,
    { id: `${userId}_${date}` }
  );
}

export function updateSchedule(scheduleId, changes = {}) {
  const safeChanges = stripProtectedFields(changes);

  if (safeChanges.tasks !== undefined && !Array.isArray(safeChanges.tasks)) {
    throw new Error('Schedule tasks must be an array.');
  }

  if (safeChanges.generatedByAI !== undefined) {
    safeChanges.generatedByAI = Boolean(safeChanges.generatedByAI);
  }

  return updateOwnedDocument(COLLECTION, scheduleId, safeChanges);
}

export function deleteSchedule(scheduleId) {
  return deleteOwnedDocument(COLLECTION, scheduleId);
}
