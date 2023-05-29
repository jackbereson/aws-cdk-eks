import { IChartConfig, Chart, ChartType } from "../chart";

export type StackChartItem = {
  xLabel: string;
  colValues: number[];
};
export type StackChartConfig = IChartConfig & {
  colLabels: string[];
  colColors: string[];
  data: StackChartItem[];
  zoom: number;
};
export class StackChart extends Chart {
  constructor(public config: StackChartConfig) {
    super(config);
  }
  getData() {
    return {
      type: ChartType.STACK_CHART,
      ...this.config,
    };
  }
}
