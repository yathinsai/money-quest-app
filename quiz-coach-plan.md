# MoneyQuest Quiz Coach — Product and Implementation Plan

## 1. Product concept

MoneyQuest Quiz Coach is a companion practice app for students ages 12–16. It extends the existing MoneyQuest lessons without changing the stable Version 1 simulators or progress data.

The core practice loop is:

**Choose a module → Choose a difficulty → Answer randomized questions → Review explanations → See session results**

The coach should feel conversational and encouraging, but scoring and explanations must come from reviewed question data rather than generated financial advice.

## 2. Why this should be a companion app

Adding difficulty controls to the existing app would create mostly empty choices because MoneyQuest currently has only five questions per module. A companion app provides room to develop a larger question bank, randomized practice, session history, and coaching feedback without risking the core learning flow.

Recommended implementation options:

1. Start as a new `/quiz-coach` route inside the existing React project.
2. Keep its components, data, and storage isolated under a `quiz-coach` feature folder.
3. Move it into a separate repository later only if it develops its own release cycle or substantially different design.

## 3. Version 1 scope

### Modules

- Budgeting and Cash Flow
- Inflation and Purchasing Power
- Business Profit and Break-Even

### Difficulty levels

- **Beginner:** Vocabulary, recognition, and one-step calculations.
- **Intermediate:** Multi-step calculations and comparisons.
- **Advanced:** Trade-offs, missing values, and scenario-based reasoning.

### Core features

- Module selector.
- Difficulty selector.
- Question filtering by module and difficulty.
- Randomized question order.
- Randomized answer order without changing the correct answer.
- One question displayed at a time.
- Immediate correct/incorrect feedback.
- Reviewed explanation after every answer.
- Session score, percentage, and answer review.
- Retry the same settings with a newly randomized session.
- Local session history stored in the browser.

## 4. Content requirements

The existing 15 questions are not enough for meaningful difficulty filtering and randomization.

Recommended initial question bank:

```text
3 modules × 3 difficulty levels × 8 questions = 72 questions
```

Each question should use this shape:

```js
{
  id: 'budgeting-beginner-01',
  module: 'budgeting',
  difficulty: 'beginner',
  question: 'Which expense is usually considered a need?',
  options: ['Basic groceries', 'A new video game', 'Concert tickets', 'Premium sneakers'],
  correctIndex: 0,
  explanation: 'Basic groceries support health and daily living, so they are generally a need.',
  learningObjective: 'Distinguish needs from wants'
}
```

Question rules:

- Exactly four answer choices.
- Exactly one correct answer.
- A concise explanation for every question.
- Calculations verified with the existing pure calculation utilities where applicable.
- Fictional, age-appropriate examples.
- No personal financial advice or requests for personal information.
- No trick wording or shame-based feedback.

## 5. Practice-session design

A session should contain 5–10 questions selected from the chosen module and difficulty.

At session creation:

1. Filter the question bank by module and difficulty.
2. Shuffle the matching questions using a tested shuffle utility.
3. Select the requested number of questions.
4. Shuffle each question's answer choices.
5. Recalculate the correct-answer index after shuffling.
6. Store the selected questions in session state so re-renders do not reshuffle an active session.

If there are not enough matching questions, show a clear message instead of silently repeating questions.

## 6. Coaching behavior

The first version should use deterministic coaching messages:

- Correct answer: brief encouragement followed by the explanation.
- Incorrect answer: neutral feedback, correct answer, and explanation.
- Strong session: suggest trying the next difficulty.
- Developing session: suggest reviewing the related MoneyQuest module.

Do not use a generative AI model in Version 1. A future AI coach may rephrase reviewed explanations, but it must not generate scores, correct answers, or financial claims independently.

## 7. Progress and storage

Use a separate versioned key so Quiz Coach data cannot damage core MoneyQuest progress:

```text
moneyquest:quiz-coach:v1
```

Suggested data shape:

