const { db } = require("../db");

function listSystems() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT id, system_id AS systemId, display_name AS displayName, location, status, current_api_key_id AS currentApiKeyId,
              last_ping_at AS lastPingAt, created_at AS createdAt, updated_at AS updatedAt
       FROM pos_systems
       ORDER BY updated_at DESC`,
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

function getSystemBySystemId(systemId) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id, system_id AS systemId, display_name AS displayName, location, status, current_api_key_id AS currentApiKeyId,
              last_ping_at AS lastPingAt, created_at AS createdAt, updated_at AS updatedAt
       FROM pos_systems
       WHERE system_id = ?`,
      [systemId],
      (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(row || null);
      }
    );
  });
}

function upsertSystem({ systemId, displayName, location }) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO pos_systems (system_id, display_name, location, updated_at)
       VALUES (?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(system_id)
       DO UPDATE SET
         display_name = excluded.display_name,
         location = excluded.location,
         updated_at = CURRENT_TIMESTAMP`,
      [systemId, displayName || systemId, location || null],
      async (err) => {
        if (err) {
          reject(err);
          return;
        }

        try {
          const record = await getSystemBySystemId(systemId);
          resolve(record);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}

module.exports = { listSystems, getSystemBySystemId, upsertSystem };
