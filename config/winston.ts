const appRoot = require("app-root-path");
import { createLogger, transports } from "winston";

const options = {
  file: {
    level: "error",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

export const logger = createLogger({
  transports: [new transports.Console(options.console)],
  exceptionHandlers: [new transports.File(options.file)],
  exitOnError: false,
});

export const stream = {
  write: function(message) {
    logger.info(message);
  },
};
