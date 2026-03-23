# Homepage Redesign — Design Spec
**Date:** 2026-03-23
**Status:** Approved by user

---

## Context

The current homepage (`src/app/page.tsx`) has a structural problem: the B2B website creation example takes too much vertical space relative to its informational value. Three separate iframes (SiteResult, Step02, Step03) each consume 500–600px of height, creating ~4 full screens of content for a single example. Additionally, the primary CTA ("Réserver un appel") is buried at section 10 of 11.

**Primary goal of the page:** get the visitor to book a call (`/calendly`).
**Target audience:** freelancers, agencies, and domain experts (coaches, lawyers, consultants) — all profiles at once, unified message.

---

## Scope

**What does NOT change (keep exactly as-is):**
- Nav
- Hero section (`<section>` with h1 "Tu as des méthodes qui marchent…")
- Problem section (short paragraph about Claude defaulting to generic output)
- ChatDemo component and its surrounding `<div id="demo">`

**What changes:** everything from `<SiteResult>` onwards (currently line 80 in `page.tsx`).

---

## New Page Structure

Everything below replaces the content from `<SiteResult>` to the end of `<main>` (keeping Footer).

### Section 1 — Pipeline condensé
**Replaces:** SiteResult, Step02, Step03 (3 separate iframes)
**Goal:** show the 3-step pipeline compactly, without iframes

**Layout — "Featured result + 2 small steps" (chosen by user):**

```
┌─────────────────────────────────────────────────────┐
│ De zéro à un site en 3 étapes.                      │
│ Tu décris ton expertise, Claude encode…              │
│                                                      │
│ ┌──────────────────────┐  ┌───────────────────┐     │
│ │ 03 ✓ résultat final  │  │ 01 ✓              │     │
│ │ Identité visuelle    │  │ Structure & copy  │     │
│ │                      │  │ [screenshot small]│     │
│ │ [screenshot large]   │  ├───────────────────┤     │
│ │                      │  │ 02 ✓              │     │
│ │                      │  │ Copy humanisé     │     │
│ │                      │  │ [screenshot small]│     │
│ └──────────────────────┘  └───────────────────┘     │
└─────────────────────────────────────────────────────┘
```

**Content details:**
- Section intro: `font-serif`, titre "De zéro à un site en 3 étapes.", sous-titre 1 ligne
- Step 03 (left, large): label `03` + badge `✓ résultat final`, titre "Identité visuelle complète", 1 ligne de description, screenshot statique h=200px (src: `/b2b`, captured as `<img>` via `next/image` or `<img>` tag)
- Step 01 (right top, small): label `01` + badge `✓`, titre "Structure & copy", 1 ligne, screenshot h=90px (src: `/b2b-step1` snapshot)
- Step 02 (right bottom, small): label `02` + badge `✓`, titre "Copy humanisé", 1 ligne, screenshot h=90px (src: `/b2b-step2` snapshot)

**Implementation notes:**
- Screenshots are **static `<img>` tags** — no iframes
- Screenshots are captured once and saved as `/public/screenshots/step-01.png`, `step-02.png`, `step-03.png`
- Grid: `grid-template-columns: 1.55fr 1fr` on desktop, stacks to single column on mobile (step-03 first, then step-01 and step-02 each full-width stacked below)
- Each screenshot is wrapped in a mock browser chrome div (3 dots + URL bar) matching the current style already used in Step02/Step03 sections

---

### Section 2 — Skills (condensed)
**Replaces:** Architecture section (7 skills, vertical list)
**Goal:** explain the stack quickly without overwhelming

**Layout:** 2×2 grid

```
┌────────────────────────────────────────┐
│ Un skill pour chaque partie du travail.│
│ Chaque skill a sa logique…             │
│                                        │
│ ┌──────────────┐  ┌──────────────┐    │
│ │ design-eye v2│  │ humanizer    │    │
│ │ Direction    │  │ Texte humain │    │
│ │ visuelle     │  │              │    │
│ └──────────────┘  └──────────────┘    │
│ ┌──────────────┐  ┌──────────────┐    │
│ │design-sign.  │  │frontend-     │    │
│ │ Identité     │  │design        │    │
│ │ visuelle     │  │ Exécution    │    │
│ └──────────────┘  └──────────────┘    │
└────────────────────────────────────────┘
```

**4 skills retained (most legible to non-technical audience):**

| Skill | Rôle | Description (1 ligne) |
|-------|------|-----------------------|
| `design-eye v2` | Direction visuelle | Références sur-mesure + 2 directions. Tu choisis, tous les skills respectent. |
| `humanizer` | Texte qui sonne humain | Repère les tournures IA. Le résultat sonne comme toi, pas comme Claude. |
| `design-signature` | Identité visuelle | Effets testés sur de vrais projets. Reconnaissable, pas générique. |
| `frontend-design` | Exécution sans défauts IA | Standards de qualité. Claude sait ce qu'il peut faire et ce qu'il ne doit pas. |

**Styling:** same card style as current Architecture items (`border border-[var(--border)] rounded-lg bg-[rgba(255,255,255,0.02)]`), skill name in `text-emerald-400 font-mono text-xs`.

