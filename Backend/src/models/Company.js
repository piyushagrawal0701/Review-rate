const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    logo: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    foundedOn: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Company", companySchema);
