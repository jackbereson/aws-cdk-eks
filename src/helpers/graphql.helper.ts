import { AuthHelper } from "./auth.helper";
import { Context } from "../graphql/context";
import { get, take } from "lodash";

export class GraphQLHelper {
  static loadById(loader: any, idField: string, option: { defaultValue: any } = {} as any) {
    return (root: any, args: any, context: Context) => {
      return root[idField]
        ? loader.load(root[idField].toString()).then((res: any) => res || option.defaultValue)
        : undefined;
    };
  }
  static loadManyById(loader: any, idField: string, option: { defaultValue: any } = {} as any) {
    return (root: any, args: any, context: Context) => {
      return root[idField]
        ? loader
            .loadMany(args.limit ? take(root[idField], args.limit) : root[idField])
            .then((res: any[]) => res.map((r) => r || option.defaultValue))
        : undefined;
    };
  }
  static requireRoles(roles: string[]) {
    return (root: any, args: any, context: Context, info: any) => {
      AuthHelper.acceptRoles(context, roles);
      return root[info.fieldName];
    };
  }
  static dependOnFieldEq(field: string, equal: any, next: any) {
    return (root: any, args: any, context: Context) => {
      return get(root, field) == equal ? next(root, args, context) : null;
    };
  }
}
