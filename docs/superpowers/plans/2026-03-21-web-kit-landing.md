# Web Kit Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive demo landing page that lets non-technical users experience Claude Code skills and install them.

**Architecture:** Single-page Next.js app with 5 scroll sections. The interactive demo uses client-side template rendering via iframe `srcdoc` with `postMessage`-based progressive reveal. No backend, no API calls — everything is static/client-side.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, TypeScript, Vercel

**Spec:** `docs/superpowers/specs/2026-03-21-web-kit-landing-design.md`

---

## File Structure

```
src/
  app/
    layout.tsx              — Root layout, fonts, metadata (OG, SEO)
    page.tsx                — Main page, assembles all 5 sections
    globals.css             — Tailwind imports, global styles, dark theme
  components/
    hero.tsx                — Section 1: hero with title + 2 CTA buttons
    before-after.tsx        — Section 2: image-comparison slider + tabs
    questionnaire.tsx       — Section 3: 3-step sequential questionnaire
    generation.tsx          — Section 4: split terminal + iframe animation
    reveal-cta.tsx          — Section 5: expand iframe + install command
    comparison-slider.tsx   — Reusable Twenty-Twenty style slider
    terminal.tsx            — Terminal animation component
    copy-button.tsx         — Clipboard copy with feedback
  lib/
    templates/
      index.ts              — TEMPLATES record mapping ProjectType → render fn
      portfolio.ts          — Portfolio template render function
      saas.ts               — SaaS template render function
      business.ts           — Business local template render function
      blog.ts               — Blog template render function
      before/
        portfolio.ts        — Portfolio "before" (bad) template
        saas.ts             — SaaS "before" (bad) template
        business.ts         — Business local "before" (bad) template
        blog.ts             — Blog "before" (bad) template
      vibes.ts              — CSS custom properties per vibe
      types.ts              — ProjectType, Vibe, TemplateConfig types
    before-after/
      screenshots.ts        — Screenshot paths mapping per type × variant
  hooks/
    use-questionnaire.ts    — State machine for the 3-question flow
  __tests__/
    use-questionnaire.test.ts  — Unit tests for questionnaire state machine
    templates.test.ts          — Snapshot tests for template HTML output
public/
  screenshots/
    portfolio-before.webp
    portfolio-after.webp
    saas-before.webp
    saas-after.webp
    business-before.webp
    business-after.webp
    blog-before.webp
    blog-after.webp
  og-image.png              — Open Graph image (1200x630)
```

---

## Chunk 1: Project Scaffolding + Layout

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`

- [ ] **Step 1: Scaffold Next.js with Tailwind**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --turbopack
```

Accept defaults. This creates the full project structure.

- [ ] **Step 2: Verify the dev server starts**

Run: `npm run dev`
Expected: Server starts on localhost:3000

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind"
```

### Task 2: Root layout + global styles + metadata

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Set up globals.css with dark theme**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --bg: #0a0a0a;
  --text: #e0e0e0;
  --text-muted: #888888;
  --accent: #6366f1;
  --surface: rgba(255, 255, 255, 0.03);
  --border: #333333;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
}

::selection {
  background: var(--accent);
  color: white;
}
```

- [ ] **Step 2: Set up layout.tsx with metadata**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Web Kit — Ton site pro en 3 questions",
  description:
    "Installe les skills Claude Code et génère un site professionnel en répondant à 3 questions. Sans coder.",
  openGraph: {
    title: "Web Kit — Ton site pro en 3 questions",
    description:
      "Installe les skills Claude Code et génère un site professionnel en répondant à 3 questions. Sans coder.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Create minimal page.tsx**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen">
      <p className="p-8 text-center text-[var(--text-muted)]">Web Kit — en construction</p>
    </main>
  );
}
```

- [ ] **Step 4: Verify the page renders correctly**

Run: `npm run dev`
Navigate to localhost:3000. Expected: dark background, centered text "Web Kit — en construction".

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: root layout with dark theme, SEO metadata"
```

---

## Chunk 2: Hero + Section Types

### Task 3: Shared types

**Files:**
- Create: `src/lib/templates/types.ts`

- [ ] **Step 1: Create type definitions**

