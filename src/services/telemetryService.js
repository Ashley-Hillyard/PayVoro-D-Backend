const { db } = require("../db");

function recordPing(payload) {
  const { systemId } = payload;

  if (!systemId) {
    throw Object.assign(new Error("systemId is required"), { statusCode: 400 });
  }

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO pos_systems (
         system_id,
         display_name,
         status,
         last_ping_at,
         updated_at
       )
       VALUES (?, ?, 'online', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON CONFLICT(system_id)
       DO UPDATE SET
         status = 'online',
         last_ping_at = CURRENT_TIMESTAMP,
         updated_at = CURRENT_TIMESTAMP`,
      [systemId, systemId],
      (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({ ok: true, systemId });
      }
    );
  });
}

function getRecentPings() {
  return Promise.resolve([]);
}

module.exports = { recordPing, getRecentPings };
