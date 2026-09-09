import {
  createOwnedDocument,
  deleteOwnedDocument,
  getOwnedDocument,
  listOwnedDocuments,
  updateOwnedDocument,
} from './databaseService';

const COLLECTION = 'english_sessions';

export function createEnglishSession(session = {}) {
  return createOwnedDocument(COLLECTION, {
    type: session.type || 'practice',
    startedAt: session.startedAt || new Date().toISOString(),
    completedAt: session.completedAt || null,
    duration: session.duration ?? 0,
    score: session.score ?? null,
    topic: session.topic || '',
    transcript: session.transcript || '',
    feedback: session.feedback || null,
    metadata: session.metadata || {},
  });
}

export function getEnglishSession(sessionId) {
  return getOwnedDocument(COLLECTION, sessionId);
}

export async function listEnglishSessions() {
  const sessions = await listOwnedDocuments(COLLECTION);
  return sessions.sort((a, b) =>
    String(b.startedAt || '').localeCompare(String(a.startedAt || ''))
  );
}

export function updateEnglishSession(sessionId, changes) {
  return updateOwnedDocument(COLLECTION, sessionId, changes);
}

export function deleteEnglishSession(sessionId) {
  return deleteOwnedDocument(COLLECTION, sessionId);
}
