import { CrudService } from "../../../base/crudService";
import { AgendaJobModel } from "../../../scheduler/agenda";
class AgendaJobService extends CrudService<typeof AgendaJobModel> {
  constructor() {
    super(AgendaJobModel);
  }
}

const agendaJobService = new AgendaJobService();

export { agendaJobService };
