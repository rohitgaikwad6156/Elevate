// src/lib/profileService.js
// All Firestore read/write operations for profile data.
// Each user's data is stored at users/{uid} — fully isolated.
// New users start with a clean empty profile seeded from their account.

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { notificationSettingsData } from '../data/profileData';

// Helper — returns the Firestore document ref for a given user
const profileDoc = (uid) => doc(db, 'users', uid);

// ─── Default empty profile for a brand-new user ────────────────────────────────
export function buildDefaultProfile(user) {
  return {
    name:               user?.displayName || 'Learner',
    verified:           false,
    title:              'ELEVATE Explorer · Level 1',
    level:              1,
    bio:                'Ready to grow and elevate my skills every day.',
    location:           'Not set',
    timingTag:          'Evening Learner',
    avatarUrl:          user?.photoURL || '',
    profileCompletion:  15,
    overallGrowthScore: 0,
    overallGrowthStatus:'Just Starting',
    currentStreak:      0,
    streakMessage:      'Start your first session today!',
    totalXp:            0,
    xpMax:              1000,
    xpRemaining:        1000,
    achievementsCount:  0,
    achievementsPercent: 0,
    growthIdentity: {
      primaryFocus: 'Not set yet',
      secondaryFocus: 'Not set yet',
      learningLevel: 'Beginner',
      learningStyle: 'Practice-first',
      availableTime: '15 – 30 min / day',
      preferredTime: 'Evening',
    },
    skills: [
      { id: 'speaking', label: 'Public Speaking', score: 0, color: '#8b5cf6', icon: 'Mic' },
      { id: 'communication', label: 'Communication', score: 0, color: '#3b82f6', icon: 'Star' },
      { id: 'english', label: 'English', score: 0, color: '#10b981', icon: 'BookA' },
      { id: 'interview', label: 'Interview Skills', score: 0, color: '#f59e0b', icon: 'Briefcase' },
      { id: 'fitness', label: 'Fitness', score: 0, color: '#ef4444', icon: 'Dumbbell' },
      { id: 'leadership', label: 'Leadership', score: 0, color: '#14b8a6', icon: 'Award' },
    ],
    achievements: [],
  };
}

export const defaultAiSettings = {
  coachingStyle:             'Balanced',
  feedbackStyle:             'Action-oriented',
  recommendationFrequency:   'Balanced',
  aiInitiative:              'Recommend proactively',
  challengeLevel:            'Balanced',
  lastUpdated:               'Just initialized',
};

// ─── Reset Profile to Clean State ──────────────────────────────────────────────
export async function resetProfileToClean(uid, user) {
  const cleanProfile = buildDefaultProfile(user);
  const cleanData = {
    profile:         cleanProfile,
    goals:           [],
    activityHistory: {}, // LeetCode style: { "YYYY-MM-DD": { total: 3, completed: 1, percentage: 33 } }
    aiSettings:      defaultAiSettings,
    notifications:   notificationSettingsData,
    createdAt:       serverTimestamp(),
    updatedAt:       serverTimestamp(),
  };
  await setDoc(profileDoc(uid), cleanData);
  return cleanData;
}

// ─── Seed Defaults ─────────────────────────────────────────────────────────────
export async function initializeProfile(uid, user) {
  const snap = await getDoc(profileDoc(uid));
  if (!snap.exists()) {
    await resetProfileToClean(uid, user);
  }
}

// ─── Fetch Everything ──────────────────────────────────────────────────────────
export async function fetchProfileData(uid, user) {
  const snap = await getDoc(profileDoc(uid));
  if (snap.exists()) {
    const data = snap.data();
    // Auto-sanitize: If this document contains leftover seed demo data, reset to clean
    if (data.profile?.level === 12 || data.profile?.totalXp === 2350 || data.profile?.overallGrowthScore === 84) {
      return await resetProfileToClean(uid, user);
    }
    return {
      ...data,
      activityHistory: data.activityHistory || {},
    };
  }
  // First login — seed and return clean defaults
  return await resetProfileToClean(uid, user);
}

// ─── Profile Info ──────────────────────────────────────────────────────────────
export async function saveProfile(uid, profileData) {
  await updateDoc(profileDoc(uid), {
    profile:    profileData,
    updatedAt:  serverTimestamp(),
  });
}

// ─── Goals & Monthly Activity History ───────────────────────────────────────────
export async function saveGoals(uid, goals, activityHistory = null) {
  const updatePayload = {
    goals,
    updatedAt: serverTimestamp(),
  };
  if (activityHistory) {
    updatePayload.activityHistory = activityHistory;
  }
  await updateDoc(profileDoc(uid), updatePayload);
}

// ─── Activity History Direct Save ──────────────────────────────────────────────
export async function saveActivityHistory(uid, activityHistory) {
  await updateDoc(profileDoc(uid), {
    activityHistory,
    updatedAt: serverTimestamp(),
  });
}

// ─── AI Personalization ────────────────────────────────────────────────────────
export async function saveAiSettings(uid, aiSettings) {
  await updateDoc(profileDoc(uid), {
    aiSettings,
    updatedAt: serverTimestamp(),
  });
}

// ─── Notification Settings ─────────────────────────────────────────────────────
export async function saveNotifications(uid, notifications) {
  await updateDoc(profileDoc(uid), {
    notifications,
    updatedAt: serverTimestamp(),
  });
}
