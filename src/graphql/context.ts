import { Request } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import _, { get } from "lodash";

import { ROLES } from "../constants/role.const";
import { AuthHelper } from "../helpers";
import { TokenHelper } from "../helpers/token.helper";

export type TokenData = {
  role: string;
  _id: string;
  [name: string]: any;
};
export type SignedRequestPayload = {
  psid: string;
  algorithm: string;
  thread_type: string;
  tid: string;
  issued_at: number;
  page_id: number;
};

/**
 * * Context for Header API
 * * 💊💊💊 parse all header params
 * * 💊💊💊 get all header params
 */
export class Context {
  req: Request;
  isAuth = false;
  isTokenExpired = false;
  tokenData: TokenData;
  passwordToken: string; // password signup - signin - md5
  recoveryToken: string; // recover token
  userToken: string; // user token
  shopToken: string; // shop token
  referralToken: string; // referral token
  sigToken: string; // signnonce token

  constructor(params: { req?: Request; connection?: any }) {
    this.req = params.req;
    this.parseToken(params);
    this.getSignupPasswordToken(params);
    this.getAccountRecoveryToken(params);
    this.getUserToken(params);
    this.getReferralToken(params);
    this.getSigToken(params);
  }

  isAdmin() {
    return get(this.tokenData, "role") == ROLES.ADMIN;
  }
  isMember() {
    return get(this.tokenData, "role") == ROLES.MEMBER;
  }
  isCustomer() {
    return get(this.tokenData, "role") == ROLES.CUSTOMER;
  }
  get id() {
    return get(this.tokenData, "_id");
  }
  get ua() {
    return get(this, "req.headers.user-agent");
  }
  get ip() {
    return get(this, "req.headers.x-forwarded-for") || get(this, "req.headers.remoteAddress");
  }

  getSignupPasswordToken(params: any) {
    const { req } = params;
    this.passwordToken = _.get(req, "headers.y-token");
  }

  getAccountRecoveryToken(params: any) {
    const { req } = params;
    this.recoveryToken = _.get(req, "headers.r-token");
  }

  getUserToken(params: any) {
    const { req } = params;
    this.userToken = _.get(req, "headers.u-token");
  }

  getSigToken(params: any) {
    const { req } = params;
    this.sigToken = _.get(req, "headers.s-token");
  }

  getReferralToken(params: any) {
    const { req } = params;
    this.referralToken = _.get(req, "headers.rf-token");
  }

  parseToken(params: any) {
    try {
      const { req, connection } = params;
      let token = null;

      if (req) {
        this.req = req;
        token = _.get(req, "headers.x-token") || _.get(req, "query.x-token");
      }

      if (connection && connection.context) {
        token = connection.context["x-token"];
      }

      if (token) {
        const decodedToken: any = TokenHelper.decodeToken(token);
        this.isAuth = true;
        this.tokenData = decodedToken;
      }
    } catch (err) {
      console.log("err", err);
      if (err instanceof TokenExpiredError) {
        this.isTokenExpired = true;
      }
      this.isAuth = false;
    } finally {
      return this;
    }
  }

  auth(roles: string[]) {
    AuthHelper.acceptRoles(this, roles);
  }
}

export async function onContext(params: any) {
  return new Context(params);
}
