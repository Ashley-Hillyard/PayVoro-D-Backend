const { config } = require("../config/env");
const { requireAuth } = require("../middleware/requireAuth");
const { healthRouter } = require("./health.routes");
const { authRouter } = require("./auth.routes");
const { apiKeysRouter } = require("./apiKeys.routes");
const { systemsRouter } = require("./systems.routes");
const { telemetryRouter } = require("./telemetry.routes");

function registerRoutes(app) {
  app.use(`${config.apiPrefix}/health`, healthRouter);
  app.use(`${config.apiPrefix}/auth`, authRouter);
  app.use(`${config.apiPrefix}/api-keys`, requireAuth, apiKeysRouter);
  app.use(`${config.apiPrefix}/systems`, requireAuth, systemsRouter);
  // Telemetry pings come from POS hardware — authenticated by admin key header
  app.use(`${config.apiPrefix}/telemetry`, telemetryRouter);
}

module.exports = { registerRoutes };
