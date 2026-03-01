# 🌾 Migration vers AgroMarket - Documentation
**Propriétaire:** Seydith  
**Projet:** Transformation de Keni Sweet Flowers vers AgroMarket

## Résumé de la Migration

Transformation complète de la plateforme e-commerce floral "Keni Sweet Flowers" vers une plateforme agricole "AgroMarket" avec système de demandes de produits.

---

## 📊 Changements Majeurs

### 1. Licences & Droits de Propriété ✅
- **Propriétaire:** Seydith
- **License:** Proprietary - All Rights Reserved
- Packages renommés :
  - Frontend: `agromarket-frontend` (v1.0.0)
  - Backend: `agromarket-backend` (v1.0.0)
- README.md mis à jour avec info propriétaire

### 2. Modèles de Données ✅

#### **User Model** (Modifié)
```javascript
{
  email: String (unique),
  passwordHash: String,
  fullName: String (required),
  role: "buyer" | "seller" | "farmer" (required),
  businessName: String (optional, required for seller/farmer),
  phone: String,
  location: String,
  description: String,
  profileImage: String,
  timestamps: true
}
```

**Différence:** Ancien modèle avait `role: ["user", "admin"]`

#### **Product Model** (Modifié)
```javascript
{
  title: String (required),
  description: String,
  price: Number (required),
  images: Array (1-5 images),
  stock: Number,
  unit: "kg" | "ton" | "liter" | "piece" | "bundle",
  category: "vegetables" | "fruits" | "grains" | "dairy" | "meat" | "herbs" | "seeds" | "equipment" | "other",
  seller: ObjectId (ref: User, required),
  isOrganic: Boolean,
  harvestDate: Date,
  origin: String,
  rating: Number,
  reviews: Number,
  timestamps: true
}
```

**Différence:** Ancien modèle avait `category: String` simpl et pas de champ `seller`

#### **Request Model** (NOUVEAU)
```javascript
{
  buyer: ObjectId (ref: User, required),
  product: ObjectId (ref: Product, required),
  seller: ObjectId (ref: User, required),
  quantity: Number (required, min: 1),
  unit: String (required),
  message: String (max: 500),
  status: "pending" | "accepted" | "rejected" | "completed" | "canceled",
  proposedPrice: Number,
  deliveryDate: Date,
  notes: String (max: 500),
  rejectionReason: String (max: 300),
  timestamps: true
}
```

### 3. Routes & Contrôleurs ✅

#### **Authentication** (`/api/auth`)
- ✅ `POST /register` - Mise à jour avec validation des rôles
  - Paramètres: email, password, fullName, role, businessName (optionnel), location (optionnel)
  - Validation: role doit être "buyer", "seller", ou "farmer"
  - Validation: sellers/farmers doivent avoir un businessName
- ✅ `POST /login` - Mise à jour pour inclure businessName et location dans la réponse

#### **Products** (`/api/products`)
- ✅ `GET /` - List publique des produits (populate seller)
- ✅ `GET /categories/list` - Distinct categories
- ✅ `GET /:id` - Get single product (populate seller)
- ✅ `POST /` - Crée un produit (sellers/farmers uniquement)
  - Paramètres: title, description, price, stock, category, unit, isOrganic, harvestDate, origin
  - Images: 1-5 fichiers autorisés
- ✅ `GET /my-products` (Nouveau endpoint) - Get ses propres produits
- ✅ `PUT /:id` - Modify produit (owner uniquement)
- ✅ `DELETE /:id` - Delete produit (owner uniquement)

#### **Requests** (`/api/requests`) - NOUVEAU
- ✅ `POST /` - Créer une demande (buyers uniquement)
  - Paramètres: productId, quantity, unit, message (optionnel)
  - Création automatique du seller basé sur le product
- ✅ `GET /my-requests` - Get ses demandes (buyers uniquement)
- ✅ `GET /received` - Get demandes reçues (sellers/farmers uniquement)
- ✅ `GET /:id` - Get une demande (buyer ou seller uniquement)
- ✅ `PATCH /:id/accept` - Accepter une demande (seller uniquement)
  - Paramètres: proposedPrice (optionnel), deliveryDate (optionnel), notes (optionnel)
- ✅ `PATCH /:id/reject` - Rejeter une demande (seller uniquement)
  - Paramètres: rejectionReason (optionnel)
- ✅ `PATCH /:id/complete` - Marquer comme complétée (seller uniquement)
- ✅ `PATCH /:id/cancel` - Annuler une demande (buyer uniquement)

#### **Middleware** 
- ✅ `authenticate()` - Fonction authentification (alias pour authRequired)
- Mis à jour pour support des 3 rôles

### 4. Thème UI ✅

