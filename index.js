require("dotenv").config();

const app = require("./src");
const logger = require("./src/utils/logger");

const PORT = process.env.PORT || 4000;

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

app.listen(PORT, () => logger.info(`App started on port ${PORT}`));
app.on("error", onError);
