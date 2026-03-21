export type ProjectType = "portfolio" | "saas" | "business" | "blog";

export type Vibe = "minimal" | "bold" | "dark" | "playful";

export interface TemplateConfig {
  projectType: ProjectType;
  vibe: Vibe;
  projectName: string;
}

export const PROJECT_LABELS: Record<ProjectType, { emoji: string; label: string }> = {
  business: { emoji: "🏪", label: "Business local" },
  portfolio: { emoji: "💼", label: "Portfolio / Freelance" },
  saas: { emoji: "🚀", label: "SaaS / Startup" },
  blog: { emoji: "📝", label: "Blog / Contenu" },
};

export const VIBE_LABELS: Record<Vibe, { label: string; description: string }> = {
  minimal: { label: "Minimal", description: "Fond clair, typo fine, beaucoup d'espace" },
  bold: { label: "Bold", description: "Couleurs vives, typo grasse, contrastes forts" },
  dark: { label: "Dark", description: "Fond sombre, accents lumineux, grain subtil" },
  playful: { label: "Playful", description: "Couleurs pastel, coins arrondis, icônes" },
};
