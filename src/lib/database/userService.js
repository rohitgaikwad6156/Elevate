import {
  deleteField,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import {
  getAuthenticatedIdentity,
  runDatabaseOperation,
  stripProtectedFields,
} from './databaseService';

const userRef = (userId) => doc(db, 'users', userId);

export async function getCurrentUserRecord() {
  return runDatabaseOperation('load user profile', async () => {
    const { userId } = getAuthenticatedIdentity();
    const snapshot = await getDoc(userRef(userId));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() };
  });
}

export async function createCurrentUserRecord(data = {}) {
  return runDatabaseOperation('create user profile', async () => {
    const { user, userId } = getAuthenticatedIdentity();
    const safeData = stripProtectedFields(data);

    const payload = {
      ...safeData,
      userId,
      email: user.email || safeData.email || '',
      displayName: user.displayName || safeData.displayName || '',
      photoURL: user.photoURL || safeData.photoURL || '',
      schemaVersion: 2,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(userRef(userId), payload);
    return { id: userId, ...safeData, userId };
  });
}

export async function upsertCurrentUserRecord(data = {}) {
  return runDatabaseOperation('save user profile', async () => {
    const { user, userId } = getAuthenticatedIdentity();
    const safeData = stripProtectedFields(data);
    const snapshot = await getDoc(userRef(userId));

    const payload = {
      ...safeData,
      userId,
      email: user.email || safeData.email || '',
      displayName: user.displayName || safeData.displayName || '',
      photoURL: user.photoURL || safeData.photoURL || '',
      schemaVersion: 2,
      updatedAt: serverTimestamp(),
      ...(snapshot.exists() ? {} : { createdAt: serverTimestamp() }),
    };

    await setDoc(userRef(userId), payload, { merge: true });
    return { id: userId, ...safeData, userId };
  });
}

export async function updateCurrentUserRecord(changes = {}) {
  return runDatabaseOperation('update user profile', async () => {
    const { userId } = getAuthenticatedIdentity();
    const safeChanges = stripProtectedFields(changes);

    await updateDoc(userRef(userId), {
      ...safeChanges,
      userId,
      updatedAt: serverTimestamp(),
    });

    return { id: userId, ...safeChanges, userId };
  });
}

export async function removeLegacyEmbeddedFields() {
  return runDatabaseOperation('remove legacy embedded user data', async () => {
    const { userId } = getAuthenticatedIdentity();
    await updateDoc(userRef(userId), {
      goals: deleteField(),
      activityHistory: deleteField(),
      updatedAt: serverTimestamp(),
      schemaVersion: 2,
    });
  });
}
