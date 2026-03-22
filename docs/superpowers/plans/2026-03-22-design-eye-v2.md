# design-eye v2 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor design-eye from a 311-line monolithic SKILL.md into a lean core + 4 on-demand modules (parallel-search, brief-mode, taste-memory, output-formats).

**Architecture:** SKILL.md becomes the orchestrator (~200 lines) that loads modules based on context. Each module is a self-contained markdown file loaded only when its trigger condition is met. No code — these are Claude skill instruction files in markdown.

**Spec:** `docs/superpowers/specs/2026-03-22-design-eye-v2-design.md`

**Tech Stack:** Markdown skill files for Claude Code (`~/.claude/skills/design-eye/`)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `~/.claude/skills/design-eye/SKILL.md` | Core orchestration, gates, modes A/B/C/D, module loading rules |
| Create | `~/.claude/skills/design-eye/output-formats.md` | 4 canonical output formats for user-facing option presentation |
| Create | `~/.claude/skills/design-eye/parallel-search.md` | Multi-source parallel agent mechanics + fallback |
| Create | `~/.claude/skills/design-eye/brief-mode.md` | Mode D: visual DNA extraction, original direction proposal |
| Create | `~/.claude/skills/design-eye/taste-memory.md` | Persistent taste profile: detection, update, tier promotion |

**Order matters:** Create `output-formats.md` first — it is referenced by all other modules and by SKILL.md. Then modules. Refactor SKILL.md last (it references all modules).

---

## Chunk 1: output-formats.md

### Task 1: Create output-formats.md

**Files:**
- Create: `~/.claude/skills/design-eye/output-formats.md`

- [ ] **Step 1: Create the file**

```markdown
---
name: output-formats
description: "Canonical output formats for design-eye. Load when presenting any comparison table or direction proposal to the user. Defines Format 1 (reference comparison), Format 2 (element-level selection), Format 3 (synthesized direction), Format 4 (original directions — Mode D only)."
---

# Output Formats

Load this module whenever presenting options or a direction proposal to the user.
Always end every format with a closed question — never leave the user without a clear next action.

## Format 1 — Reference comparison

Use after parallel research (Modes A/B/C). Shows researched sites side by side.

```
| # | Site | Ambiance | Typography | Colors | What we take |
|---|------|----------|------------|--------|--------------|
| A | url  | Minimal dark | Serif bold | Mono black | Hero spacing |
| B | url  | Editorial    | Sans mono  | Cream/black | Content grid |
| C | url  | Bold agency  | Display    | Saturated   | Title motion |

→ "Lesquels te parlent ? Tu peux en choisir plusieurs."
```

**"What we take" column rules:** 1–3 words naming a specific design element (e.g., "Hero spacing", "Card style", "Title motion"). Never a full sentence. Never vague ("nice layout").

## Format 2 — Element-level selection

Use when the user wants to mix elements from different references.

```
Titre H1    → comme A (display, très grand)
Fond        → comme B (crème, pas noir)
Bouton CTA  → comme C (couleur saturée)
Spacing     → comme A (très aéré)

→ "C'est ça le mix ?"
```

## Format 3 — Synthesized direction

Use before final validation in all modes. Single direction summary after user has made choices.

```
## Direction proposée — [nom du projet]

Ambiance    : [1 phrase]
Palette     : [3 valeurs oklch]
Typographie : [famille + usage]
Effets      : [liste courte]
Motion      : [principe]

Inspiré de  : A pour X, B pour Y        ← Modes A/B/C : références lettres du Format 1
              dérivé de : [mots-clés]   ← Mode D uniquement (même champ, sous-ligne)
Non retenu  : C (trop chargé vs brief)  ← omettre en Mode D

→ "C'est validé ?"
```

**Validation gate:** only "oui" / "OK" / "go" / "validé" counts as confirmed. Anything ambiguous → ask again: "Je confirme la direction avant de coder. C'est validé ?"

## Format 4 — Original directions (Mode D only)

Use in Mode D to present 2 original directions derived from keywords. This is the canonical source for this structure — brief-mode.md references it.

```
Direction A — "[nom évocateur]"
Principe : [1 phrase]
├── Fond : [valeur oklch]
├── Typographie : [décision]
└── Motion : [décision]

Direction B — "[nom évocateur]"
Principe : [1 phrase]
├── Fond : [valeur oklch]
├── Typographie : [décision]
└── Motion : [décision]

→ "Laquelle te parle ?"
```

After the user picks one direction: synthesize into Format 3, then validate.
Sequence: Format 4 (2 options) → user picks → Format 3 (synthesis) → user validates → design-direction.md
```

- [ ] **Step 2: Verify line count ≤ 120**

