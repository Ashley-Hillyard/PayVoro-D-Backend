const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const { config } = require("../config/env");

const dbPath = path.resolve(process.cwd(), config.dbPath);
const schemaPath = path.resolve(__dirname, "schema.sql");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new sqlite3.Database(dbPath);
const schemaSql = fs.readFileSync(schemaPath, "utf8");

db.exec(schemaSql, (err) => {
  if (err) {
    console.error("Failed to initialize dashboard schema", err);
  }
});

module.exports = { db };
