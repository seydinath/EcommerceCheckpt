# 🚀 AgroMarket - Guide de Démarrage Rapide

**Propriétaire:** Seydith  
**Tous droits réservés © 2026**

## ✅ Checklist Pré-Installation

- [ ] Node.js 18+ installé
- [ ] npm ou yarn disponible
- [ ] MongoDB local ou Atlas connection string
- [ ] VS Code ou autre éditeur

---

## 📥 Installation

### 1️⃣ Cloner le Projet
```bash
git clone <votre-repo>
cd EcommerceCheckpt
```

### 2️⃣ Frontend Setup
```bash
# À la racine du projet
npm install
```

### 3️⃣ Backend Setup
```bash
cd server
npm install
cd ..
```

---

## 🔧 Configuration Environnement

### Frontend `.env` (Racine)
```env
VITE_API_URL=http://localhost:5000
```

### Backend `.env` (`/server`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/agromarket
JWT_SECRET=your-super-secret-key-here-change-in-production
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

---

## ▶️ Lancer l'Application

### Terminal 1: Frontend
```bash
# À la racine
npm run dev
```
→ Accédez à [http://localhost:5173](http://localhost:5173)

### Terminal 2: Backend
```bash
# Dans le dossier /server
npm run dev
```
→ API disponible à [http://localhost:5000](http://localhost:5000)

---

## 🧪 Test Rapide

### 1. Inscription Acheteur
```
POST http://localhost:5000/api/auth/register
{
  "email": "buyer@example.com",
  "password": "password123",
  "fullName": "Marie Acheteur",
  "role": "buyer"
}
```

### 2. Inscription Vendeur
```
POST http://localhost:5000/api/auth/register
{
  "email": "seller@example.com",
  "password": "password123",
  "fullName": "Ali Vendeur",
  "role": "seller",
  "businessName": "Bio Farm Kenitra",
  "location": "Kenitra"
}
```

### 3. Inscription Agriculteur
```
POST http://localhost:5000/api/auth/register
{
  "email": "farmer@example.com",
  "password": "password123",
  "fullName": "Hassan Fermier",
  "role": "farmer",
  "businessName": "Hassan Agriculture",
  "location": "Skhirate"
}
```

---

## 📚 Structure des Rôles

### 🛒 Acheteur (Buyer)
- ✅ Voir tous les produits
- ✅ Créer des demandes pour les produits
- ✅ Suivre l'état des demandes
- ✅ Annuler les demandes
- ❌ Créer des produits

### 🏪 Vendeur (Seller)
- ✅ Créer/modifier/supprimer ses produits
- ✅ Voir les demandes reçues
- ✅ Accepter/rejeter les demandes
- ✅ Proposer prix & date de livraison
- ❌ Créer des demandes

### 👨‍🌾 Agriculteur (Farmer)
- ✅ Même que Vendeur +
- ✅ Marquer produits comme "Bio"
- ✅ Ajouter date de récolte & origine
- ❌ Créer des demandes

---

## 🌊 Flux Utilisateur Complet

### Scénario: Acheteur commande des tomates

#### 1. Alice (Acheteur) s'inscrit
```
Email: alice@example.com
Role: buyer
```

#### 2. Bob (Vendeur) s'inscrit et crée un produit
```
Email: bob@example.com
Role: seller
businessName: "Bio Farm Kenitra"

Produit créé:
- Title: "Tomate Bio Premium"
- Price: 50 F CFA/kg
- Stock: 100 kg
- Category: vegetables
- isOrganic: true
```

#### 3. Alice voir le produit et crée une demande
```
Alice crée une demande:
- Product: "Tomate Bio Premium"
- Quantity: 10 kg
- Price unitaire: 50 F CFA (total: 500 F CFA)
- Message: "Livraison lundi si possible"
- Status: pending
```

#### 4. Bob reçoit la demande
```
Bob voit la demande dans "Demandes reçues"
Bob accepte avec:
- proposedPrice: 45 F CFA/kg (remise)
- deliveryDate: 2026-03-03
- notes: "Peut être livré lundi matin"
- Status: accepted
```

#### 5. Alice reçoit la notification
```
Alice reçoit la notification d'acceptation
Elle voit:
- Vendeur: Bob (Bio Farm Kenitra)
- Prix accepté: 45 F CFA/kg (total: 450 F CFA)
- Date livraison: 3 mars 2026
- Contact: bob@example.com
```

#### 6. Transaction complétée
```
Bob marque comme "complétée" après livraison
Status: completed
Fin du flux
```

---

## 📱 Pages Principales (À Implémenter)

### Frontend Routes Actuelles
```
/                  → Index (Home)
/products          → Lista des produits
/products/:id      → Détail produit
/auth              → Login/Register
/categories        → Catégories
/about             → À propos
/profile           → Mon profil
```

### Routes À Ajouter
```
/my-requests       → Mes demandes (Buyer)
/received-requests → Demandes reçues (Seller/Farmer)
/my-products       → Mes produits (Seller/Farmer)
/seller-dashboard  → Tableau de bord (Seller/Farmer)
```

---

## 🎨 Thème & Styles

### Couleurs Principales
- **Vert agricole:** `#3d8a3d` (agro-green-500)
- **Terre:** `#b8843a` (agro-earth-500)
- **Neutrals:** Gris standards

### Utility Classes
```tailwindcss
bg-agro-green-50    /* Very light green */
bg-agro-green-600   /* Dark green for buttons */
text-agro-earth-800 /* Dark earth text */
border-agro-green-300
```

---

## 🔍 Commandes Utiles

### Développement
```bash
# Frontend only
npm run dev

# Backend only
cd server && npm run dev

# Lint frontend
npm run lint

# Build frontend
npm run build
```

### MongoDB
```bash
# Voir les collections
db.users.find()
db.products.find()
db.requests.find()

# Compter les documents
db.users.count()
db.products.count()
```

---

## 🐛 Troubleshooting

### "Connection refused" pour API
```
✅ Vérifiez que backend tourne sur port 5000
✅ Vérifiez VITE_API_URL dans .env
✅ Vérifiez CORS_ORIGIN dans /server/.env
```

### "Cannot GET /api/products"
```
✅ Vérifiez que les routes sont importées dans app.js
✅ Vérifiez que MongoDB est connectée
✅ Attendez quelques secondes, les cold starts peuvent être lents
```

### Authentification échoue
```
✅ Vérifiez JWT_SECRET dans /server/.env
✅ Vérifiez que le token est envoyé dans Authorization header
✅ Vérifiez que le token n'est pas expiré
```

### Produit non créé
```
✅ Vérifiez que vous êtes connecté
✅ Vérifiez que votre role est "seller" ou "farmer"
✅ Vérifiez que toutes les images sont uploadées
✅ Consultez la console pour les erreurs
```

---

## 📞 Support

### Documentation
- [MIGRATION.md](./MIGRATION.md) - Détails complets des changements
- [API_ENDPOINTS.md](./API_ENDPOINTS.md) - Tous les endpoints
- [CHANGES_SUMMARY.md](./CHANGES_SUMMARY.md) - Résumé des changements
- [README.md](./README.md) - Vue d'ensemble du projet

### Propriétaire
**Seydith** - Tous droits réservés © 2026

---

## ✨ Prochaines Étapes

1. **Tester les inscriptions** avec les 3 rôles
2. **Créer des produits** en tant que vendeur
3. **Créer des demandes** en tant qu'acheteur
4. **Accepter des demandes** en tant que vendeur
5. **Mettre à jour les pages frontend** avec les nouveaux composants

---

**Bienvenue sur AgroMarket! 🌾**
