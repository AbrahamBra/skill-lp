# Skills Directory Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/explore` page — a searchable directory of the top 100 Claude projects on GitHub, categorized by profession/domain, with empty-state CTA funneling to custom kit offering.

**Architecture:** Static JSON data file sourced from GitHub, imported at build time by a Server Component page. Client Component handles search/filter interactivity with URL query param sync. No new dependencies.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4

**Spec:** `docs/superpowers/specs/2026-03-24-skills-directory-design.md`

---

## Chunk 1: Data Foundation

### Task 1: Create TypeScript types

**Files:**
- Create: `src/types/skills-directory.ts`

- [ ] **Step 1: Create the type definitions**

```ts
export type ProjectType = "mcp" | "skill" | "tool" | "framework" | "template";

export interface DirectoryProject {
  name: string;
  description: string;
  github_url: string;
  stars: number;
  type: ProjectType;
  domains: string[];
  domain_labels: Record<string, string>;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors (project-wide check — do not pass a single file path to tsc)

- [ ] **Step 3: Commit**

```bash
git add src/types/skills-directory.ts
git commit -m "feat(explore): add DirectoryProject type definitions"
```

### Task 2: Create shared constants

**Files:**
- Create: `src/lib/constants.ts`
- Modify: `src/components/agence-form.tsx:6` (remove local CALENDLY_URL)
- Modify: `src/app/page.tsx:23-25` (use shared CALENDLY_URL)
- Modify: `src/app/skill-site-web/page.tsx:74-75` (use shared CALENDLY_URL)

- [ ] **Step 1: Create constants file**

```ts
export const CALENDLY_URL =
  "https://calendly.com/a-brakha-challengerslab/echange-decouverte-challengerslab";
```

- [ ] **Step 2: Update agence-form.tsx to import from constants**

Replace lines 5-6:
```ts
import { CALENDLY_URL } from "@/lib/constants";
```
Remove the local `const CALENDLY_URL = ...` declaration.

- [ ] **Step 3: Update page.tsx to import from constants**

Add import at top:
```ts
import { CALENDLY_URL } from "@/lib/constants";
```
Replace the hardcoded Calendly URL in the nav `<a href="...">` with `{CALENDLY_URL}`.

- [ ] **Step 4: Update skill-site-web/page.tsx to import from constants**

Same pattern — import from `@/lib/constants`, replace hardcoded URL in nav.

- [ ] **Step 5: Verify the dev server runs without errors**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add src/lib/constants.ts src/components/agence-form.tsx src/app/page.tsx src/app/skill-site-web/page.tsx
git commit -m "refactor: extract CALENDLY_URL to shared constants"
```

### Task 3: Scrape and build the JSON data file

**Files:**
- Create: `src/data/skills-directory.json`

This is the most labor-intensive task. Use GitHub web search and the GitHub API to find the top 100 Claude projects.

- [ ] **Step 1: Search GitHub for Claude/Anthropic projects**

Search queries to execute (via WebSearch or GitHub API):
- `claude mcp server` (sort by stars)
- `claude code skills` (sort by stars)
- `anthropic claude tool` (sort by stars)
- `claude agent framework` (sort by stars)
- `claude automation` (sort by stars)
- `anthropic sdk` (sort by stars)
- Domain-specific: `claude crm`, `claude marketing`, `claude finance`, `claude recruitment`, `claude legal`, `claude data`, `claude design`

For each result, collect: name, description, GitHub URL, star count, and determine type + domains.

- [ ] **Step 2: Build the JSON array**

Create `src/data/skills-directory.json` with 100 entries. Each entry must:
- Have a French description (translate if original is English)
- Have 1-3 domain slugs (unaccented French: `developpement`, `marketing`, `ventes`, etc.)
- Have a `domain_labels` entry for every domain in `domains[]`
- Be sorted by stars descending

Validate: every `domains[]` entry has a matching key in `domain_labels`.

- [ ] **Step 3: Verify JSON is valid, importable, and domain_labels are consistent**

