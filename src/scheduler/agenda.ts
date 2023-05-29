import AgendaClient from "agenda";
import mongoose, { Schema } from "mongoose";
import { BaseDocument, ModelHook, ModelLoader } from "../base/baseModel";

import { configs } from "../configs";
import { MainConnection } from "../loaders/database.loader";

const agenda = new AgendaClient({ db: { address: configs.maindb, collection: "agendaJobs" } });

export const Agenda = agenda;

export type IAgendaJob = BaseDocument & {
  name?: string; // Tên job
  data?: any; // Dữ liệu kèm theo
  type?: string; // Loại job
  priority?: number; // Độ ưu tiên
  nextRunAt?: Date; // Lần chạy tiếp theo
  lastModifiedBy?: string; // Người câp nhật
  lockedAt?: Date; // Ngày khoá
  lastRunAt?: Date; // Ngày chạy lần cuối
  lastFinishedAt?: Date; // Kết thúc gần nhất
  disabled?: boolean; // Tắt job

  failCount?: number;
  failReason?: string;
  failedAt?: Date;
};

const agendaJobSchema = new Schema(
  {
    name: { type: String },
    data: { type: Schema.Types.Mixed },
    type: { type: String },
    priority: { type: String },
    nextRunAt: { type: Date },
    lastModifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
    lockedAt: { type: Date },
    lastRunAt: { type: Date },
    lastFinishedAt: { type: Date },
    disabled: { type: Boolean },

    failCount: { type: Number },
    failReason: { type: String },
    failedAt: { type: Date },
  },
  { timestamps: true }
);

export const AgendaJobModel: mongoose.Model<IAgendaJob> = MainConnection.model(
  "AgendaJob",
  agendaJobSchema,
  "agendaJobs"
);

export const AgendaJobHook = new ModelHook<IAgendaJob>(agendaJobSchema);
export const AgendaJobLoader = ModelLoader<IAgendaJob>(AgendaJobModel);
