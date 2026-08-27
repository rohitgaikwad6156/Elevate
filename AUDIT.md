# ELEVATE — Code & Design Audit

**Audited:** 23 August 2026
**Scope:** `src/` — 33,925 lines across 74 JS/JSX files and 63 stylesheets (12 pages, 32 modals, 60 design tokens)
**Method:** every file parsed with Babel and statically analysed for unresolved imports, missing exports, undefined CSS-module classes, undefined design tokens, effect cleanup, and accessibility patterns. Every finding below was then confirmed a second time by direct inspection.

---

## Verdict

The good news first, because it matters for how you read the rest: **there are no build-breaking errors.** All 74 files parse cleanly, every relative import resolves to a real file, and every named and default import matches an export that actually exists. That is genuinely uncommon in a 34k-line hand-built codebase and it says the foundations were laid carefully.

The structure is also sound. A consistent `pages / components / data / styles` split, CSS Modules scoped per component, a real token file with 60 variables, one icon library used consistently, and hand-rolled SVG radar charts rather than dragging in a charting dependency. Someone was thinking about architecture.

The problems are of a different kind. ELEVATE currently looks like an application but does not yet behave like one. Three issues account for most of the gap: **nothing persists**, **nothing is shared between pages**, and **the AI features are scripted rather than real**. Everything else in this report is smaller by comparison.

| Severity | Count | Nature |
|---|---|---|
| Blocker | 3 | Product-level — the app cannot retain or share state |
| High | 5 | Visible breakage or contradictions users will notice |
| Medium | 6 | Accessibility, responsive, and resilience gaps |
| Low | 5 | Hygiene, dead code, tooling |

---

## Blockers

### B1. Nothing the user does survives a page refresh

There is not a single use of `localStorage`, `sessionStorage`, or `indexedDB` anywhere in the codebase, and no `fetch` call either. Every piece of state lives in `useState` initialised from a static file in `src/data/`.

Concretely, in `src/pages/DailyGoals.jsx:108` the goals list is seeded with `useState(initialGoals)`, and `toggleGoal` at line 126 updates that local copy. Tick a goal, hit F5, and it is unticked again. The same is true of every workout logged, every quiz answered, every session completed, and every goal added across all eleven pages.

This is the single highest-leverage fix in the project. A growth app whose entire premise is consistency and streaks cannot forget everything the moment the tab reloads.

### B2. The eleven pages are eleven disconnected islands

There is no `createContext`, no `useContext`, and no `useReducer` anywhere. Each page imports exactly one data file of its own and shares nothing:

```
Dashboard.jsx      → dashboardData
DailyGoals.jsx     → goalsData
EnglishCoach.jsx   → englishCoachData
PublicSpeaking.jsx → publicSpeakingData
BodyLanguage.jsx   → bodyLanguageData
Fitness.jsx        → fitnessData
InterviewPrep.jsx  → interviewData
LearningHub.jsx    → learningData
Progress.jsx       → progressData
Achievements.jsx   → achievementsData
Profile.jsx        → profileData
```

Nothing crosses between them. Completing a workout on the Fitness page cannot award XP on Achievements, cannot move the needle on Progress, and cannot extend the streak on the Dashboard — because those numbers are separate literals in separate files.

The cost is already visible in the data. The value `2350` (total XP) is hardcoded in **eight places across six files**:

| File | Line |
|---|---|
| `data/achievementsData.js` | 7, 31 |
| `data/profileData.js` | 17 |
| `data/progressData.js` | 189 |
| `components/achievements/XPHistoryModal.jsx` | 24 |
| `pages/Achievements.jsx` | 116, 189 |
| `pages/Profile.jsx` | 250 |

Changing the user's XP means eight coordinated edits, three of them inside JSX.

### B3. Every "AI" feature is a scripted simulation, and one of them makes a false privacy claim

The codebase contains **zero** uses of `getUserMedia`, `<video>`, `<canvas>`, `MediaRecorder`, `SpeechRecognition`, `AudioContext`, or any pose/vision library. There is no camera and no microphone anywhere in ELEVATE.

`components/bodyLanguage/CameraPracticeModal.jsx` illustrates the pattern. It presents a camera stage with framing guides and a live telemetry HUD, but `liveEyeContact` is initialised to the literal `84` (line 22), and the "real-time AI coaching" fires on a timer: a new prompt at second 5, second 15, second 25, and second 40 (lines 35–47). Across the data layer there are **133 hardcoded score fields** driving these "analyses".

