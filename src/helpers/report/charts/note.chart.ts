import { IChartConfig, Chart, ChartType } from "../chart";

export type NoteChartConfig = IChartConfig & {
  description?: string;
};

export class NoteChart extends Chart {
  constructor(public config: NoteChartConfig) {
    super(config);
  }
  getData() {
    return {
      type: ChartType.NOTE,
      ...this.config,
    };
  }
}
