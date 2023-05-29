import _ from "lodash";
import { Document, Model } from "mongoose";

import { configs } from "../configs";
import { ErrorHelper, IParseQuery } from "../helpers";
import { BaseService } from "./baseService";

// import { IBaseStatic } from "./baseModel";
// import { baseError } from "./baseError";
export interface IQueryOptions {}

export abstract class CrudService<M extends Model<Document, {}>> extends BaseService {
  model: M;

  constructor(model: M) {
    super();
    this.model = model;
  }

  async fetch(queryInput: any) {
    queryInput = { ...queryInput };
    const limit = queryInput.limit || configs.query.limit;
    const skip = queryInput.offset || (queryInput.page - 1) * limit || 0;
    const order = queryInput.order;
    const search = queryInput.search;
    const query = this.model.find();

    if (search) {
      if (search.includes(" ")) {
        _.set(queryInput, "filter.$text.$search", search);
        query.select({ _score: { $meta: "textScore" } });
        query.sort({ _score: { $meta: "textScore" } });
      } else {
        const textSearchIndex = this.model.schema
          .indexes()
          .find((c: any) => _.values(c[0]!).some((d: any) => d == "text"));
        if (textSearchIndex) {
          const or: any[] = [];
          Object.keys(textSearchIndex[0]!).forEach((key) => {
            or.push({ [key]: { $regex: search, $options: "i" } });
          });
          _.set(queryInput, "filter.$or", or);
        }
      }
    }

    if (order) {
      query.sort(order);
    }
    if (queryInput.filter) {
      const filter = JSON.parse(
        JSON.stringify(queryInput.filter).replace(/\"(\_\_)(\w+)\"\:/g, `"$$$2":`)
      );
      query.setQuery({ ...filter });
    }
    const countQuery = this.model.find().merge(query);
    query.limit(limit);
    query.skip(skip);

    return await Promise.all([query.exec(), countQuery.count()]).then((res) => {
      return {
        data: res[0],
        total: res[1],
        pagination: {
          page: queryInput.page || 1,
          limit: limit,
          offset: skip,
          total: res[1],
        },
      };
    });
  }
  async findAll(options: IParseQuery) {
    const query = this.model.find(options.filter || {});
    if (options.select) {
      query.select(options.select);
    }
    if (options.order) {
      query.sort(options.order);
    }
    query.limit(options.limit || configs.query.limit);
    if (options.offset) {
      query.skip(options.offset);
    }
    return await query.exec();
  }

  async findOne(filter: any, projection?: any, options?: any) {
    return await this.model.findOne(filter, projection || {}, options || {});
  }

  async count(options: IParseQuery) {
    return await this.model.countDocuments(options.filter);
  }

  async create(data: any) {
    return await this.model.create(data);
  }

  async updateOne(id: string, data: any) {
    await this.model.updateOne({ _id: id }, data);
    let record = await this.model.findOne({ _id: id });
    if (!record) throw ErrorHelper.recoredNotFound("Không tìm thấy dữ liệu");
    return record;
  }

  async deleteOne(id: string) {
    let record = await this.model.findOne({ _id: id });
    if (!record) throw ErrorHelper.recoredNotFound("Không tìm thấy dữ liệu");
    await record.remove();
    return record;
  }

  async deleteMany(ids: string[]) {
    let result = await this.model.deleteMany({ _id: { $in: ids } });
    return result.deletedCount;
  }
}
