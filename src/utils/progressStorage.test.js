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

  it('falls back safely when saved progress contains malformed JSON', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    window.localStorage.setItem(STORAGE_KEY, '{broken-json');

    expect(() => loadProgress()).not.toThrow();
    expect(loadProgress()).toEqual(INITIAL_PROGRESS_STATE);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('falls back safely when saved progress has an unsupported version', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 999, modules: {} }));

    expect(() => loadProgress()).not.toThrow();
    expect(loadProgress()).toEqual(INITIAL_PROGRESS_STATE);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('clears saved progress and returns the initial state', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, modules: {} }));

    expect(clearProgress()).toEqual(INITIAL_PROGRESS_STATE);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
