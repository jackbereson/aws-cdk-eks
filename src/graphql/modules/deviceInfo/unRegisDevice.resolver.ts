import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { deviceInfoService } from "./deviceInfo.service";
import { DeviceInfoModel } from "./deviceInfo.model";
import { onActivity } from "../../../events/onActivity.event";

const Mutation = {
  unRegisDevice: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR); // Cấp quyền
    return DeviceInfoModel.findOneAndRemove({
      userId: context.tokenData._id,
      deviceId: args.deviceId,
    })
      .then((res) => {
        // onActivity.next({
        //   id: context.id,
        //   message: `Người dùng hủy đăng ký thiết bị ${res.deviceId}`,
        // });
        return true;
      })
      .catch((err) => false);
  },
};
export default { Mutation };
