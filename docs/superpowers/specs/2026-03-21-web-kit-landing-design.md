# Web Kit — Landing Page Design Spec

## Résumé

Landing page interactive qui convainc des non-techniques d'installer un pack de skills Claude Code pour générer des sites web professionnels. Le visiteur vit l'expérience sur la page (démo interactive), puis installe les skills pour le faire en vrai chez lui.

## Cible

**Vibe coders / non-techniques.** Des gens qui ont découvert Claude Code et veulent créer un site sans coder. Zéro jargon technique. Le message parle de résultat, pas de process.

## Langue

**Français.** Toute la landing page, le copy, les messages de la simulation terminal, et les instructions d'installation sont en français. La cible est francophone. Les noms de skills et la commande npm restent en anglais (ce sont des noms propres techniques).

Messages terminal de la simulation :
- `▸ Création du hero...`
- `▸ Application du style...`
- `▸ Construction de la navigation...`
- `▸ Ajout des sections...`
- `▸ Touches finales...`

## Stack technique

- **Next.js** (App Router)
- **Tailwind CSS**
- **Hébergement :** Vercel (plan gratuit)
- **Repo :** GitHub
- **Coût :** 0€ (hors domaine custom optionnel)
- **Pas de backend, pas de base de données, pas d'API externe**

## Architecture de la page

Une seule page, scroll vertical, 5 sections :

### Section 1 — Hero

- Fond sombre, minimal
- **Titre :** "Ton site pro en 3 questions."
- **Sous-titre :** Une ligne expliquant que c'est Claude Code + des skills, pas du code
- **2 boutons :**
  - "Essayer la démo" → scroll vers le questionnaire (section 3)
  - "Voir l'avant/après" → scroll vers le toggle (section 2)
- Pas de navbar — one-page, le scroll fait tout

### Section 2 — Avant/Après (toggle)

- **Image-comparison slider** (type "Twenty Twenty") — un diviseur vertical draggable qui révèle le "avant" et "après" superposés
- **Gauche :** site généré par Claude Code sans skills (générique, Bootstrap-like, pas de personnalité)
- **Droite :** même prompt avec les skills (typo soignée, effets, spacing, personnalité)
- **Texte sous le toggle :** "Même prompt. Même IA. La différence c'est les skills."
- **4 exemples switchables :** Portfolio, SaaS, Business local, Blog
  - Boutons/tabs au-dessus du slider pour changer d'exemple
  - Chaque exemple a sa version "sans" et "avec" skills
- **Les avant/après sont des screenshots statiques** (images optimisées WebP) des templates de la section 4. Pas de live rendering ici — ça doit charger instantanément
- **Pas de photos stock ni vidéos de fond** — le contraste vient du design pur (typo, spacing, couleurs, effets grain/glassmorphism)

**Adaptation mobile :** Le slider fonctionne au touch. Sur viewport < 640px, le diviseur est horizontal (avant en haut, après en bas) au lieu de vertical.

### Section 3 — Questionnaire interactif (3 questions)

Le coeur de la démo. Le visiteur répond et déclenche la "génération".

**Question 1 — "C'est quoi ton projet ?"**
- Choix visuels cliquables (cards) :
  - 🏪 Business local
  - 💼 Portfolio / Freelance
  - 🚀 SaaS / Startup
  - 📝 Blog / Contenu

**Question 2 — "Quel vibe ?"**
- Moodboards cliquables (mini-previews avec couleurs/typo représentatives) :
  - Minimal — fond blanc, typo fine, beaucoup d'espace
  - Bold — couleurs vives, typo grasse, contrastes forts
  - Dark — fond sombre, accents lumineux, grain subtil
  - Playful — couleurs pastel, coins arrondis, icônes

**Question 3 — "Comment s'appelle ton projet ?"**
- Input texte libre
- Placeholder : "Ex: Studio Luna, Mon Cabinet, etc."
- Bouton "Générer" pour lancer l'animation
- **Si l'input est vide**, on utilise "Mon Projet" comme nom par défaut

Chaque question apparaît séquentiellement (la suivante slide après réponse). **Pas de retour arrière** — le flow est linéaire et rapide. Le visiteur peut recharger la page pour recommencer.

### Section 4 — Génération live

L'animation spectacle, déclenchée après la 3e réponse.

