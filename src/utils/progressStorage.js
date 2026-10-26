/**
 * Safe localStorage persistence for MoneyQuest module progress and quiz scores.
 */

export const STORAGE_KEY = 'moneyquest:v1';

export const INITIAL_PROGRESS_STATE = {
  version: 1,
  modules: {
    budgeting: {
      completed: false,
      bestScore: null,
      lastScore: null,
      attempts: 0,
      lastAttemptAt: null,
    },
    inflation: {
      completed: false,
      bestScore: null,
      lastScore: null,
      attempts: 0,
      lastAttemptAt: null,
    },
    businessProfit: {
      completed: false,
      bestScore: null,
      lastScore: null,
      attempts: 0,
      lastAttemptAt: null,
    },
  },
};

/**
 * Loads progress from localStorage with defensive parsing and schema validation.
 * @returns {typeof INITIAL_PROGRESS_STATE}
 */
export function loadProgress() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return INITIAL_PROGRESS_STATE;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_PROGRESS_STATE;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1 || !parsed.modules) {
      console.warn('MoneyQuest: Incompatible storage schema detected. Resetting to initial state.');
      return INITIAL_PROGRESS_STATE;
    }

    // Ensure all required module keys exist even if an older state was partial
    const mergedModules = {
      budgeting: { ...INITIAL_PROGRESS_STATE.modules.budgeting, ...(parsed.modules.budgeting || {}) },
      inflation: { ...INITIAL_PROGRESS_STATE.modules.inflation, ...(parsed.modules.inflation || {}) },
      businessProfit: { ...INITIAL_PROGRESS_STATE.modules.businessProfit, ...(parsed.modules.businessProfit || {}) },
    };

    return {
      version: 1,
      modules: mergedModules,
    };
  } catch (error) {
    console.error('MoneyQuest: Failed to read from localStorage:', error);
    return INITIAL_PROGRESS_STATE;
  }
}

/**
 * Persists progress safely to localStorage.
 * @param {typeof INITIAL_PROGRESS_STATE} state 
 * @returns {boolean} Whether save succeeded
 */
export function saveProgress(state) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }

  try {
    const serialized = JSON.stringify(state);
    window.localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (error) {
    console.error('MoneyQuest: Failed to write to localStorage:', error);
    return false;
  }
}

/**
 * Clears MoneyQuest progress from localStorage and resets to default state.
 */
export function clearProgress() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('MoneyQuest: Could not clear localStorage:', e);
    }
  }
  return INITIAL_PROGRESS_STATE;
}
