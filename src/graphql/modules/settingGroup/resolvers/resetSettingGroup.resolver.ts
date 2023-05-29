import { set } from "lodash";
import { SETTING_DATA } from "../../../../configs/settingData";
import { ROLES } from "../../../../constants/role.const";
import { onActivity } from "../../../../events/onActivity.event";
import { AuthHelper, ErrorHelper } from "../../../../helpers";
import { Context } from "../../../context";
import { ActivityTypes, ChangedFactors } from "../../activity/activity.model";
import { Setting, SettingModel } from "../../setting/setting.model";
import { SettingGroupLoader } from "../settingGroup.model";

const Mutation = {
  resetSettingGroup: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id } = args;

    const group = await SettingGroupLoader.load(id);
    if (!group) {
      throw ErrorHelper.requestDataInvalid("group");
    }
    await SettingModel.remove({ groupId: group.id });

    let settings: Setting[] = SETTING_DATA.find((data) => data.slug === group.slug).settings;

    settings = settings.map((setting) => {
      set(setting, "groupId", group.id);
      return setting;
    });

    await SettingModel.insertMany(settings);

    onActivity.next({
      userId: context.id,
      type: ActivityTypes.RESET,
      changedFactor: ChangedFactors.SETTING_GROUP,
    });

    return group;
  },
};

export default {
  Mutation,
};
