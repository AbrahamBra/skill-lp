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

  const paramQ = searchParams.get("q") ?? "";
  const paramDomain = searchParams.get("domain") ?? "";

  const [query, setQuery] = useState(paramQ);
  const [activeDomain, setActiveDomain] = useState(paramDomain);

  useEffect(() => { setQuery(paramQ); }, [paramQ]);
  useEffect(() => { setActiveDomain(paramDomain); }, [paramDomain]);

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
          placeholder="Ex : closing B2B, marketing, comptabilité..."
          aria-label="Rechercher par métier ou par outil"
          className="w-full max-w-lg bg-transparent border border-[var(--border)] px-5 py-3.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Domain pills */}
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
            On a passé en revue 100 projets Claude sur GitHub.
            {query && (
              <>
                {" "}Rien sur{" "}
                <strong className="text-[var(--text)]">{query}</strong>.
              </>
            )}
          </p>
          <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">
            Normal. La majorité des projets tournent autour du dev et du marketing.
            On peut regarder ensemble ce qui manque pour ton métier et le construire.
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
