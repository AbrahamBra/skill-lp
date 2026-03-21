# design-eye Skill Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the `design-eye` skill and wire it into the existing skill chain so aesthetic decisions are always calibrated against external references and user feedback.

**Architecture:** Three deliverables — (1) new skill file `~/.claude/skills/design-eye/SKILL.md`, (2) gate added to `design-signature/SKILL.md`, (3) gate + ownership clarification added to `expertise-web/SKILL.md`. No code — this is pure skill authoring.

**Tech Stack:** Markdown skill files, no dependencies.

**Spec:** `docs/superpowers/specs/2026-03-21-design-eye-skill-design.md`

**Note:** If `~/.claude/skills` is not a git repo, skip all commit steps in this plan.

---

## Chunk 1: Create the design-eye skill

### Task 1: Create the skill file

**Files:**
- Create: `~/.claude/skills/design-eye/SKILL.md`

- [ ] **Step 1: Create the skill directory**

```bash
mkdir -p ~/.claude/skills/design-eye
```

- [ ] **Step 2: Write the SKILL.md file**

Create `~/.claude/skills/design-eye/SKILL.md` with the following content:

```markdown
---
name: design-eye
description: "Aesthetic calibration through external references and user feedback. MUST run before design-signature or expertise-web on any web project. Claude has bad taste — this skill ensures all visual decisions are validated by the user against real reference sites. Triggers on: 'website', 'landing page', 'redesign', 'improve design', 'make it look better', 'visual direction', 'design review'."
---

# Design Eye

## Overview

Claude has bad taste. This skill exists because of that fact.

Design Eye is the aesthetic calibration layer that runs BEFORE any other design skill. It produces a validated visual direction by browsing real reference sites and iterating on user feedback. It never makes autonomous aesthetic decisions. It never judges what is beautiful or ugly. It asks, it shows, it listens.

**Core principle:** Never decide. Always propose. The user is the only judge of what has soul.

## CRITICAL: This Skill Runs First

This skill MUST execute before `design-signature` and `expertise-web` touch any visual aspect of a site. The other skills provide technical baseline (typography rules, ARIA, touch targets). This skill provides aesthetic direction.

If you're about to work on a web project and `design-direction.md` does not exist in the project, run this skill first.

## CRITICAL: Skills to Invoke Alongside

- `superpowers` — always (brainstorming, plans, verification)
- `humanizer` — when writing ANY visible text

Do NOT invoke `design-signature` or `expertise-web` until this skill has produced a validated direction.

## Fundamental Rules

1. **Never say "this looks good" or "this looks bad"** — you don't know. Ask the user.
2. **Never remove an existing element without asking** — it might be the soul of the site.
3. **Never add visual effects without reference justification** — "the spec says grain" is not enough. Show a reference where grain works in this context and get user approval.
4. **Never choose for the user** — if they say "you decide", reduce to A/B binary choices until a direction emerges.
5. **Always show, never describe** — open reference sites in the browser, show screenshots, present real examples. Words are not visual direction.

## Mode Detection

When starting work on a web project, determine the mode:

- **Site exists + full redesign requested** → Mode A
- **Nothing exists yet** → Mode B
- **Site exists + specific section to improve** → Mode C

Ask the user if unclear: "Tu veux retravailler tout le site, ou juste une section specifique ?"

## Mode A: Site existant (redesign complet)

1. **Browse the existing site** — open it in the browser, scroll through every section
2. **Inventory visual elements without judging them** — list what you see: background video, color palette, typography, animations, layout patterns, social proof, CTAs, effects. Be factual: "il y a un fond video derriere le hero", "la palette est monochrome orange", "le heading utilise un degrade violet-orange". No opinions.
3. **Ask the user what matters** — "Voila ce que je vois. Qu'est-ce qui fait l'ame de ton site ? Qu'est-ce que tu veux absolument garder ?"
4. **Search for references** — go to Landing.love and/or Saaspo, filter by the client's sector. Find 3-5 sites in the same space.
5. **Show references to the user** — "Ces sites sont dans ton domaine. Lequel a quelque chose qui te parle ?"
6. **Iterate** — "Tu aimes le header de celui-ci mais le spacing de celui-la ? OK." Keep narrowing. If the user has no preference, show 2 side-by-side and ask a binary question.
7. **Produce the direction** — write `design-direction.md` with elements to keep, chosen references, visual direction, and explicit constraints.
8. **Validate** — ask: "Est-ce que cette direction est validee ? Je ne coderai rien tant que tu n'as pas confirme." Only a clear "oui"/"OK"/"go" counts. Anything ambiguous = iterate more.

## Mode B: Nouveau site (rien n'existe)

1. **Ask basics** — "Quel est ton secteur ? Ta cible ? Quel genre d'ambiance tu veux ?" (in simple words, no design jargon)
2. **Search for references** — browse Landing.love, Saaspo, and 21st.dev. Find 5-8 sites in the same sector.
3. **Show references** — "Parmi ceux-la, lesquels te parlent ?"
4. **Narrow down** — "Tu aimes le hero de X, les couleurs de Y, le footer de Z"
5. **Assemble direction** — combine chosen elements into a coherent visual direction.
6. **Validate** — same protocol as Mode A.

## Mode C: Redesign partiel (une section)

1. **Identify the target section** with the user
2. **Inventory the target section AND the rest of the site** — the section must stay coherent with the whole
3. **Ask what's wrong** — "Qu'est-ce qui ne va pas dans cette section ? Qu'est-ce qu'on garde du reste du site ?"
4. **Search for component-level references** — 21st.dev for heroes, Saaspo for pricing, Navbar Gallery for navigation, Component Gallery for UI patterns
5. **Show and iterate** — same as other modes
6. **Produce a scoped direction** — the target section gets specific direction, everything else inherits the site's existing visual identity

## Reference Sources

| Source | When to use | How to search |
|--------|-------------|---------------|
| **Landing.love** | Full-page sector references | Filter by closest industry category |
| **Saaspo** | SaaS-specific sections | Filter by section type (hero, pricing, features) |
| **21st.dev** | Individual components | Browse by component type (not sector) |
| **Navbar Gallery** | Navigation specifically | Only when nav is the topic |
| **Component Gallery** | Generic UI patterns | Forms, cards, modals, etc. |

**Ownership:** This skill owns aesthetic/directional browsing of these sources. `expertise-web` owns technical/architectural browsing (component APIs, patterns). When browsing for visual direction, design-eye leads. When browsing for component architecture, expertise-web leads.

## When the User Has No Opinion

This WILL happen. The user says "je sais pas" or "choisis pour moi".

**Never choose.** Instead:
1. Reduce to 2 options side-by-side
2. Ask a binary question: "Entre ces deux, lequel te parle plus ?"
3. If still no preference, change the dimension: "OK, oublie le layout. Juste les couleurs: chaud ou froid ?"
4. Keep reducing until something clicks

The goal is to find the ONE thing the user does have an opinion about, and build from there.

## Output: design-direction.md

Write this file in the project root. Use this exact template:

```
# Design Direction — [nom du projet]

