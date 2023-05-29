import { BaseErrorHelper } from "../base/error";
import { IValidateSchema, validateSchema } from "./validateSchema.helper";

export function validateJSON(data: any, schema: IValidateSchema) {
  const { isValid, result } = validateSchema(data, schema);
  if (isValid) {
    return true;
  } else {
    let message = result.errors.map((err) => err.message).toString();
    throw BaseErrorHelper.validateJSONError(message);
  }
}
