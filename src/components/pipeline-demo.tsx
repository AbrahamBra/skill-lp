"use client";

import { useState } from "react";

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

type StepId = "avant" | "apres";

export function PipelineDemo() {
  const [activeId, setActiveId] = useState<StepId>("avant");

  return (
    <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-[var(--border)]">
      <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight">
        Avant / Après.
      </h2>
      <p className="mt-3 text-[var(--text-muted)] text-sm max-w-[52ch] leading-relaxed">
        Le site brut, puis le même site après humanizer + design-signature.
      </p>

      {/* Tabs */}
      <div className="mt-8 flex gap-2">
        <button
          onClick={() => setActiveId("avant")}
          className={`px-4 py-2 text-xs font-mono rounded transition-colors duration-200 ${
            activeId === "avant"
              ? "bg-[rgba(255,255,255,0.08)] text-white"
              : "text-[var(--text-muted)] hover:text-white"
          }`}
        >
          01 — Avant
        </button>
        <button
          onClick={() => setActiveId("apres")}
          className={`px-4 py-2 text-xs font-mono rounded transition-colors duration-200 ${
            activeId === "apres"
              ? "bg-[rgba(255,255,255,0.08)] text-white"
              : "text-[var(--text-muted)] hover:text-white"
          }`}
        >
          02 — Après
        </button>
      </div>

      {/* Step content */}
      <div className="mt-8 max-w-2xl">
        {activeId === "avant" ? (
          <>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-mono text-[var(--text-muted)]">→</span>
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
                Site généré brut
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-serif)] text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.15] tracking-tight">
              Le site généré.
            </h3>
            <p className="mt-3 text-[var(--text-muted)] text-sm max-w-[52ch] leading-relaxed">
              Structure, sections, copy — tout vient du brain dump. Le site est fonctionnel,
              mais le texte sonne IA et le design est générique.
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-mono text-emerald-400">✓</span>
              <span className="text-xs uppercase tracking-widest text-emerald-400">
                Humanizer + Design-signature
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-serif)] text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.15] tracking-tight">
              Le même site, en mieux.
            </h3>
            <p className="mt-3 text-[var(--text-muted)] text-sm max-w-[52ch] leading-relaxed">
              Humanizer réécrit les tournures IA. Design-signature ajoute nav sticky,
              hover states, interactions — calibrés sur la direction validée.
            </p>

            {/* Humanizer before/after examples */}
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
          </>
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
              {activeId === "avant"
                ? "abrahambrakha.fr/b2b — brut"
                : "abrahambrakha.fr/b2b — final"}
            </div>
          </div>
        </div>
        <iframe
          key={activeId}
          src={activeId === "avant" ? "/b2b-step1" : "/b2b"}
          title={`Site B2B — ${activeId === "avant" ? "Avant" : "Après"}`}
          className="w-full h-[500px] bg-white border-0"
        />
      </div>

      {activeId === "apres" && (
        <p className="mt-4 text-xs text-[var(--text-muted)]">
          Généré avec design-eye + humanizer + design-signature — 3 skills, zéro retouche manuelle.
        </p>
      )}
    </section>
  );
}
