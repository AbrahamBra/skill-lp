"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "@/components/terminal";
import { renderTemplate } from "@/lib/templates";
import type { TemplateConfig } from "@/lib/templates/types";

interface GenerationProps {
  config: TemplateConfig | null;
  onDone: () => void;
}

export function Generation({ config, onDone }: GenerationProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isDone, setIsDone] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string>("");

  // Auto-scroll into view when config appears
  useEffect(() => {
    if (config && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [config]);

  // Render template when config changes
  useEffect(() => {
    if (config) {
      const html = renderTemplate(config.projectType, config.projectName, config.vibe);
      setHtmlContent(html);
      setIsDone(false);
      setIsRunning(false);
      // Small delay before starting terminal so iframe loads first
      setTimeout(() => {
        setIsRunning(true);
      }, 400);
    }
  }, [config]);

  function handleStepComplete(index: number) {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: "reveal", index }, "*");
    }
  }

  function handleDone() {
    setIsDone(true);
    onDone();
  }

  if (!config) return null;

  return (
    <section
      ref={sectionRef}
      className="px-6 py-16"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Section heading */}
        <div className="text-center space-y-2">
          <h2
            className="text-2xl font-bold transition-all duration-500"
            style={{ color: isDone ? "#4ade80" : "var(--text)" }}
          >
            {isDone ? "Ton site est prêt !" : "Génération en cours..."}
          </h2>
          {!isDone && (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Construction de ton site — {config.projectName}
            </p>
          )}
          {isDone && (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Voici un aperçu de ton site{" "}
              <span style={{ color: "var(--accent)" }}>{config.projectName}</span>
            </p>
          )}
        </div>

        {/* Split layout: terminal + iframe */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Terminal — 1/3 on desktop, full width on mobile */}
          <div className="w-full md:w-1/3" style={{ maxHeight: "200px" }} data-mobile-terminal>
            <div className="md:max-h-none" style={{ maxHeight: "inherit" }}>
              <Terminal
                isRunning={isRunning}
                onStepComplete={handleStepComplete}
                onDone={handleDone}
              />
            </div>
          </div>

          {/* iframe — 2/3 on desktop, full width on mobile */}
          <div className="w-full md:w-2/3">
            <div
              className="w-full rounded-xl overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
              }}
            >
              <iframe
                ref={iframeRef}
                srcDoc={htmlContent}
                className="w-full"
                style={{
                  aspectRatio: "16 / 9",
                  maxWidth: "800px",
                  display: "block",
                  border: "none",
                  overflowY: "auto",
                }}
                title="Aperçu du site généré"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
