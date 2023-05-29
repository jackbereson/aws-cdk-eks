import { IChartConfig, Chart, ChartType } from "../chart";

export type ListChartItem = {
  title: string;
  icon: string;
  content: string;
  payload?: string;
};

export type ListChartConfig = IChartConfig & {
  total: number;
  offset: number;
  limit: number;
  data: ListChartItem[];
};

export class ListChart extends Chart {
  constructor(config: ListChartConfig) {
    super(config);
  }

  getData(): any {
    return {
      type: ChartType.LIST_CHART,
      ...this.config,
    };
  }
}
