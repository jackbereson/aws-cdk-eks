import Axios from "axios";
import { get } from "lodash";
import NodeCache from "node-cache";

import { configs } from "../configs";
import { ErrorHelper } from "./error.helper";

const host = `${configs.chatbot.host}/api/v1`;
const cacheTTL: number = 60 * 60 * 24; // 1 Ngày
const cache = new NodeCache({ stdTTL: cacheTTL });
export class ChatBotHelper {
  public token: string;

  constructor(public apiKey: string) {
    const [type, id, token] = apiKey.split("|");
    this.token = token;
  }
  static async decodeSignedRequest(signedRequest: string) {
    if (cache.get(signedRequest)) return cache.get<MessengerTokenDecoded>(signedRequest);
    return Axios.post(
      `${host}/app/messengerSignDecode`,
      { signedRequest },
      { headers: { "Content-Type": "application/json" } }
    )
      .then((res) => {
        const tokenData = get(res.data, "results.object");
        if (!tokenData) throw ErrorHelper.badToken();
        const decoded = {
          pageId: tokenData.page_id,
          psid: tokenData.psid,
          threadId: tokenData.tid,
        } as MessengerTokenDecoded;
        cache.set<MessengerTokenDecoded>(signedRequest, decoded);
        return decoded;
      })
      .catch((err) => {
        throw ErrorHelper.badToken();
      });
  }
  async sendTextMessage(psids: string[], message: string) {
    Axios.post(
      `${host}/send`,
      {
        type: "new_story",
        story: [{ type: "text", option: { text: message } }],
        sendBy: "psid",
        sendTo: psids,
        nonTask: true,
      },
      { headers: { "Content-Type": "application/json", "x-api-key": this.apiKey } }
    ).catch((err: any) => console.log("Gửi tin nhắn lỗi ", err.message));
  }
  async sendStoryByRef(psids: string[], ref: string, context: any) {
    Axios.post(
      `${host}/send`,
      {
        type: "ref",
        story: ref,
        sendBy: "psid",
        sendTo: psids,
        context: context,
        nonTask: true,
      },
      { headers: { "Content-Type": "application/json", "x-api-key": this.apiKey } }
    ).catch((err: any) => console.log("Gửi tin nhắn lỗi ", err.message, ref));
  }
  async getPageInfo() {
    return Axios.get(`${host}/page`, {
      params: { fields: ["$all"] },
      headers: { "Content-Type": "application/json", "x-api-key": this.apiKey },
    }).then((res) => {
      const pageData = get(res.data, "results.objects.rows.0");
      if (!pageData) throw ErrorHelper.requestDataInvalid("Api Key Không hợp lệ");
      return {
        id: pageData._id,
        appId: pageData.app,
        pageId: get(pageData, "meta.id"),
        pageName: get(pageData, "meta.name"),
        picture: get(pageData, "meta.picture.data.url"),
      } as PageInfo;
    });
  }
  async getSubscriber(psid: string) {
    return Axios.get(`${host}/subscriber`, {
      params: { fields: ["messengerProfile", "_id"], filter: JSON.stringify({ psid }) },
      headers: { "Content-Type": "application/json", "x-api-key": this.apiKey },
    }).then((res) => {
      const subscriber = get(res.data, "results.objects.rows.0");
      if (!subscriber) throw ErrorHelper.requestDataInvalid("Api Key Không hợp lệ");
      return {
        id: subscriber._id,
        psid: subscriber.messengerProfile.psid,
        name: subscriber.messengerProfile.name,
        firstName: subscriber.messengerProfile.first_name,
        lastName: subscriber.messengerProfile.last_name,
        gender: subscriber.messengerProfile.gender,
        locale: subscriber.messengerProfile.locale,
        profilePic: subscriber.messengerProfile.profile_pic,
      } as SubscriberInfo;
    });
  }
}

export type PageInfo = {
  id: string;
  appId: string;
  pageId: string;
  pageName: string;
  picture: string;
};

export type MessengerTokenDecoded = {
  pageId: string;
  psid: string;
  threadId: string;
};

export type SubscriberInfo = {
  id: string;
  psid: string;
  name: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  locale: string;
  profilePic: string;
};

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}
