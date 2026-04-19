const { db } = require("./index");
const { hashPin } = require("../utils/pinHash");

function seedDefaultStaff() {
  const pinHash = hashPin("1234");
  const query = `
    INSERT OR IGNORE INTO staff_users (email, pin_hash, role)
    VALUES (?, ?, ?)
  `;

  db.run(query, ["admin@payvoro.local", pinHash, "admin"]);
}

module.exports = { seedDefaultStaff };
