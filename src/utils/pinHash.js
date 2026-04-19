const crypto = require("crypto");

function hashPin(pin) {
  return crypto.createHash("sha256").update(String(pin || "")).digest("hex");
}

module.exports = { hashPin };
