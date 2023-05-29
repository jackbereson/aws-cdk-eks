import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { counterService } from "./counter.service";

const Query = {
  getAllCounter: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    return counterService.fetch(args.q);
  },
  getOneCounter: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await counterService.findOne({ _id: id });
  },
};

const Mutation = {
  createCounter: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { data } = args;
    return await counterService.create(data);
  },
  updateCounter: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id, data } = args;
    return await counterService.updateOne(id, data);
  },
  deleteOneCounter: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id } = args;
    return await counterService.deleteOne(id);
  },
  deleteManyCounter: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { ids } = args;
    let result = await counterService.deleteMany(ids);
    return result;
  },
};

const Counter = {};

export default {
  Query,
  Mutation,
  Counter,
};
