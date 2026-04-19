const express = require("express");
const {
  listSystems,
  upsertSystem,
  getSystemBySystemId
} = require("../services/systemService");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const rows = await listSystems();
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.get("/:systemId", async (req, res, next) => {
  try {
    const row = await getSystemBySystemId(req.params.systemId);
    if (!row) {
      return res.status(404).json({ error: "System not found" });
    }

    return res.json(row);
  } catch (error) {
    return next(error);
  }
});

router.put("/:systemId", async (req, res, next) => {
  try {
    const payload = {
      systemId: req.params.systemId,
      displayName: req.body.displayName,
      location: req.body.location
    };

    const updated = await upsertSystem(payload);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = { systemsRouter: router };
