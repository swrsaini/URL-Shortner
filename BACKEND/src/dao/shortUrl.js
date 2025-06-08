import axios from "axios";
import Click from "../models/click.model.js";
import urlSchema from "../models/shortUrl.model.js";
import { UAParser } from "ua-parser-js";

export const saveShortUrl = async (url, shortUrl, userId) => {
  try {
    const newUrl = new urlSchema({
      full_url: url,
      short_url: shortUrl,
    });
    if (userId) {
      newUrl.userId = userId;
    }
    await newUrl.save();
    
  } catch (err) {
    if (err.code == 11000) {
      throw new ConflictError("Short URL already exists");
    }
    throw new Error(err);
  }
};

export const getShortUrl = async (id) => {
  const url = await urlSchema.findOneAndUpdate(
    { short_url: id },
    { $inc: { clicks: 1 } }
  );
  return url;
};

export const getCustomShortUrl = async (slug) => {
  return await urlSchema.findOne({ short_url: slug });
};

export const getUserUrls = async (userId) => {
  return await urlSchema.find({ userId }).sort({ createdAt: -1 });
};

export const saveCLick = async (req,short_url) => {
    const url = await urlSchema.findOne({ short_url });
  // Extract the correct IP address (first in x-forwarded-for, or remoteAddress)
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (ip && typeof ip === "string" && ip.includes(",")) {
    ip = ip.split(",")[0].trim();
  }
  // Remove IPv6 prefix if present (e.g., ::ffff:127.0.0.1)
  if (ip && ip.startsWith("::ffff:")) {
    ip = ip.substring(7);
  }
  const referer = req.get("Referer") || "Direct";
  const userAgent = req.get("User-Agent");
  const timestamp = new Date();

  // Parse device info from user agent
  let device = {};
  if (userAgent) {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    device = {
      os: result.os.name || "",
      browser: result.browser.name || "",
      deviceType: result.device.type || "Desktop",
    };
  }

  // Get location info using ip-api.com (free, no auth)
  let location = {};
  try {
    const geo = await axios.get(`http://ip-api.com/json/${ip}`);
    location = {
      country: geo.data.country,
      city: geo.data.city,
      isp: geo.data.isp,
      region: geo.data.regionName,
      lat: geo.data.lat,
      lon: geo.data.lon,
    };
  } catch (err) {
    console.error("Geo lookup failed", err.message);
  }

  try{
    const clickData = new Click({
    short_url: short_url,
    full_url: url.full_url,
    ip,
    referer,
    userAgent,
    location,
    device,
    timestamp,
  });

  await clickData.save();
}catch (err) {
    console.error("Error saving click data", err.message);
  }

};
