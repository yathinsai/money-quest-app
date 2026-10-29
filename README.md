# MoneyQuest 🪙

> An interactive, safe financial literacy web application designed for students ages 12–16.

MoneyQuest helps middle- and high-school students learn practical money concepts through hands-on simulations, interactive calculators, and bite-sized quizzes.

---

## 🌟 The 5-Step Learning Loop

Every module in MoneyQuest follows a proven educational cycle:
$$\text{Learn} \longrightarrow \text{Experiment} \longrightarrow \text{Take a Quiz} \longrightarrow \text{Review Explanations} \longrightarrow \text{Track Progress}$$

---

## 📚 Core Modules (Version 1)

1. **Budgeting & Cash Flow (`/budgeting`):**
   * Income vs. expenses, needs vs. wants, and paying yourself first.
   * Interactive budget simulator calculating total planned spending, remaining balance, and savings rate.
   * Visual indicators for budget surplus, balance, and deficit.
   * Clear guidelines preventing the double-counting of savings.

2. **Inflation & Purchasing Power (`/inflation`):**
   * Plain-language explanation of compound inflation and lost purchasing power.
   * Future price compound growth simulator: $\text{futurePrice} = \text{currentPrice} \times (1 + \text{rate})^{\text{years}}$.
   * Quick presets (pizza slice, movie ticket, video game, laptop) and interactive sliders.
   * Clear disclaimers distinguishing mathematical modeling from economic forecasts.

3. **Business Profit & Break-Even (`/profit`):**
   * Core concepts: Selling price, units sold, variable costs, fixed overhead, and net profit.
   * Dynamic break-even calculator: $\lceil \frac{\text{fixedCosts}}{\text{sellingPrice} - \text{variableCost}} \rceil$.
   * Protective safeguards detecting when selling price is below variable cost.

4. **Reusable Quiz Engine:**
   * 5 scenario-based questions per module with 4 choices.
   * Instant explanations for both correct and incorrect choices.
   * 70% passing threshold unlocks module completion.
   * Keyboard accessible with full focus ring visibility.

5. **Local Persistence & Privacy (`/progress`):**
   * Uses browser-native `localStorage` (`moneyquest:v1`).
   * Zero personal data collected (COPPA/FERPA compliant).
   * Double-confirmation progress reset flow.

---

## 🛠️ Technology Stack

* **Framework:** [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
* **Routing:** [React Router 6](https://reactrouter.com/)
* **Styling:** [Tailwind CSS 3](https://tailwindcss.com/) (utility-first, responsive, accessible)
* **Icons:** [Lucide React](https://lucide.dev/) (inline SVGs, 100% universal browser compatibility)
* **Testing:** [Vitest](https://vitest.dev/) (pure mathematical unit testing)
* **State Management:** React Context API + Custom Hooks (`useProgress`, `useLocalStorage`)

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** (v9 or higher)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd money-quest
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Run calculation unit tests:**
   ```bash
   npm test
   ```
   The suite covers financial calculation edge cases plus the primary successful flows for quiz completion, saved progress, reset confirmation, and route titles. See the [Phase 7 validation record](./docs/phase-7-validation.md) for completed checks and remaining manual testing.

5. **Build for production:**
   ```bash
   npm run build
   ```
   Outputs an optimized, zero-backend static website to `/dist`.

---

## 🌐 Deploy to GitHub Pages with GitHub Actions

This repository is already configured to build and deploy with [GitHub Actions](./.github/workflows/deploy.yml). Vite uses `/money-quest-app/` as its production base path, and the app uses `HashRouter` so client-side routes work when hosted by GitHub Pages.

### One-time GitHub setup

1. Push the project to a GitHub repository named `money-quest-app` with `main` as its default branch.
2. Open the repository on GitHub and go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Go to **Settings → Actions → General**. Under **Actions permissions**, either:
   * Select **Allow all actions and reusable workflows**, or
   * Allow actions created by GitHub so the workflow can use `actions/checkout`, `actions/setup-node`, and the official GitHub Pages actions.
5. Save the settings.

GitHub Pages is available for public repositories on GitHub Free. Using Pages with a private repository requires an eligible paid GitHub plan.

### Deploy

Every push to `main` automatically runs the deployment workflow:

```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

The workflow installs dependencies with `npm ci`, runs the test suite, builds the production files in `dist/`, uploads that directory, and deploys it to GitHub Pages.

To start a deployment manually, open **Actions → Deploy to GitHub Pages → Run workflow** in the GitHub repository.

After a successful deployment, the application is available at:

```text
https://yathinsai.github.io/money-quest-app/
```

If the repository name changes, update `base` in [`vite.config.js`](./vite.config.js) to `/<new-repository-name>/` before deploying.

---

## 🔒 Privacy & Architecture Rationale

For detailed architectural considerations regarding why `localStorage` was selected over a cloud database (Supabase/Neon) for Version 1, see [`localstorage-vs-database.md`](./localstorage-vs-database.md).

* **Zero Accounts:** No email, password, or sign-up required.
* **Classroom Ready:** Students can start immediately without teacher IT approvals or email spam delays.
* **Device Locked:** Progress is kept only in the local browser; clearing browser data will reset scores.

---

## 📖 Educational Standards & Citations

* **Council for Economic Education (CEE):** National Standards for Financial Literacy (Spending, Saving, Earning).
* **U.S. Bureau of Labor Statistics (BLS):** Consumer Price Index (CPI) methodology.
* **FDIC:** Money Smart for Young People curriculum guides.

---

## ⚖️ License & Educational Disclaimer

All calculations and fictional examples are for educational purposes only and do not constitute financial advice. Created for student learning and public educational workshops.
