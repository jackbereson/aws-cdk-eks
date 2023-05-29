import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database.loader";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export enum ActivityTypes {
  ADMIN_SIGNIN = "ADMIN_SIGNIN",
  CUSTOMER_SIGNIN = "CUSTOMER_SIGNIN",
  CUSTOMER_SIGNIN_MINING = "CUSTOMER_SIGNIN_MINING",
  CUSTOMER_REGISTER = "CUSTOMER_REGISTER",
  CUSTOMER_BUY_TOKEN = "CUSTOMER_BUY_TOKEN",
  CUSTOMER_CLAIM_TOKEN = "CUSTOMER_CLAIM_TOKEN",
  CUSTOMER_AIRDROP = "CUSTOMER_AIRDROP",
  CUSTOMER_GACHA_AIRDROP = "CUSTOMER_GACHA_AIRDROP",
  CUSTOMER_GACHA_AIRDROP_UPDATE = "CUSTOMER_GACHA_AIRDROP_UPDATE",
  CUSTOMER_AIRDROP_REJECT = "CUSTOMER_AIRDROP_REJECT",
  CUSTOMER_LIST_NFT = "CUSTOMER_LIST_NFT",
  CUSTOMER_CREATE_SUPPORT = "CUSTOMER_CREATE_SUPPORT",
  CUSTOMER_UPDATE_REFERAL = "CUSTOMER_UPDATE_REFERAL",
  CUSTOMER_CREATE_REFERRAL = "CUSTOMER_CREATE_REFERRAL",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  RESET = "RESET",
}

export enum ChangedFactors {
  TYPE_EVENT = "TYPE_EVENT",
  CAMPAIGN = "CAMPAIGN",
  TRANSACTION = "TRANSACTION",
  NFT = "NFT",
  NFT_AIRDROP = "NFT_AIRDROP",
  NFT_INFO = "NFT_INFO",
  NFT_CATEGORY = "NFT_CATEGORY",
  NFT_ELEMENT = "NFT_ELEMENT",
  NFT_HABITANT = "NFT_HABITANT",
  NFT_RARITY = "NFT_RARITY",
  NFT_TYPE = "NFT_TYPE",
  USER = "USER",
  CUSTOMER = "CUSTOMER",
  SETTING = "SETTING",
  SETTING_GROUP = "SETTING_GROUP",
  JOBS = "JOBS",
  PROVIDER = "PROVIDER",
  SUPPORT = "SUPPORT",
  REFERRAL_LINK = "REFERRAL_LINK",
}

export type Activity = {
  userId?: string;
  customerId?: string;
  factorId?: string;
  message?: string;
  type?: ActivityTypes;
  changedFactor?: ChangedFactors;
};

export type IActivity = BaseDocument & Activity;

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    factorId: { type: String },
    message: { type: String },
    type: { type: String, enum: ActivityTypes },
    changedFactor: { type: String, enum: ChangedFactors },
  },
  { timestamps: true, collation: { locale: "vi" } }
);

// activitySchema.index(
//   { weights: { username: 2, message: 4 } }
// );

export const ActivityHook = new ModelHook<IActivity>(activitySchema);
export const ActivityModel: mongoose.Model<IActivity> = MainConnection.model(
  "Activity",
  activitySchema
);

export const ActivityLoader = ModelLoader<IActivity>(ActivityModel, ActivityHook);
