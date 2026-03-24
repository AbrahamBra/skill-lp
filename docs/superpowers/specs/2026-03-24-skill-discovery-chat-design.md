# Skill Discovery Chat — Design Spec
Date: 2026-03-24

## Contexte

Section interactive sur la landing page `web·kit` permettant à un visiteur de décrire son métier et de découvrir quelles skills GitHub pourraient encoder son intelligence professionnelle. Se termine par un pitch pour la création de skill custom sur-mesure.

## Objectif pédagogique

Montrer concrètement le concept "encoder l'intelligence d'un métier" sans jargon technique, en rendant le visiteur acteur de la démonstration. L'expérience fait la pédagogie.

---

## Architecture

### Data flow

```
[User input] → [Keyword extraction client-side] → [GitHub API] → [Skill cards] → [Custom pitch]
```

1. Utilisateur tape son métier dans l'input
2. Submit → bulle user apparaît
3. Indicateur "typing..." (1 500ms)
4. Extraction de mots-clés : suppression stop words FR/EN, conservation des 3–5 termes les plus significatifs
5. Appel GitHub Search API : `GET /search/repositories?q={keywords}+claude+skill&sort=stars&per_page=5`
6. Réponse assistant : texte intro + skill cards + message pitch + CTA
7. Input verrouillé — échange unique

### Contraintes

- **Zéro coût** : pas de backend, pas de clé API Anthropic. GitHub public API uniquement (60 req/h unauthenticated).
- **Zéro backend** : tout client-side en React
- **Échange unique** : pas de multi-turn

---

## Composants

### Fichier unique : `src/components/skill-discovery.tsx`

#### `SkillDiscovery` (export principal)
- State : `messages[]`, `inputValue`, `status: idle | loading | done`
- Handlers : `handleSubmit` → extraction mots-clés → fetch GitHub → set messages
- Render : header + chat container + input (verrouillé après submit)

#### `ChatBubble`
- Identique à `chat-demo.tsx` : bulle droite (user) / bulle gauche (assistant)
- Supporte `children` pour embedder les skill cards dans la bulle assistant

#### `SkillCard`
- Props : `name`, `description`, `stars`, `url`
- Style : `border border-[var(--border)] px-4 py-3 rounded` — cohérent avec les cards offres
- Layout : nom en `font-mono text-xs`, description en `text-muted text-xs`, étoiles en `text-muted text-xs`

---

## Intégration page.tsx

Insertion de `<SkillDiscovery />` dans `src/app/page.tsx` juste avant la section `id="tarifs"`.

---

## Design visuel

### Wrapper chat
```
border border-[var(--border)] rounded-xl bg-[rgba(255,255,255,0.02)]
```
Header : dot vert + label `skill-discovery` en font-mono (identique à `chat-demo.tsx`)
Hauteur : auto (grandit avec le contenu)

### Skill cards (dans la bulle assistant)
```
┌─────────────────────────────────┐
│ pbakaus/impeccable              │  font-mono text-xs
│ Anti-slop frontend execution    │  text-muted text-xs leading-relaxed
│ ★ 234                           │  text-muted text-xs
└─────────────────────────────────┘
```

### Titre de section (au-dessus du chat)
```
Découvre les skills qui correspondent à ton métier.
```
Style : `font-serif clamp(1.8rem, 3.5vw, 3rem)` — cohérent avec les autres titres de section.

### Message final assistant
Texte statique :
> "Ces skills encodent l'intelligence générique de quelqu'un dans ton domaine. Mais aucune n'a été entraînée sur tes données, ton vocabulaire, tes cas réels."
> "C'est exactement ce qu'on construit ensemble."

CTA : bouton `"Encoder mon expertise"` → ancre `#tarifs`

---

## Gestion des erreurs

| Cas | Comportement |
|-----|-------------|
| GitHub API rate limit | Message assistant : "GitHub est temporairement indisponible. Mais le principe reste le même — [pitch custom]." |
| 0 résultats | Message assistant : "Aucun skill public trouvé pour ce domaine — c'est souvent le signe que personne n'a encore encodé cette expertise. C'est une opportunité." + pitch custom |
| Input vide | Bouton désactivé (disabled) |

---

## Extraction de mots-clés

Algorithme simple côté client :
1. Split sur espace + ponctuation
2. Lowercase
3. Filtrer stop words (liste FR + EN hardcodée : je, tu, il, un, une, les, des, the, a, an, is, are, i, my, and, or, in, on, at...)
4. Filtrer mots < 3 caractères
5. Conserver les 4 premiers termes significatifs
6. Joindre avec `+` pour la query GitHub

---

## Fichiers modifiés

| Fichier | Action |
|---------|--------|
| `src/components/skill-discovery.tsx` | Créer |
| `src/app/page.tsx` | Insérer `<SkillDiscovery />` avant `#tarifs` |
