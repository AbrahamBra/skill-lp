import type { ProjectType } from "@/lib/templates/types";

export const SCREENSHOTS: Record<ProjectType, { before: string; after: string }> = {
  portfolio: { before: "/screenshots/portfolio-before.webp", after: "/screenshots/portfolio-after.webp" },
  saas: { before: "/screenshots/saas-before.webp", after: "/screenshots/saas-after.webp" },
  business: { before: "/screenshots/business-before.webp", after: "/screenshots/business-after.webp" },
  blog: { before: "/screenshots/blog-before.webp", after: "/screenshots/blog-after.webp" },
};
