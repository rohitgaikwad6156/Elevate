import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import {
  createOwnedDocument,
  deleteOwnedDocument,
  getAuthenticatedIdentity,
  getOwnedDocument,
  listOwnedDocuments,
  runDatabaseOperation,
  stripProtectedFields,
  updateOwnedDocument,
} from './databaseService';

const COLLECTION = 'schedules';

function normalizeSchedule(schedule = {}) {
  if (!schedule.date) {
    throw new Error('Schedule date is required.');
  }

  return {
    date: schedule.date,
    tasks: Array.isArray(schedule.tasks) ? schedule.tasks : [],
    generatedByAI: Boolean(schedule.generatedByAI),
    ...stripProtectedFields(schedule),
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
  return runDatabaseOperation('load daily schedule', async () => {
    const { userId } = getAuthenticatedIdentity();
    const ref = doc(db, COLLECTION, `${userId}_${date}`);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) return null;
    const data = snapshot.data();
    if (data.userId !== userId) return null;
    return { id: snapshot.id, ...data };
  });
}

export async function saveScheduleForDate(date, schedule = {}) {
  return runDatabaseOperation('save daily schedule', async () => {
    const { userId } = getAuthenticatedIdentity();
    const ref = doc(db, COLLECTION, `${userId}_${date}`);
    const existing = await getDoc(ref);
    const safeSchedule = normalizeSchedule({ ...schedule, date });

    await setDoc(
      ref,
      {
        ...safeSchedule,
        userId,
        generatedByAI: Boolean(schedule.generatedByAI),
        updatedAt: serverTimestamp(),
        ...(existing.exists() ? {} : { createdAt: serverTimestamp() }),
      },
      { merge: true }
    );

    return { id: ref.id, ...safeSchedule, userId };
  });
}

export function updateSchedule(scheduleId, changes) {
  return updateOwnedDocument(COLLECTION, scheduleId, changes);
}

export function deleteSchedule(scheduleId) {
  return deleteOwnedDocument(COLLECTION, scheduleId);
}
