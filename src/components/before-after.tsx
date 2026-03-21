"use client";

import { useState } from "react";
import { ComparisonSlider } from "@/components/comparison-slider";
import { PROJECT_LABELS } from "@/lib/templates/types";
import type { ProjectType } from "@/lib/templates/types";
import { SCREENSHOTS } from "@/lib/before-after/screenshots";

// Ordered tab list
const TABS: ProjectType[] = ["portfolio", "saas", "business", "blog"];

// Per-type placeholder colours — used until real screenshots exist
const PLACEHOLDER_BEFORE: Record<ProjectType, string> = {
  portfolio: "from-zinc-700 via-zinc-600 to-zinc-500",
  saas:      "from-slate-800 via-slate-700 to-slate-600",
  business:  "from-stone-700 via-stone-600 to-stone-500",
  blog:      "from-neutral-700 via-neutral-600 to-neutral-500",
};

const PLACEHOLDER_AFTER: Record<ProjectType, string> = {
  portfolio: "from-violet-700 via-indigo-600 to-blue-500",
  saas:      "from-cyan-700 via-teal-600 to-emerald-500",
  business:  "from-amber-600 via-orange-500 to-rose-500",
  blog:      "from-fuchsia-700 via-pink-600 to-rose-500",
};

function BeforePlaceholder({ type }: { type: ProjectType }) {
  const gradient = PLACEHOLDER_BEFORE[type];
  const { emoji, label } = PROJECT_LABELS[type];
  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-4 select-none`}
    >
      <span className="text-5xl opacity-40">{emoji}</span>
      <div className="text-center">
        <p className="text-zinc-200 font-semibold opacity-50 text-lg">{label}</p>
        <p className="text-zinc-300 text-sm opacity-40 mt-1">Site générique — sans skills</p>
      </div>
      {/* Fake UI chrome to hint at a website screenshot */}
      <div className="absolute inset-x-8 bottom-8 space-y-2 opacity-20">
        <div className="h-2 bg-white rounded-full w-2/3" />
        <div className="h-2 bg-white rounded-full w-1/2" />
        <div className="h-2 bg-white rounded-full w-3/4" />
      </div>
    </div>
  );
}

function AfterPlaceholder({ type }: { type: ProjectType }) {
  const gradient = PLACEHOLDER_AFTER[type];
  const { emoji, label } = PROJECT_LABELS[type];
  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-4 select-none`}
    >
      <span className="text-5xl opacity-70">{emoji}</span>
      <div className="text-center">
        <p className="text-white font-semibold text-lg">{label}</p>
        <p className="text-white/70 text-sm mt-1">Généré avec les skills</p>
      </div>
      {/* Fake UI chrome */}
      <div className="absolute inset-x-8 bottom-8 space-y-2 opacity-30">
        <div className="h-2 bg-white rounded-full w-3/4" />
        <div className="h-2 bg-white rounded-full w-2/3" />
        <div className="h-2 bg-white rounded-full w-1/2" />
      </div>
    </div>
  );
}

// Check at runtime whether a screenshot file actually exists (build-time list).
// Since we don't have real images yet, we always fall back to placeholders.
// When screenshots are added to /public/screenshots/, they will automatically
// be picked up via the src props.
const SCREENSHOTS_READY = false; // flip to true once /public/screenshots/* exist

export function BeforeAfter() {
  const [activeTab, setActiveTab] = useState<ProjectType>("portfolio");

  const shots = SCREENSHOTS[activeTab];

  return (
    <section id="before-after" className="py-20 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
        {/* Heading */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Voir la différence
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl">
            Glisse le curseur pour comparer un site générique avec un site créé grâce aux skills Claude Code.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {TABS.map((type) => {
            const { emoji, label } = PROJECT_LABELS[type];
            const isActive = activeTab === type;
            return (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={[
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-white text-black shadow"
                    : "border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--text-muted)] hover:text-white",
                ].join(" ")}
              >
                <span>{emoji}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Slider */}
        <ComparisonSlider
          beforeSrc={SCREENSHOTS_READY ? shots.before : undefined}
          afterSrc={SCREENSHOTS_READY ? shots.after : undefined}
          beforeAlt={`${PROJECT_LABELS[activeTab].label} sans skills`}
          afterAlt={`${PROJECT_LABELS[activeTab].label} avec skills`}
          beforePlaceholder={<BeforePlaceholder type={activeTab} />}
          afterPlaceholder={<AfterPlaceholder type={activeTab} />}
        />

        {/* Tagline */}
        <p className="text-center text-[var(--text-muted)] text-base italic max-w-lg">
          &ldquo;Même prompt. Même IA. La différence c'est les skills.&rdquo;
        </p>
      </div>
    </section>
  );
}
