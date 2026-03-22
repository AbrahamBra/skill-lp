import { AgenceForm } from "@/components/agence-form";

export default function AgencePage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-20 border-b border-[var(--border)]">
        <a
          href="/"
          className="font-[family-name:var(--font-serif)] text-lg"
        >
          web·kit
        </a>
        <a
          href="https://cal.com"
          className="text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        >
          Réserver un appel
        </a>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-24 pb-20 md:px-12 lg:px-20 lg:pt-36 lg:pb-28">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            Tarifs
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[1.06] tracking-tight max-w-[22ch]">
            On crée ton kit complet sur-mesure.
          </h1>
          <p className="mt-8 text-[var(--text-muted)] text-base max-w-[52ch] leading-relaxed">
            Je construis une série de skills 100&nbsp;% custom à partir de ton expertise réelle.
          </p>
        </div>
      </section>

      {/* What we build */}
      <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
            {[
              {
                n: "01",
                title: "Base de connaissance",
                text: "Tes données métiers encodées. Tes process, ton vocabulaire, tes cas types. Pas une template générique.",
              },
              {
                n: "02",
                title: "Segmentation",
                text: "Par typologies de clients, cas d'usage, scénarios. Le système sait à qui il parle et comment répondre.",
              },
              {
                n: "03",
                title: "Meilleures skills du marché",
                text: "Combiné aux skills les plus puissantes et à jour. Ton expertise + les meilleurs outils disponibles.",
              },
            ].map((item) => (
              <div
                key={item.n}
                className="bg-[var(--bg)] px-6 py-8 space-y-4"
              >
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
            Résultat&nbsp;: un vrai système intelligent qui te ressemble à 100&nbsp;%, pas un simple remix.
          </p>
        </div>
      </section>

      {/* Offers */}
      <section className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

            {/* Offer 1 */}
            <div className="border border-[var(--border)] p-8 space-y-8">
              <div className="space-y-3">
                <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.4rem,2.5vw,1.9rem)] leading-tight tracking-tight">
                  Kit Complet Custom
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
                  "Base de connaissance sur tes données + segmentation",
                  "Intégration des meilleures skills du marché",
                  "Installation prête pour Claude",
                  "2 mois d'ajustements gratuits",
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
                  Kit&nbsp;+ 2 expertises
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
                  "Tout le processus custom ×2",
                  "Base de connaissance + segmentation sur les deux domaines",
                  "Skills interconnectées entre les deux expertises",
                  "Installation prête pour Claude",
                  "3 mois d'ajustements gratuits",
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

      {/* How it works */}
      <section className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-4xl">
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight mb-14">
            Comment ça marche&nbsp;?
          </h2>

          <div className="max-w-xl flex flex-col gap-0">
            {[
              {
                step: "01",
                title: "Appel découverte gratuit",
                detail: "15-20 min. On cadre ton projet, tes besoins, ton contexte.",
              },
              {
                step: "02",
                title: "On vide ton cerveau",
                detail: "Tes process, tes données, tes cas réels. Tout ce qui fait ton expertise. Pas la version LinkedIn.",
              },
              {
                step: "03",
                title: "Je construis le kit",
                detail: "4 à 6 semaines. Chaque skill est testé sur des cas réels avant livraison.",
              },
              {
                step: "04",
                title: "Tu repars avec un système",
                detail: "Installé, configuré, qui tourne tout seul. Pas besoin de comprendre comment ça marche en dessous.",
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

      {/* CTA */}
      <section className="px-6 py-24 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-4xl">
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] tracking-tight max-w-[18ch]">
            Réserve ton appel gratuit de 15-20 min.
          </h2>
          <p className="mt-5 text-[var(--text-muted)] text-sm max-w-[46ch] leading-relaxed">
            On regarde ensemble si le projet fait sens. Pas de pitch, pas de vente forcée.
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
          <a href="#" className="hover:text-[var(--text)] transition-colors">
            Mentions légales
          </a>
          <a href="#" className="hover:text-[var(--text)] transition-colors">
            Confidentialité
          </a>
        </div>
      </footer>
    </main>
  );
}
