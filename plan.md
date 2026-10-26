# MoneyQuest --- Product Requirements & Implementation Plan

**Project type:** Student-built financial literacy web app\
**Audience:** Students ages 12--16\
**Primary goal:** Teach practical money concepts through short lessons,
interactive simulations, and quizzes.\
**Initial version:** Client-side React app using `localStorage`; no
backend or user accounts.

------------------------------------------------------------------------

## 1. Product vision

MoneyQuest helps middle- and high-school students practice financial
decisions in a safe, fictional environment. Each learning module follows
the same cycle:

**Learn → Experiment → Take a quiz → Review results → Track progress**

The first release should be small, understandable, accessible, and
genuinely useful. It should demonstrate the developer's ability to apply
React fundamentals, organize code, perform calculations, persist state,
and improve a product based on learner feedback.

## 2. Goals and non-goals

### Goals

-   Teach budgeting, inflation/purchasing power, and small-business
    revenue/costs/profit.
-   Provide a reusable quiz component for each module.
-   Save module completion and quiz results in the same browser using
    `localStorage`.
-   Work on mobile and desktop.
-   Explain answers, not just mark them right or wrong.
-   Keep all examples educational and fictional unless a data source is
    clearly cited.
-   Make the app easy to run locally and publish as a static website.

### Non-goals for the first release

-   Real-money transactions or brokerage connections.
-   User accounts, cloud sync, leaderboards, or a database.
-   Personalized financial advice or stock-price predictions.
-   Collecting names, emails, birthdays, school details, or other
    unnecessary personal data.
-   A complex content-management system.

## 3. Target users and needs

### Primary user: Student, age 12--16

Needs plain-language explanations, relatable examples, safe practice,
quick feedback, and a way to see progress.

### Secondary user: Parent, teacher, or workshop host

Needs a clear explanation of what the app teaches, reliable
calculations, and activities that can be used during a workshop.

## 4. Information architecture

-   **Home:** Project purpose, module cards, saved progress summary.
-   **Budgeting:** Short lesson, budget simulator, budgeting quiz.
-   **Inflation:** Short lesson, future-price calculator, inflation
    quiz.
-   **Business Profit:** Short lesson, business calculator, profit quiz.
-   **Investing (later phase):** Investing basics, fictional or clearly
    sourced historical data, investing quiz.
-   **Progress:** Completed modules, latest/best quiz scores, and
    reset-progress option.
-   **About / Sources:** Educational purpose, limitations, content
    references, and project credits.

For the first usable release, prioritize Budgeting, Inflation, and
Business Profit. Add Investing only after the core modules and quizzes
work well.

## 5. Functional requirements

### FR-1: Navigation

-   Users can navigate between Home, each module, Progress, and About.
-   Each route has a descriptive page title and a visible way to return
    to Home.
-   Unknown routes show a friendly not-found page or redirect to Home.

### FR-2: Learning modules

Each module includes: - A short explanation using age-appropriate
language. - A worked example. - An interactive simulator with editable
inputs. - A quiz entry point. - A clear summary of what the student
learned.

### FR-3: Budget simulator

-   Inputs: fictional income and spending categories.
-   Calculate total planned expenses, remaining money, and savings rate
    where applicable.
-   Show a clear status when spending is below, equal to, or above
    income.
-   Validate inputs: numeric, non-negative, and within sensible limits.
-   Explain that savings should not be double-counted as both an expense
    and an available balance if the app's chosen budget model treats it
    differently. Document the chosen model in the UI.

### FR-4: Inflation calculator

-   Inputs: current price, annual inflation rate, and number of years.
-   Calculate projected future price using compound growth:
    `futurePrice = currentPrice * (1 + rate) ** years`.
-   Convert percentage inputs to decimals correctly.
-   Show currency to two decimal places and explain that the result is a
    mathematical scenario, not a prediction of actual future prices.
-   Use clearly sourced historical examples only if historical data is
    added.

### FR-5: Business profit simulator

-   Inputs: selling price per unit, units sold, variable cost per unit,
    and fixed costs.
-   Calculate revenue: `sellingPrice * unitsSold`.
-   Calculate total cost:
    `(variableCostPerUnit * unitsSold) + fixedCosts`.
-   Calculate profit: `revenue - totalCost`.
-   Calculate break-even units when contribution per unit is positive:
    `ceil(fixedCosts / (sellingPrice - variableCostPerUnit))`.
-   Handle cases where selling price is less than or equal to variable
    cost per unit; explain that break-even cannot be reached under those
    assumptions.
-   Validate values and label the result as a simplified estimate.

### FR-6: Reusable quizzes

-   Each module uses the same reusable `Quiz` component and
    module-specific question data.
-   Each question has four choices, one correct answer, and a concise
    explanation.
-   Show immediate or post-answer feedback consistently.
-   Support next question, final score, retry, and returning to the
    module.
-   Do not reveal the correct answer before the student answers.
-   Save score, number of questions, timestamp, and completion status.
-   Make keyboard focus and selected-answer states visible.

### FR-7: Progress and persistence

-   Save progress in `localStorage` under a versioned key, such as
    `moneyquest:v1`.