## Elements a garder
- [element] : [pourquoi c'est important pour l'utilisateur]

## References choisies
- [URL] : [element specifique retenu] — [ce qu'on en prend]

## Direction visuelle (validee)
- Palette : ...
- Typographie : ...
- Layout : ...
- Effets : ...
- Ambiance : ...

## Contraintes (ne pas toucher)
- [contrainte explicite]

## Validation
- Date : [date]
- Confirme par l'utilisateur : oui
```

**Downstream skills check for `## Validation` before starting.** If it's missing, they must invoke design-eye first.

### Updates and Revisions

If the user requests visual changes after validation:
1. Re-run the relevant reference + feedback steps
2. Add a `## Revision [date]` section to the file
3. Never modify the direction without going through the loop again

## Conflict Resolution

When another skill's pattern conflicts with the validated direction, **the direction wins**.

Examples:
- `design-signature` says "always serif+sans-serif" but direction says "keep the single sans-serif that defines this brand" → keep the sans-serif
- `design-signature` says "add grain texture on dark themes" but direction says "preserve the clean video background" → no grain over the video
- `expertise-web` says "add social proof above the fold" but direction says "the minimal hero with one CTA is the identity" → don't add social proof

## What This Skill Does NOT Do

- It does not write code
- It does not judge aesthetics (it facilitates the user's judgment)
- It does not choose for the user
- It does not apply to purely technical projects (APIs, CLIs, backends)
- It does not override user decisions from other skills — it provides direction that other skills respect

## Post-Direction Handoff

Once `design-direction.md` is validated, announce:
> "Direction validee. Les skills `design-signature` et `expertise-web` peuvent maintenant travailler en respectant cette direction."

Then the normal skill chain resumes: `design-signature` for visual identity (within the direction), `expertise-web` for technical patterns (without touching validated aesthetics).
```

- [ ] **Step 3: Verify the file exists and is well-formed**

```bash
head -5 ~/.claude/skills/design-eye/SKILL.md
```

Expected: the YAML frontmatter with name and description.

- [ ] **Step 4: Commit**

```bash
cd ~/.claude/skills && git add design-eye/SKILL.md && git commit -m "feat: create design-eye skill — aesthetic calibration via references + user feedback"
```

---

## Chunk 2: Add gate to design-signature

### Task 2: Add design-eye gate to design-signature

**Files:**
- Modify: `~/.claude/skills/design-signature/SKILL.md` (lines 14-34)

- [ ] **Step 1: Add design-eye to the critical skills list**

In `~/.claude/skills/design-signature/SKILL.md`, find the section starting at line 14:

```
## CRITICAL: Always Invoke These Skills Too

- `superpowers` — always (brainstorming, plans, verification)
- `humanizer` — when writing ANY visible text
- `frontend-design` — when building components
- `motion-design` — when adding animations or transitions
- `expertise-web` — sister skill, always loaded alongside
```

Replace with:

```
## CRITICAL: Always Invoke These Skills Too

- `design-eye` — FIRST, before any visual work. Produces the validated design direction.
- `superpowers` — always (brainstorming, plans, verification)
- `humanizer` — when writing ANY visible text
- `frontend-design` — when building components
- `motion-design` — when adding animations or transitions
- `expertise-web` — sister skill, always loaded alongside
```

- [ ] **Step 2: Add the gate check before New Project Discovery**

Find the section beginning with `## New Project Discovery` (line numbers may have shifted after Step 1):

```
## New Project Discovery

When starting a new website, ask these 3 questions BEFORE any design work:

1. **Sector?** (tech, deeptech, immobilier, sante, finance, industrie...)
2. **Vibe?** (luxe sombre, corporate lumineux, tech moderne, chaleureux, minimaliste)
3. **Primary color?** (or suggest based on sector + vibe)

Then generate:
- **Palette:** accent, accent-hover (-10% lightness), accent-light (+15%), background, text, muted (gray range), + semantic colors if needed
- **Typography duo:** serif for headlines + sans-serif for body (reference: Instrument Serif + IBM Plex Sans)
- **Which effects to use** (not all projects need all effects — the vibe decides)
- **Z-index system:** define all layers upfront (see Z-Index Management below)
```

Replace with:

```
## GATE: Design Direction Required

**Before ANY visual work, check if `design-direction.md` exists in the project.**

- If it exists and has a `## Validation` section → read it. All visual decisions below must respect the constraints and direction in that file. If a pattern in this skill conflicts with the validated direction, **the direction wins**.
- If it does NOT exist → invoke `design-eye` first. Do NOT proceed with New Project Discovery until a validated direction exists.

This gate exists because this skill applied mechanically destroys the soul of existing sites. The direction file ensures we know what to preserve and what to improve before applying any pattern.

## New Project Discovery

**Only run this AFTER design-eye has produced a validated `design-direction.md`. Use this section to complement the direction with technical details (palette generation, z-index system, etc.).**

When starting a new website, ask these 3 questions BEFORE any design work:

1. **Sector?** (tech, deeptech, immobilier, sante, finance, industrie...)
2. **Vibe?** (luxe sombre, corporate lumineux, tech moderne, chaleureux, minimaliste)
3. **Primary color?** (or suggest based on sector + vibe)

Then generate:
- **Palette:** accent, accent-hover (-10% lightness), accent-light (+15%), background, text, muted (gray range), + semantic colors if needed
- **Typography duo:** serif for headlines + sans-serif for body (reference: Instrument Serif + IBM Plex Sans) — UNLESS the design direction specifies otherwise
- **Which effects to use** (not all projects need all effects — the vibe AND the design direction decide)
- **Z-index system:** define all layers upfront (see Z-Index Management below)
```

- [ ] **Step 3: Verify the edit**

```bash
head -45 ~/.claude/skills/design-signature/SKILL.md
```

Expected: the new gate section appears before New Project Discovery.

- [ ] **Step 4: Commit**

```bash
cd ~/.claude/skills && git add design-signature/SKILL.md && git commit -m "feat: add design-eye gate to design-signature — direction required before visual work"
```

---

## Chunk 3: Add gate to expertise-web

### Task 3: Add design-eye gate and clarify reference ownership in expertise-web

**Files:**
- Modify: `~/.claude/skills/expertise-web/SKILL.md` (lines 14-21, and the Component Discovery section)

- [ ] **Step 1: Add design-eye to the critical skills list**

In `~/.claude/skills/expertise-web/SKILL.md`, find lines 14-21:

```
## CRITICAL: Always Invoke These Skills Too

- `superpowers` — always (brainstorming, plans, verification, debug)
- `design-signature` — sister skill, always loaded alongside for visual decisions
- `humanizer` — when writing ANY visible text content
- `geo` — when doing ANY SEO, structured data, AI visibility, or search optimization work (replaces seo-audit + ai-seo + schema-markup — `geo` covers all three)
- `copywriting` — when writing marketing copy
- `content-strategy` — when planning content architecture
```

Replace with:

```
## CRITICAL: Always Invoke These Skills Too

- `design-eye` — FIRST, before any visual work on web projects. Check if `design-direction.md` exists; if not, invoke design-eye before proceeding with any visual decisions.
- `superpowers` — always (brainstorming, plans, verification, debug)
- `design-signature` — sister skill, always loaded alongside for visual decisions
- `humanizer` — when writing ANY visible text content
- `geo` — when doing ANY SEO, structured data, AI visibility, or search optimization work (replaces seo-audit + ai-seo + schema-markup — `geo` covers all three)
- `copywriting` — when writing marketing copy
- `content-strategy` — when planning content architecture
```

- [ ] **Step 2: Add gate block after the critical skills list**

In `~/.claude/skills/expertise-web/SKILL.md`, find the section `## NON-NEGOTIABLE Standards` (should be around line 23-25 after Step 1's edit). Insert the following gate block BEFORE that section:

```
## GATE: Design Direction Required

**Before ANY visual work on a web project, check if `design-direction.md` exists in the project.**

- If it exists and has a `## Validation` section → read it. All visual decisions must respect the direction. If a pattern in this skill conflicts with the validated direction, **the direction wins**.
- If it does NOT exist → invoke `design-eye` first. Do NOT proceed with visual work until a validated direction exists.

This gate does not apply to purely technical work (accessibility fixes, performance optimizations, SEO) that does not affect validated aesthetics.
```

- [ ] **Step 3: Find the `## Component Discovery & Reference Sources` section and add ownership note**

Search for the heading `## Component Discovery & Reference Sources` in expertise-web/SKILL.md. Insert this note immediately after the heading line:

```
> **Reference Source Ownership:** When browsing these sources for **visual direction** (palette, layout, vibe, aesthetic choices), `design-eye` leads — defer to it. This skill owns the **technical/architectural** use of these sources: component APIs, interaction patterns, accessibility patterns, performance patterns.
```

- [ ] **Step 4: Verify the edit**

```bash
head -25 ~/.claude/skills/expertise-web/SKILL.md
```

Expected: design-eye appears first in the critical skills list, and the GATE section appears before NON-NEGOTIABLE Standards.

- [ ] **Step 5: Commit**

```bash
cd ~/.claude/skills && git add expertise-web/SKILL.md && git commit -m "feat: add design-eye gate to expertise-web — direction required before visual work"
```

---

## Chunk 4: Verify the full chain

### Task 4: End-to-end verification

- [ ] **Step 1: Verify all three skill files exist and have correct gates**

```bash
echo "=== design-eye ===" && head -10 ~/.claude/skills/design-eye/SKILL.md && echo "" && echo "=== design-signature gate ===" && grep -A 5 "GATE: Design Direction" ~/.claude/skills/design-signature/SKILL.md && echo "" && echo "=== expertise-web gate ===" && grep -A 5 "GATE: Design Direction" ~/.claude/skills/expertise-web/SKILL.md
```

Expected:
- design-eye SKILL.md exists with frontmatter
- design-signature has the "GATE: Design Direction Required" section
- expertise-web has the "GATE: Design Direction Required" section

- [ ] **Step 2: Verify the skill triggers correctly**

The skill description should trigger on: website, landing page, redesign, improve design, make it look better, visual direction, design review. Verify this is in the frontmatter:

```bash
grep "description" ~/.claude/skills/design-eye/SKILL.md
```

- [ ] **Step 3: Commit the plan file**

```bash
cd "C:/Users/abrah/skill landing page" && git add docs/superpowers/plans/2026-03-21-design-eye-skill.md && git commit -m "docs: implementation plan for design-eye skill"
```