#### **Couleurs**
Ancien thème: "blush-pop" (rose/floral)
```css
Thème actuel (v4):
--color-blush-pop-500: #f70887
--color-plum-500: #e41bbc
```

Nouveau thème: Agricole (vert & terre)
```css
--color-agro-green-500: #3d8a3d (vert principal)
--color-agro-earth-500: #b8843a (terre/or)
--color-neutral-500: #888888
```

**Fichiers modifiés:**
- `src/theme/mantineTheme.ts` - Palettes mises à jour
- `src/index.css` - Tokens Tailwind v4 mis à jour

### 5. Composants Frontend ✅

#### Créés
- **RoleSelector.tsx** - Sélection du rôle lors de l'inscription
- **ProductRequestForm.tsx** - Formulaire pour créer une demande
- **MyRequestsList.tsx** - Affichage des demandes de l'acheteur
- **ReceivedRequestsList.tsx** - Affichage des demandes reçues (pour sellers/farmers)

### 6. Traductions i18n ✅

#### Fichiers mises à jour
- `src/locales/frensh.json` - Traductions françaises (partiellement mise à jour)
- `src/locales/english.json` - À mettre à jour
- `src/locales/arabe.json` - À mettre à jour

**Termes agricoles ajoutés:**
- `role.buyer`, `role.seller`, `role.farmer`
- `product.vegetables`, `product.fruits`, `product.grains`, etc.
- `request.status.*`, `request.submit`, `request.cancel`, etc.
- `features.directConnection`, `features.fairPrices`, `features.sustainability`

---

## 📁 Structure des Fichiers Modifiés

```
server/
  models/
    User.js ✅ (rôles, business info)
    Product.js ✅ (categories, seller, agricole fields)
    Request.js ✅ (NEW)
  routes/
    auth.js ✅ (register/login updated)
    products.js ✅ (seller-based, no admin)
    requests.js ✅ (NEW)
  middleware/
    auth.js ✅ (authenticate function added)
  app.js ✅ (requests route imported)

src/
  theme/
    mantineTheme.ts ✅ (agricultural colors)
  index.css ✅ (v4 tokens updated)
  components/
    RoleSelector.tsx ✅ (NEW)
    ProductRequestForm.tsx ✅ (NEW)
    MyRequestsList.tsx ✅ (NEW)
    ReceivedRequestsList.tsx ✅ (NEW)
  locales/
    frensh.json ✅ (partially updated)

package.json ✅ (name, author, version)
server/package.json ✅ (name, author, version)
README.md ✅ (updated)
```

---

## 🔧 Configuration d'Environnement

### `.env` (Frontend - Racine)
```env
VITE_API_URL=http://localhost:5000
```

### `.env` (Backend - `/server`)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:5173
```

---

## 🚀 Prochaines Étapes

### Priorité 1: Pages Utilisateur
- [ ] Page `Auth.tsx` mise à jour avec RoleSelector
- [ ] Page `Products.tsx` avec filtres agricoles
- [ ] Page `ProductDetail.tsx` avec ProductRequestForm
- [ ] Page `MyRequests.tsx` pour acheteurs
- [ ] Page `ReceivedRequests.tsx` pour sellers/farmers
- [ ] Page Dashboard seller/farmer

### Priorité 2: Traductions Complètes
- [ ] `english.json` - Mise à jour complète
- [ ] `arabe.json` - Mise à jour complète
- [ ] Tests de toutes les langues

### Priorité 3: Tests & Validation
- [ ] Tests d'authentification avec 3 rôles
- [ ] Tests de création/gestion de produits
- [ ] Tests du système de demandes
- [ ] Tests du flux acheteur-vendeur-agriculteur

### Priorité 4: Améliorations
- [ ] Système de notifications
- [ ] Notifications par email
- [ ] Système de ratings/reviews
- [ ] Historique des transactions
- [ ] Statistiques vendeur/agriculteur

---

## 📝 Notes Importantes

1. **Backward Compatibility**: Les anciens rôles "user" et "admin" ne sont plus supportés. Tous les utilisateurs existants doivent être migrés.

2. **Panier vs Demandes**: Le système de panier traditionnel a été remplacé par un système de demandes de produits. Les acheteurs peuvent faire des demandes individuelles pour chaque produit.

3. **Propriété de Produit**: Chaque produit maintenant a un `seller` (ObjectId du User qui l'a créé). Seul le propriétaire peut modifier/supprimer son produit.

4. **Permissions**: 
   - Acheteurs: Peuvent consulter produits et créer demandes
   - Vendeurs/Agriculteurs: Peuvent créer/gérer produits et répondre aux demandes
   - Admin: Removed (pas d'admin role dans ce système)

---

**Migration complétée par:** Seydith  
**Date:** Mars 2026  
**Propriétaire:** Seydith - Tous droits réservés
