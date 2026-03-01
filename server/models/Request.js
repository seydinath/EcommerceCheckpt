const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unit: {
      type: String,
      enum: ["kg", "ton", "liter", "piece", "bundle"],
      required: true,
    },
    message: {
      type: String,
      default: "",
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "canceled"],
      default: "pending",
      index: true,
    },
    proposedPrice: {
      type: Number,
      default: null,
      min: 0,
    },
    deliveryDate: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: "",
      maxlength: 500,
    },
    rejectionReason: {
      type: String,
      default: "",
      maxlength: 300,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
