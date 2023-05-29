import DataLoader from "dataloader";
import { get, keyBy } from "lodash";
import { Types } from "mongoose";
import { ROLES } from "../../../constants/role.const";
import { ErrorHelper, KeycodeHelper } from "../../../helpers";
import { TokenHelper } from "../../../helpers/token.helper";
import { Context } from "../../context";
import { counterService } from "../counter/counter.service";
import { IUser, UserModel, UserStatus } from "./user.model";

export class UserHelper {
  constructor(public user: IUser) {}

  static async fromContext(context: Context) {
    if (!ROLES.ADMIN_MEMBER_EDITOR.includes(context.tokenData.role)) return null;
    const user = await UserModel.findById(context.tokenData._id);
    if (!user) throw ErrorHelper.permissionDeny();
    return new UserHelper(user);
  }

  setActivedAt() {
    if (this.user.status === UserStatus.ACTIVE && !this.user.activedAt) {
      this.user.activedAt = new Date();
    }
    return this;
  }

  static generateCode() {
    return counterService.trigger("user").then((c) => "U" + c);
  }

  static async generateReferalCode(secret: string) {
    let referralCode = KeycodeHelper.alpha(secret, 8);
    let countCode = await UserModel.countDocuments({ referralCode });
    while (countCode > 0) {
      referralCode = KeycodeHelper.alpha(secret, 8);
      countCode = await UserModel.countDocuments({ referralCode });
    }
    return referralCode;
  }

  getToken() {
    return TokenHelper.generateToken({
      role: this.user.role,
      _id: this.user._id,
      name: this.user.name,
      status: this.user.status,
    });
  }
}
