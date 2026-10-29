import { beforeEach, describe, expect, it, vi } from 'vitest';
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

  it('recovers safely from malformed JSON', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    window.localStorage.setItem(STORAGE_KEY, '{not valid json');

    expect(loadProgress()).toEqual(INITIAL_PROGRESS_STATE);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('recovers safely from an unsupported schema version', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 99, modules: {} }));

    expect(loadProgress()).toEqual(INITIAL_PROGRESS_STATE);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('fills in missing modules and fields from the default schema', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 1,
        modules: {
          budgeting: { attempts: 3 },
        },
      }),
    );

    const progress = loadProgress();
    expect(progress.modules.budgeting.attempts).toBe(3);
    expect(progress.modules.budgeting.completed).toBe(false);
    expect(progress.modules.inflation).toEqual(INITIAL_PROGRESS_STATE.modules.inflation);
    expect(progress.modules.businessProfit).toEqual(INITIAL_PROGRESS_STATE.modules.businessProfit);
  });

  it('clears saved progress and returns the initial state', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, modules: {} }));

    expect(clearProgress()).toEqual(INITIAL_PROGRESS_STATE);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
