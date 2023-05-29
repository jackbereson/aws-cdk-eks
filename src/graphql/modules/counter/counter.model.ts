import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database.loader";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type ICounter = BaseDocument & {
  name?: string;
  value?: number;
};

const counterSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    value: { type: Number, default: 0 },
  },
  { timestamps: true }
);

counterSchema.index({ name: 1 });
counterSchema.index({ name: "text" }, { weights: { name: 2 } });

export const CounterHook = new ModelHook<ICounter>(counterSchema);
export const CounterModel: mongoose.Model<ICounter> = MainConnection.model(
  "Counter",
  counterSchema
);

export const CounterLoader = ModelLoader<ICounter>(CounterModel, CounterHook);
