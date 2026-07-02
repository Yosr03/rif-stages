<div align="center">

# RIF-Stages

### Plateforme de Gestion des Candidatures de Stage

**Application web moderne pour la digitalisation du processus de recrutement des stagiaires au sein du Groupe RIF (Rassemblement des Ingénieurs Francophones)**

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![EmailJS](https://img.shields.io/badge/EmailJS-FF6C37?style=for-the-badge&logo=maildotru&logoColor=white)

---

*Projet réalisé dans le cadre du **Challenge Flash - Dev Web & Mobile** (2 jours)*

</div>

## Table des matières

- [Contexte du projet](#contexte-du-projet)
- [Problématique](#problématique)
- [Solution proposée](#solution-proposée)
- [Design et Prototypage](#design-et-prototypage)
- [User Journey](#user-journey)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Architecture du projet](#architecture-du-projet)
- [Installation](#installation)
- [Comptes de démo](#comptes-de-démo)
- [Sécurité](#sécurité)
- [Captures d'écran](#captures-décran)
- [Compétences démontrées](#compétences-démontrées)
- [Auteur](#auteur)

---

## Contexte du projet

### Challenge Flash - Dev Web & Mobile

Dans le cadre du **Challenge Flash - Dev Web & Mobile** organisé par le Groupe RIF, ce projet a été développé en **2 jours** avec comme objectif de concevoir un **MVP (Minimum Viable Product)** fonctionnel répondant à un besoin métier précis.

### Choix du sujet : Axe 3 - Flux de Travail RH

Parmi les 3 axes proposés, j'ai sélectionné :

> **Axe 3 : Formulaire de dépôt de candidature + Workflow de validation RH avec envoi de notification automatique**

**Pourquoi cet axe ?**

- Besoin réel et concret dans les entreprises
- Digitalisation d'un processus manuel courant
- Automatisation à forte valeur ajoutée
- Combine plusieurs technologies modernes (formulaires, base de données, notifications, PDF)

---

## Problématique

Dans de nombreuses organisations, la **gestion des candidatures de stage** est encore :

- **Manuelle** : Emails éparpillés, fichiers dispersés
- **Désorganisée** : Pas de suivi centralisé
- **Chronophage** : Perte de temps pour le service RH
- **Frustrante** : Mauvaise expérience candidat

### Conséquences

- Difficulté à suivre l'avancement des candidatures
- Risque de perdre des candidatures dans les emails
- Manque de communication avec les candidats
- Processus de validation lent et non traçable

### Notre défi

> Comment concevoir une application **simple**, **mobile-first** et **automatisée** permettant de fluidifier le dépôt de candidature et le processus de validation RH ?

---

## Solution proposée

**RIF-Stages** est une plateforme web moderne qui offre :

### Pour les candidats
- Formulaire de candidature intuitif multi-étapes
- Confirmation par email automatique
- Interface responsive (mobile, tablette, desktop)

### Pour l'équipe RH
- Tableau de bord centralisé
- Gestion des statuts (En attente, Acceptée, Refusée...)
- Planification d'entretiens
- Notifications temps réel
- Génération automatique de rapports PDF
- Envoi d'emails automatique avec planning d'entretien

---

## Design et Prototypage

### Approche Mobile First

Le design a été pensé et développé en **Mobile First** pour garantir une expérience optimale sur tous les appareils.

### Design System

| Élément | Valeur |
|---------|--------|
| **Couleur primaire** | `#1E3A5F` (Bleu foncé RIF) |
| **Couleur accent** | `#F59E0B` (Jaune/Orange) |
| **Succès** | `#10B981` (Vert) |
| **Erreur** | `#EF4444` (Rouge) |
| **Typographie** | Inter, system-ui |
| **Espacements** | Système fluide avec `clamp()` |

### Prototype Figma

**Voir le prototype interactif Figma**

- [Formulaire de candidature](https://www.figma.com/) *(à compléter avec ton lien)*
- [Dashboard RH](https://www.figma.com/) *(à compléter avec ton lien)*

---

## User Journey

### Parcours Candidat
Accueil -> Formulaire -> Étape 1 (Infos perso) -> Étape 2 (Formation)
-> Étape 3 (Motivation + CV) -> Soumission -> Confirmation -> Email reçu


### Parcours RH
Login -> Dashboard -> Notification (nouvelle candidature)
-> Consultation détails -> Décision (Accepter/Refuser)
-> [Si accepté] Planification entretien -> Email automatique envoyé


### Workflow global
┌─────────────┐ ┌──────────────┐ ┌─────────────┐
│ Candidat │────>│ Firestore │────>│ Dashboard │
│ soumet │ │ Database │ │ RH │
└─────────────┘ └──────────────┘ └─────────────┘
│ │ │
v v v
Email de Notification Décision +
confirmation temps réel Entretien planifié
│
v
Email avec
planning


---

## Fonctionnalités

### Espace Public

- Page d'accueil attrayante avec CTA
- Formulaire multi-étapes (3 étapes) avec validation en temps réel
- Upload de CV (drag and drop)
- Validation sécurisée des inputs (anti-XSS)
- Page de succès avec animation

### Espace RH (Protégé)

- Authentification sécurisée (Firebase Auth)
- Dashboard avec statistiques temps réel
- Liste des candidatures avec filtres et recherche
- Détails complets de chaque candidat (modal)
- Gestion des statuts (En attente, En examen, Acceptée, Refusée, Entretien planifié)
- Planification d'entretiens (date, heure, type Visio/Présentiel)
- Notifications temps réel avec badge
- Génération PDF individuelle et globale
- Paramètres de l'application

### Automatisations

- Email de **confirmation** à la soumission
- Email d'**acceptation** avec **planning d'entretien inclus**
- Email de **refus** professionnel
- **Notifications in-app** temps réel pour le RH
- **Génération PDF** automatique des dossiers

---

## Stack technique

### Frontend

| Technologie | Rôle |
|-------------|------|
| **React 18** (Vite) | Framework UI |
| **Tailwind CSS v4** | Styling utility-first |
| **React Router DOM** | Navigation SPA |
| **Lucide React** | Icônes modernes |
| **jsPDF** | Génération de PDF |

### Backend (Serverless)

| Service | Rôle |
|---------|------|
| **Firebase Firestore** | Base de données NoSQL temps réel |
| **Firebase Authentication** | Gestion des utilisateurs RH |
| **EmailJS** | Envoi d'emails sans backend |

### Outils

- **Vite** : Build tool ultra-rapide
- **Git et GitHub** : Versionning
- **VS Code** : IDE
- **Figma** : Prototypage

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Un compte Firebase
- Un compte EmailJS

### Étapes

```bash
# 1. Cloner le repository
git clone https://github.com/Yosr03/rif-stages.git
cd rif-stages

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env

# 4. Remplir .env avec tes propres clés Firebase et EmailJS

# 5. Lancer le serveur de développement
npm run dev