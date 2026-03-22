# Design Spec — design-eye v2 (modular architecture)

**Date:** 2026-03-22
**Status:** Pending user approval

---

## Context

design-eye v1 is a monolithic 311-line SKILL.md. It works but has three problems:
1. Entire file loads into context even when only a fraction is needed
2. Parallelization is mentioned in principle (line 88) but has no concrete mechanics
3. No creative brief mode, no taste memory, no structured output

This spec defines v2: same core logic, modular architecture, 4 new modules.

---

## Architecture

```
~/.claude/skills/design-eye/
  SKILL.md              ← core (~200 lines): gates, modes, orchestration
  parallel-search.md    ← multi-source research mechanics
  brief-mode.md         ← Mode D: creative brief from keywords
  taste-memory.md       ← persistent visual preference profile
  output-formats.md     ← structured comparison templates
```

### Module loading rules (in SKILL.md)

```
## Module Loading
- Launching multi-source research (2+ sources) → read parallel-search.md first
- User gives keywords only / no existing site / "propose something" → Mode D → read brief-mode.md
- Returning user (project has prior sessions) → read taste-memory.md before brain dump
- Showing options to user → read output-formats.md
```

---

## Module 1 — `parallel-search.md`

**Purpose:** Replace sequential site browsing with parallel background agents.

**Trigger:** Any research involving 2+ independent sources.

**Mechanics:**

```
Evaluate source count before launching:
  - 1 source → direct fetch, no agents
  - 2+ sources → background agents, one per source

Agent brief format (mandatory fields):
  - Source URL + entry point
  - Filter/category to use
  - What to find (ambiance, specific component, colors)
  - What to ignore (reduce noise)
  - Return format: max 300 words + 3-5 specific URLs

Compilation: wait for all agents → synthesize into comparison table
→ load output-formats.md for presentation
```

**Default source distribution for full research:**

| Agent | Source | Mandate |
|-------|--------|---------|
| 1 | Landing.love | Style category matching brief |
| 2 | Land-book | Same visual filter |
| 3 | Saaspo | If SaaS or digital product |
| 4 | 21st.dev | Specific components mentioned |
| 5 | Direct web | Client's sector sites |
| 6–10 | Identified competitors | Comparative analysis |

**Critical rule:** Each agent returns a synthesis, never raw content. Main context only sees compiled results.

---

## Module 2 — `brief-mode.md` (Mode D)

**Purpose:** Generate an original visual direction from inspiration keywords, without browsing references.

**Trigger:**
- User has no existing site AND provides only a few words
- "j'ai juste : minimal, sombre, puissant"
- "propose quelque chose"
- No clear visual reference to work from

**Flow:**

```
1. Extract visual DNA from each word
   For each inspiration word → derive:
   - Spatial ratio (whitespace, density)
   - Palette (hue, saturation, contrast)
   - Typography (family, weight, relative size)
   - Motion (speed, amplitude, style)
   - Texture (grain, flat, material)

2. Detect creative tensions
   "minimal" + "powerful" = tension → resolve:
   minimalism of means, maximalism of impact
   → few elements, each element very strong

3. Propose 2 original directions (not copied references)
   Format: name + principle + 3 concrete decisions

   Direction A — "[evocative name]"
   Principle: [1 sentence]
   - Background: [oklch value]
   - Typography: [decision]
   - Motion: [decision]

   Direction B — "[evocative name]"
   ...

4. User chooses → validate as other modes
   → write design-direction.md
```

**What this mode does NOT do:** Browse references. Pure reasoning from principles. References can be added afterward if the user wants to validate against real examples.

---

## Module 3 — `taste-memory.md`

**Purpose:** Eliminate repeat questions. Never ask what the user has already answered on a prior project.

**Profile structure** (saved to `~/.claude/projects/.../memory/taste-profile.md`):

```markdown
## Taste Profile — [user name]

### Confirmed (validated on 2+ projects)
- Background: dark by default
- Typography: sans-serif, bold headings
- Effects: grain texture yes, glassmorphism no
- Motion: subtle, never decorative
- Density: airy, generous whitespace

### Tendencies (observed once)
- Accent color: warm oklch (amber, copper)
- Layout: asymmetric preferred over symmetric grid

### Explicit rejections (never propose)
- Rainbow gradients
- Carousels
- Stock photos
```

**Usage in flow:**

```
On skill launch → read taste-memory.md
→ pre-fill brain dump hypotheses
→ skip questions already answered

Brain dump received → cross-reference with taste profile:
  - Contradiction with profile? → flag, ask
  - Confirmation? → reinforce, no need to re-validate
  - New territory? → treat as first time

After design-direction.md validation → update profile:
  - Confirmed choices → move to "Confirmed"
  - Rejected elements → add to "Explicit rejections"
```

**Critical rule:** The profile never decides. It filters suggestions, not decisions. If a project brief contradicts the profile → follow the brief, note the exception.

---

## Module 4 — `output-formats.md`

**Purpose:** Replace prose descriptions with structured formats that accelerate user decisions.

**Format 1 — Reference comparison** (after parallel research)

```
| # | Site | Ambiance | Typography | Colors | What we take |
|---|------|----------|-----------|--------|-------------|
| A | url  | Minimal dark | Serif bold | Mono black | Hero spacing |
| B | url  | Editorial | Sans mono | Cream/black | Content grid |
| C | url  | Bold agency | Display | Saturated | Title motion |

→ "Which ones speak to you? You can pick several."
```

**Format 2 — Element-level selection** (when user mixes references)

```
H1 heading  → like A (display, very large)
Background  → like B (cream, not black)
CTA button  → like C (saturated color)
Spacing     → like A (very airy)
```

**Format 3 — Synthesized direction** (before validation)

```
## Proposed Direction — [project name]

Ambiance    : [1 sentence]
Palette     : [3 oklch values]
Typography  : [family + usage]
Effects     : [short list]
Motion      : [principle]

Inspired by : A for X, B for Y
NOT retained: C (too busy vs brief)

→ "Validated?"
```

**Format 4 — Mode D only** (original directions)

```
Direction A — "[evocative name]"
Principle: [1 sentence]
├── Background: [oklch value]
├── Typography: [decision]
└── Motion: [decision]

Direction B — "[evocative name]"
...
```

**Rule:** Always end with a closed question. Never leave the user facing a block of text without a clear action.

---

## Changes to SKILL.md core

1. Remove inline parallelization section (lines 88–99) → replaced by module reference
2. Add Mode D to mode detection
3. Add module loading rules section
4. Reduce reference sources table to pointer → `parallel-search.md`
5. Target: ~200 lines (down from 311)

---

## What does NOT change

- Brain dump (Step 0) — unchanged
- Modes A, B, C — logic unchanged, only output format updated
- design-direction.md template — unchanged
- Validation gate — unchanged
- Conflict resolution rules — unchanged
- Post-direction handoff — unchanged

---

## Success criteria

- design-eye loads ~40% fewer tokens by default (core only)
- Parallel research completes in 1/3 the time (N agents vs sequential)
- Mode D produces a validated direction without any web browsing
- Taste profile eliminates repeated questions across projects
- User decision time reduced by structured comparison tables
