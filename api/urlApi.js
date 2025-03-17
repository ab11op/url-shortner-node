import express from "express";
import { nanoid } from "nanoid";
import { Url } from "../models/url.model.js";
import { redisClient } from "./redisConn.js";
const router = express.Router()

router.post("/shorten", async (req, res) => {
    console.log('req body',req.body)
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: "URL is required" });

    const shortCode = nanoid(6);

    const url = new Url({ shortCode, longUrl });
    await url.save();

    // Store in Redis for faster lookups
    await redisClient.set(shortCode, longUrl, { EX: 86400 }); // Expires in 1 day

    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
});

router.get("/:shortCode", async (req, res) => {
    const { shortCode } = req.params;

    // First, check Redis Cache
    let longUrl = await redisClient.get(shortCode);
    console.log('long url',longUrl)
    if (longUrl) {
        console.log("Cache Hit ✅");
        return res.redirect(longUrl);
    }

    // If not in Redis, fetch from DB
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ error: "Short URL not found" });

    // Store in Redis for future requests
    await redisClient.set(shortCode, url.longUrl, { EX: 86400 }); // 1-day expiry

    console.log("Cache Miss ❌");
    res.redirect(url.longUrl);
});

export default router