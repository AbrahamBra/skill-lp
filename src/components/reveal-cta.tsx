"use client";

import { useEffect, useRef, useState } from "react";
import { CopyButton } from "@/components/copy-button";

const INSTALL_COMMAND =
  process.env.NEXT_PUBLIC_INSTALL_CMD || "npx @abraham/web-kit";

interface RevealCtaProps {
  isVisible: boolean;
}

export function RevealCta({ isVisible }: RevealCtaProps) {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger slide-up animation on first show
  useEffect(() => {
    if (isVisible && !mounted) {
      setMounted(true);
      // Slight delay so the DOM has painted the initial off-screen state
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (sectionRef.current) {
            sectionRef.current.style.opacity = "1";
            sectionRef.current.style.transform = "translateY(0)";
          }
        });
      });
      // Scroll into view after animation starts
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [isVisible, mounted]);

  if (!isVisible && !mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="px-6 py-24"
      style={{
        background: "var(--bg)",
        opacity: mounted ? undefined : 0,
        transform: mounted ? undefined : "translateY(32px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        // Initial hidden state before mount animation fires
        ...(mounted
          ? {}
          : { opacity: 0, transform: "translateY(32px)" }),
      }}
    >
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Maintenant fais-le pour de vrai.
        </h2>

        {/* Install command block + copy button */}
        <div className="space-y-4">
          <div
            className="flex items-center justify-between gap-4 rounded-xl px-5 py-4 font-mono text-sm sm:text-base"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "1px solid var(--border)",
            }}
          >
            <code
              data-copy-target
              className="flex-1 text-left truncate"
              style={{ color: "var(--text)" }}
            >
              {INSTALL_COMMAND}
            </code>
          </div>

          <CopyButton text={INSTALL_COMMAND} />
        </div>

        {/* Explainer */}
        <p className="text-base" style={{ color: "var(--text)" }}>
          Installe les skills dans Claude Code. Ouvre un nouveau chat et
          dis-lui ce que tu veux.
        </p>

        {/* Reassurance */}
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Une fois installé, Claude te posera les bonnes questions pour créer
          un site qui te ressemble.
        </p>

        {/* Secondary */}
        <p
          className="text-xs font-medium tracking-wide uppercase"
          style={{ color: "var(--text-muted)", opacity: 0.6 }}
        >
          Fonctionne avec Claude Code · Prend 30 secondes.
        </p>
      </div>
    </section>
  );
}
