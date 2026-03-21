"use client";

import { useEffect, useState, useRef } from "react";

interface TerminalProps {
  isRunning: boolean;
  onStepComplete: (index: number) => void;
  onDone: () => void;
}

const LINES = [
  { text: "▸ Création du hero...", delay: 0 },
  { text: "▸ Application du style...", delay: 1200 },
  { text: "▸ Construction de la navigation...", delay: 2400 },
  { text: "▸ Ajout des sections...", delay: 3600 },
  { text: "▸ Touches finales...", delay: 5000 },
];

const FINAL_LINE = { text: "✓ Terminé !", delay: 6000 };

export function Terminal({ isRunning, onStepComplete, onDone }: TerminalProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!isRunning) return;

    // Reset state when starting
    setRevealedCount(0);
    setShowFinal(false);

    // Clear any existing timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Schedule each line reveal
    LINES.forEach((line, index) => {
      const t = setTimeout(() => {
        setRevealedCount((prev) => prev + 1);
        onStepComplete(index);
      }, line.delay);
      timeoutsRef.current.push(t);
    });

    // Schedule final line
    const finalT = setTimeout(() => {
      setShowFinal(true);
      onDone();
    }, FINAL_LINE.delay);
    timeoutsRef.current.push(finalT);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [isRunning]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalRevealed = revealedCount + (showFinal ? 1 : 0);

  return (
    <div
      className="rounded-xl overflow-hidden font-mono text-sm"
      style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* macOS-style header bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: "#1a1a1a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: "#ff5f57" }}
        />
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: "#febc2e" }}
        />
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: "#28c840" }}
        />
        <span
          className="ml-3 text-xs"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          claude-builder — zsh
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-4 space-y-1.5" style={{ minHeight: "200px" }}>
        {LINES.map((line, index) => {
          const revealed = index < revealedCount;
          return (
            <div
              key={index}
              className="flex items-start gap-2 transition-all duration-300"
              style={{
                color: revealed ? "#4ade80" : "rgba(255,255,255,0.2)",
                opacity: revealed ? 1 : 0.5,
              }}
            >
              <span className="select-none" style={{ flexShrink: 0 }}>
                {revealed ? "" : "○"}
              </span>
              <span>{revealed ? line.text : line.text.replace("▸", "○")}</span>
            </div>
          );
        })}

        {/* Final line */}
        {showFinal && (
          <div
            className="flex items-center gap-2 font-bold"
            style={{ color: "#4ade80" }}
          >
            <span>{FINAL_LINE.text}</span>
          </div>
        )}

        {/* Blinking cursor after last revealed line */}
        {isRunning && !showFinal && totalRevealed > 0 && (
          <div
            className="flex items-center gap-1"
            style={{ color: "#4ade80" }}
          >
            <span
              className="inline-block w-2 h-4"
              style={{
                background: "#4ade80",
                animation: "blink 1s step-end infinite",
              }}
            />
          </div>
        )}

        {/* Cursor stays visible after done */}
        {showFinal && (
          <div className="flex items-center gap-1" style={{ color: "#4ade80" }}>
            <span
              className="inline-block w-2 h-4"
              style={{
                background: "#4ade80",
                animation: "blink 1s step-end infinite",
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
