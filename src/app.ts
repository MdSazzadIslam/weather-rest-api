import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import { Routes } from "./routes/index";
import connectDB from "./db/connectDB";
import logger from "./utils/logger";

import { config } from "dotenv";
config();

export class App {
  public app: express.Application;
  public routes: Routes;

  constructor() {
    this.app = express();
    this.routes = new Routes();

    this.setMiddleWare();
    this.routes.routes(this.app);
    this.connectDatabase();
  }

  /**
   * loading all middlewares
   */
  public setMiddleWare() {
    this.app.use(logger);
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
  }
  public async connectDatabase() {
    const db: string = process.env.MONGO_URI;
    await connectDB({ db });
  }
}
export default new App().app;
