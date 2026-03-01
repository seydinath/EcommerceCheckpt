const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["buyer", "seller", "farmer"],
      default: "buyer",
      index: true,
      required: true,
    },
    businessName: {
      type: String,
      default: "",
      trim: true,
      // Required for sellers and farmers
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      // For sellers/farmers to describe their business
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