```bash
wc -l ~/.claude/skills/design-eye/output-formats.md
```
Expected: ≤ 120 lines. If over, tighten prose — never cut spec-required content.

- [ ] **Step 3: Verify 4 formats present**

Check the file contains exactly: `## Format 1`, `## Format 2`, `## Format 3`, `## Format 4`.

- [ ] **Step 4: Commit**

```bash
cd ~/.claude/skills/design-eye
git add output-formats.md
git commit -m "feat: design-eye output-formats module — 4 canonical formats"
```

---

## Chunk 2: parallel-search.md

### Task 2: Create parallel-search.md

**Files:**
- Create: `~/.claude/skills/design-eye/parallel-search.md`

- [ ] **Step 1: Create the file**

```markdown
---
name: parallel-search
description: "Multi-source parallel research mechanics for design-eye. Load when launching research on 2+ independent sources. Defines agent brief format, source distribution, compilation, and failure fallback."
---

# Parallel Search

Load this module before launching any research involving 2+ independent sources.

## Decision rule

- 1 source → direct WebFetch, no agents
- 2+ sources → background agents, one per source (use Agent tool with `run_in_background: true`)

## Agent brief format (all fields mandatory)

Each agent receives a brief containing:
1. **Source URL + entry point** — exact URL to open, which page/category/filter to start from
2. **Filter/category** — which visual style filter or section to browse
3. **What to find** — specific target: ambiance, component type, color approach, layout pattern
4. **What to ignore** — noise reduction: "ignore dark mode results", "skip illustrations", etc.
5. **Return format** — max 300 words + 3–5 specific page URLs (not gallery thumbnails)

Each agent returns a synthesis. Never raw content. The main context only sees compiled results.

## Default source distribution

| Agent | Source | Default mandate |
|-------|--------|-----------------|
| 1 | Landing.love | Visual style category matching the brief |
| 2 | Land-book | Same visual filter, different curation |
| 3 | Saaspo | SaaS or digital product references (skip if non-digital) |
| 4 | 21st.dev | Specific UI components mentioned in brain dump |
| 5 | Direct web search | Sites from the client's exact sector |
| 6–10 | Named competitors | Comparative analysis of identified competitors |

Agents 6–10 are optional. Only launch them if competitors or specific sites were named in the brain dump.

## Compilation

After all agents complete:
1. Merge all results into a single list, deduplicated
2. Assign a letter (A, B, C...) to each distinct site
3. Load output-formats.md and present using Format 1

## Failure fallback

If an agent returns an error or empty results after 2 attempts:
- Mark that source as "unavailable — [source name]" in the synthesis
- Proceed with results from remaining agents
- If fewer than 2 agents succeed → fall back to sequential WebFetch for the missing sources
- Never block the flow or wait indefinitely for a failed agent
```

- [ ] **Step 2: Verify line count ≤ 120**

```bash
wc -l ~/.claude/skills/design-eye/parallel-search.md
```
Expected: ≤ 120 lines.

- [ ] **Step 3: Verify mandatory sections present**

Check file contains: `## Decision rule`, `## Agent brief format`, `## Default source distribution`, `## Compilation`, `## Failure fallback`.

- [ ] **Step 4: Commit**

```bash
git add parallel-search.md
git commit -m "feat: design-eye parallel-search module — background agents + fallback"
```

---

## Chunk 3: brief-mode.md

### Task 3: Create brief-mode.md

**Files:**
- Create: `~/.claude/skills/design-eye/brief-mode.md`

- [ ] **Step 1: Create the file**

```markdown
---
name: brief-mode
description: "Mode D for design-eye. Load when user has no existing site AND provides only keywords/adjectives with no named reference. Generates original visual directions from inspiration words using pure reasoning — no web browsing."
---

# Brief Mode (Mode D)

Load this module when BOTH conditions are met:
- a) No existing site in the brain dump (no URL, no current visual elements, no "mon site actuel")
- b) Keywords-only brief: adjectives, moods, words — no named site, brand, or competitor

If ANY named reference appears → Mode B, not Mode D.

## This mode does NOT browse references

Mode D is pure reasoning from design principles. No WebFetch. No Agent calls.
References can be added afterward if the user wants to validate against real examples.

## Step 1: Extract visual DNA

For each inspiration word, derive across 5 dimensions:

| Dimension | What to derive |
|-----------|---------------|
| Spatial ratio | Whitespace density (sparse / balanced / dense) |
| Palette | Hue family, saturation level, contrast ratio |
| Typography | Family class (serif / sans / mono / display), weight, relative size |
| Motion | Speed (slow / medium / fast), amplitude (subtle / expressive), style (ease / spring / linear) |
| Texture | Surface feel (grain / flat / glass / matte) |

## Step 2: Detect creative tensions

When input words pull in opposite directions (e.g., "minimal" + "puissant"), resolve the tension into a coherent principle instead of averaging:

- "minimal" + "powerful" → minimalism of means, maximalism of impact: few elements, each one very strong
- "warm" + "technical" → precision in a warm material: tight grid, organic color
- "simple" + "expensive" → restraint as luxury: nothing unnecessary, everything intentional

## Step 3: Propose 2 original directions

Use output-formats.md Format 4 (canonical structure for original directions).
The two directions should represent genuinely different resolutions of the brief — not variations of the same answer.
Name each direction with an evocative title that captures its principle.

## Step 4: User picks one direction

Ask: "Laquelle te parle ?" — wait for response before proceeding.
If the user wants to blend elements: extract what they want from each and synthesize.

## Step 5: Validate

Synthesize the chosen direction into output-formats.md Format 3.
In the "Dérivé de" field: list the original input keywords.
Omit "Non retenu" field (there are no rejected references in Mode D).

Wait for explicit confirmation ("oui" / "OK" / "go" / "validé") before writing design-direction.md.
Ambiguous response → "Je confirme la direction avant de coder. C'est validé ?"
```

