const { config } = require("./config/env");
const { createApp } = require("./app");
const { seedDefaultStaff } = require("./db/seed");

const app = createApp();

seedDefaultStaff();

const server = app.listen(config.port, () => {
  console.log(`PayVoro dashboard backend listening on port ${config.port}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${config.port} is already in use. Stop the other process or change PORT in .env`);
  } else {
    console.error("Server error:", err);
  }

  process.exit(1);
});
