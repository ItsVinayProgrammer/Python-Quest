# PYTHONQUEST: THE 30-DAY CODE ASCENSION ENGINE

> Build skill. Farm XP. Beat challenges. Outsmart yourself daily.

PythonQuest is not a tutorial app. It is a momentum machine disguised as a futuristic learning platform. You log in, pick a day, ship code, crush tests, unlock progress, and keep climbing until your Python instincts become automatic. The AI helper guides without hand-holding, the challenge engine rewards precision, and the whole system is tuned for one outcome: relentless growth.

---

## WHY THIS CHANGES EVERYTHING

Most learning apps leak motivation.
This one weaponizes it.

| Signal | Old-School Learning | PythonQuest |
|---|---|---|
| Engagement | Passive scrolling | Active challenge loop + XP dopamine |
| Guidance | Generic docs | Context-aware AI hints and explanation |
| Structure | Random topic hopping | Day-based mastery ladder |
| Feedback | Delayed and vague | Instant test-result terminal |
| Retention | Fragile | Streaks, badges, unlock progression |

> Deep Thought: Consistency beats intensity. This architecture makes consistency inevitable.

---

## THE FLEX LIST (SUPERPOWERS)

- **Challenge Reactor**: Run Python challenge attempts with instant pass/fail feedback and detailed output diffing.
- **AI Mentor Mode**: Get hints, code explanations, and concept clarification without getting the final answer spoon-fed.
- **Draft Recovery Shield**: Auto-saves challenge code drafts and restores them after interruptions.
- **XP + Badge Economy**: Every solved challenge compounds into streaks, badges, and profile-level credibility.
- **Credential Hardening**: Salted password hashing with strict validation and safer auth flow handling.
- **XSS Armor**: Untrusted AI/code content is sanitized and rendered safely.
- **Learning Path Commander**: Day-by-day progression with lock/unlock logic and selective early unlock flow.
- **Fault-Tolerant UI**: Error boundary containment prevents single-screen failure from nuking the app shell.

---

## TECH ARSENAL (WEAPONS OF MASS CONSTRUCTION)

| Layer | Arsenal | Purpose |
|---|---|---|
| Interface | **React 19** + **TypeScript** | Component architecture + type-safe speed |
| Runtime | **Node.js** | Build/dev runtime pipeline |
| Build System | **Vite** | Fast HMR and production bundling |
| AI Engine | **@google/genai (Gemini)** | Hints, explanations, concept support |
| State/Storage | **React Hooks + localStorage** | Persistent user and challenge progress |
| Validation/Security | **Custom security utils** | Input validation, hashing, sanitization |
| Visual System | **Tailwind utility classes + CSS vars** | Themed futuristic UI styling |

---

## ZERO TO HERO: MISSION BRIEFING

### Objective
Deploy PythonQuest locally in under 3 minutes.

### Prerequisites
- Node.js 18+
- npm 9+

### Launch Sequence

```bash
npm install
```

Create `.env.local` in project root:

```env
VITE_GEMINI_API_KEY=your_actual_gemini_key_here
```

Ignite dev server:

```bash
npm run dev
```

Open the generated local URL (typically `http://localhost:5173`).

### Production Protocol

```bash
npm run build
npm run preview
```

### Security Checkpoint

```bash
npm audit --omit=dev
```

Expected: `0 vulnerabilities` for production deps.

---

## VISUALS AND VIBE (MAKE IT FEEL ALIVE)

Inject motion into this README with assets in `/docs/assets`.

Recommended placements:

1. **Hero Banner GIF** directly under the title.
2. **Challenge Flow GIF** under “The Flex List”.
3. **Architecture Diagram** under “Big Brain Logic”.
4. **Terminal Build Screenshot** in “Zero to Hero”.

Drop-in placeholders:

```md
![Neon Hero Banner](docs/assets/hero-glitch.gif)
![Challenge Run Demo](docs/assets/challenge-terminal.gif)
![Architecture Map](docs/assets/architecture-grid.png)
![Build Pipeline](docs/assets/build-proof.png)
```

Glitch-art style ideas:
- Neon scanlines
- Pixel-sort transition frames
- CRT-noise overlays
- Cyan/amber UI heatmap accents

---

## BIG BRAIN LOGIC (ARCHITECTURE MASTERPIECE)

PythonQuest is organized as modular systems, each with a distinct combat role.

| Sector | Core Files | Responsibility |
|---|---|---|
| App Orchestration | `App.tsx` | Global view routing and shell-level composition |
| Identity + Session | `hooks/useUser.ts`, `components/Login.tsx` | Auth lifecycle, profile progression, credential handling |
| Persistence Layer | `hooks/useLocalStorage.ts` | Durable client-side state with sync-safe behavior |
| Learning Engine | `data/lessons.ts`, `components/LessonView.tsx`, `components/Dashboard.tsx` | Curriculum graph, lesson rendering, progression logic |
| Challenge Runtime | `components/ChallengeView.tsx`, `services/pythonExecutor.ts` | Code editor, test simulation, output validation |
| AI Guidance | `services/geminiService.ts` | Hinting, explanation, concept support, grounded practice generation |
| Reliability + Security | `components/ErrorBoundary.tsx`, `utils/security.ts` | Failure containment and attack-surface reduction |

### Structural Notes

- **Data-driven curriculum**: lessons and challenges are modeled in strongly-typed structures.
- **Service isolation**: AI and execution logic stay out of visual components.
- **Progression economics**: XP and badges are updated via centralized user context mutations.
- **Recovery-first UX**: challenge drafts persist to survive tab close/reload chaos.

> Deep Thought: Good architecture feels invisible to users and inevitable to maintainers.

---

## DATA DASHBOARD SNAPSHOT

| Metric | Current Behavior |
|---|---|
| Auth Storage | Salted hash fields (`passwordHash`, `passwordSalt`) |
| Rendering Safety | No raw untrusted HTML rendering |
| Challenge Drafts | Auto-save + restore per challenge |
| Error Isolation | Boundary protects app shell |
| Build Path | Vite production bundle |
| Audit Posture | Production dependency audit ready |

---

## HALL OF FAME: CONTRIBUTE OR GET OUT

This project rewards builders.
If you see weak spots, patch them. If you see potential, amplify it.

### Contribution Protocol

1. Fork the repo.
2. Create a branch with intent (`feature/neon-leaderboard`, `fix/challenge-parser`).
3. Keep commits clean and scoped.
4. Open a PR with:
   - what changed
   - why it matters
   - proof it works (screenshots or short clips)

### High-Impact Contribution Targets

- Real Python sandbox integration (Pyodide or secure backend execution)
- Community leaderboard + peer review engine
- Lesson analytics and retention telemetry
- Offline mode and service worker support
- Accessibility enhancement pass (keyboard-first UX + ARIA coverage)

---

## STYLE GUIDE FOR FUTURE EDITS

When touching this project, keep the energy and engineering discipline:

- **Bold UX, precise logic.**
- **No fragile shortcuts.**
- **Security before convenience.**
- **Readable code over clever noise.**
- **If it can fail, instrument it.**

---

## FINAL TRANSMISSION

PythonQuest is a learning battleground for people who prefer shipping over pretending.
Fork it. Extend it. Break limits with it.

> Deep Thought: The future belongs to builders who can learn in public and iterate under pressure.
