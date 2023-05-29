import { configs } from "../configs";
import jwt from "jsonwebtoken";
import { ROLES } from "../constants/role.const";

export interface IPayloadToken {
  role: string;
  [name: string]: any;
}

export class TokenHelper {
  constructor() {}

  static generateToken(payload: IPayloadToken): string {
    return jwt.sign(payload, configs.secretKey, { expiresIn: "2d" });
  }

  static decodeToken(token: string) {
    return jwt.verify(token, configs.secretKey);
  }

  static getAdministratorToken() {
    return this.generateToken({
      role: ROLES.ADMIN,
    });
  }
}