Run:
```bash
node -e "
const d = require('./src/data/skills-directory.json');
console.log(d.length + ' projects loaded');
const bad = d.filter(p => p.domains.some(dom => !p.domain_labels[dom]));
if (bad.length) { console.error('Missing domain_labels:', bad.map(p => p.name)); process.exit(1); }
console.log('All domain_labels valid');
"
```
Expected: `100 projects loaded` and `All domain_labels valid`

- [ ] **Step 4: Commit**

```bash
git add src/data/skills-directory.json
git commit -m "feat(explore): add top 100 Claude projects data"
```

---

## Chunk 2: Page Components

### Task 4: Create the Client Component (directory-client.tsx)

**Files:**
- Create: `src/app/explore/directory-client.tsx`

- [ ] **Step 1: Create the client component**

This component receives the full project array as props and handles:
- Search input with `useState`
- Domain pill filters generated from unique domains across all projects
- URL query param sync via `useSearchParams()` and `useRouter()`
- Filtering logic (AND combination of search text + domain pill)
- Results grid with project cards
- Empty state with CTA

```tsx
"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CALENDLY_URL } from "@/lib/constants";
import type { DirectoryProject, ProjectType } from "@/types/skills-directory";

const TYPE_STYLES: Record<ProjectType, { bg: string; text: string; label: string }> = {
  mcp: { bg: "bg-violet-500/10", text: "text-violet-400", label: "MCP" },
  skill: { bg: "bg-sky-500/10", text: "text-sky-400", label: "Skill" },
  tool: { bg: "bg-neutral-500/10", text: "text-neutral-400", label: "Tool" },
  framework: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Framework" },
  template: { bg: "bg-orange-500/10", text: "text-orange-400", label: "Template" },
};

function formatStars(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k";
  return String(n);
}

function normalize(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

interface Props {
  projects: DirectoryProject[];
}

export function DirectoryClient({ projects }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Derive state from URL params (reactive to browser back/forward)
  const paramQ = searchParams.get("q") ?? "";
  const paramDomain = searchParams.get("domain") ?? "";

  const [query, setQuery] = useState(paramQ);
  const [activeDomain, setActiveDomain] = useState(paramDomain);

  // Sync state when URL changes (browser back/forward)
  useEffect(() => { setQuery(paramQ); }, [paramQ]);
  useEffect(() => { setActiveDomain(paramDomain); }, [paramDomain]);

  // Debounce URL updates (300ms) to avoid polluting history on each keystroke
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const updateParams = useCallback((q: string, domain: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (domain) params.set("domain", domain);
      const qs = params.toString();
      router.replace(qs ? `/explore?${qs}` : "/explore", { scroll: false });
    }, 300);
  }, [router]);

  // Extract unique domains sorted by frequency
  const allDomains = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of projects) {
      for (const d of p.domains) {
        counts[d] = (counts[d] ?? 0) + 1;
      }
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([slug]) => slug);
  }, [projects]);

  // Filter projects
  const filtered = useMemo(() => {
    const q = normalize(query);
    return projects.filter((p) => {
      if (activeDomain && !p.domains.includes(activeDomain)) return false;
      if (!q) return true;
      const haystack = normalize(
        [p.name, p.description, ...p.domains, ...Object.values(p.domain_labels)].join(" ")
      );
      return haystack.includes(q);
    });
  }, [projects, query, activeDomain]);

  function handleSearch(value: string) {
    setQuery(value);
    updateParams(value, activeDomain);
  }

  function handleDomain(domain: string) {
    const next = activeDomain === domain ? "" : domain;
    setActiveDomain(next);
    updateParams(query, next);
  }

  function clearDomain() {
    setActiveDomain("");
    updateParams(query, "");
  }

  return (
    <>
      {/* Search */}
      <div className="mt-8">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Rechercher un projet, un métier..."
          aria-label="Rechercher un projet ou un métier"
          className="w-full max-w-lg bg-transparent border border-[var(--border)] px-5 py-3.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Domain pills — horizontally scrollable on mobile */}
      <div
        role="group"
        aria-label="Filtrer par domaine"
        className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none"
      >
        <button
          onClick={clearDomain}
          className={`text-xs px-3 py-1.5 border transition-colors flex-shrink-0 ${
            !activeDomain
              ? "border-white/40 text-[var(--text)]"
              : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
          }`}
        >
          Tous
        </button>
        {allDomains.map((d) => (
          <button
            key={d}
            onClick={() => handleDomain(d)}
            aria-label={`Filtrer par ${d}`}
            className={`text-xs px-3 py-1.5 border transition-colors capitalize flex-shrink-0 ${
              activeDomain === d
                ? "border-white/40 text-[var(--text)]"
                : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="mt-6 text-xs text-[var(--text-muted)]">
        {filtered.length} projet{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid or empty state */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <article
              key={p.github_url}
              className="border border-[var(--border)] p-5 space-y-3 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <a
                  href={p.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:underline underline-offset-2"
                >
                  {p.name}
                </a>
                <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] flex-shrink-0">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
                  </svg>
                  {formatStars(p.stars)}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                {p.description}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded ${TYPE_STYLES[p.type].bg} ${TYPE_STYLES[p.type].text}`}
                >
                  {TYPE_STYLES[p.type].label}
                </span>
                {p.domains.map((d) => (
                  <button
                    key={d}
                    onClick={() => handleDomain(d)}
                    aria-label={`Filtrer par ${d}`}
                    className="text-[10px] text-[var(--text-muted)] border border-[var(--border)] px-2 py-0.5 rounded hover:text-[var(--text)] hover:border-white/30 transition-colors capitalize"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-12 max-w-lg">
          <p className="text-sm leading-relaxed">
            On a analysé les 100 meilleurs projets Claude sur GitHub.
            {query && (
              <>
                {" "}Aucun ne couvre encore{" "}
                <strong className="text-[var(--text)]">{query}</strong>.
              </>
            )}
          </p>
          <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">
            C&apos;est souvent le cas — la plupart des skills sont concentrés sur le dev
            et le marketing. On peut creuser ensemble ce qui existe pour ton métier
            et construire les skills qui manquent.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-white text-[#0a0a0a] px-7 py-3.5 text-xs font-medium uppercase tracking-widest hover:opacity-85 transition-opacity"
          >
            Réserver un appel →
          </a>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/explore/directory-client.tsx
git commit -m "feat(explore): add DirectoryClient component with search and filters"
```

### Task 5: Create the Server Component page

**Files:**
- Create: `src/app/explore/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import { CALENDLY_URL } from "@/lib/constants";
import { DirectoryClient } from "./directory-client";
import projects from "@/data/skills-directory.json";
import type { DirectoryProject } from "@/types/skills-directory";

export const metadata: Metadata = {
  title: "Top 100 projets Claude — Annuaire par métier | Web Kit",
  description:
    "Explore les 100 meilleurs projets Claude sur GitHub, classés par métier : marketing, ventes, finance, RH, dev et plus. Trouve les outils qui existent — ou découvre ce qu'il reste à construire.",
  openGraph: {
    title: "Top 100 projets Claude — Annuaire par métier",
    description: "Les meilleurs projets Claude sur GitHub, classés par métier.",
    url: "/explore",
  },
};

// Sort by stars descending at build time (toSorted avoids mutating the imported array)
const sorted = (projects as DirectoryProject[]).toSorted((a, b) => b.stars - a.stars);

// Build ItemList JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Top 100 projets Claude",
  description: "Les 100 meilleurs projets Claude sur GitHub, classés par métier.",
  numberOfItems: sorted.length,
  itemListElement: sorted.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: p.name,
      description: p.description,
      url: p.github_url,
    },
  })),
};

export default function ExplorePage() {
  return (
    <main className="min-h-screen">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="grid grid-cols-3 items-center px-6 py-5 md:px-12 lg:px-20 border-b border-[var(--border)]">
        <div className="flex items-center gap-6">
          <a
            href="/skill-site-web"
            className="text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            Skill site web
          </a>
          <a
            href="/explore"
            className="text-xs uppercase tracking-widest text-[var(--text)] transition-colors"
          >
            Explorer
          </a>
        </div>
        <div className="flex justify-center">
          <a href="/" className="font-[family-name:var(--font-serif)] text-lg">
            web·kit
          </a>
        </div>
        <div className="flex justify-end">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest bg-white text-[#0a0a0a] px-4 py-2 hover:opacity-85 transition-opacity"
          >
            Réserver un appel
          </a>
        </div>
      </nav>

      {/* Header */}
      <section className="px-6 pt-24 pb-8 md:px-12 lg:px-20">
        <h1 className="font-[family-name:var(--font-serif)] text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.08] tracking-tight">
          Top 100 projets Claude
        </h1>
        <p className="mt-4 text-[var(--text-muted)] text-base max-w-[55ch] leading-relaxed">
          Les meilleurs projets open source pour Claude, classés par métier.
          Trouve ce qui existe — ou découvre ce qu&apos;il reste à construire.
        </p>

        <Suspense fallback={null}>
          <DirectoryClient projects={sorted} />
        </Suspense>
      </section>

      {/* Footer CTA */}
      <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-lg">
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Tu veux des skills taillés pour ton métier ?
          </p>
          <a
            href="/#tarifs"
            className="mt-3 inline-block text-xs uppercase tracking-widest text-[var(--text)] hover:opacity-75 transition-opacity"
          >
            Voir les kits custom →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-3 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12 lg:px-20 border-t border-[var(--border)]">
        <span className="text-xs text-[var(--text-muted)]">© 2026 Abraham</span>
        <div className="flex gap-5 text-xs text-[var(--text-muted)]">
          <a href="#" className="hover:text-[var(--text)] transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-[var(--text)] transition-colors">Confidentialité</a>
        </div>
      </footer>
    </main>
  );
}
```

Note: `DirectoryClient` uses `useSearchParams()` which requires a `<Suspense>` boundary in Next.js 16.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/explore/page.tsx
git commit -m "feat(explore): add /explore page with SEO metadata and JSON-LD"
```

---

## Chunk 3: Nav Integration

### Task 6: Add "Explorer" link to existing navs

**Files:**
- Modify: `src/app/page.tsx:8-14` (add Explorer link in nav)
- Modify: `src/app/skill-site-web/page.tsx:58-66` (add Explorer link in nav)

- [ ] **Step 1: Update homepage nav**

In `src/app/page.tsx`, inside the nav's left `<div>`, add the Explorer link after the existing "Skill site web" link:

```tsx
<a
  href="/explore"
  className="text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
>
  Explorer
</a>
```

- [ ] **Step 2: Update skill-site-web nav**

In `src/app/skill-site-web/page.tsx`, same pattern — add Explorer link in the nav's left `<div>`.

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/skill-site-web/page.tsx
git commit -m "feat(explore): add Explorer link to homepage and skill-site-web navs"
```

---

## Chunk 4: Visual Verification

### Task 7: Start dev server and verify the page

- [ ] **Step 1: Start the dev server**

Use `preview_start` with the existing launch.json config.

- [ ] **Step 2: Navigate to /explore and take a screenshot**

Verify:
- Page loads with title "Top 100 projets Claude"
- Search bar is visible
- Domain pills render correctly
- Cards display with name, description, stars, type badge, domain tags
- Grid is responsive (1/2/3 columns)

- [ ] **Step 3: Test search functionality**

- Type "marketing" in search → verify filtered results
- Click a domain pill → verify filtering
- Type "recrutement" → verify empty state with CTA appears
- Verify URL updates with query params

- [ ] **Step 4: Test navigation**

- Click "Explorer" in nav → verify active state
- Click project name → verify opens GitHub in new tab
- Click domain tag on card → verify filters by that domain
- Click "Réserver un appel" in empty state → verify Calendly link

- [ ] **Step 5: Take final screenshot for confirmation**

- [ ] **Step 6: Commit any fixes**

```bash
git add -A
git commit -m "fix(explore): visual and functional fixes from verification"
```
