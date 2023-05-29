import { ROLES } from "../../../../constants/role.const";
import { AuthHelper } from "../../../../helpers";
import { Context } from "../../../context";
import { UserModel } from "../user.model";

const Query = {
  userGetMe: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_MEMBER_EDITOR);
    return await UserModel.findById(context.tokenData._id);
  },
};

export default {
  Query,
};
