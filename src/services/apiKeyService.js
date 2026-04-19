const crypto = require("crypto");
const { db } = require("../db");
const { createAuditLog } = require("../utils/auditLog");

function listApiKeys() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT id, label, api_key AS apiKey, status, last_used_at AS lastUsedAt, created_at AS createdAt, revoked_at AS revokedAt
       FROM api_keys
       ORDER BY created_at DESC`,
      [],
      (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      }
    );
  });
}

function createApiKey(label) {
  const rawKey = crypto.randomBytes(24).toString("hex");

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO api_keys (label, api_key) VALUES (?, ?)`,
      [label || "Unnamed key", rawKey],
      function onInsert(err) {
        if (err) {
          reject(err);
          return;
        }

        createAuditLog({
          action: "api_key_created",
          targetType: "api_key",
          targetId: String(this.lastID),
          details: { label }
        });

        resolve({ id: this.lastID, label: label || "Unnamed key", apiKey: rawKey, status: "active" });
      }
    );
  });
}

function revokeApiKey(id) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE api_keys
       SET status = 'revoked', revoked_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [id],
      function onUpdate(err) {
        if (err) {
          reject(err);
          return;
        }

        createAuditLog({
          action: "api_key_revoked",
          targetType: "api_key",
          targetId: String(id)
        });

        resolve(this.changes);
      }
    );
  });
}

module.exports = { listApiKeys, createApiKey, revokeApiKey };
