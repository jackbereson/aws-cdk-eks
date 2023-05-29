import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database.loader";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IDeviceInfo = BaseDocument & {
  memberId?: string;
  deviceId?: string;
  deviceToken?: string;
};

const deviceInfoSchema = new Schema(
  {
    memberId: { type: Schema.Types.ObjectId, ref: "Member" },
    deviceId: { type: String },
    deviceToken: { type: String },
  },
  { timestamps: true, collation: { locale: "vi" } }
);

deviceInfoSchema.index({ memberId: 1 });
// deviceInfoSchema.index({ name: "text" }, { weights: { name: 2 } });

export const DeviceInfoHook = new ModelHook<IDeviceInfo>(deviceInfoSchema);
export const DeviceInfoModel: mongoose.Model<IDeviceInfo> = MainConnection.model(
  "DeviceInfo",
  deviceInfoSchema
);

export const DeviceInfoLoader = ModelLoader<IDeviceInfo>(DeviceInfoModel, DeviceInfoHook);
