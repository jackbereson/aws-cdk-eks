import { Context } from "../../../context";
import { UserModel } from "../user.model";
import { AuthHelper } from "../../../../helpers/auth.helper";
import { ROLES } from "../../../../constants/role.const";
import { ErrorHelper, encryptionHelper } from "../../../../helpers";
import { set } from "lodash";

const Mutation = {
  updateUserPassword: async (root: any, args: any, context: Context) => {
    const { id, password } = args;
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    if (context.tokenData.role != ROLES.ADMIN) AuthHelper.isOwner(context, id);

    const user = await UserModel.findById(id);
    if (!user) {
      throw ErrorHelper.mgRecoredNotFound("người dùng");
    }

    const hashPassword = encryptionHelper.createPassword(password, user.id);
    set(user, "password", hashPassword);

    try {
      await Promise.all([
        // firebaseHelper.updateUser(user.uid, { password }),
        user.save(),
      ]);
    } catch (error) {
      throw ErrorHelper.updateUserError(error);
    }
  },
};

export default {
  Mutation,
};
