import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database.loader";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type ISettingGroup = BaseDocument & {
  slug?: string;
  name?: string;
  desc?: string;
  icon?: string;
  readOnly?: boolean;
};

const settingGroupSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    desc: { type: String },
    icon: { type: String },
    readOnly: { type: Boolean, default: false },
  },
  { timestamps: true, collation: { locale: "vi" } }
);

settingGroupSchema.index({ slug: 1 });
settingGroupSchema.index({ name: "text", slug: "text" }, { weights: { name: 2, slug: 4 } });

export const SettingGroupHook = new ModelHook<ISettingGroup>(settingGroupSchema);
export const SettingGroupModel: mongoose.Model<ISettingGroup> = MainConnection.model(
  "SettingGroup",
  settingGroupSchema
);

export const SettingGroupLoader = ModelLoader<ISettingGroup>(SettingGroupModel, SettingGroupHook);
