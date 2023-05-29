import { IChartConfig, Chart, ChartType } from "../chart";

export type TableChartItem = number[];

export type TableChartConfig = IChartConfig & {
  total: number;
  offset: number;
  limit: number;
  colLabels: string[];
  colValues: TableChartItem[];
};

export class TableChart extends Chart {
  constructor(config: TableChartConfig) {
    super(config);
  }

  getData(): any {
    return {
      type: ChartType.TABLE_CHART,
      ...this.config,
    };
  }
}
