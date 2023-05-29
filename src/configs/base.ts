import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { UtilsHelper } from "../helpers/utils.helper";
import { compact, get } from "lodash";
const pjson = require("../../package.json");

if (fs.existsSync(path.join(__dirname, "../../.env"))) {
  console.log(".env exists");
  dotenv.config({ path: path.join(__dirname, "../../.env") });
} else if (fs.existsSync(path.join(__dirname, "../../.env.example"))) {
  console.log(".env not exists");
  dotenv.config({ path: path.join(__dirname, "../../.env.example") }); // you can delete this after you create your own .env file!
} else {
  console.log(".env.example not exists");
}

// if (!process.env.FIREBASE) throw new Error("Chưa config firebase");
// if (!process.env.FIREBASE_VIEW) throw new Error("Chưa config firebase views");
// if (!process.env.MONGODB_URI) throw new Error("Missing Config MONGODB_URI");

export default {
  name: pjson.name,
  version: pjson.version,
  description: pjson.description,
  port: process.env.PORT || 3000,
  basicAuth: {
    users: { mcom: "mcom@123" },
  },
  winston: {
    db: process.env.MONGO_LOG || "",
    level: process.env.LOG_LEVEL || `silly`,
  },
  query: {
    limit: 10,
  },
  secretKey: process.env.SECRET || "HkQlTCrDfYWezqEp494TjDUqBhSzQSnn",
  timezone: "Asia/Ho_Chi_Minh",
  domain: "http://localhost:" + process.env.PORT || 3000,
  firebase: JSON.parse(process.env.FIREBASE || null),
  firebaseView: process.env.FIREBASE_VIEW || null,
  redis: {
    enable: false,
    host: process.env.REDIS_HOST || "redis",
    port: Number(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASS,
  },
  chatbot: {
    host: process.env.CHATBOT_HOST || "https://bot-server.mcom.app",
  },
  domainName: process.env.DOMAIN_NAME || "http://localhost:5555",
  nextDev: UtilsHelper.toBoolean(process.env.NEXT_DEV || "FALSE"),
  scheduler: {
    includes: compact(get(process.env, "SCHEDULER_INCLUDES", "").split(",")),
    excludes: compact(get(process.env, "SCHEDULER_EXCLUDES", "").split(",")),
  },
};
