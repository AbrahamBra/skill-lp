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

const sorted = (projects as unknown as DirectoryProject[]).toSorted((a, b) => b.stars - a.stars);

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
