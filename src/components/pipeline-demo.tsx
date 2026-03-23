"use client";

import { useState } from "react";

const STEPS = [
  {
    id: "01",
    label: "01 — Structure",
    badge: "Étape 01 validée",
    title: "Le site généré.",
    description:
      "Le copy vient du brain dump. La direction vient des références. Chaque choix a été validé par l'humain.",
    src: "/b2b-step1",
    urlChrome: "abrahambrakha.fr/b2b — étape 01",
    extras: null as null | "humanizer" | "design-note",
  },
  {
    id: "02",
    label: "02 — Copy",
    badge: "Étape 02 validée",
    title: "Copy & humanizer.",
    description:
      "Humanizer repère les tournures IA et les réécrit. Avant : formules génériques. Après : phrases qui ressemblent à quelqu'un qui a vraiment fait le job.",
    src: "/b2b-step2",
    urlChrome: "abrahambrakha.fr/b2b — étape 02",
    extras: "humanizer" as "humanizer",
  },
  {
    id: "03",
    label: "03 — Identité",
    badge: "Étape 03 validée",
    title: "Le site prend son identité.",
    description:
      "Design-signature entre en jeu. Nav sticky avec ombre au scroll, hover lift sur les cards, focus rings sur tous les CTAs. Chaque interaction est calibrée sur la direction validée.",
    src: "/b2b",
    urlChrome: "abrahambrakha.fr/b2b — étape 03",
    extras: "design-note" as "design-note",
  },
];

const HUMANIZER_EXAMPLES = [
  {
    label: "Hero",
    before:
      "J'aide les startups à convertir plus avec des méthodes éprouvées, renforcées par l'IA.",
    after:
      "Ce qui bloque les deals, on le règle avec les bons outils IA au bon endroit.",
  },
  {
    label: "Service 02",
    before: "Tu fais plus avec les mêmes ressources.",
    after: "Tu traites plus de leads sans grossir l'équipe.",
  },
  {
    label: "Vision",
    before:
      "Pas pour remplacer la relation humaine — pour lui laisser plus de place.",
    after:
      "L'IA s'occupe de la qualification. Toi, tu parles aux gens qui sont prêts à signer.",
  },
];

export function PipelineDemo() {
  const [activeId, setActiveId] = useState("01");
  const step = STEPS.find((s) => s.id === activeId)!;

  return (
    <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-[var(--border)]">
      <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight">
        Le pipeline en 3 étapes.
      </h2>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 flex-wrap">
        {STEPS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`px-4 py-2 text-xs font-mono rounded transition-colors duration-200 ${
              activeId === s.id
                ? "bg-[rgba(255,255,255,0.08)] text-white"
                : "text-[var(--text-muted)] hover:text-white"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Step header */}
      <div className="mt-8 max-w-2xl">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-mono text-emerald-400">✓</span>
          <span className="text-xs uppercase tracking-widest text-emerald-400">
            {step.badge}
          </span>
        </div>
        <h3 className="font-[family-name:var(--font-serif)] text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.15] tracking-tight">
          {step.title}
        </h3>
        <p className="mt-3 text-[var(--text-muted)] text-sm max-w-[52ch] leading-relaxed">
          {step.description}
        </p>

        {/* Humanizer before/after — tab 02 only */}
        {step.extras === "humanizer" && (
          <div className="mt-8 space-y-3">
            {HUMANIZER_EXAMPLES.map((ex) => (
              <div
                key={ex.label}
                className="grid grid-cols-[56px_1fr] gap-3 text-xs"
              >
                <span className="text-[var(--text-muted)] font-mono pt-2.5">
                  {ex.label}
                </span>
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
        )}
      </div>

      {/* Browser chrome + iframe */}
      <div className="mt-10 max-w-5xl border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[rgba(255,255,255,0.03)]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-[rgba(255,255,255,0.05)] rounded-md px-3 py-1 text-xs text-[var(--text-muted)] font-mono text-center">
              {step.urlChrome}
            </div>
          </div>
        </div>
        {/* key forces iframe remount on tab change — prevents stale content */}
        <iframe
          key={step.id}
          src={step.src}
          title={`Site B2B — ${step.badge}`}
          className="w-full h-[500px] bg-white border-0"
        />
      </div>

      {/* Footer note — tab 03 only */}
      {step.extras === "design-note" && (
        <p className="mt-4 text-xs text-[var(--text-muted)]">
          Nav sticky, hover states, interactions calibrées sur la direction
          validée. Généré avec design-eye + humanizer + design-signature.
        </p>
      )}
    </section>
  );
}
