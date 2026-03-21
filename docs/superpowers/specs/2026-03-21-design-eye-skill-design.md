# design-eye — Skill de calibration esthetique

## Probleme

Les skills actuels (`design-signature`, `expertise-web`) appliquent des patterns mecaniquement sur les sites existants sans analyser ce qui fonctionne deja. Resultat : ils detruisent l'ame des sites. Exemple reel : un site B2B avec un fond video, une palette orange coherente et un caractere fort a ete transforme en template generique avec des effets gratuits (degradé multicolore, patterns mecaniques).

Cause racine : Claude n'a pas de gout. Il ne peut pas juger ce qui est beau. Tout jugement esthetique autonome sera faux.

## Solution

Un nouveau skill `design-eye` qui sert de boussole esthetique. Il ne code rien. Il produit une **direction visuelle validee par l'humain** en s'appuyant sur des references externes et du feedback iteratif.

Principe fondamental : Claude n'a pas de gout. Tout jugement esthetique passe par des references externes + feedback utilisateur. Jamais de decision autonome.

## Identite du skill

- **Nom** : `design-eye`
- **Declenchement** : automatique quand on travaille sur un site web (existant ou nouveau)
- **Role** : boussole esthetique. Produit une direction visuelle validee par l'humain que les autres skills consomment ensuite.
- **Output** : un fichier `design-direction.md` dans le projet

## Les deux modes

### Mode A : Site existant

1. Ouvrir le site dans le navigateur, le parcourir (hero, sections, footer)
2. Lister les elements visuels marquants **sans les juger** (fond video, palette, typo, animations, layout...)
3. Presenter cette liste a l'utilisateur : "Voila ce que je vois. Qu'est-ce qui fait l'ame de ton site ? Qu'est-ce que tu veux absolument garder ?"
4. Aller chercher 3-5 sites similaires (meme secteur) sur les sites de reference
5. Les montrer a l'utilisateur : "Ces sites sont dans ton domaine. Lequel a quelque chose qui te parle ?"
6. Iterer : "Tu aimes le header de celui-ci mais le spacing de celui-la ? OK."
7. Produire une **direction visuelle** : elements a garder, elements a ameliorer, inspiration de reference
8. L'utilisateur valide. Seulement la, les autres skills peuvent intervenir.

### Mode B : Nouveau site (rien n'existe)

1. Demander : secteur, cible, vibe souhaitee (en mots simples)
2. Aller chercher 5-8 sites du meme secteur sur les references
3. Les montrer : "Parmi ceux-la, lesquels te parlent ?"
4. Affiner : "Tu aimes le hero de X, les couleurs de Y, le footer de Z"
5. Assembler une **direction visuelle** a partir des morceaux choisis
6. L'utilisateur valide. Les skills custom prennent le relais comme socle technique.

Dans les deux cas : **rien ne se code tant que la direction n'est pas validee.**

## Sources de reference

| Source | Utilisation |
|--------|------------|
| **Landing.love** | Landing pages completes dans le meme secteur — vision d'ensemble, flow de page |
| **Saaspo** | References SaaS specifiquement — pricing, features, onboarding patterns |
| **21st.dev** | Composants individuels — un hero, un navbar, un CTA |
| **Navbar Gallery** | Quand la nav est un sujet — mega-menu, sticky, transparente |
| **Component Gallery** | Design systems et composants UI isoles |

### Regles d'utilisation

- Secteur connu : Landing.love + Saaspo d'abord (vision globale), puis 21st.dev pour les composants specifiques
- Composant precis a ameliorer : 21st.dev + Component Gallery
- Le skill utilise le navigateur pour aller chercher les exemples et les montrer a l'utilisateur
- On ne copie jamais un site entier. On pioche des **elements** : "le hero de celui-ci", "la palette de celui-la", "le spacing de cet autre"

## Output : design-direction.md

Le skill produit un fichier `design-direction.md` dans le projet contenant :

- Les elements a garder (mode site existant)
- Les references choisies avec les elements retenus de chacune
- La direction visuelle validee par l'utilisateur
- Les contraintes explicites (ex: "ne pas toucher au fond video", "garder la palette monochrome")

Ce document est passe aux autres skills comme contexte obligatoire.

## Interaction avec les autres skills

### Ordre d'execution obligatoire

```
design-eye (calibration) -> design-signature (identite visuelle) -> expertise-web (patterns techniques)
```

### Regles par skill

- **`design-signature`** : applique ses patterns (grain, glassmorphism, typo...) uniquement la ou la direction le permet. Si la direction dit "garder le fond video", le skill ne le remplace pas. Si la direction dit "palette monochrome orange", le skill ne rajoute pas un degrade violet.

- **`expertise-web`** : applique ses standards techniques (ARIA, touch targets, perf...) sans toucher a l'esthetique validee. Le socle technique ne contredit jamais la direction visuelle.

- **`frontend-design`** : construit les composants en respectant les references choisies dans la direction, pas ses propres defaults.

### Regle de conflit

Si un pattern d'un skill entre en conflit avec la direction validee, **la direction gagne**. Exemple : `design-signature` dit "toujours serif+sans-serif" mais la direction dit "le site utilise une sans-serif unique qui fait son caractere" — on garde la sans-serif.

### Declenchement

- `design-eye` s'ajoute dans la liste des skills a invoquer en premier dans `design-signature` et `expertise-web`
- Si `design-eye` n'a pas ete execute et qu'on travaille sur un site, les autres skills le signalent : "design-eye n'a pas encore produit de direction. Lancer d'abord ?"

## Hors scope

- Le skill ne code rien
- Le skill ne juge pas ce qui est beau ou laid
- Le skill ne choisit pas a la place de l'utilisateur
- Le skill ne s'applique pas aux projets purement techniques (API, CLI, etc.)
