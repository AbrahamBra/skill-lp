"use client";

import { useState } from "react";

type Skill = {
  id: string;
  desc: string;
};

type Category = {
  name: string;
  color: string;
  skills: Skill[];
};

const CATEGORIES: Category[] = [
  {
    name: "Design & Frontend",
    color: "text-violet-400",
    skills: [
      { id: "design-eye", desc: "Calibration visuelle par références externes. Claude a mauvais goût — ce skill valide chaque choix esthétique avec toi." },
      { id: "design-signature", desc: "Effets visuels signature, règles typo, theming adaptatif. Code réel tiré de projets passés." },
      { id: "frontend-design", desc: "Interfaces production-grade avec un vrai parti pris design. Pas d'esthétique IA générique." },
      { id: "expertise-web", desc: "Composants testés, architecture de contenu, navigation, maillage interne, patterns techniques. Évolue à chaque projet." },
      { id: "animate", desc: "Animations et micro-interactions qui améliorent l'UX. Pas du décoratif." },
      { id: "motion-design", desc: "Guidance easing, timing, transitions. Pour que les composants bougent comme il faut." },
      { id: "adapt", desc: "Responsive, multi-device, multi-contexte. Expérience cohérente partout." },
      { id: "arrange", desc: "Layout, espacement, rythme visuel. Corrige les grilles monotones et la hiérarchie faible." },
      { id: "colorize", desc: "Ajoute de la couleur stratégique aux interfaces trop monochromes." },
      { id: "bolder", desc: "Amplifie les designs trop sages. Plus d'impact sans perdre l'utilisabilité." },
      { id: "quieter", desc: "Calme les designs trop agressifs. Réduit l'intensité en gardant la qualité." },
      { id: "typeset", desc: "Typo, hiérarchie, tailles, poids, lisibilité. Que le texte ait l'air voulu." },
      { id: "overdrive", desc: "Pousse l'interface au-delà des limites conventionnelles. Shaders, spring physics, scroll-driven reveals." },
      { id: "teach-impeccable", desc: "Setup one-shot : récupère le contexte design de ton projet et le sauvegarde pour toutes les sessions suivantes." },
    ],
  },
  {
    name: "Copy & Contenu",
    color: "text-sky-400",
    skills: [
      { id: "humanizer", desc: "Détecte et corrige les patterns d'écriture IA. Basé sur le guide Wikipedia \"Signs of AI writing\"." },
      { id: "copywriting", desc: "Copy marketing pour toute page : homepage, landing, pricing, feature, about. Headline, CTA, body copy." },
      { id: "content-strategy", desc: "Stratégie de contenu : quels sujets couvrir, topic clusters, planning éditorial." },
      { id: "clarify", desc: "Améliore la microcopy : messages d'erreur, labels, instructions. L'interface devient compréhensible." },
      { id: "product-marketing-context", desc: "Crée un doc de contexte marketing réutilisable par tous les autres skills. Setup une fois, utilisé partout." },
      { id: "launch-strategy", desc: "Plan de lancement produit : Product Hunt, phases, canaux, early access, waitlist." },
    ],
  },
  {
    name: "SEO & GEO",
    color: "text-emerald-400",
    skills: [
      { id: "geo", desc: "Analyse SEO orientée IA. Optimise pour ChatGPT, Claude, Perplexity, Gemini et Google AI Overviews." },
      { id: "geo-audit", desc: "Audit GEO+SEO complet avec agents parallèles. Score composite 0-100 et plan d'action priorisé." },
      { id: "geo-citability", desc: "Score de citabilité IA : probabilité que les LLMs citent ton contenu. Score 0-100 + suggestions de réécriture." },
      { id: "geo-content", desc: "Évaluation E-E-A-T (Expérience, Expertise, Autorité, Confiance) et structure du contenu." },
      { id: "geo-crawlers", desc: "Analyse d'accès des crawlers IA. Carte complète robots.txt, meta tags, headers HTTP." },
      { id: "geo-llmstxt", desc: "Génère et valide des fichiers llms.txt — le standard émergent pour aider les IA à comprendre ton site." },
      { id: "geo-schema", desc: "Audit et génération de données structurées Schema.org optimisées pour la découvrabilité IA." },
      { id: "geo-technical", desc: "Audit technique SEO : crawlabilité, indexabilité, sécurité, performance, SSR, accès crawlers IA." },
      { id: "geo-platform-optimizer", desc: "Optimisation par plateforme : Google AI Overviews, ChatGPT, Perplexity, Gemini, Bing Copilot." },
      { id: "geo-brand-mentions", desc: "Scanner de mentions de marque. Score d'autorité 0-100 sur les plateformes que les IA utilisent." },
      { id: "geo-report", desc: "Rapport GEO client-ready : scores, findings, actions priorisées en un seul livrable." },
      { id: "geo-report-pdf", desc: "Rapport PDF professionnel avec jauges, graphiques, tableaux couleur et plan d'action." },
      { id: "geo-compare", desc: "Suivi mensuel : compare deux audits, calcule les progressions, génère le rapport client." },
      { id: "geo-proposal", desc: "Génère une proposition commerciale GEO pro : executive summary, packages, pricing, timeline." },
      { id: "geo-prospect", desc: "CRM léger pour gérer le pipeline de prospects GEO : Lead → Qualifié → Proposition → Gagné." },
      { id: "seo-audit", desc: "Audit SEO technique et on-page. Diagnostic des problèmes de ranking, meta tags, structure." },
      { id: "schema-markup", desc: "Ajoute, corrige et optimise le schema markup : JSON-LD, rich snippets, FAQ, product, breadcrumb." },
      { id: "ai-seo", desc: "Optimisation contenu pour les moteurs de recherche IA. Être cité par les LLMs." },
      { id: "programmatic-seo", desc: "Pages SEO à grande échelle via templates et data. Pages par ville, comparaison, intégration." },
    ],
  },
  {
    name: "Méthode & Process",
    color: "text-amber-400",
    skills: [
      { id: "brainstorming", desc: "Exploration structurée avant toute implémentation. Clarifie l'intention, les requirements et le design." },
      { id: "writing-plans", desc: "Plans d'implémentation multi-étapes à partir d'un spec ou de requirements." },
      { id: "executing-plans", desc: "Exécution de plans avec checkpoints de review. Chaque étape validée avant la suivante." },
      { id: "systematic-debugging", desc: "Diagnostic méthodique : avant de proposer un fix, comprendre le bug." },
      { id: "test-driven-development", desc: "TDD : écrire les tests avant le code d'implémentation." },
      { id: "verification-before-completion", desc: "Vérification obligatoire avant de dire que c'est terminé. Preuve avant assertion." },
      { id: "requesting-code-review", desc: "Demande de review structurée après complétion d'une feature." },
      { id: "receiving-code-review", desc: "Réception de feedback : vérification technique avant d'implémenter les suggestions." },
      { id: "dispatching-parallel-agents", desc: "Parallélisation : lance plusieurs agents sur des tâches indépendantes." },
      { id: "finishing-a-development-branch", desc: "Guide de complétion : merge, PR ou cleanup selon le contexte." },
    ],
  },
  {
    name: "UX & Qualité",
    color: "text-rose-400",
    skills: [
      { id: "critique", desc: "Évaluation UX : hiérarchie visuelle, architecture d'info, résonance émotionnelle, feedback actionable." },
      { id: "audit", desc: "Audit complet : accessibilité, performance, theming, responsive. Rapport avec niveaux de sévérité." },
      { id: "polish", desc: "Dernière passe avant livraison. Alignement, espacement, cohérence, détails." },
      { id: "delight", desc: "Moments de joie et de personnalité dans l'interface. Passe de fonctionnel à mémorable." },
      { id: "onboard", desc: "Onboarding, empty states, première expérience utilisateur. Comprendre la valeur vite." },
      { id: "harden", desc: "Résilience : gestion d'erreurs, i18n, overflow, edge cases. Production-ready." },
      { id: "optimize", desc: "Performance : vitesse de chargement, rendu, animations, images, bundle size." },
      { id: "normalize", desc: "Normalise le design sur ton design system. Cohérence garantie." },
      { id: "extract", desc: "Extrait les composants réutilisables, tokens, patterns dans ton design system." },
      { id: "distill", desc: "Enlève la complexité inutile. Le bon design est simple et puissant." },
    ],
  },
  {
    name: "Dev & Outils",
    color: "text-orange-400",
    skills: [
      { id: "svelte-code-writer", desc: "Lookup de doc Svelte 5 et analyse de code. Obligatoire pour tout fichier .svelte." },
      { id: "supabase-postgres", desc: "Optimisation Postgres et best practices Supabase. Queries, schema, config." },
      { id: "claude-api", desc: "Build avec l'API Claude, Anthropic SDK, Agent SDK. Patterns et exemples." },
      { id: "mcp-builder", desc: "Création de serveurs MCP de qualité pour connecter des LLMs à des services externes." },
      { id: "xlsx", desc: "Lire, écrire, éditer des fichiers Excel. Formules, formatage, graphiques, nettoyage de data." },
      { id: "pptx", desc: "Créer, lire, modifier des présentations PowerPoint. Slides, layouts, speaker notes." },
      { id: "pdf", desc: "Lire, fusionner, splitter, watermarker des PDF. OCR, formulaires, extraction." },
      { id: "docx", desc: "Créer et modifier des documents Word. Table des matières, headers, mise en page pro." },
    ],
  },
];

function SkillRow({ skill, color }: { skill: Skill; color: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left group"
    >
      <div className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[rgba(255,255,255,0.03)] transition-colors">
        <span
          className={`text-[10px] font-mono transition-transform duration-200 ${open ? "rotate-90" : ""} ${color}`}
        >
          ▸
        </span>
        <code className="text-[11px] font-mono text-[var(--text)]">
          {skill.id}
        </code>
      </div>
      {open && (
        <p className="text-xs text-[var(--text-muted)] leading-relaxed pl-8 pr-3 pb-2">
          {skill.desc}
        </p>
      )}
    </button>
  );
}

export function SkillLibrary() {
  const totalSkills = CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto">
        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-6">
          {totalSkills} skills
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight mb-14">
          La bibliothèque complète.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="border border-[var(--border)] rounded-lg p-5 space-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">{cat.name}</h3>
                <span className={`text-xs font-mono ${cat.color}`}>
                  {cat.skills.length}
                </span>
              </div>
              <div className="flex flex-col">
                {cat.skills.map((skill) => (
                  <SkillRow
                    key={skill.id}
                    skill={skill}
                    color={cat.color}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