```typescript
export type ProjectType = "portfolio" | "saas" | "business" | "blog";

export type Vibe = "minimal" | "bold" | "dark" | "playful";

export interface TemplateConfig {
  projectType: ProjectType;
  vibe: Vibe;
  projectName: string;
}

export const PROJECT_LABELS: Record<ProjectType, { emoji: string; label: string }> = {
  business: { emoji: "🏪", label: "Business local" },
  portfolio: { emoji: "💼", label: "Portfolio / Freelance" },
  saas: { emoji: "🚀", label: "SaaS / Startup" },
  blog: { emoji: "📝", label: "Blog / Contenu" },
};

export const VIBE_LABELS: Record<Vibe, { label: string; description: string }> = {
  minimal: { label: "Minimal", description: "Fond clair, typo fine, beaucoup d'espace" },
  bold: { label: "Bold", description: "Couleurs vives, typo grasse, contrastes forts" },
  dark: { label: "Dark", description: "Fond sombre, accents lumineux, grain subtil" },
  playful: { label: "Playful", description: "Couleurs pastel, coins arrondis, icônes" },
};
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/templates/types.ts
git commit -m "feat: shared types for project types and vibes"
```

### Task 4: Hero component

**Files:**
- Create: `src/components/hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create hero component**

```tsx
export function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Ton site pro en 3 questions.
      </h1>
      <p className="mb-10 max-w-md text-lg text-[var(--text-muted)]">
        Pas de code. Pas de template. Juste Claude Code + les bonnes skills.
      </p>
      <div className="flex gap-4">
        <a
          href="#questionnaire"
          className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90"
        >
          Essayer la démo
        </a>
        <a
          href="#before-after"
          className="rounded-lg border border-[var(--border)] px-6 py-3 font-semibold text-[var(--text-muted)] transition-colors hover:border-[var(--text-muted)]"
        >
          Voir l'avant / après
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire hero into page.tsx**

```tsx
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Verify hero renders**

Run: `npm run dev`
Expected: Full-screen dark hero with title, subtitle, 2 buttons.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero.tsx src/app/page.tsx
git commit -m "feat: hero section with title and CTA buttons"
```

---

## Chunk 3: Before/After Comparison Slider

### Task 5: Comparison slider component

**Files:**
- Create: `src/components/comparison-slider.tsx`

- [ ] **Step 1: Create the slider component**

```tsx
"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

interface ComparisonSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

export function ComparisonSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt }: ComparisonSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full max-w-4xl mx-auto cursor-ew-resize overflow-hidden rounded-xl border border-[var(--border)]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="slider"
      aria-label="Comparaison avant/après"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
      }}
    >
      {/* Before image (full width, always visible) */}
      <Image src={beforeSrc} alt={beforeAlt} fill className="object-cover" />

      {/* After image (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={afterSrc} alt={afterAlt} fill className="object-cover" />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
          <span className="text-black text-sm font-bold">⇔</span>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded z-20">
        Sans skills
      </span>
      <span className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded z-20">
        Avec skills
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Verify slider works with placeholder images**

Create two simple colored div placeholders (red = before, green = after) and test the drag behavior.

- [ ] **Step 3: Commit**

```bash
git add src/components/comparison-slider.tsx
git commit -m "feat: image comparison slider component"
```

### Task 6: Before/After section with tabs

**Files:**
- Create: `src/components/before-after.tsx`
- Create: `src/lib/before-after/screenshots.ts`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create screenshot path mapping**

```typescript
import type { ProjectType } from "@/lib/templates/types";

