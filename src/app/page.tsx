"use client";

import { useState } from "react";
import { Hero } from "@/components/hero";
import { BeforeAfter } from "@/components/before-after";
import { Questionnaire } from "@/components/questionnaire";
import { Generation } from "@/components/generation";
import type { TemplateConfig } from "@/lib/templates/types";

export default function Home() {
  const [config, setConfig] = useState<TemplateConfig | null>(null);
  const [showCta, setShowCta] = useState(false);

  return (
    <main className="min-h-screen">
      <Hero />
      <BeforeAfter />
      <Questionnaire onComplete={setConfig} />
      {config && <Generation config={config} onDone={() => setShowCta(true)} />}
    </main>
  );
}
