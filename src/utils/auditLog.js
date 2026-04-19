const { db } = require("../db");

function createAuditLog({ action, actor = null, targetType = null, targetId = null, details = null }) {
  db.run(
    `INSERT INTO audit_logs (action, actor, target_type, target_id, details_json)
     VALUES (?, ?, ?, ?, ?)`,
    [action, actor, targetType, targetId, details ? JSON.stringify(details) : null],
    () => {}
  );
}

module.exports = { createAuditLog };