export const SCREENSHOTS: Record<ProjectType, { before: string; after: string }> = {
  portfolio: { before: "/screenshots/portfolio-before.webp", after: "/screenshots/portfolio-after.webp" },
  saas: { before: "/screenshots/saas-before.webp", after: "/screenshots/saas-after.webp" },
  business: { before: "/screenshots/business-before.webp", after: "/screenshots/business-after.webp" },
  blog: { before: "/screenshots/blog-before.webp", after: "/screenshots/blog-after.webp" },
};
```

- [ ] **Step 2: Create before-after section component**

The component:
- 4 tab buttons at top (Portfolio, SaaS, Business local, Blog) — uses `PROJECT_LABELS`
- Active tab renders the `ComparisonSlider` with matching screenshots
- Text below: "Même prompt. Même IA. La différence c'est les skills."
- `id="before-after"` for anchor scroll from hero

- [ ] **Step 3: Wire into page.tsx**

```tsx
import { Hero } from "@/components/hero";
import { BeforeAfter } from "@/components/before-after";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <BeforeAfter />
    </main>
  );
}
```

- [ ] **Step 4: Verify tabs switch and slider works**

Run: `npm run dev`
Expected: Tabs switch the slider content. Slider drag works. (Screenshots will be placeholders until templates are built.)

- [ ] **Step 5: Commit**

```bash
git add src/components/before-after.tsx src/lib/before-after/screenshots.ts src/app/page.tsx
git commit -m "feat: before/after section with tabs and comparison slider"
```

---

## Chunk 4: Questionnaire

### Task 7: Questionnaire state hook

**Files:**
- Create: `src/hooks/use-questionnaire.ts`

- [ ] **Step 1: Create the state machine hook**

```typescript
import { useState } from "react";
import type { ProjectType, Vibe } from "@/lib/templates/types";

type Step = 1 | 2 | 3 | "done";

interface QuestionnaireState {
  step: Step;
  projectType: ProjectType | null;
  vibe: Vibe | null;
  projectName: string;
}

