# Skills Directory — Top 100 Claude Projects

**Date:** 2026-03-24
**Status:** Approved

## Goal

Build a dedicated `/explore` page — a full directory of the top 100 Claude projects on GitHub, categorized by profession/domain. Serves as an SEO traffic magnet: visitors search for their profession, discover the ecosystem, and when nothing matches their domain, get funneled to the custom skill kit offering.

## Business Context

- **Primary goal:** SEO traffic — people searching "Claude skills for [domain]" land on the directory, discover the custom kit service
- **Empty state as sales lever:** When a domain has no results, the message explains we analyzed the top 100 and this domain isn't covered yet — opportunity to build together via a call
- **Placement:** Standalone page at `/explore`, linked from main nav

## Data Model

### TypeScript Interface: `src/types/skills-directory.ts`

```ts
export type ProjectType = "mcp" | "skill" | "tool" | "framework" | "template";

export interface DirectoryProject {
  name: string;
  description: string;
  github_url: string;
  stars: number;
  type: ProjectType;
  domains: string[];           // French slugs: "ventes", "marketing", "rh", etc.
  domain_labels: Record<string, string>; // Required for every entry in domains[]
}
```

### File: `src/data/skills-directory.json`

Array of 100 `DirectoryProject` objects:

```json
{
  "name": "Composio MCP Server",
  "description": "Connecte Claude à 250+ apps (CRM, email, calendrier...)",
  "github_url": "https://github.com/composio/composio",
  "stars": 15200,
  "type": "mcp",
  "domains": ["ventes", "marketing", "productivite"],
  "domain_labels": {
    "ventes": "CRM, suivi prospects, pipeline",
    "marketing": "Automatisation emails, campagnes",
    "productivite": "Connexion apps, workflows automatisés"
  }
}
```

**Fields:**
- `name` — Project display name
- `description` — 1-2 line description, in French
- `github_url` — Link to GitHub repo
- `stars` — GitHub star count (for sorting)
- `type` — One of: `mcp` | `skill` | `tool` | `framework` | `template`
- `domains` — Array of French domain slugs, no accents (1-3 per project)
- `domain_labels` — **Required** for every entry in `domains[]`. Map of slug → short relevance explanation in French

**Language convention:** All user-facing text (descriptions, domain slugs, domain labels) in French. Field names in English. Domain slugs use unaccented French: `productivite`, `developpement`, `juridique`, etc. Search matches both accented and unaccented input.

**Domains** emerge from the scraping process — not predefined. Expected ~15-20 categories (developpement, marketing, ventes, finance, data, design, rh, juridique, etc.)

### Data refresh

Manual re-scrape as needed. Expected cadence: quarterly. Star counts may drift but sort order impact is negligible for a static top-100.

## Page Structure: `/explore`

### Layout (top to bottom)

1. **Header**
   - Title: "Top 100 projets Claude"
   - Full-text search bar

2. **Domain filters**
   - Horizontally scrollable pills, generated dynamically from the JSON
   - "Tous" selected by default
   - Clicking a pill filters the grid

3. **Results grid**
   - Cards sorted by stars descending
   - Search + domain filter combine (AND logic)

4. **Empty state** (when search matches nothing)
   - "On a analysé les 100 meilleurs projets Claude sur GitHub. Aucun ne couvre encore **[search term]**."
   - "C'est souvent le cas — la plupart des skills sont concentrés sur le dev et le marketing. On peut creuser ensemble ce qui existe pour ton métier et construire les skills qui manquent."
   - CTA: **[Réserver un appel →]** (Calendly link)

5. **Footer CTA**
   - Subtle: "Tu veux des skills taillés pour ton métier ?" → link to `/#tarifs`

### Card Design

Each card contains:
- **Name** — clickable link to GitHub repo
- **Description** — 1-2 lines, truncated if long
- **Stars** — star icon + compact number (e.g., "15.2k")
- **Type badge** — colored pill (MCP violet, Skill blue, Tool gray, Framework green, Template orange)
- **Domain tags** — subtle clickable pills at bottom, filter on click

