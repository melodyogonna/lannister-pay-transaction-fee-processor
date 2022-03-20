const path = require("path");

const winston = require("winston");

const logFolder = path.join(__dirname, "..", "..", "logs");

const exceptionHandler = (filename) => {
  if (process.env.APP_ENV !== "production") {
    return new winston.transports.Console({
      format: winston.format.simple(),
    });
  }
  return new winston.transports.File({
    filename: path.join(logFolder, filename || "exceptions.log"),
  });
};

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm" }),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logFolder, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logFolder, "combined.log"),
    }),
  ],
  exceptionHandlers: [exceptionHandler()],
  rejectionHandlers: [exceptionHandler("rejections.log")],
});

if (process.env.APP_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      level: "info",
      format: winston.format.simple(),
    })
  );
}
module.exports = logger;
