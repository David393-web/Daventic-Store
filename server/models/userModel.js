const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs"); // ✅ Import bcryptjs for pre-save hook

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Your password must be longer than 6 characters'],
    select: false, // Do not return password by default
  },
    accountType: { // ✅ Fixed typo: accoutType -> accountType
      type: String,
      enum: ["user", "seller"],
      required: true, // Ensure accountType is always provided
    },
     
    profilePicture: {
      type: String,
      default: "https://placehold.co/100x100/CCCCCC/white?text=Avatar",
    },
    storeName: {
      type: String,
      trim: true,
      unique: true,
      sparse: true, // Allows null values, only unique if not null
      // ✅ Add required if seller, matching frontend logic
      required: function() { return this.accountType === 'seller'; }
    },
    craftCategories: {
      type: [String],
      // ✅ Add required if seller, matching frontend logic
      required: function() { return this.accountType === 'seller'; }
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
      // `expires` in schema options is for MongoDB TTL index, not directly for Date comparison.
      // Use logic to check Date.now() in controller.
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
