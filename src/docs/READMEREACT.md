# 🚀 mon-portfolio2025-2026

## 📌 Présentation

**mon-portfolio2025-2026** est un portfolio technique développé avec **React + TypeScript** dans le cadre du **BTS SIO**.

### 🎯 Objectifs du projet

Ce projet a trois objectifs principaux :

* 🧠 **Présenter mes compétences techniques**
* 🧪 **Expérimenter une architecture front-end avancée**
* 🎓 **Servir de support pour les épreuves BTS (E5 / E6)**

---

## ⚙️ Stack technique

### 🧩 Front-end

* **React 19**
* **TypeScript**
* **Vite**
* **React Router**

### 🎨 UI / Styling

* **TailwindCSS**
* composants custom (Button, Typewriter, etc.)

### 🧪 Tests

* **Vitest**
* **Testing Library**

### 🧠 Spécificités

* **react-terminal** → simulation terminal Linux
* système de rôles (admin / user / preview)

---

## 📦 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/<ton-username>/mon-portfolio2025-2026.git
cd mon-portfolio2025-2026
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer en développement

```bash
npm run dev
```

👉 Accès :
http://localhost:5173

---

## 🧠 Architecture du projet

Ce projet repose sur une **architecture hybride** combinant :

---

### 🔹 1. Atomic Design (adapté)

L’architecture s’inspire de l’Atomic Design mais adaptée à React :

```txt
template/
├── composants   → composants UI simples (Button, Card…)
├── organismes   → blocs complexes (Menu, Terminal…)
├── pages        → pages métier (HomePage, Projets…)
├── layouts      → structure globale (PageUser, PageAdmin…)
├── sections     → contenu métier spécifique (E5, E6…)
```

👉 Objectif :

* isoler les responsabilités
* favoriser la réutilisation
* simplifier la maintenance

---

### 🔹 2. Architecture fonctionnelle (par domaine)

```txt
src/
├── auth        → gestion de l’authentification
├── template    → UI + architecture
├── styles      → configuration Tailwind + styles globaux
├── assets      → images, pdf, vidéos
├── App.tsx     → routing principal
```

👉 Avantage :

* séparation claire logique métier / affichage
* scalable (projet évolutif)

---

## 🧩 Système de pages (core du projet)

Le projet repose sur un système de pages dynamique basé sur la composition.

---

### 🔹 Page.tsx (point central)

```ts
type = "home" | "user" | "admin"
```

👉 Rôle :

* router interne
* déléguer vers :

  * `PageHome`
  * `PageUser`
  * `PageAdmin`

---

### 🔹 PageUser

* affichage classique
* navigation standard
* rendu des pages

---

### 🔹 PageAdmin

Ajoute une couche :

* édition dynamique de contenu
* injection de données administratives
* preview en temps réel

---

### 🔹 PageHome

* version simplifiée
* optimisée pour affichage initial

---

### 🔹 BodyPage (important ⚠️)

C’est le cœur du rendu :

* gestion du scroll
* gestion des ancres (`#section`)
* affichage dynamique du contenu
* fallback automatique

---

## 🧱 Génération dynamique du contenu

Le contenu est défini via :

```ts
getPagesArrays()
```

👉 Permet :

* navigation modulaire
* découplage UI / contenu
* maintenance simplifiée

Exemple :

```ts
const mesCompetencesTab = [
  <JavaScript />,
  <ReactLg />,
  <NodeJs />,
  <LanguageC />,
];
```

---

## 🔐 Authentification

Le projet inclut un système complet :

* gestion utilisateur (admin / user)
* mode preview (`viewer` / `superadmin`)
* logs de connexion
* système de blocage (anti brute-force)

👉 Séparé dans :

```txt
auth/
```

📄 Documentation dédiée : `AUTH.md`

---

## 🎨 UI & Composants

Les composants sont organisés pour maximiser la réutilisabilité :

### 🔹 UI simple (`composants`)

* Button
* PageTitle
* Pastel

### 🔹 Composants avancés (`organismes`)

* TerminalLinux
* Menue
* Carrousel

---

## 🖥️ Fonctionnalités principales

* 📄 Portfolio dynamique
* 🔐 Auth avec rôles
* 🧪 Mode preview admin
* 🖥️ Terminal Linux interactif
* 🎨 Thèmes dynamiques
* ✍️ Animation typewriter
* 🧾 Logs de connexion
* 📁 Gestion contenu admin

---

## 🌐 Déploiement

### ⚙️ Configuration

```ts
base: '/mon-portfolio2025-2026/'
```

---

### 🚀 Build

```bash
npm run build
```

---

### 📦 Déploiement

Automatisé via :

* **GitHub Pages**
* **GitHub Actions**

---

## 🧪 Tests

Framework utilisé :

* **Vitest**
* **Testing Library**

Objectifs :

* tester les composants critiques
* sécuriser l’authentification
* garantir la stabilité

Exemple :

```bash
npm run test
```

---

## 📐 Bonnes pratiques appliquées

* ✅ séparation logique / UI
* ✅ composants réutilisables
* ✅ typage strict TypeScript
* ✅ architecture modulaire
* ✅ gestion d’état locale contrôlée
* ✅ routing sécurisé
* ✅ testabilité du code

---

## ⚠️ Points d’attention

* éviter les re-renders inutiles (performance)
* bien gérer les props dans les composants dynamiques
* attention aux états globaux (auth)

---

## 🧭 Objectifs pédagogiques

Ce projet démontre :

* architecture React avancée
* gestion d’état
* séparation des responsabilités
* organisation scalable
* bonnes pratiques industrielles

---

## 👤 Auteur

**Alan Gainié**
Projet BTS SIO – Portfolio technique
