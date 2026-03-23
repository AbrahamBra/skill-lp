# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 3-iframe B2B demo section and overlong Architecture section with a condensed pipeline (static screenshots), a 2×2 skills grid, a "Pour qui" block, two CTA sections, and a condensed Vision — all while leaving the top of the page (Nav, Hero, Problem, ChatDemo) pixel-identical.

**Architecture:** The new `PipelineDemo` component encapsulates the 3-step layout (1 large screenshot + 2 small). All other new sections are simple enough to live inline in `page.tsx`, consistent with the project's existing pattern. No new routes needed — the three screenshot images are static files in `/public/screenshots/`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `public/screenshots/step-01.png` | Create | Static screenshot of `/b2b-step1` route |
| `public/screenshots/step-02.png` | Create | Static screenshot of `/b2b-step2` route |
| `public/screenshots/step-03.png` | Create | Static screenshot of `/b2b` route (final) |
| `src/components/pipeline-demo.tsx` | Create | 3-step pipeline layout (1 large + 2 small) with mock browser chrome |
| `src/app/page.tsx` | Modify | Replace sections from `<SiteResult>` onwards, import `PipelineDemo` |
| `src/components/site-result.tsx` | Delete | No longer used |

---

## Chunk 1: Screenshots + PipelineDemo component

### Task 1: Capture the 3 screenshots

**Files:**
- Create: `public/screenshots/step-01.png`
- Create: `public/screenshots/step-02.png`
- Create: `public/screenshots/step-03.png`

> **Note:** This is a manual step. No code to write. Do it before implementing the component so the images exist when you reference them.

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Expected: server running on `http://localhost:3000`

- [ ] **Step 2: Capture step-01**

Open `http://localhost:3000/b2b-step1` in your browser at **1280px viewport width**.
Take a full-page screenshot cropped to ~900px height (above the fold).
Save as `public/screenshots/step-01.png`.

- [ ] **Step 3: Capture step-02**

Open `http://localhost:3000/b2b-step2`, same viewport.
Save as `public/screenshots/step-02.png`.

- [ ] **Step 4: Capture step-03**

Open `http://localhost:3000/b2b`, same viewport.
Save as `public/screenshots/step-03.png`.

- [ ] **Step 5: Verify files exist**

```bash
ls public/screenshots/
```

Expected output:
```
step-01.png  step-02.png  step-03.png
```

- [ ] **Step 6: Commit**

```bash
git add public/screenshots/
git commit -m "feat: add pipeline step screenshots for homepage redesign"
```

---

### Task 2: Create the PipelineDemo component

**Files:**
- Create: `src/components/pipeline-demo.tsx`

This component renders the 3-step pipeline layout:
- Left (large): Step 03 — Identité visuelle complète
- Right top (small): Step 01 — Structure & copy
- Right bottom (small): Step 02 — Copy humanisé

Each step has a mock browser chrome (3 dots + URL bar) matching the existing style in `page.tsx`.

- [ ] **Step 1: Create the file**

