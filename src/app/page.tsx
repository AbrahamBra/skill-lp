"use client";

import { ChatDemo } from "@/components/chat-demo";
import { SiteResult } from "@/components/site-result";
import { CopyButton } from "@/components/copy-button";

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

      {/* Site Result — iframe to /b2b */}
      <div className="border-t border-[var(--border)]">
        <SiteResult />
      </div>

      {/* Step 02 — Copy & humanizer */}
      <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-mono text-emerald-400">✓</span>
            <span className="text-xs uppercase tracking-widest text-emerald-400">Etape 02 validee</span>
          </div>
          <h3 className="font-[family-name:var(--font-serif)] text-xl tracking-tight">
            Copy & humanizer.
          </h3>
          <p className="mt-3 text-[var(--text-muted)] text-sm max-w-[52ch] leading-relaxed">
            Humanizer repere les tournures IA et les reecrit. Avant : formules generiques. Apres : phrases qui ressemblent a quelqu'un qui a vraiment fait le job.
          </p>

          <div className="mt-8 space-y-3">
            {[
              {
                label: "Hero",
                before: "J'aide les startups à convertir plus avec des méthodes éprouvées, renforcées par l'IA.",
                after: "Ce qui bloque les deals, on le règle avec les bons outils IA au bon endroit.",
              },
              {
                label: "Service 02",
                before: "Tu fais plus avec les mêmes ressources.",
                after: "Tu traites plus de leads sans grossir l'équipe.",
              },
              {
                label: "Vision",
                before: "Pas pour remplacer la relation humaine — pour lui laisser plus de place.",
                after: "L'IA s'occupe de la qualification. Toi, tu parles aux gens qui sont prêts à signer.",
              },
            ].map((ex) => (
              <div key={ex.label} className="grid grid-cols-[56px_1fr] gap-3 text-xs">
                <span className="text-[var(--text-muted)] font-mono pt-2.5">{ex.label}</span>
                <div className="space-y-1.5">
                  <div className="px-3 py-2.5 rounded border border-[var(--border)] text-[var(--text-muted)] opacity-50 line-through leading-relaxed">
                    {ex.before}
                  </div>
                  <div className="px-3 py-2.5 rounded border border-emerald-400/20 bg-emerald-400/[0.03] text-white leading-relaxed">
                    {ex.after}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Site after humanizer */}
          <div className="mt-10 max-w-5xl border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[rgba(255,255,255,0.03)]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-[rgba(255,255,255,0.05)] rounded-md px-3 py-1 text-xs text-[var(--text-muted)] font-mono text-center">
                  abrahambrakha.fr/b2b — étape 02
                </div>
              </div>
            </div>
            <iframe
              src="/b2b-step2"
              title="Site B2B après humanizer"
              className="w-full h-[500px] bg-white"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Step 03 — Design-signature */}
      <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-mono text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded">✓</span>
            <span className="text-xs font-mono text-[var(--text-muted)]">03</span>
            <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">Identite visuelle</span>
            <span className="ml-auto text-[10px] font-mono text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded">
              etape 03 validee
            </span>
          </div>
          <h3 className="font-[family-name:var(--font-serif)] text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.15] tracking-tight mb-3">
            Le site prend son identite.
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-[52ch] mb-10">
            Design-signature entre en jeu. Nav sticky avec ombre au scroll, hover lift sur les cards, focus rings sur tous les CTAs. Chaque interaction est calibree sur la direction validee.
          </p>

          <div className="max-w-5xl border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[rgba(255,255,255,0.03)]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
              </div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] ml-2">
                abrahambrakha.fr/b2b — etape 03
              </span>
            </div>
            <iframe
              src="/b2b"
              title="Site B2B version finale — design-signature"
              className="w-full border-0"
              style={{ height: "600px" }}
            />
          </div>
          <p className="mt-4 text-xs text-[var(--text-muted)]">
            Nav sticky, hover states, interactions calibrees sur la direction validee. Genere avec design-eye + humanizer + design-signature.
          </p>
        </div>
      </section>

      {/* Architecture */}
      <section className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight text-center">
          Un skill pour chaque partie du travail.
        </h2>
        <p className="mt-4 text-center text-[var(--text-muted)] text-sm max-w-[55ch] mx-auto leading-relaxed">
          Chaque skill a sa logique et ses garde-fous.
          Claude les charge dans l'ordre, chacun fait sa partie.
        </p>

        <div className="mt-14 max-w-3xl mx-auto">
          <div className="flex flex-col gap-0">
            {[
              {
                name: "design-eye v2",
                role: "Direction visuelle",
                detail:
                  "Claude cherche des references qui correspondent a ta cible, te propose deux directions concretes, tu choisis. Pas de template. Une direction sur-mesure validee par toi, que tous les autres skills respectent.",
                source: null,
              },
              {
                name: "frontend-design",
                role: "Execution sans les defauts IA",
                detail:
                  "Claude a tendance a produire des sites qui se ressemblent tous. Ce skill lui apprend tes standards : ce qu'il peut faire, ce qu'il ne doit pas faire, comment rendre chaque detail intentionnel.",
                source: { label: "Anthropic (Apache 2.0)", url: null },
              },
              {
                name: "design-signature",
                role: "Identite visuelle",
                detail:
                  "Des effets visuels testes sur de vrais projets. Le skill sait quand les appliquer et quand ne pas les appliquer. Claude ne fait pas du beau generique. Il fait du reconnaissable.",
                source: null,
              },
              {
                name: "expertise-web",
                role: "Memoire de projet",
                detail:
                  "Un repertoire de composants et de regles issus de vrais projets. Quand tu approuves quelque chose, Claude le garde. Mais seulement s'il a verifie que c'est solide. Pas une bonne idee du moment qui deviendrait une regle permanente. Plus tu travailles avec lui, plus il connait tes standards.",
                source: null,
              },
              {
                name: "humanizer",
                role: "Texte qui sonne humain",
                detail:
                  "Repere les mots que Claude sur-utilise, les tournures trop lisses, les listes trop propres. Le resultat sonne comme toi, pas comme une IA.",
                source: { label: "blader/humanizer", url: "https://github.com/blader/humanizer" },
              },
              {
                name: "superpowers",
                role: "Methode de travail",
                detail:
                  "Un cadre pour que Claude reste discipline sur les projets longs. Brainstorming structure, plans etapes par etapes, verifications avant de livrer. Moins d'improvisation, plus de rigueur.",
                source: { label: "obra/superpowers", url: "https://github.com/obra/superpowers" },
              },
              {
                name: "copywriting + geo",
                role: "Copy et visibilite",
                detail:
                  "Copy marketing adapte a ta cible. Visibilite sur Google ET sur les IA qui repondent aux questions (ChatGPT, Perplexity, Gemini) — les deux sont differents, les deux sont couverts.",
                source: { label: "zubair-trabzada/geo-seo-claude", url: "https://github.com/zubair-trabzada/geo-seo-claude" },
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
                    {skill.source && (
                      skill.source.url ? (
                        <a
                          href={skill.source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-[10px] font-mono text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                        >
                          ↗ {skill.source.label}
                        </a>
                      ) : (
                        <span className="mt-2 inline-block text-[10px] font-mono text-[var(--text-muted)] opacity-60">
                          {skill.source.label}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-[var(--text-muted)]">
          Les skills sont des fichiers Markdown installes dans{" "}
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
            Installe les skills. Gratuit.
          </h2>
          <p className="mt-4 text-[var(--text-muted)] text-sm max-w-[48ch] mx-auto leading-relaxed">
            Design-eye v2, design-signature, expertise-web. Les skills
            qui ont servi a generer le site au-dessus.
          </p>

          <div className="mt-10 bg-[rgba(255,255,255,0.03)] border border-[var(--border)] rounded-lg p-6">
            <div className="text-xs text-[var(--text-muted)] mb-3">
              Copie cette commande et colle-la dans ton terminal :
            </div>
            <code className="text-sm font-mono text-[var(--text)]" data-copy-target>
              npx degit AbrahamBra/claude-has-bad-taste/skills ~/.claude/skills
            </code>
            <div className="mt-4">
              <CopyButton text="npx degit AbrahamBra/claude-has-bad-taste/skills ~/.claude/skills" />
            </div>
            <div className="mt-4 text-[10px] text-[var(--text-muted)] leading-relaxed space-y-1">
              <p>
                Necessite{" "}
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
              Tu aimerais encoder ton expertise ? Reserve un appel.
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
