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

### File: `src/data/skills-directory.json`

Array of 100 objects:

```json
{
  "name": "Project Name",
  "description": "One-line description of what it does",
  "github_url": "https://github.com/org/repo",
  "stars": 15200,
  "type": "mcp",
  "domains": ["sales", "marketing", "productivité"],
  "domain_labels": {
    "sales": "CRM, suivi prospects, pipeline",
    "marketing": "Automatisation emails, campagnes"
  }
}
```

**Fields:**
- `name` — Project display name
- `description` — 1-2 line description
- `github_url` — Link to GitHub repo
- `stars` — GitHub star count (for sorting)
- `type` — One of: `mcp` | `skill` | `tool` | `framework` | `template`
- `domains` — Array of profession/domain slugs (1-3 per project)
- `domain_labels` — Map of domain slug to short explanation of relevance

**Domains** emerge from the scraping process — not predefined. Expected ~15-20 categories (dev, marketing, sales, finance, data, design, RH, juridique, etc.)

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

## Tech Stack

- Next.js page component (server-rendered for SEO)
- Client-side search/filter with `useState`
- JSON import at build time
- Tailwind CSS for styling (consistent with existing site)
- No new dependencies required

## Navigation Integration

- Add "Explorer" link in main nav (alongside existing "Skill site web" link)
- Link from `/skill-site-web` page to `/explore` for cross-discovery
