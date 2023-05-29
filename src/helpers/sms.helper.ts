// import {
//   IUserNotification,
//   NotificationStatus,
//   UserNotificationModel,
// } from "../graphql/modules/userNotification/userNotification.model";
import twilio from "twilio";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE = process.env.TWILIO_PHONE;
const TWILIO_MESSAGING_SERVICE_SID = process.env.TWILIO_MESSAGING_SERVICE_SID;

export class SmsHelper {
  constructor() {}

  // static sendTwilioSMS = async ({ notification }: { notification: IUserNotification }) => {
  //   try {
  //     const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  //     await UserNotificationModel.findByIdAndUpdate(notification.id, {
  //       $set: {
  //         status: NotificationStatus.SENT,
  //       },
  //     });

  //     await client.messages
  //       .create({
  //         from: TWILIO_PHONE,
  //         messagingServiceSid: TWILIO_MESSAGING_SERVICE_SID,
  //         to: notification.to,
  //         body: notification.content,
  //       })
  //       .then((message) => {})
  //       .catch((error: any) => {
  //         UserNotificationModel.findByIdAndUpdate(notification.id, {
  //           $set: {
  //             status: NotificationStatus.ERROR,
  //           },
  //         });
  //       });
  //   } catch (error) {
  //     UserNotificationModel.findByIdAndUpdate(notification.id, {
  //       $set: {
  //         status: NotificationStatus.ERROR,
  //       },
  //     });
  //   }
  // };
}
