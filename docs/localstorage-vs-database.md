# Architecture Decision Record (ADR): Storage Strategy for V1

**Title:** Why Sticking to `localStorage` (No Database) is Best for MoneyQuest V1  
**Status:** Accepted  
**Date:** October 2026  
**Context:** Decision on whether to integrate an external cloud database (e.g., Supabase, Neon) or use browser-native `localStorage` for state persistence in MoneyQuest V1.

---

## 1. Executive Summary

For the initial release of **MoneyQuest**, persisting user progress using browser-native `localStorage` is chosen over a cloud database. 

While a database provides multi-device synchronization and teacher analytics, introducing one in V1 introduces severe legal compliance hurdles (COPPA/FERPA), friction in classroom environments, hosting maintenance overhead, and slows down initial delivery. Given the V1 user progress footprint is **less than 1 KB**, `localStorage` fulfills all functional requirements with zero cost and zero legal liability.

---

## 2. Advantages of `localStorage` for V1

### A. Strict Minor Privacy & Legal Compliance (COPPA / FERPA / GDPR-K)
* **The Problem:** The target audience is students ages 12–16. Under US regulations (COPPA, FERPA) and international standards (GDPR-K), storing minor data on a server requires verifiable parental consent, strict data retention policies, right-to-be-forgotten deletion workflows, and secure credential handling.
* **The `localStorage` Advantage:** Because all data remains local to the user's browser, **zero Personally Identifiable Information (PII) is transmitted, stored, or processed on external servers**. This legally protects the developer and schools from regulatory violations.

### B. Frictionless Classroom Onboarding
* **The Problem:** School workshops and class periods are short (often 40–50 minutes). Having students create accounts results in forgotten passwords, blocked school email domains, spam-filter verification delays, and lost teaching time.
* **The `localStorage` Advantage:** Zero friction. Students simply open the URL and immediately start learning. Progress saves automatically in the background without requiring email, password, or profile setup.

### C. Zero Infrastructure Cost & 100% Uptime
* **The Problem:** Free-tier cloud databases (e.g., Supabase, Neon) typically **pause after 7 days of inactivity**. If a teacher or evaluator tests the project after a hiatus, the application may fail or experience cold-start latency.
* **The `localStorage` Advantage:** The app can be deployed as a 100% static site (via Vercel, Netlify, or GitHub Pages) with virtually zero maintenance, infinite uptime, and $0 operational cost.

### D. Architectural Simplicity & Rapid Development
* **The Problem:** Cloud databases introduce asynchronous network fetching, loading skeletons, connection errors, offline handling, and complex state management (Row-Level Security, JWT tokens).
* **The `localStorage` Advantage:** Pure synchronous JavaScript APIs. Calculations, quiz state updates, and completions are stored instantly with clean, testable code (`useLocalStorage.js`), allowing full focus on pedagogical quality and UI polish.

### E. Offline & Low-Bandwidth Resilience
* Once the static assets are loaded, students can complete lessons, run simulations, and take quizzes even with unstable school Wi-Fi or offline connections.

---

## 3. Limitations of `localStorage`

While optimal for V1, `localStorage` has known limitations that must be acknowledged and mitigated:

| Limitation | Impact | V1 Mitigation |
| :--- | :--- | :--- |
| **No Cross-Device Sync** | Progress on a school Chromebook does not appear on a home phone or desktop. | Inform students in the UI that progress is device-specific. (Optionally provide a one-click JSON "Export/Import Progress" button). |
| **Risk of Data Loss** | Clearing browser cache/cookies, private/incognito browsing, or device switching wipes progress. | Display a clear disclaimer on the Progress page: *"Progress is saved locally in this browser. Clearing browsing data will reset your scores."* |
| **No Teacher Dashboards** | Educators cannot view aggregate classroom metrics or identify commonly missed questions remotely. | Deferred to V2. In V1, students can show their final Progress screen or printable certificate directly to the teacher. |
| **Client-Side Tampering** | Technically savvy students can alter `localStorage` keys via DevTools. | Non-issue for educational simulations with no real-world monetary value or high-stakes grading. |
| **Storage Limits (~5 MB)** | Limited browser storage quota. | Non-issue: The total V1 progress payload is under 1 KB. |

---

## 4. Comparison Matrix: `localStorage` vs. Cloud Database

| Dimension | `localStorage` (V1 Choice) | Cloud Database (e.g., Supabase / Neon) |
| :--- | :--- | :--- |
| **Setup Overhead** | ~1 hour (custom hook) | 1–2 days (schema, auth, RLS, SDK setup) |
| **Legal/Compliance Risk** | **None** (No server-side data) | **High** (COPPA/FERPA compliance required) |
| **Account Friction** | **Zero** (Instant start) | **High** (Sign-up / login flow needed) |
| **Classroom Suitability** | Excellent for quick workshops | Requires prior IT/email clearance |
| **Hosting & Inactivity** | Never pauses, 100% free | Free-tier pauses on inactivity |
| **Cross-Device Sync** | No | Yes |
| **Teacher Analytics** | No | Yes |

---

## 5. V1 Implementation Best Practices

To make `localStorage` bulletproof in V1, follow these rules:

1. **Versioned Key:** Store data under a versioned key (`moneyquest:v1`) to prevent collisions and allow smooth schema upgrades.
2. **Defensive Error Handling:** Wrap all `JSON.parse` and `JSON.stringify` calls in `try / catch` blocks to prevent app crashes if storage is corrupted or disabled.
3. **Graceful Fallbacks:** If storage is disabled (e.g., Safari private browsing strict quota), fall back to in-memory React state so the app remains usable for that session.
4. **Explicit Reset Confirmation:** Require a double-check modal or confirmation dialog before invoking `localStorage.removeItem()` or wiping progress.

---

## 6. Migration Roadmap to Version 2 (When to Add a Database)

Introduce a managed backend (such as **Supabase**) only when the following product triggers occur:

* **Trigger 1:** Teachers request an Educator Portal to assign modules and view student completion rosters.
* **Trigger 2:** Cross-device persistence becomes a mandatory student feature.
* **Trigger 3:** A dynamic Content Management System (CMS) is built so non-technical educators can add new quizzes without code redeployments.
