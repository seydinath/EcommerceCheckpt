const express = require("express");
const mongoose = require("mongoose");
const Request = require("../models/Request");
const Product = require("../models/Product");
const User = require("../models/User");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// Get all requests for current seller/farmer
router.get("/received", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user)
      return res.status(404).json({ error: "User not found" });

    // Only sellers and farmers can receive requests
    if (!["seller", "farmer"].includes(user.role)) {
      return res.status(403).json({
        error: "Only sellers and farmers can view received requests",
      });
    }

    const requests = await Request.find({ seller: req.userId })
      .populate("buyer", "fullName email businessName location")
      .populate("product", "title price unit category images")
      .sort({ createdAt: -1 });

    return res.json(requests);
  } catch (e) {
    console.error("Error fetching received requests:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Get all requests for current buyer
router.get("/my-requests", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user)
      return res.status(404).json({ error: "User not found" });

    // Only buyers can view their requests
    if (user.role !== "buyer") {
      return res.status(403).json({
        error: "Only buyers can view their requests",
      });
    }

    const requests = await Request.find({ buyer: req.userId })
      .populate("seller", "fullName businessName location email")
      .populate("product", "title price unit category images")
      .sort({ createdAt: -1 });

    return res.json(requests);
  } catch (e) {
    console.error("Error fetching buyer requests:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Create a new request (buyer creates request)
router.post("/", authenticate, async (req, res) => {
  try {
    const { productId, quantity, unit, message } = req.body || {};

    if (!productId || !quantity || !unit) {
      return res.status(400).json({
        error: "Product ID, quantity, and unit are required",
      });
    }

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ error: "Product not found" });

    const buyer = await User.findById(req.userId);
    if (!buyer)
      return res.status(404).json({ error: "User not found" });

    if (buyer.role !== "buyer") {
      return res.status(403).json({
        error: "Only buyers can create requests",
      });
    }

    // Don't allow buyer to request from themselves
    if (product.seller.toString() === req.userId) {
      return res.status(400).json({
        error: "Cannot request from your own product",
      });
    }

    const request = await Request.create({
      buyer: req.userId,
      product: productId,
      seller: product.seller,
      quantity,
      unit,
      message: message ? String(message).substring(0, 500) : "",
    });

    const populated = await request.populate([
      { path: "seller", select: "fullName businessName" },
      { path: "product", select: "title price" },
    ]);

    return res.status(201).json(populated);
  } catch (e) {
    console.error("Error creating request:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Accept a request (seller/farmer accepts)
router.patch("/:id/accept", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { proposedPrice, deliveryDate, notes } = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid request ID" });
    }

    const request = await Request.findById(id);
    if (!request)
      return res.status(404).json({ error: "Request not found" });

    // Only the seller can accept their own request
    if (request.seller.toString() !== req.userId) {
      return res.status(403).json({
        error: "Only the seller can accept this request",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        error: "Can only accept pending requests",
      });
    }

    request.status = "accepted";
    if (proposedPrice !== undefined) request.proposedPrice = proposedPrice;
    if (deliveryDate) request.deliveryDate = new Date(deliveryDate);
    if (notes) request.notes = String(notes).substring(0, 500);

    await request.save();
    const populated = await request.populate([
      { path: "buyer", select: "fullName email businessName" },
      { path: "product", select: "title price" },
    ]);

    return res.json(populated);
  } catch (e) {
    console.error("Error accepting request:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Reject a request (seller/farmer rejects)
router.patch("/:id/reject", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { rejectionReason } = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid request ID" });
    }

    const request = await Request.findById(id);
    if (!request)
      return res.status(404).json({ error: "Request not found" });

    // Only the seller can reject their own request
    if (request.seller.toString() !== req.userId) {
      return res.status(403).json({
        error: "Only the seller can reject this request",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        error: "Can only reject pending requests",
      });
    }

    request.status = "rejected";
    if (rejectionReason) {
      request.rejectionReason = String(rejectionReason).substring(0, 300);
    }

    await request.save();
    return res.json({
      message: "Request rejected",
      request: request,
    });
  } catch (e) {
    console.error("Error rejecting request:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Complete a request (seller/farmer marks as completed)
router.patch("/:id/complete", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid request ID" });
    }

    const request = await Request.findById(id);
    if (!request)
      return res.status(404).json({ error: "Request not found" });

    // Only the seller can complete their own request
    if (request.seller.toString() !== req.userId) {
      return res.status(403).json({
        error: "Only the seller can complete this request",
      });
    }

    if (request.status !== "accepted") {
      return res.status(400).json({
        error: "Can only complete accepted requests",
      });
    }

    request.status = "completed";
    await request.save();
    const populated = await request.populate([
      { path: "buyer", select: "fullName businessName" },
      { path: "product", select: "title price" },
    ]);

    return res.json(populated);
  } catch (e) {
    console.error("Error completing request:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Cancel a request (buyer cancels)
router.patch("/:id/cancel", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid request ID" });
    }

    const request = await Request.findById(id);
    if (!request)
      return res.status(404).json({ error: "Request not found" });

    // Only the buyer can cancel their own request
    if (request.buyer.toString() !== req.userId) {
      return res.status(403).json({
        error: "Only the buyer can cancel this request",
      });
    }

    if (!["pending", "accepted"].includes(request.status)) {
      return res.status(400).json({
        error: "Can only cancel pending or accepted requests",
      });
    }

    request.status = "canceled";
    await request.save();

    return res.json({
      message: "Request canceled",
      request: request,
    });
  } catch (e) {
    console.error("Error canceling request:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Get request by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid request ID" });
    }

    const request = await Request.findById(id)
      .populate("buyer", "fullName email businessName location")
      .populate("seller", "fullName email businessName location")
      .populate("product", "title price unit category images");

    if (!request)
      return res.status(404).json({ error: "Request not found" });

    // Only buyer or seller can view the request
    if (
      request.buyer._id.toString() !== req.userId &&
      request.seller._id.toString() !== req.userId
    ) {
      return res.status(403).json({
        error: "You don't have access to this request",
      });
    }

    return res.json(request);
  } catch (e) {
    console.error("Error fetching request:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
