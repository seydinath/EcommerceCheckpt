const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    images: {
      type: [String],
      validate: {
        validator: (arr) =>
          Array.isArray(arr) && arr.length >= 1 && arr.length <= 5,
        message: "Images must contain between 1 and 5 files",
      },
    },
    stock: { type: Number, default: 0, min: 0 },
    unit: {
      type: String,
      enum: ["kg", "ton", "liter", "piece", "bundle"],
      default: "kg",
    },
    category: {
      type: String,
      enum: [
        "vegetables",
        "fruits",
        "grains",
        "dairy",
        "meat",
        "herbs",
        "seeds",
        "equipment",
        "other",
      ],
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    isOrganic: { type: Boolean, default: false },
    harvestDate: { type: Date, default: null },
    origin: { type: String, default: "" },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
