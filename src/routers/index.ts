import path from "path";
import express from "express";
import { UtilsHelper } from "../helpers/utils.helper";
import { ErrorHelper } from "../helpers";

const router = express.Router() as any;
const RouterFiles = UtilsHelper.walkSyncFiles(path.join(__dirname));

function onError(res: express.Response, error: any) {
  if (!error.info) {
    ErrorHelper.logUnknowError(error);
    const err = ErrorHelper.somethingWentWrong();
    res.status(err.info.status).json(err.info);
  } else {
    res.status(error.info.status).json(error.info);
  }
}

RouterFiles.filter((f) => /(.*).route.js$/.test(f)).map((f) => {
  const { default: routes } = require(f);
  for (const route of routes) {
    router[route.method](route.path, route.midd, (req: express.Request, res: express.Response) =>
      route.action(req, res).catch((error: any) => onError(res, error))
    );
  }
});

export default router;
