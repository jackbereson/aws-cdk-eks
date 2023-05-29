import { Job } from "agenda";
import { Agenda } from "../agenda";
import { LogHelper } from "../../helpers/log.helper";

export class HelloWorldJob {
  static jobName = "HelloWorld";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static execute(job: Job) {
    LogHelper.runingJobLog(HelloWorldJob.jobName);
  }
}

export default HelloWorldJob;
