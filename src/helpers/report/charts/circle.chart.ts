import { IChartConfig, Chart, ChartType } from "../chart";

export type CircleChartItem = {
  label: string;
  value: number;
  color: string;
};
export type CircleChartConfig = IChartConfig & {
  data: CircleChartItem[];
};

export class CircleChart extends Chart {
  constructor(public config: CircleChartConfig) {
    super(config);
  }
  getData() {
    return {
      type: ChartType.CIRCLE_CHART,
      ...this.config,
    };
  }
}
