import { Request, Response } from "express";
import { parseInt } from "lodash";
import { configs } from "../../configs";
import { ErrorHelper } from "../../helpers";
export default [
  {
    method: "get",
    path: "/meta/details/:id",
    midd: [],
    action: async (req: Request, res: Response) => {

      res.json({});
    },
  },
];
