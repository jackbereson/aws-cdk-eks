import NodeCache from "node-cache";
import crypto from "crypto";
import { Chart, ChartType } from "./chart";
import { UtilsHelper } from "../utils.helper";
import path from "path";

export abstract class Report<Filter> {
  abstract code: string; // Mã báo cáo
  abstract title: string; // Tiêu đề báo cáo
  abstract requireFilter: boolean; // Yêu cầu phải có bộ lọc
  abstract filters: any[];
  // { startDate: 'date-time', endDate: 'date-time', 'string', 'number', 'boolean', 'array', }
  abstract cacheEnabled: boolean;
  // abstract hidden = false;
  public charts: Chart[] = [];
  public cacheTTL: number = 60 * 60 * 24; // 1 Ngày
  public cache = new NodeCache({ stdTTL: this.cacheTTL });
  public priority = 0;

  constructor() {}
  abstract query(filter: Filter, paging?: any): Promise<Chart[]>;
  async fetchData(filter: Filter = {} as Filter) {
    const hash = crypto.createHash("sha1").update(JSON.stringify(filter)).digest("hex");
    if (this.cacheEnabled) {
      const reportData = this.cache.get<Chart[]>(hash);
      if (reportData) {
        this.charts = reportData;
        return this;
      }
    }
    this.charts = await this.query(filter);
    if (this.cacheEnabled) {
      this.cache.set(hash, this.charts);
    }
    return this;
  }
  toJSON() {
    return {
      charts: this.charts.map((c) => c.getData()),
    };
  }
}

export const ListReports: Report<any>[] = [];

const ModuleFiles = UtilsHelper.walkSyncFiles(path.join(__dirname, "./reports"));
ModuleFiles.filter((f) => {
  return /(.*)\.report\.(ts|js)$/.test(f);
}).map((f: any) => {
  const report = require(f).default as Report<any>;
  ListReports.push(report);
});
