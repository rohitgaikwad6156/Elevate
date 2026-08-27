/**
 * ELEVATE Date & Time Utilities
 * Provides timezone-safe local date formatting and manipulation.
 * Prevents UTC off-by-one errors caused by .toISOString().split('T')[0].
 */

/**
 * Returns a 'YYYY-MM-DD' string formatted in the user's LOCAL timezone.
 * @param {Date|string|number} date
 * @returns {string} e.g. "2026-08-28"
 */
export function getLocalIsoDate(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats a 'YYYY-MM-DD' date string or Date object into human-readable text.
 * @param {Date|string} dateInput
 * @returns {string} e.g. "Friday, August 28, 2026"
 */
export function formatLongDate(dateInput) {
  if (!dateInput) return '';
  let d;
  if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    const [y, m, day] = dateInput.split('-').map(Number);
    d = new Date(y, m - 1, day, 12, 0, 0);
  } else {
    d = new Date(dateInput);
  }
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Safely parses a 'YYYY-MM-DD' string into a Date object at noon local time
 * to prevent timezone drift across day boundaries.
 * @param {string} dateStr
 * @returns {Date}
 */
export function parseLocalIsoDate(dateStr) {
  if (!dateStr) return new Date();
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}