```tsx
// src/components/pipeline-demo.tsx
import Image from "next/image";

type Step = {
  num: string;
  label: string;
  title: string;
  desc: string;
  src: string;
  alt: string;
  url: string;
};

const FEATURED: Step = {
  num: "03",
  label: "résultat final",
  title: "Identité visuelle complète",
  desc: "Design-signature applique ta direction. Nav sticky, hover states, focus rings. Chaque interaction calibrée.",
  src: "/screenshots/step-03.png",
  alt: "Site B2B — étape 03 — identité visuelle finale",
  url: "abrahambrakha.fr/b2b — étape 03",
};

const SIDE_STEPS: Step[] = [
  {
    num: "01",
    label: "validé",
    title: "Structure & copy",
    desc: "Claude part de ton expertise — pas de ses recettes génériques.",
    src: "/screenshots/step-01.png",
    alt: "Site B2B — étape 01 — structure et copy",
    url: "abrahambrakha.fr/b2b — étape 01",
  },
  {
    num: "02",
    label: "validé",
    title: "Copy humanisé",
    desc: "Humanizer retire les tournures IA. Le texte sonne comme toi.",
    src: "/screenshots/step-02.png",
    alt: "Site B2B — étape 02 — copy humanisé",
    url: "abrahambrakha.fr/b2b — étape 02",
  },
];

function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="border border-[var(--border)] rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[rgba(255,255,255,0.03)]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-[rgba(255,255,255,0.05)] rounded-md px-3 py-1 text-xs text-[var(--text-muted)] font-mono text-center truncate">
            {url}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

function StepHeader({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xs font-mono text-[var(--text-muted)]">{num}</span>
      <span className="text-[10px] font-mono text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded">
        ✓ {label}
      </span>
    </div>
  );
}

export function PipelineDemo() {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-[var(--border)]">
      {/* Section intro */}
      <div className="mb-10">
        <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.1] tracking-tight mb-3">
          De zéro à un site en 3 étapes.
        </h2>
        <p className="text-sm text-[var(--text-muted)] max-w-[52ch] leading-relaxed">
          Tu décris ton expertise, Claude encode. Chaque étape est validée par toi avant de passer à la suivante.
        </p>
      </div>

      {/* Grid: 1 large left + 2 small right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-10 lg:gap-6 items-start">

        {/* Featured — Step 03 */}
        <div>
          <StepHeader num={FEATURED.num} label={FEATURED.label} />
          <h3 className="font-[family-name:var(--font-serif)] text-xl tracking-tight mb-2">
            {FEATURED.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5 max-w-[48ch]">
            {FEATURED.desc}
          </p>
          <BrowserChrome url={FEATURED.url}>
            <Image
              src={FEATURED.src}
              alt={FEATURED.alt}
              width={900}
              height={500}
              className="w-full h-auto"
              priority
            />
          </BrowserChrome>
        </div>

        {/* Side steps — 01 + 02 */}
        <div className="flex flex-col gap-6">
          {SIDE_STEPS.map((step) => (
            <div key={step.num}>
              <StepHeader num={step.num} label={step.label} />
              <h3 className="font-[family-name:var(--font-serif)] text-base tracking-tight mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                {step.desc}
              </p>
              <BrowserChrome url={step.url}>
                <Image
                  src={step.src}
                  alt={step.alt}
                  width={600}
                  height={280}
                  className="w-full h-auto"
                />
              </BrowserChrome>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run build to check TypeScript**

```bash
npm run build 2>&1 | tail -20
```

Expected: no TypeScript errors (warnings about unused vars are OK if they're in other files). Fix any errors before continuing.

- [ ] **Step 3: Verify in browser**

With dev server running, temporarily add `<PipelineDemo />` anywhere in `page.tsx` to preview. Check that:
- 3 screenshots render (or show broken-image placeholder if screenshots not captured yet — that's fine)
- Mock browser chrome renders correctly
- Grid is 1 column on narrow viewport, 2 columns on wide

**Important:** remove this temporary addition from `page.tsx` before committing — Task 3 adds it in the correct position.

- [ ] **Step 4: Commit**

```bash
git add src/components/pipeline-demo.tsx
git commit -m "feat: add PipelineDemo component — 3-step static screenshot layout"
```

---

## Chunk 2: page.tsx update + cleanup

### Task 3: Replace sections from SiteResult onwards in page.tsx

**Files:**
- Modify: `src/app/page.tsx`

**What to remove** (everything from line 79 to the `{/* Footer */}` block, exclusive):
- `import { SiteResult } from "@/components/site-result"` (top of file)
- `{/* Site Result — iframe to /b2b */}` div and its content
- `{/* Step 02 — Copy & humanizer */}` section
- `{/* Step 03 — Design-signature */}` section
- `{/* Architecture */}` section
- `{/* Lead Magnet */}` section (replaced by the rewritten version in Step 7 below — content is similar but cleaned up)
- `{/* Encode ton expertise */}` section
- `{/* Vision */}` section

**What to add** (7 new sections, in order, before Footer):

- [ ] **Step 1: Update imports at top of page.tsx**

Replace:
```tsx
import { ChatDemo } from "@/components/chat-demo";
import { SiteResult } from "@/components/site-result";
import { CopyButton } from "@/components/copy-button";
```

With:
```tsx
import { ChatDemo } from "@/components/chat-demo";
import { PipelineDemo } from "@/components/pipeline-demo";
import { CopyButton } from "@/components/copy-button";
```

- [ ] **Step 2: Remove old sections**

In `page.tsx`, delete everything from `{/* Site Result — iframe to /b2b */}` through `{/* Vision */}` (inclusive). Keep the `{/* Footer */}` block and everything below it intact.

The file at this point should end with:
```tsx
      {/* Chat Demo — one scenario */}
      <div id="demo" className="border-t border-[var(--border)]">
        <ChatDemo />
      </div>

      {/* Footer */}
      <footer ...>
