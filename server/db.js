const mongoose = require("mongoose");
require("dotenv").config();

let cached = global.__mongoose;
if (!cached) {
  cached = global.__mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  
  if (!mongoUri) {
    throw new Error(
      "MONGODB_URI not configured. Check your .env file and refer to .env.example"
    );
  }

  if (!cached.promise) {
    // Connection options optimized for MongoDB Atlas and Local MongoDB
    const options = {
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    };

    cached.promise = mongoose
      .connect(mongoUri, options)
      .then((mongooseInstance) => {
        // Log connection success
        console.log("✅ Connected to MongoDB");
        
        // Log connection type
        if (mongoUri.includes("mongodb+srv")) {
          console.log("📍 Connected to MongoDB Atlas");
        } else {
          console.log("📍 Connected to Local MongoDB");
        }
        
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("❌ MongoDB Connection Error:", error.message);
        
        // Provide helpful error messages
        if (error.message.includes("ECONNREFUSED")) {
          console.error("💡 Local MongoDB is not running. Start with: mongod");
        } else if (error.message.includes("authentication failed")) {
          console.error("💡 Check your MongoDB Atlas credentials");
        } else if (error.message.includes("ENOTFOUND")) {
          console.error("💡 Invalid MongoDB URI or no internet connection");
        }
        
        throw error;
      });
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset on error to allow retry
    throw error;
  }
}

module.exports = connectDB;
