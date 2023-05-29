export type IChartConfig = {
  title: string;
  unit?: string;
};
export enum ChartType {
  WIDGET = "WIDGET",
  COLUMN_LINE_CHART = "COLUMN_LINE_CHART",
  COLUMN_CHART = "COLUMN_CHART",
  CIRCLE_CHART = "CIRCLE_CHART",
  HORIZONTAL_CHART = "HORIZONTAL_CHART",
  STACK_CHART = "STACK_CHART",
  NOTE = "NOTE",
  TABLE_CHART = "TABLE_CHART",
  LIST_CHART = "LIST_CHART",
}
export abstract class Chart {
  constructor(public config: IChartConfig) {}
  abstract getData(): any;
}
