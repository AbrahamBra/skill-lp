export default function MethodePage() {
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
        <div className="flex items-center gap-6">
          <a
            href="/methode"
            className="text-xs uppercase tracking-widest text-[var(--text)] transition-colors"
          >
            Méthode
          </a>
          <a
            href="/#get"
            className="text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            Obtenir les skills
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-24 pb-16 md:px-12 lg:px-20 lg:pt-32 lg:pb-20 border-b border-[var(--border)]">
        <div className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-6">
            Architecture
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.08] tracking-tight">
            Comment les skills fonctionnent.
          </h1>
          <p className="mt-5 text-[var(--text-muted)] text-base max-w-[52ch] leading-relaxed">
            L'architecture derrière le pack web·kit.
          </p>
        </div>
      </section>

      {/* Architecture pédagogie — migré depuis home */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-10">
            Pourquoi cette architecture
          </p>
          <div className="space-y-10">
            {[
              {
                concept: "Lecture a la demande",
                why: "Claude ne lit pas tout le skill d'un bloc a chaque conversation. Si tu lui demandes de travailler sur la navigation, il lit uniquement la partie navigation. Si tu demandes du SEO, il passe a cette section-la. La conversation reste precise, sans melanger les sujets.",
                source: { label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
              },
              {
                concept: "Filtre avant memorisation",
                why: "Quand tu dis 'c'est bon', Claude ne le garde pas automatiquement dans ses regles. Il verifie d'abord : est-ce que ca a fonctionne sur un vrai projet ? Est-ce que ca marche sur mobile ? Si oui, ca devient une regle permanente. Si non, c'est mis de cote. Pas de mauvaise pratique gravee par erreur.",
                source: { label: "shanraisshan/claude-code-best-practice", url: "https://github.com/shanraisshan/claude-code-best-practice" },
              },
              {
                concept: "Outils groupes par usage",
                why: "Certains travaux necessitent toujours les memes outils. Design et recherche de references vont ensemble. SEO et contenu aussi. Ces combinaisons sont predefinies. Claude prend ce dont il a besoin sans que tu aies a lui expliquer chaque fois.",
                source: { label: "alirezarezvani/claude-skills", url: "https://github.com/alirezarezvani/claude-skills" },
              },
            ].map((item) => (
              <div key={item.concept} className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:gap-10">
                <div className="pt-0.5">
                  <code className="text-xs font-mono text-emerald-400">{item.concept}</code>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.why}</p>
                  <a
                    href={item.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-[10px] font-mono text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                  >
                    ↗ {item.source.label}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA retour */}
      <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-sm text-[var(--text-muted)]">
            Tu veux le pack ?
          </p>
          <a
            href="/#get"
            className="text-xs uppercase tracking-widest bg-white text-[#0a0a0a] px-7 py-3.5 font-medium hover:opacity-85 transition-opacity"
          >
            Installer les skills →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-3 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12 lg:px-20 border-t border-[var(--border)]">
        <span className="text-xs text-[var(--text-muted)]">© 2026 Abraham</span>
        <div className="flex gap-5 text-xs text-[var(--text-muted)]">
          <a href="/agence" className="hover:text-[var(--text)] transition-colors">
            Kit custom sur-mesure
          </a>
          <a href="#" className="hover:text-[var(--text)] transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-[var(--text)] transition-colors">Confidentialité</a>
        </div>
      </footer>
    </main>
  );
}