-   Persist module completion and quiz attempts/best scores.
-   Handle missing, malformed, or outdated saved data without crashing;
    fall back to a safe default.
-   Include a confirmation before resetting all local progress.
-   Explain that progress is stored only in this browser/device and may
    not follow the student to another device or browser.
-   Do not store sensitive personal information.

### FR-8: Responsive and accessible UI

-   Layout works on phone, tablet, and desktop.
-   Use semantic headings, labels, buttons, and form controls.
-   Do not communicate status using color alone.
-   Maintain readable contrast, visible focus indicators, and sensible
    text sizes.
-   Charts, if added, need a text summary or equivalent values.

## 6. Selected technology stack

Keep dependencies minimal, lightweight, and universally browser-compatible.

-   **React (v18+) + Vite:** Core client-side framework and lightning-fast build tool/dev server.
-   **React Router (v6+):** Declarative client-side routing for Home, Modules, Progress, About, and 404 handling.
-   **Tailwind CSS:** Selected utility-first CSS framework. Compiles to standard vanilla CSS at build time for 100% universal compatibility across Chrome, Safari, Firefox, Edge, and ChromeOS (Chromebooks). Provides responsive layouts and accessible focus states with zero CSS bloat.
-   **Lucide React:** Selected iconography. Uses standard, tree-shakable inline SVGs (`<svg>`) that scale cleanly and avoid network firewall blocks common with web-font icon libraries.
-   **Built-in `localStorage`:** Browser-native local persistence using versioned keys (`moneyquest:v1`) and safe `try/catch` fallbacks.
-   **Vitest:** Lightweight test runner for pure financial math and calculation utility verification.

Avoid a backend, authentication, and database in version 1 (see `localstorage-vs-database.md` for full architectural rationale). Use JavaScript unless there is a clear reason to introduce TypeScript.

## 7. Suggested project structure

``` text
src/
  components/
    Navbar.jsx
    ModuleCard.jsx
    Quiz.jsx
    ProgressSummary.jsx
    FormField.jsx
  pages/
    Home.jsx
    Budgeting.jsx
    Inflation.jsx
    BusinessProfit.jsx
    Progress.jsx
    About.jsx
    NotFound.jsx
  data/
    budgetingQuestions.js
    inflationQuestions.js
    businessProfitQuestions.js
  hooks/
    useLocalStorage.js
  utils/
    calculations.js
    progressStorage.js
    formatters.js
  App.jsx
  main.jsx
  index.css
```

Keep calculations separate from UI components so they can be tested
independently.

## 8. Data design for localStorage

Use a single versioned object to simplify persistence. Example shape:

``` js
{
  version: 1,
  modules: {
    budgeting: {
      completed: false,
      bestScore: null,
      lastScore: null,
      attempts: 0,
      lastAttemptAt: null
    },
    inflation: {
      completed: false,
      bestScore: null,
      lastScore: null,
      attempts: 0,
      lastAttemptAt: null
    },
    businessProfit: {
      completed: false,
      bestScore: null,
      lastScore: null,
      attempts: 0,
      lastAttemptAt: null
    }
  }
}
```

Implementation notes: - Wrap `JSON.parse` in `try/catch`. - Validate
parsed data before using it. - Keep a default state for new users. -
Update state immutably. - Save when progress changes. - Test behavior
when storage is empty, malformed, or unavailable. - Remember that
`localStorage` is not secure storage and can be cleared by the user.

## 9. Implementation roadmap

### Phase 0 --- Confirm scope and sketch

1.  Use **MoneyQuest** as a temporary name; check name availability
    before public branding.
2.  Confirm the first three modules: Budgeting, Inflation, Business
    Profit.
3.  Sketch Home and one module page on paper or in a design tool.
4.  Define the key learning objective and 5--10 quiz questions for each
    module.
5.  Write down the formulas and test cases for each simulator.

**Done when:** The first-release scope is written down and each module
has a clear learning objective.

### Phase 1 --- Set up the project

1.  Create a React + Vite app.
2.  Add React Router.
3.  Configure Tailwind CSS and Lucide React.
4.  Create the shared page layout and navigation.
5.  Create placeholder routes for Home, modules, Progress, and About.
6.  Put the initial project in Git and make a baseline commit.

**Done when:** The app starts locally, all routes load, and navigation
works.

### Phase 2 --- Build Home and reusable UI

1.  Create a `ModuleCard` component.
2.  Show the three launch modules on Home.
3.  Add a simple progress summary.
4.  Build reusable input/field and feedback components.
5.  Check mobile layout and keyboard navigation.

**Done when:** Home links to all three modules and the layout works at
narrow and wide screen sizes.

### Phase 3 --- Build Budgeting end to end

1.  Write the budgeting lesson.
2.  Build controlled inputs for income and categories.
3.  Implement calculations in `utils/calculations.js`.
4.  Display total expenses, remaining money, and budget status.
5.  Add budgeting quiz data.
6.  Build the first version of the reusable `Quiz` component.
7.  Save quiz score and module completion.
8.  Test edge cases such as zero income, blank inputs, and expenses
    above income.