Two consequences worth separating. The first is product honesty: line 95 of that same file renders a shield badge reading *"Local Privacy Protected"* with the tooltip *"Video processed locally. Zero permanent cloud storage."* There is no video, so the claim is not merely aspirational, it is false in a way that specifically concerns user trust. Either wire up a real camera or remove that badge — a privacy assurance is the one piece of copy that must never be decorative.

The second is expectation-setting. `dashboardData.js:66` already tags its recommendation as `'Demo Content'`, which is exactly the right instinct. Applying that consistently, or gating the simulated modules behind a visible "Preview" state, would be more honest than the current mix.

---

## High severity

### H1. Twelve elements render completely unstyled

Each of these references a CSS-module class that does not exist in the corresponding stylesheet. CSS Modules resolves the missing key to `undefined`, React drops the attribute, and the element renders with no class at all. Verified by grep against each stylesheet.

| File | Line | Missing class |
|---|---|---|
| `components/bodyLanguage/CameraPracticeModal.jsx` | 145 | `.toggleLabel` |
| `components/bodyLanguage/CameraSetupModal.jsx` | 56 | `.stepIcon` |
| `components/fitness/ExerciseDetailModal.jsx` | 59 | `.instructionItem` |
| `components/fitness/WorkoutSummaryModal.jsx` | 72 | `.prIcon` |
| `components/interview/MockInterviewModal.jsx` | 195, 198, 201, 204 | `.starStep` |
| `components/learning/LessonViewerModal.jsx` | 136 | `.optionText` |
| `components/learning/QuizEngineModal.jsx` | 91 | `.qCounter` |
| `components/publicSpeaking/LiveRecordingModal.jsx` | 133 | `.micIcon` |
| `pages/LearningHub.jsx` | 393 | `.searchInput` |

The `MockInterviewModal` case is the most visible — the four STAR-method steps are the core of that screen and all four are unstyled. The `LearningHub` search input is instructive for a different reason: the missing class was compensated for with a five-property inline `style` object on line 394, which suggests the class was never written rather than accidentally deleted.

### H2. The streak count contradicts itself between pages

`data/achievementsData.js:16` sets `currentStreak: 14`. Six other files set it to `12`:

```
dashboardData.js:71      currentStreak: 12
englishCoachData.js:162  currentStreak: 12
fitnessData.js:9         currentStreak: 12
goalsData.js:161         currentStreak: 12
goalsData.js:183         currentStreak: 12
goalsData.js:193         currentStreak: 12
englishData.js:6         currentStreak: 12
```

A user moving from the Dashboard to Achievements sees their streak jump from 12 days to 14 and back again. `longestStreak` has the same problem: 21 everywhere except `englishData.js:7`, which says 24. This is B2 producing a bug a user can actually see, which is why it is listed separately.

### H3. The user has two different names

`data/achievementsData.js:4` names the user `'Rohit Sharma'`. `data/dashboardData.js` sets `userName: 'User'`. The Dashboard greets a generic placeholder while Achievements addresses someone specific.

### H4. Not one of the 32 modals closes with the Escape key

Searching the entire codebase for `Escape` returns zero matches. Across all 32 modal components:

| Behaviour | Modals with it |
|---|---|
| Closes on Escape | 0 / 32 |
| Focus moved into modal / focus trap | 0 / 32 |
| Background scroll locked while open | 0 / 32 |
| `role="dialog"` or `aria-modal` | 0 / 32 |

The implemented pattern is `overlay onClick={onClose}` with `container onClick={e => e.stopPropagation()}` — see `components/achievements/XPHistoryModal.jsx:13-14`, repeated in every modal. Click-outside works; everything else does not. Keyboard users cannot dismiss a dialog, screen readers are never told a dialog opened, and on mobile the page behind scrolls under your finger.

Modals are the primary interaction surface of this app — 32 of them against 11 pages. This is the highest-impact single fix after the blockers, and because the pattern is identical everywhere, one shared `<Modal>` component fixes all 32 at once.

### H5. Design tokens are bypassed 151 times

`variables.css` defines 60 tokens, and no stylesheet references an undefined one — the token system is well-formed. But CSS modules contain **151 hardcoded hex or rgba colour declarations** that route around it:

