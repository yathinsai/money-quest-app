# Phase 7 Quality and Testing

This document records automated verification and the manual checks required before MoneyQuest Version 1 leaves public beta.

## Automated verification

Run the complete quality gate locally with:

```bash
npm test
npm run build
npm audit
```

Current automated coverage focuses on successful user journeys and includes:

- Budget surplus, balanced, deficit, and zero-income calculations.
- Compound inflation, zero-year, and zero-rate calculations.
- Business revenue, cost, profit, loss, contribution margin, and break-even edge cases.
- Correct quiz answer feedback, explanations, successful scoring, completion, and persistence.
- Initial and valid saved progress in `localStorage`.
- Confirming a progress reset and clearing saved data.
- Descriptive browser titles for every route and the not-found page.

The GitHub Pages workflow runs tests before every production build and deployment.

## Manual device and accessibility checklist

Record the date, browser, operating system, device, result, and notes for each run. Test the deployed GitHub Pages URL rather than only the local development server.

### Keyboard-only use

- [ ] Reach every navigation link with `Tab` and `Shift+Tab`.
- [ ] Confirm the focused element always has a visible focus indicator.
- [ ] Open and close the mobile navigation without a mouse.
- [ ] Complete a quiz using only the keyboard.
- [ ] Confirm quiz choices announce their selected state.
- [ ] Open the reset dialog, verify focus moves into it, and close it with Escape.
- [ ] Confirm no keyboard focus becomes trapped or lost.

### Responsive devices

- [ ] Phone-sized screen (approximately 320–430 px wide).
- [ ] Tablet or Chromebook-sized screen.
- [ ] Desktop screen.
- [ ] Portrait and landscape orientation where available.
- [ ] Navigation, forms, results, quizzes, and dialogs remain readable without horizontal scrolling.
- [ ] Touch targets are easy to activate without accidental taps.

### Browsers and persistence

- [ ] Chrome or ChromeOS.
- [ ] Safari on an Apple device, if available.
- [ ] Complete a quiz, refresh the page, and confirm progress remains.
- [ ] Close and reopen the browser and confirm progress remains.
- [ ] Reset progress and confirm all module scores and attempts are cleared.
- [ ] Navigate directly between every module and confirm there are no broken routes.
- [ ] Check the browser console while completing each module; record any errors or warnings.

## Student feedback record

Use a small voluntary test group with appropriate adult permission. Do not record names, emails, school information, or personal financial details.

For each session, record only:

- Date and module tested.
- Whether the student completed the module without assistance.
- Concepts or instructions that were confusing.
- Quiz questions commonly missed.
- Suggestions about clarity or usefulness.

## Improvement log

Phase 7 is complete when at least one meaningful issue found through testing is fixed and recorded here.

| Date | Evidence or feedback | Change made | Verification |
| --- | --- | --- | --- |
| Pending | Student and real-device testing not completed yet | — | — |
