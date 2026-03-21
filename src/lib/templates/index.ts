import type { ProjectType, Vibe } from "./types";
import { render as renderPortfolio } from "./portfolio";
import { render as renderSaas } from "./saas";
import { render as renderBusiness } from "./business";
import { render as renderBlog } from "./blog";

const TEMPLATES: Record<ProjectType, (name: string, vibe: Vibe) => string> = {
  portfolio: renderPortfolio,
  saas: renderSaas,
  business: renderBusiness,
  blog: renderBlog,
};

export function renderTemplate(projectType: ProjectType, name: string, vibe: Vibe): string {
  return TEMPLATES[projectType](name, vibe);
}
