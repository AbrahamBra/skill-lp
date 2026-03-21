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

  const heroBg = isDark
    ? "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, transparent 60%)"
    : vibe === "bold"
    ? "linear-gradient(135deg, rgba(230,57,70,0.06) 0%, transparent 60%)"
    : vibe === "playful"
    ? "linear-gradient(135deg, rgba(244,114,182,0.1) 0%, transparent 60%)"
    : "linear-gradient(135deg, rgba(85,85,85,0.04) 0%, transparent 60%)";

  const mapBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

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
  color: var(--text);
  letter-spacing: -0.02em;
}

.nav-phone {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--accent);
}

/* Hero */
.hero {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 90px 48px 80px;
  gap: 20px;
  background: ${heroBg};
  max-width: 900px;
}

.hero h1 {
  font-family: var(--font-heading);
  font-size: clamp(2.4rem, 5.5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.hero-tagline {
  font-size: 1.1rem;
  opacity: 0.65;
  line-height: 1.7;
  max-width: 520px;
}

.hero-meta {
  display: flex;
  gap: 32px;
  margin-top: 8px;
}

.meta-item {
  text-align: center;
}

.meta-value {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.02em;
}

.meta-label {
  font-size: 0.8rem;
  opacity: 0.55;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.btn {
  display: inline-block;
  padding: 14px 32px;
  background: var(--accent);
  color: #ffffff;
  border: none;
  border-radius: var(--radius);
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
}
.btn:hover { opacity: 0.85; transform: translateY(-1px); color: #ffffff; }

/* Services */
.section {
  padding: 80px 48px;
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
  margin-bottom: 48px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.service-card {
  background: ${cardBg};
  border: ${cardBorder};
  border-radius: calc(var(--radius) * 2);
  padding: 32px 28px;
  ${hasGlass ? `backdrop-filter: ${t.glass}; -webkit-backdrop-filter: ${t.glass};` : ""}
  transition: transform 0.25s, box-shadow 0.25s;
}
.service-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }

.service-num {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--accent);
  opacity: 0.2;
  line-height: 1;
  margin-bottom: 16px;
}

.service-title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.service-desc {
  font-size: 0.9rem;
  opacity: 0.65;
  line-height: 1.65;
}

/* Contact */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
}

.info-value {
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.8;
}

.map-placeholder {
  width: 100%;
  height: 240px;
  background: ${mapBg};
  border: ${cardBorder};
  border-radius: calc(var(--radius) * 2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  color: var(--text);
  opacity: 0.4;
}

.map-icon {
  font-size: 2rem;
}

.map-text {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
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
    <span class="nav-phone">📞 01 23 45 67 89</span>
  </nav>
</div>

<!-- Block 1: Hero -->
<div class="reveal">
  <section class="hero">
    <h1>${name}</h1>
    <p class="hero-tagline">Votre partenaire de confiance depuis 2010. Nous accompagnons les entreprises dans leur développement avec expertise et engagement.</p>
    <div class="hero-meta">
      <div class="meta-item">
        <div class="meta-value">+500</div>
        <div class="meta-label">Clients</div>
      </div>
      <div class="meta-item">
        <div class="meta-value">15 ans</div>
        <div class="meta-label">d'expérience</div>
      </div>
      <div class="meta-item">
        <div class="meta-value">98%</div>
        <div class="meta-label">Satisfaction</div>
      </div>
    </div>
    <a href="#" class="btn">Prendre rendez-vous</a>
  </section>
</div>

<!-- Block 2: Services -->
<div class="reveal">
  <section class="section">
    <p class="section-label">Ce que nous faisons</p>
    <h2 class="section-title">Nos services</h2>
    <div class="grid-3">
      <div class="service-card">
        <div class="service-num">01</div>
        <h3 class="service-title">Conseil</h3>
        <p class="service-desc">Analyse stratégique approfondie et recommandations personnalisées pour optimiser vos performances et atteindre vos objectifs.</p>
      </div>
      <div class="service-card">
        <div class="service-num">02</div>
        <h3 class="service-title">Accompagnement</h3>
        <p class="service-desc">Suivi continu et support opérationnel tout au long de votre démarche. Nous sommes à vos côtés à chaque étape.</p>
      </div>
      <div class="service-card">
        <div class="service-num">03</div>
        <h3 class="service-title">Formation</h3>
        <p class="service-desc">Programmes de formation sur mesure pour renforcer les compétences de vos équipes et accélérer votre transformation.</p>
      </div>
    </div>
  </section>
</div>

<!-- Block 3: Contact -->
<div class="reveal">
  <section class="section" style="background: ${isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)"};">
    <p class="section-label">Nous trouver</p>
    <h2 class="section-title">Contactez-nous</h2>
    <div class="contact-grid">
      <div class="contact-info">
        <div class="info-item">
          <span class="info-label">Adresse</span>
          <span class="info-value">12 Rue de la République<br>75001 Paris, France</span>
        </div>
        <div class="info-item">
          <span class="info-label">Téléphone</span>
          <span class="info-value">01 23 45 67 89</span>
        </div>
        <div class="info-item">
          <span class="info-label">Horaires d'ouverture</span>
          <span class="info-value">Lundi – Vendredi : 9h – 18h<br>Samedi : 9h – 13h</span>
        </div>
        <div class="info-item">
          <span class="info-label">Email</span>
          <span class="info-value">contact@${name.toLowerCase().replace(/\s+/g, "")}.fr</span>
        </div>
      </div>
      <div class="map-placeholder">
        <span class="map-icon">📍</span>
        <span class="map-text">Carte</span>
      </div>
    </div>
  </section>
</div>

<!-- Block 4: Footer -->
<div class="reveal">
  <footer>
    <p>${name} — Tous droits réservés &copy; 2025</p>
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
