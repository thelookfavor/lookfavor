# LOOKFAVOR — Site vitrine de Gaétan Vermeire

Site cinématographique scroll-driven pour les livres et l'univers LOOKFAVOR.

---

## Structure du projet

```
lookfavor/
├── index.html              ← Page principale
├── css/
│   └── main.css            ← Tous les styles
├── js/
│   └── main.js             ← Scroll narrative, langues, modal, calendrier
├── assets/
│   └── images/
│       └── cover-art-instant.jpg   ← ⚠️ À AJOUTER (ta couverture)
└── README.md
```

---

## 1. Ajouter tes couvertures de livre

Le site charge automatiquement la bonne couverture selon la langue active.
Tu dois déposer **6 fichiers** dans `assets/images/` avec ces noms exacts :

| Fichier | Contenu |
|---|---|
| `cover-fr.jpg` | Première de couverture — version française |
| `cover-en.jpg` | Première de couverture — version anglaise |
| `cover-nl.jpg` | Première de couverture — version néerlandaise |
| `cover-full-fr.jpg` | Couverture complète (1ère + 4ème) — version française |
| `cover-full-en.jpg` | Couverture complète (1ère + 4ème) — version anglaise |
| `cover-full-nl.jpg` | Couverture complète (1ère + 4ème) — version néerlandaise |

**Notes :**
- Format : JPG recommandé (WebP aussi accepté, mais garde l'extension `.jpg`)
- Ratio première de couverture : idéalement 6:9 (ex: 600×900px)
- Ratio couverture complète : idéalement 13:9 (panoramique, ex: 1300×900px)
- Si un fichier est manquant, un visuel de remplacement stylisé s'affiche automatiquement.

---

## 2. Déployer sur GitHub Pages

### Étape 1 — Créer le dépôt GitHub
1. Va sur [github.com](https://github.com) → New repository
2. Nom du dépôt : `lookfavor` (ou ton username si tu veux `username.github.io`)
3. Public ✓ — Add README ✗ (on a déjà le nôtre)

### Étape 2 — Uploader les fichiers
Option simple (sans terminal) :
1. Dans ton dépôt GitHub → **Add file** → **Upload files**
2. Glisse tout le contenu du dossier `lookfavor/` directement
3. Assure-toi que `index.html` est bien à la racine

### Étape 3 — Activer GitHub Pages
1. Dépôt GitHub → **Settings** → **Pages**
2. Source : `Deploy from a branch`
3. Branch : `main` / `root`
4. Clique **Save**

Ton site sera disponible dans 2-3 minutes à :
```
https://TON-USERNAME.github.io/lookfavor/
```

---

## 3. Mettre à jour la date pour *Entre Flammes & Silences*

Quand tu auras une date de sortie, édite `js/main.js` et cherche :

```javascript
'DTSTART;VALUE=DATE:20260101',
'DTEND;VALUE=DATE:20260102',
```

Remplace par la vraie date au format `YYYYMMDD`.

---

## 4. Personnaliser le domaine (optionnel)

Si tu as un nom de domaine personnalisé (ex: `lookfavor.com`) :
1. GitHub → Settings → Pages → Custom domain
2. Entre ton domaine
3. Chez ton registrar, crée un CNAME vers `ton-username.github.io`

---

## Fonctionnalités

- ✅ Scroll narrative Apple-style (4 étapes avec livre 3D)
- ✅ 3 langues (FR / NL / EN) — tout le contenu bascule
- ✅ Modal Amazon avec 11 régions × 3 versions linguistiques
- ✅ Bouton calendrier (.ics universel — iPhone, Android, desktop)
- ✅ Curseur personnalisé
- ✅ Parallaxe hero
- ✅ Animations scroll-reveal
- ✅ 100% statique — aucun serveur nécessaire
- ✅ Responsive mobile

---

*LOOKFAVOR © 2025 Gaétan Vermeire — Tous droits réservés*
