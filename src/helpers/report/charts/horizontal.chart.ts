import { IChartConfig, Chart, ChartType } from "../chart";

export type HorizontalChartItem = {
  yLabel: string;
  colValues: number[];
};
export type HorizontalChartConfig = IChartConfig & {
  colLabels: string[];
  colColors: string[];
  data: HorizontalChartItem[];
};

export class HorizontalChart extends Chart {
  constructor(public config: HorizontalChartConfig) {
    super(config);
  }
  getData() {
    return {
      type: ChartType.HORIZONTAL_CHART,
      ...this.config,
    };
  }
}
