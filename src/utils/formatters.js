/**
 * Formatting helpers for displaying financial figures cleanly and accessibly.
 */

/**
 * Formats a number as US currency ($0.00).
 * @param {number} amount 
 * @returns {string}
 */
export function formatCurrency(amount) {
  const num = Number(amount);
  if (isNaN(num)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}

/**
 * Formats a decimal/percentage as a string (e.g., "5.2%").
 * @param {number} rate 
 * @param {number} decimals 
 * @returns {string}
 */
export function formatPercent(rate, decimals = 1) {
  const num = Number(rate);
  if (isNaN(num)) return '0.0%';
  return `${num.toFixed(decimals)}%`;
}

/**
 * Formats an integer or unit count with commas (e.g., "1,250 units").
 * @param {number} num 
 * @returns {string}
 */
export function formatUnits(num) {
  const n = Number(num);
  if (isNaN(n)) return '0';
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}
