import type { Metadata } from "next";

const CALENDLY = "https://calendly.com/a-brakha-challengerslab/echange-decouverte-challengerslab";

export const metadata: Metadata = {
  title: "Abraham Brakha — Closing · IA · LinkedIn B2B",
  description: "J'aide les startups, PMEs et solopreneurs à convertir plus avec des méthodes de closing et l'IA.",
};

export default function AgenceB2B() {
  return (
    <main style={{ background: "#fafafa", color: "#141414", fontFamily: "var(--font-sans)" }} className="min-h-screen antialiased">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #e8e8e8" }} className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-20">
        <span className="text-sm font-semibold tracking-tight" style={{ color: "#141414" }}>
          Abraham Brakha
        </span>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium uppercase tracking-widest px-5 py-2.5 transition-opacity hover:opacity-75"
          style={{ background: "#141414", color: "#fafafa" }}
        >
          Prendre un appel
        </a>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-28 pb-24 md:px-12 lg:px-20 lg:pt-40 lg:pb-36">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-widest mb-8" style={{ color: "#5b85aa" }}>
            Closing · IA · LinkedIn
          </p>
          <h1 className="text-[clamp(2.4rem,5.5vw,5rem)] leading-[1.06] tracking-tight font-bold max-w-[22ch] fade-in" style={{ color: "#141414" }}>
            Tu perds des deals pendant que tes concurrents automatisent.
          </h1>
          <p className="mt-7 text-base leading-relaxed max-w-[52ch]" style={{ color: "#555" }}>
            J'aide les startups, PMEs et solopreneurs à convertir plus — avec des méthodes de closing éprouvées, renforcées par l'IA.
          </p>
          <div className="mt-10 flex gap-4 flex-wrap items-center">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prendre un appel"
              className="text-xs font-medium uppercase tracking-widest px-7 py-3.5 transition-opacity hover:opacity-75"
              style={{ background: "#141414", color: "#fafafa" }}
            >
              Prendre un appel →
            </a>
            <span className="text-xs" style={{ color: "#999" }}>
              30 minutes, sans engagement
            </span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-20 md:px-12 lg:px-20" style={{ borderTop: "1px solid #e8e8e8" }}>
        <p className="text-xs uppercase tracking-widest mb-14" style={{ color: "#999" }}>
          Ce que je fais
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "#e8e8e8" }}>
          {[
            {
              title: "Closing",
              label: "01",
              body: "Je travaille directement sur tes calls de vente. Script, objections, timing. Les deals qui traînaient signent.",
            },
            {
              title: "Intégration IA",
              label: "02",
              body: "On intègre l'IA dans ton process commercial. Qualification, relances, suivi. Tu fais plus avec les mêmes ressources.",
            },
            {
              title: "LinkedIn Setting",
              label: "03",
              body: "Configuration de ton profil et de tes séquences. Les bons prospects voient le bon message au bon moment.",
            },
          ].map((s) => (
            <div key={s.label} className="p-8 lg:p-10" style={{ background: "#fafafa" }}>
              <span className="text-xs font-mono" style={{ color: "#5b85aa" }}>{s.label}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight" style={{ color: "#141414" }}>
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#666" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-16 md:px-12 lg:px-20" style={{ borderTop: "1px solid #e8e8e8" }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl">
          {[
            { value: "+47%", label: "taux de transformation moyen" },
            { value: "3 sem.", label: "pour les premiers résultats" },
            { value: "B2B", label: "startups · PMEs · solopreneurs" },
          ].map((stat) => (
            <div key={stat.value}>
              <div className="text-3xl font-bold tracking-tight" style={{ color: "#141414" }}>
                {stat.value}
              </div>
              <div className="mt-1 text-xs leading-relaxed" style={{ color: "#888" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section
        className="px-6 py-20 md:px-12 lg:px-20 relative overflow-hidden"
        style={{ borderTop: "1px solid #e8e8e8" }}
      >
        {/* subtle radial gradient — AI feel, #5b85aa at 6% opacity */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(91,133,170,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-2xl">
          <p className="text-xs uppercase tracking-widest mb-8" style={{ color: "#999" }}>
            Ma méthode
          </p>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] font-bold tracking-tight fade-in" style={{ color: "#141414" }}>
            L'IA traite le volume.<br />L'expertise humaine gère le reste.
          </h2>
          <div className="mt-8 space-y-5 text-sm leading-relaxed" style={{ color: "#666" }}>
            <p>
              La plupart des équipes commerciales utilisent encore les mêmes process qu'en 2019.
              Pendant ce temps, leurs prospects sont noyés sous des messages génériques.
            </p>
            <p>
              Je combine des méthodes de closing qui marchent avec des outils IA bien intégrés.
              Pas pour remplacer la relation humaine — pour lui laisser plus de place.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 md:px-12 lg:px-20" style={{ borderTop: "1px solid #e8e8e8" }}>
        <div className="max-w-xl">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] font-bold tracking-tight fade-in" style={{ color: "#141414" }}>
            30 minutes pour voir si on peut travailler ensemble.
          </h2>
          <p className="mt-5 text-sm leading-relaxed" style={{ color: "#666" }}>
            Un appel de découverte, sans pitch. Je regarde ton process actuel et je te dis ce que je ferais en premier.
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block text-xs font-medium uppercase tracking-widest px-8 py-4 transition-opacity hover:opacity-75"
            style={{ background: "#141414", color: "#fafafa" }}
            aria-label="Réserver l'appel"
          >
            Réserver l'appel →
          </a>
          <p className="mt-5 text-xs" style={{ color: "#bbb" }}>
            Réponse sous 24h.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="flex flex-col gap-3 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12 lg:px-20"
        style={{ borderTop: "1px solid #e8e8e8", color: "#aaa" }}
      >
        <span className="text-xs">© 2026 Abraham Brakha</span>
        <div className="flex gap-5 text-xs">
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="hover:text-[#141414] transition-colors">
            Prendre un appel
          </a>
          <a href="https://www.linkedin.com/in/abrahambrakha/" target="_blank" rel="noopener noreferrer" className="hover:text-[#141414] transition-colors">
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}
