const { config } = require("../config/env");

const requestsByIp = new Map();

function createRateLimitMiddleware() {
  return function rateLimit(req, res, next) {
    const now = Date.now();
    const key = req.ip || "unknown";
    const existing = requestsByIp.get(key) || [];

    const validWindow = existing.filter(
      (timestamp) => now - timestamp < config.rateLimitWindowMs
    );
    validWindow.push(now);
    requestsByIp.set(key, validWindow);

    if (validWindow.length > config.rateLimitMax) {
      return res.status(429).json({ error: "Too many requests" });
    }

    return next();
  };
}

module.exports = { createRateLimitMiddleware };
