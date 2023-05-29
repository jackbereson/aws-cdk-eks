import { Subject } from "rxjs";
import { Activity, ActivityModel } from "../graphql/modules/activity/activity.model";
export const onActivity = new Subject<Activity>();

onActivity.subscribe((event) => {
  let userType = "ADMIN";
  if (event.customerId) {
    userType = "CUSTOMER";
  }
  event.message = `${userType} ${event.type} ${event.changedFactor} at id ${event.factorId}`;
  ActivityModel.create(event);
});