- [ ] **Step 2: Verify line count ≤ 120**

```bash
wc -l ~/.claude/skills/design-eye/brief-mode.md
```
Expected: ≤ 120 lines.

- [ ] **Step 3: Verify sequence documented**

Check file contains the Format 4 → Format 3 → design-direction.md sequence and the fallback for blending.

- [ ] **Step 4: Commit**

```bash
git add brief-mode.md
git commit -m "feat: design-eye brief-mode module — Mode D creative brief from keywords"
```

---

## Chunk 4: taste-memory.md

### Task 4: Create taste-memory.md

**Files:**
- Create: `~/.claude/skills/design-eye/taste-memory.md`

- [ ] **Step 1: Create the file**

```markdown
---
name: taste-memory
description: "Persistent visual preference profile for design-eye. Load at skill launch when taste-profile.md exists in project memory. Eliminates repeat questions by pre-filling known preferences. Updates profile after each validated design-direction.md."
---

# Taste Memory

## Detection

At skill launch, before the brain dump, check:
`~/.claude/projects/<active-project-path>/memory/taste-profile.md`

- File exists, non-empty, and parseable (contains at least one recognized section header) → load and apply
- File absent, empty, or unparseable → skip entirely, treat as new user
- Corrupt or malformed → treat as absent, do not attempt partial read

Load is unconditional when the file is valid — mode detection happens after the brain dump, not here.

## Profile structure

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
- Layout: asymmetric preferred [validated_count: 1]

### Explicit rejections (never propose)
- Rainbow gradients
- Carousels
- Stock photos
```

**Recognized section headers (for parseability check):** `### Confirmed`, `### Tendencies`, `### Explicit rejections`

## Usage during the session

After loading the profile:
1. Pre-fill brain dump hypotheses from Confirmed entries — present them as assumptions, not questions
2. Skip questions already answered in the profile
3. After the brain dump, cross-reference:
   - Contradiction with profile → flag: "Tu m'as dit que tu aimais X, mais là le brief dit Y — c'est volontaire ?"
   - Confirmation → reinforce, no need to re-validate
   - New territory → treat as first time

**Critical rule:** The profile filters suggestions. It never decides. If a project brief contradicts the profile → follow the brief, note the exception.

## Profile update rules

Trigger: Claude writes design-direction.md (direction validated).

1. For each choice in the validated direction:
   - If entry exists in Tendencies → increment validated_count
   - If validated_count reaches 2 → move to Confirmed
   - If entry is new → add to Tendencies with validated_count: 1

2. For explicit rejections stated by the user during the session ("pas ça", "je veux pas X"):
   - Add to Explicit rejections immediately (no full validation required)

3. Session ends without reaching design-direction.md validation:
   - Discard all inferred preferences
   - Keep any explicit rejections stated during the session

## Tier promotion rule

No cross-project file scanning. The `validated_count` field accumulates across sessions within this single file. Promotion is purely counter-based: when validated_count reaches 2, move the entry from Tendencies to Confirmed at next update.
```

- [ ] **Step 2: Verify line count ≤ 120**

```bash
wc -l ~/.claude/skills/design-eye/taste-memory.md
```
Expected: ≤ 120 lines.

- [ ] **Step 3: Verify key rules present**

Check file contains: detection logic, profile structure with `validated_count`, update rules, tier promotion rule, and the "profile filters, never decides" critical rule.

- [ ] **Step 4: Commit**

```bash
git add taste-memory.md
git commit -m "feat: design-eye taste-memory module — persistent taste profile with counter-based promotion"
```

---

## Chunk 5: Refactor SKILL.md core

### Task 5: Refactor SKILL.md

**Files:**
- Modify: `~/.claude/skills/design-eye/SKILL.md`

This is the most sensitive task. The goal is to reduce from 311 lines to ≤200 lines by removing sections now handled by modules and adding the Module Loading section + Mode D.

**Sections to REMOVE from v1:**
- Lines 69–99: Reference Search Strategy (inline text + parallelization principle) → replaced by pointer to parallel-search.md
- Lines 198–210: Reference Sources table → replaced by pointer to parallel-search.md

**Sections to ADD:**
- Module Loading rules (after Step 0: Brain Dump, before Mode Detection)
- Mode D entry in the Mode Detection block

**Everything else: unchanged.**

- [ ] **Step 1: Remove Reference Search Strategy section (lines 69–99)**

Delete the entire `## Reference Search Strategy` section. Replace with:

