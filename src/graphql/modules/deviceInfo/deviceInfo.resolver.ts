import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { UserLoader } from "../user/user.model";
import { deviceInfoService } from "./deviceInfo.service";

const Query = {
  getAllDeviceInfo: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, []);
    return deviceInfoService.fetch(args.q);
  },
  getOneDeviceInfo: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, []);
    const { id } = args;
    return await deviceInfoService.findOne({ _id: id });
  },
};

const Mutation = {
  createDeviceInfo: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, []);
    const { data } = args;
    return await deviceInfoService.create(data);
  },
  updateDeviceInfo: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, []);
    const { id, data } = args;
    return await deviceInfoService.updateOne(id, data);
  },
  deleteOneDeviceInfo: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, []);
    const { id } = args;
    return await deviceInfoService.deleteOne(id);
  },
  deleteManyDeviceInfo: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, []);
    const { ids } = args;
    let result = await deviceInfoService.deleteMany(ids);
    return result;
  },
};

const DeviceInfo = {
  user: GraphQLHelper.loadById(UserLoader, "userId"),
};

export default {
  Query,
  Mutation,
  DeviceInfo,
};
