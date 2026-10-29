import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ProgressProvider } from '../context/ProgressContext';
import { STORAGE_KEY } from '../utils/progressStorage';
import Quiz from './Quiz';

const questions = [
  {
    id: 'q1',
    question: 'What should a balanced budget do?',
    options: ['Ignore expenses', 'Keep spending within income', 'Guarantee wealth', 'Remove all wants'],
    correctIndex: 1,
    explanation: 'A sustainable budget keeps planned spending within available income.',
  },
  {
    id: 'q2',
    question: 'What is an emergency fund for?',
    options: ['Unexpected costs', 'Daily snacks', 'Borrowing more', 'Ignoring bills'],
    correctIndex: 0,
    explanation: 'An emergency fund helps cover unexpected necessary expenses.',
  },
];

function renderQuiz() {
  return render(
    <ProgressProvider>
      <Quiz moduleId="budgeting" moduleTitle="Budgeting" questions={questions} />
    </ProgressProvider>,
  );
}

async function answerQuestion(user, optionName) {
  await user.click(screen.getByRole('radio', { name: new RegExp(optionName, 'i') }));
  await user.click(screen.getByRole('button', { name: /check answer/i }));
}

describe('Quiz', () => {
  it('does not reveal an explanation until an answer is checked', async () => {
    const user = userEvent.setup();
    renderQuiz();

    expect(screen.queryByText(questions[0].explanation)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /check answer/i })).toBeDisabled();

    await user.click(screen.getByRole('radio', { name: /keep spending within income/i }));
    expect(screen.getByRole('radio', { name: /keep spending within income/i })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    expect(screen.getByRole('button', { name: /check answer/i })).toBeEnabled();
  });

  it('shows feedback and an explanation after checking an answer', async () => {
    const user = userEvent.setup();
    renderQuiz();

    await answerQuestion(user, 'Keep spending within income');

    expect(screen.getByText('Correct!')).toBeInTheDocument();
    expect(screen.getByText(questions[0].explanation)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next question/i })).toBeEnabled();
  });

  it('scores a completed quiz and persists the attempt', async () => {
    const user = userEvent.setup();
    renderQuiz();

    await answerQuestion(user, 'Keep spending within income');
    await user.click(screen.getByRole('button', { name: /next question/i }));
    await answerQuestion(user, 'Unexpected costs');
    await user.click(screen.getByRole('button', { name: /see final score/i }));

    expect(screen.getByText('Quiz Passed!')).toBeInTheDocument();
    expect(screen.getByText('(100%)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retake quiz/i })).toBeEnabled();

    await waitFor(() => {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      expect(saved.modules.budgeting).toMatchObject({
        completed: true,
        bestScore: 2,
        lastScore: 2,
        attempts: 1,
      });
      expect(saved.modules.budgeting.lastAttemptAt).toEqual(expect.any(String));
    });
  });

  it('supports retrying after a failed attempt', async () => {
    const user = userEvent.setup();
    renderQuiz();

    await answerQuestion(user, 'Ignore expenses');
    await user.click(screen.getByRole('button', { name: /next question/i }));
    await answerQuestion(user, 'Daily snacks');
    await user.click(screen.getByRole('button', { name: /see final score/i }));

    expect(screen.getByText('Keep Practicing')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /retake quiz/i }));
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /check answer/i })).toBeDisabled();
  });
});
