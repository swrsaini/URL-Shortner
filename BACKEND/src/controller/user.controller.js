import { getAllUserUrls } from "../dao/user.dao.js";
import wrapAsync from "../utils/tryCatchWrapper.js"
import Click from "../models/click.model.js";

export const getAllUserUrlsController = wrapAsync(async (req,res) => {
    const {_id} = req.user;
    
    const urls = await getAllUserUrls(_id)
    res.status(200).json({urls})
})

export const getUserAnalyticsController = wrapAsync(async (req, res) => {
  const userId = req.user._id;
  // Aggregate analytics for this user
  const totalClicks = await Click.countDocuments({ userId });

  // Device stats
  const deviceAgg = await Click.aggregate([
    { $match: { userId } },
    { $group: { _id: "$device.deviceType", count: { $sum: 1 } } },
  ]);
  const deviceStats = Object.fromEntries(deviceAgg.map(d => [d._id || "Unknown", d.count]));

  // Browser stats
  const browserAgg = await Click.aggregate([
    { $match: { userId } },
    { $group: { _id: "$device.browser", count: { $sum: 1 } } },
  ]);
  const browserStats = Object.fromEntries(browserAgg.map(b => [b._id || "Unknown", b.count]));

  // Location stats (by country)
  const locationAgg = await Click.aggregate([
    { $match: { userId } },
    { $group: { _id: "$location.country", count: { $sum: 1 } } },
  ]);
  const locationStats = Object.fromEntries(locationAgg.map(l => [l._id || "Unknown", l.count]));

  // Source stats (referer)
  const sourceAgg = await Click.aggregate([
    { $match: { userId } },
    { $group: { _id: "$referer", count: { $sum: 1 } } },
  ]);
  const sourceStats = Object.fromEntries(sourceAgg.map(s => [s._id || "Direct", s.count]));

  res.json({ totalClicks, deviceStats, browserStats, locationStats, sourceStats });
});

export const getShortUrlAnalyticsController = wrapAsync(async (req, res) => {
  const userId = req.user._id;
  const { shortUrl } = req.params;
  // Only clicks for this user and this short URL
  const totalClicks = await Click.countDocuments({ userId, short_url: shortUrl });

  // Device stats
  const deviceAgg = await Click.aggregate([
    { $match: { userId, short_url: shortUrl } },
    { $group: { _id: "$device.deviceType", count: { $sum: 1 } } },
  ]);
  const deviceStats = Object.fromEntries(deviceAgg.map(d => [d._id || "Unknown", d.count]));

  // Browser stats
  const browserAgg = await Click.aggregate([
    { $match: { userId, short_url: shortUrl } },
    { $group: { _id: "$device.browser", count: { $sum: 1 } } },
  ]);
  const browserStats = Object.fromEntries(browserAgg.map(b => [b._id || "Unknown", b.count]));

  // Location stats (by country)
  const locationAgg = await Click.aggregate([
    { $match: { userId, short_url: shortUrl } },
    { $group: { _id: "$location.country", count: { $sum: 1 } } },
  ]);
  const locationStats = Object.fromEntries(locationAgg.map(l => [l._id || "Unknown", l.count]));

  // Source stats (referer)
  const sourceAgg = await Click.aggregate([
    { $match: { userId, short_url: shortUrl } },
    { $group: { _id: "$referer", count: { $sum: 1 } } },
  ]);
  const sourceStats = Object.fromEntries(sourceAgg.map(s => [s._id || "Direct", s.count]));

  res.json({ totalClicks, deviceStats, browserStats, locationStats, sourceStats });
});