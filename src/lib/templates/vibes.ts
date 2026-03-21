import type { Vibe } from "./types";

export interface VibeTokens {
  bg: string;
  text: string;
  accent: string;
  fontHeading: string;
  fontBody: string;
  radius: string;
  grain: string;
  glass: string;
  fontImport: string;
}

export const VIBES: Record<Vibe, VibeTokens> = {
  minimal: {
    bg: "#fafafa",
    text: "#1a1a1a",
    accent: "#555555",
    fontHeading: "Inter",
    fontBody: "Inter",
    radius: "2px",
    grain: "none",
    glass: "none",
    fontImport: "",
  },
  bold: {
    bg: "#ffffff",
    text: "#000000",
    accent: "#e63946",
    fontHeading: "Outfit",
    fontBody: "Inter",
    radius: "0px",
    grain: "none",
    glass: "none",
    fontImport:
      "@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;800&display=swap');",
  },
  dark: {
    bg: "#0a0a0a",
    text: "#e0e0e0",
    accent: "#6366f1",
    fontHeading: "Space Grotesk",
    fontBody: "Inter",
    radius: "8px",
    grain: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
    glass: "blur(12px)",
    fontImport:
      "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');",
  },
  playful: {
    bg: "#fef9f0",
    text: "#2d2d2d",
    accent: "#f472b6",
    fontHeading: "Nunito",
    fontBody: "Quicksand",
    radius: "16px",
    grain: "none",
    glass: "blur(8px)",
    fontImport:
      "@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Quicksand:wght@400;500&display=swap');",
  },
};
