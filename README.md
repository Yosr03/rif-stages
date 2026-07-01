#  RIF-Stages - Plateforme de Gestion des Candidatures

Application web de gestion des candidatures de stage pour le **Groupe RIF** (Rassemblement des Ingénieurs Francophones), développée dans le cadre du Challenge Flash - Dev Web & Mobile.

##  Fonctionnalités

### Espace Candidat
- Formulaire de candidature multi-étapes
- Upload de CV (drag & drop)
- Validation en temps réel
- Confirmation par email

### Espace RH
- Authentification sécurisée
- Tableau de bord avec statistiques
- Gestion des candidatures (accepter, refuser, archiver)
- Planification d'entretiens
- Génération de rapports PDF
- Notifications automatiques

## Stack Technique

### Frontend
- **React 18** (Vite)
- **Tailwind CSS v4**
- **React Router DOM**
- **Lucide React** (icônes)
- **jsPDF** (génération PDF)

### Backend (à venir)
- **Firebase Firestore** (base de données)
- **Firebase Storage** (stockage des CV)
- **Firebase Auth** (authentification)
- **EmailJS** (notifications)

## Installation

```bash
# Cloner le projet
git clone https://github.com/TON-USERNAME/rif-stages.git
cd rif-stages

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Puis remplir le fichier .env avec tes propres clés

# Lancer le serveur de développement
npm run dev