const express = require("express");
const cors = require("cors");
const { config } = require("./config/env");
const { requestLogger } = require("./middleware/requestLogger");
const { createRateLimitMiddleware } = require("./middleware/rateLimit");
const { registerRoutes } = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

function createApp() {
  const app = express();

  app.use(
    cors({
      origin: config.allowedOrigins === "*" ? true : config.allowedOrigins.split(",")
    })
  );
  app.use(express.json({ limit: config.bodyLimit }));

  if (config.enableRequestLogging) {
    app.use(requestLogger);
  }

  app.use(createRateLimitMiddleware());
  registerRoutes(app);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
