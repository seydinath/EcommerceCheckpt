# 🚀 MongoDB Atlas Migration Guide

## Quick Start

### Step 1: Create MongoDB Atlas Cluster
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create FREE account
3. Create new cluster (AWS, region varies, free tier)
4. Wait 5-10 minutes for deployment

### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Drivers" (Node.js, v5.0 or later)
3. Copy the connection string
4. Format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/databasename?retryWrites=true&w=majority`

### Step 3: Update `.env`
```bash
# Change this line in server/.env:
MONGODB_URI=mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/agromarket?retryWrites=true&w=majority
```

### Step 4: Test Connection
```bash
cd server
npm run dev
# You should see: ✅ Connected to MongoDB
#                📍 Connected to MongoDB Atlas
```

---

## MongoDB Atlas Setup Details

### Creating Database User
1. In Atlas Dashboard → Database Access
2. Click "Add New Database User"
3. Username: `admin` (or custom)
4. Password: Use auto-generated (very strong) or create custom
5. Database: `admin`
6. Built-in Role: `dbOwner`
7. Click "Add User"

### Whitelist Your IP
1. In Atlas Dashboard → Network Access
2. Click "Add IP Address"
3. Choose "Add Current IP Address" OR "Allow Access from Anywhere" (0.0.0.0/0)
   - ⚠️ For production, whitelist specific IPs only

### Connection String Examples

**Local MongoDB (Development)**
```
mongodb://localhost:27017/agromarket
```

**MongoDB Atlas (Production)**
```
mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/agromarket?retryWrites=true&w=majority
```

**with Special Characters in Password** (URL encode)
```
mongodb+srv://admin:pass%40word%23123@cluster0.xxxxx.mongodb.net/agromarket?retryWrites=true&w=majority
```

---

## Troubleshooting

### Error: "authentication failed"
- ✅ Check username and password in connection string
- ✅ Ensure user has `dbOwner` role
- ✅ URL-encode special characters in password

### Error: "ENOTFOUND"
- ✅ Check internet connection
- ✅ Verify cluster name in connection string
- ✅ Check firewall settings

### Error: "Timeout" after 5 seconds
- ✅ Whitelist your IP address
- ✅ Check if Atlas cluster is running
- ✅ Increase timeout in `db.js` (current: 5000ms)

### Connection Pool Issues
- ✅ Increase `maxPoolSize` in `db.js` for high-traffic apps
- ✅ Check concurrent connections

---

## Environment Variables

### Development (.env)
```dotenv
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/agromarket
JWT_SECRET=dev_key_12345
CORS_ORIGIN=http://localhost:8080
```

### Production (.env.production)
```dotenv
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/agromarket?retryWrites=true&w=majority
JWT_SECRET=change_to_strong_secret_key
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

---

## Switching Between Local and Atlas

### Use Local MongoDB
```bash
# Install MongoDB Community Edition locally
# Or use Docker: docker run -d -p 27017:27017 mongo

# In server/.env:
MONGODB_URI=mongodb://localhost:27017/agromarket

npm run dev
```

### Migrate to Atlas
```bash
# 1. Create Atlas cluster and get connection string
# 2. In server/.env:
MONGODB_URI=mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/agromarket?retryWrites=true&w=majority

# 3. Test connection
npm run dev

# 4. Run seed script (optional - repopulate if needed)
node seed.js
```

---

## Data Migration (if needed)

###  From Local to Atlas
```bash
# Step 1: Export from local MongoDB
mongodump --db agromarket --out ./backup

# Step 2: Import to Atlas
mongorestore --uri="mongodb+srv://admin:password@cluster.mongodb.net" ./backup/agromarket --db agromarket
```

### From Atlas to Local
```bash
# Step 1: Export from Atlas
mongodump --uri="mongodb+srv://admin:password@cluster.mongodb.net/agromarket" --out ./backup

# Step 2: Import to local
mongorestore --db agromarket ./backup/agromarket
```

---

## Atlas Features

### Backup & Recovery
- Automatic daily backups (free tier)
- Point-in-time recovery (paid)
- Manual snapshots available

### Monitoring
- Database performance charts
- Connection metrics
- Query analytics (paid)

### Alerts
- CPU usage
- Memory usage
- Replication lag
- Connection pool alerts

---

## Security Best Practices

1. ✅ Never commit `.env` to git (use `.env.example` instead)
2. ✅ Use strong passwords (32+ characters recommended)
3. ✅ Rotate credentials every 90 days
4. ✅ Use IP whitelist for production (not 0.0.0.0/0)
5. ✅ Enable SSL/TLS encryption (enabled by default)
6. ✅ Use VPC peering for private connections (paid feature)
7. ✅ Audit logs for all database access

---

## Free Tier Limitations

- **Storage:** 512 MB per database
- **Backup:** 7-day retention
- **Connections:** 500 concurrent connections max
- **Data Transfer:** Shared infrastructure
- **Availability:** Single region

For production apps, upgrade to paid tier for better performance.

---

## Support

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Schema Design Guide: https://docs.mongodb.com/manual/core/data-model-design/
- Connection String Reference: https://docs.mongodb.com/manual/reference/connection-string/

---

**Last Updated:** March 1, 2026
**Project:** AgroMarket - Agricultural E-Commerce Platform
