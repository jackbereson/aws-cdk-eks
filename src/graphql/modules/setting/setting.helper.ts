import _ from "lodash";
import { SettingKey, SETTING_DATA } from "../../../configs/settingData";
import { SettingKeyLoader, ISetting } from "./setting.model";
export type SettingLoadOption = {
  secure?: Boolean;
};
export class SettingHelper {
  static defaultSettings = _.reduce(
    SETTING_DATA,
    (result, value) => {
      value.settings.forEach((s: any) => (result[s.key] = s.value));
      return result;
    },
    {} as any
  );
  static load(key: SettingKey, option: SettingLoadOption = {}) {
    return SettingKeyLoader.load(key).then((setting) => {
      setting = setting ? setting : this.defaultSettings[key];
      if (!setting.isActive) return undefined;
      if (setting.isPrivate && option.secure) {
        return undefined;
      }
      return setting.value;
    });
  }
  static loadMany(keys: SettingKey[], option: SettingLoadOption = {}) {
    return SettingKeyLoader.loadMany(keys).then((settings) =>
      settings.map((setting: ISetting, index) => {
        setting = setting ? setting : this.defaultSettings[keys[index]];
        if (!setting.isActive) return undefined;
        if (setting.isPrivate && option.secure) {
          return undefined;
        }
        return setting.value;
      })
    );
  }
}