| Stylesheet | Hardcoded colours |
|---|---|
| `pages/Achievements.module.css` | 24 |
| `components/progress/GrowthRadarChart.module.css` | 15 |
| `components/progress/GrowthTrendChart.module.css` | 15 |
| `components/learning/LessonViewerModal.module.css` | 8 |
| `components/bodyLanguage/CameraPracticeModal.module.css` | 6 |
| `components/fitness/CameraFormCoachModal.module.css` | 6 |
| `components/publicSpeaking/LiveRecordingModal.module.css` | 6 |
| *(remaining files)* | 71 |

Six page files additionally embed hex colours inside inline `style={{}}` objects. The practical effect: a theme change, a dark mode, or an accent-colour change is not a token edit but a 151-site search-and-replace. The data files compound this by storing presentation in the model — `achievementsData.js:31` carries `color: '#3b82f6'` per stat.

---

## Medium severity

### M1. Twenty-seven interactive controls are keyboard-inaccessible

There are 82 clickable `<div>` elements with no `role` or `tabIndex`. Of these, 55 are the modal overlay/container pattern from H4. The other **27 are genuine interactive controls** — goal rows, selectable cards, tab switchers — that cannot be reached by Tab or activated by Enter:

```
components/layout/Sidebar.jsx:40
pages/Achievements.jsx:253, 318, 467, 571
pages/BodyLanguage.jsx:206, 405
pages/DailyGoals.jsx:210, 251
pages/EnglishCoach.jsx:230
pages/Fitness.jsx:399, 462, 524, 646
pages/InterviewPrep.jsx:311, 374, 477
pages/LearningHub.jsx:314, 350, 403
pages/Profile.jsx:562
pages/Progress.jsx:153, 223, 403, 431, 503
pages/PublicSpeaking.jsx:463
```

`DailyGoals.jsx:210` is the clearest example: ticking off a goal — the single most important action in the app — is only possible with a mouse. Most of these should simply be `<button type="button">`.

Separately, six `<input>` elements have no label, `id`, or placeholder: `JobPrepModal.jsx:61,70`, `AddGoalModal.jsx:96`, `EditProfileModal.jsx:50,84`, `Profile.jsx:721`.

### M2. Mobile is an afterthought — 44 of 63 stylesheets have no breakpoint

Only 19 of 63 stylesheets contain a `@media` rule. Critically, **27 of the 32 modal stylesheets have none at all** — only `BodyLanguageAnalysisModal`, `CameraPracticeModal`, `LiveRecordingModal`, `SessionAnalysisModal`, and `ui/AddGoalModal` adapt. Every other dialog is a fixed desktop layout shown at 375px wide.

Navigation is also desktop-shaped. `AppLayout.module.css:19` drops the sidebar margin below 1024px and `Sidebar.jsx` slides the same 260px desktop panel in from the left. That is the desktop layout hidden, not a mobile navigation pattern — and the project brief explicitly asks for more than shrinking.

The four breakpoints in use are also ad hoc rather than a scale:

| Breakpoint | Uses |
|---|---|
| `max-width: 640px` | 12 |
| `max-width: 1024px` | 11 |
| `max-width: 768px` | 4 |
| `max-width: 1100px` | 3 |

`1100px` is an outlier that should almost certainly be `1024px`.

### M3. One error anywhere blanks the entire app

There is no `ErrorBoundary`, no `try`/`catch`, and no `React.lazy` in the codebase. A single render-time exception in any of the 32 modals unmounts the whole tree to a white screen with no recovery path. There is also no route-level code splitting, so all 33,925 lines plus 77 distinct icons load on first paint even though the Dashboard uses a fraction of them.

### M4. Three near-identical radar charts

Three separate hand-rolled SVG radar implementations exist with the same polar-to-cartesian maths, same grid levels, and same polygon construction:

```
components/publicSpeaking/RadarChart.jsx          3,827 bytes
components/bodyLanguage/BodyLanguageRadarChart.jsx 4,173 bytes
components/progress/GrowthRadarChart.jsx           4,485 bytes
```

The code itself is good — this is the right way to draw a radar chart without a dependency. It just needs to exist once, with props for size, axis count, and series.

### M5. Two divergent AddGoalModal components

