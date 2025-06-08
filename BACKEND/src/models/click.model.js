import mongoose from "mongoose";

const clickSchema = new mongoose.Schema(
  {
    short_url: {
      type: String,
      required: true,
      index: true,
    },
    full_url: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: false,
      index: true, // Add index for analytics by IP
    },
    referer: {
      type: String,
      default: "Direct",
    },
    userAgent: {
      type: String,
    },
    location: {
      country: { type: String, index: true }, // Add index for analytics by country
      city: String,
      region: String,
      isp: String,
      lat: Number,
      lon: Number,
    },
    device: {
      os: String,
      browser: String,
      deviceType: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true, // Add index for analytics by time
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true, // Add index for analytics by user
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Compound index for common analytics queries (optional, can be adjusted)
clickSchema.index({ short_url: 1, timestamp: -1 });

const Click = mongoose.model("Click", clickSchema);

export default Click;