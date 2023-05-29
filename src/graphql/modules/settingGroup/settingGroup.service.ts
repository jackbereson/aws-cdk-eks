import { CrudService } from "../../../base/crudService";
import { SettingGroupModel } from "./settingGroup.model";
class SettingGroupService extends CrudService<typeof SettingGroupModel> {
  constructor() {
    super(SettingGroupModel);
  }
}

const settingGroupService = new SettingGroupService();

export { settingGroupService };
