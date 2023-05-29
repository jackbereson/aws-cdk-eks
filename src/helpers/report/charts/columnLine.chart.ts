import { IChartConfig, Chart, ChartType } from "../chart";

export type ColumnLineChartConfig = IChartConfig & {
  colLabels: string[];
  colColors: string[];
  lineLabels: string[];
  lineColors: string[];
  data: ColumnLineChartItem[];
  zoom: number;
  lineUnit: string;
};
export type ColumnLineChartItem = {
  xLabel: string;
  colValues: number[];
  lineValues: number[];
};
export class ColumnLineChart extends Chart {
  constructor(public config: ColumnLineChartConfig) {
    super(config);
  }
  getData() {
    return {
      type: ChartType.COLUMN_LINE_CHART,
      ...this.config,
    };
  }
}
