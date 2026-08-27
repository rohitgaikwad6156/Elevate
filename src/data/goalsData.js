import { getLocalIsoDate, parseLocalIsoDate } from '../lib/dateUtils';

// Goal categories used across the Daily Goals module
export const CATEGORIES = [
  'General',
  'Productivity',
  'English',
  'Speaking',
  'Fitness',
  'Learning',
  'Interview',
  'Personal',
  'Other',
];

export const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'];

// Utility: compute stats from a goals array for a specific date
export function computeStats(goals = [], targetDate = null) {
  if (!goals || goals.length === 0) {
    return { total: 0, completed: 0, remaining: 0, percentage: 0 };
  }
  const total = goals.length;
  const completed = goals.filter((g) => {
    if (g.isRecurring && targetDate) {
      return Boolean(g.completedDates?.includes(targetDate));
    }
    return Boolean(g.completed || g.progress === 100);
  }).length;
  const remaining = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, remaining, percentage };
}

// Utility: compute category breakdown stats
export function computeCategoryStats(goals = [], targetDate = null) {
  const map = {};
  CATEGORIES.forEach((cat) => {
    map[cat] = { name: cat, total: 0, completed: 0 };
  });
  goals.forEach((g) => {
    const cat = g.category || 'General';
    if (!map[cat]) {
      map[cat] = { name: cat, total: 0, completed: 0 };
    }
    map[cat].total += 1;
    const isDone = g.isRecurring && targetDate
      ? Boolean(g.completedDates?.includes(targetDate))
      : Boolean(g.completed || g.progress === 100);

    if (isDone) {
      map[cat].completed += 1;
    }
  });
  return Object.values(map);
}


// Compute full activity history dictionary from all goals (including recurring goals)
export function computeActivityHistoryFromGoals(goals = []) {
  const history = {};
  const todayIso = getLocalIsoDate();

  // Non-recurring goals
  goals.forEach((g) => {
    if (!g.isRecurring) {
      const d = g.date || todayIso;
      if (!history[d]) {
        history[d] = { total: 0, completed: 0, percentage: 0, date: d };
      }
      history[d].total += 1;
      if (g.completed || g.progress === 100) {
        history[d].completed += 1;
      }
    }
  });

  // Recurring goals completed dates
  goals.forEach((g) => {
    if (g.isRecurring && g.completedDates) {
      g.completedDates.forEach((d) => {
        if (!history[d]) {
          history[d] = { total: 1, completed: 1, percentage: 100, date: d };
        } else {
          history[d].total += 1;
          history[d].completed += 1;
        }
      });
    }
  });

  Object.keys(history).forEach((d) => {
    const item = history[d];
    item.percentage = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;
  });
  return history;
}

// Initial clean empty goals for a fresh user
export const initialGoals = [];

// Weekly bar chart data dynamically computed for any reference week
export function getWeeklyChartDataForDate(allGoals = [], refDateStr = null) {
  const refDate = refDateStr ? parseLocalIsoDate(refDateStr) : new Date();
  const dayOfWeek = refDate.getDay(); // 0 is Sunday, 1 is Monday...
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(refDate);
  monday.setDate(refDate.getDate() + diffToMonday);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayIso = getLocalIsoDate();

  return days.map((dayName, i) => {
    const current = new Date(monday);
    current.setDate(monday.getDate() + i);
    const dateStr = getLocalIsoDate(current);

    const dayGoals = allGoals.filter((g) => {
      if (g.isRecurring) {
        return dateStr >= (g.startDate || g.date || todayIso);
      }
      return (g.date || todayIso) === dateStr;
    });

    const total = dayGoals.length;
    const completed = dayGoals.filter((g) => {
      if (g.isRecurring) {
        return Boolean(g.completedDates?.includes(dateStr));
      }
      return Boolean(g.completed || g.progress === 100);
    }).length;

    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      day: dayName,
      dateStr,
      pct,
      isToday: dateStr === todayIso,
      isSelected: dateStr === refDateStr,
    };
  });
}


// 7-day streak indicator (Mon–Sun) computed for the current week
export function getStreakDaysForWeek(allGoals = [], refDateStr = null) {
  const weeklyData = getWeeklyChartDataForDate(allGoals, refDateStr);
  return weeklyData.map((d) => ({
    day: d.day,
    done: d.pct > 0,
    isToday: d.isToday,
    dateStr: d.dateStr,
  }));
}

// Backward compatible export
export function getWeeklyChartData(todayCompletionPct = 0) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monFirstIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const data = [0, 0, 0, 0, 0, 0, 0];
  data[monFirstIndex] = todayCompletionPct;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, i) => ({
    day,
    pct: data[i],
    isToday: i === monFirstIndex,
  }));
}
