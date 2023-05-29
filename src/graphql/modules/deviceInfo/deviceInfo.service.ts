import { CrudService } from "../../../base/crudService";
import { DeviceInfoModel } from "./deviceInfo.model";
class DeviceInfoService extends CrudService<typeof DeviceInfoModel> {
  constructor() {
    super(DeviceInfoModel);
  }
}

const deviceInfoService = new DeviceInfoService();

export { deviceInfoService };
