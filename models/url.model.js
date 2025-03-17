
import mongoose from "mongoose";
const UrlSchema = new mongoose.Schema({
    shortCode: { type: String, unique: true, required: true, index: true },
    longUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Url = mongoose.model("Url", UrlSchema);