import type { Metadata } from "next";

const CALENDLY = "https://calendly.com/a-brakha-challengerslab/echange-decouverte-challengerslab";

export const metadata: Metadata = {
  title: "Abraham Brakha — Closing · IA · LinkedIn B2B",
  description: "Je travaille avec des startups, PMEs et solopreneurs sur leur cycle de vente — closing, IA, LinkedIn.",
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
      <nav
        style={{ borderBottom: "1px solid #e8e8e8", background: "#fafafa" }}
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 lg:px-20"
      >
        <span className="text-sm font-semibold tracking-tight" style={{ color: "#141414" }}>
          Abraham Brakha
        </span>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium uppercase tracking-widest px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          style={{ background: "#141414", color: "#fafafa", boxShadow: "0 2px 8px rgba(20,20,20,0.18)" }}
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
            Je travaille avec des startups, PMEs et solopreneurs sur leur cycle de vente. Ce qui bloque les deals, on le règle avec les bons outils IA au bon endroit.
          </p>
          <div className="mt-10 flex gap-4 flex-wrap items-center">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prendre un appel"
              className="text-xs font-medium uppercase tracking-widest px-7 py-3.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: "#141414", color: "#fafafa", boxShadow: "0 2px 8px rgba(20,20,20,0.18)" }}
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
              body: "On intègre l'IA dans ton process commercial. Qualification, relances, suivi. Tu traites plus de leads sans grossir l'équipe.",
            },
            {
              title: "LinkedIn Setting",
              label: "03",
              body: "Configuration de ton profil et de tes séquences. Tes messages arrivent à des gens qui ont une raison d'y répondre.",
            },
          ].map((s) => (
            <div key={s.label} className="p-8 lg:p-10 relative group" style={{ background: "#fafafa" }}>
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] origin-top transition-transform duration-300 scale-y-0 group-hover:scale-y-100"
                style={{ background: "#5b85aa" }}
              />
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
              Les process de vente n'ont pas bougé depuis des années. Les outils IA non plus — configurés par défaut, ils envoient les mêmes messages que tout le monde.
            </p>
            <p>
              L'IA s'occupe de la qualification et des relances. Toi, tu parles aux gens qui sont prêts à signer.
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
            className="mt-10 inline-block text-xs font-medium uppercase tracking-widest px-8 py-4 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{ background: "#141414", color: "#fafafa", boxShadow: "0 2px 8px rgba(20,20,20,0.18)" }}
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
