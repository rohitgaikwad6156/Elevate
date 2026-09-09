// src/hooks/useProfile.js
// React compatibility hook for profile + goals.
// Authentication identity comes from Firebase Auth; goals are stored as separate Firestore documents.

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getLocalIsoDate } from '../lib/dateUtils';
import {
  fetchProfileData,
  saveProfile,
  saveAiSettings,
  saveNotifications,
  resetProfileToClean,
} from '../lib/profileService';
import {
  createGoal as createGoalRecord,
  updateGoal as updateGoalRecord,
  deleteGoal as deleteGoalRecord,
} from '../lib/database/goalService';

function recordsEqual(a, b) {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

export function useProfile() {
  const { user } = useAuth();
  const uid = user?.uid;

  const [profile, setProfile] = useState(null);
  const [goals, setGoals] = useState([]);
  const [activityHistory, setActivityHistory] = useState({});
  const [aiSettings, setAiSettings] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchProfileData(user)
      .then((data) => {
        if (cancelled) return;
        setProfile(data.profile);
        setGoals(data.goals || []);
        setActivityHistory(data.activityHistory || {});
        setAiSettings(data.aiSettings);
        setNotifications(data.notifications || []);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load ELEVATE user data:', err);
        setError(err.message || 'Unable to load your data.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [uid, user]);

  const updateProfile = useCallback(async (updatedProfile) => {
    const previous = profile;
    setProfile(updatedProfile);
    setSaving(true);
    setError(null);

    try {
      await saveProfile(updatedProfile);
    } catch (err) {
      setProfile(previous);
      console.error('Failed to save profile:', err);
      setError(err.message || 'Unable to save your profile.');
      throw err;
    } finally {
      setSaving(false);
    }
  }, [profile]);

  // Compatibility API: callers can still pass the complete goals array.
  // Under the hood only created/changed/deleted goal documents are written.
  const updateGoals = useCallback(async (updatedGoals, customHistory = null) => {
    const previousGoals = goals;
    const previousHistory = activityHistory;

    const todayStr = getLocalIsoDate();
    const total = updatedGoals.length;
    const completed = updatedGoals.filter((g) => g.completed || g.progress === 100).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const nextHistory = customHistory || {
      ...activityHistory,
      [todayStr]: {
        total,
        completed,
        percentage,
        date: todayStr,
        timestamp: Date.now(),
      },
    };

    setGoals(updatedGoals);
    setActivityHistory(nextHistory);
    setSaving(true);
    setError(null);

    try {
      const previousById = new Map(
        previousGoals.filter((goal) => goal.id).map((goal) => [String(goal.id), goal])
      );
      const nextById = new Map(
        updatedGoals.filter((goal) => goal.id).map((goal) => [String(goal.id), goal])
      );

      const created = updatedGoals.filter(
        (goal) => !goal.id || !previousById.has(String(goal.id))
      );
      const removed = previousGoals.filter(
        (goal) => goal.id && !nextById.has(String(goal.id))
      );
      const changed = updatedGoals.filter((goal) => {
        if (!goal.id) return false;
        const previous = previousById.get(String(goal.id));
        return previous && !recordsEqual(previous, goal);
      });

      await Promise.all([
        ...created.map((goal) =>
          createGoalRecord(goal, goal.id ? { id: String(goal.id) } : undefined)
        ),
        ...changed.map((goal) => updateGoalRecord(goal.id, goal)),
        ...removed.map((goal) => deleteGoalRecord(goal.id)),
      ]);
    } catch (err) {
      setGoals(previousGoals);
      setActivityHistory(previousHistory);
      console.error('Failed to save goals:', err);
      setError(err.message || 'Unable to save your goals.');
      throw err;
    } finally {
      setSaving(false);
    }
  }, [goals, activityHistory]);

  // Activity history is now a derived UI summary rather than an ever-growing field in users/{uid}.
  const recordActivity = useCallback(async (dateStr, data) => {
    setActivityHistory((current) => ({
      ...current,
      [dateStr]: data,
    }));
  }, []);

  const updateAiSettings = useCallback(async (updatedAi) => {
    const previous = aiSettings;
    setAiSettings(updatedAi);
    setSaving(true);
    setError(null);

    try {
      await saveAiSettings(updatedAi);
    } catch (err) {
      setAiSettings(previous);
      console.error('Failed to save AI settings:', err);
      setError(err.message || 'Unable to save AI settings.');
      throw err;
    } finally {
      setSaving(false);
    }
  }, [aiSettings]);

  const toggleNotification = useCallback(async (id) => {
    const previous = notifications;
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, enabled: !n.enabled } : n
    );

    setNotifications(updated);
    setSaving(true);
    setError(null);

    try {
      await saveNotifications(updated);
    } catch (err) {
      setNotifications(previous);
      console.error('Failed to save notifications:', err);
      setError(err.message || 'Unable to save notification settings.');
      throw err;
    } finally {
      setSaving(false);
    }
  }, [notifications]);

  const addGoal = useCallback(async (newGoal) => {
    await updateGoals([...goals, newGoal]);
  }, [goals, updateGoals]);

  const removeGoal = useCallback(async (goalId) => {
    await updateGoals(goals.filter((g) => g.id !== goalId));
  }, [goals, updateGoals]);

  const resetAllData = useCallback(async () => {
    if (!uid) return;
    setLoading(true);
    setError(null);

    try {
      const clean = await resetProfileToClean(user);
      setProfile(clean.profile);
      setGoals([]);
      setActivityHistory({});
      setAiSettings(clean.aiSettings);
      setNotifications(clean.notifications);
    } catch (err) {
      console.error('Failed to reset all data:', err);
      setError(err.message || 'Unable to reset your data.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [uid, user]);

  return {
    profile,
    goals,
    activityHistory,
    aiSettings,
    notifications,
    loading,
    saving,
    error,
    updateProfile,
    updateGoals,
    recordActivity,
    updateAiSettings,
    toggleNotification,
    addGoal,
    removeGoal,
    resetAllData,
  };
}
