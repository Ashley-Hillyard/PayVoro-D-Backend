const jwt = require("jsonwebtoken");
const { config } = require("../config/env");
const { db } = require("../db");
const { hashPin } = require("../utils/pinHash");

function loginWithPin(email, pin) {
  const pinHash = hashPin(pin);

  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id, email, role FROM staff_users WHERE email = ? AND pin_hash = ?`,
      [email, pinHash],
      (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        if (!row) {
          reject(Object.assign(new Error("Invalid credentials"), { statusCode: 401 }));
          return;
        }

        resolve({
          token: jwt.sign(
            { id: row.id, email: row.email, role: row.role },
            config.jwtSecret,
            { expiresIn: config.jwtExpiresIn }
          ),
          id: row.id,
          email: row.email,
          role: row.role
        });
      }
    );
  });
}

module.exports = { loginWithPin };
