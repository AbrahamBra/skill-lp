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

1. On skill launch:
   - Check if ~/.claude/projects/<active-project-path>/memory/taste-profile.md exists
   - If file exists and is non-empty and parseable → read taste-memory.md
     (loads unconditionally regardless of which mode will be used — mode is unknown at this point)
   - If file absent, empty, or unparseable → skip, treat as new user
     (corrupt/malformed profile → treat as absent, do not attempt partial read)

2. Mode detection (after brain dump):
   - Mode D trigger requires BOTH conditions:
     a) No existing site: brain dump contains no URL, no description of current visual elements,
        no mention of "mon site actuel". If ambiguous → ask: "Tu as un site existant ou on part de zéro ?"
     b) Brief is keywords-only: user provides adjectives/moods/words rather than references,
        competitors, or structured requirements. "minimal, sombre, puissant" = Mode D.
        "je veux quelque chose dans le style de Stripe" = Mode B (has a reference).
        Mixed case: if ANY named site, brand, or competitor appears in the brief → Mode B,
        regardless of additional keywords. Keywords alone without any named reference = Mode D.
   - Modes A / B / C → normal flow if either condition is absent
   - Mode D → read brief-mode.md (taste-memory.md already loaded in step 1 if applicable)

3. Research phase (any mode):
   - 1 source → direct fetch, no agents
   - 2+ sources → read parallel-search.md before launching any search

4. Presenting options to user:
   - read output-formats.md when showing any comparison or direction proposal
   - Format 1: reference comparisons (Modes A/B/C after parallel research)
   - Format 2: element-level mixing (user combines elements from multiple refs)
   - Format 3: synthesized direction before final validation (all modes)
   - Format 4: original direction proposals (Mode D only — canonical source)
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
→ load output-formats.md Format 1 for presentation

Agent failure fallback:
  - If an agent returns an error or no results after 2 attempts:
    → mark that source as "unavailable" in the synthesis
    → proceed with results from remaining agents
    → if fewer than 2 agents succeed → fall back to sequential fetch for missing sources
    → never block the flow waiting for a failed agent
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

3. Propose 2 original directions using output-formats.md Format 4
   (Format 4 is the canonical source for this structure — two parallel options)

4. User picks one direction (or asks to blend elements)

5. Validation sequence:
   - Synthesize chosen direction into output-formats.md Format 3 (single direction summary)
   - Wait for explicit confirmation: "oui" / "OK" / "go" / "validé"
   - Ambiguous response → ask again: "Je confirme la direction avant de coder. C'est validé ?"
   - On confirmation → write design-direction.md using standard template

   Sequence: Format 4 (2 options) → user picks → Format 3 (synthesis) → user validates → design-direction.md
```

**What this mode does NOT do:** Browse references. Pure reasoning from principles. References can be added afterward if the user wants to validate against real examples.

---

## Module 3 — `taste-memory.md`

**Purpose:** Eliminate repeat questions. Never ask what the user has already answered on a prior project.

**Detection:** Check for `~/.claude/projects/<active-project-path>/memory/taste-profile.md`.
- File exists, non-empty, and parseable → load profile before brain dump
- File absent, empty, or unparseable → skip, proceed as new user (corrupt = absent)

**Profile structure** (saved to `~/.claude/projects/<active-project-path>/memory/taste-profile.md`):

```markdown
## Taste Profile — [user name]

### Confirmed (validated_count >= 2)
- Background: dark by default [validated_count: 3]
- Typography: sans-serif, bold headings [validated_count: 2]
- Effects: grain texture yes, glassmorphism no [validated_count: 2]
- Motion: subtle, never decorative [validated_count: 2]
- Density: airy, generous whitespace [validated_count: 2]

### Tendencies (validated_count = 1)
- Accent color: warm oklch (amber, copper) [validated_count: 1]
- Layout: asymmetric preferred over symmetric grid [validated_count: 1]

### Explicit rejections (never propose)
- Rainbow gradients
- Carousels
- Stock photos
```

**Tier promotion rule:** Each entry carries a `validated_count` counter. Claude increments the counter for any entry that appears as a validated choice when writing `design-direction.md`. When `validated_count` reaches 2, the entry moves from Tendencies to Confirmed. No cross-project file scanning required — the counter accumulates within this single file across sessions.

**Usage in flow:**

```
On skill launch → check for taste-profile.md
→ if found: pre-fill brain dump hypotheses, skip questions already answered

Brain dump received → cross-reference with taste profile:
  - Contradiction with profile? → flag, ask ("Tu m'as dit que tu aimais X, mais là le brief dit Y — c'est volontaire ?")
  - Confirmation? → reinforce, no need to re-validate
  - New territory? → treat as first time

