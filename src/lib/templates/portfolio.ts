import type { Vibe } from "./types";
import { VIBES } from "./vibes";

export function render(name: string, vibe: Vibe): string {
  const t = VIBES[vibe];
  const isDark = vibe === "dark";
  const hasGlass = t.glass !== "none";
  const hasGrain = t.grain !== "none";

  const cardBg = isDark
    ? "rgba(255,255,255,0.05)"
    : vibe === "playful"
    ? "rgba(255,255,255,0.7)"
    : vibe === "bold"
    ? "#f5f5f5"
    : "#ffffff";

  const cardBorder = isDark
    ? "1px solid rgba(255,255,255,0.1)"
    : vibe === "playful"
    ? "2px solid rgba(244,114,182,0.2)"
    : "1px solid rgba(0,0,0,0.08)";

  const navBg = isDark
    ? "rgba(10,10,10,0.85)"
    : vibe === "playful"
    ? "rgba(254,249,240,0.85)"
    : "rgba(255,255,255,0.9)";

  const btnStyle = `
    display: inline-block;
    padding: 12px 28px;
    background: var(--accent);
    color: ${isDark || vibe === "bold" ? "#ffffff" : vibe === "playful" ? "#ffffff" : "#ffffff"};
    border: none;
    border-radius: var(--radius);
    font-family: var(--font-heading);
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;
  `;

  const projectColors = ["#a78bfa", "#34d399", "#fb923c"];
  const darkProjectColors = ["#6366f1", "#10b981", "#f59e0b"];
  const pColors = isDark ? darkProjectColors : projectColors;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name}</title>
<style>
${t.fontImport}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: ${t.bg};
  --text: ${t.text};
  --accent: ${t.accent};
  --font-heading: '${t.fontHeading}', system-ui, sans-serif;
  --font-body: '${t.fontBody}', system-ui, sans-serif;
  --radius: ${t.radius};
}

html { scroll-behavior: smooth; }

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  line-height: 1.6;
  min-height: 100vh;
  ${hasGrain ? `background-image: ${t.grain}; background-size: 256px 256px;` : ""}
}

a { color: var(--text); text-decoration: none; }
a:hover { color: var(--accent); }

/* Nav */
nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 48px;
  background: ${navBg};
  backdrop-filter: ${hasGlass ? t.glass : "none"};
  -webkit-backdrop-filter: ${hasGlass ? t.glass : "none"};
  border-bottom: ${cardBorder};
}

.nav-logo {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Hero */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 100px 48px 80px;
  gap: 24px;
}

.hero h1 {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--text);
}

.hero h1 span { color: var(--accent); }

.hero-sub {
  font-size: 1.2rem;
  color: var(--text);
  opacity: 0.65;
  max-width: 480px;
  line-height: 1.7;
}

.btn {
  ${btnStyle}
}
.btn:hover { opacity: 0.85; transform: translateY(-1px); }

/* Projects */
.section {
  padding: 80px 48px;
}

.section-label {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
}

.section-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 48px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card {
  background: ${cardBg};
  border: ${cardBorder};
  border-radius: calc(var(--radius) * 2);
  overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s;
  ${hasGlass ? `backdrop-filter: ${t.glass}; -webkit-backdrop-filter: ${t.glass};` : ""}
}
.card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.12); }

.card-thumb {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  color: rgba(255,255,255,0.7);
  letter-spacing: -0.02em;
}

.card-body {
  padding: 20px 24px 24px;
}

.card-title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 0.875rem;
  opacity: 0.65;
  line-height: 1.6;
}

/* About */
.about-inner {
  max-width: 640px;
}

.about-text {
  font-size: 1.05rem;
  line-height: 1.8;
  opacity: 0.8;
  margin-bottom: 16px;
}

/* Footer */
footer {
  text-align: center;
  padding: 40px 48px;
  border-top: ${cardBorder};
  font-size: 0.875rem;
  opacity: 0.5;
}

/* Reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
</head>
<body>

<!-- Block 0: Nav -->
<div class="reveal">
  <nav>
    <span class="nav-logo">${name}</span>
    <ul class="nav-links">
      <li><a href="#">Projets</a></li>
      <li><a href="#">À propos</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</div>

<!-- Block 1: Hero -->
<div class="reveal">
  <section class="hero">
    <h1>Bienvenue chez <span>${name}</span></h1>
    <p class="hero-sub">Créations uniques, vision singulière. Je transforme vos idées en expériences digitales mémorables.</p>
    <a href="#" class="btn">Voir mes projets</a>
  </section>
</div>

<!-- Block 2: Projects -->
<div class="reveal">
  <section class="section">
    <p class="section-label">Réalisations</p>
    <h2 class="section-title">Mes projets</h2>
    <div class="grid-3">
      <div class="card">
        <div class="card-thumb" style="background: ${pColors[0]};">Alpha</div>
        <div class="card-body">
          <h3 class="card-title">Projet Alpha</h3>
          <p class="card-desc">Refonte complète d'une interface e-commerce avec focus sur l'expérience utilisateur et la conversion.</p>
        </div>
      </div>
      <div class="card">
        <div class="card-thumb" style="background: ${pColors[1]};">Beta</div>
        <div class="card-body">
          <h3 class="card-title">Projet Beta</h3>
          <p class="card-desc">Application mobile de gestion de tâches — design system, prototypage et tests utilisateurs.</p>
        </div>
      </div>
      <div class="card">
        <div class="card-thumb" style="background: ${pColors[2]};">Gamma</div>
        <div class="card-body">
          <h3 class="card-title">Projet Gamma</h3>
          <p class="card-desc">Identité visuelle et site vitrine pour une marque de mode éco-responsable.</p>
        </div>
      </div>
    </div>
  </section>
</div>

<!-- Block 3: About -->
<div class="reveal">
  <section class="section">
    <p class="section-label">L'histoire</p>
    <h2 class="section-title">À propos</h2>
    <div class="about-inner">
      <p class="about-text">Studio créatif indépendant spécialisé dans le design d'interfaces, la direction artistique et le développement web. Chaque projet est une occasion de repousser les limites du possible.</p>
      <p class="about-text">Fort de plus de 8 ans d'expérience, je travaille avec des startups, des agences et des marques internationales pour créer des expériences qui marquent les esprits.</p>
    </div>
  </section>
</div>

<!-- Block 4: Footer -->
<div class="reveal">
  <footer>
    <p>${name} &copy; 2025 — Tous droits réservés</p>
  </footer>
</div>

<script>
window.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'reveal') {
    const els = document.querySelectorAll('.reveal');
    if (els[e.data.index]) {
      els[e.data.index].classList.add('visible');
    }
  }
});
</script>
</body>
</html>`;
}
