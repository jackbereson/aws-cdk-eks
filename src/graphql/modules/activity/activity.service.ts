import { CrudService } from "../../../base/crudService";
import { ActivityModel } from "./activity.model";
class ActivityService extends CrudService<typeof ActivityModel> {
  constructor() {
    super(ActivityModel);
  }
}

const activityService = new ActivityService();

export { activityService };