```js
{
  version: 1,
  sessions: [
    {
      id: 'session-id',
      module: 'budgeting',
      difficulty: 'intermediate',
      score: 7,
      totalQuestions: 10,
      completedAt: '2026-10-29T12:00:00.000Z'
    }
  ]
}
```

Store only the most recent 20 sessions. Do not collect names, emails, school details, or personal financial information.

## 8. Suggested project structure

```text
src/
  features/
    quiz-coach/
      components/
        CoachSetup.jsx
        CoachQuestion.jsx
        CoachFeedback.jsx
        CoachResults.jsx
        SessionHistory.jsx
      data/
        budgetingQuestions.js
        inflationQuestions.js
        businessProfitQuestions.js
      utils/
        createQuizSession.js
        shuffle.js
        quizCoachStorage.js
      QuizCoachPage.jsx
```

Keep filtering, shuffling, scoring, and storage separate from React components so they can be tested independently.

## 9. Implementation roadmap

### Phase 0 — Confirm scope

- Confirm the companion route and visual direction.
- Define learning objectives for each module and difficulty.
- Decide whether sessions contain 5 or 10 questions.

### Phase 1 — Data model and validation

- Define the question schema.
- Add module and difficulty metadata.
- Create a validation test for IDs, choices, correct indexes, explanations, and learning objectives.
- Write and review the first question set.

### Phase 2 — Session engine

- Implement filtering by module and difficulty.
- Implement unbiased question shuffling.
- Implement answer-choice shuffling with correct-index preservation.
- Prevent duplicates within a session.
- Add pure unit tests for every session rule.

### Phase 3 — Quiz Coach interface

- Build module and difficulty selectors.
- Build the active-question and feedback screens.
- Build results and answer-review screens.
- Add restart and change-settings actions.

### Phase 4 — History and persistence

- Save completed sessions under the separate versioned storage key.
- Show recent scores by module and difficulty.
- Limit history to the most recent 20 sessions.
- Add reset confirmation and malformed-storage recovery.

### Phase 5 — Quality and accessibility

- Test keyboard-only completion.
- Test visible focus and screen-reader labels.
- Test mobile, tablet, Chromebook, and desktop layouts.
- Verify every calculation and explanation.
- Run student testing and document at least one improvement.

### Phase 6 — Release

- Add README documentation and screenshots.
- Add the Quiz Coach route to navigation without replacing the original module quizzes.
- Run the full MoneyQuest and Quiz Coach test suites.
- Deploy through the existing GitHub Pages workflow.

## 10. Testing priorities

- Filtering returns only the selected module and difficulty.
- Randomization does not lose or change correct answers.
- A session contains no duplicate questions.
- Scores match submitted answers.
- Explanations appear only after answering.
- Retrying creates a valid new randomized session.
- Session history persists after refresh.
- Broken saved data does not crash the app.
- Existing MoneyQuest quizzes and progress remain unchanged.

## 11. Version 1 acceptance criteria

- [ ] Students can select one module and one difficulty.
- [ ] Sessions contain only matching questions.
- [ ] Questions and answer choices are randomized safely.
- [ ] Every answer receives reviewed feedback and an explanation.
- [ ] Results show score, percentage, and answer review.
- [ ] Recent session history persists locally.
- [ ] Resetting Quiz Coach history does not reset MoneyQuest module progress.
- [ ] Keyboard and mobile use are verified.
- [ ] The existing MoneyQuest application continues to pass all tests.
- [ ] No sensitive personal information is collected.

## 12. Explicit non-goals

- Simulator difficulty levels.
- Changes to the current Budgeting, Inflation, or Business Profit simulators.
- User accounts, cloud sync, leaderboards, or a database.
- AI-generated financial facts, correct answers, or personalized advice.
- Locking content behind scores or creating competitive pressure.

## 13. Recommended first milestone

Build one vertical slice using **Budgeting — Beginner** with at least eight reviewed questions. Complete filtering, randomization, answering, explanations, scoring, and tests before expanding to the other eight module/difficulty combinations.
