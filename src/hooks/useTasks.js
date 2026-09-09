import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  createTask,
  deleteTask,
  listTasks,
  setTaskCompleted,
  updateTask,
} from '../lib/database/taskService';

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyTaskId, setBusyTaskId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const successTimer = useRef(null);

  const showSuccess = useCallback((message) => {
    setSuccess(message);
    if (successTimer.current) clearTimeout(successTimer.current);
    successTimer.current = setTimeout(() => setSuccess(''), 2600);
  }, []);

  const clearMessages = useCallback(() => {
    setError('');
    setSuccess('');
  }, []);

  const loadTasks = useCallback(async () => {
    if (!user?.uid) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const records = await listTasks();
      setTasks(records);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setError(err.message || 'Unable to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    loadTasks();
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, [loadTasks]);

  const addTask = useCallback(async (task) => {
    setSaving(true);
    setError('');
    try {
      const created = await createTask(task);
      setTasks((current) => [...current, created]);
      showSuccess('Task added successfully.');
      return created;
    } catch (err) {
      console.error('Failed to add task:', err);
      setError(err.message || 'Unable to add task. Please try again.');
      throw err;
    } finally {
      setSaving(false);
    }
  }, [showSuccess]);

  const editTask = useCallback(async (taskId, changes) => {
    setSaving(true);
    setBusyTaskId(taskId);
    setError('');
    try {
      const updated = await updateTask(taskId, changes);
      setTasks((current) => current.map((task) => (
        task.id === taskId ? { ...task, ...updated } : task
      )));
      showSuccess('Task updated successfully.');
      return updated;
    } catch (err) {
      console.error('Failed to update task:', err);
      setError(err.message || 'Unable to update task. Please try again.');
      throw err;
    } finally {
      setSaving(false);
      setBusyTaskId(null);
    }
  }, [showSuccess]);

  const removeTask = useCallback(async (taskId) => {
    setBusyTaskId(taskId);
    setError('');
    try {
      await deleteTask(taskId);
      setTasks((current) => current.filter((task) => task.id !== taskId));
      showSuccess('Task deleted.');
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError(err.message || 'Unable to delete task. Please try again.');
      throw err;
    } finally {
      setBusyTaskId(null);
    }
  }, [showSuccess]);

  const toggleTask = useCallback(async (taskId, completed) => {
    setBusyTaskId(taskId);
    setError('');

    const previous = tasks.find((task) => task.id === taskId)?.completed;
    setTasks((current) => current.map((task) => (
      task.id === taskId ? { ...task, completed } : task
    )));

    try {
      await setTaskCompleted(taskId, completed);
      showSuccess(completed ? 'Task marked completed.' : 'Task moved back to pending.');
    } catch (err) {
      setTasks((current) => current.map((task) => (
        task.id === taskId ? { ...task, completed: previous } : task
      )));
      console.error('Failed to change task status:', err);
      setError(err.message || 'Unable to update task status. Please try again.');
      throw err;
    } finally {
      setBusyTaskId(null);
    }
  }, [showSuccess, tasks]);

  return {
    tasks,
    loading,
    saving,
    busyTaskId,
    error,
    success,
    addTask,
    editTask,
    removeTask,
    toggleTask,
    reloadTasks: loadTasks,
    clearMessages,
  };
}
