📄 DOSSIER COMPLET (FORMAT MD)

# 📘 Mon portfolio 2025 - 2026  
## Documentation technique complète

---

# 🧭 1. Introduction

## 1.1 Contexte du projet

Le projet **mon-portfolio2025-2026** est un portfolio technique développé dans le cadre du **BTS SIO**.

Il a été conçu pour répondre à plusieurs besoins :

- Présenter mes compétences techniques de manière concrète
- Servir de support pour les épreuves E5 et E6
- Expérimenter une architecture front-end avancée

Ce projet a été initié après un premier stage réalisé chez **Provectio**, où j’ai découvert des pratiques professionnelles autour de React.

---

## 1.2 Objectifs

### Objectifs principaux

- Créer un portfolio interactif et moderne
- Mettre en avant mes compétences techniques
- Développer une architecture modulaire et scalable
- Support pédagogique pour le BTS

### Objectifs secondaires

- Approfondir React et TypeScript
- Comprendre les architectures front-end complexes
- Mettre en place un système d’authentification
- Implémenter des tests

---

## 1.3 Durée du projet

Le projet est volontairement limité à **2 ans** :

- Phase 1 : version actuelle (BTS)
- Phase 2 : refonte future avec montée en compétences

---

# ⚙️ 2. Stack technique

## 2.1 Technologies utilisées

- React 19
- TypeScript
- Vite
- TailwindCSS
- React Router
- react-terminal

---

## 2.2 Choix techniques

### React

Permet de construire une interface modulaire basée sur des composants.

### TypeScript

Apporte :

- typage strict
- meilleure maintenabilité
- réduction des erreurs

### Vite

Avantages :

- démarrage rapide
- hot reload performant
- configuration simple

### TailwindCSS

Permet :

- rapidité de développement
- cohérence visuelle
- design flexible

---

# 🧠 3. Architecture du projet

## 3.1 Architecture hybride

Le projet combine deux approches :

### Atomic Design (adapté)

```txt
template/
├── composants
├── organismes
├── pages
├── layouts
├── sections

Architecture fonctionnelle

src/
├── auth
├── template
├── styles
├── assets
├── App.tsx

3.2 Principe clé

Séparation des responsabilités :

UI → affichage
logique → comportement
données → contenu
🧩 4. Système de pages
4.1 Fonctionnement

Le système repose sur un composant central :

function Page(props: PageProps) {
  switch (type) {
    case "home": return <PageHome {...props} />
    case "admin": return <PageAdmin {...props} />
    default: return <PageUser {...props} />
  }
}

Avantages :

modularité
extensibilité
maintenance simplifiée
🔐 5. Authentification
5.1 Rôles
user
admin
superadmin (preview)
5.2 Comptes disponibles

admin :

alan / admin_privilege
gregory / crespin

user :

demo / demo
test / test
yaouen / ledanvic
5.3 Fonction login

const foundUser = FAKE_USERS.find(
  (u) => u.username === username && u.password === password
);

5.4 Logs

Chaque action est enregistrée :

addLog(username, role, "login", 0);

🛡️ 6. Sécurité
6.1 Mécanismes
blocage après plusieurs tentatives
délais progressifs
logs de sécurité
6.2 Exemple

if (newAttempts >= 5) {
  const nextLock = now + 10000;
}

6.3 Limites
sécurité front uniquement
usage pédagogique
pas de backend
🎨 7. Composants principaux
7.1 Terminal Linux

Permet :

navigation fichiers
simulation commandes

const commands = {
  ls: () => Object.keys(node.content || {}).join(" "),
};

7.2 Typewriter

Effet d’écriture :

setDisplayedText(prev => prev + characters[index]);

7.3 Theme

Gestion dynamique :

{colors.map(color => <Pastel color={color} />)}

🧪 8. Tests
8.1 Outils
Vitest
Testing Library
8.2 Exemple

render(<ProtectedRoute>Test</ProtectedRoute>);

🌐 9. Déploiement
9.1 Configuration

base: '/mon-portfolio2025-2026/'

9.2 Build

npm run build

9.3 Déploiement
GitHub Pages
GitHub Actions
📐 10. Bonnes pratiques
séparation logique / UI
composants réutilisables
typage strict
architecture modulaire
testabilité
🧭 11. Conclusion

Ce projet démontre :

une maîtrise progressive de React
une architecture réfléchie
une capacité à structurer un projet complexe
📎 Annexes

ESLint

export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
    },
  },
})

Git FLS 

sudo dnf install git-lfs
git lfs install
git lfs track "*.mp4"

👤 Auteur

Alan Gainié
BTS SIO – Portfolio technique

---

# 💥 Et maintenant (important)

Si tu veux vraiment atteindre **niveau "dossier 100 pages BTS"**, je peux te générer :

### 🔥 Version avancée avec :
- diagrammes (architecture, routing, auth)
- explication ligne par ligne de certains composants
- partie performance (ton bug actuel 👀)
- partie sécurité détaillée
- analyse critique du projet

---

👉 Dis-moi :
**"version dossier BTS complet"**  
et je te fais un document encore plus poussé (niveau top 5% des dossiers)