**Excluded from cards:** no screenshots, no README, no install/fork buttons. Minimal — entry point, not a GitHub clone.

### Search Behavior

- Client-side filtering in real time (no server requests)
- Searches across: `name`, `description`, `domains`, `domain_labels`
- Domain pills and text search combine (AND)

## Sourcing Strategy

### GitHub Search Queries

- `claude mcp server` — MCP servers
- `claude skills` / `claude code skills` — native skills
- `claude tool` / `anthropic tool` — tools
- `claude agent` / `claude automation` — agent frameworks
- Domain-specific: `claude crm`, `claude marketing`, `claude finance`, `claude recruitment`, etc.

### Selection Criteria

- Stars > 50 minimum
- Active project (commit within last 6 months)
- Actually related to Claude/Anthropic (not generic "AI")
- Deduplicated (one repo = one entry)

### Categorization Process

- Read description + README of each project
- Assign 1-3 domain slugs per project
- Write a short `domain_label` explaining relevance per domain

### Output

Static file `src/data/skills-directory.json`, versioned in the repo. Re-scrapable manually when needed.

## SEO & Metadata

### Page metadata (`export const metadata` in `/explore/page.tsx`):

```ts
export const metadata: Metadata = {
  title: "Top 100 projets Claude — Annuaire par métier | Web Kit",
  description: "Explore les 100 meilleurs projets Claude sur GitHub, classés par métier : marketing, ventes, finance, RH, dev et plus. Trouve les outils qui existent — ou découvre ce qu'il reste à construire.",
  openGraph: {
    title: "Top 100 projets Claude — Annuaire par métier",
    description: "Les meilleurs projets Claude sur GitHub, classés par métier.",
    url: "/explore",
  },
};
```

### URL state for filters

Filters are reflected in query params: `/explore?q=finance&domain=finance`. This enables:
- Shareable/bookmarkable filtered views
- Deep-linking from marketing campaigns
- Individual domain views indexable by search engines

### Structured data

`ItemList` JSON-LD schema with the 100 projects for rich search results.

## Component Architecture

### Server/Client boundary

- **`/explore/page.tsx`** — Server Component. Imports JSON at build time, exports metadata, renders the page shell with all 100 cards in the initial HTML (SEO).
- **`/explore/directory-client.tsx`** — Client Component (`"use client"`). Receives full project array as props. Handles search input, domain pill filtering, URL query param sync via `useSearchParams()`.

This ensures all cards are in the initial server-rendered HTML while keeping interactivity client-side.

### Responsive grid

- Mobile: 1 column
- Tablet (md): 2 columns
- Desktop (lg): 3 columns

### Card truncation

Description uses `line-clamp-2` (Tailwind built-in).

### Type badge colors (Tailwind classes)

| Type | Background | Text |
|------|-----------|------|
| mcp | `bg-violet-500/10` | `text-violet-400` |
| skill | `bg-sky-500/10` | `text-sky-400` |
| tool | `bg-neutral-500/10` | `text-neutral-400` |
| framework | `bg-emerald-500/10` | `text-emerald-400` |
| template | `bg-orange-500/10` | `text-orange-400` |

## Accessibility

- Search input: `aria-label="Rechercher un projet ou un métier"`
- Domain pills: `role="group"` with `aria-label="Filtrer par domaine"`, each pill is a `<button>`
- Cards: semantic `<article>` elements with heading hierarchy
- Domain tags on cards: `<button>` with `aria-label="Filtrer par [domain]"`
- Keyboard: Tab navigates pills → search → cards. Enter activates pills/links.

## Shared Constants

Extract `CALENDLY_URL` to `src/lib/constants.ts` — currently hardcoded in 3+ places across the site.

## Navigation Integration

- Add "Explorer" link in main nav (alongside existing "Skill site web" link)
- Nav remains inline per page (no shared component refactor — out of scope)
- Link from `/skill-site-web` page to `/explore` for cross-discovery
