// src/components/pipeline-demo.tsx
import Image from "next/image";

type Step = {
  num: string;
  label: string;
  title: string;
  desc: string;
  src: string;
  alt: string;
  url: string;
};

const FEATURED: Step = {
  num: "03",
  label: "résultat final",
  title: "Identité visuelle complète",
  desc: "Design-signature applique ta direction. Nav sticky, hover states, focus rings. Chaque interaction calibrée.",
  src: "/screenshots/step-03.png",
  alt: "Site B2B — étape 03 — identité visuelle finale",
  url: "abrahambrakha.fr/b2b — étape 03",
};

const SIDE_STEPS: Step[] = [
  {
    num: "01",
    label: "validé",
    title: "Structure & copy",
    desc: "Claude part de ton expertise — pas de ses recettes génériques.",
    src: "/screenshots/step-01.png",
    alt: "Site B2B — étape 01 — structure et copy",
    url: "abrahambrakha.fr/b2b — étape 01",
  },
  {
    num: "02",
    label: "validé",
    title: "Copy humanisé",
    desc: "Humanizer retire les tournures IA. Le texte sonne comme toi.",
    src: "/screenshots/step-02.png",
    alt: "Site B2B — étape 02 — copy humanisé",
    url: "abrahambrakha.fr/b2b — étape 02",
  },
];

function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="border border-[var(--border)] rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[rgba(255,255,255,0.03)]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-[rgba(255,255,255,0.05)] rounded-md px-3 py-1 text-xs text-[var(--text-muted)] font-mono text-center truncate">
            {url}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

function StepHeader({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xs font-mono text-[var(--text-muted)]">{num}</span>
      <span className="text-[10px] font-mono text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded">
        ✓ {label}
      </span>
    </div>
  );
}

export function PipelineDemo() {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-[var(--border)]">
      {/* Section intro */}
      <div className="mb-10">
        <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.1] tracking-tight mb-3">
          De zéro à un site en 3 étapes.
        </h2>
        <p className="text-sm text-[var(--text-muted)] max-w-[52ch] leading-relaxed">
          Tu décris ton expertise, Claude encode. Chaque étape est validée par toi avant de passer à la suivante.
        </p>
      </div>

      {/* Grid: 1 large left + 2 small right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-10 lg:gap-6 items-start">

        {/* Featured — Step 03 */}
        <div>
          <StepHeader num={FEATURED.num} label={FEATURED.label} />
          <h3 className="font-[family-name:var(--font-serif)] text-xl tracking-tight mb-2">
            {FEATURED.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5 max-w-[48ch]">
            {FEATURED.desc}
          </p>
          <BrowserChrome url={FEATURED.url}>
            <Image
              src={FEATURED.src}
              alt={FEATURED.alt}
              width={900}
              height={500}
              className="w-full h-auto"
              priority
            />
          </BrowserChrome>
        </div>

        {/* Side steps — 01 + 02 */}
        <div className="flex flex-col gap-6">
          {SIDE_STEPS.map((step) => (
            <div key={step.num}>
              <StepHeader num={step.num} label={step.label} />
              <h3 className="font-[family-name:var(--font-serif)] text-base tracking-tight mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                {step.desc}
              </p>
              <BrowserChrome url={step.url}>
                <Image
                  src={step.src}
                  alt={step.alt}
                  width={600}
                  height={280}
                  className="w-full h-auto"
                />
              </BrowserChrome>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
