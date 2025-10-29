import express from "express";
import { Application } from "express-serve-static-core";
import morgan from "morgan";

import mainRouter from "../routes/main.js";
import { timeNow } from "../helpers/utils.js";
import { generalErrorHandler } from "../middlewares/response.js";

morgan.token("time-only", () => {
  return timeNow();
});

export function createApp(): Application {
  const app: Application = express();

  app.use(
    morgan("(:time-only) [MORGAN] :method :url :status - :response-time ms")
  );
  app.use(express.json());

  app.use(mainRouter);

  app.use(generalErrorHandler);

  return app;
}
