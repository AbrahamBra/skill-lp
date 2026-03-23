"use client";

import { ChatDemo } from "@/components/chat-demo";
import { PipelineDemo } from "@/components/pipeline-demo";
import { CopyButton } from "@/components/copy-button";

const INSTALL_CMD = "npx web-kit-mcp"; // à mettre à jour quand le MCP est publié

const categories = [
  {
    name: "Design & Frontend",
    count: 14,
    color: "text-violet-400",
    skills: ["design-eye", "design-signature", "frontend-design"],
    description: "Direction visuelle, identité, composants, animations, typographie.",
  },
  {
    name: "Copy & Contenu",
    count: 6,
    color: "text-sky-400",
    skills: ["humanizer", "copywriting", "content-strategy"],
    description: "Texte qui sonne humain, copy marketing, stratégie de contenu.",
  },
  {
    name: "SEO & GEO",
    count: 15,
    color: "text-emerald-400",
    skills: ["geo", "geo-audit", "geo-citability"],
    description: "Visibilité Google + IA (ChatGPT, Perplexity, Gemini). Audit, schema, crawlers.",
  },
  {
    name: "Méthode & Process",
    count: 10,
    color: "text-amber-400",
    skills: ["superpowers:brainstorming", "superpowers:systematic-debugging", "superpowers:writing-plans"],
    description: "Brainstorming structuré, plans d'implémentation, debug, reviews.",
  },
  {
    name: "Dev",
    count: 4,
    color: "text-rose-400",
    skills: ["svelte-code-writer", "supabase-postgres", "claude-api"],
    description: "Svelte 5, Postgres best practices, Anthropic SDK.",
  },
  {
    name: "Productivité",
    count: 6,
    color: "text-orange-400",
    skills: ["xlsx", "pptx", "pdf"],
    description: "Excel, PowerPoint, PDF, Word, canvas design — directement depuis Claude.",
  },
];

export default function SkillSiteWebPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="grid grid-cols-3 items-center px-6 py-5 md:px-12 lg:px-20 border-b border-[var(--border)]">
        <div className="flex items-center gap-6">
          <a
            href="/skill-site-web"
            className="text-xs uppercase tracking-widest text-[var(--text)] transition-colors"
          >
            Skill site web
          </a>
        </div>
        <div className="flex justify-center">
          <a href="/" className="font-[family-name:var(--font-serif)] text-lg">
            web·kit
          </a>
        </div>
        <div className="flex justify-end">
          <a
            href="https://calendly.com/a-brakha-challengerslab/echange-decouverte-challengerslab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest bg-white text-[#0a0a0a] px-4 py-2 hover:opacity-85 transition-opacity"
          >
            Réserver un appel
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-24 pb-20 md:px-12 lg:px-20 lg:pt-36 lg:pb-28 text-center">
        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-6">
          Skill site web — offert
        </p>
        <h1 className="font-[family-name:var(--font-serif)] text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.08] tracking-tight max-w-[20ch] mx-auto">
          Génère ton site pro
          <br />
          <span className="text-[var(--text-muted)]">avec Claude.</span>
        </h1>
        <p className="mt-6 text-[var(--text-muted)] text-base max-w-[50ch] mx-auto leading-relaxed">
          Tu décris ton activité en 3 questions. Claude génère le site complet —
          structure, copy, identité visuelle. Et 50 autres skills avec.
        </p>

        {/* Install box */}
        <div className="mt-10 max-w-lg mx-auto bg-[rgba(255,255,255,0.03)] border border-[var(--border)] rounded-lg p-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-3">
            Ajoute dans ton <code className="font-mono normal-case">claude_desktop_config.json</code>
          </p>
          <code className="text-sm font-mono text-[var(--text)] block">
            {INSTALL_CMD}
          </code>
          <div className="mt-4">
            <CopyButton text={INSTALL_CMD} />
          </div>
          <p className="mt-3 text-[10px] text-[var(--text-muted)]">
            Nécessite Claude Desktop ou Claude Code — package npm à venir.
          </p>
        </div>
      </section>

      {/* Pédagogie — c'est quoi un skill */}
      <section className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-6">
            Pédagogie
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight mb-10">
            C'est quoi un skill ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
            {[
              {
                n: "01",
                title: "Un fichier Markdown",
                text: "Un skill c'est un fichier .md avec des instructions. Claude le lit quand c'est pertinent — pas à chaque message, juste quand le sujet le concerne.",
              },
              {
                n: "02",
                title: "Ton expertise encodée",
                text: "Tu décris comment tu travailles. Tes standards, tes méthodes, tes garde-fous. Claude part de ça, pas de ses propres recettes génériques.",
              },
              {
                n: "03",
                title: "Rechargeable à volonté",
                text: "Tu peux modifier un skill, en créer de nouveaux, les combiner. Plus tu travailles avec, plus Claude connaît tes standards.",
              },
            ].map((item) => (
              <div key={item.n} className="bg-[var(--bg)] px-6 py-8 space-y-4">
                <span className="text-xs font-mono text-[var(--text-muted)]">{item.n}</span>
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill site web offert — demo */}
      <section className="border-t border-[var(--border)]">
        <div className="px-6 py-16 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded">
                offert
              </span>
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
                Skill site web
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight">
              Ton site pro en 3 questions.
            </h2>
            <p className="mt-4 text-[var(--text-muted)] text-sm max-w-[52ch] leading-relaxed">
              Tu décris ton expertise, Claude génère un site complet — structure, copy, identité visuelle.
              Ce skill est inclus dans le package et offert à tous les utilisateurs.
            </p>
          </div>
        </div>
        <div id="demo">
          <ChatDemo />
        </div>
        <PipelineDemo />
      </section>

      {/* Bibliothèque — catégories */}
      <section className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-6">
            51 skills
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight mb-14">
            La bibliothèque complète.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="border border-[var(--border)] rounded-lg p-6 space-y-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{cat.name}</h3>
                  <span className={`text-xs font-mono ${cat.color}`}>
                    {cat.count} skills
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <code
                      key={s}
                      className="text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border)] px-2 py-0.5 rounded"
                    >
                      {s}
                    </code>
                  ))}
                  <span className="text-[10px] text-[var(--text-muted)] px-1 py-0.5">
                    +{cat.count - 3} autres
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA install */}
      <section className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight">
            Installe les 51 skills.
          </h2>
          <p className="mt-4 text-[var(--text-muted)] text-sm max-w-[44ch] mx-auto leading-relaxed">
            Un package npm. Claude les charge selon le contexte — tu ne penses pas à les activer.
          </p>

          <div className="mt-10 bg-[rgba(255,255,255,0.03)] border border-[var(--border)] rounded-lg p-6">
            <code className="text-sm font-mono text-[var(--text)]">
              {INSTALL_CMD}
            </code>
            <div className="mt-4">
              <CopyButton text={INSTALL_CMD} />
            </div>
          </div>

          <div className="mt-10">
            <a
              href="/"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors uppercase tracking-widest"
            >
              Tu préfères un kit sur-mesure ? →
            </a>
          </div>
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
