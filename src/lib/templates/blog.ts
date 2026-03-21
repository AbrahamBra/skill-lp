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
    ? "rgba(255,255,255,0.75)"
    : vibe === "bold"
    ? "#f8f8f8"
    : "#ffffff";

  const cardBorder = isDark
    ? "1px solid rgba(255,255,255,0.1)"
    : vibe === "playful"
    ? "2px solid rgba(244,114,182,0.2)"
    : "1px solid rgba(0,0,0,0.08)";

  const navBg = isDark
    ? "rgba(10,10,10,0.9)"
    : vibe === "playful"
    ? "rgba(254,249,240,0.92)"
    : "rgba(255,255,255,0.93)";

  const featuredBg = isDark
    ? "rgba(255,255,255,0.04)"
    : vibe === "playful"
    ? "rgba(255,255,255,0.8)"
    : vibe === "bold"
    ? "#f5f5f5"
    : "#f7f7f7";

  const accentThumb = isDark ? "#6366f1" : t.accent;

  const recentDates = ["12 mars 2025", "5 mars 2025", "28 fév. 2025"];
  const recentTitles = [
    "10 outils indispensables pour créer votre site web",
    "Pourquoi le design minimaliste convertit mieux",
    "SEO en 2025 : ce qui change vraiment",
  ];
  const recentExcerpts = [
    "Notre sélection des meilleurs outils pour lancer votre présence en ligne rapidement.",
    "Moins c'est plus — comment la simplicité peut doubler vos conversions.",
    "Les algorithmes évoluent, vos stratégies aussi. Voici ce qui compte aujourd'hui.",
  ];

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

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

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
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.02em;
}

.nav-logo span { color: var(--accent); }

.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-links a { color: var(--text); }
.nav-links a:hover { color: var(--accent); text-decoration: none; }

/* Hero */
.hero {
  padding: 80px 48px 60px;
  border-bottom: ${cardBorder};
}

.hero-inner {
  max-width: 780px;
}

.hero-kicker {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}

.hero h1 {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}

.hero-sub {
  font-size: 1.1rem;
  opacity: 0.6;
  line-height: 1.75;
  max-width: 520px;
  margin-bottom: 32px;
}

.hero-stats {
  display: flex;
  gap: 32px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--accent);
}

.stat-label {
  font-size: 0.78rem;
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Featured */
.section {
  padding: 64px 48px;
}

.section-label {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 24px;
}

.featured-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  background: ${featuredBg};
  border: ${cardBorder};
  border-radius: calc(var(--radius) * 2);
  overflow: hidden;
  ${hasGlass ? `backdrop-filter: ${t.glass}; -webkit-backdrop-filter: ${t.glass};` : ""}
  transition: box-shadow 0.25s;
}
.featured-card:hover { box-shadow: 0 20px 60px rgba(0,0,0,0.12); }

.featured-thumb {
  background: ${accentThumb};
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.featured-thumb-text {
  font-family: var(--font-heading);
  font-size: 4rem;
  font-weight: 800;
  color: rgba(255,255,255,0.15);
  letter-spacing: -0.04em;
  user-select: none;
}

.featured-content {
  padding: 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}

.article-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: var(--accent);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: 100px;
  width: fit-content;
}

.article-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.article-excerpt {
  font-size: 0.95rem;
  opacity: 0.65;
  line-height: 1.7;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.82rem;
  opacity: 0.5;
}

.read-link {
  font-weight: 700;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent);
}
.read-link:hover { text-decoration: none; gap: 10px; }

/* Recent articles */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.small-card {
  background: ${cardBg};
  border: ${cardBorder};
  border-radius: calc(var(--radius) * 2);
  overflow: hidden;
  ${hasGlass ? `backdrop-filter: ${t.glass}; -webkit-backdrop-filter: ${t.glass};` : ""}
  transition: transform 0.25s, box-shadow 0.25s;
  display: flex;
  flex-direction: column;
}
.small-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }

.small-thumb {
  height: 120px;
  background: ${isDark ? "rgba(99,102,241,0.2)" : "rgba(0,0,0,0.06)"};
}

.small-card-body {
  padding: 20px 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.article-date {
  font-size: 0.78rem;
  color: var(--accent);
  font-weight: 600;
  opacity: 0.8;
}

.small-title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35;
}

.small-excerpt {
  font-size: 0.85rem;
  opacity: 0.6;
  line-height: 1.6;
  flex: 1;
}

.small-link {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--accent);
  margin-top: 4px;
}

/* Footer */
footer {
  text-align: center;
  padding: 40px 48px;
  border-top: ${cardBorder};
  font-size: 0.875rem;
  opacity: 0.45;
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
    <span class="nav-logo"><span>${name.charAt(0)}</span>${name.slice(1)}</span>
    <ul class="nav-links">
      <li><a href="#">Articles</a></li>
      <li><a href="#">Catégories</a></li>
      <li><a href="#">Newsletter</a></li>
      <li><a href="#">À propos</a></li>
    </ul>
  </nav>
</div>

<!-- Block 1: Hero -->
<div class="reveal">
  <section class="hero">
    <div class="hero-inner">
      <p class="hero-kicker">Le blog</p>
      <h1>${name}</h1>
      <p class="hero-sub">Idées, réflexions et découvertes. Un regard curieux sur le monde du web, du design et de l'entrepreneuriat.</p>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-value">48</span>
          <span class="stat-label">Articles</span>
        </div>
        <div class="stat">
          <span class="stat-value">12k</span>
          <span class="stat-label">Lecteurs</span>
        </div>
        <div class="stat">
          <span class="stat-value">3</span>
          <span class="stat-label">Catégories</span>
        </div>
      </div>
    </div>
  </section>
</div>

<!-- Block 2: Featured article -->
<div class="reveal">
  <section class="section">
    <p class="section-label">À la une</p>
    <div class="featured-card">
      <div class="featured-thumb">
        <span class="featured-thumb-text">★</span>
      </div>
      <div class="featured-content">
        <span class="article-label">✦ Article à la une</span>
        <h2 class="article-title">Le guide complet pour bien démarrer votre présence en ligne</h2>
        <p class="article-excerpt">De la stratégie au lancement — tout ce que vous devez savoir pour créer une présence digitale qui attire et convertit. Un guide pratique en 7 étapes.</p>
        <div class="article-meta">
          <span>18 mars 2025</span>
          <span>·</span>
          <span>8 min de lecture</span>
        </div>
        <a href="#" class="read-link">Lire la suite →</a>
      </div>
    </div>
  </section>
</div>

<!-- Block 3: Recent articles -->
<div class="reveal">
  <section class="section" style="padding-top: 0;">
    <p class="section-label">Articles récents</p>
    <div class="grid-3">
      ${recentDates
        .map(
          (date, i) => `
      <div class="small-card">
        <div class="small-thumb"></div>
        <div class="small-card-body">
          <span class="article-date">${date}</span>
          <h3 class="small-title">${recentTitles[i]}</h3>
          <p class="small-excerpt">${recentExcerpts[i]}</p>
          <a href="#" class="small-link">Lire →</a>
        </div>
      </div>`
        )
        .join("")}
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
