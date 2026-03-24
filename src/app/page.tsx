import { AgenceForm } from "@/components/agence-form";
import { SkillDiscovery } from "@/components/skill-discovery";
import { CALENDLY_URL } from "@/lib/constants";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="grid grid-cols-3 items-center px-6 py-5 md:px-12 lg:px-20 border-b border-[var(--border)]">
        <div className="flex items-center gap-6">
          <a
            href="/skill-site-web"
            className="text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            Skills gratuits
          </a>
          <a
            href="/explore"
            className="text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            Explorer
          </a>
          <a
            href="/explore"
            className="text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            Explorer
          </a>
        </div>
        <div className="flex justify-center">
          <a href="/" className="font-[family-name:var(--font-serif)] text-lg">
            accueil
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

      {/* Hero */}
      <section className="px-6 pt-24 pb-20 md:px-12 lg:px-20 lg:pt-36 lg:pb-28">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            Skills Claude sur-mesure
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[1.06] tracking-tight max-w-[22ch]">
            Claude connaît tout.
            <br />
            <span className="text-[var(--text-muted)]">Sauf ton métier.</span>
          </h1>
          <p className="mt-8 text-[var(--text-muted)] text-base max-w-[52ch] leading-relaxed">
            Je construis des skills à partir de tes process réels. Ton vocabulaire, tes cas types, ta façon de closer. Claude arrête de deviner et commence à bosser comme toi.
          </p>
          <div className="mt-10 flex items-center gap-6 flex-wrap">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#0a0a0a] px-7 py-3.5 text-xs font-medium uppercase tracking-widest hover:opacity-85 transition-opacity"
            >
              Réserver un appel
            </a>
            <a
              href="#process"
              className="text-xs font-medium uppercase tracking-widest text-[var(--text-muted)] hover:text-white transition-colors"
            >
              Comment ça marche →
            </a>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
            {[
              {
                n: "01",
                title: "Ton expertise encodée",
                text: "Tes scripts de closing, tes grilles d'analyse, tes templates. Quand Claude rédige un email de relance, il utilise tes formulations. Pas les siennes.",
              },
              {
                n: "02",
                title: "Le contexte qui manque",
                text: "Un prospect grand compte ne reçoit pas le même message qu'un solopreneur. Claude sait à qui il parle et adapte le ton, le niveau de détail, les arguments.",
              },
              {
                n: "03",
                title: "Les bons outils par-dessus",
                text: "Tes méthodes ne vivent pas en isolation. On y branche les skills open-source qui marchent le mieux aujourd'hui. Design, SEO, copywriting, debug.",
              },
            ].map((item) => (
              <div key={item.n} className="bg-[var(--bg)] px-6 py-8 space-y-4">
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {item.n}
                </span>
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[var(--text-muted)] text-sm max-w-[58ch] leading-relaxed">
            Au final, Claude bosse comme quelqu'un qui a lu tout ce que tu sais faire.
          </p>
        </div>
      </section>

      {/* Skill Discovery */}
      <SkillDiscovery />

      {/* How it works — before tarifs */}
      <section id="process" className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-4xl">
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight mb-14">
            Comment ça marche&nbsp;?
          </h2>

          <div className="max-w-xl flex flex-col gap-0">
            {[
              {
                step: "01",
                title: "Discovery : je comprends comment tu bosses",
                detail: "On passe 2 à 3 heures ensemble. Je te pose des questions sur tes vrais cas clients, tes étapes, ton vocabulaire. Pas ce que tu mets sur LinkedIn. Ce que tu fais vraiment quand tu es face à un prospect ou un livrable.",
              },
              {
                step: "02",
                title: "Je structure ta connaissance",
                detail: "Une IA sans données structurées, c'est un stagiaire qui improvise. Je prends tout ce qu'on a extrait et je l'organise : tes typologies clients, tes arbres de décision, tes templates de réponse. Plus c'est structuré et plus il y a de volume, plus l'IA devient précise.",
              },
              {
                step: "03",
                title: "J'ajoute les meilleures skills open-source",
                detail: "Sur GitHub, il existe des centaines de skills publiques : design, SEO, copywriting, debug. Je sélectionne celles qui complètent tes skills custom et je les branche ensemble.",
              },
              {
                step: "04",
                title: "Tu récupères un système qui tourne",
                detail: "Installé dans ton Claude, testé sur tes vrais cas. C'est pas un prompt magique, c'est 15 à 25 skills qui coopèrent. Tu parles normalement, le système sait quoi faire.",
              },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                {i > 0 && (
                  <div className="absolute left-[1.3rem] -top-3 w-px h-6 bg-[var(--border)]" />
                )}
                <div className="flex gap-6 py-5 px-5 border border-[var(--border)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors mt-3">
                  <span className="text-xs font-mono text-[var(--text-muted)] flex-shrink-0 mt-0.5 w-5">
                    {item.step}
                  </span>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">{item.title}</div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarifs — after process */}
      <section id="tarifs" className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

            {/* Offer 1 */}
            <div className="border border-[var(--border)] p-8 space-y-8">
              <div className="space-y-3">
                <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.4rem,2.5vw,1.9rem)] leading-tight tracking-tight">
                  Une expertise
                </h2>
                <div className="flex items-baseline gap-3">
                  <span className="text-[2.4rem] font-light tracking-tight">2 490&nbsp;€</span>
                  <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">tout compris</span>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  Idéal pour un seul métier : closing, coaching, recrutement, fiscalité…
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  "15 à 25 skills interconnectées",
                  "Construits sur tes données, ton vocabulaire, tes cas",
                  "Skills open-source du marché intégrées",
                  "Installé et prêt à tourner dans Claude Code",
                  "2 mois d'ajustements après livraison",
                ].map((item) => (
                  <li key={item} className="text-sm text-[var(--text-muted)] pl-3 border-l border-[var(--border)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Offer 2 — featured */}
            <div className="border border-white/20 p-8 space-y-8 relative">
              <div className="absolute top-0 right-0 px-3 py-1.5 bg-white">
                <span className="text-[10px] font-medium uppercase tracking-widest text-[#0a0a0a]">
                  Le plus choisi
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.4rem,2.5vw,1.9rem)] leading-tight tracking-tight">
                  Deux expertises
                </h2>
                <div className="flex items-baseline gap-3">
                  <span className="text-[2.4rem] font-light tracking-tight">4 290&nbsp;€</span>
                  <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">tout compris</span>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  Deux domaines reliés : closing&nbsp;+ prospection, coaching&nbsp;+ marketing, juridique&nbsp;+ conformité…
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  "Tout le processus ×2",
                  "Tes deux domaines encodés, reliés entre eux",
                  "Les skills se parlent d'une expertise à l'autre",
                  "Installé et prêt à tourner dans Claude Code",
                  "3 mois d'ajustements après livraison",
                ].map((item) => (
                  <li key={item} className="text-sm text-[var(--text-muted)] pl-3 border-l border-[var(--border)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA + Form */}
      <section className="px-6 py-24 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-4xl">
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] tracking-tight max-w-[18ch]">
            Montre-moi comment tu travailles.
          </h2>
          <p className="mt-5 text-[var(--text-muted)] text-sm max-w-[46ch] leading-relaxed">
            15-20 min. Pas de pitch. Je regarde ton process et je te dis ce qu'on pourrait encoder.
          </p>
          <div className="mt-10">
            <AgenceForm />
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