After design-direction.md validation → Claude automatically updates profile:
  - Choices validated → add to Tendencies with validated_count: 1, or increment if already present
  - validated_count reaches 2 → move entry from Tendencies to Confirmed
  - Elements explicitly rejected by user ("pas ça", "je veux pas X") → add to Explicit rejections
    (explicit rejections can be saved even mid-session if the user stated them clearly,
     without requiring full direction validation)
  - Session ends without reaching design-direction.md validation → discard non-explicit data
    (explicit rejections stated during the session are kept; inferred preferences are discarded)
```

**Critical rule:** The profile never decides. It filters suggestions, not decisions. If a project brief contradicts the profile → follow the brief, note the exception.

---

## Module 4 — `output-formats.md`

**Purpose:** Replace prose descriptions with structured formats that accelerate user decisions.

**Format 1 — Reference comparison** (after parallel research, canonical for Mode A/B/C)

```
| # | Site | Ambiance | Typography | Colors | What we take |
|---|------|----------|-----------|--------|-------------|
| A | url  | Minimal dark | Serif bold | Mono black | Hero spacing |
| B | url  | Editorial | Sans mono | Cream/black | Content grid |
| C | url  | Bold agency | Display | Saturated | Title motion |

→ "Which ones speak to you? You can pick several."
```

"What we take" column: 1–3 words naming a specific design element (e.g., "Hero spacing", "Card style", "Title motion"). Never a full sentence. Never vague ("nice layout").

**Format 2 — Element-level selection** (when user mixes references)

```
H1 heading  → like A (display, very large)
Background  → like B (cream, not black)
CTA button  → like C (saturated color)
Spacing     → like A (very airy)
```

**Format 3 — Synthesized direction** (before validation — all modes)

```
## Proposed Direction — [project name]

Ambiance    : [1 sentence]
Palette     : [3 oklch values]
Typography  : [family + usage]
Effects     : [short list]
Motion      : [principle]

Inspired by : A for X, B for Y        ← Modes A/B/C: lettered references from Format 1
              derived from: [keywords] ← Mode D only: list the input keywords
NOT retained: C (too busy vs brief)   ← omit in Mode D (no rejected references)

→ "Validated?"
```

**Format 4 — Original directions** (Mode D only — canonical source, also referenced from brief-mode.md)

```
Direction A — "[evocative name]"
Principle: [1 sentence]
├── Background: [oklch value]
├── Typography: [decision]
└── Motion: [decision]

Direction B — "[evocative name]"
...

→ "Which direction speaks to you?"
```

**Rule:** Always end with a closed question. Never leave the user facing a block of text without a clear action.

---

## Changes to SKILL.md core

Sections that survive from v1 (unchanged):
- Overview + core principles (lines 1–30)
- Fundamental Rules (lines 32–46)
- Step 0: Brain Dump (lines 42–65)
- Mode Detection block (updated: add Mode D)
- Mode A: Site existant (lines 111–121)
- Mode B: Nouveau site (lines 123–131)
- Mode C: Redesign partiel (lines 133–154)
- Multi-Page Projects (lines 158–172)
- Client Mode vs Solo Mode (lines 174–195)
- Output: design-direction.md template (lines 224–257)
- Mid-Build Direction Change (lines 270–278)
- Conflict Resolution (lines 280–296)
- What This Skill Does NOT Do (lines 289–295)
- Post-Direction Handoff (lines 299–310)

Sections removed from v1:
- Reference Search Strategy inline text (lines 69–99) → replaced by pointer to parallel-search.md
- Reference Sources table (lines 198–210) → replaced by pointer to parallel-search.md

Sections added:
- Module Loading rules (as specified above)
- Mode D entry in Mode Detection block

Target: ~200 lines (down from 311)

---

## What does NOT change

- Brain dump (Step 0) — unchanged
- Modes A, B, C — logic unchanged, only output format updated
- design-direction.md template — unchanged
- Validation gate — unchanged (explicit "oui"/"OK"/"go" required)
- Conflict resolution rules — unchanged
- Post-direction handoff — unchanged

---

## Success criteria

Measurable (verifiable from file content):
- SKILL.md core: ≤310 lines (note: 200-line target was unachievable given the "What does NOT change" list — Modes A/B/C + Client Mode + Multi-Page + templates account for ~200 lines alone)
- Each module file: ≤120 lines
- taste-profile.md entries each carry a validated_count field
- output-formats.md defines exactly 4 named formats

Behavioral (verifiable from skill execution):
- Mode D completes without any WebFetch or Agent tool calls
- Agent failure in parallel-search does not halt execution (partial results accepted)
- Format 4 → Format 3 → design-direction.md sequence followed in Mode D
