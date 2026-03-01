const mongoose = require("mongoose");
const connectDB = require("./db");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Import models
const User = require("./models/User");
const Category = require("./models/Category");
const Product = require("./models/Product");

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({ role: { $in: ["seller", "farmer"] } });
    console.log("🗑️  Cleared existing products and categories");

    // Hash password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Create seller/farmer user
    let seller = await User.findOne({ email: "seller@agromarket.com" });
    if (!seller) {
      seller = await User.create({
        email: "seller@agromarket.com",
        passwordHash: hashedPassword,
        fullName: "Bio Farm Kenitra",
        role: "seller",
        businessName: "Bio Farm Kenitra",
        location: "Kenitra, Morocco",
        phone: "777777777",
        description: "High-quality organic agricultural products"
      });
      console.log("✅ Created seller user: seller@agromarket.com");
    }

    let farmer = await User.findOne({ email: "farmer@agromarket.com" });
    if (!farmer) {
      farmer = await User.create({
        email: "farmer@agromarket.com",
        passwordHash: hashedPassword,
        fullName: "Mountain Farm",
        role: "farmer",
        businessName: "Mountain Farm",
        location: "Atlus Region, Morocco",
        phone: "777777777",
        description: "Fresh seasonal produce from local mountains"
      });
      console.log("✅ Created farmer user: farmer@agromarket.com");
    }

    // Create categories
    const categories = [
      { name: "Vegetables", slug: "vegetables", description: "Fresh vegetables" },
      { name: "Fruits", slug: "fruits", description: "Fresh fruits" },
      { name: "Grains", slug: "grains", description: "Organic grains" },
      { name: "Dairy", slug: "dairy", description: "Dairy products" },
      { name: "Herbs", slug: "herbs", description: "Fresh herbs" },
      { name: "Equipment", slug: "equipment", description: "Agricultural equipment" },
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Create products
    const products = [
      {
        title: "Organic Tomatoes",
        description: "Fresh, juicy organic tomatoes from our farm",
        price: 45,
        category: "vegetables",
        images: ["https://via.placeholder.com/400?text=Organic+Tomatoes"],
        seller: seller._id,
        stock: 100,
        unit: "kg",
        isOrganic: true,
        harvestDate: new Date("2026-02-28"),
        origin: "Kenitra",
        rating: 4.8,
        reviews: 12,
      },
      {
        title: "Local Lemons",
        description: "Sweet and juicy lemons from mountain farms",
        price: 35,
        category: "fruits",
        images: ["https://via.placeholder.com/400?text=Local+Lemons"],
        seller: farmer._id,
        stock: 80,
        unit: "kg",
        isOrganic: true,
        harvestDate: new Date("2026-02-25"),
        origin: "Atlas Mountains",
        rating: 4.9,
        reviews: 25,
      },
      {
        title: "Wheat Grains",
        description: "High-quality wheat for milling",
        price: 120,
        category: "grains",
        images: ["https://via.placeholder.com/400?text=Wheat+Grains"],
        seller: seller._id,
        stock: 50,
        unit: "ton",
        isOrganic: true,
        harvestDate: new Date("2026-01-15"),
        origin: "Souss Region",
        rating: 4.7,
        reviews: 8,
      },
      {
        title: "Fresh Carrots",
        description: "Crunchy, sweet carrots",
        price: 30,
        category: "vegetables",
        images: ["https://via.placeholder.com/400?text=Fresh+Carrots"],
        seller: farmer._id,
        stock: 150,
        unit: "kg",
        isOrganic: true,
        harvestDate: new Date("2026-02-26"),
        origin: "Kenitra",
        rating: 4.6,
        reviews: 15,
      },
      {
        title: "Strawberries",
        description: "Red, ripe strawberries",
        price: 85,
        category: "fruits",
        images: ["https://via.placeholder.com/400?text=Strawberries"],
        seller: seller._id,
        stock: 60,
        unit: "kg",
        isOrganic: true,
        harvestDate: new Date("2026-02-27"),
        origin: "Loukkos Valley",
        rating: 4.9,
        reviews: 35,
      },
      {
        title: "Fresh Mint",
        description: "Aromatic Moroccan mint",
        price: 15,
        category: "herbs",
        images: ["https://via.placeholder.com/400?text=Fresh+Mint"],
        seller: farmer._id,
        stock: 200,
        unit: "bundle",
        isOrganic: true,
        harvestDate: new Date("2026-02-28"),
        origin: "Fes Region",
        rating: 5.0,
        reviews: 42,
      },
      {
        title: "Olive Oil (1L)",
        description: "Extra virgin cold-pressed olive oil",
        price: 180,
        category: "dairy",
        images: ["https://via.placeholder.com/400?text=Olive+Oil"],
        seller: seller._id,
        stock: 40,
        unit: "liter",
        isOrganic: true,
        harvestDate: new Date("2025-12-01"),
        origin: "Meknes",
        rating: 4.9,
        reviews: 30,
      },
      {
        title: "Honey (500g)",
        description: "Pure wildflower honey from local bees",
        price: 95,
        category: "dairy",
        images: ["https://via.placeholder.com/400?text=Honey"],
        seller: farmer._id,
        stock: 75,
        unit: "piece",
        isOrganic: true,
        harvestDate: new Date("2025-11-15"),
        origin: "Anti-Atlas",
        rating: 5.0,
        reviews: 28,
      },
      {
        title: "Garlic Bulbs",
        description: "Fresh garlic from our organic farm",
        price: 25,
        category: "vegetables",
        images: ["https://via.placeholder.com/400?text=Garlic"],
        seller: seller._id,
        stock: 120,
        unit: "kg",
        isOrganic: true,
        harvestDate: new Date("2026-01-20"),
        origin: "Kenitra",
        rating: 4.7,
        reviews: 10,
      },
      {
        title: "Eggplants",
        description: "Purple eggplants, perfect for grilling",
        price: 40,
        category: "vegetables",
        images: ["https://via.placeholder.com/400?text=Eggplants"],
        seller: farmer._id,
        stock: 90,
        unit: "kg",
        isOrganic: true,
        harvestDate: new Date("2026-02-24"),
        origin: "Souss",
        rating: 4.5,
        reviews: 7,
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    console.log("\n✨ Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Seller users: 2`);
    console.log(`   - Categories: ${createdCategories.length}`);
    console.log(`   - Products: ${createdProducts.length}`);
    console.log("\n📞 Test Credentials:");
    console.log("   Seller: seller@agromarket.com / password123");
    console.log("   Farmer: farmer@agromarket.com / password123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