```

- [ ] **Step 3: Add PipelineDemo**

After the ChatDemo div, add:
```tsx
      {/* Pipeline — 3 étapes condensées */}
      <PipelineDemo />
```

- [ ] **Step 4: Add Skills 2×2 grid**

After PipelineDemo:
```tsx
      {/* Skills — grille 2×2 */}
      <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.1] tracking-tight mb-3">
            Un skill pour chaque partie du travail.
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-[52ch] leading-relaxed">
            Chaque skill a sa logique et ses garde-fous. Claude les charge dans l'ordre, chacun fait sa partie.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          {[
            {
              name: "design-eye v2",
              role: "Direction visuelle",
              desc: "Références sur-mesure + 2 directions concrètes. Tu choisis — tous les autres skills respectent.",
            },
            {
              name: "humanizer",
              role: "Texte qui sonne humain",
              desc: "Repère les tournures IA. Le résultat sonne comme toi, pas comme Claude.",
            },
            {
              name: "design-signature",
              role: "Identité visuelle",
              desc: "Effets testés sur de vrais projets. Reconnaissable, pas générique.",
            },
            {
              name: "frontend-design",
              role: "Exécution sans défauts IA",
              desc: "Standards de qualité. Claude sait ce qu'il peut faire et ce qu'il ne doit pas.",
            },
          ].map((skill) => (
            <div
              key={skill.name}
              className="flex gap-4 py-5 px-5 border border-[var(--border)] rounded-lg bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                <code className="text-xs font-mono text-emerald-400">{skill.name}</code>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">{skill.role}</div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{skill.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
```

- [ ] **Step 5: Add Pour qui section**

After Skills:
```tsx
      {/* Pour qui */}
      <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.1] tracking-tight mb-3">
            Pour qui ?
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Peu importe ton domaine — si tu as une expertise, on peut l'encoder.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
          {[
            { role: "Recruteur tech", encoded: "Grilles d'évaluation + process de sourcing" },
            { role: "Avocat fiscaliste", encoded: "Modèles de contrats + analyse de risques" },
            { role: "Coach produit", encoded: "Framework de diagnostic + priorisation" },
          ].map((ex) => (
            <div
              key={ex.role}
              className="border border-[var(--border)] rounded-lg p-4 space-y-2"
            >
              <span className="text-xs font-medium uppercase tracking-widest text-white/80">
                {ex.role}
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{ex.encoded}</p>
            </div>
          ))}
        </div>
      </section>
```

- [ ] **Step 6: Add CTA milieu**

After Pour qui:
```tsx
      {/* CTA milieu */}
      <section className="px-6 py-20 md:px-12 lg:px-20 border-t border-b border-[var(--border)] bg-[rgba(255,255,255,0.015)]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-4">
            Tu veux encoder ton expertise ?
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.1] tracking-tight mb-4">
            On fait un premier appel.
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-10 max-w-[44ch] mx-auto">
            30 minutes. Tu décris comment tu travailles. On voit ensemble ce qu'on peut encoder.
          </p>
          <a
            href="https://calendly.com/a-brakha-challengerslab/echange-decouverte-challengerslab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#0a0a0a] px-8 py-3.5 text-xs font-medium uppercase tracking-widest hover:opacity-85 transition-opacity"
          >
            Réserver un appel →
          </a>
        </div>
      </section>
```

- [ ] **Step 7: Add Lead Magnet (rewritten)**

After CTA milieu:
```tsx
      {/* Lead Magnet */}
      <section
        id="get"
        className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight">
            Installe les skills. Gratuit.
          </h2>
          <p className="mt-4 text-[var(--text-muted)] text-sm max-w-[48ch] mx-auto leading-relaxed">
            Design-eye v2, design-signature, expertise-web. Les skills qui ont servi à générer le site au-dessus.
          </p>
          <div className="mt-10 bg-[rgba(255,255,255,0.03)] border border-[var(--border)] rounded-lg p-6">
            <div className="text-xs text-[var(--text-muted)] mb-3">
              Copie cette commande et colle-la dans ton terminal :
            </div>
            <code className="text-sm font-mono text-[var(--text)]">
              npx degit AbrahamBra/claude-has-bad-taste/skills ~/.claude/skills
            </code>
            <div className="mt-4">
              <CopyButton text="npx degit AbrahamBra/claude-has-bad-taste/skills ~/.claude/skills" />
            </div>
            <div className="mt-4 text-[10px] text-[var(--text-muted)] leading-relaxed space-y-1">
              <p>
                Nécessite{" "}
                <a
                  href="https://claude.ai/download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[var(--text)] transition-colors"
                >
                  Claude Code
                </a>
                {" "}— la CLI d'Anthropic. Pas Claude.ai, pas Cursor.
              </p>
              <p>
                Les skills s'installent dans{" "}
                <code className="font-mono">~/.claude/skills/</code>.
                Claude Code les charge automatiquement dès ton prochain projet web.
              </p>
              <p>Installation : 30 secondes. Le brain dump prend 5 minutes. La calibration références + direction prend 10–15 minutes. Le site se génère ensuite.</p>
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 8: Add Vision condensée**

After Lead Magnet:
```tsx
      {/* Vision */}
      <section className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-xl">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-6">
            À venir
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.15] tracking-tight">
            Les SaaS vont vivre la même transition.
          </h2>
          <p className="mt-6 text-sm text-[var(--text-muted)] leading-relaxed max-w-[52ch]">
            Notion, Linear, Salesforce — leur valeur c'est l'intelligence métier en dessous, pas l'interface. Les agents n'ont pas besoin du Kanban. Ils veulent juste appeler ce qui gère les tâches. C'est le même travail que tu fais en encodant ton expertise. Même mécanique, moins grande échelle. Pour l'instant.
          </p>
          <p className="mt-6 text-xs text-[var(--text-muted)]">
            On travaille à rendre les skills directement appelables par les agents.
          </p>
        </div>
      </section>
```

- [ ] **Step 9: Add CTA final**

After Vision:
```tsx
      {/* CTA final */}
      <section className="px-6 py-28 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] tracking-tight mb-4">
            Encode ton expertise.{" "}
            <span className="text-[var(--text-muted)]">Réserve un appel.</span>
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-10 max-w-[44ch] mx-auto">
            Les sites web, c'est un exemple. Les skills encodent n'importe quelle expertise.
          </p>
          <a
            href="https://calendly.com/a-brakha-challengerslab/echange-decouverte-challengerslab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#0a0a0a] px-10 py-4 text-xs font-medium uppercase tracking-widest hover:opacity-85 transition-opacity"
          >
            Réserver un appel →
          </a>
        </div>
      </section>
```

- [ ] **Step 10: Run build to check TypeScript**

```bash
npm run build 2>&1 | tail -30
```

Expected: clean build, no TypeScript errors. Fix any errors before continuing.

- [ ] **Step 11: Visual check in browser**

With dev server running on `http://localhost:3000`:
- Scroll the full page from top to bottom
- Verify Nav, Hero, Problem, ChatDemo are unchanged
- Verify PipelineDemo renders with browser chrome + screenshots
- Verify Skills grid is 2 columns on desktop
- Verify "Pour qui" is 3 columns on desktop
- Verify CTA milieu has slightly different background
- Verify Lead Magnet shows copy button
- Verify Vision is 1 paragraph
- Verify CTA final is large and centred
- Check on 375px viewport: all sections stack to 1 column

- [ ] **Step 12: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: homepage redesign — condensed pipeline, skills grid, dual CTA"
```

---

### Task 4: Delete site-result.tsx

**Files:**
- Delete: `src/components/site-result.tsx`

- [ ] **Step 1: Delete the file**

```bash
rm "src/components/site-result.tsx"
```

- [ ] **Step 2: Verify build still passes**

```bash
npm run build 2>&1 | tail -10
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git rm src/components/site-result.tsx
git commit -m "chore: remove unused SiteResult component"
```

---

## Success Criteria

1. `npm run build` passes with no errors
2. No iframes anywhere in `page.tsx` or `pipeline-demo.tsx`
3. "Réserver un appel" CTA appears twice below the fold (CTA milieu + CTA final)
4. PipelineDemo section height is visually ≤ ~600px on desktop (vs. current ~1800px for the 3 iframe sections)
5. Nav, Hero, Problem, ChatDemo sections are visually unchanged
6. Page renders correctly at 375px mobile width (no horizontal overflow, all grids stack)
