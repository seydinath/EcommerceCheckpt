const express = require("express");
const { authenticate } = require("../middleware/auth");
const Product = require("../models/Product");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");

const router = express.Router();

// uploads config
const UPLOAD_DIR = path.join(__dirname, "..", "uploads", "products");
try {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
} catch (error) {
  console.log(
    "Warning: Could not create upload directory (expected in read-only environments like Vercel). Uploads may fail."
  );
}

const storage = multer.memoryStorage();
const fileFilter = (_req, file, cb) => {
  if (/^image\//.test(file.mimetype)) return cb(null, true);
  cb(new Error("Only image files are allowed"));
};
const upload = multer({ storage, fileFilter });

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Public: list all products
router.get("/", async (req, res) => {
  try {
    let baseFilter = {};

    const { category } = req.query || {};
    if (category) {
      baseFilter.category = String(category);
    }

    const products = await Product.find(baseFilter)
      .populate("seller", "fullName businessName location")
      .sort({ createdAt: -1 })
      .lean();
    return res.json(products);
  } catch (e) {
    console.error("List products error:", e);
    return res.status(500).json({ error: "Failed to load products" });
  }
});

// Get distinct categories
router.get("/categories/list", async (_req, res) => {
  try {
    const cats = await Product.distinct("category", {
      category: { $nin: [null, "", undefined] },
    });
    return res.json(cats.sort());
  } catch (e) {
    console.error("Fetch categories error:", e);
    return res.status(500).json({ error: "Failed to load categories" });
  }
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id)
      .populate("seller", "fullName businessName location email phone")
      .lean();
    if (!prod)
      return res.status(404).json({ error: "Product not found" });
    return res.json(prod);
  } catch (e) {
    console.error("Get product error:", e);
    return res.status(500).json({ error: "Failed to load product" });
  }
});

// Create product (sellers and farmers only)
router.post(
  "/",
  authenticate,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user)
        return res.status(404).json({ error: "User not found" });

      // Only sellers and farmers can create products
      if (!["seller", "farmer"].includes(user.role)) {
        return res.status(403).json({
          error: "Only sellers and farmers can create products",
        });
      }

      const {
        title,
        description,
        price,
        stock,
        category,
        unit,
        isOrganic,
        harvestDate,
        origin,
      } = req.body || {};

      if (!title || price == null || !category) {
        return res
          .status(400)
          .json({
            error: "Title, price, and category are required",
          });
      }

      const files = req.files || [];
      if (files.length < 1)
        return res.status(400).json({ error: "At least 1 image is required" });

      const imageUrls = files.map((f) => {
        const b64 = Buffer.from(f.buffer).toString("base64");
        const mime = f.mimetype;
        return `data:${mime};base64,${b64}`;
      });

      const created = await Product.create({
        title,
        description: description || "",
        price: Number(price),
        images: imageUrls,
        stock: stock != null ? Number(stock) : 0,
        category,
        unit: unit || "kg",
        seller: req.userId,
        isOrganic: isOrganic === "true" || isOrganic === true,
        harvestDate: harvestDate ? new Date(harvestDate) : null,
        origin: origin || "",
      });

      const populated = await created.populate(
        "seller",
        "fullName businessName"
      );
      return res.status(201).json(populated);
    } catch (e) {
      console.error("Create product error:", e);
      return res.status(500).json({ error: "Failed to create product" });
    }
  }
);

// Get my products (sellers and farmers)
router.get("/my-products", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user)
      return res.status(404).json({ error: "User not found" });

    if (!["seller", "farmer"].includes(user.role)) {
      return res.status(403).json({
        error: "Only sellers and farmers can view their products",
      });
    }

    const products = await Product.find({ seller: req.userId }).sort({
      createdAt: -1,
    });
    return res.json(products);
  } catch (e) {
    console.error("Get my products error:", e);
    return res.status(500).json({ error: "Failed to load products" });
  }
});

// Update product (owner only)
router.put(
  "/:id",
  authenticate,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const existing = await Product.findById(req.params.id);
      if (!existing)
        return res.status(404).json({ error: "Product not found" });

      // Only owner can update
      if (existing.seller.toString() !== req.userId) {
        return res.status(403).json({
          error: "You can only update your own products",
        });
      }

      const files = req.files || [];
      const updates = { ...(req.body || {}), updatedAt: new Date() };

      if (updates.price != null) updates.price = Number(updates.price);
      if (updates.stock != null) updates.stock = Number(updates.stock);
      if (updates.isOrganic)
        updates.isOrganic = updates.isOrganic === "true" || updates.isOrganic === true;

      // Replace images if new ones uploaded
      if (files.length > 0) {
        updates.images = files.map((f) => {
          const b64 = Buffer.from(f.buffer).toString("base64");
          const mime = f.mimetype;
          return `data:${mime};base64,${b64}`;
        });
      }

      const updated = await Product.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      }).populate("seller", "fullName businessName");

      return res.json(updated);
    } catch (e) {
      console.error("Update product error:", e);
      return res.status(500).json({ error: "Failed to update product" });
    }
  }
);

// Delete product (owner only)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const existing = await Product.findById(req.params.id);
    if (!existing)
      return res.status(404).json({ error: "Product not found" });

    // Only owner can delete
    if (existing.seller.toString() !== req.userId) {
      return res.status(403).json({
        error: "You can only delete your own products",
      });
    }

    await Product.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (e) {
    console.error("Delete product error:", e);
    return res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
