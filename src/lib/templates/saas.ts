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
    ? "#f9f9f9"
    : "#ffffff";

  const cardBorder = isDark
    ? "1px solid rgba(255,255,255,0.1)"
    : vibe === "playful"
    ? "2px solid rgba(244,114,182,0.2)"
    : "1px solid rgba(0,0,0,0.08)";

  const navBg = isDark
    ? "rgba(10,10,10,0.9)"
    : vibe === "playful"
    ? "rgba(254,249,240,0.9)"
    : "rgba(255,255,255,0.92)";

  const heroBg = isDark
    ? "radial-gradient(ellipse at 60% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)"
    : vibe === "bold"
    ? "radial-gradient(ellipse at 60% 0%, rgba(230,57,70,0.07) 0%, transparent 70%)"
    : vibe === "playful"
    ? "radial-gradient(ellipse at 60% 0%, rgba(244,114,182,0.12) 0%, transparent 70%)"
    : "radial-gradient(ellipse at 60% 0%, rgba(85,85,85,0.06) 0%, transparent 70%)";

  const pricingHighlight = isDark
    ? "rgba(99,102,241,0.15)"
    : vibe === "playful"
    ? "rgba(244,114,182,0.1)"
    : vibe === "bold"
    ? "rgba(230,57,70,0.05)"
    : "rgba(85,85,85,0.04)";

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
  padding: 16px 48px;
  background: ${navBg};
  backdrop-filter: ${hasGlass ? t.glass : "none"};
  -webkit-backdrop-filter: ${hasGlass ? t.glass : "none"};
  border-bottom: ${cardBorder};
}

.nav-logo {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.02em;
}

.nav-center {
  display: flex;
  gap: 28px;
  list-style: none;
  font-size: 0.9rem;
  font-weight: 500;
}

.btn {
  display: inline-block;
  padding: 10px 22px;
  background: var(--accent);
  color: #ffffff;
  border: none;
  border-radius: var(--radius);
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
}
.btn:hover { opacity: 0.85; transform: translateY(-1px); color: #ffffff; }

.btn-lg {
  padding: 16px 40px;
  font-size: 1.05rem;
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--accent);
  color: var(--accent);
}
.btn-outline:hover { background: var(--accent); color: #ffffff; opacity: 1; }

/* Hero */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 100px 48px 90px;
  gap: 24px;
  background: ${heroBg};
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: ${isDark ? "rgba(99,102,241,0.15)" : "rgba(0,0,0,0.05)"};
  border: ${cardBorder};
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.hero h1 {
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 5.5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  max-width: 700px;
}

.hero h1 span { color: var(--accent); }

.hero-sub {
  font-size: 1.15rem;
  opacity: 0.65;
  max-width: 500px;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
}

/* Features */
.section {
  padding: 80px 48px;
}

.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-label {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
}

.section-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.section-sub {
  margin-top: 12px;
  font-size: 1rem;
  opacity: 0.6;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feature-card {
  background: ${cardBg};
  border: ${cardBorder};
  border-radius: calc(var(--radius) * 2);
  padding: 32px 28px;
  ${hasGlass ? `backdrop-filter: ${t.glass}; -webkit-backdrop-filter: ${t.glass};` : ""}
  transition: transform 0.25s, box-shadow 0.25s;
}
.feature-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }

.feature-icon {
  font-size: 2rem;
  margin-bottom: 16px;
  display: block;
}

.feature-title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.feature-desc {
  font-size: 0.9rem;
  opacity: 0.65;
  line-height: 1.65;
}

/* Pricing */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 720px;
  margin: 0 auto;
}

.plan-card {
  background: ${cardBg};
  border: ${cardBorder};
  border-radius: calc(var(--radius) * 2);
  padding: 36px 32px;
  ${hasGlass ? `backdrop-filter: ${t.glass}; -webkit-backdrop-filter: ${t.glass};` : ""}
}

.plan-card.highlight {
  background: ${pricingHighlight};
  border-color: var(--accent);
  position: relative;
}