`components/ui/AddGoalModal.jsx` (used by `DailyGoals.jsx:15`) and `components/profile/AddGoalModal.jsx` (used by `Profile.jsx:34`) are different implementations of the same dialog. Adding a goal behaves inconsistently depending on which screen you started from.

### M6. Page components carry too much state

The largest pages hold ten or more independent `useState` calls, which is where reasoning about correctness starts to get expensive:

| File | `useState` count |
|---|---|
| `pages/PublicSpeaking.jsx` | 12 |
| `pages/EnglishCoach.jsx` | 11 |
| `pages/InterviewPrep.jsx` | 10 |
| `pages/Profile.jsx` | 10 |
| `pages/Fitness.jsx` | 9 |
| `pages/LearningHub.jsx` | 9 |

There are also zero uses of `useCallback` or `React.memo` against 9 `useMemo`. Not urgent at this scale, but `PublicSpeaking.jsx` at 882 lines with 12 state variables is past the point where it should be decomposed.

---

## Low severity

**L1 — Dead code.** `data/englishData.js` (358 lines) is never imported by anything; `englishCoachData.js` superseded it. `pages/Placeholder.jsx` (18 lines) is also unreferenced. Note that `englishData.js` is one of the files carrying the contradictory `longestStreak: 24` from H2 — deleting it removes a bug.

**L2 — 143 unused imports**, almost all lucide icons. `InterviewReportModal.jsx` alone imports eight icons it never renders. Harmless at runtime thanks to tree-shaking, but it is noise, and it is exactly what a linter would have caught.

**L3 — No version control and no tooling.** There is no `.git` directory, so none of this 34k-line codebase is under version control. There is also no ESLint, Prettier, test setup, `README`, or `.env`. And with no `.gitignore`, the 1.7MB `dist/` build output and `node_modules/` are sitting in the project root ready to be committed.

**L4 — Two small correctness details.** `dashboardData.js:4` sets `date: new Date()` at module scope, so it is evaluated once when the bundle loads and goes stale if the tab stays open overnight. And the font is pulled in via `@import` on line 1 of `global.css`, which serialises the request behind the stylesheet; a `<link rel="preconnect">` plus `<link rel="stylesheet">` in `index.html` loads Inter measurably sooner and avoids the flash of fallback text.

**L5 — `index.html` is still the Vite scaffold.** Favicon is `vite.svg`, and there is no `meta description`, no `theme-color`, and no Open Graph tags.

---

## How to make this more advanced

Ordered so that each phase makes the next one easier. The first phase is the one that changes what ELEVATE *is*.

### Phase 1 — Make it a real application (highest leverage)

Everything else is cosmetic next to this. Three moves, in order:

**Put version control in place first.** `git init`, add a `.gitignore` covering `node_modules/` and `dist/`, and commit. Do this before touching anything else — you are about to make structural changes to 34k uncommitted lines.

**Introduce one source of truth.** Create a single `UserContext` holding the values currently duplicated across data files — XP, level, streak, name, per-module scores — and derive everything else from it. Streaks and XP should be *computed* from a log of completed activities, not stored as literals. That one change makes H2, H3, and B2 structurally impossible rather than merely fixed, and it collapses the eight hardcoded `2350` sites into one.

**Persist it.** A `usePersistentState` hook wrapping `localStorage` with a schema version is perhaps thirty lines and resolves B1 outright. Version the payload from day one so you can migrate rather than discard when the shape changes. If you want multi-device later, this same context becomes the seam where a Supabase or Firebase client slots in without touching a single page component.

Once state is shared and persisted, the cross-module features the app is clearly reaching for become straightforward: a workout completion genuinely awarding XP, the Progress radar reflecting real activity, streaks that break when you miss a day, and a Dashboard that reports rather than recites.

### Phase 2 — One shared Modal primitive

Build a single `<Modal>` component handling the overlay, Escape-to-close, focus trap, focus restore on close, `role="dialog"` with `aria-modal` and `aria-labelledby`, body scroll lock, and a `max-height` with internal scroll plus a mobile breakpoint. Render it through a portal.

Then migrate all 32 modals onto it. This is mechanical work that resolves H4 completely, most of M1, and the modal half of M2 in one pass — and it deletes a great deal of duplicated overlay CSS. Given 32 near-identical call sites, this is the best return on effort in the report.

