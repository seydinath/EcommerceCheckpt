# 🎉 AgroMarket - Bienvenue!

## 🌾 Qu'est-ce qu'AgroMarket?

AgroMarket est une **plateforme e-commerce agricole** complète permettant:
- 👨‍🌾 **Fermiers** de vendre leurs produits
- 🏪 **Vendeurs** de proposer des articles agricoles
- 🛒 **Acheteurs** de demander des produits avec prix négociable

## ⚡ Commencez en 5 Minutes

### 1. Installez les dépendances
```bash
npm install
cd server && npm install
```

### 2. Démarrez les serveurs
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd server && npm run dev
```

### 3. Remplissez la base de données
```bash
# Terminal 3: Seed database
cd server && node seed.js
```

### 4. Accédez à l'application
- **Frontend:** http://localhost:8080
- **Backend:** http://localhost:5000

## 🔐 Identifiants de Test

Après avoir exécuté `node seed.js`:

**Vendeur:**
- Email: `seller@agromarket.com`
- Mot de passe: `password123`

**Fermier:**
- Email: `farmer@agromarket.com`
- Mot de passe: `password123`

## 📚 Documentation

### 📖 Guides Essentiels
| Document | Durée | Description |
|----------|-------|-------------|
| **QUICKSTART.md** | 5 min | Démarrage rapide complet |
| **DEPLOYMENT.md** | 15 min | Architecture & checklist |
| **MONGODB_ATLAS.md** | 20 min | Setup base de données |
| **QUICK_COMMANDS.md** | 10 min | Commandes courantes |
| **FINAL_REPORT.md** | 10 min | Résumé complet |

### 🗺️ Navigation Documentation
```
COMMENCEZ ICI ⬇️
    ↓
    README.md (vous êtes ici!)
    ↓
    QUICKSTART.md (5 min)
    ↓
    Choix selon objectif:
    ├─ Dépannage? → QUICK_COMMANDS.md
    ├─ Déploiement? → DEPLOYMENT.md
    ├─ Base de données? → MONGODB_ATLAS.md
    ├─ Vue d'ensemble? → FINAL_REPORT.md
    └─ Documentation entière? → DOCS_INDEX.md
```

## 🎯 Cas d'Usage Courants

### Je veux contribuer au code
1. Lire: **QUICKSTART.md**
2. Setup: Suivre installation locale
3. Branch: `git checkout -b feature/mon-feature`
4. Code: Modifier fichiers
5. Test: `npm run dev`

### Je veux déployer en production
1. Lire: **DEPLOYMENT.md**
2. Setup: MongoDB Atlas
3. Config: Mise à jour .env production
4. Build: `npm run build`
5. Deploy: Suivant votre hébergeur

### J'ai une erreur
1. Lire: **QUICK_COMMANDS.md** → Common Issues
2. Vérifier: Logs du terminal
3. Checker: .env configuration
4. Relancer: Serveurs

### Je dois utiliser MongoDB Atlas
1. Lire: **MONGODB_ATLAS.md**
2. Créer: Cluster sur mongodb.com
3. Copier: Connection string
4. Mettre à jour: server/.env
5. Tester: `npm run dev`

## 🏗️ Architecture Rapide

```
Frontend (React)              Backend (Express)          Database (MongoDB)
├─ 11 Pages                   ├─ 17+ Endpoints          ├─ Users
├─ 20+ Composants             ├─ JWT Auth                ├─ Products
├─ 2 Langues (FR, EN)         ├─ 3 Rôles                ├─ Categories
└─ Tailwind CSS               └─ CORS Security          └─ Requests