**Note:** The "3 skills source credits" footer line from current Architecture section is removed. The note about `~/.claude/skills/` moves to the Lead Magnet section.

---

### Section 3 — Pour qui
**Replaces:** The 3 use-case cards currently inside "Encode ton expertise"
**Goal:** help each profile self-identify earlier in the page

**Layout:** 3-column horizontal grid (collapses to 1 col on mobile)

**Content:**

| Rôle | Expertise encodée |
|------|------------------|
| Recruteur tech | Grilles d'évaluation + process de sourcing |
| Avocat fiscaliste | Modèles de contrats + analyse de risques |
| Coach produit | Framework de diagnostic + priorisation |

**Section header:**
- `h2` (serif): "Pour qui ?"
- Sous-titre: "Peu importe ton domaine — si tu as une expertise, on peut l'encoder."

**Styling:** same card style as current use-case cards (`border border-[var(--border)] rounded-lg p-4`).

---

### Section 4 — CTA milieu
**New section** (did not exist before)
**Goal:** interrupt the scroll before the lighter sections and offer the call to action at mid-page

**Layout:** centered, full-width, slightly differentiated background

**Content:**
- Eyebrow (uppercase, muted): "Tu veux encoder ton expertise ?"
- `h2` (serif): "On fait un premier appel."
- Sous-titre: "30 minutes. Tu décris comment tu travailles. On voit ensemble ce qu'on peut encoder."
- CTA button (same white button style): "Réserver un appel →" → `https://calendly.com/a-brakha-challengerslab/echange-decouverte-challengerslab`

**Styling:** `background: rgba(255,255,255,0.015)` to differentiate slightly from surrounding sections, `border-t border-b border-[var(--border)]`.

---

### Section 5 — Lead Magnet
**Kept as-is.** No changes to content or styling.

Minor addition: move the `~/.claude/skills/` install note here from Architecture section (it already exists in the current Lead Magnet section — no change needed).

---

### Section 6 — Vision (condensed)
**Replaces:** current 3-paragraph Vision section
**Goal:** keep the manifesto energy but reduce to 1 tight paragraph

**Content:**
- Eyebrow: "À venir"
- `h2` (serif): "Les SaaS vont vivre la même transition."
- Single paragraph (condensing current 3): "Notion, Linear, Salesforce — leur valeur c'est l'intelligence métier en dessous, pas l'interface. Les agents n'ont pas besoin du Kanban. Ils veulent juste appeler ce qui gère les tâches. C'est le même travail que tu fais en encodant ton expertise. Même mécanique, moins grande échelle. Pour l'instant."
- Final note line (kept): "On travaille à rendre les skills directement appelables par les agents."

---

### Section 7 — CTA final (reinforced)
**Replaces:** the CTA block buried inside "Encode ton expertise"
**Goal:** last thing the visitor sees — clear, uncluttered, strong

**Content:**
- `h2` (serif, large): "Encode ton expertise." / `<span muted>` "Réserve un appel."
- Sous-titre: "Les sites web, c'est un exemple. Les skills encodent n'importe quelle expertise."
- CTA button (white, larger padding): "Réserver un appel →"

**Styling:** centered, generous padding, `py-28`.

---

### Footer
**Kept as-is.**

---

## Screenshot Capture

Before implementing the pipeline section, 3 screenshots need to be captured and saved.

All 3 routes exist in the project:
- `/public/screenshots/step-01.png` — capture of `/b2b-step1` route
- `/public/screenshots/step-02.png` — capture of `/b2b-step2` route
- `/public/screenshots/step-03.png` — capture of `/b2b` route (final version)

**Capture method:** manual browser screenshot at 1280px viewport width, cropped to ~900px height showing above-the-fold content, saved as PNG. Place in `/public/screenshots/`.

---

## What Disappears

- `<SiteResult>` component import and usage
- Step02 section (entire `<section>` with inline iframe to `/b2b-step2`)
- Step03 section (entire `<section>` with inline iframe to `/b2b`)
- Architecture section (7-skill vertical list)
- "Encode ton expertise" section as a standalone (its 3 cards move to "Pour qui", its CTA moves to CTA final)
- The `before/after` copy examples (Step02 humanizer examples) — removed for brevity

---

## Files Affected

| File | Change |
|------|--------|
| `src/app/page.tsx` | Replace everything from `<SiteResult>` to `</main>` (keep Footer) |
| `src/components/site-result.tsx` | No longer imported — delete the file (avoids lint warnings on unused components) |
| `public/screenshots/` | New directory, 3 PNG files to add |

---

## Success Criteria

1. No iframes on the homepage
2. "Réserver un appel" CTA appears at least twice below the fold (CTA milieu + CTA final)
3. Pipeline section height ≤ 600px on desktop (vs. current ~1800px)
4. All 4 existing "kept" sections (Nav, Hero, Problem, ChatDemo) are visually unchanged from the current version — implementer should verify no shared CSS or context providers depend on removed sections before treating them as untouched
5. Page scrolls from top to bottom without any obvious layout breaks on desktop (1280px) and mobile (375px)
