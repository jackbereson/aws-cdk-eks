import { IChartConfig, Chart, ChartType } from "../chart";

export type ColumnChartConfig = IChartConfig & {
  colLabels: string[];
  colColors: string[];
  data: ColumnChartItem[];
  zoom: number;
};
export type ColumnChartItem = {
  xLabel: string;
  colValues: number[];
};
export class ColumnChart extends Chart {
  constructor(public config: ColumnChartConfig) {
    super(config);
  }
  getData() {
    return {
      type: ChartType.COLUMN_CHART,
      ...this.config,
    };
  }
}
