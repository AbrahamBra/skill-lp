"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useQuestionnaire } from "@/hooks/use-questionnaire";
import {
  PROJECT_LABELS,
  VIBE_LABELS,
} from "@/lib/templates/types";
import type { ProjectType, Vibe, TemplateConfig } from "@/lib/templates/types";

interface QuestionnaireProps {
  onComplete: (config: TemplateConfig) => void;
}

// ─── Vibe mini-swatch previews ────────────────────────────────────────────────

function VibePreview({ vibe }: { vibe: Vibe }) {
  switch (vibe) {
    case "minimal":
      return (
        <div className="flex items-center justify-center w-full h-16 bg-white border border-gray-200 rounded-md mb-3">
          <span className="text-gray-400 text-xs font-light tracking-widest uppercase">
            Aa
          </span>
        </div>
      );
    case "bold":
      return (
        <div className="flex items-center justify-center w-full h-16 bg-black rounded-md mb-3 border-2 border-red-500">
          <span className="text-red-500 text-xl font-black tracking-tight">
            Aa
          </span>
        </div>
      );
    case "dark":
      return (
        <div className="flex items-center justify-center w-full h-16 bg-gray-950 rounded-md mb-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-600/20 blur-xl" />
          <span className="relative text-purple-400 text-xl font-semibold">
            Aa
          </span>
        </div>
      );
    case "playful":
      return (
        <div className="flex items-center justify-center w-full h-16 bg-amber-50 rounded-2xl mb-3">
          <span className="text-pink-400 text-xl font-bold">Aa</span>
        </div>
      );
  }
}

// ─── Step wrapper with slide/fade transition ──────────────────────────────────

type Direction = "enter" | "exit-left" | "idle";

function StepPanel({
  visible,
  direction,
  children,
}: {
  visible: boolean;
  direction: Direction;
  children: React.ReactNode;
}) {
  const base = "absolute inset-0 transition-all duration-500 ease-in-out";
  let transform = "translate-x-0 opacity-100";
  if (!visible && direction === "exit-left")
    transform = "-translate-x-8 opacity-0 pointer-events-none";
  if (!visible && direction !== "exit-left")
    transform = "translate-x-8 opacity-0 pointer-events-none";

  return <div className={`${base} ${transform}`}>{children}</div>;
}

// Helper: map Step → numeric order for comparison
function stepToNumber(step: 1 | 2 | 3 | "done"): number {
  if (step === "done") return 4;
  return step;
}

