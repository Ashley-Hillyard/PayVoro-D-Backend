const express = require("express");
const { loginWithPin } = require("../services/authService");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, pin } = req.body;
    const result = await loginWithPin(email, pin);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = { authRouter: router };