Flux de Données:
User → Frontend → API → Backend → Database
User ← Frontend ← API ← Backend ← Database
```

## 🚀 Caractéristiques Principales

### ✅ Authentification
- Inscription avec rôle
- Login/Logout
- JWT tokens
- 3 rôles: Buyer, Seller, Farmer

### ✅ Catalogue Produits
- 10+ produits de test
- Recherche & filtrage
- Détails enrichis
- Évaluation & avis

### ✅ Système de Demandes
- Créer une demande de produit
- Négociation de prix
- Accepter/Rejeter
- Marquer comme complété

### ✅ Gestion Utilisateurs
- Profils détaillés
- Édition données
- Affichage vendeurs
- Pour chaque rôle

### ✅ Multilingue
- 🇫🇷 Français
- 🇬🇧 Anglais
- Basculer en un clic

### ✅ Devise
- 💱 F CFA (Franc CFA)
- Affichage uniforme
- Calculs précis

## 📊 Statistiques Projets

| Métrique | Valeur |
|----------|--------|
| **Lignes de code** | 5,000+ |
| **Pages frontend** | 11 |
| **Composants** | 20+ |
| **Endpoints API** | 17+ |
| **Modèles BD** | 4 |
| **Utilisateurs test** | 2 |
| **Produits sample** | 10 |
| **Catégories** | 6 |
| **Langues** | 2 |
| **Lignes de docs** | 3,000+ |

## 🔧 Stack Technologique

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Components
- **React Router** - Navigation
- **React Query** - Data fetching
- **i18next** - Translations

### Backend
- **Node.js** - Runtime
- **Express 5.2** - Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Security
- **dotenv** - Configuration

### Infrastructure
- **Local MongoDB** - Development
- **MongoDB Atlas** - Production
- **Vercel** - Deployment ready

## 🔒 Sécurité

- ✅ Passwords hachés (bcryptjs)
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ CORS protection
- ✅ Input validation
- ✅ SQL injection prevention (Mongoose)

## 📦 Dépannage Rapide

### Le frontend ne démarre pas
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Le backend ne se connecte pas à MongoDB
```bash
# Vérifier MongoDB tourne
mongod

# Ou utiliser Atlas et mettre à jour .env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/agromarket
```

### Port déjà utilisé
```bash
# Frontend (8080)
lsof -i :8080 && kill -9 <PID>

# Backend (5000)
lsof -i :5000 && kill -9 <PID>
```

## 🎓 Apprentissage

### Débutant (1-2 heures)
1. Lire README.md
2. Lire QUICKSTART.md
3. Lancer frontend & backend
4. Explorer interface

### Intermédiaire (4-6 heures)
1. Lire DEPLOYMENT.md
2. Lire MONGODB_ATLAS.md
3. Modifier quelques composants
4. Créer endpoint simple

### Avancé (8+ heures)
1. Étudier architecture complète
2. Comprendre flow authentification
3. Intégrales le système de requêtes
4. Déployer en production

## ✨ Prochaines Étapes

### Maintenant (5 min)
- [ ] Lire ce fichier jusqu'au bout
- [ ] Lancer `npm install`
- [ ] Démarrer les serveurs
- [ ] Accéder à http://localhost:8080

### Ensuite (30 min)
- [ ] Lire QUICKSTART.md
- [ ] Tester avec les identifiants
- [ ] Explorer interface
- [ ] Créer une demande

### Plus tard (2+ heures)
- [ ] Lire DEPLOYMENT.md
- [ ] Modifier le code
- [ ] Ajouter une feature
- [ ] Tester sur Atlas

## 🤝 Contribution

Pour contribuer:
1. Fork le projet
2. Créer une branche feature
3. Commits avec messages clairs
4. Submit une Pull Request

## 📞 Support

**Problème?** Consultez:
- 📖 **QUICKSTART.md** - Problèmes de setup
- 🔧 **QUICK_COMMANDS.md** - Commandes courantes
- 🚀 **DEPLOYMENT.md** - Architecture
- 🗄️ **MONGODB_ATLAS.md** - Base de données

## 📄 Licence

UNLICENSED - Proprietary Software

## 👨‍💼 Auteur

**Seydith** - Project Author & Maintainer

---

## 🎯 TL;DR (Trop long, pas lu)

```bash
# Copier-coller pour démarrer:
npm install
npm run dev &
(cd server && npm install && npm run dev) &
cd server && node seed.js

# Puis ouvrir:
http://localhost:8080

# Identifiants:
seller@agromarket.com / password123
farmer@agromarket.com / password123
```

---

**Bienvenue sur AgroMarket!** 🌾🎉

Pour plus d'informations, consultez **QUICKSTART.md**

Dernière mise à jour: March 1, 2026
