const express = require("express");
const { recordPing, getRecentPings } = require("../services/telemetryService");

const router = express.Router();

router.post("/ping", async (req, res, next) => {
  try {
    const result = await recordPing(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/latest", async (req, res, next) => {
  try {
    const rows = await getRecentPings();
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

module.exports = { telemetryRouter: router };
