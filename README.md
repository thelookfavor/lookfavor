# Lookfavor Cinematic Site

Site vitrine statique prêt pour GitHub Pages.

## Objectif
Créer une expérience immersive inspirée des pages produit haut de gamme :
- sections plein écran ;
- animation au scroll ;
- objet central qui tourne et zoome ;
- textes qui apparaissent progressivement ;
- responsive mobile/tablette/desktop ;
- aucune dépendance JavaScript externe.

## Installation sur GitHub Pages
1. Créer un nouveau repository, par exemple : `lookfavor-cinematic`.
2. Envoyer les fichiers `index.html`, `styles.css`, `script.js` et le dossier `assets` à la racine du repository.
3. Dans GitHub : `Settings` → `Pages`.
4. Source : `Deploy from a branch`.
5. Branch : `main` / folder : `/root`.
6. Attendre la publication.

## À personnaliser
- Remplacer le lien `Voir le livre` dans `index.html` par ton lien Amazon.
- Ajouter tes vraies photos dans `/assets`.
- Remplacer les blocs visuels CSS par des images réelles si souhaité.
- Ajouter les versions FR/NL/EN dans un second temps.

## Note technique
L’effet cinématographique est géré dans `script.js` via la progression du scroll dans la section `.cinematic-stage`.
