# Web Kit — Landing Page Design Spec

## Résumé

Landing page interactive qui convainc des non-techniques d'installer un pack de skills Claude Code pour générer des sites web professionnels. Le visiteur vit l'expérience sur la page (démo interactive), puis installe les skills pour le faire en vrai chez lui.

## Cible

**Vibe coders / non-techniques.** Des gens qui ont découvert Claude Code et veulent créer un site sans coder. Zéro jargon technique. Le message parle de résultat, pas de process.

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

- **Toggle slider horizontal** — glisser de gauche à droite
- **Gauche :** site généré par Claude Code sans skills (générique, Bootstrap-like, pas de personnalité)
- **Droite :** même prompt avec les skills (typo soignée, effets, spacing, personnalité)
- **Texte sous le toggle :** "Même prompt. Même IA. La différence c'est les skills."
- **Plusieurs exemples switchables :** Portfolio, SaaS, Business local
  - Boutons/tabs au-dessus du toggle pour changer d'exemple
  - Chaque exemple a sa version "sans" et "avec" skills
- **Pas de photos stock ni vidéos de fond** — le contraste vient du design pur (typo, spacing, couleurs, effets grain/glassmorphism)
- Si besoin d'images placeholder dans les mockups : Unsplash (gratuit)

### Section 3 — Questionnaire interactif (3 questions)

Le coeur de la démo. Le visiteur répond et déclenche la "génération".

**Question 1 — "C'est quoi ton projet ?"**
- Choix visuels cliquables :
  - 🏪 Business local
  - 💼 Portfolio / Freelance
  - 🚀 SaaS / Startup
  - 📝 Blog / Contenu

**Question 2 — "Quel vibe ?"**
- Moodboards cliquables :
  - Minimal
  - Bold
  - Dark
  - Playful

**Question 3 — "Comment s'appelle ton projet ?"**
- Input texte libre
- Bouton "Générer" pour lancer l'animation

Chaque question apparaît séquentiellement (la suivante slide après réponse).

### Section 4 — Génération live

L'animation spectacle, déclenchée après la 3e réponse.

- **Split screen :**
  - **Gauche :** terminal style Claude Code qui déroule des lignes avec délai progressif
    - `▸ Generating hero section...`
    - `▸ Applying design signature...`
    - `▸ Building navigation...`
    - `▸ Adding sections...`
    - `▸ Final polish...`
  - **Droite :** preview qui se construit progressivement (nav → hero → sections → footer)
- **Le résultat est un vrai site HTML/CSS rendu dans un iframe** — pas une image
- **Le site utilise les réponses du visiteur** (nom du projet, vibe choisie)
- **Tout est côté client** — pré-calculé, pas d'appel API
- **Système de templates :** 4 types de projet × 4 vibes = 16 combinaisons
  - En pratique : un même template HTML par type de projet, avec des variables CSS qui changent selon le vibe (palette, border-radius, font-family, effets)

### Section 5 — Reveal + CTA d'installation

Après la génération :

- Le site "généré" s'affiche en plus grand / plein écran
- **Overlay qui slide :** "Maintenant fais-le pour de vrai."
- **Commande d'installation :**
  ```
  npx @abraham/web-kit
  ```
- **Texte explicatif :** "Installe les skills dans Claude Code. Ouvre un nouveau chat, dis-lui ce que tu veux, et il te pose les mêmes questions."
- **Bouton "Copier la commande"** bien visible
- Texte secondaire : "Fonctionne avec Claude Code. Prend 30 secondes."

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
- **Mobile-first** — les vibe coders sont souvent sur mobile pour découvrir
- **Performance** — pas de vidéos lourdes, pas de dépendances externes, tout en CSS/HTML pur

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
- Hero avec stock photo
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
- Map intégrée proprement
- Typographie lisible et chaleureuse
- CTA clair et unique

## Ce qui est hors scope

- Pas de système d'authentification
- Pas de dashboard utilisateur
- Pas de tracking / analytics (v1)
- Pas de blog
- Pas de multi-langue (v1 en français)
- Pas de paiement
- Le package npm `@abraham/web-kit` est un livrable séparé (pas dans ce repo)
