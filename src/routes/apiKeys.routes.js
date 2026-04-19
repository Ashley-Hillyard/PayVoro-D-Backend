const express = require("express");
const {
  listApiKeys,
  createApiKey,
  revokeApiKey
} = require("../services/apiKeyService");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const rows = await listApiKeys();
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { label } = req.body;
    const created = await createApiKey(label);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/revoke", async (req, res, next) => {
  try {
    await revokeApiKey(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = { apiKeysRouter: router };
