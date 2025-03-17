import rateLimit from "express-rate-limit";
export const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit to 10 requests per minute per IP
    message: "Too many requests, please try again later."
});