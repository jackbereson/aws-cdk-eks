import { Chart } from "../chart";
import { Report } from "../report";
import MockData from "../mockData.helper";

import { CircleChart } from "../charts/circle.chart";
import { ColumnChart } from "../charts/column.chart";
import { ColumnLineChart } from "../charts/columnLine.chart";
import { HorizontalChart } from "../charts/horizontal.chart";
import { NoteChart } from "../charts/note.chart";
import { StackChart } from "../charts/stack.chart";
import { WidgetChart } from "../charts/widget.chart";
import { TableChart } from "../charts/table.chart";
import { ListChart } from "../charts/list.chart";

class SampleReport extends Report<any> {
  cacheEnabled: boolean = true;
  requireFilter: boolean = false;
  filters: any[] = [];
  code: string = "SampleReport";
  title: string = "Tạo dữ liệu mẫu cho tất cả biểu đồ";
  hidden: boolean = false;
  async query(filter: {
    month: number;
    year: number;
    paging: { offset: number; limit: number };
  }): Promise<Chart[]> {
    let charts: Chart[] = [];
    charts.push(
      new CircleChart({
        title: "Sample data for Circle chart",
        data: MockData.generateDataForCircleChart(),
      })
    );

    charts.push(
      new ColumnChart({
        title: "Sample data for Column chart",
        colLabels: ["x1", "x2", "x3", "x4", "x5", "x6"],
        colColors: ["#3498DB", "#F1C40F", "#E74C3C", "#2e4053", "#1C2833", "#1C2834"],
        data: MockData.generateDataForColumnChart(),
        zoom: 5,
      })
    );

    charts.push(
      new ColumnLineChart({
        title: "Sample",
        colLabels: ["x1", "x2", "x3", "x4", "x5"],
        colColors: ["#3498DB", "#F1C40F", "#E74C3C", "#2e4053", "#1C2833"],
        lineLabels: ["1", "2", "3", "4", "5"],
        lineColors: ["#3498DB", "#F1C40F", "#E74C3C", "#2e4053", "#1C2833"],
        data: MockData.generateDataForColumnLineChart(),
        zoom: 5,
        lineUnit: "solid",
        unit: "unit test",
      })
    );

    charts.push(
      new HorizontalChart({
        title: "Sample data for Horizontal Chart",
        colColors: ["#3498DB", "#F1C40F", "#E74C3C", "#2e4053"],
        colLabels: ["x1", "x2", "x3", "x4"],
        data: MockData.generateDataForHorizontalChart(),
        unit: "unit test",
      })
    );

    charts.push(new NoteChart({ ...MockData.generateDataForNoteChart() }));

    charts.push(
      new StackChart({
        title: "Sample data for Stack chart",
        colColors: ["#3498DB", "#F1C40F", "#E74C3C", "#2e4053", "#2e4055"],
        colLabels: ["1", "2", "3", "4", "5"],
        data: MockData.generateDataForStackChart(),
        zoom: 5,
        unit: "unit test",
      })
    );

    charts.push(new WidgetChart({ ...MockData.generateDataForWidgetChart() }));

    // Compute total of column for Table chart;
    // Implement here

    charts.push(
      new TableChart({
        title: "Sample data for Table chart",
        total: 10, // Pass total here
        offset: filter.paging ? filter.paging.offset : 1,
        limit: filter.paging.limit ? filter.paging.limit : 20,
        colLabels: ["col1", "col2", "col3"],
        colValues: MockData.generateDataForTableChart(filter.paging),
        unit: "unit test",
      })
    );

    // Compute total of column for List chart;
    // Implement here

    charts.push(
      new ListChart({
        title: "Sample data for List chart",
        total: 10, // Pass total here
        offset: filter.paging ? filter.paging.offset : 1,
        limit: filter.paging.limit ? filter.paging.limit : 20,
        data: MockData.generateDataForListChart(filter.paging),
        unit: "unit test",
      })
    );

    return charts;
  }
}

export default new SampleReport();