**Done when:** A student can learn, experiment, complete the quiz, see
explanations, and see their progress after refreshing.

### Phase 4 --- Add Inflation

1.  Write the inflation and purchasing-power lesson.
2.  Build current-price, rate, and years inputs.
3.  Implement and test the compound-growth formula.
4.  Display the future price and explain assumptions.
5.  Add the inflation quiz using the shared `Quiz` component.
6.  Save inflation results to progress.

**Done when:** Inputs update the calculation correctly and the quiz
saves results.

### Phase 5 --- Add Business Profit

1.  Explain revenue, variable costs, fixed costs, profit, and
    break-even.
2.  Build the business input form.
3.  Implement revenue, cost, profit, and break-even calculations.
4.  Handle zero units and selling price at or below variable cost.
5.  Add the business-profit quiz.
6.  Save completion and quiz results.

**Done when:** Calculations pass the defined examples and the full
learning cycle works.

### Phase 6 --- Finish progress and persistence

1.  Implement `useLocalStorage` or a dedicated storage utility.
2.  Use a versioned storage key.
3.  Add safe parsing and default values.
4.  Show completed modules, best scores, latest scores, and attempts.
5.  Add a reset button with confirmation.
6.  Test refresh, browser restart, malformed data, and empty storage.

**Done when:** Progress persists reliably on the same browser and can be
reset intentionally.

### Phase 7 --- Quality and testing

1.  Test every formula using hand-calculated examples.
2.  Test quiz scoring, retry, explanations, and saved results.
3.  Test keyboard-only use and visible focus.
4.  Test small mobile screens and desktop.
5.  Check browser console for errors.
6.  Ask a few volunteer students to try it with appropriate adult
    permission.
7.  Ask users what was confusing; record themes without collecting
    unnecessary identifying information.
8.  Fix the highest-impact problems and document what changed.

**Done when:** No known blocking bugs remain, calculations are checked,
and feedback has informed at least one improvement.

### Phase 8 --- Publish and document

1.  Create a clear README with setup instructions and screenshots.
2.  Explain the educational purpose and limitations.
3.  Cite trustworthy sources used for financial facts or historical
    data.
4.  Deploy the static app to a platform such as Vercel or Netlify.
5.  Test the deployed URL on phone and desktop.
6.  Keep a short changelog of meaningful improvements.

**Done when:** A public demo works, the repository is understandable,
and the README explains how the project works.

### Phase 9 --- Optional later enhancements

Only after the core app is stable: - Add investing education with
fictional assets or cited historical datasets. - Add difficulty levels
and a final knowledge check. - Add a workshop mode with printable
activities. - Add an educator page with lesson objectives and discussion
prompts. - Consider anonymous aggregate feedback only with appropriate
safeguards and permission; do not add tracking by default.

## 10. Acceptance criteria for version 1

-   [x] App runs locally with documented commands.
-   [x] Home and all three launch modules are navigable.
-   [x] Budget simulator produces correct totals and remaining balance.
-   [x] Inflation calculator handles percentage and year inputs correctly.
-   [x] Business simulator calculates revenue, costs, profit, and break-even correctly.
-   [x] Every module has its own quiz and explanations.
-   [x] Quiz scores and module completion persist after refresh.
-   [x] Progress page displays saved progress accurately.
-   [x] Reset progress requires confirmation.
-   [x] Invalid or missing localStorage data does not crash the app.
-   [x] UI works on mobile and desktop.
-   [x] Forms have labels and controls are keyboard-accessible.
-   [x] README explains setup, formulas, data handling, and limitations.
-   [x] No real financial transactions or sensitive personal data are collected.

## 11. Content quality and safety principles

-   Use age-appropriate, neutral, nonjudgmental language.
-   Do not shame students for financial choices; explain trade-offs and
    consequences.
-   Clearly label simulated money and fictional scenarios.
-   Distinguish educational examples from current financial facts.
-   Cite sources for factual claims and historical economic data.
-   Explain that investing involves risk and that historical results do
    not guarantee future performance.
-   Do not request personal financial information from young users.
-   Make it clear that progress is stored locally and can be erased by
    clearing browser data.

## 12. Project success measures

Track only what is necessary for a student-led pilot: - Number of
modules completed during a voluntary test. - Quiz score before and after
a lesson, if you design a fair comparison. - Which questions students
commonly miss. - Student feedback on clarity and usefulness. - Number
and type of improvements made based on feedback.

Do not claim the app improved financial literacy unless the testing
method and results support that conclusion. A small pilot is useful
feedback, not proof that the app works for every student.

## 13. First task checklist

Start here, in order:

1.  [ ] Create the Vite React project.
2.  [ ] Add React Router and create placeholder pages.
3.  [ ] Build the navigation and Home page.
4.  [ ] Write and test pure calculation functions.
5.  [ ] Build the Budgeting module first.
6.  [ ] Build a reusable quiz component.
7.  [ ] Add local progress persistence.
8.  [ ] Expand to Inflation and Business Profit.
9.  [ ] Test with users and improve.
10. [ ] Publish the demo and document the work.

**Build principle:** Finish one complete module before starting three
half-finished modules.
