import { CrudService } from "../../../base/crudService";
import { CounterModel } from "./counter.model";
class CounterService extends CrudService<typeof CounterModel> {
  initedCodes: string[] = [];
  constructor() {
    super(CounterModel);
  }
  async trigger(name: string, initValue: number = 999999999, step = 1) {
    if (!this.initedCodes.includes(name)) {
      await CounterModel.updateOne(
        { name },
        { $setOnInsert: { value: initValue } },
        { upsert: true }
      );
      this.initedCodes.push(name);
    }

    const counter = await CounterModel.findOne({ name });
    return await CounterModel.findByIdAndUpdate(
      counter.id,
      { $inc: { value: step } },
      { new: true }
    ).then((res) => res.value);
  }
}

const counterService = new CounterService();

export { counterService };
