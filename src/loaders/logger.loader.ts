import winston from "winston";
import { configs } from "../configs";
import { getMongoTransportLog } from "./database.loader";

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  verbose: "gray",
  debug: "blue",
  silly: "grey",
};

winston.addColors(colors);

const formatedWinston = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.cli(),
    winston.format.splat()
  ),
});

let transports: any = [
  // new winston.transports.File({ filename: `${__dirname}/../../error.log`, level: 'error', options: { flags: 'a', mode: 0o755 } }),
  // new winston.transports.File({ filename: `${__dirname}/../../combined.log`, options: { flags: 'a', mode: 0o755 } })
];
if (process.env.NODE_ENV !== "development") {
  transports.push(formatedWinston);
} else {
  // transports.push(new MongoTransport.MongoDB({ db: configs.winston.db }));
  transports.push(getMongoTransportLog(configs.winston.db));
  transports.push(formatedWinston);
}

if (process.env.NODE_ENV === "testing") {
  transports = [];
}

const Logger = winston.createLogger({
  level: configs.winston.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports,
});

export { Logger };
