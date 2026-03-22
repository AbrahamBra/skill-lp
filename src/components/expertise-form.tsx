"use client";

import { useState, useEffect, useRef } from "react";

const steps = [
  {
    id: "metier",
    question: "C'est quoi ton metier ?",
    placeholder: "Ex: closer B2B, coach sportif, avocat fiscaliste, UX designer...",
    type: "text" as const,
  },
  {
    id: "repetes",
    question: "Qu'est-ce que tu repetes tout le temps ?",
    placeholder: "Les process, les conseils, les frameworks que tu donnes a chaque client...",
    type: "textarea" as const,
  },
  {
    id: "clone",
    question: "Si tu pouvais cloner ta facon de bosser, ca ressemblerait a quoi ?",
    placeholder: "Un assistant qui sait faire X, qui applique toujours Y, qui evite Z...",
    type: "textarea" as const,
  },
  {
    id: "email",
    question: "Ou on t'envoie ca ?",
    placeholder: "ton@email.com",
    type: "email" as const,
  },
];

export function ExpertiseForm() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    // Focus input on step change
    const timer = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, [current]);

  const step = steps[current];
  const value = answers[step?.id] || "";
  const progress = submitted ? 100 : (current / steps.length) * 100;

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  async function next() {
    if (!value.trim()) return;
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      setSubmitted(true);
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers),
        });
      } catch {
        // Silently fail — we already show confirmation
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && step.type !== "textarea") {
      e.preventDefault();
      next();
    }
    if (e.key === "Enter" && e.metaKey && step.type === "textarea") {
      e.preventDefault();
      next();
    }
  }

  if (submitted) {
    return (
      <div className="text-center space-y-4 py-8 animate-in fade-in duration-500">
        <div className="text-2xl font-[family-name:var(--font-serif)]">
          Recu.
        </div>
        <p className="text-sm text-[var(--text-muted)] max-w-[40ch] mx-auto">
          On regarde ton projet et on te recontacte sous 48h avec une analyse
          de ce qu'on peut encoder pour toi.
        </p>
        <p className="text-xs text-[var(--text-subtle)]">
          Temps de completion : {formatTime(elapsed)}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1 h-px bg-[var(--border)] mr-4 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-white/40 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-[var(--text-subtle)] tabular-nums">
          {current + 1}/{steps.length} · {formatTime(elapsed)}
        </span>
      </div>

      {/* Question */}
      <div
        key={step.id}
        className="animate-in fade-in slide-in-from-bottom-2 duration-400"
      >
        <label className="block font-[family-name:var(--font-serif)] text-lg mb-4">
          {step.question}
        </label>

        {step.type === "textarea" ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={(e) =>
              setAnswers({ ...answers, [step.id]: e.target.value })
            }
            onKeyDown={handleKeyDown}
            placeholder={step.placeholder}
            rows={3}
            className="w-full bg-transparent border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-white/30 transition-colors resize-none"
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={step.type === "email" ? "email" : "text"}
            value={value}
            onChange={(e) =>
              setAnswers({ ...answers, [step.id]: e.target.value })
            }
            onKeyDown={handleKeyDown}
            placeholder={step.placeholder}
            className="w-full bg-transparent border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-white/30 transition-colors"
          />
        )}

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => current > 0 && setCurrent(current - 1)}
            className={`text-xs text-[var(--text-subtle)] hover:text-[var(--text-muted)] transition-colors ${current === 0 ? "invisible" : ""}`}
          >
            ← Retour
          </button>
          <button
            onClick={next}
            disabled={!value.trim()}
            className="text-xs font-medium uppercase tracking-widest px-6 py-2.5 bg-white text-[#0a0a0a] disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-85 transition-opacity"
          >
            {current === steps.length - 1 ? "Envoyer" : "Suivant →"}
          </button>
        </div>
      </div>
    </div>
  );
}
