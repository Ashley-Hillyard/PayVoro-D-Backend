const { config } = require("../config/env");

function apiKeyAuth(req, res, next) {
  if (!config.dashboardAdminKey) {
    return next();
  }

  const provided = req.header("x-dashboard-admin-key");
  if (provided !== config.dashboardAdminKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return next();
}

module.exports = { apiKeyAuth };
