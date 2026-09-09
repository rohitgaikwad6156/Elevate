import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

export class DatabaseError extends Error {
  constructor(message, code = 'database/error', cause = null) {
    super(message);
    this.name = 'DatabaseError';
    this.code = code;
    this.cause = cause;
  }
}

export function getAuthenticatedIdentity() {
  const user = auth.currentUser;
  if (!user?.uid) {
    throw new DatabaseError(
      'You must be signed in to access this data.',
      'auth/unauthenticated'
    );
  }

  return { user, userId: user.uid };
}

export function stripProtectedFields(data = {}) {
  const {
    id,
    userId,
    createdAt,
    updatedAt,
    ...safeData
  } = data || {};

  return Object.fromEntries(
    Object.entries(safeData).filter(([, value]) => value !== undefined)
  );
}

export function documentToData(snapshot) {
  if (!snapshot?.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export async function runDatabaseOperation(operation, callback) {
  try {
    return await callback();
  } catch (error) {
    if (error instanceof DatabaseError) throw error;

    console.error(`[ELEVATE database] ${operation} failed:`, error);
    throw new DatabaseError(
      `Unable to ${operation}. Please try again.`,
      error?.code || 'database/operation-failed',
      error
    );
  }
}

export async function createOwnedDocument(collectionName, data, options = {}) {
  return runDatabaseOperation(`create ${collectionName} record`, async () => {
    const { userId } = getAuthenticatedIdentity();
    const safeData = stripProtectedFields(data);
    const payload = {
      ...safeData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    if (options.id) {
      const ref = doc(db, collectionName, String(options.id));
      await setDoc(ref, payload);
      return { id: ref.id, ...safeData, userId };
    }

    const ref = await addDoc(collection(db, collectionName), payload);
    return { id: ref.id, ...safeData, userId };
  });
}

export async function getOwnedDocument(collectionName, documentId) {
  return runDatabaseOperation(`read ${collectionName} record`, async () => {
    const { userId } = getAuthenticatedIdentity();
    const snapshot = await getDoc(doc(db, collectionName, String(documentId)));

    if (!snapshot.exists()) return null;

    const data = snapshot.data();
    if (data.userId !== userId) {
      throw new DatabaseError('You do not have access to this record.', 'auth/forbidden');
    }

    return { id: snapshot.id, ...data };
  });
}

export async function listOwnedDocuments(collectionName) {
  return runDatabaseOperation(`list ${collectionName} records`, async () => {
    const { userId } = getAuthenticatedIdentity();
    const ownedQuery = query(
      collection(db, collectionName),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(ownedQuery);
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  });
}

export async function updateOwnedDocument(collectionName, documentId, changes) {
  return runDatabaseOperation(`update ${collectionName} record`, async () => {
    await getOwnedDocument(collectionName, documentId);
    const safeChanges = stripProtectedFields(changes);
    const ref = doc(db, collectionName, String(documentId));

    await updateDoc(ref, {
      ...safeChanges,
      updatedAt: serverTimestamp(),
    });

    return { id: String(documentId), ...safeChanges };
  });
}

export async function deleteOwnedDocument(collectionName, documentId) {
  return runDatabaseOperation(`delete ${collectionName} record`, async () => {
    await getOwnedDocument(collectionName, documentId);
    await deleteDoc(doc(db, collectionName, String(documentId)));
    return true;
  });
}

export async function deleteAllOwnedDocuments(collectionName) {
  return runDatabaseOperation(`clear ${collectionName} records`, async () => {
    const records = await listOwnedDocuments(collectionName);
    const chunks = [];

    for (let index = 0; index < records.length; index += 400) {
      chunks.push(records.slice(index, index + 400));
    }

    for (const chunk of chunks) {
      const batch = writeBatch(db);
      chunk.forEach((record) => {
        batch.delete(doc(db, collectionName, record.id));
      });
      await batch.commit();
    }

    return records.length;
  });
}
