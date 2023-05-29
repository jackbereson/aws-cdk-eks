import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database.loader";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
import DataLoader from "dataloader";
const Schema = mongoose.Schema;
export enum SettingType {
  string = "string",
  number = "number",
  array = "array",
  object = "object",
  richText = "richText",
  boolean = "boolean",
  json = "json",
}

export enum EditMode {
  SYSTEM = "SYSTEM",
  USER = "USER",
}

export type Setting = {
  type?: SettingType;
  name?: string;
  key?: string;
  value?: any;
  isActive?: boolean;
  isPrivate?: boolean;
  readOnly?: boolean;
  groupId?: string;
  editMode?: string;
};

export type ISetting = BaseDocument & Setting;

const settingSchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(SettingType),
      required: true,
      default: SettingType.string,
    },
    name: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
    isActive: { type: Boolean, required: true, default: true },
    isPrivate: { type: Boolean, required: true, default: false },
    readOnly: { type: Boolean, default: false },
    groupId: { type: Schema.Types.ObjectId, required: true },
    editMode: {
      type: String,
      enum: Object.values(EditMode),
      required: true,
      default: EditMode.SYSTEM,
    },
  },
  { timestamps: true, collation: { locale: "vi" } }
);

settingSchema.index({ key: 1 });
settingSchema.index({ name: "text", key: "text" }, { weights: { name: 2, key: 4 } });

export const SettingHook = new ModelHook<ISetting>(settingSchema);
export const SettingModel: mongoose.Model<ISetting> = MainConnection.model(
  "Setting",
  settingSchema
);

export const SettingKeyLoader = new DataLoader<string, ISetting>(
  (keys: string[]) => {
    return SettingModel.find({ key: { $in: keys } }).then((settings) =>
      keys.map((k) => settings.find((s) => s.key == k)!)
    );
  },
  { cache: false }
);
export const SettingLoader = ModelLoader<ISetting>(SettingModel, SettingHook);
