"use client";

const SKILLS = [
  {
    icon: "🧠",
    name: "superpowers",
    description: "Brainstorme avec toi pour comprendre ton projet",
  },
  {
    icon: "🎨",
    name: "design-signature",
    description: "Applique un style unique, pas un template générique",
  },
  {
    icon: "🏗️",
    name: "expertise-web",
    description: "Structure ton site comme un pro du web",
  },
  {
    icon: "✨",
    name: "frontend-design",
    description: "Crée des interfaces belles et fonctionnelles",
  },
  {
    icon: "✍️",
    name: "humanizer",
    description: "Rend les textes naturels, pas 'écrits par une IA'",
  },
  {
    icon: "🎬",
    name: "motion-design",
    description: "Ajoute les animations qui donnent vie",
  },
  {
    icon: "💬",
    name: "copywriting",
    description: "Écrit les textes qui parlent à tes visiteurs",
  },
  {
    icon: "🔍",
    name: "geo",
    description: "Optimise pour que Google et les IA te trouvent",
  },
];

export function SkillsPedagogy() {
  return (
    <section className="px-6 py-20" style={{ background: "var(--bg)" }}>
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Heading */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">
            Comment ça marche ?
          </h2>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            8 skills spécialisées qui travaillent ensemble
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="group rounded-xl p-5 space-y-3 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(255,255,255,0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--border)";
              }}
            >
              {/* Icon */}
              <span className="text-2xl" role="img" aria-hidden="true">
                {skill.icon}
              </span>

              {/* Skill name */}
              <p
                className="font-semibold text-sm font-mono"
                style={{ color: "var(--accent)" }}
              >
                {skill.name}
              </p>

              {/* Description */}
              <p
                className="text-sm leading-snug"
                style={{ color: "var(--text-muted)" }}
              >
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
