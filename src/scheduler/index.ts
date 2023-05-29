import path from "path";
import { configs } from "../configs";

import { UtilsHelper } from "../helpers";
import { Agenda } from "./agenda";
import { InitRepeatJobs } from "./repeat";
import chalk from "chalk";

const graceful = async () => {
  await Agenda.stop();
  process.exit(0);
};

const includeJobs = configs.scheduler.includes;
const excludeJobs = configs.scheduler.excludes;
Agenda.on("ready", () => {
  console.log("\n");
  console.log("📅 Agenda Ready 📅");
  Agenda.start().then(async () => {
    console.log("🚣 Agenda started 🏁🏁\n");
    if (includeJobs[0] == "NONE") return;
    const JobFiles = UtilsHelper.walkSyncFiles(path.join(__dirname));
    JobFiles.filter((f: any) => /(.*).job.js$/.test(f)).map((f: any) => {
      const { default: job } = require(f);

      if (includeJobs.length > 0 && !includeJobs.includes(job.jobName)) {
        console.log(chalk.yellow("Skip Job ", job.jobName));
        return;
      }
      if (excludeJobs.length > 0 && excludeJobs.includes(job.jobName)) {
        console.log(chalk.red("Exclude Job ", job.jobName));
        return;
      }
      console.log(chalk.green("⛳ Define Job ") + job.jobName);
      Agenda.define(job.jobName, { lockLifetime: 10000 }, job.execute);
    });
    InitRepeatJobs();
    console.log("\n");
  });
});

process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);
