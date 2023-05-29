import app from "./app";
import grapqhQLServer from "./graphql";
import { LogHelper } from "./helpers/log.helper";

grapqhQLServer(app);

const server = app.listen(app.get("port"), () => {
  LogHelper.logString(
    `\n🚀 App is running in ${app.get("env")} mode at`,
    `http://localhost:${app.get("port")}`
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
