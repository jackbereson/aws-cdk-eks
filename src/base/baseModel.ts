import mongoose from "mongoose";
import DataLoader from "dataloader";
import _ from "lodash";
import uniqueValidator from "mongoose-unique-validator";
import { LRUMap } from "lru_map";
import RedisDataLoader from "redis-dataloader";
import Redis from "redis";
import { configs } from "../configs";
import { Subject } from "rxjs";

const redisClient = configs.redis.enable
  ? Redis.createClient({
      host: configs.redis.host,
      password: configs.redis.password,
      port: configs.redis.port,
    })
  : null;
const redisDataLoader = redisClient
  ? RedisDataLoader({
      redis: redisClient,
    })
  : null;
export type BaseDocument = mongoose.Document & {
  createdAt?: Date;
  updatedAt?: Date;
};

export type Model<T extends BaseDocument> = mongoose.Model<T>;

export function ModelLoader<T>(
  model: any,
  modelHook?: ModelHook<T>,
  cache = true
): DataLoader<string, T> {
  model.schema.plugin(uniqueValidator, { message: "{VALUE} đã tồn tại." });
  let loader: DataLoader<string, T>;
  const batchFunction = (ids: string[]) => {
    return model.find({ _id: { $in: ids } }).then((list: any[]) => {
      const listByKey = _.keyBy(list, "_id");
      return ids.map((id) => _.get(listByKey, id, undefined));
    });
  };
  if (redisDataLoader) {
    loader = new redisDataLoader(model.modelName, new DataLoader(batchFunction, { cache: false }), {
      cache: true,
      expire: 60,
      serialize: (data: any) => (data ? JSON.stringify(data.toJSON ? data.toJSON() : data) : ""),
      deserialize: (data: any) => new model(JSON.parse(data)),
    });
  } else {
    loader = new DataLoader<string, T>(
      batchFunction,
      { cacheMap: new LRUMap(100), cache } // Giới hạn chỉ cache 100 item sử dụng nhiêu nhất.
    );
  }
  if (modelHook) {
    // modelHook.onFindOne.subscribe((doc: any) => loader.prime(doc._id.toString(), doc));
    modelHook.onDeleted.subscribe((doc: any) => loader.clear(doc._id.toString()));
  }

  return loader;
}

export class ModelHook<T> {
  public onSaved = new Subject<T>();
  public onUpdated = new Subject();
  public onDeleted = new Subject<T>();
  public onFindOne = new Subject<T>();
  constructor(schema: mongoose.Schema) {
    schema.post("findOne", (doc: any, next) => {
      if (doc) this.onFindOne.next(doc);
      next(null);
    });
    schema.post("save", (doc: any, next) => {
      if (doc) this.onSaved.next(doc);
      next();
    });
    schema.post("updateOne", (doc: any, next) => {
      if (doc) this.onUpdated.next(doc);
      next();
    });
    schema.post("deleteOne", (doc: any, next) => {
      if (doc) this.onUpdated.next(doc);
      next();
    });
    schema.post("remove", (doc: any, next) => {
      if (doc) this.onDeleted.next(doc);
      next();
    });
  }
}
