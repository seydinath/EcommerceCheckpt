# 🌾 AgroMarket API Endpoints

**Version:** 1.0.0  
**Propriétaire:** Seydith  
**Base URL:** `http://localhost:5000/api`

---

## 🔐 Authentication

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "Jean Dupont",
  "role": "buyer|seller|farmer",
  "businessName": "Mon Commerce" (required for seller/farmer),
  "location": "Kenitra" (optional)
}

Response: 201
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "buyer|seller|farmer",
    "fullName": "Jean Dupont",
    "businessName": "Mon Commerce"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "buyer|seller|farmer",
    "fullName": "Jean Dupont",
    "businessName": "Mon Commerce",
    "location": "Kenitra"
  }
}
```

---

## 🌾 Products

### List Products (Public)
```http
GET /products
Query: ?category=vegetables

Response: 200 [
  {
    "_id": "product_id",
    "title": "Tomate Bio",
    "description": "Tomates biologiques fraiches",
    "price": 50,
    "images": ["data:image/png;base64,..."],
    "stock": 100,
    "unit": "kg",
    "category": "vegetables",
    "seller": {
      "_id": "user_id",
      "fullName": "Ali",
      "businessName": "Bio Farm"
    },
    "isOrganic": true,
    "harvestDate": "2026-03-01T00:00:00Z",
    "origin": "Kenitra",
    "rating": 4.5,
    "reviews": 12
  }
]
```

### Get Product by ID
```http
GET /products/:id

Response: 200
{
  "_id": "product_id",
  "title": "Tomate Bio",
  ...full product object...
}
```

### Get My Products (Seller/Farmer Only)
```http
GET /products/my-products
Authorization: Bearer token

Response: 200 [
  {...product objects...}
]
```

### Get Categories
```http
GET /products/categories/list

Response: 200 [
  "vegetables",
  "fruits",
  "grains",
  "dairy",
  "meat"
]
```

### Create Product (Seller/Farmer Only)
```http
POST /products
Content-Type: multipart/form-data
Authorization: Bearer token

FormData:
- title: "Tomate Bio"
- description: "Tomates biologiques"
- price: 50
- stock: 100
- category: "vegetables"
- unit: "kg"
- isOrganic: true
- harvestDate: "2026-03-01"
- origin: "Kenitra"
- images: [File, File, ...]

Response: 201
{
  "_id": "new_product_id",
  "title": "Tomate Bio",
  ...complete product object...
}
```

### Update Product (Owner Only)
```http
PUT /products/:id
Content-Type: multipart/form-data
Authorization: Bearer token

FormData: (same as create, all optional)

Response: 200
{...updated product object...}
```

### Delete Product (Owner Only)
```http
DELETE /products/:id
Authorization: Bearer token

Response: 200
{"success": true}
```

---

## 💬 Product Requests

### Create Request (Buyer Only)
```http
POST /requests
Content-Type: application/json
Authorization: Bearer token

{
  "productId": "product_id",
  "quantity": 10,
  "unit": "kg",
  "message": "Livraison demain si possible"
}

Response: 201
{
  "_id": "request_id",
  "buyer": "buyer_id",
  "product": {
    "_id": "product_id",
    "title": "Tomate Bio",
    "price": 50
  },
  "seller": {
    "_id": "seller_id",
    "fullName": "Ali",
    "businessName": "Bio Farm"
  },
  "quantity": 10,
  "unit": "kg",
  "status": "pending",
  "message": "Livraison demain si possible",
  "createdAt": "2026-03-01T10:00:00Z"
}
```

### Get My Requests (Buyer Only)
```http
GET /requests/my-requests
Authorization: Bearer token

Response: 200 [
  {...request objects sorted by createdAt...}
]
```

### Get Received Requests (Seller/Farmer Only)
```http
GET /requests/received
Authorization: Bearer token

Response: 200 [
  {...request objects for this seller...}
]
```

### Get Request by ID
```http
GET /requests/:id
Authorization: Bearer token

Response: 200
{...complete request object...}
```

### Accept Request (Seller/Farmer Only)
```http
PATCH /requests/:id/accept
Content-Type: application/json
Authorization: Bearer token

{
  "proposedPrice": 45,
  "deliveryDate": "2026-03-05T10:00:00Z",
  "notes": "Prêt à la livraison"
}

Response: 200
{
  "_id": "request_id",
  ...request object with status: "accepted"...
}
```

### Reject Request (Seller/Farmer Only)
```http
PATCH /requests/:id/reject
Content-Type: application/json
Authorization: Bearer token

{
  "rejectionReason": "Stock insuffisant"
}

Response: 200
{
  "_id": "request_id",
  ...request object with status: "rejected"...
}
```

### Complete Request (Seller/Farmer Only)
```http
PATCH /requests/:id/complete
Authorization: Bearer token

Response: 200
{
  "_id": "request_id",
  ...request object with status: "completed"...
}
```

### Cancel Request (Buyer Only)
```http
PATCH /requests/:id/cancel
Authorization: Bearer token

Response: 200
{
  "_id": "request_id",
  ...request object with status: "canceled"...
}
```

---

## 👤 User Profile

### Get My Profile
```http
GET /me
Authorization: Bearer token

Response: 200
{
  "id": "user_id",
  "email": "user@example.com",
  "fullName": "Jean Dupont",
  "role": "buyer|seller|farmer",
  "businessName": "Mon Commerce",
  "phone": "0659123456",
  "location": "Kenitra",
  "description": "Description du commerce",
  "profileImage": "url_or_base64"
}
```

### Update My Profile
```http
PUT /me
Content-Type: application/json
Authorization: Bearer token

{
  "fullName": "Jean Dupont",
  "email": "newemail@example.com",
  "password": "newpassword123",
  "phone": "0659123456",
  "location": "Casablanca",
  "description": "New description"
}

Response: 200
{...updated user object...}
```

---

## 🔑 HTTP Headers

All authenticated endpoints require:
```http
Authorization: Bearer <jwt_token>
```

---

## 📊 Request Statuses

| Status | Description | Changeable by |
|--------|-------------|---------------|
| `pending` | En attente | Buyer (cancel), Seller (accept/reject) |
| `accepted` | Acceptée | Seller (marked when accepted) |
| `rejected` | Rejetée | Seller (marked when rejected) |
| `completed` | Complétée | Seller (mark as complete) |
| `canceled` | Annulée | Buyer (cancel) |

---

## 🛡️ Authorization Rules

| Action | Role(s) allowed |
|--------|-----------------|
| Create product | seller, farmer |
| Update product | Product owner |
| Delete product | Product owner |
| Create request | buyer |
| Cancel request | Request buyer |
| Accept request | Request seller |
| Reject request | Request seller |
| Complete request | Request seller |
| Get received requests | seller, farmer |
| Get my requests | buyer |

---

## 🚨 Error Responses

```http
401 Unauthorized
{"error": "Unauthorized"}

403 Forbidden
{"error": "Only sellers and farmers can create products"}

404 Not Found
{"error": "Product not found"}

400 Bad Request
{"error": "Title and price are required"}

500 Server Error
{"error": "Server error"}
```

---

**Documentation API AgroMarket**  
Propriétaire: Seydith  
Tous droits réservés © 2026
