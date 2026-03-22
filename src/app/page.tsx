"use client";

import { ChatDemo } from "@/components/chat-demo";
import { SiteResult } from "@/components/site-result";
import { CopyButton } from "@/components/copy-button";
import { ExpertiseForm } from "@/components/expertise-form";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-20 border-b border-[var(--border)]">
        <span className="font-[family-name:var(--font-serif)] text-lg">
          web·kit
        </span>
        <div className="flex items-center gap-6">
          <a
            href="/agence"
            className="text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            Agence
          </a>
          <a
            href="#get"
            className="text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            Obtenir les skills
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-24 pb-20 md:px-12 lg:px-20 lg:pt-36 lg:pb-28 text-center">
        <h1 className="font-[family-name:var(--font-serif)] text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.08] tracking-tight max-w-[20ch] mx-auto">
          Tu as des méthodes qui marchent.
          <br />
          <span className="text-[var(--text-muted)]">
            Les skills encodent ton expertise.
          </span>
        </h1>
        <p className="mt-6 text-[var(--text-muted)] text-base max-w-[52ch] mx-auto leading-relaxed">
          Tu décris comment tu travailles. Les skills s'en souviennent. Claude
          part de ça, pas de ses recettes. Exemple ci-dessous.
        </p>
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <a
            href="#demo"
            className="bg-white text-[#0a0a0a] px-7 py-3.5 text-xs font-medium uppercase tracking-widest hover:opacity-85 transition-opacity"
          >
            Voir la demo
          </a>
          <a
            href="#get"
            className="border border-[var(--border)] text-[var(--text-muted)] px-7 py-3.5 text-xs font-medium uppercase tracking-widest hover:border-white/40 hover:text-white transition-all"
          >
            Installer les skills
          </a>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-[60ch] mx-auto">
            Claude a sa version de tout. Sa façon de structurer. Son esthétique.
            Sa manière de formuler. Quand tu lui demandes quelque chose, il part
            de ça, pas de toi. Il ne sait pas ce qui te distingue. Alors il
            produit de la compétence générique.
          </p>
        </div>
      </section>

      {/* Chat Demo — one scenario */}
      <div id="demo" className="border-t border-[var(--border)]">
        <ChatDemo />
      </div>

      {/* Site Result — iframe to /closing */}
      <div className="border-t border-[var(--border)]">
        <SiteResult />
      </div>

      {/* Architecture */}
      <section className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight text-center">
          Chaque skill encode une expertise.
        </h2>
        <p className="mt-4 text-center text-[var(--text-muted)] text-sm max-w-[55ch] mx-auto leading-relaxed">
          Chaque skill est un systeme autonome avec sa logique, ses references,
          ses garde-fous. Ils se declenchent dans l'ordre et se passent le relais.
        </p>

        <div className="mt-14 max-w-3xl mx-auto">
          <div className="flex flex-col gap-0">
            {[
              {
                name: "design-eye",
                role: "Calibration esthetique",
                detail:
                  "Browse des sites de reference, recherche les tendances de ta cible, montre des exemples, itere avec toi. Produit une direction validee que tous les autres skills respectent.",
              },
              {
                name: "frontend-design",
                role: "Execution anti-slop",
                detail:
                  "Detecte les anti-patterns IA : gradient text, glassmorphism gratuit, cards identiques, Inter partout. 7 modules de reference : typo, couleur OKLCH, spacing, motion, interaction, responsive, UX writing.",
              },
              {
                name: "design-signature",
                role: "Identite visuelle",
                detail:
                  "Effets signature testes sur des vrais projets. Le skill sait quand appliquer un effet et quand ne PAS l'appliquer.",
              },
              {
                name: "expertise-web",
                role: "Patterns techniques",
                detail:
                  "Composants battle-tested, architecture de contenu, maillage interne, SEO/GEO, perf. Chaque pattern vient d'un projet reel.",
              },
              {
                name: "humanizer",
                role: "Textes naturels",
                detail:
                  "Detecte et corrige 24 patterns d'ecriture IA. Le texte sonne humain, pas ChatGPT.",
              },
              {
                name: "copywriting + geo",
                role: "Copy qui convertit + visibilite",
                detail:
                  "Copy marketing adapte a ta cible. SEO pour les moteurs classiques ET pour les IA (ChatGPT, Perplexity, Gemini).",
              },
            ].map((skill, i) => (
              <div key={skill.name} className="relative">
                {i > 0 && (
                  <div className="absolute left-6 -top-3 w-px h-6 bg-[var(--border)]" />
                )}
                <div className="flex gap-5 py-5 px-6 border border-[var(--border)] rounded-lg bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors mt-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <code className="text-xs font-mono text-emerald-400">
                      {skill.name}
                    </code>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{skill.role}</div>
                    <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed">
                      {skill.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-[var(--text-muted)]">
          Chaque skill est un fichier Markdown installe dans{" "}
          <code className="font-mono text-[var(--text)]">~/.claude/skills/</code>.
          Claude Code les charge automatiquement.
        </p>
      </section>

      {/* Lead Magnet */}
      <section
        id="get"
        className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight">
            Installe le pack complet. Gratuit.
          </h2>
          <p className="mt-4 text-[var(--text-muted)] text-sm max-w-[48ch] mx-auto leading-relaxed">
            Les 8 skills. Design-eye, frontend-design, design-signature,
            expertise-web, humanizer, copywriting, geo, motion-design. Tout
            le systeme qu'on a utilise pour generer le site au-dessus.
          </p>

          <div className="mt-10 bg-[rgba(255,255,255,0.03)] border border-[var(--border)] rounded-lg p-6">
            <div className="text-xs text-[var(--text-muted)] mb-3">
              Copie cette commande et colle-la dans ton terminal Claude Code :
            </div>
            <code className="text-sm font-mono text-[var(--text)]" data-copy-target>
              npx @abraham/web-kit
            </code>
            <div className="mt-4">
              <CopyButton text="npx @abraham/web-kit" />
            </div>
            <div className="mt-4 text-[10px] text-[var(--text-muted)] leading-relaxed space-y-1">
              <p>
                Les skills s'installent dans{" "}
                <code className="font-mono">~/.claude/skills/</code>.
                Claude Code les charge automatiquement des ton prochain projet web.
              </p>
              <p>Installation : 30 secondes. Le brain dump prend 5 minutes. La calibration references + direction prend 10-15 minutes. Le site se genere ensuite.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Encode ton expertise */}
      <section className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight">
            Encode ton expertise.
          </h2>
          <p className="mt-4 text-[var(--text-muted)] text-sm max-w-[52ch] mx-auto leading-relaxed">
            Les sites web, c'est un exemple. Les skills encodent n'importe
            quelle expertise. Tu veux creer les tiens ? On t'accompagne.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              { role: "Recruteur tech", encoded: "Ses grilles d'evaluation + process de sourcing" },
              { role: "Avocat fiscaliste", encoded: "Ses modeles de contrats + analyse de risques" },
              { role: "Coach produit", encoded: "Son framework de diagnostic + prioritisation" },
            ].map((ex) => (
              <div
                key={ex.role}
                className="border border-[var(--border)] rounded-lg p-4 space-y-2"
              >
                <span className="text-xs font-medium uppercase tracking-widest text-white/80">
                  {ex.role}
                </span>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {ex.encoded}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-[var(--border)]">
            <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-8">
              Tu aimerais encoder ton expertise ? Presente ton projet.
            </p>
            <ExpertiseForm />
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-xl mx-auto">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-6">
            A venir
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.15] tracking-tight">
            Les SaaS vont vivre la meme transition.
          </h2>
          <div className="mt-6 space-y-4 text-sm text-[var(--text-muted)] leading-relaxed max-w-[52ch]">
            <p>
              Notion, Linear, Salesforce. Leur valeur, c'est pas l'interface.
              C'est l'intelligence metier en dessous. Les agents n'ont pas besoin
              du tableau Kanban. Ils veulent juste appeler ce qui gere les taches.
            </p>
            <p>
              Ces boites vont devoir se deshabiller. Extraire toute leur logique
              business, la rendre structuree, appelable directement. Detruire
              leur propre UI pour survivre.
            </p>
            <p>
              C'est le meme travail que tu fais en encodant ton expertise dans
              des skills. Meme mecanique, moins grande echelle. Pour l'instant.
            </p>
          </div>
          <p className="mt-8 text-xs text-[var(--text-muted)]">
            On travaille a rendre les skills directement appelables par les agents.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-3 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12 lg:px-20 border-t border-[var(--border)]">
        <span className="text-xs text-[var(--text-muted)]">© 2026 Abraham</span>
        <div className="flex gap-5 text-xs text-[var(--text-muted)]">
          <a href="#" className="hover:text-[var(--text)] transition-colors">Mentions legales</a>
          <a href="#" className="hover:text-[var(--text)] transition-colors">Confidentialite</a>
        </div>
      </footer>
    </main>
  );
}
