import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ProgressProvider, useProgress } from './ProgressContext';
import { STORAGE_KEY } from '../utils/progressStorage';

function ProgressHarness() {
  const { progress, recordQuizScore } = useProgress();
  const budgeting = progress.modules.budgeting;

  return (
    <div>
      <span data-testid="completed">{String(budgeting.completed)}</span>
      <span data-testid="best-score">{String(budgeting.bestScore)}</span>
      <span data-testid="last-score">{String(budgeting.lastScore)}</span>
      <span data-testid="attempts">{budgeting.attempts}</span>
      <button type="button" onClick={() => recordQuizScore('budgeting', 7, 10)}>
        Record 70 percent
      </button>
      <button type="button" onClick={() => recordQuizScore('budgeting', 4, 10)}>
        Record lower retake
      </button>
    </div>
  );
}

function renderHarness() {
  return render(
    <ProgressProvider>
      <ProgressHarness />
    </ProgressProvider>,
  );
}

describe('ProgressContext quiz progress', () => {
  it('marks a module complete at exactly the 70% threshold', async () => {
    const user = userEvent.setup();
    renderHarness();

    await user.click(screen.getByRole('button', { name: /record 70 percent/i }));

    expect(screen.getByTestId('completed')).toHaveTextContent('true');
    expect(screen.getByTestId('best-score')).toHaveTextContent('7');
    expect(screen.getByTestId('last-score')).toHaveTextContent('7');
    expect(screen.getByTestId('attempts')).toHaveTextContent('1');
  });

  it('keeps the best score while updating the latest score and attempt count', async () => {
    const user = userEvent.setup();
    renderHarness();

    await user.click(screen.getByRole('button', { name: /record 70 percent/i }));
    await user.click(screen.getByRole('button', { name: /record lower retake/i }));

    expect(screen.getByTestId('completed')).toHaveTextContent('true');
    expect(screen.getByTestId('best-score')).toHaveTextContent('7');
    expect(screen.getByTestId('last-score')).toHaveTextContent('4');
    expect(screen.getByTestId('attempts')).toHaveTextContent('2');
  });

  it('restores persisted progress when the app is reopened', async () => {
    const user = userEvent.setup();
    const firstSession = renderHarness();

    await user.click(screen.getByRole('button', { name: /record 70 percent/i }));
    await waitFor(() => {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      expect(saved.modules.budgeting.attempts).toBe(1);
    });
    firstSession.unmount();

    renderHarness();
    expect(screen.getByTestId('completed')).toHaveTextContent('true');
    expect(screen.getByTestId('best-score')).toHaveTextContent('7');
    expect(screen.getByTestId('last-score')).toHaveTextContent('7');
    expect(screen.getByTestId('attempts')).toHaveTextContent('1');
  });
});