// ─── Main component ────────────────────────────────────────────────────────────

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const { state, selectProjectType, selectVibe, submitName } =
    useQuestionnaire();

  const [nameInput, setNameInput] = useState("");
  const [prevStep, setPrevStep] = useState<typeof state.step>(1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Track previous step to determine slide direction
  useEffect(() => {
    if (state.step !== prevStep) {
      setPrevStep(state.step);
    }
  }, [state.step, prevStep]);

  // Auto-focus the name input when step 3 becomes active
  useEffect(() => {
    if (state.step === 3) {
      setTimeout(() => inputRef.current?.focus(), 520);
    }
  }, [state.step]);

  // Fire onComplete once step reaches "done"
  useEffect(() => {
    if (
      state.step === "done" &&
      state.projectType !== null &&
      state.vibe !== null
    ) {
      const config: TemplateConfig = {
        projectType: state.projectType,
        vibe: state.vibe,
        projectName: state.projectName,
      };
      console.log("[Questionnaire] done →", config);
      onComplete(config);
    }
  }, [state.step, state.projectType, state.vibe, state.projectName, onComplete]);

  const currentStep = state.step;

  const isVisible = (step: 1 | 2 | 3) => currentStep === step;

  const directionFor = (step: 1 | 2 | 3): Direction => {
    if (currentStep === step) return "idle";
    return stepToNumber(currentStep) > step ? "exit-left" : "idle";
  };

  function handleCardKey(
    e: KeyboardEvent<HTMLDivElement>,
    action: () => void,
  ) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submitName(nameInput);
  }

  // ── Render "done" success banner ────────────────────────────────────────────
  if (state.step === "done") {
    return (
      <section
        id="questionnaire"
        className="py-24 px-6 flex flex-col items-center"
      >
        <div className="max-w-lg w-full text-center space-y-6 animate-[fadeSlideUp_0.5s_ease_forwards]">
          <div className="text-5xl">✨</div>
          <h2 className="text-3xl font-bold">C'est parti !</h2>
          <p className="text-[var(--text-muted)]">
            Ton site{" "}
            <span className="text-white font-semibold">
              {state.projectName}
            </span>{" "}
            — style{" "}
            <span className="text-[var(--accent)] font-semibold capitalize">
              {state.vibe}
            </span>{" "}
            — est prêt à être généré.
          </p>
          <div className="inline-flex items-center gap-3 rounded-xl border border-[var(--border)] px-5 py-3 text-sm text-[var(--text-muted)]">
            <span>
              {state.projectType && PROJECT_LABELS[state.projectType].emoji}
            </span>
            <span>{state.projectType && PROJECT_LABELS[state.projectType].label}</span>
            <span className="opacity-30">·</span>
            <span className="capitalize">{state.vibe}</span>
            <span className="opacity-30">·</span>
            <span>{state.projectName}</span>
          </div>
        </div>
      </section>
    );
  }

  // ── Main questionnaire ──────────────────────────────────────────────────────
  return (
    <section id="questionnaire" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-10 justify-center">
          {([1, 2, 3] as const).map((n) => {
            const active = currentStep === n;
            const done = stepToNumber(currentStep) > n;
            return (
              <div key={n} className="flex items-center gap-2">
                <div
                  className={[
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300",
                    active
                      ? "bg-[var(--accent)] text-white scale-110"
                      : done
                        ? "bg-[var(--accent)]/30 text-[var(--accent)]"
                        : "bg-[var(--border)] text-[var(--text-muted)]",
                  ].join(" ")}
                >
                  {done ? "✓" : n}
                </div>
                {n < 3 && (
                  <div
                    className={[
                      "w-10 h-px transition-all duration-500",
                      stepToNumber(currentStep) > n
                        ? "bg-[var(--accent)]/50"
                        : "bg-[var(--border)]",
                    ].join(" ")}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step panels in a relative container */}
        <div className="relative min-h-[380px]">
          {/* ── Q1: Project type ── */}
          <StepPanel visible={isVisible(1)} direction={directionFor(1)}>
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-1">
                  C'est quoi ton projet ?
                </h2>
                <p className="text-[var(--text-muted)] text-sm">
                  Choisis le type qui te correspond le mieux.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(
                  Object.entries(PROJECT_LABELS) as [
                    ProjectType,
                    { emoji: string; label: string },
                  ][]
                ).map(([type, { emoji, label }]) => (
                  <div
                    key={type}
                    tabIndex={isVisible(1) ? 0 : -1}
                    role="button"
                    aria-label={label}
                    onClick={() => selectProjectType(type)}
                    onKeyDown={(e) =>
                      handleCardKey(e, () => selectProjectType(type))
                    }
                    className={[
                      "group flex items-center gap-4 rounded-xl border border-[var(--border)] px-5 py-4",
                      "cursor-pointer bg-[var(--surface)] text-left",
                      "transition-all duration-200",
                      "hover:border-[var(--accent)] hover:bg-[var(--accent)]/5",
                      "focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]",
                      "active:scale-[0.98]",
                    ].join(" ")}
                  >
                    <span className="text-3xl">{emoji}</span>
                    <span className="font-semibold text-sm leading-snug">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </StepPanel>

          {/* ── Q2: Vibe ── */}
          <StepPanel visible={isVisible(2)} direction={directionFor(2)}>
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-1">Quel vibe ?</h2>
                <p className="text-[var(--text-muted)] text-sm">
                  L'ambiance visuelle de ton site.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(
                  Object.entries(VIBE_LABELS) as [
                    Vibe,
                    { label: string; description: string },
                  ][]
                ).map(([vibe, { label, description }]) => (
                  <div
                    key={vibe}
                    tabIndex={isVisible(2) ? 0 : -1}
                    role="button"
                    aria-label={`${label} — ${description}`}
                    onClick={() => selectVibe(vibe)}
                    onKeyDown={(e) =>
                      handleCardKey(e, () => selectVibe(vibe))
                    }
                    className={[
                      "group flex flex-col rounded-xl border border-[var(--border)] px-4 py-4",
                      "cursor-pointer bg-[var(--surface)]",
                      "transition-all duration-200",
                      "hover:border-[var(--accent)] hover:bg-[var(--accent)]/5",
                      "focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]",
                      "active:scale-[0.98]",
                    ].join(" ")}
                  >
                    <VibePreview vibe={vibe} />
                    <p className="font-semibold text-sm">{label}</p>
                    <p className="text-[var(--text-muted)] text-xs mt-0.5 leading-snug">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </StepPanel>

          {/* ── Q3: Project name ── */}
          <StepPanel visible={isVisible(3)} direction={directionFor(3)}>
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-1">
                  Comment s'appelle ton projet ?
                </h2>
                <p className="text-[var(--text-muted)] text-sm">
                  Tu pourras le changer plus tard.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Ex: Studio Luna, Mon Cabinet, etc."
                  className={[
                    "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)]",
                    "px-5 py-4 text-base placeholder:text-[var(--text-muted)]",
                    "focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]",
                    "transition-colors duration-200",
                  ].join(" ")}
                />
                <button
                  type="submit"
                  className={[
                    "w-full rounded-xl bg-[var(--accent)] px-6 py-4",
                    "font-semibold text-white tracking-wide",
                    "transition-all duration-200",
                    "hover:opacity-90 active:scale-[0.98]",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]",
                  ].join(" ")}
                >
                  Générer ✦
                </button>
              </form>
            </div>
          </StepPanel>
        </div>
      </div>
    </section>
  );
}
