import type { Metadata } from "next";

const CALENDLY = "https://calendly.com/a-brakha-challengerslab/echange-decouverte-challengerslab";

export const metadata: Metadata = {
  title: "Abraham Brakha — Closing · IA · LinkedIn B2B",
  description: "J'aide les startups, PMEs et solopreneurs à convertir plus avec des méthodes de closing et l'IA.",
};

export default function AgenceB2B() {
  return (
    <main style={{ background: "#fafafa", color: "#141414", fontFamily: "var(--font-sans)" }} className="min-h-screen antialiased">
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
          <h1 className="text-[clamp(2.4rem,5.5vw,5rem)] leading-[1.06] tracking-tight font-bold max-w-[22ch]" style={{ color: "#141414" }}>
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
    </main>
  );
}