.plan-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 14px;
  border-radius: 100px;
}

.plan-name {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.plan-price {
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 4px;
}

.plan-price span {
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.6;
}

.plan-desc {
  font-size: 0.85rem;
  opacity: 0.55;
  margin-bottom: 24px;
}

.plan-features {
  list-style: none;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.plan-features li {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.plan-features li::before {
  content: '✓';
  color: var(--accent);
  font-weight: 700;
  flex-shrink: 0;
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
    <span class="nav-logo">${name}</span>
    <ul class="nav-center">
      <li><a href="#">Fonctionnalités</a></li>
      <li><a href="#">Tarifs</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <a href="#" class="btn">Commencer</a>
  </nav>
</div>

<!-- Block 1: Hero -->
<div class="reveal">
  <section class="hero">
    <span class="hero-badge">✦ Nouveau — v2.0 disponible</span>
    <h1><span>${name}</span> — Simplifiez votre quotidien</h1>
    <p class="hero-sub">La plateforme tout-en-un qui automatise vos processus et libère votre équipe pour ce qui compte vraiment.</p>
    <div class="hero-actions">
      <a href="#" class="btn btn-lg">Essai gratuit 14 jours</a>
      <a href="#" class="btn btn-lg btn-outline">Voir la démo</a>
    </div>
  </section>
</div>

<!-- Block 2: Features -->
<div class="reveal">
  <section class="section">
    <div class="section-header">
      <p class="section-label">Fonctionnalités</p>
      <h2 class="section-title">Tout ce dont vous avez besoin</h2>
      <p class="section-sub">Des outils puissants pensés pour votre productivité.</p>
    </div>
    <div class="grid-3">
      <div class="feature-card">
        <span class="feature-icon">⚡</span>
        <h3 class="feature-title">Ultra rapide</h3>
        <p class="feature-desc">Performances optimisées pour les équipes exigeantes. Zéro latence, résultats immédiats.</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🔒</span>
        <h3 class="feature-title">Sécurité maximale</h3>
        <p class="feature-desc">Chiffrement de bout en bout, conformité RGPD et audits de sécurité réguliers.</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">📊</span>
        <h3 class="feature-title">Analytiques avancées</h3>
        <p class="feature-desc">Tableaux de bord en temps réel pour piloter votre activité avec précision.</p>
      </div>
    </div>
  </section>
</div>

<!-- Block 3: Pricing -->
<div class="reveal">
  <section class="section" style="background: ${isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)"};">
    <div class="section-header">
      <p class="section-label">Tarifs</p>
      <h2 class="section-title">Un plan pour chaque besoin</h2>
    </div>
    <div class="pricing-grid">
      <div class="plan-card">
        <p class="plan-name">Starter</p>
        <p class="plan-price">0€ <span>/mois</span></p>
        <p class="plan-desc">Idéal pour démarrer</p>
        <ul class="plan-features">
          <li>3 projets actifs</li>
          <li>Jusqu'à 5 utilisateurs</li>
          <li>5 Go de stockage</li>
          <li>Support communautaire</li>
        </ul>
        <a href="#" class="btn btn-outline" style="display: block; text-align: center;">Commencer gratuitement</a>
      </div>
      <div class="plan-card highlight">
        <span class="plan-badge">Populaire</span>
        <p class="plan-name">Pro</p>
        <p class="plan-price">29€ <span>/mois</span></p>
        <p class="plan-desc">Pour les équipes ambitieuses</p>
        <ul class="plan-features">
          <li>Projets illimités</li>
          <li>Utilisateurs illimités</li>
          <li>100 Go de stockage</li>
          <li>Support prioritaire 24/7</li>
        </ul>
        <a href="#" class="btn" style="display: block; text-align: center;">Démarrer l'essai</a>
      </div>
    </div>
  </section>
</div>

<!-- Block 4: Footer -->
<div class="reveal">
  <footer>
    <p>${name} &copy; 2025 — Fait avec ♥ pour simplifier votre travail</p>
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
