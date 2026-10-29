import { beforeEach, describe, expect, it } from 'vitest';
import {
  INITIAL_PROGRESS_STATE,
  STORAGE_KEY,
  clearProgress,
  loadProgress,
  saveProgress,
} from './progressStorage';

describe('progressStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns the initial state when no progress has been saved', () => {
    expect(loadProgress()).toEqual(INITIAL_PROGRESS_STATE);
  });

  it('round-trips valid progress through localStorage', () => {
    const progress = {
      ...INITIAL_PROGRESS_STATE,
      modules: {
        ...INITIAL_PROGRESS_STATE.modules,
        budgeting: {
          completed: true,
          bestScore: 5,
          lastScore: 4,
          attempts: 2,
          lastAttemptAt: '2026-10-29T12:00:00.000Z',
        },
      },
    };

    expect(saveProgress(progress)).toBe(true);
    expect(loadProgress()).toEqual(progress);
  });

  it('clears saved progress and returns the initial state', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, modules: {} }));

    expect(clearProgress()).toEqual(INITIAL_PROGRESS_STATE);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