export function useQuestionnaire() {
  const [state, setState] = useState<QuestionnaireState>({
    step: 1,
    projectType: null,
    vibe: null,
    projectName: "",
  });

  const selectProjectType = (type: ProjectType) => {
    setState((s) => ({ ...s, projectType: type, step: 2 }));
  };

  const selectVibe = (vibe: Vibe) => {
    setState((s) => ({ ...s, vibe, step: 3 }));
  };

  const submitName = (name: string) => {
    setState((s) => ({
      ...s,
      projectName: name.trim() || "Mon Projet",
      step: "done",
    }));
  };

  return { state, selectProjectType, selectVibe, submitName };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/use-questionnaire.ts
git commit -m "feat: questionnaire state machine hook"
```

### Task 8: Questionnaire component

**Files:**
- Create: `src/components/questionnaire.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create the questionnaire component**

The component:
- `id="questionnaire"` for anchor scroll
- Shows one question at a time with a slide transition (CSS `transform` + `opacity`)
- **Q1:** Grid of 4 clickable cards using `PROJECT_LABELS` (emoji + label)
- **Q2:** Grid of 4 vibe moodboard cards — each shows a mini color swatch + description from `VIBE_LABELS`
- **Q3:** Text input with placeholder "Ex: Studio Luna, Mon Cabinet, etc." + "Générer" button
- On step "done": calls an `onComplete(config: TemplateConfig)` callback prop
- Keyboard accessible: cards focusable via tab, selectable via Enter

- [ ] **Step 2: Wire into page.tsx with state**

```tsx
"use client";

import { useState } from "react";
import { Hero } from "@/components/hero";
import { BeforeAfter } from "@/components/before-after";
import { Questionnaire } from "@/components/questionnaire";
import type { TemplateConfig } from "@/lib/templates/types";

export default function Home() {
  const [config, setConfig] = useState<TemplateConfig | null>(null);

  return (
    <main className="min-h-screen">
      <Hero />
      <BeforeAfter />
      <Questionnaire onComplete={setConfig} />
    </main>
  );
}
```

- [ ] **Step 3: Verify questionnaire flow**

Run: `npm run dev`
Expected: Click Q1 → Q2 slides in → Click Q2 → Q3 slides in → Type name + click Générer → "done" state.

- [ ] **Step 4: Commit**

```bash
git add src/components/questionnaire.tsx src/app/page.tsx
git commit -m "feat: 3-step questionnaire with sequential reveal"
```

---

## Chunk 5: Template System

### Task 9: Vibes CSS mapping

**Files:**
- Create: `src/lib/templates/vibes.ts`

- [ ] **Step 1: Create vibe CSS variable exports**

```typescript
import type { Vibe } from "./types";

export interface VibeTokens {
  bg: string;
  text: string;
  accent: string;
  fontHeading: string;
  fontBody: string;
  radius: string;
  grain: string;
  glass: string;
  fontImport: string;
}

export const VIBES: Record<Vibe, VibeTokens> = {
  minimal: {
    bg: "#fafafa",
    text: "#1a1a1a",
    accent: "#555555",
    fontHeading: "Inter",
    fontBody: "Inter",
    radius: "2px",
    grain: "none",
    glass: "none",
    fontImport: "",
  },
  bold: {
    bg: "#ffffff",
    text: "#000000",
    accent: "#e63946",
    fontHeading: "Outfit",
    fontBody: "Inter",
    radius: "0px",
    grain: "none",
    glass: "none",
    fontImport:
      "@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;800&display=swap');",
  },
  dark: {
    bg: "#0a0a0a",
    text: "#e0e0e0",
    accent: "#6366f1",
    fontHeading: "Space Grotesk",
    fontBody: "Inter",
    radius: "8px",
    grain: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
    glass: "blur(12px)",
    fontImport:
      "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');",
  },
  playful: {
    bg: "#fef9f0",
    text: "#2d2d2d",
    accent: "#f472b6",
    fontHeading: "Nunito",
    fontBody: "Quicksand",
    radius: "16px",
    grain: "none",
    glass: "blur(8px)",
    fontImport:
      "@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Quicksand:wght@400;500&display=swap');",
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/templates/vibes.ts
git commit -m "feat: vibe CSS tokens with font imports and effects"
```

### Task 10: Template render functions

**Files:**
- Create: `src/lib/templates/portfolio.ts`
- Create: `src/lib/templates/saas.ts`
- Create: `src/lib/templates/business.ts`
- Create: `src/lib/templates/blog.ts`

- [ ] **Step 1: Create portfolio template**

Each `render(name: string, vibe: Vibe): string` function returns a complete HTML document:
- `<style>` with vibe CSS variables + font import
- Nav with project name
- Hero section
- 2-3 content sections appropriate to the project type
- Footer
- Every block has `class="reveal"` and `opacity: 0` by default
- A `<script>` that listens for `postMessage({ type: "reveal", index: N })` and sets `opacity: 1` with a CSS transition on the Nth `.reveal` element

Portfolio template sections:
1. Nav (project name + links)
2. Hero ("Bienvenue chez [name]" + subtitle)
3. Projects grid (3 placeholder cards)
4. About section
5. Footer

- [ ] **Step 2: Create SaaS template**

SaaS sections:
1. Nav (logo + CTA button)
2. Hero (headline + subtitle + CTA)
3. Features grid (3 feature cards)
4. Pricing section (2 plans)
5. Footer

- [ ] **Step 3: Create Business local template**

Business sections:
1. Nav (name + phone number)
2. Hero (business name + tagline)
3. Services section (3 service cards)
4. Contact/location section
5. Footer

- [ ] **Step 4: Create Blog template**

Blog sections:
1. Nav (blog name)
2. Hero (blog title + description)
3. Featured article (large card)
4. Recent articles grid (3 cards)
5. Footer

- [ ] **Step 5: Commit**

```bash
git add src/lib/templates/portfolio.ts src/lib/templates/saas.ts src/lib/templates/business.ts src/lib/templates/blog.ts
git commit -m "feat: 4 template render functions with vibe-based styling"
```

### Task 10b: Template index (barrel)

**Files:**
- Create: `src/lib/templates/index.ts`

- [ ] **Step 1: Create template registry**

```typescript
import type { ProjectType, Vibe } from "./types";
import { render as renderPortfolio } from "./portfolio";
import { render as renderSaas } from "./saas";
import { render as renderBusiness } from "./business";
import { render as renderBlog } from "./blog";

const TEMPLATES: Record<ProjectType, (name: string, vibe: Vibe) => string> = {
  portfolio: renderPortfolio,
  saas: renderSaas,
  business: renderBusiness,
  blog: renderBlog,
};

export function renderTemplate(projectType: ProjectType, name: string, vibe: Vibe): string {
  return TEMPLATES[projectType](name, vibe);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/templates/index.ts
git commit -m "feat: template registry barrel file"
```

### Task 10c: "Before" templates (intentionally bad)

**Files:**
- Create: `src/lib/templates/before/portfolio.ts`
- Create: `src/lib/templates/before/saas.ts`
- Create: `src/lib/templates/before/business.ts`
- Create: `src/lib/templates/before/blog.ts`

These are used only for generating the before/after screenshots. They render the same content as the "after" templates but with intentionally bad styling:

- System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`) — no custom fonts
- No color palette: default black text, blue links (`#0066cc`), white background
- No spacing rhythm — uniform 10px margins everywhere
- No effects (no grain, no glassmorphism, no border-radius, no animations)
- Basic centered layout with `max-width: 960px; margin: 0 auto`
- Bootstrap-like appearance: default blue buttons, gray borders, generic cards

Each exports the same API: `render(name: string): string` (no vibe param — they're always ugly).

- [ ] **Step 1: Create all 4 before templates**

Follow the same section structure as the "after" templates but strip all design quality. The contrast should be stark and immediate.

- [ ] **Step 2: Commit**

```bash
git add src/lib/templates/before/
git commit -m "feat: 'before' templates for screenshot comparison"
```

### Task 10d: Unit tests for templates and questionnaire

**Files:**
- Create: `src/__tests__/templates.test.ts`
- Create: `src/__tests__/use-questionnaire.test.ts`

- [ ] **Step 1: Install Vitest**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Add to `package.json` scripts: `"test": "vitest"`

Add `vitest.config.ts`:
```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: [],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

- [ ] **Step 2: Write template tests**

```typescript
import { describe, it, expect } from "vitest";
import { renderTemplate } from "@/lib/templates";
import type { ProjectType, Vibe } from "@/lib/templates/types";

const PROJECT_TYPES: ProjectType[] = ["portfolio", "saas", "business", "blog"];
const VIBES: Vibe[] = ["minimal", "bold", "dark", "playful"];

describe("renderTemplate", () => {
  for (const type of PROJECT_TYPES) {
    for (const vibe of VIBES) {
      it(`renders valid HTML for ${type} × ${vibe}`, () => {
        const html = renderTemplate(type, "Test Project", vibe);
        expect(html).toContain("<!DOCTYPE html>");
        expect(html).toContain("Test Project");
        expect(html).toContain("class=\"reveal\"");
        expect(html).toContain("postMessage");
      });
    }
  }
});
```

- [ ] **Step 3: Write questionnaire hook tests**

```typescript
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQuestionnaire } from "@/hooks/use-questionnaire";

describe("useQuestionnaire", () => {
  it("starts at step 1", () => {
    const { result } = renderHook(() => useQuestionnaire());
    expect(result.current.state.step).toBe(1);
  });

  it("advances to step 2 on project type selection", () => {
    const { result } = renderHook(() => useQuestionnaire());
    act(() => result.current.selectProjectType("portfolio"));
    expect(result.current.state.step).toBe(2);
    expect(result.current.state.projectType).toBe("portfolio");
  });

  it("advances to step 3 on vibe selection", () => {
    const { result } = renderHook(() => useQuestionnaire());
    act(() => result.current.selectProjectType("saas"));
    act(() => result.current.selectVibe("dark"));
    expect(result.current.state.step).toBe(3);
    expect(result.current.state.vibe).toBe("dark");
  });

  it("uses default name when empty", () => {
    const { result } = renderHook(() => useQuestionnaire());
    act(() => result.current.selectProjectType("blog"));
    act(() => result.current.selectVibe("minimal"));
    act(() => result.current.submitName(""));
    expect(result.current.state.step).toBe("done");
    expect(result.current.state.projectName).toBe("Mon Projet");
  });

  it("trims the project name", () => {
    const { result } = renderHook(() => useQuestionnaire());
    act(() => result.current.selectProjectType("business"));
    act(() => result.current.selectVibe("bold"));
    act(() => result.current.submitName("  Studio Luna  "));
    expect(result.current.state.projectName).toBe("Studio Luna");
  });
});
```

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts src/__tests__/ package.json package-lock.json
git commit -m "test: unit tests for templates and questionnaire hook"
```

---

## Chunk 6: Generation Animation + Terminal

### Task 11: Terminal component

**Files:**
- Create: `src/components/terminal.tsx`

- [ ] **Step 1: Create terminal animation component**

Props:
```typescript
interface TerminalProps {
  isRunning: boolean;
  onStepComplete: (index: number) => void;
  onDone: () => void;
}
```

The component:
- Displays 5 lines in a monospace terminal style
- When `isRunning` becomes true, reveals lines one by one with timing:
  - 0.0s: Line 1 (green) `▸ Création du hero...`
  - 1.2s: Line 2 (green) `▸ Application du style...`
  - 2.4s: Line 3 (green) `▸ Construction de la navigation...`
  - 3.6s: Line 4 (green) `▸ Ajout des sections...`
  - 5.0s: Line 5 (green) `▸ Touches finales...`
  - 6.0s: Final line (green, bold) `✓ Terminé !`
- Calls `onStepComplete(index)` as each line appears (for syncing with iframe)
- Calls `onDone()` at 6.0s
- Unrevealed lines are gray with `○` prefix

- [ ] **Step 2: Commit**

```bash
git add src/components/terminal.tsx
git commit -m "feat: terminal animation component with timed line reveal"
```

### Task 12: Generation section (split terminal + iframe)

**Files:**
- Create: `src/components/generation.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create the generation section**

Props:
```typescript
interface GenerationProps {
  config: TemplateConfig | null;
  onDone: () => void;
}
```

The component:
- Only visible when `config` is not null
- Scrolls into view when it appears (use `useEffect` + `ref.scrollIntoView({ behavior: "smooth" })`)
- Calls `onDone()` when terminal animation completes (passed through to `Terminal.onDone`)
- **Desktop (>= 768px):** flex row — terminal (1/3 width) + iframe (2/3 width)
- **Mobile (< 768px):** flex column — terminal on top (max-height 200px) + iframe below
- Imports the correct template `render` function based on `config.projectType`
- Sets iframe `srcdoc` to the rendered HTML
- Uses `postMessage` to reveal blocks in sync with terminal steps via `onStepComplete`
- iframe: `aspect-ratio: 16/9`, `max-width: 800px`, scrollable, `border-radius: 12px`

- [ ] **Step 2: Wire into page.tsx**

```tsx
import { Generation } from "@/components/generation";

// Inside Home component, after Questionnaire:
{config && <Generation config={config} />}
```

- [ ] **Step 3: Verify the full flow**

Run: `npm run dev`
Test: Complete questionnaire → generation animation plays → terminal lines sync with iframe blocks revealing.

- [ ] **Step 4: Commit**

```bash
git add src/components/generation.tsx src/app/page.tsx
git commit -m "feat: generation section with terminal + iframe progressive reveal"
```

---

## Chunk 7: Reveal CTA + Copy Button

### Task 13: Copy button component

**Files:**
- Create: `src/components/copy-button.tsx`

- [ ] **Step 1: Create copy button**

```typescript
interface CopyButtonProps {
  text: string;
}
```

The component:
- Shows "Copier la commande" by default
- On click: uses `navigator.clipboard.writeText(text)`
- Changes to "Copié !" for 2 seconds, then reverts
- Fallback: if clipboard API unavailable, selects the text in the adjacent code block

- [ ] **Step 2: Commit**

```bash
git add src/components/copy-button.tsx
git commit -m "feat: copy-to-clipboard button with feedback"
```

### Task 14: Reveal + CTA section

**Files:**
- Create: `src/components/reveal-cta.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create reveal CTA section**

Props:
```typescript
interface RevealCtaProps {
  isVisible: boolean;
  iframeRef?: React.RefObject<HTMLIFrameElement>;
}
```

The component handles two things:

**1. Iframe expansion:** When `isVisible` becomes true, the Generation section's iframe expands from `max-width: 800px` to `~90vw` with a CSS transition (`max-width 0.6s ease-out`). This is done by passing a ref from Generation to RevealCta, which adds an `expanded` class.

**2. CTA overlay:** After a 0.8s delay (to let the iframe expand), an overlay slides up:
- Title: "Maintenant fais-le pour de vrai."
- Install command block with the command and `CopyButton`
- Subtitle: "Installe les skills dans Claude Code. Ouvre un nouveau chat, dis-lui ce que tu veux, et il te pose les mêmes questions."
- Secondary: "Fonctionne avec Claude Code. Prend 30 secondes."

**Install command:** Use an env var or constant for the command. Default to `npx @abraham/web-kit`. If package not yet published, fallback to:
```
git clone https://github.com/abraham/web-kit-skills ~/.claude/skills
```

```tsx
const INSTALL_COMMAND = process.env.NEXT_PUBLIC_INSTALL_CMD || "npx @abraham/web-kit";
```

- [ ] **Step 2: Wire into page.tsx with generation done state**

Add an `onDone` callback from `Generation` that sets `showCta` state to true, then render `<RevealCta isVisible={showCta} />`. Pass the iframe ref from Generation to RevealCta for the expansion animation.

- [ ] **Step 3: Verify complete flow end to end**

Run: `npm run dev`
Full flow: Hero → scroll → before/after → questionnaire → generation → CTA appears.

- [ ] **Step 4: Commit**

```bash
git add src/components/reveal-cta.tsx src/app/page.tsx
git commit -m "feat: reveal CTA section with install command and copy button"
```

---

## Chunk 8: Before/After Screenshots + Polish

### Task 15: Generate before/after screenshots

**Files:**
- Create: `public/screenshots/*.webp` (8 files)

- [ ] **Step 1: Create screenshot generation script**

Build a temporary Next.js page at `/screenshots` that renders all 4 templates in both "before" (plain HTML without skills) and "after" (with skills/vibes — using `dark` vibe as the showcase vibe for screenshots).

Use the browser devtools or a Playwright script to capture screenshots at 1200x800, export as WebP.

The "before" templates are intentionally bad:
- System font stack, no custom fonts
- No color palette (default blue links, gray text)
- No spacing rhythm
- No effects (no grain, no glassmorphism, no animations)
- Basic centered layout

- [ ] **Step 2: Save 8 screenshots to public/screenshots/**

```
portfolio-before.webp
portfolio-after.webp
saas-before.webp
saas-after.webp
business-before.webp
business-after.webp
blog-before.webp
blog-after.webp
```

- [ ] **Step 3: Create OG image**

Take the portfolio before/after side by side, add "Web Kit" text overlay, export as `public/og-image.png` at 1200x630.

- [ ] **Step 4: Commit**

```bash
git add public/screenshots/ public/og-image.png
git commit -m "feat: before/after screenshots and OG image"
```

### Task 16: Final polish and review

**Files:**
- Modify: various components for animation polish

- [ ] **Step 1: Add smooth scroll behavior for anchor links**

Already set in globals.css (`scroll-behavior: smooth`). Verify hero buttons scroll smoothly to targets.

- [ ] **Step 2: Add entrance animations**

Use `@design-signature` effects:
- Hero title: fade-in + slight translateY on page load
- Before/after section: fade-in on scroll (IntersectionObserver)
- Questionnaire cards: stagger entrance
- CTA: slide-up from bottom

- [ ] **Step 3: Verify mobile layout**

Test at 375px width:
- Hero: title + buttons stack properly
- Before/after: horizontal slider (before on top)
- Questionnaire: cards stack in single column
- Generation: terminal on top, preview below
- CTA: full width, centered

- [ ] **Step 4: Run build and fix any errors**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: entrance animations and mobile polish"
```

---

## Chunk 9: Deploy

### Task 17: Deploy to Vercel

- [ ] **Step 1: Create GitHub repository**

```bash
gh repo create web-kit --public --source=. --push
```

- [ ] **Step 2: Deploy to Vercel**

```bash
npx vercel --prod
```

Or connect the GitHub repo to Vercel via the dashboard.

- [ ] **Step 3: Verify production URL**

Navigate to the Vercel URL. Test complete flow on desktop and mobile.

- [ ] **Step 4: Commit any Vercel config changes**

```bash
git add -A
git commit -m "chore: Vercel deployment config"
```
