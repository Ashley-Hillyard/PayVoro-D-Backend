const DEFAULT_PORT = 4100;

function toInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function toBool(value, fallback) {
  if (value === undefined) {
    return fallback;
  }

  return String(value).toLowerCase() === "true";
}

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: toInt(process.env.PORT, DEFAULT_PORT),
  dbPath: process.env.DB_PATH || "./data/dashboard.sqlite",
  apiPrefix: process.env.API_PREFIX || "/api",
  dashboardAdminKey: process.env.DASHBOARD_ADMIN_KEY || "",
  jwtSecret: process.env.JWT_SECRET || "change-me-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",
  enableRequestLogging: toBool(process.env.ENABLE_REQUEST_LOGGING, true),
  rateLimitWindowMs: toInt(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
  rateLimitMax: toInt(process.env.RATE_LIMIT_MAX, 240),
  bodyLimit: process.env.BODY_LIMIT || "512kb",
  allowedOrigins: process.env.ALLOWED_ORIGINS || "*"
};

module.exports = { config };
