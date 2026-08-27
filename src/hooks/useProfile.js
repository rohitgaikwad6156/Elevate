// src/hooks/useProfile.js
// React hook that manages profile state synced with Firestore.
// Uses the authenticated user's uid so each user has isolated data.

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getLocalIsoDate } from '../lib/dateUtils';
import {
  fetchProfileData,
  saveProfile,
  saveGoals,
  saveActivityHistory,
  saveAiSettings,
  saveNotifications,
  resetProfileToClean,
} from '../lib/profileService';


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

  // ── Initial Load — re-runs whenever the logged-in user changes ──────────────
  useEffect(() => {
    if (!uid) return;
    let cancelled = false;
    setLoading(true);
    fetchProfileData(uid, user)
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
        console.error('Failed to load profile from Firestore:', err);
        setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [uid, user]);

  // ── Save Profile ────────────────────────────────────────────────────────────
  const updateProfile = useCallback(async (updatedProfile) => {
    setProfile(updatedProfile);
    setSaving(true);
    try {
      await saveProfile(uid, updatedProfile);
    } catch (err) {
      console.error('Failed to save profile:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }, [uid]);

  // ── Save Goals & LeetCode-style Monthly Activity ────────────────────────────
  const updateGoals = useCallback(async (updatedGoals, customHistory = null) => {
    setGoals(updatedGoals);
    
    // Automatically record today's activity entry
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

    setActivityHistory(nextHistory);
    setSaving(true);
    try {
      await saveGoals(uid, updatedGoals, nextHistory);
    } catch (err) {
      console.error('Failed to save goals:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }, [uid, activityHistory]);

  // ── Save Activity History Directly ──────────────────────────────────────────
  const recordActivity = useCallback(async (dateStr, data) => {
    const updated = {
      ...activityHistory,
      [dateStr]: data,
    };
    setActivityHistory(updated);
    try {
      await saveActivityHistory(uid, updated);
    } catch (err) {
      console.error('Failed to record activity:', err);
    }
  }, [uid, activityHistory]);

  // ── Save AI Settings ────────────────────────────────────────────────────────
  const updateAiSettings = useCallback(async (updatedAi) => {
    setAiSettings(updatedAi);
    setSaving(true);
    try {
      await saveAiSettings(uid, updatedAi);
    } catch (err) {
      console.error('Failed to save AI settings:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }, [uid]);

  // ── Toggle Notification ─────────────────────────────────────────────────────
  const toggleNotification = useCallback(async (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, enabled: !n.enabled } : n
    );
    setNotifications(updated);
    setSaving(true);
    try {
      await saveNotifications(uid, updated);
    } catch (err) {
      console.error('Failed to save notifications:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }, [uid, notifications]);

  // ── Add Goal ────────────────────────────────────────────────────────────────
  const addGoal = useCallback(async (newGoal) => {
    const updated = [...goals, newGoal];
    await updateGoals(updated);
  }, [goals, updateGoals]);

  // ── Remove Goal ─────────────────────────────────────────────────────────────
  const removeGoal = useCallback(async (goalId) => {
    const updated = goals.filter((g) => g.id !== goalId);
    await updateGoals(updated);
  }, [goals, updateGoals]);

  // ── Reset Profile to Clean Defaults ─────────────────────────────────────────
  const resetAllData = useCallback(async () => {
    if (!uid) return;
    setLoading(true);
    try {
      const clean = await resetProfileToClean(uid, user);
      setProfile(clean.profile);
      setGoals([]);
      setActivityHistory({});
      setAiSettings(clean.aiSettings);
      setNotifications(clean.notifications);
    } catch (err) {
      console.error('Failed to reset all data:', err);
      setError(err.message);
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
