import { Chart, ChartType, IChartConfig } from "../chart";

export type WidgetChartConfig = IChartConfig & {
  data: number;
  icon?: string;
};
export class WidgetChart extends Chart {
  constructor(public config: WidgetChartConfig) {
    super(config);
  }
  getData() {
    return {
      type: ChartType.WIDGET,
      ...this.config,
      data: this.config.data || 0,
    };
  }
}
