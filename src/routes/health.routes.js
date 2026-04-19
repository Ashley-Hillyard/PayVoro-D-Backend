const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: "ok", service: "payvoro-dashboard-backend" });
});

module.exports = { healthRouter: router };