```markdown
## Reference Search Strategy

See `parallel-search.md` for full mechanics. Load it before launching any search on 2+ sources.

Quick rule: 1 source → direct WebFetch. 2+ sources → read parallel-search.md first.
```

- [ ] **Step 2: Remove Reference Sources table (lines 198–210)**

Delete the `## Reference Sources` section. Replace with:

```markdown
## Reference Sources

Full catalog and search strategies: see `parallel-search.md` (source distribution table).

Quick reference: Landing.love (full-page), Saaspo (SaaS), 21st.dev (components), Land-book (curation).
```

- [ ] **Step 3: Add Module Loading section**

Insert after `## Step 0: Brain Dump` (after the brain dump section ends), before `## Mode Detection`:

```markdown
## Module Loading

1. **On skill launch:**
   Check `~/.claude/projects/<active-project-path>/memory/taste-profile.md`
   - Exists, non-empty, parseable → read `taste-memory.md` (unconditional — mode unknown yet)
   - Absent / empty / unparseable / malformed → treat as absent, skip, treat as new user

2. **Mode detection (after brain dump):**
   - Mode D trigger requires BOTH:
     a) No existing site (no URL, no current visual elements in brain dump)
        → if ambiguous: "Tu as un site existant ou on part de zéro ?"
     b) Keywords-only brief: no named site, brand, or competitor
        → mixed case: ANY named reference → Mode B regardless of additional keywords
        → keywords alone without any named reference = Mode D
   - Mode D → read `brief-mode.md`
   - Modes A / B / C → normal flow

3. **Research phase:**
   - 1 source → direct WebFetch
   - 2+ sources → read `parallel-search.md` first

4. **Presenting options:**
   - Read `output-formats.md` for any comparison table or direction proposal
   - Format 1: reference comparisons | Format 2: element mixing
   - Format 3: synthesized direction (all modes) | Format 4: original directions (Mode D only)
```

- [ ] **Step 4: Add Mode D to Mode Detection block**

In the `## Mode Detection` section, add Mode D:

```markdown
- **Site exists + full redesign requested** → Mode A
- **Nothing exists yet + has references/competitors** → Mode B
- **Site exists + specific section to improve** → Mode C
- **Nothing exists yet + keywords only (no named reference)** → Mode D → read brief-mode.md
```

- [ ] **Step 5: Verify line count ≤ 200**

```bash
wc -l ~/.claude/skills/design-eye/SKILL.md
```
Expected: ≤ 200 lines. If over, tighten replaced sections further — they should be 2–3 lines each as pointers to modules.

- [ ] **Step 6: Verify all 4 module references present in SKILL.md**

Check SKILL.md references: `parallel-search.md`, `brief-mode.md`, `taste-memory.md`, `output-formats.md`.

- [ ] **Step 7: Verify modes A/B/C content unchanged**

```bash
git diff HEAD~1 -- ~/.claude/skills/design-eye/SKILL.md | grep "^[-+]" | grep -v "^---\|^+++"
```

Expected: only Reference Search Strategy, Reference Sources, Module Loading, and Mode Detection sections appear in the diff. Mode A, Mode B, Mode C section bodies should show no `+`/`-` lines.

- [ ] **Step 8: Commit**

```bash
git add SKILL.md
git commit -m "feat: design-eye v2 — refactor SKILL.md to lean core, add module loading + Mode D"
```

---

## Final verification

- [ ] List all files in `~/.claude/skills/design-eye/`:
  Should contain: `SKILL.md`, `parallel-search.md`, `brief-mode.md`, `taste-memory.md`, `output-formats.md`

- [ ] Verify line counts:
  ```bash
  wc -l ~/.claude/skills/design-eye/*.md
  ```
  Expected: SKILL.md ≤ 200, each module ≤ 120

- [ ] Verify output-formats.md has exactly 4 `## Format` headings

- [ ] Final commit tag:
  ```bash
  git tag design-eye-v2
  ```
