import express from "express";
import loaders from "./loaders";

const app = express();

loaders({ expressApp: app });

export default app;
