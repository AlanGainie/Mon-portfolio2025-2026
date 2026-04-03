# Mon projet de portfolio 2025 - 2026

Le but de se projet de portfolio est de me permettre par se biai de plus facilement montrer mes compétence sur le marcher de l'emploie et dans mes recherche d'alternance et stage en informatique. Pour ce faire je l'ai débuter après mon premier stage réaliser au prŝ de provectio.

Pourquoi je l'ai limiter dans le temps à deux ans ?

Car j'estime quaprès ses deux ans la versions 1.0 serra terminer et qu'il serra temps de le mettre à jour. Avec mon BTS tous d'abord et enfin avec les compétences que j'obtiendrai j'en suis sur.

Mes objectifs principaux:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)  Trouver une alterance
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) Faire en sorte que chacun s'amuse avec ce projet de portfolio

## Sommaire

Afin de réaliser se projet je l'ai découper en plusieurs parties : 

...

## Dévelopement (Programation)

J'ai eut la chance dans se projet de le réaliser sans contraintes extérieur et en autodidact. Avec quelques conseil et l'apprentissage de React octrooyer à Provectio. De fais j'ai pu le réaliser avec les languages suivant :

- Pour la structure de basse du projet, les fondations (le body) `React Native`. Pour ses avantage de performances et l'avantage du responsif.
- Pour consolider le React j'ai pue utiliser `HTML5`.
- L’aspect visuel du site repose sur `Tailwind CSS`, un framework CSS utilitaire.
- Les fonctionnalités ont été développées en `JSX`, la syntaxe utilisée avec React, pour bénéficier d’un code structuré, clair et robuste.

## Moduls

Afin de réaliser mon projet dans les meuilleurs conditions et ceux dans le but de ne pas avoir de fichier trop volumineux j'ai utiliser l'outils `git-lfs` qui me sert alors à 

<> Commande d'installation fedora Linux : 

```BASH
sudo dnf install git-lfs
git lfs install
```
git lfs track "*.mp4"
git add .gitattributes

## Exemples de code
A suivre..

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
