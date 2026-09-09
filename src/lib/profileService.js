// src/lib/profileService.js
// Compatibility layer for the existing Profile/Daily Goals UI.
// User-level settings stay in users/{uid}; scalable activity data lives in separate collections.

import { notificationSettingsData } from '../data/profileData';
import {
  createCurrentUserRecord,
  getCurrentUserRecord,
  removeLegacyEmbeddedFields,
  updateCurrentUserRecord,
  upsertCurrentUserRecord,
} from './database/userService';
import {
  listGoals,
  migrateLegacyGoals,
} from './database/goalService';
import { deleteAllOwnedDocuments } from './database/databaseService';

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

function cleanUserDocument(user) {
  return {
    profile: buildDefaultProfile(user),
    aiSettings: defaultAiSettings,
    notifications: notificationSettingsData,
  };
}

export async function initializeProfile(user) {
  const existing = await getCurrentUserRecord();
  if (!existing) {
    await createCurrentUserRecord(cleanUserDocument(user));
  }
}

export async function fetchProfileData(user) {
  let userRecord = await getCurrentUserRecord();

  if (!userRecord) {
    await createCurrentUserRecord(cleanUserDocument(user));
    userRecord = await getCurrentUserRecord();
  }

  // One-time compatibility migration from the old giant users/{uid}.goals array.
  // The authenticated Firebase user is used by the goal service; no caller-provided uid is trusted.
  const hadLegacyGoalsField = Object.prototype.hasOwnProperty.call(userRecord || {}, 'goals');
  const hadLegacyActivityField = Object.prototype.hasOwnProperty.call(userRecord || {}, 'activityHistory');
  const legacyGoals = Array.isArray(userRecord?.goals) ? userRecord.goals : [];
  const legacyActivityHistory = userRecord?.activityHistory || {};

  if (legacyGoals.length > 0) {
    await migrateLegacyGoals(legacyGoals);
  }

  if (hadLegacyGoalsField || hadLegacyActivityField) {
    await removeLegacyEmbeddedFields();
    userRecord = await getCurrentUserRecord();
  }

  const goals = await listGoals();

  return {
    profile: userRecord?.profile || buildDefaultProfile(user),
    goals,
    // Kept in memory for backwards-compatible charts during the migration request.
    // Long-term activity is derived from goal/task/session records instead of users/{uid}.
    activityHistory: legacyActivityHistory,
    aiSettings: userRecord?.aiSettings || defaultAiSettings,
    notifications: userRecord?.notifications || notificationSettingsData,
  };
}

export async function saveProfile(profileData) {
  await upsertCurrentUserRecord({ profile: profileData });
}

export async function saveAiSettings(aiSettings) {
  await upsertCurrentUserRecord({ aiSettings });
}

export async function saveNotifications(notifications) {
  await upsertCurrentUserRecord({ notifications });
}

export async function resetProfileToClean(user) {
  // Reset all current scalable user-owned collections while preserving the Firebase Auth account.
  await Promise.all([
    deleteAllOwnedDocuments('tasks'),
    deleteAllOwnedDocuments('goals'),
    deleteAllOwnedDocuments('schedules'),
    deleteAllOwnedDocuments('habits'),
    deleteAllOwnedDocuments('english_sessions'),
  ]);

  const clean = cleanUserDocument(user);
  await createCurrentUserRecord(clean);

  return {
    ...clean,
    goals: [],
    activityHistory: {},
  };
}

// Transitional helper for callers that need to ensure schemaVersion/userId exist.
export async function touchCurrentUserRecord() {
  await updateCurrentUserRecord({ schemaVersion: 2 });
}
