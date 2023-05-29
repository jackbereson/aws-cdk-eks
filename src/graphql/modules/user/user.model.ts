import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database.loader";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;
export enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  MEMBER = "MEMBER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DEACTIVE = "DEACTIVE",
}

export enum UserServiceStatus {
  FREE = "FREE",
  EXPIRED = "EXPIRED",
  PAID = "PAID",
}

export type User = {
  code?: string;
  name?: string;
  email?: string;
  password?: string;
  walletAddress?: string;
  role?: UserRole;
  avatar?: string;
  lastLoginAt?: Date;
  activedAt?: Date;
  status?: UserStatus;
};

export type IUser = BaseDocument & User;

const userSchema = new Schema(
  {
    code: { type: String, unique: true },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    walletAddress: { type: String },
    role: { type: String, enum: Object.values(UserRole) },
    avatar: { type: String },
    lastLoginAt: { type: Date },
    activedAt: { type: Date },
    status: { type: String, enum: Object.values(UserStatus), default: UserStatus.ACTIVE },
  },
  { timestamps: true, collation: { locale: "vi" } }
);

userSchema.index({ code: 1 });
userSchema.index({ email: "text" }, { weights: { email: 2 } });

export const UserHook = new ModelHook<IUser>(userSchema);
export const UserModel: mongoose.Model<IUser> = MainConnection.model("User", userSchema);

export const UserLoader = ModelLoader<IUser>(UserModel, UserHook);