**Layout desktop (>= 768px) — Split screen :**
- **Gauche :** terminal style Claude Code qui déroule des lignes
- **Droite :** iframe preview qui se construit progressivement

**Layout mobile (< 768px) — Stacked :**
- Terminal en haut (hauteur réduite, 4-5 lignes visibles)
- Preview en dessous (prend la majorité de l'écran)

**Séquence d'animation (durée totale : ~6 secondes) :**

| Temps | Terminal | Preview |
|-------|---------|---------|
| 0.0s | `▸ Création du hero...` | Nav apparaît (fade-in) |
| 1.2s | `▸ Application du style...` | Hero apparaît avec le nom du projet |
| 2.4s | `▸ Construction de la navigation...` | Les couleurs/typo du vibe s'appliquent |
| 3.6s | `▸ Ajout des sections...` | Sections de contenu apparaissent (stagger 200ms) |
| 5.0s | `▸ Touches finales...` | Effets finaux (grain, glassmorphism, animations) |
| 6.0s | `✓ Terminé !` | Site complet, transition vers section 5 |

**Système de templates :**

Chaque template est une chaîne HTML stockée dans un fichier TypeScript (`/lib/templates/`). Le rendu se fait via `srcdoc` sur l'iframe.

```
/lib/templates/
  portfolio.ts    → export function render(name: string, vibe: Vibe): string
  saas.ts         → export function render(name: string, vibe: Vibe): string
  business.ts     → export function render(name: string, vibe: Vibe): string
  blog.ts         → export function render(name: string, vibe: Vibe): string
  vibes.ts        → export des CSS custom properties par vibe
```

**Chaque fonction `render()`** retourne un document HTML complet (avec `<style>` inline) contenant :
- La nav avec le nom du projet
- Un hero
- 2-3 sections de contenu (adaptées au type de projet)
- Un footer

**L'animation progressive** fonctionne par classes CSS. Le HTML complet est chargé dans l'iframe dès le début, mais chaque bloc a `opacity: 0` par défaut. Un script dans l'iframe écoute des `postMessage` de la page parent pour reveal chaque bloc au bon timing.

**Mapping des vibes (CSS custom properties dans `vibes.ts`) :**

| Variable | Minimal | Bold | Dark | Playful |
|----------|---------|------|------|---------|
| `--bg` | `#fafafa` | `#ffffff` | `#0a0a0a` | `#fef9f0` |
| `--text` | `#1a1a1a` | `#000000` | `#e0e0e0` | `#2d2d2d` |
| `--accent` | `#555555` | `#e63946` | `#6366f1` | `#f472b6` |
| `--font-heading` | `Inter` | `Outfit` | `Space Grotesk` | `Nunito` |
| `--font-body` | `Inter` | `Inter` | `Inter` | `Quicksand` |
| `--radius` | `2px` | `0px` | `8px` | `16px` |
| `--grain` | `none` | `none` | `url(grain.svg)` | `none` |
| `--glass` | `none` | `none` | `blur(12px)` | `blur(8px)` |

Les fonts sont chargées depuis Google Fonts dans le `<style>` du template.

**Dimensions iframe :** aspect-ratio 16/9, max-width 800px, scrollable verticalement.

### Section 5 — Reveal + CTA d'installation

Après la génération :

- Le site "généré" s'affiche en plus grand (l'iframe s'expand vers ~90vw)
- **Overlay qui slide depuis le bas :** "Maintenant fais-le pour de vrai."
- **Commande d'installation :**
  ```
  npx @abraham/web-kit
  ```
- **Texte explicatif :** "Installe les skills dans Claude Code. Ouvre un nouveau chat, dis-lui ce que tu veux, et il te pose les mêmes questions."
- **Bouton "Copier la commande"** — utilise `navigator.clipboard.writeText()`, avec un feedback visuel (le texte du bouton passe de "Copier" à "Copié !" pendant 2s). Fallback : sélection automatique du texte si Clipboard API non supportée.
- Texte secondaire : "Fonctionne avec Claude Code. Prend 30 secondes."

**Note :** Le package npm `@abraham/web-kit` est un livrable séparé. Tant qu'il n'est pas publié sur npm, la commande affichée sera remplacée par des instructions manuelles (lien GitHub + commandes `git clone`).

## Pack de skills installé

La commande `npx @abraham/web-kit` installe l'ensemble complet dans `~/.claude/skills/` :

| Skill | Rôle |
|-------|------|
| design-signature | Effets visuels, typo, palette, theming adaptatif |
| expertise-web | Composants, ARIA, patterns web, maillage interne |
| frontend-design | Composants production-grade, interfaces distinctives |
| motion-design | Animations, transitions, micro-interactions |
| humanizer | Textes naturels, supprime les marqueurs IA |
| copywriting | Copy marketing des pages |
| superpowers | Plugin complet (brainstorming, TDD, debugging, plans, etc.) |
| geo | SEO/GEO du site généré |

L'utilisateur n'a pas besoin de savoir ce que chaque skill fait. Claude Code les utilise automatiquement.

### Mécanisme d'installation

Le package npm `@abraham/web-kit` :
1. Détecte si `~/.claude/skills/` existe (le crée sinon)
2. Copie tous les fichiers de skills dans le dossier
3. Détecte si superpowers est déjà installé (plugin vs skill)
4. Affiche un message de succès avec les prochaines étapes :
   - "Ouvre Claude Code"
   - "Dis-lui : crée-moi un site pour [ton projet]"
   - "Réponds à ses questions"

## Principes de design

- **Zéro jargon** — pas de "composants", "framework", "responsive". Juste "ton site", "tes questions", "ton résultat"
- **Le site est la démo** — chaque effet visible (grain, glassmorphism, typo, animations) prouve la qualité des skills
- **Dark mode par défaut** — cohérent avec l'univers terminal / Claude Code
- **Mobile-friendly** — le layout s'adapte (split → stack, slider vertical → horizontal), mais l'expérience optimale reste desktop. Les vibe coders auront besoin d'un desktop pour utiliser Claude Code de toute façon.
- **Performance** — pas de vidéos lourdes, pas de dépendances externes, tout en CSS/HTML pur
- **Accessibilité** — navigation clavier pour le questionnaire (tab + enter), aria-labels sur le slider et les boutons, texte alt sur les screenshots avant/après

## SEO et partage social

- **Title :** "Web Kit — Ton site pro en 3 questions"
- **Meta description :** "Installe les skills Claude Code et génère un site professionnel en répondant à 3 questions. Sans coder."
- **Open Graph image :** Screenshot du avant/après (Portfolio, vibe Dark) — 1200x630px
- **Twitter card :** summary_large_image

## Avant/Après — Contenu des exemples

### Portfolio (sans skills)
- Font système, pas de hiérarchie visuelle
- Couleurs par défaut, pas de palette
- Layout générique centré
- Aucun effet, aucune personnalité

### Portfolio (avec skills)
- Typo signée (serif + sans-serif)
- Palette cohérente avec accent
- Effets grain, glassmorphism sur les cards
- Animations d'entrée staggerées
- Spacing et rythme vertical maîtrisés

### SaaS (sans skills)
- Template Bootstrap-like
- Hero avec stock photo placeholder
- Boutons bleus génériques
- Pricing table basique

### SaaS (avec skills)
- Hero avec gradient + grain
- Cards glassmorphism pour le pricing
- Micro-interactions sur les boutons
- Typo distinctive, pas de stock photo

### Business local (sans skills)
- Site WordPress-like
- Carousel en haut
- Texte centré partout
- Footer surchargé

### Business local (avec skills)
- Layout asymétrique élégant
- Map placeholder intégrée proprement
- Typographie lisible et chaleureuse
- CTA clair et unique

### Blog (sans skills)
- Layout deux colonnes basique (sidebar + contenu)
- Typo monochrome, pas de hiérarchie
- Sidebar encombrée (archives, tags, recent posts)
- Aucun rythme de lecture

### Blog (avec skills)
- Layout single-column focalisé sur la lecture
- Typo avec serif pour le corps, sans-serif pour les titres
- Spacing généreux, rythme vertical maîtrisé
- Cards articles avec hover subtil

## Ce qui est hors scope

- Pas de système d'authentification
- Pas de dashboard utilisateur
- Pas de tracking / analytics (v1)
- Pas de blog
- Pas de multi-langue (v1 en français)
- Pas de paiement
- Le package npm `@abraham/web-kit` est un livrable séparé (pas dans ce repo)
