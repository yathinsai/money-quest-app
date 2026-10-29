import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ProgressProvider } from '../context/ProgressContext';
import { INITIAL_PROGRESS_STATE, STORAGE_KEY } from '../utils/progressStorage';
import Progress from './Progress';

function renderProgress() {
  return render(
    <MemoryRouter>
      <ProgressProvider>
        <Progress />
      </ProgressProvider>
    </MemoryRouter>,
  );
}

describe('Progress reset confirmation', () => {
  it('opens an accessible dialog, focuses Cancel, and closes with Escape', async () => {
    const user = userEvent.setup();
    renderProgress();

    await user.click(screen.getByRole('button', { name: /reset all progress/i }));
    expect(screen.getByRole('dialog', { name: /reset all progress/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('clears saved scores only after confirmation', async () => {
    const user = userEvent.setup();
    const savedProgress = {
      ...INITIAL_PROGRESS_STATE,
      modules: {
        ...INITIAL_PROGRESS_STATE.modules,
        budgeting: {
          completed: true,
          bestScore: 5,
          lastScore: 5,
          attempts: 1,
          lastAttemptAt: '2026-10-29T12:00:00.000Z',
        },
      },
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProgress));
    renderProgress();

    await user.click(screen.getByRole('button', { name: /reset all progress/i }));
    await user.click(screen.getByRole('button', { name: /yes, reset everything/i }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await waitFor(() => {
      const persisted = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      expect(persisted).toEqual(INITIAL_PROGRESS_STATE);
    });
  });
});
