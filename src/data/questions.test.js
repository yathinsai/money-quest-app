import { describe, expect, it } from 'vitest';
import { budgetingQuestions } from './budgetingQuestions';
import { businessProfitQuestions } from './businessProfitQuestions';
import { inflationQuestions } from './inflationQuestions';

const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];
const questionSets = [
  ['budgeting', budgetingQuestions],
  ['inflation', inflationQuestions],
  ['business profit', businessProfitQuestions],
];

describe('quiz question data', () => {
  it.each(questionSets)('%s questions follow the shared schema', (_moduleName, questions) => {
    expect(questions).toHaveLength(5);

    for (const question of questions) {
      expect(question.id).toEqual(expect.any(String));
      expect(VALID_DIFFICULTIES).toContain(question.difficulty);
      expect(question.question).toEqual(expect.any(String));
      expect(question.options).toHaveLength(4);
      expect(question.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex).toBeLessThan(question.options.length);
      expect(question.explanation).toEqual(expect.any(String));
    }
  });

  it.each(questionSets)('%s includes every difficulty level', (_moduleName, questions) => {
    const difficulties = new Set(questions.map((question) => question.difficulty));
    expect(difficulties).toEqual(new Set(VALID_DIFFICULTIES));
  });

  it('uses unique question IDs across all modules', () => {
    const ids = questionSets.flatMap(([, questions]) => questions.map((question) => question.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});
