import { CircleChartItem } from "./charts/circle.chart";
import { ColumnChartItem } from "./charts/column.chart";
import { ColumnLineChartItem } from "./charts/columnLine.chart";
import { HorizontalChartItem } from "./charts/horizontal.chart";
import { NoteChartConfig } from "./charts/note.chart";
import { StackChartItem } from "./charts/stack.chart";
import { WidgetChartConfig } from "./charts/widget.chart";
import { TableChartItem } from "./charts/table.chart";
import { ListChartItem } from "./charts/list.chart";

export default class MockData {
  static generateDataForCircleChart(): CircleChartItem[] {
    try {
      const randomCount = []; // Contain all count of a fragment in Circle chart
      const colors = ["#3498DB", "#F1C40F", "#E74C3C", "#2e4053", "#1C2833", "#0E6655"]; // Contain all colors
      const labels = ["fragment1", "fragment2", "fragment3", "fragment4", "fragment5", "fragment6"];

      for (let i = 0; i < 6; i++) {
        randomCount.push(Math.floor(Math.random() * 20) + 1);
      }

      let data: CircleChartItem[] = [];

      for (let i = 0; i < 6; i++) {
        data.push({
          label: labels[i],
          value: randomCount[i],
          color: colors[i],
        });
      }

      return data;
    } catch (e) {
      throw e;
    }
  }

  static generateDataForColumnChart(): ColumnChartItem[] {
    try {
      const labels: string[] = ["x1", "x2", "x3", "x4", "x5", "x6"];
      const data: ColumnChartItem[] = [];
      for (let i = 0; i < 6; i++) {
        data.push({
          xLabel: labels[i],
          colValues: [1, 2, 3, 4, 5, 6].map((item) => {
            return Math.floor(Math.random() * 20) + 5;
          }),
        });
      }

      return data;
    } catch (e) {
      throw e;
    }
  }

  static generateDataForColumnLineChart(): ColumnLineChartItem[] {
    try {
      const labels: string[] = ["x1", "x2", "x3", "x4", "x5", "x6"];
      const data: ColumnLineChartItem[] = [];

      for (let i = 0; i < 5; i++) {
        data.push({
          xLabel: labels[i],
          colValues: [
            Math.floor(Math.random() * 20) + 5,
            Math.floor(Math.random() * 20) + 3,
            Math.floor(Math.random() * 20) + 4,
          ],
          lineValues: [
            Math.floor(Math.random() * 20) + 5,
            Math.floor(Math.random() * 20) + 3,
            Math.floor(Math.random() * 20) + 4,
          ],
        });
      }

      return data;
    } catch (e) {
      throw e;
    }
  }

  static generateDataForHorizontalChart(): HorizontalChartItem[] {
    try {
      const labels: string[] = ["y1", "y2", "y3", "y4", "y5"];

      const data: HorizontalChartItem[] = [];

      for (let i = 0; i < 5; i++) {
        data.push({
          yLabel: labels[i],
          colValues: [
            Math.floor(Math.random() * 90) + 20,
            Math.floor(Math.random() * 90) + 20,
            Math.floor(Math.random() * 90) + 20,
            Math.floor(Math.random() * 90) + 20,
          ],
        });
      }

      return data;
    } catch (e) {
      throw e;
    }
  }

  static generateDataForNoteChart(): NoteChartConfig {
    return {
      title: "Sample data for Note chart",
      description: "Data for testing",
    };
  }

  static generateDataForStackChart(): StackChartItem[] {
    try {
      const data: StackChartItem[] = [];
      const labels: string[] = ["x1", "x2", "x3", "x4", "x5"];

      for (let i = 0; i < 5; i++) {
        data.push({
          xLabel: labels[i],
          colValues: [
            Math.floor(Math.random() * 90) + 20,
            Math.floor(Math.random() * 90) + 20,
            Math.floor(Math.random() * 90) + 20,
          ],
        });
      }

      return data;
    } catch (e) {
      throw e;
    }
  }

  static generateDataForWidgetChart(): WidgetChartConfig {
    return {
      title: "Sample data for Widget chart",
      data: 10,
      icon: "https://i.imgur.com/RtNYTRi.png",
      unit: "unit test",
    };
  }

  static generateDataForTableChart(paging: any): TableChartItem[] {
    try {
      const data: TableChartItem[] = [];

      for (let i = 0; i < 5; i++) {
        data.push([
          Math.floor(Math.random() * 90) + 20,
          Math.floor(Math.random() * 90) + 20,
          Math.floor(Math.random() * 90) + 20,
        ]);
      }

      return data;
    } catch (e) {
      throw e;
    }
  }

  static generateDataForListChart(paging: any): ListChartItem[] {
    try {
      const data: ListChartItem[] = [];

      for (let i = 0; i < 10; i++) {
        data.push({
          title: `Title - ${i + 1}`,
          icon: `https://i.imgur.com/RtNYTRi.png`,
          content: "<p>This is html</p>",
          payload: Math.floor(Math.random() * 2) % 2 && '{"datatest": "123456"}',
        });
      }

      return data;
    } catch (e) {
      throw e;
    }
  }
}
