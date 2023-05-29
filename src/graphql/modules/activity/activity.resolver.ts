import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { UserLoader } from "../user/user.model";
import { activityService } from "./activity.service";

const Query = {
  getAllActivity: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    return activityService.fetch(args.q);
  },
  getOneActivity: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await activityService.findOne({ _id: id });
  },
};

const Mutation = {
  deleteOneActivity: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id } = args;
    return await activityService.deleteOne(id);
  },
};

const Activity = {
  user: GraphQLHelper.loadById(UserLoader, "userId"),
};

export default {
  Query,
  Mutation,
  Activity,
};