While you are in there, add an `ErrorBoundary` around the router and a second one inside `<Modal>`, so a failing dialog no longer takes down the app (M3).

### Phase 3 — Close the design system

Replace the 151 hardcoded colours with tokens, and move the per-item `color: '#3b82f6'` values out of the data files into semantic names the CSS owns — data should describe *what* a stat is, not what colour it renders. Collapse the four breakpoints to three tokens and apply them consistently. Fix the 12 missing CSS classes from H1 and delete the inline styles that were compensating for them.

Two things worth reconsidering while you are here. Your accent is `#6366f1` — the indigo/violet that ships as the default in nearly every AI-generated template, which works directly against the brief's goal of not looking generated. A more distinctive, slightly desaturated accent would do a lot of work for very little effort. And the token scale has no `--font-size-4xl` or `--space-20`, which is likely why hardcoded values crept in; extending the scale removes the temptation.

Then adopt real mobile patterns rather than a hidden sidebar: a bottom tab bar for the five primary destinations, sheet-style modals that slide up from the bottom, and tap targets at 44px minimum.

### Phase 4 — Make the intelligence real

This is what would most change how the product is perceived, and it is now unblocked because Phase 1 gave you somewhere to store results.

Start with the cheapest real signal. The Web Speech API's `SpeechRecognition` runs in-browser with no backend and would give English Coach and Public Speaking genuine transcripts, real words-per-minute, and actual filler-word counts — replacing scripted output with measured output for maybe a day of work. `MediaRecorder` plus a waveform gives real pace and volume analysis.

For body language and workout form, MediaPipe Pose or TensorFlow.js MoveNet run entirely client-side, which means the "processed locally" claim in B3 becomes true rather than false. Real posture angles and shoulder alignment from actual landmarks.

For coaching text, interview questions, and lesson generation, an LLM behind a thin serverless function is the natural fit — with the key server-side, never in the bundle.

Until each of these lands, mark the corresponding module as a preview and remove the privacy badge. Shipping honest placeholders costs you nothing; shipping a false privacy assurance costs you trust you cannot buy back.

### Phase 5 — Engineering hygiene

Add ESLint with `react-hooks` and `jsx-a11y` (which would have caught M1 and L2 automatically) and Prettier. Add Vitest with React Testing Library and start with the XP and streak calculations from Phase 1, since those are pure functions and the most costly things to get wrong. Introduce route-level `React.lazy` so the Dashboard stops paying for all eleven pages. Consider TypeScript, or at minimum JSDoc on the data shapes — with 133 score fields flowing through untyped objects, a rename is currently a manual audit.

---

## Suggested order of work

| # | Task | Resolves | Effort |
|---|---|---|---|
| 1 | `git init` + `.gitignore` | L3 | Minutes |
| 2 | Delete `englishData.js`, `Placeholder.jsx` | L1, part of H2 | Minutes |
| 3 | Fix 12 missing CSS classes | H1 | ~1 hour |
| 4 | Add ESLint + Prettier, auto-fix imports | L2 | ~1 hour |
| 5 | Shared `<Modal>` + `ErrorBoundary`, migrate 32 modals | H4, M3, part of M1/M2 | 1–2 days |
| 6 | `UserContext` + `usePersistentState` | B1, B2, H2, H3 | 2–3 days |
| 7 | Tokenise 151 colours, unify breakpoints | H5, M2 | 1–2 days |
| 8 | Buttons for 27 clickable divs, label 6 inputs | M1 | ~half a day |
| 9 | Unify radar charts and `AddGoalModal` | M4, M5 | ~half a day |
| 10 | Web Speech API in English Coach | B3 (first slice) | 1–2 days |

Items 1 through 4 are quick wins worth doing in a single sitting. Item 5 is the best effort-to-impact ratio in the list. Item 6 is the one that turns this from a high-fidelity prototype into a product.

---

## Closing note

It is worth being clear about what this report is not saying. The craft on display here is real — clean file organisation, scoped styles, a proper token file, no unnecessary dependencies, hand-written SVG charts, and 34,000 lines that compile without a single unresolved import. The 32 modals represent a serious amount of considered interaction design.

What is missing is not skill but a spine: shared state, persistence, and one reusable modal primitive. Those three things are perhaps a week of focused work, and they would convert an impressive collection of screens into an application someone could actually use every day.
